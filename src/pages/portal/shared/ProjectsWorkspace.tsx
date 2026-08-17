import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  GitBranch,
  CheckCircle2,
  Clock,
  Plus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection, ProgressBar, ModuleBadge } from "../components/ui";
import type { ProjectStatus } from "../types";

const statusStyle: Record<ProjectStatus, { badge: string; dot: string }> = {
  planning: { badge: "bg-slate-500/20 text-slate-300 border-slate-500/30", dot: "bg-slate-400" },
  "in-progress": { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30", dot: "bg-blue-400" },
  review: { badge: "bg-purple-500/20 text-purple-300 border-purple-500/30", dot: "bg-purple-400" },
  completed: { badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400" },
};

const filterOptions: ("all" | ProjectStatus)[] = ["all", "planning", "in-progress", "review", "completed"];

export const ProjectsWorkspace = () => {
  const { data, memberships } = usePortal();
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [query, setQuery] = useState("");

  const filtered = data.projects.filter((project) => {
    const matchesFilter = filter === "all" || project.status === filter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      project.name.toLowerCase().includes(q) ||
      project.tags.some((t) => t.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  const inProgress = data.projects.filter((p) => p.status === "in-progress" || p.status === "review");
  const completed = data.projects.filter((p) => p.status === "completed");

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Shared Workspace"
        title="Projects"
        description="One unified project workspace spanning your University, Internship and Hackathon programs."
        icon={FolderKanban}
        gradient="from-blue-500 to-cyan-500"
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> New Project
          </Button>
        }
      />

      <PortalSection>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="pl-9 bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto">
            {filterOptions.map((option) => (
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
                {option === "all" ? "All" : option.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      </PortalSection>

      <PortalSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniStat label="Total Projects" value={data.projects.length} />
          <MiniStat label="In Progress" value={inProgress.length} accent="text-blue-400" />
          <MiniStat label="Completed" value={completed.length} accent="text-emerald-400" />
          <MiniStat label="Tasks Done" value={data.projects.reduce((s, p) => s + p.tasks.done, 0)} accent="text-purple-400" />
        </div>
      </PortalSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="glass-dark border-white/10 h-full hover:border-white/25 hover:bg-white/[0.05] transition-all group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0">
                      <FolderKanban className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <GitBranch className="h-3 w-3" /> {project.repo}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusStyle[project.status].badge}>
                    <span className={cn("h-1.5 w-1.5 rounded-full mr-1.5", statusStyle[project.status].dot)} />
                    {project.status}
                  </Badge>
                </div>

                <p className="mt-3 text-sm text-slate-400 line-clamp-2">{project.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  <ProgressBar value={project.progress} />
                  <span className="text-xs text-slate-400 font-medium shrink-0">{project.progress}%</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ModuleBadge module={project.module} label={project.module === "general" ? "General" : project.module} />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> Updated {project.updatedAt}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    {project.tasks.done}/{project.tasks.total} tasks
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400">No projects match your filters.</p>
              <p className="text-xs text-slate-600 mt-1">Try adjusting the search query or status filter.</p>
            </CardContent>
          </Card>
        </PortalSection>
      )}

      {memberships.length === 0 && (
        <PortalSection>
          <p className="text-center text-xs text-slate-600">
            Enroll in a program to populate this workspace with projects.
          </p>
        </PortalSection>
      )}
    </PortalPage>
  );
};

const MiniStat = ({ label, value, accent }: { label: string; value: number; accent?: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <p className={cn("text-xl font-bold text-white leading-none", accent)}>{value}</p>
    <p className="mt-1 text-xs text-slate-400">{label}</p>
  </div>
);

export default ProjectsWorkspace;
