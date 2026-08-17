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
      title: "Series A Funding",
      amount: "$5M - $15M",
      equity: "15-25%",
      stage: "Growth",
      description: "Scaling our AI development capabilities and expanding market reach",
      roi: "Expected 3-5x return",
      timeline: "3-5 years",
    },
    {
      title: "Strategic Investment",
      amount: "$1M - $5M",
      equity: "5-15%",
      stage: "Expansion",
      description: "Partnership-focused investment for technology integration",
      roi: "Expected 2-4x return",
      timeline: "2-4 years",
    },
    {
      title: "Seed Investment",
      amount: "$500K - $2M",
      equity: "10-20%",
      stage: "Early",
      description: "Early-stage investment in emerging technologies",
      roi: "Expected 5-10x return",
      timeline: "5-7 years",
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
                Investment Opportunities
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Invest in the future of technology with Anoneurx and be part of our growth story.
              </p>
            </div>
          </section>

          {/* Key Metrics */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white">
              {/* Form + Investment Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 text-white mb-16">
                {/* Investment Inquiry Form */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <PieChart className="w-6 h-6 mr-2" />
                      Investment Inquiry
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
                            placeholder="Investment Firm/Company"
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
                            placeholder="investor@firm.com"
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
                          Investment Interest *
                        </Label>
                        <Select required value={investmentType} onValueChange={setInvestmentType}>
                          <SelectTrigger id="investmentType" className="bg-white/10 border-white/30 text-white">
                            <SelectValue placeholder="Select investment type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="series-a">Series A Funding</SelectItem>
                            <SelectItem value="strategic">Strategic Investment</SelectItem>
                            <SelectItem value="seed">Seed Investment</SelectItem>
                            <SelectItem value="portfolio">Portfolio Investment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentRange" className="text-white">
                          Investment Range
                        </Label>
                        <Select value={investmentRange} onValueChange={setInvestmentRange}>
                          <SelectTrigger id="investmentRange" className="bg-white/10 border-white/30 text-white">
                            <SelectValue placeholder="Select investment range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1m">Under $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-15m">$5M - $15M</SelectItem>
                            <SelectItem value="over-15m">Over $15M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentGoals" className="text-white">
                          Investment Goals *
                        </Label>
                        <Textarea
                          id="investmentGoals"
                          name="investmentGoals"
                          required
                          className="bg-white/10 border-white/30 text-white min-h-[8rem]"
                          placeholder="Describe your investment goals, timeline, and areas of interest."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        aria-label="Submit Investment Inquiry"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Investment Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Investment Opportunities */}
                <div className="grid grid-cols-1 gap-6">
                  {investmentOptions.map((option, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">{option.title}</CardTitle>
                          <Badge className="bg-blue-600">{option.stage}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-300 text-sm">{option.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Investment Amount</p>
                            <p className="text-white font-semibold">{option.amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Equity Range</p>
                            <p className="text-white font-semibold">{option.equity}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Expected ROI</p>
                            <p className="text-green-400 font-semibold">{option.roi}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Timeline</p>
                            <p className="text-white font-semibold">{option.timeline}</p>
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
