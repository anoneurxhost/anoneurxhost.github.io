import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Rocket, ArrowRight, Code, Zap, Heart, Sparkles, GraduationCap, Globe, Search } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const CareerHub = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const opportunities = [
    { title: "Internships", description: "Gain hands-on experience working on cutting-edge technology projects with expert mentors.", icon: GraduationCap, path: "/internships", color: "from-blue-500/20 to-cyan-500/20", iconColor: "text-blue-400", features: ["6-month programs", "Mentorship", "Real projects", "Certification"], spots: "20+ open" },
    { title: "Hackathon", description: "Compete in our global hackathons and win prizes while solving real-world challenges.", icon: Trophy, path: "/careers/hackathon", color: "from-purple-500/20 to-pink-500/20", iconColor: "text-purple-400", features: ["48-hour challenge", "$50K prizes", "Expert judges", "Team building"], spots: "3 events" },
    { title: "Join Dev Team", description: "Become a permanent member of our elite development team building revolutionary products.", icon: Code, path: "/careers/join-dev-team", color: "from-emerald-500/20 to-teal-500/20", iconColor: "text-emerald-400", features: ["Full-time roles", "Competitive salary", "Remote work", "Growth path"], spots: "14 roles" },
    { title: "Other Opportunities", description: "Explore fellowships, research grants, partnerships, incubation programs, and more.", icon: Rocket, path: "/careers/other-opportunities", color: "from-orange-500/20 to-amber-500/20", iconColor: "text-orange-400", features: ["Fellowships", "Research grants", "Partnerships", "Incubation"], spots: "5 programs" },
  ];

  const filteredOpportunities = opportunities.filter(o =>
    o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { value: "500+", label: "Team Members", icon: Users },
    { value: "40+", label: "Countries", icon: Globe },
    { value: "95%", label: "Satisfaction", icon: Heart },
    { value: "200+", label: "Projects Shipped", icon: Zap },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-transparent">
        <div className="container-responsive text-white">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Hero */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center space-y-6">
              <Badge className="bg-white/[0.06] border-white/[0.1] text-white/80 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" /> Careers
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Build Your <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">Career With Us</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Join a team of visionaries creating technology that shapes the future. Explore opportunities and start your journey with us.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] text-center">
                    <CardContent className="p-6 space-y-2">
                      <stat.icon className="w-6 h-6 text-primary mx-auto" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Search opportunities..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm" />
              </div>
            </div>

            {/* Opportunities */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredOpportunities.map((opp, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                    <Link to={opp.path} className="block h-full">
                      <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] rounded-2xl group hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 h-full cursor-pointer">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opp.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                            <opp.icon className={`w-6 h-6 ${opp.iconColor}`} />
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">{opp.title}</h3>
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{opp.spots}</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-5 leading-relaxed flex-1">{opp.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {opp.features.map((f, j) => (
                              <span key={j} className="text-[11px] text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">{f}</span>
                            ))}
                          </div>
                          <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Why Join */}
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-semibold">Why Build Your Career Here?</h2>
                  <p className="text-gray-400">More than just a job — a platform for innovation, growth, and global impact.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Rocket, title: "Innovation First", desc: "Work on AI, robotics, space tech pushing the boundaries of what's possible." },
                    { icon: Users, title: "Expert Mentorship", desc: "Learn from industry leaders passionate about sharing knowledge." },
                    { icon: Trophy, title: "Global Impact", desc: "Your work reaches millions and solves humanity's greatest challenges."},
                  ].map((item, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                      <Card className={`bg-black/40 backdrop-blur-2xl border-white/[0.08] rounded-2xl hover:border-white/20 transition-all`}>
                        <CardContent className="p-8 text-center">
                          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <item.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CareerHub;

