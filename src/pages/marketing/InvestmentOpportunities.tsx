import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageTransition from "@/components/PageTransition";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target, PieChart, Send, Building2 } from "lucide-react";

const InvestmentOpportunities = () => {
  const [investmentType, setInvestmentType] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");

  const investmentOptions = [
    {
      title: "Technology partnership",
      focus: "Joint engineering",
      description:
        "Embedding Anoneurx components inside another product, with engineering time shared across both roadmaps.",
      engagement: "Scoped per project",
    },
    {
      title: "Infrastructure collaboration",
      focus: "Platform",
      description:
        "Co-development on cloud, runtime or operating system work where both parties contribute engineering capacity.",
      engagement: "Scoped per project",
    },
    {
      title: "Research collaboration",
      focus: "Research",
      description:
        "Joint research on published problems, with results released openly and authorship agreed in writing up front.",
      engagement: "By proposal",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("investmentType", investmentType);
    data.append("investmentRange", investmentRange);

    console.log("Investment inquiry submitted:", Object.fromEntries(data.entries()));
    // TODO: Connect to backend API or CRM
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content">

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Collaboration
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We work with other engineering teams on joint products and open research. This page is not
                an offer of securities, and we are not raising capital.
              </p>
            </div>
          </section>

          {/* Key Metrics */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
              {/* Form + Collaboration options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 text-white mb-16">
                {/* Partnership enquiry form */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <PieChart className="w-6 h-6 mr-2" />
                      Partnership Enquiry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-white">
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            required
                            className="bg-white/10 border-white/30 text-white"
                            placeholder="Your Full Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization" className="text-white">
                            Organization
                          </Label>
                          <Input
                            id="organization"
                            name="organization"
                            className="bg-white/10 border-white/30 text-white"
                            placeholder="Company or team name"
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
                            required
                            className="bg-white/10 border-white/30 text-white"
                            placeholder="you@example.com"
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
                        <Label htmlFor="investmentType" className="text-white">
                          Area of Interest *
                        </Label>
                        <Select required value={investmentType} onValueChange={setInvestmentType}>
                          <SelectTrigger id="investmentType" className="bg-white/10 border-white/30 text-white">
                            <SelectValue placeholder="Select an area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering collaboration</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="research">Joint research</SelectItem>
                            <SelectItem value="other">Something else</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentRange" className="text-white">
                          Engineering Capacity Needed
                        </Label>
                        <Select value={investmentRange} onValueChange={setInvestmentRange}>
                          <SelectTrigger id="investmentRange" className="bg-white/10 border-white/30 text-white">
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1m">Under 1 engineer-month</SelectItem>
                            <SelectItem value="1m-5m">1 to 5 engineer-months</SelectItem>
                            <SelectItem value="5m-15m">5 to 15 engineer-months</SelectItem>
                            <SelectItem value="over-15m">More than 15 engineer-months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentGoals" className="text-white">
                          Project Details *
                        </Label>
                        <Textarea
                          id="investmentGoals"
                          name="investmentGoals"
                          required
                          className="bg-white/10 border-white/30 text-white min-h-[8rem]"
                          placeholder="Describe the project, the timeline, and who is involved."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
                        aria-label="Submit partnership enquiry"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Enquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Collaboration options */}
                <div className="grid grid-cols-1 gap-6">
                  {investmentOptions.map((option, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">{option.title}</CardTitle>
                          <Badge className="bg-blue-600">{option.focus}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm">{option.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Engagement</p>
                            <p className="text-white font-semibold">{option.engagement}</p>
                          </div>
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

export default InvestmentOpportunities;
