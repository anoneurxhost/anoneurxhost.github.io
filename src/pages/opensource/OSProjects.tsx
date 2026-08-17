import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { projects, type Project } from "./data";
import { FolderGit2, Github } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const sorts = [
  { value: "popular", label: "Most stars", compare: (a: Project, b: Project) => b.stars - a.stars },
  { value: "alpha", label: "Alphabetical", compare: (a: Project, b: Project) => a.name.localeCompare(b.name) },
];

const OSProjects = () => {
  const languages = Array.from(new Set(projects.map((p) => p.language)));
  const { query, setQuery, sort, setSort, filterValues, setFilter, filtered } = useOSCollection<Project>({
    items: projects,
    searchKeys: ["name", "description", (p) => p.tags.join(" ")],
    sorts,
    filters: [{ key: "language", label: "Language", values: languages }],
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Projects"
        subtitle="Open source repositories built and maintained by the Anoneurx community."
        icon={FolderGit2}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search projects"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        filters={[{ key: "language", label: "Language", values: languages }]}
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
            icon={Github}
            category={p.language}
            status={`${(p.stars / 1000).toFixed(1)}k ★`}
            tags={p.tags}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSProjects;
