import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection, ModuleBadge } from "../components/ui";

const typeStyle: Record<string, { icon: React.ElementType; class: string }> = {
  info: { icon: Info, class: "text-blue-400 bg-blue-500/15 border-blue-500/30" },
  success: { icon: CheckCircle2, class: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
  warning: { icon: AlertTriangle, class: "text-amber-400 bg-amber-500/15 border-amber-500/30" },
  alert: { icon: XCircle, class: "text-red-400 bg-red-500/15 border-red-500/30" },
};

export const PortalNotifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotifications } = usePortal();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => !n.read);

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Global Notification Center"
        title="Notifications"
        description="Updates from every program — assignments graded, meetings scheduled, submissions reviewed."
        icon={Bell}
        gradient="from-blue-500 to-cyan-500"
        actions={
          <Button
            variant="outline"
            className="border-white/15 text-slate-300 hover:bg-white/10"
            onClick={markAllNotificationsRead}
            disabled={unreadNotifications === 0}
          >
            <CheckCheck className="h-4 w-4 mr-2" /> Mark all read
          </Button>
        }
      />

      <PortalSection>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            {unreadNotifications} unread
          </Badge>
          <div className="ml-auto flex gap-1.5">
            {(["all", "unread"] as const).map((option) => (
              <Button
                key={option}
                size="sm"
                variant={filter === option ? "default" : "outline"}
                onClick={() => setFilter(option)}
                className={cn(
                  filter === option
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {option === "all" ? "All" : "Unread"}
              </Button>
            ))}
          </div>
        </div>
      </PortalSection>

      <div className="space-y-2.5">
        {filtered.map((notification, i) => {
          const style = typeStyle[notification.type];
          const Icon = style.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => markNotificationRead(notification.id)}
              className={cn(
                "group flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-all",
                notification.read
                  ? "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                  : "border-blue-500/20 bg-blue-500/[0.06] hover:bg-blue-500/[0.1]"
              )}
            >
              <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center shrink-0", style.class)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">{notification.title}</p>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-slate-400">{notification.message}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-slate-600">{notification.time}</span>
                  <ModuleBadge module={notification.module} />
                </div>
              </div>
              {!notification.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-slate-400 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(notification.id);
                  }}
                >
                  <Check className="h-4 w-4 mr-1" /> Mark read
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardContent className="py-14 text-center">
              <Bell className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">You're all caught up.</p>
              <p className="text-xs text-slate-600 mt-1">New notifications will appear here.</p>
            </CardContent>
          </Card>
        </PortalSection>
      )}
    </PortalPage>
  );
};

export default PortalNotifications;
