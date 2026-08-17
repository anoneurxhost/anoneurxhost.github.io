import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardFinanceManagerSalaries = () => {
  const [salaries, setSalaries] = useState([
    { id: 1, name: "John CEO", role: "CEO", department: "Executive", salary: 150000, status: "paid" },
    { id: 2, name: "Alice HR", role: "HR Manager", department: "Human Resources", salary: 85000, status: "pending" },
    { id: 3, name: "Bob Tech", role: "HOD", department: "AI Development", salary: 120000, status: "paid" },
    { id: 4, name: "Carol Dev", role: "Employee", department: "Web Development", salary: 75000, status: "pending" },
  ]);

  const handleSalaryPayment = (id: number) => {
    setSalaries(prev => prev.map(emp => emp.id === id ? { ...emp, status: 'paid' } : emp));
    toast("Salary payment processed!");
  };

  const totalPayroll = salaries.reduce((sum, e) => sum + e.salary, 0);
  const pendingAmount = salaries.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.salary, 0);

  return (
    <DashboardLayout title="Salary Management">
      <div className="space-y-6">
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Salary Management</h2>
                <p className="text-purple-300 text-sm">Process and track employee payroll</p>
              </div>
              <DollarSign className="w-10 h-10 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Total Payroll</p>
              <p className="text-xl font-bold text-white">${totalPayroll.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Pending Payments</p>
              <p className="text-xl font-bold text-yellow-400">${pendingAmount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400">Employees</p>
              <p className="text-xl font-bold text-white">{salaries.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-white">Payroll</CardTitle>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salaries.map((employee) => (
                <Card key={employee.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{employee.name}</p>
                          <p className="text-xs text-gray-400">{employee.role} · {employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">${employee.salary.toLocaleString()}</p>
                          <Badge className={employee.status === 'paid' ? 'bg-green-600 text-[11px]' : 'bg-yellow-600 text-[11px]'}>
                            {employee.status}
                          </Badge>
                        </div>
                        {employee.status === 'pending' && (
                          <Button size="sm" onClick={() => handleSalaryPayment(employee.id)} className="bg-green-600 hover:bg-green-700 text-xs">
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManagerSalaries;
