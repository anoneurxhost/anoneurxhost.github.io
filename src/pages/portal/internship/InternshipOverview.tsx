import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ClipboardList,
  FolderKanban,
  FileText,
  CalendarDays,
  Medal,
  Download,
  Clock,
  Star,
  TrendingUp,
  UserRound,
} from "lucide-react";
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

const priorityDot: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
  urgent: "bg-purple-400",
};

export const InternshipOverview = () => {
  const { data, user } = usePortal();

  const inProgressProjects = data.internProjects.filter((p) => p.status === "in-progress");
  const inFlightTasks = data.kanbanTasks.filter((t) => t.column !== "done");
  const upcomingMeetings = data.meetings.slice(0, 3);
  const avgEvaluation = Math.round(
    data.evaluations.reduce((sum, e) => sum + (e.score / e.maxScore) * 100, 0) / data.evaluations.length
  );
  const submittedReports = data.weeklyReports.filter((r) => r.status === "submitted").length;

  const stats = [
    { icon: ClipboardList, label: "Open Tasks", value: inFlightTasks.length, hint: "across the board", gradient: "from-emerald-500 to-teal-500" },
    { icon: FolderKanban, label: "Active Projects", value: inProgressProjects.length, gradient: "from-blue-500 to-cyan-500" },
    { icon: Star, label: "Mentor Rating", value: `${data.mentor.rating} / 5`, hint: data.mentor.name, gradient: "from-amber-500 to-orange-500" },
    { icon: FileText, label: "Reports", value: `${submittedReports} / ${data.weeklyReports.length}`, hint: "submitted", gradient: "from-purple-500 to-fuchsia-500" },
  ];

  const quickActions = [
    { icon: ClipboardList, label: "Kanban", hint: `${inFlightTasks.length} tasks in flight`, to: "/portal/internship/kanban", gradient: "from-emerald-500 to-teal-500" },
    { icon: FolderKanban, label: "Projects", hint: `${inProgressProjects.length} active`, to: "/portal/internship/projects", gradient: "from-blue-500 to-cyan-500" },
    { icon: FileText, label: "Reports", hint: "Weekly updates", to: "/portal/internship/reports", gradient: "from-purple-500 to-fuchsia-500" },
    { icon: Download, label: "Documents", hint: "Offer & letters", to: "/portal/internship/documents", gradient: "from-amber-500 to-orange-500" },
  ];

  const activity = data.activity
    .filter((a) => a.module === "internship")
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      icon:
        a.type === "evaluation"
          ? Medal
          : a.type === "meeting"
            ? CalendarDays
            : a.type === "task"
              ? ClipboardList
              : a.type === "certificate"
                ? Download
                : FolderKanban,
      title: a.title,
      detail: a.detail,
      time: a.time,
      gradient: "from-emerald-500/40 to-teal-500/40",
    }));

  return (
    <ProgramOverview
      program="internship"
      identity={{ accountId: user.anxId, participantId: user.programIds?.internship }}
      stats={stats}
    >
      <WidgetGrid className="lg:grid-cols-3">
        <Widget
          title="Project Delivery"
          icon={FolderKanban}
          gradient="from-blue-500 to-cyan-500"
          className="lg:col-span-2"
          action={
            <Link to="/portal/internship/projects">
              <Button size="sm" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10">
                All projects
              </Button>
            </Link>
          }
        >
          <div className="space-y-4">
            {inProgressProjects.map((project) => (
              <div key={project.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                      <FolderKanban className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                      <p className="text-xs text-slate-500 truncate">{project.stack.join(" · ")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white shrink-0">{project.progress}%</span>
                </div>
                <div className="mt-3">
                  <ProgressBar value={project.progress} gradient="from-blue-500 to-cyan-500" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.milestones.slice(0, 3).map((milestone) => (
                    <span key={milestone} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      {milestone}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Widget>

        <div className="space-y-6">
          <Widget title="Engagement" icon={Clock} gradient="from-emerald-500 to-teal-500">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-xs text-slate-500">Hours / week</span>
                <span className="text-sm font-bold text-white">{data.internship.hoursPerWeek}h</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-xs text-slate-500">Stipend</span>
                <span className="text-sm font-bold text-white">{data.internship.stipend}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-xs text-slate-500">Supervisor</span>
                <span className="text-sm font-bold text-white">{data.internship.supervisor}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="text-xs text-slate-500">Tenure</span>
                <span className="text-sm font-bold text-white">{data.internship.startDate} — {data.internship.endDate}</span>
              </div>
            </div>
          </Widget>

          <Widget title="Mentor" icon={UserRound} gradient="from-amber-500 to-orange-500">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {data.mentor.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{data.mentor.name}</p>
                <p className="text-xs text-slate-500 truncate">{data.mentor.title}</p>
                <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" /> {data.mentor.rating} · {data.mentor.reviews} reviews
                </p>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" /> Next 1:1 — {data.mentor.nextMeeting}
              </p>
            </div>
          </Widget>
        </div>
      </WidgetGrid>

      <WidgetGrid className="lg:grid-cols-3">
        <Widget title="Task Pipeline" icon={ClipboardList} gradient="from-emerald-500 to-teal-500">
          <div className="space-y-3">
            {["todo", "in-progress", "review"].map((column) => {
              const tasks = data.kanbanTasks.filter((t) => t.column === column);
              return (
                <div key={column} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <span className="text-xs text-slate-400 capitalize">{column.replace("-", " ")}</span>
                  <Badge variant="outline" className="border-white/15 text-slate-300">{tasks.length}</Badge>
                </div>
              );
            })}
            <Link to="/portal/internship/kanban">
              <Button size="sm" variant="outline" className="w-full border-white/15 text-slate-300 hover:bg-white/10">
                Open board
              </Button>
            </Link>
          </div>
        </Widget>

        <Widget title="Upcoming Meetings" icon={CalendarDays} gradient="from-purple-500 to-fuchsia-500">
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="text-center shrink-0">
                  <p className="text-xs font-bold text-white">{meeting.date.split(",")[0]}</p>
                  <p className="text-[10px] text-slate-600">{meeting.time}</p>
                </div>
                <div className="flex-1 min-w-0 border-l border-white/10 pl-3">
                  <p className="text-sm font-medium text-white truncate">{meeting.title}</p>
                  <p className="text-xs text-slate-500">{meeting.type} · {meeting.attendee}</p>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        <Widget title="Evaluation Average" icon={Medal} gradient="from-amber-500 to-orange-500">
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-white">{avgEvaluation}<span className="text-lg text-slate-500">/100</span></p>
            <div className="flex-1">
              <ProgressBar value={avgEvaluation} gradient="from-amber-500 to-orange-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {data.evaluations.slice(0, 3).map((evaluation) => (
              <div key={evaluation.id} className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{evaluation.criteria}</span>
                <span className="text-white font-medium">{evaluation.score}/{evaluation.maxScore}</span>
              </div>
            ))}
          </div>
          <Link to="/portal/internship/evaluations" className="mt-4 block">
            <Button size="sm" variant="outline" className="w-full border-white/15 text-slate-300 hover:bg-white/10">
              View evaluations
            </Button>
          </Link>
        </Widget>
      </WidgetGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions actions={quickActions} />
        <div className="lg:col-span-2">
          <RecentActivity title="Professional Activity" icon={TrendingUp} items={activity} />
        </div>
      </div>
    </ProgramOverview>
  );
};
