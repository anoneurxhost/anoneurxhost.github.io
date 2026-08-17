import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Settings, LogOut, LayoutGrid } from "lucide-react";
import { usePortal } from "../PortalContext";
import {
  PORTAL_MODULES,
  PORTAL_SYSTEMS,
  PROGRAM_MENUS,
  type ProgramMenuItem,
} from "../portal.config";
import logoImg from "@/assets/logo.jpeg";
import type { ProgramId } from "../types";

const isActive = (route: string, pathname: string) => {
  if (route === "/portal") return pathname === "/portal";
  return pathname.startsWith(route);
};

const isProgramItemActive = (
  moduleId: ProgramId,
  value: string,
  pathname: string
) => {
  const base = `/portal/${moduleId}`;
  if (value === "overview") {
    return pathname === base || pathname === `${base}/overview`;
  }
  return pathname.startsWith(`${base}/${value}`);
};

export const ProgramSidebar = ({
  collapsed,
  forceExpanded = false,
  onLogout,
  onNavigate,
}: {
  collapsed: boolean;
  /** Keep the sidebar expanded regardless of collapse state (used by the mobile drawer). */
  forceExpanded?: boolean;
  onLogout: () => void;
  /** Called after navigating (used to close the mobile drawer). */
  onNavigate?: () => void;
}) => {
  const { pathname } = useLocation();
  const isCollapsed = collapsed && !forceExpanded;
  const { memberships } = usePortal();

  // Participants only ever see the programs they belong to.
  const myModules = PORTAL_MODULES.filter((m) => memberships.includes(m.id));

  // Single-program accounts get a focused sidebar: that program's menu only.
  const focusedProgram: ProgramId | null =
    myModules.length === 1 ? myModules[0].id : null;

  // The active program is derived from the current route. Selecting a program
  // navigates to its Dashboard and swaps the program menu below it.
  const seg = pathname.split("/")[2] as ProgramId | undefined;
  const activeProgram = myModules.find((m) => m.id === seg) ?? null;

  const itemClass = (active: boolean) =>
    cn(
      "relative flex items-center gap-3.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
      isCollapsed && "justify-center px-2",
      active
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    );

  const renderMenuLink = (moduleId: ProgramId, item: ProgramMenuItem) => {
    const active = isProgramItemActive(moduleId, item.value, pathname);
    return (
      <Link
        key={item.value}
        to={`/portal/${moduleId}/${item.value}`}
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
  };

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
            <p className="mt-0.5 text-[11px] text-slate-500">Participant Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-4">
        {focusedProgram ? (
          /* Focused demo account — program menu only */
          <div className="space-y-1">
            {PROGRAM_MENUS[focusedProgram].map((item) =>
              renderMenuLink(focusedProgram, item)
            )}
          </div>
        ) : (
          <>
            {/* Global navigation — always visible regardless of the selected program */}
            <div className="space-y-1">
              <Link
                to="/portal"
                onClick={onNavigate}
                title={isCollapsed ? "Dashboard" : undefined}
                className={itemClass(isActive("/portal", pathname))}
              >
                {isActive("/portal", pathname) && !isCollapsed && (
                  <span className="absolute left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-blue-500" />
                )}
                <LayoutGrid className="h-[18px] w-[18px] shrink-0" />
                {!isCollapsed && <span className="flex-1">Dashboard</span>}
              </Link>

              {PORTAL_SYSTEMS.filter(
                (s) => s.inSidebar !== false && s.id !== "dashboard"
              ).map((system) => {
                const active = isActive(system.route, pathname);
                return (
                  <Link
                    key={system.id}
                    to={system.route}
                    onClick={onNavigate}
                    title={isCollapsed ? system.name : undefined}
                    className={itemClass(active)}
                  >
                    {active && !isCollapsed && (
                      <span className="absolute left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-blue-500" />
                    )}
                    <system.icon className="h-[18px] w-[18px] shrink-0" />
                    {!isCollapsed && <span className="flex-1">{system.name}</span>}
                  </Link>
                );
              })}
            </div>

            {/* Programs — simple items to switch between University / Internship / Hackathon */}
            <div className="mt-4 border-t border-white/10 pt-4">
              {!isCollapsed && (
                <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Programs
                </p>
              )}
              <div className="space-y-1">
                {myModules.map((program) => {
                  const active = seg === program.id;
                  return (
                    <Link
                      key={program.id}
                      to={`/portal/${program.id}/overview`}
                      onClick={onNavigate}
                      title={isCollapsed ? program.name : undefined}
                      className={itemClass(active)}
                    >
                      {active && !isCollapsed && (
                        <span className="absolute left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-blue-500" />
                      )}
                      <program.icon className="h-[18px] w-[18px] shrink-0" />
                      {!isCollapsed && <span className="flex-1">{program.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Active program's menu — one program shown at a time */}
            {activeProgram && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="space-y-1">
                  {PROGRAM_MENUS[activeProgram.id].map((item) =>
                    renderMenuLink(activeProgram.id, item)
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </nav>

      {/* Pinned actions — always visible regardless of scroll */}
      <div className="shrink-0 space-y-1 border-t border-white/10 px-2.5 py-3">
        <Link
          to="/portal/settings"
          onClick={onNavigate}
          title={isCollapsed ? "Settings" : undefined}
          className={cn(
            "flex items-center gap-3.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150",
            isCollapsed && "justify-center px-2",
            isActive("/portal/settings", pathname)
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings className="h-[18px] w-[18px] shrink-0" />
          {!isCollapsed && <span className="flex-1">Settings</span>}
        </Link>
        <button
          type="button"
          onClick={onLogout}
          title={isCollapsed ? "Log out" : undefined}
          className={cn(
            "flex w-full items-center gap-3.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 text-left",
            isCollapsed && "justify-center px-2",
            "text-slate-400 hover:bg-red-500/10 hover:text-red-400"
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!isCollapsed && <span className="flex-1">Log out</span>}
        </button>
      </div>
    </div>
  );
};
