import { useMemo, useState } from "react";

type SearchItem = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  language?: string;
  category?: string;
  project?: string;
  tags?: string[];
  type?: string;
};

export const useOSSearch = <T extends SearchItem>(items: T[]) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [facets, setFacets] = useState<string[]>([]);

  const lowercaseQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const next = items.filter((item) => {
      if (!lowercaseQuery) return true;
      const haystack = [
        item.name,
        item.title,
        item.description,
        item.language,
        item.category,
        item.project,
        item.type,
        ...(item.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(lowercaseQuery);
    });

    const withFacet = facets.length
      ? next.filter((item) => {
          const values = [item.language, item.category, item.type, item.project].filter(Boolean) as string[];
          return values.some((value) => facets.includes(value));
        })
      : next;

    return [...withFacet].sort((a, b) => {
      if (sort === "alphabetical") {
        return (a.name ?? a.title ?? "").localeCompare(b.name ?? b.title ?? "");
      }
      if (sort === "newest") {
        return (b.id ?? "").localeCompare(a.id ?? "");
      }
      const aScore = [a.name, a.title, a.description].filter(Boolean).join(" ").toLowerCase().includes(lowercaseQuery) ? 1 : 0;
      const bScore = [b.name, b.title, b.description].filter(Boolean).join(" ").toLowerCase().includes(lowercaseQuery) ? 1 : 0;
      return bScore - aScore;
    });
  }, [facets, items, lowercaseQuery, sort]);

  const facetOptions = useMemo(() => {
    const values = new Set<string>();
    items.forEach((item) => {
      [item.language, item.category, item.type, item.project].forEach((value) => value && values.add(value));
    });
    return Array.from(values).sort();
  }, [items]);

  const toggleFacet = (value: string) => {
    setFacets((prev) =>
      prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value]
    );
  };

  return {
    query,
    setQuery,
    sort,
    setSort,
    facets,
    toggleFacet,
    filtered,
    facetOptions,
  };
};
