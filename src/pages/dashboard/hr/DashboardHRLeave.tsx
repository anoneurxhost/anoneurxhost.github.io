
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  Check, 
  X, 
  Eye,
  User,
  Search,
  Filter,
  PlusCircle
} from "lucide-react";

const DashboardHRLeave = () => {
  const [leaveRequests] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      department: "Development",
      leaveType: "Annual Leave",
      startDate: "2024-04-15",
      endDate: "2024-04-19",
      days: 5,
      reason: "Family vacation",
      status: "Pending",
      appliedDate: "2024-03-15",
      managerId: "MGR001"
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Design",
      leaveType: "Sick Leave",
      startDate: "2024-04-10",
      endDate: "2024-04-12",
      days: 3,
      reason: "Medical checkup",
      status: "Approved",
      appliedDate: "2024-03-10",
      managerId: "MGR002"
    },
    {
      id: 3,
      employeeName: "Mike Wilson",
      employeeId: "EMP003",
      department: "Management",
      leaveType: "Emergency Leave",
      startDate: "2024-04-08",
      endDate: "2024-04-08",
      days: 1,
      reason: "Family emergency",
      status: "Rejected",
      appliedDate: "2024-03-08",
      managerId: "MGR001"
    }
  ]);

  const [leaveBalance] = useState([
    { employeeId: "EMP001", name: "John Smith", annual: 15, sick: 8, emergency: 3, used: 5 },
    { employeeId: "EMP002", name: "Sarah Johnson", annual: 18, sick: 6, emergency: 2, used: 3 },
    { employeeId: "EMP003", name: "Mike Wilson", annual: 20, sick: 10, emergency: 5, used: 8 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-600";
      case "Pending": return "bg-yellow-600";
      case "Rejected": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case "Annual Leave": return "bg-blue-600";
      case "Sick Leave": return "bg-orange-600";
      case "Emergency Leave": return "bg-red-600";
      case "Maternity Leave": return "bg-purple-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <>
      <DashboardLayout title="HR Management - Leave Management">
        <div className="space-y-6">
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="requests">Leave Requests</TabsTrigger>
              <TabsTrigger value="balance">Leave Balance</TabsTrigger>
              <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
              <TabsTrigger value="policies">Leave Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <div className="space-y-6">
                {/* Leave Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <div>
                           <p className="text-white font-bold text-lg">24</p>
                          <p className="text-gray-300 text-sm">Pending Requests</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-bold text-lg">156</p>
                          <p className="text-gray-300 text-sm">Approved</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <X className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-white font-bold text-lg">12</p>
                          <p className="text-gray-300 text-sm">Rejected</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-bold text-lg">342</p>
                          <p className="text-gray-300 text-sm">Total Days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Filter */}
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search by employee name..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                      </select>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Departments</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Management</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Leave Requests List */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Leave Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaveRequests.map((request) => (
                        <div key={request.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">
                                    {request.employeeName.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold">{request.employeeName}</h4>
                                  <p className="text-gray-300 text-sm">{request.employeeId} • {request.department}</p>
                                </div>
                                <Badge className={getLeaveTypeColor(request.leaveType)}>
                                  {request.leaveType}
                                </Badge>
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-gray-400">Start Date</p>
                                  <p className="text-white">{request.startDate}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">End Date</p>
                                  <p className="text-white">{request.endDate}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Duration</p>
                                  <p className="text-white">{request.days} days</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Applied</p>
                                  <p className="text-white">{request.appliedDate}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-gray-400 text-sm">Reason:</p>
                                <p className="text-white text-sm">{request.reason}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {request.status === "Pending" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
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
              </div>
            </TabsContent>

            <TabsContent value="balance">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Employee Leave Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaveBalance.map((balance) => (
                      <div key={balance.employeeId} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {balance.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{balance.name}</h4>
                              <p className="text-gray-300 text-sm">{balance.employeeId}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-6 text-center">
                            <div>
                              <p className="text-blue-400 font-bold text-base">{balance.annual}</p>
                              <p className="text-gray-400 text-xs">Annual</p>
                            </div>
                            <div>
                              <p className="text-orange-400 font-bold text-base">{balance.sick}</p>
                              <p className="text-gray-400 text-xs">Sick</p>
                            </div>
                            <div>
                              <p className="text-red-400 font-bold text-base">{balance.emergency}</p>
                              <p className="text-gray-400 text-xs">Emergency</p>
                            </div>
                            <div>
                              <p className="text-gray-400 font-bold text-base">{balance.used}</p>
                              <p className="text-gray-400 text-xs">Used</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Leave Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Interactive leave calendar view coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Leave Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Leave policies and configurations...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRLeave;
