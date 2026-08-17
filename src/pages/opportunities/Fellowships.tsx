import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import { UnifiedApplyFormOverlay } from "@/components/forms/UnifiedApplyFormOverlay";
import { FormType } from "@/components/forms/UnifiedApplyForm";

const Fellowships = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedFellowship, setSelectedFellowship] = useState<any>(null);

  const fellowships = [
    {
      title: "AI Research Fellowship",
      organization: "TechCorp AI Labs",
      duration: "12 months",
      location: "Remote / San Francisco",
      stipend: "$60,000",
      deadline: "March 15, 2024",
      description: "Join our cutting-edge AI research team to work on next-generation machine learning algorithms.",
      requirements: ["PhD in Computer Science or related field", "3+ years ML experience", "Published research papers"],
      tags: ["AI", "Machine Learning", "Research"]
    },
    {
      title: "Blockchain Innovation Fellowship", 
      organization: "CryptoFoundation",
      duration: "6 months",
      location: "New York / Remote",
      stipend: "$45,000",
      deadline: "April 1, 2024",
      description: "Contribute to the future of decentralized finance and blockchain technology.",
      requirements: ["Experience with Solidity", "Understanding of DeFi protocols", "Portfolio of blockchain projects"],
      tags: ["Blockchain", "DeFi", "Web3"]
    },
    {
      title: "Robotics Engineering Fellowship",
      organization: "RoboTech Institute",
      duration: "18 months", 
      location: "Boston, MA",
      stipend: "$55,000",
      deadline: "February 28, 2024",
      description: "Work on autonomous systems and human-robot interaction projects.",
      requirements: ["Masters in Robotics/ME", "ROS experience", "C++/Python proficiency"],
      tags: ["Robotics", "Autonomous Systems", "Engineering"]
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Tech Fellowships
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Advance your research and technical skills with prestigious fellowship opportunities
                </p>
              </div>
            </div>
          </section>

          {/* Fellowships List */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fellowships.map((fellowship, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {fellowship.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-white text-xl mb-2">
                        {fellowship.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        {fellowship.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-200">{fellowship.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {fellowship.duration}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          {fellowship.location}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Award className="w-4 h-4 mr-2" />
                          {fellowship.stipend}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 mr-2" />
                          Deadline: {fellowship.deadline}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Requirements:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {fellowship.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setSelectedFellowship(fellowship);
                          setShowApplyForm(true);
                        }}
                      >
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <UnifiedApplyFormOverlay
            isOpen={showApplyForm}
            onClose={() => {
              setShowApplyForm(false);
              setSelectedFellowship(null);
            }}
            formType="fellowship"
            targetId={selectedFellowship?.title}
            targetTitle={selectedFellowship?.title}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Fellowships;
