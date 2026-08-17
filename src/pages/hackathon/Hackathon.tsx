import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, UserPlus, Code, Trophy, Calendar, Users } from "lucide-react";

const Hackathon = () => {
  const upcomingEvents = [
    {
      title: "AI Innovation Hackathon 2024",
      date: "March 15-17, 2024",
      participants: "500+ registered",
      prize: "$50,000",
      themes: ["AI/ML", "Healthcare", "Sustainability"]
    },
    {
      title: "Blockchain BuildOut",
      date: "April 22-24, 2024", 
      participants: "300+ registered",
      prize: "$30,000",
      themes: ["DeFi", "NFTs", "Web3"]
    },
    {
      title: "Quantum Computing Challenge",
      date: "May 10-12, 2024",
      participants: "150+ registered", 
      prize: "$75,000",
      themes: ["Quantum Algorithms", "Hardware", "Applications"]
    }
  ];

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content main-h-full">
          
          {/* Hero Section */}
          <section className="relative py-24 px-4">
            <div className="container mx-auto max-w-6xl text-center">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-6">
                  Hackathons
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
                  Hackathon Hub
                </h1>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                  Join the most innovative hackathons or verify your participation. Build, compete, and win amazing prizes!
                </p>
              </div>
            </div>
          </section>

          {/* Main Action Cards */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                
                {/* Verify Card */}
                <Link to="/hackathon/verify">
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 group h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-white text-2xl group-hover:text-green-300 transition-colors">
                        Verify Participation
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        Verify your hackathon participation and get your completion certificates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• Submit project documentation</li>
                        <li>• Get verification badge</li>
                        <li>• Download certificates</li>
                        <li>• Portfolio integration</li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Verify Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                {/* Enroll Card */}
                <Link to="/hackathon/enroll">
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                        <UserPlus className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-white text-2xl group-hover:text-blue-300 transition-colors">
                        Enroll in Hackathon
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        Register for upcoming hackathons and start building amazing projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li>• Browse upcoming events</li>
                        <li>• Team formation tools</li>
                        <li>• Resource access</li>
                        <li>• Mentorship support</li>
                      </ul>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Enroll Today
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Upcoming Events */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Upcoming Hackathons</h2>
                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-xl mb-2">
                              {event.title}
                            </CardTitle>
                            <div className="flex items-center text-gray-300 text-sm space-x-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {event.date}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.participants}
                              </div>
                              <div className="flex items-center">
                                <Trophy className="w-4 h-4 mr-1" />
                                {event.prize}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {event.themes.map((theme, themeIndex) => (
                            <span key={themeIndex} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                              {theme}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Hackathons Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">2000+</div>
                  <div className="text-gray-300 text-sm">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$500K+</div>
                  <div className="text-gray-300 text-sm">Prize Money</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-300 text-sm">Winning Projects</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Hackathon;