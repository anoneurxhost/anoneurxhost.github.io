import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Video, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const events = [
  { id: "ai-ml-meetup", title: "AI/ML Community Meetup", date: "Apr 15, 2026", time: "6:00 PM UTC", type: "Virtual", attendees: 320, description: "Monthly meetup discussing latest AI trends, model architectures, and real-world deployments.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop", location: "Zoom" },
  { id: "open-source-sprint", title: "Open Source Sprint", date: "Apr 22-23, 2026", time: "All Day", type: "Hybrid", attendees: 150, description: "48-hour open source contribution marathon. Fix bugs, add features, improve docs.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop", location: "San Francisco + Online" },
  { id: "webassembly-talk", title: "Tech Talk: WebAssembly", date: "May 5, 2026", time: "7:00 PM UTC", type: "Virtual", attendees: 200, description: "Deep dive into WebAssembly, its ecosystem, and how it's changing the web platform.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop", location: "YouTube Live" },
  { id: "robotics-workshop", title: "Robotics Workshop", date: "May 15, 2026", time: "10:00 AM EST", type: "In-Person", attendees: 80, description: "Hands-on workshop building autonomous robots with ROS2 and our Robotics SDK.", image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&h=300&fit=crop", location: "MIT Media Lab, Boston" },
  { id: "blockchain-hackathon", title: "Blockchain Hackathon", date: "Jun 1-3, 2026", time: "All Day", type: "Hybrid", attendees: 250, description: "Build decentralized applications using our blockchain framework. Prizes for top 3 teams.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop", location: "Berlin + Online" },
  { id: "devops-deep-dive", title: "DevOps Deep Dive", date: "Jun 10, 2026", time: "5:00 PM UTC", type: "Virtual", attendees: 180, description: "Learn advanced CI/CD patterns, Kubernetes orchestration, and monitoring strategies.", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=300&fit=crop", location: "Discord" },
];

const typeIcon: Record<string, any> = { "Virtual": Video, "Hybrid": Globe, "In-Person": MapPin };
const typeColor: Record<string, string> = { "Virtual": "bg-blue-500/15 text-blue-300 border-blue-500/20", "Hybrid": "bg-purple-500/15 text-purple-300 border-purple-500/20", "In-Person": "bg-green-500/15 text-green-300 border-green-500/20" };

const UpcomingEvents = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" /> Upcoming
            </Badge>
            <h1 className="text-foreground mb-4">Upcoming Events</h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join workshops, meetups, hackathons, and tech talks with developers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => {
              const TypeIcon = typeIcon[event.type] || Globe;
              return (
                <motion.div key={event.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className={`absolute top-3 right-3 ${typeColor[event.type]} text-[11px] gap-1`}>
                        <TypeIcon className="w-3 h-3" /> {event.type}
                      </Badge>
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h3 className="text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {event.date}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {event.time}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {event.location}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {event.attendees} attending</p>
                      </div>
                      <Link to={`/community/events/${event.id}`}>
                        <Button className="w-full gap-2">
                          View Details <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8">
            <h2 className="text-foreground mb-3">Want to Host an Event?</h2>
            <p className="text-muted-foreground mb-6">We provide support, promotion, and infrastructure for community events.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/community/events/host"><Button className="gap-2">Apply to Host <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link to="/community/events/past"><Button variant="outline" className="gap-2 border-white/[0.1] text-muted-foreground">View Past Events</Button></Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default UpcomingEvents;
