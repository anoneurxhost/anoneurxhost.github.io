import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertTriangle, Target } from "lucide-react";

const DashboardHODBudget = () => {
  const budgetData = {
    totalBudget: 850000,
    usedBudget: 620000,
    remainingBudget: 230000,
    quarterlyAllocation: 212500
  };

  const categories = [
    { name: "Salaries & Benefits", allocated: 500000, used: 420000, color: "bg-blue-600" },
    { name: "Equipment & Software", allocated: 150000, used: 85000, color: "bg-green-600" },
    { name: "Training & Development", allocated: 80000, used: 45000, color: "bg-purple-600" },
    { name: "Research & Innovation", allocated: 70000, used: 35000, color: "bg-yellow-600" },
    { name: "Operations", allocated: 50000, used: 35000, color: "bg-red-600" },
  ];

  const usagePercentage = (budgetData.usedBudget / budgetData.totalBudget) * 100;

  return (
    <DashboardLayout title="Budget Management">
      <div className="space-y-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-white">${(budgetData.totalBudget / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Used Budget</p>
                  <p className="text-2xl font-bold text-white">${(budgetData.usedBudget / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Remaining</p>
                  <p className="text-2xl font-bold text-white">${(budgetData.remainingBudget / 1000).toFixed(0)}K</p>
                </div>
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Budget Usage</p>
                  <p className="text-2xl font-bold text-white">{usagePercentage.toFixed(1)}%</p>
                </div>
                <AlertTriangle className={`w-8 h-8 ${usagePercentage > 80 ? 'text-red-400' : 'text-green-400'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Annual Budget Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-white mb-2">
                <span>Overall Budget Usage</span>
                <span>{usagePercentage.toFixed(1)}% of ${(budgetData.totalBudget / 1000).toFixed(0)}K</span>
              </div>
              <Progress value={usagePercentage} className="w-full h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Budget Categories */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Budget Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => {
                const categoryUsage = (category.used / category.allocated) * 100;
                return (
                  <Card key={index} className="bg-white/5 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{category.name}</h3>
                        <Badge className={categoryUsage > 80 ? 'bg-red-600' : categoryUsage > 60 ? 'bg-yellow-600' : 'bg-green-600'}>
                          {categoryUsage.toFixed(0)}% Used
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Used: ${(category.used / 1000).toFixed(0)}K</span>
                        <span>Allocated: ${(category.allocated / 1000).toFixed(0)}K</span>
                      </div>
                      
                      <Progress value={categoryUsage} className="w-full" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHODBudget;