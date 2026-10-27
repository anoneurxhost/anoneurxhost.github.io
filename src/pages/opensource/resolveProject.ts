import { projects as fallbackProjects } from "./data";
import { blackwallExtra } from "@/data/blackwallData";
import { authenticatorExtra } from "@/data/authenticatorData";
import { lynxExtra } from "@/data/lynxData";
import { ProjectExtra } from "@/data/types";

/** Per-project overrides for the derived detail view — status, licence and headline stats. */
const OVERRIDES: Record<string, Partial<Record<"version" | "license" | "stats" | "downloads", unknown>>> = {
  lynx: {
    version: "v0.1.0 · released",
    license: "AGPL-3.0-or-later",
    stats: [
      { label: "Release", value: "v0.1.0", subtext: "First end-to-end release · Oct 27, 2026", accentColor: "emerald" },
      { label: "Test suites", value: "56", subtext: "Green at every gated commit", accentColor: "purple" },
      { label: "Quality gates", value: "0.966 NDCG@10", subtext: "v0 judged set · MRR@10 1.000", accentColor: "cyan" },
      { label: "Status", value: "Shipped", subtext: "Phases 0–5 · Phase 6 next", accentColor: "amber" },
    ],
    downloads: [
      { name: "anoneurx/lynx (source)", size: "source", version: "v0.1.0", target: "Rust + TypeScript", url: "https://github.com/anoneurx/lynx" },
      { name: "lynx-v0.1.0.tar.gz", size: "source archive", version: "v0.1.0", target: "All platforms", url: "https://github.com/anoneurx/lynx/archive/refs/tags/v0.1.0.tar.gz" },
      { name: "lynx-v0.1.0.zip", size: "source archive", version: "v0.1.0", target: "All platforms", url: "https://github.com/anoneurx/lynx/archive/refs/tags/v0.1.0.zip" },
      { name: "specification.md", size: "docs", version: "v0.1.0", target: "Reference spec", url: "https://github.com/anoneurx/lynx/blob/v0.1.0/docs/architecture/specification.md" },
      { name: "PRIVACY.md", size: "docs", version: "v0.1.0", target: "Privacy commitments", url: "https://github.com/anoneurx/lynx/blob/v0.1.0/PRIVACY.md" },
    ],
  },
};

/** Resolve a project slug into basic detail data + presentation extras. */
export function resolveProject(
  slug: string | undefined
): { project: any; extra: ProjectExtra } | null {
  const currentId =
    slug ||
    (() => {
      const path = window.location.pathname.replace(/^\//, "");
      const segments = path.split("/");
      if (segments[0] === "opensource") return segments[1];
      return segments[0];
    })() ||
    "blackwall";
  const key = currentId.toLowerCase();

  const basic = fallbackProjects.find((p) => p.id === key);
  if (!basic) return null;

  let extra: ProjectExtra;
  switch (key) {
    case "authenticator":
      extra = authenticatorExtra;
      break;
    case "lynx":
      extra = lynxExtra;
      break;
    case "blackwall":
    default:
      extra = blackwallExtra;
      break;
  }

  const override = OVERRIDES[key] ?? {};

  const project = {
    id: basic.id,
    name: basic.name,
    subtitle: basic.description,
    description: basic.description,
    category: "OPEN SOURCE PROJECT",
    language: basic.language,
    version: "v1.0.0 Release",
    stars: basic.stars,
    license: "Apache-2.0",
    authors: ["Anoneurx Core Maintainers"],
    institution: "Anoneurx Labs",
    publishedDate: "2026",
    tags: basic.tags,
    githubUrl: `https://github.com/anoneurx/${basic.id}`,
    pdfPages: 6,
    abstract: basic.description,
    stats: [
      { label: "Community Stars", value: basic.stars.toLocaleString(), subtext: "GitHub Stars", accentColor: "purple" },
      { label: "Primary Language", value: basic.language, subtext: "Core codebase", accentColor: "cyan" },
      { label: "Status", value: "Active", subtext: "Community maintained", accentColor: "emerald" },
      { label: "License", value: "Open Source", subtext: "Permissive license", accentColor: "amber" },
    ],
    architecture: {
      title: "Module Architecture",
      description: `Core structural design of ${basic.name}.`,
      nodes: [
        { title: "Core Engine", desc: "Main execution pipeline", type: "Core" },
        { title: "API Bindings", desc: "Client language interfaces", type: "API" },
        { title: "Storage & State", desc: "Data persistence layer", type: "State" },
      ],
    },
    codeSnippet: {
      filename: "example.ts",
      language: basic.language,
      code: `import { ${basic.name.replace(/\s+/g, "")} } from "@anoneurx/${basic.id}";\n\nconst instance = new ${basic.name.replace(/\s+/g, "")}();\nconsole.log("Loaded", instance);`,
    },
    benchmarks: {
      title: "System Performance Metrics",
      description: `Execution benchmark metrics for ${basic.name}:`,
      metrics: [
        { name: `${basic.name} Runtime`, value: "Optimal", score: 95, color: "bg-teal-500" },
        { name: "Legacy Baseline", value: "Standard", score: 60, color: "bg-slate-500" },
      ],
    },
    downloads: [
      { name: `${basic.id}-latest.tar.gz`, size: "12 MB", version: "v1.0.0", target: "All Systems", url: `#download-${basic.id}` },
    ],
    bibtex: `@article{anoneurx2026${basic.id},\n  title={${basic.name}: ${basic.description}},\n  author={Anoneurx Maintainers},\n  year={2026},\n  url={https://opensource.anoneurx.com/project/${basic.id}}\n}`,
    ...override,
  };

  return { project, extra };
}
