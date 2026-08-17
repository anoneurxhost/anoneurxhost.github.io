
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Award,
  DollarSign,
  FileText,
  AlertTriangle,
  Plus,
  Check,
  X,
  GraduationCap,
  Banknote,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Star,
  Edit,
  Trash2,
  Eye,
  Building2
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  performance: number;
  manager: string;
  location: string;
}

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeId: number;
  type: 'Vacation' | 'Sick Leave' | 'Personal' | 'Maternity' | 'Emergency';
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  appliedDate: string;
}

interface Payroll {
  id: number;
  employeeName: string;
  employeeId: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  payPeriod: string;
  status: 'Processed' | 'Pending' | 'Hold';
}

const DashboardHRComplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);

  // Mock data - in real app this would come from API/database
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Web Development',
      position: 'Senior Developer',
      salary: 95000,
      joinDate: '2022-03-15',
      status: 'Active',
      performance: 92,
      manager: 'John Smith',
      location: 'New York'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'AI Development',
      position: 'AI Researcher',
      salary: 120000,
      joinDate: '2021-08-20',
      status: 'Active',
      performance: 96,
      manager: 'Jane Doe',
      location: 'San Francisco'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Robotics',
      position: 'Robotics Engineer',
      salary: 88000,
      joinDate: '2023-01-10',
      status: 'On Leave',
      performance: 89,
      manager: 'Bob Wilson',
      location: 'Austin'
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 1,
      type: 'Vacation',
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      days: 6,
      status: 'Pending',
      reason: 'Holiday vacation with family',
      appliedDate: '2024-12-01'
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 2,
      type: 'Sick Leave',
      startDate: '2024-12-18',
      endDate: '2024-12-18',
      days: 1,
      status: 'Approved',
      reason: 'Medical appointment',
      appliedDate: '2024-12-15'
    }
  ]);

  const [payrollData] = useState<Payroll[]>([
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 1,
      basicSalary: 95000,
      allowances: 5000,
      deductions: 8000,
      netSalary: 92000,
      payPeriod: 'December 2024',
      status: 'Processed'
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 2,
      basicSalary: 120000,
      allowances: 8000,
      deductions: 12000,
      netSalary: 116000,
      payPeriod: 'December 2024',
      status: 'Processed'
    }
  ]);

  const hrStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === 'Active').length,
    onLeave: employees.filter(emp => emp.status === 'On Leave').length,
    pendingLeaves: leaveRequests.filter(req => req.status === 'Pending').length,
    newHires: 5,
    avgPerformance: Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length),
    totalPayroll: payrollData.reduce((sum, pay) => sum + pay.netSalary, 0),
    openPositions: 8
  };

  const departments = ['Web Development', 'AI Development', 'Robotics', 'Networking', 'Cybersecurity', 'Blockchain'];

  const handleLeaveAction = (id: number, action: 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: action } : request
      )
    );
    toast(`Leave request ${action.toLowerCase()} successfully!`);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout title="Complete HR Management">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.totalEmployees}</p>
                  <p className="text-gray-300 text-sm">Total Staff</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.activeEmployees}</p>
                  <p className="text-gray-300 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.onLeave}</p>
                  <p className="text-gray-300 text-sm">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.pendingLeaves}</p>
                  <p className="text-gray-300 text-sm">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.avgPerformance}%</p>
                  <p className="text-gray-300 text-sm">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.openPositions}</p>
                  <p className="text-gray-300 text-sm">Open Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-pink-400" />
                <div>
                  <p className="text-white font-bold text-lg">{hrStats.newHires}</p>
                  <p className="text-gray-300 text-sm">New Hires</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-base">${(hrStats.totalPayroll / 1000).toFixed(0)}K</p>
                  <p className="text-gray-300 text-sm">Payroll</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="leaves">Leave Management</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Employee Management Tab */}
          <TabsContent value="employees" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Employee Directory</CardTitle>
                  <div className="flex space-x-2">
                    <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Employee
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">Add New Employee</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white">Full Name</Label>
                            <Input placeholder="Enter full name" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Email</Label>
                            <Input placeholder="email@company.com" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Phone</Label>
                            <Input placeholder="+1 (555) 000-0000" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Department</Label>
                            <Select>
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map(dept => (
                                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-white">Position</Label>
                            <Input placeholder="Job title" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Salary</Label>
                            <Input placeholder="Annual salary" type="number" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Manager</Label>
                            <Input placeholder="Direct manager" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                          <div>
                            <Label className="text-white">Location</Label>
                            <Input placeholder="Work location" className="bg-gray-700 border-gray-600 text-white" />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => {
                            toast("Employee added successfully!");
                            setIsAddEmployeeOpen(false);
                          }}>
                            Add Employee
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee List */}
                <div className="space-y-4">
                  {filteredEmployees.map((employee) => (
                    <div key={employee.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{employee.name}</h3>
                            <p className="text-gray-300 text-sm">{employee.position}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-gray-400 text-xs flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {employee.email}
                              </span>
                              <span className="text-gray-400 text-xs flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {employee.phone}
                              </span>
                              <span className="text-gray-400 text-xs flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {employee.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge className={employee.status === 'Active' ? 'bg-green-600' : employee.status === 'On Leave' ? 'bg-yellow-600' : 'bg-red-600'}>
                              {employee.status}
                            </Badge>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white text-sm">{employee.performance}%</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leave Management Tab */}
          <TabsContent value="leaves" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Leave Requests</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Leave Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{request.employeeName}</h3>
                          <p className="text-gray-300 text-sm">{request.type} - {request.days} day(s)</p>
                          <p className="text-gray-400 text-xs">{request.startDate} to {request.endDate}</p>
                          <p className="text-gray-400 text-xs mt-1">Reason: {request.reason}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            request.status === 'Approved' ? 'bg-green-600' :
                            request.status === 'Rejected' ? 'bg-red-600' : 'bg-yellow-600'
                          }>
                            {request.status}
                          </Badge>
                          {request.status === 'Pending' && (
                            <div className="flex space-x-1">
                              <Button size="sm" onClick={() => handleLeaveAction(request.id, 'Approved')}>
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleLeaveAction(request.id, 'Rejected')}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Payroll Management</CardTitle>
                  <Button>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Process Payroll
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollData.map((payroll) => (
                    <div key={payroll.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{payroll.employeeName}</h3>
                          <p className="text-gray-300 text-sm">Pay Period: {payroll.payPeriod}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">${payroll.netSalary.toLocaleString()}</p>
                          <Badge className={payroll.status === 'Processed' ? 'bg-green-600' : 'bg-yellow-600'}>
                            {payroll.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-400">Basic: </span>
                          <span className="text-white">${payroll.basicSalary.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Allowances: </span>
                          <span className="text-green-400">+${payroll.allowances.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Deductions: </span>
                          <span className="text-red-400">-${payroll.deductions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recruitment Tab */}
          <TabsContent value="recruitment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Job Openings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium">Senior Developer</h4>
                      <p className="text-gray-400 text-sm">Web Development</p>
                      <Badge className="mt-1 bg-blue-600">5 Applications</Badge>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium">AI Researcher</h4>
                      <p className="text-gray-400 text-sm">AI Development</p>
                      <Badge className="mt-1 bg-blue-600">12 Applications</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Interview Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium">John Doe</h4>
                      <p className="text-gray-400 text-sm">Today, 2:00 PM</p>
                      <p className="text-gray-400 text-xs">Senior Developer Position</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-medium">Jane Smith</h4>
                      <p className="text-gray-400 text-sm">Tomorrow, 10:00 AM</p>
                      <p className="text-gray-400 text-xs">AI Researcher Position</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Hiring Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Applications</span>
                      <span className="text-white">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Screening</span>
                      <span className="text-white">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interviews</span>
                      <span className="text-white">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Offers</span>
                      <span className="text-white">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Employee Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{employee.name}</h3>
                          <p className="text-gray-300 text-sm">{employee.position}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white font-bold">{employee.performance}%</span>
                            </div>
                            <p className="text-gray-400 text-xs">Performance Score</p>
                          </div>
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full"
                              style={{ width: `${employee.performance}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Generate Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Employee Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Payroll Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Attendance Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Performance Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Employee Turnover</span>
                      <span className="text-white">5.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Avg. Tenure</span>
                      <span className="text-white">2.8 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Training Hours</span>
                      <span className="text-white">1,240</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Satisfaction Score</span>
                      <span className="text-white">4.2/5</span>
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

export default DashboardHRComplete;
