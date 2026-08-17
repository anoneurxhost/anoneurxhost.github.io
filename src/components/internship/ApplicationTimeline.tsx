
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

interface ApplicationTimelineProps {
  submittedDate: string;
  expectedDecision: string;
  status: string;
}

const ApplicationTimeline = ({ submittedDate, expectedDecision, status }: ApplicationTimelineProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Under Review':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Calendar className="mr-2 w-5 h-5 text-blue-400" />
        Application Timeline
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div>
              <p className="text-white font-medium">Application Submitted</p>
              <p className="text-gray-400 text-sm">{submittedDate}</p>
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-green-400" />
        </div>
        
        <div className={`flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border-l-4 ${
          status === 'Under Review' ? 'border-yellow-400' : 
          status === 'Accepted' ? 'border-green-400' : 'border-red-400'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              status === 'Under Review' ? 'bg-yellow-400' : 
              status === 'Accepted' ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            <div>
              <p className="text-white font-medium">Internship Completed</p>
              <p className="text-gray-400 text-sm">{expectedDecision}</p>
            </div>
          </div>
          {getStatusIcon(status)}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
