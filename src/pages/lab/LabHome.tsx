import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Bot, Server, Shield, type LucideIcon } from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { labProjects, problems, researchAreas } from "./data";
import { areaProblemAreas, featuredAreaIds, labOpportunities, labPrinciples } from "./homeData";
import { labPolicies } from "./policies";

/** Policies surfaced on the landing page, in reading order. */
const GOVERNANCE_SLUGS = ["ethics", "security", "accessibility"];

const SITE = "https://anoneurx.com";

const AREA_ICONS: Record<string, LucideIcon> = {
  "ai-ml": Brain,
  cybersecurity: Shield,
  robotics: Bot,
  "systems-os": Server,
};

/** Hero diagram: the four research areas wired through the lab. */
const GRAPH_NODES = [
  { x: 56, y: 42, label: "AI" },
  { x: 264, y: 42, label: "SEC" },
  { x: 56, y: 168, label: "ROB" },
  { x: 264, y: 168, label: "SYS" },
  { x: 160, y: 105, label: "LAB" },
];

const GRAPH_EDGES: Array<[number, number, number, number]> = [
  [160, 105, 56, 42],
  [160, 105, 264, 42],
  [160, 105, 56, 168],
  [160, 105, 264, 168],
  [56, 42, 56, 168],
  [264, 42, 264, 168],
];

const HeroGraph = () => (
  <svg
    className="lab-graph"
    viewBox="0 0 320 210"
    role="img"
    aria-label="Diagram of the four research areas connected through the lab and its shared infrastructure."
  >
    <g stroke="var(--border)" strokeWidth="1.5" fill="none">
      {GRAPH_EDGES.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
    <g>
      {GRAPH_NODES.map((node) => {
        const isHub = node.label === "LAB";
        return (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r={isHub ? 22 : 17}
              fill={isHub ? "var(--accent-fill)" : "var(--surface)"}
              stroke={isHub ? "var(--accent-fill)" : "var(--accent-text)"}
              strokeWidth="1.6"
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fill={isHub ? "var(--on-accent)" : "var(--accent-text)"}
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + (isHub ? 44 : 38)}
              textAnchor="middle"
              fontSize="10"
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fill="var(--muted)"
            >
              {isHub ? "shared infra" : node.label}
            </text>
          </g>
        );
      })}
    </g>
  </svg>
);

const LabHome = () => {
  const featuredAreas = featuredAreaIds
    .map((id) => researchAreas.find((entry) => entry.id === id))
    .filter((entry): entry is (typeof researchAreas)[number] => Boolean(entry));

  const countForArea = (areaId: string) => {
    const covered = areaProblemAreas[areaId] ?? [];
    return problems.filter((problem) => problem.areas.some((item) => covered.includes(item))).length;
  };

  const stats = [
    { num: String(problems.filter((problem) => problem.status === "Open").length), label: "Open problems" },
    { num: String(labProjects.length), label: "Lab projects" },
  ];

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "ResearchOrganization",
        name: "Anoneurx Lab",
        url: `${SITE}/lab`,
        description:
          "Anoneurx Lab publishes open research problems in AI, cybersecurity, robotics and systems, and supervises student teams working on them.",
        parentOrganization: {
          "@type": "Organization",
          name: "Anoneurx",
          url: SITE,
        },
        knowsAbout: ["Artificial intelligence", "Cybersecurity", "Robotics", "Systems"],
      },
    ],
    [],
  );

  return (
    <LabShell>
      <SEO
        title="Research Lab"
        description="Anoneurx Lab publishes open research problems in AI, cybersecurity, robotics and systems, supervises the teams that work on them, and releases the code and data behind every result."
        path="/lab"
        jsonLd={jsonLd}
      />

      {/* Hero */}
        <section className="lab-hero" id="top">
          <div className="lab-container">
            <div className="lab-hero__grid">
              <div className="lab-hero__text">
                <h1>Research at the intersection of AI, security and autonomous systems.</h1>
                <p className="lab-lead">
                  We publish open research problems, supervise student teams working on them, and
                  release the code, data and evaluation harness behind every result.
                </p>
                <div className="lab-hero__actions">
                  <Link className="lab-btn lab-btn--primary" to="/lab/problems">
                    Explore open problems
                    <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                  </Link>
                  <Link className="lab-btn lab-btn--ghost" to="/research">
                    View publications
                  </Link>
                </div>

                <div className="lab-stats">
                  {stats.map((stat) => (
                    <div className="lab-stat" key={stat.label}>
                      <span className="lab-stat__num">{stat.num}</span>
                      <span className="lab-stat__label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lab-hero__visual">
                <div className="lab-card lab-hero__card">
                  <HeroGraph />
                  <p className="lab-figure-caption">Fig. 01 — System graph</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research areas */}
        <section className="lab-section" id="research">
          <div className="lab-container">
            <div className="lab-section-bar">
              <Reveal>
                <div className="lab-section-head">
                  <p className="lab-eyebrow">Research areas</p>
                  <h2 className="lab-section-head__title">Four areas, one shared infrastructure</h2>
                  <p className="lab-lead">
                    Problems are filed under the area they belong to, but the datasets, evaluation
                    harnesses and model checkpoints are shared across all of them.
                  </p>
                </div>
              </Reveal>
              <Link className="lab-link-arrow" to="/lab/areas">
                All research areas
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </div>

            <div className="lab-grid-4">
              {featuredAreas.map((entry, index) => {
                const Icon = AREA_ICONS[entry.id] ?? Brain;
                return (
                  <Reveal key={entry.id} delay={index * 60}>
                    <article className="lab-card lab-area-card" style={{ height: "100%" }}>
                      <Icon className="lab-area-card__icon" aria-hidden="true" />
                      <h3 className="lab-area-card__title">{entry.name}</h3>
                      <p className="lab-area-card__desc">{entry.description}</p>
                      <p className="lab-mono lab-muted" style={{ fontSize: "0.75rem" }}>
                        {countForArea(entry.id)} open problems
                      </p>
                      <Link className="lab-link-arrow" to="/lab/problems">
                        Browse problems
                        <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="lab-section" id="projects">
          <div className="lab-container">
            <div className="lab-section-bar">
              <Reveal>
                <div className="lab-section-head">
                  <p className="lab-eyebrow">Projects</p>
                  <h2 className="lab-section-head__title">Work in progress</h2>
                  <p className="lab-lead">
                    Three projects run inside the lab right now. Each one is attached to an open problem
                    and produces a result that can be re-run.
                  </p>
                </div>
              </Reveal>
              <Link className="lab-link-arrow" to="/lab/projects">
                All projects
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </div>

            <div className="lab-grid-3">
              {labProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 60}>
                  <article className="lab-card lab-feature-card" style={{ height: "100%" }}>
                    <div className="lab-mono-tags">
                      <span>{project.area}</span>
                      <span>{project.status}</span>
                    </div>
                    <h3 className="lab-feature-card__title">
                      <Link to={`/lab/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
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

        {/* Opportunities */}
        <section className="lab-section" id="opportunities">
          <div className="lab-container">
            <div className="lab-section-bar">
              <Reveal>
                <div className="lab-section-head">
                  <p className="lab-eyebrow">Opportunities</p>
                  <h2 className="lab-section-head__title">Ways to work with the lab</h2>
                  <p className="lab-lead">
                    Pick the route that matches your situation — a supervised placement, a longer
                    fellowship, or a funded collaboration on one of the problems above.
                  </p>
                </div>
              </Reveal>
              <Link className="lab-link-arrow" to="/lab/guide">
                Research guide
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </div>

            <div className="lab-grid-3">
              {labOpportunities.map((opportunity, index) => (
                <Reveal key={opportunity.id} delay={index * 60}>
                  <article className="lab-card lab-feature-card" style={{ height: "100%" }}>
                    <p className="lab-opportunity__meta">{opportunity.meta}</p>
                    <h3 className="lab-feature-card__title">{opportunity.title}</h3>
                    <p className="lab-feature-card__outcome">{opportunity.description}</p>
                    <div className="lab-link-row">
                      <Link className="lab-btn lab-btn--ghost lab-btn--sm" to={opportunity.href}>
                        {opportunity.cta}
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="lab-section" id="principles">
          <div className="lab-container">
            <div className="lab-section-bar">
              <Reveal>
                <div className="lab-section-head">
                  <p className="lab-eyebrow">Principles</p>
                  <h2 className="lab-section-head__title">How the lab works</h2>
                  <p className="lab-lead">
                    Three commitments decide what the lab takes on and how every result is handled
                    afterwards.
                  </p>
                </div>
              </Reveal>
              <Link className="lab-link-arrow" to="/lab/about">
                About the lab
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
            </div>

            <div className="lab-grid-3">
              {labPrinciples.map((principle, index) => (
                <Reveal key={principle.id} delay={index * 60}>
                  <article className="lab-principle">
                    <h3 className="lab-principle__title">{principle.title}</h3>
                    <p className="lab-muted">{principle.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {/* Governance */}
        <section className="lab-section" id="governance">
          <div className="lab-container">
            <div className="lab-section-bar">
              <Reveal>
                <div className="lab-section-head">
                  <p className="lab-eyebrow">Governance</p>
                  <h2 className="lab-section-head__title">Open research, clear rules</h2>
                  <p className="lab-lead">
                    Research is public, but it is not unaccountable. These policies set how the lab
                    handles data, safety, credit and disclosure — and every one of them is published.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lab-grid-3">
              {GOVERNANCE_SLUGS.map((slug, index) => {
                const policy = labPolicies.find((entry) => entry.slug === slug);
                if (!policy) return null;
                return (
                  <Reveal key={policy.slug} delay={index * 60}>
                    <article className="lab-card lab-policy-card" style={{ height: "100%" }}>
                      <h3 className="lab-policy-card__title">
                        <Link to={`/lab/${policy.slug}`}>{policy.shortTitle}</Link>
                      </h3>
                      <p className="lab-policy-card__desc">{policy.summary}</p>
                      <Link className="lab-link-arrow" to={`/lab/${policy.slug}`}>
                        Read policy
                        <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
    </LabShell>
  );
};

export default LabHome;
