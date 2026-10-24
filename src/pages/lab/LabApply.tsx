import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";

const steps = [
  { title: "Choose a problem", desc: "Browse the problem board and find a research problem that matches your skills and interests." },
  { title: "Submit application", desc: "Fill out the application form with your background, skills, and motivation for the problem." },
  { title: "Team review", desc: "The research team reviews applications and selects candidates based on fit and potential." },
  { title: "Join the project", desc: "Get onboarded, meet your team, and start working on the research problem." },
  { title: "Conduct research", desc: "Work with your team and mentor to design experiments, implement solutions, and validate results." },
  { title: "Build and publish", desc: "Develop prototypes, write papers, and contribute to open-source projects." },
];

const requirements = [
  "Currently enrolled at a university (any country)",
  "Relevant skills for the chosen problem",
  "Commitment to research ethics and open-source values",
  "Willingness to publish findings openly",
];

const LabApply = () => (
  <LabShell>
    <SEO
      title="Join the Lab"
      description="Apply to join Anoneurx Lab. Choose a research problem, submit your application, and work with a team to conduct research and build real technology."
      path="/lab/apply"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Participate"
          title="Join the lab"
          lead="Applications are tied to a problem. Pick one first, then apply with the background that problem needs."
          back={{ to: "/lab", label: "Research lab" }}
          actions={
            <Link className="lab-btn lab-btn--primary" to="/lab/problems">
              Browse problems
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
          }
        />

        <div className="lab-detail__grid">
          <div>
            <section className="lab-detail__block" aria-labelledby="apply-process">
              <h2 id="apply-process">Application process</h2>
              <ol className="lab-steps">
                {steps.map((step, index) => (
                  <li className="lab-step" key={step.title}>
                    <span className="lab-step__num" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="lab-detail__block" aria-labelledby="apply-requirements">
              <h2 id="apply-requirements">Requirements</h2>
              <ul className="lab-detail__list">
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lab-detail__panel" aria-label="Application summary">
            <dl className="lab-detail__meta">
              <div>
                <dt>Status</dt>
                <dd>Open by problem</dd>
              </div>
              <div>
                <dt>Eligibility</dt>
                <dd>University students, worldwide</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Remote, asynchronous</dd>
              </div>
              <div>
                <dt>First step</dt>
                <dd>
                  <Link to="/lab/problems">Choose a problem</Link>
                </dd>
              </div>
              <div>
                <dt>Preparation</dt>
                <dd>
                  <Link to="/lab/guide">Read the research guide</Link>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabApply;
