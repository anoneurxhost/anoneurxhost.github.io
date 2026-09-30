import { useState } from "react";
import { Radar, Play, ShieldAlert, Check, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type ScanResult, type ConnectMode } from "../api";
import { Button } from "@/components/ui/button";
import { SecBadge, SecLoading, SecOffline, SecPanel, SecStat, usePageTitle } from "./securityUI";

const SecurityScan = () => {
  usePageTitle("Vulnerability Scan");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [mode, setMode] = useState<ConnectMode>("live");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const runScan = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await securityApi.scan();
      setResult(res.data);
      setMode(res.mode);
      if (res.error) setError(res.error);
      else toast.success("Vulnerability scan completed");
    } catch {
      setError("Failed to execute scan");
      toast.error("Scan failed");
    } finally {
      setBusy(false);
    }
  };

  const summary = result?.summary ?? { critical: 0, high: 0, medium: 0, low: 0 };

  return (
    <ConnectSection
      title="Vulnerability & CVE Scan"
      subtitle="On-demand inspection of installed packages and configuration vectors."
      icon={Radar}
      actions={
        <Button onClick={runScan} disabled={busy} size="sm" className="gap-2">
          <Play className="w-4 h-4" /> {busy ? "Scanning…" : "Run Scan Now"}
        </Button>
      }
    >
      {error && <SecOffline error={error} />}

      {!result && !busy && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-white/[0.02] backdrop-blur-xl p-12 text-center shadow-sm">
          <Radar className="w-10 h-10 mx-auto text-cyan-500 dark:text-cyan-400 mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Ready to Scan</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Click "Run Scan Now" to perform a live assessment of local security posture.
          </p>
          <Button onClick={runScan} className="mt-5 gap-2">
            <Play className="w-4 h-4" /> Start Scan
          </Button>
        </div>
      )}

      {busy && <SecLoading label="Running vulnerability scan on agent…" />}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={summary.critical} label="Critical findings" tone={summary.critical > 0 ? "danger" : "ok"} />
            <SecStat value={summary.high} label="High" tone={summary.high > 0 ? "warn" : "ok"} />
            <SecStat value={summary.medium} label="Medium" />
            <SecStat value={result.verdict} label="Verdict" tone={result.verdict === "pass" ? "ok" : "danger"} />
          </div>

          <SecPanel title={`Findings (${result.findings?.length ?? 0})`}>
            {result.findings?.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400 flex flex-col items-center gap-2">
                <Check className="w-8 h-8 text-emerald-500" />
                <p>No vulnerabilities or risky configurations detected.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200/50 dark:divide-white/5">
                {result.findings?.map((f, i) => (
                  <li key={i} className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0">
                          {f.severity === "critical" || f.severity === "high" ? (
                            <X className="w-4 h-4 text-red-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{f.check}</h4>
                      </div>
                      <SecBadge status={f.severity} />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 break-words">{f.detail}</p>
                    {f.remediation && (
                      <p className="text-xs text-cyan-700 dark:text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2">
                        <strong className="font-medium">Remediation:</strong> {f.remediation}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </SecPanel>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityScan;