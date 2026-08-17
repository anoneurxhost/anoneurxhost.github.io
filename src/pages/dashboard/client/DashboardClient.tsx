
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FolderOpen, FileText, Calendar, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardClient = () => {
  const [clientData] = useState({
    name: "Acme Corporation",
    email: "contact@acme.com",
    projectsCount: 3,
    activeProjects: 2,
    totalSpent: "$45,000",
    joinDate: "2023-08-15"
  });

  const [projects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      status: "In Progress",
      progress: 75,
      deadline: "2024-02-15",
      budget: "$25,000"
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "Planning",
      progress: 25,
      deadline: "2024-04-20",
      budget: "$35,000"
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      status: "Completed",
      progress: 100,
      deadline: "2023-12-10",
      budget: "$15,000"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600';
      case 'Planning': return 'bg-yellow-600';
      case 'Completed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Client Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Welcome, {clientData.name}</CardTitle>
            <CardDescription className="text-gray-300">
              Manage your projects and communicate with our team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{clientData.projectsCount}</p>
                  <p className="text-sm text-gray-400">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{clientData.activeProjects}</p>
                  <p className="text-sm text-gray-400">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{clientData.totalSpent}</p>
                  <p className="text-sm text-gray-400">Total Investment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-sm text-gray-400">Months Client</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">My Projects</CardTitle>
            <CardDescription className="text-gray-400">
              Track progress and manage your active projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Progress</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-white mt-1">{project.progress}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Deadline</p>
                      <p className="text-white">{project.deadline}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Budget</p>
                      <p className="text-white">{project.budget}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Team
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

export default DashboardClient;
