import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Lightbulb, 
  Award,
  BookOpen,
  Code,
  Zap,
  CreditCard,
  DollarSign,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { toast } from "@/components/ui/sonner";

const CollaborationPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "";
  const [isProcessing, setIsProcessing] = useState(false);

  const collaborationTypes = {
    research: {
      title: "Research Paper Publication",
      icon: <FileText className="w-8 h-8" />,
      fee: 299,
      description: "Professional peer review and publication in our academic journal",
      features: [
        "Professional peer review process",
        "DOI assignment",
        "Global journal indexing",
        "Citation tracking",
        "Author profile creation"
      ]
    },
    startup: {
      title: "Startup Idea Evaluation",
      icon: <Lightbulb className="w-8 h-8" />,
      fee: 199,
      description: "Expert evaluation and potential funding opportunities",
      features: [
        "Expert business evaluation",
        "Market analysis report",
        "Funding recommendations",
        "Mentor matching",
        "Investment opportunities"
      ]
    },
    showcase: {
      title: "Project Showcase Premium",
      icon: <Award className="w-8 h-8" />,
      fee: 149,
      description: "Featured placement and enhanced visibility",
      features: [
        "Featured homepage placement",
        "Enhanced project visibility",
        "Industry expert reviews",
        "Networking opportunities",
        "Partnership matching"
      ]
    },
    writing: {
      title: "Technical Writing Premium",
      icon: <BookOpen className="w-8 h-8" />,
      fee: 99,
      description: "Professional editing and featured publication",
      features: [
        "Professional editing service",
        "Featured article placement",
        "Author byline and bio",
        "Social media promotion",
        "Technical accuracy review"
      ]
    },
    opensource: {
      title: "Open Source Project Support",
      icon: <Code className="w-8 h-8" />,
      fee: 79,
      description: "Enhanced project support and promotion",
      features: [
        "GitHub repository promotion",
        "Community support",
        "Code review assistance",
        "Documentation support",
        "Contributor matching"
      ]
    },
    innovation: {
      title: "Innovation Lab Access",
      icon: <Zap className="w-8 h-8" />,
      fee: 499,
      description: "Premium lab access and resources",
      features: [
        "Full lab resource access",
        "Expert mentorship",
        "Equipment and tools",
        "Prototype development",
        "Investor pitch preparation"
      ]
    }
  };

  const currentType = collaborationTypes[type as keyof typeof collaborationTypes];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("🎉 Payment successful! Your collaboration request has been submitted for review.", {
        description: "You will receive a confirmation email shortly. Our team will contact you within 24-48 hours."
      });
      navigate("/collaboration");
    }, 2000);
  };

  if (!currentType) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-red-400">Invalid Collaboration Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/collaboration")} className="bg-blue-600 hover:bg-blue-700">
                Back to Collaboration
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10">
          <Navigation />

          <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Collaboration Payment
                </h1>
                <p className="text-white text-lg max-w-2xl mx-auto">
                  Complete your payment to access premium collaboration features and services.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Service Details */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                        {currentType.icon}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">
                          {currentType.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {currentType.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-6">
                      <DollarSign className="w-6 h-6 text-green-400" />
                      <span className="text-3xl font-bold text-white">${currentType.fee}</span>
                      <Badge className="bg-green-500/20 text-green-300">One-time</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <h4 className="text-white font-semibold mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {currentType.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Payment Form */}
                <Card className="glass backdrop-blur-md bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <CreditCard className="w-6 h-6 mr-2" />
                      Payment Information
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Secure payment processing powered by industry standards
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-white">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="holderName" className="text-white">Cardholder Name</Label>
                        <Input
                          id="holderName"
                          placeholder="John Doe"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Subtotal:</span>
                        <span className="text-white">${currentType.fee}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Processing Fee:</span>
                        <span className="text-white">$0</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold border-t border-white/10 pt-4">
                        <span className="text-white">Total:</span>
                        <span className="text-green-400">${currentType.fee}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                    >
                      {isProcessing ? (
                        <>Processing Payment...</>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5 mr-2" />
                          Pay ${currentType.fee}
                        </>
                      )}
                    </Button>
                    
                    <p className="text-gray-400 text-sm text-center">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default CollaborationPayment;