import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Plus, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const DashboardEmployeeLeave = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: ''
  });

  const leaveBalance = {
    vacation: { used: 8, total: 25, remaining: 17 },
    sick: { used: 3, total: 10, remaining: 7 },
    personal: { used: 2, total: 5, remaining: 3 }
  };

  const leaveHistory = [
    {
      id: 1,
      type: "Vacation",
      startDate: "2024-05-15",
      endDate: "2024-05-20",
      days: 5,
      status: "Approved",
      reason: "Family vacation"
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-04-10",
      endDate: "2024-04-12",
      days: 2,
      status: "Approved",
      reason: "Medical appointment"
    },
    {
      id: 3,
      type: "Personal",
      startDate: "2024-06-28",
      endDate: "2024-06-28",
      days: 1,
      status: "Pending",
      reason: "Personal matters"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-600";
      case "Pending": return "bg-yellow-600";
      case "Rejected": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-4 h-4" />;
      case "Pending": return <AlertCircle className="w-4 h-4" />;
      case "Rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleSubmitRequest = () => {
    if (!leaveRequest.type || !leaveRequest.startDate || !leaveRequest.endDate) {
      toast("Please fill in all required fields");
      return;
    }

    toast("Leave request submitted successfully!");
    setLeaveRequest({
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: ''
    });
    setIsRequestOpen(false);
  };

  return (
    <DashboardLayout title="Leave Management">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-white/10 border-green-600 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Leave Management</h2>
                <p className="text-green-300">Manage your leave requests and view balances</p>
              </div>
              <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Request Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Submit Leave Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Leave Type *</Label>
                      <select
                        value={leaveRequest.type}
                        onChange={(e) => setLeaveRequest(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="">Select Leave Type</option>
                        <option value="vacation">Vacation</option>
                        <option value="sick">Sick Leave</option>
                        <option value="personal">Personal Leave</option>
                        <option value="emergency">Emergency Leave</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Start Date *</Label>
                        <Input
                          type="date"
                          value={leaveRequest.startDate}
                          onChange={(e) => setLeaveRequest(prev => ({ ...prev, startDate: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">End Date *</Label>
                        <Input
                          type="date"
                          value={leaveRequest.endDate}
                          onChange={(e) => setLeaveRequest(prev => ({ ...prev, endDate: e.target.value }))}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Reason</Label>
                      <Textarea
                        value={leaveRequest.reason}
                        onChange={(e) => setLeaveRequest(prev => ({ ...prev, reason: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Enter reason for leave"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label className="text-white">Emergency Contact</Label>
                      <Input
                        value={leaveRequest.emergencyContact}
                        onChange={(e) => setLeaveRequest(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Emergency contact number"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsRequestOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitRequest} className="bg-green-600 hover:bg-green-700">
                        Submit Request
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Vacation Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Remaining</span>
                  <span className="text-white font-semibold">{leaveBalance.vacation.remaining} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Used</span>
                  <span className="text-gray-300">{leaveBalance.vacation.used}/{leaveBalance.vacation.total} days</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(leaveBalance.vacation.used / leaveBalance.vacation.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Sick Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Remaining</span>
                  <span className="text-white font-semibold">{leaveBalance.sick.remaining} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Used</span>
                  <span className="text-gray-300">{leaveBalance.sick.used}/{leaveBalance.sick.total} days</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full" 
                    style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-base text-white">Personal Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Remaining</span>
                  <span className="text-white font-semibold">{leaveBalance.personal.remaining} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Used</span>
                  <span className="text-gray-300">{leaveBalance.personal.used}/{leaveBalance.personal.total} days</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(leaveBalance.personal.used / leaveBalance.personal.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave History */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveHistory.map((leave) => (
                <Card key={leave.id} className="bg-white/5 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-400" />
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold text-white">{leave.type}</h3>
                          <p className="text-gray-300 text-sm">
                            {leave.startDate} to {leave.endDate} ({leave.days} days)
                          </p>
                          <p className="text-gray-400 text-xs mt-1">{leave.reason}</p>
                        </div>
                      </div>

                      <Badge className={`${getStatusColor(leave.status)} flex items-center space-x-1`}>
                        {getStatusIcon(leave.status)}
                        <span>{leave.status}</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardEmployeeLeave;