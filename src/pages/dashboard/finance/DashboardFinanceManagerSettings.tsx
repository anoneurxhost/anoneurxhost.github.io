import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, Bell, Shield, Palette } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardFinanceManagerSettings = () => {
  const [settings, setSettings] = useState({
    currency: "USD",
    fiscalYear: "2024",
    taxRate: "15",
    autoReport: true,
    emailNotifications: true,
    approvalRequired: true,
  });

  const handleSave = () => {
    toast("Settings saved successfully!");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <Card className="bg-white/10 border-gray-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Finance Settings</h2>
                <p className="text-gray-300 text-sm">Configure financial preferences and defaults</p>
              </div>
              <Settings className="w-10 h-10 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-400">Default Currency</Label>
                <Input
                  value={settings.currency}
                  onChange={(e) => setSettings(p => ({ ...p, currency: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white text-sm h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Fiscal Year</Label>
                <Input
                  value={settings.fiscalYear}
                  onChange={(e) => setSettings(p => ({ ...p, fiscalYear: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white text-sm h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400">Tax Rate (%)</Label>
                <Input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => setSettings(p => ({ ...p, taxRate: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white text-sm h-9"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "autoReport", label: "Auto-generate monthly reports" },
                { key: "emailNotifications", label: "Email notifications for payments" },
                { key: "approvalRequired", label: "Require approval for large transactions" },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={(settings as any)[item.key]}
                    onChange={(e) => setSettings(p => ({ ...p, [item.key]: e.target.checked }))}
                    className="w-4 h-4 rounded"
                  />
                </label>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-white">Two-Factor Authentication</p>
                <p className="text-[11px] text-gray-400">Add extra security to your account</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs border-gray-600 text-white hover:bg-white/10">Enable</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-white">Session Timeout</p>
                <p className="text-[11px] text-gray-400">Auto-logout after inactivity</p>
              </div>
              <span className="text-xs text-gray-400">30 minutes</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardFinanceManagerSettings;
