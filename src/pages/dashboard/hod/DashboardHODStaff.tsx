
import { useState } from "react";
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
  Eye,
  Star,
  TrendingUp,
  Award,
  Calendar
} from "lucide-react";

const DashboardHODStaff = () => {
  const [staff] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      position: "Senior Developer",
      email: "alice.johnson@company.com",
      phone: "+1-555-0201",
      joinDate: "2023-01-15",
      performance: 94,
      status: "Active",
      projects: 3,
      tasksCompleted: 28,
      rating: 4.8
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Frontend Developer",
      email: "bob.smith@company.com",
      phone: "+1-555-0202",
      joinDate: "2023-06-20",
      performance: 87,
      status: "Active",
      projects: 2,
      tasksCompleted: 22,
      rating: 4.5
    },
    {
      id: 3,
      name: "Carol Brown",
      position: "UI/UX Designer",
      email: "carol.brown@company.com",
      phone: "+1-555-0203",
      joinDate: "2023-03-10",
      performance: 91,
      status: "On Leave",
      projects: 2,
      tasksCompleted: 25,
      rating: 4.7
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "On Leave": return "bg-yellow-600";
      case "Inactive": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-400";
    if (performance >= 80) return "text-blue-400";
    if (performance >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      <DashboardLayout title="HOD Dashboard - Department Staff">
        <div className="space-y-6">
          <Tabs defaultValue="staff" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="staff">Team Members</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="assignments">Task Assignments</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="staff">
              <div className="space-y-6">
                {/* Department Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-bold text-lg">24</p>
                          <p className="text-gray-300 text-sm">Total Staff</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-bold text-lg">89%</p>
                          <p className="text-gray-300 text-sm">Avg Performance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white font-bold text-xl">156</p>
                          <p className="text-gray-300 text-sm">Tasks Completed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-bold text-xl">8</p>
                          <p className="text-gray-300 text-sm">Active Projects</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Search and Actions */}
                <Card className="bg-white/10 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search staff members..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Positions</option>
                        <option>Developers</option>
                        <option>Designers</option>
                        <option>Managers</option>
                      </select>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Leave</option>
                      </select>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Staff
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Staff List */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Department Staff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {staff.map((member) => (
                        <div key={member.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold">{member.name}</h4>
                                  <p className="text-gray-300 text-sm">{member.position}</p>
                                  <p className="text-gray-400 text-xs">{member.email}</p>
                                </div>
                                <Badge className={getStatusColor(member.status)}>
                                  {member.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div>
                                  <p className="text-gray-400 text-sm">Performance</p>
                                  <p className={`font-bold ${getPerformanceColor(member.performance)}`}>
                                    {member.performance}%
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Projects</p>
                                  <p className="text-white font-medium">{member.projects}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Tasks Done</p>
                                  <p className="text-white font-medium">{member.tasksCompleted}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Rating</p>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                    <p className="text-white font-medium">{member.rating}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Join Date</p>
                                  <p className="text-white font-medium">{member.joinDate}</p>
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
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Performance tracking and analytics coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Task Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Task assignment and tracking coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Performance review system coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHODStaff;
