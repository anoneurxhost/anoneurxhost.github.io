
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, Users, MessageSquare } from "lucide-react";

const DashboardClientProjects = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      status: "In Progress",
      progress: 75,
      deadline: "2024-02-15",
      budget: "$25,000",
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      description: "Complete e-commerce platform with payment integration"
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: "Planning",
      progress: 25,
      deadline: "2024-04-20",
      budget: "$35,000",
      team: ["Sarah Wilson", "David Brown"],
      description: "iOS and Android mobile application"
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      status: "Completed",
      progress: 100,
      deadline: "2023-12-10",
      budget: "$15,000",
      team: ["Emily Davis", "Robert Lee"],
      description: "Business intelligence dashboard with real-time analytics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600';
      case 'Planning': return 'bg-yellow-600';
      case 'Completed': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="My Projects">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-sm text-gray-400">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2</p>
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
                  <p className="text-2xl font-bold text-white">$75K</p>
                  <p className="text-sm text-gray-400">Total Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Deadline</p>
                        <p className="text-white">{project.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Budget</p>
                        <p className="text-white">{project.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Team Size</p>
                        <p className="text-white">{project.team.length} members</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardClientProjects;
