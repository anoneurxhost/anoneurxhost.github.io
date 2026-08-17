import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  ClipboardList,
  Award,
  Calendar,
  GraduationCap,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  Star,
} from "lucide-react";

const DashboardFaculty = () => {
  const [userInfo, setUserInfo] = useState<{ name?: string; email?: string } | null>(null);
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserInfo(JSON.parse(user));
  }, []);

  const stats = {
    courses: 4,
    students: 128,
    pendingSubmissions: 23,
    avgRating: 4.6,
  };

  const courses = [
    { id: "CS-201", name: "Data Structures & Algorithms", students: 42, progress: 72, code: "cs201" },
    { id: "CS-310", name: "Machine Learning Fundamentals", students: 35, progress: 58, code: "cs310" },
    { id: "SE-105", name: "Web Engineering", students: 28, progress: 84, code: "se105" },
    { id: "AI-220", name: "Introduction to Artificial Intelligence", students: 23, progress: 41, code: "ai220" },
  ];

  const upcomingClasses = [
    { course: "Data Structures & Algorithms", time: "Today · 10:00 AM", room: "Room B-204" },
    { course: "Machine Learning Fundamentals", time: "Today · 1:00 PM", room: "Lab 3" },
    { course: "Web Engineering", time: "Tomorrow · 9:00 AM", room: "Room A-112" },
    { course: "Introduction to AI", time: "Friday · 11:30 AM", room: "Auditorium" },
  ];

  const students = [
    { id: "STU-001", name: "Areeba Fatima", program: "University", course: "CS-310", grade: "A" },
    { id: "STU-002", name: "Hassan Ali", program: "Internship", course: "CS-201", grade: "A-" },
    { id: "STU-003", name: "Zainab Tariq", program: "Hackathon", course: "AI-220", grade: "B+" },
    { id: "STU-004", name: "Bilal Ahmed", program: "University", course: "SE-105", grade: "A" },
    { id: "STU-005", name: "Maryam Khan", program: "University", course: "CS-310", grade: "B" },
  ];

  const assignments = [
    { title: "Binary Search Tree Implementation", course: "CS-201", due: "2026-08-12", submitted: 30, total: 42, status: "open" },
    { title: "Linear Regression Lab", course: "CS-310", due: "2026-08-14", submitted: 18, total: 35, status: "open" },
    { title: "Responsive Portfolio Page", course: "SE-105", due: "2026-08-09", submitted: 28, total: 28, status: "closed" },
    { title: "Search Algorithm Mini-Project", course: "AI-220", due: "2026-08-18", submitted: 9, total: 23, status: "open" },
  ];

  const grades = [
    { name: "Areeba Fatima", course: "CS-310", midterm: 88, final: 92, total: "A" },
    { name: "Hassan Ali", course: "CS-201", midterm: 84, final: 87, total: "A-" },
    { name: "Zainab Tariq", course: "AI-220", midterm: 76, final: 80, total: "B+" },
    { name: "Bilal Ahmed", course: "SE-105", midterm: 90, final: 94, total: "A" },
    { name: "Maryam Khan", course: "CS-310", midterm: 72, final: 75, total: "B" },
  ];

  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="space-y-6">
        {/* Faculty Header */}
        <Card className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 text-cyan-400" />
                  Faculty Dashboard
                </h2>
                <p className="text-cyan-300 text-lg">
                  Welcome back, {userInfo?.name || userInfo?.email?.split("@")[0] || "Faculty"} — manage your courses, students and grades.
                </p>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 text-sm">Semester</p>
                <p className="text-white text-2xl font-bold">Spring 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-white font-bold text-xl">{stats.courses}</p>
                  <p className="text-white text-sm">Courses Teaching</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold text-xl">{stats.students}</p>
                  <p className="text-white text-sm">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-white font-bold text-xl">{stats.pendingSubmissions}</p>
                  <p className="text-white text-sm">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-xl">{stats.avgRating}/5</p>
                  <p className="text-white text-sm">Student Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue={tabParam} className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-xl border border-gray-700/50 flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-600">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-cyan-600">My Courses</TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-cyan-600">Students</TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-cyan-600">Assignments</TabsTrigger>
            <TabsTrigger value="grades" className="data-[state=active]:bg-cyan-600">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Classes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingClasses.map((cls, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{cls.course}</p>
                        <p className="text-gray-400 text-xs">{cls.room}</p>
                      </div>
                      <span className="text-cyan-300 text-xs whitespace-nowrap">{cls.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assignments.slice(0, 3).map((a) => (
                    <div key={a.title} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{a.title}</p>
                        <p className="text-gray-400 text-xs">{a.course} · due {a.due}</p>
                      </div>
                      <Badge className="bg-cyan-600/30 text-cyan-300 border-cyan-600/40">
                        {a.submitted}/{a.total}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                        <p className="text-gray-400 text-sm">{course.id} · {course.students} students</p>
                      </div>
                      <Badge className="bg-cyan-600/30 text-cyan-300 border-cyan-600/40">
                        {course.progress}% complete
                      </Badge>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800">
                      <div
                        className="h-2 rounded-full bg-cyan-500 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white">
                        View Roster
                      </Button>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        Manage Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700/50">
                        <th className="py-3 pr-4">Student</th>
                        <th className="py-3 pr-4">Program</th>
                        <th className="py-3 pr-4">Course</th>
                        <th className="py-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.id} className="border-b border-gray-800/50">
                          <td className="py-3 pr-4 text-white">{s.name}</td>
                          <td className="py-3 pr-4 text-gray-400">{s.program}</td>
                          <td className="py-3 pr-4 text-gray-400">{s.course}</td>
                          <td className="py-3">
                            <Badge className="bg-white/10 border-white/20 text-white">{s.grade}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {assignments.map((a) => (
                <Card key={a.title} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {a.status === "open" ? (
                          <Clock className="w-5 h-5 text-amber-400" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        )}
                        <div>
                          <p className="text-white font-medium">{a.title}</p>
                          <p className="text-gray-400 text-xs">{a.course} · due {a.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={a.status === "open" ? "bg-amber-600/30 text-amber-300 border-amber-600/40" : "bg-green-600/30 text-green-300 border-green-600/40"}>
                          {a.submitted}/{a.total} submitted
                        </Badge>
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Grade Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700/50">
                        <th className="py-3 pr-4">Student</th>
                        <th className="py-3 pr-4">Course</th>
                        <th className="py-3 pr-4">Midterm</th>
                        <th className="py-3 pr-4">Final</th>
                        <th className="py-3">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((g, i) => (
                        <tr key={i} className="border-b border-gray-800/50">
                          <td className="py-3 pr-4 text-white">{g.name}</td>
                          <td className="py-3 pr-4 text-gray-400">{g.course}</td>
                          <td className="py-3 pr-4 text-gray-300">{g.midterm}</td>
                          <td className="py-3 pr-4 text-gray-300">{g.final}</td>
                          <td className="py-3">
                            <Badge className="bg-white/10 border-white/20 text-white">{g.total}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFaculty;
