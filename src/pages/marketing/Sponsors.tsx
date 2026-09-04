import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Heart, Shield, Sparkles, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sponsors } from "@/pages/opensource/data";

const tierMeta: Record<string, { color: string; icon: typeof Award; perks: string[] }> = {
  Platinum: {
    color: "from-cyan-400 via-blue-400 to-indigo-500",
    icon: Sparkles,
    perks: ["Logo on every project README", "Dedicated engineering support", "Roadmap co-planning", "Priority hiring pipeline"],
  },
  Gold: {
    color: "from-amber-300 via-orange-400 to-rose-500",
    icon: Award,
    perks: ["Logo on opensource homepage", "Quarterly briefings", "Access to office hours"],
  },
  Silver: {
    color: "from-slate-300 via-slate-400 to-slate-500",
    icon: Shield,
    perks: ["Logo on sponsors page", "Newsletter recognition"],
  },
};

const Sponsors = () => {
  const grouped = ["Platinum", "Gold", "Silver"].map((tier) => ({
    tier,
    entries: sponsors.filter((s) => s.tier === tier),
  }));

  return (
    <PageTransition>
      <SEO
        title="Sponsors"
        description="Companies that sponsor Anoneurx open source, research and community programs — join Platinum, Gold or Silver tier."
        path="/sponsors"
      />

      <div className="min-h-screen relative">
        <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute bottom-20 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[140px]" />

        <section className="relative z-10 px-4 pt-24 pb-12">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-3 bg-white/5 text-blue-300 border-white/10 px-3 py-1 backdrop-blur-xl text-[10px]">
                <Heart className="w-3 h-3 mr-1.5" /> Sponsors
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Sponsors of Anoneurx</h1>
              <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-6">
                Sponsorship keeps Anoneurx open source free forever. Thank you to the companies and organizations funding the work.
              </p>
              <Button asChild className="bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs h-11 px-6">
                <Link to="/opensource/partnership-inquiry">Become a sponsor <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 px-4 pb-24">
          <div className="container mx-auto max-w-6xl space-y-14">
            {grouped.map(({ tier, entries }) => {
              const meta = tierMeta[tier];
              const Icon = meta.icon;
              return (
                <div key={tier}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white">{tier} Sponsors</h2>
                      <p className="text-xs text-gray-500">{meta.perks.join(" · ")}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {entries.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-primary/30 transition-all">
                          <CardContent className="p-6 text-center">
                            <div className={`h-14 w-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-lg`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-sm font-bold text-white mb-1">{s.name}</h3>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Since {s.since}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Sponsors;