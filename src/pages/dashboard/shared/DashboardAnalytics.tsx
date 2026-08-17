import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from "lucide-react";

const DashboardAnalytics = () => {
  const metrics = [
    { title: "User Growth", value: "+23%", change: "up", icon: TrendingUp },
    { title: "Revenue Growth", value: "+12%", change: "up", icon: TrendingUp },
    { title: "Project Completion", value: "87%", change: "up", icon: BarChart3 },
    { title: "Customer Satisfaction", value: "94%", change: "up", icon: Activity },
  ];

  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  vs last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analytics</CardTitle>
              <CardDescription className="text-white">Monthly revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-white">
                <BarChart3 className="w-16 h-16" />
                <span className="ml-4">Chart visualization would be here</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Project Distribution</CardTitle>
              <CardDescription className="text-white">Projects by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-white">
                <PieChart className="w-16 h-16" />
                <span className="ml-4">Pie chart would be here</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytics;
