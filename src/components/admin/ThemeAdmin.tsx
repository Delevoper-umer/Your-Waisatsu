
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

const sampleFonts = [
  { name: "Montserrat", value: "font-montserrat" },
  { name: "Roboto", value: "font-roboto" },
  { name: "Default", value: "font-sans" },
];

const ThemeAdmin = () => {
  const [primaryColor, setPrimaryColor] = useState("#0a0a0a");
  const [accentColor, setAccentColor] = useState("#18181b");
  const [textColor, setTextColor] = useState("#ffffff");
  const [secondaryTextColor, setSecondaryTextColor] = useState("#cccccc");
  const [selectedFont, setSelectedFont] = useState("font-sans");
  const [customFontUrl, setCustomFontUrl] = useState("");
  const [customFontName, setCustomFontName] = useState("");

  const handleApplyTheme = () => {
    const theme = {
      primaryColor,
      accentColor,
      textColor,
      secondaryTextColor,
      font: selectedFont,
      customFont: {
        url: customFontUrl,
        name: customFontName
      }
    };
    
    // Save theme to local storage
    localStorage.setItem('waisatsu-theme', JSON.stringify(theme));
    
    // Apply theme immediately
    document.documentElement.style.setProperty('--theme-primary', primaryColor);
    document.documentElement.style.setProperty('--theme-accent', accentColor);
    document.documentElement.style.setProperty('--theme-text', textColor);
    document.documentElement.style.setProperty('--theme-text-secondary', secondaryTextColor);
    
    if (customFontUrl && customFontName) {
      // Create a new link element for the custom font
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = customFontUrl;
      document.head.appendChild(fontLink);
    }
    
    toast.success("Theme applied successfully!");
  };

  const handleResetTheme = () => {
    setPrimaryColor("#0a0a0a");
    setAccentColor("#18181b");
    setTextColor("#ffffff");
    setSecondaryTextColor("#cccccc");
    setSelectedFont("font-sans");
    setCustomFontUrl("");
    setCustomFontName("");
    localStorage.removeItem('waisatsu-theme');
    toast.info("Theme reset to defaults");
  };

  const sampleText = "The quick brown fox jumps over the lazy dog";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Theme & Fonts</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleResetTheme}>Reset to Default</Button>
            <Button onClick={handleApplyTheme}>Apply Theme</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Primary Color (Background)</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="w-14 h-10"
                />
                <Input 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                />
              </div>
            </div>
            
            <div>
              <Label>Accent Color (Secondary Background)</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)} 
                  className="w-14 h-10"
                />
                <Input 
                  type="text" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)} 
                />
              </div>
            </div>
            
            <div>
              <Label>Primary Text Color</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)} 
                  className="w-14 h-10"
                />
                <Input 
                  type="text" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)} 
                />
              </div>
            </div>
            
            <div>
              <Label>Secondary Text Color</Label>
              <div className="flex gap-2">
                <Input 
                  type="color" 
                  value={secondaryTextColor} 
                  onChange={(e) => setSecondaryTextColor(e.target.value)} 
                  className="w-14 h-10"
                />
                <Input 
                  type="text" 
                  value={secondaryTextColor} 
                  onChange={(e) => setSecondaryTextColor(e.target.value)} 
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Select Font</Label>
              <ToggleGroup type="single" value={selectedFont} onValueChange={(value) => {
                if (value) setSelectedFont(value);
              }}>
                {sampleFonts.map((font) => (
                  <ToggleGroupItem
                    key={font.value}
                    value={font.value}
                    className={`${font.value} px-4 py-2`}
                  >
                    {font.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div>
              <Label className="mb-2 block">Custom Font</Label>
              <div className="grid gap-2">
                <Input 
                  placeholder="Google Fonts URL (e.g., https://fonts.googleapis.com/css2?family=...)" 
                  value={customFontUrl} 
                  onChange={(e) => setCustomFontUrl(e.target.value)}
                />
                <Input 
                  placeholder="Font name (e.g., 'Playfair Display')" 
                  value={customFontName} 
                  onChange={(e) => setCustomFontName(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  disabled={!customFontUrl || !customFontName}
                  onClick={() => {
                    // Create a custom font value
                    const customValue = `custom-font-${customFontName.toLowerCase().replace(/\s+/g, '-')}`;
                    setSelectedFont(customValue);
                    toast.info(`Custom font "${customFontName}" selected`);
                  }}
                >
                  Use Custom Font
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Example: https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap
              </p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md mt-4">
              <Label className="mb-2 block">Preview</Label>
              <div 
                className={`${selectedFont} space-y-2`}
                style={{
                  color: textColor,
                  backgroundColor: primaryColor,
                  padding: "20px",
                  borderRadius: "8px"
                }}
              >
                <h3 className="text-xl font-bold">Heading Text</h3>
                <p style={{ color: secondaryTextColor }}>{sampleText}</p>
                <button
                  className="px-4 py-2 rounded"
                  style={{
                    backgroundColor: accentColor,
                    color: textColor
                  }}
                >
                  Button Example
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeAdmin;
