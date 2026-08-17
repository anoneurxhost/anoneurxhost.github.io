import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Send, Code, Laptop, Server, Smartphone, Palette, Cloud, ArrowRight, Users, Zap } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JoinDevTeam = () => {
  const navigate = useNavigate();

  const openPositions = [
    { title: "Frontend Developer", icon: Laptop, skills: ["React", "TypeScript", "Tailwind"], spots: 3, level: "Mid-Senior" },
    { title: "Backend Developer", icon: Server, skills: ["Node.js", "MongoDB", "APIs"], spots: 2, level: "Senior" },
    { title: "Full-Stack Developer", icon: Code, skills: ["React", "Node.js", "PostgreSQL"], spots: 4, level: "Mid-Senior" },
    { title: "Mobile Developer", icon: Smartphone, skills: ["React Native", "iOS", "Android"], spots: 2, level: "Mid" },
    { title: "UI/UX Designer", icon: Palette, skills: ["Figma", "Adobe XD", "Design Systems"], spots: 1, level: "Senior" },
    { title: "DevOps Engineer", icon: Cloud, skills: ["Docker", "AWS", "CI/CD"], spots: 2, level: "Senior" },
  ];

  const perks = [
    { emoji: "💰", title: "Competitive Salary", desc: "Industry-leading compensation" },
    { emoji: "🌍", title: "Remote Work", desc: "Work from anywhere" },
    { emoji: "📚", title: "Learning Budget", desc: "$2K/year for growth" },
    { emoji: "🏥", title: "Health Benefits", desc: "Full coverage" },
    { emoji: "⏰", title: "Flexible Hours", desc: "Your schedule, your way" },
    { emoji: "🚀", title: "Latest Tech", desc: "Cutting-edge stack" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <Badge className="mb-6 bg-white/5 text-emerald-300 border-white/10 px-5 py-2 backdrop-blur-xl">
                <Code className="w-4 h-4 mr-2" />
                We're Hiring
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Join Our
                <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Dev Team
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                Build the future of technology with a team of passionate developers. 14 open positions across 6 roles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="lg" className="px-8" onClick={() => navigate('/careers/join-dev-team/apply')}>
                  <Send className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline" size="lg" className="px-8" onClick={() => navigate('/careers/join-dev-team/verify')}>
                  <FileCheck className="w-5 h-5 mr-2" />
                  Check Status
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Open Positions</h2>
              <p className="text-gray-400">Find your perfect role</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {openPositions.map((pos, i) => {
                const Icon = pos.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group cursor-pointer" onClick={() => navigate('/careers/join-dev-team/apply')}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-11 h-11 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                            <Icon className="w-5 h-5 text-emerald-400" />
                          </div>
                          <span className="text-[10px] bg-white/5 text-gray-500 border border-white/5 px-2.5 py-1 rounded-full">{pos.level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3">{pos.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {pos.skills.map((skill, idx) => (
                            <span key={idx} className="text-[11px] text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{pos.spots} position{pos.spots > 1 ? 's' : ''}</span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why Join Us?</h2>
              <p className="text-gray-400">Benefits that make a difference</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {perks.map((perk, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] transition-all duration-300">
                    <CardContent className="p-5">
                      <span className="text-2xl mb-3 block">{perk.emoji}</span>
                      <h3 className="text-sm font-bold text-white mb-1">{perk.title}</h3>
                      <p className="text-xs text-gray-500">{perk.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Our Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes", "GraphQL", "Next.js", "Tailwind CSS", "Redis"].map((tech, i) => (
                <span key={i} className="text-sm text-gray-400 bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl px-4 py-2 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default JoinDevTeam;
