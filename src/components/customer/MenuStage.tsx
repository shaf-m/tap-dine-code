import { useState } from "react";
import { Dish } from "@/data/menuData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Leaf, Droplet, Plus, Minus } from "lucide-react";

interface MenuStageProps {
  dishes: Dish[];
  category: string;
  onAddItem: (dish: Dish) => void;
  onRemoveItem: (dishId: string) => void;
  currentItems: { [key: string]: number };
}

export const MenuStage = ({ dishes, category, onAddItem, onRemoveItem, currentItems }: MenuStageProps) => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const getSpiceIcon = (level: string | null) => {
    if (!level) return null;
    const flames = {
      mild: 1,
      medium: 2,
      spicy: 3,
      "extra-spicy": 4,
    };
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: flames[level as keyof typeof flames] }).map((_, i) => (
          <Flame key={i} className="w-3 h-3 fill-destructive text-destructive" />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dishes.map((dish) => (
          <Card
            key={dish.id}
            className="overflow-hidden cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary"
            onClick={() => setSelectedDish(dish)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              {!dish.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-semibold">Unavailable</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{dish.name}</h3>
                <span className="text-primary font-bold">${dish.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dish.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {dish.dietary.includes("vegetarian") && (
                  <Badge variant="outline" className="text-success border-success">
                    <Leaf className="w-3 h-3 mr-1" />
                    Veg
                  </Badge>
                )}
                {dish.dietary.includes("vegan") && (
                  <Badge variant="outline" className="text-success border-success">
                    <Leaf className="w-3 h-3 mr-1" />
                    Vegan
                  </Badge>
                )}
                {dish.style === "gravy" && (
                  <Badge variant="outline">
                    <Droplet className="w-3 h-3 mr-1" />
                    Gravy
                  </Badge>
                )}
                {dish.spiceLevel && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getSpiceIcon(dish.spiceLevel)}
                    {dish.spiceLevel}
                  </Badge>
                )}
              </div>

              {dish.available && (
                <div className="flex items-center gap-2">
                  {currentItems[dish.id] > 0 ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(dish.id);
                        }}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold min-w-[20px] text-center">{currentItems[dish.id]}</span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddItem(dish);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddItem(dish);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Order
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDish && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedDish(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video relative overflow-hidden">
              <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedDish.name}</h2>
                <span className="text-2xl text-primary font-bold">${selectedDish.price}</span>
              </div>
              <p className="text-muted-foreground mb-4">{selectedDish.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Ingredients:</h4>
                  <p className="text-sm text-muted-foreground">{selectedDish.ingredients.join(", ")}</p>
                </div>

                {selectedDish.allergens.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-destructive">Allergens:</h4>
                    <p className="text-sm text-destructive">{selectedDish.allergens.join(", ")}</p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {selectedDish.dietary.map((diet) => (
                    <Badge key={diet} variant="secondary">
                      {diet}
                    </Badge>
                  ))}
                  {selectedDish.spiceLevel && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getSpiceIcon(selectedDish.spiceLevel)}
                      {selectedDish.spiceLevel}
                    </Badge>
                  )}
                </div>
              </div>

              <Button className="w-full mt-6" onClick={() => setSelectedDish(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
