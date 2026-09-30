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

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const outlineBtn = "border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";
const primaryBtn = "bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold";
const dialogContent = "bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white";
const inputCls = "bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] h-10";

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
          <Button variant="outline" onClick={refresh} className={outlineBtn}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={() => setOpen(true)} className={primaryBtn}>
            <Plus className="w-4 h-4 mr-1.5" /> Add user
          </Button>
        </>
      }
    >
      {mode === "demo" && <DemoBanner />}

      <div className={`${card} overflow-hidden`}>
        {loading && !users ? (
          <div className="p-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-[var(--cc-accent)]" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">User</th>
                  <th className="text-left px-5 py-3 font-medium">Role</th>
                  <th className="text-left px-5 py-3 font-medium">Shell</th>
                  <th className="text-left px-5 py-3 font-medium">Sudo</th>
                  <th className="text-left px-5 py-3 font-medium">Last active</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--cc-border)]">
                {(users ?? []).map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3 font-mono text-[var(--cc-text)]">{u.name}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-[var(--cc-border)] bg-[var(--cc-surface-2)] px-2 py-0.5 text-[11px] text-[var(--cc-text-2)]">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[var(--cc-muted)] font-mono text-xs">{u.shell}</td>
                    <td className="px-5 py-3 text-[var(--cc-muted)]">{u.sudo ? "yes" : "no"}</td>
                    <td className="px-5 py-3 text-[var(--cc-muted)]">{u.last}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => remove(u.id, u.name)}
                        className="w-8 h-8 inline-grid place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 disabled:opacity-30 transition-colors"
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
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Add a system user</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              The account is created without a password — assign an SSH key to grant access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-600 dark:text-slate-400">Username</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="deploy"
                className={`${inputCls} font-mono`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white">
                    {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Shell</Label>
                <Input value={shell} onChange={(e) => setShell(e.target.value)}
                  className={`${inputCls} font-mono`} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface-2)] px-4 h-11">
              <span className="text-sm text-[var(--cc-text-2)]">Grant sudo</span>
              <Switch checked={sudo} onCheckedChange={setSudo} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]">
              Cancel
            </Button>
            <Button onClick={add} disabled={busy} className={primaryBtn}>
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Create user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectUsers;