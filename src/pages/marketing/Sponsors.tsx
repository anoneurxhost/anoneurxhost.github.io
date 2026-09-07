import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ProfileBadge } from "@/components/ui/badge";
import { sponsors } from "@/pages/opensource/data";

const tierColors: Record<string, string> = {
  Platinum: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Gold: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Silver: "bg-slate-400/20 text-slate-300 border-slate-400/30",
};

const Sponsors = () => {
  return (
    <PageTransition>
      <SEO
        title="Sponsors"
        description="Companies that sponsor Anoneurx open source, research and community programs — join Platinum, Gold or Silver tier."
        path="/sponsors"
        keywords="anoneurx sponsors, open source sponsors, platinum sponsor, gold sponsor, technology sponsorship, fund open source, sponsor anoneurx"
      />

      <div className="min-h-screen relative">
        <div className="pointer-events-none absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />

        <div className="container-custom relative z-10 pt-28 pb-24">
          {/* Hero */}
          <div className="max-w-3xl mb-12">
            <ProfileBadge variant="facultyPill" className="mb-4 uppercase tracking-widest text-[10px]">
              <Heart className="w-3 h-3 mr-1.5" /> Sponsors
            </ProfileBadge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Sponsors of Anoneurx
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Sponsorship keeps Anoneurx open source free forever. Thank you to the
              companies and organizations funding the work.
            </p>
          </div>

          <div className="mb-10">
            <Button asChild className="bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs h-11 px-6">
              <Link to="/opensource/partnership-inquiry">Become a sponsor <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sponsors.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.03] backdrop-blur-md hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  {s.avatar ? (
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center text-4xl font-bold text-white/80">
                      {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <ProfileBadge
                      variant="facultyPill"
                      className={`mb-1.5 text-[10px] ${tierColors[s.tier]}`}
                    >
                      {s.tier}
                    </ProfileBadge>
                    <h3 className="text-base font-bold text-white leading-tight">{s.name}</h3>
                    <p className="text-xs text-primary/80 font-medium">Since {s.since}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
