import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CreditCard, Zap, ShieldCheck, Sparkles, ArrowRight, ChevronRight,
  TrendingUp, Globe, Wallet, Lock, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import bankingHero from "@/assets/marketing/banking-hero.jpg";

const features = [
  { icon: CreditCard, title: "Virtual Cards", desc: "Spin up unlimited single-use or merchant-locked cards instantly." },
  { icon: Zap, title: "Instant Transfers", desc: "Move money in seconds, 24/7, globally — no hidden fees." },
  { icon: ShieldCheck, title: "Bank-Grade Security", desc: "Biometrics, hardware key support, and 256-bit encryption." },
  { icon: Sparkles, title: "AI Insights", desc: "Personalized spending intelligence and savings predictions." },
];

const stats = [
  { value: "5M+", label: "Customers", icon: Globe },
  { value: "$8B+", label: "Processed", icon: TrendingUp },
  { value: "180+", label: "Countries", icon: Globe },
  { value: "4.9★", label: "App Rating", icon: Sparkles },
];

const BankingHome = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden px-4">
        <div className="container-responsive relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="h-3 w-3 mr-1.5" /> Anoneurx Bank v2.0
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Banking for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">people who build.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                The first account designed for builders and founders. Premium debit cards, instant global payouts, and smart automation in one beautiful app.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="h-12 px-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest group shadow-lg shadow-amber-500/20">
                  Open Account <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to="/pay/features">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    See Features
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-amber-500/10 blur-[100px] rounded-full" />
              <img 
                src={bankingHero} 
                alt="Banking App" 
                className="relative rounded-xl border border-white/10 shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 border-y border-white/5 bg-black/20 px-4">
        <div className="container-responsive">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">Why Anoneurx Bank</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Built different. Built better.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:bg-white/10 transition-all">
                  <s.icon className="h-5 w-5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-24">
        <div className="container-responsive">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-amber-900/10 via-black to-blue-900/5 p-10 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Deploy your future <br className="hidden lg:block" /><span className="italic">at scale.</span></h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Open your account in less than 2 minutes. No paperwork, no hidden fees, just pure engineering.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/pay/download">
                  <Button className="h-12 px-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest group">
                    Get Started <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pay/download">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    Download App
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <CreditCard className="h-6 w-6 text-amber-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Standard</p>
                  <p className="text-lg font-bold text-white mb-3">Free</p>
                  <div className="h-1 w-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] rounded-full" />
               </div>
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <Zap className="h-6 w-6 text-amber-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Premium</p>
                  <p className="text-lg font-bold text-white mb-3">$10/mo</p>
                  <div className="h-1 w-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankingHome;
