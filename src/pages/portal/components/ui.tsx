import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import { moduleGradient } from "../portal.config";
import type { ProgramId } from "../types";

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const PortalPage = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={stagger}
    className={cn("space-y-6", className)}
  >
    {children}
  </motion.div>
);

export const PortalSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div variants={fadeUp} className={className}>
    {children}
  </motion.div>
);

export const PageHeader = ({
  eyebrow,
  title,
  description,
  icon: Icon,
  gradient,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  gradient?: string;
  actions?: React.ReactNode;
}) => (
  <motion.div
    variants={fadeUp}
    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
  >
    <div className="flex items-start gap-4">
      {Icon && (
        <div
          className={cn(
            "h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg",
            gradient ?? "from-blue-500 to-cyan-500"
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      )}
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">{description}</p>
        )}
      </div>
    </div>
    {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
  </motion.div>
);

export const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  gradient,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  hint?: string;
  gradient?: string;
  className?: string;
}) => (
  <motion.div variants={fadeUp}>
    <Card className={cn("glass-dark border-white/10 hover:border-white/20 transition-all", className)}>
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md",
              gradient ?? "from-blue-500 to-cyan-500"
            )}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          {hint && (
            <Badge variant="outline" className="border-white/15 text-slate-400">
              {hint}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-2xl font-bold text-white leading-none">{value}</p>
        <p className="mt-1.5 text-xs text-slate-400 font-medium">{label}</p>
      </div>
    </Card>
  </motion.div>
);

export const ModuleBadge = ({
  module,
  label,
}: {
  module: ProgramId | "general";
  label?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[11px] font-semibold text-white",
      moduleGradient(module)
    )}
  >
    {label ?? (module === "general" ? "General" : module)}
  </span>
);

export const ProgressBar = ({
  value,
  gradient,
}: {
  value: number;
  gradient?: string;
}) => (
  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
    <div
      className={cn(
        "h-full rounded-full bg-gradient-to-r transition-all duration-500",
        gradient ?? "from-blue-500 to-cyan-500"
      )}
      style={{ width: `${value}%` }}
    />
  </div>
);

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <Card className="glass-dark border-dashed border-white/15">
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-slate-500" />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  </Card>
);
