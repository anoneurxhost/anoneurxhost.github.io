import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Download,
  Star,
  Calendar,
  DollarSign,
  Settings,
  Bell,
  FileText
} from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";

const DashboardUser = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      type: "Web Development",
      status: "In Progress",
      progress: 75,
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 2500,
      description: "Modern e-commerce platform with payment integration"
    },
    {
      id: 2,
      title: "Mobile App",
      type: "Mobile Development",
      status: "Completed",
      progress: 100,
      startDate: "2023-12-01",
      dueDate: "2024-01-10",
      amount: 3000,
      description: "iOS and Android app for food delivery"
    },
    {
      id: 3,
      title: "AI Chatbot",
      type: "AI Development",
      status: "Planning",
      progress: 10,
      startDate: "2024-02-01",
      dueDate: "2024-03-01",
      amount: 1500,
      description: "Customer service AI chatbot with NLP"
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Project Update",
      message: "Your e-commerce website has reached 75% completion",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of $1,500 has been processed successfully",
      time: "1 day ago",
      type: "success"
    },
    {
      id: 3,
      title: "Review Required",
      message: "Please review the latest design mockups for your mobile app",
      time: "3 days ago",
      type: "warning"
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
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const inProgressProjects = projects.filter(p => p.status === "In Progress").length;
  const totalSpent = projects.reduce((sum, p) => sum + p.amount, 0);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout title="User Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400">
              Track your projects and manage your account from here.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <FolderOpen className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
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
          
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
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
          
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-white">{inProgressProjects}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">Projects</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600">Notifications</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-blue-600">Documents</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.startDate} - {project.dueDate}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ${project.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-gray-400">Progress: {project.progress}%</div>
                        <Progress value={project.progress} className="w-32" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <Download className="w-4 h-4 mr-1" />
                            Files
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.type === "info" && <Bell className="w-5 h-5 text-blue-400" />}
                        {notification.type === "success" && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {notification.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-400" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{notification.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4">
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-white font-medium">Project Proposal - E-commerce Website</h3>
                        <p className="text-gray-400 text-sm">PDF • 2.4 MB • Updated 2 days ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/20 text-white">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-white font-medium">Contract Agreement - Mobile App</h3>
                        <p className="text-gray-400 text-sm">PDF • 1.8 MB • Signed</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/20 text-white">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid gap-4">
              <Card className="bg-transparent border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Billing History</CardTitle>
                  <CardDescription className="text-gray-400">
                    View your payment history and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Payment for Mobile App</p>
                        <p className="text-gray-400 text-sm">Jan 10, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">$3,000.00</p>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          Paid
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">E-commerce Website (Partial)</p>
                        <p className="text-gray-400 text-sm">Jan 15, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-semibold">$1,250.00</p>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                          Paid
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;