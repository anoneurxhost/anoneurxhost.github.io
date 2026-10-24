import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import { guideSections } from "./data";

const LabGuide = () => (
  <LabShell>
    <SEO
      title="Research Guide"
      description="A complete research guide for university students: how to select a problem, do a literature review, find research gaps, design experiments, evaluate, write papers, and publish."
      path="/lab/guide"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Guide"
          title="Research guide"
          lead="How the lab expects a study to be run, from choosing a problem to submitting the paper."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-detail__grid">
          <div>
            {guideSections.map((section, index) => (
              <section className="lab-detail__block" aria-labelledby={`guide-${index}`} key={section.title}>
                <h2 id={`guide-${index}`}>{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>

          <aside className="lab-detail__panel" aria-label="Research guide contents">
            <p className="lab-eyebrow">Contents</p>
            <ol className="lab-guide-toc">
              {guideSections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#guide-${index}`}>
                    <span className="lab-mono lab-muted">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="lab-guide-toc__cta">
              <Link className="lab-link-arrow" to="/lab/problems">
                Browse problems
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabGuide;
