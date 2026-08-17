
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusHeaderProps {
  status: string;
  applicationId: string;
  program: string;
  submittedDate: string;
}

const StatusHeader = ({ status, applicationId, program, submittedDate }: StatusHeaderProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'Under Review':
        return <Clock className="w-8 h-8 text-yellow-400" />;
      case 'Rejected':
        return <XCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Clock className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-4">
        {getStatusIcon(status)}
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Internship Application Status</h1>
      <Badge className={`text-lg px-6 py-2 ${getStatusColor(status)}`}>
        {status}
      </Badge>
      <div className="border-t border-gray-700 pt-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Application ID</p>
            <p className="text-white font-mono text-lg">{applicationId}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Program</p>
            <p className="text-white font-medium text-lg">{program}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">Applied Date</p>
            <p className="text-white font-medium text-lg">{submittedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
