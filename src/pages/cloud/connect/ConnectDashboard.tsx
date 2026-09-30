import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Cpu,
  Database,
  Download,
  Gauge,
  HardDrive,
  HeartPulse,
  ListChecks,
  Loader2,
  Lock,
  MemoryStick,
  Power,
  Radar,
  RefreshCw,
  RotateCw,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useConnectSession } from "./ConnectSession";
import { connectApi, securityApi } from "./api";
import { useAsyncData } from "./useConnectData";
import { useRealtimeMetrics } from "./useRealtimeConnect";
import type { Metric, SecurityStatus } from "./api";
import DemoBanner from "./DemoBanner";

const METRIC_META: Record<string, LucideIcon> = {
  cpu: Cpu,
  mem: MemoryStick,
  disk: HardDrive,
  net: Activity,
  users: Users,
  svc: ListChecks,
  health: HeartPulse,
  load: Gauge,
};

const toneDot: Record<Metric["tone"], string> = {
  cyan: "bg-[var(--cc-accent)]",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

const toneBar: Record<Metric["tone"], string> = {
  cyan: "bg-[var(--cc-accent)]",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

const toneIcon: Record<Metric["tone"], string> = {
  cyan: "text-[var(--cc-accent)]",
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
};

type EventStatus = "success" | "warning" | "failure" | "info";

const eventStatus = (text: string): EventStatus => {
  const t = text.toLowerCase();
  if (/(failed|failure|error|denied|refused|critical|breach)/.test(t)) return "failure";
  if (/(warning|warn|slow|draining|threshold)/.test(t)) return "warning";
  if (/^(success|ok\b|enabled|completed|connected|synced|updated|verified|removed|created)/.test(t)) return "success";
  return "info";
};

const eventDot: Record<EventStatus, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  failure: "bg-red-500",
  info: "bg-[var(--cc-muted-2)]",
};

const ConnectDashboard = () => {
  const { server, disconnect } = useConnectSession();
  const navigate = useNavigate();

  const { data, mode, loading, refresh } = useAsyncData(() => connectApi.metrics(), []);
  const { frame, stream } = useRealtimeMetrics(Boolean(server));
  const live = stream.status === "live";

  // Prefer the live WebSocket frame; fall back to the one-shot REST fetch.
  const metrics = live && frame ? frame.metrics : data?.metrics;
  const activity = live && frame ? frame.activity : data?.activity;

  const sec = useAsyncData<SecurityStatus>(() => securityApi.posture(), []);
  const secLive = sec.mode === "live";

  const power = async (action: "reboot" | "shutdown") => {
    await connectApi.power(action);
    if (action === "shutdown") {
      disconnect();
      toast.success("Shutdown signal sent — session closed");
      navigate("/blacklink/dashboard");
    } else {
      toast.success("Reboot signal sent");
      setTimeout(refresh, 800);
    }
  };

  const quickActions = [
    { label: "Terminal", desc: "Open the live shell", icon: Terminal, onClick: () => navigate("/blacklink/dashboard/terminal") },
    { label: "Discover", desc: "Scan services & resources", icon: Radar, onClick: () => navigate("/blacklink/dashboard/discover") },
    { label: "Updates", desc: "Check for updates", icon: Download, onClick: () => navigate("/blacklink/dashboard/updates") },
    { label: "Backups", desc: "View backup snapshots", icon: Database, onClick: () => navigate("/blacklink/dashboard/backups") },
  ];

  const streamStatus =
    stream.status === "live"
      ? { label: "Live", cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 ring-emerald-500/30", dot: "bg-emerald-500" }
      : stream.status === "connecting"
      ? { label: "Connecting…", cls: "text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 ring-cyan-500/30", dot: "bg-[var(--cc-accent)] animate-pulse" }
      : stream.status === "offline"
      ? { label: "Reconnecting…", cls: "text-amber-600 dark:text-amber-400 bg-amber-500/10 ring-amber-500/30", dot: "bg-amber-500 animate-pulse" }
      : { label: "Stream idle", cls: "text-[var(--cc-muted)] bg-[var(--cc-surface-2)] ring-[var(--cc-border)]", dot: "bg-[var(--cc-muted-2)]" };

  const findByKey = (key: string) => (metrics ?? []).find((m) => m.key === key);
  const health = findByKey("health");
  const uptime = health?.detail ?? "—";

  const sysRows = ["cpu", "mem", "disk", "net", "load"].map((key) => ({
    key,
    icon: METRIC_META[key] ?? Gauge,
    m: findByKey(key),
  }));

  const secRows = [
    {
      label: "SSH hardening",
      value: secLive && sec.data ? (sec.data.ssh.password_authentication ? "Password login on" : "Password login off") : null,
      tone: secLive && sec.data ? (sec.data.ssh.password_authentication ? "warn" : "ok") : "neutral",
    },
    {
      label: "Firewall",
      value: secLive && sec.data ? `${sec.data.firewall.enabled ? "Active" : "Inactive"} · ${sec.data.firewall.rules} rules` : null,
      tone: secLive && sec.data ? (sec.data.firewall.enabled ? "ok" : "warn") : "neutral",
    },
    {
      label: "Brute force guard",
      value: secLive && sec.data ? (sec.data.bruteforce.blocked_ips > 0 ? `Active · ${sec.data.bruteforce.blocked_ips} blocked` : "Idle") : null,
      tone: secLive && sec.data ? (sec.data.bruteforce.blocked_ips > 0 ? "ok" : "neutral") : "neutral",
    },
    {
      label: "TLS certificates",
      value: secLive && sec.data ? (sec.data.tls.present ? "Present" : "Not configured") : null,
      tone: secLive && sec.data ? (sec.data.tls.present ? "ok" : "warn") : "neutral",
    },
    {
      label: "File integrity",
      value: secLive && sec.data ? (sec.data.integrity.baseline_exists ? `Monitoring · ${sec.data.integrity.tracked} files` : "No baseline") : null,
      tone: secLive && sec.data ? (sec.data.integrity.baseline_exists ? "ok" : "neutral") : "neutral",
    },
  ];

  const rowTone = (tone: string) =>
    tone === "ok" ? "text-emerald-600 dark:text-emerald-400" : tone === "warn" ? "text-amber-600 dark:text-amber-400" : "text-[var(--cc-muted)]";
  const rowDot = (tone: string) =>
    tone === "ok" ? "bg-emerald-500" : tone === "warn" ? "bg-amber-500" : "bg-[var(--cc-muted-2)]";

  const dialogShell = "bg-white dark:bg-[#10151c] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white";
  const dialogCancel = "bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08]";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--cc-accent)]" />
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--cc-accent)] font-bold">Cloud Connect</div>
          </div>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--cc-text)]">Control Panel</h1>
          <p className="mt-1.5 text-sm text-[var(--cc-muted)]">
            {server
              ? `${server.username}@${server.host}:${server.port}${server.os ? ` · ${server.os}` : ""}`
              : "No server connected"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ring-1 ${streamStatus.cls}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${streamStatus.dot}`} />
            {streamStatus.label}
          </span>
          <Button
            variant="outline"
            onClick={refresh}
            className="border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-amber-500/40 text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 hover:text-amber-800 dark:hover:text-amber-300"
              >
                <RotateCw className="w-4 h-4 mr-1.5" /> Reboot
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={dialogShell}>
              <AlertDialogHeader>
                <AlertDialogTitle>Reboot this server?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
                  Running services will be interrupted while the node restarts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={dialogCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => power("reboot")} className="bg-amber-500 text-black hover:bg-amber-400">
                  Reboot
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300"
              >
                <Power className="w-4 h-4 mr-1.5" /> Shutdown
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={dialogShell}>
              <AlertDialogHeader>
                <AlertDialogTitle>Shut down this server?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
                  The node will power off and your console session will end.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={dialogCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => power("shutdown")} className="bg-red-500 text-white hover:bg-red-400">
                  Shut down
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {mode === "demo" && <DemoBanner />}

      {loading && !data ? (
        <div className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" />
        </div>
      ) : (
        <>
          {/* Metrics */}
          <section aria-label="Resource metrics" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {(metrics ?? []).slice(0, 8).map((m, i) => {
              const Icon = METRIC_META[m.key] ?? Gauge;
              return (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: i * 0.03 }}
                  className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-4 sm:p-5 transition-colors hover:bg-[var(--cc-surface-2)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span aria-hidden className={`w-1.5 h-1.5 shrink-0 rounded-full ${toneDot[m.tone]}`} />
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--cc-muted)] truncate">
                        {m.label}
                      </div>
                    </div>
                    <Icon aria-hidden className={`w-4 h-4 shrink-0 ${toneIcon[m.tone]}`} />
                  </div>
                  <div
                    className={`mt-3 text-[26px] font-bold leading-none tabular-nums ${
                      m.key === "health" ? toneIcon[m.tone] : "text-[var(--cc-text)]"
                    }`}
                  >
                    {m.value}
                  </div>
                  <div className="mt-2 text-xs text-[var(--cc-muted)] truncate">{m.detail}</div>
                  {m.progress !== undefined && (
                    <div className="mt-3 h-1.5 rounded-full bg-[var(--cc-border)] overflow-hidden" role="progressbar" aria-valuenow={m.progress} aria-valuemin={0} aria-valuemax={100}>
                      <div className={`h-full rounded-full ${toneBar[m.tone]}`} style={{ width: `${m.progress}%` }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent activity */}
            <section aria-label="Recent activity" className="lg:col-span-2 rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] overflow-hidden">
              <header className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--cc-border)]">
                <h2 className="text-sm font-semibold text-[var(--cc-text)]">Recent Activity</h2>
                <span className="text-[11px] text-[var(--cc-muted)]">
                  {activity?.length ?? 0} events
                  {(activity?.length ?? 0) > 8 ? ` · last ${8} shown` : ""}
                </span>
              </header>
              <ul className="divide-y divide-[var(--cc-border)]">
                {(activity ?? []).slice(0, 8).map((a, i) => (
                  <li key={`${a.time}-${i}`} className="px-5 py-3 flex items-center gap-3">
                    <span aria-hidden className={`w-1.5 h-1.5 shrink-0 rounded-full ${eventDot[eventStatus(a.text)]}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] text-[var(--cc-text-2)] truncate">{a.text}</div>
                    </div>
                    <span className="text-[11px] text-[var(--cc-muted-2)] w-20 text-right shrink-0 tabular-nums">{a.time}</span>
                  </li>
                ))}
                {!activity?.length && (
                  <li className="px-5 py-8 text-center text-xs text-[var(--cc-muted)]">
                    No activity recorded yet.
                  </li>
                )}
              </ul>
            </section>

            {/* Quick actions */}
            <section aria-label="Quick actions" className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-[var(--cc-text)]">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickActions.map(({ label, desc, icon: Icon, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    aria-label={`Quick action: ${label} — ${desc}`}
                    className="flex flex-col items-start gap-2.5 rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] px-3.5 py-3.5 text-left transition-colors hover:border-[var(--cc-accent-border)] hover:bg-[var(--cc-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cc-accent)]"
                  >
                    <Icon className="w-4 h-4 text-[var(--cc-accent)]" />
                    <div>
                      <div className="text-[13px] font-semibold text-[var(--cc-text)]">{label}</div>
                      <div className="text-[11px] text-[var(--cc-muted)]">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Security status */}
            <section
              aria-label="Security status"
              className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-5"
            >
              <header className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--cc-text)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--cc-accent)]" /> Security Status
                </h2>
                {secLive && sec.data && (
                  <span className="text-[11px] text-[var(--cc-muted)]">
                    Score <span className="font-semibold text-[var(--cc-text)]">{sec.data.score}</span> · {sec.data.level}
                  </span>
                )}
              </header>
              <ul className="mt-3 divide-y divide-[var(--cc-border)]">
                {secRows.map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="text-[13px] text-[var(--cc-text-2)]">{row.label}</span>
                    {row.value ? (
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${rowTone(row.tone)}`}>
                        <span aria-hidden className={`w-1.5 h-1.5 rounded-full ${rowDot(row.tone)}`} />
                        {row.value}
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--cc-muted)]">Not available</span>
                    )}
                  </li>
                ))}
              </ul>
              {!secLive && (
                <p className="mt-3 text-[11px] text-[var(--cc-muted)]">
                  Connect the Blacklink backend for a live posture report.
                </p>
              )}
            </section>

            {/* System status */}
            <section
              aria-label="System status"
              className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] p-5"
            >
              <header className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-[var(--cc-text)]">
                  <Server className="w-4 h-4 text-[var(--cc-accent)]" /> System Status
                </h2>
                {server && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <Wifi className="w-3.5 h-3.5" /> {onlineLabel(streamStatus.label)}
                  </span>
                )}
              </header>
              <ul className="mt-3 divide-y divide-[var(--cc-border)]">
                {sysRows.map(({ key, icon: Icon, m }) => {
                  const meta = metricLabel(key);
                  return (
                    <li key={key} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="inline-flex items-center gap-2 text-[13px] text-[var(--cc-text-2)]">
                        <Icon className="w-3.5 h-3.5 text-[var(--cc-muted-2)]" /> {meta}
                      </span>
                      {m ? (
                        <span className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold tabular-nums text-[var(--cc-text)]">{m.value}</span>
                          {m.progress !== undefined && (
                            <span className="h-1 w-16 rounded-full bg-[var(--cc-border)] overflow-hidden">
                              <span className={`block h-full rounded-full ${toneBar[m.tone]}`} style={{ width: `${m.progress}%` }} />
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--cc-muted)]">Not available</span>
                      )}
                    </li>
                  );
                })}
                <li className="flex items-center justify-between gap-3 py-2.5">
                  <span className="text-[13px] text-[var(--cc-text-2)]">Uptime</span>
                  <span className="text-[13px] font-medium tabular-nums text-[var(--cc-text)]">{uptime}</span>
                </li>
              </ul>
              <footer className="mt-3">
                <button
                  onClick={() => navigate("/blacklink/dashboard/security")}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--cc-accent)] hover:text-[var(--cc-accent-strong)] transition-colors"
                >
                  Open security center <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </footer>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

const metricLabel = (key: string) =>
  ({ cpu: "CPU", mem: "Memory", disk: "Storage", net: "Network", load: "Load average" }[key] ?? key);

const onlineLabel = (s: string) => (s === "Live" ? "Connected" : s);

export default ConnectDashboard;