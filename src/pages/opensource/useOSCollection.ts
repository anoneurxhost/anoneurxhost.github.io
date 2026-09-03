import { useMemo, useState } from "react";

export type SortOption<T> = {
  value: string;
  label: string;
  compare: (a: T, b: T) => number;
};

export type FilterOption = {
  key: string;
  label: string;
  values: string[]; // "All" is implicit
};

export type UseOSCollectionOpts<T> = {
  items: T[];
  searchKeys: (keyof T | ((item: T) => string))[];
  sorts?: SortOption<T>[];
  filters?: FilterOption[];
  filterOf?: (item: T, key: string) => string | undefined;
};

/**
 * Unified search + sort + filter hook for every Open Source list page.
 * Keeps the UX identical across Projects, Libraries, Packages, Templates,
 * Extensions, Organizations, and Showcase.
 */
export function useOSCollection<T>({ items, searchKeys, sorts = [], filters = [], filterOf }: UseOSCollectionOpts<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<string>(sorts[0]?.value ?? "");
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    Object.fromEntries(filters.map((f) => [f.key, "All"]))
  );

  const setFilter = (key: string, value: string) =>
    setFilterValues((prev) => ({ ...prev, [key]: value }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = items.filter((item) => {
      if (q) {
        const hay = searchKeys
          .map((k) => (typeof k === "function" ? k(item) : String((item as any)[k] ?? "")))
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      for (const f of filters) {
        const selected = filterValues[f.key];
        if (!selected || selected === "All") continue;
        const val = filterOf ? filterOf(item, f.key) : String((item as any)[f.key] ?? "");
        if (val !== selected) return false;
      }
      return true;
    });

    const active = sorts.find((s) => s.value === sort);
    if (active) result = [...result].sort(active.compare);
    return result;
  }, [items, searchKeys, filters, filterOf, query, sort, filterValues, sorts]);

  return { query, setQuery, sort, setSort, filterValues, setFilter, filtered };
}
