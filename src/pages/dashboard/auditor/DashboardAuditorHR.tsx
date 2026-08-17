
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserX, 
  AlertTriangle, 
  FileText, 
  Download,
  Search,
  Filter,
  Eye,
  Clock
} from "lucide-react";

const DashboardAuditorHR = () => {
  const [hrMetrics] = useState({
    totalEmployees: 245,
    complianceIssues: 5,
    pendingDocuments: 12,
    trainingCompliance: 89
  });

  const [hrAudits] = useState([
    {
      id: "HR-001",
      employee: "John Doe",
      department: "Engineering",
      issue: "Missing I-9 Documentation",
      severity: "high",
      status: "pending",
      dueDate: "2024-01-25",
      assignedTo: "Sarah HR"
    },
    {
      id: "HR-002",
      employee: "Jane Smith", 
      department: "Marketing",
      issue: "Overdue Training Certification",
      severity: "medium",
      status: "in-progress",
      dueDate: "2024-01-30",
      assignedTo: "Mike HR"
    },
    {
      id: "HR-003",
      employee: "Bob Johnson",
      department: "Sales",
      issue: "Background Check Expired",
      severity: "high",
      status: "resolved",
      dueDate: "2024-01-20",
      assignedTo: "Lisa HR"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout title="HR Audit">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Employees</p>
                  <p className="text-2xl font-bold text-white">{hrMetrics.totalEmployees}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Compliance Issues</p>
                  <p className="text-2xl font-bold text-white">{hrMetrics.complianceIssues}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Documents</p>
                  <p className="text-2xl font-bold text-white">{hrMetrics.pendingDocuments}</p>
                </div>
                <FileText className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Training Compliance</p>
                  <p className="text-2xl font-bold text-white">{hrMetrics.trainingCompliance}%</p>
                </div>
                <UserX className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="compliance" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="compliance">Compliance Issues</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="training">Training Records</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">HR Compliance Issues</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search compliance issues..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                  </div>

                  <div className="space-y-3">
                    {hrAudits.map((audit) => (
                      <div key={audit.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-white font-semibold">{audit.id}</span>
                            <Badge className={getStatusColor(audit.status)}>
                              {audit.status}
                            </Badge>
                            <span className={`text-sm font-medium ${getSeverityColor(audit.severity)}`}>
                              {audit.severity.toUpperCase()}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Employee</p>
                            <p className="text-white">{audit.employee}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Department</p>
                            <p className="text-white">{audit.department}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Issue</p>
                            <p className="text-white">{audit.issue}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Due Date</p>
                            <p className="text-white">{audit.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Documentation Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Missing Documents</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">I-9 Forms</span>
                            <span className="text-red-400">3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Tax Forms</span>
                            <span className="text-yellow-400">5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Contracts</span>
                            <span className="text-red-400">2</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Expiring Documents</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Background Checks</span>
                            <span className="text-yellow-400">8</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Certifications</span>
                            <span className="text-orange-400">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Work Permits</span>
                            <span className="text-yellow-400">4</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Compliance Rate</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Documentation</span>
                            <span className="text-green-400">94%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Training Records</span>
                            <span className="text-yellow-400">89%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Performance Reviews</span>
                            <span className="text-green-400">96%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Training Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Overdue Training</h4>
                        <div className="space-y-2">
                          <div className="p-2 bg-red-600/20 rounded border border-red-500/30">
                            <p className="text-red-300 font-medium">Safety Training</p>
                            <p className="text-white text-sm">15 employees overdue</p>
                          </div>
                          <div className="p-2 bg-yellow-600/20 rounded border border-yellow-500/30">
                            <p className="text-yellow-300 font-medium">Compliance Training</p>
                            <p className="text-white text-sm">8 employees overdue</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Training Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Completed This Month</span>
                            <span className="text-green-400">45</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">In Progress</span>
                            <span className="text-blue-400">23</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Overdue</span>
                            <span className="text-red-400">23</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAuditorHR;
