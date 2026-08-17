import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Lightbulb, 
  Award,
  BookOpen,
  TrendingUp,
  Users,
  Code,
  Zap,
  Search
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AnimatedBackground from "@/components/AnimatedBackground";
import collaborationData from "@/data/collaborationData.json";
import { toast } from "@/components/ui/sonner";

const Collaboration = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    additionalInfo: ""
  });

  const collaborationTypes = [
    {
      type: "research",
      title: "Publish Research Papers",
      description: "Submit your research papers for peer review and publication in our academic journal",
      icon: <FileText className="w-8 h-8" />,
      color: "from-blue-500 to-blue-700",
      stats: collaborationData.filter(item => item.type === "research_paper").length
    },
    {
      type: "startup",
      title: "Startup Ideas & Funding",
      description: "Present your innovative startup ideas for funding and mentorship opportunities",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-green-500 to-green-700",
      stats: collaborationData.filter(item => item.type === "startup_idea").length
    },
    {
      type: "showcase",
      title: "Project Showcase",
      description: "Display your innovative projects and connect with potential collaborators",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-purple-700",
      stats: collaborationData.filter(item => item.type === "project_showcase").length
    },
    {
      type: "writing",
      title: "Technical Writing",
      description: "Contribute technical articles and tutorials to our knowledge base",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-orange-500 to-orange-700",
      stats: collaborationData.filter(item => item.type === "technical_writing").length
    },
    {
      type: "opensource",
      title: "Open Source Projects",
      description: "Collaborate on open source projects and contribute to the community",
      icon: <Code className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-700",
      stats: collaborationData.filter(item => item.type === "open_source").length
    },
    {
      type: "innovation",
      title: "Innovation Labs",
      description: "Join our innovation labs and work on cutting-edge technology projects",
      icon: <Zap className="w-8 h-8" />,
      color: "from-red-500 to-red-700",
      stats: collaborationData.filter(item => item.type === "innovation_lab").length
    }
  ];

  const filteredTypes = collaborationTypes.filter(type =>
    type.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubmissions = collaborationData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Collaboration request submitted! Redirecting to payment...", {
        description: "Please complete the payment to finalize your submission."
      });
      
      // Redirect to unified payment page
      setTimeout(() => {
        navigate(`/payment?product=${selectedType}&amount=25&category=Collaboration`);
      }, 1500);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageTransition>
      <div className="min-h-screen universal-bg-pg">
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Research Collaboration Hub
              </h1>
              <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto mb-8">
                Join our global community of researchers, innovators, and entrepreneurs. 
                Share your work, get funding, and collaborate on groundbreaking projects.
              </p>
            </div>
          </section>
          {/* Collaboration Types Grid */}
          <section className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Choose Your Collaboration Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredTypes.map((collab) => (
                  <Card key={collab.type} className="glass backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 h-full group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${collab.color} flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        {collab.icon}
                      </div>
                      <CardTitle className="text-white text-xl text-center group-hover:text-cyan-300 transition-colors duration-300">
                        {collab.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                        {collab.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-white/10 text-white group-hover:bg-white/20 transition-all duration-300">
                          {collab.stats} submissions
                        </Badge>
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedType(collab.type);
                          setShowSubmissionForm(true);
                        }}
                        variant="glass"
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Submission Form Modal */}
              {showSubmissionForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <Card className="glass backdrop-blur-md bg-white/10 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">
                        Submit Your {collaborationTypes.find(t => t.type === selectedType)?.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Fill out the form below to submit your collaboration request
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-white">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-white">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Enter your email address"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="title" className="text-white">Project/Research Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Enter your project title"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description" className="text-white">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Describe your project or research in detail"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="additionalInfo" className="text-white">Additional Information</Label>
                          <Textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows={3}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                            placeholder="Any additional information you'd like to share"
                          />
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowSubmissionForm(false)}
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="glass"
                            className="flex-1"
                          >
                            {isSubmitting ? "Submitting..." : "Submit & Pay"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Recent Submissions */}
              {searchTerm && (
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-white mb-8">Search Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubmissions.map((submission) => (
                      <Card key={submission.id} className="glass backdrop-blur-md bg-white/5 border border-white/10 hover:scale-105 hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                              {submission.type.replace('_', ' ')}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`${
                                submission.status === "Approved" || submission.status === "Approved for Funding" 
                                  ? "bg-green-500/20 text-green-300" 
                                  : submission.status.includes("Review")
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {submission.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-lg">
                            {submission.title}
                          </CardTitle>
                          <CardDescription className="text-gray-300">
                            By {submission.author} • {new Date(submission.submittedDate).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm">
                            {submission.description || submission.abstract || "No description available"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center">
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10 max-w-2xl mx-auto hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl mb-4">
                      Ready to Collaborate?
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Join thousands of researchers and innovators who are already part of our community. 
                      Start your collaboration journey today!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => {
                          setSelectedType("research");
                          setShowSubmissionForm(true);
                        }}
                        variant="glass"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Submit Research
                      </Button>
                      <Button 
                        onClick={() => {
                          setSelectedType("startup");
                          setShowSubmissionForm(true);
                        }}
                        variant="glass"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Share Startup Idea
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default Collaboration;