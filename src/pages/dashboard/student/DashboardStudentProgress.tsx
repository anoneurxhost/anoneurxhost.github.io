
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  BookOpen,
  Clock,
  BarChart3,
  CheckCircle
} from "lucide-react";

const DashboardStudentProgress = () => {
  const [progressData] = useState({
    overallProgress: 78,
    completedProjects: 5,
    activeProjects: 3,
    totalHours: 245,
    skillsAcquired: 12,
    certificatesEarned: 3
  });

  const [milestones] = useState([
    {
      id: 1,
      title: "Complete React Fundamentals",
      description: "Master React basics including components, props, and state",
      dueDate: "2024-02-15",
      status: "completed",
      progress: 100,
      category: "Technical Skills"
    },
    {
      id: 2,
      title: "Build First Full-Stack Application",
      description: "Create a complete web application with frontend and backend",
      dueDate: "2024-03-01",
      status: "in-progress",
      progress: 75,
      category: "Project Work"
    },
    {
      id: 3,
      title: "Research Paper Publication",
      description: "Write and submit research paper for conference",
      dueDate: "2024-03-30",
      status: "in-progress",
      progress: 45,
      category: "Research"
    },
    {
      id: 4,
      title: "Advanced Algorithm Mastery",
      description: "Complete advanced data structures and algorithms course",
      dueDate: "2024-04-15",
      status: "pending",
      progress: 20,
      category: "Technical Skills"
    }
  ]);

  const [skillsProgress] = useState([
    { name: "JavaScript", level: 85, category: "Programming" },
    { name: "React", level: 78, category: "Frontend" },
    { name: "Node.js", level: 65, category: "Backend" },
    { name: "Python", level: 72, category: "Programming" },
    { name: "Database Design", level: 60, category: "Backend" },
    { name: "Machine Learning", level: 45, category: "AI/ML" }
  ]);

  const [weeklyActivity] = useState([
    { week: "Week 1", hours: 35, projects: 2, papers: 3 },
    { week: "Week 2", hours: 42, projects: 3, papers: 2 },
    { week: "Week 3", hours: 38, projects: 2, papers: 4 },
    { week: "Week 4", hours: 45, projects: 4, papers: 2 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return "text-green-400";
    if (level >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <DashboardLayout title="Progress Tracking">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-300 text-sm">Overall Progress</p>
                  <p className="text-3xl font-bold text-white">{progressData.overallProgress}%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-400" />
              </div>
              <Progress value={progressData.overallProgress} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{progressData.completedProjects}</p>
                  <p className="text-green-300 text-sm">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{progressData.activeProjects}</p>
                  <p className="text-blue-300 text-sm">Active</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{progressData.totalHours}</p>
                  <p className="text-purple-300 text-sm">Total Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{progressData.certificatesEarned}</p>
                  <p className="text-pink-300 text-sm">Certificates</p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="milestones" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="skills">Skills Progress</TabsTrigger>
            <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Learning Milestones</h3>
                <Button variant="outline">Add Milestone</Button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <Card key={milestone.id} className="bg-white/10 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{milestone.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{milestone.description}</p>
                          <Badge variant="outline" className="text-gray-300">
                            {milestone.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-white font-bold text-xl">{milestone.progress}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-400">Due: {milestone.dueDate}</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1">View Details</Button>
                        {milestone.status !== 'completed' && (
                          <Button size="sm" variant="outline" className="flex-1">Update Progress</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Skills Development</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Add Skill</Button>
                  <Button size="sm">Take Assessment</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsProgress.map((skill, index) => (
                  <Card key={index} className="bg-white/10 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-semibold">{skill.name}</h4>
                          <p className="text-gray-400 text-sm">{skill.category}</p>
                        </div>
                        <span className={`text-xl font-bold ${getSkillLevelColor(skill.level)}`}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <Progress value={skill.level} className="h-3 mb-4" />
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Practice
                        </Button>
                        <Button size="sm" className="flex-1">
                          Take Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-6">
              <h3 className="text-white text-lg font-semibold">Weekly Activity Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Activity Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyActivity.map((week, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{week.week}</span>
                            <span className="text-gray-400">{week.hours} hours</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-300">{week.projects} Projects</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-4 h-4 text-green-400" />
                              <span className="text-gray-300">{week.papers} Papers</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-green-600/20 border border-green-500/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-green-300 font-semibold">Project Completed</span>
                        </div>
                        <p className="text-white text-sm">Successfully completed ML Research Paper</p>
                        <p className="text-gray-400 text-xs mt-1">2 days ago</p>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-600/20 border border-blue-500/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-5 h-5 text-blue-400" />
                          <span className="text-blue-300 font-semibold">Skill Milestone</span>
                        </div>
                        <p className="text-white text-sm">Reached 85% proficiency in JavaScript</p>
                        <p className="text-gray-400 text-xs mt-1">5 days ago</p>
                      </div>

                      <div className="p-4 rounded-lg bg-purple-600/20 border border-purple-500/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-5 h-5 text-purple-400" />
                          <span className="text-purple-300 font-semibold">Certificate Earned</span>
                        </div>
                        <p className="text-white text-sm">React Development Certification</p>
                        <p className="text-gray-400 text-xs mt-1">1 week ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStudentProgress;
