import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { fadeUp } from "./ui";

export interface WidgetProps {
  title: string;
  icon?: LucideIcon;
  gradient?: string;
  className?: string;
  contentClassName?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const Widget = ({
  title,
  icon: Icon,
  gradient = "from-blue-500 to-cyan-500",
  className,
  contentClassName,
  action,
  children,
}: WidgetProps) => (
  <motion.div variants={fadeUp} className={className}>
    <Card className="glass-dark border-white/10 h-full">
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-white text-base flex items-center gap-2">
          {Icon && (
            <div className={cn("h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center", gradient)}>
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  </motion.div>
);

export const WidgetGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("grid grid-cols-1 gap-6", className)}>{children}</div>;
