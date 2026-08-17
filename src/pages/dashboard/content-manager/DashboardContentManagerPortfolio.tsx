
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Edit3, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with AI recommendations",
      image: "/api/placeholder/300/200",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB"],
      status: "completed"
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "AI-powered analytics dashboard for businesses",
      image: "/api/placeholder/300/200",
      category: "AI Development",
      technologies: ["Python", "TensorFlow", "React"],
      status: "in-progress"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure mobile banking application",
      image: "/api/placeholder/300/200",
      category: "Mobile Development",
      technologies: ["React Native", "Firebase"],
      status: "completed"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== id));
    toast("Portfolio item deleted successfully!");
  };

  const handleSave = () => {
    setIsEditing(false);
    setSelectedItem(null);
    toast("Portfolio item saved successfully!");
  };

  return (
    <DashboardLayout title="Portfolio Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Portfolio Management</h2>
                <p className="text-sm text-purple-300">Manage portfolio items and showcase projects</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardContent className="p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-sm text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                
                <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal Placeholder */}
        {isEditing && (
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base text-white">Edit Portfolio Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-white">Title</Label>
                <Input className="bg-white/20 border-white/30 text-white" />
              </div>
              <div>
                <Label className="text-sm text-white">Description</Label>
                <Textarea className="bg-white/20 border-white/30 text-white" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerPortfolio;
