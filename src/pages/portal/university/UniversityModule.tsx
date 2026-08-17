import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileBadge,
  LineChart,
  Megaphone,
  Trophy,
  MapPin,
  Download,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { usePortal } from "../PortalContext";
import { getModuleById, PROGRAM_MENUS } from "../portal.config";
import { DocumentsWorkspace } from "../shared/DocumentsWorkspace";
import { ProgramLayout } from "../components/ProgramLayout";
import { UniversityOverview } from "./UniversityOverview";
import { PortalSection, ProgressBar, StatCard } from "../components/ui";
import type { Course } from "../types";

const universityModule = getModuleById("university")!;

const getStatusBadge = (status: Course["status"]) => {
  switch (status) {
    case "in-progress":
      return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">In Progress</Badge>;
    case "completed":
      return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Completed</Badge>;
    case "upcoming":
      return <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Upcoming</Badge>;
  }
};

const getDueBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Pending</Badge>;
    case "submitted":
      return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Submitted</Badge>;
    case "graded":
      return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Graded</Badge>;
    default:
      return null;
  }
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const UniversityModule = () => {
  const { data, memberships } = usePortal();
  const { section } = useParams<{ section?: string }>();

  if (!memberships.includes("university")) {
    return <Navigate to="/portal" replace />;
  }

  const activeTab = PROGRAM_MENUS.university.some((t) => t.value === section)
    ? section!
    : "overview";

  const activeCourses = data.courses.filter((c) => c.status === "in-progress");
  const pendingAssignments = data.assignments.filter((a) => a.status === "pending");

  return (
    <ProgramLayout module={universityModule}>
      {activeTab === "overview" && <UniversityOverview />}

      {activeTab === "courses" && (
        <div className="space-y-4">
          {data.courses.map((course, i) => (
            <CourseRow key={course.id} course={course} index={i} />
          ))}
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCourses.map((course) => (
              <Card key={course.id} className="glass-dark border-white/10">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.code}</p>
                  <p className="mt-3 text-2xl font-bold text-white">{course.attendance}%</p>
                  <div className="mt-2">
                    <ProgressBar
                      value={course.attendance}
                      gradient={course.attendance >= 90 ? "from-emerald-500 to-teal-500" : course.attendance >= 75 ? "from-amber-500 to-orange-500" : "from-red-500 to-rose-500"}
                    />
                  </div>
                  <p className={cn(
                    "mt-2 text-xs font-medium",
                    course.attendance >= 90 ? "text-emerald-400" : course.attendance >= 75 ? "text-amber-400" : "text-red-400"
                  )}>
                    {course.attendance >= 90 ? "Excellent" : course.attendance >= 75 ? "Good — stay consistent" : "At risk"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.courses
                  .filter((c) => c.status === "in-progress")
                  .flatMap((course) =>
                    data.attendance?.filter((s) => s.courseId === course.id) ?? []
                  )
                  .map((session) => {
                    const course = data.courses.find((c) => c.id === session.courseId);
                    return (
                      <div key={session.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                        <div>
                          <p className="text-sm font-medium text-white">{course?.title}</p>
                          <p className="text-xs text-slate-500">{session.date}</p>
                        </div>
                        {session.present ? (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            Present
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                            Absent
                          </Badge>
                        )}
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "assignments" && (
        <Card className="glass-dark border-white/10">
          <CardContent className="p-5 space-y-2">
            {data.assignments.map((assignment) => {
              const course = data.courses.find((c) => c.id === assignment.courseId);
              return (
                <div key={assignment.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0">
                      <ClipboardList className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{assignment.title}</p>
                      <p className="text-xs text-slate-500">{course?.code} · {course?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Due {assignment.dueDate}</p>
                      <p className="text-xs text-slate-400">Weight {assignment.weight}%</p>
                    </div>
                    {assignment.status === "graded" && assignment.score !== undefined && (
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 font-semibold">
                        {assignment.score}/{assignment.maxScore}
                      </Badge>
                    )}
                    {getDueBadge(assignment.status)}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {activeTab === "grades" && (
        <div className="space-y-6">
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Course Grades — Semester 6</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={activeCourses.map((c) => ({ name: c.code, grade: c.grade ?? 0, progress: c.progress }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Bar dataKey="progress" name="Progress %" radius={[6, 6, 0, 0]}>
                    {activeCourses.map((c, i) => (
                      <Cell key={i} fill={["#3b82f6", "#a855f7", "#10b981", "#f59e0b"][i % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Graded Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.assignments.filter((a) => a.status === "graded").map((assignment) => {
                const course = data.courses.find((c) => c.id === assignment.courseId);
                return (
                  <div key={assignment.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div>
                      <p className="text-sm font-medium text-white">{assignment.title}</p>
                      <p className="text-xs text-slate-500">{course?.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-400">{assignment.score}/{assignment.maxScore}</p>
                      <p className="text-xs text-slate-500">{((assignment.score ?? 0) / assignment.maxScore) * 100}%</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "timetable" && (
        <Card className="glass-dark border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-slate-400 font-medium w-32">Day</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">09:00</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">10:00</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">11:00</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">13:00</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">14:00</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">15:00</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => {
                  const slots = data.timetable.filter((t) => t.day === day);
                  return (
                    <tr key={day} className="border-b border-white/5">
                      <td className="px-4 py-3 font-medium text-slate-300">{day}</td>
                      {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((hour) => {
                        const slot = slots.find((s) => s.start === hour);
                        if (!slot)
                          return (
                            <td key={hour} className="px-4 py-3 text-slate-600 text-xs">
                              —
                            </td>
                          );
                        const isLab = slot.type === "Lab";
                        return (
                          <td key={hour} className="px-4 py-3">
                            <div className={cn(
                              "rounded-lg px-2.5 py-2 border",
                              isLab
                                ? "bg-purple-500/10 border-purple-500/30"
                                : "bg-blue-500/10 border-blue-500/30"
                            )}>
                              <p className="text-xs font-semibold text-white">{slot.courseCode} · {slot.type}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {slot.location}
                              </p>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "calendar" && <UniversityCalendar />}

      {activeTab === "faculty" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.faculty.map((member) => (
            <motion.div key={member.id} whileHover={{ y: -4 }}>
              <Card className="glass-dark border-white/10 h-full hover:border-white/25 transition-colors">
                <CardContent className="p-5">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-slate-400">{member.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{member.department}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{member.email}</span>
                    <Badge variant="outline" className="border-amber-500/30 text-amber-300">
                      ★ {member.rating.toFixed(1)}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {member.courses.map((c) => (
                      <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "announcements" && (
        <div className="space-y-3">
          {data.announcements.map((announcement) => (
            <Card key={announcement.id} className="glass-dark border-white/10">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                      <Megaphone className="h-4 w-4 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white">{announcement.title}</h3>
                  </div>
                  <Badge
                    className={cn(
                      announcement.priority === "urgent" && "bg-red-500/20 text-red-300 border-red-500/30",
                      announcement.priority === "high" && "bg-amber-500/20 text-amber-300 border-amber-500/30",
                      announcement.priority === "normal" && "bg-white/10 text-slate-300 border-white/15"
                    )}
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-slate-300">{announcement.body}</p>
                <p className="mt-2 text-xs text-slate-500">{announcement.author} · {announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "documents" && <DocumentsWorkspace program="university" />}

      {activeTab === "transcripts" && (
        <div className="space-y-6">
          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Semester History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...data.semesters].reverse().map((semester) => (
                  <div key={semester.id} className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0",
                      semester.status === "current"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                        : "bg-white/5 border border-white/10 text-slate-400"
                    )}>
                      {semester.status === "current" ? "Now" : semester.id.replace("s", "S")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{semester.name}</p>
                      <p className="text-xs text-slate-500">{semester.credits} credit hours</p>
                    </div>
                    <Badge variant="outline" className="border-white/15 text-slate-300">
                      {semester.status}
                    </Badge>
                    <p className="text-lg font-bold text-white w-16 text-right">{semester.gpa.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button variant="outline" className="border-white/15 text-slate-200 hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" /> Download Transcript
            </Button>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={LineChart} label="Cumulative GPA" value="3.78" gradient="from-blue-500 to-cyan-500" />
            <StatCard icon={Trophy} label="Academic Rank" value="Top 5%" gradient="from-purple-500 to-fuchsia-500" />
            <StatCard icon={BookOpen} label="Credits Completed" value="111 / 140" gradient="from-emerald-500 to-teal-500" />
          </div>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">GPA Trend by Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data.semesters.map((s) => ({ name: s.name.replace("Semester ", "S"), gpa: s.gpa }))}>
                  <defs>
                    <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[3, 4]} stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
                    labelStyle={{ color: "#94a3b8" }}
                  />
                  <Area type="monotone" dataKey="gpa" stroke="#60a5fa" strokeWidth={2} fill="url(#gpaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Certificates</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                {data.certificates.filter((c) => c.module === "university").length} academic certificates available
              </p>
              <Link to="/portal/certificates">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <FileBadge className="h-4 w-4 mr-2" /> Open Library
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </ProgramLayout>
  );
};

const CourseRow = ({ course, index = 0 }: { course: Course; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="flex flex-wrap items-center gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4 hover:border-white/15 transition-colors"
  >
    <div className={cn("h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shrink-0", course.color)}>
      {course.code.replace("CS", "")}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-semibold text-white truncate">{course.title}</p>
        {getStatusBadge(course.status)}
      </div>
      <p className="text-xs text-slate-500 mt-0.5">
        {course.code} · {course.instructor} · {course.credits} credits · {course.semester} semester
      </p>
    </div>
    {course.status === "completed" && course.grade && (
      <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 font-semibold">
        {course.grade}
      </Badge>
    )}
    {course.status === "in-progress" && (
      <div className="w-40">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500">Progress</span>
          <span className="text-slate-300 font-medium">{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} gradient={course.color} />
      </div>
    )}
    <Badge variant="outline" className="border-white/15 text-slate-300">
      <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-400" /> {course.attendance}% attendance
    </Badge>
  </motion.div>
);

const CAL_STYLE: Record<string, string> = {
  class: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  assignment: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  event: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

interface UniversityCalendarItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
}

const UniversityCalendar = () => {
  const { data } = usePortal();
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const events = useMemo<UniversityCalendarItem[]>(() => [
    ...data.events
      .filter((e) => e.module === "university")
      .map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        time: e.time,
        type: e.type,
        location: e.location,
      })),
    ...data.assignments.map((a) => ({
      id: `as-${a.id}`,
      title: `Due: ${a.title}`,
      date: a.dueDate,
      time: "23:59",
      type: "assignment",
    })),
  ], [data]);

  const byDate = useMemo(() => {
    const map = new Map<string, UniversityCalendarItem[]>();
    events.forEach((e) => {
      map.set(e.date, [...(map.get(e.date) ?? []), e]);
    });
    return map;
  }, [events]);

  const grid = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const dim = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= dim; d++) cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const selectedKey = selectedDate.toISOString().slice(0, 10);
  const selectedEvents = byDate.get(selectedKey) ?? [];

  const upcoming = useMemo(
    () =>
      [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .filter((e) => e.date >= now.toISOString().slice(0, 10))
        .slice(0, 6),
    [events, now]
  );

  const moveMonth = (dir: number) =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + dir, 1));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass-dark border-white/10 lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-blue-400" />
                {viewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" onClick={() => moveMonth(-1)} className="border-white/10 h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewDate(new Date(now.getFullYear(), now.getMonth(), 1))}
                  className="border-white/10 text-slate-300 h-8"
                >
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => moveMonth(1)} className="border-white/10 h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
                  {day}
                </div>
              ))}
              {grid.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
                const key = date.toISOString().slice(0, 10);
                const hasEvents = byDate.has(key);
                const isToday = isSameDay(date, now);
                const isSelected = isSameDay(date, selectedDate);
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "aspect-square rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center",
                      isSelected
                        ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-transparent shadow-lg"
                        : isToday
                          ? "border-blue-500/50 bg-blue-500/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    {date.getDate()}
                    {hasEvents && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-white/10">
          <CardContent className="p-5">
            <h3 className="font-bold text-white">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h3>
            <div className="mt-4 space-y-2">
              {selectedEvents.length === 0 && (
                <p className="text-sm text-slate-500">No classes or deadlines this day.</p>
              )}
              {selectedEvents.map((event) => (
                <div key={event.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <Badge className={CAL_STYLE[event.type] ?? "bg-white/10 text-slate-300 border-white/15"}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                    {event.location && (
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-dark border-white/10">
        <CardContent className="p-5">
          <h3 className="font-bold text-white mb-3">Upcoming</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upcoming.length === 0 && (
              <p className="text-sm text-slate-500 col-span-full">Nothing scheduled — enjoy the calm.</p>
            )}
            {upcoming.map((event) => (
              <div key={event.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-center w-11 shrink-0">
                  <p className="text-base font-bold text-white leading-none">{new Date(event.date).getDate()}</p>
                  <p className="text-[10px] uppercase text-slate-500">
                    {new Date(event.date).toLocaleString("en-US", { month: "short" })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.time}{event.location ? ` · ${event.location}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityModule;
