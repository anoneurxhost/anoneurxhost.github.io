import React from "react";
import { motion } from "framer-motion";
import { HardDrive, Activity, Zap, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const BlockStorage = () => {
  const stats = [
    { label: "IOPS", val: "Up to 50k", icon: Zap },
    { label: "Latency", val: "< 1ms", icon: Activity },
    { label: "Encryption", val: "Included", icon: Shield }
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <HardDrive className="h-3 w-3" /> Persistent Storage
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Block Storage</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                High-performance NVMe SSD volumes for your compute instances. Low latency, high IOPS, and persistent storage built for mission-critical databases and applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-16 text-center">
               {stats.map((stat, i) => (
                 <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-violet-500/30 transition-colors">
                    <stat.icon className="h-6 w-6 text-violet-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.val}</p>
                 </div>
               ))}
            </div>

            <div className="p-10 rounded-3xl bg-gradient-to-br from-violet-600/10 to-transparent border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="max-w-md">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                   <Database className="h-3 w-3" /> Architecture
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-white">Flexible Attachment</h3>
                 <p className="text-sm text-gray-400 leading-relaxed">Attach and move volumes between instances in the same region without data loss. Scale from 10GB to 16TB per volume effortlessly.</p>
               </div>
               <div className="flex gap-4">
                 <Button className="rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold h-12 px-8 text-xs uppercase tracking-widest shadow-lg shadow-violet-600/20">
                   Provision Volume
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default BlockStorage;
