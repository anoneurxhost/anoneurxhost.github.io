import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Clock, Calendar, Activity } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const pastEventData: Record<string, any> = {
  "annual-dev-conf": {
    title: "Annual Developer Conference", date: "Mar 1-3, 2026",
    description: "Our flagship conference brought together 1,200+ developers, researchers, and tech leaders for three days of learning, sharing, and networking. Topics ranged from AI/ML breakthroughs to DevOps best practices.",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
    ],
    summary: "The conference featured 24 sessions across 3 tracks, 8 hands-on workshops, and a 24-hour hackathon. Attendees came from 35 countries.",
    stats: [
      { label: "Attendees", value: "1,200+", icon: Users },
      { label: "Duration", value: "3 Days", icon: Clock },
      { label: "Sessions", value: "24", icon: Calendar },
      { label: "Activities", value: "32", icon: Activity },
    ],
  },
};

const fallback = {
  title: "Past Event", date: "TBD",
  description: "Details for this past event are being compiled.",
  images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"],
  summary: "Event summary coming soon.", stats: [],
};

const PastEventDetails = () => {
  const { eventId } = useParams();
  const event = pastEventData[eventId || ""] || fallback;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-20 sm:py-28 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover opacity-15" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <Link to="/community/events/past" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Past Events
            </Link>
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="text-foreground mb-4">{event.title}</h1>
              <p className="text-base text-muted-foreground max-w-2xl">{event.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-3 gap-3">
              {event.images.map((img: string, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-video">
                  <img src={img} alt={`Event ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-foreground mb-4">Event Summary</h2>
            <p className="text-muted-foreground">{event.summary}</p>
          </div>
        </section>

        {/* Stats */}
        {event.stats.length > 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {event.stats.map((stat: any, i: number) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                    <Card className="bg-white/[0.03] border-white/[0.08] text-center">
                      <CardContent className="p-6">
                        <stat.icon className="w-6 h-6 text-muted-foreground mx-auto mb-3" />
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Link to="/community/events/upcoming">
              <Button className="gap-2">View Upcoming Events</Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PastEventDetails;
