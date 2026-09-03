import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Heart, Users, MessageSquare, AlertTriangle, CheckCircle, XCircle, Mail } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const pledges = [
  "Use welcoming and inclusive language",
  "Be respectful of differing viewpoints and experiences",
  "Gracefully accept constructive criticism",
  "Focus on what is best for the community",
  "Show empathy towards other community members",
  "Prioritize collaboration over competition",
];

const unacceptable = [
  "Trolling, insulting/derogatory comments, and personal or political attacks",
  "Public or private harassment of any kind",
  "Publishing others' private information without explicit permission",
  "Sexual language, imagery, or unwelcome sexual attention",
  "Conduct which could reasonably be considered inappropriate in a professional setting",
  "Sustained disruption of discussions, events, or contributions",
];

const enforcement = [
  { action: "Warning", description: "A private written warning, providing clarity around the violation and an explanation of why the behavior was inappropriate.", icon: MessageSquare, color: "text-yellow-400" },
  { action: "Temporary Ban", description: "A temporary ban from any interaction or public communication with the community for a specified period.", icon: AlertTriangle, color: "text-orange-400" },
  { action: "Permanent Ban", description: "A permanent ban from any public interaction within the community for severe or repeated violations.", icon: XCircle, color: "text-red-400" },
];

const CodeOfConduct = () => (
  <PageTransition>
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link to="/contributions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Contributions
          </Link>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
              <Shield className="w-3 h-3 mr-1" /> Community Standards
            </Badge>
            <h1 className="text-white mb-4">Code of Conduct</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Our commitment to providing a welcoming, inclusive, and harassment-free environment for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Pledge */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-5 h-5 text-pink-400/60" />
            <h2 className="text-white">Our Pledge</h2>
          </div>
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
            <CardContent className="p-6">
              <p className="text-white/60 mb-6">
                In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to make participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {pledges.map((pledge, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <CheckCircle className="w-4 h-4 text-green-400/60 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/60">{pledge}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Unacceptable Behavior */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <XCircle className="w-5 h-5 text-red-400/60" />
            <h2 className="text-white">Unacceptable Behavior</h2>
          </div>
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-red-500/10">
            <CardContent className="p-6">
              <div className="space-y-3">
                {unacceptable.map((item, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/[0.03] border border-red-500/10">
                      <XCircle className="w-4 h-4 text-red-400/60 mt-0.5 shrink-0" />
                      <span className="text-sm text-white/60">{item}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enforcement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-white mb-8">Enforcement</h2>
          <div className="space-y-4">
            {enforcement.map((e, i) => (
              <motion.div key={e.action} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                      <e.icon className={`w-5 h-5 ${e.color}`} />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{e.action}</h3>
                      <p className="text-sm text-white/50">{e.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope & Contact */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-5">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
              <CardContent className="p-6">
                <Users className="w-6 h-6 text-white/30 mb-3" />
                <h3 className="text-white mb-2">Scope</h3>
                <p className="text-sm text-white/50">
                  This Code of Conduct applies within all project spaces, including GitHub repositories, Discord channels, community forums, events, and any public space where an individual is representing the project or its community.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
              <CardContent className="p-6">
                <Mail className="w-6 h-6 text-white/30 mb-3" />
                <h3 className="text-white mb-2">Report an Issue</h3>
                <p className="text-sm text-white/50 mb-4">
                  If you experience or witness unacceptable behavior, please report it confidentially.
                </p>
                <a href="mailto:conduct@anoneurx.com">
                  <Button size="sm" className="gap-2 bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <Mail className="w-3 h-3" /> conduct@anoneurx.com
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Link to="/contributions">
            <Button variant="outline" className="gap-2 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
              <ArrowLeft className="w-3 h-3" /> Back to Contributions
            </Button>
          </Link>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default CodeOfConduct;
