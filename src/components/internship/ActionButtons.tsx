
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { generateCertificate, generateShareableLink, copyToClipboard } from "@/services/certificateService";

interface ActionButtonsProps {
  internData: {
    applicationId: string;
    name: string;
    email: string;
    phone: string;
    university: string;
    program: string;
    status: string;
    submittedDate: string;
    expectedDecision: string;
  };
}

const ActionButtons = ({ internData }: ActionButtonsProps) => {
  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);

  const handleDownloadCertificate = async () => {
    setIsGeneratingCertificate(true);
    try {
      await generateCertificate(internData);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate. Please try again.");
    } finally {
      setIsGeneratingCertificate(false);
    }
  };

  const handleShareResults = async () => {
    setIsGeneratingLink(true);
    try {
      const shareableLink = generateShareableLink(internData);
      const success = await copyToClipboard(shareableLink);
      
      if (success) {
        toast.success("Shareable link copied to clipboard!");
      } else {
        toast.error("Failed to copy link. Please try again.");
      }
    } catch (error) {
      console.error("Error sharing results:", error);
      toast.error("Failed to generate shareable link.");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {internData.status === 'Accepted' && (
        <Button 
          onClick={handleDownloadCertificate}
          disabled={isGeneratingCertificate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          {isGeneratingCertificate ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 w-5 h-5" />
              Download Certificate
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
