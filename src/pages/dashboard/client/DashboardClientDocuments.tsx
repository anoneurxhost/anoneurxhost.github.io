
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Upload, Calendar, User } from "lucide-react";

const DashboardClientDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Project Contract - E-commerce Platform",
      type: "Contract",
      size: "2.4 MB",
      uploadedBy: "Legal Team",
      uploadedDate: "2024-01-15",
      status: "Final"
    },
    {
      id: 2,
      name: "Technical Specifications",
      type: "Specification",
      size: "1.8 MB",
      uploadedBy: "John Doe",
      uploadedDate: "2024-01-20",
      status: "Draft"
    },
    {
      id: 3,
      name: "UI/UX Design Mockups",
      type: "Design",
      size: "15.2 MB",
      uploadedBy: "Design Team",
      uploadedDate: "2024-01-25",
      status: "Approved"
    },
    {
      id: 4,
      name: "Monthly Progress Report",
      type: "Report",
      size: "3.1 MB",
      uploadedBy: "Project Manager",
      uploadedDate: "2024-02-01",
      status: "Final"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Final': return 'bg-green-600';
      case 'Approved': return 'bg-blue-600';
      case 'Draft': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-400" />;
  };

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Document Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Access and manage your project documents
                </CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Search and Filter */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <select className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                <option value="">All Types</option>
                <option value="contract">Contracts</option>
                <option value="report">Reports</option>
                <option value="design">Design</option>
                <option value="specification">Specifications</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="text-white font-medium">{doc.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <span>{doc.type}</span>
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
                          <span>{doc.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardClientDocuments;
