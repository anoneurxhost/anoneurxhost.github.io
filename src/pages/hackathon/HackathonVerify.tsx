import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Upload, CheckCircle, AlertCircle, Download, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const HackathonVerify = () => {
  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    hackathonEvent: "",
    teamName: "",
    projectTitle: "",
    projectDescription: "",
    projectUrl: "",
    githubRepo: "",
    submissionDate: ""
  });
  const [loading, setLoading] = useState(false);

  const hackathonEvents = [
    "AI Innovation Hackathon 2024",
    "Blockchain BuildOut 2023", 
    "Quantum Computing Challenge 2024",
    "Cybersecurity CodeBreaker 2023",
    "Climate Tech Solutions 2024",
    "FinTech Revolution 2023"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate verification process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Verification Submitted!",
        description: "Your hackathon participation will be verified within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        participantName: "",
        email: "",
        hackathonEvent: "",
        teamName: "",
        projectTitle: "",
        projectDescription: "",
        projectUrl: "",
        githubRepo: "",
        submissionDate: ""
      });
    }, 2000);
  };

  const recentVerifications = [
    {
      name: "John Doe",
      event: "AI Innovation Hackathon 2024",
      project: "Smart Healthcare Assistant",
      status: "verified",
      date: "2024-01-15"
    },
    {
      name: "Jane Smith", 
      event: "Blockchain BuildOut 2023",
      project: "DeFi Portfolio Tracker",
      status: "pending",
      date: "2024-01-14"
    },
    {
      name: "Mike Johnson",
      event: "Quantum Computing Challenge 2024", 
      project: "Quantum Algorithm Optimizer",
      status: "verified",
      date: "2024-01-13"
    }
  ];

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content main-h-full">
          
          {/* Header Section */}
          <section className="relative py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-green-200 to-emerald-300 bg-clip-text text-transparent">
                  Verify Participation
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Submit your hackathon project details for verification and receive your completion certificate
                </p>
              </div>
            </div>
          </section>

          <section className="py-8 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Verification Form */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white text-2xl flex items-center">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        Verification Form
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Please provide accurate information about your hackathon participation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="participantName" className="text-white">Full Name</Label>
                            <Input
                              id="participantName"
                              type="text"
                              value={formData.participantName}
                              onChange={(e) => setFormData({...formData, participantName: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-white">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="hackathonEvent" className="text-white">Hackathon Event</Label>
                          <Select value={formData.hackathonEvent} onValueChange={(value) => setFormData({...formData, hackathonEvent: value})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select hackathon event" />
                            </SelectTrigger>
                            <SelectContent>
                              {hackathonEvents.map((event) => (
                                <SelectItem key={event} value={event}>
                                  {event}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="teamName" className="text-white">Team Name (Optional)</Label>
                            <Input
                              id="teamName"
                              type="text"
                              value={formData.teamName}
                              onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="submissionDate" className="text-white">Submission Date</Label>
                            <Input
                              id="submissionDate"
                              type="date"
                              value={formData.submissionDate}
                              onChange={(e) => setFormData({...formData, submissionDate: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="projectTitle" className="text-white">Project Title</Label>
                          <Input
                            id="projectTitle"
                            type="text"
                            value={formData.projectTitle}
                            onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="projectDescription" className="text-white">Project Description</Label>
                          <Textarea
                            id="projectDescription"
                            value={formData.projectDescription}
                            onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                            className="bg-white/10 border-white/20 text-white h-24"
                            placeholder="Describe your project, its features, and technologies used..."
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="projectUrl" className="text-white">Demo URL (Optional)</Label>
                            <Input
                              id="projectUrl"
                              type="url"
                              value={formData.projectUrl}
                              onChange={(e) => setFormData({...formData, projectUrl: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                              placeholder="https://your-demo.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="githubRepo" className="text-white">GitHub Repository</Label>
                            <Input
                              id="githubRepo"
                              type="url"
                              value={formData.githubRepo}
                              onChange={(e) => setFormData({...formData, githubRepo: e.target.value})}
                              className="bg-white/10 border-white/20 text-white"
                              placeholder="https://github.com/username/repo"
                              required
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit for Verification"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Verifications */}
                <div>
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">Recent Verifications</CardTitle>
                      <CardDescription className="text-gray-300">
                        Latest verification status updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentVerifications.map((verification, index) => (
                          <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium text-sm">{verification.name}</span>
                              <Badge 
                                variant={verification.status === 'verified' ? 'default' : 'secondary'}
                                className={verification.status === 'verified' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
                              >
                                {verification.status}
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-xs mb-1">{verification.event}</p>
                            <p className="text-gray-400 text-xs">{verification.project}</p>
                            <p className="text-gray-500 text-xs mt-2">{verification.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Download Certificate */}
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-6">
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Certificate Download
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4">
                        Download your verified hackathon certificates
                      </p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificates
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default HackathonVerify;