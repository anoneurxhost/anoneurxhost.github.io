import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { labProjects } from "./data";

const pipeline = ["Problem", "Research", "Prototype", "Product"];

const LabProjects = () => (
  <LabShell>
    <SEO
      title="Research Projects"
      description="Anoneurx Lab research problems that evolved into real prototypes and products. From research to implementation to Anoneurx technology."
      path="/lab/projects"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Projects"
          title="Research, prototype, product"
          lead="Problems that have crossed from the problem board into running code. Each project keeps its link to the study that started it."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <ol className="lab-pipeline" aria-label="Project pipeline">
          {pipeline.map((step, index) => (
            <li className="lab-pipeline__step" key={step}>
              <span className="lab-mono">{String(index + 1).padStart(2, "0")}</span>
              {step}
              {index < pipeline.length - 1 && (
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        <div className="lab-grid-3">
          {labProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <article className="lab-card lab-feature-card" style={{ height: "100%" }}>
                <div className="lab-mono-tags">
                  <span>{project.area}</span>
                  <span>{project.status}</span>
                </div>
                <h2 className="lab-feature-card__title">
                  <Link to={`/lab/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <p className="lab-feature-card__outcome">{project.description}</p>
                <p className="lab-muted" style={{ fontSize: "0.9rem" }}>
                  {project.researchers.join(", ")}
                </p>
                <div className="lab-link-row">
                  <Link className="lab-link-arrow" to={`/lab/projects/${project.slug}`}>
                    View project
                    <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                  </Link>
                  {project.problemId && (
                    <Link className="lab-btn lab-btn--ghost lab-btn--sm" to={`/lab/problems/${project.problemId}`}>
                      Related problem
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabProjects;
