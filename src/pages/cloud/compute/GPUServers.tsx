import React from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Brain, Boxes, Layers, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const GPUServers = () => {
  const specs = [
    {
      icon: Brain,
      title: "AI & ML Training",
      desc: "Accelerate your model training with NVIDIA H100 and A100 Tensor Core GPUs.",
    },
    {
      icon: Zap,
      title: "High-Performance Computing",
      desc: "Ideal for scientific simulations, weather modeling, and data analytics.",
    },
    {
      icon: Layers,
      title: "Visual Rendering",
      desc: "Real-time rendering for 3D modeling, video production, and cloud gaming.",
    },
    {
      icon: Boxes,
      title: "Dedicated vRAM",
      desc: "Up to 80GB of HBM3 memory per GPU for maximum throughput.",
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Cpu className="h-3 w-3" /> Accelerated Compute
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">GPU Servers</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Unleash massive parallel processing power. Deploy dedicated GPU clusters for AI, machine learning, and heavy-duty visualization.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {specs.map((s, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:border-orange-500/30 transition-colors">
                  <s.icon className="h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-orange-600/10 to-transparent p-10 rounded-2xl border border-orange-500/20 text-center">
              <h2 className="text-2xl font-bold mb-4">Compute at scale.</h2>
              <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">Get on-demand access to the world's most powerful GPUs with second-by-second billing.</p>
              <div className="flex justify-center gap-4">
                <Button className="rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                  Configure GPU Cluster
                </Button>
                <Button variant="outline" className="rounded-lg border-white/10 text-white hover:bg-white/5 font-bold h-11 px-8 text-xs uppercase tracking-widest">
                  <Play className="h-4 w-4 mr-2" /> View Models
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default GPUServers;
