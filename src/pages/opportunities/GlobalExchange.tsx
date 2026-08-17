import React from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Plane, MapPin, Calendar, Users, GraduationCap } from "lucide-react";

const GlobalExchange = () => {
  const programs = [
    {
      title: "MIT-Cambridge Exchange Program",
      institutions: "MIT & University of Cambridge",
      duration: "1 semester",
      location: "Cambridge, UK",
      deadline: "March 1, 2024",
      description: "Research exchange program between MIT and Cambridge focusing on AI and quantum computing.",
      eligibility: ["Graduate students", "3.5+ GPA", "Research proposal required"],
      benefits: ["Full funding", "Research mentorship", "Cultural immersion"],
      categories: ["Research", "AI", "Quantum"]
    },
    {
      title: "Stanford-Oxford Tech Initiative",
      institutions: "Stanford & Oxford University", 
      duration: "6 months",
      location: "Oxford, UK",
      deadline: "April 15, 2024",
      description: "Collaborative research program in emerging technologies and entrepreneurship.",
      eligibility: ["PhD candidates", "Tech focus", "English proficiency"],
      benefits: ["Stipend provided", "Industry connections", "Joint research"],
      categories: ["Tech", "Entrepreneurship", "Research"]
    },
    {
      title: "Silicon Valley-Tel Aviv Exchange",
      institutions: "Tech companies & Technion",
      duration: "3 months",
      location: "Tel Aviv, Israel",
      deadline: "May 30, 2024",
      description: "Industry exchange program with Israeli tech companies and Technion Institute.",
      eligibility: ["Professional experience", "Startup interest", "Hebrew helpful"],
      benefits: ["Industry placement", "Startup exposure", "Networking"],
      categories: ["Industry", "Startup", "Innovation"]
    },
    {
      title: "EU Horizon Research Fellowship",
      institutions: "European Universities",
      duration: "12 months",
      location: "Various EU countries",
      deadline: "February 28, 2024",
      description: "European research fellowship program across multiple institutions and countries.",
      eligibility: ["EU citizenship or residence", "Research background", "Multi-country"],
      benefits: ["€45,000 stipend", "Travel allowance", "Research support"],
      categories: ["Research", "Europe", "Multi-country"]
    },
    {
      title: "Asia-Pacific Tech Exchange",
      institutions: "APAC Universities",
      duration: "4 months",
      location: "Singapore, Tokyo, Seoul",
      deadline: "June 15, 2024",
      description: "Regional exchange program covering technology hubs across Asia-Pacific.",
      eligibility: ["Undergraduate/Graduate", "Tech studies", "Language adaptability"],
      benefits: ["Cultural immersion", "Tech ecosystem access", "Language learning"],
      categories: ["APAC", "Tech", "Cultural"]
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  Global Exchange
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  International opportunities and exchange programs to expand your global perspective
                </p>
              </div>
            </div>
          </section>

          {/* Programs List */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {programs.map((program, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {program.categories.map((category, catIndex) => (
                          <Badge key={catIndex} variant="secondary" className="bg-teal-500/20 text-teal-300">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-white text-xl mb-2">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        {program.institutions}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-200">{program.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {program.duration}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          {program.location}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Plane className="w-4 h-4 mr-2" />
                          Deadline: {program.deadline}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Globe className="w-4 h-4 mr-2" />
                          International
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            Eligibility:
                          </h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {program.eligibility.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start">
                                <span className="text-teal-400 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Benefits:
                          </h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {program.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                          Apply
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default GlobalExchange;