
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Save, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerPages = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [pageContent, setPageContent] = useState({
    title: "Welcome to Anoneurx",
    subtitle: "Pioneering the Future of Technology",
    description: "We are a cutting-edge technology company specializing in AI development, web applications, and innovative solutions.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  });

  const pages = [
    { id: "home", name: "Home Page" },
    { id: "about", name: "About Page" },
    { id: "features", name: "Features Page" },
    { id: "collaboration", name: "Collaboration Page" },
    { id: "arcadeum", name: "Arcadeum Page" },
    { id: "portfolio", name: "Portfolio Page" },
    { id: "contact", name: "Contact Page" }
  ];

  const handleSave = () => {
    toast("Page content updated successfully!");
  };

  return (
    <DashboardLayout title="Page Editor">
      <div className="space-y-6">
        {/* Page Selection */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center">
              <Edit3 className="w-5 h-5 mr-2" />
              Page Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage === page.id ? "default" : "outline"}
                  onClick={() => setSelectedPage(page.id)}
                  className="w-full"
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base text-white">Edit {pages.find(p => p.id === selectedPage)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-white">Page Title</Label>
              <Input
                value={pageContent.title}
                onChange={(e) => setPageContent(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Subtitle</Label>
              <Input
                value={pageContent.subtitle}
                onChange={(e) => setPageContent(prev => ({ ...prev, subtitle: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Description</Label>
              <Textarea
                value={pageContent.description}
                onChange={(e) => setPageContent(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
                rows={4}
              />
            </div>
            
            <div>
              <Label className="text-white">Hero Image URL</Label>
              <Input
                value={pageContent.heroImage}
                onChange={(e) => setPageContent(prev => ({ ...prev, heroImage: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerPages;
