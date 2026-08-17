
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Plus, Clock, Users, MapPin, Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: number;
  location: string;
  type: string;
  description?: string;
}

const DashboardCalendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      date: "2024-01-15",
      time: "10:00 AM",
      attendees: 8,
      location: "Conference Room A",
      type: "meeting",
      description: "Weekly team sync"
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "2024-01-20",
      time: "11:59 PM",
      attendees: 0,
      location: "Remote",
      type: "deadline",
      description: "AI Development project milestone"
    },
    {
      id: 3,
      title: "Client Presentation",
      date: "2024-01-25",
      time: "2:00 PM",
      attendees: 5,
      location: "Client Office",
      type: "presentation",
      description: "Quarterly business review"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    attendees: "",
    location: "",
    type: "meeting",
    description: ""
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast("Please fill in all required fields");
      return;
    }

    const event: Event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      attendees: parseInt(newEvent.attendees) || 0,
      location: newEvent.location,
      type: newEvent.type,
      description: newEvent.description
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      attendees: "",
      location: "",
      type: "meeting",
      description: ""
    });
    setIsAddDialogOpen(false);
    toast("Event added successfully!");
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast("Event deleted successfully!");
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-500/20 border-blue-500";
      case "deadline": return "bg-red-500/20 border-red-500";
      case "presentation": return "bg-green-500/20 border-green-500";
      case "interview": return "bg-purple-500/20 border-purple-500";
      default: return "bg-gray-500/20 border-gray-500";
    }
  };

  return (
    <>
      <DashboardLayout title="Calendar & Events">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-white">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="attendees" className="text-white">Attendees</Label>
                      <Input
                        id="attendees"
                        type="number"
                        value={newEvent.attendees}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Number of attendees"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">Event Type</Label>
                    <select
                      id="type"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="deadline">Deadline</option>
                      <option value="presentation">Presentation</option>
                      <option value="interview">Interview</option>
                      <option value="training">Training</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Input
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Event description"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent} className="bg-blue-600 hover:bg-blue-700">
                      Add Event
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id} className={`border-2 ${getEventColor(event.type)} bg-gray-800/50 backdrop-blur-sm`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-white">
                        {event.date}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.attendees > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="text-sm text-white mt-2">{event.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardCalendar;
