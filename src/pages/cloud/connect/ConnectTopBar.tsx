import { Bell, ChevronDown, LogOut, Menu, Power, Repeat, Search, Server } from "lucide-react";
import { useState } from "react";
import { useConnectSession } from "./ConnectSession";
import { useNavigate, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { connectNavGroups } from "./connectNav";

const ConnectTopBar = () => {
  const { server, userLabel, signOut, disconnect } = useConnectSession();
  const [menu, setMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const online = server?.status === "online";

  const statusDot = (light = false) => (
    <span
      aria-hidden
      className={`shrink-0 rounded-full ${light ? "w-2 h-2" : "w-2.5 h-2.5"} ${
        online ? "bg-emerald-500 dark:bg-emerald-400" : "bg-[var(--cc-muted-2)]"
      }`}
    />
  );

  return (
    <header className="h-16 shrink-0 border-b border-[var(--cc-border)] bg-[var(--cc-surface)] flex items-center gap-3 sm:gap-4 px-4 md:px-6 z-20">
      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open menu"
            className="lg:hidden w-9 h-9 rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] hover:bg-[var(--cc-surface-hover)] grid place-items-center text-[var(--cc-text-2)] transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-72 bg-[var(--cc-surface-2)] border-r border-[var(--cc-border)] text-[var(--cc-text)] flex flex-col h-full"
        >
          <div className="px-4 py-5 border-b border-[var(--cc-border)]">
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

          <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
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
                    onClick={() => setMobileOpen(false)}
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
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-[var(--cc-accent)]" : "text-[var(--cc-muted-2)]"
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

          <div className="p-3 border-t border-[var(--cc-border)] bg-[var(--cc-surface)]">
            <div className="rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] p-3">
              <div className="flex items-center gap-2">
                {statusDot(true)}
                <div className="text-xs font-medium text-[var(--cc-text)] truncate">
                  {server ? server.name : "No node connected"}
                </div>
              </div>
              <div className="mt-3 flex gap-1.5">
                <NavLink
                  to="/blacklink/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-[var(--cc-surface-hover)] border border-[var(--cc-border)] text-[11px] text-[var(--cc-text-2)] py-1.5 font-medium hover:bg-[var(--cc-border)] transition-colors"
                >
                  <Repeat className="w-3 h-3" /> Switch
                </NavLink>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileOpen(false);
                  }}
                  disabled={!server}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-md bg-red-500/10 border border-red-500/30 text-[11px] text-red-600 dark:text-red-400 py-1.5 font-medium disabled:opacity-40 transition-colors"
                >
                  <Power className="w-3 h-3" /> Disconnect
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Node */}
      <div className="flex items-center gap-2.5 min-w-0">
        {statusDot()}
        <div className="min-w-0 leading-tight">
          <div className="text-[13px] font-semibold text-[var(--cc-text)] truncate">
            {server?.name ?? "Cloud Connect"}
          </div>
          <div className="text-[11px] text-[var(--cc-muted)] truncate">
            {server ? `${server.username}@${server.host}:${server.port}` : "No node connected"}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:block flex-1 max-w-md mx-auto">
        <label className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--cc-muted-2)]" />
          <input
            placeholder="Search resources, users, logs…"
            aria-label="Search"
            className="w-full h-9 rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] pl-9 pr-3 text-[13px] text-[var(--cc-text)] placeholder:text-[var(--cc-muted-2)] focus:border-[var(--cc-accent)] focus:ring-2 focus:ring-[var(--cc-accent-soft)] focus:outline-none transition-colors"
          />
        </label>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] hover:bg-[var(--cc-surface-hover)] grid place-items-center text-[var(--cc-text-2)] transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--cc-accent)] rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenu((v) => !v)}
            className="flex items-center gap-2 h-9 px-2.5 rounded-lg border border-[var(--cc-border)] bg-[var(--cc-surface-2)] hover:bg-[var(--cc-surface-hover)] text-[13px] text-[var(--cc-text-2)] transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black text-[11px] font-bold grid place-items-center">
              {userLabel.slice(0, 1).toUpperCase() || "A"}
            </div>
            <span className="hidden sm:inline max-w-[140px] truncate text-[var(--cc-text)]">
              {userLabel || "Operator"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--cc-muted-2)]" />
          </button>
          {menu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-lg p-1 z-50">
              <button
                onClick={() => {
                  signOut();
                  navigate("/blacklink/auth");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-600 dark:text-red-400 hover:bg-[var(--cc-surface-hover)] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ConnectTopBar;