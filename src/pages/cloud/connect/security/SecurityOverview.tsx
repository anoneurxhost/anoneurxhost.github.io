import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  RefreshCw,
  TerminalSquare,
  Flame,
  Ban,
  RadioTower,
  Radar,
  FileCheck,
  History,
  KeyRound,
  Lock,
  Database,
  RefreshCcw,
  LifeBuoy,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type SecurityStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { SecAutoRefresh, SecBadge, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecStat, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const hub = [
  { to: "/blacklink/dashboard/ssh", label: "SSH Hardening", desc: "sshd directives", icon: TerminalSquare },
  { to: "/blacklink/dashboard/bruteforce", label: "Brute Force", desc: "fail2ban view", icon: Flame },
  { to: "/blacklink/dashboard/ip-control", label: "IP Control", desc: "blocklist", icon: Ban },
  { to: "/blacklink/dashboard/ports", label: "Open Ports", desc: "listeners", icon: RadioTower },
  { to: "/blacklink/dashboard/scan", label: "Vulnerability Scan", desc: "cve & config", icon: Radar },
  { to: "/blacklink/dashboard/integrity", label: "File Integrity", desc: "baseline watch", icon: FileCheck },
  { to: "/blacklink/dashboard/events", label: "Audit Events", desc: "recent activity", icon: History },
  { to: "/blacklink/dashboard/secrets", label: "Secrets Vault", desc: "encrypted store", icon: KeyRound },
  { to: "/blacklink/dashboard/tls", label: "TLS Certificate", desc: "cert details", icon: Lock },
  { to: "/blacklink/dashboard/backups", label: "Backups", desc: "encrypted .acb", icon: Database },
  { to: "/blacklink/dashboard/updates", label: "Updates", desc: "signed packages", icon: RefreshCcw },
  { to: "/blacklink/dashboard/recovery", label: "Recovery Codes", desc: "2FA fallback", icon: LifeBuoy },
  { to: "/blacklink/dashboard/totp", label: "Two-Factor Auth", desc: "TOTP", icon: Smartphone },
];

const SecurityOverview = () => {
  usePageTitle("Overview");
  const { data, mode, loading, error, refresh } = useAsyncData<SecurityStatus>(
    () => securityApi.posture(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const checks = data?.checks ?? [];
  const critical = checks.filter((c) => c.status === "critical").length;
  const warn = checks.filter((c) => c.status === "warn" || c.status === "warning").length;
  const okCount = checks.filter((c) => c.status === "ok").length;
  const unresolved = critical > 0;

  return (
    <ConnectSection
      title="Security Center"
      subtitle={
        unresolved
          ? "Action required — resolve critical findings below."
          : "Posture, hardening and automation for this host."
      }
      icon={ShieldCheck}
      actions={
        <div className="flex items-center gap-2">
          {mode === "live" && checks.length > 0 && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              {checks.length} checks · {okCount} ok · {warn} warn · {critical} critical
            </span>
          )}
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      }
    >
      {loading && <SecLoading label="Loading security posture…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.score} label="Security score" tone={unresolved ? "danger" : "ok"} />
            <SecStat value={data.firewall.enabled ? "Enabled" : "Off"} label="Firewall" tone={data.firewall.enabled ? "ok" : "warn"} />
            <SecStat
              value={data.open_ports.length}
              label="Open ports"
              tone={data.open_ports.length > 0 && data.open_ports.some((p) => p.exposed) ? "warn" : "ok"}
            />
            <SecStat value={data.events_24h} label="Events · 24h" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SecPanel title="Security checks">
              {checks.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No checks returned by the agent.
                </div>
              ) : (
                <ul className="divide-y divide-slate-200/50 dark:divide-white/5">
                  {checks.map((c) => (
                    <li key={c.key} className="flex items-start gap-3 px-5 py-3">
                      <span className="mt-0.5 shrink-0">
                        {c.status === "ok" ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : c.status === "critical" ? (
                          <X className="w-4 h-4 text-red-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{c.label}</p>
                          <SecBadge status={c.status} />
                        </div>
                        {c.detail && <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 break-words">{c.detail}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </SecPanel>

            <div className="space-y-6">
              <SecPanel title="Key areas">
                <dl className="divide-y divide-slate-200/50 dark:divide-white/5 text-sm">
                  {[
                    ["SSH password auth", data.ssh.password_authentication ? "enabled" : "disabled", data.ssh.password_authentication ? "danger" : "ok"],
                    ["Root login", data.ssh.permit_root_login ?? "n/a", data.ssh.permit_root_login === "no" ? "ok" : "warn"],
                    ["Brute-force IPs blocked", data.bruteforce.blocked_ips > 0 ? String(data.bruteforce.blocked_ips) : "none", data.bruteforce.blocked_ips > 0 ? "ok" : "neutral"],
                    ["Brute-force failures · 24h", String(data.bruteforce.failures_24h), data.bruteforce.failures_24h > 0 ? "warn" : "ok"],
                    ["Secrets stored", String(data.secrets.stored), "neutral"],
                    ["Pending updates", String(data.updates.pending), data.updates.pending > 0 ? "warn" : "ok"],
                    ["Two-factor auth", data.totp.enabled ? "enabled" : "not set", data.totp.enabled ? "ok" : "warn"],
                    ["Recovery codes", data.recovery.remaining > 0 ? `${data.recovery.remaining} remaining` : "not set", data.recovery.remaining > 0 ? "ok" : "warn"],
                    ["TLS certificate", data.tls.present ? (data.tls.valid ? "valid" : "expired/invalid") : "not found", data.tls.present ? (data.tls.valid ? "ok" : "danger") : "warn"],
                    ["Integrity baseline", data.integrity.tracked > 0 ? `${data.integrity.tracked} files tracked` : "not initialized", data.integrity.tracked > 0 ? "ok" : "warn"],
                  ].map(([label, value, tone]) => (
                    <div key={label as string} className="flex items-center justify-between gap-2 px-5 py-2.5">
                      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
                      <dd className="tabular-nums">
                        <SecBadge status={tone === "neutral" ? "info" : (tone as string)}>{value}</SecBadge>
                      </dd>
                    </div>
                  ))}
                </dl>
              </SecPanel>
            </div>
          </div>

          <SecPanel title="Workspaces">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-5">
              {hub.map((h) => (
                <NavLink
                  key={h.to}
                  to={h.to}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-colors"
                >
                  <h.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-300" />
                  <p className="mt-2 text-sm font-medium text-white">{h.label}</p>
                  <p className="text-[11px] text-slate-500">{h.desc}</p>
                </NavLink>
              ))}
            </div>
          </SecPanel>

          {mode !== "live" && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/[0.06] px-4 py-3 text-xs text-amber-800 dark:text-amber-200">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <p>
                The panel above is a neutral placeholder, not real data. Connect through the
                Blacklink backend for live posture.
              </p>
            </div>
          )}
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityOverview;