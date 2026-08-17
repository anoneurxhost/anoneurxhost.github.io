
import { User, Mail, Phone, Building, Star, Award } from "lucide-react";

interface ApplicantProfileProps {
  name: string;
  email: string;
  phone: string;
  university: string;
  program: string;
  status: string;
}

const ApplicantProfile = ({ name, email, phone, university, program, status }: ApplicantProfileProps) => {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-gray-400">Internship Candidate</p>
        </div>
        {status === 'Accepted' && (
          <div className="ml-auto">
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Email Address</p>
              <p className="text-white font-medium">{email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Phone Number</p>
              <p className="text-white font-medium">{phone}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Building className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">University</p>
              <p className="text-white font-medium">{university}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
            <Star className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-gray-400 text-sm">Program Applied</p>
              <p className="text-white font-medium">{program}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
