
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GraduationCap, Plus, Eye, Check, X, Clock, Users, Calendar } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Intern {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  position: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  appliedDate: string;
  startDate?: string;
  duration: string;
  supervisor?: string;
}

interface InternshipPosition {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  duration: string;
  stipend: number;
  openings: number;
  applications: number;
  status: 'open' | 'closed';
}

const InternshipManagement = () => {
  const [interns, setInterns] = useState<Intern[]>([
    {
      id: '1',
      name: 'John Student',
      email: 'john@university.edu',
      university: 'MIT',
      department: 'web-mobile',
      position: 'Frontend Developer Intern',
      status: 'pending',
      appliedDate: '2024-01-15',
      duration: '3 months'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@university.edu',
      university: 'Stanford',
      department: 'ai-dev',
      position: 'AI Research Intern',
      status: 'active',
      appliedDate: '2023-12-01',
      startDate: '2024-01-01',
      duration: '6 months',
      supervisor: 'Dr. Smith'
    }
  ]);

  const [positions, setPositions] = useState<InternshipPosition[]>([
    {
      id: '1',
      title: 'Frontend Developer Intern',
      department: 'web-mobile',
      description: 'Work on React applications and mobile development',
      requirements: ['React', 'TypeScript', 'Mobile Development'],
      duration: '3-6 months',
      stipend: 2000,
      openings: 2,
      applications: 5,
      status: 'open'
    },
    {
      id: '2',
      title: 'AI Research Intern',
      department: 'ai-dev',
      description: 'Research and develop AI models',
      requirements: ['Python', 'Machine Learning', 'TensorFlow'],
      duration: '6 months',
      stipend: 2500,
      openings: 1,
      applications: 8,
      status: 'open'
    }
  ]);

  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: '',
    department: '',
    description: '',
    duration: '',
    stipend: '',
    openings: ''
  });

  const departments = [
    { id: 'web-mobile', name: 'Web/Mobile Development' },
    { id: 'ai-dev', name: 'AI Development' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'networking', name: 'Networking' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'approved': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'active': return 'bg-blue-600';
      case 'completed': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const handleStatusChange = (internId: string, newStatus: 'approved' | 'rejected') => {
    setInterns(prev => 
      prev.map(intern => 
        intern.id === internId 
          ? { ...intern, status: newStatus, startDate: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : undefined }
          : intern
      )
    );
    toast(`Intern application ${newStatus}!`);
  };

  const handleAddPosition = () => {
    if (!newPosition.title || !newPosition.department || !newPosition.description) {
      toast("Please fill in all required fields");
      return;
    }

    const position: InternshipPosition = {
      id: Date.now().toString(),
      title: newPosition.title,
      department: newPosition.department,
      description: newPosition.description,
      requirements: [],
      duration: newPosition.duration,
      stipend: parseInt(newPosition.stipend) || 0,
      openings: parseInt(newPosition.openings) || 1,
      applications: 0,
      status: 'open'
    };

    setPositions(prev => [...prev, position]);
    setNewPosition({ title: '', department: '', description: '', duration: '', stipend: '', openings: '' });
    setIsAddPositionOpen(false);
    toast("Internship position created successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-transparent backdrop-blur-md border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-bold text-xl">{interns.filter(i => i.status === 'active').length}</p>
                <p className="text-gray-300 text-sm">Active Interns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-transparent backdrop-blur-md border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-bold text-xl">{interns.filter(i => i.status === 'pending').length}</p>
                <p className="text-gray-300 text-sm">Pending Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-transparent backdrop-blur-md border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-bold text-xl">{positions.filter(p => p.status === 'open').length}</p>
                <p className="text-gray-300 text-sm">Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-transparent backdrop-blur-md border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-bold text-xl">{interns.filter(i => i.status === 'completed').length}</p>
                <p className="text-gray-300 text-sm">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="active">Active Interns</TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <Card className="bg-transparent backdrop-blur-md border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Internship Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interns.filter(i => i.status === 'pending').map((intern) => (
                  <div key={intern.id} className="flex items-center justify-between p-4 rounded-lg bg-transparent backdrop-blur-md">
                    <div>
                      <p className="text-white font-medium">{intern.name}</p>
                      <p className="text-gray-300 text-sm">{intern.email} • {intern.university}</p>
                      <p className="text-gray-400 text-xs">{intern.position} • Applied: {intern.appliedDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(intern.status)}>
                        {intern.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(intern.id, 'approved')}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(intern.id, 'rejected')}>
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card className="bg-transparent backdrop-blur-md border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Internship Positions</CardTitle>
                <Dialog open={isAddPositionOpen} onOpenChange={setIsAddPositionOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Position
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-transparent backdrop-blur-md border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Create Internship Position</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-white">Position Title *</Label>
                        <Input
                          id="title"
                          value={newPosition.title}
                          onChange={(e) => setNewPosition(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-transparent border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="department" className="text-white">Department *</Label>
                        <select
                          id="department"
                          value={newPosition.department}
                          onChange={(e) => setNewPosition(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                        >
                          <option value="">Select Department</option>
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-white">Description *</Label>
                        <textarea
                          id="description"
                          value={newPosition.description}
                          onChange={(e) => setNewPosition(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration" className="text-white">Duration</Label>
                          <Input
                            id="duration"
                            value={newPosition.duration}
                            onChange={(e) => setNewPosition(prev => ({ ...prev, duration: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="e.g., 3 months"
                          />
                        </div>
                        <div>
                          <Label htmlFor="stipend" className="text-white">Monthly Stipend</Label>
                          <Input
                            id="stipend"
                            type="number"
                            value={newPosition.stipend}
                            onChange={(e) => setNewPosition(prev => ({ ...prev, stipend: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="openings" className="text-white">Number of Openings</Label>
                        <Input
                          id="openings"
                          type="number"
                          value={newPosition.openings}
                          onChange={(e) => setNewPosition(prev => ({ ...prev, openings: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddPositionOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPosition}>Create Position</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position) => (
                  <div key={position.id} className="p-4 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{position.title}</h4>
                      <Badge className={position.status === 'open' ? 'bg-green-600' : 'bg-red-600'}>
                        {position.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{position.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <span className="text-gray-400">Department: <span className="text-white">{departments.find(d => d.id === position.department)?.name}</span></span>
                      <span className="text-gray-400">Duration: <span className="text-white">{position.duration}</span></span>
                      <span className="text-gray-400">Stipend: <span className="text-white">${position.stipend}/month</span></span>
                      <span className="text-gray-400">Applications: <span className="text-white">{position.applications}/{position.openings}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active Interns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interns.filter(i => i.status === 'active').map((intern) => (
                  <div key={intern.id} className="p-4 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{intern.name}</p>
                        <p className="text-gray-300 text-sm">{intern.email} • {intern.university}</p>
                        <p className="text-gray-400 text-xs">{intern.position}</p>
                        {intern.supervisor && (
                          <p className="text-gray-400 text-xs">Supervisor: {intern.supervisor}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(intern.status)}>
                          {intern.status}
                        </Badge>
                        <p className="text-gray-400 text-xs mt-1">Started: {intern.startDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternshipManagement;
