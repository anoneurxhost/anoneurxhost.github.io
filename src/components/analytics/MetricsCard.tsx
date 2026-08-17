
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  status?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  iconColor?: string;
}

const MetricsCard = ({ title, value, change, status, icon: Icon, iconColor = "text-blue-400" }: MetricsCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <Card className="bg-white/10 border-gray-700">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-gray-300 text-xs sm:text-sm truncate">{title}</p>
            <p className="text-white font-bold text-lg sm:text-2xl">
              {typeof value === 'number' && title.includes('Rate') || title.includes('Uptime') ? `${value}%` : value}
            </p>
            {change && (
              <div className="flex items-center space-x-1 mt-1">
                <span className={`text-xs sm:text-sm ${getStatusColor(status)}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor} flex-shrink-0`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
