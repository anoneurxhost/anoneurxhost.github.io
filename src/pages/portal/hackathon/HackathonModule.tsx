import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trophy,
  Rocket,
  Crown,
  Globe,
  GitBranch,
  CheckCircle2,
  UserPlus,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { getModuleById, PROGRAM_MENUS } from "../portal.config";
import { DocumentsWorkspace } from "../shared/DocumentsWorkspace";
import { ProgramLayout } from "../components/ProgramLayout";
import { HackathonOverview } from "./HackathonOverview";
import { HackathonWorkspace } from "./HackathonWorkspace";
import { ProgressBar, PortalSection } from "../components/ui";

const hackathonModule = getModuleById("hackathon")!;

const inviteStatusStyle: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  accepted: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  declined: "bg-red-500/20 text-red-300 border-red-500/30",
};

const rarityStyle: Record<string, string> = {
  legendary: "from-amber-400 to-orange-500 border-amber-300/40",
  epic: "from-purple-500 to-fuchsia-500 border-purple-300/40",
  rare: "from-blue-500 to-cyan-500 border-blue-300/40",
  common: "from-slate-500 to-slate-400 border-white/15",
};

export const HackathonModule = () => {
  const { data, user, memberships } = usePortal();
  const { section } = useParams<{ section?: string }>();

  if (!memberships.includes("hackathon")) {
    return <Navigate to="/portal" replace />;
  }

  const activeTab = PROGRAM_MENUS.hackathon.some((t) => t.value === section)
    ? section!
    : "overview";

  const hackathonBadges = user.achievements.filter((a) => a.module === "hackathon");

  return (
    <ProgramLayout
      module={hackathonModule}
      badge={
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
          <Trophy className="h-3 w-3 mr-1" /> #{data.leaderboard.find((l) => l.isYou)?.score ?? 0} pts
        </Badge>
      }
    >
      {activeTab === "overview" && <HackathonOverview />}

      {activeTab === "workspace" && <HackathonWorkspace />}

      {activeTab === "calendar" && <HackathonCalendar />}

      {activeTab === "team" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base">Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.team.map((member) => (
                  <div key={member.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-500/40 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white flex items-center gap-2">
                        {member.name}
                        {member.isYou && <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">You</Badge>}
                      </p>
                      <p className="text-xs text-slate-500">{member.role}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>

          <PortalSection>
            <Card className="glass-dark border-white/10">
              <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
                <CardTitle className="text-white text-base">Member Invitations</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <UserPlus className="h-4 w-4 mr-1.5" /> Invite
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.invites.map((invite) => (
                  <div key={invite.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{invite.name}</p>
                      <p className="text-xs text-slate-500">{invite.email} · {invite.invitedOn}</p>
                    </div>
                    <Badge className={inviteStatusStyle[invite.status]}>{invite.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </PortalSection>
        </div>
      )}

      {activeTab === "submissions" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.submissions.map((submission, i) => (
            <motion.div key={submission.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="glass-dark border-white/10 h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center shrink-0">
                        <Rocket className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{submission.title}</h3>
                        <p className="text-xs text-slate-500">{submission.round}</p>
                      </div>
                    </div>
                    {submission.score !== undefined ? (
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 font-semibold">
                        {submission.score}/100
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Awaiting review</Badge>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{submission.description}</p>
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="text-xs flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                      <GitBranch className="h-3.5 w-3.5" /> {submission.repo}
                    </span>
                    <span className="text-xs flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                      <Globe className="h-3.5 w-3.5" /> {submission.demo}
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Submitted {submission.submittedOn}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "leaderboard" && (
        <Card className="glass-dark border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-4 py-3 text-slate-400 font-medium w-16">Rank</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Team</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Project</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-right">Round 1</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-right">Round 2</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.leaderboard.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={cn(
                      "border-b border-white/5",
                      entry.isYou ? "bg-gradient-to-r from-purple-600/20 to-transparent" : "hover:bg-white/[0.03]"
                    )}
                  >
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        index === 0
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                          : index === 1
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-black"
                            : index === 2
                              ? "bg-gradient-to-br from-amber-700 to-amber-900 text-white"
                              : "bg-white/5 text-slate-400 border border-white/10"
                      )}>
                        {index === 0 ? <Crown className="h-3.5 w-3.5" /> : index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white flex items-center gap-2">
                        {entry.team}
                        {entry.isYou && <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">You</Badge>}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{entry.project}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{entry.rounds[0] ?? "—"}</td>
                    <td className="px-4 py-3 text-right text-slate-300">{entry.rounds[1] ?? "—"}</td>
                    <td className="px-4 py-3 text-right font-bold text-white">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "judging" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.judging.map((result) => (
              <Card key={result.id} className="glass-dark border-white/10">
                <CardContent className="p-5">
                  <p className="text-sm font-semibold text-white">{result.criterion}</p>
                  <p className="mt-2 text-2xl font-bold text-purple-400">
                    {result.score}<span className="text-sm text-slate-500">/{result.maxScore}</span>
                  </p>
                  <div className="mt-2">
                    <ProgressBar value={(result.score / result.maxScore) * 100} gradient="from-purple-500 to-fuchsia-500" />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{result.judge}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Judge Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.judging.map((result) => (
                <div key={result.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{result.criterion}</p>
                    <p className="text-xs text-slate-500">{result.judge}</p>
                  </div>
                  <p className="mt-1.5 text-sm text-slate-400">{result.feedback}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hackathonBadges.map((achievement) => (
              <Card key={achievement.id} className="glass-dark border-white/10">
                <CardContent className="p-5 text-center">
                  <div className={cn(
                    "h-14 w-14 rounded-2xl bg-gradient-to-br mx-auto flex items-center justify-center border shadow-lg",
                    rarityStyle[achievement.rarity]
                  )}>
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <p className="mt-3 font-semibold text-white text-sm">{achievement.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{achievement.earnedOn}</p>
                  <Badge variant="outline" className="mt-2 border-white/15 text-slate-400 capitalize">
                    {achievement.rarity}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-dark border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Certificates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.certificates.filter((c) => c.module === "hackathon").map((certificate) => (
                <div key={certificate.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{certificate.title}</p>
                      <p className="text-xs text-slate-500">{certificate.issuer} · {certificate.issuedOn}</p>
                    </div>
                  </div>
                  <Link to="/portal/certificates">
                    <Button size="sm" variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "documents" && <DocumentsWorkspace program="hackathon" />}

      {activeTab === "feedback" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.feedback.map((feedback) => (
            <Card key={feedback.id} className="glass-dark border-white/10">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {feedback.from.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{feedback.from}</p>
                        <p className="text-xs text-slate-500">{feedback.role}</p>
                      </div>
                      <span className="text-amber-400 text-sm">{"★".repeat(feedback.rating)}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">"{feedback.message}"</p>
                    <p className="mt-2 text-xs text-slate-600">{feedback.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ProgramLayout>
  );
};

const HCAL_STYLE: Record<string, string> = {
  submission: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  event: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  deadline: "bg-red-500/20 text-red-300 border-red-500/30",
};

interface HackathonCalendarItem {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
}

const HackathonCalendar = () => {
  const { data } = usePortal();
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const events = useMemo<HackathonCalendarItem[]>(() => [
    ...data.events
      .filter((e) => e.module === "hackathon")
      .map((e) => ({
        id: e.id,
        title: e.title,
        date: e.date,
        time: e.time,
        type: e.type,
        location: e.location,
      })),
    ...data.submissions.map((s) => ({
      id: `s-${s.id}`,
      title: `${s.round}: ${s.title}`,
      date: new Date(s.submittedOn).toISOString().slice(0, 10),
      time: "23:59",
      type: "submission",
      location: s.status,
    })),
  ], [data]);

  const byDate = useMemo(() => {
    const map = new Map<string, HackathonCalendarItem[]>();
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
                <CalendarDays className="h-5 w-5 text-purple-400" />
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
                        ? "bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white border-transparent shadow-lg"
                        : isToday
                          ? "border-purple-500/50 bg-purple-500/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/5"
                    )}
                  >
                    {date.getDate()}
                    {hasEvents && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-purple-400" />
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
                <p className="text-sm text-slate-500">No rounds or submissions this day.</p>
              )}
              {selectedEvents.map((event) => (
                <div key={event.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <Badge className={HCAL_STYLE[event.type] ?? "bg-white/10 text-slate-300 border-white/15"}>
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

export default HackathonModule;
