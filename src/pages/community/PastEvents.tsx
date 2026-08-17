import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const pastEvents = [
  { id: "annual-dev-conf", title: "Annual Developer Conference", date: "Mar 1-3, 2026", attendees: 1200, summary: "Three days of talks, workshops, and networking with top developers and researchers.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop" },
  { id: "security-summit", title: "Security Summit", date: "Feb 15, 2026", attendees: 340, summary: "Best practices for secure application development, threat modeling, and incident response.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=300&fit=crop" },
  { id: "community-ama", title: "Community AMA", date: "Jan 20, 2026", attendees: 520, summary: "Ask Me Anything with the founding team covering roadmap, vision, and community growth.", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=300&fit=crop" },
  { id: "hackathon-2025", title: "Winter Hackathon 2025", date: "Dec 10-12, 2025", attendees: 380, summary: "72-hour hackathon with prizes for innovation, design, and social impact projects.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop" },
  { id: "ai-summit", title: "AI Innovation Summit", date: "Nov 5, 2025", attendees: 650, summary: "Exploring the frontier of artificial intelligence: from transformers to autonomous agents.", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=300&fit=crop" },
  { id: "open-source-day", title: "Open Source Day", date: "Oct 15, 2025", attendees: 280, summary: "A celebration of open source software with contribution sprints and project showcases.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=300&fit=crop" },
];

const PastEvents = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/community/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-foreground mb-4">Past Events</h1>
            <p className="text-base text-muted-foreground max-w-2xl">Explore recordings, summaries, and highlights from our previous events.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, i) => (
              <motion.div key={event.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <Card className="bg-white/[0.03] border-white/[0.08] overflow-hidden group h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <h3 className="text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{event.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees}</span>
                    </div>
                    <Link to={`/community/events/past/${event.id}`}>
                      <Button variant="outline" size="sm" className="w-full gap-2 border-white/[0.1] text-muted-foreground">
                        View Details <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default PastEvents;
