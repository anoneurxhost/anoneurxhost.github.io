import { useLocation, useParams, matchPath } from "react-router-dom";
import SEO from "./SEO";
import detailedResearchData from "@/data/detailedResearchData.json";
import jsonResearchPapers from "@/data/researchPapers.json";
import { projects } from "@/pages/opensource/data";
import { shortIdSlug } from "@/lib/utils";

/**
 * Site-wide SEO injector. Mounted once in PublicLayout, it looks up the current
 * pathname in the map below and injects a unique <SEO /> with title,
 * description, canonical, OG, Twitter and JSON-LD for that route.
 *
 * Pages that already render their own <SEO /> component simply override this
 * via react-helmet-async's dedupe on <title> / <meta name|property>.
 */

type Entry = {
  title: string;
  description: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  /** Overrides the canonical/og:url path (used by /share/* aliases). */
  canonicalPath?: string;
  noindex?: boolean;
};

/** Research paper metadata used to build unique /read and /share head tags. */
type PaperMeta = {
  slug: string;
  title: string;
  abstract: string;
  authors: string[];
  category?: string;
  date?: string;
  journal?: string;
  doi?: string;
};

const allPapers: PaperMeta[] = [
  ...((detailedResearchData as any).papers || []),
  ...((jsonResearchPapers as any[]) || []),
].map((p: any) => ({
  slug: String(p.paperId || shortIdSlug(p.id)).toLowerCase(),
  title: String(p.title || ""),
  abstract: String(p.abstract || ""),
  authors: Array.isArray(p.authors) ? p.authors : [],
  category: p.category,
  date: p.date || p.publishDate,
  journal: p.journal,
  doi: p.doi,
  id: String(p.id ?? ""),
})) as PaperMeta[];

const findPaper = (id?: string): PaperMeta | undefined => {
  if (!id) return undefined;
  const key = id.trim().toLowerCase();
  return (
    allPapers.find((p) => p.slug === key) ||
    allPapers.find((p) => String((p as any).id).toLowerCase() === key)
  );
};

const clamp = (s: string, n = 155) =>
  s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`;

const paperEntry = (id: string | undefined, canonicalPath: string): Entry => {
  const paper = findPaper(id);
  const readPath = paper ? `/read/${paper.slug}` : canonicalPath;
  if (!paper) {
    return {
      title: `Research Paper — ${id ?? ""}`.trim(),
      description:
        "Read this paper from Anoneurx Research — abstract, methodology, results and references.",
      type: "article",
      canonicalPath,
      jsonLd: [
        ARTICLE(String(id), readPath),
        BREADCRUMB([{ name: "Research", item: "/research" }, { name: "Read", item: readPath }]),
      ],
    };
  }
  const authors = paper.authors.slice(0, 3).join(", ");
  return {
    title: paper.title,
    description: clamp(paper.abstract || `${paper.title} — Anoneurx Research paper by ${authors}.`),
    type: "article",
    canonicalPath: readPath,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: paper.title,
        abstract: clamp(paper.abstract, 400),
        url: `${SITE}${readPath}`,
        datePublished: paper.date,
        author: paper.authors.map((a) => ({ "@type": "Person", name: a })),
        publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
        isPartOf: paper.journal ? { "@type": "Periodical", name: paper.journal } : undefined,
        identifier: paper.doi,
      },
      BREADCRUMB([
        { name: "Research", item: "/research" },
        { name: paper.title, item: readPath },
      ]),
    ],
  };
};


const SITE = "https://anoneurx.com";

/** Course titles/descriptions mirror the program cards on /university. */
const UNIVERSITY_PROGRAMS = [
  {
    title: "Artificial Intelligence",
    description:
      "Deep learning, natural language processing, computer vision and intelligent systems. Course material covers model training and evaluation.",
  },
  {
    title: "Robotics & Automation",
    description:
      "Kinematics, control and autonomous systems. Course material covers simulation and hardware integration.",
  },
  {
    title: "Space Technology",
    description:
      "Satellite systems, orbital mechanics and aerospace engineering. Course material covers ground segment design.",
  },
  {
    title: "Distributed Systems",
    description:
      "Consensus, smart contracts and peer-to-peer architectures. Course material covers protocol design and analysis.",
  },
];

const BREADCRUMB = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE}${it.item}`,
  })),
});

const SOFTWARE = (name: string, path: string, description: string, extra: object = {}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  url: `${SITE}${path}`,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
  ...extra,
});

const humanize = (s?: string) =>
  (s || "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Display names are authored in the registry (e.g. "LYNX", "Black Wall OS"). */
const projectName = (id?: string) =>
  projects.find((p) => p.id === id)?.name ?? humanize(id);

/** Titles and per-page blurbs for /opensource/:id/:subPage. */
const SUBPAGE_META: Record<string, { title: string; description: string }> = {
  features: { title: "Features", description: "Capabilities and technical highlights" },
  download: { title: "Download", description: "Releases, artefacts and install instructions" },
  demo: { title: "Demo", description: "A guided walkthrough of the interface" },
  changelog: { title: "Changelog", description: "Release history and version notes" },
  roadmap: { title: "Roadmap", description: "What ships next" },
  faq: { title: "FAQ", description: "Frequently asked questions" },
  security: { title: "Security", description: "Disclosure policy and threat model" },
  privacy: { title: "Privacy Policy", description: "Data practices" },
  contributors: { title: "Contributors", description: "Maintainers, contributors and testers" },
};

const PERSON = (name: string, path: string, jobTitle: string, department?: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  url: `${SITE}${path}`,
  jobTitle,
  worksFor: { "@type": "Organization", name: "Anoneurx", url: SITE },
  ...(department ? { memberOf: { "@type": "Organization", name: `Anoneurx ${department}` } } : {}),
});

const ARTICLE = (id: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: `Anoneurx Research Paper ${id}`,
  url: `${SITE}${path}`,
  publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
});

// Exact-path map. For dynamic routes we fall back to pattern matching below.
const map: Record<string, Entry> = {
  "/": {
    title: "Anoneurx — Black Wall OS, Nexora, Anoneurx Cloud & Open Source",
    description:
      "Anoneurx builds Black Wall OS, the Nexora browser, Anoneurx Cloud, Anoneurx Pay and the ASTRA research lab, and maintains open source developer tools and published research.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Anoneurx",
        url: SITE,
        logo: `${SITE}/assets/logo.jpeg`,
        sameAs: [],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Anoneurx",
        url: SITE,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE}/apps/browse?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  },
  "/blacklink": { title: "Anoneurx Black Link — Secure Server Management", description: "Securely connect to and manage your Linux infrastructure with Anoneurx Black Link." },
  "/blacklink/features": { title: "Features — Anoneurx Black Link", description: "Terminal, files, processes, services, metrics, logs, network and security — all through one secure connection." },
  "/blacklink/how-it-works": { title: "How It Works — Anoneurx Black Link", description: "Learn how Anoneurx Black Link orchestrates the dashboard, connection layer, Agent and Linux system." },
  "/blacklink/security": { title: "Security — Anoneurx Black Link", description: "Designed around trust: encrypted sessions, server identity, least privilege, capability-based access and auditability." },
  "/blacklink/agent": { title: "Anoneurx Black Link Agent", description: "Install the Anoneurx Black Link Agent and securely connect your Linux server to Anoneurx Black Link." },
  "/blacklink/docs": { title: "Documentation — Anoneurx Black Link", description: "Guides and references for installing, configuring and integrating Anoneurx Black Link." },
  "/blacklink/pricing": { title: "Pricing — Anoneurx Black Link", description: "Simple infrastructure. Transparent pricing. Plans coming soon." },
  "/blacklink/status": { title: "Status — Anoneurx Black Link", description: "Current state of Anoneurx Black Link services." },
  "/blacklink/changelog": { title: "Changelog — Anoneurx Black Link", description: "Release notes for Anoneurx Black Link." },
  "/blacklink/auth": { title: "Black Link Authentication — Anoneurx", description: "Sign in to Anoneurx Black Link." },
  "/about": { title: "About Anoneurx", description: "Anoneurx is a global software company shipping operating systems, AI, cloud and open source infrastructure for developers." },
  "/contact": { title: "Contact Anoneurx", description: "Get in touch with Anoneurx for partnerships, support, press or general enquiries." },
  "/people": { title: "Anoneurx Team — Engineers, Researchers & Designers", description: "Meet the engineers, researchers and designers of Anoneurx across every department." },
  "/careers": { title: "Careers at Anoneurx", description: "Join Anoneurx — engineering, research, design and operations roles across our global teams." },
  "/careers/join": { title: "Join Anoneurx", description: "Apply to open Anoneurx roles and become part of our global engineering team." },
  "/careers/hackathon": { title: "Anoneurx Hackathon", description: "Compete in the Anoneurx Hackathon — global challenges, prizes and recruitment fast-track." },
  "/careers/join-dev-team": { title: "Join the Anoneurx Dev Team", description: "Apply to join the core Anoneurx development team." },
  "/careers/other-opportunities": { title: "Other Opportunities at Anoneurx", description: "Fellowships, grants and partnerships beyond full-time roles." },
  "/internships": { title: "Anoneurx Internships", description: "Paid, remote-friendly internships across engineering, research, design and product." },
  "/hackathon": { title: "Anoneurx Hackathon", description: "Register for the Anoneurx global hackathon and build something remarkable." },
  "/community": { title: "Anoneurx Community", description: "Events, forums, mentorship and leaderboards — the Anoneurx developer community." },
  "/community/events": { title: "Community Events", description: "Upcoming meetups, workshops and conferences from the Anoneurx community." },
  "/community/events/upcoming": { title: "Upcoming Community Events", description: "Every upcoming Anoneurx community event in one place." },
  "/community/events/past": { title: "Past Community Events", description: "Recaps and recordings of past Anoneurx community events." },
  "/community/events/host": { title: "Host an Anoneurx Event", description: "Run a local Anoneurx meetup, workshop or hackathon — request sponsorship and swag." },
  "/community/leaderboard": { title: "Community Leaderboard", description: "Top Anoneurx community contributors ranked by activity and impact." },
  "/community/mentorship": { title: "Mentorship Program", description: "Apply for the Anoneurx mentorship program and grow alongside experienced engineers." },
  "/community/forums": { title: "Community Forums", description: "Discuss code, releases, roadmaps and ideas with the Anoneurx community." },
  "/blogs": { title: "Anoneurx Blog", description: "Product updates, engineering deep-dives and community stories from Anoneurx." },
  "/blogs/all": { title: "All Articles — Anoneurx Blog", description: "The full archive of Anoneurx blog posts across engineering, research and product." },
  "/docs": { title: "Documentation Hub — Guides, API Reference & Deployment", description: "Documentation hub for Anoneurx — guides, API reference and deployment instructions, plus per-product docs for Black Wall OS, Nexora, ATLAS and Anoneurx Cloud." },
  "/docs/getting-started": { title: "Getting Started — Anoneurx Documentation", description: "Install the Anoneurx toolchain, clone your first project and run it locally in under ten minutes." },
  "/docs/api-reference": { title: "API Reference — Anoneurx Documentation", description: "Endpoints, request and response shapes, authentication and rate limits for the public Anoneurx APIs." },
  "/docs/deployment": { title: "Deployment Guide — Anoneurx Documentation", description: "Build, configure and ship Anoneurx services to production, including environment and rollout guidance." },
  "/docs/contributions": { title: "Contribution Guide — Anoneurx Documentation", description: "How to report issues, propose changes and land a first contribution across Anoneurx repositories." },
  "/docs/blackwall": { title: "Black Wall OS Documentation", description: "Black Wall OS documentation — installation, syscall bindings, architecture and the enclave security model." },
  "/docs/nexora": { title: "Nexora Documentation", description: "Nexora browser documentation — configuration, sync, extensions and network privacy controls." },
  "/docs/atlas": { title: "ATLAS Documentation", description: "ATLAS compiler and GPU renderer documentation — toolchain setup, language reference and backend notes." },
  "/research": { title: "Anoneurx Research", description: "Applied research from Anoneurx across AI, systems, distributed compute and security." },
  "/view-in-journal": { title: "Research Journal — Anoneurx", description: "Browse published Anoneurx research papers in journal format." },
  "/strategic-kpis": { title: "Strategic KPIs — Anoneurx", description: "Anoneurx research strategy, milestones and KPIs." },
  "/opensource": {
    title: "Anoneurx Open Source — Projects, Libraries & Templates",
    description: "Explore Anoneurx open source — projects, libraries, packages, templates and VS Code extensions. Free forever, community-driven.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Anoneurx Open Source",
      url: `${SITE}/opensource`,
      description: "The Anoneurx open source ecosystem — projects, libraries, packages, templates and VS Code extensions.",
    },
  },
  "/opensource/about": { title: "About Anoneurx Open Source", description: "Why Anoneurx invests in open source and how the community is governed." },
  "/opensource/projects": { title: "Anoneurx Open Source Projects", description: "Every open source project maintained by Anoneurx and its community." },
  "/opensource/organizations": { title: "Open Source Organizations", description: "Organizations and working groups inside the Anoneurx open source ecosystem." },
  "/opensource/libraries": { title: "Open Source Libraries", description: "Reusable Anoneurx libraries you can drop into your project today." },
  "/opensource/packages": { title: "Open Source Packages", description: "Anoneurx packages across npm, cargo, pip and go registries." },
  "/opensource/templates": { title: "Open Source Templates", description: "Starter templates for every Anoneurx stack — CLI, web, edge and services." },
  "/opensource/vscode-extensions": { title: "VS Code Extensions", description: "Official Anoneurx VS Code extensions — language support, tokens and DevTools." },
  "/opensource/showcase": { title: "Showcase — Anoneurx Open Source", description: "Real products the community has built using Anoneurx open source projects." },
  "/opensource/roadmaps": { title: "Roadmaps — Anoneurx Open Source", description: "Public roadmaps for every major Anoneurx open source project." },
  "/opensource/releases": { title: "Releases — Anoneurx Open Source", description: "The latest releases and changelogs across Anoneurx open source." },
  "/opensource/discussions": { title: "Discussions — Anoneurx Open Source", description: "Community discussions, RFCs and support threads." },
  "/contributors": { title: "Anoneurx Contributors", description: "The engineers, designers and researchers who contribute to Anoneurx open source." },
  "/sponsors": { title: "Anoneurx Sponsors", description: "Companies and organizations that sponsor Anoneurx open source and community programs." },
  "/blackwall": {
    title: "Black Wall OS — Anoneurx Secure Operating System",
    description: "Black Wall is Anoneurx's privacy-first operating system: hardened Rust core, zero telemetry, blazing performance and blockchain-backed identity.",
    jsonLd: SOFTWARE("Black Wall OS", "/blackwall", "Privacy-first operating system with hardened kernel, zero telemetry and Rust core."),
  },
  "/blackwall/download": { title: "Download Black Wall OS", description: "Get Black Wall OS ISO images, checksums and installation guides." },
  "/blackwall/features": { title: "Black Wall OS Features", description: "Every feature of Black Wall OS — kernel, security, performance, DX." },
  "/blackwall/screenshots": { title: "Black Wall OS Screenshots", description: "Screenshots of the Black Wall desktop, terminal, installer and tooling." },
  "/blackwall/showcase": { title: "Black Wall Showcase", description: "Real hardware, real workloads — Black Wall in production." },
  "/blackwall/about": { title: "About Black Wall OS", description: "The mission, team and philosophy behind Black Wall OS." },
  "/blackwall/faq": { title: "Black Wall FAQ", description: "Frequently asked questions about Black Wall OS." },
  "/blackwall/architecture": { title: "Black Wall Architecture", description: "Kernel, userland and enclave architecture of Black Wall OS." },
  "/blackwall/security": { title: "Black Wall Security", description: "Security model, threat model and audits for Black Wall OS." },
  "/blackwall/performance": { title: "Black Wall Performance", description: "Boot times, memory footprint and workload benchmarks for Black Wall OS." },
  "/blackwall/server": {
    title: "Black Wall Server OS — Coming December 2026",
    description: "Black Wall Server OS — a hardened Anoneurx operating system for servers. Zero-trust, container-native, air-gap capable. Coming Dec 2026.",
    jsonLd: SOFTWARE("Black Wall Server OS", "/blackwall/server", "Hardened server operating system by Anoneurx. Zero-trust, container-native. Coming December 2026.", {
      releaseDate: "2026-12",
      applicationSubCategory: "ServerApplication",
    }),
  },
  "/nexora": { title: "Nexora — AI-Augmented Private Browser", description: "Nexora is the fast, private, AI-augmented browser from Anoneurx." },
  "/nexora/download": { title: "Download Nexora Browser", description: "Download Nexora for macOS, Windows and Linux." },
  "/nexora/features": { title: "Nexora Features", description: "Every feature in Nexora — AI, privacy, performance and productivity." },
  "/nexora/screenshots": { title: "Nexora Screenshots", description: "Screenshots of the Nexora browser interface." },
  "/nexora/about": { title: "About Nexora", description: "The mission and roadmap behind Nexora." },
  "/nexora/faq": { title: "Nexora FAQ", description: "Frequently asked questions about Nexora." },
  "/nexora/docs": { title: "Nexora Documentation", description: "Guides, references and API docs for Nexora." },
  "/nexora/changelog": { title: "Nexora Changelog", description: "Release notes for every Nexora version." },
  "/nexora/community": { title: "Nexora Community", description: "Join the Nexora community — forums, chat and events." },
  "/nexora/help": { title: "Nexora Help Center", description: "Troubleshooting, setup and support for Nexora." },
  "/nexora/privacy": { title: "Nexora Privacy Policy", description: "How Nexora protects your data — the privacy policy in full." },
  "/nexora/terms": { title: "Nexora Terms of Service", description: "The terms of service for using Nexora." },
  "/nexora/security": { title: "Nexora Security", description: "The Nexora security model, disclosures and bug bounty." },
  "/nexora/compare": { title: "Nexora vs Other Browsers", description: "How Nexora stacks up against Chrome, Firefox, Edge, Brave and Safari." },
  "/nexora/developers": { title: "Nexora for Developers", description: "Build extensions and web experiences for Nexora." },
  "/nexora/blog": { title: "Nexora Blog", description: "Product updates and engineering deep-dives from the Nexora team." },
  "/nexora-ai": { title: "Nexora AI", description: "The Nexora AI assistant — private, local and lightning fast." },
  "/switch-to-nexora": { title: "Switch to Nexora", description: "Import your bookmarks, history and passwords from any browser in one click." },
  "/why-nexora": { title: "Why Nexora", description: "The four reasons developers switch to Nexora." },
  "/atlas": { title: "ATLAS Language — Anoneurx", description: "ATLAS is Anoneurx's systems programming language with memory safety and zero-cost abstractions." },
  "/astra": {
    title: "ASTRA — Self-Learning AI Research (Anoneurx Lab)",
    description: "ASTRA is an Anoneurx Lab research project in self-learning AI — a model that records, reflects and improves from its own experience. 20B parameters today, architected for a 1T target. In development.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ResearchProject",
      name: "ASTRA",
      alternateName: "Anoneurx Self-Teaching Research AI",
      url: `${SITE}/astra`,
      description: "An Anoneurx Lab research project exploring models that learn continuously from experience. Current research scale: 20B parameters. Long-term architectural target: 1T parameters.",
      isPartOf: { "@type": "Organization", name: "Anoneurx Lab", url: `${SITE}/lab` },
    },
  },
  "/astra/what-is": { title: "What is ASTRA? — Self-Learning AI Explained (Anoneurx Lab)", description: "What ASTRA is, what it is not, and the honest current state of this self-learning AI research project from Anoneurx Lab." },
  "/astra/learning-loop": { title: "ASTRA Learning Loop — The Continual Learning Cycle (Anoneurx Lab)", description: "Perceive, reason, act, record, reflect, improve — the continual learning loop that lets ASTRA improve from real experience." },
  "/astra/scale": { title: "ASTRA Model Scale — From 20B to 1T Parameters (Anoneurx Lab)", description: "ASTRA is built at 20B parameters and architected for a 1T long-term target — scale is stated honestly, no inflated claims." },
  "/astra/architecture": { title: "ASTRA System Architecture — Reasoning, Memory and Tools (Anoneurx Lab)", description: "The reference architecture of ASTRA: interface, looping core, memory and tools built around a continual reasoning loop." },
  "/astra/self-learning": { title: "ASTRA Self-Learning — Learning from Usage, Not Just Datasets (Anoneurx Lab)", description: "How ASTRA learns from usage — record, judge, update and consolidate — with guardrails, consent and no human retraining loop." },
  "/astra/memory": { title: "ASTRA Memory Pipeline — Episodic, Semantic and Procedural (Anoneurx Lab)", description: "ASTRA's episodic, semantic and procedural memory pipeline — how experience becomes lasting, recallable capability." },
  "/astra/research": { title: "ASTRA Open Research Modules — Eight AI Problems (Anoneurx Lab)", description: "The eight open research problems behind ASTRA: continual learning, task generation, memory, self-evaluation, skill compounding, alignment, efficiency and honest evaluation." },
  "/astra/status": { title: "ASTRA Project Status — Current Research Phase (Anoneurx Lab)", description: "The current, transparent status of ASTRA — phase, scale, learning method and evaluation state, reported as-is with no smoothing." },
  "/astra/log": { title: "ASTRA Development Log — Weekly AI Research Updates (Anoneurx Lab)", description: "ASTRA's development log — a running, honest record of what exists, what is active, and what does not." },
  "/astra/roadmap": { title: "ASTRA Roadmap — From Foundations to a 1T Target (Anoneurx Lab)", description: "Phases, not promises — ASTRA's roadmap from foundations and memory to task generation, 100B and the 1T architectural target." },
  "/astra/philosophy": { title: "ASTRA Principles — Honest, Consent-Based AI Development (Anoneurx Lab)", description: "Five principles ASTRA won't break: honesty, structural consent, capability before scale, transparency and safe self-improvement." },
  "/astra/lab": { title: "Anoneurx Lab — Home of ASTRA AI Research (Anoneurx Lab)", description: "ASTRA is built inside the Anoneurx Lab — the research lab behind open problems in AI, cyber-physical security, robotics and systems." },
  "/astra/contribute": { title: "Contribute to ASTRA — Open AI Research Roles (Anoneurx Lab)", description: "Contribute to ASTRA — open research problems, join the Anoneurx Lab, or review and critique the code and evaluation." },
  "/apps": { title: "Anoneurx Apps — Discover Powerful Apps", description: "The Anoneurx apps marketplace — curated apps from global developers, malware scanned and privacy focused." },
  "/apps/browse": { title: "Browse Apps — Anoneurx", description: "Browse every app on the Anoneurx marketplace." },
  "/apps/categories": { title: "App Categories — Anoneurx", description: "Discover apps by category on the Anoneurx marketplace." },
  "/apps/developers": { title: "Anoneurx Developers", description: "Ship your app on Anoneurx — publishing, revenue share and analytics." },
  "/apps/about": { title: "About Anoneurx Apps", description: "The story behind the Anoneurx apps marketplace." },
  "/apps/submit": { title: "Submit an App — Anoneurx", description: "Submit your app to the Anoneurx marketplace." },
  "/pay": { title: "Anoneurx Pay — Modern Digital Banking", description: "Anoneurx Pay is a global, modern digital banking platform for individuals and businesses." },
  "/pay/features": { title: "Anoneurx Pay Features", description: "Every feature of Anoneurx Pay — accounts, cards, transfers, savings and business tools." },
  "/pay/security": { title: "Anoneurx Pay Security", description: "How Anoneurx Pay protects your money — encryption, fraud detection and compliance." },
  "/pay/about": { title: "About Anoneurx Pay", description: "The mission and licences behind Anoneurx Pay." },
  "/pay/download": { title: "Download Anoneurx Pay", description: "Download the Anoneurx Pay app for iOS and Android." },
  "/pay/signup": { title: "Open an Anoneurx Pay Account", description: "Open a personal or business Anoneurx Pay account online in minutes." },
  "/pay/faq": { title: "Anoneurx Pay FAQ", description: "Frequently asked questions about Anoneurx Pay." },
  "/checkout": { title: "Checkout — Anoneurx", description: "Securely complete your payment on Anoneurx." },
  "/cloud": { title: "Anoneurx Cloud — Global Cloud Infrastructure", description: "Anoneurx Cloud — VMs, GPU servers, Kubernetes, object storage and CDN across global regions." },
  "/cloud/products": { title: "Anoneurx Cloud Products", description: "Every Anoneurx Cloud product — compute, storage, networking, AI and databases." },
  "/cloud/pricing": { title: "Anoneurx Cloud Pricing", description: "Transparent, predictable pricing across every Anoneurx Cloud product." },
  "/cloud/docs": { title: "Anoneurx Cloud Docs", description: "Guides, references and API docs for Anoneurx Cloud." },
  "/cloud/status": { title: "Anoneurx Cloud Status", description: "Live status of every Anoneurx Cloud region and service." },
  "/cloud/security": { title: "Anoneurx Cloud Security", description: "Compliance, certifications and security posture of Anoneurx Cloud." },
  "/cloud/compute/virtual-machines": { title: "Virtual Machines — Anoneurx Cloud", description: "High-performance VMs across global regions on Anoneurx Cloud." },
  "/cloud/compute/gpu-servers": { title: "GPU Servers — Anoneurx Cloud", description: "NVIDIA and AMD GPU servers for AI training and inference on Anoneurx Cloud." },
  "/cloud/compute/bare-metal": { title: "Bare Metal Servers — Anoneurx Cloud", description: "Dedicated bare metal servers with hourly billing on Anoneurx Cloud." },
  "/cloud/compute/kubernetes": { title: "Managed Kubernetes — Anoneurx Cloud", description: "Production-ready managed Kubernetes on Anoneurx Cloud." },
  "/cloud/storage/object": { title: "Object Storage — Anoneurx Cloud", description: "S3-compatible object storage on Anoneurx Cloud." },
  "/cloud/storage/block": { title: "Block Storage — Anoneurx Cloud", description: "High-performance NVMe block storage on Anoneurx Cloud." },
  "/cloud/storage/backup": { title: "Backup Vault — Anoneurx Cloud", description: "Encrypted backup vault with instant restore on Anoneurx Cloud." },
  "/cloud/storage/archive": { title: "Archive Storage — Anoneurx Cloud", description: "Cold archive storage at the best per-TB price on Anoneurx Cloud." },
  "/artificial-intelligence": { title: "Artificial Intelligence — Anoneurx", description: "Anoneurx AI — research, applied models, edge inference and enterprise deployments." },
  "/robotics-systems": { title: "Robotics Systems — Anoneurx", description: "Robotics research and platforms from Anoneurx — perception, control and autonomy." },
  "/space-projects": { title: "Space Projects — Anoneurx", description: "Anoneurx space projects — satellite imagery, ground stations and edge compute in orbit." },
  "/web-development": { title: "Web Development — Anoneurx", description: "Anoneurx builds high-performance web applications, platforms and design systems." },
  "/blockchain-systems": { title: "Blockchain Systems — Anoneurx", description: "Anoneurx builds blockchain infrastructure and applied cryptography systems." },
  "/operating-systems": { title: "Operating Systems — Anoneurx", description: "Every operating system from Anoneurx — Black Wall, Black Wall Server and more." },
  "/investment-opportunities": { title: "Investment Opportunities — Anoneurx", description: "Explore investment opportunities across the Anoneurx portfolio." },
  "/partnership-inquiry": { title: "Partnership Inquiry — Anoneurx", description: "Submit a partnership inquiry to Anoneurx." },
  "/collaboration": { title: "Collaborate with Anoneurx", description: "Research, product and enterprise collaboration with Anoneurx." },
  "/collaboration/form": { title: "Collaboration Form — Anoneurx", description: "Start a collaboration with Anoneurx." },
  "/university": {
    title: "Anoneurx University | Courses, Faculty & Programs",
    description: "Anoneurx University — degree programmes, certificates and short courses for the next generation of engineers.",
    jsonLd: [
      ...UNIVERSITY_PROGRAMS.map((program) => ({
        "@context": "https://schema.org",
        "@type": "Course",
        name: program.title,
        description: program.description,
        url: `${SITE}/university/programs`,
        inLanguage: "en",
        provider: {
          "@type": "EducationalOrganization",
          name: "Anoneurx University",
          url: `${SITE}/university`,
        },
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          category: "Free",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE}/university`,
        },
      })),
      BREADCRUMB([
        { name: "University", item: "/university" },
        { name: "Programs", item: "/university/programs" },
      ]),
    ],
  },
  "/courses": { title: "Courses — Anoneurx University", description: "Every course from Anoneurx University — engineering, AI, systems, design and more." },
  "/faculty": { title: "Anoneurx University Faculty — Professors & Researchers", description: "Meet the faculty behind Anoneurx University — professors, researchers and educators across every department." },
  "/notes": { title: "Notes — Anoneurx", description: "Study notes, cheatsheets and reference material curated by Anoneurx." },
  "/arcadeum": { title: "Anoneurx Arcadeum", description: "Anoneurx Arcadeum — indie games, engines and creator tools." },
  "/privacy": { title: "Privacy Policy — Anoneurx", description: "How Anoneurx protects your data — the privacy policy in full." },
  "/terms": { title: "Terms of Service — Anoneurx", description: "The terms of service for using Anoneurx products." },
  "/cookies": { title: "Cookie Policy — Anoneurx", description: "How Anoneurx uses cookies on its websites and apps." },
  "/auth": { title: "Sign in — Anoneurx", description: "Sign in to Anoneurx." },
  "/login": { title: "Log in — Anoneurx", description: "Log in to Anoneurx." },
  "/signup": { title: "Create your Anoneurx account", description: "Create a free Anoneurx account." },
  "/reportbug": { title: "Report a Bug — Anoneurx", description: "Report a bug in any Anoneurx product." },
  "/verify": {
    title: "Verify Anoneurx Participation",
    description: "Verify Anoneurx internship credentials, hackathon participation, developer team applications, and program opportunity records in real time. Official Anoneurx verification portal.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Anoneurx Verification Portal",
        url: `${SITE}/verify`,
        applicationCategory: "BusinessApplication",
        description: "Verify Anoneurx internship credentials and hackathon participation certificates in real time.",
        publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
      },
      BREADCRUMB([{ name: "Anoneurx", item: "/" }, { name: "Verify", item: "/verify" }]),
    ],
  },
  "/intern/verify": {
    title: "Verify Anoneurx Intern",
    description: "Verify an Anoneurx intern instantly. Confirm internship credentials, department, batch, status, certificates and service records using an intern ID or email address.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Anoneurx Internship Verification Portal",
        url: `${SITE}/verify?mode=internship`,
        applicationCategory: "BusinessApplication",
        description: "Verify Anoneurx intern credentials, certificates, and service records in real time using an intern ID or email address.",
        publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anoneurx", item: SITE },
          { "@type": "ListItem", position: 2, name: "Interns", item: `${SITE}/intern` },
          { "@type": "ListItem", position: 3, name: "Verify", item: `${SITE}/verify?mode=internship` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I verify an Anoneurx intern?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Enter the intern's ID or registered email address into the verification form at anoneurx.com/verify to instantly confirm their credentials.",
            },
          },
          {
            "@type": "Question",
            name: "What information does Anoneurx intern verification show?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Verification displays the intern's name, department, intern ID, email, batch, status (active/completed), institution, location, internship history, badges and awards.",
            },
          },
          {
            "@type": "Question",
            name: "Can I verify an Anoneurx internship certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Use the Anoneurx internship verification portal at anoneurx.com/verify?mode=internship to confirm the authenticity of any Anoneurx internship certificate or credential.",
            },
          },
        ],
      },
    ],
  },
  "/university/programs": { title: "Programs — Anoneurx University", description: "Degree programmes, certificates and short courses at Anoneurx University across engineering, AI, systems and design." },
  "/university/admissions": { title: "Admissions — Anoneurx University", description: "How to apply to Anoneurx University — intakes, requirements, scholarships and the step-by-step admissions timeline." },
  "/university/research": { title: "Research — Anoneurx University", description: "Research labs, groups and publications at Anoneurx University spanning AI, quantum, robotics and secure systems." },
  "/university/campus-life": { title: "Campus Life — Anoneurx University", description: "Student clubs, hackathons, labs, housing and community life at Anoneurx University." },
  "/university/faculty": { title: "Faculty — Anoneurx University", description: "Professors, researchers and lecturers of Anoneurx University with full academic portfolios." },
  "/university/contact": { title: "Contact Anoneurx University", description: "Reach Anoneurx University — admissions, faculty, registrar and student services at university@anoneurx.com." },
  "/university/support": { title: "Anoneurx University Support", description: "Help with enrolment, courses, certificates, billing and student accounts at Anoneurx University." },
  "/opensource/contact": { title: "Contact Anoneurx Open Source", description: "Reach the Anoneurx Open Source program — maintainers, security disclosure, sponsorship and community at opensource@anoneurx.com." },
  "/opensource/partnership-inquiry": { title: "Sponsor an Open Source Project — Anoneurx", description: "Fund the open source work behind Black Wall OS and Anoneurx. Choose a sponsorship tier, pick a project, and support the maintainers." },
  "/opensource/support": { title: "Anoneurx Open Source Support", description: "Help with Anoneurx open source projects — builds, packages, contributions, licensing and security reports." },
  "/opensource/contribute": { title: "Contribute to Anoneurx Open Source", description: "Start contributing to Anoneurx open source — good first issues, contribution workflow, review process and rewards." },
  "/opensource/contribute/apply": { title: "Apply to Contribute — Anoneurx Open Source", description: "Apply to join the Anoneurx open source contributor program — pick a project, area of interest and get matched with a maintainer." },
  "/blackwall/contact": { title: "Contact Black Wall OS", description: "Reach the Black Wall OS team — engineering, security disclosure, OEM and press at blackwall@anoneurx.com." },
  "/pay/contact": { title: "Contact Anoneurx Pay", description: "Reach Anoneurx Pay — accounts, disputes, business banking and compliance at pay@anoneurx.com." },
  "/pay/support": { title: "Anoneurx Pay Support", description: "Help with Anoneurx Pay — cards, transfers, disputes, verification and business accounts." },
  "/cloud/contact": { title: "Contact Anoneurx Cloud", description: "Reach Anoneurx Cloud — sales, architecture, billing and enterprise support at cloud@anoneurx.com." },

  "/ceo": {
    title: "Muhammad Qasim — Founder & CEO of Anoneurx",
    description: "Meet Muhammad Qasim, founder and CEO of Anoneurx — vision, leadership message, milestones and focus areas.",
    jsonLd: [
      PERSON("Muhammad Qasim", "/ceo", "Founder & Chief Executive Officer"),
      BREADCRUMB([{ name: "Anoneurx", item: "/" }, { name: "CEO", item: "/ceo" }]),
    ],
  },
  "/intern": { title: "Anoneurx Interns — Engineering, Research & Design", description: "Every Anoneurx intern across AI, Robotics, Cyber Security, Data Science and more." },
  "/opensource/repos": { title: "Repositories — Anoneurx Open Source", description: "Every public Anoneurx repository — stars, languages, activity and maintainers." },
  "/opensource/events": { title: "Events — Anoneurx Open Source", description: "Open source events, sprints and release parties from the Anoneurx community." },
  "/opensource/search": { title: "Search Anoneurx Open Source", description: "Search projects, repositories, libraries, packages, templates and events across Anoneurx open source." },
  "/blackwall/support": { title: "Black Wall OS Support", description: "Help with Black Wall OS — installation, drivers, hardening, updates and security reports." },
  "/pay/open-account": { title: "Anoneurx Pay Account Details", description: "Complete your Anoneurx Pay account details to finish opening your account." },
};

// Pattern-based fallbacks for dynamic routes
const patterns: { pattern: string; build: (params: Record<string, string | undefined>) => Entry }[] = [
  { pattern: "/blog/:id", build: (p) => ({ title: `Blog — ${p.id}`, description: "Read this article on the Anoneurx blog.", type: "article" }) },
  { pattern: "/read/:id", build: (p) => paperEntry(p.id, `/read/${p.id}`) },
  { pattern: "/read-paper/:id", build: (p) => paperEntry(p.id, `/read/${p.id}`) },
  { pattern: "/research/read/:id", build: (p) => paperEntry(p.id, `/read/${p.id}`) },
  { pattern: "/share/paper/:id", build: (p) => paperEntry(p.id, `/share/paper/${p.id}`) },
  { pattern: "/share/read/:id", build: (p) => paperEntry(p.id, `/share/read/${p.id}`) },
  { pattern: "/share/:paperId", build: (p) => paperEntry(p.paperId, `/share/${p.paperId}`) },

  { pattern: "/team/:name", build: (p) => ({ title: `${p.name} — Anoneurx Team`, description: `Team member profile: ${p.name}.` }) },
  { pattern: "/team/:dept/:name", build: (p) => ({ title: `${p.name} — Anoneurx ${p.dept}`, description: `${p.name} in the ${p.dept} team at Anoneurx.` }) },
  {
    pattern: "/people/:name",
    build: (p) => ({
      title: `${humanize(p.name)} — Anoneurx Team`,
      description: `${humanize(p.name)} at Anoneurx — role, department and focus areas.`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: humanize(p.name),
          url: `${SITE}/people/${p.name}`,
          jobTitle: "Team Member",
          worksFor: { "@type": "Organization", name: "Anoneurx", url: SITE },
          alternateName: `${humanize(p.name)} — Anoneurx`,
        },
        BREADCRUMB([{ name: "Team", item: "/people" }, { name: humanize(p.name), item: `/people/${p.name}` }]),
      ],
    }),
  },
  {
    pattern: "/people/:dept/:name",
    build: (p) => ({
      title: `${humanize(p.name)} — Anoneurx Team (${humanize(p.dept)})`,
      description: `${humanize(p.name)} works in the ${humanize(p.dept)} department at Anoneurx.`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: humanize(p.name),
          url: `${SITE}/people/${p.dept}/${p.name}`,
          jobTitle: `Team Member, ${humanize(p.dept)}`,
          worksFor: { "@type": "Organization", name: "Anoneurx", url: SITE },
          alternateName: `${humanize(p.name)} — Anoneurx`,
        },
        BREADCRUMB([
          { name: "Team", item: "/people" },
          { name: humanize(p.dept), item: `/people/${p.dept}` },
          { name: humanize(p.name), item: `/people/${p.dept}/${p.name}` },
        ]),
      ],
    }),
  },
  {
    pattern: "/faculty/:department/:name",
    build: (p) => ({
      title: `${humanize(p.name)} — Anoneurx University Faculty (${humanize(p.department)})`,
      description: `Faculty profile of ${humanize(p.name)} — education, position, research areas, publications and office hours at Anoneurx University.`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: humanize(p.name),
          url: `${SITE}/faculty/${p.department}/${p.name}`,
          jobTitle: `Professor, ${humanize(p.department)}`,
          worksFor: { "@type": "Organization", name: "Anoneurx University", url: SITE },
          affiliation: { "@type": "EducationalOrganization", name: "Anoneurx University" },
          alternateName: `${humanize(p.name)} — Anoneurx University`,
          memberOf: { "@type": "Organization", name: `Anoneurx ${humanize(p.department)}` },
        },
        BREADCRUMB([
          { name: "University", item: "/university" },
          { name: "Faculty", item: "/faculty" },
          { name: humanize(p.name), item: `/faculty/${p.department}/${p.name}` },
        ]),
      ],
    }),
  },
  {
    pattern: "/intern/:department/:name",
    build: (p) => ({
      title: `${humanize(p.name)} — Anoneurx ${humanize(p.department)} Intern`,
      description: `Intern profile of ${humanize(p.name)} — bio, internship history, open source contributions, certificates and badges.`,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: humanize(p.name),
          url: `${SITE}/intern/${p.department}/${p.name}`,
          jobTitle: `Intern, ${humanize(p.department)}`,
          worksFor: { "@type": "Organization", name: "Anoneurx", url: SITE },
          alternateName: `${humanize(p.name)} — Anoneurx`,
        },
        BREADCRUMB([
          { name: "Interns", item: "/intern" },
          { name: humanize(p.department), item: "/intern" },
          { name: humanize(p.name), item: `/intern/${p.department}/${p.name}` },
        ]),
      ],
    }),
  },
  {
    pattern: "/opensource/:id",
    build: (p) => {
      const name = projectName(p.id);
      return {
        title: `${name} — Anoneurx Open Source Project`,
        description: `README, activity, maintainers and releases for ${name}, an Anoneurx open source project.`,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name,
          url: `${SITE}/opensource/${p.id}`,
          codeRepository: `${SITE}/opensource/repos/${p.id}`,
        },
      };
    },
  },
  {
    pattern: "/opensource/:id/:subPage",
    build: (p) => {
      const name = projectName(p.id);
      const sub = SUBPAGE_META[p.subPage as string] ?? SUBPAGE_META.features;
      return {
        title: `${sub.title} — ${name}`,
        description: `${sub.description} for ${name}, an Anoneurx open source project.`,
        jsonLd: [
          BREADCRUMB([
            { name: "Open Source", item: "/opensource" },
            { name, item: `/opensource/${p.id}` },
            { name: sub.title, item: `/opensource/${p.id}/${p.subPage}` },
          ]),
        ],
      };
    },
  },
  {
    pattern: "/opensource/repos/:id",
    build: (p) => ({
      title: `${humanize(p.id)} — Anoneurx Repository`,
      description: `Source, language breakdown, contributors and releases for the ${humanize(p.id)} Anoneurx repository.`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: humanize(p.id),
        url: `${SITE}/opensource/repos/${p.id}`,
        codeRepository: `${SITE}/opensource/repos/${p.id}`,
      },
    }),
  },
  { pattern: "/courses/:courseId", build: (p) => ({ title: `Course — ${p.courseId}`, description: `Details, syllabus and enrolment for the ${p.courseId} course at Anoneurx University.` }) },
  { pattern: "/courses/:courseId/enroll", build: (p) => ({ title: `Enroll — ${p.courseId}`, description: `Enroll in the ${p.courseId} course at Anoneurx University.` }) },
  { pattern: "/community/events/:eventId", build: (p) => ({ title: `Event — ${p.eventId}`, description: `Anoneurx community event: ${p.eventId}.` }) },
  { pattern: "/community/events/past/:eventId", build: (p) => ({ title: `Past Event — ${p.eventId}`, description: `Recap of past Anoneurx community event: ${p.eventId}.` }) },
  { pattern: "/community/forums/:categoryId", build: (p) => ({ title: `Forum — ${p.categoryId}`, description: `Discussions in the ${p.categoryId} forum category.` }) },
  { pattern: "/docs/project/:projectId", build: (p) => ({ title: `Docs — ${p.projectId}`, description: `Documentation for the ${p.projectId} project.` }) },
  { pattern: "/challenge/:challengeId", build: (p) => ({ title: `Challenge — ${p.challengeId}`, description: `Details for the ${p.challengeId} community challenge.` }) },
  { pattern: "/reportbug/:product", build: (p) => ({ title: `Report a Bug — ${p.product}`, description: `Report a bug in ${p.product}.` }) },
  {
    pattern: "/blacklink",
    build: () => ({
      title: "Black Wall Black Link — Cloud Console",
      description: "Black Wall Black Link console — manage servers, storage, network, firewall, users and SSH keys.",
      jsonLd: [
        SOFTWARE("Black Wall Black Link", "/blacklink", "Cloud server management console for Black Wall OS."),
        BREADCRUMB([{ name: "Black Link", item: "/blacklink" }]),
      ],
    }),
  },
  {
    pattern: "/blacklink/:section",
    build: (p) => ({
      title: `Black Wall Black Link — ${humanize(p.section)}`,
      description: `Manage ${humanize(p.section)} in Black Wall Black Link console.`,
      jsonLd: [
        SOFTWARE("Black Wall Black Link", `/blacklink/${p.section}`, "Cloud server management console."),
        BREADCRUMB([
          { name: "Black Link", item: "/blacklink" },
          { name: humanize(p.section), item: `/blacklink/${p.section}` },
        ]),
      ],
    }),
  },
];

const NOINDEX_PREFIXES = ["/auth", "/login", "/signup", "/dashboard", "/blacklink/auth", "/blacklink/dashboard", "/apps/login", "/cloud/login", "/share/"];
const isNoindexPath = (p: string) => NOINDEX_PREFIXES.some((x) => p === x || p.startsWith(x));

const RouteSEO = () => {
  const { pathname } = useLocation();
  const noindex = isNoindexPath(pathname);

  const exact = map[pathname];
  if (exact) {
    return <SEO title={exact.title} description={exact.description} path={pathname} type={exact.type} jsonLd={exact.jsonLd} noindex={noindex || exact.noindex} />;
  }

  for (const p of patterns) {
    const match = matchPath(p.pattern, pathname);
    if (match) {
      const entry = p.build(match.params as Record<string, string | undefined>);
      return <SEO title={entry.title} description={entry.description} path={entry.canonicalPath ?? pathname} type={entry.type} jsonLd={entry.jsonLd} noindex={noindex || entry.noindex} />;

    }
  }

  // Fallback — still unique per pathname
  return <SEO title={undefined} description={undefined} path={pathname} noindex={noindex} />;
};

export default RouteSEO;