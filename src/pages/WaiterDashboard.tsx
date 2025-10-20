import { useState, useEffect } from "react";
import { menuData } from "@/data/menuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Send, Plus, Minus, Trash2, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WaiterDashboard = () => {
  const [orderCode, setOrderCode] = useState("");
  const [loadedOrder, setLoadedOrder] = useState<any>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [readyOrders, setReadyOrders] = useState<string[]>([]);
  const { toast } = useToast();

  // Listen for orders marked as ready
  useEffect(() => {
    const checkReadyOrders = () => {
      const ordersData = localStorage.getItem("kitchenOrders");
      if (ordersData) {
        const orders = JSON.parse(ordersData);
        const ready = orders.filter((o: any) => o.status === "ready").map((o: any) => o.code);
        
        // Check for new ready orders
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

    // Check immediately and then every 3 seconds
    checkReadyOrders();
    const interval = setInterval(checkReadyOrders, 3000);

    return () => clearInterval(interval);
  }, [readyOrders, toast]);

  // Simulated order lookup
  const handleLoadOrder = () => {
    if (!orderCode) {
      toast({
        title: "Error",
        description: "Please enter an order code",
        variant: "destructive",
      });
      return;
    }

    // Simulate loading a hardcoded order
    const mockOrder = {
      code: orderCode,
      tableNumber: 5,
      items: [
        { dish: menuData[1], quantity: 2, notes: "" },
        { dish: menuData[5], quantity: 1, notes: "" },
        { dish: menuData[8], quantity: 2, notes: "" },
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

  const handleSendToKitchen = () => {
    if (!loadedOrder) return;

    toast({
      title: "Order Sent to Kitchen",
      description: `Order ${loadedOrder.code} has been confirmed and sent to the kitchen`,
    });

    // Reset
    setLoadedOrder(null);
    setOrderCode("");
    setOrderNotes("");
  };

  const getTotalPrice = () => {
    if (!loadedOrder) return 0;
    return loadedOrder.items.reduce(
      (sum: number, item: any) => sum + item.dish.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Waiter Dashboard</h1>
              <p className="text-muted-foreground">Enter customer order codes to review and confirm orders</p>
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
      </div>
    </div>
  );
};

export default WaiterDashboard;
