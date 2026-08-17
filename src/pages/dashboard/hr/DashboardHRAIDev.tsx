
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InternshipManagement from "@/components/InternshipManagement";
import { 
  Users, 
  DollarSign,
  Award,
  FileText,
  UserPlus,
  Brain,
  Cpu,
  Zap
} from "lucide-react";

const DashboardHRAIDev = () => {
  const departmentStats = {
    totalEmployees: 32,
    activeProjects: 8,
    monthlyBudget: 720000,
    satisfaction: 4.5,
    pendingLeaves: 2,
    newHires: 4,
    activeInterns: 6
  };

  const employees = [
    { id: 1, name: 'Dr. Sarah Chen', position: 'AI Research Lead', salary: 145000, performance: 96 },
    { id: 2, name: 'Marcus Johnson', position: 'ML Engineer', salary: 125000, performance: 94 },
    { id: 3, name: 'Priya Patel', position: 'Data Scientist', salary: 118000, performance: 92 },
    { id: 4, name: 'Alex Rodriguez', position: 'AI Product Manager', salary: 135000, performance: 89 }
  ];

  const projects = [
    { name: 'Computer Vision Platform', progress: 85, budget: 200000, team: 7 },
    { name: 'Natural Language Processing API', progress: 70, budget: 180000, team: 6 },
    { name: 'Recommendation Engine', progress: 95, budget: 120000, team: 4 },
    { name: 'Autonomous Decision System', progress: 55, budget: 250000, team: 8 }
  ];

  return (
    <>
      <DashboardLayout title="HR Management - AI Development">
        <div className="space-y-6">
          {/* Department Header */}
          <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <Brain className="w-6 h-6 text-green-400" />
                  <Cpu className="w-6 h-6 text-blue-400" />
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-green-400 font-bold">AI Development HR</h3>
                  <p className="text-gray-300 text-sm">Leading artificial intelligence and machine learning innovations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{departmentStats.totalEmployees}</p>
                    <p className="text-gray-300 text-sm">AI Specialists</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{departmentStats.activeProjects}</p>
                    <p className="text-gray-300 text-sm">AI Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-bold text-lg">${(departmentStats.monthlyBudget / 1000).toFixed(0)}K</p>
                    <p className="text-gray-300 text-sm">Monthly Budget</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-bold text-xl">{departmentStats.satisfaction}/5</p>
                    <p className="text-gray-300 text-sm">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employees">Team</TabsTrigger>
              <TabsTrigger value="projects">AI Projects</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Performance */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">AI Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employees.slice(0, 3).map((emp) => (
                        <div key={emp.id} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{emp.name}</p>
                            <p className="text-gray-400 text-sm">{emp.position}</p>
                          </div>
                          <Badge className={emp.performance >= 95 ? 'bg-green-600' : emp.performance >= 90 ? 'bg-blue-600' : 'bg-purple-600'}>
                            {emp.performance}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Status */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">AI Project Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((project, index) => (
                        <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-white font-medium">{project.name}</p>
                            <span className="text-gray-400 text-sm">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Budget: ${project.budget.toLocaleString()}</span>
                            <span>Team: {project.team} members</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="employees">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    AI Development Team
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add AI Specialist
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {employees.map((employee) => (
                      <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-gray-300 text-sm">{employee.position}</p>
                          <p className="text-gray-400 text-xs">Salary: ${employee.salary.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={employee.performance >= 95 ? 'bg-green-600' : employee.performance >= 90 ? 'bg-blue-600' : 'bg-purple-600'}>
                            Performance: {employee.performance}%
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Profile</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">AI Development Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-white font-semibold mb-3">{project.name}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Budget</span>
                            <span className="text-white">${project.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team Size</span>
                            <span className="text-white">{project.team} specialists</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="internships">
              <InternshipManagement />
            </TabsContent>

            <TabsContent value="finance">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Department Budget</h4>
                      <p className="text-2xl font-bold text-green-400">${departmentStats.monthlyBudget.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">Monthly allocation</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Payroll</h4>
                      <p className="text-2xl font-bold text-blue-400">$523K</p>
                      <p className="text-gray-400 text-sm">Monthly salaries</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Research Costs</h4>
                      <p className="text-2xl font-bold text-purple-400">$197K</p>
                      <p className="text-gray-400 text-sm">AI/ML resources</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRAIDev;
