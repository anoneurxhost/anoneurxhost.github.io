import { Link } from "react-router-dom";
import { ArrowRight, Bot, Code2, Cpu, GraduationCap, Server, Shield, Users } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { researchers, problems } from "./data";

/**
 * Teams — the collaborative groups behind the board, Google Research style:
 * small standing groups that own problems end to end, listed with the people
 * who make them up.
 */

type Team = {
  id: string;
  name: string;
  blurb: string;
  icon: typeof Users;
  area: string;
  tone: string;
  memberNames: string[];
};

const memberByName = (name: string) => researchers.find((person) => person.name === name);

const TEAMS: Team[] = [
  {
    id: "autonomous-security",
    name: "Autonomous Systems Security",
    blurb:
      "Early-warning detection and sensor-level trust for vehicles, drones and industrial robots. Owns the pre-attack telemetry and threat-horizon problems.",
    icon: Bot,
    area: "Cybersecurity · Robotics",
    tone: "red",
    memberNames: ["Muhammad Qasim", "Student Researcher A"],
  },
  {
    id: "os-research",
    name: "Operating Systems & Runtime",
    blurb:
      "Self-defending OS research around the Black Wall runtime: learned defence models, adaptive policy and cyber-physical containment.",
    icon: Server,
    area: "Systems · OS",
    tone: "green",
    memberNames: ["Muhammad Qasim"],
  },
  {
    id: "privacy-ml",
    name: "Privacy-Preserving Machine Learning",
    blurb:
      "Federated learning with formal privacy guarantees, differential-privacy accounting and deployment-grade quantization for edge hardware.",
    icon: Shield,
    area: "AI · Cybersecurity",
    tone: "purple",
    memberNames: ["Muhammad Qasim", "Student Researcher B", "Student Researcher C"],
  },
  {
    id: "agent-security",
    name: "AI Safety & Code Intelligence",
    blurb:
      "Adversarial robustness of code generation agents, semantic code search and the security audit tooling around AI-written software.",
    icon: Code2,
    area: "AI Safety · AI",
    tone: "blue",
    memberNames: ["Muhammad Qasim"],
  },
  {
    id: "edge-robotics",
    name: "Edge Autonomy",
    blurb:
      "Lightweight SLAM, perception pipelines and control stacks running on the drone and microcontroller hardware the lab keeps in-house.",
    icon: Cpu,
    area: "Robotics · Edge",
    tone: "teal",
    memberNames: ["Muhammad Qasim", "Student Researcher A"],
  },
];

const LabTeams = () => (
  <LabShell>
    <SEO
      title="Teams"
      description="The research teams of Anoneurx Lab — the collaborative groups behind our open problems in autonomous systems security, OS research, privacy-preserving ML and edge autonomy."
      path="/lab/teams"
    />

    <section className="lab-section lab-page">
      <div className="lab-container">
        <LabPageHead
          eyebrow="Teams"
          title="Collaborative groups, shared infrastructure"
          lead="The lab is small on purpose: each team owns its problems end to end, with a named lead, a scoped review cadence and the shared harness under every result."
          back={{ to: "/lab", label: "Research lab" }}
        />

        <div className="lab-grid-3">
          {TEAMS.map((team, index) => (
            <Reveal key={team.id} delay={index * 60}>
              <article className="lab-card lab-feature-card" style={{ height: "100%" }}>
                <span className={`lab-mega__item-icon lab-mega__item-icon--${team.tone}`}>
                  <team.icon aria-hidden="true" />
                </span>
                <div className="lab-mono-tags">
                  {team.area.split(" · ").map((entry) => (
                    <span key={entry}>{entry}</span>
                  ))}
                </div>
                <h2 className="lab-feature-card__title">{team.name}</h2>
                <p className="lab-feature-card__outcome">{team.blurb}</p>
                <ul className="lab-detail__list" style={{ marginTop: "auto" }}>
                  {team.memberNames.map((name) => {
                    const person = memberByName(name);
                    return (
                      <li key={name}>
                        <GraduationCap size={15} aria-hidden="true" style={{ color: "var(--blue)", marginTop: 3 }} />
                        <span>
                          {person ? `${person.name} — ${person.role}` : name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {(() => {
                  const owned = problems.filter((p) => p.supervisor === "Muhammad Qasim" && team.area.split(" · ").some((a) => p.areas.includes(a.trim()))).slice(0, 1);
                  return (
                    <div className="lab-link-row">
                      <Link className="lab-btn lab-btn--ghost lab-btn--sm" to={`/lab/problems${owned[0] ? `/${owned[0].id}` : ""}`}>
                        {owned[0] ? "See a team problem" : "Browse problems"}
                      </Link>
                    </div>
                  );
                })()}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="lab-detail__cta">
          <span className="lab-tile__icon" style={{ margin: "0 auto" }}>
            <Users aria-hidden="true" />
          </span>
          <h2>Join a team</h2>
          <p>Placements are scoped to a single problem with a named supervisor and a deliverable. Remote, asynchronous, and open worldwide.</p>
          <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
            <Link className="lab-btn lab-btn--primary" to="/lab/apply">
              Apply to the lab
              <ArrowRight className="lab-btn__icon" aria-hidden="true" />
            </Link>
            <Link className="lab-btn lab-btn--ghost" to="/lab/people">
              Meet everyone
            </Link>
          </div>
        </div>
      </div>
    </section>
  </LabShell>
);

export default LabTeams;
