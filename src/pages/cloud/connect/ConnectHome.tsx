import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { KeyRound, PlugZap, Server, Settings2, Wifi } from "lucide-react";
import { toast } from "sonner";
import { useConnectSession } from "./ConnectSession";

const schema = z.object({
  host: z.string().trim().min(1, "Server address is required").max(253),
  username: z.string().trim().min(1, "Username is required").max(64),
  password: z.string().min(1, "Password is required").max(200),
  port: z.coerce.number().int().min(1).max(65535),
});

const ConnectHome = () => {
  const { server, connect } = useConnectSession();
  const navigate = useNavigate();

  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState<number | "">(22);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState<null | "connect" | "test">(null);

  if (server) return <Navigate to="/cloud/connect/dashboard" replace />;

  const validate = () => {
    const parsed = schema.safeParse({ host, username, password, port });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return null;
    }
    return parsed.data;
  };

  const onConnect = async () => {
    const data = validate();
    if (!data) return;
    setBusy("connect");
    await new Promise((r) => setTimeout(r, 700));
    connect({ name: data.host, host: data.host, username: data.username, port: data.port });
    if (remember) {
      // Non-secret metadata only
      localStorage.setItem(
        "cloud-connect:last-server",
        JSON.stringify({ host: data.host, username: data.username, port: data.port })
      );
    }
    setBusy(null);
    toast.success(`Connected to ${data.host}`);
    navigate("/cloud/connect/dashboard");
  };

  const onTest = async () => {
    const data = validate();
    if (!data) return;
    setBusy("test");
    await new Promise((r) => setTimeout(r, 600));
    setBusy(null);
    toast.success("Connection reachable");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-widest text-cyan-300/90">
          <PlugZap className="w-3 h-3" /> Cloud Connect
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Connect a Server</h1>
        <p className="mt-2 text-slate-400 max-w-xl mx-auto">
          Securely connect and manage your infrastructure from anywhere.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center">
            <Server className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="text-sm font-semibold">New Connection</div>
            <div className="text-xs text-slate-400">SSH · Port 22 by default</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <Label className="text-xs text-slate-300">Server Address (IP or Hostname)</Label>
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="10.0.0.42  or  edge-01.blackwall.net"
              className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-300">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="root"
              className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-300">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 h-11"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-300">Port</Label>
            <Input
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="22"
              className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 h-11"
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 h-11">
            <span className="text-sm text-slate-200">Remember server</span>
            <Switch checked={remember} onCheckedChange={setRemember} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button
            onClick={onConnect}
            disabled={busy !== null}
            className="h-11 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold"
          >
            <PlugZap className="w-4 h-4 mr-1.5" />
            {busy === "connect" ? "Connecting…" : "Connect"}
          </Button>
          <Button
            variant="outline"
            className="h-11 border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"
            onClick={() => toast.message("SSH key import coming soon")}
          >
            <KeyRound className="w-4 h-4 mr-1.5" /> Import SSH Key
          </Button>
          <Button
            variant="ghost"
            className="h-11 text-slate-300 hover:bg-white/[0.05]"
            onClick={onTest}
            disabled={busy !== null}
          >
            <Wifi className="w-4 h-4 mr-1.5" />
            {busy === "test" ? "Testing…" : "Test Connection"}
          </Button>
          <Button
            variant="ghost"
            className="h-11 text-slate-300 hover:bg-white/[0.05]"
            onClick={() => toast.message("Advanced settings coming soon")}
          >
            <Settings2 className="w-4 h-4 mr-1.5" /> Advanced
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectHome;
