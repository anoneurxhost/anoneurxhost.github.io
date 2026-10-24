import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Globe, Shield, Target, Users } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";

const values = [
  { icon: Target, title: "Problem-first", desc: "We start with real problems, not trendy topics. Every research project addresses a genuine gap in knowledge." },
  { icon: Users, title: "Student-driven", desc: "Students lead the research. Research leads provide mentorship, not direction. Your ideas matter." },
  { icon: Globe, title: "Open by default", desc: "All research code, datasets, and papers are open source. Knowledge should be freely available." },
  { icon: Shield, title: "Rigorous", desc: "We follow the scientific method. Every claim is backed by evidence. Every experiment is reproducible." },
  { icon: BookOpen, title: "Publishable", desc: "We aim for publication in recognized venues. Research that stays in a notebook is research wasted." },
  { icon: Code2, title: "Product-bound", desc: "Great research becomes great products. The path from paper to prototype to product is part of our process." },
];

const LabAbout = () => (
  <LabShell>
    <SEO
      title="About the Lab"
      description="Why Anoneurx Lab exists: open research, real problems, student-driven study of AI, cybersecurity, robotics, and systems. Open by default. Rigorous by design."
      path="/lab/about"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="About"
          title="About Anoneurx Lab"
          lead="A research lab built around open problems, supervised student teams, and results that can be re-run."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-prose lab-about">
          <section aria-labelledby="about-why">
            <h2 id="about-why">Why we exist</h2>
            <p>
              Anoneurx Lab was created to bridge the gap between academic research and real-world impact.
              We identify open problems across AI, cybersecurity, robotics, and systems — then invite
              university students to work on them with mentorship, infrastructure, and a path to publication.
            </p>
            <p>
              Most research labs are closed. Most student research goes unread. We&rsquo;re changing that by making
              research open, accessible, and connected to products that matter.
            </p>
          </section>

          <section aria-labelledby="about-philosophy">
            <h2 id="about-philosophy">Research philosophy</h2>
            <blockquote className="lab-quote">
              <p>&ldquo;Anoneurx discovers difficult problems and gives students a place to solve them.&rdquo;</p>
              <cite>Muhammad Qasim, Research Lead</cite>
            </blockquote>
          </section>

          <section aria-labelledby="about-values">
            <h2 id="about-values">Our values</h2>
            <div className="lab-grid-3 lab-values">
              {values.map((value) => (
                <article className="lab-card lab-value" key={value.title}>
                  <value.icon className="lab-area-card__icon" aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="about-who">
            <h2 id="about-who">Who can participate</h2>
            <p>
              Any university student with relevant skills. We welcome undergrads, Masters, and PhD students
              from any university worldwide. No prior research experience is required for beginner-level problems.
            </p>
            <p>
              We also welcome industry researchers and professionals who want to mentor or contribute expertise.
            </p>
          </section>

          <section aria-labelledby="about-selection">
            <h2 id="about-selection">How problems are selected</h2>
            <p>
              Problems are identified through literature review, industry needs analysis, and gaps observed
              in existing technology. Each problem must meet three criteria:
            </p>
            <ul>
              <li>It addresses a genuine research gap</li>
              <li>It can be meaningfully contributed to by students</li>
              <li>It has potential for real-world impact</li>
            </ul>
          </section>

          <section aria-labelledby="about-open">
            <h2 id="about-open">Open source philosophy</h2>
            <p>
              All research code is published under open-source licenses. Datasets are shared openly when possible.
              Papers are posted as preprints on arXiv before or alongside conference submission.
            </p>
            <p>
              We believe that research locked behind paywalls or private repos is research that fails its purpose.
            </p>
          </section>
        </div>

        <div className="lab-detail__cta">
          <h2>Ready to contribute?</h2>
          <p>Pick a problem from the board, or read the guide before you apply.</p>
          <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
            <Link className="lab-btn lab-btn--primary" to="/lab/problems">
              Browse problems
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
            <Link className="lab-btn lab-btn--ghost" to="/lab/apply">
              Join the lab
            </Link>
          </div>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabAbout;
