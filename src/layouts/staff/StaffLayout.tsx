import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageSquare,
  Sparkles,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/contexts/NotificationContext";
import { useUserContext } from "@/contexts/UserContext";
import { StaffSidebar } from "./StaffSidebar";
import {
  STAFF_CONSOLES,
  resolveStaffRole,
  staffRoleFromPath,
} from "./staff.config";

/**
 * Shared staff shell — mirrors the participant portal shell (ambient glow
 * background, collapsible sidebar, fixed top bar, single scroll area) while
 * keeping each staff role in its own strictly separate namespace.
 */
export const StaffLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { logout } = useUserContext();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("staff.sidebar.collapsed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("staff.sidebar.collapsed", collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const routeRole = staffRoleFromPath(location.pathname);
  const sessionRole = useMemo(() => resolveStaffRole(), []);
  const role = routeRole ?? sessionRole;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!role) return <Navigate to="/dashboard" replace />;

  const consoleConfig = STAFF_CONSOLES[role];
  const activeItem = [...consoleConfig.menu]
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`)
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
              <StaffSidebar
                role={role}
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
        {/* Desktop sidebar */}
        <aside className="hidden lg:block h-full shrink-0">
          <StaffSidebar role={role} collapsed={collapsed} onLogout={handleLogout} />
        </aside>

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
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
                {collapsed ? (
                  <ChevronsRight className="h-5 w-5" />
                ) : (
                  <ChevronsLeft className="h-5 w-5" />
                )}
              </Button>

              <div className="hidden md:block">
                <p className="text-[11px] text-slate-500 font-medium">
                  {consoleConfig.name}
                </p>
                <h2 className="text-sm font-semibold text-white leading-tight">
                  {activeItem?.label ?? "Overview"}
                </h2>
              </div>

              <div className="ml-auto flex items-center gap-1.5">
                <Badge
                  variant="outline"
                  className="hidden sm:inline-flex border-white/15 text-slate-300 uppercase tracking-wider"
                >
                  {role}
                </Badge>
                <Link to={`${consoleConfig.home}/notifications`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-slate-300 hover:text-white hover:bg-white/10"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to={`${consoleConfig.home}/chat`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-white hover:bg-white/10"
                    aria-label="Messages"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to={`${consoleConfig.home}/profile`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-white"
                    aria-label="Profile"
                  >
                    <User className="h-5 w-5" />
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
              Anoneurx {consoleConfig.name} — role-scoped access, one account one
              console.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
