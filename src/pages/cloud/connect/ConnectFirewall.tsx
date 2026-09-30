import { useState } from "react";
import { Shield, ShieldOff, Plus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const outlineBtn = "border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";
const primaryBtn = "bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold";
const dialogContent = "bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white";
const inputCls = "bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] h-10";

const ConnectFirewall = () => {
  const { data: rules, setData, mode, loading, refresh } = useAsyncData(() => connectApi.firewall(), []);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [proto, setProto] = useState<"tcp" | "udp" | "icmp">("tcp");
  const [action, setAction] = useState<"allow" | "deny">("allow");
  const [source, setSource] = useState("0.0.0.0/0");
  const [busy, setBusy] = useState(false);

  const add = async () => {
    const p = Number(port);
    if (!Number.isInteger(p) || p < 1 || p > 65535) return toast.error("Enter a valid port (1 – 65535)");
    setBusy(true);
    const res = await connectApi.addFirewallRule({ name: name.trim() || `port-${p}`, port: p, proto, action, source });
    setData(res.data);
    setBusy(false);
    setOpen(false);
    setName("");
    setPort("");
    toast.success(`Rule "${name.trim() || `port-${p}`}" added`);
  };

  const remove = async (id: string) => {
    const res = await connectApi.removeFirewallRule(id);
    setData(res.data);
    toast.success("Rule deleted");
  };

  return (
    <ConnectSection
      title="Firewall"
      subtitle="Access rules applied to the connected server."
      icon={Shield}
      actions={
        <>
          <Button variant="outline" onClick={refresh} className={outlineBtn}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={() => setOpen(true)} className={primaryBtn}>
            <Plus className="w-4 h-4 mr-1.5" /> Add rule
          </Button>
        </>
      }
    >
      {mode === "demo" && <DemoBanner />}

      <div className={`${card} overflow-hidden`}>
        {loading && !rules ? (
          <div className="p-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Name</th>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">Protocol</th>
                  <th className="text-left px-5 py-3 font-medium">Port</th>
                  <th className="text-left px-5 py-3 font-medium">Source</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--cc-border)]">
                {(rules ?? []).map((r) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3 font-medium text-[var(--cc-text)]">{r.name}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                          r.action === "allow"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {r.action === "allow" ? <Shield className="w-3 h-3" /> : <ShieldOff className="w-3 h-3" />}
                        {r.action}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[var(--cc-muted)] font-mono text-xs">{r.proto}</td>
                    <td className="px-5 py-3 font-mono text-[var(--cc-text-2)]">{r.port}</td>
                    <td className="px-5 py-3 font-mono text-xs text-[var(--cc-muted)]">{r.source}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => remove(r.id)}
                        className="w-8 h-8 inline-grid place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                        aria-label={`Delete ${r.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Add a firewall rule</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Rules apply immediately on the connected server.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-600 dark:text-slate-400">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="web-https" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Port</Label>
                <Input value={port} onChange={(e) => setPort(e.target.value)} placeholder="443"
                  className={`${inputCls} font-mono`} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Protocol</Label>
                <Select
                  value={proto}
                  onValueChange={(v) => setProto(v as "tcp" | "udp" | "icmp")}
                >
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white">
                    <SelectItem value="tcp">TCP</SelectItem>
                    <SelectItem value="udp">UDP</SelectItem>
                    <SelectItem value="icmp">ICMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-600 dark:text-slate-400">Source CIDR</Label>
              <Input value={source} onChange={(e) => setSource(e.target.value)}
                className={`${inputCls} font-mono`} />
            </div>
            <div className="flex gap-2">
              {(["allow", "deny"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAction(a)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition-colors ${
                    action === a
                      ? a === "allow"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
                      : "border-[var(--cc-border)] bg-[var(--cc-surface-2)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)]"
                  }`}
                >
                  {a === "allow" ? "Allow" : "Deny"}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]">
              Cancel
            </Button>
            <Button onClick={add} disabled={busy} className={primaryBtn}>
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Add rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectFirewall;