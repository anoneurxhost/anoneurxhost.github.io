import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Star, Award, Lightbulb, FileCheck, UserPlus, ArrowRight,
  Clock, BookOpen, Briefcase, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const Internships = () => {
  const departments = [
    { name: "AI & Machine Learning", spots: 5, icon: "🤖" },
    { name: "Web Development", spots: 4, icon: "🌐" },
    { name: "Mobile Development", spots: 3, icon: "📱" },
    { name: "Cybersecurity", spots: 2, icon: "🔒" },
    { name: "Blockchain", spots: 3, icon: "⛓️" },
    { name: "Robotics", spots: 2, icon: "🦾" },
  ];

  const benefits = [
    { icon: Award, title: "Industry Certificate", description: "Professional certificate upon successful completion" },
    { icon: Users, title: "Mentorship Program", description: "Work directly with senior engineers and researchers" },
    { icon: Lightbulb, title: "Innovation Projects", description: "Contribute to real-world cutting-edge projects" },
    { icon: Star, title: "Career Path", description: "High-performing interns may receive full-time offers" },
  ];

  const timeline = [
    { step: "01", title: "Apply", desc: "Submit your application with resume and portfolio" },
    { step: "02", title: "Review", desc: "Our team reviews your application within 5 days" },
    { step: "03", title: "Interview", desc: "Technical and cultural fit interview rounds" },
    { step: "04", title: "Onboard", desc: "Welcome aboard! Begin your internship journey" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute top-32 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-32 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[120px]" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 bg-white/5 text-emerald-300 border-white/10 px-5 py-2 backdrop-blur-xl">
                <Briefcase className="w-4 h-4 mr-2" />
                Internship Program 2024
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Launch Your
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Tech Career
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                6-month immersive programs with mentorship, real projects, and a path to full-time employment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/internship-apply">
                  <Button variant="glass" size="lg" className="px-8">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Apply Now
                  </Button>
                </Link>
                <Link to="/internship-verify">
                  <Button variant="outline" size="lg" className="px-8">
                    <FileCheck className="w-5 h-5 mr-2" />
                    Check Status
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Department chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {departments.map((dept, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full px-4 py-2.5 text-sm">
                  <span>{dept.icon}</span>
                  <span className="text-gray-300">{dept.name}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">{dept.spots} spots</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h2>
              <p className="text-gray-400">From application to onboarding in 4 simple steps</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30" />
                    <CardContent className="p-6">
                      <span className="text-4xl font-black text-white/5 block mb-2">{item.step}</span>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Program Benefits</h2>
              <p className="text-gray-400 max-w-xl mx-auto">More than just work experience — a launchpad for your career</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <b.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                      <p className="text-sm text-gray-500">{b.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-2xl border border-white/[0.08] rounded-3xl">
              <CardContent className="p-10 md:p-14 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start?</h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  Applications are open. Join hundreds of interns who've launched their careers with us.
                </p>
                <Link to="/internship-apply">
                  <Button variant="glass" size="lg" className="px-10">
                    Apply for Internship
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Internships;
