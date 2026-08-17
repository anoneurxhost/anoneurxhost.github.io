import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, FileText, Users } from "lucide-react";
import { UnifiedApplyFormOverlay } from "@/components/forms/UnifiedApplyFormOverlay";
import { FormType } from "@/components/forms/UnifiedApplyForm";

const ResearchGrants = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<any>(null);

  const grants = [
    {
      title: "AI for Good Research Grant",
      funder: "National Science Foundation",
      amount: "$250,000",
      duration: "3 years",
      deadline: "May 15, 2024",
      description: "Supporting AI research projects that address social challenges and benefit humanity.",
      eligibility: ["Universities and research institutions", "Collaborative projects encouraged", "Open to international partnerships"],
      categories: ["AI", "Social Impact", "Healthcare"]
    },
    {
      title: "Quantum Computing Innovation Fund",
      funder: "Technology Innovation Agency", 
      amount: "$500,000",
      duration: "2 years",
      deadline: "April 30, 2024",
      description: "Advancing quantum computing research and practical applications in various industries.",
      eligibility: ["PhD-level researchers", "Industry-academic partnerships", "Quantum hardware/software focus"],
      categories: ["Quantum Computing", "Hardware", "Algorithms"]
    },
    {
      title: "Sustainable Tech Research Grant",
      funder: "Green Technology Foundation",
      amount: "$100,000",
      duration: "18 months", 
      deadline: "June 1, 2024",
      description: "Supporting technology solutions for environmental sustainability and climate change.",
      eligibility: ["Early-career researchers", "Focus on practical applications", "Open to interdisciplinary teams"],
      categories: ["Sustainability", "Clean Tech", "Environment"]
    },
    {
      title: "Cybersecurity Research Initiative",
      funder: "Digital Security Consortium",
      amount: "$300,000",
      duration: "2.5 years",
      deadline: "March 31, 2024",
      description: "Advancing cybersecurity research to protect critical infrastructure and data.",
      eligibility: ["Security research background", "Government clearance may be required", "Industry collaboration preferred"],
      categories: ["Cybersecurity", "Infrastructure", "Privacy"]
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
                  Research Grants
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Fund your groundbreaking research with available grants and funding programs
                </p>
              </div>
            </div>
          </section>

          {/* Grants List */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {grants.map((grant, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {grant.categories.map((category, catIndex) => (
                          <Badge key={catIndex} variant="secondary" className="bg-green-500/20 text-green-300">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-white text-xl mb-2">
                        {grant.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base">
                        {grant.funder}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-200">{grant.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {grant.amount}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          {grant.duration}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <FileText className="w-4 h-4 mr-2" />
                          Deadline: {grant.deadline}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="w-4 h-4 mr-2" />
                          Collaborative
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Eligibility:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {grant.eligibility.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          setSelectedGrant(grant);
                          setShowApplyForm(true);
                        }}
                      >
                        Apply
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
              setSelectedGrant(null);
            }}
            formType="research_grant"
            targetId={selectedGrant?.title}
            targetTitle={selectedGrant?.title}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default ResearchGrants;
