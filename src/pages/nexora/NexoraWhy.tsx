import { motion } from "framer-motion";
import { Trophy, Zap, Shield, Sparkles, Lock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import NexoraLayout from "./NexoraLayout";

const reasons = [
  { icon: Zap, title: "Faster than Chrome", desc: "40% faster page loads, 80% less RAM, 30% faster startup." },
  { icon: Shield, title: "Private by default", desc: "Zero telemetry, ad blocker, encrypted DNS, sandboxed tabs." },
  { icon: Sparkles, title: "AI built-in", desc: "Translate, summarize, and automate — natively, with no setup." },
  { icon: Lock, title: "Encrypted sync", desc: "Your data is yours — encrypted with a key only you hold." },
  { icon: Heart, title: "Made by humans", desc: "Built by an open community, not a faceless ad company." },
  { icon: Trophy, title: "Free forever", desc: "No premium tier, no upsell, no asterisks." },
];

const NexoraWhy = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
            <Trophy className="h-5 w-5 text-blue-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Why Nexora</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Six reasons to <span className="italic text-blue-300">switch.</span></h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                <r.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-2">{r.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/nexora/switch" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
            Make the switch
          </Link>
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraWhy;
