import React from "react";
import { motion } from "framer-motion";
import { Server, Shield, Zap, HardDrive, Cpu, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const BareMetal = () => {
  const benefits = [
    {
      icon: Cpu,
      title: "No Virtualization Overhead",
      desc: "Get 100% of the hardware performance for your most demanding workloads.",
    },
    {
      icon: Shield,
      title: "Physical Isolation",
      desc: "Dedicated hardware for maximum security and compliance requirements.",
    },
    {
      icon: HardDrive,
      title: "Direct Storage Access",
      desc: "Direct access to NVMe and SATA drives for ultra-low latency data processing.",
    },
    {
      icon: Zap,
      title: "Full Control",
      desc: "Complete BIOS and hardware-level configuration via IPMI/iDRAC access.",
    },
  ];

  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Server className="h-3 w-3" /> Dedicated Hardware
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Bare Metal</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Dedicated servers with cloud-inspired flexibility. Experience the power of physical hardware combined with the agility of the cloud.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {benefits.map((b, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:border-emerald-500/30 transition-colors">
                  <b.icon className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-emerald-600/10 to-transparent p-10 rounded-2xl border border-emerald-500/20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Dedicated performance.</h2>
                  <p className="text-gray-400 text-sm">Perfect for databases, large-scale clusters, and applications requiring strict hardware control.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <Button className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                    Provision Server
                  </Button>
                  <Button variant="outline" className="rounded-lg border-white/10 text-white hover:bg-white/5 font-bold h-11 px-8 text-xs uppercase tracking-widest">
                    <Terminal className="h-4 w-4 mr-2" /> API Access
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default BareMetal;
