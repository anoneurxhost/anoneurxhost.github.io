import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Users, Calendar, Target, Plus, Eye } from "lucide-react";

const DashboardHODProjects = () => {
  const projects = [
    {
      id: 1,
      name: "AI-Powered Customer Service Bot",
      status: "In Progress",
      progress: 75,
      team: ["John Doe", "Jane Smith", "Bob Wilson"],
      deadline: "2024-07-15",
      budget: "$85,000",
      department: "AI Development"
    },
    {
      id: 2,
      name: "Mobile Banking Application",
      status: "Planning",
      progress: 25,
      team: ["Alice Johnson", "Mike Chen"],
      deadline: "2024-08-30",
      budget: "$120,000",
      department: "Web Development"
    },
    {
      id: 3,
      name: "Robotics Process Automation",
      status: "Completed",
      progress: 100,
      team: ["Sarah Davis", "Tom Brown", "Lisa Wang"],
      deadline: "2024-06-01",
      budget: "$95,000",
      department: "Robotics"
    },
    {
      id: 4,
      name: "Cybersecurity Framework",
      status: "In Progress",
      progress: 60,
      team: ["David Lee", "Emma Wilson"],
      deadline: "2024-07-20",
      budget: "$75,000",
      department: "Cybersecurity"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-600";
      case "In Progress": return "bg-blue-600";
      case "Planning": return "bg-yellow-600";
      case "On Hold": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === "In Progress").length,
    completed: projects.filter(p => p.status === "Completed").length,
    planning: projects.filter(p => p.status === "Planning").length
  };

  return (
    <DashboardLayout title="Project Management">
      <div className="space-y-6">
        {/* Project Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-3xl font-bold text-white">{projectStats.total}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-white">{projectStats.inProgress}</p>
                </div>
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{projectStats.completed}</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Planning</p>
                  <p className="text-3xl font-bold text-white">{projectStats.planning}</p>
                </div>
                <Plus className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Department Projects</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-semibold text-lg">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{project.department}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">Due: {project.deadline}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{project.team.length} members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">Budget: {project.budget}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="w-full" />
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Team:</span>
                          <div className="flex space-x-1">
                            {project.team.map((member, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="ml-4">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHODProjects;