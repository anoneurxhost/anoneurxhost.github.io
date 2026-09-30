import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Users, MessageSquare, Calendar, Globe, Heart, Code, BookOpen, ArrowRight,
  ExternalLink, Mail, Send, Shield, Check, X, Target
} from "lucide-react";

// ── Ways to take part ──
const waysToHelp = [
  { label: "Report a bug", description: "Open an issue on the repository that reproduces it." },
  { label: "Review a pull request", description: "Read a change in an area you know and leave a review." },
  { label: "Improve documentation", description: "Fix something that confused you, or write the missing page." },
];

// ── Forums ──
const forums = [
  { name: "General Discussion", description: "Chat about anything tech-related" },
  { name: "Technical Help", description: "Get help with code, bugs, and architecture" },
  { name: "Project Showcase", description: "Share your work and get feedback" },
  { name: "Research & Papers", description: "Discuss research and publications" },
];

// ── Events ──
// Dates are proposals, not confirmed invitations. Nothing here has been scheduled.
const events = [
  { title: "AI/ML Community Meetup", date: "Not scheduled", type: "Virtual", description: "Proposed: monthly meetup on applied machine learning" },
  { title: "Open Source Sprint", date: "Not scheduled", type: "Hybrid", description: "Proposed: contribution weekend with no fixed scope" },
  { title: "Tech Talk: WebAssembly", date: "Not scheduled", type: "Virtual", description: "Proposed: session on WebAssembly in practice" },
];

// ── Community Resources ──
const resources = [
  { name: "GitHub", description: "Source code, issues and pull requests", link: "https://github.com/anoneurx", icon: Code, color: "text-white/70" },
  { name: "GitLab", description: "Repositories and CI/CD pipelines", link: "https://gitlab.com/anoneurx", icon: Globe, color: "text-orange-400" },
  { name: "YouTube", description: "Tutorials and tech talks", link: "https://youtube.com/@anoneurx", icon: Target, color: "text-red-400" },
  { name: "Instagram", description: "Behind the scenes and updates", link: "https://instagram.com/@anoneurx", icon: Heart, color: "text-rose-400" },
  { name: "WhatsApp", description: "Channel for updates", link: "https://whatsapp.com/channel/0029VbAmgwp3mFYF4DFVym0z", icon: MessageSquare, color: "text-emerald-400" },
  { name: "Blog", description: "In-depth technical articles", link: "/blogs", icon: BookOpen, color: "text-blue-400" },
];

// ── Mentorship ──
const mentorshipInfo = {
  description:
    "The mentorship programme pairs contributors with a maintainer for a three-month working period. Sessions are scoped to a real repository task rather than general advice.",
};

// ── Community Projects ──
const communityProjects = [
  { name: "AnonUI Kit", description: "Open-source UI component library built on the Anoneurx design system", language: "TypeScript" },
  { name: "Data Pipeline", description: "ETL framework for large dataset processing with AI Engine integration", language: "Python" },
  { name: "Mobile SDK", description: "React Native wrapper for the Arcadeum gaming APIs", language: "TypeScript" },
  { name: "CLI Tools", description: "Command-line utilities for managing Anoneurx deployments", language: "Go" },
];

// ── Guidelines ──
const guidelines = {
  dos: ["Be respectful and constructive", "Help newcomers feel welcome", "Give credit where it's due", "Report issues through proper channels", "Follow the code of conduct"],
  donts: ["Don't spam or self-promote excessively", "Don't share others' private information", "Don't use offensive or discriminatory language", "Don't dismiss others' contributions", "Don't engage in personal attacks"],
};

const Community = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 px-4">
          <div className="container mx-auto max-w-6xl relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Users className="w-3 h-3 mr-1" /> Open Community
              </Badge>
              <h1 className="text-white mb-6">
                Contribute to Anoneurx
              </h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                Anoneurx builds in the open. Every repository is public, and contributions are reviewed in the
                open. Start with an issue that reproduces a problem you have actually hit.
              </p>
              {/* Subpage navigation */}
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <Link to="/community/forums">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <MessageSquare className="w-4 h-4" /> Forums
                  </Button>
                </Link>
                <Link to="/community/events">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <Calendar className="w-4 h-4" /> Events
                  </Button>
                </Link>
                <Link to="/contributions">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    <BookOpen className="w-4 h-4" /> How to contribute
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ways to take part */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Code className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Where to start</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {waysToHelp.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                  <Card className="h-full bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                    <CardContent className="p-6">
                      <h3 className="text-base font-semibold text-white mb-2">{item.label}</h3>
                      <p className="text-sm text-white/50">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-white/40 mt-6 max-w-3xl">
              We do not publish member, contributor or project counts on this page. Those numbers are not
              tracked from a real source, and a figure we cannot verify is worse than no figure.
            </p>
          </div>
        </section>

        {/* Forums */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <MessageSquare className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Discussion Forums</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {forums.map((forum) => (
                <Card key={forum.name} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4">
                      <MessageSquare className="w-5 h-5 text-white/70" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{forum.name}</h3>
                    <p className="text-sm text-white/50">{forum.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Proposed events</h2>
            </div>
            <p className="text-sm text-white/40 mb-8 max-w-3xl">
              These are ideas, not invitations. Nothing below has a confirmed date, venue or speaker, and no
              attendance figures exist yet.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((event) => (
                <Card key={event.title} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-white/[0.08] border-white/[0.1] text-white/70 text-xs">{event.type}</Badge>
                      <span className="text-xs text-white/40">{event.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-white/50">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Resources */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Globe className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Community Resources</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((res) => (
                <a key={res.name} href={res.link} className="block">
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 h-full">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                        <res.icon className={`w-5 h-5 ${res.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">{res.name}</h3>
                        <p className="text-xs text-white/40">{res.description}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-white/20 shrink-0" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship Program */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <Heart className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Mentorship Program</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <p className="text-white/60 leading-relaxed mb-6">{mentorshipInfo.description}</p>
                  <p className="text-sm text-white/40 mb-6">
                    The programme is open to applications but has not run a full cycle, so we do not publish
                    mentor, match or satisfaction figures.
                  </p>
                  <Link to="/community/mentorship">
                    <Button className="w-full gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                      <Heart className="w-4 h-4" /> Apply as Mentor/Mentee
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Community Projects */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-white/40" /> Community Projects
                </h3>
                {communityProjects.map(project => (
                  <Card key={project.name} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{project.name}</h4>
                          <p className="text-xs text-white/40 mt-0.5">{project.description}</p>
                        </div>
                        <Badge className="bg-white/[0.06] border-white/[0.1] text-white/50 text-[10px] shrink-0">{project.language}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <Shield className="w-6 h-6 text-white/40" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Community Guidelines</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2"><Check className="w-4 h-4" /> Do</h3>
                  <ul className="space-y-2.5">
                    {guidelines.dos.map((item, i) => (
                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-emerald-400/50 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2"><X className="w-4 h-4" /> Don't</h3>
                  <ul className="space-y-2.5">
                    {guidelines.donts.map((item, i) => (
                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-red-400/50 mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Combined CTA & Newsletter */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* CTA Section */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.08]">
                  <h2 className="text-3xl font-bold text-white mb-4">Ready to start?</h2>
                  <p className="text-white/50 mb-8 max-w-md">
                    Pick a repository, find an issue labelled for newcomers, and open a pull request. Reviews
                    happen in public on the pull request.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                      <Code className="w-4 h-4" /> GitHub
                    </Button>
                    <Link to="/contributions">
                      <Button variant="outline" className="gap-2 w-full border-white/[0.1] text-white/70 hover:bg-white/[0.06] bg-transparent">
                        <BookOpen className="w-4 h-4" /> Contribution Guide <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-center bg-white/[0.01]">
                  <Mail className="w-8 h-8 text-white/30 mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-3">Stay in the Loop</h2>
                  <p className="text-white/50 mb-6 max-w-md">
                    Get updates on releases, new projects and scheduled events.
                  </p>
                  {subscribed ? (
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">You are subscribed. Check your inbox.</span>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/30 flex-1"
                      />
                      <Button
                        onClick={() => { if (email) setSubscribed(true); }}
                        className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1] shrink-0"
                      >
                        <Send className="w-4 h-4" /> Subscribe
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Community;
