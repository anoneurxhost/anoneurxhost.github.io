import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import SEO from "@/components/SEO";
import { problems, researchAreas } from "./data";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
const statuses = ["All", "Open", "In Progress", "Solved"];

const LabProblems = () => {
  const [query, setQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.code.toLowerCase().includes(query.toLowerCase());
      const matchesArea = selectedArea === "All" || p.areas.includes(selectedArea);
      const matchesDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
      return matchesQuery && matchesArea && matchesDifficulty && matchesStatus;
    });
  }, [query, selectedArea, selectedDifficulty, selectedStatus]);

  const areaNames = ["All", ...researchAreas.map((a) => a.name)];

  return (
    <div className="min-h-screen px-4 py-14 md:py-20">
      <SEO
        title="Open Problems"
        description="Browse open research problems at Anoneurx Lab across AI, cybersecurity, robotics, and systems. Find a real research problem that matches your skills and work on it."
        path="/lab/problems"
        keywords="research problems, open problems, research problems for students, ai research problems, cybersecurity research topics, ml research, computer science projects, student research opportunities, research board"
      />
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Problem Board</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Open Problems</h1>
          <p className="mt-2 text-gray-500 text-sm max-w-2xl">
            Browse research problems across AI, cybersecurity, robotics, and systems. Find one that matches your skills.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-white/5 bg-black/10 backdrop-blur-xl p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search problems..."
                className="w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-emerald-500/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gray-500 font-bold">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">Area:</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
              >
                {areaNames.map((a) => (
                  <option key={a} value={a} className="bg-gray-900">{a}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedDifficulty === d
                      ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300"
                      : "border-white/10 bg-black/10 backdrop-blur-xl text-gray-400 hover:border-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-1.5">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedStatus === s
                      ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300"
                      : "border-white/10 bg-black/10 backdrop-blur-xl text-gray-400 hover:border-white/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-xs text-gray-500">
          {filtered.length} problem{filtered.length !== 1 ? "s" : ""} found
        </div>

        <div className="grid gap-4">
          {filtered.map((problem, i) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Link
                to={`/lab/problems/${problem.id}`}
                className="block p-6 rounded-xl bg-black/10 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-emerald-400/80">{problem.code}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        problem.difficulty === "Beginner" ? "bg-green-500/10 text-green-400" :
                        problem.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-400" :
                        problem.difficulty === "Advanced" ? "bg-orange-500/10 text-orange-400" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {problem.difficulty}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        problem.status === "Open" ? "bg-emerald-500/10 text-emerald-400" :
                        problem.status === "In Progress" ? "bg-blue-500/10 text-blue-400" :
                        "bg-gray-500/10 text-gray-400"
                      }`}>
                        {problem.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-1 group-hover:text-emerald-400 transition-colors">{problem.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{problem.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:flex-col md:items-end">
                    {problem.areas.map((area) => (
                      <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{area}</span>
                    ))}
                    <span className="text-[10px] text-gray-600 mt-1">Team: {problem.teamSize}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No problems match your filters.</p>
            <button
              onClick={() => { setQuery(""); setSelectedArea("All"); setSelectedDifficulty("All"); setSelectedStatus("All"); }}
              className="mt-3 text-emerald-400 text-xs hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabProblems;
