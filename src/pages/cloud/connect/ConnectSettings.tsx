import { useEffect, useState } from "react";
import { Settings, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { connectApi, ConsoleSettings } from "./api";
import { useAsyncData } from "./useConnectData";

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const primaryBtn = "bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold";
const inputCls = "bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] h-10";

const ConnectSettings = () => {
  const { data, mode, loading } = useAsyncData(() => connectApi.settings(), []);
  const [form, setForm] = useState<ConsoleSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const set = <K extends keyof ConsoleSettings>(k: K, v: ConsoleSettings[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async () => {
    if (!form) return;
    setSaving(true);
    await connectApi.saveSettings(form);
    setSaving(false);
    toast.success("Settings saved");
  };

  const row = (label: string, desc: string, value: boolean, onChange: (v: boolean) => void) => (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <div className="text-sm font-medium text-[var(--cc-text)]">{label}</div>
        <div className="text-xs text-[var(--cc-muted)] mt-0.5 max-w-md">{desc}</div>
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );

  return (
    <ConnectSection
      title="Settings"
      subtitle="Preferences for this console session and the connected server."
      icon={Settings}
      actions={
        <Button onClick={save} disabled={saving || !form} className={primaryBtn}>
          {saving ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />} Save changes
        </Button>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading || !form ? (
        <div className={`${card} p-16 text-center`}>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" />
        </div>
      ) : (
        <>
          <div className={`${card} p-6 divide-y divide-[var(--cc-border)]`}>
            {row("Automatic security updates", "Apply security patches as soon as they are published.", form.autoUpdate, (v) => set("autoUpdate", v))}
            {row("Console notifications", "Show alerts for server events inside this console.", form.notify, (v) => set("notify", v))}
            {row("Anonymous telemetry", "Share aggregated usage metrics to improve Black Wall.", form.telemetry, (v) => set("telemetry", v))}
            {row("SSH password authentication", "Disable to require SSH keys for all sessions (recommended).", form.sshPasswordAuth, (v) => set("sshPasswordAuth", v))}
          </div>

          <div className={`${card} p-6 grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <div className="space-y-1.5">
              <Label className="text-xs text-[var(--cc-text-2)]">Hostname</Label>
              <Input value={form.hostname} onChange={(e) => set("hostname", e.target.value)}
                className={`${inputCls} font-mono`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-[var(--cc-text-2)]">Timezone</Label>
              <Input value={form.timezone} onChange={(e) => set("timezone", e.target.value)}
                className={`${inputCls} font-mono`} />
            </div>
          </div>
        </>
      )}
    </ConnectSection>
  );
};

export default ConnectSettings;