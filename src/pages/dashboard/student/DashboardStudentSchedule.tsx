
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, Users, BookOpen, AlertCircle } from "lucide-react";

const DashboardStudentSchedule = () => {
  const todaySchedule = [
    {
      id: 1,
      title: "AI Development Workshop",
      type: "workshop",
      time: "09:00 - 11:00",
      location: "Lab 101",
      instructor: "Dr. Sarah Chen",
      status: "upcoming",
      attendees: 15
    },
    {
      id: 2,
      title: "Research Paper Review",
      type: "meeting",
      time: "14:00 - 15:00",
      location: "Virtual",
      instructor: "Prof. Michael Rodriguez",
      status: "upcoming",
      attendees: 8
    },
    {
      id: 3,
      title: "Web Development Class",
      type: "class",
      time: "16:00 - 17:30",
      location: "Room 205",
      instructor: "Emily Watson",
      status: "completed",
      attendees: 25
    }
  ];

  const weeklySchedule = {
    Monday: [
      { title: "AI Fundamentals", time: "09:00-10:30", type: "lecture" },
      { title: "Research Methods", time: "14:00-15:30", type: "seminar" }
    ],
    Tuesday: [
      { title: "Web Development", time: "10:00-11:30", type: "workshop" },
      { title: "Team Meeting", time: "16:00-17:00", type: "meeting" }
    ],
    Wednesday: [
      { title: "Project Work", time: "09:00-12:00", type: "project" },
      { title: "Mentor Session", time: "15:00-16:00", type: "meeting" }
    ],
    Thursday: [
      { title: "Cybersecurity Basics", time: "11:00-12:30", type: "lecture" },
      { title: "Paper Presentation", time: "14:00-15:00", type: "presentation" }
    ],
    Friday: [
      { title: "Project Review", time: "10:00-11:00", type: "review" },
      { title: "Weekly Wrap-up", time: "16:00-17:00", type: "meeting" }
    ]
  };

  const upcomingDeadlines = [
    { title: "AI Research Paper", due: "2024-06-30", priority: "high", type: "assignment" },
    { title: "Web App Project", due: "2024-07-05", priority: "medium", type: "project" },
    { title: "Weekly Progress Report", due: "2024-06-28", priority: "low", type: "report" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture": return "bg-blue-600";
      case "workshop": return "bg-purple-600";
      case "meeting": return "bg-green-600";
      case "project": return "bg-orange-600";
      case "seminar": return "bg-indigo-600";
      case "presentation": return "bg-red-600";
      case "review": return "bg-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <DashboardLayout title="Schedule">
      <div className="space-y-6">
        {/* Today's Schedule */}
        <Card className="bg-white/10 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((item) => (
                <div key={item.id} className="p-4 rounded-lg bg-gray-800/50 border-l-4 border-blue-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                        {item.status === "completed" && (
                          <Badge className="bg-green-600">Completed</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.location === "Virtual" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{item.attendees} attendees</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-2">Instructor: {item.instructor}</p>
                    </div>
                    <div className="flex gap-2">
                      {item.location === "Virtual" && (
                        <Button size="sm" variant="outline">Join Meeting</Button>
                      )}
                      {item.status === "upcoming" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Schedule */}
          <Card className="bg-white/10 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(weeklySchedule).map(([day, events]) => (
                  <div key={day} className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">{day}</h4>
                    <div className="space-y-2 ml-4">
                      {events.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-800/30">
                          <div>
                            <p className="text-white text-sm">{event.title}</p>
                            <p className="text-gray-400 text-xs">{event.time}</p>
                          </div>
                          <Badge className={getTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold">{deadline.title}</h4>
                      <Badge className={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Due: {new Date(deadline.due).toLocaleDateString()}</span>
                      <Badge variant="outline" className="text-gray-300">
                        {deadline.type}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/40 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-16 flex-col space-y-2">
                <Calendar className="w-5 h-5" />
                <span>Add Event</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Clock className="w-5 h-5" />
                <span>Set Reminder</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <BookOpen className="w-5 h-5" />
                <span>Study Plan</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2">
                <Users className="w-5 h-5" />
                <span>Study Group</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStudentSchedule;
