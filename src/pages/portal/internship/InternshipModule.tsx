import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  FolderKanban,
  GripVertical,
  MessageSquare,
  Star,
  UserRound,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { usePortal } from "../PortalContext";
import { getModuleById, PROGRAM_MENUS } from "../portal.config";
import { DocumentsWorkspace } from "../shared/DocumentsWorkspace";
import { ProgramLayout } from "../components/ProgramLayout";
import { InternshipOverview } from "./InternshipOverview";
import {
  OfferLetterSheet,
  downloadDocumentPdf,
  useOfferLetterDownload,
} from "./OfferLetter";
import { PortalSection, StatCard, ProgressBar } from "../components/ui";
import type { KanbanColumn, KanbanTask } from "../types";

const internshipModule = getModuleById("internship")!;

const KANBAN_COLUMNS: { id: KanbanColumn; label: string; accent: string }[] = [
  { id: "backlog", label: "Backlog", accent: "text-slate-400" },
  { id: "todo", label: "To Do", accent: "text-blue-400" },
  { id: "in-progress", label: "In Progress", accent: "text-amber-400" },
  { id: "review", label: "In Review", accent: "text-purple-400" },
  { id: "done", label: "Done", accent: "text-emerald-400" },
];

const priorityStyle: Record<KanbanTask["priority"], string> = {
  low: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  high: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  urgent: "bg-red-500/20 text-red-300 border-red-500/30",
};

const documentTypeStyle: Record<string, string> = {
  "Offer Letter": "from-emerald-500 to-teal-500",
  "Completion Certificate": "from-blue-500 to-cyan-500",
  "Experience Letter": "from-purple-500 to-fuchsia-500",
  Policy: "from-slate-500 to-slate-400",
  Evaluation: "from-amber-500 to-orange-500",
};

const documentStatusStyle: Record<string, string> = {
  issued: "bg-white/10 text-slate-300 border-white/15",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  verified: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export const InternshipModule = () => {
  const { data, memberships } = usePortal();
  const { section } = useParams<{ section?: string }>();

  const [tasks, setTasks] = useState<KanbanTask[]>(data.kanbanTasks);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<KanbanColumn | null>(null);
  const { sheetRef, downloading, downloadOfferLetter } = useOfferLetterDownload();

  if (!memberships.includes("internship")) {
    return <Navigate to="/portal" replace />;
  }

  const activeTab = PROGRAM_MENUS.internship.some((t) => t.value === section)
    ? section!
    : "overview";

  const moveTask = (taskId: string, column: KanbanColumn) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column } : t))
    );
    setDragging(null);
    setDragOver(null);
  };

  const onDrop = (column: KanbanColumn) => {
    if (dragging) moveTask(dragging, column);
  };

  const submittedReports = data.weeklyReports.filter((r) => r.status === "submitted");

  return (
    <ProgramLayout
      module={internshipModule}
      badge={
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          <UserRound className="h-3 w-3 mr-1" /> {data.mentor.name}
        </Badge>
      }
    >
      {activeTab === "overview" && <InternshipOverview />}

      {activeTab === "kanban" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Drag tasks between columns to update their status.
            </p>
            <div className="flex gap-2">
              {(["all", "high", "urgent"] as const).map((f) => (
                <Badge key={f} variant="outline" className="border-white/15 text-slate-300">
                  {f === "all" ? "All" : `${f} priority`}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {KANBAN_COLUMNS.map((column) => {
              const columnTasks = tasks.filter((t) => t.column === column.id);
              return (
                <div
                  key={column.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(column.id);
                  }}
                  onDragLeave={() => setDragOver((c) => (c === column.id ? null : c))}
                  onDrop={() => onDrop(column.id)}
                  className={cn(
                    "rounded-2xl border p-3 transition-all min-h-[200px]",
                    dragOver === column.id
                      ? "border-blue-400/50 bg-blue-500/10"
                      : "border-white/10 bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center justify-between px-1 pb-3">
                    <p className={cn("text-sm font-semibold flex items-center gap-2", column.accent)}>
                      {column.label}
                      <span className="text-xs text-slate-600">{columnTasks.length}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    {columnTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        draggable
                        onDragStart={() => setDragging(task.id)}
                        onDragEnd={() => {
                          setDragging(null);
                          setDragOver(null);
                        }}
                        whileHover={{ scale: 1.02 }}
                        className="group cursor-grab active:cursor-grabbing rounded-xl border border-white/10 bg-black/40 p-3 hover:border-white/25 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <GripVertical className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white leading-snug">{task.title}</p>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{task.description}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pl-6">
                          <Badge className={priorityStyle[task.priority]}>{task.priority}</Badge>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {task.due}
                          </span>
                        </div>
                        <div className="mt-2 pl-6 flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                    {columnTasks.length === 0 && (
                      <p className="text-center text-xs text-slate-600 py-6 border border-dashed border-white/10 rounded-xl">
                        Drop tasks here
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.internProjects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="glass-dark border-white/10 h-full hover:border-white/25 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                        project.status === "completed" ? "from-emerald-500 to-teal-500" : "from-blue-500 to-cyan-500"
                      )}>
                        <FolderKanban className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{project.name}</h3>
                        <p className="text-xs text-slate-500">{project.repo}</p>
                      </div>
                    </div>
                    <Badge className={project.status === "completed" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border-blue-500/30"}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{project.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <ProgressBar value={project.progress} gradient={project.status === "completed" ? "from-emerald-500 to-teal-500" : "from-blue-500 to-cyan-500"} />
                    <span className="text-xs text-slate-400 font-medium shrink-0">{project.progress}%</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-500 mb-2">Milestones</p>
                    <div className="space-y-1.5">
                      {project.milestones.map((milestone, idx) => (
                        <div key={milestone} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className={cn("h-3.5 w-3.5", idx < project.milestones.length * (project.progress / 100) / 20 ? "text-emerald-400" : "text-slate-600")} />
                          <span className={idx < 2 ? "text-slate-300" : "text-slate-500"}>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "reports" && (
        <Card className="glass-dark border-white/10">
          <CardContent className="p-5 space-y-3">
            {[...data.weeklyReports].reverse().map((report) => (
              <div key={report.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Week {report.week} — {report.title}</h3>
                      <p className="text-xs text-slate-500">
                        {report.status === "submitted" ? `Submitted ${report.submittedOn}` : "Draft"}
                      </p>
                    </div>
                  </div>
                  <Badge className={report.status === "submitted" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}>
                    {report.status}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-slate-400">{report.summary}</p>
                {report.highlights.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {report.highlights.map((h) => (
                      <span key={h} className="text-[11px] px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        {h}
                      </span>
                    ))}
                  </div>
                )}
                {report.blockers && (
                  <p className="mt-2 text-xs text-amber-400">Blockers: {report.blockers}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "meetings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.meetings.map((meeting, i) => (
            <motion.div key={meeting.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="glass-dark border-white/10 h-full">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center shrink-0">
                      <CalendarDays className="h-4 w-4 text-purple-400" />
                    </div>
                    <Badge variant="outline" className="border-white/15 text-slate-300">
                      {meeting.type}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{meeting.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {meeting.date} · {meeting.time} · {meeting.duration}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> {meeting.attendee}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {meeting.agenda.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "evaluations" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.evaluations.map((evaluation) => (
              <Card key={evaluation.id} className="glass-dark border-white/10">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">{evaluation.criteria}</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-400">
                    {evaluation.score}<span className="text-sm text-slate-500">/{evaluation.maxScore}</span>
                  </p>
                  <div className="mt-2">
                    <ProgressBar
                      value={(evaluation.score / evaluation.maxScore) * 100}
                      gradient="from-emerald-500 to-teal-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{evaluation.comments}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Reviewer Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.evaluations.map((evaluation) => (
                <div key={evaluation.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{evaluation.criteria}</p>
                    <p className="text-xs text-slate-500">{evaluation.reviewer} · {evaluation.date}</p>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-400">{evaluation.comments}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={Star} label="Overall Rating" value="4.6 / 5" gradient="from-emerald-500 to-teal-500" />
            <StatCard icon={MessageSquare} label="Reports Submitted" value={`${submittedReports.length} / ${data.weeklyReports.length}`} gradient="from-blue-500 to-cyan-500" />
            <StatCard icon={Users} label="Sprint Velocity" value="+18%" hint="↑ 5% WoW" gradient="from-purple-500 to-fuchsia-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Performance Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={data.evaluations.map((e) => ({ criteria: e.criteria, score: e.score }))}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="criteria" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Radar dataKey="score" stroke="#34d399" fill="#34d399" fillOpacity={0.35} strokeWidth={2} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Tasks Completed by Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={[
                    { week: "W1", done: 3 },
                    { week: "W2", done: 4 },
                    { week: "W3", done: 5 },
                    { week: "W4", done: 4 },
                    { week: "W5", done: 6 },
                    { week: "W6", done: 7 },
                    { week: "W7", done: 8 },
                    { week: "W8", done: 6 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                    <Bar dataKey="done" radius={[6, 6, 0, 0]}>
                      {[3, 4, 5, 4, 6, 7, 8, 6].map((v, i) => (
                        <Cell key={i} fill={v >= 7 ? "#34d399" : v >= 5 ? "#3b82f6" : "#f59e0b"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "calendar" && <InternshipCalendar />}

      {activeTab === "documents" && <DocumentsWorkspace program="internship" />}

      <div aria-hidden className="pointer-events-none fixed left-[-2000px] top-0">
        <OfferLetterSheet ref={sheetRef} />
      </div>
    </ProgramLayout>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="text-sm font-medium text-white text-right">{value}</p>
  </div>
);

const ICAL_STYLE: Record<string, string> = {
  meeting: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  deadline: "bg-red-500/20 text-red-300 border-red-500/30",
  event: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

interface InternshipCalendarItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
}

const InternshipCalendar = () => {
  const { data } = usePortal();
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const events = useMemo<InternshipCalendarItem[]>(() => [
    ...data.events
      .filter((e) => e.module === "internship")
      .map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        time: e.time,
        type: e.type,
        location: e.location,
      })),
    ...data.meetings.map((m) => ({
      id: `m-${m.id}`,
      title: m.title,
      date: new Date(m.date).toISOString().slice(0, 10),
      time: m.time,
      type: "meeting",
      location: m.attendee,
    })),
  ], [data]);

  const byDate = useMemo(() => {
    const map = new Map<string, InternshipCalendarItem[]>();
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
                <CalendarDays className="h-5 w-5 text-emerald-400" />
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
                        ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-transparent shadow-lg"
                        : isToday
                          ? "border-emerald-500/50 bg-emerald-500/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    {date.getDate()}
                    {hasEvents && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-emerald-400" />
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
                <p className="text-sm text-slate-500">No meetings or deadlines this day.</p>
              )}
              {selectedEvents.map((event) => (
                <div key={event.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <Badge className={ICAL_STYLE[event.type] ?? "bg-white/10 text-slate-300 border-white/15"}>
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

export default InternshipModule;
