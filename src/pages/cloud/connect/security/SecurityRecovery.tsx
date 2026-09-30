import { useState } from "react";
import { LifeBuoy, RefreshCw, Plus, Copy, Check, KeyRound } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type RecoveryStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SecAutoRefresh, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecStat, fmtTs, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const SecurityRecovery = () => {
  usePageTitle("Recovery Codes");
  const { data, mode, loading, error, refresh } = useAsyncData<RecoveryStatus>(
    () => securityApi.recovery(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const [generating, setGenerating] = useState(false);
  const [codes, setCodes] = useState<string[] | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await securityApi.recoveryGenerate();
      if (res.error) toast.error(res.error);
      else {
        setCodes(res.data.codes);
        toast.success(`Generated ${res.data.count} recovery codes — shown once`);
        refresh();
      }
    } catch {
      toast.error("Failed to generate recovery codes");
    } finally {
      setGenerating(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;
    setVerifying(true);
    try {
      const res = await securityApi.recoveryVerify(verifyCode.trim());
      if (res.error) toast.error(res.error);
      else {
        toast.success("Recovery code accepted");
        setVerifyCode("");
        refresh();
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const copyAll = async () => {
    if (!codes) return;
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const hasCodes = (data?.remaining ?? 0) > 0;

  return (
    <ConnectSection
      title="Recovery Codes"
      subtitle="Single-use fallback codes for 2FA — regenerate to invalidate the old set."
      icon={LifeBuoy}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <Button size="sm" onClick={generate} disabled={generating} className="gap-2">
            <Plus className="w-4 h-4" /> {generating ? "Generating…" : "Regenerate Codes"}
          </Button>
        </div>
      }
    >
      {loading && <SecLoading label="Reading recovery state…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <SecStat value={data.set ? "Configured" : "Not set"} label="Recovery set" tone={data.set ? "ok" : "warn"} />
            <SecStat value={data.remaining ?? 0} label="Codes remaining" tone={(data.remaining ?? 0) <= 2 ? "warn" : "ok"} />
            <SecStat value={data.generated_at ? fmtTs(data.generated_at) : "—"} label="Generated" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <SecPanel title="Status">
              <div className="p-5 space-y-3 text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                  {hasCodes
                    ? "Recovery codes are active. Use one only if you lose your authenticator — each code works once."
                    : "No usable recovery codes. Generate a fresh set and store them offline."}
                </p>
                {!hasCodes && (
                  <Button onClick={generate} disabled={generating} className="gap-2">
                    <KeyRound className="w-4 h-4" />
                    {generating ? "Generating…" : "Generate Codes"}
                  </Button>
                )}
              </div>
            </SecPanel>

            <SecPanel title="Verify a Recovery Code">
              <form onSubmit={verify} className="p-5 space-y-4">
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Code</Label>
                  <Input
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="XXXX-XXXX-XXXX"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white font-mono text-xs"
                    disabled={!hasCodes}
                  />
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Validates the set on the agent and marks the code as used.
                  </p>
                </div>
                <Button type="submit" disabled={verifying || !hasCodes} className="w-full">
                  {verifying ? "Verifying…" : "Verify Code"}
                </Button>
              </form>
            </SecPanel>
          </div>
        </div>
      )}

      <Dialog open={!!codes} onOpenChange={(o) => !o && setCodes(null)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>New Recovery Codes — shown once</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <p className="text-xs text-amber-800 dark:text-amber-200/90 bg-amber-500/10 border border-amber-500/25 rounded-lg px-3 py-2">
              Store these offline. They will never be displayed again.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {codes?.map((c) => (
                <code key={c} className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 text-center font-mono text-sm tracking-wider text-slate-900 dark:text-white">
                  {c}
                </code>
              ))}
            </div>
            <DialogFooter className="pt-1">
              <Button variant="outline" onClick={copyAll} className="gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy All"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default SecurityRecovery;