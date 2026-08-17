import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Zap, Sparkles, Code2, Gamepad2, Lock, Rocket, 
  Cpu, RefreshCw, Terminal, Download, ArrowRight, ChevronRight, 
  HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import introImg from "@/assets/blackwall/intro.png";

const features = [
  { icon: Shield, title: "Privacy Focused", desc: "Zero telemetry. Your data never leaves your machine." },
  { icon: Zap, title: "Lightweight Performance", desc: "Boots in seconds, sips RAM, runs everywhere." },
  { icon: Sparkles, title: "Beautiful Modern UI", desc: "Crafted glassmorphism with neon accents." },
  { icon: Code2, title: "Developer Ready", desc: "Native toolchains, containers, and SDKs preloaded." },
];

const stats = [
  { value: "3.2s", label: "Boot Speed", icon: Rocket },
  { value: "480MB", label: "Idle RAM", icon: Cpu },
  { value: "Weekly", label: "Updates", icon: RefreshCw },
  { value: "Rust", label: "Secure Core", icon: Shield },
];

const Blackwall = () => {
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
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Shield className="h-3 w-3 mr-1.5" /> Black Wall OS v4.2
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-brand tracking-tight mb-6 leading-tight">
                Privacy-first <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">Operating System.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                Secure. Fast. Minimal. Powerful. A next-generation operating system built in Rust with blockchain-backed identity for creators and privacy-first users.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button className="h-12 px-8 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest group shadow-lg shadow-white/10">
                  Join Beta <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to="/blackwall/download">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    Download ISO
                  </Button>
                </Link>
                <Link to="/blackwall/showcase">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 bg-white/[0.03] backdrop-blur-2xl text-white font-bold text-xs uppercase tracking-widest">
                    Showcase
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                 <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> FIPS 140-2</span>
                 <span className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> 124K Assets</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full" />
              <img 
                src={introImg} 
                alt="Black Wall Mockup" 
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold">Six Pillars of Security</span>
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
                className="p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-blue-400" />
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
                  <s.icon className="h-5 w-5 text-blue-400" />
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
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/10 via-black to-slate-900/5 p-10 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Forge your future <br className="hidden lg:block" /><span className="italic">with Black Wall.</span></h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Experience the terminal of the future. Free, open source, and ready for whatever you build next.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/blackwall/download">
                  <Button className="h-12 px-8 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-widest group">
                    Download ISO <Download className="h-4 w-4 ml-2 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/docs/blackwall">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    Read Docs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <Terminal className="h-6 w-6 text-blue-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Standard</p>
                  <p className="text-lg font-bold text-white mb-3">Community</p>
                  <div className="h-1 w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" />
               </div>
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <HardDrive className="h-6 w-6 text-blue-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Extended</p>
                  <p className="text-lg font-bold text-white mb-3">Enterprise</p>
                  <div className="h-1 w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blackwall;
