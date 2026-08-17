import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Video, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const upcomingEvents = [
  { title: "AI/ML Community Meetup", date: "Apr 15, 2026", time: "6:00 PM UTC", type: "Virtual", attendees: 320, description: "Monthly meetup discussing latest AI trends, model architectures, and real-world deployments.", topics: ["LLM Fine-tuning", "RAG Pipelines", "Edge AI"], speaker: "Dr. Sarah Chen" },
  { title: "Open Source Sprint", date: "Apr 22-23, 2026", time: "All Day", type: "Hybrid", attendees: 150, description: "48-hour open source contribution marathon. Fix bugs, add features, improve docs.", topics: ["Bug Fixes", "New Features", "Documentation"], speaker: "Core Team" },
  { title: "Tech Talk: WebAssembly", date: "May 5, 2026", time: "7:00 PM UTC", type: "Virtual", attendees: 200, description: "Deep dive into WebAssembly, its ecosystem, and how it's changing the web platform.", topics: ["WASM Runtime", "Browser APIs", "Performance"], speaker: "Alex Kumar" },
  { title: "Robotics Workshop", date: "May 15, 2026", time: "10:00 AM EST", type: "In-Person", attendees: 80, description: "Hands-on workshop building autonomous robots with ROS2 and our Robotics SDK.", topics: ["ROS2", "Sensor Fusion", "Path Planning"], speaker: "James Wilson" },
  { title: "Blockchain Hackathon", date: "Jun 1-3, 2026", time: "All Day", type: "Hybrid", attendees: 250, description: "Build decentralized applications using our blockchain framework. Prizes for top 3 teams.", topics: ["Smart Contracts", "DeFi", "NFTs"], speaker: "Multiple Judges" },
  { title: "DevOps Deep Dive", date: "Jun 10, 2026", time: "5:00 PM UTC", type: "Virtual", attendees: 180, description: "Learn advanced CI/CD patterns, Kubernetes orchestration, and monitoring strategies.", topics: ["K8s", "CI/CD", "Observability"], speaker: "Omar Hassan" },
];

const pastEvents = [
  { title: "Annual Developer Conference", date: "Mar 1-3, 2026", attendees: 1200, recordings: 24, description: "Three days of talks, workshops, and networking." },
  { title: "Security Summit", date: "Feb 15, 2026", attendees: 340, recordings: 8, description: "Best practices for secure application development." },
  { title: "Community AMA", date: "Jan 20, 2026", attendees: 520, recordings: 1, description: "Ask Me Anything with the founding team." },
];

const typeIcon: Record<string, any> = { "Virtual": Video, "Hybrid": Globe, "In-Person": MapPin };

const CommunityEvents = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-24 sm:py-32 px-4">
         
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Calendar className="w-3 h-3 mr-1" /> Events
              </Badge>
              <h1 className="text-white mb-6">Community Events</h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Join workshops, meetups, hackathons, and tech talks with developers worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-white mb-8">Upcoming Events</h2>
            <div className="space-y-5">
              {upcomingEvents.map((event, i) => {
                const TypeIcon = typeIcon[event.type] || Globe;
                return (
                  <motion.div key={event.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-white/[0.08] border-white/[0.1] text-white/70 text-xs gap-1">
                                <TypeIcon className="w-3 h-3" /> {event.type}
                              </Badge>
                              <span className="text-xs text-white/40 flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees} attending</span>
                            </div>
                            <h3 className="text-white mb-1">{event.title}</h3>
                            <p className="text-sm text-white/50 mb-3">{event.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {event.topics.map(t => (
                                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/40 border border-white/[0.06]">{t}</span>
                              ))}
                            </div>
                            <p className="text-xs text-white/30">Speaker: {event.speaker}</p>
                          </div>
                          <div className="lg:text-right shrink-0 space-y-2">
                            <p className="text-sm text-white/70 flex items-center gap-1 lg:justify-end"><Calendar className="w-3 h-3" /> {event.date}</p>
                            <p className="text-xs text-white/40 flex items-center gap-1 lg:justify-end"><Clock className="w-3 h-3" /> {event.time}</p>
                            <Link to={`/community/events/${event.title.toLowerCase().replace(/ /g, "-")}/register`}>
                              <Button size="sm" className="mt-2 gap-1 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                                Register <ArrowRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-white mb-8">Past Events</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {pastEvents.map((event, i) => (
                <motion.div key={event.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                    <CardContent className="p-5">
                      <h3 className="text-white mb-2">{event.title}</h3>
                      <p className="text-xs text-white/40 mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-white/30">
                        <span>{event.date}</span>
                        <span>{event.attendees} attended</span>
                        <span>{event.recordings} recordings</span>
                      </div>
                      <Link to={`/community/events/past/${event.title.toLowerCase().replace(/ /g, "-")}`}>
                        <Button variant="outline" size="sm" className="mt-4 gap-1 text-xs border-white/[0.1] text-white/50 hover:bg-white/[0.06]">
                          <Video className="w-3 h-3" /> Watch Recordings
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8">
              <h2 className="text-white mb-3">Host an Event</h2>
              <p className="text-white/50 mb-6">Want to host a meetup, workshop, or talk? We provide support, promotion, and infrastructure.</p>
              <div className="flex gap-4 justify-center">
                <Link to="/community">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    Back to Community
                  </Button>
                </Link>
                <Link to="/community/events/host">
                  <Button variant="outline" className="gap-1 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                    Apply to Host <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CommunityEvents;
