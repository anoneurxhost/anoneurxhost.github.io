import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, BarChart3, PieChart, CreditCard } from "lucide-react";

const DashboardFinanceManager = () => {
  return (
    <DashboardLayout title="Finance Management">
      <div className="space-y-6">
        <Card className="bg-white/10 border-green-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Finance Management Dashboard</h2>
                <p className="text-green-300 text-sm">Manage pricing, salaries, and financial operations</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Monthly Revenue</p>
                  <p className="text-xl font-bold text-white">$125,430</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Total Expenses</p>
                  <p className="text-xl font-bold text-white">$89,250</p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Net Profit</p>
                  <p className="text-xl font-bold text-white">$36,180</p>
                </div>
                <PieChart className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">Pending Payments</p>
                  <p className="text-xl font-bold text-white">$12,450</p>
                </div>
                <CreditCard className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {[
                  { text: "Invoice #1042 paid — $4,500", time: "2 hours ago", color: "text-green-400" },
                  { text: "Salary processed for Alice HR", time: "5 hours ago", color: "text-blue-400" },
                  { text: "New feature price set — IoT Solutions", time: "1 day ago", color: "text-purple-400" },
                  { text: "Q2 tax report generated", time: "2 days ago", color: "text-yellow-400" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-300">{item.text}</p>
                    <span className={`text-[11px] ${item.color}`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Features Pricing", path: "/dashboard/finance-manager/features" },
                  { label: "Collaboration Pricing", path: "/dashboard/finance-manager/collaboration" },
                  { label: "Salary Management", path: "/dashboard/finance-manager/salaries" },
                  { label: "Financial Reports", path: "/dashboard/finance-manager/reports" },
                ].map((action, i) => (
                  <a
                    key={i}
                    href={action.path}
                    className="block p-2 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManager;
