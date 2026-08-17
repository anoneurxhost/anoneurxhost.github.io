import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, Zap, Activity, ArrowRight, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import roboticsHero from "@/assets/marketing/robotics-hero.jpg";

const services = [
  { icon: Bot, title: "Industrial Robots", desc: "Precision automation for manufacturing." },
  { icon: Cpu, title: "Autonomous Systems", desc: "Self-driving rovers and drones." },
  { icon: Activity, title: "IoT Integration", desc: "Sensor networks and smart factories." },
  { icon: Zap, title: "Custom Hardware", desc: "Bespoke robotic platforms." },
];

const projects = [
  { title: "Warehouse Pilot", desc: "Autonomous picking robots at 50+ DCs.", tag: "Logistics", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop" },
  { title: "AgriBot R3", desc: "Self-driving harvester for vineyards.", tag: "AgriTech", img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&h=400&fit=crop" },
  { title: "MedAssist Arm", desc: "Surgical assist arm with sub-mm precision.", tag: "Medical", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop" },
  { title: "InspectorDrone", desc: "Aerial inspection for energy infrastructure.", tag: "Energy", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop" },
];

const RoboticsSystems = () => (
  <PageTransition>
    <div className="min-h-screen relative">
      <div className="pointer-events-none absolute top-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[160px]" />

      <section className="relative px-4 pt-20 pb-12">
        <div className="container mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-orange-500/10 text-orange-300 border-orange-500/30 text-[10px] mb-3">
              <Sparkles className="w-3 h-3 mr-1.5" /> Robotics Systems
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              Autonomous machines for the{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">physical world</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 mb-6 max-w-lg">
              From factory automation to autonomous drones — we engineer robots that ship.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/contact">Get a Quote <ArrowRight className="w-4 h-4 ml-1.5" /></Link></Button>
              <Button asChild variant="outline" className="border-white/15 text-white hover:bg-white/5"><Link to="/portfolio">View Projects</Link></Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
            <div className="absolute -inset-10 bg-orange-500/20 blur-3xl rounded-full" />
            <img src={roboticsHero} alt="Robotics" width={1280} height={768} className="relative rounded-2xl border border-white/10 shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Robotics Capabilities</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl hover:border-orange-500/30 transition">
                  <CardContent className="p-4">
                    <s.icon className="w-5 h-5 text-orange-400 mb-2" />
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
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Featured Robotics Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="group h-full bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl rounded-2xl overflow-hidden hover:border-orange-500/30 transition">
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
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Need a custom robotic platform?</h2>
          <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/contact">Start Your Project</Link></Button>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default RoboticsSystems;
