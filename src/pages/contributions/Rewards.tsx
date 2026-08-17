import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Award, CheckCircle, ArrowRight, Gift, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const tiers = [
  { tier: "Bronze", minContributions: 1, icon: Award, gradient: "from-amber-700/30 to-amber-600/20", border: "border-amber-700/30", textColor: "text-amber-400", perks: ["Contributor badge on GitHub", "Name in CONTRIBUTORS.md", "Community Discord role", "Access to contributor-only channels"] },
  { tier: "Silver", minContributions: 25, icon: Award, gradient: "from-gray-400/30 to-gray-300/20", border: "border-gray-400/30", textColor: "text-gray-300", perks: ["All Bronze perks", "Priority PR reviews", "Exclusive swag pack", "Featured on website", "Early access to beta features"] },
  { tier: "Gold", minContributions: 100, icon: Trophy, gradient: "from-yellow-500/30 to-yellow-400/20", border: "border-yellow-500/30", textColor: "text-yellow-400", perks: ["All Silver perks", "Direct Slack channel access", "Co-author on technical blogs", "Conference sponsorship", "One-on-one with core team"] },
  { tier: "Platinum", minContributions: 250, icon: Star, gradient: "from-cyan-400/30 to-blue-400/20", border: "border-cyan-500/30", textColor: "text-cyan-300", perks: ["All Gold perks", "Core team membership", "Revenue sharing eligibility", "Speaking opportunities", "Advisory board seat"] },
];

const milestones = [
  { name: "First PR Merged", points: 50, icon: "🎉", description: "Your first contribution to the codebase" },
  { name: "Bug Hunter", points: 100, icon: "🐛", description: "Report and fix 10 bugs" },
  { name: "Doc Master", points: 75, icon: "📝", description: "Improve documentation across 5 projects" },
  { name: "Review Champion", points: 150, icon: "👀", description: "Review 50 pull requests" },
  { name: "Streak Master", points: 200, icon: "🔥", description: "30-day contribution streak" },
  { name: "Community Leader", points: 300, icon: "🌟", description: "Help 100+ community members" },
];

const RewardsPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <section className="relative py-24 sm:py-32 px-4">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-6 bg-white/[0.06] border-white/[0.1] text-white/80">
                <Gift className="w-3 h-3 mr-1" /> Rewards
              </Badge>
              <h1 className="text-white mb-6">Rewards & Recognition</h1>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                We believe in recognizing every contribution. Earn badges, swag, and exclusive perks.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tiers */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-white mb-8">Contributor Tiers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tiers.map((tier, i) => (
                <motion.div key={tier.tier} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.4 }}>
                  <Card className={`bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] overflow-hidden h-full ${tier.border}`}>
                    <div className={`h-2 bg-gradient-to-r ${tier.gradient}`} />
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <tier.icon className={`w-6 h-6 ${tier.textColor}`} />
                        <h3 className={`font-bold ${tier.textColor}`}>{tier.tier}</h3>
                      </div>
                      <p className="text-xs text-white/40 mb-4">{tier.minContributions}+ contributions required</p>
                      <ul className="space-y-2">
                        {tier.perks.map((perk, j) => (
                          <li key={j} className="text-xs text-white/50 flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-white/20 mt-0.5 shrink-0" /> {perk}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-5 h-5 text-white/40" />
              <h2 className="text-white">Achievement Milestones</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {milestones.map((m, i) => (
                <motion.div key={m.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] hover:bg-white/[0.06] transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <h3 className="text-white text-sm">{m.name}</h3>
                          <p className="text-xs text-white/40">+{m.points} points</p>
                        </div>
                      </div>
                      <p className="text-xs text-white/50">{m.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <Card className="bg-white/[0.03] backdrop-blur-2xl border-white/[0.08] p-8">
              <h2 className="text-white mb-3">Start Contributing</h2>
              <p className="text-white/50 mb-6">Pick an issue, submit a PR, and begin your journey.</p>
              <div className="flex gap-4 justify-center">
                <Link to="/contributions">
                  <Button className="gap-2 bg-white/[0.06] backdrop-blur border border-white/[0.1] text-white hover:bg-white/[0.1]">
                    Contribution Guide
                  </Button>
                </Link>
                <a href="https://github.com/anoneurx" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-1 border-white/[0.1] text-white/70 hover:bg-white/[0.06]">
                    GitHub <ArrowRight className="w-3 h-3" />
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default RewardsPage;
