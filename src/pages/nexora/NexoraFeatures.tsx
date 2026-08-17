import { motion } from "framer-motion";
import { Zap, Shield, Lock, Puzzle, Sparkles, RefreshCw, Eye, Globe, Layers, Cpu } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const features = [
  { icon: Zap, title: "Quantum Caching", desc: "Proprietary caching engine delivers 40% faster page loads than standard Chromium browsers.", color: "from-amber-500 to-orange-400" },
  { icon: Shield, title: "Ironclad Security", desc: "Every tab is sandboxed at the kernel level. Built-in VPN and tracker blocking come standard.", color: "from-emerald-500 to-teal-400" },
  { icon: Lock, title: "Smart Ad Blocker", desc: "Block ads, trackers, fingerprinters and crypto miners with zero configuration.", color: "from-blue-500 to-cyan-400" },
  { icon: Puzzle, title: "Extensions", desc: "Chrome-compatible Web Extension API. Install your favorites from day one.", color: "from-purple-500 to-pink-400" },
  { icon: Sparkles, title: "Nexora AI", desc: "Native AI sidebar for real-time translation, research summaries, and workspace automation.", color: "from-fuchsia-500 to-purple-400" },
  { icon: RefreshCw, title: "End-to-End Sync", desc: "Encrypted sync for tabs, bookmarks, history and passwords across all your devices.", color: "from-indigo-500 to-blue-400" },
  { icon: Eye, title: "Zero Telemetry", desc: "We don't track you. We don't collect data. We don't sell anything.", color: "from-rose-500 to-red-400" },
  { icon: Globe, title: "Built-in VPN", desc: "Free encrypted VPN over 1500+ servers — premium tier available.", color: "from-cyan-500 to-blue-400" },
  { icon: Layers, title: "Workspaces", desc: "Smart workspaces keep your work, personal and side projects strictly isolated.", color: "from-violet-500 to-purple-400" },
  { icon: Cpu, title: "Tab Suspension", desc: "Inactive tabs sleep automatically — saving 80% RAM compared to Chrome.", color: "from-emerald-500 to-cyan-400" },
];

const NexoraFeatures = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Features</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">
            Everything you need. <span className="italic text-blue-300">Nothing you don't.</span>
          </h1>
          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
            Ten pillars of design that make Nexora feel like an upgrade — not a compromise.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all"
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
  </NexoraLayout>
);

export default NexoraFeatures;
