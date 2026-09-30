import { NavLink } from "react-router-dom";
import { Power, Repeat, Server } from "lucide-react";
import { useConnectSession } from "./ConnectSession";
import { connectNavGroups } from "./connectNav";

const ConnectSidebar = () => {
  const { server, disconnect } = useConnectSession();
  const online = server?.status === "online";

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-[var(--cc-border)] bg-[var(--cc-surface-2)] h-full">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-[var(--cc-border)] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-black shadow-sm">
            <Server className="w-[18px] h-[18px]" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--cc-accent)] font-bold">Black Wall</div>
            <div className="text-sm font-semibold text-[var(--cc-text)] truncate">Cloud Connect</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto scrollbar-thin">
        {connectNavGroups.map((group) => (
          <div key={group.label} className="space-y-0.5">
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--cc-muted-2)]">
              {group.label}
            </div>
            {group.items.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                    isActive
                      ? "bg-[var(--cc-accent-soft)] text-[var(--cc-text)] font-semibold"
                      : "text-[var(--cc-muted)] hover:bg-[var(--cc-surface-hover)] hover:text-[var(--cc-text)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-[var(--cc-accent)]"
                      />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-[var(--cc-accent)]" : "text-[var(--cc-muted-2)] group-hover:text-[var(--cc-accent)]"
                      }`}
                    />
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Node status */}
      <div className="p-3 border-t border-[var(--cc-border)] bg-[var(--cc-surface)] shrink-0">
        <div className="rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-semibold text-[var(--cc-text)] truncate">
              {server ? server.name : "No node connected"}
            </div>
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide ${
                online ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--cc-muted)]"
              }`}
            >
              <span
                aria-hidden
                className={`w-1.5 h-1.5 rounded-full ${
                  online ? "bg-emerald-500 dark:bg-emerald-400" : "bg-[var(--cc-muted-2)]"
                } ${online ? "animate-pulse" : ""}`}
              />
              {online ? "Online" : "Offline"}
            </span>
          </div>
          {server && (
            <div className="text-[11px] text-[var(--cc-muted)] mt-1 truncate">
              {server.username}@{server.host}:{server.port}
            </div>
          )}
          <div className="mt-3 flex gap-1.5">
            <NavLink
              to="/blacklink/dashboard"
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-[var(--cc-surface-hover)] hover:bg-[var(--cc-border)] border border-[var(--cc-border)] text-[11px] text-[var(--cc-text-2)] hover:text-[var(--cc-text)] py-1.5 font-medium transition-colors"
            >
              <Repeat className="w-3 h-3" /> Switch
            </NavLink>
            <button
              onClick={disconnect}
              disabled={!server}
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[11px] text-red-600 dark:text-red-400 py-1.5 font-medium disabled:opacity-40 transition-colors"
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