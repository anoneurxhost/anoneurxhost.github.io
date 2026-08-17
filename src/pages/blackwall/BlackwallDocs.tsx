import { useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  Rocket,
  Layers,
  Cpu,
  Shield,
  Terminal,
  Settings,
  Search,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import BlackwallLayout from "./BlackwallLayout";

type Section = {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
};

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="my-4 rounded-lg overflow-hidden border border-white/[0.08] bg-black/60">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="text-[10px] uppercase tracking-widest text-slate-500">shell</span>
        <button onClick={copy} className="text-slate-500 hover:text-white transition-colors">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs text-blue-300 font-mono overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
};

const P = ({ children }: any) => <p className="text-sm text-slate-400 leading-relaxed mb-4">{children}</p>;
const H = ({ children }: any) => <h3 className="text-lg font-bold text-white mt-8 mb-3">{children}</h3>;
const UL = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mb-4 text-sm text-slate-400">
    {items.map((i, idx) => (
      <li key={idx} className="flex gap-2">
        <ChevronRight className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <span>{i}</span>
      </li>
    ))}
  </ul>
);

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Book,
    content: (
      <>
        <P>
          Welcome to the Black Wall OS documentation. Black Wall is a modular, security-first operating system
          architecture built in Rust, designed for creators, developers and privacy-focused users.
        </P>
        <H>Why Black Wall?</H>
        <UL items={[
          "Memory-safe Rust microkernel — no buffer overflows, no data races",
          "Capability-based sandboxing for every app, with no ambient authority",
          "Atomic, signed updates with one-click rollback",
          "Zero telemetry — your data never leaves your machine",
          "Native developer tooling: Git, Docker, Rust, Node, Python preinstalled",
        ]} />
        <H>What's in this doc</H>
        <P>
          This documentation covers everything from getting started, to deep-dive architecture details,
          to the security and recovery model. Use the sidebar to navigate.
        </P>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    content: (
      <>
        <H>Download the ISO</H>
        <P>Grab the latest stable release from the download page and verify the SHA256 checksum.</P>
        <CodeBlock code={`# verify checksum on macOS / Linux
shasum -a 256 blackwall-1.0.0.iso

# expected:
# 9f2a4c8e1b7d3f6a5e2c4b8d9f1a3c5e7b2d4f6a8c1e3b5d7f9a2c4e6b8d1f3a`} />
        <H>Create a bootable USB</H>
        <CodeBlock code={`# replace /dev/sdX with your USB device
sudo dd if=blackwall-1.0.0.iso of=/dev/sdX bs=4M status=progress
sync`} />
        <H>Install</H>
        <UL items={[
          "Reboot from the USB stick",
          "Choose 'Install Black Wall OS'",
          "Follow the guided installer (~6 minutes)",
          "Reboot and enjoy",
        ]} />
      </>
    ),
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Layers,
    content: (
      <>
        <H>Layered system structure</H>
        <UL items={[
          "L1 — Hardware abstraction & UEFI bootloader",
          "L2 — Rust microkernel: memory, scheduling, IPC, capabilities",
          "L3 — System services: API server, AI assistant, recovery service",
          "L4 — Application layer: sandboxed user apps and native UI toolkit",
        ]} />
        <H>Modular kernel</H>
        <P>
          The kernel is intentionally tiny. Memory manager, process manager, interrupt handler, syscall
          interface, and driver model are all separate, swappable modules. Crashes in any one of them
          can't take the system down.
        </P>
        <H>Service-based system model</H>
        <UL items={[
          "API Server — RESTful service infrastructure",
          "Assistant Service — AI-style system assistant",
          "Security Service — permission and integrity management",
          "Recovery Service — blockchain-based recovery coordination",
        ]} />
      </>
    ),
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    icon: Cpu,
    content: (
      <>
        <H>Rust (kernel + system services)</H>
        <UL items={[
          "no_std kernel implementation for x86_64 and ARM64",
          "UEFI bootloader written entirely in Rust",
          "Backend microservices for system services",
          "Memory-safe security engine",
        ]} />
        <H>React + TypeScript (system UI)</H>
        <UL items={[
          "React 18 with TypeScript",
          "Zustand for centralized state",
          "Custom modular UI primitives",
          "Vite build system",
          "IPC bridge for kernel communication",
        ]} />
      </>
    ),
  },
  {
    id: "security",
    title: "Security & Blockchain",
    icon: Shield,
    content: (
      <>
        <H>Defense in depth</H>
        <UL items={[
          "Multiple layers of security controls",
          "Least privilege everywhere",
          "Memory safety via Rust ownership",
          "Secure boot — chain of trust from firmware to apps",
        ]} />
        <H>Blockchain recovery mode</H>
        <P>
          Black Wall introduces distributed-ledger principles to OS recovery. Every state change is recorded
          in an append-only log, cryptographically linked, with multiple verification points.
        </P>
        <H>Secure rollback</H>
        <UL items={[
          "Periodic system state snapshots",
          "Cryptographically linked state history",
          "Rollback only to verified states",
          "Complete audit trail of modifications",
        ]} />
      </>
    ),
  },
  {
    id: "cli",
    title: "CLI & Modes",
    icon: Terminal,
    content: (
      <>
        <H>Server & developer mode</H>
        <P>Performance-optimized, headless operation for professional deployments.</P>
        <CodeBlock code={`# enable developer mode
bw mode set developer

# spin up a container
bw container run --image rust:latest --name api`} />
        <H>Assistant mode (SRI)</H>
        <P>
          AI-style assistant operating at the OS level — natural-language commands, system context awareness,
          proactive automation.
        </P>
        <CodeBlock code={`# ask the assistant anything
bw ask "show me the largest files in /home"`} />
      </>
    ),
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Settings,
    content: (
      <>
        <H>System config</H>
        <P>All system configuration lives under <code className="text-blue-300">/etc/blackwall/</code> as TOML files.</P>
        <CodeBlock code={`# /etc/blackwall/system.toml
[kernel]
scheduler = "low_latency"
preempt   = true

[security]
sandbox_default = "strict"
telemetry       = false`} />
        <H>Per-user preferences</H>
        <P>User preferences live under <code className="text-blue-300">~/.config/blackwall/</code> and are sync-friendly.</P>
      </>
    ),
  },
];

const BlackwallDocs = () => {
  const [active, setActive] = useState(sections[0].id);
  const [query, setQuery] = useState("");
  const current = sections.find((s) => s.id === active) || sections[0];

  const filtered = sections.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <BlackwallLayout>
      <section className="px-4 py-12 lg:py-16">
        <div className="container-responsive max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-4">
                <div className="relative mb-4">
                  <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search docs…"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-600 px-2 mb-2">Black Wall OS</div>
                <nav className="space-y-1">
                  {filtered.map((s) => {
                    const Icon = s.icon;
                    const isActive = s.id === active;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                          isActive
                            ? "bg-blue-500/15 text-blue-300 border border-blue-500/20"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                        {s.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-3">
                  <current.icon className="h-3 w-3" />
                  Documentation
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{current.title}</h1>
                <div className="h-px bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent my-6" />
                <div>{current.content}</div>
              </motion.div>

              {/* Prev / Next */}
              <div className="mt-6 flex justify-between gap-3">
                {(() => {
                  const idx = sections.findIndex((s) => s.id === active);
                  const prev = sections[idx - 1];
                  const next = sections[idx + 1];
                  return (
                    <>
                      {prev ? (
                        <button onClick={() => setActive(prev.id)} className="flex-1 text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-blue-500/30 transition-all">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">Previous</div>
                          <div className="text-sm font-semibold text-white mt-1">{prev.title}</div>
                        </button>
                      ) : (
                        <div className="flex-1" />
                      )}
                      {next ? (
                        <button onClick={() => setActive(next.id)} className="flex-1 text-right rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-blue-500/30 transition-all">
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">Next</div>
                          <div className="text-sm font-semibold text-white mt-1">{next.title}</div>
                        </button>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </>
                  );
                })()}
              </div>
            </article>
          </div>
        </div>
      </section>
    </BlackwallLayout>
  );
};

export default BlackwallDocs;
