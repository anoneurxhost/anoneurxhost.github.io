
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Plus, Edit3, Trash2, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "AI Healthcare Platform",
      description: "Revolutionary AI-powered healthcare management system",
      status: "In Development",
      startDate: "2024-01-15",
      expectedCompletion: "2024-06-30",
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      image: "/api/placeholder/300/200",
      category: "AI Development"
    },
    {
      id: 2,
      name: "Smart City Infrastructure",
      description: "IoT-based smart city management platform",
      status: "Planning",
      startDate: "2024-03-01",
      expectedCompletion: "2024-12-31",
      team: ["Alice Brown", "Bob Wilson"],
      image: "/api/placeholder/300/200",
      category: "IoT Solutions"
    },
    {
      id: 3,
      name: "Blockchain Finance App",
      description: "Decentralized finance application with smart contracts",
      status: "Completed",
      startDate: "2023-08-01",
      expectedCompletion: "2024-02-28",
      team: ["Charlie Davis", "Diana Evans"],
      image: "/api/placeholder/300/200",
      category: "Blockchain"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-600';
      case 'in development': return 'bg-blue-600';
      case 'planning': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const handleDelete = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast("Project deleted successfully!");
  };

  return (
    <DashboardLayout title="Projects Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Projects Management</h2>
                <p className="text-purple-300">Manage upcoming and ongoing projects</p>
              </div>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Project Form */}
        {showAddForm && (
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Add New Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Project Name</Label>
                  <Input className="bg-white/20 border-white/30 text-white" />
                </div>
                <div>
                  <Label className="text-white">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="ai">AI Development</SelectItem>
                      <SelectItem value="iot">IoT Solutions</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label className="text-white">Description</Label>
                <Textarea className="bg-white/20 border-white/30 text-white" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Start Date</Label>
                  <Input type="date" className="bg-white/20 border-white/30 text-white" />
                </div>
                <div>
                  <Label className="text-white">Expected Completion</Label>
                  <Input type="date" className="bg-white/20 border-white/30 text-white" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add Project
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/10 border-gray-700 backdrop-blur-xl">
              <CardContent className="p-4">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                
                <h3 className="text-white font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                
                <Badge className={getStatusColor(project.status)} >
                  {project.status}
                </Badge>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(project.startDate).toLocaleDateString()} - {new Date(project.expectedCompletion).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {project.team.length} team members
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerProjects;
