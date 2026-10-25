import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Brain,
  ChevronRight,
  Database,
  GraduationCap,
  Server,
  Shield,
} from "lucide-react";
import SEO from "@/components/SEO";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { canonicalUrl } from "@/lib/site";
import { formatPostDate, sortedLabBlogPosts } from "./blogData";
import { labProjects, problems, researchAreas } from "./data";
import { labOpportunities } from "./homeData";
import { labPolicies } from "./policies";
import { blogTone } from "./LabBlog";

/*
 * The /lab landing page, structured after the Google Research homepage:
 * mission statement, "read the latest", research areas, featured projects,
 * programs/careers split, and the trail of quiet supporting sections.
 */

const GOVERNANCE_SLUGS = ["ethics", "security", "accessibility"];

/** Maps a lab policy slug onto its `labPolicies` entry (imported lazily). */

const AREA_ICONS: Record<string, typeof Brain> = {
  "ai-ml": Brain,
  cybersecurity: Shield,
  robotics: Bot,
  "systems-os": Server,
};

const TONE_BY_AREA: Record<string, string> = {
  "ai-ml": "blue",
  cybersecurity: "red",
  robotics: "teal",
  "systems-os": "green",
};

const LabHome = () => {
  const latestPosts = sortedLabBlogPosts.slice(0, 4);

  const stats = useMemo(
    () => [
      { num: String(problems.filter((problem) => problem.status === "Open").length), label: "Open problems" },
      { num: String(labProjects.length), label: "Lab projects" },
      { num: String(researchAreas.length), label: "Research areas" },
      { num: "100%", label: "Public by default" },
    ],
    [],
  );

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "ResearchOrganization",
        name: "Anoneurx Lab",
        url: canonicalUrl("/lab"),
        description:
          "Anoneurx Lab publishes open research problems in AI, cybersecurity, robotics and systems, and supervises student teams working on them.",
        parentOrganization: {
          "@type": "Organization",
          name: "Anoneurx",
          url: "https://anoneurx.com",
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

      {/* Mission statement hero */}
      <section className="lab-hero" id="top">
        <div className="lab-container">
          <div className="lab-hero__text">
            <p className="lab-eyebrow">Anoneurx Lab</p>
            <h1>
             Engineering the Future of Security, Systems & Robotics.
            </h1>
            <p className="lab-lead">
              Independent research into cybersecurity, operating systems, autonomous robotics, defense technologies, and advanced surveillance systems.
            </p>
            <div className="lab-hero__actions">
              <Link className="lab-btn lab-btn--primary" to="/lab/problems">
                Explore open problems
                <ArrowRight className="lab-btn__icon" aria-hidden="true" />
              </Link>
              <Link className="lab-btn lab-btn--ghost" to="/lab/blog">
                Read the blog
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
        </div>
      </section>

      {/* Read the latest */}
      <section className="lab-section" id="latest">
        <div className="lab-container">
          <div className="lab-section-bar">
            <Reveal>
              <div className="lab-section-head">
                <p className="lab-eyebrow">Lab blog</p>
                <h2 className="lab-section-head__title">Read the latest</h2>
              </div>
            </Reveal>
            <Link className="lab-link-arrow" to="/lab/blog">
              All posts
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
          </div>

          <div className="lab-blog-grid">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60}>
                <article
                  className={`lab-blog-card lab-blog-card--${blogTone(post.category)}`}
                  style={{ height: "100%" }}
                >
                  <Link to={`/lab/blog/${post.slug}`} className="lab-blog-card__media" aria-label={post.title} />
                  <div className="lab-blog-card__body">
                    <p className="lab-blog-card__category">{post.category}</p>
                    <h3 className="lab-blog-card__title">
                      <Link to={`/lab/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="lab-blog-card__excerpt">{post.excerpt}</p>
                    <div className="lab-blog-card__foot">
                      <span>
                        {formatPostDate(post.date)} · {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research areas */}
      <section className="lab-section lab-section--tint" id="research">
        <div className="lab-container">
          <div className="lab-section-bar">
            <Reveal>
              <div className="lab-section-head">
                <p className="lab-eyebrow">Research</p>
                <h2 className="lab-section-head__title">Explore our research</h2>
                <p className="lab-lead">
                  {researchAreas.length} areas share one infrastructure: the datasets, evaluation
                  harnesses and tooling are built once and reused across every problem.
                </p>
              </div>
            </Reveal>
            <Link className="lab-link-arrow" to="/lab/areas">
              All research areas
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
          </div>

          <div className="lab-grid-4">
            {researchAreas.slice(0, 8).map((area, index) => {
              const Icon = AREA_ICONS[area.id] ?? Brain;
              return (
                <Reveal key={area.id} delay={index * 50}>
                  <article className="lab-card lab-area-card" style={{ height: "100%" }}>
                    <span
                      className={`lab-mega__item-icon lab-mega__item-icon--${
                        TONE_BY_AREA[area.id] ?? "blue"
                      }`}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="lab-area-card__title">{area.name}</h3>
                    <p className="lab-area-card__desc">{area.description}</p>
                    <Link
                      className="lab-link-arrow"
                      to="/lab/problems"
                      style={{ margin: 0, marginTop: "auto" }}
                    >
                      {area.problemCount} open problem{area.problemCount === 1 ? "" : "s"}
                      <ArrowRight className="lab-btn__icon" aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="lab-section" id="projects">
        <div className="lab-container">
          <div className="lab-section-bar">
            <Reveal>
              <div className="lab-section-head">
                <p className="lab-eyebrow">Projects</p>
                <h2 className="lab-section-head__title">From problem to running code</h2>
                <p className="lab-lead">
                  Three projects are live in the lab right now. Each is attached to an open problem
                  on the board and produces a result that can be re-run from source.
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
                    <Link className="lab-link-arrow" to={`/lab/projects/${project.slug}`} style={{ margin: 0 }}>
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

      {/* Programs + careers split, Google Research "shaping the future" band */}
      <section className="lab-section lab-section--tint" id="programs">
        <div className="lab-container">
          <div className="lab-section-bar">
            <Reveal>
              <div className="lab-section-head">
                <p className="lab-eyebrow">Programs & careers</p>
                <h2 className="lab-section-head__title">Help us shape the future</h2>
                <p className="lab-lead">
                  Students claim problems and publish. Faculty co-supervise, review and challenge
                  us. Both routes run remotely and asynchronously.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lab-grid-3">
            <Reveal>
              <div className="lab-tile lab-tile--yellow" style={{ height: "100%" }}>
                <span className="lab-tile__icon">
                  <GraduationCap aria-hidden="true" />
                </span>
                <h3 className="lab-tile__title">Academic community</h3>
                <p className="lab-tile__desc">
                  Student placements, mentored sprints and faculty co-supervision — every program is
                  open to remote participants from any university.
                </p>
                <Link className="lab-tile__link" to="/lab/programs">
                  See the programs
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="lab-tile lab-tile--green" style={{ height: "100%" }}>
                <span className="lab-tile__icon">
                  <ChevronRight aria-hidden="true" />
                </span>
                <h3 className="lab-tile__title">Career opportunities</h3>
                <p className="lab-tile__desc">
                  Three hiring tracks — student researcher, fellow and research engineer — all
                  starting on the same problem board.
                </p>
                <Link className="lab-tile__link" to="/lab/careers">
                  Explore careers
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="lab-tile lab-tile--orange" style={{ height: "100%" }}>
                <span className="lab-tile__icon">
                  <Database aria-hidden="true" />
                </span>
                <h3 className="lab-tile__title">Datasets & open source</h3>
                <p className="lab-tile__desc">
                  The datasets, harnesses and published code the lab built while working its
                  problems — free to use, cite and extend.
                </p>
                <Link className="lab-tile__link" to="/lab/resources">
                  Browse resources
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
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
            <Link className="lab-link-arrow" to="/lab/apply">
              Apply to the lab
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
