import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, MapPin, Clock, FileCheck, Send, ArrowRight, Flame, Zap } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hackathon = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: "climate-hack-2024",
      title: "Climate Hack",
      date: "June 8-10, 2024",
      location: "Online",
      duration: "48 hours",
      maxTeamSize: 4,
      prize: "$25,000",
      themes: ["Climate", "IoT", "Energy"],
      description: "Tech that fights climate change and reduces emissions.",
      spotsLeft: 88,
      gradient: "from-cyan-500/20 to-blue-500/20",
      accent: "text-cyan-400"
    },
    {
      id: "ai-innovation-2024",
      title: "AI Innovation Hackathon",
      date: "March 15-17, 2024",
      location: "San Francisco, CA",
      duration: "48 hours",
      maxTeamSize: 4,
      prize: "$50,000",
      themes: ["AI/ML", "Healthcare", "Sustainability"],
      description: "Build AI solutions addressing real-world challenges in healthcare and climate change.",
      spotsLeft: 45,
      gradient: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-400"
    },
    {
      id: "blockchain-buildout-2024",
      title: "Blockchain BuildOut",
      date: "April 22-24, 2024",
      location: "Austin, TX",
      duration: "54 hours",
      maxTeamSize: 5,
      prize: "$30,000",
      themes: ["DeFi", "NFTs", "Web3"],
      description: "Create the next generation of decentralized applications and blockchain solutions.",
      spotsLeft: 67,
      gradient: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400"
    },
    {
      id: "quantum-challenge-2024",
      title: "Quantum Computing Challenge",
      date: "May 10-12, 2024",
      location: "Boston, MA",
      duration: "48 hours",
      maxTeamSize: 3,
      prize: "$75,000",
      themes: ["Quantum Algorithms", "Hardware", "Applications"],
      description: "Push the boundaries of quantum computing with practical applications.",
      spotsLeft: 23,
      gradient: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-400"
    },
  ];

  const stats = [
    { value: "50+", label: "Hackathons Hosted", icon: Flame },
    { value: "10k+", label: "Participants", icon: Users },
    { value: "$2M+", label: "Prize Money", icon: Trophy },
    { value: "500+", label: "Projects Built", icon: Zap },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute top-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500/10 rounded-full blur-[120px]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 bg-white/5 text-purple-300 border-white/10 px-5 py-2 backdrop-blur-xl">
                <Flame className="w-4 h-4 mr-2" />
                Hackathon Hub
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Code. Compete.
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Create.
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                Join global hackathons and build innovative solutions with fellow developers. Win big.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="lg" className="px-8" onClick={() => navigate('/careers/hackathon/apply')}>
                  <Send className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
                <Button variant="outline" size="lg" className="px-8" onClick={() => navigate('/careers/hackathon/verify')}>
                  <FileCheck className="w-5 h-5 mr-2" />
                  Check Status
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-5 h-5 text-gray-500 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Upcoming Hackathons</h2>
              <p className="text-gray-400">Register now — spots are limited</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`bg-gradient-to-br ${event.gradient} backdrop-blur-2xl border border-white/[0.08] rounded-2xl hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 h-full`}>
                    <CardContent className="p-5">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {event.themes.map((theme, idx) => (
                          <span key={idx} className="text-[10px] text-gray-400 bg-white/10 border border-white/5 px-2 py-0.5 rounded-full">
                            {theme}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-xs text-gray-400 mb-4">{event.description}</p>

                      <div className="space-y-2.5 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2.5 text-gray-600" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin className="w-4 h-4 mr-2.5 text-gray-600" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Clock className="w-4 h-4 mr-2.5 text-gray-600" />
                          {event.duration}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400">
                            <Trophy className={`w-4 h-4 mr-2.5 ${event.accent}`} />
                            <span className={`font-semibold ${event.accent}`}>{event.prize}</span>
                          </div>
                          <span className="text-xs text-gray-500">{event.spotsLeft} spots left</span>
                        </div>
                      </div>
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
};

export default Hackathon;
