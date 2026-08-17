import React from "react";
import { motion } from "framer-motion";
import { Cpu, Shield, Zap, Server, Activity, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const VirtualMachines = () => {
  const features = [
    {
      icon: Cpu,
      title: "Powerful vCPUs",
      desc: "Latest generation AMD EPYC and Intel Xeon processors for predictable performance.",
    },
    {
      icon: Shield,
      title: "Hardened Security",
      desc: "KVM-based isolation, managed firewalls, and encrypted boot volumes.",
    },
    {
      icon: Zap,
      title: "NVMe Storage",
      desc: "Blazing fast local and network storage for high-IOPS applications.",
    },
    {
      icon: Activity,
      title: "Auto-Scaling",
      desc: "Automatically scale your cluster based on traffic and resource demand.",
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Server className="h-3 w-3" /> Compute
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Virtual Machines</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Deploy scalable, high-performance cloud instances in seconds. From micro-instances for testing to heavy-duty compute for production.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {features.map((f, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:border-blue-500/30 transition-colors">
                  <f.icon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-10 rounded-2xl border border-blue-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <h2 className="text-2xl font-bold mb-2">Ready to deploy?</h2>
                  <p className="text-gray-400 text-sm italic">Spin up your first instance in less than 60 seconds.</p>
                </div>
                <div className="flex gap-4">
                  <Button className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                    Launch Instance
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

export default VirtualMachines;
