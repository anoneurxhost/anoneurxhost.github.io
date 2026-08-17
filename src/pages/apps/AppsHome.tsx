import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, Compass, Rocket, Globe2, Wallet, BarChart3,
  ShieldCheck, Truck, TrendingUp, Sparkles, BadgeCheck, ScanSearch, Zap,
} from "lucide-react";
import AppsLayout from "./AppsLayout";
import AppCard from "./AppCard";
import { apps, categories } from "./appsData";

const benefits = [
  { icon: Globe2, title: "Global Reach", desc: "Reach millions of users across 180+ countries." },
  { icon: Rocket, title: "Easy Publishing", desc: "Submit and publish in minutes with our pipeline." },
  { icon: Wallet, title: "Fast Payments", desc: "Weekly payouts in 30+ currencies." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Live insights on installs, revenue and reviews." },
  { icon: ShieldCheck, title: "Secure Delivery", desc: "Signed binaries, malware scans, integrity checks." },
  { icon: TrendingUp, title: "Growth Tools", desc: "A/B store listings, featured slots & promotions." },
];

const trust = [
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: BadgeCheck, label: "Verified Developers" },
  { icon: ScanSearch, label: "Malware Scanned" },
  { icon: Truck, label: "Fast Downloads" },
  { icon: Zap, label: "Privacy Focused" },
];

import StoreBanner from "./StoreBanner";
import TrendingSection from "./TrendingSection";
import StoreShelves from "./StoreShelves";

const AppsHome = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      const matchQ = a.name.toLowerCase().includes(query.toLowerCase()) || a.developer.toLowerCase().includes(query.toLowerCase());
      const matchC = activeCat === "All" || a.category === activeCat;
      return matchQ && matchC;
    });
  }, [query, activeCat]);

  const topCharts = [...apps].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const newReleases = apps.filter((a) => a.newRelease);

  return (
    <AppsLayout title="Anoneurx Apps · Discover Powerful Apps">
      <StoreBanner />
      <TrendingSection />

      {/* FEATURED + FILTERS */}
      <section className="relative px-4 py-8">
        <div className="container-responsive">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="mb-4">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em] mb-2 block">Premium</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Featured Collection</h2>
              </div>
              <p className="text-sm text-slate-400">Hand-picked premium apps from global developers.</p>
            </div>
            <Link to="/apps/browse" className="text-xs text-blue-300 hover:text-white inline-flex items-center gap-1 uppercase tracking-widest font-bold">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            {["All", ...categories.map((c) => c.name)].map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition ${
                  activeCat === c
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-transparent text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((a) => <AppCard key={a.id} app={a} />)}
          </div>
        </div>
      </section>



      {/* CATEGORIES */}
      <section className="px-4 py-16">
        <div className="container-responsive">
          <div className="mb-8">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 block animate-fade-in">Markets</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.name}
                  to={`/apps/browse?cat=${encodeURIComponent(c.name)}`}
                  className="group rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4 hover:border-white/25 hover:-translate-y-1 transition-all"
                >
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition`}>
                    <Icon className="h-4.5 w-4.5 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Explore →</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOP CHARTS + NEW RELEASES */}
      <section className="px-4 py-12">
        <div className="container-responsive grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold text-white mb-4 inline-flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" /> Top Charts
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl divide-y divide-white/5 overflow-hidden">
              {topCharts.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={a.id} className="flex items-center gap-3 p-2.5 hover:bg-white/5 transition">
                    <span className="w-5 text-center text-xs font-bold text-blue-300">{i + 1}</span>
                    <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${a.color} flex items-center justify-center shrink-0`}>
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{a.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{a.developer}</div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 px-2">{a.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4 inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" /> New Releases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newReleases.map((a) => <AppCard key={a.id} app={a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-4 py-12">
        <div className="container-responsive">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trust.map((t) => {
              const I = t.icon;
              return (
                <div key={t.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl text-xs text-slate-300">
                  <I className="h-3.5 w-3.5 text-blue-400" /> {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StoreShelves />
    </AppsLayout>
  );
};

export default AppsHome;
