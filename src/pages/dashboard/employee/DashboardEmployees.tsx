import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Monitor,
  Smartphone,
  Brain,
  Bot,
  Wifi,
  Shield,
  Blocks,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building
} from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  salary: number;
  skills: string[];
}

interface Department {
  id: string;
  name: string;
  icon: any;
  color: string;
  employeeCount: number;
  budget: number;
}

const DashboardEmployees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments: Department[] = [
    { id: 'web-mobile', name: 'Web/Mobile Development', icon: Monitor, color: 'bg-blue-600', employeeCount: 45, budget: 850000 },
    { id: 'ai-dev', name: 'AI Development', icon: Brain, color: 'bg-purple-600', employeeCount: 32, budget: 720000 },
    { id: 'robotics', name: 'Robotics', icon: Bot, color: 'bg-orange-600', employeeCount: 28, budget: 680000 },
    { id: 'networking', name: 'Networking', icon: Wifi, color: 'bg-green-600', employeeCount: 22, budget: 480000 },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: Shield, color: 'bg-red-600', employeeCount: 25, budget: 620000 },
    { id: 'blockchain', name: 'Blockchain', icon: Blocks, color: 'bg-indigo-600', employeeCount: 18, budget: 540000 }
  ];

  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@nextgen.com',
      phone: '+1-555-0123',
      position: 'Senior Full Stack Developer',
      department: 'web-mobile',
      location: 'San Francisco, CA',
      joinDate: '2022-03-15',
      status: 'active',
      salary: 95000,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@nextgen.com',
      phone: '+1-555-0124',
      position: 'AI Research Scientist',
      department: 'ai-dev',
      location: 'Seattle, WA',
      joinDate: '2021-08-20',
      status: 'active',
      salary: 120000,
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@nextgen.com',
      phone: '+1-555-0125',
      position: 'Robotics Engineer',
      department: 'robotics',
      location: 'Austin, TX',
      joinDate: '2023-01-10',
      status: 'active',
      salary: 88000,
      skills: ['ROS', 'C++', 'Computer Vision', 'Hardware Design']
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@nextgen.com',
      phone: '+1-555-0126',
      position: 'Network Security Specialist',
      department: 'cybersecurity',
      location: 'New York, NY',
      joinDate: '2022-11-05',
      status: 'on-leave',
      salary: 92000,
      skills: ['Penetration Testing', 'CISSP', 'Firewall Management', 'Incident Response']
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@nextgen.com',
      phone: '+1-555-0127',
      position: 'Blockchain Developer',
      department: 'blockchain',
      location: 'Remote',
      joinDate: '2023-06-12',
      status: 'active',
      salary: 105000,
      skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi']
    }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-red-600';
      case 'on-leave': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getDepartmentName = (deptId: string) => {
    return departments.find(d => d.id === deptId)?.name || 'Unknown';
  };

  return (
    <>
      <DashboardLayout title="Employee Administration">
        <div className="space-y-6">
          {/* Department Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Card key={dept.id} className="bg-white/10 border-gray-700 hover:bg-white/15 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${dept.color}`}>
                      <dept.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline">{dept.employeeCount} employees</Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{dept.name}</h3>
                  <p className="text-white text-sm">Budget: ${dept.budget.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Employee Management */}
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="employees">All Employees</TabsTrigger>
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            </TabsList>

            <TabsContent value="employees" className="space-y-6">
              {/* Search and Filter Bar */}
              <Card className="bg-white/10 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-white" />
                      <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Employee List */}
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Employee Directory ({filteredEmployees.length})</span>
                    <Users className="w-5 h-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEmployees.map((employee) => (
                      <div key={employee.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{employee.name}</h4>
                                <p className="text-white text-sm">{employee.position}</p>
                              </div>
                              <Badge className={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4 text-white" />
                                <span className="text-white text-sm">{getDepartmentName(employee.department)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-white" />
                                <span className="text-white text-sm">{employee.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-white" />
                                <span className="text-white text-sm">{employee.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-white" />
                                <span className="text-white text-sm">{employee.location}</span>
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="text-white text-xs mb-1">Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {employee.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Department Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">Department-specific employee management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Employee Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">Employee analytics and insights coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="onboarding">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Employee Onboarding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">Employee onboarding workflow coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardEmployees;
