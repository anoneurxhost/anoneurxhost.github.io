import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageSquare,
  Search,
  Sparkles,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortal } from "./PortalContext";
import { PORTAL_SYSTEMS } from "./portal.config";
import { useAuth } from "@/contexts/AuthContext";
import { ProgramSidebar } from "./components/ProgramSidebar";

const isActive = (path: string, current: string) => {
  if (path === "/portal") return current === "/portal";
  return current.startsWith(path);
};

export const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("portal.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, enrolledModules, unreadNotifications, unreadMessages } =
    usePortal();
  const { logout } = useAuth();

  useEffect(() => {
    try {
      localStorage.setItem("portal.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const currentSection = [...PORTAL_SYSTEMS, ...enrolledModules].find((s) =>
    isActive(s.route, location.pathname)
  );

  return (
    <div className="h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_60%)]" />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 -right-12 h-9 w-9 bg-black/60 backdrop-blur text-white"
              >
                <X className="h-5 w-5" />
              </Button>
              <ProgramSidebar
                collapsed={false}
                forceExpanded
                onLogout={handleLogout}
                onNavigate={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex h-full">
        {/* Desktop sidebar — fixed, does not scroll */}
        <aside className="hidden lg:block h-full shrink-0">
          <ProgramSidebar
            collapsed={collapsed}
            onLogout={handleLogout}
          />
        </aside>

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {/* Top bar */}
          <header className="shrink-0 z-30 backdrop-blur-xl bg-black/30 border-b border-white/10">
            <div className="flex items-center gap-3 px-4 md:px-6 h-16">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:inline-flex text-slate-300 hover:text-white"
                aria-label="Toggle sidebar"
              >
                {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
              </Button>

              <div className="hidden md:block">
                <p className="text-[11px] text-slate-500 font-medium">Portal</p>
                <h2 className="text-sm font-semibold text-white leading-tight">
                  {currentSection?.name ?? "Dashboard"}
                </h2>
              </div>

              {/* Search */}
              <Link
                to="/portal/search"
                className="flex-1 max-w-md ml-auto hidden sm:flex items-center gap-2 h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm text-slate-400 hover:border-white/20 hover:text-slate-300 transition-colors"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">Search programs, tasks, courses…</span>
                <kbd className="hidden md:inline-flex h-5 items-center rounded border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-slate-500">
                  ⌘K
                </kbd>
              </Link>

              <div className="ml-auto sm:ml-0 flex items-center gap-1.5">
                <Link to="/portal/notifications">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-slate-300 hover:text-white hover:bg-white/10"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/portal/messages">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-slate-300 hover:text-white hover:bg-white/10"
                    aria-label="Messages"
                  >
                    <MessageSquare className="h-5 w-5" />
                    {unreadMessages > 0 && (
                      <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-emerald-500 text-[10px] font-bold flex items-center justify-center">
                        {unreadMessages}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/portal/profile">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-white"
                    aria-label="Profile"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white">
                      {user.initials}
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Page content — the only scrollable area */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-[1400px] w-full mx-auto">
              <Outlet />
            </div>
          </main>

          <footer className="shrink-0 px-4 md:px-8 py-6 text-center">
            <p className="text-xs text-slate-600 flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Anoneurx Unified Participant Portal — one account, every program.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PortalLayout;
