import { motion } from "framer-motion";
import { Shield, Zap, Sparkles, Code2, Gamepad2, Box, RefreshCw, Palette } from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

const features = [
  { icon: Shield, title: "Privacy Shield", desc: "Zero telemetry, encrypted DNS, kernel-level tracker blocking baked into every layer of the OS.", color: "from-blue-500 to-cyan-400" },
  { icon: Zap, title: "Fast Performance", desc: "Sub-second app launches and a 3.2s cold boot — written in Rust for maximum throughput.", color: "from-amber-500 to-orange-400" },
  { icon: Sparkles, title: "Modern UI", desc: "Glassmorphism, fluid animations and pixel-perfect typography across every native app.", color: "from-purple-500 to-pink-400" },
  { icon: Code2, title: "Built-in Developer Tools", desc: "Git, Docker, Rust, Node, Python, and a polished terminal — preinstalled and ready.", color: "from-emerald-500 to-teal-400" },
  { icon: Gamepad2, title: "Gaming Ready", desc: "Vulkan, Proton, low-latency scheduler and native controller support out of the box.", color: "from-rose-500 to-red-400" },
  { icon: Box, title: "Secure Sandbox Apps", desc: "Every app runs in an isolated capability container — no surprise permissions.", color: "from-indigo-500 to-blue-400" },
  { icon: RefreshCw, title: "Smart Updates", desc: "Atomic updates with rollback, signed by blockchain — never break your system again.", color: "from-cyan-500 to-blue-400" },
  { icon: Palette, title: "Customizable Desktop", desc: "Themes, layouts, widgets and accent colors — make Black Wall feel like yours.", color: "from-fuchsia-500 to-purple-400" },
];

const BlackwallFeatures = () => (
  <BlackwallLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Features</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Everything you need. <span className="italic text-blue-300">Nothing you don't.</span></h1>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
            Eight pillars of design that make Black Wall OS feel like an upgrade — not a compromise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all"
            >
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-2">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallFeatures;
