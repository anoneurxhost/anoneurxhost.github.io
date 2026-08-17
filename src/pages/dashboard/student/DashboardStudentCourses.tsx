
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Clock, User, Award } from "lucide-react";

const DashboardStudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      instructor: "Prof. Sarah Smith",
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      nextDeadline: "2024-02-20",
      status: "In Progress",
      grade: "A-",
      credits: 3
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Dr. Mike Johnson",
      progress: 92,
      totalLessons: 24,
      completedLessons: 22,
      nextDeadline: "2024-02-25",
      status: "In Progress",
      grade: "A",
      credits: 4
    },
    {
      id: 3,
      title: "Database Management Systems",
      instructor: "Prof. Emily Brown",
      progress: 100,
      totalLessons: 18,
      completedLessons: 18,
      nextDeadline: "Completed",
      status: "Completed",
      grade: "A+",
      credits: 3
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Dr. Robert Wilson",
      progress: 45,
      totalLessons: 22,
      completedLessons: 10,
      nextDeadline: "2024-03-10",
      status: "In Progress",
      grade: "B+",
      credits: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600';
      case 'Completed': return 'bg-green-600';
      case 'Not Started': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <DashboardLayout title="My Courses">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-sm text-gray-400">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">3.8</p>
                  <p className="text-sm text-gray-400">GPA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">14</p>
                  <p className="text-sm text-gray-400">Credits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-sm text-gray-400">Active Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{course.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <span className={`font-bold ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </div>
                </div>
                <CardDescription className="text-gray-400">
                  <User className="w-4 h-4 inline mr-1" />
                  {course.instructor} • {course.credits} Credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress: {course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Next Deadline</p>
                        <p className="text-white">{course.nextDeadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Lessons Left</p>
                        <p className="text-white">{course.totalLessons - course.completedLessons}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400">Current Grade</p>
                        <p className={`font-bold ${getGradeColor(course.grade)}`}>{course.grade}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Continue Learning
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      View Syllabus
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Contact Instructor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStudentCourses;
