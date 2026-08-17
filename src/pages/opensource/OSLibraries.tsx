import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { libraries, type Library } from "./data";
import { GitBranch, Library as LibraryIcon } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const parseDownloads = (s: string) => {
  const n = parseFloat(s);
  if (s.includes("M")) return n * 1_000_000;
  if (s.includes("K")) return n * 1_000;
  return n;
};

const sorts = [
  { value: "downloads", label: "Most downloads", compare: (a: Library, b: Library) => parseDownloads(b.downloads) - parseDownloads(a.downloads) },
  { value: "alpha", label: "Alphabetical", compare: (a: Library, b: Library) => a.name.localeCompare(b.name) },
];

const OSLibraries = () => {
  const languages = Array.from(new Set(libraries.map((l) => l.language)));
  const { query, setQuery, sort, setSort, filterValues, setFilter, filtered } = useOSCollection<Library>({
    items: libraries,
    searchKeys: ["name", "description", "language"],
    sorts,
    filters: [{ key: "language", label: "Language", values: languages }],
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Libraries"
        subtitle="Reusable libraries and crates powering the Anoneurx ecosystem."
        icon={GitBranch}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search libraries"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        filters={[{ key: "language", label: "Language", values: languages }]}
        filterValues={filterValues}
        onFilterChange={setFilter}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((l, i) => (
          <ShowcaseCard
            key={l.id}
            index={i}
            title={l.name}
            description={l.description}
            icon={LibraryIcon}
            category={l.language}
            status={`${l.downloads} DL`}
            tags={[l.language]}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSLibraries;
