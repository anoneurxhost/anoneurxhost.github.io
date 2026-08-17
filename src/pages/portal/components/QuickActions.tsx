import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger } from "./ui";

export interface QuickActionItem {
  icon: LucideIcon;
  label: string;
  hint?: string;
  to?: string;
  gradient?: string;
  onClick?: () => void;
}

export const QuickActions = ({
  actions,
}: {
  actions: QuickActionItem[];
}) => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      {actions.map((action) => {
        const inner = (
          <>
            <div
              className={cn(
                "h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-md",
                action.gradient ?? "from-blue-500 to-cyan-500"
              )}
            >
              <action.icon className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 mt-2">
              <p className="text-sm font-semibold text-white truncate">{action.label}</p>
              {action.hint && <p className="text-[11px] text-slate-500 truncate">{action.hint}</p>}
            </div>
          </>
        );
        const className =
          "flex flex-col items-start rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left hover:border-white/20 hover:bg-white/[0.05] transition-all";
        return (
          <motion.div key={action.label} variants={fadeUp}>
            {action.to ? (
              <Link to={action.to} className={className}>
                {inner}
              </Link>
            ) : (
              <button type="button" onClick={action.onClick} className={className}>
                {inner}
              </button>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
