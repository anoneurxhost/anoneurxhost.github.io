import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { organizations, type Org } from "./data";
import { Building2, Users } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const sorts = [
  { value: "members", label: "Most members", compare: (a: Org, b: Org) => b.members - a.members },
  { value: "projects", label: "Most projects", compare: (a: Org, b: Org) => b.projects - a.projects },
  { value: "alpha", label: "Alphabetical", compare: (a: Org, b: Org) => a.name.localeCompare(b.name) },
];

const OSOrganizations = () => {
  const { query, setQuery, sort, setSort, filtered } = useOSCollection<Org>({
    items: organizations,
    searchKeys: ["name", "description"],
    sorts,
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Organizations"
        subtitle="Independent groups building and maintaining Anoneurx projects."
        icon={Building2}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search organizations"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((o, i) => (
          <ShowcaseCard
            key={o.id}
            index={i}
            title={o.name}
            description={o.description}
            icon={Users}
            category="Org"
            status={`${o.members} members`}
            tags={[`${o.projects} projects`]}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSOrganizations;
