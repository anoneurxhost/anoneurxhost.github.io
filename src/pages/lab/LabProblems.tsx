import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import LabDifficulty from "@/components/lab/LabDifficulty";
import LabStatus from "@/components/lab/LabStatus";
import { problems } from "./data";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
/** Statuses are derived from the data so collection statuses stay filterable. */
const statuses = ["All", ...Array.from(new Set(problems.map((problem) => problem.status)))];
/** The board filters on the areas problems are actually tagged with. */
const areas = ["All", ...Array.from(new Set(problems.flatMap((problem) => problem.areas))).sort()];
const areaBadgeStyles: Record<string, string> = {
  AI: "!bg-[#f3e8fd] !text-[#8430ce]",
  "AI & Machine Learning": "!bg-[#f3e8fd] !text-[#8430ce]",
  Cybersecurity: "!bg-[#fce8e6] !text-[#d93025]",
  Robotics: "!bg-[#e4f7fb] !text-[#087f8c]",
  Systems: "!bg-[#e6f4ea] !text-[#188038]",
  "Systems & OS": "!bg-[#e6f4ea] !text-[#188038]",
  "Autonomous Systems": "!bg-[#fef7e0] !text-[#b06000]",
  "Data Science": "!bg-[#e8f0fe] !text-[#174ea6]",
};

const LabProblems = () => {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return problems.filter((problem) => {
      if (area !== "All" && !problem.areas.includes(area)) return false;
      if (difficulty !== "All" && problem.difficulty !== difficulty) return false;
      if (status !== "All" && problem.status !== status) return false;
      if (!term) return true;
      return (
        problem.title.toLowerCase().includes(term) ||
        problem.id.toLowerCase().includes(term) ||
        (problem.code ?? "").toLowerCase().includes(term) ||
        (problem.category ?? "").toLowerCase().includes(term) ||
        (problem.tags ?? []).some((tag) => tag.toLowerCase().includes(term)) ||
        problem.description.toLowerCase().includes(term)
      );
    });
  }, [area, difficulty, status, query]);

  const clear = () => {
    setQuery("");
    setArea("All");
    setDifficulty("All");
    setStatus("All");
  };

  return (
    <LabShell>
      <SEO
        title="Open Problems"
        titleOverride="Anoneurx Lab | Open Research"
        description="Explore open research problems in cybersecurity, operating systems, robotics, and autonomous systems at Anoneurx Lab."
        image="/og-images/og-image.png"
        path="/lab/problems"
      />

      <section className="lab-section lab-page lab-page--compact">
        <div className="lab-container">
          <LabPageHead
            eyebrow="Problem board"
            title="Open problems"
            lead="Every problem below is a real gap in the literature with a documented scope, supervisor and deliverable. Pick one and the lab will help you run the study."
            back={{ to: "/lab", label: "Research lab" }}
          />

          <div className="lab-filters">
            <div className="lab-filter-row">
              <label className="lab-filter-label" htmlFor="board-search">
                Search
              </label>
              <input
                id="board-search"
                type="search"
                className="lab-search"
                placeholder="Title, code or summary"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            <p className="lab-count" aria-live="polite">
              {filtered.length} of {problems.length} problems
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((problem) => (

              <Link key={problem.id} to={`/lab/problems/${problem.id}`}>
                <article className="group flex min-h-[300px] min-w-0 flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-lift)] max-md:min-h-0">
                <div className="flex items-center justify-end gap-2">
                  <LabStatus status={problem.status} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="!text-lg font-semibold leading-snug">
                    {problem.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed !text-[#5f6368]">{problem.description}</p>
                </div>
                <div className="flex min-h-7 flex-wrap content-start items-center gap-1.5">
                  <LabDifficulty difficulty={problem.difficulty} />
                  {problem.areas.map((entry) => (
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.68rem] font-medium ${
                        areaBadgeStyles[entry] ?? "!bg-[#f1f3f4] !text-[#5f6368]"
                      }`}
                      key={entry}
                    >
                      {entry}
                    </span>
                  ))}
                </div>
                <p className="line-clamp-3 border-t border-[var(--border)] pt-3 text-xs leading-relaxed !text-[#3c4043]">
                  <span className="mb-1 block font-mono text-[0.62rem] uppercase tracking-wider text-[var(--muted)]">
                    {problem.researchGap ? "Research gap" : "Research area"}
                  </span>
                  {problem.researchGap ?? problem.category ?? problem.areas[0]}
                </p>
               
              </article>
              </Link>
            
            ))}

            {filtered.length === 0 && (
              <div className="lab-empty">
                <p className="lab-empty__title">No problem matches these filters</p>
                <p>Try another area, difficulty or status.</p>
                <p>
                  <button type="button" className="lab-btn lab-btn--ghost lab-btn--sm" onClick={clear}>
                    Clear filters
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </LabShell>
  );
};

export default LabProblems;
