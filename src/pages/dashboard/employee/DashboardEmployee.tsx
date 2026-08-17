import { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, Clock, FileText, Target, CheckCircle, AlertCircle, TrendingUp, MessageSquare, Award } from "lucide-react";
const DashboardEmployee = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);
  const getDepartmentName = (deptId: string) => {
    const departments: Record<string, string> = {
      'web-mobile': 'Web/Mobile Development',
      'ai-dev': 'AI Development',
      'robotics': 'Robotics',
      'networking': 'Networking',
      'cybersecurity': 'Cybersecurity',
      'blockchain': 'Blockchain'
    };
    return departments[deptId] || 'Unknown Department';
  };
  const tasks = [{
    id: 1,
    title: 'Complete project documentation',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-25'
  }, {
    id: 2,
    title: 'Code review for new feature',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-12-20'
  }, {
    id: 3,
    title: 'Attend team meeting',
    status: 'pending',
    priority: 'low',
    dueDate: '2024-12-22'
  }];
  const leaveBalance = {
    annual: 15,
    sick: 8,
    personal: 5
  };
  const performanceMetrics = {
    tasksCompleted: 85,
    onTimeDelivery: 92,
    teamCollaboration: 88,
    overallRating: 4.2
  };
  return <DashboardLayout title="Employee Dashboard - Task & Performance Hub">
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Welcome, {userInfo?.email?.split('@')[0] || 'Employee'}!
                </h2>
                <p className="text-white">
                  Department: {userInfo?.department ? getDepartmentName(userInfo.department) : 'N/A'}
                </p>
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-base">{tasks.filter(t => t.status === 'pending').length}</p>
                  <p className="text-white text-sm">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold text-base">{tasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-white text-sm">Completed Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-bold text-base">{leaveBalance.annual}</p>
                  <p className="text-white text-sm">Leave Days Left</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-base">{performanceMetrics.overallRating}/5</p>
                  <p className="text-white text-sm">Performance Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        
      </div>
    </DashboardLayout>;
};
export default DashboardEmployee;