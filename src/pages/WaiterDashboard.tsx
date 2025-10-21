import { useState, useEffect } from "react";
import { menuData, Order, OrderItem } from "@/data/menuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Plus, Minus, Bell, Receipt, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WaiterDashboard = () => {
  const [orderCode, setOrderCode] = useState("");
  const [loadedOrder, setLoadedOrder] = useState<any>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [readyOrders, setReadyOrders] = useState<string[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptOrder, setReceiptOrder] = useState<any>(null);
  const [mode, setMode] = useState<"new" | "modify">("new");
  const { toast } = useToast();

  // Listen for orders marked as ready
  useEffect(() => {
    const checkReadyOrders = () => {
      const ordersData = localStorage.getItem("kitchenOrders");
      if (ordersData) {
        const orders = JSON.parse(ordersData);
        const ready = orders.filter((o: any) => o.status === "ready").map((o: any) => o.code);
        
        const newReadyOrders = ready.filter((code: string) => !readyOrders.includes(code));
        if (newReadyOrders.length > 0) {
          newReadyOrders.forEach((code: string) => {
            const order = orders.find((o: any) => o.code === code);
            toast({
              title: "🔔 Order Ready!",
              description: `Order ${code} for Table ${order.tableNumber} is ready to serve`,
              duration: 10000,
            });
          });
        }
        
        setReadyOrders(ready);
      }
    };

    checkReadyOrders();
    const interval = setInterval(checkReadyOrders, 3000);

    return () => clearInterval(interval);
  }, [readyOrders, toast]);

  const handleLoadOrder = () => {
    if (!orderCode) {
      toast({
        title: "Error",
        description: "Please enter an order code",
        variant: "destructive",
      });
      return;
    }

    // Check if order exists in served orders
    const servedOrdersData = localStorage.getItem("servedOrders");
    if (servedOrdersData && mode === "modify") {
      const servedOrders = JSON.parse(servedOrdersData);
      const existingOrder = servedOrders.find((o: any) => o.code === orderCode.toUpperCase());
      
      if (existingOrder) {
        setLoadedOrder(existingOrder);
        toast({
          title: "Order Loaded",
          description: `Existing order ${orderCode} loaded. You can add more items.`,
        });
        return;
      } else {
        toast({
          title: "Order Not Found",
          description: `No served order found with code ${orderCode}`,
          variant: "destructive",
        });
        return;
      }
    }

    // Simulate loading a new order
    const mockOrder = {
      code: orderCode,
      tableNumber: 5,
      customerName: "",
      items: [
        { dish: menuData[1], quantity: 2, notes: "", status: "pending" as const, addedAt: new Date() },
        { dish: menuData[5], quantity: 1, notes: "", status: "pending" as const, addedAt: new Date() },
      ],
    };

    setLoadedOrder(mockOrder);
    toast({
      title: "Order Loaded",
      description: `Order ${orderCode} from Table ${mockOrder.tableNumber}`,
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setLoadedOrder((prev: any) => {
      if (!prev) return prev;
      const newItems = prev.items
        .map((item: any) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
      return { ...prev, items: newItems };
    });
  };

  const handleAddNewItem = (dishId: string) => {
    const dish = menuData.find(d => d.id === dishId);
    if (!dish || !loadedOrder) return;

    setLoadedOrder((prev: any) => {
      const existingItem = prev.items.find((item: any) => item.dish.id === dishId);
      if (existingItem) {
        return {
          ...prev,
          items: prev.items.map((item: any) =>
            item.dish.id === dishId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...prev,
          items: [
            ...prev.items,
            { dish, quantity: 1, notes: "", status: "pending" as const, addedAt: new Date() },
          ],
        };
      }
    });

    toast({
      title: "Item Added",
      description: `${dish.name} added to order`,
    });
  };

  const handleSendToKitchen = () => {
    if (!loadedOrder) return;

    // If modifying existing order, only send new items
    if (mode === "modify") {
      const newItems = loadedOrder.items.filter((item: any) => item.status === "pending");
      if (newItems.length === 0) {
        toast({
          title: "No New Items",
          description: "No new items to send to kitchen",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Additional Items Sent",
        description: `${newItems.length} new item(s) sent to kitchen for order ${loadedOrder.code}`,
      });
    } else {
      toast({
        title: "Order Sent to Kitchen",
        description: `Order ${loadedOrder.code} has been confirmed and sent to the kitchen`,
      });
    }

    setLoadedOrder(null);
    setOrderCode("");
    setOrderNotes("");
  };

  const handleGenerateReceipt = () => {
    if (!orderCode) {
      toast({
        title: "Error",
        description: "Please enter an order code",
        variant: "destructive",
      });
      return;
    }

    // Check served orders
    const servedOrdersData = localStorage.getItem("servedOrders");
    if (servedOrdersData) {
      const servedOrders = JSON.parse(servedOrdersData);
      const order = servedOrders.find((o: any) => o.code === orderCode.toUpperCase());
      
      if (order) {
        setReceiptOrder(order);
        setShowReceipt(true);
        return;
      }
    }

    // Generate mock receipt if no real order found
    const mockReceipt = {
      code: orderCode.toUpperCase(),
      tableNumber: Math.floor(Math.random() * 20) + 1,
      customerName: "Guest Customer",
      timestamp: new Date().toISOString(),
      items: [
        {
          dish: {
            id: 1,
            name: "Chopan Kebab",
            price: 18.99,
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143",
          },
          quantity: 2,
          status: "served",
        },
        {
          dish: {
            id: 2,
            name: "Kabuli Pulao",
            price: 16.99,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
          },
          quantity: 1,
          status: "served",
        },
      ],
      notes: "Sample receipt - No real order found",
      totalAmount: 54.97,
    };

    setReceiptOrder(mockReceipt);
    setShowReceipt(true);
    
    toast({
      title: "Mock Receipt Generated",
      description: "Displaying sample receipt data",
    });
  };

  const getTotalPrice = () => {
    if (!loadedOrder) return 0;
    return loadedOrder.items.reduce(
      (sum: number, item: any) => sum + item.dish.price * item.quantity,
      0
    );
  };

  const printReceipt = () => {
    window.print();
    toast({
      title: "Printing Receipt",
      description: "Receipt sent to printer",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Waiter Dashboard</h1>
              <p className="text-muted-foreground">Manage orders, add items, and generate receipts</p>
            </div>
            {readyOrders.length > 0 && (
              <div className="flex items-center gap-2 bg-success/10 border border-success rounded-lg px-4 py-2">
                <Bell className="w-5 h-5 text-success animate-pulse" />
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">{readyOrders.length} Ready</p>
                  <p className="text-xs text-muted-foreground">Orders to serve</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "new" | "modify")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">New Order</TabsTrigger>
            <TabsTrigger value="modify">Modify Order</TabsTrigger>
            <TabsTrigger value="receipt">Generate Receipt</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Enter Order Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="e.g., X1F"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                    className="text-lg font-mono uppercase"
                    maxLength={3}
                  />
                  <Button onClick={handleLoadOrder}>
                    <Search className="w-4 h-4 mr-2" />
                    Load Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {loadedOrder && (
              <Card className="shadow-lg border-2 border-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Order Details</CardTitle>
                      <p className="text-muted-foreground mt-1">Code: {loadedOrder.code}</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Table {loadedOrder.tableNumber}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Items Ordered:</h3>
                    {loadedOrder.items.map((item: any) => (
                      <div key={item.dish.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.dish.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.dish.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.dish.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateQuantity(item.dish.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="font-semibold min-w-[80px] text-right">
                          ${(item.dish.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <label className="font-semibold">Order Notes / Special Instructions:</label>
                    <Textarea
                      placeholder="Add any special requests, allergies, or modifications..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLoadedOrder(null);
                        setOrderCode("");
                        setOrderNotes("");
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSendToKitchen} className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Send to Kitchen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="modify" className="space-y-6 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Modify Existing Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter order code"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                    className="text-lg font-mono uppercase"
                    maxLength={3}
                  />
                  <Button onClick={handleLoadOrder}>
                    <Search className="w-4 h-4 mr-2" />
                    Find Order
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Search for orders that have already been served. Add additional items as needed.
                </p>
              </CardContent>
            </Card>

            {loadedOrder && (
              <>
                <Card className="shadow-lg border-2 border-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">Modify Order {loadedOrder.code}</CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Customer: {loadedOrder.customerName || "Guest"} • Table {loadedOrder.tableNumber}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Current Items:</h3>
                      {loadedOrder.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.dish.name}</h4>
                            <p className="text-sm text-muted-foreground">${item.dish.price} each</p>
                          </div>
                          <Badge variant={item.status === "served" ? "secondary" : "default"}>
                            {item.status}
                          </Badge>
                          <span className="font-semibold">{item.quantity}x</span>
                          <div className="font-semibold min-w-[80px] text-right">
                            ${(item.dish.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Add More Items:</h3>
                      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                        {menuData.filter(d => d.available).map((dish) => (
                          <Button
                            key={dish.id}
                            variant="outline"
                            onClick={() => handleAddNewItem(dish.id)}
                            className="justify-start h-auto py-2"
                          >
                            <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-left truncate">{dish.name} (${dish.price})</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Updated Total:</span>
                      <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>

                    <Button onClick={handleSendToKitchen} className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Additional Items to Kitchen
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="receipt" className="space-y-6 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Generate Receipt / Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter order code"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                    className="text-lg font-mono uppercase"
                    maxLength={3}
                  />
                  <Button onClick={handleGenerateReceipt}>
                    <Receipt className="w-4 h-4 mr-2" />
                    Get Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Receipt</DialogTitle>
          </DialogHeader>
          {receiptOrder && (
            <div className="space-y-4 print:p-4">
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">Restaurant Name</h2>
                <p className="text-sm text-muted-foreground">123 Main St • (555) 123-4567</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Order Code:</span>
                  <span className="font-mono font-bold">{receiptOrder.code}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Table:</span>
                  <span>{receiptOrder.tableNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Customer:</span>
                  <span>{receiptOrder.customerName || "Guest"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Date:</span>
                  <span>{new Date(receiptOrder.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {receiptOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.dish.name}
                    </span>
                    <span>${(item.dish.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${receiptOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax (10%):</span>
                  <span>${(receiptOrder.totalAmount * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${(receiptOrder.totalAmount * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={printReceipt} className="w-full">
                <Printer className="w-4 h-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WaiterDashboard;
