import { useState } from "react";
import { KeyRound, Plus, Copy, Trash2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import DemoBanner from "./DemoBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";

const card = "rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)]";
const outlineBtn = "border-[var(--cc-border)] bg-[var(--cc-surface)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";
const primaryBtn = "bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold";
const secondaryBtn = "border-[var(--cc-border)] bg-[var(--cc-surface-2)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]";
const dialogContent = "bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white";
const inputCls = "bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] h-10";

const ConnectSSHKeys = () => {
  const { data: keys, setData, mode, loading, refresh } = useAsyncData(() => connectApi.sshKeys(), []);
  const [importOpen, setImportOpen] = useState(false);
  const [genOpen, setGenOpen] = useState(false);
  const [name, setName] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const doImport = async () => {
    if (!name.trim()) return toast.error("Give the key a name");
    if (!/^(ssh-(rsa|ed25519|dss)|ecdsa-)/.test(publicKey.trim()))
      return toast.error("That doesn't look like an OpenSSH public key");
    setBusy(true);
    const res = await connectApi.addSshKey(name.trim(), publicKey.trim());
    setData(res.data);
    setBusy(false);
    setImportOpen(false);
    setName("");
    setPublicKey("");
    toast.success("SSH key added");
  };

  const doGenerate = async () => {
    if (!name.trim()) return toast.error("Give the key a name");
    setBusy(true);
    const res = await connectApi.generateSshKey(name.trim());
    setData(res.data.keys);
    setPrivateKey(res.data.privateKey);
    setBusy(false);
    setGenOpen(false);
    setName("");
  };

  const remove = async (id: string, keyName: string) => {
    const res = await connectApi.removeSshKey(id);
    setData(res.data);
    toast.success(`Revoked "${keyName}"`);
  };

  return (
    <ConnectSection
      title="SSH Keys"
      subtitle="Import, generate, and revoke the keys used to authenticate console sessions."
      icon={KeyRound}
      actions={
        <>
          <Button variant="outline" onClick={() => { setName(""); setGenOpen(true); }} className={secondaryBtn}>
            <Sparkles className="w-4 h-4 mr-1.5" /> Generate
          </Button>
          <Button onClick={() => { setName(""); setPublicKey(""); setImportOpen(true); }} className={primaryBtn}>
            <Plus className="w-4 h-4 mr-1.5" /> Import key
          </Button>
        </>
      }
    >
      {mode === "demo" && <DemoBanner />}

      {loading ? (
        <div className={`${card} p-10 text-center text-[var(--cc-muted)]`}>
          <Loader2 className="w-5 h-5 animate-spin mx-auto text-[var(--cc-accent)]" />
        </div>
      ) : keys && keys.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {keys.map((k) => (
            <div key={k.id} className={`${card} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[var(--cc-accent)] shrink-0" />
                    <span className="font-semibold text-[var(--cc-text)] truncate">{k.name}</span>
                    <span className="rounded-full border border-[var(--cc-border)] bg-[var(--cc-surface-2)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--cc-text-2)]">
                      {k.type}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-[var(--cc-muted)] break-all">{k.fingerprint}</div>
                  <div className="mt-2 text-[11px] text-[var(--cc-muted-2)]">
                    Added {new Date(k.createdAt).toLocaleDateString()} ·{" "}
                    {k.lastUsed ? `last used ${new Date(k.lastUsed).toLocaleDateString()}` : "never used"}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => copy(k.publicKey, "Public key")}
                    className="w-8 h-8 grid place-items-center rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)] transition-colors"
                    aria-label={`Copy ${k.name} public key`}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => remove(k.id, k.name)}
                    className="w-8 h-8 grid place-items-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                    aria-label={`Revoke ${k.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${card} p-12 text-center text-[var(--cc-muted)]`}>
          <KeyRound className="w-6 h-6 mx-auto mb-3 opacity-60 text-[var(--cc-muted-2)]" />
          No SSH keys yet. Import an existing key or generate a new keypair.
        </div>
      )}

      {/* Import */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Import SSH public key</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Paste the contents of your <code className="font-mono">.pub</code> file. Never paste a private key.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-600 dark:text-slate-400">Key name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="ops-laptop" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-slate-600 dark:text-slate-400">Public key</Label>
              <Textarea value={publicKey} onChange={(e) => setPublicKey(e.target.value)}
                rows={5} placeholder="ssh-ed25519 AAAAC3Nza… user@host"
                className="bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] font-mono text-xs" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setImportOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]">Cancel</Button>
            <Button onClick={doImport} disabled={busy} className={primaryBtn}>
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Add key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate */}
      <Dialog open={genOpen} onOpenChange={setGenOpen}>
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Generate a new keypair</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              An ed25519 keypair is generated on the console backend. The private key is shown once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-600 dark:text-slate-400">Key name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="deploy-bot" className={inputCls} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setGenOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]">Cancel</Button>
            <Button onClick={doGenerate} disabled={busy} className={primaryBtn}>
              {busy && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />} Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Private key reveal */}
      <Dialog open={!!privateKey} onOpenChange={(o) => { if (!o) { setPrivateKey(null); refresh(); } }}>
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Save your private key</DialogTitle>
            <DialogDescription className="text-amber-600 dark:text-amber-400">
              This is the only time it will be shown. Store it somewhere safe.
            </DialogDescription>
          </DialogHeader>
          <pre className="max-h-56 overflow-auto rounded-xl border border-[var(--cc-border)] bg-[#0b0f14] p-4 font-mono text-[11px] text-slate-300 whitespace-pre-wrap break-all">
            {privateKey}
          </pre>
          <DialogFooter>
            <Button variant="outline" onClick={() => copy(privateKey ?? "", "Private key")} className={outlineBtn}>
              <Copy className="w-4 h-4 mr-1.5" /> Copy
            </Button>
            <Button onClick={() => { setPrivateKey(null); refresh(); }} className={primaryBtn}>
              I've saved it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectSSHKeys;