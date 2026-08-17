
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckSquare, 
  Plus, 
  Calendar,
  Clock,
  AlertTriangle,
  Filter,
  Search
} from "lucide-react";

const DashboardEmployeeTasks = () => {
  const [tasks] = useState([
    {
      id: 1,
      title: "Complete Q1 Financial Report",
      description: "Prepare comprehensive financial analysis for Q1 2024",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-02-28",
      assignedBy: "Sarah Johnson (Manager)",
      progress: 75,
      estimatedHours: 16,
      spentHours: 12
    },
    {
      id: 2,
      title: "Client Meeting Preparation",
      description: "Prepare presentation materials for ABC Corp meeting",
      status: "pending",
      priority: "medium",
      dueDate: "2024-02-25",
      assignedBy: "Mike Wilson (Team Lead)",
      progress: 30,
      estimatedHours: 8,
      spentHours: 2
    },
    {
      id: 3,
      title: "Code Review - User Authentication",
      description: "Review authentication module implementation",
      status: "completed",
      priority: "high",
      dueDate: "2024-02-20",
      assignedBy: "David Chen (Senior Dev)",
      progress: 100,
      estimatedHours: 4,
      spentHours: 3
    },
    {
      id: 4,
      title: "Database Optimization",
      description: "Optimize database queries for better performance",
      status: "overdue",
      priority: "critical",
      dueDate: "2024-02-15",
      assignedBy: "Lisa Park (CTO)",
      progress: 60,
      estimatedHours: 20,
      spentHours: 18
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "pending": return "bg-yellow-600";
      case "overdue": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-400";
      case "high": return "text-orange-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout title="My Tasks">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Tasks</p>
                  <p className="text-xl font-bold text-white">{tasks.length}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-xl font-bold text-white">{tasks.filter(t => t.status === 'in-progress').length}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-xl font-bold text-white">{tasks.filter(t => t.status === 'completed').length}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Overdue</p>
                  <p className="text-xl font-bold text-white">{tasks.filter(t => t.status === 'overdue').length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Management */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base text-white">Task Management</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Search tasks..." className="pl-10 bg-gray-800 border-gray-600 text-white" />
              </div>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                          <p className="text-gray-400 text-xs">Assigned by: {task.assignedBy}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Due Date</p>
                            <p className="text-white text-sm">{task.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-gray-400 text-xs">Time</p>
                            <p className="text-white text-sm">{task.spentHours}h / {task.estimatedHours}h</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Progress</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={task.progress} className="flex-1 h-2" />
                            <span className="text-white text-sm">{task.progress}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">View Details</Button>
                        {task.status !== 'completed' && (
                          <Button size="sm" variant="outline" className="flex-1">Update Progress</Button>
                        )}
                        <Button size="sm" variant="outline">Add Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Task Title</label>
                  <Input placeholder="Enter task title..." className="bg-gray-800 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Priority</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Description</label>
                <Textarea 
                  placeholder="Task description..." 
                  className="bg-gray-800 border-gray-600 text-white resize-none" 
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Due Date</label>
                  <Input type="date" className="bg-gray-800 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Estimated Hours</label>
                  <Input type="number" placeholder="8" className="bg-gray-800 border-gray-600 text-white" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Task</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmployeeTasks;
