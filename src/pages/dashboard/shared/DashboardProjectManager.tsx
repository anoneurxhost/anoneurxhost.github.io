import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  Star
} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardProjectManager = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      client: "TechCorp Inc.",
      type: "Web Development",
      status: "In Progress",
      priority: "High",
      progress: 75,
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      budget: 15000,
      spent: 11250,
      description: "Modern e-commerce platform with payment integration and admin panel"
    },
    {
      id: 2,
      title: "Food Delivery App",
      client: "QuickEats LLC",
      type: "Mobile Development",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      team: ["Sarah Wilson", "Tom Brown"],
      startDate: "2023-12-01",
      dueDate: "2024-01-10",
      budget: 25000,
      spent: 24500,
      description: "Cross-platform mobile app for food delivery with real-time tracking"
    },
    {
      id: 3,
      title: "AI Customer Support",
      client: "ServicePro",
      type: "AI Development",
      status: "Planning",
      priority: "High",
      progress: 15,
      team: ["Alex Chen", "Emma Davis"],
      startDate: "2024-02-01",
      dueDate: "2024-03-15",
      budget: 18000,
      spent: 2700,
      description: "AI-powered customer support chatbot with natural language processing"
    },
    {
      id: 4,
      title: "Inventory Management",
      client: "RetailMax",
      type: "Desktop Application",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      team: ["David Kim", "Lisa Rodriguez"],
      startDate: "2024-01-20",
      dueDate: "2024-03-01",
      budget: 12000,
      spent: 5400,
      description: "Windows desktop application for inventory tracking and management"
    }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Full Stack Developer",
      activeProjects: 2,
      completedTasks: 24,
      efficiency: 95,
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX Designer",
      activeProjects: 3,
      completedTasks: 18,
      efficiency: 92,
      avatar: "JS"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Backend Developer",
      activeProjects: 1,
      completedTasks: 15,
      efficiency: 88,
      avatar: "MJ"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Mobile Developer",
      activeProjects: 2,
      completedTasks: 22,
      efficiency: 94,
      avatar: "SW"
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Progress": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Planning": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "On Hold": return "bg-red-500/20 text-red-300 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Low": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "In Progress").length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout title="Project Manager Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Project Management Dashboard
            </h1>
            <p className="text-gray-400">
              Manage projects, track progress, and coordinate with your team.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <FolderOpen className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-transparent border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{totalProjects}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-transparent border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">{activeProjects}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-transparent border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{completedProjects}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-transparent border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-white">${totalBudget.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-transparent border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Utilization</p>
                  <p className="text-2xl font-bold text-white">{Math.round((totalSpent / totalBudget) * 100)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">Projects</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-blue-600">Team</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">Analytics</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-600">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/20 text-white"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Projects List */}
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="bg-transparent border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
                          <span>Client: {project.client}</span>
                          <span>Type: {project.type}</span>
                          <span>Due: {project.dueDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.team.map((member, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="lg:w-64 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Budget</span>
                          <span className="text-white">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                        </div>
                        <Progress value={(project.spent / project.budget) * 100} className="w-full" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 border-white/20 text-white">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id} className="bg-transparent border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-lg">{member.avatar}</span>
                      </div>
                      <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active Projects</span>
                          <span className="text-white">{member.activeProjects}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Completed Tasks</span>
                          <span className="text-white">{member.completedTasks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Efficiency</span>
                          <span className="text-green-400">{member.efficiency}%</span>
                        </div>
                        <div className="flex items-center justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(member.efficiency / 20)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-transparent border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Project Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">In Progress</span>
                      <span className="text-blue-400">{activeProjects} projects</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Completed</span>
                      <span className="text-green-400">{completedProjects} projects</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Planning</span>
                      <span className="text-yellow-400">1 project</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-transparent border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Budget</span>
                      <span className="text-white">${totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total Spent</span>
                      <span className="text-blue-400">${totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Remaining</span>
                      <span className="text-green-400">${(totalBudget - totalSpent).toLocaleString()}</span>
                    </div>
                    <Progress value={(totalSpent / totalBudget) * 100} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="bg-transparent border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
                <CardDescription className="text-gray-400">
                  Project milestones and deliverables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .filter(p => p.status !== "Completed")
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{project.title}</p>
                          <p className="text-gray-400 text-sm">{project.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{project.dueDate}</p>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProjectManager;