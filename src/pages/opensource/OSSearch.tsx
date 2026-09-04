import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
    ...projects.map((project) => ({
      ...project,
      type: "Project",
      category: project.language,
    })),
    ...releases.map((release) => ({
      id: release.id,
      name: release.project,
      title: release.version,
      description: release.notes,
      type: "Release",
      category: release.project,
      language: "Release",
      project: release.project,
    })),
    ...discussions.map((discussion) => ({
      id: discussion.id,
      name: discussion.title,
      title: discussion.category,
      description: `Author: ${discussion.author}`,
      type: "Discussion",
      category: discussion.category,
      language: "Discussion",
    })),
    ...events.map((event) => ({
      id: event.id,
      name: event.name,
      title: event.type,
      description: `Location: ${event.location} (${event.date})`,
      type: "Event",
      category: event.type,
      language: event.type,
    })),
  ];

  const { query, setQuery, sort, setSort, filtered, facets, toggleFacet, facetOptions } = useOSSearch(allItems);

  const getItemLink = (item: OSSearchItem) => {
    switch (item.type) {
      case "Project":
        return `/opensource/${item.id}`;
      case "Release":
        return "/opensource/releases";
      case "Discussion":
        return "/opensource/discussions";
      case "Event":
        return "/opensource/events";
      default:
        return "#";
    }
  };

  const getItemActionLabel = (item: OSSearchItem) => {
    switch (item.type) {
      case "Project":
        return "Open project →";
      case "Release":
        return "View release notes →";
      case "Discussion":
        return "Join discussion →";
      case "Event":
        return "View event →";
      default:
        return "Learn more →";
    }
  };

  return (
    <OSPage>
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300">Open Source Search</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Find projects, repos, releases and events</h1>
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
        placeholder="Search Anoneurx open source..."
      />

      {filtered.length === 0 ? (
        <div className="my-12 rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl">
          <Search className="mx-auto mb-3 h-10 w-10 text-slate-500" />
          <h3 className="text-lg font-semibold text-white">No results found</h3>
          <p className="mt-1 text-sm text-slate-400">
            No open source items matched your search query "{query}". Try adjusting keywords or clear filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={`${item.type}-${item.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.07]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="inline-block rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-300">
                    {item.type}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold text-white">{item.name ?? item.title}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-mono text-slate-300">
                  {item.category ?? item.language}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.description}</p>

              {item.project && item.project !== item.category && (
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Project: <span className="text-slate-200">{item.project}</span>
                </p>
              )}

              <Link to={getItemLink(item)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                {getItemActionLabel(item)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </OSPage>
  );
};

export default OSSearch;
