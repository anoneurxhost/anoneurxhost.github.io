import { motion } from "framer-motion";
import { Shield, Lock, Box, Eye, FileCheck, Key } from "lucide-react";
import NexoraLayout from "./NexoraLayout";

const pillars = [
  { icon: Box, title: "Sandbox per Tab", desc: "Every tab runs in an isolated process with kernel-level confinement.", color: "from-blue-500 to-cyan-400" },
  { icon: Lock, title: "Site Isolation", desc: "Cross-site scripts can never read each other's data.", color: "from-emerald-500 to-teal-400" },
  { icon: Eye, title: "Permission Prompts", desc: "Camera, microphone, location and notifications all require explicit per-site approval.", color: "from-purple-500 to-pink-400" },
  { icon: Key, title: "Encrypted Sync", desc: "End-to-end encryption with a key only you hold.", color: "from-indigo-500 to-blue-400" },
  { icon: FileCheck, title: "Signed Releases", desc: "Every binary is signed with our GPG key — verify before you install.", color: "from-amber-500 to-orange-400" },
  { icon: Shield, title: "Zero-Day Response", desc: "Critical patches ship within 48 hours of disclosure, every time.", color: "from-rose-500 to-red-400" },
];

const NexoraSecurity = () => (
  <NexoraLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Shield className="h-5 w-5 text-emerald-300" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400">Security</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Secure <span className="italic text-emerald-300">by design.</span></h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4`}>
                <p.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-bold mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Bug bounty program</h3>
          <p className="text-sm text-slate-400 mb-5">Find a vulnerability? We pay up to $25,000 for critical disclosures.</p>
          <a href="mailto:security@nexora.app" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-all">security@nexora.app</a>
        </div>
      </div>
    </section>
  </NexoraLayout>
);

export default NexoraSecurity;
