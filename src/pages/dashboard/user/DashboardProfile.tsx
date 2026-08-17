
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { 
  User, Camera, Save, Edit, Lock, Shield, Bell, Globe, Mail, Phone, 
  Building, Calendar, MapPin, Briefcase, GraduationCap, Star 
} from "lucide-react";

const DashboardProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [canChangePassword, setCanChangePassword] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // CEO, HOD, HR, and Employees can change passwords
      setCanChangePassword(['ceo', 'hod', 'hr', 'employee'].includes(parsedUser.role));
    }
  }, []);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@nextgen.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate about technology and innovation",
    department: "AI Development",
    position: "Senior Developer",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    skills: ["React", "TypeScript", "Node.js", "AI/ML"],
    education: "Master of Computer Science",
    company: "Anoneurx",
    emergencyContact: "+1 (555) 987-6543",
    address: "123 Tech Street, San Francisco, CA 94107"
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    publicProfile: false,
    showActivity: true
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-yellow-600';
      case 'hr': return 'bg-green-600';
      case 'hod': return 'bg-purple-600';
      case 'employee': return 'bg-blue-600';
      case 'intern': return 'bg-orange-600';
      case 'student': return 'bg-indigo-600';
      case 'client': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  if (!user) {
    return (
      <DashboardLayout title="Profile">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-blue-600">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profileData.firstName} {profileData.lastName}</h1>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-300 text-lg">{profileData.position}</p>
                <p className="text-gray-400">{profileData.company}</p>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">First Name</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Last Name</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="bg-gray-800/70 border-gray-600 text-white"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-300 p-2">{profileData.bio}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.location}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Join Date
                    </Label>
                    <p className="text-gray-300 p-2">{new Date(profileData.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Position</Label>
                    {isEditing ? (
                      <Input
                        value={profileData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="bg-gray-800/70 border-gray-600 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 p-2">{profileData.position}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      Department
                    </Label>
                    <p className="text-gray-300 p-2">{profileData.department}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Education
                  </Label>
                  {isEditing ? (
                    <Input
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="bg-gray-800/70 border-gray-600 text-white"
                    />
                  ) : (
                    <p className="text-gray-300 p-2">{profileData.education}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Skills
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-blue-400 border-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Account Settings */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {canChangePassword && (
                  <Button className="w-full" variant="outline">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                )}
                <Button className="w-full" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Separator className="bg-gray-600" />
                <Button className="w-full" variant="outline">
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Email Notifications</Label>
                  <Switch 
                    checked={preferences.emailNotifications}
                    onCheckedChange={(value) => handlePreferenceChange('emailNotifications', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Push Notifications</Label>
                  <Switch 
                    checked={preferences.pushNotifications}
                    onCheckedChange={(value) => handlePreferenceChange('pushNotifications', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Weekly Reports</Label>
                  <Switch 
                    checked={preferences.weeklyReports}
                    onCheckedChange={(value) => handlePreferenceChange('weeklyReports', value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Public Profile</Label>
                  <Switch 
                    checked={preferences.publicProfile}
                    onCheckedChange={(value) => handlePreferenceChange('publicProfile', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Show Activity</Label>
                  <Switch 
                    checked={preferences.showActivity}
                    onCheckedChange={(value) => handlePreferenceChange('showActivity', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;
