
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Search,
  Folder,
  File,
  Image,
  FileSpreadsheet,
  Calendar,
  User
} from "lucide-react";

const DashboardHRDocuments = () => {
  const [documents] = useState([
    {
      id: 1,
      name: "Employee Handbook 2024.pdf",
      type: "PDF",
      category: "Policy",
      uploadedBy: "HR Admin",
      uploadDate: "2024-01-15",
      size: "2.5 MB",
      status: "Active"
    },
    {
      id: 2,
      name: "Salary Structure.xlsx",
      type: "Excel",
      category: "Payroll",
      uploadedBy: "Finance Team",
      uploadDate: "2024-01-10",
      size: "1.2 MB",
      status: "Active"
    },
    {
      id: 3,
      name: "Leave Policy Guidelines.docx",
      type: "Word",
      category: "Policy",
      uploadedBy: "HR Manager",
      uploadDate: "2024-01-08",
      size: "856 KB",
      status: "Draft"
    },
    {
      id: 4,
      name: "Performance Review Template.pdf",
      type: "PDF",
      category: "Templates",
      uploadedBy: "HR Admin",
      uploadDate: "2024-01-05",
      size: "1.8 MB",
      status: "Active"
    }
  ]);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-400" />;
      case 'excel': return <FileSpreadsheet className="w-6 h-6 text-green-400" />;
      case 'word': return <File className="w-6 h-6 text-blue-400" />;
      case 'image': return <Image className="w-6 h-6 text-purple-400" />;
      default: return <File className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "Draft": return "bg-yellow-600";
      case "Archived": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <>
      <DashboardLayout title="HR Management - Documents">
        <div className="space-y-6">
          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="documents">Document Library</TabsTrigger>
              <TabsTrigger value="upload">Upload Documents</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="archives">Archives</TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <div className="space-y-6">
                {/* Search and Filter */}
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search documents..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Categories</option>
                        <option>Policy</option>
                        <option>Payroll</option>
                        <option>Templates</option>
                        <option>Contracts</option>
                      </select>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Types</option>
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>Word</option>
                        <option>Image</option>
                      </select>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-bold text-lg">245</p>
                          <p className="text-gray-300 text-sm">Total Documents</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Folder className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-bold text-lg">12</p>
                          <p className="text-gray-300 text-sm">Categories</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Upload className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white font-bold text-lg">23</p>
                          <p className="text-gray-300 text-sm">This Month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-bold text-lg">1.2K</p>
                          <p className="text-gray-300 text-sm">Total Views</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Documents List */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Document Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {getFileIcon(doc.type)}
                              <div className="flex-1">
                                <h4 className="text-white font-semibold">{doc.name}</h4>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                                  <span>{doc.category}</span>
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <User className="w-3 h-3" />
                                    <span>{doc.uploadedBy}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{doc.uploadDate}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge className={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Upload New Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white mb-2">Drag and drop files here, or click to browse</p>
                      <p className="text-gray-400 text-sm">Supports: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)</p>
                      <Button className="mt-4">Browse Files</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm">Document Category</label>
                        <select className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white mt-1">
                          <option>Policy</option>
                          <option>Payroll</option>
                          <option>Templates</option>
                          <option>Contracts</option>
                          <option>Training</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm">Access Level</label>
                        <select className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white mt-1">
                          <option>Public</option>
                          <option>HR Only</option>
                          <option>Management</option>
                          <option>Confidential</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Document Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">HR document templates for quick access...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archives">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Document Archives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Archived and historical documents...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRDocuments;
