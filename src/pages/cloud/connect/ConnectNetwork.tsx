import { Network, Globe, Router, RefreshCw, Loader2 } from "lucide-react";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const ConnectNetwork = () => {
  const { data, mode, loading, refresh } = useAsyncData(() => connectApi.network(), []);

  return (
    <ConnectSection
      title="Network"
      subtitle="Interfaces, routing, and traffic across the connected server."
      icon={Network}
      actions={
        <Button variant="outline" onClick={refresh} className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading && !data ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-300" />
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-white/60">Public IP</span>
                <Globe className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="mt-3 text-2xl font-bold">{data.publicIp}</div>
              <div className="mt-0.5 text-xs text-slate-400">{data.asn}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-white/60">Throughput</span>
                <Router className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="mt-3 text-2xl font-bold">{data.throughput}</div>
              <div className="mt-0.5 text-xs text-slate-400">{data.updown}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-widest text-emerald-300/80">Health</div>
              <div className="mt-3 text-2xl font-bold text-emerald-200">{data.health}</div>
              <div className="mt-0.5 text-xs text-emerald-300/70">{data.healthNote}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 text-sm font-semibold">Interfaces</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="text-[11px] uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="text-left px-5 py-2 font-medium">Name</th>
                    <th className="text-left px-5 py-2 font-medium">Address</th>
                    <th className="text-left px-5 py-2 font-medium">Speed</th>
                    <th className="text-left px-5 py-2 font-medium">RX / TX</th>
                    <th className="text-left px-5 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.interfaces.map((i) => (
                    <tr key={i.name}>
                      <td className="px-5 py-3 font-mono text-slate-200">{i.name}</td>
                      <td className="px-5 py-3 text-slate-300 font-mono text-xs">{i.ip}</td>
                      <td className="px-5 py-3 text-slate-400">{i.speed}</td>
                      <td className="px-5 py-3 text-slate-400 text-xs">{i.rx} / {i.tx}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1.5 text-emerald-300 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {i.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 text-sm font-semibold">Routing table</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="text-[11px] uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="text-left px-5 py-2 font-medium">Destination</th>
                    <th className="text-left px-5 py-2 font-medium">Gateway</th>
                    <th className="text-left px-5 py-2 font-medium">Interface</th>
                    <th className="text-left px-5 py-2 font-medium">Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.routes.map((r) => (
                    <tr key={r.destination}>
                      <td className="px-5 py-3 font-mono text-slate-200 text-xs">{r.destination}</td>
                      <td className="px-5 py-3 font-mono text-slate-400 text-xs">{r.gateway}</td>
                      <td className="px-5 py-3 text-slate-300">{r.iface}</td>
                      <td className="px-5 py-3 text-slate-400">{r.metric}</td>
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