import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { researchers } from "./data";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const LabPeople = () => (
  <LabShell>
    <SEO
      title="People"
      description="Researchers, student researchers and contributors at Anoneurx Lab — the people behind the lab's open problems, projects and publications."
      path="/lab/people"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="People"
          title="People"
          lead="The lab is small on purpose: each problem has a named lead and a scoped team, so credit and responsibility are both explicit."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-grid-3">
          {researchers.map((person, index) => (
            <Reveal key={person.id} delay={index * 50}>
              <article className="lab-card lab-person" style={{ height: "100%" }}>
                <div className="lab-person__head">
                  <span className="lab-person__avatar" aria-hidden="true">
                    {initials(person.name)}
                  </span>
                  <div>
                    <h2 className="lab-person__name">{person.name}</h2>
                    <p className="lab-person__role">{person.role}</p>
                  </div>
                </div>
                <p className="lab-person__bio">{person.bio}</p>
                <div className="lab-mono-tags">
                  {person.areas.map((area) => (
                    <span key={area}>{area}</span>
                  ))}
                </div>
                <p className="lab-mono lab-muted" style={{ fontSize: "0.75rem" }}>
                  {person.contributions} contribution{person.contributions === 1 ? "" : "s"}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="lab-detail__cta">
          <h2>Work with the lab</h2>
          <p>Placements are scoped to a single problem with a named supervisor and a deliverable.</p>
          <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
            <Link className="lab-btn lab-btn--primary" to="/lab/apply">
              Apply to the lab
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
            <Link className="lab-btn lab-btn--ghost" to="/lab/problems">
              Browse problems
            </Link>
          </div>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabPeople;
