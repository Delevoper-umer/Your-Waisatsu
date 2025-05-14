
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminHeader = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving changes to local storage
    setTimeout(() => {
      localStorage.setItem('adminChangesApplied', new Date().toISOString());
      setIsSaving(false);
      toast.success("Changes saved successfully!");
    }, 1500);
  };

  return (
    <header className="bg-white border-b p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-black hover:text-gray-600 transition-colors"
          >
            View Website
          </Link>
          <span className="text-gray-400">|</span>
          <h1 className="font-medium">Admin Panel</h1>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
