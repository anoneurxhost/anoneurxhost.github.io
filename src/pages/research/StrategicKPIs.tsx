import React from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, DollarSign, Users, Calendar } from "lucide-react";

const StrategicKPIs = () => {
  const kpis = [
    {
      title: "Revenue Growth",
      value: "$2.4M",
      target: "$3.0M",
      progress: 80,
      trend: "up",
      change: "+15%",
      period: "Q4 2024",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Active Projects",
      value: "47",
      target: "60",
      progress: 78,
      trend: "up", 
      change: "+12%",
      period: "This Month",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Employee Satisfaction",
      value: "4.2/5",
      target: "4.5/5",
      progress: 84,
      trend: "up",
      change: "+8%",
      period: "Last Survey",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Client Retention Rate",
      value: "94%",
      target: "96%",
      progress: 94,
      trend: "down",
      change: "-2%",
      period: "YTD",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Innovation Pipeline",
      value: "23",
      target: "30",
      progress: 77,
      trend: "up",
      change: "+18%",
      period: "Q4 2024",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Market Expansion",
      value: "3",
      target: "5",
      progress: 60,
      trend: "up",
      change: "+50%",
      period: "New Regions",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const departmentMetrics = [
    {
      department: "AI Development",
      projects: 12,
      efficiency: 92,
      budget: "$450K",
      team: 15
    },
    {
      department: "Web & Mobile",
      projects: 8,
      efficiency: 88,
      budget: "$320K", 
      team: 12
    },
    {
      department: "Blockchain",
      projects: 6,
      efficiency: 95,
      budget: "$280K",
      team: 8
    },
    {
      department: "Cybersecurity",
      projects: 4,
      efficiency: 90,
      budget: "$200K",
      team: 6
    }
  ];

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content main-h-full">
          
          {/* Header Section */}
          <section className="relative py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Strategic KPIs
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Monitor company-wide key performance indicators and strategic metrics
                </p>
              </div>
            </div>
          </section>

          {/* KPI Cards */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {kpis.map((kpi, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-400">
                          {kpi.icon}
                        </div>
                        <CardTitle className="text-white text-lg">
                          {kpi.title}
                        </CardTitle>
                      </div>
                      <div className={`flex items-center space-x-1 ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">{kpi.change}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-2xl font-bold text-white">{kpi.value}</span>
                          <span className="text-gray-400 text-sm">Target: {kpi.target}</span>
                        </div>
                        <Progress value={kpi.progress} className="h-2" />
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>{kpi.progress}% of target</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {kpi.period}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Department Metrics */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Department Performance</CardTitle>
                  <CardDescription className="text-gray-300">
                    Overview of department-specific metrics and performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-white font-medium py-3">Department</th>
                          <th className="text-left text-white font-medium py-3">Active Projects</th>
                          <th className="text-left text-white font-medium py-3">Efficiency</th>
                          <th className="text-left text-white font-medium py-3">Budget</th>
                          <th className="text-left text-white font-medium py-3">Team Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departmentMetrics.map((dept, index) => (
                          <tr key={index} className="border-b border-white/5">
                            <td className="py-4 text-white font-medium">{dept.department}</td>
                            <td className="py-4 text-gray-300">{dept.projects}</td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <Progress value={dept.efficiency} className="h-2 w-16" />
                                <span className="text-gray-300 text-sm">{dept.efficiency}%</span>
                              </div>
                            </td>
                            <td className="py-4 text-gray-300">{dept.budget}</td>
                            <td className="py-4 text-gray-300">{dept.team} members</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default StrategicKPIs;