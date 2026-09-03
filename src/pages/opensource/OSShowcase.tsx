import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { showcase, type Showcase as ShowcaseT } from "./data";
import { Sparkles, Rocket } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const sorts = [
  { value: "alpha", label: "Alphabetical", compare: (a: ShowcaseT, b: ShowcaseT) => a.name.localeCompare(b.name) },
];

const OSShowcase = () => {
  const projectsList = Array.from(new Set(showcase.map((s) => s.project)));
  const { query, setQuery, sort, setSort, filterValues, setFilter, filtered } = useOSCollection<ShowcaseT>({
    items: showcase,
    searchKeys: ["name", "author", "description", "project"],
    sorts,
    filters: [{ key: "project", label: "Built with", values: projectsList }],
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Showcase"
        subtitle="Real products the community has built using Anoneurx open source."
        icon={Sparkles}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search showcase"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        filters={[{ key: "project", label: "Built with", values: projectsList }]}
        filterValues={filterValues}
        onFilterChange={setFilter}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <ShowcaseCard
            key={s.id}
            index={i}
            title={s.name}
            description={s.description}
            icon={Rocket}
            category={s.author}
            status={`On ${s.project}`}
            tags={[s.project]}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSShowcase;
