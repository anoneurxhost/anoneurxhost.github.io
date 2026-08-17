import React from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PortalSection } from "./ui";
import type { PortalModule } from "../portal.config";

export interface ProgramHeaderProps {
  module: PortalModule;
  badge?: React.ReactNode;
  badges?: React.ReactNode[];
}

export const ProgramHeader = ({ module, badge, badges = [] }: ProgramHeaderProps) => {
  const Icon = module.icon;
  return (
    <PortalSection>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/portal" className="flex items-center gap-1 hover:text-white transition-colors">
          <LayoutGrid className="h-3.5 w-3.5" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-400">{module.name}</span>
      </div>

      <div className="mt-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl shrink-0",
              module.gradient,
              module.glow
            )}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {module.name}
              </h1>
              <Badge variant="outline" className="border-white/15 text-slate-300">
                {module.status}
              </Badge>
              {badge}
            </div>
            <p className="mt-1 text-sm text-slate-400">{module.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
          {module.stats.map((stat) => (
            <Badge
              key={stat}
              variant="outline"
              className="border-white/10 bg-white/[0.03] text-slate-300 font-normal"
            >
              {stat}
            </Badge>
          ))}
        </div>
      </div>
    </PortalSection>
  );
};
