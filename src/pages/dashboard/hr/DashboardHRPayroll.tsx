
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  Calculator, 
  FileText, 
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Users
} from "lucide-react";

const DashboardHRPayroll = () => {
  const [payrollData] = useState([
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      department: "Development",
      baseSalary: 85000,
      bonus: 5000,
      deductions: 8500,
      netPay: 81500,
      payPeriod: "March 2024",
      status: "Processed"
    },
    {
      id: 2,
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Design",
      baseSalary: 75000,
      bonus: 3000,
      deductions: 7500,
      netPay: 70500,
      payPeriod: "March 2024",
      status: "Pending"
    },
    {
      id: 3,
      employeeName: "Mike Wilson",
      employeeId: "EMP003",
      department: "Management",
      baseSalary: 90000,
      bonus: 8000,
      deductions: 9000,
      netPay: 89000,
      payPeriod: "March 2024",
      status: "Processed"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed": return "bg-green-600";
      case "Pending": return "bg-yellow-600";
      case "Failed": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <>
      <DashboardLayout title="HR Management - Payroll">
        <div className="space-y-6">
          <Tabs defaultValue="payroll" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="payroll">Payroll Processing</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="payroll">
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-bold text-lg">$241K</p>
                          <p className="text-gray-300 text-sm">Total Payroll</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-bold text-lg">156</p>
                          <p className="text-gray-300 text-sm">Employees</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Calculator className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-white font-bold text-lg">142</p>
                          <p className="text-gray-300 text-sm">Processed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white font-bold text-lg">14</p>
                          <p className="text-gray-300 text-sm">Pending</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Payroll Actions */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>Payroll Actions</span>
                      <div className="flex gap-2">
                        <Button>
                          <Calculator className="w-4 h-4 mr-2" />
                          Process Payroll
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-white text-sm">Pay Period</label>
                        <select className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white mt-1">
                          <option>March 2024</option>
                          <option>February 2024</option>
                          <option>January 2024</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm">Department</label>
                        <select className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white mt-1">
                          <option>All Departments</option>
                          <option>Development</option>
                          <option>Design</option>
                          <option>Management</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm">Pay Date</label>
                        <Input type="date" className="bg-gray-800 border-gray-600 text-white mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Payroll List */}
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Employee Payroll</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {payrollData.map((payroll) => (
                        <div key={payroll.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <div>
                                  <h4 className="text-white font-semibold">{payroll.employeeName}</h4>
                                  <p className="text-gray-300 text-sm">{payroll.employeeId} • {payroll.department}</p>
                                </div>
                                <Badge className={getStatusColor(payroll.status)}>
                                  {payroll.status}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-400">Base Salary</p>
                                  <p className="text-white font-medium">${payroll.baseSalary.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Bonus</p>
                                  <p className="text-green-400 font-medium">${payroll.bonus.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Deductions</p>
                                  <p className="text-red-400 font-medium">${payroll.deductions.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Net Pay</p>
                                  <p className="text-blue-400 font-bold">${payroll.netPay.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400">Pay Period</p>
                                  <p className="text-white font-medium">{payroll.payPeriod}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
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

            <TabsContent value="history">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Payment history and archives will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payroll Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Generate and download payroll reports...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-white/10 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payroll Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Configure payroll settings and tax information...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRPayroll;
