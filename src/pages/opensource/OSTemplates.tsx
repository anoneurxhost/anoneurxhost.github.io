import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import ShowcaseCard from "@/components/cards/ShowcaseCard";
import { templates, type Template } from "./data";
import { Layers, LayoutTemplate } from "lucide-react";
import { useOSCollection } from "./useOSCollection";

const sorts = [
  { value: "alpha", label: "Alphabetical", compare: (a: Template, b: Template) => a.name.localeCompare(b.name) },
];

const OSTemplates = () => {
  const stacks = Array.from(new Set(templates.map((t) => t.stack)));
  const { query, setQuery, sort, setSort, filterValues, setFilter, filtered } = useOSCollection<Template>({
    items: templates,
    searchKeys: ["name", "description", "stack"],
    sorts,
    filters: [{ key: "stack", label: "Stack", values: stacks }],
  });

  return (
    <OSPage>
      <OSSectionHeader
        title="Templates"
        subtitle="Production-ready starter templates for every stack."
        icon={Layers}
        search={query}
        onSearchChange={setQuery}
        placeholder="Search templates"
        sorts={sorts}
        sortValue={sort}
        onSortChange={setSort}
        filters={[{ key: "stack", label: "Stack", values: stacks }]}
        filterValues={filterValues}
        onFilterChange={setFilter}
        resultsCount={filtered.length}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((t, i) => (
          <ShowcaseCard
            key={t.id}
            index={i}
            title={t.name}
            description={t.description}
            icon={LayoutTemplate}
            category={t.stack}
            tags={[t.stack]}
          />
        ))}
      </div>
    </OSPage>
  );
};

export default OSTemplates;
