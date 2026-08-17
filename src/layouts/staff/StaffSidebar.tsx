import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import logoImg from "@/assets/logo.jpeg";
import { STAFF_CONSOLES, type StaffRole } from "./staff.config";

const itemIsActive = (path: string, pathname: string, home: string) => {
  if (path === home) return pathname === home || pathname === `${home}/`;
  return pathname === path || pathname.startsWith(`${path}/`);
};

export const StaffSidebar = ({
  role,
  collapsed,
  forceExpanded = false,
  onLogout,
  onNavigate,
}: {
  role: StaffRole;
  collapsed: boolean;
  forceExpanded?: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
}) => {
  const { pathname } = useLocation();
  const isCollapsed = collapsed && !forceExpanded;
  const consoleConfig = STAFF_CONSOLES[role];

  const itemClass = (active: boolean) =>
    cn(
      "relative flex items-center gap-3.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
      isCollapsed && "justify-center px-2",
      active
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    );

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-black/10 backdrop-blur-xl border-r border-white/10 transition-[width] duration-300",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-white/10 px-4 py-4",
          isCollapsed && "justify-center px-2"
        )}
      >
        <img src={logoImg} alt="Anoneurx" className="h-9 w-9 object-contain shrink-0" />
        {!isCollapsed && (
          <div className="min-w-0 leading-tight">
            <p className="text-[15px] font-semibold tracking-[0.18em] text-white">
              ANONEURX
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">{consoleConfig.subtitle}</p>
          </div>
        )}
      </div>

      {/* Navigation — only this role's own pages */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-4">
        <div className="space-y-1">
          {consoleConfig.menu.map((item) => {
            const active = itemIsActive(item.path, pathname, consoleConfig.home);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                title={isCollapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                className={itemClass(active)}
              >
                {active && !isCollapsed && (
                  <span className="absolute left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-blue-500" />
                )}
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {!isCollapsed && <span className="flex-1">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-2.5">
        <button
          type="button"
          onClick={onLogout}
          title={isCollapsed ? "Sign out" : undefined}
          className={cn(
            "w-full flex items-center gap-3.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-300",
            isCollapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;
