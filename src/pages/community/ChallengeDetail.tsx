import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trophy, Clock, Users, Download, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    githubUrl: "",
    description: "",
    file: null as File | null
  });

  // Challenge data (in production, fetch from API)
  const challengeData = {
    "ai-optimization": {
      title: "AI Model Optimization Challenge",
      difficulty: "Advanced",
      domain: "Artificial Intelligence",
      prize: "$5,000",
      deadline: "30 days",
      description: "Optimize a deep learning model to achieve 95%+ accuracy while reducing inference time by 50%.",
      fullDescription: "In this challenge, you'll work with a pre-trained deep learning model for image classification. Your task is to optimize it for both accuracy and speed, making it suitable for edge deployment. The model must maintain at least 95% accuracy while reducing inference time by a minimum of 50%.",
      requirements: ["PyTorch/TensorFlow", "Model optimization", "Performance benchmarking"],
      rules: [
        "Teams of 1-4 members allowed",
        "Must use the provided baseline model",
        "All code must be original",
        "Final submission includes code + documentation"
      ],
      evaluation: [
        "Accuracy (40%)",
        "Speed improvement (30%)",
        "Code quality (20%)",
        "Documentation (10%)"
      ],
      participants: 42,
      submissions: 18
    },
    "blockchain-security": {
      title: "Blockchain Smart Contract Security",
      difficulty: "Expert",
      domain: "Blockchain",
      prize: "$7,500",
      deadline: "45 days",
      description: "Identify and fix critical vulnerabilities in a DeFi smart contract system.",
      fullDescription: "This expert-level challenge requires you to audit and secure a complex DeFi protocol. You'll need to identify potential vulnerabilities, propose fixes, and implement them while maintaining the contract's functionality.",
      requirements: ["Solidity", "Smart contract auditing", "Security best practices"],
      rules: [
        "Individual entries only",
        "Must identify at least 3 critical vulnerabilities",
        "Provide comprehensive security report",
        "Include test cases for all fixes"
      ],
      evaluation: [
        "Vulnerability identification (35%)",
        "Fix effectiveness (35%)",
        "Security report quality (20%)",
        "Test coverage (10%)"
      ],
      participants: 28,
      submissions: 9
    },
    "robotics-navigation": {
      title: "Autonomous Navigation System",
      difficulty: "Advanced",
      domain: "Robotics",
      prize: "$6,000",
      deadline: "60 days",
      description: "Develop a navigation algorithm for autonomous robots in complex environments.",
      fullDescription: "Design and implement an autonomous navigation system capable of handling dynamic obstacles, multi-floor environments, and real-time path planning. The system should work in both indoor and outdoor settings.",
      requirements: ["ROS", "Path planning", "Computer vision"],
      rules: [
        "Teams of 2-5 members",
        "Simulation testing required",
        "Must handle at least 3 environment types",
        "Real-time performance mandatory"
      ],
      evaluation: [
        "Navigation accuracy (35%)",
        "Obstacle avoidance (25%)",
        "Performance efficiency (25%)",
        "Code documentation (15%)"
      ],
      participants: 35,
      submissions: 12
    }
  };

  const challenge = challengeData[challengeId as keyof typeof challengeData];

  if (!challenge) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Challenge Not Found</h1>
            <Link to="/dev-team">
              <Button>Back to Dev Team</Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Submission received! We'll review it and get back to you soon.");
    setFormData({ name: "", email: "", githubUrl: "", description: "", file: null });
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="container-responsive py-16">
          <Link to="/dev-team" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
            ← Back to Challenges
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                {challenge.domain}
              </Badge>
              <Badge className={challenge.difficulty === 'Expert' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}>
                {challenge.difficulty}
              </Badge>
              <Badge className="bg-green-500/20 text-green-300">
                Prize: {challenge.prize}
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{challenge.title}</h1>
            <p className="text-xl text-gray-300">{challenge.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Challenge Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{challenge.fullDescription}</p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Technical Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {challenge.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Challenge Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {challenge.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Evaluation */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Evaluation Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {challenge.evaluation.map((criterion, idx) => (
                      <div key={idx} className="flex items-center justify-between text-gray-300">
                        <span>{criterion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submission Form */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Submit Your Solution</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below to submit your entry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="github" className="text-white">GitHub Repository URL</Label>
                      <Input
                        id="github"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="https://github.com/username/repo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-white">Solution Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                        rows={4}
                        placeholder="Describe your approach and key innovations..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="file" className="text-white">Upload Documentation (Optional)</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="bg-white/5 border-white/10 text-white"
                        accept=".pdf,.doc,.docx"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Entry"}
                      <Upload className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span>Deadline</span>
                    </div>
                    <span className="text-white font-semibold">{challenge.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-5 h-5 text-green-400" />
                      <span>Participants</span>
                    </div>
                    <span className="text-white font-semibold">{challenge.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span>Submissions</span>
                    </div>
                    <span className="text-white font-semibold">{challenge.submissions}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Starter Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Dataset
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                </CardContent>
              </Card>

              {/* Leaderboard Preview */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "Team Alpha", score: 96.5 },
                      { rank: 2, name: "Code Ninjas", score: 94.2 },
                      { rank: 3, name: "Tech Wizards", score: 92.8 }
                    ].map((entry) => (
                      <div key={entry.rank} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-bold ${
                            entry.rank === 1 ? 'text-yellow-400' :
                            entry.rank === 2 ? 'text-gray-300' :
                            'text-orange-400'
                          }`}>
                            #{entry.rank}
                          </span>
                          <span className="text-white">{entry.name}</span>
                        </div>
                        <span className="text-green-400 font-semibold">{entry.score}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ChallengeDetail;
