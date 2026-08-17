import React from "react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Mail, ArrowRight, Award, Users, Rocket, Target, Globe, TrendingUp, Star,
  Building2, Heart, Briefcase, ExternalLink
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const milestones = [
    { year: "2018", title: "Company Founded", description: "Started with a vision to revolutionize technology", icon: <Rocket className="w-6 h-6" /> },
    { year: "2019", title: "First AI Breakthrough", description: "Developed cutting-edge machine learning algorithms", icon: <Star className="w-6 h-6" /> },
    { year: "2020", title: "Global Expansion", description: "Expanded operations to multiple countries", icon: <Globe className="w-6 h-6" /> },
    { year: "2021", title: "Space Technology", description: "Launched space technology division", icon: <Target className="w-6 h-6" /> },
    { year: "2022", title: "100+ Team Members", description: "Reached significant team milestone", icon: <Users className="w-6 h-6" /> },
    { year: "2023", title: "Industry Recognition", description: "Won multiple technology innovation awards", icon: <Award className="w-6 h-6" /> },
  ];

  const achievements = [
    { icon: <Award className="w-8 h-8 text-yellow-400" />, title: "25+ Industry Awards", description: "Recognition for innovation excellence" },
    { icon: <Users className="w-8 h-8 text-blue-400" />, title: "250+ Team Members", description: "Growing global talent network" },
    { icon: <TrendingUp className="w-8 h-8 text-green-400" />, title: "98% Client Satisfaction", description: "Exceptional service delivery" },
    { icon: <Globe className="w-8 h-8 text-purple-400" />, title: "15+ Countries", description: "Global presence and impact" },
  ];

  const values = [
    { title: "Innovation First", icon: Rocket, description: "We push boundaries, experiment boldly, and embrace emerging technologies to solve tomorrow's problems today." },
    { title: "Open Collaboration", icon: Users, description: "We believe great work happens through transparent communication and cross-functional teamwork." },
    { title: "Quality & Security", icon: Award, description: "Every line of code is reviewed, tested, and secured. We never compromise on quality." },
    { title: "Impact Driven", icon: Target, description: "We measure success by the real-world impact our solutions create for people and organizations." },
  ];

  const stats = [
    { label: "Founded", value: "2018" },
    { label: "Team Members", value: "250+" },
    { label: "Projects Delivered", value: "120+" },
    { label: "Countries Served", value: "15+" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Building2 className="w-3 h-3 mr-1" /> About Anoneurx
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Shaping Tomorrow's Technology
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
                Anoneurx is a technology company pioneering the future with intelligent software, AI-driven solutions, and user-first digital products.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map(s => (
                  <Card key={s.label} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                    <CardContent className="p-5 text-center">
                      <p className="text-2xl font-bold text-white">{s.value}</p>
                      <p className="text-xs text-white/40">{s.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8 sm:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-white/40" /> Our Mission
                    </h2>
                    <p className="text-white/60 leading-relaxed">
                      To pioneer the future through innovative AI, Robotics, Web Development, and Space Technology solutions. We strive to push the boundaries of what's possible and create technologies that improve lives globally.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-white/40" /> Our Vision
                    </h2>
                    <p className="text-white/60 leading-relaxed">
                      To be a global leader in technology innovation, shaping a future where technology empowers humanity and solves the world's most pressing challenges.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 flex items-center gap-3">
                <Heart className="w-6 h-6 text-white/40" /> Our Core Values
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((val, i) => (
                <motion.div key={val.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-4">
                        <val.icon className="w-5 h-5 text-white/50" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{val.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{val.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Our Journey</h2>
            </motion.div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="flex items-start gap-6 relative">
                    <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 z-10">
                      <span className="text-xs font-bold text-white/60">{m.year}</span>
                    </div>
                    <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] flex-1">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-white mb-1">{m.title}</h3>
                        <p className="text-sm text-white/50">{m.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">Our Achievements</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((a, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] text-center">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">{a.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
                      <p className="text-sm text-white/50">{a.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-10">
                <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  We're always looking for passionate people who want to build the future of technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/careers">
                    <Button className="gap-2 w-full bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                      <Briefcase className="w-4 h-4" /> Career Hub
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="gap-2 w-full border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                      <Mail className="w-4 h-4" /> Contact Us <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
