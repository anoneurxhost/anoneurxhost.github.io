import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";

export type SortOption = {
  label: string;
  value: string;
};

type OSToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
  facets: string[];
  selectedFacets: string[];
  onFacetToggle: (value: string) => void;
  placeholder?: string;
};

const OSToolbar = ({
  query,
  onQueryChange,
  sort,
  onSortChange,
  sortOptions,
  facets,
  selectedFacets,
  onFacetToggle,
  placeholder = "Search projects",
}: OSToolbarProps) => {
  return (
    <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            aria-label="Search open source content"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-white/10 bg-slate-950/30 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-blue-400/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400" />
          <select
            aria-label="Sort results"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-sm text-white outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {facets.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="mr-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>
          {facets.map((facet) => {
            const active = selectedFacets.includes(facet);
            return (
              <button
                key={facet}
                type="button"
                onClick={() => onFacetToggle(facet)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-blue-400/60 bg-blue-500/20 text-blue-100"
                    : "border-white/10 bg-slate-950/20 text-slate-300 hover:border-white/20"
                }`}
              >
                {facet}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OSToolbar;
