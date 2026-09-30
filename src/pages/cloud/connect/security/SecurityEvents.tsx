import { useState, useEffect, useCallback } from "react";
import { History, RefreshCw, Search, Filter, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import ConnectSection from "../ConnectSection";
import { securityApi, type EventsFeed, type SecEvent } from "../api";
import { useAsyncData } from "../useConnectData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SecBadge, SecLoading, SecOffline, SecPanel, SecSearchBar, SecStat, fmtTs, usePageTitle } from "./securityUI";

const severityOptions = [
  { value: "all", label: "All Severities" },
  { value: "critical", label: "Critical" },
  { value: "error", label: "Error" },
  { value: "warn", label: "Warning" },
  { value: "info", label: "Info" },
] as const;

const SecurityEvents = () => {
  usePageTitle("Audit Events");
  const { data, mode, loading, error, refresh } = useAsyncData<EventsFeed>(
    () => securityApi.events(),
    []
  );

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      refresh();
      setLastRefresh(new Date());
    }, 15000);
    return () => clearInterval(id);
  }, [autoRefresh, refresh]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("event-search")?.focus();
      }
      if (e.key === "r" && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        const active = document.activeElement;
        if (!(active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          refresh();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [refresh]);

  const filteredEvents = data?.events?.filter((e) => {
    const matchesSearch =
      !search ||
      e.text.toLowerCase().includes(search.toLowerCase()) ||
      e.kind.toLowerCase().includes(search.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || e.severity.toLowerCase() === severityFilter;
    return matchesSearch && matchesSeverity;
  }) ?? [];

  const criticalCount = data?.events?.filter((e) => e.severity === "critical" || e.severity === "error").length ?? 0;
  const eventTypes = new Set(data?.events?.map((e) => e.kind)).size ?? 0;

  return (
    <ConnectSection
      title="Audit & Security Events"
      subtitle="Real-time agent activity relevant to security posture."
      icon={History}
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className={`w-2 h-2 rounded-full ${mode === "live" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {mode === "live" ? "Live" : "Offline"}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh((v) => !v)}
            className={`gap-2 transition-colors ${autoRefresh ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300" : ""}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
            {autoRefresh ? "Auto (15s)" : "Auto"}
          </Button>
          <Button variant="ghost" size="sm" onClick={refresh} className="gap-2" disabled={loading}>
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>
      }
    >
      {loading && <SecLoading label="Loading event feed…" />}
      {!loading && mode !== "live" && <SecOffline error={error} />}

      {data && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SecStat value={data.total ?? 0} label="Total Events" />
            <SecStat value={criticalCount} label="Critical/Error" tone={criticalCount > 0 ? "danger" : "ok"} />
            <SecStat value={eventTypes} label="Event Types" />
            <SecStat value={filteredEvents.length} label="Filtered" />
          </div>

          {/* Search & Filter Bar */}
          <SecPanel title="Filters" actions={<Search className="w-4 h-4 text-slate-400" />}>
            <div className="flex flex-wrap gap-3 p-5">
              <SecSearchBar id="event-search" value={search} onChange={setSearch} placeholder="Search events… (⌘K)" />
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="h-10 w-[180px] border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(search || severityFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setSeverityFilter("all"); }} className="gap-1.5">
                  <X className="w-3.5 h-3.5" /> Clear
                </Button>
              )}
            </div>
          </SecPanel>

          {/* Events List */}
          <SecPanel title={`Recent Events (${filteredEvents.length} of ${data.total ?? 0})`}>
            {filteredEvents.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                {search || severityFilter !== "all"
                  ? "No events match your filters."
                  : "No security events recorded."}
              </div>
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200/50 dark:border-white/5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Severity</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {filteredEvents.map((e, i) => {
                      const isCritical = e.severity === "critical" || e.severity === "error";
                      const isWarn = e.severity === "warn" || e.severity === "warning";
                      return (
                        <tr key={`${e.kind}-${e.time}-${i}`} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <SecBadge status={e.severity} />
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">{e.kind}</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400 tabular-nums">{fmtTs(e.time)}</td>
                          <td className="px-4 py-3 text-slate-900 dark:text-white break-words max-w-xl">{e.text}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </SecPanel>

          {/* Live indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Last updated: {lastRefresh ? lastRefresh.toLocaleTimeString() : "—"}</span>
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${mode === "live" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {mode === "live" ? "Connected to agent" : "Agent unreachable"}
            </span>
          </div>
        </div>
      )}
    </ConnectSection>
  );
};

export default SecurityEvents;