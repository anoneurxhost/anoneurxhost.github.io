import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, GraduationCap, Users } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";

/**
 * Programs — the lab's engagement programs for students and faculty, following
 * the Google Research "shaping the future together" structure.
 */

const STUDENT_PROGRAMS = [
  {
    id: "placements",
    title: "Student researcher placements",
    desc: "Join a supervised team on one of the board's open problems. Scoped to one research question, one named supervisor and one deliverable — from anywhere in the world.",
    href: "/lab/apply",
    cta: "See placements",
    tone: "blue",
  },
  {
    id: "sprints",
    title: "Mentored research sprints",
    desc: "A fixed 4–6 week window on a beginner or intermediate problem, designed for a first publication-grade result. Strong fit for coursework or capstone projects.",
    href: "/lab/guide",
    cta: "How sprints work",
    tone: "yellow",
  },
  {
    id: "certificates",
    title: "Credit and certificates",
    desc: "Co-authorship on published results, a research participation certificate, and recommendation letters for outstanding contributors.",
    href: "/lab/faq",
    cta: "Read the details",
    tone: "green",
  },
];

const FACULTY_PROGRAMS = [
  {
    id: "co-supervision",
    title: "Co-supervised projects",
    desc: "Run one of the board's problems jointly with your group. The lab contributes the problem scope, its evaluation harness and review discipline — you contribute students and academic context.",
    href: "/opportunities/research-grants",
    cta: "Start a co-supervision",
    tone: "purple",
  },
  {
    id: "grants",
    title: "Research grants",
    desc: "Fund work on a shared problem through a research grant. Existing lab infrastructure is reused rather than rebuilt, so funded time goes into the study, not the scaffolding.",
    href: "/opportunities/research-grants",
    cta: "See the grant route",
    tone: "teal",
  },
  {
    id: "review",
    title: "Open review partner",
    desc: "Help us pressure-test published problem gaps and results. Faculty reviewers get early access to problem drafts and datasets before they are added to the board.",
    href: "/lab/problems",
    cta: "Browse current gaps",
    tone: "orange",
  },
];

const ProgramTile = ({
  program,
  icon: Icon,
}: {
  program: (typeof STUDENT_PROGRAMS)[number];
  icon: typeof GraduationCap;
}) => (
  <Reveal>
    <div className={`lab-tile lab-tile--${program.tone}`} style={{ height: "100%" }}>
      <span className="lab-tile__icon">
        <Icon aria-hidden="true" />
      </span>
      <h3 className="lab-tile__title">{program.title}</h3>
      <p className="lab-tile__desc">{program.desc}</p>
      <Link className="lab-tile__link" to={program.href}>
        {program.cta}
        <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  </Reveal>
);

const LabPrograms = () => (
  <LabShell>
    <SEO
      title="Programs"
      description="Anoneurx Lab programs for students and faculty — student researcher placements, mentored sprints, co-supervision, research grants and open review partnerships."
      path="/lab/programs"
    />

    <section className="lab-section lab-page lab-page--compact">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Programs"
          title="Shaping the future together"
          lead="The lab works alongside the academic community: students claim problems and publish, faculty co-supervise and challenge us. Every program below is open to remote participants."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-section-bar" id="students" style={{ scrollMarginTop: "88px" }}>
          <div className="lab-section-head" style={{ marginBottom: 0 }}>
            <p className="lab-eyebrow">Student programs</p>
            <h2 className="lab-section-head__title">For students</h2>
          </div>
          <Link className="lab-link-arrow" to="/lab/apply" style={{ marginTop: 0 }}>
            All application routes
            <ArrowRight className="lab-btn__icon" aria-hidden="true" />
          </Link>
        </div>

        <div className="lab-grid-3" style={{ marginBottom: "var(--space-6)" }}>
          {STUDENT_PROGRAMS.map((program, index) => (
            <ProgramTile key={program.id} program={program} icon={GraduationCap} />
          ))}
        </div>

        <div className="lab-section-bar" id="faculty" style={{ scrollMarginTop: "88px" }}>
          <div className="lab-section-head" style={{ marginBottom: 0 }}>
            <p className="lab-eyebrow">Faculty programs</p>
            <h2 className="lab-section-head__title">For faculty</h2>
          </div>
          <Link className="lab-link-arrow" to="/opportunities/research-grants" style={{ marginTop: 0 }}>
            Grants overview
            <ArrowRight className="lab-btn__icon" aria-hidden="true" />
          </Link>
        </div>

        <div className="lab-grid-3" style={{ marginBottom: "var(--space-6)" }}>
          {FACULTY_PROGRAMS.map((program, index) => (
            <ProgramTile key={program.id} program={program} icon={FlaskConical} />
          ))}
        </div>

        <div className="lab-detail__cta">
          <span className="lab-tile__icon" style={{ margin: "0 auto" }}>
            <Users aria-hidden="true" />
          </span>
          <h2>Not sure which program fits?</h2>
          <p>Start from the problem board — every problem lists the tracks that suit it, and the FAQ explains how each route differs.</p>
          <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
            <Link className="lab-btn lab-btn--primary" to="/lab/problems">
              Browse open problems
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

export default LabPrograms;
