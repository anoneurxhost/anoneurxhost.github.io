import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { extensions, type Extension } from "./data";
import { Puzzle } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const parseInstalls = (s: string) => {
  const n = parseFloat(s);
  if (s.includes("M")) return n * 1_000_000;
  if (s.includes("K")) return n * 1_000;
  return n;
};

const sorts = [
  { value: "installs", label: "Most installs", compare: (a: Extension, b: Extension) => parseInstalls(b.installs) - parseInstalls(a.installs) },
  { value: "alpha", label: "Alphabetical", compare: (a: Extension, b: Extension) => a.name.localeCompare(b.name) },
];

const OSVSCodeExtensions = () => {
  const { query, setQuery, sort, setSort, filtered } = useOSCollection<Extension>({
    items: extensions,
    searchKeys: ["name", "description"],
    sorts,
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="VS Code Extensions"
        subtitle="Editor extensions that boost productivity across the Anoneurx stack."
        icon={Puzzle}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search extensions"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((e, i) => (
          <ShowcaseCard
            key={e.id}
            index={i}
            title={e.name}
            description={e.description}
            icon={Puzzle}
            status={`${e.installs} installs`}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSVSCodeExtensions;
