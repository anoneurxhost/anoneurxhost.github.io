import { useState } from "react";
import { Smartphone, RefreshCw, Plus, Check, Copy, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type TotpStatus, type TotpSetup } from "../api";
import { useAsyncData } from "../useConnectData";
import { useConnectSession } from "../ConnectSession";
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

const SecurityTotp = () => {
  usePageTitle("Two-Factor Auth");
  const { server } = useConnectSession();
  const { data, mode, loading, error, refresh } = useAsyncData<TotpStatus>(
    () => securityApi.totp(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const [open, setOpen] = useState(false);
  const [setup, setSetup] = useState<TotpSetup | null>(null);
  const [setupErr, setSetupErr] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [code, setCode] = useState("");
  const [enabling, setEnabling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const account = server?.host || "blacklink";

  const SETUP_STEPS = [
    { n: 1 as const, label: "Generate secret" },
    { n: 2 as const, label: "Pair app" },
    { n: 3 as const, label: "Verify code" },
  ];

  const startSetup = async () => {
    setOpen(true);
    setSetupErr(null);
    setSetup(null);
    setCode("");
    setStep(1);
    setStarting(true);
    try {
      const res = await securityApi.totpSetup(account);
      if (res.error) setSetupErr(res.error);
      else {
        setSetup(res.data);
        setStep(2);
      }
    } catch {
      setSetupErr("Failed to initialize TOTP pairing");
    } finally {
      setStarting(false);
    }
  };

  const enableTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setEnabling(true);
    setStep(3);
    try {
      const res = await securityApi.totpVerify(code.trim());
      if (res.error) toast.error(res.error);
      else {
        toast.success("Two-factor authentication enabled");
        setOpen(false);
        setSetup(null);
        setCode("");
        setStep(1);
        refresh();
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setEnabling(false);
    }
  };

  const copySecret = async () => {
    if (!setup) return;
    try {
      await navigator.clipboard.writeText(setup.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <ConnectSection
      title="Two-Factor Authentication"
      subtitle="Time-based one-time passwords via any standard authenticator app."
      icon={Smartphone}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <SecLiveStatus mode={mode} />
          <SecAutoRefresh enabled={autorefresh.enabled} onToggle={autorefresh.toggle} />
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          {!data?.enabled && (
            <Button size="sm" onClick={startSetup} className="gap-2">
              <Plus className="w-4 h-4" /> Set Up 2FA
            </Button>
          )}
        </div>
      }
    >
      {loading && <SecLoading label="Checking TOTP state…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat
              value={data.enabled ? "Enabled" : "Disabled"}
              label="Two-factor auth"
              tone={data.enabled ? "ok" : "warn"}
            />
            <SecStat
              value={data.configured ? "Paired" : "Not paired"}
              label="Device pairing"
              tone={data.configured ? "ok" : "warn"}
            />
            <SecStat value={data.created_at ? fmtTs(data.created_at) : "—"} label="Configured" />
            <SecStat value={data.last_verified_at ? fmtTs(data.last_verified_at) : "never"} label="Last verified" />
          </div>

          <SecPanel title="Status">
            <div className="p-5 space-y-3 text-sm">
              {data.enabled ? (
                <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-200">
                  <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
                  <p>
                    2FA is active on this host. Proof-of-possession of the TOTP secret is enforced on
                    configure operations.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <Smartphone className="w-5 h-5 mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-300" />
                  <p>
                    Two-factor authentication is not configured. Set it up with an authenticator app
                    to gate privileged agent operations.
                  </p>
                </div>
              )}
            </div>
          </SecPanel>
        </div>
      )}

      <Dialog open={open} onOpenChange={(o) => !o && setOpen(false)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Pair an Authenticator App</DialogTitle>
          </DialogHeader>

          {!starting && !setupErr && (
            <ol className="flex items-center gap-2 px-2 pt-1">
              {SETUP_STEPS.map((s, i) => {
                const done = step > s.n || (step === s.n && !enabling && s.n !== 3);
                const active = step === s.n;
                return (
                  <li key={s.n} className="flex items-center gap-2 flex-1">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold border transition-colors ${
                        done
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : active
                            ? "bg-cyan-500 border-cyan-500 text-white"
                            : "border-slate-300 dark:border-white/15 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : s.n}
                    </span>
                    <span
                      className={`text-[11px] ${
                        active ? "text-slate-900 dark:text-white font-medium" : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < SETUP_STEPS.length - 1 && (
                      <span className="flex-1 h-px bg-slate-300/70 dark:bg-white/10" />
                    )}
                  </li>
                );
              })}
            </ol>
          )}

          {starting && <SecLoading label="Generating TOTP secret…" />}

          {setupErr && !starting && (
            <div className="px-2">
              <SecOffline error={setupErr} />
            </div>
          )}

          {setup && (
            <div className="space-y-4 pt-2">
              <div className="grid place-items-center rounded-xl border border-slate-200 dark:border-white/10 bg-white p-3">
                <div
                  className="w-44 h-44"
                  dangerouslySetInnerHTML={{ __html: setup.qr_svg }}
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 dark:text-slate-400">Scan with your authenticator app, or enter the secret manually</Label>
                <div className="mt-1.5 flex items-center gap-2">
                  <code className="flex-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3 py-2 font-mono text-xs break-all text-cyan-700 dark:text-cyan-200">
                    {setup.secret}
                  </code>
                  <Button variant="outline" size="sm" onClick={copySecret}>
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  Account: {account} · {setup.algorithm} · {setup.steps}s steps
                </p>
              </div>

              <form onSubmit={enableTotp} className="space-y-3">
                <Label className="text-xs text-slate-500 dark:text-slate-400">Enter the 6-digit code to confirm</Label>
                <div className="flex gap-2">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="flex-1 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white font-mono text-lg tracking-[0.3em] text-center"
                  />
                  <Button type="submit" disabled={enabling || code.length !== 6}>
                    {enabling ? "Verifying…" : "Enable"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default SecurityTotp;