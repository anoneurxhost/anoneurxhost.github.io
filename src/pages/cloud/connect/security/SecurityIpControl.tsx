import { useState, useEffect } from "react";
import { Ban, RefreshCw, Plus, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type BlockEntry } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { SecLoading, SecOffline, SecPanel, SecSearchBar, SecStat, fmtTs, timeAgo, usePageTitle , useRefreshShortcut } from "./securityUI";

const SecurityIpControl = () => {
  usePageTitle("IP Control");
  const { data, mode, loading, error, refresh, setData } = useAsyncData<BlockEntry[]>(
    () => securityApi.ipList(),
    []
  );
  useRefreshShortcut(refresh);

  const [open, setOpen] = useState(false);
  const [cidr, setCidr] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById("ip-search")?.focus();
  }, [open]);

  const addBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cidr.trim()) return;
    setBusy(true);
    try {
      const res = await securityApi.ipAdd(cidr.trim(), reason.trim() || "Manual block");
      if (res.error) {
        toast.error(res.error);
      } else {
        setData(res.data);
        toast.success(`Blocked ${cidr}`);
        setCidr("");
        setReason("");
        setOpen(false);
      }
    } catch {
      toast.error("Failed to add block entry");
    } finally {
      setBusy(false);
    }
  };

  const removeBlock = async (targetCidr: string) => {
    try {
      const res = await securityApi.ipRemove(targetCidr);
      if (res.error) {
        toast.error(res.error);
      } else {
        setData(res.data);
        setConfirmRemove(null);
        toast.success(`Unblocked ${targetCidr}`);
      }
    } catch {
      toast.error("Failed to remove block");
    }
  };

  const blocks = data ?? [];
  const filtered = search
    ? blocks.filter(
        (b) => b.cidr.includes(search) || b.reason.toLowerCase().includes(search.toLowerCase())
      )
    : blocks;

  return (
    <ConnectSection
      title="IP Control & Blocklist"
      subtitle="Manage CIDRs blocked by the edge firewall."
      icon={Ban}
      actions={
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            {blocks.length > 0 ? `${blocks.length} blocks active` : "No blocks"}
          </span>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Block
              </Button>
            </DialogTrigger>
            <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white">
              <DialogHeader>
                <DialogTitle>Block CIDR or IP</DialogTitle>
              </DialogHeader>
              <form onSubmit={addBlock} className="space-y-4 pt-2">
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">CIDR / IP Address</Label>
                  <Input
                    value={cidr}
                    onChange={(e) => setCidr(e.target.value)}
                    placeholder="e.g. 192.168.4.12/32"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Reason</Label>
                  <Input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Automated scanner abuse"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" disabled={busy}>
                    {busy ? "Blocking…" : "Save Block"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {loading && <SecLoading label="Loading blocklist…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <SecStat value={blocks.length} label="Total blocks" tone={blocks.length > 0 ? "warn" : "ok"} />
            <SecStat value={filtered.length} label="Showing" />
            <SecStat value={blocks.length > 0 ? fmtTs(Math.max(...blocks.map((b) => b.created_at || 0))) : "—"} label="Latest block" />
          </div>

          <SecPanel title={`Active Blocks (${filtered.length})`}>
            <SecSearchBar id="ip-search" value={search} onChange={setSearch} placeholder="Search by CIDR or reason…" />
            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                {blocks.length === 0 ? "No blocked CIDRs configured." : "No blocks match your search."}
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">CIDR</th>
                      <th className="px-4 py-3">Reason</th>
                      <th className="px-4 py-3">Blocked</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {filtered.map((b) => (
                      <tr key={b.id || b.cidr} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">{b.cidr}</td>
                        <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{b.reason}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums" title={fmtTs(b.created_at)}>{timeAgo(b.created_at)}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmRemove(b.cidr)}
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
        </div>
      )}

      <Dialog open={!!confirmRemove} onOpenChange={(o) => !o && setConfirmRemove(null)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Unblock {confirmRemove}?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This removes the CIDR from the firewall blocklist. Traffic resumes immediately.
          </p>
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setConfirmRemove(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => confirmRemove && removeBlock(confirmRemove)}>
              Unblock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default SecurityIpControl;