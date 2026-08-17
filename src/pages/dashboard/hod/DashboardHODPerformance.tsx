
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Target, Award, BarChart3 } from "lucide-react";

const DashboardHODPerformance = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Developer",
      performance: 92,
      projects: 3,
      tasksCompleted: 45,
      rating: 4.8,
      trend: "up"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "UI/UX Designer",
      performance: 88,
      projects: 2,
      tasksCompleted: 38,
      rating: 4.6,
      trend: "up"
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Backend Developer",
      performance: 85,
      projects: 4,
      tasksCompleted: 52,
      rating: 4.5,
      trend: "stable"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      position: "Frontend Developer",
      performance: 78,
      projects: 2,
      tasksCompleted: 28,
      rating: 4.2,
      trend: "down"
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400';
    if (rating >= 4.0) return 'text-blue-400';
    if (rating >= 3.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <DashboardLayout title="Team Performance">
      <div className="space-y-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                  <p className="text-sm text-gray-400">Team Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">86%</p>
                  <p className="text-sm text-gray-400">Avg Performance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">163</p>
                  <p className="text-sm text-gray-400">Tasks Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4.5</p>
                  <p className="text-sm text-gray-400">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Department Performance Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly performance metrics for your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Performance chart will be displayed here</p>
                <p className="text-gray-500 text-sm">Connect to database to view real-time data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Performance */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Individual Performance</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed performance metrics for each team member
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      <p className="text-gray-400 text-sm">{member.position}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`font-bold ${getRatingColor(member.rating)}`}>
                          ★ {member.rating}
                        </p>
                        <p className={`text-sm ${getTrendColor(member.trend)}`}>
                          {member.trend === 'up' ? '↗' : member.trend === 'down' ? '↘' : '→'} {member.trend}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Performance Score</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={member.performance} className="flex-1 h-2" />
                        <span className="text-white text-sm">{member.performance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Projects</p>
                      <p className="text-white text-lg font-semibold">{member.projects}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Tasks Completed</p>
                      <p className="text-white text-lg font-semibold">{member.tasksCompleted}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Send Feedback
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      1-on-1 Meeting
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

export default DashboardHODPerformance;
