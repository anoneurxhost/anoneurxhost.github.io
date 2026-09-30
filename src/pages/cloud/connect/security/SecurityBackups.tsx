import { useEffect, useState } from "react";
import { Database, RefreshCw, Plus, RotateCcw, Trash2, CheckCircle2, XCircle, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type BackupStatus } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SecAutoRefresh, SecBadge, SecLiveStatus, SecLoading, SecOffline, SecPanel, SecStat, fmtBytes, timeAgo, useAutoRefresh, usePageTitle, useRefreshShortcut } from "./securityUI";

const RESTORE_STEPS = [
  "Requesting restore from archive",
  "Extracting archive contents",
  "Rewriting host files",
  "Restarting affected services",
  "Verifying restore",
] as const;

const SecurityBackups = () => {
  usePageTitle("Backups");
  const { data, mode, loading, error, refresh } = useAsyncData<BackupStatus>(
    () => securityApi.backups(),
    []
  );
  const autorefresh = useAutoRefresh(refresh);
  useRefreshShortcut(refresh);

  const [confirm, setConfirm] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (confirm) setRestoreError(null);
  }, [confirm]);

  const createBackup = async () => {
    setCreating(true);
    try {
      const res = await securityApi.backupCreate();
      if (res.error) toast.error(res.error);
      else {
        toast.success(`Backup created — ${res.data.name ?? "archive"}`);
        refresh();
      }
    } catch {
      toast.error("Backup creation failed");
    } finally {
      setCreating(false);
    }
  };

  const doRestore = async (name: string) => {
    setRestoring(name);
    setRestoreError(null);
    try {
      const res = await securityApi.backupRestore(name);
      if (res.error) {
        setRestoreError(res.error);
        toast.error(res.error);
      } else {
        toast.success(`Restored ${name}`);
        setConfirm(null);
        refresh();
      }
    } catch {
      setRestoreError("Restore failed — agent unreachable or archive corrupt.");
      toast.error("Restore failed");
    } finally {
      setRestoring(null);
    }
  };

  const doDelete = async (name: string) => {
    try {
      const res = await securityApi.backupDelete(name);
      if (res.error) toast.error(res.error);
      else {
        toast.success(`Deleted ${name}`);
        setConfirm(null);
        refresh();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const files = data?.files ?? [];

  return (
    <ConnectSection
      title="Host Backups"
      subtitle="Encrypted .acb archives taken by the agent."
      icon={Database}
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
          <Button size="sm" onClick={createBackup} disabled={creating} className="gap-2">
            <Plus className="w-4 h-4" /> {creating ? "Creating…" : "Create Backup"}
          </Button>
        </div>
      }
    >
      {loading && <SecLoading label="Loading backup catalog…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.count ?? files.length} label="Archives" />
            <SecStat value={timeAgo(data.latest)} label="Latest backup" />
            <SecStat value={data.encrypted ? "Encrypted" : "Plaintext"} label="Encryption" tone={data.encrypted ? "ok" : "danger"} />
            <SecStat value={data.protected ? "Protected" : "Exposed"} label="Permissions" tone={data.protected ? "ok" : "warn"} />
          </div>

          <SecPanel title={`Archive Catalog (${files.length})`}>
            {files.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                No backups on this host yet.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Archive</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Verified</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {files.map((f) => (
                      <tr key={f.name} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">{f.name}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums">{f.created_at ? timeAgo(f.created_at) : "—"}</td>
                        <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-300 tabular-nums">{fmtBytes(f.size_bytes)}</td>
                        <td className="px-4 py-3">
                          <SecBadge status={f.verified ? "ok" : "warn"}>{f.verified ? "verified" : "unverified"}</SecBadge>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirm(f.name)}
                            className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200 hover:bg-cyan-500/10"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => doDelete(f.name)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SecPanel>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 dark:bg-emerald-500/[0.06] px-4 py-3 text-xs text-emerald-700 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <p>
              {data.encrypted
                ? "Archives are AES-256 encrypted and protected on disk."
                : "Archives are stored without encryption — enable encryption in the agent before creating new backups."}
            </p>
          </div>
        </div>
      )}

      <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Restore {confirm}?</DialogTitle>
          </DialogHeader>

          {confirm && restoring === null && !restoreError && (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Files and services on this host will be rewritten from the archive. This action
                cannot be interrupted.
              </p>
              <DialogFooter className="pt-2 gap-2">
                <Button variant="outline" onClick={() => setConfirm(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => confirm && doRestore(confirm)}>
                  Restore Now
                </Button>
              </DialogFooter>
            </>
          )}

          {confirm && restoring === confirm && !restoreError && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-600 dark:text-cyan-300" />
                Restoring {confirm}…
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-white/5 overflow-hidden">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-cyan-500" />
              </div>
              <ul className="space-y-1.5">
                {RESTORE_STEPS.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-2 text-xs"
                  >
                    {i < RESTORE_STEPS.length - 2 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-600 dark:text-cyan-300" />
                    )}
                    <span className="text-slate-600 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {confirm && restoreError && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                <XCircle className="w-4 h-4" />
                Restore failed
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{restoreError}</p>
              <DialogFooter className="pt-1 gap-2">
                <Button variant="outline" onClick={() => setConfirm(null)}>
                  Close
                </Button>
                <Button variant="destructive" onClick={() => confirm && doRestore(confirm)}>
                  Retry Restore
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default SecurityBackups;