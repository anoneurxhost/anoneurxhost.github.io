import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { 
  FileCheck,
  ArrowLeft,
  Search,
  Loader2,
  CheckCircle,
  Clock,
  X,
  Award
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import InternshipResultCard from "@/pages/common/InternshipResultCard";
import internsData from "@/data/interns.json";

const InternshipVerify = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundApplication, setFoundApplication] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter an Application ID or email address");
      return;
    }

    setIsSearching(true);
    setFoundApplication(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const { applicationApi } = await import('@/services/api');
      const response = await applicationApi.search(searchQuery, 'internship');

      if (response.success && response.data) {
        setFoundApplication(response.data);
        setShowResult(true);
        toast.success("Application found successfully!");
      } else {
        toast.error("No internship application found with this ID, email, or name");
      }
    } catch (error) {
      console.error('Error searching for application:', error);
      toast.error("Error searching for application. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-600";
      case "Rejected": return "bg-red-600";
      case "Under Review": return "bg-yellow-600";
      case "Published": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted": return <CheckCircle className="w-5 h-5" />;
      case "Rejected": return <X className="w-5 h-5" />;
      case "Under Review": return <Clock className="w-5 h-5" />;
      case "Published": return <Award className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const renderSearchForm = () => (
    <div className="universal-page-bg">
     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 min-h-screen flex flex-col">
        
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-12">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <FileCheck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Verify Your Internship
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Enter your application ID or email to instantly check your internship status and download certificates
              </p>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-transparent" />
              <CardContent className="relative z-10 p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-white font-medium text-lg">
                      Application ID or Email Address
                    </label>
                    <div className="relative">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder-gray-300 h-14 text-lg px-6 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300"
                        placeholder="e.g., INT-2024-001 or john@email.com"
                      />
                      <Button className="absolute bg-transparent right-4 top-4 h-6 w-6 text-white hover:bg-white/10 focus:bg-white/20 rounded-full p-0" type="button" onClick={() => setSearchQuery('')}>
                        <Search/>
                    </Button>
                    </div>
                  </div>
                </form>
                
                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-white font-semibold mb-3">💡 Quick Tips:</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Use your application ID (e.g., INT-2024-001)</li>
                    <li>• Or enter the email you used for registration</li>
                    <li>• Partial searches are supported</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );

const renderResultPage = () => {
  if (!foundApplication) return null;

  const internData = {
    applicationId: foundApplication.applicationId,
    name: foundApplication.name,
    email: foundApplication.email,
    phone: foundApplication.phone,
    university: foundApplication.university,
    program: foundApplication.program,
    yearOfStudy: foundApplication.yearOfStudy,
    gpa: foundApplication.gpa,
    portfolioLink: foundApplication.portfolioLink,
    linkedinProfile: foundApplication.linkedinProfile,
    githubProfile: foundApplication.githubProfile,
    previousExperience: foundApplication.previousExperience,
    projects: foundApplication.projects,
    skills: foundApplication.skills,
    optionalSkills: foundApplication.optionalSkills,
    motivation: foundApplication.motivation,
    status: foundApplication.status,
    submittedDate: foundApplication.submittedDate,
    expectedDecision: foundApplication.expectedDecision || ''
  };

  return (
    <PageTransition>
      <div className="universal-page-bg">
        {/* Background overlay with blur effect */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowResult(false)}
              className="text-white border-white/30 hover:bg-white/10 backdrop-blur-md bg-white/5"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              New Search
            </Button>
          </div>

          <InternshipResultCard internData={internData} />
        </div>
      </div>
    </PageTransition>
  );
};

   return showResult ? renderResultPage() : renderSearchForm();
};

export default InternshipVerify;