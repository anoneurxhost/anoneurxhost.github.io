import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PortalSection } from "./ui";
import { StatsGrid, type StatItem } from "./StatsGrid";
import { getModuleById } from "../portal.config";
import type { ProgramId } from "../types";

export interface ProgramOverviewProps {
  program: ProgramId;
  identity?: {
    accountId: string;
    participantId?: string;
  };
  stats: StatItem[];
  children?: React.ReactNode;
}

export const ProgramOverview = ({ program, identity, stats, children }: ProgramOverviewProps) => {
  const module = getModuleById(program);
  const Icon = module?.icon ?? null;
  return (
    <div className="space-y-6">
      {identity && (
        <PortalSection>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            {Icon && (
              <div
                className={cn(
                  "h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center",
                  module?.gradient
                )}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <span className="text-slate-500">
                Account{" "}
                <span className="font-mono font-semibold text-slate-200">{identity.accountId}</span>
              </span>
              {identity.participantId && (
                <span className="text-slate-500">
                  {program} ID{" "}
                  <span className="font-mono font-semibold text-slate-200">{identity.participantId}</span>
                </span>
              )}
            </div>
          </div>
        </PortalSection>
      )}

      <StatsGrid stats={stats} />

      {children && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      )}
    </div>
  );
};
