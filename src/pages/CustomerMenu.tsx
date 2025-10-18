import { useState } from "react";
import { menuData, Dish, generateOrderCode } from "@/data/menuData";
import { MenuStage } from "@/components/customer/MenuStage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Check, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stages = [
  { id: "appetizer", name: "Appetizers", icon: "🥗" },
  { id: "main", name: "Main Course", icon: "🍽️" },
  { id: "side", name: "Sides", icon: "🥔" },
  { id: "drink", name: "Drinks", icon: "🍹" },
  { id: "dessert", name: "Desserts", icon: "🍰" },
];

const CustomerMenu = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const { toast } = useToast();

  const currentCategory = stages[currentStage].id as Dish["category"];
  const currentDishes = menuData.filter((dish) => dish.category === currentCategory);

  const handleAddItem = (dish: Dish) => {
    setOrderItems((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
    toast({
      title: "Added to order",
      description: `${dish.name} added`,
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setOrderItems((prev) => {
      const newItems = { ...prev };
      if (newItems[dishId] > 1) {
        newItems[dishId]--;
      } else {
        delete newItems[dishId];
      }
      return newItems;
    });
  };

  const getTotalItems = () => {
    return Object.values(orderItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(orderItems).reduce((sum, [dishId, qty]) => {
      const dish = menuData.find((d) => d.id === dishId);
      return sum + (dish?.price || 0) * qty;
    }, 0);
  };

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      setShowOrderSummary(true);
    }
  };

  const handleBack = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleFinalizeOrder = () => {
    const code = generateOrderCode();
    setOrderCode(code);
    toast({
      title: "Order Placed!",
      description: `Your order code is ${code}. Please show this to your waiter.`,
      duration: 10000,
    });
  };

  if (orderCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-xl">
          <CardHeader>
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-4">Your order code is:</p>
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-6">
                <p className="text-5xl font-bold text-primary tracking-wider">{orderCode}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Please show this code to your waiter to confirm your order.
            </p>
            <Button
              className="w-full"
              onClick={() => {
                setOrderCode(null);
                setOrderItems({});
                setCurrentStage(0);
                setShowOrderSummary(false);
              }}
            >
              Start New Order
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showOrderSummary) {
    const orderedDishes = Object.entries(orderItems).map(([dishId, qty]) => ({
      dish: menuData.find((d) => d.id === dishId)!,
      quantity: qty,
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background p-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderedDishes.map(({ dish, quantity }) => (
                <div key={dish.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{dish.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <p className="font-semibold">${(dish.price * quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowOrderSummary(false)} className="flex-1">
                  Back to Menu
                </Button>
                <Button onClick={handleFinalizeOrder} className="flex-1">
                  Confirm Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Digital Menu</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Table 5
            </Badge>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all whitespace-nowrap ${
                  index === currentStage
                    ? "bg-primary text-primary-foreground border-primary"
                    : index < currentStage
                    ? "bg-success/10 border-success text-success"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                <span>{stage.icon}</span>
                <span className="font-medium">{stage.name}</span>
                {index === currentStage && <ChevronRight className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">{stages[currentStage].name}</h2>
          <p className="text-muted-foreground">Browse and add items to your order</p>
        </div>

        <MenuStage
          dishes={currentDishes}
          category={currentCategory}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          currentItems={orderItems}
        />
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStage === 0}
              className="flex-1 md:flex-none"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
                </p>
                <p className="text-lg font-bold text-primary">${getTotalPrice().toFixed(2)}</p>
              </div>
            </div>

            <Button onClick={handleNext} className="flex-1 md:flex-none">
              {currentStage === stages.length - 1 ? (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Review Order
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMenu;
