
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, Video, FileText, Trash2, Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerMedia = () => {
  const [mediaFiles] = useState([
    { id: 1, name: "hero-background.jpg", type: "image", size: "2.3 MB", url: "/api/placeholder/300/200", uploadDate: "2024-01-15" },
    { id: 2, name: "product-demo.mp4", type: "video", size: "45.8 MB", url: "/api/placeholder/300/200", uploadDate: "2024-01-20" },
    { id: 3, name: "company-profile.pdf", type: "document", size: "1.2 MB", url: "/api/placeholder/300/200", uploadDate: "2024-01-25" },
    { id: 4, name: "team-photo.jpg", type: "image", size: "5.1 MB", url: "/api/placeholder/300/200", uploadDate: "2024-02-01" },
    { id: 5, name: "tutorial-video.mp4", type: "video", size: "78.9 MB", url: "/api/placeholder/300/200", uploadDate: "2024-02-05" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-6 h-6" />;
      case 'video': return <Video className="w-6 h-6" />;
      case 'document': return <FileText className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const handleUpload = () => {
    toast("File uploaded successfully!");
  };

  const handleDelete = (id: number) => {
    toast("File deleted successfully!");
  };

  return (
    <DashboardLayout title="Media Library">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Media Library</h2>
                <p className="text-sm text-purple-300">Manage all media files and assets</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base text-white">Upload New Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-300 mb-4">Drop files here or click to upload</p>
              <Input type="file" multiple className="hidden" id="file-upload" />
              <Label 
                htmlFor="file-upload" 
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block"
              >
                Choose Files
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedType === "image" ? "default" : "outline"}
                  onClick={() => setSelectedType("image")}
                  size="sm"
                >
                  Images
                </Button>
                <Button
                  variant={selectedType === "video" ? "default" : "outline"}
                  onClick={() => setSelectedType("video")}
                  size="sm"
                >
                  Videos
                </Button>
                <Button
                  variant={selectedType === "document" ? "default" : "outline"}
                  onClick={() => setSelectedType("document")}
                  size="sm"
                >
                  Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="mb-4">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>
                
                <h3 className="text-sm text-white font-medium mb-1 truncate" title={file.name}>
                  {file.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{file.size}</p>
                <p className="text-gray-500 text-xs mb-4">{file.uploadDate}</p>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(file.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerMedia;
