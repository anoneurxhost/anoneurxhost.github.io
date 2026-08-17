
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Upload, Users, TrendingUp, MessageSquare, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardResearchCollaborator = () => {
  const stats = [
    { title: "Papers Published", value: "23", icon: BookOpen, color: "text-blue-400" },
    { title: "Collaborations", value: "8", icon: Users, color: "text-green-400" },
    { title: "Downloads This Month", value: "1.2K", icon: TrendingUp, color: "text-purple-400" },
    { title: "Active Discussions", value: "5", icon: MessageSquare, color: "text-orange-400" },
  ];

  const recentActivity = [
    { action: "Uploaded new paper", title: "Quantum Machine Learning Applications", time: "2 hours ago" },
    { action: "Commented on", title: "Neural Network Optimization", time: "5 hours ago" },
    { action: "Collaborated with", title: "Dr. Sarah Chen on AI Research", time: "1 day ago" },
    { action: "Paper downloaded", title: "Advanced Robotics Systems", time: "2 days ago" },
  ];

  return (
    <DashboardLayout title="Research Collaborator Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
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

        {/* Quick Actions */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard/research-collaborator/upload">
                <Button className="w-full h-24 flex-col space-y-2">
                  <Upload className="w-6 h-6" />
                  <span>Upload New Paper</span>
                </Button>
              </Link>
              <Link to="/dashboard/research-collaborator/archive">
                <Button variant="outline" className="w-full h-24 flex-col space-y-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Browse Archive</span>
                </Button>
              </Link>
              <Link to="/dashboard/research-collaborator/ai-assistant">
                <Button variant="outline" className="w-full h-24 flex-col space-y-2">
                  <Brain className="w-6 h-6" />
                  <span>AI Assistant</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <div>
                    <p className="text-white font-medium">
                      {activity.action} <span className="text-blue-400">{activity.title}</span>
                    </p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    Recent
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Research Assistant */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Research Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-600/20 border border-blue-500/30">
                <p className="text-blue-300 font-medium mb-2">📊 Today's Insights</p>
                <p className="text-white text-sm">
                  Your paper "Quantum Machine Learning Applications" is trending with 50+ downloads today. 
                  Consider writing a follow-up on quantum neural networks.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-600/20 border border-green-500/30">
                <p className="text-green-300 font-medium mb-2">🤝 Collaboration Opportunity</p>
                <p className="text-white text-sm">
                  Dr. Sarah Chen from AI Development is working on similar research. 
                  Would you like to connect?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardResearchCollaborator;
