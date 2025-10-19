import freshLemonadeImg from "@/assets/fresh-lemonade.jpg";
import mangoLassiImg from "@/assets/mango-lassi.jpg";
import craftBeerImg from "@/assets/craft-beer.jpg";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "main" | "side" | "drink" | "dessert";
  image: string;
  dietary: string[];
  spiceLevel: "mild" | "medium" | "spicy" | "extra-spicy" | null;
  style: "dry" | "gravy" | null;
  ingredients: string[];
  allergens: string[];
  available: boolean;
}

export const menuData: Dish[] = [
  // Appetizers
  {
    id: "app-1",
    name: "Crispy Spring Rolls",
    description: "Golden fried rolls filled with fresh vegetables and glass noodles, served with sweet chili sauce",
    price: 8.99,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    dietary: ["vegetarian"],
    spiceLevel: "mild",
    style: "dry",
    ingredients: ["cabbage", "carrots", "glass noodles", "spring roll wrapper"],
    allergens: ["gluten"],
    available: true,
  },
  {
    id: "app-2",
    name: "Buffalo Wings",
    description: "Juicy chicken wings tossed in our signature buffalo sauce with blue cheese dip",
    price: 12.99,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    dietary: [],
    spiceLevel: "spicy",
    style: "dry",
    ingredients: ["chicken wings", "buffalo sauce", "blue cheese"],
    allergens: ["dairy"],
    available: true,
  },
  {
    id: "app-3",
    name: "Bruschetta",
    description: "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil",
    price: 9.99,
    category: "appetizer",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
    dietary: ["vegetarian", "vegan"],
    spiceLevel: null,
    style: null,
    ingredients: ["tomatoes", "basil", "garlic", "olive oil", "bread"],
    allergens: ["gluten"],
    available: true,
  },
  
  // Mains
  {
    id: "main-1",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet grilled to perfection with lemon butter sauce",
    price: 24.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    dietary: ["gluten-free"],
    spiceLevel: "mild",
    style: "gravy",
    ingredients: ["salmon", "lemon", "butter", "herbs"],
    allergens: ["fish", "dairy"],
    available: true,
  },
  {
    id: "main-2",
    name: "Chicken Tikka Masala",
    description: "Tender chicken pieces in a rich, creamy tomato-based curry sauce",
    price: 18.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    dietary: ["gluten-free"],
    spiceLevel: "medium",
    style: "gravy",
    ingredients: ["chicken", "tomatoes", "cream", "spices"],
    allergens: ["dairy"],
    available: true,
  },
  {
    id: "main-3",
    name: "Ribeye Steak",
    description: "12oz premium ribeye cooked to your preference with garlic herb butter",
    price: 32.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    dietary: ["gluten-free"],
    spiceLevel: null,
    style: "dry",
    ingredients: ["ribeye steak", "garlic", "herbs", "butter"],
    allergens: ["dairy"],
    available: true,
  },
  {
    id: "main-4",
    name: "Vegetable Pad Thai",
    description: "Classic Thai noodles with tofu, vegetables, and peanuts in tamarind sauce",
    price: 15.99,
    category: "main",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
    dietary: ["vegetarian", "vegan"],
    spiceLevel: "medium",
    style: "dry",
    ingredients: ["rice noodles", "tofu", "vegetables", "peanuts", "tamarind"],
    allergens: ["peanuts", "soy"],
    available: true,
  },

  // Sides
  {
    id: "side-1",
    name: "Garlic Mashed Potatoes",
    description: "Creamy mashed potatoes infused with roasted garlic",
    price: 5.99,
    category: "side",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    dietary: ["vegetarian", "gluten-free"],
    spiceLevel: null,
    style: "gravy",
    ingredients: ["potatoes", "garlic", "butter", "cream"],
    allergens: ["dairy"],
    available: true,
  },
  {
    id: "side-2",
    name: "Steamed Vegetables",
    description: "Seasonal vegetables lightly steamed with olive oil",
    price: 4.99,
    category: "side",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    spiceLevel: null,
    style: null,
    ingredients: ["broccoli", "carrots", "zucchini", "olive oil"],
    allergens: [],
    available: true,
  },
  {
    id: "side-3",
    name: "Truffle Fries",
    description: "Crispy french fries drizzled with truffle oil and parmesan",
    price: 7.99,
    category: "side",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    dietary: ["vegetarian"],
    spiceLevel: null,
    style: "dry",
    ingredients: ["potatoes", "truffle oil", "parmesan"],
    allergens: ["dairy"],
    available: true,
  },

  // Drinks
  {
    id: "drink-1",
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint",
    price: 4.99,
    category: "drink",
    image: freshLemonadeImg,
    dietary: ["vegetarian", "vegan", "gluten-free"],
    spiceLevel: null,
    style: null,
    ingredients: ["lemon", "sugar", "mint", "water"],
    allergens: [],
    available: true,
  },
  {
    id: "drink-2",
    name: "Mango Lassi",
    description: "Traditional Indian yogurt drink blended with fresh mango",
    price: 5.99,
    category: "drink",
    image: mangoLassiImg,
    dietary: ["vegetarian", "gluten-free"],
    spiceLevel: null,
    style: null,
    ingredients: ["yogurt", "mango", "sugar", "cardamom"],
    allergens: ["dairy"],
    available: true,
  },
  {
    id: "drink-3",
    name: "Craft Beer Selection",
    description: "Ask your server for our rotating selection of local craft beers",
    price: 7.99,
    category: "drink",
    image: craftBeerImg,
    dietary: [],
    spiceLevel: null,
    style: null,
    ingredients: ["varies by selection"],
    allergens: ["gluten"],
    available: true,
  },

  // Desserts
  {
    id: "dessert-1",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 8.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
    dietary: ["vegetarian"],
    spiceLevel: null,
    style: null,
    ingredients: ["chocolate", "eggs", "flour", "butter", "vanilla ice cream"],
    allergens: ["gluten", "dairy", "eggs"],
    available: true,
  },
  {
    id: "dessert-2",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
    price: 9.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    dietary: ["vegetarian"],
    spiceLevel: null,
    style: null,
    ingredients: ["ladyfingers", "coffee", "mascarpone", "cocoa"],
    allergens: ["gluten", "dairy", "eggs"],
    available: true,
  },
  {
    id: "dessert-3",
    name: "Fresh Fruit Platter",
    description: "Seasonal fresh fruits artfully arranged",
    price: 7.99,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    spiceLevel: null,
    style: null,
    ingredients: ["seasonal fruits"],
    allergens: [],
    available: true,
  },
];

export interface Order {
  id: string;
  code: string;
  tableNumber: number;
  items: { dish: Dish; quantity: number; notes?: string }[];
  status: "pending" | "confirmed" | "preparing" | "ready" | "served";
  timestamp: Date;
  customerName?: string;
}

export const generateOrderCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
