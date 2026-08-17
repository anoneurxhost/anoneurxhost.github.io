import { useState } from "react";
import { ShieldCheck, Plus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { connectApi, FirewallRule } from "./api";
import { useAsyncData } from "./useConnectData";

const ConnectFirewall = () => {
  const { data: rules, setData, mode, loading, refresh } = useAsyncData(() => connectApi.firewall(), []);
  const [open, setOpen] = useState(false);
  const [port, setPort] = useState("");
  const [proto, setProto] = useState<FirewallRule["proto"]>("tcp");
  const [src, setSrc] = useState("0.0.0.0/0");
  const [action, setAction] = useState<FirewallRule["action"]>("allow");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!/^\d{1,5}(-\d{1,5})?$/.test(port.trim())) return toast.error("Enter a port or range, e.g. 8080 or 3000-3010");
    if (!/^\d{1,3}(\.\d{1,3}){3}\/\d{1,2}$/.test(src.trim())) return toast.error("Source must be a CIDR, e.g. 10.0.0.0/8");
    setBusy(true);
    const res = await connectApi.addRule({ port: port.trim(), proto, src: src.trim(), action, note: note.trim() || undefined });
    setData(res.data);
    setBusy(false);
    setOpen(false);
    setPort(""); setNote("");
    toast.success("Firewall rule added");
  };

  const remove = async (id: string) => {
    const res = await connectApi.removeRule(id);
    setData(res.data);
    toast.success("Rule removed");
  };

  return (
    <ConnectSection
      title="Firewall"
      subtitle="Ingress and egress rules for the connected server."
      icon={ShieldCheck}
      actions={
        <>
          <Button variant="outline" onClick={refresh} className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
            <Plus className="w-4 h-4 mr-1.5" /> Add rule
          </Button>
        </>
      }
    >
      {mode === "demo" && <DemoBanner />}

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        {loading && !rules ? (
          <div className="p-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-300" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Port</th>
                  <th className="text-left px-5 py-3 font-medium">Protocol</th>
                  <th className="text-left px-5 py-3 font-medium">Source</th>
                  <th className="text-left px-5 py-3 font-medium">Note</th>
                  <th className="text-left px-5 py-3 font-medium">Action</th>
                  <th className="text-right px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(rules ?? []).map((r) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3 font-mono text-slate-200">{r.port}</td>
                    <td className="px-5 py-3 text-slate-300 uppercase">{r.proto}</td>
                    <td className="px-5 py-3 font-mono text-slate-400 text-xs">{r.src}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{r.note ?? "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] border ${
                        r.action === "allow"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-red-400/30 bg-red-400/10 text-red-300"
                      }`}>{r.action}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => remove(r.id)} aria-label="Remove rule"
                        className="w-8 h-8 inline-grid place-items-center rounded-lg border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20">
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
        <DialogContent className="bg-[#0a0d12] border-white/10 text-white">
          <DialogHeader><DialogTitle>New firewall rule</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Port</Label>
              <Input value={port} onChange={(e) => setPort(e.target.value)} placeholder="443"
                className="bg-white/[0.04] border-white/10 text-white h-10 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Protocol</Label>
              <Select value={proto} onValueChange={(v) => setProto(v as FirewallRule["proto"])}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-white h-10"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#0a0d12] border-white/10 text-white">
                  <SelectItem value="tcp">TCP</SelectItem>
                  <SelectItem value="udp">UDP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Source CIDR</Label>
              <Input value={src} onChange={(e) => setSrc(e.target.value)}
                className="bg-white/[0.04] border-white/10 text-white h-10 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Action</Label>
              <Select value={action} onValueChange={(v) => setAction(v as FirewallRule["action"])}>
                <SelectTrigger className="bg-white/[0.04] border-white/10 text-white h-10"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#0a0d12] border-white/10 text-white">
                  <SelectItem value="allow">Allow</SelectItem>
                  <SelectItem value="deny">Deny</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs text-slate-300">Note (optional)</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="HTTPS ingress"
                className="bg-white/[0.04] border-white/10 text-white h-10" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-300 hover:bg-white/[0.06]">Cancel</Button>
            <Button onClick={add} disabled={busy} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Add rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectFirewall;