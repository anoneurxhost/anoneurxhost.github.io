import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "../dist");

const SRC = readFileSync(resolve(dist, "index.html"), "utf-8");

// Extract bundled JS and CSS references from built index.html
const jsMatch = SRC.match(/<script[^>]*src="(\/assets\/index-[^"]+\.js)"[^>]*><\/script>/);
const cssMatch = SRC.match(/<link[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/);
const jsPath = jsMatch ? jsMatch[1] : "/assets/index.js";
const cssPath = cssMatch ? cssMatch[1] : "/assets/index.css";

const SITE = "https://anoneurx.com";
// Every public page lives under this locale prefix (see src/lib/site.ts).
// Canonical pages are written under dist/en-us/… and additionally copied to
// their legacy unprefixed location so old URLs stay 200 and are canonicalised
// onto the new address by the client rewrite in src/main.tsx.
const LOCALE = "/en-us";
const PREVIEW_PORT = 4173;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;

// Section registry, mirroring src/lib/seoSections.ts. Section landing pages keep
// the brand prefix; pages inside a section are prefixed by the section instead:
//   /opensource      -> "ANONEURX | Open Source"
//   /opensource/lynx -> "OPEN SOURCE | LYNX"
const SEO_SECTIONS = [
  ["/nexora-ai", "Nexora AI", ["Nexora AI"]],
  ["/opensource", "Open Source", ["Open Source", "Opensource"]],
  ["/blackwall", "Black Wall", ["Black Wall", "Blackwall"]],
  ["/blacklink", "Black Link", ["Black Link", "Blacklink"]],
  ["/internships", "Internships", ["Internships"]],
  ["/university", "University", ["Anoneurx University", "University"]],
  ["/community", "Community", ["Anoneurx Community", "Community"]],
  ["/hackathon", "Hackathon", ["Anoneurx Hackathon", "Hackathon"]],
  ["/careers", "Careers", ["Careers"]],
  ["/research", "Research", ["Anoneurx Research", "Research"]],
  ["/cloud", "Anoneurx Cloud", ["Anoneurx Cloud", "Cloud"]],
  ["/astra", "ASTRA", ["ASTRA", "Astra"]],
  ["/nexora", "Nexora", ["Nexora"]],
  ["/courses", "Courses", ["Courses"]],
  ["/faculty", "Faculty", ["Faculty"]],
  ["/intern", "Interns", ["Anoneurx Interns", "Interns"]],
  ["/people", "People", ["Anoneurx Team", "People"]],
  ["/arcadeum", "Arcadeum", ["Anoneurx Arcadeum", "Arcadeum"]],
  ["/connect", "Connect", ["Anoneurx Connect", "Connect"]],
  ["/docs", "Documentation", ["Documentation", "Docs"]],
  ["/benchmark", "Benchmarks", ["Benchmarks", "Benchmark"]],
  ["/apps", "Apps", ["Anoneurx Apps", "Apps"]],
  ["/blogs", "Blog", ["Anoneurx Blog", "Blog"]],
  ["/pay", "Anoneurx Pay", ["Pay"]],
  ["/lab", "Lab", ["Anoneurx Lab", "Lab"]],
  ["/notes", "Notes", ["Notes"]],
  ["/atlas", "ATLAS", ["ATLAS Language", "ATLAS"]],
];

const findSection = (pathname) =>
  SEO_SECTIONS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`)) ?? null;

// Strips brand and section noise so a title never reads
// "OPEN SOURCE | Anoneurx Open Source Projects". Section-phrase stripping is
// skipped on section landing pages, where the product name is the whole title.
const cleanPageLabel = (raw, sectionWords, stripSection) => {
  let label = String(raw || "")
    .replace(/\s*[([][^)\]]*anoneurx[^)\]]*[)\]]\s*$/i, "")
    .replace(/\s[—–·|]+\s*anoneurx\b[^—–·|]*$/i, "")
    .replace(/\s+anoneurx$/i, "")
    .replace(/\s*\|\s*anoneurx\s*$/i, "")
    .trim()
    .replace(/^anoneurx\s+/i, "")
    .trim();

  if (stripSection) {
    for (const word of sectionWords ?? []) {
      const stripped = label.replace(new RegExp(`^${word}\\s+`, "i"), "").trim();
      if (stripped !== label && stripped.replace(/[^\p{L}\p{N}]/gu, "").length >= 3) {
        label = stripped;
        break;
      }
    }
  }
  return label.replace(/^[—–·|\s]+/, "").trim();
};

const formatTitle = (t, pathname = "/") => {
  const section = findSection(pathname);
  const isRoot = !section || pathname === section[0] || pathname === `${section[0]}/`;
  const label = cleanPageLabel(t, section?.[2], !isRoot);
  if (!label) return "ANONEURX";
  return isRoot ? `ANONEURX | ${label}` : `${section[1].toUpperCase()} | ${label}`;
};

// Public indexable routes and their customized head SEO tags
const BLOG_POST_ROUTES = [
  {
    path: "/lab/blog/robot-perception-self-trust",
    title: "Grounding robot perception in doubt — Anoneurx Lab",
    description:
      "A robot that cannot tell when its own perception is unreliable is a hazard. We argue for a self-trust layer that reasons about contradictions across sensors.",
  },
  {
    path: "/lab/blog/self-learning-security-baseline",
    title: "Teaching a system its own definition of normal — Anoneurx Lab",
    description:
      "Hand-written security rules go stale the moment a deployment changes. Early lessons from building a security baseline that learns itself.",
  },
  {
    path: "/lab/blog/quantizing-bert-256kb",
    title: "Fitting a language model into 256 kilobytes — Anoneurx Lab",
    description:
      "Our 4.2-bit BERT reaches 94.1% accuracy inside 256 KB of RAM on a Cortex-M4. What the accuracy-vs-bits curve actually looks like.",
  },
  {
    path: "/lab/blog/federated-learning-privacy-accounting",
    title: "Privacy accounting in practice — Anoneurx Lab",
    description:
      "What differential privacy budgets mean when twelve simulated hospitals train one chest X-ray model through federated learning.",
  },
  {
    path: "/lab/blog/adversarial-code-assistants",
    title: "Attacking the assistant — Anoneurx Lab",
    description:
      "The prompt shapes that steer LLM code assistants toward insecure output — and the defense that actually moved the needle.",
  },
  {
    path: "/lab/blog/cyber-physical-threat-horizon",
    title: "Measuring the threat horizon — Anoneurx Lab",
    description:
      "Between the first anomalous signal and the physical damage there is a window. We want to measure it and make it a first-class security metric.",
  },
  {
    path: "/lab/blog/why-we-publish-open-problems",
    title: "Why we publish our open problems — Anoneurx Lab",
    description:
      "Every problem on our board is published with its research gap, its weaknesses and its unanswered questions. Here is what that buys.",
  },
  {
    path: "/lab/blog/astra-learning-loop",
    title: "The ASTRA learning loop — Anoneurx Lab",
    description:
      "ASTRA is our research project on self-learning AI — a model built to remember its experience and improve behaviour across episodes.",
  },
];

const routes = [
  {
    path: "/",
    title: "Anoneurx",
    description: "Anoneurx builds Black Wall OS, the Nexora browser, Anoneurx Cloud, Anoneurx Pay and the ASTRA research lab, and maintains open source developer tools and published research.",
    ogImage: "/og-images/og-home.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Anoneurx",
        url: SITE,
        logo: `${SITE}/assets/logo.png`,
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
  {
    path: "/about",
    title: "About Anoneurx",
    description: "Anoneurx is a global software company shipping operating systems, AI, cloud and open source infrastructure for developers.",
  },
  {
    path: "/contact",
    title: "Contact Anoneurx",
    description: "Get in touch with Anoneurx for partnerships, support, press or general enquiries.",
  },
  {
    path: "/verify",
    title: "Verify Anoneurx Participation",
    description: "Verify Anoneurx internship credentials, hackathon participation, developer team applications, and program opportunity records in real time. Official Anoneurx verification portal.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Anoneurx Verification Portal",
        url: `${SITE}/verify`,
        applicationCategory: "BusinessApplication",
        description: "Verify Anoneurx internship credentials, hackathon participation, and program records in real time.",
        publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I verify an Anoneurx credential?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Select your credential type (Internship or Hackathon) and enter your ID or registered email address at anoneurx.com/verify to view instant digital verification.",
            },
          },
          {
            "@type": "Question",
            name: "What details are displayed on verification?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Verification confirms full name, ID, status (Active/Completed), track/department, issue date, verified badges, and authentic digital seals.",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/intern",
    title: "Anoneurx Interns — Engineering, Research & Design",
    description: "Every Anoneurx intern across AI, Robotics, Cyber Security, Data Science and Web Engineering.",
  },
  {
    path: "/intern/ANX26INTSE044",
    title: "Insha — Anoneurx Software Engineering Intern",
    description: "Intern profile of Insha — Software Engineering student at Lahore College For Women University Lahore. Department: Software Engineering, Batch: 2026 Summer, Status: Completed.",
  },
  {
    path: "/people",
    title: "Anoneurx Team — Engineers, Researchers & Designers",
    description: "Meet the engineers, researchers and designers of Anoneurx across every department.",
  },
  {
    path: "/ceo",
    title: "Muhammad Qasim — Founder & CEO of Anoneurx",
    description: "Meet Muhammad Qasim, founder and CEO of Anoneurx — vision, leadership message, milestones and focus areas.",
  },
  {
    path: "/careers",
    title: "Careers at Anoneurx",
    description: "Join Anoneurx — engineering, research, design and operations roles across our global teams.",
  },
  {
    path: "/careers/join",
    title: "Join Anoneurx",
    description: "Apply to open Anoneurx roles and become part of our global engineering team.",
  },
  {
    path: "/careers/join-dev-team",
    title: "Join the Anoneurx Dev Team",
    description: "Apply to join the core Anoneurx development team.",
  },
  {
    path: "/careers/other-opportunities",
    title: "Other Opportunities at Anoneurx",
    description: "Fellowships, grants and partnerships beyond full-time roles.",
  },
  {
    path: "/other-opportunities",
    title: "Other Opportunities — Anoneurx",
    description: "Fellowships, grants, incubation and global exchange opportunities at Anoneurx.",
  },
  {
    path: "/internships",
    title: "Anoneurx Internships",
    description: "Paid, remote-friendly internships across engineering, research, design and product.",
  },
  {
    path: "/hackathon",
    title: "Anoneurx Hackathon",
    description: "Register for the Anoneurx global hackathon and build something remarkable.",
  },
  {
    path: "/research",
    title: "Anoneurx Research",
    description: "Applied research from Anoneurx across AI, systems, distributed compute and security.",
    ogImage: "/og-images/research-og-image.png",
  },
  {
    path: "/view-in-journal",
    title: "Research Journal — Anoneurx",
    description: "Browse published Anoneurx research papers in journal format.",
  },
  {
    path: "/read/vwxyz",
    title: "Advanced Neural Networks for Autonomous Navigation Systems — Anoneurx Research",
    description: "Research paper by Dr. Sarah Chen, Prof. Michael Rodriguez, Dr. Aisha Patel. Published in Journal of Artificial Intelligence Research.",
  },
  {
    path: "/read/abcde",
    title: "Transformer Models for Real-Time Language Translation in Space Communications — Anoneurx Research",
    description: "Research paper by Dr. Elena Kowalski, Prof. Zhang Wei, Dr. Marcus Johnson. Published in Nature Machine Intelligence.",
  },
  {
    path: "/read/qmzkl",
    title: "Robotic Swarm Intelligence for Space Exploration Missions — Anoneurx Research",
    description: "Research paper by Dr. James Liu, Prof. Elena Volkov, Dr. Ahmed Hassan. Published in IEEE Transactions on Robotics.",
  },
  {
    path: "/read/qcsat",
    title: "Quantum Computing Applications in Satellite Communication — Anoneurx Research",
    description: "Research paper by Dr. Maria Gonzalez, Prof. David Kim, Dr. Lisa Thompson. Published in Nature Quantum Information.",
  },
  {
    path: "/read/q6gwn",
    title: "6G Wireless Networks: Quantum-Enhanced Communication Protocols — Anoneurx Research",
    description: "Research paper by Dr. Alex Thompson, Prof. Yuki Tanaka, Dr. Sophie Martin. Published in IEEE Communications Magazine.",
  },
  {
    path: "/read/ugxyb",
    title: "Decentralized Edge Compute Architecture for Planetary Rovers — Anoneurx Research",
    description: "Research paper on fault-tolerant distributed compute nodes for rover autonomy in deep space environments.",
  },
  {
    path: "/read/xnnpa",
    title: "Zero-Knowledge Identity Verification in Privacy-First OS Kernels — Anoneurx Research",
    description: "Research paper exploring z-SNARK identity proofs embedded into microkernel system calls.",
  },
  {
    path: "/read/wsgwb",
    title: "Sub-Millisecond Neural Network Quantization for Embedded Spaceflight Hardware — Anoneurx Research",
    description: "Research paper detailing ultra-low power FP8 neural network inference for radiation-hardened satellite processors.",
  },
  {
    path: "/blogs",
    title: "Anoneurx Blog",
    description: "Product updates, engineering deep-dives and community stories from Anoneurx.",
  },
  {
    path: "/docs",
    title: "Documentation Hub — Guides, API Reference & Deployment",
    description:
      "Documentation hub for Anoneurx — guides, API reference and deployment instructions, plus per-product docs for Black Wall OS, Nexora, ATLAS and Anoneurx Cloud.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Anoneurx Documentation",
        url: `${SITE}/docs`,
        description:
          "Documentation hub for Anoneurx — guides, API reference and deployment instructions, plus per-product docs.",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Docs", item: `${SITE}/docs` }],
      },
    ],
  },
  {
    path: "/docs/getting-started",
    title: "Getting Started — Anoneurx Documentation",
    description:
      "Install the Anoneurx toolchain, clone your first project and run it locally in under ten minutes.",
  },
  {
    path: "/docs/api-reference",
    title: "API Reference — Anoneurx Documentation",
    description:
      "Endpoints, request and response shapes, authentication and rate limits for the public Anoneurx APIs.",
  },
  {
    path: "/docs/deployment",
    title: "Deployment Guide — Anoneurx Documentation",
    description:
      "Build, configure and ship Anoneurx services to production, including environment and rollout guidance.",
  },
  {
    path: "/docs/contributions",
    title: "Contribution Guide — Anoneurx Documentation",
    description:
      "How to report issues, propose changes and land a first contribution across Anoneurx repositories.",
  },
  {
    path: "/docs/blackwall",
    title: "Black Wall OS Documentation",
    description:
      "Black Wall OS documentation — installation, syscall bindings, architecture and the enclave security model.",
  },
  {
    path: "/docs/nexora",
    title: "Nexora Documentation",
    description:
      "Nexora browser documentation — configuration, sync, extensions and network privacy controls.",
  },
  {
    path: "/docs/atlas",
    title: "ATLAS Documentation",
    description: "ATLAS compiler and GPU renderer documentation — toolchain setup, language reference and backend notes.",
  },
  {
    path: "/benchmark",
    title: "Benchmarks — Anoneurx",
    description: "Reproducible benchmarks for Anoneurx systems, including LYNX search quality, latency, indexing and crawler performance.",
    ogImage: "/og-images/og-image.png",
  },
  {
    path: "/benchmark/lynx",
    title: "LYNX Benchmarks — Anoneurx",
    description: "Standardized benchmarks for LYNX search quality, API latency, index building, crawler throughput and hardware baselines.",
    ogImage: "/og-images/og-image.png",
  },
  {
    path: "/blogs/all",
    title: "All Articles — Anoneurx Blog",
    description: "The full archive of Anoneurx blog posts across engineering, research and product.",
  },
  {
    path: "/blackwall",
    title: "Black Wall OS — Anoneurx Secure Operating System",
    description: "Black Wall is Anoneurx's privacy-first operating system: hardened Rust core, zero telemetry, blazing performance and blockchain-backed identity.",
    ogImage: "/og-images/blackwall/og-imageblackwall.jpg",
  },
  {
    path: "/blackwall/download",
    title: "Download Black Wall OS",
    description: "Get Black Wall OS ISO images, checksums and installation guides.",
  },
  {
    path: "/blackwall/features",
    title: "Black Wall OS Features",
    description: "Every feature of Black Wall OS — kernel, security, performance, DX.",
  },
  {
    path: "/blackwall/screenshots",
    title: "Black Wall OS Screenshots",
    description: "Screenshots of the Black Wall desktop, terminal, installer and tooling.",
  },
  {
    path: "/blackwall/showcase",
    title: "Black Wall Showcase",
    description: "Real hardware, real workloads — Black Wall in production.",
  },
  {
    path: "/blackwall/about",
    title: "About Black Wall OS",
    description: "The mission, team and philosophy behind Black Wall OS.",
  },
  {
    path: "/blackwall/faq",
    title: "Black Wall FAQ",
    description: "Frequently asked questions about Black Wall OS.",
  },
  {
    path: "/blackwall/architecture",
    title: "Black Wall Architecture",
    description: "Kernel, userland and enclave architecture of Black Wall OS.",
  },
  {
    path: "/blackwall/security",
    title: "Black Wall Security",
    description: "Security model, threat model and audits for Black Wall OS.",
  },
  {
    path: "/blackwall/performance",
    title: "Black Wall Performance",
    description: "Boot times, memory footprint and workload benchmarks for Black Wall OS.",
  },
  {
    path: "/blackwall/server",
    title: "Black Wall Server OS — Coming December 2026",
    description: "Black Wall Server OS — a hardened Anoneurx operating system for servers. Zero-trust, container-native, air-gap capable.",
  },
  {
    path: "/blackwall/install",
    title: "Install Black Wall OS",
    description: "Step-by-step installation instructions for Black Wall OS.",
  },
  {
    path: "/blackwall/support",
    title: "Black Wall OS Support",
    description: "Help with Black Wall OS — installation, drivers, hardening and updates.",
  },
  {
    path: "/blackwall/contact",
    title: "Contact Blackwall OS",
    description: "Reach the Blackwall OS team — engineering, security disclosure, OEM and press.",
  },
  {
    path: "/docs/blackwall",
    title: "Black Wall OS Documentation",
    description: "Guides, kernel specs, shell manual and developer docs for Black Wall OS.",
  },
  {
    path: "/nexora",
    title: "Nexora — AI-Augmented Private Browser",
    description: "Nexora is the fast, private, AI-augmented browser from Anoneurx.",
  },
  {
    path: "/nexora/download",
    title: "Download Nexora Browser",
    description: "Download Nexora for macOS, Windows and Linux.",
  },
  {
    path: "/nexora/features",
    title: "Nexora Features",
    description: "Every feature in Nexora — AI, privacy, performance and productivity.",
  },
  {
    path: "/nexora/screenshots",
    title: "Nexora Screenshots",
    description: "Screenshots of the Nexora browser interface.",
  },
  {
    path: "/nexora/about",
    title: "About Nexora",
    description: "The mission and roadmap behind Nexora.",
  },
  {
    path: "/nexora/faq",
    title: "Nexora FAQ",
    description: "Frequently asked questions about Nexora.",
  },
  {
    path: "/docs/nexora",
    title: "Nexora Documentation",
    description: "Guides, references and API docs for Nexora.",
  },
  {
    path: "/nexora/changelog",
    title: "Nexora Changelog",
    description: "Release notes for every Nexora version.",
  },
  {
    path: "/nexora/community",
    title: "Nexora Community",
    description: "Join the Nexora community — forums, chat and events.",
  },
  {
    path: "/nexora/help",
    title: "Nexora Help Center",
    description: "Troubleshooting, setup and support for Nexora.",
  },
  {
    path: "/nexora/privacy",
    title: "Nexora Privacy Policy",
    description: "How Nexora protects your data — the privacy policy in full.",
  },
  {
    path: "/nexora/terms",
    title: "Nexora Terms of Service",
    description: "The terms of service for using Nexora.",
  },
  {
    path: "/nexora/security",
    title: "Nexora Security",
    description: "The Nexora security model, disclosures and bug bounty.",
  },
  {
    path: "/nexora/compare",
    title: "Nexora vs Other Browsers",
    description: "How Nexora stacks up against Chrome, Firefox, Edge, Brave and Safari.",
  },
  {
    path: "/nexora/developers",
    title: "Nexora for Developers",
    description: "Build extensions and web experiences for Nexora.",
  },
  {
    path: "/nexora/blog",
    title: "Nexora Blog",
    description: "Product updates and engineering deep-dives from the Nexora team.",
  },
  {
    path: "/nexora-ai",
    title: "Nexora AI",
    description: "The Nexora AI assistant — private, local and lightning fast.",
  },
  {
    path: "/switch-to-nexora",
    title: "Switch to Nexora",
    description: "Import your bookmarks, history and passwords from any browser in one click.",
  },
  {
    path: "/why-nexora",
    title: "Why Nexora",
    description: "The four reasons developers switch to Nexora.",
  },
  {
    path: "/atlas",
    title: "ATLAS Language — Anoneurx",
    description: "ATLAS is Anoneurx's systems programming language with memory safety and zero-cost abstractions.",
  },
  {
    path: "/astra",
    title: "ASTRA — Self-Learning AI Research (Anoneurx Lab)",
    description: "ASTRA is an Anoneurx Lab research project in self-learning AI — a model that records, reflects and improves from its own experience. 20B parameters today, architected for a 1T target. In development.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ResearchProject",
        name: "ASTRA",
        alternateName: "Anoneurx Self-Teaching Research AI",
        url: `${SITE}/astra`,
        description: "An Anoneurx Lab research project exploring models that learn continuously from experience. Current research scale: 20B parameters. Long-term architectural target: 1T parameters.",
        isPartOf: { "@type": "Organization", name: "Anoneurx Lab", url: `${SITE}/lab` },
      },
    ],
  },
  { path: "/astra/what-is", title: "What is ASTRA? — Self-Learning AI Explained (Anoneurx Lab)", description: "What ASTRA is, what it is not, and the honest current state of this self-learning AI research project from Anoneurx Lab." },
  { path: "/astra/learning-loop", title: "ASTRA Learning Loop — The Continual Learning Cycle (Anoneurx Lab)", description: "Perceive, reason, act, record, reflect, improve — the continual learning loop that lets ASTRA improve from real experience." },
  { path: "/astra/scale", title: "ASTRA Model Scale — From 20B to 1T Parameters (Anoneurx Lab)", description: "ASTRA is built at 20B parameters and architected for a 1T long-term target — scale is stated honestly, no inflated claims." },
  { path: "/astra/architecture", title: "ASTRA System Architecture — Reasoning, Memory and Tools (Anoneurx Lab)", description: "The reference architecture of ASTRA: interface, looping core, memory and tools built around a continual reasoning loop." },
  { path: "/astra/self-learning", title: "ASTRA Self-Learning — Learning from Usage, Not Just Datasets (Anoneurx Lab)", description: "How ASTRA learns from usage — record, judge, update and consolidate — with guardrails, consent and no human retraining loop." },
  { path: "/astra/memory", title: "ASTRA Memory Pipeline — Episodic, Semantic and Procedural (Anoneurx Lab)", description: "ASTRA's episodic, semantic and procedural memory pipeline — how experience becomes lasting, recallable capability." },
  { path: "/astra/research", title: "ASTRA Open Research Modules — Eight AI Problems (Anoneurx Lab)", description: "The eight open research problems behind ASTRA: continual learning, task generation, memory, self-evaluation, skill compounding, alignment, efficiency and honest evaluation." },
  { path: "/astra/status", title: "ASTRA Project Status — Current Research Phase (Anoneurx Lab)", description: "The current, transparent status of ASTRA — phase, scale, learning method and evaluation state, reported as-is with no smoothing." },
  { path: "/astra/log", title: "ASTRA Development Log — Weekly AI Research Updates (Anoneurx Lab)", description: "ASTRA's development log — a running, honest record of what exists, what is active, and what does not." },
  { path: "/astra/roadmap", title: "ASTRA Roadmap — From Foundations to a 1T Target (Anoneurx Lab)", description: "Phases, not promises — ASTRA's roadmap from foundations and memory to task generation, 100B and the 1T architectural target." },
  { path: "/astra/philosophy", title: "ASTRA Principles — Honest, Consent-Based AI Development (Anoneurx Lab)", description: "Five principles ASTRA won't break: honesty, structural consent, capability before scale, transparency and safe self-improvement." },
  { path: "/astra/lab", title: "Anoneurx Lab — Home of ASTRA AI Research (Anoneurx Lab)", description: "ASTRA is built inside the Anoneurx Lab — the research lab behind open problems in AI, cyber-physical security, robotics and systems." },
  { path: "/astra/contribute", title: "Contribute to ASTRA — Open AI Research Roles (Anoneurx Lab)", description: "Contribute to ASTRA — open research problems, join the Anoneurx Lab, or review and critique the code and evaluation." },
  {
    path: "/docs/atlas",
    title: "ATLAS Documentation — Anoneurx",
    description: "Language specification, tutorials and compiler documentation for ATLAS.",
  },
  {
    path: "/cloud",
    title: "Anoneurx Cloud — Global Cloud Infrastructure",
    description: "Anoneurx Cloud — VMs, GPU servers, Kubernetes, object storage and CDN across global regions.",
  },
  {
    path: "/cloud/products",
    title: "Anoneurx Cloud Products",
    description: "Every Anoneurx Cloud product — compute, storage, networking, AI and databases.",
  },
  {
    path: "/cloud/pricing",
    title: "Anoneurx Cloud Pricing",
    description: "Transparent, predictable pricing across every Anoneurx Cloud product.",
  },
  {
    path: "/cloud/docs",
    title: "Anoneurx Cloud Docs",
    description: "Guides, references and API docs for Anoneurx Cloud.",
  },
  {
    path: "/cloud/status",
    title: "Anoneurx Cloud Status",
    description: "Live status of every Anoneurx Cloud region and service.",
  },
  {
    path: "/cloud/security",
    title: "Anoneurx Cloud Security",
    description: "Compliance, certifications and security posture of Anoneurx Cloud.",
  },
  {
    path: "/cloud/contact",
    title: "Contact Anoneurx Cloud",
    description: "Reach Anoneurx Cloud — sales, architecture, billing and enterprise support.",
  },
  {
    path: "/cloud/compute/virtual-machines",
    title: "Virtual Machines — Anoneurx Cloud",
    description: "High-performance VMs across global regions on Anoneurx Cloud.",
  },
  {
    path: "/cloud/compute/gpu-servers",
    title: "GPU Servers — Anoneurx Cloud",
    description: "NVIDIA and AMD GPU servers for AI training and inference on Anoneurx Cloud.",
  },
  {
    path: "/cloud/compute/bare-metal",
    title: "Bare Metal Servers — Anoneurx Cloud",
    description: "Dedicated bare metal servers with hourly billing on Anoneurx Cloud.",
  },
  {
    path: "/cloud/compute/kubernetes",
    title: "Managed Kubernetes — Anoneurx Cloud",
    description: "Production-ready managed Kubernetes on Anoneurx Cloud.",
  },
  {
    path: "/cloud/storage/object",
    title: "Object Storage — Anoneurx Cloud",
    description: "S3-compatible object storage on Anoneurx Cloud.",
  },
  {
    path: "/cloud/storage/block",
    title: "Block Storage — Anoneurx Cloud",
    description: "High-performance NVMe block storage on Anoneurx Cloud.",
  },
  {
    path: "/cloud/storage/backup",
    title: "Backup Vault — Anoneurx Cloud",
    description: "Encrypted backup vault with instant restore on Anoneurx Cloud.",
  },
  {
    path: "/cloud/storage/archive",
    title: "Archive Storage — Anoneurx Cloud",
    description: "Cold archive storage at the best per-TB price on Anoneurx Cloud.",
  },
  {
    path: "/pay",
    title: "Anoneurx Pay — Modern Digital Banking",
    description: "Anoneurx Pay is a global, modern digital banking platform for individuals and businesses.",
  },
  {
    path: "/pay/features",
    title: "Anoneurx Pay Features",
    description: "Every feature of Anoneurx Pay — accounts, cards, transfers, savings and business tools.",
  },
  {
    path: "/pay/security",
    title: "Anoneurx Pay Security",
    description: "How Anoneurx Pay protects your money — encryption, fraud detection and compliance.",
  },
  {
    path: "/pay/about",
    title: "About Anoneurx Pay",
    description: "The mission and licences behind Anoneurx Pay.",
  },
  {
    path: "/pay/download",
    title: "Download Anoneurx Pay",
    description: "Download the Anoneurx Pay app for iOS and Android.",
  },
  {
    path: "/pay/faq",
    title: "Anoneurx Pay FAQ",
    description: "Frequently asked questions about Anoneurx Pay.",
  },
  {
    path: "/pay/contact",
    title: "Contact Anoneurx Pay",
    description: "Reach Anoneurx Pay — accounts, disputes, business banking and compliance.",
  },
  {
    path: "/pay/support",
    title: "Anoneurx Pay Support",
    description: "Help with Anoneurx Pay — cards, transfers, disputes, verification and business accounts.",
  },
  {
    path: "/checkout",
    title: "Checkout — Anoneurx",
    description: "Securely complete your payment on Anoneurx.",
  },
  {
    path: "/university",
    title: "Anoneurx University | Courses, Faculty & Programs",
    description: "Anoneurx University — degree programmes, certificates and short courses for engineers.",
    jsonLd: [
      ...[
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
      ].map((program) => ({
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
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "University", item: `${SITE}/university` },
          { "@type": "ListItem", position: 2, name: "Programs", item: `${SITE}/university/programs` },
        ],
      },
    ],
  },
  {
    path: "/courses",
    title: "Courses — Anoneurx University",
    description: "Every course from Anoneurx University — engineering, AI, systems, design and more.",
  },
  {
    path: "/faculty",
    title: "Anoneurx University Faculty — Professors & Researchers",
    description: "Meet the faculty behind Anoneurx University — professors, researchers and educators.",
  },
  {
    path: "/university/contact",
    title: "Contact Anoneurx University",
    description: "Reach Anoneurx University — admissions, faculty, registrar and student services.",
  },
  {
    path: "/university/support",
    title: "Anoneurx University Support",
    description: "Help with enrolment, courses, certificates, billing and student accounts at Anoneurx University.",
  },
  {
    path: "/community/leaderboard",
    title: "Community Leaderboard — Anoneurx",
    description: "Top Anoneurx community contributors ranked by activity and impact.",
  },
  {
    path: "/community/mentorship",
    title: "Mentorship Program — Anoneurx",
    description: "Apply for the Anoneurx mentorship program and grow alongside experienced engineers.",
  },
  {
    path: "/community/forums",
    title: "Community Forums — Anoneurx",
    description: "Discuss code, releases, roadmaps and ideas with the Anoneurx community.",
  },
  {
    path: "/opensource",
    title: "Anoneurx Open Source — Projects, Libraries & Templates",
    description: "Explore Anoneurx open source — projects, libraries, packages, templates and VS Code extensions. Free forever, community-driven.",
    ogImage: "/og-images/og-opensource.png",
  },
  {
    path: "/opensource/about",
    title: "About Anoneurx Open Source",
    description: "Why Anoneurx invests in open source and how the community is governed.",
  },
  {
    path: "/opensource/projects",
    title: "Anoneurx Open Source Projects",
    description: "Every open source project maintained by Anoneurx and its community.",
  },
  {
    path: "/opensource/organizations",
    title: "Open Source Organizations",
    description: "Organizations and working groups inside the Anoneurx open source ecosystem.",
  },
  {
    path: "/opensource/libraries",
    title: "Open Source Libraries",
    description: "Reusable Anoneurx libraries you can drop into your project today.",
  },
  {
    path: "/opensource/packages",
    title: "Open Source Packages",
    description: "Anoneurx packages across npm, cargo, pip and go registries.",
  },
  {
    path: "/opensource/templates",
    title: "Open Source Templates",
    description: "Starter templates for every Anoneurx stack — CLI, web, edge and services.",
  },
  {
    path: "/opensource/vscode-extensions",
    title: "VS Code Extensions — Anoneurx",
    description: "Official Anoneurx VS Code extensions — language support, tokens and DevTools.",
  },
  {
    path: "/opensource/showcase",
    title: "Showcase — Anoneurx Open Source",
    description: "Real products the community has built using Anoneurx open source projects.",
  },
  {
    path: "/opensource/contributors",
    title: "Anoneurx Contributors",
    description: "The engineers, designers and researchers who contribute to Anoneurx open source.",
  },
  {
    path: "/opensource/sponsors",
    title: "Anoneurx Sponsors",
    description: "Companies and organizations that sponsor Anoneurx open source and community programs.",
  },
  {
    path: "/opensource/contribute",
    title: "Contribute to Anoneurx Open Source",
    description: "Start contributing to Anoneurx open source — workflow, code review and rewards.",
  },
  {
    path: "/opensource/contribute/apply",
    title: "Apply to Contribute — Anoneurx Open Source",
    description: "Apply to join the Anoneurx open source contributor program.",
  },
  {
    path: "/opensource/community",
    title: "Anoneurx Community",
    description: "Events, forums, mentorship and leaderboards — the Anoneurx developer community.",
  },
  {
    path: "/opensource/events",
    title: "Events — Anoneurx Open Source",
    description: "Open source events, sprints and release parties from the Anoneurx community.",
  },
  {
    path: "/opensource/contact",
    title: "Contact Anoneurx Open Source",
    description: "Reach the Anoneurx Open Source program team.",
  },
  {
    path: "/opensource/partnership-inquiry",
    title: "Sponsor an Open Source Project — Anoneurx",
    description: "Fund the open source work behind Blackwall OS and Anoneurx — choose a tier, pick a project, and support the maintainers.",
  },
  {
    path: "/opensource/support",
    title: "Anoneurx Open Source Support",
    description: "Help with Anoneurx open source projects, packages and builds.",
  },
  {
    path: "/contributions/how-to-contribute",
    title: "How to Contribute — Anoneurx",
    description: "Step-by-step guide on contributing code, docs and feedback to Anoneurx.",
  },
  {
    path: "/contributions/review-progress",
    title: "Review Progress — Anoneurx",
    description: "Track PR reviews and contribution progress across Anoneurx projects.",
  },
  {
    path: "/contributions/architecture",
    title: "Architecture — Anoneurx",
    description: "System architecture and module boundaries across Anoneurx projects.",
  },
  {
    path: "/contributions/security",
    title: "Security Policy — Anoneurx",
    description: "Vulnerability reporting, disclosures and security practices at Anoneurx.",
  },
  {
    path: "/contributions/code-of-conduct",
    title: "Code of Conduct — Anoneurx",
    description: "Community guidelines and code of conduct for all Anoneurx spaces.",
  },
  {
    path: "/contributions/rewards",
    title: "Contributor Rewards — Anoneurx",
    description: "Grants, bounties and swag for top Anoneurx contributors.",
  },
  {
    path: "/apps",
    title: "Anoneurx Apps — Discover Powerful Apps",
    description: "The Anoneurx apps marketplace — curated apps from global developers, privacy focused.",
  },
  {
    path: "/apps/browse",
    title: "Browse Apps — Anoneurx",
    description: "Browse every app on the Anoneurx marketplace.",
  },
  {
    path: "/apps/categories",
    title: "App Categories — Anoneurx",
    description: "Discover apps by category on the Anoneurx marketplace.",
  },
  {
    path: "/apps/developers",
    title: "Anoneurx Developers",
    description: "Ship your app on Anoneurx — publishing, revenue share and analytics.",
  },
  {
    path: "/apps/about",
    title: "About Anoneurx Apps",
    description: "The story behind the Anoneurx apps marketplace.",
  },
  {
    path: "/artificial-intelligence",
    title: "Artificial Intelligence — Anoneurx",
    description: "Anoneurx AI — research, applied models, edge inference and enterprise deployments.",
  },
  {
    path: "/robotics-systems",
    title: "Robotics Systems — Anoneurx",
    description: "Robotics research and platforms from Anoneurx — perception, control and autonomy.",
  },
  {
    path: "/space-projects",
    title: "Space Projects — Anoneurx",
    description: "Anoneurx space projects — satellite imagery, ground stations and edge compute in orbit.",
  },
  {
    path: "/web-development",
    title: "Web Development — Anoneurx",
    description: "Anoneurx builds high-performance web applications, platforms and design systems.",
  },
  {
    path: "/blockchain-systems",
    title: "Blockchain Systems — Anoneurx",
    description: "Anoneurx builds blockchain infrastructure and applied cryptography systems.",
  },
  {
    path: "/operating-systems",
    title: "Operating Systems — Anoneurx",
    description: "Every operating system from Anoneurx — Black Wall, Black Wall Server and more.",
  },
  {
    path: "/investment-opportunities",
    title: "Investment Opportunities — Anoneurx",
    description: "Explore investment opportunities across the Anoneurx portfolio.",
  },
  {
    path: "/partnership-inquiry",
    title: "Partnership Inquiry — Anoneurx",
    description: "Submit a partnership inquiry to Anoneurx.",
  },
  {
    path: "/collaboration",
    title: "Collaborate with Anoneurx",
    description: "Research, product and enterprise collaboration with Anoneurx.",
  },
  {
    path: "/arcadeum",
    title: "Anoneurx Arcadeum",
    description: "Anoneurx Arcadeum — indie games, engines and creator tools.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Anoneurx",
    description: "How Anoneurx protects your data — the privacy policy in full.",
  },
  {
    path: "/terms",
    title: "Terms of Service — Anoneurx",
    description: "The terms of service for using Anoneurx products.",
  },
  {
    path: "/cookies",
    title: "Cookie Policy — Anoneurx",
    description: "How Anoneurx uses cookies on its websites and apps.",
  },
  {
    path: "/support",
    title: "Support — Anoneurx",
    description: "Help, support, documentation and contact channels for Anoneurx.",
  },
  {
    path: "/notes",
    title: "Notes — Anoneurx",
    description: "Study notes, cheatsheets and reference material curated by Anoneurx.",
  },
  {
    path: "/reportbug",
    title: "Report a Bug — Anoneurx",
    description: "Report a bug in any Anoneurx product.",
  },
  {
    path: "/opportunities/fellowships",
    title: "Fellowships — Anoneurx Opportunities",
    description: "Anoneurx research and engineering fellowships for outstanding scholars.",
  },
  {
    path: "/opportunities/research-grants",
    title: "Research Grants — Anoneurx Opportunities",
    description: "Grants and compute sponsorship for academic and independent research.",
  },
  {
    path: "/opportunities/tech-partnerships",
    title: "Tech Partnerships — Anoneurx Opportunities",
    description: "Partner with Anoneurx on technology, co-development and integrations.",
  },
  {
    path: "/opportunities/startup-incubation",
    title: "Startup Incubation — Anoneurx Opportunities",
    description: "Incubation, cloud credits and mentorship for early-stage startups.",
  },
  {
    path: "/opportunities/global-exchange",
    title: "Global Exchange — Anoneurx Opportunities",
    description: "Cross-border engineering exchange programs and global internships.",
  },
  {
    path: "/strategic-kpis",
    title: "Strategic KPIs — Anoneurx",
    description: "Anoneurx research strategy, milestones and public KPIs.",
  },
  {
    path: "/lab",
    title: "Anoneurx Research Lab",
    description: "Open research problems, projects and opportunities at Anoneurx Lab — AI, cybersecurity, robotics and systems research.",
    ogImage: "/og-images/lab-og-image.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ResearchOrganization",
        name: "Anoneurx Lab",
        url: `${SITE}/en-us/lab`,
        description:
          "Anoneurx Lab publishes open research problems in AI, cybersecurity, robotics and systems, and supervises student teams working on them.",
        parentOrganization: {
          "@type": "Organization",
          name: "Anoneurx",
          url: SITE,
        },
        knowsAbout: ["Artificial intelligence", "Cybersecurity", "Robotics", "Systems"],
      },
    ],
  },
  {
    path: "/lab/problems",
    title: "Anoneurx Lab | Open Research",
    titleOverride: "Anoneurx Lab | Open Research",
    description: "Explore open research problems in cybersecurity, operating systems, robotics, and autonomous systems at Anoneurx Lab.",
    ogImage: "/og-images/og-image.png",
  },
  {
    path: "/lab/problems/secure-boot-integrity",
    title: "Establishing a Verifiable Boot Chain for Black Wall — Anoneurx Lab",
    description: "Establish a verifiable chain of trust from UEFI firmware through the bootloader to the running kernel, including signature verification, boot measurements and recovery from verification failures.",
  },
  {
    path: "/lab/problems/reliable-boot-architecture",
    title: "A Reliable Boot Architecture for Virtualized and Physical Systems — Anoneurx Lab",
    description: "Investigate why Black Wall does not yet boot consistently across QEMU, UEFI-based physical machines and future hardware, and build stage-level diagnostics that separate firmware, bootloader, kernel and display failures.",
  },
  {
    path: "/lab/problems/kernel-memory-isolation",
    title: "Enforcing Memory Isolation in a Security-Oriented Operating System — Anoneurx Lab",
    description: "Restrict unauthorised memory access and contain kernel defects through stronger kernel/user boundaries, permission enforcement and component isolation.",
  },
  {
    path: "/lab/problems/self-defending-operating-system",
    title: "Designing a Self-Defending Operating System Architecture — Anoneurx Lab",
    description: "Design an operating-system architecture that continuously evaluates security conditions, detects suspicious system changes and applies controlled defensive responses.",
  },
  {
    path: "/lab/problems/hardware-trust-boundaries",
    title: "Establishing Trust Boundaries Between Black Wall and Hardware — Anoneurx Lab",
    description: "Evaluate hardware trust, isolate peripherals and reduce the risks introduced by compromised firmware or unauthorised device access.",
  },
  {
    path: "/lab/problems/robotics-security-architecture",
    title: "A Security Architecture for Black Wall in Autonomous Robotic Systems — Anoneurx Lab",
    description: "Isolate robotic workloads, constrain actuator access, authenticate component communication and keep behaviour predictable when software or the network fails.",
  },
  {
    path: "/lab/problems/distributed-system-communication",
    title: "Authenticated and Resilient Communication for Distributed Black Wall Systems — Anoneurx Lab",
    description: "Secure communication between distributed Black Wall machines and robotic nodes while limiting the impact of compromised nodes, interrupted connectivity and unauthorised commands.",
  },
  {
    path: "/lab/problems/secure-os-updates",
    title: "Verifiable Updates and Rollback Protection for Black Wall — Anoneurx Lab",
    description: "Design an update architecture that verifies authenticity, resists unauthorised modification, recovers safely from interrupted installs and restricts unauthorised downgrades.",
  },
  {
    path: "/lab/problems/privacy-preserving-telemetry",
    title: "Security Monitoring Without Unnecessary Data Collection — Anoneurx Lab",
    description: "Provide useful security monitoring while minimising the collection, exposure and retention of sensitive system information.",
  },
  {
    path: "/lab/problems/workload-isolation",
    title: "Containing Untrusted Workloads Through OS-Level Isolation — Anoneurx Lab",
    description: "Isolate applications and services with different trust levels, restrict access to sensitive resources and limit the consequences of a compromised workload.",
  },
  {
    path: "/lab/problems/system-integrity-monitoring",
    title: "Tamper-Evident Integrity Monitoring for Critical OS Components — Anoneurx Lab",
    description: "Detect unauthorised changes to protected files, executables, configuration and security policy, and distinguish them from legitimate updates.",
  },
  {
    path: "/lab/problems/fail-safe-os-recovery",
    title: "Fail-Safe Operating-System Behavior Under Security and Hardware Failures — Anoneurx Lab",
    description: "Define how Black Wall should respond when security services, authentication, storage, networking or hardware fail, including controlled degradation and recovery.",
  },
  {
    path: "/lab/blog",
    title: "Blog — Anoneurx Lab",
    description: "Write-ups of the research happening inside Anoneurx Lab — robotics, cybersecurity, AI, systems and the way the lab works.",
  },
  ...BLOG_POST_ROUTES,
  {
    path: "/lab/careers",
    title: "Careers — Anoneurx Lab",
    description: "Student researcher placements, research fellowships and engineering roles on open problems at Anoneurx Lab.",
  },
  {
    path: "/lab/programs",
    title: "Programs — Anoneurx Lab",
    description: "Anoneurx Lab programs for students and faculty — placements, mentored sprints, co-supervision and research grants.",
  },
  {
    path: "/lab/resources",
    title: "Resources — Anoneurx Lab",
    description: "Datasets, tools and open source published by Anoneurx Lab — the shared infrastructure every research problem runs on.",
  },
  {
    path: "/lab/teams",
    title: "Teams — Anoneurx Lab",
    description: "The collaborative research teams behind Anoneurx Lab's open problems, projects and publications.",
  },
  {
    path: "/lab/projects",
    title: "Projects — Anoneurx Lab",
    description: "Active and prototype projects at Anoneurx Lab.",
  },
  {
    path: "/lab/areas",
    title: "Research Areas — Anoneurx Lab",
    description: "Explore research areas at Anoneurx Lab — AI, cybersecurity, robotics, systems and more.",
  },
  {
    path: "/lab/about",
    title: "About — Anoneurx Lab",
    description: "About Anoneurx Lab — mission, values and research philosophy.",
  },
  {
    path: "/lab/apply",
    title: "Apply — Anoneurx Lab",
    description: "Apply to join Anoneurx Lab as a student researcher.",
  },
  {
    path: "/lab/people",
    title: "People — Anoneurx Lab",
    description: "Researchers, contributors and leads at Anoneurx Lab.",
  },
  {
    path: "/lab/policies",
    title: "Policies & Legal — Anoneurx Lab",
    description: "Anoneurx Lab governance: privacy, cookies, terms of use, accessibility, research ethics and security disclosure.",
  },
  {
    path: "/lab/privacy",
    title: "Privacy Policy — Anoneurx Lab",
    description: "How Anoneurx Lab collects, uses, shares and protects personal information.",
  },
  {
    path: "/lab/cookies",
    title: "Cookie Policy — Anoneurx Lab",
    description: "The cookies and browser storage used by the Anoneurx Lab website and how to control them.",
  },
  {
    path: "/lab/terms",
    title: "Terms of Use — Anoneurx Lab",
    description: "Terms that apply when you use the Anoneurx Lab website and its research.",
  },
  {
    path: "/lab/guide",
    title: "Research Guide — Anoneurx Lab",
    description: "How to select problems, write papers and contribute to research at Anoneurx Lab.",
  },
  {
    path: "/lab/faq",
    title: "FAQ — Anoneurx Lab",
    description: "Frequently asked questions about Anoneurx Lab.",
  },
  {
    path: "/lab/accessibility",
    title: "Accessibility Statement — Anoneurx Lab",
    description: "Anoneurx Lab accessibility commitments, WCAG 2.2 AA target, known limitations and feedback route.",
  },
  {
    path: "/lab/ethics",
    title: "Research Ethics & Integrity — Anoneurx Lab",
    description: "The ethical and integrity standards applied to research at Anoneurx Lab.",
  },
  {
    path: "/lab/security",
    title: "Security & Responsible Disclosure — Anoneurx Lab",
    description: "How to report a vulnerability in Anoneurx Lab systems, scope and safe harbour.",
  },
  {
    path: "/lab/problems/anxrp001",
    title: "Early Security Warning for Autonomous Systems — Anoneurx Lab",
    description: "Develop an early warning system that detects security anomalies in autonomous vehicle sensor networks before they propagate to decision-making layers.",
  },
  {
    path: "/lab/problems/anxrp002",
    title: "Federated Learning Privacy in Healthcare Data — Anoneurx Lab",
    description: "Design a federated learning framework that enables cross-hospital model training while provably preserving patient privacy through differential privacy guarantees.",
  },
  {
    path: "/lab/problems/anxrp003",
    title: "Real-time SLAM for Indoor Drone Navigation — Anoneurx Lab",
    description: "Build a lightweight SLAM system that runs on resource-constrained drone hardware for GPS-denied indoor navigation.",
  },
  {
    path: "/lab/problems/anxrp004",
    title: "Neural Network Quantization for Edge AI — Anoneurx Lab",
    description: "Investigate mixed-precision quantization techniques that maintain model accuracy while enabling inference on microcontroller-class hardware.",
  },
  {
    path: "/lab/problems/anxrp005",
    title: "Adversarial Robustness of Code Generation Models — Anoneurx Lab",
    description: "Study how LLM-based code assistants can be manipulated to generate vulnerable or malicious code, and develop defenses.",
  },
  {
    path: "/lab/problems/anxrp006",
    title: "Zero-Knowledge Proofs for IoT Device Authentication — Anoneurx Lab",
    description: "Implement lightweight zero-knowledge proof protocols for authenticating IoT devices without revealing device identity or credentials.",
  },
  {
    path: "/lab/problems/anxrp007",
    title: "Semantic Code Search in Large Monorepos — Anoneurx Lab",
    description: "Build a semantic code search engine that understands intent rather than keywords, enabling developers to find relevant code across millions of lines.",
  },
  {
    path: "/lab/problems/anxrp008",
    title: "Formal Verification of Smart Contract Compositions — Anoneurx Lab",
    description: "Develop automated formal verification tools that can prove safety properties of composed smart contracts across DeFi protocols.",
  },
  {
    path: "/lab/problems/anxosq7mkr",
    title: "Before the Breach — Anoneurx Lab",
    description: "Predictive cybersecurity at the operating-system level. Investigate whether subtle behavioral changes can identify a measurable pre-attack state before an actual compromise occurs.",
  },
  {
    path: "/lab/problems/anxbwt4xpl",
    title: "Self-Defending OS — Anoneurx Lab",
    description: "Investigate an operating-system architecture capable of continuously learning system behavior, constructing a runtime security model, and adaptively changing defensive policies.",
  },
  {
    path: "/lab/problems/anxron8cvd",
    title: "Robot Self-Trust — Anoneurx Lab",
    description: "Investigate whether an autonomous robot can determine when its own perception of reality has become unreliable or potentially compromised.",
  },
  {
    path: "/lab/problems/anxbwr6zqm",
    title: "Black Wall for Robots — Anoneurx Lab",
    description: "Investigate a cyber-physical security architecture where a secure runtime prevents compromised software from producing physically dangerous robot behavior.",
  },
  {
    path: "/lab/problems/anxrok3fwt",
    title: "Cyber-Physical Threat Horizon — Anoneurx Lab",
    description: "Investigate whether cyber-physical systems can predict a dangerous physical consequence several seconds before it occurs.",
  },
  {
    path: "/lab/problems/anxcsv9lxp",
    title: "Self-Learning Security Baseline — Anoneurx Lab",
    description: "Investigate whether an autonomous system can learn its own operational security baseline instead of relying entirely on manually written security rules.",
  },
  {
    path: "/lab/problems/anxcsbwnn2",
    title: "Black Wall: Neural Network Self-Defending OS — Anoneurx Lab",
    description: "Investigate whether the operating system itself can host neural network models that watch, model and defend the machine continuously, as a first-class part of the kernel and security policy.",
  },
  {
    path: "/lab/problems/anxrne4k9z",
    title: "Adaptive Noise-Resilient Anomaly Detection for Drifting Sensor Streams — Anoneurx Lab",
    description: "Develop anomaly detection that keeps working when sensor streams drift, recalibrate and change noise characteristics, instead of assuming a fixed, stationary baseline.",
  },
  {
    path: "/lab/projects/anx-sentinel",
    title: "ANX Sentinel — Anoneurx Lab",
    description: "Real-time anomaly detection library for autonomous vehicle CAN bus networks, written in Rust for deterministic performance.",
  },
  {
    path: "/lab/projects/dp-flmed",
    title: "DP-FLMed — Anoneurx Lab",
    description: "Federated learning framework with differential privacy guarantees for medical imaging, built on Flower with formal privacy accounting.",
  },
  {
    path: "/lab/projects/edgelang",
    title: "EdgeLang — Anoneurx Lab",
    description: "A domain-specific language for programming quantized neural networks on microcontrollers, compiling to TFLite and ONNX.",
  },
  {
    path: "/blacklink",
    title: "Anoneurx Black Link — Secure Server Management",
    description: "Securely connect to and manage your Linux infrastructure with Anoneurx Black Link.",
  },
  {
    path: "/blacklink/features",
    title: "Features — Anoneurx Black Link",
    description: "Terminal, files, processes, services, metrics, logs, network and security — all through one secure connection.",
  },
  {
    path: "/blacklink/how-it-works",
    title: "How It Works — Anoneurx Black Link",
    description: "Learn how Anoneurx Black Link orchestrates the dashboard, connection layer, Agent and Linux system.",
  },
  {
    path: "/blacklink/security",
    title: "Security — Anoneurx Black Link",
    description: "Designed around trust: encrypted sessions, server identity, least privilege, capability-based access and auditability.",
  },
  {
    path: "/blacklink/agent",
    title: "Anoneurx Black Link Agent",
    description: "Install the Anoneurx Black Link Agent and securely connect your Linux server to Anoneurx Black Link.",
  },
  {
    path: "/blacklink/docs",
    title: "Documentation — Anoneurx Black Link",
    description: "Guides and references for installing, configuring and integrating Anoneurx Black Link.",
  },
  {
    path: "/blacklink/pricing",
    title: "Pricing — Anoneurx Black Link",
    description: "Simple infrastructure. Transparent pricing. Plans coming soon.",
  },
  {
    path: "/blacklink/status",
    title: "Status — Anoneurx Black Link",
    description: "Current state of Anoneurx Black Link services.",
  },
  {
    path: "/blacklink/changelog",
    title: "Changelog — Anoneurx Black Link",
    description: "Release notes for Anoneurx Black Link.",
  },
];

// Legacy / alias paths that the SPA client-redirects to a canonical page.
// They are emitted as real 200 documents (so crawlers never hit the 404 fallback)
// and canonicalised onto the destination page instead of competing with it.
const aliases = [
  { path: "/intern/verify", canonical: "/verify" },
  { path: "/internship-verify", canonical: "/verify" },
  { path: "/hackathon/verify", canonical: "/verify" },
  { path: "/careers/hackathon/verify", canonical: "/verify" },
  { path: "/careers/join-dev-team/verify", canonical: "/verify" },
  { path: "/careers/other-opportunities/verify", canonical: "/verify" },
  { path: "/blog", canonical: "/blogs" },
];

for (const alias of aliases) {
  const canonicalRoute = routes.find((r) => r.path === alias.canonical);
  if (!canonicalRoute) {
    console.warn(`  ! alias ${alias.path} -> ${alias.canonical}: canonical route not found`);
    continue;
  }
  routes.push({
    path: alias.path,
    canonicalPath: alias.canonical,
    title: canonicalRoute.title,
    description: canonicalRoute.description,
    ogImage: canonicalRoute.ogImage,
    jsonLd: canonicalRoute.jsonLd,
  });
}

// Legacy problem IDs (mixed-case and hyphenated) redirect client-side to the
// lowercase, dashless canonical IDs. Emitted as real 200 documents carrying the
// canonical page's metadata so old links and crawlers resolve instead of 404ing.
const legacyProblemAliases = {
  "anx-rp-001": "anxrp001",
  "anx-rp-002": "anxrp002",
  "anx-rp-003": "anxrp003",
  "anx-rp-004": "anxrp004",
  "anx-rp-005": "anxrp005",
  "anx-rp-006": "anxrp006",
  "anx-rp-007": "anxrp007",
  "anx-rp-008": "anxrp008",
  anxosQ7MKR: "anxosq7mkr",
  anxbwT4XPL: "anxbwt4xpl",
  anxroN8CVD: "anxron8cvd",
  anxbwR6ZQM: "anxbwr6zqm",
  anxroK3FWT: "anxrok3fwt",
  anxcsV9LXP: "anxcsv9lxp",
};
for (const [legacyId, canonicalId] of Object.entries(legacyProblemAliases)) {
  const canonicalPath = `/lab/problems/${canonicalId}`;
  const canonicalRoute = routes.find((r) => r.path === canonicalPath);
  if (!canonicalRoute) continue;
  routes.push({
    path: `/lab/problems/${legacyId}`,
    canonicalPath,
    title: canonicalRoute.title,
    description: canonicalRoute.description,
    jsonLd: canonicalRoute.jsonLd,
  });
}


// `/opensource/:id` and `/opensource/:id/:subPage` are dynamic routes in the
// SPA, but on static hosting they must exist as real files — otherwise GitHub
// Pages answers 404 before the client router can pick them up.
const OPEN_SOURCE_PROJECTS = [
  { id: "blackwall", name: "Black Wall OS" },
  { id: "authenticator", name: "Authenticator" },
  { id: "lynx", name: "LYNX" },
];
const PROJECT_SUBPAGES = [
  ["features", "Features", "Capabilities and technical highlights"],
  ["download", "Download", "Releases, artefacts and install instructions"],
  ["demo", "Demo", "A guided walkthrough of the interface"],
  ["changelog", "Changelog", "Release history and version notes"],
  ["roadmap", "Roadmap", "What ships next"],
  ["faq", "FAQ", "Frequently asked questions"],
  ["security", "Security", "Disclosure policy and threat model"],
  ["privacy", "Privacy Policy", "Data practices"],
  ["contributors", "Contributors", "Maintainers, contributors and testers"],
];
for (const project of OPEN_SOURCE_PROJECTS) {
  const projectOgImageMap = {
    blackwall: "/og-images/opensource/projects/og-image-blackwall.jpg",
    authenticator: "/og-images/opensource/projects/og-image-auth.jpg",
    lynx: "/og-images/opensource/projects/og-image-lynx.jpg",
  };

  routes.push({
    path: `/opensource/${project.id}`,
    title: `${project.name} — Anoneurx Open Source Project`,
    description: `README, activity, maintainers and releases for ${project.name}, an Anoneurx open source project.`,
    ogImage: projectOgImageMap[project.id] ?? undefined,
  });
  for (const [subPath, subTitle, subBlurb] of PROJECT_SUBPAGES) {
    routes.push({
      path: `/opensource/${project.id}/${subPath}`,
      title: `${subTitle} — ${project.name}`,
      description: `${subBlurb} for ${project.name}, an Anoneurx open source project.`,
      ogImage: projectOgImageMap[project.id] ?? undefined,
    });
  }
}

/**
 * Builds the head section with custom SEO tags. Adds light/dark theme-color
 * (F-03) and uses the route's ogImage when supplied (F-02).
 */
const buildHead = (title, description, canonicalUrl, ogImageUrl, jsonLd) => {
  const themeColorDark = "#0A0A0B";
  const themeColorLight = "#FAFAFA";
  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title data-rh="true">${title}</title>
  <meta data-rh="true" name="description" content="${description}" />
  <meta name="author" content="Anoneurx" />
  <meta data-rh="true" name="robots" content="index, follow" />

  <link data-rh="true" rel="canonical" href="${canonicalUrl}" />

  <meta property="og:site_name" content="Anoneurx" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Anoneurx" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImageUrl}" />

  <!-- Light/dark theme colors (F-03) -->
  <meta name="theme-color" content="${themeColorLight}" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="${themeColorDark}" media="(prefers-color-scheme: dark)" />
  <meta name="color-scheme" content="light dark" />

  <!-- Runs before first paint: flags that JavaScript is available (used by the
       lab reveal animations) and applies a remembered lab theme without a flash. -->
  <script>
    (function () {
      try {
        var root = document.documentElement;
        root.classList.add("js");

        var stored = null;
        try { stored = window.localStorage.getItem("anoneurx-lab-theme"); } catch (e) {}
        if (stored !== "light" && stored !== "dark") { stored = null; }

        var systemDark = !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
        var path = window.location.pathname;

        if (path === "/en-us/lab" || path.indexOf("/en-us/lab/") === 0) {
          if (stored) { root.setAttribute("data-theme", stored); }
          var theme = stored || (systemDark ? "dark" : "light");
          var meta = document.getElementById("theme-color");
          if (meta) { meta.setAttribute("content", theme === "light" ? "${themeColorLight}" : "${themeColorDark}"); }
        }
      } catch (e) {}
    })();
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

  <link rel="icon" type="image/png" href="/assets/logo.png" />

  ${jsonLd.map((ld) => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`).join("\n  ")}

  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    (function (l) {
      if (l.search[1] === '/') {
        var decoded = l.search.slice(1).split('&').map(function (s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->

  <script type="module" crossorigin src="${jsPath}"></script>
  <link rel="stylesheet" crossorigin href="${cssPath}">`;
};

let count = 0;

(async () => {
  // 1. Build the app
  console.log("▶ Building app for prerender...");
  await new Promise((resolve, reject) => {
    const build = spawn("npx", ["vite", "build"], { stdio: "inherit" });
    build.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`build exited ${code}`))));
  });

  // 2. Start the preview server so Playwright can fetch real routes
  console.log("▶ Starting vite preview on port", PREVIEW_PORT);
  const preview = spawn(process.execPath, [resolve("node_modules/vite/bin/vite.js"), "preview", "--port", String(PREVIEW_PORT), "--host"], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  preview.stdout.on("data", (d) => process.stdout.write(`[preview] ${d}`));
  preview.stderr.on("data", (d) => process.stderr.write(`[preview] ${d}`));

  // Wait for preview server to be ready
  await new Promise((resolve) => setTimeout(resolve, 6000));

  // 3. Launch Playwright and render each route
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });

  // Give React a moment to hydrate after navigation
  const RENDER_WAIT_MS = 2000;

  for (const route of routes) {
    const logicalCanonical = route.canonicalPath || route.path;
    const isAlias = Boolean(route.canonicalPath);
    // Canonical URLs always carry the locale prefix; logical paths stay
    // unprefixed so the section-registry matching keeps working.
    const canonicalUrl =
      logicalCanonical === "/" ? `${SITE}${LOCALE}/` : `${SITE}${LOCALE}${logicalCanonical}`;
    const title = route.titleOverride || formatTitle(route.title, route.path);
    const description = route.description;
    const defaultOgImage = route.path === "/lab" || route.path.startsWith("/lab/")
      ? "/og-images/og-lab.png"
      : "/og-images/og-home.png";
    const ogImageUrl = /^(https?:)?\/\//.test(route.ogImage || "")
      ? route.ogImage
      : `${SITE}${route.ogImage || defaultOgImage}`;
    const jsonLd = route.jsonLd || [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: canonicalUrl,
        description: description,
        publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
      },
    ];

    // Render the route with Playwright to get real body content (fixes F-01)
    // Each route gets its own page to avoid memory buildup / crashes.
    // The SPA mounts under the /en-us basename, so the rendered URL is prefixed.
    let bodyHtml = '<div id="root"></div>';
    const page = await browser.newPage();
    try {
      const renderPath = route.path === "/" ? LOCALE : `${LOCALE}${route.path}`;
      await page.goto(`${PREVIEW_URL}${renderPath}`, { waitUntil: "networkidle", timeout: 30000 });
      await new Promise((resolve) => setTimeout(resolve, RENDER_WAIT_MS));
      bodyHtml = await page.evaluate(() => document.body.innerHTML);
    } catch (err) {
      console.warn(`  ! failed to render ${route.path}: ${err.message}`);
    }
    await page.close();

    const headContent = buildHead(title, description, canonicalUrl, ogImageUrl, jsonLd);
    const fullHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>${headContent}\n</head>\n<body>${bodyHtml}</body>\n</html>`;

    /**
     * Writes a route to dist in two places:
     *   canonical routes -> dist/en-us/{path}/index.html (canonical address)
     *                      dist/{path}/index.html       (legacy 200 copy)
     *   alias routes     -> dist/en-us/{aliasPath}/…     (prefixed alias)
     *                      dist/{aliasPath}/…           (legacy alias)
     *
     * Every copy carries the canonical head, and src/main.tsx rewrites the
     * browser URL in place so each page renders from one canonical address.
     */
    const writeFilePair = (logicalPath) => {
      if (logicalPath === "/") {
        writeFileSync(resolve(dist, "index.html"), fullHtml, "utf-8");
        mkdirSync(resolve(dist, "en-us"), { recursive: true });
        writeFileSync(resolve(dist, "en-us", "index.html"), fullHtml, "utf-8");
      } else {
        const slug = logicalPath.slice(1);
        const prefixedSlug = `en-us/${slug}`;

        const prefixedDir = resolve(dist, "en-us", slug);
        mkdirSync(prefixedDir, { recursive: true });
        writeFileSync(resolve(prefixedDir, "index.html"), fullHtml, "utf-8");
        mkdirSync(dirname(resolve(dist, `${prefixedSlug}.html`)), { recursive: true });
        writeFileSync(resolve(dist, `${prefixedSlug}.html`), fullHtml, "utf-8");

        const legacyDir = resolve(dist, slug);
        mkdirSync(legacyDir, { recursive: true });
        writeFileSync(resolve(legacyDir, "index.html"), fullHtml, "utf-8");
        mkdirSync(dirname(resolve(dist, `${slug}.html`)), { recursive: true });
        writeFileSync(resolve(dist, `${slug}.html`), fullHtml, "utf-8");
      }
    };
    // Canonical routes write the dual (prefixed + legacy) pair; the homepage
    // is written to dist/index.html plus dist/en-us/index.html.
    writeFilePair(route.path);
    count++;
    if (count % 25 === 0) console.log(`  …${count} routes rendered`);
  }

  await browser.close();
  preview.kill();

  console.log(`✓ Prerendered ${count} public routes with server-rendered body content!`);
})().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
