import { HardDrive, Database, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const outlineBtn = "border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";

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
        <Button variant="outline" onClick={refresh} className={outlineBtn}>
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading && !volumes ? (
        <div className={`${card} p-16 text-center`}>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" />
        </div>
      ) : (
        <>
          <div className={`${card} p-5`}>
            <div className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">Average utilisation</div>
            <div className="mt-2 text-2xl font-bold tabular-nums text-[var(--cc-text)]">{totalUsed}%</div>
            <div className="mt-2 h-1.5 rounded-full bg-[var(--cc-border)] overflow-hidden">
              <div className="h-full bg-[var(--cc-accent)]" style={{ width: `${totalUsed}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {(volumes ?? []).map((v) => (
              <div key={v.id} className={`${card} p-5`}>
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[var(--cc-text)] truncate">{v.name}</div>
                    <div className="text-[11px] text-[var(--cc-muted-2)] font-mono truncate">{v.mount}</div>
                  </div>
                  <Database className="w-4 h-4 text-[var(--cc-accent)]" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="text-2xl font-bold tabular-nums text-[var(--cc-text)]">{v.used}%</div>
                  <div className="text-xs text-[var(--cc-muted)]">of {v.size}</div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--cc-border)] overflow-hidden">
                  <div
                    className={v.used > 75 ? "h-full bg-amber-500" : "h-full bg-[var(--cc-accent)]"}
                    style={{ width: `${v.used}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[var(--cc-muted)] uppercase tracking-widest">{v.fs}</span>
                  <label className="flex items-center gap-2 text-xs text-[var(--cc-text-2)]">
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