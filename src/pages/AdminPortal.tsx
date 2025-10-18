import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, TrendingUp, Users, DollarSign, ShoppingBag, Star } from "lucide-react";

const AdminPortal = () => {
  const popularDishes = [
    { name: "Chicken Tikka Masala", orders: 87, revenue: 1652.13 },
    { name: "Ribeye Steak", orders: 52, revenue: 1715.48 },
    { name: "Buffalo Wings", orders: 71, revenue: 921.29 },
    { name: "Truffle Fries", orders: 94, revenue: 751.06 },
    { name: "Chocolate Lava Cake", orders: 63, revenue: 566.37 },
  ];

  const recentOrders = [
    { code: "X1F", table: 5, items: 4, total: 67.96, time: "2 min ago" },
    { code: "A1B", table: 3, items: 3, total: 42.97, time: "5 min ago" },
    { code: "C2D", table: 7, items: 5, total: 89.93, time: "10 min ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Owner Admin Portal</h1>
          <p className="text-muted-foreground">Monitor restaurant performance and manage operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-3xl font-bold text-primary">$3,847</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5% from yesterday
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-3xl font-bold">127</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.2% from yesterday
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-3xl font-bold">$30.29</p>
                  <p className="text-xs text-muted-foreground mt-1">Per customer</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tables</p>
                  <p className="text-3xl font-bold">8/12</p>
                  <p className="text-xs text-muted-foreground mt-1">Currently seated</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Most Popular Dishes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularDishes.map((dish, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{dish.name}</p>
                        <p className="text-sm text-muted-foreground">{dish.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">${dish.revenue.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">12:00 PM - 2:00 PM</span>
                      <Badge variant="default">Lunch Rush</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">7:00 PM - 9:00 PM</span>
                      <Badge variant="default">Dinner Rush</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">3:00 PM - 5:00 PM</span>
                      <Badge variant="secondary">Moderate</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Customer Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vegetarian Orders</span>
                      <span className="font-semibold">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Spicy Dishes</span>
                      <span className="font-semibold">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dessert Add-ons</span>
                      <span className="font-semibold">63%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.code} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">Order {order.code}</p>
                        <p className="text-sm text-muted-foreground">
                          Table {order.table} • {order.items} items • {order.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4 mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Menu CRUD operations would be implemented here
                  </p>
                  <Badge variant="secondary">Feature Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
