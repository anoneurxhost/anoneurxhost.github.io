import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, BookOpen, Calendar } from "lucide-react";

const DashboardStudentGrades = () => {
  const grades = [
    { id: 1, course: "Advanced React Development", grade: "A+", percentage: 95, credits: 4, date: "2024-06-15" },
    { id: 2, course: "Machine Learning Fundamentals", grade: "A", percentage: 88, credits: 3, date: "2024-06-10" },
    { id: 3, course: "Database Systems", grade: "B+", percentage: 85, credits: 3, date: "2024-06-05" },
    { id: 4, course: "Web Security", grade: "A-", percentage: 90, credits: 3, date: "2024-05-28" },
    { id: 5, course: "UI/UX Design", grade: "A", percentage: 92, credits: 2, date: "2024-05-20" },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A': return 'bg-green-600';
      case 'B': return 'bg-blue-600';
      case 'C': return 'bg-yellow-600';
      case 'D': return 'bg-orange-600';
      default: return 'bg-red-600';
    }
  };

  const overallGPA = (grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length / 100 * 4).toFixed(2);
  const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0);

  return (
    <DashboardLayout title="Student Grades">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Overall GPA</p>
                  <p className="text-3xl font-bold text-white">{overallGPA}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Credits</p>
                  <p className="text-3xl font-bold text-white">{totalCredits}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Courses Completed</p>
                  <p className="text-3xl font-bold text-white">{grades.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Course Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grades.map((grade) => (
                <Card key={grade.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">{grade.course}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-300 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {grade.date}
                          </span>
                          <span className="text-sm text-gray-300">{grade.credits} Credits</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{grade.percentage}%</p>
                          <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                        </div>
                      </div>
                    </div>
                    <Progress value={grade.percentage} className="w-full" />
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

export default DashboardStudentGrades;
