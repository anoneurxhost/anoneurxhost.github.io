import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  HardDrive,
  Users,
  ShieldCheck,
  Terminal,
  Settings,
  Server,
  Power,
  Repeat,
  Radar,
  KeyRound,
  Webhook,
} from "lucide-react";
import { useConnectSession } from "./ConnectSession";

const groups: { label: string; items: { to: string; label: string; icon: typeof Server }[] }[] = [
  {
    label: "Overview",
    items: [
      { to: "/cloud/connect/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/cloud/connect/discover", label: "Discover", icon: Radar },
    ],
  },
  {
    label: "Server",
    items: [
      { to: "/cloud/connect/network", label: "Network", icon: Network },
      { to: "/cloud/connect/storage", label: "Storage", icon: HardDrive },
      { to: "/cloud/connect/users", label: "Users", icon: Users },
      { to: "/cloud/connect/firewall", label: "Firewall", icon: ShieldCheck },
      { to: "/cloud/connect/terminal", label: "Terminal", icon: Terminal },
    ],
  },
  {
    label: "Automation",
    items: [
      { to: "/cloud/connect/ssh-keys", label: "SSH Keys", icon: KeyRound },
      { to: "/cloud/connect/webhooks", label: "Webhooks", icon: Webhook },
      { to: "/cloud/connect/settings", label: "Settings", icon: Settings },
    ],
  },
];

const ConnectSidebar = () => {
  const { server, disconnect } = useConnectSession();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center">
            <Server className="w-4 h-4 text-black" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-widest text-cyan-300/80">Black Wall</div>
            <div className="text-sm font-semibold text-white truncate">Cloud Connect</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">{group.label}</div>
            {group.items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-200 border border-cyan-500/20"
                      : "text-slate-300 hover:bg-white/[0.04] hover:text-white border border-transparent"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                server?.status === "online" ? "bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]" : "bg-slate-500"
              }`}
              aria-hidden
            />
            <div className="text-xs text-slate-300 truncate">
              {server ? server.name : "No server connected"}
            </div>
          </div>
          {server && (
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">
              {server.username}@{server.host}:{server.port}
            </div>
          )}
          <div className="mt-3 flex gap-1.5">
            <NavLink
              to="/cloud/connect"
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-200 py-1.5"
            >
              <Repeat className="w-3 h-3" /> Switch
            </NavLink>
            <button
              onClick={disconnect}
              disabled={!server}
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-[11px] text-red-300 py-1.5 disabled:opacity-40"
            >
              <Power className="w-3 h-3" /> Disconnect
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ConnectSidebar;