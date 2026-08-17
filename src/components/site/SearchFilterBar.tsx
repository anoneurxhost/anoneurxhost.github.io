import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  resultCount?: number;
  label?: string;
}

/** Live search input + pill filters shared by the faculty / intern / people lists. */
const SearchFilterBar = ({
  query,
  onQueryChange,
  placeholder = "Search by name…",
  filters,
  activeFilter,
  onFilterChange,
  resultCount,
  label = "Search",
}: SearchFilterBarProps) => (
  <div className="mb-8 space-y-4">
    <div className="relative max-w-xl">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input
        type="search"
        value={query}
        aria-label={label}
        placeholder={placeholder}
        onChange={(e) => onQueryChange(e.target.value)}
        className="pl-9 pr-9"
      />
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>

    {filters && filters.length > 1 && onFilterChange && (
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            aria-pressed={activeFilter === f}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              activeFilter === f
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 bg-muted/20 text-muted-foreground hover:border-primary/30"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    )}

    {typeof resultCount === "number" && (
      <p className="text-xs text-muted-foreground" role="status">
        {resultCount} result{resultCount === 1 ? "" : "s"}
        {query ? ` for “${query}”` : ""}
      </p>
    )}
  </div>
);

export default SearchFilterBar;
