
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import ProductsAdmin from "@/components/admin/ProductsAdmin";
import ContentAdmin from "@/components/admin/ContentAdmin";
import ThemeAdmin from "@/components/admin/ThemeAdmin";
import ModelAdmin from "@/components/admin/ModelAdmin";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <AdminHeader />
      
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>YOUR WAISATSU Admin Dashboard</CardTitle>
            <CardDescription>
              Manage your website content, products, styling, and 3D models
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="content">Text Content</TabsTrigger>
            <TabsTrigger value="theme">Theme & Fonts</TabsTrigger>
            <TabsTrigger value="models">3D Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsAdmin />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentAdmin />
          </TabsContent>
          
          <TabsContent value="theme">
            <ThemeAdmin />
          </TabsContent>
          
          <TabsContent value="models">
            <ModelAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
