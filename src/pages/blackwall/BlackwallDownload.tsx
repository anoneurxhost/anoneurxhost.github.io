import { motion } from "framer-motion";
import { Download, Copy, Check, HardDrive, Cpu, MemoryStick, ShieldCheck, Globe, Calendar } from "lucide-react";
import { useState } from "react";
import BlackwallLayout from "./BlackwallLayout";
import { SocialOverlay } from "@/components/SocialOverlay";

const versions = [
  { v: "1.0.0", date: "2026-04-15", codename: "Obsidian", current: true, notes: "Initial stable release with Rust microkernel and blockchain identity layer." },
  { v: "0.9.4", date: "2026-03-02", codename: "Onyx RC4", current: false, notes: "Hardened sandbox & Vulkan gaming support." },
];

const requirements = [
  { icon: MemoryStick, label: "RAM", value: "4 GB minimum (8 GB recommended)" },
  { icon: HardDrive, label: "Storage", value: "20 GB free disk space" },
  { icon: Cpu, label: "CPU", value: "64-bit x86_64 / ARM64" },
  { icon: Globe, label: "Network", value: "Optional, online updates" },
];

const checksum = "9f2a4c8e1b7d3f6a5e2c4b8d9f1a3c5e7b2d4f6a8c1e3b5d7f9a2c4e6b8d1f3a";

const BlackwallDownload = () => {
  const [copied, setCopied] = useState(false);
  const [showSocialOverlay, setShowSocialOverlay] = useState(false);
  const copy = () => { navigator.clipboard.writeText(checksum); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <BlackwallLayout>
      <SocialOverlay isOpen={showSocialOverlay} onClose={() => setShowSocialOverlay(false)} />
      <section className="px-4 py-20">
        <div className="container-responsive max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Download</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Get Black Wall OS</h1>
            <p className="mt-4 text-sm text-slate-500 max-w-lg mx-auto">
              Free forever. Verified releases. Lightning-fast mirrors worldwide.
            </p>
          </motion.div>

          {/* Latest Stable Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-transparent backdrop-blur-2xl p-8 md:p-10 mb-8"
          >
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-[10px] uppercase tracking-widest">
              Latest Stable
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-bold">v1.0.0</h2>
                  <span className="text-xs text-slate-400">"Obsidian"</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                  64-bit ISO image, ~1.2 GB. Compatible with most modern desktop and laptop systems.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button disabled className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600/50 text-white/70 text-sm font-semibold cursor-not-allowed transition-all">
                    Coming Soon
                  </button>
                  <button onClick={() => setShowSocialOverlay(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition-all">
                    To Stay Update Follow Us!
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> SHA256 Checksum
                  </span>
                  <button onClick={copy} className="text-slate-400 hover:text-white">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <code className="block text-[10px] font-mono text-blue-300/80 break-all leading-relaxed">{checksum}</code>
              </div>
            </div>
          </motion.div>

          {/* System Requirements */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <h3 className="text-lg font-bold mb-5">System Requirements</h3>
              <ul className="space-y-4">
                {requirements.map((r) => (
                  <li key={r.label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <r.icon className="h-4 w-4 text-blue-300" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.label}</div>
                      <div className="text-xs text-slate-500">{r.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-6">
              <h3 className="text-lg font-bold mb-5">Release Notes — v1.0.0</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2"><span className="text-blue-400">+</span> First stable release of the Rust microkernel</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Native blockchain identity & signed updates</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Capability-based sandbox for all apps</li>
                <li className="flex gap-2"><span className="text-blue-400">+</span> Vulkan + Proton gaming layer</li>
                <li className="flex gap-2"><span className="text-emerald-400">~</span> Improved boot time by 38%</li>
                <li className="flex gap-2"><span className="text-amber-400">!</span> Known issue: NVIDIA drivers require manual install</li>
              </ul>
            </div>
          </div>

          {/* Version Timeline */}
          <h3 className="text-lg font-bold mb-5">Version History</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {versions.map((v) => (
              <div
                key={v.v}
                className={`relative rounded-xl border p-5 backdrop-blur-2xl transition-all hover:border-blue-500/30 ${
                  v.current ? "border-blue-500/30 bg-blue-500/[0.04]" : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold">{v.v}</span>
                  {v.current && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-[9px] uppercase tracking-widest">Current</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mb-1">{v.codename}</div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-600 mb-3">
                  <Calendar className="h-3 w-3" /> {v.date}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{v.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BlackwallLayout>
  );
};

export default BlackwallDownload;
