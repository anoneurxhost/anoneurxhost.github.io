import { useState } from "react";
import { TerminalSquare, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type SshView } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SecLoading, SecOffline, SecPanel, SecStat, usePageTitle , useRefreshShortcut } from "./securityUI";

const SecuritySsh = () => {
  usePageTitle("SSH Hardening");
  const { data, mode, loading, error, refresh, setData } = useAsyncData<SshView>(
    () => securityApi.ssh(),
    []
  );
  useRefreshShortcut(refresh);

  const [directive, setDirective] = useState("PasswordAuthentication");
  const [val, setVal] = useState("no");
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await securityApi.saveSsh(directive, val);
      if (res.error) {
        toast.error(res.error);
      } else {
        setData(res.data);
        toast.success(`Updated ${directive} -> ${val}`);
      }
    } catch {
      toast.error("Failed to update SSH config");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ConnectSection
      title="SSH Hardening"
      subtitle="Inspect and tune OpenSSH server directives (sshd_config)."
      icon={TerminalSquare}
      actions={
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
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
      {loading && <SecLoading label="Reading SSH configuration…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.port} label="SSH port" />
            <SecStat
              value={data.password_authentication ? "Enabled" : "Disabled"}
              label="Password auth"
              tone={data.password_authentication ? "danger" : "ok"}
            />
            <SecStat
              value={data.permit_root_login || "—"}
              label="Permit root login"
              tone={data.permit_root_login === "no" ? "ok" : "warn"}
            />
            <SecStat
              value={data.pubkey_authentication ? "Enabled" : "Disabled"}
              label="Pubkey auth"
              tone={data.pubkey_authentication ? "ok" : "warn"}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SecPanel title="Directive Tuner">
              <form onSubmit={onSave} className="space-y-4 p-5">
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Directive</Label>
                  <Select value={directive} onValueChange={setDirective}>
                    <SelectTrigger className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/90 text-slate-900 dark:text-white">
                      <SelectItem value="PasswordAuthentication">PasswordAuthentication</SelectItem>
                      <SelectItem value="PermitRootLogin">PermitRootLogin</SelectItem>
                      <SelectItem value="PubkeyAuthentication">PubkeyAuthentication</SelectItem>
                      <SelectItem value="MaxAuthTries">MaxAuthTries</SelectItem>
                      <SelectItem value="PermitEmptyPasswords">PermitEmptyPasswords</SelectItem>
                      <SelectItem value="X11Forwarding">X11Forwarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Value</Label>
                  <Input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    placeholder="e.g. no, yes, 3"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white"
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Changes apply immediately to sshd.conf and restart ssh service.
                  </p>
                </div>

                <Button type="submit" disabled={saving || mode !== "live"} className="w-full">
                  <Save className="w-4 h-4 mr-2" /> {saving ? "Applying…" : "Apply Directive"}
                </Button>
              </form>
            </SecPanel>

            <SecPanel title="Detected sshd_config Files">
              {data.files?.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No configuration files found.
                </div>
              ) : (
                <ul className="divide-y divide-slate-200/50 dark:divide-white/5 text-sm">
                  {data.files?.map((f) => (
                    <li key={f} className="px-5 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </SecPanel>
          </div>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecuritySsh;