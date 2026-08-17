import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, TrendingUp, UserCheck, Clock, Target, Award,
  Calendar, BarChart3, PieChart, Activity
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const DashboardHRAnalytics = () => {
  const employeeGrowthData = [
    { month: 'Jan', employees: 45, hires: 5, departures: 2 },
    { month: 'Feb', employees: 48, hires: 4, departures: 1 },
    { month: 'Mar', employees: 52, hires: 6, departures: 2 },
    { month: 'Apr', employees: 55, hires: 4, departures: 1 },
    { month: 'May', employees: 58, hires: 5, departures: 2 },
    { month: 'Jun', employees: 62, hires: 6, departures: 2 }
  ];

  const departmentDistribution = [
    { name: 'AI Development', value: 18, color: '#3b82f6' },
    { name: 'Web/Mobile', value: 15, color: '#10b981' },
    { name: 'Robotics', value: 12, color: '#f59e0b' },
    { name: 'Networking', value: 8, color: '#ef4444' },
    { name: 'Cybersecurity', value: 6, color: '#8b5cf6' },
    { name: 'Blockchain', value: 3, color: '#ec4899' }
  ];

  const performanceData = [
    { department: 'AI Dev', performance: 92, satisfaction: 88 },
    { department: 'Web/Mobile', performance: 89, satisfaction: 85 },
    { department: 'Robotics', performance: 91, satisfaction: 90 },
    { department: 'Networking', performance: 87, satisfaction: 82 },
    { department: 'Cybersecurity', performance: 94, satisfaction: 91 },
    { department: 'Blockchain', performance: 88, satisfaction: 86 }
  ];

  const hrMetrics = [
    {
      title: "Total Employees",
      value: "62",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Employee Retention",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Avg. Performance",
      value: "90.1%",
      change: "+1.5%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      trend: "up",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <DashboardLayout title="HR Analytics">
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hrMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">{metric.title}</p>
                    <p className="text-xl font-bold text-white mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                        {metric.change}
                      </Badge>
                      <TrendingUp className="w-4 h-4 ml-2 text-green-500" />
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-white/10 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Growth Chart */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Employee Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={employeeGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="employees" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="departures" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Department Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Satisfaction */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Department Performance & Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="department" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="performance" fill="#3b82f6" name="Performance %" />
                <Bar dataKey="satisfaction" fill="#10b981" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah Chen", department: "AI Development", score: 96 },
                { name: "Michael Rodriguez", department: "Cybersecurity", score: 94 },
                { name: "Emma Johnson", department: "Robotics", score: 93 },
                { name: "David Kim", department: "Web/Mobile", score: 91 }
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{performer.name}</p>
                    <p className="text-gray-400 text-sm">{performer.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{performer.score}%</p>
                    <Progress value={performer.score} className="w-20 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { event: "Q2 Performance Reviews", date: "Next Week", type: "Review" },
                { event: "Team Building Workshop", date: "Jun 25", type: "Training" },
                { event: "New Hire Orientation", date: "Jun 28", type: "Onboarding" },
                { event: "Salary Review Meeting", date: "Jul 5", type: "Meeting" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.event}</p>
                    <p className="text-gray-400 text-sm">{item.date}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-400 text-blue-400">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHRAnalytics;
