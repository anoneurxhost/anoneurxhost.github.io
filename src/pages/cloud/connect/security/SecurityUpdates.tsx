import { useState } from "react";
import { RefreshCcw, RefreshCw, CheckCircle2, Fingerprint, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type UpdateStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { SecAutoRefresh, SecBadge, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecStat, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const SecurityUpdates = () => {
  usePageTitle("Updates");
  const { data, mode, loading, error, refresh, setData } = useAsyncData<UpdateStatus>(
    () => securityApi.updates(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const [checking, setChecking] = useState(false);

  const checkNow = async () => {
    setChecking(true);
    try {
      const res = await securityApi.updateCheck();
      if (res.error) toast.error(res.error);
      else {
        setData(res.data);
        toast.success(
          res.data.count > 0
            ? `${res.data.count} pending update(s)`
            : "Host is up to date"
        );
      }
    } catch {
      toast.error("Update check failed");
    } finally {
      setChecking(false);
    }
  };

  const pending = data?.pending ?? [];

  return (
    <ConnectSection
      title="Software Updates"
      subtitle="Signed-package availability for applications and system."
      icon={RefreshCcw}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <Button size="sm" onClick={checkNow} disabled={checking} className="gap-2">
            <RefreshCcw className="w-4 h-4" /> {checking ? "Checking…" : "Check for Updates"}
          </Button>
        </div>
      }
    >
      {loading && <SecLoading label="Querying update availability…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat
              value={data.count ?? pending.length}
              label="Pending updates"
              tone={(data.count ?? pending.length) > 0 ? "warn" : "ok"}
            />
            <SecStat value={data.signed_updates_configured ? "Configured" : "Not set"} label="Signed updates" tone={data.signed_updates_configured ? "ok" : "warn"} />
            <SecStat value={data.checked_at || "never"} label="Last checked" />
            <SecStat value={pending.length} label="Packages listed" />
          </div>

          {(data.count ?? pending.length) === 0 ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 dark:bg-emerald-500/[0.06] px-4 py-4 text-sm text-emerald-700 dark:text-emerald-200">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <p>Host packages are up to date against the signed update channel.</p>
            </div>
          ) : (
            <SecPanel title="Pending Packages">
              <div className="p-5 max-h-80 overflow-y-auto">
                <ul className="space-y-1.5">
                  {pending.map((pkg) => (
                    <li key={pkg} className="rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.02] px-3 py-2 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {pkg}
                    </li>
                  ))}
                </ul>
              </div>
            </SecPanel>
          )}

          <SecPanel title="Agent Integrity">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-5">
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Signed update channel: </span>
                <SecBadge status={data.signed_updates_configured ? "ok" : "warn"}>
                  {data.signed_updates_configured ? "configured" : "missing"}
                </SecBadge>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 min-w-0">
                <Fingerprint className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="shrink-0">Agent fingerprint:</span>
                <code className="truncate font-mono text-[11px] text-cyan-600 dark:text-cyan-300">
                  {data.agent_fingerprint_sha256 || "—"}
                </code>
              </div>
            </div>
          </SecPanel>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityUpdates;