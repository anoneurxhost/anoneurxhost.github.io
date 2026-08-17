
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusMessageProps {
  status: string;
  expectedDecision: string;
}

const StatusMessage = ({ status, expectedDecision }: StatusMessageProps) => {
  const getStatusContent = () => {
    switch (status) {
      case 'Accepted':
        return {
          icon: <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />,
          title: "🎉 Congratulations!",
          message: "Your internship application has been accepted. You will receive further instructions via email soon.",
          badge: { text: "Welcome to the team!", className: "bg-green-500/20 text-green-300 border-green-500/30" },
          containerClass: "bg-green-500/10 border-green-500/20 text-green-300"
        };
      case 'Under Review':
        return {
          icon: <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />,
          title: "⏳ Application Under Review",
          message: `Your application is currently being reviewed by our team. Expected decision by: ${expectedDecision}`,
          badge: { text: "Stay tuned!", className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
          containerClass: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
        };
      case 'Rejected':
        return {
          icon: <XCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />,
          title: "Application Update",
          message: "Thank you for your interest. While your application was not selected this time, we encourage you to apply for future opportunities.",
          badge: { text: "Keep trying!", className: "bg-red-500/20 text-red-300 border-red-500/30" },
          containerClass: "bg-red-500/10 border-red-500/20 text-red-300"
        };
      default:
        return {
          icon: <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />,
          title: "Status Pending",
          message: "Your application status will be updated soon.",
          badge: { text: "Pending", className: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
          containerClass: "bg-gray-500/10 border-gray-500/20 text-gray-300"
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className={`p-6 rounded-lg border ${content.containerClass}`}>
      <div className="text-center">
        {content.icon}
        <h3 className="text-xl font-bold mb-2">{content.title}</h3>
        <p className="mb-4">{content.message}</p>
        <Badge className={content.badge.className}>
          {content.badge.text}
        </Badge>
      </div>
    </div>
  );
};

export default StatusMessage;
