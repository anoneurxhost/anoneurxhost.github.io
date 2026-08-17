import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor,
  Server,
  Download,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MemoryStick,
  HardDrive,
  Cpu,
  Globe,
  Usb,
  BookOpen,
} from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

// ─── Black Wall OS ────────────────────────────────────────────────
const osRequirements = [
  { icon: MemoryStick, label: "RAM", value: "4 GB minimum · 8 GB recommended" },
  { icon: HardDrive, label: "Storage", value: "20 GB free disk space" },
  { icon: Cpu, label: "CPU", value: "64-bit x86_64 or ARM64" },
  { icon: Globe, label: "Network", value: "Optional — for updates" },
];

const osSteps = [
  { step: "01", title: "Download the ISO", desc: "Grab the latest verified ISO from the download page." },
  { step: "02", title: "Flash to USB", desc: "Use Balena Etcher, Rufus, or dd to write the image to a USB drive (≥ 4 GB)." },
  { step: "03", title: "Boot & Install", desc: "Restart, select your USB drive in BIOS/UEFI boot order, then follow the graphical installer." },
  { step: "04", title: "First Login", desc: "Create your identity on the blockchain identity layer and set up your user account." },
];

// ─── Black Wall Server ────────────────────────────────────────────
const serverRequirements = [
  { icon: MemoryStick, label: "RAM", value: "8 GB minimum · 32 GB recommended" },
  { icon: HardDrive, label: "Storage", value: "40 GB OS partition + data drives" },
  { icon: Cpu, label: "CPU", value: "64-bit x86_64 server-grade (IPMI recommended)" },
  { icon: Globe, label: "Network", value: "1 GbE minimum · 10 GbE recommended" },
];

const serverSteps = [
  { step: "01", title: "Obtain Server ISO", desc: "Download the Black Wall Server ISO — separate from the desktop edition." },
  { step: "02", title: "Boot from Media", desc: "Write to USB or mount in IPMI virtual media and boot from it." },
  { step: "03", title: "Partitioning", desc: "Choose guided or manual partitioning. ZFS RAID is supported out of the box." },
  { step: "04", title: "Network & Identity", desc: "Assign a static IP, configure zero-trust identity attestation, and set the admin key pair." },
  { step: "05", title: "Post-Install Hardening", desc: "Run `bwctl harden` to apply CIS Benchmark profiles and generate the first signed update snapshot." },
];

const ReqCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <li className="flex items-start gap-3">
    <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4 text-blue-300" />
    </div>
    <div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xs text-slate-500">{value}</div>
    </div>
  </li>
);

const StepCard = ({ step, title, desc, color }: { step: string; title: string; desc: string; color: string }) => (
  <div className="flex gap-4">
    <div className={`text-2xl font-black font-mono ${color} leading-none pt-0.5 w-8 shrink-0`}>{step}</div>
    <div>
      <div className="text-sm font-semibold text-white mb-1">{title}</div>
      <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
    </div>
  </div>
);

const BlackwallInstall = () => (
  <BlackwallLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl space-y-20">

        {/* Hero */}
        <motion.div {...fade()} className="text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Installation</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">Get Started</h1>
          <p className="mt-4 text-sm text-slate-400 max-w-lg mx-auto">
            Step-by-step installation guides for both Black Wall OS and Black Wall Server editions.
          </p>
        </motion.div>

        {/* ── Black Wall OS Section ── */}
        <motion.div {...fade(0.1)} className="space-y-8">
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
              <Monitor className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Black Wall OS</h2>
              <p className="text-xs text-slate-500">Desktop &amp; laptop edition</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6">
              <h3 className="text-base font-bold mb-5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-400" /> System Requirements
              </h3>
              <ul className="space-y-4">
                {osRequirements.map((r) => <ReqCard key={r.label} {...r} />)}
              </ul>
            </div>

            {/* Steps */}
            <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 to-transparent backdrop-blur p-6">
              <h3 className="text-base font-bold mb-6 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-indigo-400" /> Installation Steps
              </h3>
              <div className="space-y-6">
                {osSteps.map((s) => <StepCard key={s.step} {...s} color="text-indigo-400" />)}
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="rounded-xl border border-indigo-500/15 bg-indigo-500/[0.04] p-5 flex items-start gap-3">
            <Usb className="h-5 w-5 text-indigo-300 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="text-indigo-300 font-semibold">Dual-boot tip:</span> The installer auto-detects Windows and Linux partitions. Leave at least 20 GB unallocated and the installer will offer to create a Black Wall partition alongside your existing OS.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/blackwall/download"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-semibold transition"
            >
              <Download className="h-4 w-4" /> Download Black Wall OS
            </Link>
            <a
              href="https://docs.anoneurx.com/blackwall/install"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition"
            >
              <BookOpen className="h-4 w-4" /> Full Docs <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </motion.div>

        {/* ── Black Wall Server Section ── */}
        <motion.div {...fade(0.15)} className="space-y-8">
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-4">
            <div className="h-9 w-9 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
              <Server className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Black Wall Server</h2>
              <p className="text-xs text-slate-500">Enterprise server edition</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6">
              <h3 className="text-base font-bold mb-5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-400" /> System Requirements
              </h3>
              <ul className="space-y-4">
                {serverRequirements.map((r) => <ReqCard key={r.label} {...r} />)}
              </ul>
            </div>

            {/* Steps */}
            <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-600/10 to-transparent backdrop-blur p-6">
              <h3 className="text-base font-bold mb-6 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-purple-400" /> Installation Steps
              </h3>
              <div className="space-y-6">
                {serverSteps.map((s) => <StepCard key={s.step} {...s} color="text-purple-400" />)}
              </div>
            </div>
          </div>

          {/* Post-install commands */}
          <div className="rounded-xl border border-purple-500/15 bg-purple-500/[0.04] p-6">
            <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4" /> Essential First Commands
            </h3>
            <div className="space-y-2 font-mono text-xs">
              {[
                ["bwctl harden", "Apply security hardening profiles"],
                ["bwctl identity init", "Initialise node identity on the ledger"],
                ["bwctl network configure", "Set up zero-trust mesh networking"],
                ["bwctl update check", "Pull latest signed OS updates"],
              ].map(([cmd, note]) => (
                <div key={cmd} className="flex items-center gap-3">
                  <code className="text-purple-300 bg-purple-900/30 px-2 py-1 rounded">{cmd}</code>
                  <span className="text-slate-500 text-[11px]">— {note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified checkmarks */}
          <div className="grid sm:grid-cols-3 gap-4">
            {["Signed atomic updates", "Zero-trust by default", "CIS Benchmark hardened"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" /> {f}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/blackwall/server"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-sm font-semibold transition"
            >
              <Server className="h-4 w-4" /> Black Wall Server <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/blackwall/architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition"
            >
              <BookOpen className="h-4 w-4" /> Architecture
            </Link>
          </div>
        </motion.div>

        {/* Support Banner */}
        <motion.div {...fade(0.2)} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Need help with installation?</h3>
            <p className="text-xs text-slate-500 mt-1">Visit our support page for community help, documentation, and enterprise contact.</p>
          </div>
          <Link
            to="/blackwall/support"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-sm font-semibold transition"
          >
            Go to Support <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallInstall;
