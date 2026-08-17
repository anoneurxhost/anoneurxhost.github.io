import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Target, 
  Briefcase, Award, Globe, ArrowUpRight, ArrowDownRight 
} from "lucide-react";

const StrategicKPIs = () => {
  // Revenue data for the last 12 months
  const revenueData = [
    { month: 'Jan', revenue: 2100000, target: 2000000 },
    { month: 'Feb', revenue: 2300000, target: 2200000 },
    { month: 'Mar', revenue: 2500000, target: 2400000 },
    { month: 'Apr', revenue: 2200000, target: 2300000 },
    { month: 'May', revenue: 2800000, target: 2500000 },
    { month: 'Jun', revenue: 3100000, target: 2700000 },
    { month: 'Jul', revenue: 2900000, target: 2800000 },
    { month: 'Aug', revenue: 3200000, target: 3000000 },
    { month: 'Sep', revenue: 3400000, target: 3200000 },
    { month: 'Oct', revenue: 3600000, target: 3400000 },
    { month: 'Nov', revenue: 3800000, target: 3600000 },
    { month: 'Dec', revenue: 4200000, target: 4000000 },
  ];

  // Client growth data
  const clientGrowthData = [
    { month: 'Jan', activeClients: 120, newClients: 8, churnRate: 2 },
    { month: 'Feb', activeClients: 135, newClients: 18, churnRate: 3 },
    { month: 'Mar', activeClients: 152, newClients: 20, churnRate: 3 },
    { month: 'Apr', activeClients: 168, newClients: 19, churnRate: 3 },
    { month: 'May', activeClients: 185, newClients: 22, churnRate: 5 },
    { month: 'Jun', activeClients: 203, newClients: 25, churnRate: 7 },
  ];

  // Department performance data
  const departmentData = [
    { name: 'AI Development', revenue: 1200000, projects: 45, satisfaction: 96 },
    { name: 'Web & Mobile', revenue: 980000, projects: 62, satisfaction: 94 },
    { name: 'Blockchain', revenue: 850000, projects: 28, satisfaction: 92 },
    { name: 'Cybersecurity', revenue: 720000, projects: 35, satisfaction: 95 },
    { name: 'Robotics', revenue: 650000, projects: 22, satisfaction: 93 },
    { name: 'Space Tech', revenue: 580000, projects: 18, satisfaction: 97 },
  ];

  // Project completion rate
  const projectStatusData = [
    { name: 'Completed', value: 68, color: '#10B981' },
    { name: 'In Progress', value: 25, color: '#3B82F6' },
    { name: 'On Hold', value: 4, color: '#F59E0B' },
    { name: 'Cancelled', value: 3, color: '#EF4444' },
  ];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "$42.1M",
      change: "+18.2%",
      trend: "up",
      description: "vs last year",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Active Clients",
      value: "203",
      change: "+69.2%",
      trend: "up", 
      description: "vs last year",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Project Success Rate",
      value: "96.8%",
      change: "+2.1%",
      trend: "up",
      description: "completion rate",
      icon: Target,
      color: "text-purple-500"
    },
    {
      title: "Client Retention",
      value: "94.5%",
      change: "-1.2%",
      trend: "down",
      description: "retention rate",
      icon: Award,
      color: "text-orange-500"
    },
    {
      title: "Global Presence",
      value: "15",
      change: "+3",
      trend: "up",
      description: "countries served",
      icon: Globe,
      color: "text-cyan-500"
    },
    {
      title: "Active Projects",
      value: "287",
      change: "+52",
      trend: "up",
      description: "in development",
      icon: Briefcase,
      color: "text-indigo-500"
    },
  ];

  return (
    <DashboardLayout>
      <div className="main-h-full p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Strategic KPIs</h1>
            <p className="text-gray-300 mt-2">Company-wide performance metrics and key indicators</p>
          </div>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Q4 2024
          </Badge>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiCards.map((kpi, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {kpi.change}
                  </span>
                  <span>{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Revenue Trends */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Revenue Trends</CardTitle>
              <CardDescription className="text-gray-300">
                Monthly revenue vs targets (2024)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value / 1000000}M`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, '']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Actual Revenue" />
                  <Line type="monotone" dataKey="target" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Client Growth */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Client Growth</CardTitle>
              <CardDescription className="text-gray-300">
                Active clients and acquisition trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={clientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="activeClients" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Active Clients" />
                  <Area type="monotone" dataKey="newClients" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="New Clients" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Department Performance</CardTitle>
              <CardDescription className="text-gray-300">
                Revenue and project count by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value / 1000}K`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`$${(value as number / 1000).toFixed(0)}K`, '']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Project Status Distribution */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Project Status</CardTitle>
              <CardDescription className="text-gray-300">
                Current project completion status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default StrategicKPIs;