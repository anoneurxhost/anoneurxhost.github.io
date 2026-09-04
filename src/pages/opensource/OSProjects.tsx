import { Link } from "react-router-dom";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import { projects, type Project } from "./data";
import { FolderGit2 } from "lucide-react";
import { useOSCollection } from "./useOSCollection";
import { motion } from "framer-motion";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 12) * 0.04 }}
            className="flex w-full max-w-[350px]"
          >
            <Link
              to={`/opensource/${p.id}`}
              className="flex w-full"
            >
              <article className="flex h-full w-full max-w-[350px] flex-col overflow-hidden rounded-xl border border-white/10 bg-black/10 shadow-lg backdrop-blur-lg">
                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-white/[0.04]">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain p-8" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white/80">
                      {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex min-h-[225px] flex-col p-4">
                  <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white">
                    {p.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
                    {p.description}
                  </p>
                </div>
              </article>
            </Link>

          </motion.div>
        ))}
      </div>
    </OSPage>
  );
};

export default OSProjects;
