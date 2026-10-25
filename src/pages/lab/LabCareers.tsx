import { Link } from "react-router-dom";
import { ArrowRight, Binoculars, Code2, GraduationCap, Microscope } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";

/**
 * Careers in the Google Research style: roles, tracks and the process, ending
 * in the routes that already exist (/lab/apply and the fellowship applications).
 */

const TRACKS = [
  {
    id: "student-researcher",
    icon: GraduationCap,
    tone: "blue",
    meta: "Placements · remote",
    title: "Student researcher",
    desc: "A supervised placement scoped to a single open problem, with a named supervisor and a deliverable you can put your name on. 5–20 hours per week depending on difficulty.",
    href: "/lab/apply",
  },
  {
    id: "fellow",
    icon: Microscope,
    tone: "purple",
    meta: "Fellowships · self-directed",
    title: "Research fellow",
    desc: "A longer, self-directed piece of work on a board problem, with a research mentor and a publication plan agreed at the start. Lumpier hours, higher stakes.",
    href: "/opportunities/fellowships",
  },
  {
    id: "engineer",
    icon: Code2,
    tone: "green",
    meta: "Infrastructure · part-time to contract",
    title: "Research engineer",
    desc: "Build the shared infrastructure: evaluation harnesses, telemetry pipelines and the tools every problem reuses. Code ships to the lab's public repositories.",
    href: "/careers/join-dev-team",
  },
];

const PROCESS = [
  {
    title: "Pick a problem",
    desc: "Browse the problem board, filter by area and difficulty, and read the full statement — scope, skills, supervisor and deliverables are all published.",
  },
  {
    title: "Apply with the problem",
    desc: "Applications name the problem you want and how you would attack its research gap. No cover letter theatrics — show the plan.",
  },
  {
    title: "Scoped kickoff",
    desc: "Accepted applicants get a kickoff meeting with the supervisor, a first milestone agreed in writing and a review cadence.",
  },
  {
    title: "Publish and credit",
    desc: "Milestones are reviewed in the open. Results become papers, datasets or libraries, and every contributor is credited by name.",
  },
];

const LabCareers = () => (
  <LabShell>
    <SEO
      title="Careers"
      description="Work with Anoneurx Lab — student researcher placements, research fellowships and engineering roles on open problems in AI, cybersecurity, robotics and systems."
      path="/lab/careers"
    />

    <section className="lab-section lab-page lab-page--compact">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Careers"
          title="Help us shape the future"
          lead="The lab hires in three tracks, and every one of them starts on the problem board. Placements are remote and asynchronous, with periodic sync meetings."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-grid-3" style={{ marginBottom: "var(--space-6)" }}>
          {TRACKS.map((track, index) => (
            <Reveal key={track.id} delay={index * 60}>
              <div className={`lab-tile lab-tile--${track.tone}`} style={{ height: "100%" }}>
                <span className="lab-tile__icon">
                  <track.icon aria-hidden="true" />
                </span>
                <p className="lab-role__meta">{track.meta}</p>
                <h2 className="lab-tile__title">{track.title}</h2>
                <p className="lab-tile__desc">{track.desc}</p>
                <Link className="lab-tile__link" to={track.href}>
                  Learn more
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="lab-section-bar">
          <div className="lab-section-head" style={{ marginBottom: 0 }}>
            <p className="lab-eyebrow">The process</p>
            <h2 className="lab-section-head__title">How joining works</h2>
            <p className="lab-lead">
              Four steps from browsing to publishing. At every step you know exactly who is
              reviewing you and what happens next.
            </p>
          </div>
          <Link className="lab-link-arrow" to="/lab/apply" style={{ marginTop: 0 }}>
            Start an application
            <ArrowRight className="lab-btn__icon" aria-hidden="true" />
          </Link>
        </div>

        <div className="lab-grid-4" style={{ marginBottom: "var(--space-6)" }}>
          {PROCESS.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <article className="lab-card" style={{ height: "100%" }}>
                <span className="lab-stat__num" style={{ color: "var(--blue)" }}>
                  0{index + 1}
                </span>
                <h3 style={{ marginTop: "var(--space-1)" }}>{step.title}</h3>
                <p className="lab-muted" style={{ fontSize: "0.92rem", marginTop: "var(--space-1)" }}>
                  {step.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="lab-detail__cta">
          <span className="lab-tile__icon" style={{ margin: "0 auto" }}>
            <Binoculars aria-hidden="true" />
          </span>
          <h2>Nothing fits? Propose a problem</h2>
          <p>
            Fellowships accept self-directed proposals against the same standard: a real gap, a
            method you can run in weeks, and a result you can publish.
          </p>
          <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
            <Link className="lab-btn lab-btn--primary" to="/lab/problems">
              Browse the problem board
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
            <Link className="lab-btn lab-btn--ghost" to="/lab/faq">
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabCareers;
