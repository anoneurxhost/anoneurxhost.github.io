
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Download, ExternalLink, Search, Filter, FileText, Video, Link as LinkIcon, Globe } from "lucide-react";

const DashboardStudentResources = () => {
  const resources = [
    {
      id: 1,
      title: "AI Development Guide",
      type: "document",
      category: "AI/ML",
      description: "Comprehensive guide to artificial intelligence development",
      size: "2.5 MB",
      downloadCount: 1250,
      rating: 4.8,
      lastUpdated: "2024-06-15"
    },
    {
      id: 2,
      title: "React Best Practices",
      type: "video",
      category: "Web Development",
      description: "Video series covering React development best practices",
      duration: "2h 45m",
      downloadCount: 890,
      rating: 4.9,
      lastUpdated: "2024-06-10"
    },
    {
      id: 3,
      title: "Research Methodology Handbook",
      type: "document",
      category: "Research",
      description: "Essential guide for conducting academic research",
      size: "1.8 MB",
      downloadCount: 675,
      rating: 4.7,
      lastUpdated: "2024-06-08"
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      type: "link",
      category: "Cybersecurity",
      description: "External course on cybersecurity basics",
      url: "https://example.com/cybersecurity",
      rating: 4.6,
      lastUpdated: "2024-06-12"
    }
  ];

  const categories = [
    { name: "All", count: 25, color: "bg-gray-600" },
    { name: "AI/ML", count: 8, color: "bg-blue-600" },
    { name: "Web Development", count: 6, color: "bg-green-600" },
    { name: "Cybersecurity", count: 4, color: "bg-red-600" },
    { name: "Research", count: 4, color: "bg-purple-600" },
    { name: "Blockchain", count: 3, color: "bg-yellow-600" }
  ];

  const quickLinks = [
    { title: "Library Portal", url: "#", icon: BookOpen },
    { title: "Online Courses", url: "#", icon: Video },
    { title: "Research Database", url: "#", icon: FileText },
    { title: "Academic Resources", url: "#", icon: Globe }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document": return FileText;
      case "video": return Video;
      case "link": return LinkIcon;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document": return "bg-blue-600";
      case "video": return "bg-purple-600";
      case "link": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <DashboardLayout title="Resources">
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card className="bg-white/10 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search resources..."
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col space-y-2 hover:bg-white/10"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm">{link.title}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resources List */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Available Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource) => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div key={resource.id} className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${getTypeColor(resource.type)}`}>
                          <TypeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold text-lg">{resource.title}</h3>
                            <Badge variant="outline" className="text-gray-300">
                              {resource.category}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            {resource.size && (
                              <span>Size: {resource.size}</span>
                            )}
                            {resource.duration && (
                              <span>Duration: {resource.duration}</span>
                            )}
                            <span>Downloads: {resource.downloadCount}</span>
                            <span>Rating: ⭐ {resource.rating}</span>
                            <span>Updated: {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {resource.type === "link" ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resource Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-3xl font-bold text-white mb-2">25</p>
              <p className="text-gray-300">Total Resources</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-3xl font-bold text-white mb-2">147</p>
              <p className="text-gray-300">Downloads This Month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6 text-center">
              <Video className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <p className="text-3xl font-bold text-white mb-2">18h</p>
              <p className="text-gray-300">Video Content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStudentResources;
