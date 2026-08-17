import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download, ArrowRight, Shield, Zap, Sparkles, Puzzle,
  RefreshCw, Globe, Lock, Cpu, Rocket, ChevronRight,
  Smartphone, Monitor
} from "lucide-react";
import NexoraLayout from "./NexoraLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import heroImg from "@/assets/nexora/browser-hero.jpg";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "40% faster page loads thanks to a new caching engine." },
  { icon: Shield, title: "Privacy First", desc: "Zero telemetry, encrypted DNS, kernel-level tracker blocking." },
  { icon: Lock, title: "Built-in Ad Blocker", desc: "Block ads, trackers and crypto miners — out of the box." },
  { icon: Sparkles, title: "AI Native", desc: "Native AI sidebar — translate, summarize, and automate workflows." },
];

const stats = [
  { value: "40%", label: "Faster", icon: Zap },
  { value: "500k+", label: "Installs", icon: Rocket },
  { value: "Zero", label: "Trackers", icon: Shield },
  { value: "v2.8.4", label: "Stable", icon: Sparkles },
];

const Nexora = () => {
  return (
    <NexoraLayout>
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
                  <Sparkles className="h-3 w-3 mr-1.5" /> Powered by Anoneurx · v2.8.4
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
                  The browser <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 italic">built for you.</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
                  Nexora is a fast, private, AI-native browser. Block trackers, sync across devices, and experience a web that doesn't follow you.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest group shadow-lg shadow-blue-500/20">
                    Download Free <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link to="/nexora/features">
                    <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                      See Features
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                   <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-blue-400" /> AES-256 Sync</span>
                   <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-purple-400" /> Multi-Platform</span>
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
                  src={heroImg} 
                  alt="Nexora browser" 
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
              <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold">Why Nexora</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Different on purpose.</h2>
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
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-900/10 via-black to-cyan-900/5 p-10 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Ready to switch <br className="hidden lg:block" /><span className="italic">to Nexora?</span></h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Free, open source, and ready in under 60 seconds. Import your bookmarks and start exploring a cleaner web.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Link to="/nexora/download">
                    <Button className="h-12 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest group">
                      Download Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/nexora/compare">
                    <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                      Compare Browsers
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
                 <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                    <Monitor className="h-6 w-6 text-blue-400 mb-3" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Desktop</p>
                    <p className="text-lg font-bold text-white mb-3">Sync Active</p>
                    <div className="h-1 w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" />
                 </div>
                 <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                    <Smartphone className="h-6 w-6 text-blue-400 mb-3" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Mobile</p>
                    <p className="text-lg font-bold text-white mb-3">Cloud Sync</p>
                    <div className="h-1 w-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" />
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </NexoraLayout>
  );
};

export default Nexora;
