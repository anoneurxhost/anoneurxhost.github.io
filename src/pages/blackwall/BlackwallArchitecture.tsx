import { motion } from "framer-motion";
import { Layers, Cpu, HardDrive, Shield, Network, Box, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlackwallLayout from "./BlackwallLayout";

const layers = [
  { icon: Box, title: "Application Layer", desc: "Sandboxed user apps, native UI toolkit, IPC.", color: "from-blue-500 to-cyan-400" },
  { icon: Network, title: "System Services", desc: "REST API server, AI assistant, recovery service.", color: "from-purple-500 to-pink-400" },
  { icon: Cpu, title: "Microkernel", desc: "Rust kernel: memory, scheduling, IPC, capabilities.", color: "from-emerald-500 to-teal-400" },
  { icon: HardDrive, title: "Hardware Abstraction", desc: "Drivers, HAL, UEFI bootloader.", color: "from-amber-500 to-orange-400" },
];

const principles = [
  { title: "Memory Safety", desc: "Rust ownership model eliminates entire vuln classes." },
  { title: "Capability-Based", desc: "Apps explicitly request narrow rights — no ambient authority." },
  { title: "Microkernel Design", desc: "Tiny trusted core; everything else runs in user space." },
  { title: "Modular by Default", desc: "Every subsystem is a swappable, versioned module." },
];

const BlackwallArchitecture = () => (
  <BlackwallLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Layers className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Architecture</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            Built layer by layer. <span className="italic text-blue-300">Built right.</span>
          </h1>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
            Black Wall is a modular, microkernel-based OS designed from the bootloader up for safety, modularity and clarity.
          </p>
        </motion.div>

        {/* Layer Stack */}
        <div className="space-y-3 mb-16">
          {layers.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-5 hover:border-blue-500/30 transition-all"
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center flex-shrink-0`}>
                <l.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold">{l.title}</h3>
                <p className="text-xs text-slate-500">{l.desc}</p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-600">L{layers.length - i}</span>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <h2 className="text-2xl font-bold mb-6 text-center">Design Principles</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-300" />
                <h3 className="text-base font-bold">{p.title}</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <Link to="/docs/blackwall" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
          Read the full architecture docs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallArchitecture;
