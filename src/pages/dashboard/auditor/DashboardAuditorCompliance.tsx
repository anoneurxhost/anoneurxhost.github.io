
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  Download,
  Clock,
  Target
} from "lucide-react";

const DashboardAuditorCompliance = () => {
  const [complianceMetrics] = useState({
    overallScore: 94,
    totalChecks: 247,
    passedChecks: 232,
    pendingReviews: 15
  });

  const [complianceStandards] = useState([
    {
      name: "GDPR",
      status: "compliant",
      score: 98,
      lastAudit: "2024-01-15",
      nextReview: "2024-04-15",
      issues: 0,
      requirements: 45,
      completed: 44
    },
    {
      name: "SOX",
      status: "compliant", 
      score: 96,
      lastAudit: "2024-01-10",
      nextReview: "2024-04-10",
      issues: 1,
      requirements: 38,
      completed: 37
    },
    {
      name: "ISO 27001",
      status: "review-required",
      score: 87,
      lastAudit: "2024-01-05",
      nextReview: "2024-02-05",
      issues: 5,
      requirements: 52,
      completed: 47
    },
    {
      name: "HIPAA",
      status: "non-compliant",
      score: 78,
      lastAudit: "2024-01-01",
      nextReview: "2024-02-01",
      issues: 8,
      requirements: 31,
      completed: 23
    }
  ]);

  const [complianceIssues] = useState([
    {
      id: "COMP-001",
      standard: "ISO 27001",
      issue: "Access control policy not updated",
      severity: "high",
      status: "open",
      assignee: "Security Team",
      dueDate: "2024-02-01"
    },
    {
      id: "COMP-002",
      standard: "HIPAA",
      issue: "Employee training records incomplete",
      severity: "critical",
      status: "in-progress",
      assignee: "HR Department",
      dueDate: "2024-01-25"
    },
    {
      id: "COMP-003",
      standard: "SOX",
      issue: "Financial controls documentation missing",
      severity: "medium",
      status: "resolved",
      assignee: "Finance Team",
      dueDate: "2024-01-20"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-600";
      case "review-required": return "bg-yellow-600";
      case "non-compliant": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "review-required": return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "non-compliant": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400";
      case "high": return "text-orange-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout title="Compliance Management">
      <div className="space-y-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overall Score</p>
                  <p className="text-2xl font-bold text-white">{complianceMetrics.overallScore}%</p>
                </div>
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Checks</p>
                  <p className="text-2xl font-bold text-white">{complianceMetrics.totalChecks}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Passed Checks</p>
                  <p className="text-2xl font-bold text-white">{complianceMetrics.passedChecks}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Reviews</p>
                  <p className="text-2xl font-bold text-white">{complianceMetrics.pendingReviews}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="standards" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="standards">Compliance Standards</TabsTrigger>
            <TabsTrigger value="issues">Issues & Actions</TabsTrigger>
            <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="standards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceStandards.map((standard, index) => (
                <Card key={index} className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(standard.status)}
                        <CardTitle className="text-white">{standard.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(standard.status)}>
                        {standard.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Compliance Score</span>
                      <span className="text-white font-bold text-xl">{standard.score}%</span>
                    </div>
                    
                    <Progress value={standard.score} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Last Audit</p>
                        <p className="text-white">{standard.lastAudit}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Next Review</p>
                        <p className="text-white">{standard.nextReview}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Open Issues</p>
                        <p className="text-white">{standard.issues}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Requirements</p>
                        <p className="text-white">{standard.completed}/{standard.requirements}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Compliance Issues</CardTitle>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Issues
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceIssues.map((issue) => (
                    <div key={issue.id} className="p-4 rounded-lg bg-gray-800/50 border border-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-semibold">{issue.id}</span>
                          <Badge variant="outline" className="text-gray-300">
                            {issue.standard}
                          </Badge>
                          <span className={`text-sm font-medium ${getSeverityColor(issue.severity)}`}>
                            {issue.severity.toUpperCase()}
                          </span>
                        </div>
                        <Badge className={getStatusColor(issue.status === 'resolved' ? 'compliant' : issue.status === 'in-progress' ? 'review-required' : 'non-compliant')}>
                          {issue.status}
                        </Badge>
                      </div>
                      
                      <p className="text-white mb-2">{issue.issue}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Assigned To</p>
                          <p className="text-white">{issue.assignee}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Due Date</p>
                          <p className="text-white">{issue.dueDate}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-semibold">Full Compliance Report</span>
                    </div>
                    <p className="text-gray-300 text-sm">Comprehensive compliance status across all standards</p>
                  </Button>
                  
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold">Issues Summary</span>
                    </div>
                    <p className="text-gray-300 text-sm">Summary of all open compliance issues and actions</p>
                  </Button>
                  
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-green-400" />
                      <span className="text-white font-semibold">Audit Trail Report</span>
                    </div>
                    <p className="text-gray-300 text-sm">Detailed audit trail and compliance history</p>
                  </Button>
                  
                  <Button className="p-6 h-auto flex flex-col items-start bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-semibold">Risk Assessment</span>
                    </div>
                    <p className="text-gray-300 text-sm">Compliance risk assessment and recommendations</p>
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

export default DashboardAuditorCompliance;
