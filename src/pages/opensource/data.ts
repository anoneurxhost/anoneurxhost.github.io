// Static seed data for the Open Source module.
export type Project = { id: string; name: string; description: string; language: string; stars: number; tags: string[] };
export type Org = { id: string; name: string; description: string; members: number; projects: number };
export type Library = { id: string; name: string; description: string; language: string; downloads: string };
export type Pkg = { id: string; name: string; registry: "npm" | "cargo" | "pip" | "go"; version: string; description: string };
export type Template = { id: string; name: string; stack: string; description: string };
export type Extension = { id: string; name: string; description: string; installs: string };
export type Doc = { id: string; title: string; category: string; excerpt: string };
export type Post = { id: string; title: string; author: string; date: string; tags: string[]; excerpt: string };
export type Roadmap = { id: string; project: string; quarter: string; items: string[] };
export type Release = { id: string; project: string; version: string; date: string; notes: string };
export type Discussion = { id: string; title: string; author: string; replies: number; category: string };
export type Event = { id: string; name: string; date: string; type: "Virtual" | "In-Person" | "Hybrid"; location: string };
export type Sponsor = { id: string; name: string; tier: "Platinum" | "Gold" | "Silver"; since: string };
export type Contributor = { id: string; name: string; commits: number; role: string; region: string };
export type Showcase = { id: string; name: string; author: string; description: string; project: string };

export const projects: Project[] = [
  { id: "atlas", name: "ATLAS Lang", description: "Systems programming language with memory safety and zero-cost abstractions.", language: "Rust", stars: 12400, tags: ["language", "compiler"] },
  { id: "blackwall", name: "Blackwall OS", description: "Privacy-first operating system with hardened kernel and secure enclaves.", language: "C / Rust", stars: 9800, tags: ["os", "security"] },
  { id: "nexora", name: "Nexora Browser", description: "Fast, private, AI-augmented browser built on a custom engine.", language: "C++", stars: 7300, tags: ["browser"] },
  { id: "arcadeum", name: "Arcadeum SDK", description: "Real-time multiplayer game engine primitives.", language: "TypeScript", stars: 4100, tags: ["gamedev"] },
  { id: "cortex", name: "Cortex AI", description: "Open weights inference runtime optimized for edge devices.", language: "Rust", stars: 15200, tags: ["ai", "runtime"] },
  { id: "harbor", name: "Harbor DB", description: "Distributed SQL database with strong consistency guarantees.", language: "Go", stars: 6600, tags: ["database"] },
  { id: "aurora", name: "Aurora UI", description: "Design system and component library with tokens and theming.", language: "TypeScript", stars: 8900, tags: ["ui", "design"] },
  { id: "signal", name: "Signal Mesh", description: "P2P networking library with NAT traversal and encryption.", language: "Rust", stars: 3400, tags: ["networking"] },
];

export const organizations: Org[] = [
  { id: "anoneurx-labs", name: "Anoneurx Labs", description: "Core research and systems group.", members: 84, projects: 42 },
  { id: "atlas-foundation", name: "ATLAS Foundation", description: "Stewardship for the ATLAS language ecosystem.", members: 31, projects: 12 },
  { id: "blackwall-collective", name: "Blackwall Collective", description: "Contributors advancing OS security.", members: 56, projects: 18 },
  { id: "nexora-web", name: "Nexora Web Group", description: "Browser and web platform contributors.", members: 47, projects: 15 },
  { id: "cortex-research", name: "Cortex Research", description: "Applied AI infrastructure researchers.", members: 62, projects: 22 },
  { id: "harbor-data", name: "Harbor Data", description: "Distributed systems and database maintainers.", members: 28, projects: 9 },
];

export const libraries: Library[] = [
  { id: "atlas-std", name: "atlas-std", description: "The ATLAS standard library.", language: "ATLAS", downloads: "2.1M" },
  { id: "cortex-inference", name: "cortex-inference", description: "Fast tensor inference primitives.", language: "Rust", downloads: "812K" },
  { id: "aurora-tokens", name: "aurora-tokens", description: "Design tokens for the Aurora system.", language: "TypeScript", downloads: "1.4M" },
  { id: "signal-net", name: "signal-net", description: "P2P networking building blocks.", language: "Rust", downloads: "402K" },
  { id: "harbor-client", name: "harbor-client", description: "Type-safe Harbor DB client.", language: "TypeScript", downloads: "930K" },
  { id: "blackwall-syscalls", name: "blackwall-syscalls", description: "Safe bindings to the Blackwall syscall surface.", language: "C", downloads: "220K" },
];

export const packages: Pkg[] = [
  { id: "npm-aurora", name: "@anoneurx/aurora", registry: "npm", version: "3.4.1", description: "Aurora UI React components." },
  { id: "cargo-cortex", name: "cortex", registry: "cargo", version: "0.9.2", description: "Cortex inference runtime crate." },
  { id: "pip-atlas", name: "atlas-tools", registry: "pip", version: "1.2.0", description: "ATLAS tooling for Python interop." },
  { id: "go-harbor", name: "harbor-go", registry: "go", version: "v1.6.0", description: "Harbor DB driver for Go." },
  { id: "npm-signal", name: "@anoneurx/signal", registry: "npm", version: "0.7.5", description: "Signal Mesh JS bindings." },
  { id: "cargo-blackwall", name: "blackwall-sys", registry: "cargo", version: "0.4.0", description: "Blackwall syscall bindings." },
];

export const templates: Template[] = [
  { id: "atlas-cli", name: "ATLAS CLI Starter", stack: "ATLAS", description: "Command-line application scaffold with argument parsing." },
  { id: "aurora-app", name: "Aurora Web App", stack: "React + Aurora", description: "Fully themed React app with routing and design tokens." },
  { id: "cortex-edge", name: "Cortex Edge Node", stack: "Rust", description: "Edge inference server template with GPU fallbacks." },
  { id: "harbor-api", name: "Harbor REST API", stack: "Go + Harbor", description: "REST API scaffold backed by Harbor DB." },
  { id: "blackwall-service", name: "Blackwall Service", stack: "C / Rust", description: "System service template with sandboxing." },
  { id: "nexora-extension", name: "Nexora Extension", stack: "TypeScript", description: "Browser extension template for Nexora." },
];

export const extensions: Extension[] = [
  { id: "atlas-vscode", name: "ATLAS Language Support", description: "Syntax highlighting, LSP, and debugger.", installs: "412K" },
  { id: "aurora-tokens-vscode", name: "Aurora Tokens", description: "Autocomplete design tokens in your editor.", installs: "128K" },
  { id: "harbor-explorer", name: "Harbor Explorer", description: "Browse Harbor DB schemas from VS Code.", installs: "76K" },
  { id: "cortex-notebooks", name: "Cortex Notebooks", description: "Run Cortex models inside notebooks.", installs: "203K" },
  { id: "blackwall-syscalls-ext", name: "Blackwall Syscalls", description: "Reference for Blackwall syscalls and errno.", installs: "34K" },
  { id: "nexora-devtools", name: "Nexora DevTools", description: "Debug Nexora extensions from VS Code.", installs: "89K" },
];

export const docs: Doc[] = [
  { id: "getting-started", title: "Getting Started", category: "Guides", excerpt: "Install the toolchain and build your first project." },
  { id: "atlas-book", title: "The ATLAS Book", category: "Language", excerpt: "The definitive language reference and tutorial." },
  { id: "aurora-guide", title: "Aurora Design Guide", category: "Design", excerpt: "Tokens, components, and theming with Aurora." },
  { id: "cortex-runtime", title: "Cortex Runtime", category: "AI", excerpt: "Model loading, quantization, and inference." },
  { id: "harbor-ops", title: "Harbor Operations", category: "Databases", excerpt: "Deploying, scaling, and backing up Harbor." },
  { id: "blackwall-security", title: "Blackwall Security Model", category: "Systems", excerpt: "The threat model and enclave architecture." },
];

export const posts: Post[] = [
  { id: "atlas-1-0", title: "Announcing ATLAS 1.0", author: "Maya Chen", date: "2026-05-14", tags: ["language", "release"], excerpt: "Five years in the making, ATLAS reaches its first stable release." },
  { id: "cortex-edge", title: "Cortex at the Edge", author: "Ravi Patel", date: "2026-04-02", tags: ["ai", "runtime"], excerpt: "How Cortex runs 8B parameter models on consumer hardware." },
  { id: "aurora-tokens-2", title: "Aurora Tokens v2", author: "Sofia Kim", date: "2026-03-11", tags: ["design"], excerpt: "A more expressive token system for multi-brand theming." },
  { id: "harbor-consensus", title: "Harbor's Consensus Redesign", author: "Léo Dubois", date: "2026-02-28", tags: ["database"], excerpt: "Why we moved from Raft to a hybrid consensus protocol." },
  { id: "blackwall-audit", title: "Blackwall Audit Results", author: "Priya Rao", date: "2026-01-17", tags: ["security"], excerpt: "Findings from our third independent security audit." },
  { id: "signal-mesh", title: "Signal Mesh: A P2P Stack", author: "Aria Novak", date: "2025-12-05", tags: ["networking"], excerpt: "The design of a NAT-traversing peer-to-peer library." },
];

export const roadmaps: Roadmap[] = [
  { id: "atlas-q3", project: "ATLAS Lang", quarter: "Q3 2026", items: ["Async runtime v2", "Package registry", "Cross-compilation matrix"] },
  { id: "blackwall-q3", project: "Blackwall OS", quarter: "Q3 2026", items: ["Enclave attestation", "USB isolation", "New installer"] },
  { id: "cortex-q3", project: "Cortex AI", quarter: "Q3 2026", items: ["Speculative decoding", "MoE quantization", "WebGPU backend"] },
  { id: "aurora-q4", project: "Aurora UI", quarter: "Q4 2026", items: ["Data-viz primitives", "Motion tokens", "RTL polish"] },
  { id: "harbor-q4", project: "Harbor DB", quarter: "Q4 2026", items: ["Column-store engine", "Change data capture", "Vector indexes"] },
];

export const releases: Release[] = [
  { id: "atlas-1-0", project: "ATLAS Lang", version: "1.0.0", date: "2026-05-14", notes: "First stable release. Language and stdlib frozen." },
  { id: "cortex-0-9", project: "Cortex AI", version: "0.9.2", date: "2026-05-02", notes: "Speculative decoding preview and MoE support." },
  { id: "aurora-3-4", project: "Aurora UI", version: "3.4.1", date: "2026-04-20", notes: "New motion tokens, dark theme refinements." },
  { id: "harbor-1-6", project: "Harbor DB", version: "1.6.0", date: "2026-04-05", notes: "Hybrid consensus GA, faster online schema changes." },
  { id: "blackwall-0-8", project: "Blackwall OS", version: "0.8.0", date: "2026-03-22", notes: "New enclave attestation and hardened networking." },
  { id: "nexora-2-1", project: "Nexora Browser", version: "2.1.0", date: "2026-03-04", notes: "New rendering pipeline, 30% faster on cold start." },
];

export const discussions: Discussion[] = [
  { id: "d1", title: "Proposal: async traits in ATLAS 1.1", author: "Maya Chen", replies: 84, category: "RFC" },
  { id: "d2", title: "Best patterns for Harbor migrations at scale", author: "Elena Rossi", replies: 42, category: "Q&A" },
  { id: "d3", title: "Cortex on Apple Silicon: benchmarks", author: "Ravi Patel", replies: 31, category: "Showcase" },
  { id: "d4", title: "Aurora tokens: naming feedback wanted", author: "Sofia Kim", replies: 57, category: "Design" },
  { id: "d5", title: "Blackwall installer — hardware compatibility", author: "Priya Rao", replies: 23, category: "Support" },
];

export const events: Event[] = [
  { id: "e1", name: "AnoneurxConf 2026", date: "2026-09-18", type: "Hybrid", location: "Berlin + Online" },
  { id: "e2", name: "ATLAS Language Summit", date: "2026-07-11", type: "In-Person", location: "Tokyo" },
  { id: "e3", name: "Cortex AI Meetup", date: "2026-06-04", type: "Virtual", location: "Online" },
  { id: "e4", name: "Harbor Ops Day", date: "2026-08-20", type: "Hybrid", location: "Amsterdam + Online" },
  { id: "e5", name: "Blackwall Security Workshop", date: "2026-10-02", type: "In-Person", location: "Zürich" },
];

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Northline", tier: "Platinum", since: "2023" },
  { id: "s2", name: "Vellum Systems", tier: "Platinum", since: "2024" },
  { id: "s3", name: "Meridian Cloud", tier: "Gold", since: "2024" },
  { id: "s4", name: "Kestrel Semiconductor", tier: "Gold", since: "2025" },
  { id: "s5", name: "Cobalt Studios", tier: "Silver", since: "2025" },
  { id: "s6", name: "Umbra Labs", tier: "Silver", since: "2025" },
];

export const contributors: Contributor[] = [
  { id: "c1", name: "Maya Chen", commits: 4820, role: "Language Lead", region: "APAC" },
  { id: "c2", name: "Ravi Patel", commits: 3910, role: "AI Runtime", region: "APAC" },
  { id: "c3", name: "Sofia Kim", commits: 2740, role: "Design Systems", region: "EMEA" },
  { id: "c4", name: "Léo Dubois", commits: 2540, role: "Databases", region: "EMEA" },
  { id: "c5", name: "Priya Rao", commits: 2210, role: "Security", region: "APAC" },
  { id: "c6", name: "Aria Novak", commits: 1980, role: "Networking", region: "EMEA" },
  { id: "c7", name: "Jonah Reyes", commits: 1730, role: "Compiler", region: "AMER" },
  { id: "c8", name: "Elena Rossi", commits: 1620, role: "DX & Tooling", region: "EMEA" },
];

export const showcase: Showcase[] = [
  { id: "sh1", name: "Loom Editor", author: "Lumen Studio", description: "Collaborative code editor built on Aurora UI.", project: "Aurora UI" },
  { id: "sh2", name: "Tidepool Analytics", author: "Tidepool", description: "Real-time analytics on top of Harbor DB.", project: "Harbor DB" },
  { id: "sh3", name: "Verse Assistant", author: "Verse", description: "Local-first AI assistant powered by Cortex.", project: "Cortex AI" },
  { id: "sh4", name: "Nomad Kernel", author: "Nomad", description: "Embedded kernel fork based on Blackwall.", project: "Blackwall OS" },
  { id: "sh5", name: "Pico Router", author: "Pico Networks", description: "Home router firmware using Signal Mesh.", project: "Signal Mesh" },
  { id: "sh6", name: "Prism Notebooks", author: "Prism", description: "Notebook environment written in ATLAS.", project: "ATLAS Lang" },
];

export const navLinks: { to: string; label: string }[] = [
  { to: "/opensource", label: "Home" },
  { to: "/opensource/about", label: "About" },
  { to: "/opensource/projects", label: "Projects" },
  { to: "/opensource/organizations", label: "Organizations" },
  { to: "/opensource/libraries", label: "Libraries" },
  { to: "/opensource/packages", label: "Packages" },
  { to: "/opensource/templates", label: "Templates" },
  { to: "/opensource/vscode-extensions", label: "VS Code" },
  { to: "/opensource/documentation", label: "Docs" },
  { to: "/opensource/blog", label: "Blog" },
  { to: "/opensource/roadmaps", label: "Roadmaps" },
  { to: "/opensource/releases", label: "Releases" },
  { to: "/opensource/discussions", label: "Discussions" },
  { to: "/opensource/events", label: "Events" },
  { to: "/opensource/community", label: "Community" },
  { to: "/opensource/sponsors", label: "Sponsors" },
  { to: "/opensource/contributors", label: "Contributors" },
  { to: "/opensource/showcase", label: "Showcase" },
];
