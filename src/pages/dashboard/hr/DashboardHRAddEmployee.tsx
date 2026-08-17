
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  UserPlus, 
  Save, 
  Upload,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  FileText
} from "lucide-react";

const DashboardHRAddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
    startDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee data:", formData);
    // Handle form submission
  };

  return (
    <>
      <DashboardLayout title="HR Management - Add Employee">
        <div className="space-y-6">
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add New Employee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Job Information */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Job Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position" className="text-white">Position *</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="Enter job position"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-white">Department *</Label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                        required
                      >
                        <option value="">Select Department</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="hr">Human Resources</option>
                        <option value="finance">Finance</option>
                        <option value="operations">Operations</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="salary" className="text-white">Annual Salary *</Label>
                      <Input
                        id="salary"
                        name="salary"
                        type="number"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="Enter annual salary"
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate" className="text-white">Start Date *</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-white">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter full address"
                        className="bg-gray-800 border-gray-600 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact" className="text-white">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        placeholder="Enter emergency contact name"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone" className="text-white">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        placeholder="Enter emergency contact phone"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Additional Information
                  </h3>
                  <div>
                    <Label htmlFor="notes" className="text-white">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Enter any additional notes or comments"
                      className="bg-gray-800 border-gray-600 text-white"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Document Upload
                  </h3>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Upload employee documents</p>
                    <p className="text-gray-400 text-sm mb-4">Resume, ID copy, certifications, etc.</p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-600">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Add Employee
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardHRAddEmployee;
