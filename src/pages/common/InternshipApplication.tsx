
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  CheckCircle,
  ArrowRight,
  Brain,
  Code,
  Rocket,
  Globe,
  Send,
  FileCheck,
  UserPlus,
  ArrowLeft
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

type ViewMode = 'options' | 'verify' | 'apply' | 'programs' | 'form';

const InternshipApplication = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('options');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    year: "",
    program: "",
    skills: "",
    motivation: ""
  });

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
      stipend: "$2,500/month",
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
      stipend: "$2,200/month",
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
      stipend: "$1,800/month",
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
        description: "Drive engagement, organize events, and grow NGD’s global community through creative outreach.",
        requirements: ["Strong communication skills", "Experience with digital platforms", "Creative mindset"],
        icon: Globe,
        color: "bg-cyan-500/20 text-cyan-400"
        }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Application submitted successfully! We'll get back to you within 48 hours.", {
      description: `Your application for ${selectedProgram?.title} has been received.`,
    });
    
    // Reset form and go back to options
    setFormData({
      name: "",
      email: "",
      phone: "",
      university: "",
      year: "",
      program: "",
      skills: "",
      motivation: ""
    });
    setSelectedProgram(null);
    setCurrentView('options');
  };

  const renderOptionsView = () => (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Internship Program
      </h2>
      <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
        Choose your path to join our innovative internship program
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="card-professional hover-lift cursor-pointer" onClick={() => setCurrentView('verify')}>
          <CardHeader className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-xl text-white mb-2">Verify Internship</CardTitle>
            <CardDescription className="text-gray-300">
              Check the status of your existing internship application
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Verify Status
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="card-professional hover-lift cursor-pointer" onClick={() => setCurrentView('programs')}>
          <CardHeader className="p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl text-white mb-2">Apply for Internship</CardTitle>
            <CardDescription className="text-gray-300">
              Start your application for our internship programs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Start Application
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderVerifyView = () => (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="outline" 
        onClick={() => setCurrentView('options')}
        className="mb-6 text-gray-300 border-gray-600 hover:bg-gray-700"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Options
      </Button>
      
      <Card className="card-professional">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl text-white mb-2">Verify Internship Status</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your application ID or email to check your internship status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Application ID or Email</label>
              <Input
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter your application ID or email"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Check Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProgramsView = () => (
    <div className="max-w-6xl mx-auto">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Available Programs
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Choose from our specialized internship tracks designed to accelerate your career in technology.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {internshipPrograms.map((program, index) => (
          <Card key={index} className="card-professional group hover-lift">
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
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                <div>Duration: {program.duration}</div>
                <div>Location: {program.location}</div>
                <div>Stipend: {program.stipend}</div>
                <div>Team-based</div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 pt-0">
              <CardDescription className="text-gray-300 mb-4">
                {program.description}
              </CardDescription>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {program.requirements.map((req, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setSelectedProgram(program);
                  setFormData({...formData, program: program.id});
                  setCurrentView('form');
                }}
              >
                Apply for this Program
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="outline" 
        onClick={() => setCurrentView('programs')}
        className="mb-6 text-gray-300 border-gray-600 hover:bg-gray-700"
      >
        <ArrowLeft className="mr-2 w-4 h-4" />
        Back to Programs
      </Button>
      
      <Card className="card-professional">
        <CardHeader className="p-8">
          <CardTitle className="text-2xl text-white mb-2">
            Apply for {selectedProgram?.title}
          </CardTitle>
          <CardDescription className="text-gray-300">
            Please provide accurate information. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email Address *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Phone Number *</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">University/College *</label>
                <Input
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Your current institution"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Year of Study *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                required
              >
                <option value="">Select year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="masters">Master's</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Technical Skills *</label>
              <Textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                placeholder="List your technical skills, programming languages, frameworks, etc."
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Why do you want to join our internship program? *</label>
              <Textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                placeholder="Tell us about your motivation, career goals, and what you hope to achieve..."
                required
              />
            </div>
            
            <Button type="submit" className="w-full btn-primary">
              <Send className="mr-2 w-5 h-5" />
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="section-padding bg-black">
      <div className="container-responsive">
        {currentView === 'options' && renderOptionsView()}
        {currentView === 'verify' && renderVerifyView()}
        {currentView === 'programs' && renderProgramsView()}
        {currentView === 'form' && renderFormView()}
      </div>
    </div>
  );
};

export default InternshipApplication;
