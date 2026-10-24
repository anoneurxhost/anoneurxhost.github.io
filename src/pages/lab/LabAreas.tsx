import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Brain,
  Cpu,
  Database,
  Server,
  Shield,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { problems, researchAreas } from "./data";

const AREA_ICONS: Record<string, LucideIcon> = {
  Brain,
  Shield,
  Bot,
  Cpu,
  Server,
  Database,
  Wifi,
  AlertTriangle,
};

/** Problem records use shorter area names than the area cards, so the
 *  mapping is explicit: each card counts the problems filed under its name. */
const AREA_COVERAGE: Record<string, string[]> = {
  "ai-ml": ["AI"],
  cybersecurity: ["Cybersecurity"],
  robotics: ["Robotics"],
  "autonomous-systems": ["Autonomous Systems"],
  "systems-os": ["Systems"],
  "data-science": ["Data Science"],
  "iot-edge": ["IoT"],
  "ai-safety": ["AI Safety"],
};

const LabAreas = () => {
  const countForArea = (areaId: string) =>
    problems.filter((problem) =>
      problem.areas.some((item) => (AREA_COVERAGE[areaId] ?? []).includes(item)),
    ).length;

  return (
    <LabShell>
      <SEO
        title="Research Areas"
        description="Research domains at Anoneurx Lab — AI & machine learning, cybersecurity, robotics, autonomous systems, systems & OS, data science, IoT & edge, AI safety, and more."
        path="/lab/areas"
      />

      <section className="lab-section lab-page">
        <div className="lab-container">
          <LabPageHead
            eyebrow="Research domains"
            title="Research areas"
            lead="Problems are filed under the area they belong to, but the datasets, evaluation harnesses and model checkpoints are shared across all of them."
            back={{ to: "/lab", label: "Research lab" }}
          />

          <div className="lab-grid-4">
            {researchAreas.map((area, index) => {
              const Icon = AREA_ICONS[area.icon] ?? Brain;
              const count = countForArea(area.id);
              return (
                <Reveal key={area.id} delay={index * 40}>
                  <article className="lab-card lab-area-card" style={{ height: "100%" }}>
                    <Icon className="lab-area-card__icon" aria-hidden="true" />
                    <h2 className="lab-area-card__title">{area.name}</h2>
                    <p className="lab-area-card__desc">{area.description}</p>
                    <p className="lab-count">
                      {count} open problem{count === 1 ? "" : "s"}
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
    </LabShell>
  );
};

export default LabAreas;
