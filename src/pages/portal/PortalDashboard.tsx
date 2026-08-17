import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileBadge,
  MapPin,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "./PortalContext";
import { moduleGradient } from "./portal.config";
import {
  PortalPage,
  PortalSection,
  ProgressBar,
  ModuleBadge,
} from "./components/ui";
import type { ProgramId } from "./types";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const priorityColor: Record<string, string> = {
  normal: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  high: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  urgent: "bg-red-500/20 text-red-300 border-red-500/30",
};

const ActivityIcon = ({ type }: { type: string }) => {
  const cls = "h-3.5 w-3.5";
  switch (type) {
    case "grade":
      return <TrendingUp className={cls} />;
    case "submission":
      return <Trophy className={cls} />;
    case "certificate":
      return <FileBadge className={cls} />;
    case "achievement":
      return <Sparkles className={cls} />;
    default:
      return <CheckCircle2 className={cls} />;
  }
};

const quickActions: { label: string; route: string; module: ProgramId | "general" }[] = [
  { label: "View courses", route: "/portal/university", module: "university" },
  { label: "Plan tasks", route: "/portal/internship", module: "internship" },
  { label: "Team workspace", route: "/portal/hackathon", module: "hackathon" },
  { label: "Browse projects", route: "/portal/projects", module: "general" },
];

const PROGRAM_STATS: Record<
  ProgramId,
  { label: string; value: string; gradient: string }
> = {
  university: { label: "GPA", value: "3.84", gradient: "from-blue-500 to-cyan-500" },
  internship: { label: "Internship Week", value: "8 / 12", gradient: "from-emerald-500 to-teal-500" },
  hackathon: { label: "Hackathon Rank", value: "#1", gradient: "from-purple-500 to-fuchsia-500" },
};

export const PortalDashboard = () => {
  const { user, enrolledModules, data, notifications, unreadNotifications } =
    usePortal();

  const firstName = user.name.split(" ")[0];

  const enrolledIds = new Set(enrolledModules.map((m) => m.id));

  const availableQuickActions = quickActions.filter(
    (action) => action.module === "general" || enrolledIds.has(action.module)
  );

  const stats = [
    ...enrolledModules.map((m) => PROGRAM_STATS[m.id]),
    { label: "Certificates", value: `${data.certificates.length}`, gradient: "from-amber-500 to-orange-500" },
  ];

  const upcomingDeadlines = [
    ...(enrolledIds.has("university")
      ? data.assignments
          .filter((a) => a.status === "pending")
          .map((a) => ({
            id: a.id,
            title: a.title,
            date: a.dueDate,
            module: "university" as ProgramId,
            type: "Assignment",
          }))
      : []),
    ...data.events
      .filter(
        (e) => e.type === "submission" && (enrolledIds.has(e.module as ProgramId) || e.module === "general")
      )
      .map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        module: e.module,
        type: "Submission",
      })),
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const nextEvents = [...data.events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const openTasks = data.kanbanTasks.filter((t) => t.column !== "done");

  return (
    <PortalPage>
      {/* Welcome hero */}
      <PortalSection>
        <Card className="relative overflow-hidden glass-dark border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />
          <CardContent className="p-6 md:p-8 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center text-2xl font-bold text-white shadow-2xl shrink-0">
                {user.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">{getGreeting()},</p>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {firstName} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {user.location} ·{" "}
                  {user.title}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {enrolledModules.map((m) => (
                    <Link key={m.id} to={m.route}>
                      <Badge
                        className={cn(
                          "bg-gradient-to-r border-transparent hover:opacity-90",
                          m.gradient
                        )}
                      >
                        <m.icon className="h-3 w-3 mr-1" /> {m.name} · Active
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {availableQuickActions.map((action) => (
                  <Link key={action.label} to={action.route}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-slate-200 hover:bg-white/10 hover:border-white/30"
                    >
                      <ModuleBadge module={action.module} label="" />
                      <span className="ml-1.5">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </PortalSection>

      {/* Stats strip */}
      <PortalSection>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
          {stats.map((stat) => (
            <StatPill key={stat.label} label={stat.label} value={stat.value} gradient={stat.gradient} />
          ))}
        </div>
      </PortalSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active programs */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white text-base">Active Programs</CardTitle>
                <p className="text-xs text-slate-500">{enrolledModules.length} enrolled</p>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {enrolledModules.map((module, i) => {
                  const related =
                    module.id === "university"
                      ? data.courses.filter((c) => c.status === "in-progress")
                      : module.id === "internship"
                        ? data.internProjects
                        : data.submissions;
                  const progress =
                    module.id === "university"
                      ? Math.round(
                          data.courses
                            .filter((c) => c.status === "in-progress")
                            .reduce((s, c) => s + c.progress, 0) /
                            Math.max(1, data.courses.filter((c) => c.status === "in-progress").length)
                        )
                      : module.id === "internship"
                        ? Math.round(
                            data.internProjects.reduce((s, p) => s + p.progress, 0) /
                              Math.max(1, data.internProjects.length)
                          )
                        : 88;
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link
                        to={module.route}
                        className="group block rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={cn(
                              "h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                              module.gradient,
                              module.glow
                            )}
                          >
                            <module.icon className="h-5 w-5 text-white" />
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="mt-3 font-semibold text-white">{module.name}</h3>
                        <p className="mt-0.5 text-xs text-slate-400">{module.role}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <ProgressBar value={progress} gradient={module.gradient} />
                          <span className="text-xs text-slate-400 font-medium shrink-0">
                            {progress}%
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          {related.length} {module.id === "university" ? "courses" : module.id === "internship" ? "projects" : "submissions"}
                        </p>
                      </Link>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Upcoming deadlines */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-blue-400" /> Upcoming Deadlines
                </CardTitle>
                <span className="text-xs text-slate-500">{upcomingDeadlines.length} upcoming</span>
              </CardHeader>
              <CardContent className="space-y-1">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {deadline.type} · {deadline.module}
                      </p>
                    </div>
                    <ModuleBadge module={deadline.module} />
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-white">{deadline.date}</p>
                    </div>
                  </div>
                ))}
                {upcomingDeadlines.length === 0 && (
                  <p className="text-sm text-slate-500 py-4 text-center">
                    No upcoming deadlines — enjoy the calm. 🎉
                  </p>
                )}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Recent activity */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {data.activity.slice(0, 6).map((activity, i) => (
                    <div key={activity.id} className="relative flex gap-3 pb-5 last:pb-0">
                      {i < data.activity.slice(0, 6).length - 1 && (
                        <div className="absolute left-[13px] top-7 bottom-0 w-px bg-white/10" />
                      )}
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/15 flex items-center justify-center shrink-0 text-blue-400">
                        <ActivityIcon type={activity.type} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        <p className="text-xs text-slate-500">{activity.detail}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {activity.time} · <ModuleBadge module={activity.module} label={activity.module} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </PortalSection>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Notifications */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Bell className="h-4 w-4 text-blue-400" /> Notifications
                </CardTitle>
                <Link
                  to="/portal/notifications"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View all <ChevronRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-2">
                {notifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-white/5 transition-colors"
                  >
                    <div
                      className={cn(
                        "mt-1 h-2 w-2 rounded-full shrink-0",
                        notification.read ? "bg-white/15" : "bg-blue-400"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{notification.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{notification.time}</p>
                    </div>
                    <ModuleBadge module={notification.module} label="" />
                  </div>
                ))}
                {unreadNotifications === 0 && (
                  <p className="text-sm text-slate-500 py-4 text-center">All caught up!</p>
                )}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Calendar */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-purple-400" /> This Week
                </CardTitle>
                <Link
                  to="/portal/calendar"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                >
                  Calendar <ChevronRight className="h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="space-y-2">
                {nextEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 rounded-lg p-2.5 border border-white/5 bg-white/[0.02]"
                  >
                    <div className="text-center shrink-0 w-10">
                      <p className="text-lg font-bold text-white leading-none">
                        {new Date(event.date).getDate()}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 mt-0.5">
                        {new Date(event.date).toLocaleString("en-US", { month: "short" })}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </div>
                    <ModuleBadge module={event.module} label="" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>

          {/* Tasks snapshot */}
          {enrolledIds.has("internship") && (
            <PortalSection>
              <Card className="glass-dark border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">Internship Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {openTasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 w-16 shrink-0 uppercase">
                          {task.column}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-slate-300 truncate">{task.title}</p>
                        </div>
                        <span className="text-[11px] text-slate-500 shrink-0">{task.due}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </PortalSection>
          )}

          {/* Achievements */}
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {user.achievements.slice(0, 6).map((achievement) => (
                  <div
                    key={achievement.id}
                    title={`${achievement.title} — ${achievement.description}`}
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center border",
                      achievement.rarity === "legendary" && "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300/40 text-white shadow-lg shadow-amber-500/20",
                      achievement.rarity === "epic" && "bg-gradient-to-br from-purple-500 to-fuchsia-500 border-purple-300/40 text-white shadow-lg shadow-purple-500/20",
                      achievement.rarity === "rare" && "bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-300/40 text-white shadow-lg shadow-blue-500/20",
                      achievement.rarity === "common" && "bg-white/10 border-white/15 text-slate-300"
                    )}
                  >
                    <Trophy className="h-5 w-5" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>
        </div>
      </div>
    </PortalPage>
  );
};

const StatPill = ({
  label,
  value,
  gradient,
}: {
  label: string;
  value: string;
  gradient: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
  >
    <div
      className={cn(
        "h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center mb-2",
        gradient
      )}
    >
      <span className="h-2.5 w-2.5 rounded-sm bg-white/90" />
    </div>
    <p className="text-xl font-bold text-white leading-none">{value}</p>
    <p className="mt-1 text-xs text-slate-400">{label}</p>
  </motion.div>
);

export default PortalDashboard;
