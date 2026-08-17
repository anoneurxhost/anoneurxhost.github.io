
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Download, CheckCircle, Clock, Star, Trophy } from "lucide-react";

const DashboardInternCertifications = () => {
  const certificates = [
    {
      id: 1,
      title: "AI Development Fundamentals",
       issuer: "Anoneurx",
      completedDate: "2024-06-15",
      status: "completed",
      score: 95,
      credentialId: "NGD-AI-001-2024-0615",
      skills: ["Machine Learning", "Python", "TensorFlow"],
      verificationUrl: "#"
    },
    {
      id: 2,
      title: "Web Development Mastery",
       issuer: "Anoneurx",
      completedDate: "2024-05-28",
      status: "completed",
      score: 88,
      credentialId: "NGD-WEB-002-2024-0528",
      skills: ["React", "Node.js", "JavaScript"],
      verificationUrl: "#"
    },
    {
      id: 3,
      title: "Research Methodology",
      issuer: "Anoneurx",
      completedDate: null,
      status: "in-progress",
      progress: 75,
      skills: ["Research Design", "Data Analysis", "Academic Writing"],
      estimatedCompletion: "2024-07-15"
    }
  ];

  const achievements = [
    { title: "Quick Learner", description: "Completed first certification in record time", icon: Trophy, color: "text-yellow-400" },
    { title: "High Achiever", description: "Scored above 90% in AI Fundamentals", icon: Star, color: "text-purple-400" },
    { title: "Consistent Progress", description: "Maintained steady learning pace", icon: CheckCircle, color: "text-green-400" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "in-progress": return "bg-blue-600";
      case "pending": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <DashboardLayout title="Certifications">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Award className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">91.5%</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Skills Earned</p>
                  <p className="text-2xl font-bold text-white">6</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">My Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-6 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                        <Badge className={getStatusColor(cert.status)}>
                          {cert.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">Issued by {cert.issuer}</p>
                      {cert.completedDate && (
                        <p className="text-gray-400 text-sm">Completed: {new Date(cert.completedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="text-right">
                      {cert.status === "completed" && (
                        <div className="mb-2">
                          <p className="text-2xl font-bold text-green-400">{cert.score}%</p>
                          <p className="text-gray-400 text-sm">Score</p>
                        </div>
                      )}
                      {cert.status === "in-progress" && (
                        <div className="mb-2">
                          <p className="text-2xl font-bold text-blue-400">{cert.progress}%</p>
                          <p className="text-gray-400 text-sm">Progress</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {cert.status === "in-progress" && cert.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>Est. completion: {cert.estimatedCompletion}</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Skills Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-blue-400 border-blue-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {cert.status === "completed" && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-gray-400 text-sm">Credential ID:</p>
                        <p className="text-white font-mono text-sm">{cert.credentialId}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Verify
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="p-4 rounded-lg bg-gray-800/50 text-center">
                    <Icon className={`w-12 h-12 ${achievement.color} mx-auto mb-3`} />
                    <h4 className="text-white font-semibold mb-2">{achievement.title}</h4>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Certifications */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Available Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Cybersecurity Fundamentals</h4>
                <p className="text-gray-400 text-sm mb-3">Learn the basics of cybersecurity and ethical hacking</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-orange-400 border-orange-400">Available</Badge>
                  <Button size="sm" variant="outline">Start Learning</Button>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Blockchain Development</h4>
                <p className="text-gray-400 text-sm mb-3">Master blockchain technology and smart contracts</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-orange-400 border-orange-400">Available</Badge>
                  <Button size="sm" variant="outline">Start Learning</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardInternCertifications;
