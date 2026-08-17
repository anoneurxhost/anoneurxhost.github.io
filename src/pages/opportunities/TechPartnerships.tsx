import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users, Globe, Handshake } from "lucide-react";
import { UnifiedApplyFormOverlay } from "@/components/forms/UnifiedApplyFormOverlay";
import { FormType } from "@/components/forms/UnifiedApplyForm";

const TechPartnerships = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<any>(null);

  const partnerships = [
    {
      title: "Google Cloud Academic Partnership",
      organization: "Google Cloud",
      type: "Cloud Platform",
      benefits: ["$10,000 cloud credits", "Technical support", "Training resources"],
      description: "Access to Google Cloud Platform services for research and educational purposes.",
      requirements: ["Academic institution", "Research project proposal", "Faculty sponsorship"],
      categories: ["Cloud", "AI/ML", "Education"]
    },
    {
      title: "Microsoft for Startups Program",
      organization: "Microsoft",
      type: "Startup Accelerator",
      benefits: ["$150,000 Azure credits", "Technical mentorship", "Go-to-market support"],
      description: "Comprehensive support program for technology startups using Microsoft technologies.",
      requirements: ["B2B startup", "Under 5 years old", "Using Microsoft tech stack"],
      categories: ["Startup", "Cloud", "Enterprise"]
    },
    {
      title: "NVIDIA Research Collaboration",
      organization: "NVIDIA",
      type: "Hardware Partnership",
      benefits: ["GPU grants", "Technical consultation", "Research collaboration"],
      description: "Partnership for AI research involving high-performance computing and GPU acceleration.",
      requirements: ["PhD-level research", "AI/ML focus", "Publication commitment"],
      categories: ["GPU", "AI Research", "HPC"]
    },
    {
      title: "AWS Educate Program",
      organization: "Amazon Web Services",
      type: "Educational Platform",
      benefits: ["Cloud credits", "Learning resources", "Career pathways"],
      description: "Educational program providing cloud computing resources and training.",
      requirements: ["Student or educator", "Educational institution", "Cloud computing focus"],
      categories: ["Cloud", "Education", "Training"]
    },
    {
      title: "Intel Innovation Alliance",
      organization: "Intel Corporation",
      type: "Technology Partnership",
      benefits: ["Hardware access", "Technical support", "Joint research opportunities"],
      description: "Collaboration on cutting-edge processor and hardware technologies.",
      requirements: ["Hardware research focus", "University partnership", "Intel technology usage"],
      categories: ["Hardware", "Processors", "Innovation"]
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
                  Tech Partnerships
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Industry collaborations and partnerships to accelerate your technology projects
                </p>
              </div>
            </div>
          </section>

          {/* Partnerships List */}
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="space-y-6">
                {partnerships.map((partnership, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                          {partnership.categories.map((category, catIndex) => (
                            <Badge key={catIndex} variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <Badge variant="outline" className="border-gray-400 text-gray-300">
                          {partnership.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-xl mb-2">
                        {partnership.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-base flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {partnership.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-200">{partnership.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Handshake className="w-4 h-4 mr-2" />
                            Benefits:
                          </h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {partnership.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Requirements:
                          </h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            {partnership.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => {
                            setSelectedPartnership(partnership);
                            setShowApplyForm(true);
                          }}
                        >
                          Apply for Partnership
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

          <UnifiedApplyFormOverlay
            isOpen={showApplyForm}
            onClose={() => {
              setShowApplyForm(false);
              setSelectedPartnership(null);
            }}
            formType="tech_partnership"
            targetId={selectedPartnership?.title}
            targetTitle={selectedPartnership?.title}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default TechPartnerships;
