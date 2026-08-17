import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileCheck, ArrowLeft, Search, Loader2, CheckCircle, Clock, X, Calendar } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const JoinDevTeamVerify = () => {
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
      const response = await applicationApi.search(searchQuery, 'dev_team');

      if (response.success && response.data) {
        setFoundApplication(response.data);
        setShowResult(true);
        toast.success("Application found successfully!");
      } else {
        toast.error("No developer team application found with this ID or email");
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
      case "accepted": return "bg-green-600";
      case "rejected": return "bg-red-600";
      case "under_review": return "bg-yellow-600";
      case "shortlisted": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle className="w-5 h-5" />;
      case "rejected": return <X className="w-5 h-5" />;
      case "under_review": return <Clock className="w-5 h-5" />;
      case "shortlisted": return <Calendar className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  if (showResult && foundApplication) {
    return (
      <PageTransition>
        <div className="universal-page-bg">
          
          <div className="relative z-10 min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <Button 
                variant="outline" 
                onClick={() => setShowResult(false)}
                className="text-white border-white/30 hover:bg-white/10 backdrop-blur-md bg-white/5 mb-6"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                New Search
              </Button>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Application Details</h2>
                    <Badge className={`${getStatusColor(foundApplication.status)} text-white flex items-center gap-2`}>
                      {getStatusIcon(foundApplication.status)}
                      {foundApplication.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Application ID</p>
                        <p className="text-white font-semibold">{foundApplication._id}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Position Applied For</p>
                        <p className="text-white font-semibold">{foundApplication.applicantData?.position || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Full Name</p>
                        <p className="text-white font-semibold">{foundApplication.applicantData?.fullName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white font-semibold">{foundApplication.applicantData?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Years of Experience</p>
                        <p className="text-white font-semibold">
                          {foundApplication.applicantData?.experience || 'N/A'} years
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Submitted Date</p>
                        <p className="text-white font-semibold">
                          {new Date(foundApplication.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {foundApplication.status === 'shortlisted' && (
                      <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Interview Scheduled
                        </h3>
                        <p className="text-gray-300 mb-2">
                          Congratulations! You've been shortlisted for an interview.
                        </p>
                        <p className="text-white font-semibold">
                          Please check your email for interview details and schedule.
                        </p>
                      </div>
                    )}

                    {foundApplication.status === 'accepted' && (
                      <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Application Accepted!
                        </h3>
                        <p className="text-gray-300 mb-2">
                          Welcome to the team! Our HR department will contact you shortly with onboarding details.
                        </p>
                      </div>
                    )}

                    {foundApplication.reviewNotes && (
                      <div className="mt-6">
                        <p className="text-gray-400 text-sm mb-2">Reviewer Notes</p>
                        <p className="text-white bg-white/5 p-4 rounded-lg">
                          {foundApplication.reviewNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="universal-page-bg">
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-12">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-6">
                <FileCheck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Verify Developer Application
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Enter your application ID or email to check your application status
              </p>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-white font-medium text-lg">
                      Application ID or Email Address
                    </label>
                    <div className="relative">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/10 border-white/30 text-white placeholder-gray-300 h-14 text-lg px-6 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
                        placeholder="e.g., DEV-2024-001 or john@email.com"
                        disabled={isSearching}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-14 text-lg"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Search Application
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-white font-semibold mb-3">💡 Quick Tips:</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Use your application ID (e.g., DEV-2024-001)</li>
                    <li>• Or enter the email you used for registration</li>
                    <li>• Check your email for application confirmation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default JoinDevTeamVerify;
