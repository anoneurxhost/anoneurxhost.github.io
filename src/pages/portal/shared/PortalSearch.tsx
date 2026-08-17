import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Command, CornerDownLeft, ArrowRight, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection, ModuleBadge } from "../components/ui";
import type { ProgramId } from "../types";

export const PortalSearch = () => {
  const { search, searchIndex, memberships } = usePortal();
  const [query, setQuery] = useState("");

  const results = useMemo(() => search(query), [search, query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof results>();
    results.forEach((result) => {
      groups.set(result.category, [...(groups.get(result.category) ?? []), result]);
    });
    return Array.from(groups.entries());
  }, [results]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    searchIndex.forEach((entry) => {
      counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
    });
    return counts;
  }, [searchIndex]);

  const quickLinks: { label: string; category: string; module: ProgramId | "general" }[] = [
    { label: "All Projects", category: "Project", module: "general" },
    { label: "All Courses", category: "Course", module: "university" },
    { label: "All Tasks", category: "Task", module: "internship" },
    { label: "All Team Members", category: "Hackathon Team", module: "hackathon" },
    { label: "All Certificates", category: "Certificate", module: "general" },
  ];

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Global Search"
        title="Search"
        description="Search across courses, tasks, projects, certificates, events and people — everything in one place."
        icon={Command}
        gradient="from-slate-500 to-slate-400"
      />

      <PortalSection>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “DocuMind”, “Assignment”, “Machine Learning”…"
            className="pl-12 py-6 text-base bg-white/[0.04] border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center rounded border border-white/10 bg-white/5 px-2 text-xs text-slate-500">
            <CornerDownLeft className="h-3 w-3 mr-1" /> to search
          </kbd>
        </div>
      </PortalSection>

      {!query && (
        <>
          <PortalSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Quick filters
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to="/portal/search"
                  onClick={() => setQuery(link.category)}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/25 hover:bg-white/[0.06] transition-all"
                >
                  <p className="text-sm font-semibold text-white">{link.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{categoryCounts.get(link.category) ?? 0} results</p>
                </Link>
              ))}
            </div>
          </PortalSection>

          <PortalSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Browsable index
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from(categoryCounts.entries()).map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => setQuery(category)}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-sm text-slate-300">{category}</span>
                  <Badge variant="outline" className="border-white/15 text-slate-400">{count}</Badge>
                </button>
              ))}
            </div>
          </PortalSection>
        </>
      )}

      {query && results.length === 0 && (
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardContent className="py-14 text-center">
              <Search className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300">No results for “{query}”</p>
              <p className="text-xs text-slate-600 mt-1">Try a different keyword or check your spelling.</p>
            </CardContent>
          </Card>
        </PortalSection>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          {grouped.map(([category, items], groupIndex) => (
            <PortalSection key={category}>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{category}</p>
                <span className="text-xs text-slate-600">({items.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.05 + i * 0.03 }}
                  >
                    <Link
                      to={result.route}
                      className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/20 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shrink-0">
                        <FolderKanban className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{result.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{result.subtitle}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <ModuleBadge module={result.module} />
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors shrink-0 mt-1" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </PortalSection>
          ))}
        </div>
      )}

      {query && memberships.length === 0 && (
        <PortalSection>
          <p className="text-center text-xs text-slate-600">
            Enroll in programs to expand your searchable workspace.
          </p>
        </PortalSection>
      )}
    </PortalPage>
  );
};

export default PortalSearch;
