import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Server,
  Terminal,
  HardDrive,
  Activity,
  Lock,
  Cpu,
  Network,
  Wrench,
  FileText,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import StackDiagram, { StackStep } from "./components/StackDiagram";
import CapabilityCard from "./components/CapabilityCard";
import backgroundVideo from "@/assets/blacklink/background.mp4";

const heroSteps: StackStep[] = [
  { id: "dashboard", title: "Connect Dashboard", description: "Your control center in the browser.", icon: Activity },
  { id: "connection", title: "Encrypted Connection", description: "TLS-secured tunnel between you and your server.", icon: Lock },
  { id: "agent", title: "Connect Agent", description: "Lightweight server-side runtime. Self-hosted.", icon: Server },
  { id: "linux", title: "Linux Server", description: "The infrastructure you manage.", icon: Cpu },
];

const capabilities = [
  { icon: Terminal, title: "Remote Terminal", description: "Full interactive server shell from your browser." },
  { icon: HardDrive, title: "File Management", description: "Manage server files without leaving Connect." },
  { icon: Activity, title: "System Monitoring", description: "CPU, memory, storage, network and uptime in one place." },
  { icon: Cpu, title: "Process Management", description: "Inspect and manage running processes." },
  { icon: Wrench, title: "Services", description: "Control system services directly from Connect." },
  { icon: FileText, title: "Logs", description: "Inspect and stream server logs." },
  { icon: Network, title: "Network", description: "Understand your server's network state." },
  { icon: ShieldCheck, title: "Security", description: "Authentication, permissions, encrypted sessions and auditability." },
];

const securitySteps: StackStep[] = [
  { id: "identity", title: "Identity", description: "Cryptographic server identity.", icon: Lock },
  { id: "auth", title: "Authentication", description: "Only authenticated clients manage the server.", icon: ShieldCheck },
  { id: "authorization", title: "Authorization", description: "Capability-based access control.", icon: ShieldCheck },
  { id: "session", title: "Encrypted Session", description: "All traffic protected in transit.", icon: Lock },
  { id: "agent2", title: "Connect Agent", description: "Runs on the user's server.", icon: Server },
  { id: "linux2", title: "Linux", description: "The underlying system.", icon: Cpu },
];

const howItSteps: StackStep[] = [
  { id: "install", title: "Install", description: "Install the Agent on the server.", icon: ArrowUpRight },
  { id: "identity2", title: "Identity", description: "The Agent establishes a cryptographic server identity.", icon: Lock },
  { id: "connect", title: "Connect", description: "The server establishes a secure connection.", icon: Network },
  { id: "authenticate", title: "Authenticate", description: "The user authenticates the server and session.", icon: ShieldCheck },
  { id: "manage", title: "Manage", description: "The dashboard communicates with the Agent.", icon: Activity },
  { id: "audit", title: "Audit", description: "Administrative actions can be tracked.", icon: FileText },
];

const ConnectLanding = () => (
  <div className="relative flex flex-col">
    {/* Full-viewport background video (home page only) */}
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        src={backgroundVideo}
      />
      {/* Subtle readability overlay so text stays legible without blacking out the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
    </div>
      {/* ===================== HERO ===================== */}
      <section className="relative z-10 pt-20 pb-16 overflow-hidden px-4 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
      <div className="container-responsive relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <MotionFadeUp>
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                Secure Infrastructure Management
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
                Your servers. One secure connection.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-400 sm:text-xl">
                Manage Linux infrastructure from anywhere with Anoneurx Connect — the secure control layer between you and your servers.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/blacklink/dashboard"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                >
                  Open Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/blacklink/agent"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 font-semibold text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                >
                  Install Agent <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionFadeUp>

          {/* Right visualization */}
          <MotionFadeUp delay={0.15}>
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <StackDiagram steps={heroSteps} />
              {/* Ambient glow behind */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-600/[0.08] to-violet-600/[0.06] blur-2xl" />
            </div>
          </MotionFadeUp>
        </div>
      </div>
    </section>

    {/* ===================== CAPABILITIES ===================== */}
    <section className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything you need to manage infrastructure."
          description="Full-featured server control through a single secure connection — terminal, files, processes, services, logs, network and security."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <CapabilityCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>

    {/* ===================== AGENT ===================== */}
    <section className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Agent"
          title="One lightweight agent. Your server becomes connected."
          description="Install the Anoneurx Connect Agent on your Linux server. It establishes identity, authenticates, and exposes your infrastructure to the dashboard."
        />
        <div className="mt-12 rounded-xl border border-white/[0.08] bg-[#060708] p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">1</span>
                <p className="text-sm text-slate-300">Install the Anoneurx Connect Agent on your server.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">2</span>
                <p className="text-sm text-slate-300">The Agent establishes its cryptographic server identity.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">3</span>
                <p className="text-sm text-slate-300">Authenticate the server through the dashboard.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">4</span>
                <p className="text-sm text-slate-300">Manage the server from Connect — terminal, files, processes and more.</p>
              </div>
            </div>
            <div className="shrink-0 lg:w-80">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Will be released soon
              </p>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Anoneurx Black Link Agent</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                    The agent is in final development. Installation will be a single verified command once released.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                  Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================== SECURITY ===================== */}
    <section id="security" className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Security"
          title="Security isn't an add-on. It's the architecture."
          description="Every layer of the stack is designed around trust: identity, authentication, authorization, encrypted sessions and auditability."
        />
        <div className="mt-12">
          <StackDiagram steps={securitySteps} />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Encrypted Sessions</p>
            <p className="mt-1 text-xs text-slate-400">Management traffic is protected in transit with TLS.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Capability-Based Access</p>
            <p className="mt-1 text-xs text-slate-400">Operations are explicitly authorized per session.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Credential Protection</p>
            <p className="mt-1 text-xs text-slate-400">No plaintext password storage or transmission.</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-sm font-semibold text-white">Auditability</p>
            <p className="mt-1 text-xs text-slate-400">Administrative actions are recorded for accountability.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ===================== HOW IT WORKS ===================== */}
    <section id="how-it-works" className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="How It Works"
          title="From install to management in six steps."
          description="The complete flow from bootstrapping a server to managing it through the dashboard."
        />
        <div className="mt-12 max-w-2xl mx-auto">
          <StackDiagram steps={howItSteps} />
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/blacklink/how-it-works"
            className="inline-flex items-center gap-2 font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            See how Connect works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* ===================== INFRASTRUCTURE + BLACK WALL + DEVELOPER ===================== */}
    <section className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive space-y-16 lg:space-y-24">
        <div>
          <SectionHeading
            eyebrow="Infrastructure"
            title="Built for real servers."
            description="Anoneurx Connect is designed for virtual machines, cloud servers, dedicated hardware, and development machines running Linux."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {["VPS", "Cloud Servers", "Dedicated Servers", "Private Infrastructure", "Development Machines", "Black Wall"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Ecosystem"
            title="Built for the infrastructure you are building next."
            description="Anoneurx Connect is designed to eventually work closely with the rest of the Anoneurx platform and Black Wall."
          />
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/blackwall" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]">
              Explore Black Wall <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/cloud" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]">
              Anoneurx Cloud <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Developer Experience"
            title="Built for people who actually manage servers."
            description="Terminal access, server metrics, logs, services, processes, files and network information — all in one secure connection."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Terminal", "Server Metrics", "Logs", "Services", "Processes", "Files", "Network Info", "Automation-Ready"].map((f) => (
              <div key={f} className="flex items-center gap-2 rounded-lg bg-white/[0.02] px-3 py-2.5 text-sm text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ===================== FINAL CTA ===================== */}
    <section className="relative py-16 px-4 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent" />
      <div className="container-responsive relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Connect to your infrastructure.</h2>
        <p className="mt-4 text-lg text-slate-400">
          Your server is already powerful. Anoneurx Connect gives you a secure interface to manage it.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/blacklink/dashboard"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500"
          >
            Open Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blacklink/agent"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-6 font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >
            Install Agent <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

// Lightweight motion-fade wrapper respecting prefers-reduced-motion
function MotionFadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`transition-opacity duration-700 ease-out motion-reduce:opacity-100 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default ConnectLanding;