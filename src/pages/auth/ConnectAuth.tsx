import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useConnectSession } from "../cloud/connect/ConnectSession";
import { createSessionStrict, isLiveBackend } from "../cloud/connect/api";
import type { SessionInfo } from "../cloud/connect/api";
import logoJpeg from "@/assets/blacklink/logo.svg";

const connectSchema = z.object({
  ip: z.string().trim().min(1, "Enter a valid Server IP or Hostname"),
  username: z.string().trim().min(1, "Enter username"),
  password: z.string().min(1, "Enter password"),
});

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0";

export const ConnectAuth = () => {
  const { signIn, connect } = useConnectSession();
  const navigate = useNavigate();

  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveSession, setSaveSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = connectSchema.safeParse({ ip, username, password });
    if (!validation.success) {
      const msg = validation.error.issues[0].message;
      setError(msg);
      toast.error(msg);
      return;
    }

    const host = ip.split(":")[0].trim();
    const port = ip.includes(":") ? parseInt(ip.split(":")[1], 10) : 8443;

    setLoading(true);
    try {
      if (!isLiveBackend()) {
        // No console backend configured — local demo session only.
        await new Promise((r) => setTimeout(r, 600));
        signIn(`${username}@${ip}`);
        connect({
          name: `Node (${ip})`,
          host,
          username,
          port,
        });
        toast.success("Demo mode — connect a Blacklink console backend for live data.");
        navigate("/blacklink/dashboard");
        return;
      }

      const result = await createSessionStrict({ host, port, username, password });
      if (result.ok && result.body && "token" in result.body && result.body.token) {
        const session = result.body as SessionInfo;
        signIn(`${session.username}@${session.host}`);
        connect(
          {
            name: `Node (${session.host})`,
            host: session.host,
            username: session.username,
            port: session.port,
          },
          session.token
        );
        toast.success(`Connected to node ${session.host} (${session.hostname})`);
        navigate("/blacklink/dashboard");
        return;
      }

      // The gateway answered but rejected us.
      if (result.status === 401) {
        setError(`Invalid username or password for ${ip}.`);
        toast.error("Credentials rejected by the Blacklink console.");
      } else if (result.status === 0) {
        setError(
          "Could not reach the console backend. The dashboard connects through the console server, not directly to " +
            `${ip}. Check that the console server is running and reachable from this network.`
        );
        toast.error("Console backend unreachable.");
      } else {
        const msg =
          (result.body as { error?: string } | null)?.error ?? "Console rejected the connection.";
        setError(`${msg} (HTTP ${result.status}).`);
        toast.error("Failed to connect to the console.");
      }
    } catch (err: any) {
      setError(err?.message || "Connection failed. Check target IP and credentials.");
      toast.error("Failed to connect to the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Logo */}
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <img
          src={logoJpeg}
          alt="Black Wall Connect"
          className="w-16 h-16 object-contain mb-2"
        />
        <div className="text-xl font-brand tracking-wider text-white font-semibold">BLACK  L I NK</div>
      </div>

      <form onSubmit={handleConnect} className="space-y-4">
        {/* Server IP */}
        <div className="space-y-1.5">
          <Label htmlFor="connect-ip" className="text-xs text-gray-400">
            Server IP / Host Address
          </Label>
          <Input
            id="connect-ip"
            type="text"
            placeholder="192.168.1.100:8443"
            value={ip}
            onChange={(e) => {
              setIp(e.target.value);
              setError(null);
            }}
            required
            className={`${inputClass} font-mono`}
          />
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <Label htmlFor="connect-username" className="text-xs text-gray-400">
            Username
          </Label>
          <Input
            id="connect-username"
            type="text"
            placeholder="admin"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            required
            className={inputClass}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="connect-password" className="text-xs text-gray-400">
            Password
          </Label>
          <div className="relative">
            <Input
              id="connect-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium mt-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect Console"}
        </Button>
      </form>
    </div>
  );
};

export default ConnectAuth;
