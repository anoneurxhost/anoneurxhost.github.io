
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Award, Calendar, BarChart3, Clock } from "lucide-react";

const DashboardEmployeePerformance = () => {
  const performanceMetrics = {
    overallScore: 88,
    productivity: 92,
    quality: 85,
    collaboration: 90,
    punctuality: 95,
    goals: {
      completed: 8,
      total: 10,
      percentage: 80
    },
    reviews: [
      {
        date: "2024-01-15",
        reviewer: "Sarah Johnson (Manager)",
        rating: 4.5,
        comment: "Excellent work on the recent project. Shows great leadership skills."
      },
      {
        date: "2023-12-10",
        reviewer: "Mike Wilson (Team Lead)",
        rating: 4.2,
        comment: "Good technical skills and collaboration with team members."
      }
    ]
  };

  const achievements = [
    {
      title: "Project Excellence",
      description: "Completed major project ahead of schedule",
      date: "2024-01-20",
      type: "Achievement"
    },
    {
      title: "Team Player",
      description: "Helped 3 junior developers with their tasks",
      date: "2024-01-15",
      type: "Recognition"
    },
    {
      title: "Innovation Award",
      description: "Proposed and implemented process improvement",
      date: "2023-12-05",
      type: "Award"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <DashboardLayout title="My Performance">
      <div className="space-y-6">
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-blue-400" />
                <div>
                  <p className={`text-xl font-bold ${getScoreColor(performanceMetrics.overallScore)}`}>
                    {performanceMetrics.overallScore}%
                  </p>
                  <p className="text-xs text-gray-400">Overall Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-xl font-bold text-white">{performanceMetrics.goals.completed}/{performanceMetrics.goals.total}</p>
                  <p className="text-xs text-gray-400">Goals Achieved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-xl font-bold text-white">{achievements.length}</p>
                  <p className="text-xs text-gray-400">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-purple-400" />
                <div>
                  <p className={`text-xl font-bold ${getScoreColor(performanceMetrics.punctuality)}`}>
                    {performanceMetrics.punctuality}%
                  </p>
                  <p className="text-xs text-gray-400">Punctuality</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Breakdown */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Performance Breakdown</CardTitle>
            <CardDescription className="text-gray-400">
              Your performance across different areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Productivity</span>
                  <span>{performanceMetrics.productivity}%</span>
                </div>
                <Progress value={performanceMetrics.productivity} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Quality of Work</span>
                  <span>{performanceMetrics.quality}%</span>
                </div>
                <Progress value={performanceMetrics.quality} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Team Collaboration</span>
                  <span>{performanceMetrics.collaboration}%</span>
                </div>
                <Progress value={performanceMetrics.collaboration} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Goal Achievement</span>
                  <span>{performanceMetrics.goals.percentage}%</span>
                </div>
                <Progress value={performanceMetrics.goals.percentage} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Performance Reviews</CardTitle>
            <CardDescription className="text-gray-400">
              Feedback from your managers and peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-600"}>
                          ★
                        </span>
                      ))}
                      <span className="text-white ml-2">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-400 text-sm mb-2">{review.reviewer}</p>
                  <p className="text-sm text-white">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Achievements</CardTitle>
            <CardDescription className="text-gray-400">
              Your accomplishments and recognitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">{achievement.title}</h3>
                    <Badge className="bg-yellow-600">{achievement.type}</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{achievement.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Performance Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Your performance over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Performance trend chart will be displayed here</p>
                <p className="text-gray-500 text-sm">Connect to database to view historical data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmployeePerformance;
