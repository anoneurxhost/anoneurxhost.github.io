import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import LabStatus from "@/components/lab/LabStatus";
import { problems, researchPapers } from "./data";
import { statusLabel } from "./homeData";

import { canonicalUrl } from "@/lib/site";

const LabProblemDetail = () => {
  const { id } = useParams();
  const problem = problems.find((entry) => entry.id === id || entry.slug === id);
  const [activeSection, setActiveSection] = useState("problem-statement");

  const sections = useMemo(() => {
    if (!problem) return [];
    return [
      ...(problem.problemStatement ? [{ id: "problem-statement", label: "Problem statement" }] : []),
      { id: "problem-why", label: "Why it matters" },
      ...(problem.researchGap ? [{ id: "problem-gap", label: "Research gap" }] : []),
      { id: "problem-questions", label: "Research questions" },
      ...(problem.researchObjectives?.length ? [{ id: "problem-objectives", label: "Research objectives" }] : []),
      ...(problem.technicalChallenges?.length ? [{ id: "problem-challenges", label: "Technical challenges" }] : []),
      ...(problem.expectedOutcome ? [{ id: "problem-outcome", label: "Expected outcome" }] : []),
      ...(problem.tags?.length ? [{ id: "problem-tags", label: "Tags" }] : []),
      ...(problem.technologies?.length ? [{ id: "problem-tech", label: "Suggested technologies" }] : []),
      ...(problem.skills?.length ? [{ id: "problem-skills", label: "Required skills" }] : []),
      ...((problem.teamSize || problem.supervisor || problem.suitableFor?.length || problem.repo)
        ? [{ id: "problem-team", label: "Team and supervisor" }]
        : []),
      ...(problem.deliverables?.length ? [{ id: "problem-deliverables", label: "Expected deliverables" }] : []),
      ...(problem.resources?.length ? [{ id: "problem-resources", label: "Resources and references" }] : []),
      ...(problem.relatedResearch?.length ? [{ id: "problem-related", label: "Related research" }] : []),
    ];
  }, [problem]);

  useEffect(() => {
    if (!problem || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 },
    );
    sections.forEach(({ id: sectionId }) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [problem, sections]);

  if (!problem) {
    return <Navigate to="/lab/problems" replace />;
  }

  const isBlackWall = problem.collection === "black-wall";
  const displayId = problem.code ?? problem.id;
  const collectionPath = "/lab/problems";
  const collectionLabel = isBlackWall ? "Black Wall research" : "All problems";

  const output = researchPapers.find((paper) => paper.problemId === problem.id);

  const related = (problem.relatedResearch ?? [])
    .map((relatedId) => problems.find((entry) => entry.id === relatedId || entry.slug === relatedId))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: problem.title,
    description: problem.description,
    url: canonicalUrl(`/lab/problems/${problem.slug ?? problem.id}`),
    keywords: [...(problem.tags ?? []), ...problem.areas].join(", "),
    parentOrganization: { "@type": "Organization", name: "Anoneurx Lab", url: canonicalUrl("/lab") },
  };

  return (
    <LabShell>
      <SEO
        title={problem.title}
        description={`${problem.description} ${isBlackWall ? "A Black Wall OS open research problem" : "An open research problem"} at Anoneurx Lab. Category: ${
          problem.category ?? problem.areas.join(", ")
        }. Difficulty: ${problem.difficulty}. Status: ${statusLabel(problem.status)}.`}
        path={`/lab/problems/${problem.slug ?? problem.id}`}
        type="article"
        jsonLd={jsonLd}
      />

      <article className="lab-section lab-page lab-detail lab-problem-detail">
        <div className="lab-container">
          <nav className="lab-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/lab">Research lab</Link></li>
              <li>
                <Link to={collectionPath}>{isBlackWall ? "Black Wall" : "Research problems"}</Link>
              </li>
              <li aria-current="page">{problem.title}</li>
            </ol>
          </nav>

          <Link className="lab-back" to={collectionPath}>
            <ArrowLeft className="lab-btn__icon" aria-hidden="true" />
            {collectionLabel}
          </Link>

          <header className="lab-detail__header">
            <p className="lab-eyebrow">{problem.category ?? (isBlackWall ? "Black Wall OS" : problem.areas[0])}</p>
            <h1>{problem.title}</h1>
            <p className="lab-mono lab-muted lab-detail__id">
              {isBlackWall ? "Research ID" : "Code"}: {displayId}
            </p>
            <p className="lab-lead">{problem.description}</p>
            <div className="lab-problem__meta lab-detail__tags">
              <LabStatus status={problem.status} />
              <span className="lab-tag">{problem.difficulty}</span>
              {(problem.updatedAt || problem.publishedAt) && (
                <span className="lab-tag">Updated {problem.updatedAt ?? problem.publishedAt}</span>
              )}
              {(problem.tags ?? problem.areas).map((area) => (
                <span className="lab-tag" key={area}>
                  {area}
                </span>
              ))}
            </div>
          </header>

          {problem.statusNote && (
            <aside className="lab-callout" aria-label="Current evidence for this status">
              <p className="lab-callout__title">Current status evidence</p>
              <p>{problem.statusNote}</p>
            </aside>
          )}

          <div className="lab-detail__grid">
            <div className="lab-detail__body">
              {problem.problemStatement && (
                <section className="lab-detail__block" aria-labelledby="problem-statement">
                  <h2 id="problem-statement">Problem statement</h2>
                  <p>{problem.problemStatement}</p>
                </section>
              )}

              <section className="lab-detail__block" aria-labelledby="problem-why">
                <h2 id="problem-why">Why it matters</h2>
                <p>{problem.whyItMatters}</p>
              </section>

              {problem.researchGap && (
                <section className="lab-detail__block" aria-labelledby="problem-gap">
                  <h2 id="problem-gap">Research gap</h2>
                  <p>{problem.researchGap}</p>
                </section>
              )}

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

              {problem.researchObjectives && problem.researchObjectives.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-objectives">
                  <h2 id="problem-objectives">Research objectives</h2>
                  <ul className="lab-detail__list">
                    {problem.researchObjectives.map((objective) => (
                      <li key={objective}>{objective}</li>
                    ))}
                  </ul>
                </section>
              )}

              {problem.technicalChallenges && problem.technicalChallenges.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-challenges">
                  <h2 id="problem-challenges">Technical challenges</h2>
                  <ul className="lab-detail__list">
                    {problem.technicalChallenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </section>
              )}

              {problem.expectedOutcome && (
                <section className="lab-detail__block" aria-labelledby="problem-outcome">
                  <h2 id="problem-outcome">Expected outcome</h2>
                  <p>{problem.expectedOutcome}</p>
                </section>
              )}

              {problem.tags && problem.tags.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-tags">
                  <h2 id="problem-tags">Tags</h2>
                  <p className="lab-mono-tags">
                    {problem.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                </section>
              )}

              {problem.technologies && problem.technologies.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-tech">
                  <h2 id="problem-tech">Suggested technologies</h2>
                  <p className="lab-mono-tags">
                    {problem.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </p>
                </section>
              )}

              {problem.skills && problem.skills.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-skills">
                  <h2 id="problem-skills">Required skills</h2>
                  <p className="lab-mono-tags">
                    {problem.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </p>
                </section>
              )}

              {(problem.teamSize ||
                problem.supervisor ||
                (problem.suitableFor && problem.suitableFor.length > 0) ||
                problem.repo) && (
                <section className="lab-detail__block" aria-labelledby="problem-team">
                  <h2 id="problem-team">Team and supervisor</h2>
                  {(problem.teamSize || problem.supervisor) && (
                    <p>
                      {problem.teamSize ? `${problem.teamSize} researchers` : "Research team"}
                      {problem.supervisor ? `, supervised by ${problem.supervisor}.` : "."}
                    </p>
                  )}
                  {problem.suitableFor && problem.suitableFor.length > 0 && (
                    <p className="lab-muted">Suitable for: {problem.suitableFor.join(", ")}.</p>
                  )}
                  {problem.repo && (
                    <p>
                      <a href={problem.repo} target="_blank" rel="noopener noreferrer">
                        {problem.repoLabel ?? problem.repo}
                      </a>
                    </p>
                  )}
                </section>
              )}

              {problem.deliverables && problem.deliverables.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-deliverables">
                  <h2 id="problem-deliverables">Expected deliverables</h2>
                  <ul className="lab-detail__list">
                    {problem.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </section>
              )}

              {related.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-related">
                  <h2 id="problem-related">Related research</h2>
                  <ul className="lab-related-grid">
                    {related.map((entry) => (
                      <li key={entry.id}>
                        <Link to={`/lab/problems/${entry.slug ?? entry.id}`}>{entry.title}</Link>
                        <p>{entry.description}</p>
                        <span className="lab-mono lab-muted">{statusLabel(entry.status)} · {entry.areas[0]}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {problem.resources && problem.resources.length > 0 && (
                <section className="lab-detail__block" aria-labelledby="problem-resources">
                  <h2 id="problem-resources">Resources</h2>
                  <ul className="lab-detail__list">
                    {problem.resources.map((resource) => (
                      <li key={resource.href}>
                        {resource.href.startsWith("/") ? (
                          <Link to={resource.href}>{resource.label}</Link>
                        ) : (
                          <a
                            href={resource.href}
                            target={resource.external ? "_blank" : undefined}
                            rel={resource.external ? "noopener noreferrer" : undefined}
                          >
                            {resource.label}
                          </a>
                        )}
                        {resource.description && (
                          <span className="lab-muted"> — {resource.description}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

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

            <aside className="lab-detail__sidebar" aria-label="Problem details">
              <section className="lab-sidebar-card">
                <h2 className="border-b border-[var(--border)] px-3 py-2 text-[0.68rem] font-semibold leading-tight">
                  Problem details
                </h2>
                <dl className="lab-sidebar-card__details">
                  <div>
                    <dt>{isBlackWall ? "Research ID" : "Code"}</dt>
                    <dd className="lab-mono">{displayId}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{statusLabel(problem.status)}</dd>
                  </div>
                  <div>
                    <dt>Difficulty</dt>
                    <dd>{problem.difficulty}</dd>
                  </div>
                  {problem.category && (
                    <div>
                      <dt>Category</dt>
                      <dd>{problem.category}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Areas</dt>
                    <dd>{problem.areas.join(", ")}</dd>
                  </div>
                  {problem.updatedAt && (
                    <div>
                      <dt>Updated</dt>
                      <dd>{problem.updatedAt}</dd>
                    </div>
                  )}
                </dl>
              </section>

              <nav className="lab-detail__toc" aria-label="On this page">
                <p className="lab-detail__toc-title">On this page</p>
                <ol>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a className={activeSection === section.id ? "is-active" : ""} href={`#${section.id}`}>
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
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
