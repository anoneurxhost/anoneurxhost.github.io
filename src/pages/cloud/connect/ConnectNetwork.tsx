import { Network, Globe, Router, RefreshCw, Loader2 } from "lucide-react";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const outlineBtn = "border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";

const ConnectNetwork = () => {
  const { data, mode, loading, refresh } = useAsyncData(() => connectApi.network(), []);

  return (
    <ConnectSection
      title="Network"
      subtitle="Interfaces, routing, and traffic across the connected server."
      icon={Network}
      actions={
        <Button variant="outline" onClick={refresh} className={outlineBtn}>
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading && !data ? (
        <div className={`${card} p-16 text-center`}>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" />
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">Public IP</span>
                <Globe className="w-4 h-4 text-[var(--cc-accent)]" />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums text-[var(--cc-text)]">{data.publicIp}</div>
              <div className="mt-0.5 text-xs text-[var(--cc-muted)]">{data.asn}</div>
            </div>
            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">Throughput</span>
                <Router className="w-4 h-4 text-[var(--cc-accent)]" />
              </div>
              <div className="mt-3 text-2xl font-bold tabular-nums text-[var(--cc-text)]">{data.throughput}</div>
              <div className="mt-0.5 text-xs text-[var(--cc-muted)]">{data.updown}</div>
            </div>
            <div className={`${card} p-5 border-emerald-500/40`}>
              <div className="text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Health</div>
              <div className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-300">{data.health}</div>
              <div className="mt-0.5 text-xs text-emerald-600/80 dark:text-emerald-300/80">{data.healthNote}</div>
            </div>
          </div>

          <div className={`${card} overflow-hidden`}>
            <div className="px-5 py-3.5 border-b border-[var(--cc-border)] text-sm font-semibold text-[var(--cc-text)]">
              Interfaces
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">
                  <tr>
                    <th className="text-left px-5 py-2 font-medium">Name</th>
                    <th className="text-left px-5 py-2 font-medium">Address</th>
                    <th className="text-left px-5 py-2 font-medium">Speed</th>
                    <th className="text-left px-5 py-2 font-medium">RX / TX</th>
                    <th className="text-left px-5 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--cc-border)]">
                  {data.interfaces.map((i) => (
                    <tr key={i.name}>
                      <td className="px-5 py-3 font-mono text-[var(--cc-text)]">{i.name}</td>
                      <td className="px-5 py-3 text-[var(--cc-text-2)] font-mono text-xs">{i.ip}</td>
                      <td className="px-5 py-3 text-[var(--cc-muted)]">{i.speed}</td>
                      <td className="px-5 py-3 text-[var(--cc-muted)] text-xs">{i.rx} / {i.tx}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {i.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${card} overflow-hidden`}>
            <div className="px-5 py-3.5 border-b border-[var(--cc-border)] text-sm font-semibold text-[var(--cc-text)]">
              Routing table
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">
                  <tr>
                    <th className="text-left px-5 py-2 font-medium">Destination</th>
                    <th className="text-left px-5 py-2 font-medium">Gateway</th>
                    <th className="text-left px-5 py-2 font-medium">Interface</th>
                    <th className="text-left px-5 py-2 font-medium">Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--cc-border)]">
                  {data.routes.map((r) => (
                    <tr key={r.destination}>
                      <td className="px-5 py-3 font-mono text-[var(--cc-text)] text-xs">{r.destination}</td>
                      <td className="px-5 py-3 font-mono text-[var(--cc-muted)] text-xs">{r.gateway}</td>
                      <td className="px-5 py-3 text-[var(--cc-text-2)]">{r.iface}</td>
                      <td className="px-5 py-3 text-[var(--cc-muted)]">{r.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </ConnectSection>
  );
};

export default ConnectNetwork;