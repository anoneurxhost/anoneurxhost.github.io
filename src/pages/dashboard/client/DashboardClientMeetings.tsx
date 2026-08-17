
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, Plus } from "lucide-react";

const DashboardClientMeetings = () => {
  const meetings = [
    {
      id: 1,
      title: "Project Kickoff Meeting",
      date: "2024-02-20",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: ["John Doe", "Jane Smith", "You"],
      type: "Video Call",
      status: "Upcoming",
      link: "https://meet.example.com/abc-123"
    },
    {
      id: 2,
      title: "Weekly Progress Review",
      date: "2024-02-22",
      time: "2:00 PM",
      duration: "30 minutes",
      attendees: ["Mike Johnson", "You"],
      type: "Phone Call",
      status: "Upcoming",
      link: null
    },
    {
      id: 3,
      title: "Design Review Meeting",
      date: "2024-02-18",
      time: "3:00 PM",
      duration: "45 minutes",
      attendees: ["Sarah Wilson", "Design Team", "You"],
      type: "Video Call",
      status: "Completed",
      link: "https://meet.example.com/xyz-789"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-600';
      case 'Completed': return 'bg-green-600';
      case 'Cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <DashboardLayout title="Meetings & Schedule">
      <div className="space-y-6">
        {/* Header */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Meeting Schedule</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your meetings and appointments
                </CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-sm text-gray-400">Upcoming Meetings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">3.5</p>
                  <p className="text-sm text-gray-400">Hours This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">8</p>
                  <p className="text-sm text-gray-400">Total Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meetings List */}
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      {meeting.type === 'Video Call' ? (
                        <Video className="w-6 h-6 text-white" />
                      ) : (
                        <Users className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{meeting.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meeting.time} ({meeting.duration})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{meeting.attendees.length} attendees</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Attendees: {meeting.attendees.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                    {meeting.status === 'Upcoming' && meeting.link && (
                      <Button className="bg-green-600 hover:bg-green-700">
                        Join Meeting
                      </Button>
                    )}
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardClientMeetings;
