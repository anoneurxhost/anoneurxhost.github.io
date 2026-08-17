import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const CEOOverview = () => {
  const metrics = [
    { title: "Total Revenue", value: "$2.4M", change: "+15%", icon: DollarSign },
    { title: "Active Users", value: "1,234", change: "+8%", icon: Users },
    { title: "Projects", value: "47", change: "+12%", icon: Target },
    { title: "Growth Rate", value: "23%", change: "+5%", icon: TrendingUp },
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
                <p className="text-xs text-green-400">{metric.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CEOOverview;
