
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Default 3D model parameters
const defaultModelParams = {
  type: 'box',
  color: '#ffffff',
  rotationSpeed: 0.01,
  geometry: {
    width: 2,
    height: 3,
    depth: 0.2
  }
};

const ModelAdmin = () => {
  const [modelParams, setModelParams] = useState(() => {
    const savedParams = localStorage.getItem('waisatsu-3d-model');
    return savedParams ? JSON.parse(savedParams) : defaultModelParams;
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setModelParams({
        ...modelParams,
        [parent]: {
          ...modelParams[parent as keyof typeof modelParams],
          [child]: name.includes('rotation') || name.includes('Speed') ? parseFloat(value) : value
        }
      });
    } else {
      setModelParams({
        ...modelParams,
        [name]: name.includes('rotation') || name.includes('Speed') ? parseFloat(value) : value
      });
    }
    
    setIsDirty(true);
  };

  const handleTypeChange = (value: string) => {
    setModelParams({
      ...modelParams,
      type: value
    });
    setIsDirty(true);
  };

  const handleApply = () => {
    localStorage.setItem('waisatsu-3d-model', JSON.stringify(modelParams));
    toast.success("3D model parameters applied");
    setIsDirty(false);
    
    // Force page reload to apply the changes
    if (window.confirm("The page needs to reload to apply the changes. Proceed?")) {
      window.location.reload();
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the 3D model to default settings?")) {
      setModelParams(defaultModelParams);
      localStorage.removeItem('waisatsu-3d-model');
      setIsDirty(true);
      toast.info("3D model reset to defaults");
    }
  };

  useEffect(() => {
    // When component mounts, check if there are unsaved changes
    const savedParams = localStorage.getItem('waisatsu-3d-model');
    if (savedParams) {
      const parsedParams = JSON.parse(savedParams);
      setIsDirty(JSON.stringify(parsedParams) !== JSON.stringify(modelParams));
    }
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">3D Model Editor</h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleReset}>Reset to Default</Button>
            <Button onClick={handleApply} disabled={!isDirty}>Apply Changes</Button>
          </div>
        </div>

        <Tabs defaultValue={modelParams.type}>
          <TabsList className="mb-6">
            <TabsTrigger 
              value="box" 
              onClick={() => handleTypeChange('box')}
            >
              Box Model
            </TabsTrigger>
            <TabsTrigger 
              value="torus" 
              onClick={() => handleTypeChange('torus')}
            >
              Torus Model
            </TabsTrigger>
            <TabsTrigger 
              value="cylinder" 
              onClick={() => handleTypeChange('cylinder')}
            >
              Cylinder Model
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              onClick={() => handleTypeChange('custom')}
            >
              Custom Model
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="box" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="geometry.width">Width</Label>
                <Input
                  id="geometry.width"
                  name="geometry.width"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.width}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="geometry.height">Height</Label>
                <Input
                  id="geometry.height"
                  name="geometry.height"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.height}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="geometry.depth">Depth</Label>
                <Input
                  id="geometry.depth"
                  name="geometry.depth"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.depth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="torus" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="geometry.radius">Radius</Label>
                <Input
                  id="geometry.radius"
                  name="geometry.radius"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.radius || 1.5}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="geometry.tube">Tube</Label>
                <Input
                  id="geometry.tube"
                  name="geometry.tube"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.tube || 0.5}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cylinder" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="geometry.radiusTop">Top Radius</Label>
                <Input
                  id="geometry.radiusTop"
                  name="geometry.radiusTop"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.radiusTop || 1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="geometry.radiusBottom">Bottom Radius</Label>
                <Input
                  id="geometry.radiusBottom"
                  name="geometry.radiusBottom"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.radiusBottom || 1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="geometry.height">Height</Label>
                <Input
                  id="geometry.height"
                  name="geometry.height"
                  type="number"
                  step="0.1"
                  value={modelParams.geometry.height || 3}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div>
              <Label htmlFor="customModelUrl">Custom 3D Model URL (GLTF/GLB)</Label>
              <Input
                id="customModelUrl"
                name="customModelUrl"
                placeholder="https://example.com/model.glb"
                value={modelParams.customModelUrl || ''}
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Note: Custom model support requires additional libraries. Adding URL only won't load model directly.
              </p>
            </div>
          </TabsContent>
          
          <div className="mt-6 border-t pt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Model Appearance</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="color">Material Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colorPicker"
                      name="color"
                      type="color"
                      value={modelParams.color}
                      onChange={handleInputChange}
                      className="w-14 h-10"
                    />
                    <Input
                      id="color"
                      name="color"
                      value={modelParams.color}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="shininess">Material Shininess</Label>
                  <Input
                    id="shininess"
                    name="shininess"
                    type="number"
                    min="0"
                    max="100"
                    value={modelParams.shininess || 30}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Animation Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rotationSpeed">Rotation Speed</Label>
                  <Input
                    id="rotationSpeed"
                    name="rotationSpeed"
                    type="number"
                    step="0.001"
                    min="0"
                    max="0.1"
                    value={modelParams.rotationSpeed}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rotationX">X-axis Rotation</Label>
                    <Input
                      id="rotationX"
                      name="rotationX"
                      type="number"
                      step="0.01"
                      value={modelParams.rotationX || 0}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rotationY">Y-axis Rotation</Label>
                    <Input
                      id="rotationY"
                      name="rotationY"
                      type="number"
                      step="0.01"
                      value={modelParams.rotationY || 0.01}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rotationZ">Z-axis Rotation</Label>
                    <Input
                      id="rotationZ"
                      name="rotationZ"
                      type="number"
                      step="0.01"
                      value={modelParams.rotationZ || 0}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>

        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-700">
            These settings control the 3D model displayed on your website's hero section. Changing these parameters may impact performance on lower-end devices. Use the "Apply Changes" button to see how your model looks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelAdmin;
