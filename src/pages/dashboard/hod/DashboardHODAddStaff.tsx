import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardHODAddStaff = () => {
  const [staffData, setStaffData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    startDate: '',
    address: '',
    qualifications: '',
    experience: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setStaffData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddStaff = () => {
    if (!staffData.fullName || !staffData.email || !staffData.position) {
      toast("Please fill in all required fields");
      return;
    }
    
    toast("Staff member added successfully!");
    
    // Reset form
    setStaffData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      startDate: '',
      address: '',
      qualifications: '',
      experience: ''
    });
  };

  const departments = [
    "Web Development",
    "AI Development", 
    "Robotics",
    "Cybersecurity",
    "Networking",
    "Blockchain"
  ];

  const positions = [
    "Senior Developer",
    "Junior Developer",
    "Team Lead",
    "Project Manager",
    "Research Scientist",
    "Data Analyst",
    "UI/UX Designer",
    "DevOps Engineer"
  ];

  return (
    <DashboardLayout title="Add New Staff">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-blue-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Add New Staff Member</h2>
                <p className="text-blue-300">Add new team members to your department</p>
              </div>
              <UserPlus className="w-16 h-16 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Add Staff Form */}
        <Card className="bg-white/10 border-gray-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Staff Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                <Input
                  id="fullName"
                  value={staffData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={staffData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-400 pl-10"
                    placeholder="Enter email address"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    value={staffData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-400 pl-10"
                    placeholder="Enter phone number"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-white">Address</Label>
                <div className="relative">
                  <Input
                    id="address"
                    value={staffData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-400 pl-10"
                    placeholder="Enter address"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="position" className="text-white">Position *</Label>
                <select
                  id="position"
                  value={staffData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white"
                >
                  <option value="">Select Position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos} className="bg-gray-800">
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="department" className="text-white">Department</Label>
                <select
                  id="department"
                  value={staffData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-gray-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="salary" className="text-white">Annual Salary</Label>
                <div className="relative">
                  <Input
                    id="salary"
                    type="number"
                    value={staffData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-gray-400 pl-10"
                    placeholder="Enter annual salary"
                  />
                  <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <Label htmlFor="startDate" className="text-white">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={staffData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="qualifications" className="text-white">Qualifications</Label>
                <Textarea
                  id="qualifications"
                  value={staffData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                  placeholder="Enter qualifications and certifications"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="experience" className="text-white">Work Experience</Label>
                <Textarea
                  id="experience"
                  value={staffData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-400"
                  placeholder="Enter previous work experience"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStaff}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHODAddStaff;