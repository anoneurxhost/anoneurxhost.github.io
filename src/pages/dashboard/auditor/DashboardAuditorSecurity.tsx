
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Eye,
  Download,
  Search,
  Filter,
  Activity,
  Lock,
  User,
  Clock
} from "lucide-react";

const DashboardAuditorSecurity = () => {
  const [securityMetrics] = useState({
    totalLogs: 15847,
    criticalAlerts: 3,
    failedLogins: 47,
    activeUsers: 234
  });

  const [securityLogs] = useState([
    {
      id: "SEC-001",
      timestamp: "2024-01-21 15:42:30",
      event: "Failed Login Attempt",
      user: "unknown@company.com",
      ipAddress: "192.168.1.100",
      severity: "high",
      status: "active",
      location: "External"
    },
    {
      id: "SEC-002",
      timestamp: "2024-01-21 15:30:15",
      event: "Successful Admin Login",
      user: "admin@company.com", 
      ipAddress: "192.168.1.50",
      severity: "medium",
      status: "resolved",
      location: "Internal"
    },
    {
      id: "SEC-003",
      timestamp: "2024-01-21 15:15:22",
      event: "Unauthorized File Access",
      user: "employee@company.com",
      ipAddress: "192.168.1.75",
      severity: "critical",
      status: "investigating",
      location: "Internal"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-600";
      case "investigating": return "bg-orange-600";
      case "active": return "bg-red-600";
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

  return (
    <DashboardLayout title="Security Logs">
      <div className="space-y-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Logs</p>
                  <p className="text-2xl font-bold text-white">{securityMetrics.totalLogs.toLocaleString()}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Critical Alerts</p>
                  <p className="text-2xl font-bold text-white">{securityMetrics.criticalAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Failed Logins</p>
                  <p className="text-2xl font-bold text-white">{securityMetrics.failedLogins}</p>
                </div>
                <Lock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">{securityMetrics.activeUsers}</p>
                </div>
                <User className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="logs" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="logs">Real-time Logs</TabsTrigger>
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Event Logs
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
                      <Input placeholder="Search security logs..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                      <option>All Events</option>
                      <option>Login Events</option>
                      <option>File Access</option>
                      <option>System Changes</option>
                      <option>Failed Attempts</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {securityLogs.map((log) => (
                      <div key={log.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-3">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-white font-semibold">{log.event}</span>
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                              <span className={`text-sm font-medium ${getSeverityColor(log.severity)}`}>
                                {log.severity.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.user}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.ipAddress}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{log.timestamp}</span>
                              </div>
                            </div>
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

          <TabsContent value="alerts">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Critical Security Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-red-300 font-semibold">Critical Alert</span>
                    </div>
                    <p className="text-white">Multiple failed login attempts detected from external IP</p>
                    <p className="text-gray-400 text-sm mt-1">IP: 203.0.113.100 | Attempts: 15 | Time: Last 10 minutes</p>
                  </div>

                  <div className="p-4 bg-orange-600/20 border border-orange-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-300 font-semibold">High Priority</span>
                    </div>
                    <p className="text-white">Unusual file access pattern detected</p>
                    <p className="text-gray-400 text-sm mt-1">User: employee@company.com | Files: 50+ sensitive documents</p>
                  </div>

                  <div className="p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-300 font-semibold">Medium Priority</span>
                    </div>
                    <p className="text-white">After-hours system access detected</p>
                    <p className="text-gray-400 text-sm mt-1">User: admin@company.com | Time: 02:30 AM | Duration: 3 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Threat Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-3">Threat Categories</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Brute Force Attacks</span>
                          <span className="text-red-400">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Unauthorized Access</span>
                          <span className="text-orange-400">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Data Exfiltration</span>
                          <span className="text-yellow-400">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Malware Detection</span>
                          <span className="text-green-400">0</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-3">Geographic Threats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">External (International)</span>
                          <span className="text-red-400">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">External (Domestic)</span>
                          <span className="text-yellow-400">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Internal Network</span>
                          <span className="text-orange-400">25%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAuditorSecurity;
