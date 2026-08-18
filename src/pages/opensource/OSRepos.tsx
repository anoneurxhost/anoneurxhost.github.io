import { Link } from "react-router-dom";
import { FolderGit2, Github } from "lucide-react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import { projects } from "./data";
import { useOSSearch } from "./useOSSearch";
import OSToolbar from "./OSToolbar";

const OSRepos = () => {
  const { query, setQuery, sort, setSort, facets, toggleFacet, filtered, facetOptions } = useOSSearch(
    projects.map((project) => ({
      ...project,
      type: "repository",
      category: project.language,
    }))
  );

  return (
    <OSPage>
      <OSSectionHeader
        title="Repositories"
        subtitle="Every public Anoneurx repository — stars, languages, activity and maintainers."
        icon={FolderGit2}
      />
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
        placeholder="Search repositories"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((repo) => (
          <div key={repo.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-white/5 p-2 text-blue-300">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
                <p className="text-xs text-slate-400">{repo.language}</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-300">{repo.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{repo.stars} ★</span>
              <Link to={`/opensource/repos/${repo.id}`} className="text-sm font-medium text-blue-300 hover:text-blue-200">
                View repo →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </OSPage>
  );
};

export default OSRepos;
