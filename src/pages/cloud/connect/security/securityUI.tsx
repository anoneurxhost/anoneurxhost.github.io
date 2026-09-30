import { useEffect, useState, type ReactNode } from "react";
import { Loader2, RefreshCw, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Shared building blocks for the Security Center. Everything here is
 * theme-aware (supports light & dark mode) and data-agnostic.
 */

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `ANONEURX | Security — ${title}`;
  }, [title]);
}

/* ------------------------------------------------------------- banners */

export function SecOffline({ error }: { error?: string | null }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/[0.07] px-4 py-3 text-xs text-amber-800 dark:text-amber-200 shadow-sm">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold">Security data unavailable.</p>
        {error ? (
          <p className="mt-1 break-words opacity-90">{error}</p>
        ) : (
          <p className="mt-1 opacity-90">
            The Blacklink backend didn't respond. Re-check your connection and credentials — the
            Security Center never shows fabricated data.
          </p>
        )}
      </div>
    </div>
  );
}

export function SecLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 p-12 text-sm text-slate-600 dark:text-slate-400">
      <Loader2 className="w-5 h-5 animate-spin text-cyan-600 dark:text-cyan-400" />
      <span>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------- panels */

export function SecPanel({
  title,
  actions,
  children,
  tone,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  tone?: "danger";
}) {
  return (
    <Card
      className={`border-slate-200/80 bg-white/90 dark:border-white/10 dark:bg-white/[0.02] backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden ${
        tone === "danger" ? "border-red-500/30 dark:border-red-500/30" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export function SecStat({
  value,
  label,
  tone = "neutral",
}: {
  value: ReactNode;
  label: string;
  tone?: "neutral" | "ok" | "warn" | "danger";
}) {
  const toneClass =
    tone === "ok"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "warn"
      ? "text-amber-600 dark:text-amber-400"
      : tone === "danger"
      ? "text-red-600 dark:text-red-400"
      : "text-slate-900 dark:text-white";
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/[0.02] backdrop-blur-xl p-4 shadow-sm transition-all hover:shadow-md">
      <div className={`text-2xl font-bold tracking-tight tabular-nums ${toneClass}`}>{value}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------- badges */

const badgeMap: Record<string, string> = {
  ok: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  pass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  warn: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  warning: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  critical: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
  fail: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
  info: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  false: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
  off: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
};

export function SecBadge({ status, children }: { status: string; children?: ReactNode }) {
  const key = status.toLowerCase();
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize shadow-2xs ${
        badgeMap[key] ?? "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30"
      }`}
    >
      {children ?? key}
    </span>
  );
}

/* ------------------------------------------------------------- formatters */

export function fmtBytes(n?: number | null): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function fmtTs(ts?: number | string | null): string {
  if (ts === null || ts === undefined || ts === "") return "—";
  const n = typeof ts === "string" ? Number(ts) : ts;
  if (!Number.isFinite(n) || n === 0) return "—";
  const d = new Date(n * 1000);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeAgo(ts?: number | string | null): string {
  if (ts === null || ts === undefined || ts === "") return "—";
  const n = typeof ts === "string" ? Number(ts) : ts;
  if (!Number.isFinite(n) || n === 0) return "—";
  const s = Math.max(0, Math.floor(Date.now() / 1000 - n));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function EmptyRows({ text }: { text: string }) {
  return (
    <div className="px-5 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>{text}</p>
    </div>
  );
}

/* ------------------------------------------------------- search filter */

/** Reusable toolbar for filtering tabular/listed data. Supply `value`/`onChange`.
 *  Binds ⌘K to focus; `autoFocus` focuses on mount. */
export function SecSearchBar({
  id,
  value,
  onChange,
  placeholder = "Search… (⌘K)",
  autoFocus = false,
  onClear,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onClear?: () => void;
}) {
  useEffect(() => {
    if (autoFocus) document.getElementById(id)?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  useEffect(() => {
    if (!id) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById(id)?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [id]);

  return (
    <div className="flex flex-wrap items-center gap-2 px-5 pt-4 pb-2 border-b border-slate-200/50 dark:border-white/5">
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          id={id}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-9 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white text-xs"
        />
      </div>
      {value && (
        <button
          onClick={() => {
            onChange("");
            onClear?.();
          }}
          className="inline-flex items-center gap-1 px-2.5 h-8 rounded-md border border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-3 h-3" /> Clear
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------- live refresh helpers */

/**
 * Poll `refetch` every `intervalMs` while enabled. Returns the toggle state and
 * a convenience `toggle()` so pages can share one pattern for auto-refresh.
 */
export function useAutoRefresh(refetch: () => void, intervalMs = 15000) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(refetch, intervalMs);
    return () => clearInterval(id);
  }, [enabled, refetch, intervalMs]);

  return {
    enabled,
    setEnabled,
    toggle: () => setEnabled((v) => !v),
  };
}

/**
 * Register an `R`-key shortcut that triggers `refetch` when not typing in an
 * input/textarea. Mirrors the per-page behavior on the events screen.
 */
export function useRefreshShortcut(refetch: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "r" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      refetch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [refetch]);
}

/**
 * Small "Live / Offline" status pill. `mode` comes straight from the transport
 * (secGet/secPost), so it never fabricates connectivity.
 */
export function SecLiveStatus({ mode }: { mode: string }) {
  const live = mode === "live";
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
      <span className={`w-2 h-2 rounded-full ${live ? "bg-emerald-500" : "bg-amber-500"}`} />
      {live ? "Live" : "Offline"}
    </span>
  );
}

/**
 * Auto-refresh toggle button. Renders as a pill that spins the icon while on.
 */
export function SecAutoRefresh({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={enabled}
      className={`inline-flex items-center gap-2 h-9 px-3 rounded-lg border text-xs transition-colors ${
        enabled
          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
          : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
      }`}
    >
      <RefreshCw className={`w-3.5 h-3.5 ${enabled ? "animate-spin" : ""}`} />
      {enabled ? "Auto (15s)" : "Auto"}
    </button>
  );
}