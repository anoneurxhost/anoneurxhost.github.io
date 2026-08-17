import { useNavigate } from "react-router-dom";
import {
  Activity,
  Power,
  RotateCw,
  Terminal,
  Download,
  Database,
  RefreshCw,
  Loader2,
  Radar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useConnectSession } from "./ConnectSession";
import { connectApi } from "./api";
import { useAsyncData } from "./useConnectData";
import DemoBanner from "./DemoBanner";

const toneMap = {
  cyan: "from-cyan-400/20 to-blue-500/10 text-cyan-300 border-cyan-400/20",
  emerald: "from-emerald-400/20 to-emerald-600/10 text-emerald-300 border-emerald-400/20",
  amber: "from-amber-400/20 to-orange-500/10 text-amber-300 border-amber-400/20",
  red: "from-red-400/20 to-red-600/10 text-red-300 border-red-400/20",
} as const;

const barToneMap = {
  cyan: "bg-cyan-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
} as const;

const ConnectDashboard = () => {
  const { server, disconnect } = useConnectSession();
  const navigate = useNavigate();
  const { data, mode, loading, refresh } = useAsyncData(() => connectApi.metrics(), []);

  const power = async (action: "reboot" | "shutdown") => {
    await connectApi.power(action);
    if (action === "shutdown") {
      disconnect();
      toast.success("Shutdown signal sent — session closed");
      navigate("/cloud/connect");
    } else {
      toast.success("Reboot signal sent");
      setTimeout(refresh, 800);
    }
  };

  const quickActions = [
    { label: "Terminal", icon: Terminal, onClick: () => navigate("/cloud/connect/terminal") },
    { label: "Discover", icon: Radar, onClick: () => navigate("/cloud/connect/discover") },
    { label: "Updates", icon: Download, onClick: () => toast.message("Checking for updates…") },
    { label: "Backups", icon: Database, onClick: () => toast.message("Backup snapshot queued") },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-300" />
            <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">Cloud Connect</div>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Control Panel</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {server
              ? `${server.username}@${server.host}:${server.port}${server.os ? ` · ${server.os}` : ""}`
              : "No server connected"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={refresh}
            className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
                <RotateCw className="w-4 h-4 mr-1.5" /> Reboot
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0a0d12] border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Reboot this server?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Running services will be interrupted while the node restarts.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/[0.04] border-white/10 text-slate-200">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => power("reboot")} className="bg-amber-500 text-black hover:bg-amber-400">
                  Reboot
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20">
                <Power className="w-4 h-4 mr-1.5" /> Shutdown
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#0a0d12] border-white/10 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Shut down this server?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  The node will power off and your console session will end.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/[0.04] border-white/10 text-slate-200">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => power("shutdown")} className="bg-red-500 text-white hover:bg-red-400">
                  Shut down
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      {mode === "demo" && <DemoBanner />}

      {loading && !data ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-cyan-300" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {(data?.metrics ?? []).map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`rounded-2xl border bg-gradient-to-br ${toneMap[m.tone]} p-5 backdrop-blur-xl`}
              >
                <div className="text-[11px] uppercase tracking-widest opacity-80">{m.label}</div>
                <div className="mt-2 text-2xl font-bold text-white">{m.value}</div>
                <div className="mt-0.5 text-xs text-slate-400">{m.detail}</div>
                {m.progress !== undefined && (
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${barToneMap[m.tone]}`} style={{ width: `${m.progress}%` }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 text-sm font-semibold">Recent activity</div>
              <ul className="divide-y divide-white/5">
                {(data?.activity ?? []).map((a, i) => (
                  <li key={i} className="px-5 py-3 flex items-start gap-3 text-sm">
                    <span className="text-[11px] text-slate-500 w-20 shrink-0 pt-0.5">{a.time}</span>
                    <span className="text-slate-300">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
              <div className="text-sm font-semibold mb-4">Quick actions</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map(({ label, icon: Icon, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-4 text-xs text-slate-200 hover:bg-white/[0.07] transition-colors"
                  >
                    <Icon className="w-4 h-4 text-cyan-300" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectDashboard;