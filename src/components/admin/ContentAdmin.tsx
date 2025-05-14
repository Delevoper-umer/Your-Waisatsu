
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Default website content
const defaultContent = {
  hero: {
    heading: "YOUR WAISATSU",
    subheading: "Premium minimalist streetwear for the modern individual",
    buttonText: "Explore Collection"
  },
  products: {
    heading: "Our Products",
    description: "Discover our collection of premium, minimalist t-shirts designed for the modern individual.",
    buttonText: "View All Products"
  },
  about: {
    heading: "About Us",
    title: "Premium Quality Minimalist Designs",
    paragraph1: "YOUR WAISATSU represents the fusion of minimalist aesthetics with premium craftsmanship. Founded in 2023, we've made it our mission to create t-shirts that embody understated luxury and timeless design.",
    paragraph2: "Each garment is meticulously crafted using only the finest cotton, ensuring unmatched comfort and durability. Our commitment to ethical manufacturing and sustainable practices makes us a conscious choice for the modern individual.",
    feature1: "Premium Materials",
    feature2: "Sustainable Production"
  },
  contact: {
    heading: "Contact Us",
    address: "123 Fashion Street, Design District",
    city: "New York, NY 10001",
    email: "info@yourwaisatsu.com",
    phone: "+1 (555) 123-4567",
    formHeading: "Send us a message",
    buttonText: "Send Message"
  },
  footer: {
    copyright: "© 2023 YOUR WAISATSU. All rights reserved."
  }
};

const ContentAdmin = () => {
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('waisatsu-content');
    return savedContent ? JSON.parse(savedContent) : defaultContent;
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('waisatsu-content', JSON.stringify(content));
  }, [content]);

  const updateSection = (section: string, updates: Record<string, any>) => {
    setContent({
      ...content,
      [section]: {
        ...content[section as keyof typeof content],
        ...updates
      }
    });
  };

  const handleSave = () => {
    localStorage.setItem('waisatsu-content', JSON.stringify(content));
    toast.success("Content saved successfully");
  };

  const handleReset = (section: string) => {
    if (window.confirm("Are you sure you want to reset this section to default content?")) {
      setContent({
        ...content,
        [section]: defaultContent[section as keyof typeof defaultContent]
      });
      toast.info(`${section.charAt(0).toUpperCase() + section.slice(1)} section reset to default`);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Website Content</h2>
          <Button onClick={handleSave}>Save All Changes</Button>
        </div>

        <Tabs defaultValue="hero">
          <TabsList className="mb-6">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="products">Products Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="contact">Contact Section</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero" className="space-y-4">
            <div>
              <Label htmlFor="heroHeading">Main Heading</Label>
              <Input 
                id="heroHeading" 
                value={content.hero.heading} 
                onChange={(e) => updateSection('hero', { heading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="heroSubheading">Subheading</Label>
              <Input 
                id="heroSubheading" 
                value={content.hero.subheading} 
                onChange={(e) => updateSection('hero', { subheading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="heroButtonText">Button Text</Label>
              <Input 
                id="heroButtonText" 
                value={content.hero.buttonText} 
                onChange={(e) => updateSection('hero', { buttonText: e.target.value })} 
              />
            </div>
            <Button variant="outline" onClick={() => handleReset('hero')}>Reset to Default</Button>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <div>
              <Label htmlFor="productsHeading">Section Heading</Label>
              <Input 
                id="productsHeading" 
                value={content.products.heading} 
                onChange={(e) => updateSection('products', { heading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="productsDescription">Description</Label>
              <Textarea 
                id="productsDescription" 
                value={content.products.description} 
                onChange={(e) => updateSection('products', { description: e.target.value })} 
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="productsButtonText">Button Text</Label>
              <Input 
                id="productsButtonText" 
                value={content.products.buttonText} 
                onChange={(e) => updateSection('products', { buttonText: e.target.value })} 
              />
            </div>
            <Button variant="outline" onClick={() => handleReset('products')}>Reset to Default</Button>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-4">
            <div>
              <Label htmlFor="aboutHeading">Section Heading</Label>
              <Input 
                id="aboutHeading" 
                value={content.about.heading} 
                onChange={(e) => updateSection('about', { heading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="aboutTitle">Title</Label>
              <Input 
                id="aboutTitle" 
                value={content.about.title} 
                onChange={(e) => updateSection('about', { title: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="aboutParagraph1">First Paragraph</Label>
              <Textarea 
                id="aboutParagraph1" 
                value={content.about.paragraph1} 
                onChange={(e) => updateSection('about', { paragraph1: e.target.value })} 
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="aboutParagraph2">Second Paragraph</Label>
              <Textarea 
                id="aboutParagraph2" 
                value={content.about.paragraph2} 
                onChange={(e) => updateSection('about', { paragraph2: e.target.value })} 
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="feature1">Feature 1</Label>
                <Input 
                  id="feature1" 
                  value={content.about.feature1} 
                  onChange={(e) => updateSection('about', { feature1: e.target.value })} 
                />
              </div>
              <div>
                <Label htmlFor="feature2">Feature 2</Label>
                <Input 
                  id="feature2" 
                  value={content.about.feature2} 
                  onChange={(e) => updateSection('about', { feature2: e.target.value })} 
                />
              </div>
            </div>
            <Button variant="outline" onClick={() => handleReset('about')}>Reset to Default</Button>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <div>
              <Label htmlFor="contactHeading">Section Heading</Label>
              <Input 
                id="contactHeading" 
                value={content.contact.heading} 
                onChange={(e) => updateSection('contact', { heading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactAddress">Address</Label>
              <Input 
                id="contactAddress" 
                value={content.contact.address} 
                onChange={(e) => updateSection('contact', { address: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactCity">City</Label>
              <Input 
                id="contactCity" 
                value={content.contact.city} 
                onChange={(e) => updateSection('contact', { city: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input 
                id="contactEmail" 
                value={content.contact.email} 
                onChange={(e) => updateSection('contact', { email: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone</Label>
              <Input 
                id="contactPhone" 
                value={content.contact.phone} 
                onChange={(e) => updateSection('contact', { phone: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactFormHeading">Form Heading</Label>
              <Input 
                id="contactFormHeading" 
                value={content.contact.formHeading} 
                onChange={(e) => updateSection('contact', { formHeading: e.target.value })} 
              />
            </div>
            <div>
              <Label htmlFor="contactButtonText">Button Text</Label>
              <Input 
                id="contactButtonText" 
                value={content.contact.buttonText} 
                onChange={(e) => updateSection('contact', { buttonText: e.target.value })} 
              />
            </div>
            <Button variant="outline" onClick={() => handleReset('contact')}>Reset to Default</Button>
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-4">
            <div>
              <Label htmlFor="footerCopyright">Copyright Text</Label>
              <Input 
                id="footerCopyright" 
                value={content.footer.copyright} 
                onChange={(e) => updateSection('footer', { copyright: e.target.value })} 
              />
            </div>
            <Button variant="outline" onClick={() => handleReset('footer')}>Reset to Default</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentAdmin;
