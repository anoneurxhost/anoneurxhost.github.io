import { HardDrive, Database, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const ConnectStorage = () => {
  const { data: volumes, setData, mode, loading, refresh } = useAsyncData(() => connectApi.volumes(), []);

  const toggleMount = async (id: string, mounted: boolean, name: string) => {
    const res = await connectApi.setVolumeMounted(id, mounted);
    setData(res.data);
    toast.success(`${name} ${mounted ? "mounted" : "unmounted"}`);
  };

  const totalUsed = volumes?.length
    ? Math.round(volumes.reduce((a, v) => a + v.used, 0) / volumes.length)
    : 0;

  return (
    <ConnectSection
      title="Storage"
      subtitle="Attached volumes, mount state, and disk usage."
      icon={HardDrive}
      actions={
        <Button variant="outline" onClick={refresh} className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading && !volumes ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-300" />
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="text-[11px] uppercase tracking-widest text-white/60">Average utilisation</div>
            <div className="mt-2 text-2xl font-bold">{totalUsed}%</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-cyan-400" style={{ width: `${totalUsed}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {(volumes ?? []).map((v) => (
              <div key={v.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{v.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{v.mount}</div>
                  </div>
                  <Database className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="text-2xl font-bold">{v.used}%</div>
                  <div className="text-xs text-slate-400">of {v.size}</div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={v.used > 75 ? "h-full bg-amber-400" : "h-full bg-cyan-400"} style={{ width: `${v.used}%` }} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 uppercase tracking-widest">{v.fs}</span>
                  <label className="flex items-center gap-2 text-xs text-slate-300">
                    {v.mounted ? "Mounted" : "Unmounted"}
                    <Switch checked={v.mounted} onCheckedChange={(c) => toggleMount(v.id, c, v.name)} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </ConnectSection>
  );
};

export default ConnectStorage;