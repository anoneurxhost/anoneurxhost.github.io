import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardFinanceManagerFeatures = () => {
  const [featurePrices, setFeaturePrices] = useState({
    webDevelopment: 5999,
    mobileApp: 7999,
    windowsApps: 6999,
    gameDevelopment: 12999,
    roboticsAutomation: 15999,
    personalAI: 8999,
    enterpriseSoftware: 25999,
    iotSolutions: 11999
  });

  const handlePriceUpdate = (key: string, value: number) => {
    setFeaturePrices(prev => ({ ...prev, [key]: value }));
    toast(`${key.replace(/([A-Z])/g, ' $1').trim()} price updated!`);
  };

  return (
    <DashboardLayout title="Features Pricing">
      <div className="space-y-6">
        <Card className="bg-white/10 border-blue-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Features Pricing</h2>
                <p className="text-blue-300 text-sm">Manage pricing for all product features</p>
              </div>
              <Target className="w-10 h-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(featurePrices).map(([key, price]) => (
            <Card key={key} className="bg-white/5 border-gray-600">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-white mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-400">Price ($)</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setFeaturePrices(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                      className="bg-white/20 border-white/30 text-white text-sm h-9"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handlePriceUpdate(key, price)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Update Price
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManagerFeatures;
