import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus } from "lucide-react";

const DashboardFinanceManagerInvestment = () => {
  const investments = [
    { name: "AI Research Fund", amount: 50000, returnRate: 12.5, status: "active" },
    { name: "Equipment Upgrade", amount: 25000, returnRate: 8.3, status: "active" },
    { name: "Marketing Campaign", amount: 15000, returnRate: 22.1, status: "completed" },
    { name: "Blockchain Initiative", amount: 35000, returnRate: 15.7, status: "active" },
    { name: "Robotics Lab Expansion", amount: 40000, returnRate: 10.2, status: "planned" },
  ];

  const returns = [
    { period: "Q1 2024", value: "+12.5%" },
    { period: "Q2 2024", value: "+8.3%" },
    { period: "Q3 2024", value: "+15.7%" },
    { period: "Annual", value: "+18.2%" },
  ];

  const totalInvested = investments.reduce((sum, i) => sum + i.amount, 0);

  return (
    <DashboardLayout title="Investment">
      <div className="space-y-6">
        <Card className="bg-white/10 border-emerald-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Investment Management</h2>
                <p className="text-emerald-300 text-sm">Track investments and returns</p>
              </div>
              <TrendingUp className="w-10 h-10 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Total Invested</p>
              <p className="text-xl font-bold text-white">${totalInvested.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Annual Return</p>
              <p className="text-xl font-bold text-green-400">+18.2%</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Portfolio Value</p>
              <p className="text-xl font-bold text-white">$485,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Investments</CardTitle>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                  <Plus className="w-3 h-3 mr-1" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {investments.map((inv, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-white">{inv.name}</p>
                      <p className="text-xs text-gray-400">${inv.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-[11px] ${inv.status === 'active' ? 'bg-green-600' : inv.status === 'completed' ? 'bg-blue-600' : 'bg-yellow-600'}`}>
                        {inv.status}
                      </Badge>
                      <p className="text-xs text-green-400 mt-1">+{inv.returnRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Returns History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {returns.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm text-gray-300">{r.period}</span>
                    <Badge className="bg-green-600 text-[11px]">{r.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManagerInvestment;
