import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, DollarSign, Users, Rocket, Globe, FileCheck, Send, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OtherOpportunities = () => {
  const navigate = useNavigate();

  const opportunities = [
    { title: "Fellowships", description: "Explore tech fellowships and advanced research positions with leading institutions.", icon: GraduationCap, path: "/opportunities/fellowships", gradient: "from-blue-500/20 to-cyan-500/20", accent: "text-blue-400" },
    { title: "Research Grants", description: "Access funding programs and grants for innovative research and development.", icon: DollarSign, path: "/opportunities/research-grants", gradient: "from-emerald-500/20 to-teal-500/20", accent: "text-emerald-400" },
    { title: "Tech Partnerships", description: "Collaborate with industry leaders on transformative technology projects.", icon: Users, path: "/opportunities/tech-partnerships", gradient: "from-purple-500/20 to-pink-500/20", accent: "text-purple-400" },
    { title: "Startup Incubation", description: "Launch your startup with our incubation program, mentorship, and resources.", icon: Rocket, path: "/opportunities/startup-incubation", gradient: "from-orange-500/20 to-amber-500/20", accent: "text-orange-400" },
    { title: "Global Exchange", description: "International exchanges and global networking.", icon: Globe, path: "/opportunities/global-exchange", gradient: "from-pink-500/20 to-rose-500/20", accent: "text-pink-400" },
    { title: "Open Innovation", description: "Submit ideas that don't fit any track and let us match you.", icon: Sparkles, path: "/opportunities/apply?type=other_opportunity", gradient: "from-yellow-500/20 to-amber-500/20", accent: "text-yellow-400" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute top-20 left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <Badge className="mb-6 bg-white/5 text-orange-300 border-white/10 px-5 py-2 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Opportunities
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Beyond the
                <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Ordinary
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                Discover fellowships, grants, partnerships, incubation programs, and global exchanges.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="lg" className="px-8" onClick={() => navigate('/careers/other-opportunities/verify')}>
                  <FileCheck className="w-5 h-5 mr-2" />
                  Check Status
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Opportunities Grid */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">All Opportunities</h2>
              <p className="text-gray-400">Choose your path to growth</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {opportunities.map((opp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={opp.path} className="block h-full">
                    <Card className={`bg-gradient-to-br ${opp.gradient} backdrop-blur-2xl border border-white/[0.08] rounded-2xl hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 h-full group cursor-pointer`}>
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4`}>
                          <opp.icon className={`w-5 h-5 ${opp.accent}`} />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors">{opp.title}</h3>
                        <p className="text-xs text-gray-400 mb-5 leading-relaxed flex-1">{opp.description}</p>
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
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default OtherOpportunities;
