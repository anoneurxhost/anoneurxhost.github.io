import { useState, useEffect } from "react";
import { KeyRound, RefreshCw, Plus, Eye, Trash2, Copy, Check, Lock, ShieldCheck, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "../ConnectSection";
import { securityApi, type SecretsView } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SecLoading, SecOffline, SecPanel, SecSearchBar, SecStat, fmtTs, timeAgo, usePageTitle } from "./securityUI";

const SecuritySecrets = () => {
  usePageTitle("Secrets Vault");
  const { data, mode, loading, error, refresh } = useAsyncData<SecretsView>(
    () => securityApi.secrets(),
    []
  );

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [revealed, setRevealed] = useState<{ name: string; value: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // ⌘K focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("secret-search")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const addSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !value) return;
    setBusy(true);
    try {
      const res = await securityApi.secretSet(name.trim(), value);
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.data.updated ? "Secret updated" : "Secret stored");
        setOpen(false);
        setName("");
        setValue("");
        refresh();
      }
    } catch {
      toast.error("Failed to store secret");
    } finally {
      setBusy(false);
    }
  };

  const revealSecret = async (name: string) => {
    const res = await securityApi.secretGet(name);
    if (res.error) toast.error(res.error);
    else setRevealed({ name, value: res.data.value });
  };

  const deleteSecret = async (name: string) => {
    const res = await securityApi.secretDelete(name);
    if (res.error) toast.error(res.error);
    else {
      toast.success(`Deleted ${name}`);
      setConfirmDelete(null);
      refresh();
    }
  };

  const copyRevealed = async () => {
    if (!revealed) return;
    try {
      await navigator.clipboard.writeText(revealed.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const secrets = data?.secrets ?? [];
  const filtered = search
    ? secrets.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : secrets;

  return (
    <ConnectSection
      title="Secrets Vault"
      subtitle="Encrypted at-rest key/value store (ChaCha20-Poly1305)."
      icon={KeyRound}
      actions={
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            {data?.encrypted ? "AES-256 encrypted" : "Plaintext"}
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
                <Plus className="w-4 h-4" /> Add Secret
              </Button>
            </DialogTrigger>
            <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white">
              <DialogHeader>
                <DialogTitle>Store Secret</DialogTitle>
              </DialogHeader>
              <form onSubmit={addSecret} className="space-y-4 pt-2">
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. db_password"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-500 dark:text-slate-400">Value</Label>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="password"
                    placeholder="Super secret value…"
                    className="mt-1.5 h-10 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white font-mono text-xs"
                    required
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" disabled={busy}>
                    {busy ? "Encrypting…" : "Save Secret"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      {loading && <SecLoading label="Opening vault…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.count ?? secrets.length} label="Secrets stored" />
            <SecStat value={data.version ?? 1} label="Vault version" />
            <SecStat
              value={filtered.length}
              label="Showing"
            />
            <SecStat
              value={data.encrypted ? "Secure" : "At risk"}
              label="Encryption mode"
              tone={data.encrypted ? "ok" : "danger"}
            />
          </div>

          <SecPanel title="Entries">
            <SecSearchBar id="secret-search" value={search} onChange={setSearch} placeholder="Search secrets… (⌘K)" />
            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400 flex flex-col items-center gap-2">
                <Lock className="w-8 h-8 text-slate-400" />
                <p>{secrets.length === 0 ? "Vault is empty. Add a secret to get started." : "No secrets match your search."}</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3">Updated</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {filtered.map((s) => (
                      <tr key={s.id || s.name} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">{s.name}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums" title={fmtTs(s.created_at)}>{timeAgo(s.created_at)}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums" title={fmtTs(s.updated_at)}>{timeAgo(s.updated_at)}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => revealSecret(s.name)}
                            className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200 hover:bg-cyan-500/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmDelete(s.name)}
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

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-1">
            {data.encrypted ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> : <ShieldOff className="w-3.5 h-3.5 text-red-500" />}
            {data.encrypted
              ? "Values are encrypted at rest and decrypted only on demand by the agent."
              : "Encryption is disabled — values are stored as plaintext."}
          </div>
        </div>
      )}

      {/* Reveal dialog */}
      <Dialog open={!!revealed} onOpenChange={(o) => !o && setRevealed(null)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Reveal Secret — {revealed?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/[0.07] px-4 py-3">
              <code className="flex-1 break-all font-mono text-xs text-amber-800 dark:text-amber-200">{revealed?.value}</code>
              <Button variant="outline" size="sm" onClick={copyRevealed} className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Shown in cleartext once by the agent. Copy it now — treat it as compromised afterwards.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm delete dialogs */}
      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent className="border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 text-slate-900 dark:text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete "{confirmDelete}"?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This permanently removes the secret from the vault and cannot be undone.
          </p>
          <DialogFooter className="pt-2 gap-2">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => confirmDelete && deleteSecret(confirmDelete)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default SecuritySecrets;