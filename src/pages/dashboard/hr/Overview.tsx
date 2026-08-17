import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Calendar, TrendingUp } from "lucide-react";

const HROverview = () => {
  const metrics = [
    { title: "Total Employees", value: "156", change: "+8", icon: Users },
    { title: "New Hires", value: "12", change: "+3", icon: UserPlus },
    { title: "Leave Requests", value: "7", change: "-2", icon: Calendar },
    { title: "Satisfaction", value: "4.2/5", change: "+0.3", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {metric.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-white">{metric.value}</div>
                <p className="text-xs text-green-400">{metric.change} this month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HROverview;
