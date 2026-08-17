import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Upload, Calendar, Eye, Plus } from "lucide-react";

const DashboardEmployeeDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Employment Contract",
      type: "Contract",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      status: "Approved",
      category: "Employment"
    },
    {
      id: 2,
      name: "Tax Form W-2",
      type: "Tax Document",
      uploadDate: "2024-01-31",
      size: "1.2 MB",
      status: "Pending Review",
      category: "Tax"
    },
    {
      id: 3,
      name: "Performance Review Q1",
      type: "Review",
      uploadDate: "2024-04-15",
      size: "890 KB",
      status: "Approved",
      category: "Performance"
    },
    {
      id: 4,
      name: "Training Certificate - React",
      type: "Certificate",
      uploadDate: "2024-05-20",
      size: "1.8 MB",
      status: "Approved",
      category: "Training"
    },
    {
      id: 5,
      name: "Leave Request Form",
      type: "Leave",
      uploadDate: "2024-06-10",
      size: "450 KB",
      status: "Approved",
      category: "Leave"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-600";
      case "Pending Review": return "bg-yellow-600";
      case "Rejected": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Employment": return "bg-blue-600";
      case "Tax": return "bg-purple-600";
      case "Performance": return "bg-green-600";
      case "Training": return "bg-orange-600";
      case "Leave": return "bg-pink-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <DashboardLayout title="My Documents">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-blue-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Document Management</h2>
                <p className="text-blue-300">Access and manage your employment documents</p>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Documents</p>
                  <p className="text-2xl font-bold text-white">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Approved</p>
                  <p className="text-2xl font-bold text-white">
                    {documents.filter(d => d.status === "Approved").length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Review</p>
                  <p className="text-2xl font-bold text-white">
                    {documents.filter(d => d.status === "Pending Review").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Size</p>
                  <p className="text-2xl font-bold text-white">6.8 MB</p>
                </div>
                <Download className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-white mb-1">{document.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {document.uploadDate}
                            </span>
                            <span>{document.size}</span>
                            <span>{document.type}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={getStatusColor(document.status)}>
                              {document.status}
                            </Badge>
                            <Badge className={getCategoryColor(document.category)} variant="outline">
                              {document.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmployeeDocuments;