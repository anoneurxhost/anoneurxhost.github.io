import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FileText, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { researchPapers } from "./data";

const categories = ["All", "Published", "Ongoing", "Preprint", "Experiments", "Technical Report"];

const LabResearch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return researchPapers.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Research"
        description="Published and ongoing research at Anoneurx Lab — papers, preprints, experiments, and technical reports from student researchers."
        path="/lab/research"
        keywords="anoneurx research papers, published research, research preprints, technical reports, research publications, ai research, cybersecurity papers, student research publications"
      />
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Research</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Published & Ongoing Research</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Papers, preprints, and technical reports from Anoneurx Lab researchers.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers..."
              className="w-full rounded-lg border border-white/10 bg-black/10 backdrop-blur-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === c
                    ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300"
                    : "border-white/10 bg-black/10 backdrop-blur-xl text-gray-400 hover:border-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((paper, i) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  paper.category === "Published" ? "bg-emerald-500/10 text-emerald-400" :
                  paper.category === "Ongoing" ? "bg-blue-500/10 text-blue-400" :
                  paper.category === "Preprint" ? "bg-purple-500/10 text-purple-400" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {paper.category}
                </span>
                <span className="text-[10px] text-gray-500">{paper.area}</span>
                <span className="text-[10px] text-gray-600 ml-auto">{paper.date}</span>
              </div>
              <h3 className="text-base font-bold mb-2">{paper.title}</h3>
              <p className="text-gray-400 text-xs mb-3 leading-relaxed">{paper.abstract}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <FileText className="h-3 w-3" />
                {paper.authors.join(", ")}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No papers match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabResearch;