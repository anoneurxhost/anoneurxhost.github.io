
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Save, Shield, Globe, Bell, Palette } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardContentManagerSettings = () => {
  const [settings, setSettings] = useState({
    autoSave: true,
    publicPreview: false,
    emailNotifications: true,
    backupEnabled: true,
    compressImages: true,
    seoOptimization: true
  });

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    accentColor: "#10b981"
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    toast("Settings saved successfully!");
  };

  return (
    <DashboardLayout title="Content Manager Settings">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-purple-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Content Manager Settings</h2>
                <p className="text-purple-300">Configure content management preferences</p>
              </div>
              <Settings className="w-16 h-16 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Auto-save changes</Label>
                  <p className="text-gray-400 text-sm">Automatically save content changes</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(value) => handleSettingChange('autoSave', value)}
                />
              </div>

              <Separator className="bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Public preview</Label>
                  <p className="text-gray-400 text-sm">Allow public access to preview changes</p>
                </div>
                <Switch
                  checked={settings.publicPreview}
                  onCheckedChange={(value) => handleSettingChange('publicPreview', value)}
                />
              </div>

              <Separator className="bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Compress images</Label>
                  <p className="text-gray-400 text-sm">Automatically optimize uploaded images</p>
                </div>
                <Switch
                  checked={settings.compressImages}
                  onCheckedChange={(value) => handleSettingChange('compressImages', value)}
                />
              </div>

              <Separator className="bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">SEO optimization</Label>
                  <p className="text-gray-400 text-sm">Enable automatic SEO suggestions</p>
                </div>
                <Switch
                  checked={settings.seoOptimization}
                  onCheckedChange={(value) => handleSettingChange('seoOptimization', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Email notifications</Label>
                  <p className="text-gray-400 text-sm">Receive email alerts for important changes</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
                />
              </div>

              <Separator className="bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white">Backup enabled</Label>
                  <p className="text-gray-400 text-sm">Create automatic backups of content</p>
                </div>
                <Switch
                  checked={settings.backupEnabled}
                  onCheckedChange={(value) => handleSettingChange('backupEnabled', value)}
                />
              </div>

              <Separator className="bg-gray-600" />

              <div className="space-y-4">
                <Label className="text-white">Backup frequency</Label>
                <select className="w-full bg-white/20 border-white/30 text-white rounded-md p-2">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Theme Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white">Primary Color</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-16 h-10 p-1 bg-white/20 border-white/30"
                  />
                  <Input
                    value={themeSettings.primaryColor}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Secondary Color</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="color"
                    value={themeSettings.secondaryColor}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                    className="w-16 h-10 p-1 bg-white/20 border-white/30"
                  />
                  <Input
                    value={themeSettings.secondaryColor}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Accent Color</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => setThemeSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-16 h-10 p-1 bg-white/20 border-white/30"
                  />
                  <Input
                    value={themeSettings.accentColor}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-white">Content approval workflow</Label>
                <select className="w-full bg-white/20 border-white/30 text-white rounded-md p-2">
                  <option value="none">No approval required</option>
                  <option value="manager">Manager approval</option>
                  <option value="admin">Admin approval</option>
                </select>
              </div>

              <Separator className="bg-gray-600" />

              <div className="space-y-4">
                <Label className="text-white">Access level</Label>
                <select className="w-full bg-white/20 border-white/30 text-white rounded-md p-2">
                  <option value="full">Full access</option>
                  <option value="limited">Limited access</option>
                  <option value="read-only">Read only</option>
                </select>
              </div>

              <Separator className="bg-gray-600" />

              <Button className="w-full bg-red-600 hover:bg-red-700">
                Reset All Content
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContentManagerSettings;
