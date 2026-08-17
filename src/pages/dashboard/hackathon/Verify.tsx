import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, Award, Users, Calendar, MapPin, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Verify = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [email, setEmail] = useState("");
  const [verificationData, setVerificationData] = useState<any>(null);

  // Mock verification data
  const handleVerify = () => {
    if (!registrationId && !email) {
      toast({
        title: "Missing Information",
        description: "Please enter your Registration ID or email",
        variant: "destructive",
      });
      return;
    }

    // Simulate verification
    setVerificationData({
      registrationId: "HACK-2024-1234",
      name: "John Doe",
      email: "john.doe@example.com",
      event: "AI Innovation Hackathon 2024",
      status: "Confirmed",
      teamName: "AI Warriors",
      teamMembers: ["John Doe", "Jane Smith", "Mike Johnson"],
      projectTitle: "Smart Healthcare Assistant",
      checkInStatus: "Pending",
      schedule: [
        { time: "9:00 AM", activity: "Opening Ceremony", location: "Main Hall" },
        { time: "10:00 AM", activity: "Hacking Begins", location: "Tech Hub" },
        { time: "1:00 PM", activity: "Lunch Break", location: "Cafeteria" },
        { time: "6:00 PM", activity: "Dinner Break", location: "Cafeteria" },
        { time: "9:00 AM (Day 2)", activity: "Final Presentations", location: "Auditorium" },
      ],
      resources: [
        { name: "API Keys & Documentation", link: "#" },
        { name: "Mentor List", link: "#" },
        { name: "Submission Guidelines", link: "#" },
      ]
    });

    toast({
      title: "Verification Successful!",
      description: "Your registration details have been loaded.",
    });
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content min-h-screen py-16 px-4">
          
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Verify Your Registration
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Check your hackathon registration status, team details, and download certificates
              </p>
            </div>

            {/* Verification Form */}
            {!verificationData && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-2xl mx-auto mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Enter Your Details</CardTitle>
                  <CardDescription className="text-gray-300">
                    Use your Registration ID or email address to verify your participation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="registrationId" className="text-white">Registration ID</Label>
                    <Input
                      id="registrationId"
                      value={registrationId}
                      onChange={(e) => setRegistrationId(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="HACK-2024-XXXX"
                    />
                  </div>
                  <div className="text-center text-gray-400">OR</div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <Button
                    onClick={handleVerify}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Registration
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Verification Results */}
            {verificationData && (
              <div className="space-y-6">
                {/* Status Overview */}
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-2xl mb-2">
                          {verificationData.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {verificationData.event}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {verificationData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                      <div>
                        <strong>Registration ID:</strong> {verificationData.registrationId}
                      </div>
                      <div>
                        <strong>Email:</strong> {verificationData.email}
                      </div>
                      <div>
                        <strong>Check-in:</strong> {verificationData.checkInStatus}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="team" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10">
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="certificate">Certificate</TabsTrigger>
                  </TabsList>

                  <TabsContent value="team">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Team Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">Team Name</h4>
                          <p className="text-gray-300">{verificationData.teamName}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Project Title</h4>
                          <p className="text-gray-300">{verificationData.projectTitle}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-medium mb-2">Team Members</h4>
                          <ul className="space-y-2">
                            {verificationData.teamMembers.map((member: string, idx: number) => (
                              <li key={idx} className="text-gray-300 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                {member}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          Event Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {verificationData.schedule.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-3">
                              <div>
                                <p className="text-white font-medium">{item.activity}</p>
                                <p className="text-sm text-gray-400 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {item.location}
                                </p>
                              </div>
                              <Badge variant="outline" className="border-white/30 text-gray-300">
                                {item.time}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="resources">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Download className="w-5 h-5 mr-2" />
                          Hackathon Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {verificationData.resources.map((resource: any, idx: number) => (
                            <Button
                              key={idx}
                              variant="outline"
                              className="w-full justify-between border-white/30 text-white hover:bg-white/10"
                            >
                              {resource.name}
                              <Download className="w-4 h-4" />
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="certificate">
                    <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Certificates
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Download your participation and achievement certificates
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 text-center">
                          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                          <h3 className="text-white text-xl font-bold mb-2">Participation Certificate</h3>
                          <p className="text-gray-300 mb-4">
                            Congratulations on completing the {verificationData.event}!
                          </p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                        </div>
                        
                        <div className="text-center text-gray-400 text-sm">
                          Winner certificates will be available after final results announcement
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <Button
                  variant="outline"
                  onClick={() => setVerificationData(null)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Verify Another Registration
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Verify;
