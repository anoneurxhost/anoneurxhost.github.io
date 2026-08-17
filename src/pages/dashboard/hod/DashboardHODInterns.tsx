
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Edit, 
  Eye,
  Users,
  Calendar,
  Award,
  BookOpen
} from "lucide-react";

const DashboardHODInterns = () => {
  const [interns] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      university: "Stanford University",
      program: "Computer Science",
      supervisor: "Alice Johnson",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      progress: 75,
      performance: "Excellent",
      status: "Active"
    },
    {
      id: 2,
      name: "James Chen",
      university: "MIT",
      program: "Software Engineering",
      supervisor: "Bob Smith",
      startDate: "2024-02-01",
      endDate: "2024-07-01",
      progress: 60,
      performance: "Good",
      status: "Active"
    },
    {
      id: 3,
      name: "Sofia Garcia",
      university: "UC Berkeley",
      program: "Data Science",
      supervisor: "Carol Brown",
      startDate: "2024-01-20",
      endDate: "2024-06-20",
      progress: 45,
      performance: "Good",
      status: "On Leave"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "On Leave": return "bg-yellow-600";
      case "Completed": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent": return "text-green-400";
      case "Good": return "text-blue-400";
      case "Average": return "text-yellow-400";
      case "Poor": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <>
      <DashboardLayout title="HOD Dashboard - Department Interns">
        <div className="space-y-6">
          <Tabs defaultValue="interns" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="interns">Current Interns</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
            </TabsList>

            <TabsContent value="interns">
              <div className="space-y-6">
                {/* Intern Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-bold text-xl">12</p>
                          <p className="text-gray-300 text-sm">Active Interns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-bold text-xl">8</p>
                          <p className="text-gray-300 text-sm">Supervisors</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white font-bold text-xl">68%</p>
                          <p className="text-gray-300 text-sm">Avg Progress</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-bold text-xl">4</p>
                          <p className="text-gray-300 text-sm">Programs</p>
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
                        <Input placeholder="Search interns..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Programs</option>
                        <option>Computer Science</option>
                        <option>Software Engineering</option>
                        <option>Data Science</option>
                      </select>
                      <select className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Completed</option>
                      </select>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Intern
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Interns List */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Department Interns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {interns.map((intern) => (
                        <div key={intern.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {intern.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold">{intern.name}</h4>
                                  <p className="text-gray-300 text-sm">{intern.university}</p>
                                  <p className="text-gray-400 text-xs">{intern.program}</p>
                                </div>
                                <Badge className={getStatusColor(intern.status)}>
                                  {intern.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div>
                                  <p className="text-gray-400 text-sm">Supervisor</p>
                                  <p className="text-white font-medium">{intern.supervisor}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Duration</p>
                                  <p className="text-white font-medium">
                                    {intern.startDate} to {intern.endDate}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Progress</p>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-blue-500 h-2 rounded-full" 
                                        style={{ width: `${intern.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-white text-sm">{intern.progress}%</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Performance</p>
                                  <p className={`font-medium ${getPerformanceColor(intern.performance)}`}>
                                    {intern.performance}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-400 text-sm">Program</p>
                                  <p className="text-white font-medium">{intern.program}</p>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Intern Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Intern application review and management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluations">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Evaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Intern evaluation and assessment tools coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Internship Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Internship program management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHODInterns;
