import React from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, DollarSign, Users, Clock, TrendingUp } from "lucide-react";

const StartupIncubation = () => {
  const programs = [
    {
      title: "TechStars Accelerator",
      organization: "TechStars",
      duration: "3 months",
      funding: "$120,000",
      equity: "6%",
      location: "Multiple cities",
      cohortSize: "10-12 startups",
      description: "World-renowned accelerator program providing mentorship, funding, and network access.",
      focus: ["B2B SaaS", "FinTech", "HealthTech"],
      perks: ["$120K investment", "Lifetime network access", "Demo Day presentation", "Mentorship"],
      nextCohort: "September 2024"
    },
    {
      title: "Y Combinator",
      organization: "Y Combinator",
      duration: "3 months",
      funding: "$500,000",
      equity: "7%",
      location: "San Francisco",
      cohortSize: "200+ startups",
      description: "The most prestigious startup accelerator program with extensive alumni network.",
      focus: ["Tech startups", "AI/ML", "Consumer products"],
      perks: ["$500K investment", "Alumni network", "Investor connections", "Growth support"],
      nextCohort: "Winter 2025"
    },
    {
      title: "Plug and Play Tech Center",
      organization: "Plug and Play",
      duration: "6 months",
      funding: "$250,000",
      equity: "5%",
      location: "Silicon Valley",
      cohortSize: "20-30 startups",
      description: "Corporate innovation platform connecting startups with Fortune 500 companies.",
      focus: ["Enterprise Tech", "IoT", "Mobility"],
      perks: ["Corporate partnerships", "Pilot programs", "Global expansion", "Industry expertise"],
      nextCohort: "Q1 2025"
    },
    {
      title: "500 Global Accelerator",
      organization: "500 Global",
      duration: "4 months",
      funding: "$150,000",
      equity: "6%",
      location: "Global (Remote)",
      cohortSize: "30-40 startups",
      description: "Global venture capital firm with accelerator programs across multiple markets.",
      focus: ["Global markets", "Emerging tech", "Series A prep"],
      perks: ["Global network", "Follow-on funding", "Market expansion", "Diversity focus"],
      nextCohort: "Summer 2024"
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-orange-200 to-red-300 bg-clip-text text-transparent">
                  Startup Incubation
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Launch your startup with top-tier incubation and accelerator programs
                </p>
              </div>
            </div>
          </section>

          {/* Programs List */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="space-y-8">
                {programs.map((program, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                          {program.focus.map((focus, focusIndex) => (
                            <Badge key={focusIndex} variant="secondary" className="bg-orange-500/20 text-orange-300">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant="outline" className="border-gray-400 text-gray-300">
                          Next: {program.nextCohort}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-2xl mb-2">
                        {program.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        {program.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-200 text-lg">{program.description}</p>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">Duration</div>
                            <div>{program.duration}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">Funding</div>
                            <div>{program.funding}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">Equity</div>
                            <div>{program.equity}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 mr-2" />
                          <div>
                            <div className="font-medium">Cohort Size</div>
                            <div>{program.cohortSize}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-3 flex items-center text-lg">
                          <Rocket className="w-5 h-5 mr-2" />
                          Program Benefits:
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {program.perks.map((perk, perkIndex) => (
                            <div key={perkIndex} className="flex items-start text-gray-300">
                              <span className="text-orange-400 mr-2">•</span>
                              {perk}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
                          Program Details
                        </Button>
                        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          Alumni Network
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

export default StartupIncubation;