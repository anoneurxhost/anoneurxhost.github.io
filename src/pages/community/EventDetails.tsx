import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ArrowLeft, ArrowRight, Star, Zap } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const eventData: Record<string, any> = {
  "ai-ml-meetup": {
    title: "AI/ML Community Meetup", date: "Apr 15, 2026", time: "6:00 PM UTC", location: "Zoom",
    description: "Join us for our monthly AI/ML meetup where we discuss the latest trends in artificial intelligence, share project updates, and explore cutting-edge research papers together.",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop",
    ],
    schedule: [
      { time: "6:00 PM", title: "Welcome & Introductions", speaker: "Moderator" },
      { time: "6:15 PM", title: "Keynote: LLM Fine-tuning Best Practices", speaker: "Dr. Sarah Chen" },
      { time: "7:00 PM", title: "Lightning Talks: Community Projects", speaker: "Various" },
      { time: "7:30 PM", title: "Q&A and Networking", speaker: "All" },
    ],
    speakers: [
      { name: "Dr. Sarah Chen", role: "AI Research Lead", avatar: "SC" },
      { name: "Alex Kumar", role: "ML Engineer", avatar: "AK" },
      { name: "Yuki Tanaka", role: "Data Scientist", avatar: "YT" },
    ],
    highlights: ["Live coding demos", "Research paper discussions", "Networking breakout rooms", "Community project showcases"],
    attendees: 320,
  },
};

const fallbackEvent = {
  title: "Community Event", date: "TBD", time: "TBD", location: "TBD",
  description: "Details for this event are coming soon. Check back later for the full event information.",
  images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"],
  schedule: [], speakers: [], highlights: [], attendees: 0,
};

const EventDetails = () => {
  const { eventId } = useParams();
  const event = eventData[eventId || ""] || fallbackEvent;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-20 sm:py-28 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover opacity-20" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <Link to="/community/events/upcoming" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <h1 className="text-foreground mb-4">{event.title}</h1>
              <p className="text-base text-muted-foreground max-w-2xl mb-6">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.time}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {event.attendees} attending</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Gallery */}
        {event.images.length > 1 && (
          <section className="py-8 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="grid grid-cols-3 gap-3">
                {event.images.map((img: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video">
                    <img src={img} alt={`Event ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Schedule */}
        {event.schedule.length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-foreground mb-6">Schedule</h2>
              <div className="space-y-3">
                {event.schedule.map((item: any, i: number) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                    <Card className="bg-white/[0.03] border-white/[0.08]">
                      <CardContent className="p-5 flex items-center gap-4">
                        <Badge className="bg-white/[0.06] border-white/[0.1] text-muted-foreground text-xs shrink-0">{item.time}</Badge>
                        <div className="flex-1">
                          <p className="text-foreground font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.speaker}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Speakers */}
        {event.speakers.length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-foreground mb-6">Speakers</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {event.speakers.map((speaker: any, i: number) => (
                  <Card key={i} className="bg-white/[0.03] border-white/[0.08] text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-muted-foreground text-lg font-semibold mx-auto mb-3">
                        {speaker.avatar}
                      </div>
                      <h4 className="text-foreground">{speaker.name}</h4>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Highlights */}
        {event.highlights.length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-foreground mb-6">Event Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {event.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <Zap className="w-4 h-4 text-amber-400/60 shrink-0" />
                    <span className="text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Register CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Card className="bg-white/[0.03] border-white/[0.08] p-8">
              <Star className="w-8 h-8 text-amber-400/60 mx-auto mb-4" />
              <h2 className="text-foreground mb-3">Ready to Join?</h2>
              <p className="text-muted-foreground mb-6">Secure your spot now. Limited seats available.</p>
              <Link to={`/community/events/${eventId}/register`}>
                <Button size="lg" className="gap-2 text-base px-8">
                  Register Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default EventDetails;
