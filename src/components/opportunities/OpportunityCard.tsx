import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardProps {
  title: string;
  department: string;
  duration: string;
  location: string;
  stipend?: string;
  prize?: string;
  skills: string[];
  description: string;
  requirements: string[];
  icon: LucideIcon;
  color: string;
  applyLink: string;
  onApplyClick?: () => void;
  additionalInfo?: Array<{ label: string; value: string }>;
}

export const OpportunityCard = ({
  title,
  department,
  duration,
  location,
  stipend,
  prize,
  skills,
  description,
  requirements,
  icon: Icon,
  color,
  applyLink,
  onApplyClick,
  additionalInfo
}: OpportunityCardProps) => {
  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group hover-scale">
      <CardHeader className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </CardTitle>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-2">
              {department}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div>Duration: {duration}</div>
          <div>Location: {location}</div>
          {stipend && <div>Stipend: {stipend}</div>}
          {prize && <div>Prize: {prize}</div>}
          {additionalInfo?.map((info, idx) => (
            <div key={idx}>{info.label}: {info.value}</div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <CardDescription className="text-gray-300 mb-4">
          {description}
        </CardDescription>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge key={i} variant="outline" className="text-xs border-white/30 text-gray-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          {requirements.length > 0 && (
            <div>
              <h4 className="text-white font-medium mb-2">Requirements:</h4>
              <ul className="space-y-1">
                {requirements.map((req, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    • {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {onApplyClick ? (
          <Button 
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            onClick={onApplyClick}
          >
            Apply Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button asChild className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
            <Link to={applyLink}>
              Apply Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
