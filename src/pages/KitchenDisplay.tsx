import { useState, useEffect } from "react";
import { menuData } from "@/data/menuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ChefHat, CheckCircle2 } from "lucide-react";

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([
    {
      id: "1",
      code: "A1B",
      tableNumber: 3,
      items: [
        { dish: menuData[0], quantity: 2 },
        { dish: menuData[4], quantity: 1 },
      ],
      status: "pending" as const,
      timestamp: new Date(Date.now() - 300000),
      notes: "No onions please",
    },
    {
      id: "2",
      code: "C2D",
      tableNumber: 7,
      items: [
        { dish: menuData[5], quantity: 1 },
        { dish: menuData[8], quantity: 2 },
        { dish: menuData[11], quantity: 1 },
      ],
      status: "preparing" as const,
      timestamp: new Date(Date.now() - 600000),
      notes: "",
    },
    {
      id: "3",
      code: "X1F",
      tableNumber: 5,
      items: [
        { dish: menuData[1], quantity: 2 },
        { dish: menuData[9], quantity: 1 },
      ],
      status: "ready" as const,
      timestamp: new Date(Date.now() - 900000),
      notes: "Extra spicy",
    },
  ]);

  // Sync orders to localStorage for waiter notifications
  useEffect(() => {
    localStorage.setItem("kitchenOrders", JSON.stringify(orders));
  }, [orders]);

  const handleStatusChange = (orderId: string, newStatus: "pending" | "preparing" | "ready") => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const getTimeSince = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    return `${minutes} min ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive";
      case "preparing":
        return "default";
      case "ready":
        return "secondary";
      default:
        return "default";
    }
  };

  const OrderCard = ({ order }: { order: (typeof orders)[0] }) => (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Table {order.tableNumber}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Order Code: {order.code}</p>
          </div>
          <div className="text-right">
            <Badge variant={getStatusColor(order.status)} className="mb-2">
              {order.status}
            </Badge>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {getTimeSince(order.timestamp)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <div className="flex-1">
                <p className="font-medium">
                  {item.quantity}x {item.dish.name}
                </p>
                <p className="text-xs text-muted-foreground">{item.dish.category}</p>
              </div>
              <Badge variant="outline">{item.dish.category}</Badge>
            </div>
          ))}
        </div>

        {order.notes && (
          <div className="bg-warning/10 border border-warning/30 rounded p-3">
            <p className="text-sm font-medium">Special Instructions:</p>
            <p className="text-sm text-muted-foreground mt-1">{order.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          {order.status === "pending" && (
            <Button
              className="flex-1"
              onClick={() => handleStatusChange(order.id, "preparing")}
              variant="default"
            >
              <ChefHat className="w-4 h-4 mr-2" />
              Start Preparing
            </Button>
          )}
          {order.status === "preparing" && (
            <Button
              className="flex-1"
              onClick={() => handleStatusChange(order.id, "ready")}
              variant="default"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button className="flex-1" variant="secondary" disabled>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Ready for Serving
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Kitchen Display System</h1>
          <p className="text-muted-foreground">Manage and track all incoming orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-destructive">{pendingOrders.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Pending Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{preparingOrders.length}</p>
                <p className="text-sm text-muted-foreground mt-1">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-success">{readyOrders.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Ready to Serve</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Preparing ({preparingOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Ready ({readyOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {preparingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {readyOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KitchenDisplay;
