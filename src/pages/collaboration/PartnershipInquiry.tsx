import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageTransition from "@/components/PageTransition";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handshake,
  Building2,
  Users,
  TrendingUp,
  Send,
} from "lucide-react";

const PartnershipInquiry = () => {
  const [partnershipType, setPartnershipType] = useState("");
  const [companySize, setCompanySize] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("partnershipType", partnershipType);
    data.append("companySize", companySize);

    console.log("Partnership inquiry submitted:", Object.fromEntries(data.entries()));
    // TODO: connect API or email integration
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Partnership Inquiry
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Join forces with Anoneurx to unlock new opportunities for growth
                  and innovation.
                </p>
              </div>
            </div>
          </section>

          {/* Form + Benefits */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Partnership Form */}
              <form onSubmit={handleSubmit}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Handshake className="w-6 h-6 mr-2" />
                      Partnership Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-white">
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          className="bg-white/10 border-white/30 text-white"
                          placeholder="Your Company Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="text-white">
                          Contact Person *
                        </Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          className="bg-white/10 border-white/30 text-white"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="bg-white/10 border-white/30 text-white"
                          placeholder="contact@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          className="bg-white/10 border-white/30 text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnershipType" className="text-white">
                        Partnership Type *
                      </Label>
                      <Select
                        required
                        onValueChange={setPartnershipType}
                        value={partnershipType}
                      >
                        <SelectTrigger
                          id="partnershipType"
                          className="bg-white/10 border-white/30 text-white"
                        >
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strategic">
                            Strategic Partnership
                          </SelectItem>
                          <SelectItem value="technology">
                            Technology Partnership
                          </SelectItem>
                          <SelectItem value="reseller">
                            Reseller Partnership
                          </SelectItem>
                          <SelectItem value="integration">
                            Integration Partnership
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="text-white">
                        Company Size
                      </Label>
                      <Select
                        onValueChange={setCompanySize}
                        value={companySize}
                      >
                        <SelectTrigger
                          id="companySize"
                          className="bg-white/10 border-white/30 text-white"
                        >
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">
                            Startup (1-10 employees)
                          </SelectItem>
                          <SelectItem value="small">
                            Small (11-50 employees)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium (51-200 employees)
                          </SelectItem>
                          <SelectItem value="large">
                            Large (200+ employees)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="proposal" className="text-white">
                        Partnership Proposal *
                      </Label>
                      <Textarea
                        id="proposal"
                        name="proposal"
                        className="bg-white/10 border-white/30 text-white min-h-[8rem]"
                        placeholder="Describe your partnership proposal, goals, and how we can work together."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      aria-label="Submit Partnership Inquiry"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Partnership Inquiry
                    </Button>
                  </CardContent>
                </Card>
              </form>

              {/* Partnership Benefits */}
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Partnership Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-4">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">
                          Growth Opportunities
                        </h4>
                        <p className="text-sm">
                          Expand your market reach and customer base
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-purple-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">
                          Expert Collaboration
                        </h4>
                        <p className="text-sm">
                          Work with our experienced development teams
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Building2 className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">
                          Resource Sharing
                        </h4>
                        <p className="text-sm">
                          Access to our technology stack and infrastructure
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Partnership Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <span>Submit your partnership inquiry</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <span>Initial review and assessment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <span>Partnership discussion and negotiation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        4
                      </div>
                      <span>Agreement finalization and launch</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default PartnershipInquiry;
