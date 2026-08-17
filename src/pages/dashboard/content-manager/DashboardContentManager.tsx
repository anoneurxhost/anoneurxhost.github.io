import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Edit3, Upload, Save, Trash2, Plus, DollarSign,
  Image, FileText, Briefcase, Target, Users, Settings
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const DashboardContentManager = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [prices, setPrices] = useState({
    featuresBasic: 99,
    featuresPro: 299,
    featuresEnterprise: 599,
    collaborationBasic: 199,
    collaborationPro: 499,
    collaborationEnterprise: 999
  });

  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, title: "E-Commerce Platform", image: "/api/placeholder/300/200", description: "Modern e-commerce solution" },
    { id: 2, title: "AI Dashboard", image: "/api/placeholder/300/200", description: "AI-powered analytics dashboard" },
    { id: 3, title: "Mobile App", image: "/api/placeholder/300/200", description: "Cross-platform mobile application" }
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", status: "In Progress", image: "/api/placeholder/300/200" },
    { id: 2, name: "Project Beta", status: "Planning", image: "/api/placeholder/300/200" },
    { id: 3, name: "Project Gamma", status: "Completed", image: "/api/placeholder/300/200" }
  ]);

  const handleSavePrice = (priceType: string, value: number) => {
    setPrices(prev => ({ ...prev, [priceType]: value }));
    toast(`${priceType} price updated to $${value}`);
  };

  const handleEditContent = (content: any) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleSaveContent = () => {
    toast("Content updated successfully!");
    setIsEditModalOpen(false);
    setSelectedContent(null);
  };

  const handleDeleteItem = (id: number, type: string) => {
    if (type === 'portfolio') {
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
    } else if (type === 'project') {
      setProjects(prev => prev.filter(item => item.id !== id));
    }
    toast(`${type} item deleted successfully!`);
  };

  return (
    <DashboardLayout title="Content Manager Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Content Management System
                </h2>
                <p className="text-sm text-purple-300">
                  Manage website content, portfolio, projects, and pricing
                </p>
              </div>
              <Edit3 className="w-16 h-16 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 bg-black/20">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="arcadeum">Arcadeum</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Portfolio Management */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white">Portfolio Management</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Portfolio Item
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="bg-white/10 border-gray-700 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-sm text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditContent(item)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteItem(item.id, 'portfolio')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Management */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white">Projects Management</h3>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/10 border-gray-700 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-sm text-white font-semibold mb-2">{project.name}</h4>
                    <Badge variant="secondary" className="mb-4">{project.status}</Badge>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditContent(project)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteItem(project.id, 'project')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Arcadeum Management */}
          <TabsContent value="arcadeum" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Arcadeum Page Management</h3>
            
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base text-white">Arcadeum Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-white">Hero Title</Label>
                  <Input 
                    className="bg-white/20 border-white/30 text-white"
                    defaultValue="Welcome to Arcadeum"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Description</Label>
                  <Textarea 
                    className="bg-white/20 border-white/30 text-white"
                    defaultValue="Experience the future of gaming..."
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Hero Image</Label>
                  <Input 
                    type="file"
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Pricing */}
          <TabsContent value="features" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Features Page Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Basic Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.featuresBasic}
                      onChange={(e) => setPrices(prev => ({ ...prev, featuresBasic: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSavePrice('featuresBasic', prices.featuresBasic)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Pro Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.featuresPro}
                      onChange={(e) => setPrices(prev => ({ ...prev, featuresPro: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSavePrice('featuresPro', prices.featuresPro)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Enterprise Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.featuresEnterprise}
                      onChange={(e) => setPrices(prev => ({ ...prev, featuresEnterprise: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSavePrice('featuresEnterprise', prices.featuresEnterprise)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Collaboration Pricing */}
          <TabsContent value="collaboration" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Collaboration Page Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Basic Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.collaborationBasic}
                      onChange={(e) => setPrices(prev => ({ ...prev, collaborationBasic: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleSavePrice('collaborationBasic', prices.collaborationBasic)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Pro Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.collaborationPro}
                      onChange={(e) => setPrices(prev => ({ ...prev, collaborationPro: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleSavePrice('collaborationPro', prices.collaborationPro)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-base text-white">Enterprise Collaboration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-white">Price ($)</Label>
                    <Input 
                      type="number"
                      value={prices.collaborationEnterprise}
                      onChange={(e) => setPrices(prev => ({ ...prev, collaborationEnterprise: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleSavePrice('collaborationEnterprise', prices.collaborationEnterprise)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blogs Management */}
          <TabsContent value="blogs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white">Blog Content Management</h3>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </div>

            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base text-white">Markdown Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-white">Blog Title</Label>
                  <Input
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter blog post title..."
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Content (Markdown)</Label>
                  <div className="border border-white/30 rounded-md overflow-hidden">
                    <MDEditor
                      value={markdownContent}
                      onChange={(val) => setMarkdownContent(val || '')}
                      preview="edit"
                      hideToolbar={false}
                      visibleDragbar={false}
                      data-color-mode="dark"
                      textareaProps={{
                        placeholder: 'Start writing your blog post in Markdown...',
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Blog Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Toggle preview mode
                      const editor = document.querySelector('.w-md-editor') as HTMLElement;
                      if (editor) {
                        const previewBtn = editor.querySelector('[data-name="preview"]') as HTMLElement;
                        if (previewBtn) previewBtn.click();
                      }
                    }}
                  >
                    Toggle Preview
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Clear content
                      setMarkdownContent('');
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white">Team Content Management</h3>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base text-white">Team Member Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-white">Name</Label>
                    <Input
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="Enter team member name..."
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Role</Label>
                    <Input
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="Enter role/title..."
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-white">Department</Label>
                  <Input
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter department..."
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Bio</Label>
                  <Textarea
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter team member bio..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-white">Experience</Label>
                    <Input
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="e.g., 5 years"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-white">Education</Label>
                    <Input
                      className="bg-white/20 border-white/30 text-white"
                      placeholder="e.g., MS Computer Science"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-white">Expertise (comma-separated)</Label>
                  <Input
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="e.g., React, Node.js, AI"
                  />
                </div>
                <div>
                  <Label className="text-sm text-white">Profile Image URL</Label>
                  <Input
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter image URL..."
                  />
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Team Member
                  </Button>
                  <Button variant="outline">
                    Clear Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Library */}
          <TabsContent value="media" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-white">Media Library</h3>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
            </div>

            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-300 mb-4">Drop files here or click to upload</p>
                  <Input type="file" multiple className="hidden" id="file-upload" />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Choose Files
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="bg-black/90 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-white">Title</Label>
                <Input 
                  className="bg-white/20 border-white/30 text-white"
                  defaultValue={selectedContent?.title || selectedContent?.name || ""}
                />
              </div>
              <div>
                <Label className="text-sm text-white">Description</Label>
                <Textarea 
                  className="bg-white/20 border-white/30 text-white"
                  defaultValue={selectedContent?.description || ""}
                />
              </div>
              <div>
                <Label className="text-sm text-white">Image URL</Label>
                <Input 
                  className="bg-white/20 border-white/30 text-white"
                  defaultValue={selectedContent?.image || ""}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveContent}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManager;
