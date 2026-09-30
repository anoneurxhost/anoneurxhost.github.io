import { useState } from "react";
import { FileCheck, RefreshCw, DatabaseZap, FileSearch } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type IntegrityStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { SecAutoRefresh, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecSearchBar, SecStat, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const asList = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const SecurityIntegrity = () => {
  usePageTitle("File Integrity");
  const { data, mode, loading, error, refresh, setData } = useAsyncData<IntegrityStatus>(
    () => securityApi.integrity(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const [busy, setBusy] = useState("");
  const [tab, setTab] = useState<"changed" | "added" | "removed" | "all">("changed");
  const [search, setSearch] = useState("");

  const initBaseline = async () => {
    if (data?.baseline_exists) return;
    setBusy("init");
    try {
      const res = await securityApi.integrityInit();
      if (res.error) toast.error(res.error);
      else {
        setData({
          baseline_exists: true,
          baseline_created: res.data.created_at,
          tracked: res.data.tracked,
          changed: [],
          files: res.data.files,
        });
        toast.success(`Baseline captured — ${res.data.tracked} files tracked`);
      }
    } catch {
      toast.error("Failed to initialize baseline");
    } finally {
      setBusy("");
    }
  };

  const verifyIntegrity = async () => {
    setBusy("verify");
    try {
      const res = await securityApi.integrityVerify();
      if (res.error) toast.error(res.error);
      else {
        setData(res.data);
        toast.success(
          res.data.intact ? "Integrity verified — no changes" : "Integrity drift detected"
        );
        setTab("changed");
      }
    } catch {
      toast.error("Integrity verification failed");
    } finally {
      setBusy("");
    }
  };

  const changed = asList(data?.changed);
  const added = asList(data?.added);
  const removed = asList(data?.removed);
  const tracked = asList(data?.files);

  const tabs: { key: "changed" | "added" | "removed" | "all"; label: string; count: number }[] = [
    { key: "changed", label: "Changed", count: changed.length },
    { key: "added", label: "Added", count: added.length },
    { key: "removed", label: "Removed", count: removed.length },
    { key: "all", label: "All tracked", count: tracked.length },
  ];

  const current =
    tab === "changed" ? changed : tab === "added" ? added : tab === "removed" ? removed : tracked;

  const currentFiltered = search ? current.filter((f) => f.toLowerCase().includes(search.toLowerCase())) : current;

  const driftCount = changed.length + added.length + removed.length;

  return (
    <ConnectSection
      title="File Integrity Monitoring"
      subtitle="Immutable baseline of boot-critical files with change detection."
      icon={FileCheck}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <SecLiveStatus mode={mode} />
          <SecAutoRefresh enabled={autorefresh.enabled} onToggle={autorefresh.toggle} />
          <Button
            variant="outline"
            size="sm"
            onClick={verifyIntegrity}
            disabled={busy !== "" || !data?.baseline_exists}
            className="gap-2"
          >
            <FileSearch className="w-4 h-4" />
            {busy === "verify" ? "Verifying…" : "Verify Now"}
          </Button>
          <Button
            size="sm"
            onClick={initBaseline}
            disabled={busy !== "" || !data?.baseline_exists}
            className="gap-2"
          >
            <DatabaseZap className="w-4 h-4" />
            {busy === "init" ? "Building…" : "Initialize Baseline"}
          </Button>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      }
    >
      {loading && <SecLoading label="Reading integrity state…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat
              value={data.baseline_exists ? "Captured" : "No baseline"}
              label="Baseline"
              tone={data.baseline_exists ? "ok" : "warn"}
            />
            <SecStat value={data.tracked ?? 0} label="Files tracked" />
            <SecStat
              value={driftCount}
              label="Drift detected"
              tone={driftCount > 0 ? "danger" : "ok"}
            />
            <SecStat
              value={data.intact === undefined ? "Idle" : data.intact ? "Intact" : "Compromised"}
              label="Last verification"
              tone={data.intact === false ? "danger" : data.intact ? "ok" : "neutral"}
            />
          </div>

          {driftCount > 0 && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 dark:bg-red-500/[0.06] px-4 py-3 text-xs text-red-700 dark:text-red-200">
              <DatabaseZap className="w-4 h-4 shrink-0" />
              <p>
                Files changed since the baseline was captured. Investigate immediately, or reset the
                baseline after confirming safe.
              </p>
            </div>
          )}

          <SecPanel
            title={`File Manifest (${tracked.length || data.tracked || 0} tracked)`}
            actions={
              <div className="flex gap-1 overflow-x-auto max-w-full scrollbar-thin">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`shrink-0 px-2.5 py-1 rounded-md text-xs transition-colors ${
                      tab === t.key
                        ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-200 font-medium"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {t.label} <span className="tabular-nums">({t.count})</span>
                  </button>
                ))}
              </div>
            }
          >
            <SecSearchBar id="integrity-search" value={search} onChange={setSearch} placeholder="Filter files… (⌘K)" />
            {currentFiltered.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                {tab === "all" && !data.baseline_exists
                  ? "No baseline initialized yet. Capture one to start watching critical paths."
                  : search
                  ? "No files match your search."
                  : "Nothing here."}
              </div>
            ) : (
              <ul className="divide-y divide-slate-200/50 dark:divide-white/5 max-h-96 overflow-y-auto">
                {currentFiltered.map((f) => (
                  <li key={f} className="px-5 py-2.5 font-mono text-xs text-slate-700 dark:text-slate-300">
                    {f}
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

export default SecurityIntegrity;