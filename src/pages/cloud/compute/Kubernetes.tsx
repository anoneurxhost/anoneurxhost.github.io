import React from "react";
import { motion } from "framer-motion";
import { Boxes, Shield, Zap, RefreshCw, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import CloudLayout from "../CloudLayout";

const Kubernetes = () => {
  const features = [
    {
      icon: RefreshCw,
      title: "Self-Healing",
      desc: "Automatically restarts failed containers and replaces nodes that don't respond to health checks.",
    },
    {
      icon: Shield,
      title: "Managed Control Plane",
      desc: "We handle the availability and scalability of your masters, so you can focus on your code.",
    },
    {
      icon: Zap,
      title: "One-Click Clusters",
      desc: "Deploy production-ready Kubernetes clusters across multiple regions in minutes.",
    },
    {
      icon: Layers,
      title: "Native Integration",
      desc: "Seamless integration with our load balancers, storage, and private networking.",
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Boxes className="h-3 w-3" /> Managed Services
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">Managed Kubernetes</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                The easiest way to run containers at scale. Fully-managed Kubernetes (AKS) that automates deployment, scaling, and management of containerized apps.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {features.map((f, i) => (
                <div key={i} className="p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:border-cyan-500/30 transition-colors">
                  <f.icon className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-cyan-600/10 to-transparent p-10 rounded-2xl border border-cyan-500/20 text-center">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                <Globe className="h-6 w-6 text-cyan-400" /> Deploy globally.
              </h2>
              <p className="text-gray-400 text-sm mb-8 mx-auto max-w-lg">Scale your containerized applications effortlessly across our global cloud infrastructure.</p>
              <div className="flex justify-center gap-4">
                <Button className="rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-11 px-8 text-xs uppercase tracking-widest">
                  Create Cluster
                </Button>
                <Button variant="outline" className="rounded-lg border-white/10 text-white hover:bg-white/5 font-bold h-11 px-8 text-xs uppercase tracking-widest">
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

export default Kubernetes;
