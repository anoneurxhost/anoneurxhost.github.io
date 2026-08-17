import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  GitPullRequest, GitMerge, Code, CheckCircle, Users,
  BookOpen, Shield, Trophy, Layers, Lock, BarChart3, Heart, ArrowRight
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { label: "PRs Merged", value: "2,847", icon: GitMerge, color: "text-green-400" },
  { label: "Issues Closed", value: "4,213", icon: CheckCircle, color: "text-blue-400" },
  { label: "Contributors", value: "1,800+", icon: Users, color: "text-purple-400" },
  { label: "Lines of Code", value: "1.2M+", icon: Code, color: "text-amber-400" },
];

const subpages = [
  { title: "Contributors", description: "Meet the people who build and maintain Anoneurx every day.", icon: Users, path: "/contributions/contributors", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" },
  { title: "How to Contribute", description: "Step-by-step guide to making your first contribution.", icon: BookOpen, path: "/contributions/how-to-contribute", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
  { title: "Review Progress", description: "Track PR statuses and understand our review pipeline.", icon: BarChart3, path: "/contributions/review-progress", color: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
  { title: "Rewards & Recognition", description: "Earn badges, swag, and exclusive perks for contributing.", icon: Trophy, path: "/contributions/rewards", color: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/20" },
  { title: "Architecture Overview", description: "Understand the system design, layers, and how components interact.", icon: Layers, path: "/contributions/architecture", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20" },
  { title: "Security Policy", description: "How we handle vulnerabilities and protect our users.", icon: Lock, path: "/contributions/security", color: "from-red-500/20 to-rose-500/20", border: "border-red-500/20" },
  { title: "Code of Conduct", description: "Our commitment to a welcoming and inclusive community.", icon: Shield, path: "/contributions/code-of-conduct", color: "from-pink-500/20 to-purple-500/20", border: "border-pink-500/20" },
];

const ContributionsGuide = () => (
  <PageTransition>
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
              <GitPullRequest className="w-3 h-3 mr-1" /> Open Source
            </Badge>
            <h1 className="text-white mb-6">Contribute to <span className="font-brand">Anoneurx</span></h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Help us build the future. Every contribution matters — from fixing typos to building features.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2, duration: 0.5 }} className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08]">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-[11px] text-white/40">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subpage Navigation Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subpages.map((page, i) => (
              <motion.div key={page.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Link to={page.path} className="block h-full">
                  <Card className={`bg-white/[0.03] backdrop-blur-2xl ${page.border} hover:bg-white/[0.06] transition-all duration-300 group h-full cursor-pointer`}>
                    <div className={`h-1 bg-gradient-to-r ${page.color}`} />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center`}>
                          <page.icon className="w-5 h-5 text-white/70" />
                        </div>
                        <h3 className="text-white group-hover:text-white/90">{page.title}</h3>
                      </div>
                      <p className="text-sm text-white/50 mb-4">{page.description}</p>
                      <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                        Explore <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8">
            <Heart className="w-8 h-8 text-white/30 mx-auto mb-4" />
            <h2 className="text-white mb-3">Ready to Contribute?</h2>
            <p className="text-white/50 mb-6">Pick an issue, submit a PR, and begin your journey.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contributions/how-to-contribute">
                <button className="gap-2 px-6 py-2.5 rounded-lg bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1] transition-colors inline-flex items-center">
                  <BookOpen className="w-4 h-4" /> Get Started
                </button>
              </Link>
              <a href="https://github.com/anoneurx" target="_blank" rel="noopener noreferrer">
                <button className="gap-2 px-6 py-2.5 rounded-lg border border-white/[0.1] text-white/70 hover:bg-white/[0.06] transition-colors inline-flex items-center">
                  GitHub <ArrowRight className="w-3 h-3" />
                </button>
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default ContributionsGuide;
