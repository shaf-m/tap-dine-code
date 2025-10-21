import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Check, X } from "lucide-react";
import { MenuCategory } from "@/data/menuData";

interface CategoryManagerProps {
  categories: MenuCategory[];
  onUpdateCategory: (id: string, displayName: string, icon: string) => void;
}

export const CategoryManager = ({ categories, onUpdateCategory }: CategoryManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");

  const handleEdit = (category: MenuCategory) => {
    setEditingId(category.id);
    setEditName(category.displayName);
    setEditIcon(category.icon);
  };

  const handleSave = (id: string) => {
    if (editName.trim()) {
      onUpdateCategory(id, editName, editIcon);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditIcon("");
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Menu Categories</CardTitle>
        <p className="text-sm text-muted-foreground">
          Customize category names and icons (e.g., "Kebabs" instead of "Main Courses")
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border"
            >
              {editingId === category.id ? (
                <>
                  <Input
                    value={editIcon}
                    onChange={(e) => setEditIcon(e.target.value)}
                    placeholder="Icon"
                    className="w-16 text-center"
                    maxLength={2}
                  />
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Category name"
                    className="flex-1"
                  />
                  <Button size="sm" onClick={() => handleSave(category.id)}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{category.displayName}</p>
                    <p className="text-xs text-muted-foreground">ID: {category.id}</p>
                  </div>
                  <Badge variant="secondary">{category.name}</Badge>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
