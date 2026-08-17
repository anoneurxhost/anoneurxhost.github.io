
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Bell, User, Database, Palette } from "lucide-react";

const DashboardSettings = () => {
  return (
    <>
      <DashboardLayout title="Settings & Configuration">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input id="name" defaultValue="CEO Admin" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" defaultValue="ceo@company.com" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="text-white">SMS Notifications</Label>
                  <Switch id="sms-notifications" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor" className="text-white">Two-Factor Authentication</Label>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-alerts" className="text-white">Login Alerts</Label>
                  <Switch id="login-alerts" defaultChecked />
                </div>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup" className="text-white">Automatic Backups</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode" className="text-white">Maintenance Mode</Label>
                  <Switch id="maintenance-mode" />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardSettings;
