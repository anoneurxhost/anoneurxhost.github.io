
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from 'recharts';
import { ReactElement, JSXElementConstructor } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  className?: string;
}

const ChartCard = ({ title, children, className = "" }: ChartCardProps) => {
  return (
    <Card className={`bg-white/10 border-gray-700 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm sm:text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="h-48 sm:h-64 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
