import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Code,
  Rocket,
  Globe,
  UserPlus,
  ArrowLeft,
  Search,
  Calendar,
  Instagram,
  Youtube,
  MessageCircle,
  Send } from
"lucide-react";
import PageTransition from "@/components/PageTransition";
import { UnifiedApplyForm } from "@/components/forms/UnifiedApplyForm";

type ViewMode = 'programs' | 'form';

const InternshipApply = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('programs');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const internshipPrograms = [
  {
    id: "ai",
    title: "AI Research Intern",
    department: "Artificial Intelligence",
    duration: "3-6 months",
    location: "Remote/Hybrid",
    stipend: "$2,000/month",
    skills: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"],
    description: "Work on cutting-edge AI research projects including neural networks, computer vision, and NLP.",
    requirements: ["Computer Science/AI background", "Programming experience", "Research mindset"],
    icon: Brain,
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    id: "robotics",
    title: "Robotics Engineering Intern",
    department: "Robotics Systems",
    duration: "4-6 months",
    location: "On-site",
    stipend: "$500/month",
    skills: ["ROS", "C++", "Hardware Design", "Control Systems"],
    description: "Design and develop autonomous robotic systems for various applications including space exploration.",
    requirements: ["Mechanical/Electrical Engineering", "ROS experience", "Hardware knowledge"],
    icon: Code,
    color: "bg-green-500/20 text-green-400"
  },
  {
    id: "space",
    title: "Space Technology Intern",
    department: "Space Projects",
    duration: "6 months",
    location: "Hybrid",
    stipend: "$2000/month",
    skills: ["MATLAB", "Orbital Mechanics", "Satellite Systems", "Mission Planning"],
    description: "Contribute to satellite technology development and space mission planning projects.",
    requirements: ["Aerospace/Physics background", "MATLAB proficiency", "Space systems knowledge"],
    icon: Rocket,
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    id: "web",
    title: "Full-Stack Developer Intern",
    department: "Web Development",
    duration: "3-4 months",
    location: "Remote",
    stipend: "$800/month",
    skills: ["React", "Node.js", "Database Design", "API Development"],
    description: "Build modern web applications and contribute to our client projects and internal tools.",
    requirements: ["Web development experience", "JavaScript proficiency", "Portfolio required"],
    icon: Globe,
    color: "bg-cyan-500/20 text-cyan-400"
  },
  {
    id: "blockchain",
    title: "Block Chain Developer Intern",
    department: "Web Development",
    duration: "3-4 months",
    location: "Remote",
    stipend: "$800/month",
    skills: ["React", "Node.js", "Database Design", "API Development"],
    description: "Build modern web applications and contribute to our client projects and internal tools.",
    requirements: ["Web development experience", "JavaScript proficiency", "Portfolio required"],
    icon: Globe,
    color: "bg-cyan-500/20 text-cyan-400"
  },
  {
    id: "community",
    title: "Community Builder Intern",
    department: "Outreach & Engagement",
    duration: "2–3 months",
    location: "Remote",
    stipend: "$500/month",
    skills: ["Content Creation", "Social Media", "Event Planning", "Communication"],
    description: "Drive engagement, organize events, and grow NGD's global community through creative outreach.",
    requirements: ["Strong communication skills", "Experience with digital platforms", "Creative mindset"],
    icon: Globe,
    color: "bg-cyan-500/20 text-cyan-400"
  }];


  const filteredPrograms = internshipPrograms.filter((program) =>
  program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  program.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderProgramsView = () =>
  <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      



















      {filteredPrograms.length > 0 ?
    <>
          <div className="text-center mb-12">
            <Badge className="mb-4 sm:mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-sm">
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Available Programs
            </Badge>

            <h2 className="responsive-title font-bold mb-4 sm:mb-6 text-white">
              Choose Your Track
            </h2>
            <p className="text-white max-w-3xl mx-auto">
              Choose from our specialized internship tracks designed to accelerate your career in technology.
            </p>
          </div>
      
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((program, index) =>
        <Card key={index} className="glass group hover-lift">
            <CardHeader className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <program.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {program.title}
                  </CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-2">
                    {program.department}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-white mb-4">
                <div>Duration: {program.duration}</div>
                <div>Location: {program.location}</div>
                <div>Stipend: {program.stipend}</div>
                <div>Team-based</div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-white mb-4">
                {program.description}
              </CardDescription>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.skills.map((skill, i) =>
                  <Badge key={i} variant="outline" className="text-xs border-gray-600 text-white">
                        {skill}
                      </Badge>
                  )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {program.requirements.map((req, i) =>
                  <li key={i} className="flex items-center space-x-2 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                  )}
                  </ul>
                </div>
              </div>
              
              <Button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setSelectedProgram(program);
                setCurrentView('form');
              }}>

                Apply for this Program
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}
          </div>
        </> :

    <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="py-16 text-center">
            <div className="text-gray-400 mb-6">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Internship Programs Available
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Currently, there are no active internship programs. Stay tuned for exciting opportunities coming soon!
            </p>

            {/* Social Media Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">
                Stay Updated - Follow Our Social Links
              </h4>
              <div className="flex justify-center space-x-6">
                <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full hover:scale-110 transition-all duration-300">

                  <Instagram className="w-6 h-6 text-white group-hover:animate-pulse" />
                </a>
                <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full hover:scale-110 transition-all duration-300">

                  <Youtube className="w-6 h-6 text-white group-hover:animate-pulse" />
                </a>
                <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full hover:scale-110 transition-all duration-300">

                  <MessageCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
                </a>
              </div>

              {/* Email Subscription */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-8">
                <h5 className="text-white font-semibold mb-4">Subscribe for Internship Updates</h5>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400" />

                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Get notified instantly when new internship opportunities are posted
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    }
    </div>;


  const renderFormView = () =>
  <div className="max-w-4xl mx-auto">
      <Button
      variant="outline"
      onClick={() => setCurrentView('programs')}
      className="mb-6 text-white border-gray-600 hover:bg-gray-700">

        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Programs
      </Button>
      
      <UnifiedApplyForm
      formType="internship"
      targetId={selectedProgram?.id}
      targetTitle={selectedProgram?.title}
      onSuccess={() => {
        setSelectedProgram(null);
        setCurrentView('programs');
      }}
      onCancel={() => setCurrentView('programs')} />

    </div>;


  return (
    <PageTransition>
        <div className="relative z-10">
          <section className="min-h-screen section-padding">
            <div className="container-responsive">
              {currentView === 'programs' && renderProgramsView()}
              {currentView === 'form' && renderFormView()}
            </div>
          </section>
        </div>
    </PageTransition>);

};

export default InternshipApply;