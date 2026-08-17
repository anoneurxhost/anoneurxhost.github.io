import React, { useState } from "react";
import PageTransition from "@/components/PageTransition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, MapPin, Clock } from "lucide-react";
import { UnifiedApplyForm } from "@/components/forms/UnifiedApplyForm";

const HackathonEnroll = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const upcomingEvents = [
    {
      id: "ai-innovation-2024",
      title: "AI Innovation Hackathon 2024",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      duration: "48 hours",
      maxTeamSize: 4,
      prize: "$50,000",
      themes: ["AI/ML", "Healthcare", "Sustainability"],
      description:
        "Build AI solutions that address real-world challenges in healthcare, climate change, and social impact.",
      registrationDeadline: "March 10, 2024",
      spotsLeft: 45,
    },
    {
      id: "blockchain-buildout-2024",
      title: "Blockchain BuildOut 2024",
      date: "April 22-24, 2024",
      location: "Austin, TX",
      duration: "54 hours",
      maxTeamSize: 5,
      prize: "$30,000",
      themes: ["DeFi", "NFTs", "Web3"],
      description:
        "Create the next generation of decentralized applications and blockchain solutions.",
      registrationDeadline: "April 18, 2024",
      spotsLeft: 67,
    },
    {
      id: "quantum-challenge-2024",
      title: "Quantum Computing Challenge 2024",
      date: "May 10-12, 2024",
      location: "Boston, MA",
      duration: "48 hours",
      maxTeamSize: 3,
      prize: "$75,000",
      themes: ["Quantum Algorithms", "Hardware", "Applications"],
      description:
        "Push the boundaries of quantum computing with practical applications and algorithms.",
      registrationDeadline: "May 5, 2024",
      spotsLeft: 23,
    },
  ];

  const selectedEventData = upcomingEvents.find(
    (event) => event.id === selectedEvent
  );

  return (
    <PageTransition>
      <div className="universal-page-bg">
        <div className="universal-content main-h-full">
          {/* Header Section */}
          <section className="relative py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                  Enroll in Hackathon
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Register for upcoming hackathons and start building amazing
                  projects with fellow innovators
                </p>
              </div>
            </div>
          </section>

          <section className="py-8 px-4">
            <div className="container mx-auto max-w-6xl">
              {/* Event Selection */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Select Hackathon Event
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Choose the hackathon you want to participate in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedEvent === event.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-white/20 bg-white/5 hover:bg-white/10"
                        }`}
                        onClick={() => setSelectedEvent(event.id)}
                      >
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.themes.map((theme, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-300 text-xs"
                            >
                              {theme}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-white font-semibold mb-2">
                          {event.title}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.duration}
                          </div>
                          <div className="flex items-center">
                            <Trophy className="w-4 h-4 mr-2" />
                            {event.prize} prize
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.spotsLeft} spots left
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs mt-3">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Registration Button */}
              {selectedEvent && (
                <div className="text-center mb-8">
                  <Button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  >
                    Register for {selectedEventData?.title}
                  </Button>
                </div>
              )}

              <Dialog
                open={showRegistrationForm}
                onOpenChange={setShowRegistrationForm}
              >
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-xl border border-gray-700/50">
                  <UnifiedApplyForm
                    formType="hackathon"
                    targetId={selectedEventData?.id}
                    targetTitle={selectedEventData?.title}
                    onSuccess={() => {
                      setShowRegistrationForm(false);
                      setSelectedEvent("");
                    }}
                    onCancel={() => setShowRegistrationForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default HackathonEnroll;
