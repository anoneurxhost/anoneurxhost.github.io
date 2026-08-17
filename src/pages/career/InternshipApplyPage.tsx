import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Users, DollarSign, Calendar, Search, Send, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Instagram, Youtube } from "lucide-react";

const InternshipApplyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only show dashboard-added internships (empty for now)
  const internships: any[] = [];
  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Application Submitted!",
        description: `Your application for ${selectedInternship.title} has been submitted successfully.`,
      });

      // Reset form
      setApplicationData({
        name: "",
        email: "",
        phone: "",
        education: "",
        experience: "",
        motivation: "",
      });
      setSelectedInternship(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
    
        <div className="relative z-10">

          {/* Hero Section */}
          <section className="relative py-20 px-4">
            <div className="container mx-auto max-w-6xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Apply for Internships
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Join our innovative team and gain hands-on experience in cutting-edge technology
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </section>

          {/* No Internships Available */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Internship Programs
                </h2>
              </div>
              
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
                <CardContent className="py-16 text-center">
                  <div className="text-gray-400 mb-6">
                    <Calendar className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    No Internship Programs Available
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Currently, there are no active internship programs. Stay tuned for exciting opportunities coming soon!
                  </p>
                  
                   {/* Social Media Links */}
                   <div className="space-y-6">
                     <h4 className="text-lg font-semibold text-white">
                       Stay Updated - Follow Our Social Links
                     </h4>
                     <div className="flex justify-center space-x-6">
                       <a 
                         href="https://instagram.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full hover:scale-110 transition-all duration-300"
                       >
                         <Instagram className="w-6 h-6 text-white group-hover:animate-pulse" />
                       </a>
                       <a 
                         href="https://youtube.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full hover:scale-110 transition-all duration-300"
                       >
                         <Youtube className="w-6 h-6 text-white group-hover:animate-pulse" />
                       </a>
                       <a 
                         href="https://whatsapp.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full hover:scale-110 transition-all duration-300"
                       >
                         <MessageCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
                       </a>
                     </div>
                     
                     {/* Email Subscription */}
                     <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-8">
                       <h5 className="text-white font-semibold mb-4">Subscribe for Internship Updates</h5>
                       <div className="flex flex-col sm:flex-row gap-3">
                         <Input
                           type="email"
                           placeholder="Enter your email address"
                           className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                         />
                         <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
                           <Send className="w-4 h-4 mr-2" />
                           Subscribe
                         </Button>
                       </div>
                       <p className="text-gray-400 text-xs mt-2">
                         Get notified instantly when new internship opportunities are posted
                       </p>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
    </PageTransition>
  );
};

export default InternshipApplyPage;