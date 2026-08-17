import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Shield, Cpu, Terminal, ArrowRight, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import osHero from "@/assets/marketing/os-hero.jpg";

const services = [
  { icon: Monitor, title: "Custom Distros", desc: "Tailored Linux distributions for any hardware." },
  { icon: Shield, title: "Hardened Kernels", desc: "Security-first kernel configurations." },
  { icon: Cpu, title: "Embedded RTOS", desc: "Real-time systems for IoT and industrial." },
  { icon: Terminal, title: "DevOps Tooling", desc: "CI/CD pipelines and deployment automation." },
];

const projects = [
  { title: "Black Wall OS", desc: "Privacy-first OS for hostile environments.", tag: "Security", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop" },
  { title: "EdgeOS Lite", desc: "70 MB OS optimized for edge inference.", tag: "Edge", img: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&h=400&fit=crop" },
  { title: "MedRTOS", desc: "FDA-cleared RTOS for cardiac devices.", tag: "Medical", img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600&h=400&fit=crop" },
  { title: "AeroBoot", desc: "Bootloader & OS for aerospace systems.", tag: "Aerospace", img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&h=400&fit=crop" },
];

const OperatingSystems = () => (
  <PageTransition>
    <div className="min-h-screen relative">
      <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />

      <section className="relative px-4 pt-20 pb-12">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 text-[10px] mb-3">
              <Sparkles className="w-3 h-3 mr-1.5" /> Operating Systems
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Operating systems engineered for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">extreme conditions</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-6 max-w-lg">
              From hardened kernels to bespoke distros — we build the OS layer your product depends on.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/contact">Get a Quote <ArrowRight className="w-4 h-4 ml-1.5" /></Link></Button>
              <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5"><Link to="/blackwall">Explore Black Wall</Link></Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
            <div className="absolute -inset-10 bg-cyan-500/20 blur-3xl rounded-full" />
            <img src={osHero} alt="OS interface" width={1280} height={768} className="relative rounded-2xl border border-white/10 shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">OS Capabilities</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-cyan-500/30 transition">
                  <CardContent className="p-4">
                    <s.icon className="w-5 h-5 text-cyan-400 mb-2" />
                    <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-[11px] text-gray-400">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Featured OS Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="group h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl overflow-hidden hover:border-cyan-500/30 transition">
                  <div className="relative h-32 overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white border-white/15 text-[9px]">{p.tag}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Need a custom OS?</h2>
          <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/contact">Start Your Project</Link></Button>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default OperatingSystems;
