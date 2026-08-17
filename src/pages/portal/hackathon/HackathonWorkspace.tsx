import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FolderKanban,
  GitBranch,
  Globe,
  Rocket,
  Users,
  CheckCircle2,
  CircleDashed,
  Loader,
  GitPullRequest,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { Widget, WidgetGrid } from "../components/Widgets";
import { ProgressBar, PortalSection, PortalPage, PageHeader } from "../components/ui";

export const HackathonWorkspace = () => {
  const { data } = usePortal();

  const projects = data.projects.filter((p) => p.module === "hackathon");
  const doneTasks = projects.reduce((sum, p) => sum + p.tasks.done, 0);
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.total, 0);
  const completion = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const backlog = [
    { id: "b1", title: "Streaming response pipeline", status: "in-progress", icon: Loader },
    { id: "b2", title: "Audit log schema", status: "done", icon: CheckCircle2 },
    { id: "b3", title: "Enterprise SSO integration", status: "todo", icon: CircleDashed },
    { id: "b4", title: "Demo-day pitch deck", status: "todo", icon: GitPullRequest },
  ];

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Hackathon"
        title="Team Workspace"
        description="Build together — project board, repos, demos and team responsibilities for the AI Innovation Challenge."
        icon={FolderKanban}
        gradient="from-purple-500 to-fuchsia-500"
      />

      <PortalSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard icon={FolderKanban} label="Active Projects" value={projects.length} gradient="from-purple-500 to-fuchsia-500" />
          <SummaryCard icon={CheckCircle2} label="Tasks Done" value={`${doneTasks} / ${totalTasks}`} gradient="from-emerald-500 to-teal-500" />
          <SummaryCard icon={Rocket} label="Completeness" value={`${completion}%`} gradient="from-blue-500 to-cyan-500" />
          <SummaryCard icon={Users} label="Team Members" value={data.team.length} gradient="from-amber-500 to-orange-500" />
        </div>
      </PortalSection>

      <WidgetGrid className="lg:grid-cols-3">
        <Widget
          title="Projects"
          icon={FolderKanban}
          gradient="from-purple-500 to-fuchsia-500"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-white">{project.name}</p>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300 capitalize">{project.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <a href={`https://${project.repo}`} target="_blank" rel="noreferrer">
                      <Button size="sm" variant="outline" className="w-full border-white/15 text-slate-300 hover:bg-white/10">
                        <GitBranch className="h-3.5 w-3.5 mr-1.5" /> Repo
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={project.progress} gradient="from-purple-500 to-fuchsia-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{project.progress}%</span>
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Updated {project.updatedAt}</p>
              </div>
            ))}
            <div className="text-center">
              <Link to="/portal/projects">
                <Button variant="outline" className="border-white/15 text-slate-300 hover:bg-white/10">
                  View all in Projects
                </Button>
              </Link>
            </div>
          </div>
        </Widget>

        <Widget title="Sprint Board" icon={CheckCircle2} gradient="from-emerald-500 to-teal-500">
          <div className="space-y-2.5">
            {backlog.map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <task.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    task.status === "done" ? "text-emerald-400" : task.status === "in-progress" ? "text-amber-400" : "text-slate-500"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm truncate", task.status === "done" ? "text-slate-500 line-through" : "text-white")}>
                    {task.title}
                  </p>
                  <p className="text-[11px] text-slate-600 capitalize">{task.status.replace("-", " ")}</p>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </WidgetGrid>

      <WidgetGrid className="lg:grid-cols-2">
        <Widget title="Round Submissions" icon={Rocket} gradient="from-blue-500 to-cyan-500">
          <div className="space-y-3">
            {data.submissions.map((submission) => (
              <div key={submission.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500">{submission.round}</p>
                  {submission.score !== undefined ? (
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-300 font-semibold">{submission.score}/100</Badge>
                  ) : (
                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">Awaiting review</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white">{submission.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <a href={`https://${submission.repo}`} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors">
                    <GitBranch className="h-3 w-3" /> {submission.repo}
                  </a>
                  <a href={`https://${submission.demo}`} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors">
                    <Globe className="h-3 w-3" /> Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        <Widget title="Team Responsibilities" icon={Users} gradient="from-amber-500 to-orange-500">
          <div className="space-y-3">
            {data.team.map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500/50 to-fuchsia-500/50 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{member.name}</p>
                  <p className="text-xs text-slate-500 truncate">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-500">
            <p className="flex items-center gap-1.5 mb-1"><ExternalLink className="h-3 w-3" /> Collaboration</p>
            <p>Slack channel · GitHub org · Figma board</p>
          </div>
        </Widget>
      </WidgetGrid>
    </PortalPage>
  );
};

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  gradient: string;
}) => (
  <motion.div>
    <Card className="glass-dark border-white/10">
      <CardContent className="p-4">
        <div className={`h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center mb-2 ${gradient}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <p className="text-lg font-bold text-white leading-none">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{label}</p>
      </CardContent>
    </Card>
  </motion.div>
);

import { cn } from "@/lib/utils";
