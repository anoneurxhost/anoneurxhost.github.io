import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { UnifiedApplyForm } from "@/components/forms/UnifiedApplyForm";

const JoinUs = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center section-padding">
          <div className="container-responsive">
            <div className="text-center mb-12">
              <Button variant="outline" asChild className="mb-6 border-white/20 text-gray-300 hover:bg-white/10">
                <Link to="/careers" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Career Hub</span>
                </Link>
              </Button>
              
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 px-6 py-3 backdrop-blur-sm">
                <Users className="w-5 h-5 mr-2" />
                Join Our Team
              </Badge>
              <h1 className="responsive-title font-bold mb-6 text-white">
                Apply to Join Our Dev Team
              </h1>
              <p className="responsive-subtitle text-gray-300 max-w-3xl mx-auto mb-12">
                Ready to be part of revolutionary projects? Fill out the form below and let's build the future together.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Section */}
                <div className="lg:col-span-1">
                  <Card className="card-feature">
                    <CardHeader className="p-6">
                      <CardTitle className="text-xl text-white flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                        What We Offer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div>
                            <h4 className="text-white font-medium">Competitive Salary</h4>
                            <p className="text-gray-300 text-sm">Industry-leading compensation packages</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div>
                            <h4 className="text-white font-medium">Remote Work</h4>
                            <p className="text-gray-300 text-sm">Flexible work-from-home options</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                          <div>
                            <h4 className="text-white font-medium">Learning Budget</h4>
                            <p className="text-gray-300 text-sm">Annual budget for courses and conferences</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                          <div>
                            <h4 className="text-white font-medium">Health Benefits</h4>
                            <p className="text-gray-300 text-sm">Comprehensive health and wellness coverage</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Application Form */}
                <div className="lg:col-span-2">
                  <UnifiedApplyForm
                    formType="other_opportunity"
                    targetId="dev-team"
                    targetTitle="Join Our Development Team"
                    onSuccess={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default JoinUs;
