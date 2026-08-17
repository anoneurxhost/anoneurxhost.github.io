import { useState } from "react";
import { Users, Plus, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const ROLES = ["superuser", "admin", "service", "readonly"];

const ConnectUsers = () => {
  const { data: users, setData, mode, loading, refresh } = useAsyncData(() => connectApi.users(), []);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [shell, setShell] = useState("/bin/bash");
  const [sudo, setSudo] = useState(false);
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!/^[a-z_][a-z0-9_-]{0,31}$/.test(name.trim()))
      return toast.error("Use a valid POSIX username (lowercase, no spaces)");
    setBusy(true);
    const res = await connectApi.addUser({ name: name.trim(), role, shell, sudo });
    setData(res.data);
    setBusy(false);
    setOpen(false);
    setName("");
    toast.success(`User "${name.trim()}" created`);
  };

  const remove = async (id: string, uname: string) => {
    if (uname === "root") return toast.error("The root account cannot be removed");
    const res = await connectApi.removeUser(id);
    setData(res.data);
    toast.success(`Removed "${uname}"`);
  };

  return (
    <ConnectSection
      title="Users"
      subtitle="Accounts, roles, and access sessions on the connected server."
      icon={Users}
      actions={
        <>
          <Button variant="outline" onClick={refresh} className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
            <Plus className="w-4 h-4 mr-1.5" /> Add user
          </Button>
        </>
      }
    >
      {mode === "demo" && <DemoBanner />}

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        {loading && !users ? (
          <div className="p-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-300" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="text-[11px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">User</th>
                  <th className="text-left px-5 py-3 font-medium">Role</th>
                  <th className="text-left px-5 py-3 font-medium">Shell</th>
                  <th className="text-left px-5 py-3 font-medium">Sudo</th>
                  <th className="text-left px-5 py-3 font-medium">Last active</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(users ?? []).map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3 font-mono text-slate-200">{u.name}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-slate-300">{u.role}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 font-mono text-xs">{u.shell}</td>
                    <td className="px-5 py-3 text-slate-400">{u.sudo ? "yes" : "no"}</td>
                    <td className="px-5 py-3 text-slate-400">{u.last}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => remove(u.id, u.name)}
                        className="w-8 h-8 inline-grid place-items-center rounded-lg border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20 disabled:opacity-30"
                        disabled={u.name === "root"}
                        aria-label={`Remove ${u.name}`}
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
        <DialogContent className="bg-[#0a0d12] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add a system user</DialogTitle>
            <DialogDescription className="text-slate-400">
              The account is created without a password — assign an SSH key to grant access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-300">Username</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="deploy"
                className="bg-white/[0.04] border-white/10 text-white h-10 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-white/[0.04] border-white/10 text-white h-10"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#0a0d12] border-white/10 text-white">
                    {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-300">Shell</Label>
                <Input value={shell} onChange={(e) => setShell(e.target.value)}
                  className="bg-white/[0.04] border-white/10 text-white h-10 font-mono" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 h-11">
              <span className="text-sm text-slate-200">Grant sudo</span>
              <Switch checked={sudo} onCheckedChange={setSudo} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-300 hover:bg-white/[0.06]">Cancel</Button>
            <Button onClick={add} disabled={busy} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Create user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectUsers;