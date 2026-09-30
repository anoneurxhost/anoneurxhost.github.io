import { RadioTower, RefreshCw } from "lucide-react";
import ConnectSection from "../ConnectSection";
import { securityApi, type PortsView } from "../api";
import { useAsyncData } from "../useConnectData";
import { SecBadge, SecLoading, SecOffline, SecPanel, SecStat, usePageTitle , useRefreshShortcut } from "./securityUI";

const SecurityPorts = () => {
  usePageTitle("Open Ports");
  const { data, mode, loading, error, refresh } = useAsyncData<PortsView>(
    () => securityApi.ports(),
    []
  );
  useRefreshShortcut(refresh);

  return (
    <ConnectSection
      title="Open Network Ports"
      subtitle="Active listeners and public exposure audit."
      icon={RadioTower}
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
      {loading && <SecLoading label="Scanning listening ports…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <SecStat value={data.total ?? data.listeners?.length ?? 0} label="Total listeners" />
            <SecStat
              value={data.exposed ?? data.listeners?.filter((l) => l.exposed).length ?? 0}
              label="Publicly exposed"
              tone={(data.exposed ?? 0) > 0 ? "warn" : "ok"}
            />
            <SecStat value="TCP / UDP" label="Protocols scanned" />
          </div>

          <SecPanel title="Listeners">
            {data.listeners?.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500">
                No active listeners found.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Port</th>
                      <th className="px-4 py-3">Protocol</th>
                      <th className="px-4 py-3">Bind Address</th>
                      <th className="px-4 py-3">Exposure</th>
                      <th className="px-4 py-3">Process</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {data.listeners?.map((l, i) => (
                      <tr key={`${l.port}-${l.proto}-${i}`} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white tabular-nums">{l.port}</td>
                        <td className="px-4 py-3 font-mono text-xs uppercase text-slate-600 dark:text-slate-300">{l.proto}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{l.address}</td>
                        <td className="px-4 py-3">
                          <SecBadge status={l.exposed ? "warn" : "ok"}>
                            {l.exposed ? "public" : "bound local"}
                          </SecBadge>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                          {l.process || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SecPanel>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityPorts;