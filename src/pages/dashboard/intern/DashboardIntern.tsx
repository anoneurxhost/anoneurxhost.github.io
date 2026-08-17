
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ClipboardList, Target, BookOpen, MessageSquare, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardIntern = () => {
  const internStats = [
    { title: "Tasks Completed", value: "12/18", icon: ClipboardList, color: "text-blue-400" },
    { title: "Progress", value: "67%", icon: Target, color: "text-green-400" },
    { title: "Papers Read", value: "8", icon: BookOpen, color: "text-purple-400" },
    { title: "Days Remaining", value: "23", icon: Clock, color: "text-orange-400" },
  ];

  const currentTasks = [
    { title: "Complete Research on AI Ethics", deadline: "2024-06-25", priority: "High", progress: 75 },
    { title: "Write Summary Report", deadline: "2024-06-28", priority: "Medium", progress: 45 },
    { title: "Attend Team Meeting", deadline: "2024-06-24", priority: "Low", progress: 0 },
    { title: "Review Assigned Papers", deadline: "2024-06-30", priority: "Medium", progress: 90 },
  ];

  const recentFeedback = [
    { mentor: "Dr. Sarah Chen", feedback: "Excellent work on the AI research project. Keep up the good work!", date: "2024-06-20", rating: 5 },
    { mentor: "Prof. Michael Rodriguez", feedback: "Good analysis but needs more depth in conclusions.", date: "2024-06-18", rating: 4 },
    { mentor: "Dr. Emily Watson", feedback: "Great presentation skills demonstrated in team meeting.", date: "2024-06-15", rating: 5 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>⭐</span>
    ));
  };

  return (
    <DashboardLayout title="Intern Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {internStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/10 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Overall Progress */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Internship Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-white">
                <span>Overall Completion</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-3" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">12</p>
                  <p className="text-gray-400 text-sm">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">6</p>
                  <p className="text-gray-400 text-sm">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-400">0</p>
                  <p className="text-gray-400 text-sm">Overdue</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Tasks */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Current Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTasks.map((task, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Due: {task.deadline}</p>
                  <div className="flex items-center gap-3">
                    <Progress value={task.progress} className="flex-1 h-2" />
                    <span className="text-white text-sm">{task.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Mentor Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-blue-400 font-medium">{feedback.mentor}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-white text-sm mb-2">{feedback.feedback}</p>
                  <p className="text-gray-400 text-xs">{feedback.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard/intern/projects">
                <Button className="w-full h-20 flex-col space-y-2">
                  <ClipboardList className="w-5 h-5" />
                  <span>View All Tasks</span>
                </Button>
              </Link>
              <Link to="/dashboard/intern/papers">
                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Read Papers</span>
                </Button>
              </Link>
              <Link to="/dashboard/intern/certificates">
                <Button variant="outline" className="w-full h-20 flex-col space-y-2">
                  <Award className="w-5 h-5" />
                  <span>Certificates</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIntern;
