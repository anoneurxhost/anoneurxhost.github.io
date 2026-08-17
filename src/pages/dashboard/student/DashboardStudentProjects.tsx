
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderOpen, 
  Plus, 
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const DashboardStudentProjects = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      description: "Building a full-stack e-commerce platform using MERN stack",
      status: "in-progress",
      progress: 75,
      dueDate: "2024-03-15",
      category: "web-development",
      priority: "high",
      mentor: "Dr. Sarah Johnson",
      teammates: ["Alice Brown", "Bob Wilson"],
      tasks: {
        total: 12,
        completed: 9,
        pending: 3
      }
    },
    {
      id: 2,
      title: "Machine Learning Research Paper",
      description: "Research on neural networks for image recognition",
      status: "completed",
      progress: 100,
      dueDate: "2024-02-28",
      category: "research",
      priority: "medium",
      mentor: "Prof. Mike Chen",
      teammates: [],
      tasks: {
        total: 8,
        completed: 8,
        pending: 0
      }
    },
    {
      id: 3,
      title: "Mobile App Prototype",
      description: "React Native app for campus navigation",
      status: "planning",
      progress: 25,
      dueDate: "2024-04-20",
      category: "mobile-development",
      priority: "low",
      mentor: "Dr. Emily Watson",
      teammates: ["Carol Davis"],
      tasks: {
        total: 15,
        completed: 4,
        pending: 11
      }
    }
  ]);

  const [assignments] = useState([
    {
      id: 1,
      title: "Database Design Assignment",
      course: "Database Systems",
      dueDate: "2024-02-25",
      status: "submitted",
      grade: "A-",
      submittedDate: "2024-02-24"
    },
    {
      id: 2,
      title: "Algorithm Analysis Report",
      course: "Data Structures",
      dueDate: "2024-02-28",
      status: "pending",
      grade: null,
      submittedDate: null
    },
    {
      id: 3,
      title: "Web Development Project",
      course: "Full Stack Development",
      dueDate: "2024-03-05",
      status: "in-progress",
      grade: null,
      submittedDate: null
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "planning": return "bg-yellow-600";
      case "submitted": return "bg-green-600";
      case "pending": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout title="My Projects">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'in-progress').length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{projects.filter(p => p.status === 'completed').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Due This Week</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Progress</p>
                  <p className="text-2xl font-bold text-white">67%</p>
                </div>
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="projects">Research Projects</TabsTrigger>
            <TabsTrigger value="assignments">Course Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Research Projects</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white/10 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{project.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                            {project.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{project.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400">Due Date</p>
                            <p className="text-white">{project.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400">Mentor</p>
                            <p className="text-white">{project.mentor}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400">Tasks</p>
                            <p className="text-white">{project.tasks.completed}/{project.tasks.total}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400">Category</p>
                            <p className="text-white">{project.category}</p>
                          </div>
                        </div>
                      </div>

                      {project.teammates.length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Team Members:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.teammates.map((teammate, index) => (
                              <Badge key={index} variant="outline" className="text-gray-300">
                                {teammate}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">View Details</Button>
                        <Button size="sm" variant="outline" className="flex-1">Edit Project</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold">Course Assignments</h3>
              
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="bg-white/10 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-semibold">{assignment.title}</h4>
                          <p className="text-gray-400">{assignment.course}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                          {assignment.grade && (
                            <Badge variant="outline" className="text-green-400">
                              {assignment.grade}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Due Date</p>
                          <p className="text-white">{assignment.dueDate}</p>
                        </div>
                        {assignment.submittedDate && (
                          <div>
                            <p className="text-gray-400">Submitted</p>
                            <p className="text-white">{assignment.submittedDate}</p>
                          </div>
                        )}
                        <div className="flex justify-end">
                          <Button size="sm">
                            {assignment.status === 'submitted' ? 'View Submission' : 'Submit Assignment'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No recent submissions</p>
                    <Button className="mt-4">Upload New Submission</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStudentProjects;
