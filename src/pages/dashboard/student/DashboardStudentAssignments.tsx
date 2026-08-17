
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Upload, Download } from "lucide-react";

const DashboardStudentAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Web Development Project",
      course: "Web Development Fundamentals",
      dueDate: "2024-02-25",
      status: "In Progress",
      grade: null,
      submittedDate: null,
      description: "Create a responsive e-commerce website using HTML, CSS, and JavaScript",
      maxPoints: 100,
      earnedPoints: null
    },
    {
      id: 2,
      title: "Algorithm Analysis Report",
      course: "Data Structures & Algorithms",
      dueDate: "2024-02-20",
      status: "Submitted",
      grade: "A-",
      submittedDate: "2024-02-18",
      description: "Analyze time complexity of sorting algorithms",
      maxPoints: 50,
      earnedPoints: 45
    },
    {
      id: 3,
      title: "Database Design Assignment",
      course: "Database Management Systems",
      dueDate: "2024-01-30",
      status: "Graded",
      grade: "A+",
      submittedDate: "2024-01-28",
      description: "Design a normalized database schema for an inventory management system",
      maxPoints: 75,
      earnedPoints: 75
    },
    {
      id: 4,
      title: "ML Model Implementation",
      course: "Machine Learning Basics",
      dueDate: "2024-03-15",
      status: "Not Started",
      grade: null,
      submittedDate: null,
      description: "Implement and train a basic neural network for image classification",
      maxPoints: 120,
      earnedPoints: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600';
      case 'Submitted': return 'bg-yellow-600';
      case 'Graded': return 'bg-green-600';
      case 'Not Started': return 'bg-gray-600';
      case 'Overdue': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-green-400';
    if (grade?.startsWith('B')) return 'text-blue-400';
    if (grade?.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

  const upcomingAssignments = assignments.filter(a => a.status === 'In Progress' || a.status === 'Not Started');
  const completedAssignments = assignments.filter(a => a.status === 'Submitted' || a.status === 'Graded');

  return (
    <DashboardLayout title="My Assignments">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{assignments.length}</p>
                  <p className="text-sm text-gray-400">Total Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{upcomingAssignments.length}</p>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Download className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{completedAssignments.length}</p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">%</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-sm text-gray-400">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Assignments */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Assignments</CardTitle>
            <CardDescription className="text-gray-400">
              Assignments that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{assignment.title}</h3>
                      <p className="text-gray-400 text-sm">{assignment.course}</p>
                    </div>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <span>Max Points: {assignment.maxPoints}</span>
                    </div>
                    <div className="flex space-x-2">
                      {assignment.status === 'Not Started' ? (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Start Assignment
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Upload className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Assignments */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Completed Assignments</CardTitle>
            <CardDescription className="text-gray-400">
              Your submitted and graded assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedAssignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{assignment.title}</h3>
                      <p className="text-gray-400 text-sm">{assignment.course}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      {assignment.grade && (
                        <span className={`font-bold ${getGradeColor(assignment.grade)}`}>
                          {assignment.grade}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted: {assignment.submittedDate}</span>
                      </div>
                      {assignment.earnedPoints && (
                        <span>Score: {assignment.earnedPoints}/{assignment.maxPoints}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        View Feedback
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
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

export default DashboardStudentAssignments;
