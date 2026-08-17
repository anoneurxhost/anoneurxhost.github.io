import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, UserPlus, Code, Trophy, Calendar, Users, Zap, Award } from "lucide-react";

const Hackathon = () => {
  const upcomingEvents = [
    {
      title: "AI Innovation Hackathon 2024",
      date: "March 15-17, 2024",
      participants: "500+ registered",
      prize: "$50,000",
      themes: ["AI/ML", "Healthcare", "Sustainability"],
      status: "Open"
    },
    {
      title: "Blockchain BuildOut",
      date: "April 22-24, 2024", 
      participants: "300+ registered",
      prize: "$30,000",
      themes: ["DeFi", "NFTs", "Web3"],
      status: "Open"
    },
    {
      title: "Quantum Computing Challenge",
      date: "May 10-12, 2024",
      participants: "150+ registered", 
      prize: "$75,000",
      themes: ["Quantum Algorithms", "Hardware", "Applications"],
      status: "Coming Soon"
    }
  ];

  const hackathonStats = [
    { label: "Total Hackathons", value: "50+", icon: Code, color: "text-blue-400" },
    { label: "Participants", value: "2,000+", icon: Users, color: "text-green-400" },
    { label: "Prize Money", value: "$500K+", icon: Trophy, color: "text-yellow-400" },
    { label: "Winning Projects", value: "100+", icon: Award, color: "text-purple-400" },
  ];

  return (
    <DashboardLayout>
      <div className="main-h-full p-6 space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Hackathon Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Organize hackathons, verify participants, and manage enrollment for innovative coding competitions
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Verify Card */}
          <Link to="/dashboard/hackathon/verify">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 group h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <CardTitle className="text-white text-2xl group-hover:text-green-300 transition-colors">
                  Verify Participation
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Verify hackathon participants and manage completion certificates
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Review project submissions</li>
                  <li>• Issue completion certificates</li>
                  <li>• Validate participant credentials</li>
                  <li>• Manage verification status</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Verify Participants
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Enroll Card */}
          <Link to="/dashboard/hackathon/enroll">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <UserPlus className="w-8 h-8" />
                </div>
                <CardTitle className="text-white text-2xl group-hover:text-blue-300 transition-colors">
                  Manage Enrollment
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  Oversee hackathon registrations and participant management
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Review applications</li>
                  <li>• Manage team formations</li>
                  <li>• Resource allocation</li>
                  <li>• Monitor registrations</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Manage Enrollment
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {hackathonStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-center hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Upcoming Hackathons</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <CardTitle className="text-white text-xl">
                      {event.title}
                    </CardTitle>
                    <Badge className={`${event.status === 'Open' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants}
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      {event.prize}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Themes:</p>
                      <div className="flex flex-wrap gap-2">
                        {event.themes.map((theme, themeIndex) => (
                          <Badge key={themeIndex} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      disabled={event.status !== 'Open'}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {event.status === 'Open' ? 'Manage Event' : 'Coming Soon'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hackathon;