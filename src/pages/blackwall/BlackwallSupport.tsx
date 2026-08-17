import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Github,
  BookOpen,
  Mail,
  ChevronDown,
  ChevronUp,
  Shield,
  Server,
  Monitor,
  ExternalLink,
  Headphones,
} from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";
import { useState } from "react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const products = [
  {
    icon: Monitor,
    name: "Black Wall OS",
    description: "Desktop & laptop operating system built on a Rust microkernel with blockchain identity.",
    color: "from-blue-600/20 to-indigo-600/10 border-blue-500/20",
    iconColor: "text-blue-400",
    links: [
      { label: "Documentation", to: "/docs/blackwall" },
      { label: "Download", to: "/blackwall/download" },
      { label: "FAQ", to: "/blackwall/faq" },
    ],
  },
  {
    icon: Server,
    name: "Black Wall Server",
    description: "Hardened enterprise server platform with zero-trust networking and immutable OS design.",
    color: "from-purple-600/20 to-blue-600/10 border-purple-500/20",
    iconColor: "text-purple-400",
    links: [
      { label: "Server Docs", to: "/docs/blackwall" },
      { label: "Architecture", to: "/blackwall/architecture" },
      { label: "Security", to: "/blackwall/security" },
    ],
  },
];

const channels = [
  {
    icon: Github,
    label: "GitHub Issues",
    desc: "Report bugs and track features",
    href: "https://github.com/anoneurx/blackwall",
    color: "border-white/10 hover:border-white/25 text-white",
  },
  {
    icon: MessageCircle,
    label: "Community Forum",
    desc: "Ask questions, share tips",
    href: "https://community.anoneurx.com",
    color: "border-green-500/20 hover:border-green-500/40 text-green-400",
  },
  {
    icon: Mail,
    label: "Email Support",
    desc: "security@anoneurx.com",
    href: "mailto:support@anoneurx.com",
    color: "border-amber-500/20 hover:border-amber-500/40 text-amber-300",
  },
  {
    icon: Headphones,
    label: "Enterprise Support",
    desc: "Priority SLA for Server deployments",
    href: "mailto:enterprise@anoneurx.com",
    color: "border-purple-500/20 hover:border-purple-500/40 text-purple-400",
  },
];

const faqs: { q: string; a: string; product: "os" | "server" | "both" }[] = [
  { product: "os", q: "Which hardware is compatible with Black Wall OS?", a: "Black Wall OS supports 64-bit x86_64 and ARM64 systems. Most PCs from 2015 onwards work. NVIDIA GPUs may require manual driver setup post-install." },
  { product: "server", q: "Does Black Wall Server support virtualisation?", a: "Yes. Black Wall Server ships with KVM/QEMU integration and our proprietary container runtime. VMware ESXi and Proxmox bridges are in public beta." },
  { product: "both", q: "How are security updates delivered?", a: "Both products use signed atomic updates distributed over the blockchain-verified update chain. Updates are diff-based, minimising bandwidth." },
  { product: "os", q: "Can I dual-boot Black Wall OS with Windows or Linux?", a: "Dual-boot is fully supported. The installer detects existing partitions. We recommend allocating at least 20 GB for a base install." },
  { product: "server", q: "What does the zero-trust network model mean for my infrastructure?", a: "Every node must prove its identity via cryptographic attestation before sending or receiving traffic — there is no implicit trust even inside your private LAN." },
  { product: "both", q: "Is Black Wall open source?", a: "Core components (microkernel, identity layer, package manager) are open source under AGPL-3.0. Enterprise modules remain proprietary." },
];

const FAQItem = ({ q, a, badge }: { q: string; a: string; badge: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border border-white/[0.07] bg-white/[0.02] backdrop-blur overflow-hidden cursor-pointer"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`shrink-0 text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${
            badge === "both"
              ? "bg-blue-500/10 border-blue-500/25 text-blue-300"
              : badge === "os"
              ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-300"
              : "bg-purple-500/10 border-purple-500/25 text-purple-300"
          }`}>
            {badge === "both" ? "Both" : badge === "os" ? "OS" : "Server"}
          </span>
          <span className="text-sm font-medium text-white">{q}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
      </div>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

const BlackwallSupport = () => (
  <BlackwallLayout>
    <section className="px-4 py-20">
      <div className="container-responsive max-w-6xl space-y-16">

        {/* Hero */}
        <motion.div {...fade()} className="text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400">Support</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold">How can we help?</h1>
          <p className="mt-4 text-sm text-slate-400 max-w-lg mx-auto">
            Find documentation, report issues, or reach the team — for both Black Wall OS and Black Wall Server.
          </p>
        </motion.div>

        {/* Product Cards */}
        <motion.div {...fade(0.1)} className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl border bg-gradient-to-br ${p.color} backdrop-blur-2xl p-7 flex flex-col gap-5`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <p.icon className={`h-5 w-5 ${p.iconColor}`} />
                </div>
                <h2 className="text-lg font-bold">{p.name}</h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
                  >
                    <BookOpen className="h-3 w-3" /> {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Support Channels */}
        <motion.div {...fade(0.15)}>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Headphones className="h-5 w-5 text-blue-400" /> Support Channels
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col gap-3 rounded-xl border bg-white/[0.02] backdrop-blur p-5 hover:bg-white/[0.05] transition group ${c.color}`}
              >
                <c.icon className="h-6 w-6" />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1">
                    {c.label} <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-60 transition" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Security Disclosure Banner */}
        <motion.div {...fade(0.2)} className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6 flex items-start gap-4">
          <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-300">Responsible Disclosure</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Found a security vulnerability in Black Wall OS or Server? Please report privately to{" "}
              <a href="mailto:security@anoneurx.com" className="text-amber-300 hover:underline">
                security@anoneurx.com
              </a>{" "}
              before public disclosure. We respond within 48 hours.
            </p>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fade(0.25)}>
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} badge={f.product} />
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500 text-center">
            More questions?{" "}
            <Link to="/blackwall/faq" className="text-blue-400 hover:underline">
              See the full FAQ →
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  </BlackwallLayout>
);

export default BlackwallSupport;
