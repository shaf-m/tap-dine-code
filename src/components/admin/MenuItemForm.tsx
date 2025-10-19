import { useState } from "react";
import { Dish } from "@/data/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MenuItemFormProps {
  dish?: Dish;
  onSave: (dish: Dish) => void;
  onCancel: () => void;
}

export const MenuItemForm = ({ dish, onSave, onCancel }: MenuItemFormProps) => {
  const [formData, setFormData] = useState<Dish>(
    dish || {
      id: `dish-${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      category: "appetizer",
      image: "",
      dietary: [],
      spiceLevel: null,
      style: null,
      ingredients: [],
      allergens: [],
      available: true,
    }
  );

  const [newIngredient, setNewIngredient] = useState("");
  const [newAllergen, setNewAllergen] = useState("");

  const dietaryOptions = ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = (field: "ingredients" | "allergens", value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()],
      });
    }
  };

  const removeItem = (field: "ingredients" | "allergens", value: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== value),
    });
  };

  const toggleDietary = (option: string) => {
    setFormData({
      ...formData,
      dietary: formData.dietary.includes(option)
        ? formData.dietary.filter((d) => d !== option)
        : [...formData.dietary, option],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Dish Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value: any) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appetizer">Appetizer</SelectItem>
              <SelectItem value="main">Main Course</SelectItem>
              <SelectItem value="side">Side Dish</SelectItem>
              <SelectItem value="drink">Drink</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="spiceLevel">Spice Level</Label>
          <Select
            value={formData.spiceLevel || "none"}
            onValueChange={(value) =>
              setFormData({ ...formData, spiceLevel: value === "none" ? null : (value as any) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="mild">Mild</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="spicy">Spicy</SelectItem>
              <SelectItem value="extra-spicy">Extra Spicy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="style">Style</Label>
          <Select
            value={formData.style || "none"}
            onValueChange={(value) =>
              setFormData({ ...formData, style: value === "none" ? null : (value as any) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="dry">Dry</SelectItem>
              <SelectItem value="gravy">Gravy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dietary Options</Label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <Badge
              key={option}
              variant={formData.dietary.includes(option) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleDietary(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newIngredient">Ingredients</Label>
        <div className="flex gap-2">
          <Input
            id="newIngredient"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem("ingredients", newIngredient);
                setNewIngredient("");
              }
            }}
            placeholder="Add ingredient and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem("ingredients", newIngredient);
              setNewIngredient("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="gap-1">
              {ingredient}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeItem("ingredients", ingredient)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newAllergen">Allergens</Label>
        <div className="flex gap-2">
          <Input
            id="newAllergen"
            value={newAllergen}
            onChange={(e) => setNewAllergen(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem("allergens", newAllergen);
                setNewAllergen("");
              }
            }}
            placeholder="Add allergen and press Enter"
          />
          <Button
            type="button"
            onClick={() => {
              addItem("allergens", newAllergen);
              setNewAllergen("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergens.map((allergen) => (
            <Badge key={allergen} variant="destructive" className="gap-1">
              {allergen}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeItem("allergens", allergen)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Dish</Button>
      </div>
    </form>
  );
};
