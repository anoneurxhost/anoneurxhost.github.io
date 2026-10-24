import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import LabDifficulty from "@/components/lab/LabDifficulty";
import LabStatus from "@/components/lab/LabStatus";
import { problems } from "./data";

const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
const statuses = ["All", "Open", "In Progress", "Solved"];
/** The board filters on the areas problems are actually tagged with. */
const areas = ["All", ...Array.from(new Set(problems.flatMap((problem) => problem.areas))).sort()];

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
        problem.code.toLowerCase().includes(term) ||
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
        description="Browse open research problems at Anoneurx Lab across AI, cybersecurity, robotics, and systems. Find a real research problem that matches your skills and work on it."
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

            <div className="lab-filter-row">
              <label className="lab-filter-label" htmlFor="board-area">
                Area
              </label>
              <select
                id="board-area"
                className="lab-select"
                value={area}
                onChange={(event) => setArea(event.target.value)}
              >
                {areas.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>

              <label className="lab-filter-label" htmlFor="board-status">
                Status
              </label>
              <select
                id="board-status"
                className="lab-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {statuses.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </div>

            <div className="lab-filter-row">
              <span className="lab-filter-label">Difficulty</span>
              <div className="lab-chips" role="group" aria-label="Filter problems by difficulty">
                {difficulties.map((entry) => (
                  <button
                    key={entry}
                    type="button"
                    className="lab-chip"
                    aria-pressed={difficulty === entry}
                    onClick={() => setDifficulty(entry)}
                  >
                    {entry}
                  </button>
                ))}
              </div>
            </div>

            <p className="lab-count" aria-live="polite">
              {filtered.length} of {problems.length} problems
            </p>
          </div>

          <div className="lab-problems">
            {filtered.map((problem) => (
              <article className="lab-problem" key={problem.id}>
                <div>
                  <h2 className="lab-problem__title">
                    <Link to={`/lab/problems/${problem.id}`}>{problem.title}</Link>
                  </h2>
                  <p className="lab-problem__abstract">{problem.description}</p>
                </div>
                <div className="lab-problem__meta">
                  <LabDifficulty difficulty={problem.difficulty} />
                  {problem.areas.map((entry) => (
                    <span className="lab-tag" key={entry}>
                      {entry}
                    </span>
                  ))}
                  <LabStatus status={problem.status} />
                </div>
                <p className="lab-problem__gap">
                  <span className="lab-problem__gap-label">Research gap</span>
                  {problem.researchGap}
                </p>
              </article>
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
