import SectionHeading from "./components/SectionHeading";
import {
  Terminal,
  HardDrive,
  Cpu,
  Activity,
  Wrench,
  FileText,
  Network,
  ShieldCheck,
  Lock,
  KeyRound,
} from "lucide-react";

const featureSections = [
  {
    title: "Terminal",
    icon: Terminal,
    desc: "Full interactive server shell from your browser with tab completion, session persistence and multi-window support.",
  },
  {
    title: "Files",
    icon: HardDrive,
    desc: "Browse, edit, upload and manage server files without leaving Connect. Supports text and binary viewing.",
  },
  {
    title: "Processes",
    icon: Cpu,
    desc: "Inspect running processes, view resource consumption and manage process lifecycle directly from the dashboard.",
  },
  {
    title: "Services",
    icon: Wrench,
    desc: "Control system services — start, stop, restart and check status for any managed unit.",
  },
  {
    title: "System Metrics",
    icon: Activity,
    desc: "Real-time CPU, memory, disk and network statistics with historical charts for capacity planning.",
  },
  {
    title: "Logs",
    icon: FileText,
    desc: "Inspect and stream server logs with filtering, search and export capabilities.",
  },
  {
    title: "Network",
    icon: Network,
    desc: "Understand your server's network state — interfaces, sockets, connections and firewall rules.",
  },
  {
    title: "Agent Management",
    icon: Lock,
    desc: "Monitor Agent health, update the runtime and manage server identities from the dashboard.",
  },
];

const ConnectFeatures = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to manage servers."
          description="Each capability is exposed through the secure Agent connection — no partial tooling, no workarounds."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureSections.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/5 hover:border-blue-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:shadow-none dark:hover:border-blue-500/30 dark:hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 ring-1 ring-blue-200/60 dark:border dark:border-blue-500/20 dark:bg-blue-500/10 dark:ring-0">
                <f.icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Security"
          title="Security is built into every feature."
          description="Every operation runs through the encrypted, authenticated and capability-controlled Agent session."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <ShieldCheck className="h-8 w-8 text-blue-700 dark:text-blue-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Encrypted Sessions</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">All terminal and file traffic is encrypted in transit.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <KeyRound className="h-8 w-8 text-blue-700 dark:text-blue-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Server Identity</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Each server has a persistent cryptographic identity.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <Activity className="h-8 w-8 text-blue-700 dark:text-blue-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Least Privilege</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Operations are scoped to the session's capabilities.</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <Lock className="h-8 w-8 text-blue-700 dark:text-blue-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Audit Logs</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Administrative actions are recorded and verifiable.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default ConnectFeatures;