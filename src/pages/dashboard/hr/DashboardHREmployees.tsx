
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  UserCheck
} from "lucide-react";

const DashboardHREmployees = () => {
  const [employees] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      phone: "+1-555-0101",
      position: "Senior Developer",
      department: "Development",
      location: "New York",
      joinDate: "2023-01-15",
      status: "Active",
      salary: 85000,
      performance: 92
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      phone: "+1-555-0102",
      position: "UI/UX Designer",
      department: "Design",
      location: "San Francisco",
      joinDate: "2023-03-20",
      status: "Active",
      salary: 75000,
      performance: 88
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      phone: "+1-555-0103",
      position: "Project Manager",
      department: "Management",
      location: "Remote",
      joinDate: "2022-11-10",
      status: "On Leave",
      salary: 90000,
      performance: 85
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "On Leave": return "bg-yellow-600";
      case "Inactive": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <>
      <DashboardLayout title="HR Management - Employees">
        <div className="space-y-6">
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="employees">Employee Directory</TabsTrigger>
              <TabsTrigger value="add">Add Employee</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Employee Management</span>
                    <Button onClick={() => setShowAddForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search employees..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Departments</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Management</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {employees.map((employee) => (
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
                                  <p className="text-gray-300 text-sm">{employee.position}</p>
                                </div>
                                <Badge className={getStatusColor(employee.status)}>
                                  {employee.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                                <div className="flex items-center space-x-2">
                                  <Building className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-300 text-sm">{employee.department}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-300 text-sm">{employee.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-300 text-sm">{employee.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-300 text-sm">{employee.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Add New Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="position" className="text-white">Position</Label>
                      <Input id="position" placeholder="Enter position" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-white">Department</Label>
                      <select id="department" className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>Development</option>
                        <option>Design</option>
                        <option>Management</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="salary" className="text-white">Salary</Label>
                      <Input id="salary" type="number" placeholder="Enter salary" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button>Add Employee</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold text-blue-400">156</div>
                    <p className="text-gray-300 text-sm">Total Employees</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold text-green-400">142</div>
                    <p className="text-gray-300 text-sm">Active</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold text-yellow-400">14</div>
                    <p className="text-gray-300 text-sm">On Leave</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-xl font-bold text-purple-400">23</div>
                    <p className="text-gray-300 text-sm">New This Month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHREmployees;
