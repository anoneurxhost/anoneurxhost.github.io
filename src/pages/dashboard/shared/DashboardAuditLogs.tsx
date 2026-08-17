
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Activity
} from "lucide-react";

const DashboardAuditLogs = () => {
  const [auditLogs] = useState([
    {
      id: 1,
      timestamp: "2024-01-21 14:30:25",
      user: "John Smith",
      userRole: "HR",
      action: "User Created",
      resource: "Employee Record",
      details: "Created new employee: Sarah Johnson",
      ipAddress: "192.168.1.100",
      status: "success",
      severity: "medium"
    },
    {
      id: 2,
      timestamp: "2024-01-21 14:25:10",
      user: "Mike Wilson",
      userRole: "CEO",
      action: "Department Modified",
      resource: "Department Settings",
      details: "Updated budget for AI Development department",
      ipAddress: "192.168.1.50",
      status: "success",
      severity: "high"
    },
    {
      id: 3,
      timestamp: "2024-01-21 14:20:45",
      user: "Sarah Chen",
      userRole: "HOD",
      action: "Project Access",
      resource: "Project Files",
      details: "Accessed confidential project documents",
      ipAddress: "192.168.1.75",
      status: "warning",
      severity: "medium"
    },
    {
      id: 4,
      timestamp: "2024-01-21 14:15:30",
      user: "Unknown User",
      userRole: "N/A",
      action: "Failed Login",
      resource: "Authentication",
      details: "Multiple failed login attempts from suspicious IP",
      ipAddress: "203.0.113.100",
      status: "failed",
      severity: "critical"
    },
    {
      id: 5,
      timestamp: "2024-01-21 14:10:15",
      user: "David Kumar",
      userRole: "Employee",
      action: "Data Export",
      resource: "Employee Database",
      details: "Exported employee contact list",
      ipAddress: "192.168.1.120",
      status: "success",
      severity: "high"
    }
  ]);

  const [securityMetrics] = useState({
    totalEvents: 1247,
    criticalAlerts: 12,
    securityIncidents: 3,
    successfulLogins: 2891,
    failedLogins: 45,
    dataAccess: 567,
    systemChanges: 89,
    userActions: 1156
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-600";
      case "warning": return "bg-yellow-600";
      case "failed": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400";
      case "high": return "text-orange-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "failed": return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <DashboardLayout title="Security & Audit Logs">
      <div className="space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-xl">{securityMetrics.totalEvents}</p>
                  <p className="text-gray-300 text-sm">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white font-bold text-xl">{securityMetrics.criticalAlerts}</p>
                  <p className="text-gray-300 text-sm">Critical Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-xl">{securityMetrics.securityIncidents}</p>
                  <p className="text-gray-300 text-sm">Security Incidents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-bold text-xl">{securityMetrics.userActions}</p>
                  <p className="text-gray-300 text-sm">User Actions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="logs" className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    System Audit Logs
                  </CardTitle>
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
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input placeholder="Search logs..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                      <option>All Actions</option>
                      <option>User Created</option>
                      <option>Login/Logout</option>
                      <option>Data Access</option>
                      <option>System Changes</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-3">
                              {getStatusIcon(log.status)}
                              <span className="text-white font-semibold">{log.action}</span>
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                              <span className={`text-sm font-medium ${getSeverityColor(log.severity)}`}>
                                {log.severity.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.user} ({log.userRole})</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.timestamp}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.resource}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.ipAddress}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 text-sm">{log.details}</p>
                          </div>
                          
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Security Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-2">Login Activity</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Successful Logins</span>
                          <span className="text-green-400">{securityMetrics.successfulLogins}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Failed Attempts</span>
                          <span className="text-red-400">{securityMetrics.failedLogins}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-2">Data Access</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Data Exports</span>
                          <span className="text-yellow-400">{securityMetrics.dataAccess}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">System Changes</span>
                          <span className="text-purple-400">{securityMetrics.systemChanges}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <h4 className="text-white font-semibold">GDPR</h4>
                        <p className="text-green-400 text-sm">Compliant</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <h4 className="text-white font-semibold">SOX</h4>
                        <p className="text-green-400 text-sm">Compliant</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <h4 className="text-white font-semibold">ISO 27001</h4>
                        <p className="text-yellow-400 text-sm">Review Required</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Download className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">Weekly Security Report</span>
                      </div>
                      <p className="text-gray-300 text-sm">Comprehensive security analysis for the past week</p>
                    </Button>
                    
                    <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Download className="w-5 h-5 text-green-400" />
                        <span className="text-white font-semibold">Compliance Report</span>
                      </div>
                      <p className="text-gray-300 text-sm">Monthly compliance status and recommendations</p>
                    </Button>
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

export default DashboardAuditLogs;
