
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import ProductEditor from "./ProductEditor";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  colors: string[];
}

const ProductsAdmin = () => {
  // Initial products data from the Products component
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'tshirt-1',
      name: 'Minimalist Black Tee',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      colors: ['#000000', '#FFFFFF', '#555555']
    },
    {
      id: 'tshirt-2',
      name: 'Essential White Tee',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      colors: ['#FFFFFF', '#000000', '#CCCCCC']
    },
    {
      id: 'tshirt-3',
      name: 'Signature Logo Tee',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      colors: ['#333333', '#FFFFFF', '#000000']
    },
    {
      id: 'tshirt-4',
      name: 'Oversized Premium Tee',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      colors: ['#000000', '#555555', '#FFFFFF']
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddNew = () => {
    const newProduct: Product = {
      id: `tshirt-${products.length + 1}`,
      name: 'New T-Shirt',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
      hoverImage: '',
      colors: ['#000000']
    };
    setSelectedProduct(newProduct);
    setDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleSave = (product: Product) => {
    if (products.find(p => p.id === product.id)) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast.success("Product updated successfully");
    } else {
      // Add new product
      setProducts([...products, product]);
      toast.success("Product added successfully");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  // Update local storage on product changes
  useState(() => {
    localStorage.setItem('waisatsu-products', JSON.stringify(products));
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Products</h2>
          <Button onClick={handleAddNew}>Add New Product</Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Colors</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.image} alt={product.name} className="w-16 h-20 object-cover" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {product.colors.map((color, idx) => (
                        <div 
                          key={idx} 
                          className="w-4 h-4 rounded-full border border-gray-300" 
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct && products.find(p => p.id === selectedProduct.id) ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                Make changes to the product information below.
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <ProductEditor 
                product={selectedProduct} 
                onSave={handleSave} 
                onCancel={() => setDialogOpen(false)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductsAdmin;
