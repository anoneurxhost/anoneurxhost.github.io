import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Rocket, Shield, Globe, Cpu, ChevronRight, ArrowRight, Zap, 
  Database, Server, CheckCircle, Smartphone, HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CloudLayout from "./CloudLayout";

const features = [
  { icon: Rocket, title: "Fast Deployment", desc: "Spin up instances with pre-configured images in less than 30 seconds." },
  { icon: Cpu, title: "Scalable Infra", desc: "Auto-scaling groups that adapt to your traffic patterns automatically." },
  { icon: Shield, title: "DDoS Protected", desc: "Enterprise-grade protection with L3/L4 mitigation included." },
  { icon: Database, title: "Global Persistent", desc: "Distributed block storage with 99.999% durability guarantee." },
];

const stats = [
  { value: "40+", label: "Regions", icon: Globe },
  { value: "99.99%", label: "Uptime", icon: Shield },
  { value: "2Tbps", label: "Network", icon: Zap },
  { value: "SLA", label: "Guarantee", icon: Rocket },
];

const CloudHome = () => {
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
              className="text-center lg:text-left"
            >
              <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Zap className="h-3 w-3 mr-1.5" /> Anoneurx Cloud v2.1
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Infrastructure for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400">Deep-Scale Apps.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Deploy virtual machines, edge networks, and distributed databases in seconds. Built on our global low-latency fiber spine.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button className="h-12 px-8 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest group shadow-lg shadow-violet-500/20">
                  Deploy Now <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to="/cloud/pricing">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-10 bg-violet-500/10 blur-[100px] rounded-full" />
              <div className="relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-3xl p-8 shadow-2xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="ml-2 h-4 w-32 bg-white/5 rounded-full" />
                 </div>
                 <div className="space-y-4">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-[80%] bg-white/5 rounded-full" />
                    <div className="h-2 w-[90%] bg-white/10 rounded-full" />
                    <div className="grid grid-cols-2 gap-4 pt-4">
                       <div className="h-20 rounded-lg bg-violet-500/10 border border-violet-500/20" />
                       <div className="h-20 rounded-lg bg-indigo-500/10 border border-indigo-500/20" />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 border-y border-white/5 bg-black/20 px-4">
        <div className="container-responsive">
          <div className="text-center mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400 font-bold">Cloud Engineering</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Scale without limits.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5 text-violet-400" />
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
                  <s.icon className="h-5 w-5 text-violet-400" />
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
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-900/10 via-black to-blue-900/5 p-10 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Build faster <br className="hidden lg:block" /><span className="italic">at global scale.</span></h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Explore our suite of cloud services designed for modern developers. From VMs to Kubernetes — all on our low-latency spine.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/cloud/products">
                  <Button className="h-12 px-8 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-widest group">
                    Explore Products <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/cloud/pricing">
                  <Button variant="outline" className="h-12 px-8 rounded-lg border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest">
                    Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <Server className="h-6 w-6 text-violet-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Compute</p>
                  <p className="text-lg font-bold text-white mb-3">$5/mo</p>
                  <div className="h-1 w-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)] rounded-full" />
               </div>
               <div className="p-5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex-1 min-w-[150px]">
                  <Database className="h-6 w-6 text-violet-400 mb-3" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Storage</p>
                  <p className="text-lg font-bold text-white mb-3">$0.02</p>
                  <div className="h-1 w-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)] rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudHome;
