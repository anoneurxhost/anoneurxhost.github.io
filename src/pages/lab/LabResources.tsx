import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, Database, ExternalLink, Wrench } from "lucide-react";
import SEO from "@/components/SEO";
import LabPageHead from "@/components/lab/LabPageHead";
import LabShell from "@/components/lab/LabShell";
import Reveal from "@/components/lab/Reveal";
import { problems } from "./data";

/**
 * Resources — the lab's published datasets, tools and open source, structured
 * after the Google Research "collaborative ecosystem" section.
 */

type ResourceRow = {
  name: string;
  desc: string;
  href: string;
  type: "Dataset" | "Tool" | "Open source" | "Guide";
  external?: boolean;
};

const DATASETS: ResourceRow[] = [
  {
    name: "Flight-test dataset with ground truth",
    desc: "Indoor drone trajectory recordings with motion-capture ground truth, for SLAM and localisation work (planned deliverable of ANX-RP-003).",
    href: "/lab/problems/anxrp003",
    type: "Dataset",
  },
  {
    name: "Pre-attack OS telemetry",
    desc: "Staged pre-attack operating-system traces collected to validate whether a measurable pre-attack behavioural state exists (ANX-OS-001).",
    href: "/lab/problems/anxosq7mkr",
    type: "Dataset",
  },
  {
    name: "Drift and noise benchmark",
    desc: "Long-horizon sensor streams with labelled concept drift and noise phases, plus a public evaluation harness (ANX-RN-001).",
    href: "/lab/problems/anxrne4k9z",
    type: "Dataset",
  },
];

const TOOLS: ResourceRow[] = [
  {
    name: "Evaluation harnesses",
    desc: "The benchmark scaffolding each board problem runs on — reused across problems instead of rebuilt.",
    href: "/lab/guide",
    type: "Tool",
  },
  {
    name: "Edge quantization toolkit",
    desc: "Mixed-precision quantization workflow for microcontroller-class deployment, open source and reproducible.",
    href: "/lab/problems/anxrp004",
    type: "Tool",
  },
];

const OPEN_SOURCE: ResourceRow[] = [
  {
    name: "anoneurx/neural-network-quantization",
    desc: "Quantization toolkit for edge deployment — TFLite and ONNX targets with accuracy/latency sweeps.",
    href: "https://github.com/anoneurx/neural-network-quantization",
    type: "Open source",
    external: true,
  },
  {
    name: "anoneurx/Robotics-Self-Trust",
    desc: "Cross-sensor trust analysis framework for autonomous robots — the perception reliability layer and its scenarios.",
    href: "https://github.com/anoneurx/Robotics-Self-Trust",
    type: "Open source",
    external: true,
  },
];

const ResourceGroup = ({
  id,
  eyebrow,
  title,
  lead,
  icon: Icon,
  tone,
  rows,
  more,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  icon: typeof Database;
  tone: string;
  rows: ResourceRow[];
  more?: { label: string; href: string };
}) => (
  <div className="lab-section" id={id} style={{ padding: "var(--space-5) 0", scrollMarginTop: "88px" }}>
    <div className="lab-section-bar">
      <div className="lab-section-head" style={{ marginBottom: 0 }}>
        <div className="lab-mega__item-label">
          <span className={`lab-mega__item-icon lab-mega__item-icon--${tone}`}>
            <Icon aria-hidden="true" />
          </span>
          <span className="lab-eyebrow">{eyebrow}</span>
        </div>
        <h2 className="lab-section-head__title">{title}</h2>
        <p className="lab-lead">{lead}</p>
      </div>
      {more && (
        <Link className="lab-link-arrow" to={more.href} style={{ marginTop: 0 }}>
          {more.label}
          <ArrowRight className="lab-btn__icon" aria-hidden="true" />
        </Link>
      )}
    </div>

    <div className="lab-resources-list">
      {rows.map((row) =>
        row.external ? (
          <a
            key={row.name}
            className="lab-resource-row"
            href={row.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="lab-resource-row__name">{row.name}</span>
            <span className="lab-resource-row__desc">{row.desc}</span>
            <span className="lab-resource-row__type">{row.type}</span>
            <ExternalLink size={15} aria-hidden="true" style={{ color: "var(--muted)" }} />
          </a>
        ) : (
          <Link key={row.name} className="lab-resource-row" to={row.href}>
            <span className="lab-resource-row__name">{row.name}</span>
            <span className="lab-resource-row__desc">{row.desc}</span>
            <span className="lab-resource-row__type">{row.type}</span>
            <ArrowRight size={15} aria-hidden="true" style={{ color: "var(--muted)" }} />
          </Link>
        ),
      )}
    </div>
  </div>
);

const GITHUB_ROW: ResourceRow = {
  name: "github.com/anoneurx",
  desc: "Problem code, benchmarks and harnesses land here first, then graduate into their own repositories.",
  href: "https://github.com/anoneurx",
  type: "Open source",
  external: true,
};

const LabResources = () => (
  <LabShell>
    <SEO
      title="Resources"
      description="Datasets, tools and open source published by Anoneurx Lab — the shared infrastructure every research problem is run on."
      path="/lab/resources"
    />

    <section className="lab-section lab-page lab-page--compact" style={{ paddingBottom: 0 }}>
      <div className="lab-container">
        <LabPageHead
          eyebrow="Resources"
          title="A collaborative ecosystem"
          lead="Access the datasets, harnesses and open source code the lab builds while working its open problems — everything a collaborator needs to reproduce or extend a result."
          back={{ to: "/lab", label: "Research lab" }}
        />
      </div>
    </section>

    <div className="lab-container">
      <div className="lab-grid-3" style={{ marginBottom: "var(--space-5)" }} id="overview">
        {[
          { icon: Database, tone: "green", href: "#datasets", label: "Datasets", desc: "Evaluation data staged and published as problem deliverables." },
          { icon: Wrench, tone: "purple", href: "#tools", label: "Tools & services", desc: "Harnesses and infrastructure problems are run on." },
          { icon: Code2, tone: "orange", href: "#opensource", label: "Open source", desc: "Code released under open licenses, maintained publicly." },
        ].map((item, index) => (
          <Reveal key={item.label} delay={index * 60}>
            <a className={`lab-tile lab-tile--${item.tone}`} href={item.href} style={{ height: "100%" }}>
              <span className="lab-tile__icon">
                <item.icon aria-hidden="true" />
              </span>
              <h2 className="lab-tile__title">{item.label}</h2>
              <p className="lab-tile__desc">{item.desc}</p>
              <span className="lab-tile__link">
                Jump to {item.label.toLowerCase()}
                <ArrowRight aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <ResourceGroup
        id="datasets"
        eyebrow="Datasets"
        title="Data issued as problem deliverables"
        lead="Every dataset is tied to a problem on the board and ships with the evaluation harness that produced its result."
        icon={Database}
        tone="green"
        rows={DATASETS}
        more={{ label: "See all problems", href: "/lab/problems" }}
      />

      <ResourceGroup
        id="tools"
        eyebrow="Tools"
        title="The instruments behind the studies"
        lead="Toolkit and harness work is published alongside papers, so a result can be re-run instead of trusted."
        icon={Wrench}
        tone="purple"
        rows={TOOLS}
        more={{ label: "Research guide", href: "/lab/guide" }}
      />

      <ResourceGroup
        id="opensource"
        eyebrow="Open source"
        title="Published, maintained, credited"
        lead="The lab's code lives in the open — including the reproducibility artifacts behind published results."
        icon={Code2}
        tone="orange"
        rows={[...OPEN_SOURCE, GITHUB_ROW]}
        more={{ label: "Anoneurx Open Source", href: "/opensource" }}
      />

      <div className="lab-detail__cta">
        <span className="lab-tile__icon" style={{ margin: "0 auto" }}>
          <BookOpen aria-hidden="true" />
        </span>
        <h2>Use the lab's infrastructure</h2>
        <p>
          {problems.length} open problems reuse this shared stack. Pick one and you get the data,
          harness and review cadence to run your study.
        </p>
        <div className="lab-hero__actions" style={{ justifyContent: "center" }}>
          <Link className="lab-btn lab-btn--primary" to="/lab/problems">
            Explore open problems
            <ArrowRight className="lab-btn__icon" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </LabShell>
);

export default LabResources;
