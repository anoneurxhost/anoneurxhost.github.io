import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const DashboardFinanceManagerReports = () => {
  const reports = [
    { name: "Monthly Revenue Report", period: "July 2024", status: "ready", type: "Revenue" },
    { name: "Expense Summary", period: "Q2 2024", status: "ready", type: "Expense" },
    { name: "Profit & Loss Statement", period: "H1 2024", status: "ready", type: "P&L" },
    { name: "Cash Flow Analysis", period: "July 2024", status: "pending", type: "Cash Flow" },
    { name: "Tax Liability Report", period: "Q2 2024", status: "ready", type: "Tax" },
    { name: "Budget vs Actual", period: "Q2 2024", status: "ready", type: "Budget" },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 95000, expenses: 72000 },
    { month: "Feb", revenue: 102000, expenses: 78000 },
    { month: "Mar", revenue: 118000, expenses: 81000 },
    { month: "Apr", revenue: 125000, expenses: 85000 },
    { month: "May", revenue: 110000, expenses: 79000 },
    { month: "Jun", revenue: 132000, expenses: 88000 },
    { month: "Jul", revenue: 125430, expenses: 89250 },
  ];

  return (
    <DashboardLayout title="Financial Reports">
      <div className="space-y-6">
        <Card className="bg-white/10 border-indigo-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Financial Reports</h2>
                <p className="text-indigo-300 text-sm">Generate and download financial reports</p>
              </div>
              <BarChart3 className="w-10 h-10 text-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Monthly Revenue</p>
              <p className="text-xl font-bold text-white">$125,430</p>
              <p className="text-[11px] text-green-400 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" />+8.2%</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Monthly Expenses</p>
              <p className="text-xl font-bold text-white">$89,250</p>
              <p className="text-[11px] text-red-400 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" />+3.1%</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Net Profit</p>
              <p className="text-xl font-bold text-white">$36,180</p>
              <p className="text-[11px] text-green-400 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" />+18.5%</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Profit Margin</p>
              <p className="text-xl font-bold text-white">28.8%</p>
              <p className="text-[11px] text-green-400 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" />+2.4%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white">Revenue vs Expenses (2024)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {monthlyData.map((m) => (
                <div key={m.month} className="flex items-center space-x-3">
                  <span className="text-xs text-gray-400 w-8">{m.month}</span>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="h-4 bg-green-600 rounded" style={{ width: `${(m.revenue / 150000) * 100}%` }} />
                    <div className="h-4 bg-red-500/60 rounded" style={{ width: `${(m.expenses / 150000) * 100}%` }} />
                  </div>
                  <span className="text-[11px] text-gray-400 w-20 text-right">${m.revenue.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-green-600 rounded" /><span className="text-[11px] text-gray-400">Revenue</span></div>
                <div className="flex items-center space-x-1"><div className="w-3 h-3 bg-red-500/60 rounded" /><span className="text-[11px] text-gray-400">Expenses</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">{report.name}</p>
                      <p className="text-[11px] text-gray-400">{report.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-[11px] ${report.status === 'ready' ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs h-7 border-gray-600 text-white hover:bg-white/10">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManagerReports;
