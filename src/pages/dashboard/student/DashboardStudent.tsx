
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, BookOpen, Award, Calendar, Target, Clock } from "lucide-react";

const DashboardStudent = () => {
  const [studentData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    program: "Computer Science",
    university: "Tech University",
    year: "3rd Year",
    gpa: "3.8",
    enrolledCourses: 4,
    completedAssignments: 12,
    totalAssignments: 15
  });

  const [courses] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 85,
      instructor: "Prof. Sarah Smith",
      nextDeadline: "2024-02-20",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      progress: 92,
      instructor: "Dr. Mike Johnson",
      nextDeadline: "2024-02-25",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Database Management Systems",
      progress: 100,
      instructor: "Prof. Emily Brown",
      nextDeadline: "Completed",
      status: "Completed"
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      progress: 45,
      instructor: "Dr. Robert Wilson",
      nextDeadline: "2024-03-10",
      status: "In Progress"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600';
      case 'Completed': return 'bg-green-600';
      case 'Pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Welcome, {studentData.name}</CardTitle>
            <CardDescription className="text-gray-300">
              {studentData.program} • {studentData.year} • {studentData.university}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Instructor
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <BookOpen className="w-4 h-4 mr-2" />
                View Courses
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{studentData.enrolledCourses}</p>
                  <p className="text-sm text-gray-400">Enrolled Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{studentData.gpa}</p>
                  <p className="text-sm text-gray-400">Current GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{studentData.completedAssignments}</p>
                  <p className="text-sm text-gray-400">Completed Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{studentData.totalAssignments - studentData.completedAssignments}</p>
                  <p className="text-sm text-gray-400">Pending Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">My Courses</CardTitle>
            <CardDescription className="text-gray-400">
              Track your academic progress and upcoming deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{course.title}</h3>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-400">Instructor</p>
                      <p className="text-white">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Next Deadline</p>
                      <p className="text-white">{course.nextDeadline}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Progress</p>
                      <p className="text-white">{course.progress}%</p>
                    </div>
                  </div>
                  <Progress value={course.progress} className="mb-4" />
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Course
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Instructor
                    </Button>
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

export default DashboardStudent;
