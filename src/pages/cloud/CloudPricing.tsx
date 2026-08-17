import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Rocket, Shield, Globe, Server, Cpu, HardDrive, Layout, ChevronRight, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CloudLayout from "./CloudLayout";

const plans = [
  {
    name: "Developer",
    price: "$5",
    desc: "For small hobby projects",
    features: ["1 vCPU Core", "1GB RAM", "25GB SSD", "1TB Transfer", "Community Support"],
    color: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    name: "Startup",
    price: "$49",
    desc: "For growing applications",
    popular: true,
    features: ["4 vCPU Cores", "8GB RAM", "160GB SSD", "5TB Transfer", "Security Bundle", "Email Support"],
    color: "bg-violet-600/20",
    border: "border-violet-600/40"
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For large-scale infra",
    features: ["Dedicated Hardware", "Unlimited RAM", "Arbitrary Storage", "Unmetered Transfer", "24/7 Dedicated SRE"],
    color: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  }
];

const CloudPricing = () => {
  const navigate = useNavigate();
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  
  // Custom Server Config State
  const [config, setConfig] = useState({
    cpu: "2",
    ram: "4",
    storage: "50",
    bandwidth: "1"
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cpuPrice = parseInt(config.cpu) * 5;
    const ramPrice = parseInt(config.ram) * 2;
    const storagePrice = parseInt(config.storage) * 0.1;
    const bandwidthPrice = (parseInt(config.bandwidth) - 1) * 10;
    
    setTotalPrice(Math.round((cpuPrice + ramPrice + storagePrice + (bandwidthPrice > 0 ? bandwidthPrice : 0)) * 100) / 100);
  }, [config]);

  const handleCheckout = () => {
    navigate(`/payment?product=Custom Cloud Server (${config.cpu} vCPU, ${config.ram}GB RAM)&amount=${totalPrice}&category=Cloud`);
  };

  return (
    <CloudLayout>
      <div className="pt-32 pb-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
             <Badge className="mb-3 bg-violet-500/10 text-violet-400 border-violet-500/20 px-3 py-1 uppercase tracking-[0.2em] font-bold text-[9px]">Infrastructure Tiers</Badge>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-3 text-white uppercase">Cloud Pricing</h1>
            <p className="text-gray-400 text-[10px] max-w-[280px] mx-auto uppercase tracking-widest font-medium opacity-50">Scale your infrastructure with pixel-perfect precision.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-lg border group overflow-hidden transition-all duration-500 ${
                  plan.popular 
                  ? "border-violet-500/40 bg-violet-500/[0.03] scale-105 shadow-xl shadow-violet-500/10 z-10" 
                  : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                } backdrop-blur-3xl p-6 flex flex-col`}
              >
                {/* Glow Effect */}
                <div className={`absolute -top-20 -left-20 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:scale-150 ${plan.popular ? "bg-violet-500" : "bg-blue-500"}`} />

                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                    Recommended
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${plan.popular ? "bg-violet-500/20 border-violet-500/30 text-violet-400" : "bg-white/5 border-white/10 text-white/40"}`}>
                     {idx === 0 ? <Zap className="w-5 h-5" /> : idx === 1 ? <Rocket className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-bold mb-1 uppercase tracking-tight text-white">{plan.name}</h3>
                  <p className="text-[9px] text-gray-500 font-medium uppercase tracking-widest leading-relaxed">{plan.desc}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black tracking-tighter text-white">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">/Mo</span>}
                </div>

                <div className="space-y-2.5 mb-10 flex-1 pt-4 border-t border-white/5">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <div className={`p-0.5 rounded-full ${plan.popular ? "bg-violet-500/20" : "bg-white/5"}`}>
                        <Check className={`h-2.5 w-2.5 ${plan.popular ? "text-violet-400" : "text-gray-600"}`} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => {
                    if (plan.price === "Custom") {
                      setIsCustomOpen(true);
                    } else {
                      const amount = plan.price.replace("$", "");
                      navigate(`/payment?product=Cloud ${plan.name}&amount=${amount}&category=Cloud`);
                    }
                  }}
                  className={`w-full h-11 rounded-lg font-black uppercase tracking-[0.2em] text-[9px] transition-all duration-300 group/btn ${
                    plan.popular 
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {plan.price === "Custom" ? "Design Server" : "Get Started"}
                  <ChevronRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Custom Server Builder Overlay */}
          <Dialog open={isCustomOpen} onOpenChange={setIsCustomOpen}>
            <DialogContent className="max-w-xl bg-black/95 border-white/10 backdrop-blur-2xl text-white rounded-xl p-0 overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />
               
               <div className="p-6">
                  <DialogHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30">
                        <Server className="h-4 w-4 text-violet-400" />
                      </div>
                      <div>
                        <DialogTitle className="text-xl font-bold uppercase tracking-tight">Node Builder</DialogTitle>
                        <DialogDescription className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">Configure dedicated infrastructure</DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Selectors */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest ml-1 flex items-center gap-2">
                          <Cpu className="h-2.5 w-2.5" /> Compute (vCPU)
                        </Label>
                        <Select value={config.cpu} onValueChange={(v) => setConfig({...config, cpu: v})}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-10 rounded-lg text-white font-bold text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {[1, 2, 4, 8, 16, 32, 64].map(n => (
                              <SelectItem key={n} value={n.toString()} className="text-white focus:bg-white/10 focus:text-white uppercase font-bold text-[10px]">
                                {n} Core{n > 1 ? 's' : ''} Industrial
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest ml-1 flex items-center gap-2">
                          <Layout className="h-2.5 w-2.5" /> Memory (RAM)
                        </Label>
                        <Select value={config.ram} onValueChange={(v) => setConfig({...config, ram: v})}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-10 rounded-lg text-white font-bold text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {[1, 2, 4, 8, 16, 32, 64, 128].map(n => (
                              <SelectItem key={n} value={n.toString()} className="text-white focus:bg-white/10 focus:text-white uppercase font-bold text-[10px]">
                                {n}GB DDR5 High-Clock
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest ml-1 flex items-center gap-2">
                          <HardDrive className="h-2.5 w-2.5" /> Storage (SSD)
                        </Label>
                        <Select value={config.storage} onValueChange={(v) => setConfig({...config, storage: v})}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-10 rounded-lg text-white font-bold text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {[25, 50, 100, 250, 500, 1000, 2000].map(n => (
                              <SelectItem key={n} value={n.toString()} className="text-white focus:bg-white/10 focus:text-white uppercase font-bold text-[10px]">
                                {n >= 1000 ? `${n/1000}TB` : `${n}GB`} NVMe Gen5
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="p-6 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div>
                        <h4 className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Real-time Estimate</h4>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                              <span className="text-gray-500">Node Core</span>
                              <span className="text-white">${parseInt(config.cpu) * 5}</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                              <span className="text-gray-500">Memory Cluster</span>
                              <span className="text-white">${parseInt(config.ram) * 2}</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                              <span className="text-gray-500">Storage Array</span>
                              <span className="text-white">${(parseInt(config.storage) * 0.1).toFixed(2)}</span>
                           </div>
                           <div className="h-px bg-white/10 my-3" />
                           <div className="flex justify-between items-end">
                              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pb-0.5">Monthly</span>
                              <span className="text-3xl font-black tracking-tighter text-violet-400">${totalPrice}</span>
                           </div>
                        </div>
                      </div>

                      <Button 
                        onClick={handleCheckout}
                        className="w-full h-10 bg-white text-black hover:bg-violet-500 hover:text-white transition-all duration-300 font-black uppercase tracking-[0.2em] text-[9px] mt-6 flex items-center justify-center gap-2"
                      >
                        Deploy Node <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
               </div>
            </DialogContent>
          </Dialog>

          {/* Cloud regions preview */}
          <div className="mt-16 p-8 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 space-y-3 text-center lg:text-left">
               <h2 className="text-xl font-bold tracking-tight uppercase text-white">Global Nodes</h2>
               <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest leading-relaxed max-w-xs mx-auto lg:mx-0">
                 Leverage our 24 distributed nodes for sub-50ms worldwide data throughput.
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
                  {["N. America", "Europe", "Asia", "M. East"].map(r => (
                    <span key={r} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[8px] font-bold uppercase text-gray-500 tracking-widest">{r}</span>
                  ))}
               </div>
            </div>
            <div className="h-32 w-full lg:w-72 rounded-lg bg-violet-600/5 border border-violet-500/20 flex items-center justify-center relative overflow-hidden group shadow-xl">
                <Globe className="h-14 w-14 text-violet-500/20 animate-pulse transition-transform duration-1000 group-hover:scale-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-violet-400 uppercase tracking-[0.4em] whitespace-nowrap opacity-40">Edge Network</p>
            </div>
          </div>
        </div>
      </div>
    </CloudLayout>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export default CloudPricing;
