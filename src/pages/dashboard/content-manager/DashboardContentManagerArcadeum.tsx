
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Save, Upload, Image, Video, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerArcadeum = () => {
  const [arcadeumContent, setArcadeumContent] = useState({
    heroTitle: "Welcome to Arcadeum",
    heroSubtitle: "Next Generation Gaming & Learning Platform",
    heroDescription: "Experience the future of interactive learning through cutting-edge gaming technology and immersive educational experiences.",
    heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3",
    features: [
      {
        title: "Virtual Reality Learning",
        description: "Immerse yourself in virtual worlds designed for education",
        icon: "🥽"
      },
      {
        title: "AI-Powered Tutoring",
        description: "Personalized learning with artificial intelligence",
        icon: "🤖"
      },
      {
        title: "Gamified Courses",
        description: "Learn through engaging game mechanics",
        icon: "🎮"
      }
    ],
    about: "Arcadeum represents the convergence of gaming and education, creating an unprecedented learning experience that engages students through interactive gameplay while delivering comprehensive educational content."
  });

  const [galleryItems, setGalleryItems] = useState([
    { id: 1, type: "image", url: "/api/placeholder/400/300", title: "VR Classroom Experience" },
    { id: 2, type: "video", url: "/api/placeholder/400/300", title: "AI Tutor Demo" },
    { id: 3, type: "image", url: "/api/placeholder/400/300", title: "Game-based Learning" },
  ]);

  const handleSaveContent = () => {
    toast("Arcadeum content updated successfully!");
  };

  const handleContentChange = (field: string, value: string) => {
    setArcadeumContent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout title="Arcadeum Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Arcadeum Management</h2>
                <p className="text-purple-300">Manage Arcadeum page content and media</p>
              </div>
              <GraduationCap className="w-16 h-16 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        {/* Content Management Tabs */}
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-black/20">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="gallery">Media Gallery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Hero Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white">Hero Title</Label>
                  <Input
                    value={arcadeumContent.heroTitle}
                    onChange={(e) => handleContentChange('heroTitle', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Hero Subtitle</Label>
                  <Input
                    value={arcadeumContent.heroSubtitle}
                    onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-white">Hero Description</Label>
                  <Textarea
                    value={arcadeumContent.heroDescription}
                    onChange={(e) => handleContentChange('heroDescription', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label className="text-white">Hero Background Image URL</Label>
                  <Input
                    value={arcadeumContent.heroImage}
                    onChange={(e) => handleContentChange('heroImage', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>

                <Button onClick={handleSaveContent} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Features Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {arcadeumContent.features.map((feature, index) => (
                  <div key={index} className="border border-white/20 rounded-lg p-4 space-y-4">
                    <div>
                      <Label className="text-white">Feature Title</Label>
                      <Input
                        value={feature.title}
                        className="bg-white/20 border-white/30 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Feature Description</Label>
                      <Textarea
                        value={feature.description}
                        className="bg-white/20 border-white/30 text-white"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-white">Icon Emoji</Label>
                      <Input
                        value={feature.icon}
                        className="bg-white/20 border-white/30 text-white"
                      />
                    </div>
                  </div>
                ))}
                
                <Button onClick={handleSaveContent} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Features
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Gallery */}
          <TabsContent value="gallery">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Media Gallery
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          {item.type === 'video' ? (
                            <Video className="w-6 h-6 text-white bg-black/50 rounded p-1" />
                          ) : (
                            <Image className="w-6 h-6 text-white bg-black/50 rounded p-1" />
                          )}
                        </div>
                      </div>
                      <p className="text-white text-sm">{item.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Arcadeum Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white">About Section</Label>
                  <Textarea
                    value={arcadeumContent.about}
                    onChange={(e) => handleContentChange('about', e.target.value)}
                    className="bg-white/20 border-white/30 text-white"
                    rows={4}
                  />
                </div>

                <Button onClick={handleSaveContent} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerArcadeum;
