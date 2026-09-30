import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, Search, Loader2, PlugZap, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import ConnectSection from "./ConnectSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { connectApi, parseCidr, DiscoveredHost, isLiveBackend } from "./api";
import { useConnectSession } from "./ConnectSession";
import { useAsyncData } from "./useConnectData";
import DemoBanner from "./DemoBanner";

const MAX_HOSTS = 4096;

const dialogContent = "bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white";
const inputCls = "bg-[var(--cc-surface-2)] border-[var(--cc-border)] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] h-10";

const ConnectDiscover = () => {
  const navigate = useNavigate();
  const { connect } = useConnectSession();
  const { data: keys } = useAsyncData(() => connectApi.sshKeys(), []);

  const [cidr, setCidr] = useState("10.0.0.0/24");
  const [portsRaw, setPortsRaw] = useState("22, 80, 443, 8443");
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<DiscoveredHost[] | null>(null);
  const [demo, setDemo] = useState(false);

  const [target, setTarget] = useState<DiscoveredHost | null>(null);
  const [username, setUsername] = useState("root");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"password" | "key">("password");
  const [keyId, setKeyId] = useState<string>("");
  const [port, setPort] = useState("22");
  const [connecting, setConnecting] = useState(false);

  const info = parseCidr(cidr);

  const runScan = async () => {
    if (!info) {
      toast.error("Enter a valid CIDR range, e.g. 192.168.1.0/24");
      return;
    }
    if (info.hosts > MAX_HOSTS) {
      toast.error(`Range too large (${info.hosts.toLocaleString()} hosts). Use /20 or smaller.`);
      return;
    }
    const ports = portsRaw
      .split(/[,\s]+/)
      .map((p) => Number(p))
      .filter((p) => Number.isInteger(p) && p > 0 && p < 65536);
    if (ports.length === 0) {
      toast.error("Add at least one valid port to probe");
      return;
    }

    setScanning(true);
    setResults(null);
    const res = await connectApi.scan(cidr, ports);
    setResults(res.data);
    setDemo(res.mode === "demo");
    setScanning(false);
    toast.success(`Scan complete — ${res.data.length} host(s) responded`);
  };

  const openConnect = (host: DiscoveredHost) => {
    setTarget(host);
    setPassword("");
    setUsername("root");
    setAuthMode("password");
    setKeyId(keys?.[0]?.id ?? "");
    setPort(String(host.openPorts.includes(22) ? 22 : host.openPorts[0] ?? 22));
  };

  const submitConnect = async () => {
    if (!target) return;
    if (!username.trim()) return toast.error("Username is required");
    if (authMode === "password" && !password) return toast.error("Password is required");
    if (authMode === "key" && !keyId) return toast.error("Select an SSH key");

    setConnecting(true);
    const res = await connectApi.createSession({
      host: target.ip,
      port: Number(port) || 22,
      username: username.trim(),
      ...(authMode === "password" ? { password } : { keyId }),
    });
    setConnecting(false);
    setPassword("");

    connect(
      {
        name: target.hostname ?? target.ip,
        host: target.ip,
        username: username.trim(),
        port: Number(port) || 22,
        authMode,
        os: target.os,
      },
      res.data.token
    );
    setTarget(null);
    toast.success(`Connected to ${target.hostname ?? target.ip}`);
    navigate("/blacklink/dashboard");
  };

  return (
    <ConnectSection
      title="Discover Servers"
      subtitle="Sweep a CIDR range to find reachable nodes, then connect with a password or an SSH key."
      icon={Radar}
    >
      {(demo || !isLiveBackend()) && <DemoBanner />}

      <div className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)] p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_auto] gap-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs text-[var(--cc-text-2)]">CIDR range</Label>
            <Input
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="192.168.1.0/24"
              className={`h-11 font-mono ${inputCls}`}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-[var(--cc-text-2)]">Ports to probe</Label>
            <Input
              value={portsRaw}
              onChange={(e) => setPortsRaw(e.target.value)}
              placeholder="22, 80, 443"
              className={`h-11 font-mono ${inputCls}`}
            />
          </div>
          <Button
            onClick={runScan}
            disabled={scanning}
            className="h-11 bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold"
          >
            {scanning ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Search className="w-4 h-4 mr-1.5" />}
            {scanning ? "Scanning…" : "Scan range"}
          </Button>
        </div>

        <div className="mt-3 text-xs text-[var(--cc-muted)]">
          {info ? (
            <span className="font-mono">
              {info.network}/{info.prefix} · {info.hosts.toLocaleString()} usable hosts · {info.first} → {info.last}
            </span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400">Enter a valid IPv4 CIDR (prefix /8 – /32).</span>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-shadow)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[var(--cc-border)] text-sm font-semibold text-[var(--cc-text)] flex items-center justify-between">
          <span>Discovered hosts</span>
          {results && <span className="text-xs text-[var(--cc-muted)]">{results.length} result(s)</span>}
        </div>

        {scanning && (
          <div className="p-10 text-center text-sm text-[var(--cc-muted)]">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-3 text-[var(--cc-accent)]" />
            Probing {info?.hosts.toLocaleString()} addresses…
          </div>
        )}

        {!scanning && !results && (
          <div className="p-10 text-center text-sm text-[var(--cc-muted)]">
            <ShieldQuestion className="w-6 h-6 mx-auto mb-3 opacity-60 text-[var(--cc-muted-2)]" />
            Run a scan to list reachable nodes on your network.
          </div>
        )}

        {!scanning && results?.length === 0 && (
          <div className="p-10 text-center text-sm text-[var(--cc-muted)]">No hosts responded in this range.</div>
        )}

        {!scanning && results && results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="text-[11px] uppercase tracking-widest text-[var(--cc-muted)]">
                <tr>
                  <th className="text-left px-5 py-2 font-medium">IP</th>
                  <th className="text-left px-5 py-2 font-medium">Hostname</th>
                  <th className="text-left px-5 py-2 font-medium">Open ports</th>
                  <th className="text-left px-5 py-2 font-medium">OS</th>
                  <th className="text-left px-5 py-2 font-medium">Latency</th>
                  <th className="text-right px-5 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--cc-border)]">
                {results.map((h) => (
                  <tr key={h.ip} className="hover:bg-[var(--cc-surface-2)]">
                    <td className="px-5 py-3 font-mono text-[var(--cc-text)]">{h.ip}</td>
                    <td className="px-5 py-3 text-[var(--cc-text-2)]">{h.hostname ?? "—"}</td>
                    <td className="px-5 py-3 font-mono text-xs text-[var(--cc-accent)]">{h.openPorts.join(", ")}</td>
                    <td className="px-5 py-3 text-[var(--cc-muted)]">{h.os ?? "unknown"}</td>
                    <td className="px-5 py-3 text-[var(--cc-muted)]">{h.latencyMs} ms</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openConnect(h)}
                        className="border-[var(--cc-accent-border)] bg-[var(--cc-accent-soft)] text-[var(--cc-accent)] hover:bg-[var(--cc-accent-soft)]"
                      >
                        <PlugZap className="w-3.5 h-3.5 mr-1" /> Connect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <DialogContent className={dialogContent}>
          <DialogHeader>
            <DialogTitle>Connect to {target?.hostname ?? target?.ip}</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Credentials are used once to open the session and are never stored.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Port</Label>
                <Input value={port} onChange={(e) => setPort(e.target.value)} className={`${inputCls} font-mono`} />
              </div>
            </div>

            <div className="flex gap-2">
              {(["password", "key"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setAuthMode(m)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition-colors ${
                    authMode === m
                      ? "border-[var(--cc-accent-border)] bg-[var(--cc-accent-soft)] text-[var(--cc-accent)]"
                      : "border-[var(--cc-border)] bg-[var(--cc-surface-2)] text-[var(--cc-text-2)] hover:bg-[var(--cc-surface-hover)]"
                  }`}
                >
                  {m === "password" ? "Password" : "SSH key"}
                </button>
              ))}
            </div>

            {authMode === "password" ? (
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-600 dark:text-slate-400">SSH key</Label>
                <Select value={keyId} onValueChange={setKeyId}>
                  <SelectTrigger className={inputCls}>
                    <SelectValue placeholder="Select a key" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#10151c] border-slate-200 dark:border-[#26313d] text-slate-900 dark:text-white">
                    {(keys ?? []).map((k) => (
                      <SelectItem key={k.id} value={k.id}>
                        {k.name} · {k.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setTarget(null)}
              className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Cancel
            </Button>
            <Button
              onClick={submitConnect}
              disabled={connecting}
              className="bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-black font-semibold"
            >
              {connecting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <PlugZap className="w-4 h-4 mr-1.5" />}
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConnectSection>
  );
};

export default ConnectDiscover;