import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useConnectSession } from "./ConnectSession";
import { useNavigate } from "react-router-dom";

const ConnectTopBar = () => {
  const { server, userLabel, signOut } = useConnectSession();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center gap-4 px-4 md:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className={`w-2 h-2 rounded-full ${
            server?.status === "online" ? "bg-emerald-400" : "bg-slate-500"
          }`}
        />
        <div className="text-sm font-medium text-white truncate">
          {server?.name ?? "Cloud Connect"}
        </div>
        {server && (
          <span className="hidden sm:inline text-[11px] text-slate-500 truncate">· {server.host}</span>
        )}
      </div>

      <div className="flex-1 max-w-md hidden md:block">
        <label className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
          <input
            placeholder="Search resources, users, logs…"
            className="w-full h-9 rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none"
          />
        </label>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] grid place-items-center text-slate-300"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenu((v) => !v)}
            className="flex items-center gap-2 h-9 px-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-sm text-slate-200"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-black text-[11px] font-bold grid place-items-center">
              {userLabel.slice(0, 1).toUpperCase() || "A"}
            </div>
            <span className="hidden sm:inline max-w-[140px] truncate">{userLabel || "Operator"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {menu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl p-1 shadow-2xl z-50">
              <button
                onClick={() => {
                  signOut();
                  navigate("/cloud/connect/auth");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-200 hover:bg-white/[0.06] rounded-lg"
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
