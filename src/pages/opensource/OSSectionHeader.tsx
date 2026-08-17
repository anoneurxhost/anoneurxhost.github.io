import { Search, LucideIcon, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption, SortOption } from "./useOSCollection";

interface Props<T = unknown> {
  title: string;
  subtitle?: string;
  search?: string;
  onSearchChange?: (v: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  sorts?: SortOption<T>[];
  sortValue?: string;
  onSortChange?: (v: string) => void;
  filters?: FilterOption[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  resultsCount?: number;
  children?: ReactNode;
}

const OSSectionHeader = <T,>({
  title,
  subtitle,
  search,
  onSearchChange,
  placeholder,
  icon: Icon,
  sorts,
  sortValue,
  onSortChange,
  filters,
  filterValues,
  onFilterChange,
  resultsCount,
  children,
}: Props<T>) => {
  return (
    <header className="mb-10 space-y-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            {Icon && <Icon className="h-8 w-8 text-cyan-400" />}
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-white via-slate-200 to-cyan-200 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-slate-300/80">{subtitle}</p>
          )}
          {typeof resultsCount === "number" && (
            <p className="mt-2 text-xs text-slate-400">
              {resultsCount} {resultsCount === 1 ? "result" : "results"}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onSearchChange && (
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
              <input
                value={search ?? ""}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder ?? "Search"}
                className="h-10 w-64 rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none backdrop-blur"
              />
            </label>
          )}
          {sorts && sorts.length > 0 && onSortChange && (
            <Select value={sortValue} onValueChange={onSortChange}>
              <SelectTrigger className="h-10 w-[170px] rounded-full border-white/10 bg-white/[0.04] text-sm text-white">
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sorts.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {children}
        </div>
      </div>

      {filters && filters.length > 0 && onFilterChange && (
        <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </span>
          {filters.map((f) => (
            <div key={f.key} className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400">{f.label}:</span>
              {["All", ...f.values].map((v) => {
                const active = (filterValues?.[f.key] ?? "All") === v;
                return (
                  <button
                    key={v}
                    onClick={() => onFilterChange(f.key, v)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      active
                        ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-200"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default OSSectionHeader;
