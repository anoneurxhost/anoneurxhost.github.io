
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, CreditCard, Calendar, FileText } from "lucide-react";

const DashboardClientBilling = () => {
  const invoices = [
    {
      id: "INV-001",
      project: "E-commerce Platform",
      amount: "$5,000",
      status: "Paid",
      dueDate: "2024-01-15",
      paidDate: "2024-01-10"
    },
    {
      id: "INV-002",
      project: "Mobile App Development",
      amount: "$7,500",
      status: "Pending",
      dueDate: "2024-02-20",
      paidDate: null
    },
    {
      id: "INV-003",
      project: "Data Analytics Dashboard",
      amount: "$3,000",
      status: "Overdue",
      dueDate: "2024-01-30",
      paidDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-600';
      case 'Pending': return 'bg-yellow-600';
      case 'Overdue': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Billing & Payments">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">$15,500</p>
                  <p className="text-sm text-gray-400">Total Billed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">$5,000</p>
                  <p className="text-sm text-gray-400">Paid</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">$7,500</p>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-2xl font-bold text-white">$3,000</p>
                  <p className="text-sm text-gray-400">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Payment Methods</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your payment methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-white font-medium">•••• •••• •••• 4242</p>
                  <p className="text-gray-400 text-sm">Expires 12/2025</p>
                </div>
              </div>
              <Badge className="bg-green-600">Primary</Badge>
            </div>
            <Button variant="outline" className="mt-4 border-white/30 text-white hover:bg-white/10">
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Recent Invoices</CardTitle>
            <CardDescription className="text-gray-400">
              View and manage your invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <div>
                        <h3 className="text-white font-medium">{invoice.id}</h3>
                        <p className="text-gray-400 text-sm">{invoice.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-white font-medium">{invoice.amount}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {invoice.dueDate}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <Download className="w-4 h-4" />
                        </Button>
                        {invoice.status === 'Pending' || invoice.status === 'Overdue' ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Pay Now
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardClientBilling;
