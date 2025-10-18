import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Users, ChefHat, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NFC Table Ordering System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your restaurant experience with seamless digital ordering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Link to="/menu">
            <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Customer Menu</CardTitle>
                <CardDescription>
                  Browse dishes, build your order, and get your unique order code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multi-stage ordering flow</li>
                  <li>• Rich dish profiles with images</li>
                  <li>• Dietary filters and preferences</li>
                  <li>• Instant order code generation</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/waiter">
            <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Waiter Dashboard</CardTitle>
                <CardDescription>
                  Enter customer codes, review orders, and send to kitchen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Quick order code lookup</li>
                  <li>• Order review and modification</li>
                  <li>• Add special instructions</li>
                  <li>• Confirm and send to kitchen</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/kitchen">
            <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <ChefHat className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-2xl">Kitchen Display</CardTitle>
                <CardDescription>
                  Real-time order tracking and status management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Live order queue</li>
                  <li>• Status updates (Pending/Preparing/Ready)</li>
                  <li>• Table and time tracking</li>
                  <li>• Special instruction alerts</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin">
            <Card className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-warning" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription>
                  Analytics, insights, and menu management dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Revenue and order analytics</li>
                  <li>• Popular dishes insights</li>
                  <li>• Customer preference data</li>
                  <li>• Menu management (CRUD)</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">How It Works:</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Customer taps NFC chip on table to open menu</li>
                <li>2. Browses through categories and builds order</li>
                <li>3. Receives unique 3-digit order code (e.g., X1F)</li>
                <li>4. Waiter enters code, reviews order with customer</li>
                <li>5. Waiter confirms and sends order to kitchen</li>
                <li>6. Kitchen staff prepare and update order status</li>
                <li>7. Owner monitors analytics and manages menu</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
