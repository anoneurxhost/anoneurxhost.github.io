import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import { labProjects, problems, researchPapers } from "./data";

import { canonicalUrl } from "@/lib/site";

const LabProjectDetail = () => {
  const { slug } = useParams();
  const project = labProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return <Navigate to="/lab/projects" replace />;
  }

  const problem = project.problemId
    ? problems.find((entry) => entry.id === project.problemId)
    : undefined;
  const output = project.problemId
    ? researchPapers.find((entry) => entry.problemId === project.problemId)
    : undefined;
  const others = labProjects.filter((entry) => entry.id !== project.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${canonicalUrl(`/lab/projects/${project.slug}`)}`,
    about: project.area,
    creator: { "@type": "Organization", name: "Anoneurx Lab", url: canonicalUrl("/lab") },
  };

  return (
    <LabShell>
      <SEO
        title={project.title}
        description={project.description}
        path={`/lab/projects/${project.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <article className="lab-section lab-detail">
        <div className="lab-container">
          <Link className="lab-back" to="/lab/projects">
            <ArrowLeft className="lab-btn__icon" aria-hidden="true" />
            All projects
          </Link>

          <header>
            <p className="lab-eyebrow">Project · {project.area}</p>
            <h1>{project.title}</h1>
            <p className="lab-lead">{project.description}</p>
            <p className="lab-mono-tags lab-detail__tags">
              <span>{project.area}</span>
              <span>{project.status}</span>
            </p>
          </header>

          <div className="lab-detail__grid">
            <div>
              <section className="lab-detail__block" aria-labelledby="project-problem">
                <h2 id="project-problem">Research problem</h2>
                {problem ? (
                  <>
                    <p>
                      <span className="lab-mono">{problem.code ?? problem.id}</span> — {problem.title}
                    </p>
                    <p className="lab-muted">{problem.description}</p>
                    <Link className="lab-link-arrow" to={`/lab/problems/${problem.id}`}>
                      Open the problem
                      <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                    </Link>
                  </>
                ) : (
                  <p className="lab-muted">This project is not linked to a problem record.</p>
                )}
              </section>

              <section className="lab-detail__block" aria-labelledby="project-output">
                <h2 id="project-output">Publication</h2>
                {output ? (
                  <>
                    <p>
                      <Link to="/research">{output.title}</Link>
                    </p>
                    <p className="lab-mono lab-muted">
                      {output.category} · {output.date}
                    </p>
                  </>
                ) : (
                  <p className="lab-muted">No publication is recorded for this project yet.</p>
                )}
              </section>

              <section className="lab-detail__block" aria-labelledby="project-team">
                <h2 id="project-team">Team</h2>
                <ul className="lab-detail__list">
                  {project.researchers.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </section>

              <section className="lab-detail__block" aria-labelledby="project-more">
                <h2 id="project-more">Other projects</h2>
                <ul className="lab-detail__list">
                  {others.map((entry) => (
                    <li key={entry.id}>
                      <Link to={`/lab/projects/${entry.slug}`}>{entry.title}</Link>
                      <span className="lab-mono lab-muted">{entry.status}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="lab-detail__panel" aria-label="Project details">
              <dl className="lab-detail__meta">
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
                <div>
                  <dt>Area</dt>
                  <dd>{project.area}</dd>
                </div>
                <div>
                  <dt>Problem</dt>
                  <dd>{problem ? (problem.code ?? problem.id) : "Not linked"}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{project.researchers.join(", ")}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </article>
    </LabShell>
  );
};

export default LabProjectDetail;
