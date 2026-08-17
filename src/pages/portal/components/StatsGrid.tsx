import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger } from "./ui";

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  hint?: string;
  gradient?: string;
}

export const StatsGrid = ({
  stats,
  columns = 4,
}: {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}) => {
  const gridClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className={cn("grid grid-cols-1 gap-4", gridClass)}>
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={fadeUp}>
          <Card className="glass-dark border-white/10 hover:border-white/20 transition-all">
            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md",
                    stat.gradient ?? "from-blue-500 to-cyan-500"
                  )}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-white leading-none">{stat.value}</p>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">{stat.label}</p>
              {stat.hint && <p className="mt-1 text-[11px] text-slate-500">{stat.hint}</p>}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
