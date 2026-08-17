import { motion } from "framer-motion";
import { Feather, Lock, Zap, Minimize2 } from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

const missions = [
  { icon: Feather, title: "Freedom", desc: "Open source from the kernel up. Yours to inspect, fork, and improve.", color: "from-blue-500 to-cyan-400" },
  { icon: Lock, title: "Security", desc: "Memory-safe Rust core, sandboxed apps and signed atomic updates.", color: "from-emerald-500 to-teal-400" },
  { icon: Zap, title: "Performance", desc: "Engineered to fly on modest hardware while feeling instant on any.", color: "from-amber-500 to-orange-400" },
  { icon: Minimize2, title: "Simplicity", desc: "No bloat. No tracking. Just the tools you need, beautifully arranged.", color: "from-purple-500 to-pink-400" },
];

const BlackwallAbout = () => (
  <BlackwallLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Our Story</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">About <span className="italic text-blue-300">Black Wall</span></h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 mb-12 space-y-6 text-slate-300">
          <p className="text-lg leading-relaxed">
            Black Wall OS was created to build a next-generation secure and minimal operating system for
            <span className="text-white font-semibold"> creators, developers, gamers, and privacy-focused users</span>.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            We grew tired of choosing between performance and privacy, beauty and freedom, simplicity and power.
            So we started over — from a Rust microkernel up — and designed every layer around four principles:
            freedom, security, performance and simplicity.
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            Today, Black Wall is a full desktop operating system used by thousands across the globe.
            It's free, open source, community-driven and crafted with obsessive attention to detail.
          </p>
        </motion.div>

        <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {missions.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6 hover:border-blue-500/30 transition-all"
            >
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                <m.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-1.5">{m.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallAbout;
