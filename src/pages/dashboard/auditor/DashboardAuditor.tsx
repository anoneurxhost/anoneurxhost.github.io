import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSearch, Users, Shield, Download, BarChart3, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardAuditor = () => {
  const auditStats = [{
    title: "Active Audits",
    value: "12",
    icon: FileSearch,
    color: "text-blue-400"
  }, {
    title: "Compliance Issues",
    value: "3",
    icon: AlertTriangle,
    color: "text-red-400"
  }, {
    title: "Reports Generated",
    value: "28",
    icon: BarChart3,
    color: "text-green-400"
  }, {
    title: "Access Logs Reviewed",
    value: "1.5K",
    icon: Shield,
    color: "text-purple-400"
  }];
  const recentAudits = [{
    type: "Finance",
    department: "All Departments",
    status: "In Progress",
    date: "2024-06-20"
  }, {
    type: "HR Compliance",
    department: "Human Resources",
    status: "Completed",
    date: "2024-06-18"
  }, {
    type: "Security",
    department: "IT Department",
    status: "Pending Review",
    date: "2024-06-15"
  }, {
    type: "Payroll",
    department: "Human Resources",
    status: "Completed",
    date: "2024-06-10"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "In Progress":
        return "bg-blue-600";
      case "Pending Review":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };
  return <DashboardLayout title="Auditor Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auditStats.map((stat, index) => {
          const Icon = stat.icon;
          return <Card key={index} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Quick Actions */}
        

        {/* Recent Audits */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAudits.map((audit, index) => <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-medium">{audit.type}</h3>
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{audit.department}</p>
                    <p className="text-gray-500 text-xs">{audit.date}</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                    View Details
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Compliance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-red-600/20 border border-red-500/30">
                <p className="text-red-300 font-medium">High Priority</p>
                <p className="text-white text-sm">3 employees haven't submitted required compliance training certificates</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-600/20 border border-yellow-500/30">
                <p className="text-yellow-300 font-medium">Medium Priority</p>
                <p className="text-white text-sm">Finance department quarterly review is due in 5 days</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-600/20 border border-blue-500/30">
                <p className="text-blue-300 font-medium">Low Priority</p>
                <p className="text-white text-sm">Update required for data retention policies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>;
};
export default DashboardAuditor;