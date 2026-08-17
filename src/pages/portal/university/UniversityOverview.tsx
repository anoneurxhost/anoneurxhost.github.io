import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  CheckCircle2,
  ClipboardList,
  CalendarRange,
  Users,
  Megaphone,
  FileText,
  Award,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { ProgramOverview } from "../components/ProgramOverview";
import { QuickActions } from "../components/QuickActions";
import { RecentActivity } from "../components/RecentActivity";
import { Widget, WidgetGrid } from "../components/Widgets";
import { ProgressBar } from "../components/ui";

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export const UniversityOverview = () => {
  const { data, user } = usePortal();

  const activeCourses = data.courses.filter((c) => c.status === "in-progress");
  const pendingAssignments = data.assignments
    .filter((a) => a.status === "pending")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const todaySlots = data.timetable.filter((t) => t.day === today);
  const avgAttendance = Math.round(
    activeCourses.reduce((sum, c) => sum + c.attendance, 0) / activeCourses.length
  );
  const gpaTrend = data.semesters.map((s) => ({ name: s.name, gpa: s.gpa }));
  const courseById = (id: string) => data.courses.find((c) => c.id === id);
  const pendingCount = pendingAssignments.length;

  const stats = [
    { icon: BookOpen, label: "Active Courses", value: activeCourses.length, gradient: "from-blue-500 to-cyan-500" },
    { icon: Trophy, label: "Semester GPA", value: data.semesters.find((s) => s.status === "current")?.gpa ?? "—", hint: "Cumulative 3.78", gradient: "from-purple-500 to-fuchsia-500" },
    { icon: CheckCircle2, label: "Attendance", value: `${avgAttendance}%`, hint: "Across active courses", gradient: "from-emerald-500 to-teal-500" },
    { icon: ClipboardList, label: "Pending Assignments", value: pendingCount, gradient: "from-amber-500 to-orange-500" },
  ];

  const quickActions = [
    { icon: BookOpen, label: "Courses", hint: `${activeCourses.length} enrolled`, to: "/portal/university/courses", gradient: "from-blue-500 to-cyan-500" },
    { icon: ClipboardList, label: "Assignments", hint: `${pendingCount} due soon`, to: "/portal/university/assignments", gradient: "from-amber-500 to-orange-500" },
    { icon: CalendarRange, label: "Timetable", hint: `${todaySlots.length} classes today`, to: "/portal/university/timetable", gradient: "from-emerald-500 to-teal-500" },
    { icon: Trophy, label: "Grades", hint: "Semester transcript", to: "/portal/university/grades", gradient: "from-purple-500 to-fuchsia-500" },
  ];

  const activity = data.activity
    .filter((a) => a.module === "university")
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      icon:
        a.type === "grade"
          ? Trophy
          : a.type === "submission"
            ? FileText
            : a.type === "certificate"
              ? Award
              : CheckCircle2,
      title: a.title,
      detail: a.detail,
      time: a.time,
      gradient: a.type === "grade" ? "from-purple-500/40 to-fuchsia-500/40" : "from-blue-500/40 to-cyan-500/40",
    }));

  return (
    <ProgramOverview
      program="university"
      identity={{ accountId: user.anxId, participantId: user.programIds?.university }}
      stats={stats}
    >
      <WidgetGrid className="lg:grid-cols-3">
        <Widget
          title="Course Progress"
          icon={BookOpen}
          gradient="from-blue-500 to-cyan-500"
          className="lg:col-span-2"
          action={
            <Link to="/portal/university/courses">
              <Button size="sm" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10">
                All courses
              </Button>
            </Link>
          }
        >
          <div className="space-y-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0", course.color)}>
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{course.title}</p>
                      <p className="text-xs text-slate-500">{course.code} · {course.instructor}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">{course.progress}%</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={course.progress} gradient={course.color} />
                  </div>
                  <Badge variant="outline" className="border-white/10 text-slate-400 text-[10px]">
                    {course.attendance}% att.
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        <div className="space-y-6">
          <Widget title="Upcoming Deadlines" icon={ClipboardList} gradient="from-amber-500 to-orange-500">
            <div className="space-y-3">
              {pendingAssignments.map((assignment) => {
                const course = courseById(assignment.courseId);
                const due = new Date(assignment.dueDate);
                const days = Math.ceil((due.getTime() - Date.now()) / 86400000);
                return (
                  <div key={assignment.id} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0", course?.color)}>
                      <FileText className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{assignment.title}</p>
                      <p className="text-xs text-slate-500">{course?.code} · due {assignment.dueDate}</p>
                    </div>
                    <Badge className={cn(
                      "text-[10px]",
                      days <= 3
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    )}>
                      {days <= 0 ? "Today" : `${days}d`}
                    </Badge>
                  </div>
                );
              })}
              {pendingAssignments.length === 0 && (
                <p className="text-sm text-slate-500">No pending deadlines.</p>
              )}
            </div>
          </Widget>

          <Widget title={`Today · ${today}`} icon={CalendarRange} gradient="from-emerald-500 to-teal-500">
            <div className="space-y-3">
              {todaySlots.map((slot) => (
                <div key={slot.id} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold text-white leading-none">{slot.start}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{slot.type}</p>
                  </div>
                  <div className="flex-1 min-w-0 border-l border-white/10 pl-3">
                    <p className="text-sm font-medium text-white truncate">{slot.title}</p>
                    <p className="text-xs text-slate-500">{slot.location}</p>
                  </div>
                </div>
              ))}
              {todaySlots.length === 0 && <p className="text-sm text-slate-500">No classes scheduled.</p>}
            </div>
          </Widget>
        </div>
      </WidgetGrid>

      <WidgetGrid className="lg:grid-cols-3">
        <Widget title="GPA Trend" icon={Trophy} gradient="from-purple-500 to-fuchsia-500" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={gpaTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis domain={[3, 4]} tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#c084fc" }}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="gpa" fill="url(#gpaGradient)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Widget>

        <div className="space-y-6">
          <Widget title="Announcements" icon={Megaphone} gradient="from-rose-500 to-pink-500">
            <div className="space-y-3">
              {data.announcements.slice(0, 2).map((announcement) => (
                <div key={announcement.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2">
                    {announcement.priority === "urgent" && <AlertTriangle className="h-3.5 w-3.5 text-red-400" />}
                    <p className="text-sm font-medium text-white truncate">{announcement.title}</p>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{announcement.body}</p>
                  <p className="mt-1.5 text-[11px] text-slate-600">{announcement.author} · {announcement.date}</p>
                </div>
              ))}
              <Link to="/portal/university/announcements">
                <Button size="sm" variant="outline" className="w-full border-white/15 text-slate-300 hover:bg-white/10">
                  View all
                </Button>
              </Link>
            </div>
          </Widget>
        </div>
      </WidgetGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions actions={quickActions} />
        <div className="lg:col-span-2">
          <RecentActivity title="Academic Activity" icon={Users} items={activity} />
        </div>
      </div>
    </ProgramOverview>
  );
};
