import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Users,
  Rocket,
  Medal,
  Award,
  Clock,
  Globe,
  Crown,
  GitBranch,
  FolderKanban,
  MessageSquare,
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

export const HackathonOverview = () => {
  const { data, user } = usePortal();

  const yourScore = data.leaderboard.find((l) => l.isYou);
  const hackathonBadges = user.achievements.filter((a) => a.module === "hackathon");
  const hackathonProject = data.projects.find((p) => p.module === "hackathon");

  const stats = [
    { icon: Users, label: "Team Size", value: `${data.team.length} members`, gradient: "from-purple-500 to-fuchsia-500" },
    { icon: Rocket, label: "Rounds Completed", value: `${data.submissions.length} / 2`, gradient: "from-blue-500 to-cyan-500" },
    { icon: Medal, label: "Leaderboard", value: `#1`, hint: `${yourScore?.score ?? 0} points`, gradient: "from-amber-500 to-orange-500" },
    { icon: Award, label: "Badges Earned", value: hackathonBadges.length, gradient: "from-emerald-500 to-teal-500" },
  ];

  const quickActions = [
    { icon: Users, label: "Team", hint: `${data.team.length} members`, to: "/portal/hackathon/team", gradient: "from-purple-500 to-fuchsia-500" },
    { icon: FolderKanban, label: "Workspace", hint: "Project & tasks", to: "/portal/hackathon/workspace", gradient: "from-blue-500 to-cyan-500" },
    { icon: Rocket, label: "Submissions", hint: `${data.submissions.length} rounds`, to: "/portal/hackathon/submissions", gradient: "from-emerald-500 to-teal-500" },
    { icon: Medal, label: "Leaderboard", hint: "#1 of 24 teams", to: "/portal/hackathon/leaderboard", gradient: "from-amber-500 to-orange-500" },
  ];

  const activity = data.activity
    .filter((a) => a.module === "hackathon")
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      icon:
        a.type === "submission"
          ? Rocket
          : a.type === "achievement"
            ? Award
            : a.type === "meeting"
              ? Users
              : Trophy,
      title: a.title,
      detail: a.detail,
      time: a.time,
      gradient: "from-purple-500/40 to-fuchsia-500/40",
    }));

  return (
    <ProgramOverview
      program="hackathon"
      identity={{ accountId: user.anxId, participantId: user.programIds?.hackathon }}
      stats={stats}
    >
      <WidgetGrid className="lg:grid-cols-3">
        <Widget
          title={data.hackathon.name}
          icon={Trophy}
          gradient="from-purple-500 to-fuchsia-500"
          className="lg:col-span-2"
          action={
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {data.hackathon.status}
            </Badge>
          }
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="border-purple-500/30 text-purple-300">{data.hackathon.track}</Badge>
            <Badge variant="outline" className="border-white/15 text-slate-300">{data.hackathon.edition} Edition</Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-300">Prize pool {data.hackathon.prizePool}</Badge>
            <Badge variant="outline" className="border-white/15 text-slate-300">Hosted by {data.hackathon.host}</Badge>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{data.hackathon.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {data.hackathon.startDate} — {data.hackathon.endDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> Theme: {data.hackathon.theme}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.submissions.map((submission) => (
              <div key={submission.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{submission.round}</p>
                  {submission.score !== undefined ? (
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 font-semibold">
                      {submission.score}/100
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Awaiting review</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white truncate">{submission.title}</p>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{submission.description}</p>
              </div>
            ))}
          </div>
        </Widget>

        <div className="space-y-6">
          <Widget title="Your Project" icon={FolderKanban} gradient="from-blue-500 to-cyan-500">
            {hackathonProject ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <FolderKanban className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{hackathonProject.name}</p>
                    <p className="text-xs text-slate-500 truncate">{hackathonProject.repo}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1">
                    <ProgressBar value={hackathonProject.progress} gradient="from-blue-500 to-cyan-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{hackathonProject.progress}%</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{hackathonProject.tasks.done} / {hackathonProject.tasks.total} tasks</span>
                  <span>{hackathonProject.status}</span>
                </div>
                <Link to="/portal/hackathon/workspace" className="mt-4 block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Open Workspace
                  </Button>
                </Link>
              </>
            ) : (
              <p className="text-sm text-slate-500">No active project.</p>
            )}
          </Widget>

          <Widget title="Team NEXUS" icon={Users} gradient="from-purple-500 to-fuchsia-500">
            <div className="space-y-2.5">
              {data.team.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
                    member.isYou ? "bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white" : "bg-gradient-to-br from-blue-500/40 to-cyan-500/40 text-white"
                  )}>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white flex items-center gap-1.5 truncate">
                      {member.name}
                      {member.isYou && <Crown className="h-3 w-3 text-amber-400 shrink-0" />}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </WidgetGrid>

      <WidgetGrid className="lg:grid-cols-3">
        <Widget
          title="Standings"
          icon={Medal}
          gradient="from-amber-500 to-orange-500"
          className="lg:col-span-2"
          action={
            <Link to="/portal/hackathon/leaderboard">
              <Button size="sm" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10">
                Full board
              </Button>
            </Link>
          }
        >
          <div className="space-y-1.5">
            {data.leaderboard.slice(0, 5).map((entry, index) => (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5",
                  entry.isYou ? "bg-gradient-to-r from-purple-600/20 to-transparent border border-purple-500/20" : "border border-white/5"
                )}
              >
                <span className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shrink-0",
                  index === 0
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                    : index === 1
                      ? "bg-gradient-to-br from-slate-300 to-slate-500 text-black"
                      : index === 2
                        ? "bg-gradient-to-br from-amber-700 to-amber-900 text-white"
                        : "bg-white/5 text-slate-400 border border-white/10"
                )}>
                  {index === 0 ? <Crown className="h-3 w-3" /> : index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{entry.team}</p>
                  <p className="text-xs text-slate-500 truncate">{entry.project}</p>
                </div>
                <span className="text-sm font-bold text-white shrink-0">{entry.score}</span>
              </div>
            ))}
          </div>
        </Widget>

        <Widget title="Judging Scores" icon={GitBranch} gradient="from-emerald-500 to-teal-500">
          <div className="space-y-3">
            {data.judging.map((result) => (
              <div key={result.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">{result.criterion}</span>
                  <span className="text-white font-medium">{result.score}/{result.maxScore}</span>
                </div>
                <ProgressBar value={(result.score / result.maxScore) * 100} gradient="from-emerald-500 to-teal-500" />
              </div>
            ))}
          </div>
          <Link to="/portal/hackathon/judging" className="mt-4 block">
            <Button size="sm" variant="outline" className="w-full border-white/15 text-slate-300 hover:bg-white/10">
              View feedback
            </Button>
          </Link>
        </Widget>
      </WidgetGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions actions={quickActions} />
        <div className="lg:col-span-2">
          <RecentActivity title="Competition Activity" icon={MessageSquare} items={activity} />
        </div>
      </div>
    </ProgramOverview>
  );
};
