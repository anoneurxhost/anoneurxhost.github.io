import { Flame, RefreshCw } from "lucide-react";
import ConnectSection from "../ConnectSection";
import { securityApi, type BruteForceView } from "../api";
import { useAsyncData } from "../useConnectData";
import { SecBadge, SecLoading, SecOffline, SecPanel, SecStat, usePageTitle , useRefreshShortcut } from "./securityUI";

const SecurityBruteforce = () => {
  usePageTitle("Brute Force");
  const { data, mode, loading, error, refresh } = useAsyncData<BruteForceView>(
    () => securityApi.bruteforce(),
    []
  );
  useRefreshShortcut(refresh);

  return (
    <ConnectSection
      title="Brute Force Detection"
      subtitle="Fail2ban / auth failure monitor across 24h sliding window."
      icon={Flame}
      actions={
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <span className={`w-2 h-2 rounded-full ${mode === "live" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {mode === "live" ? "Live" : "Offline"}
          </span>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      }
    >
      {loading && <SecLoading label="Scanning auth failure logs…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.failures_24h ?? 0} label="Failures · 24h" tone={data.failures_24h > 0 ? "warn" : "ok"} />
            <SecStat value={data.blocked_ips ?? data.blocked?.length ?? 0} label="Blocked IPs" tone="ok" />
            <SecStat value={data.sources?.length ?? 0} label="Source IPs tracked" />
            <SecStat value={`${data.threshold ?? 5} attempts`} label="Ban threshold" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SecPanel title="Source IPs">
              {data.sources?.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No brute-force attempts recorded in the window.
                </div>
              ) : (
                <div className="overflow-x-auto -mx-5 px-5">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Attempts</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                      {data.sources?.map((s) => (
                        <tr key={s.ip} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">{s.ip}</td>
                          <td className="px-4 py-3 tabular-nums text-slate-700 dark:text-slate-300">{s.attempts}</td>
                          <td className="px-4 py-3">
                            <SecBadge status={s.blocked ? "ok" : "off"}>
                              {s.blocked ? "blocked" : "active"}
                            </SecBadge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SecPanel>

            <SecPanel title="Active Blocked Entries">
              {data.blocked?.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  No active firewall/fail2ban bans.
                </div>
              ) : (
                <div className="overflow-x-auto -mx-5 px-5">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">IP / CIDR</th>
                        <th className="px-4 py-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                      {data.blocked?.map((b) => (
                        <tr key={b.ip} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">{b.ip}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{b.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SecPanel>
          </div>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityBruteforce;