import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import LabStatus from "@/components/lab/LabStatus";
import { problems, researchPapers } from "./data";

const SITE = "https://anoneurx.com";

const LabProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((entry) => entry.id === id);

  if (!problem) {
    return <Navigate to="/lab/problems" replace />;
  }

  const output = researchPapers.find((paper) => paper.problemId === problem.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: problem.title,
    description: problem.description,
    url: `${SITE}/lab/problems/${problem.id}`,
    keywords: problem.areas.join(", "),
    parentOrganization: { "@type": "Organization", name: "Anoneurx Lab", url: `${SITE}/lab` },
  };

  return (
    <LabShell>
      <SEO
        title={problem.title}
        description={`${problem.description} — An open research problem at Anoneurx Lab (${problem.code}). Difficulty: ${problem.difficulty}. Status: ${problem.status}.`}
        path={`/lab/problems/${problem.id}`}
        type="article"
        jsonLd={jsonLd}
      />

      <article className="lab-section lab-page lab-detail">
        <div className="lab-container">
          <Link className="lab-back" to="/lab/problems">
            <ArrowLeft className="lab-btn__icon" aria-hidden="true" />
            All problems
          </Link>

          <header>
            <p className="lab-eyebrow">
              {problem.code} · {problem.difficulty}
            </p>
            <h1>{problem.title}</h1>
            <p className="lab-lead">{problem.description}</p>
            <div className="lab-problem__meta lab-detail__tags">
              {problem.areas.map((area) => (
                <span className="lab-tag" key={area}>
                  {area}
                </span>
              ))}
              <LabStatus status={problem.status} />
            </div>
          </header>

          <div className="lab-detail__grid">
            <div className="lab-detail__body">
              <section className="lab-detail__block" aria-labelledby="problem-why">
                <h2 id="problem-why">Why it matters</h2>
                <p>{problem.whyItMatters}</p>
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-gap">
                <h2 id="problem-gap">Research gap</h2>
                <p>{problem.researchGap}</p>
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-questions">
                <h2 id="problem-questions">Research questions</h2>
                <ol className="lab-detail__list lab-detail__list--numbered">
                  {problem.researchQuestions.map((question, index) => (
                    <li key={question}>
                      <span>
                        <span className="lab-mono lab-muted">{String(index + 1).padStart(2, "0")}</span>{" "}
                        {question}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-tech">
                <h2 id="problem-tech">Suggested technologies</h2>
                <p className="lab-mono-tags">
                  {problem.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </p>
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-skills">
                <h2 id="problem-skills">Required skills</h2>
                <p className="lab-mono-tags">
                  {problem.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </p>
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-team">
                <h2 id="problem-team">Team and supervisor</h2>
                <p>
                  {problem.teamSize} researchers, supervised by {problem.supervisor}.
                </p>
                <p className="lab-muted">Suitable for: {problem.suitableFor.join(", ")}.</p>
                {problem.repo && (
                  <p>
                    <a href={problem.repo} target="_blank" rel="noopener noreferrer">
                      {problem.repoLabel ?? problem.repo}
                    </a>
                  </p>
                )}
              </section>

              <section className="lab-detail__block" aria-labelledby="problem-deliverables">
                <h2 id="problem-deliverables">Expected deliverables</h2>
                <ul className="lab-detail__list">
                  {problem.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </section>

              {output && (
                <section className="lab-detail__block" aria-labelledby="problem-output">
                  <h2 id="problem-output">Publication</h2>
                  <p>
                    <Link to="/research">{output.title}</Link>
                  </p>
                  <p className="lab-mono lab-muted">
                    {output.category} · {output.date}
                  </p>
                </section>
              )}
            </div>

            <aside className="lab-detail__panel" aria-label="Problem details">
              <dl className="lab-detail__meta">
                <div>
                  <dt>Code</dt>
                  <dd className="lab-mono">{problem.code}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{problem.status}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{problem.difficulty}</dd>
                </div>
                <div>
                  <dt>Areas</dt>
                  <dd>{problem.areas.join(", ")}</dd>
                </div>
                <div>
                  <dt>Team size</dt>
                  <dd>{problem.teamSize}</dd>
                </div>
                <div>
                  <dt>Supervisor</dt>
                  <dd>{problem.supervisor}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="lab-detail__cta">
            <h2>Work on this problem</h2>
            <p>Apply to the lab and this problem becomes your supervised research project.</p>
            <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
              <Link className="lab-btn lab-btn--primary" to="/lab/apply">
                Apply to the lab
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
              <Link className="lab-btn lab-btn--ghost" to="/lab/guide">
                Read the research guide
              </Link>
            </div>
          </div>
        </div>
      </article>
    </LabShell>
  );
};

export default LabProblemDetail;
