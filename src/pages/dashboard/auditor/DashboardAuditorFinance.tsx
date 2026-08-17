
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Download,
  Search,
  Filter,
  Eye,
  CheckCircle
} from "lucide-react";

const DashboardAuditorFinance = () => {
  const [auditData] = useState({
    totalAudits: 45,
    pendingReviews: 8,
    flaggedTransactions: 12,
    complianceScore: 94
  });

  const [transactions] = useState([
    {
      id: "TXN-001",
      department: "Marketing",
      amount: 25000,
      type: "Equipment Purchase",
      date: "2024-01-15",
      status: "approved",
      auditor: "John Smith",
      riskLevel: "low"
    },
    {
      id: "TXN-002", 
      department: "R&D",
      amount: 150000,
      type: "Research Investment",
      date: "2024-01-14",
      status: "flagged",
      auditor: "Sarah Johnson",
      riskLevel: "high"
    },
    {
      id: "TXN-003",
      department: "HR",
      amount: 8500,
      type: "Training Program",
      date: "2024-01-13",
      status: "pending",
      auditor: "Mike Wilson",
      riskLevel: "medium"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-600";
      case "flagged": return "bg-red-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout title="Finance Audit">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Audits</p>
                  <p className="text-2xl font-bold text-white">{auditData.totalAudits}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">{auditData.pendingReviews}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Flagged Transactions</p>
                  <p className="text-2xl font-bold text-white">{auditData.flaggedTransactions}</p>
                </div>
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Compliance Score</p>
                  <p className="text-2xl font-bold text-white">{auditData.complianceScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budgets">Budget Analysis</TabsTrigger>
            <TabsTrigger value="reports">Audit Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Financial Transactions</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search transactions..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
                  </div>

                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-white font-semibold">{transaction.id}</span>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                            <span className={`text-sm ${getRiskColor(transaction.riskLevel)}`}>
                              {transaction.riskLevel.toUpperCase()} RISK
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Department</p>
                            <p className="text-white">{transaction.department}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Amount</p>
                            <p className="text-white">${transaction.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Type</p>
                            <p className="text-white">{transaction.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Date</p>
           ...
                            <p className="text-white">{transaction.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Budget Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Department Budgets</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Marketing</span>
                            <span className="text-green-400">$250K / $300K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">R&D</span>
                            <span className="text-yellow-400">$480K / $500K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Operations</span>
                            <span className="text-red-400">$320K / $300K</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">Variance Analysis</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Budget vs Actual</span>
                            <span className="text-green-400">+5.2%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">YoY Growth</span>
                            <span className="text-blue-400">+12.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Savings</span>
                            <span className="text-green-400">$45K</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-white/10 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">Monthly Financial Report</span>
                    </div>
                    <p className="text-gray-300 text-sm">Comprehensive financial analysis for January 2024</p>
                  </Button>
                  
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-green-400" />
                      <span className="text-white font-semibold">Compliance Report</span>
                    </div>
                    <p className="text-gray-300 text-sm">Financial compliance status and recommendations</p>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAuditorFinance;
