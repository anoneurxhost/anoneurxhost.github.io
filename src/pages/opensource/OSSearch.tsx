import { Link } from "react-router-dom";
import OSPage from "./OSPage";
import OSToolbar from "./OSToolbar";
import { discussions, events, projects, releases } from "./data";
import { useOSSearch } from "./useOSSearch";

interface OSSearchItem {
  id: string;
  name: string;
  title?: string;
  description: string;
  type: string;
  category: string;
  language: string;
  project?: string;
}

const OSSearch = () => {
  const allItems: OSSearchItem[] = [
    ...projects.map((project) => ({ ...project, type: "Project", category: project.language })),
    ...releases.map((release) => ({ id: release.id, name: release.project, title: release.version, description: release.notes, type: "Release", category: release.project, language: "Release", project: release.project })),
    ...discussions.map((discussion) => ({ id: discussion.id, name: discussion.title, title: discussion.category, description: discussion.author, type: "Discussion", category: discussion.category, language: "Discussion" })),
    ...events.map((event) => ({ id: event.id, name: event.name, title: event.type, description: event.location, type: "Event", category: event.type, language: event.type })),
  ];

  const { query, setQuery, sort, setSort, filtered, facets, toggleFacet, facetOptions } = useOSSearch(allItems);


  return (
    <OSPage>
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300">Open Source Search</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Find projects, repos, releases and events</h1>
      </div>

      <OSToolbar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        sortOptions={[
          { value: "relevance", label: "Relevance" },
          { value: "alphabetical", label: "Alphabetical" },
        ]}
        facets={facetOptions}
        selectedFacets={facets}
        onFacetToggle={toggleFacet}
        placeholder="Search Anoneurx open source"
      />

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.type}</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{item.name ?? item.title}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-slate-950/20 px-2 py-1 text-xs text-slate-300">{item.category ?? item.language}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            {item.project && item.project !== item.category && (
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">Project: {item.project}</p>
            )}
            {item.type === "Project" && (
              <Link to={`/opensource/projects/${item.id}`} className="mt-4 inline-block text-blue-300 hover:text-blue-200">Open project →</Link>
            )}
          </div>
        ))}
      </div>
    </OSPage>
  );
};

export default OSSearch;
