import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { labPolicies } from "./policies";

const CONTACT_ROUTES = [
  {
    title: "Privacy requests",
    detail:
      "Access, correction or deletion of personal information, and questions about how the lab handles data.",
    link: "/lab/privacy",
    cta: "Read the Privacy Policy",
  },
  {
    title: "Security reports",
    detail:
      "Vulnerabilities in lab systems, handled under coordinated disclosure with a safe-harbour commitment.",
    link: "/lab/security",
    cta: "Read the Security Policy",
  },
  {
    title: "Research integrity",
    detail:
      "Concerns about data, authorship, conflicts of interest or the safe release of a result.",
    link: "/lab/ethics",
    cta: "Read the Ethics Policy",
  },
];

const LabPolicies = () => (
  <LabShell>
    <SEO
      title="Policies & Legal"
      description="The governance framework for Anoneurx Lab: privacy, cookies, terms of use, accessibility, research ethics and security disclosure."
      path="/lab/policies"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Governance"
          title="Policies & legal"
          lead="The rules that govern how the lab handles personal information, research, software and the people who take part in it. Every policy is public and versioned."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-policies-grid">
          {labPolicies.map((policy, index) => (
            <Reveal key={policy.slug} delay={index * 50}>
              <article className="lab-card lab-policy-card" style={{ height: "100%" }}>
                <div className="lab-policy-card__head">
                  <FileText className="lab-area-card__icon" aria-hidden="true" />
                  <span className="lab-mono lab-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="lab-policy-card__title">
                  <Link to={`/lab/${policy.slug}`}>{policy.title}</Link>
                </h2>
                <p className="lab-policy-card__desc">{policy.summary}</p>
                <p className="lab-mono lab-muted lab-policy-card__updated">
                  Last updated {policy.updated}
                </p>
                <Link className="lab-link-arrow" to={`/lab/${policy.slug}`}>
                  Read policy
                  <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="lab-section lab-policy__contact" aria-labelledby="policy-contact">
          <div className="lab-section-head">
            <p className="lab-eyebrow">Contact</p>
            <h2 className="lab-section-head__title" id="policy-contact">
              Who to contact
            </h2>
            <p className="lab-lead">
              Each policy names the route for a concern. Use the one that matches your case so it
              reaches the right team.
            </p>
          </div>

          <div className="lab-grid-3">
            {CONTACT_ROUTES.map((route, index) => (
              <Reveal key={route.title} delay={index * 60}>
                <article className="lab-card lab-feature-card" style={{ height: "100%" }}>
                  <h3 className="lab-feature-card__title">{route.title}</h3>
                  <p className="lab-feature-card__outcome">{route.detail}</p>
                  <div className="lab-link-row">
                    <Link className="lab-link-arrow" to={route.link}>
                      {route.cta}
                      <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </section>
  </LabShell>
);

export default LabPolicies;
