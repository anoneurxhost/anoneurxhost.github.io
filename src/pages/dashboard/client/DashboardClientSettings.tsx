import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, Building, Camera, Save } from "lucide-react";

const DashboardClientSettings = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-purple-900/95 backdrop-blur-sm"></div>
      </div>

      <DashboardLayout title="Settings">
        <div className="relative z-10 space-y-6">
          {/* Company Profile Header */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                  <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">Acme Corporation</CardTitle>
              <CardDescription className="text-gray-300">
                Leading Technology Solutions Provider
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Profile Settings */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-gray-300">
                Update your company information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Company Name</Label>
                  <Input
                    id="name"
                    defaultValue="Acme Corporation"
                    className="bg-gray-800/70 border-gray-600 text-white backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@acme.com"
                    className="bg-gray-800/70 border-gray-600 text-white backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-gray-800/70 border-gray-600 text-white backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white">Industry</Label>
                  <Input
                    id="industry"
                    defaultValue="Technology"
                    className="bg-gray-800/70 border-gray-600 text-white backdrop-blur-sm"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <Label htmlFor="bio" className="text-white">Company Description</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your company..."
                  className="bg-gray-800/70 border-gray-600 text-white backdrop-blur-sm"
                  rows={3}
                />
              </div>
              <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Company Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your company information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white">Industry</Label>
                  <Input
                    id="industry"
                    defaultValue="Technology"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size" className="text-white">Company Size</Label>
                  <Input
                    id="size"
                    defaultValue="50-100 employees"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-white">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://acme.com"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Input
                    id="timezone"
                    defaultValue="UTC-5 (EST)"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-gray-400">
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Project Updates</p>
                    <p className="text-gray-400 text-sm">Get notified about project milestones and progress</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Meeting Reminders</p>
                    <p className="text-gray-400 text-sm">Receive reminders before scheduled meetings</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Invoice Notifications</p>
                    <p className="text-gray-400 text-sm">Get notified about new invoices and payment due dates</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Team Messages</p>
                    <p className="text-gray-400 text-sm">Receive notifications from team members</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security & Privacy
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Change Password
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Download Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardClientSettings;
