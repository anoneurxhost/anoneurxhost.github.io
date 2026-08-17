import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { fadeUp } from "./ui";

export interface ActivityRow {
  id: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  time: string;
  gradient?: string;
}

export const RecentActivity = ({
  title = "Recent Activity",
  items,
  icon: HeaderIcon,
}: {
  title?: string;
  items: ActivityRow[];
  icon?: LucideIcon;
}) => {
  return (
    <motion.div variants={fadeUp}>
      <Card className="glass-dark border-white/10 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base flex items-center gap-2">
            {HeaderIcon && <HeaderIcon className="h-4 w-4 text-slate-400" />}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-white/[0.03] transition-colors"
            >
              <div
                className={`h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0 ${item.gradient ?? "from-blue-500/30 to-cyan-500/30"}`}
              >
                <item.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-200 font-medium truncate">{item.title}</p>
                <p className="text-xs text-slate-500 truncate">{item.detail}</p>
              </div>
              <span className="text-[11px] text-slate-600 shrink-0">{item.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
