
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  FileOutput
} from "lucide-react";

const DashboardAuditorReports = () => {
  const [reportMetrics] = useState({
    totalReports: 156,
    monthlyReports: 12,
    scheduledReports: 8,
    customReports: 23
  });

  const [reports] = useState([
    {
      id: "RPT-001",
      name: "Monthly Security Audit Report",
      type: "Security",
      status: "completed",
      generatedDate: "2024-01-20",
      size: "2.4 MB",
      format: "PDF",
      recipients: "CEO, CISO, Security Team"
    },
    {
      id: "RPT-002",
      name: "HR Compliance Summary",
      type: "HR",
      status: "in-progress",
      generatedDate: "2024-01-21",
      size: "1.8 MB",
      format: "Excel",
      recipients: "HR Director, Legal Team"
    },
    {
      id: "RPT-003",
      name: "Financial Audit Q4 2023",
      type: "Finance",
      status: "completed",
      generatedDate: "2024-01-15",
      size: "5.2 MB",
      format: "PDF",
      recipients: "CFO, Board Members"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "scheduled": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <DashboardLayout title="Export Reports">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Reports</p>
                  <p className="text-2xl font-bold text-white">{reportMetrics.totalReports}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Reports</p>
                  <p className="text-2xl font-bold text-white">{reportMetrics.monthlyReports}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Scheduled Reports</p>
                  <p className="text-2xl font-bold text-white">{reportMetrics.scheduledReports}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Custom Reports</p>
                  <p className="text-2xl font-bold text-white">{reportMetrics.customReports}</p>
                </div>
                <PieChart className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Export Actions */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="p-6 h-auto flex flex-col items-center space-y-2 bg-blue-600 hover:bg-blue-700">
                <FileOutput className="w-8 h-8" />
                <span className="font-semibold">Security Report</span>
                <span className="text-sm opacity-80">Generate current security status</span>
              </Button>
              
              <Button className="p-6 h-auto flex flex-col items-center space-y-2 bg-green-600 hover:bg-green-700">
                <TrendingUp className="w-8 h-8" />
                <span className="font-semibold">Finance Report</span>
                <span className="text-sm opacity-80">Export financial audit data</span>
              </Button>
              
              <Button className="p-6 h-auto flex flex-col items-center space-y-2 bg-purple-600 hover:bg-purple-700">
                <BarChart3 className="w-8 h-8" />
                <span className="font-semibold">HR Report</span>
                <span className="text-sm opacity-80">Generate HR compliance report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report History */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Report History</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Search reports..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
              </div>

              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-semibold">{report.name}</span>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-white">{report.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Generated Date</p>
                        <p className="text-white">{report.generatedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Size</p>
                        <p className="text-white">{report.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Format</p>
                        <p className="text-white">{report.format}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-gray-400 text-sm">Recipients: {report.recipients}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Report Type</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                    <option>Security Audit</option>
                    <option>Financial Audit</option>
                    <option>HR Compliance</option>
                    <option>Custom Analysis</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Date Range</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Custom range</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Format</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                    <option>Word</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Department</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                    <option>All Departments</option>
                    <option>Finance</option>
                    <option>HR</option>
                    <option>IT</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Preview Report</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAuditorReports;
