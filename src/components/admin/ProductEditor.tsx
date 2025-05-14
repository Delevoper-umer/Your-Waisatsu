
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  colors: string[];
}

interface ProductEditorProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditor = ({ product, onSave, onCancel }: ProductEditorProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>({...product});
  const [newColor, setNewColor] = useState("#000000");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setEditedProduct({
      ...editedProduct,
      [name]: name === "price" ? parseFloat(value) : value
    });
  };
  
  const addColor = () => {
    if (!editedProduct.colors.includes(newColor)) {
      setEditedProduct({
        ...editedProduct,
        colors: [...editedProduct.colors, newColor]
      });
    }
  };
  
  const removeColor = (colorToRemove: string) => {
    setEditedProduct({
      ...editedProduct,
      colors: editedProduct.colors.filter(color => color !== colorToRemove)
    });
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={editedProduct.name} 
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price" 
            name="price" 
            type="number" 
            step="0.01" 
            value={editedProduct.price} 
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image">Main Image URL</Label>
          <Input 
            id="image" 
            name="image" 
            value={editedProduct.image} 
            onChange={handleInputChange}
          />
          {editedProduct.image && (
            <div className="mt-2 relative w-32 h-40 bg-gray-100">
              <img 
                src={editedProduct.image} 
                alt="Product preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="hoverImage">Hover Image URL (Optional)</Label>
          <Input 
            id="hoverImage" 
            name="hoverImage" 
            value={editedProduct.hoverImage || ''} 
            onChange={handleInputChange}
          />
          {editedProduct.hoverImage && (
            <div className="mt-2 relative w-32 h-40 bg-gray-100">
              <img 
                src={editedProduct.hoverImage} 
                alt="Hover preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Colors</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {editedProduct.colors.map((color, index) => (
            <div 
              key={`${color}-${index}`} 
              className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
            >
              <div 
                className="w-4 h-4 rounded-full border border-gray-300" 
                style={{ backgroundColor: color }} 
              />
              <span className="text-xs">{color}</span>
              <button 
                type="button"
                onClick={() => removeColor(color)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <Input 
            type="color" 
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-14 h-10"
          />
          <Input 
            type="text" 
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
          <Button type="button" onClick={addColor}>Add Color</Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(editedProduct)}>
          Save Product
        </Button>
      </div>
    </div>
  );
};

export default ProductEditor;
