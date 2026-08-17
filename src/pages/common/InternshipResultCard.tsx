
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import StatusHeader from "@/components/internship/StatusHeader";
import ApplicantProfile from "@/components/internship/ApplicantProfile";
import ApplicationTimeline from "@/components/internship/ApplicationTimeline";
import StatusMessage from "@/components/internship/StatusMessage";
import ActionButtons from "@/components/internship/ActionButtons";

interface InternshipResultCardProps {
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

const InternshipResultCard = ({ internData }: InternshipResultCardProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Card */}
      <Card className="card-professional">
        <CardContent className="p-8">
          <StatusHeader 
            status={internData.status}
            applicationId={internData.applicationId}
            program={internData.program}
            submittedDate={internData.submittedDate}
          />
        </CardContent>
      </Card>

      {/* Applicant Profile Card */}
      <Card className="card-professional">
        <CardContent className="p-8">
          <ApplicantProfile 
            name={internData.name}
            email={internData.email}
            phone={internData.phone}
            university={internData.university}
            program={internData.program}
            status={internData.status}
          />
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card className="card-professional">
        <CardContent className="p-8">
          <ApplicationTimeline 
            submittedDate={internData.submittedDate}
            expectedDecision={internData.expectedDecision}
            status={internData.status}
          />
        </CardContent>
      </Card>

      {/* Status Message */}
      <Card className="card-professional">
        <CardContent className="p-6">
          <StatusMessage 
            status={internData.status}
            expectedDecision={internData.expectedDecision}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <ActionButtons internData={internData} />
    </div>
  );
};

export default InternshipResultCard;
