import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { packages, type Pkg } from "./data";
import { Boxes, Package } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const sorts = [
  { value: "alpha", label: "Alphabetical", compare: (a: Pkg, b: Pkg) => a.name.localeCompare(b.name) },
  { value: "version", label: "Latest version", compare: (a: Pkg, b: Pkg) => b.version.localeCompare(a.version) },
];

const OSPackages = () => {
  const registries = Array.from(new Set(packages.map((p) => p.registry)));
  const { query, setQuery, sort, setSort, filterValues, setFilter, filtered } = useOSCollection<Pkg>({
    items: packages,
    searchKeys: ["name", "description", "registry"],
    sorts,
    filters: [{ key: "registry", label: "Registry", values: registries }],
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Packages"
        subtitle="Published packages across npm, cargo, pip, and Go module registries."
        icon={Boxes}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search packages"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        filters={[{ key: "registry", label: "Registry", values: registries }]}
        filterValues={filterValues}
        onFilterChange={setFilter}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <ShowcaseCard
            key={p.id}
            index={i}
            title={p.name}
            description={p.description}
            icon={Package}
            category={p.registry}
            status={`v${p.version}`}
            tags={[p.registry]}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSPackages;
