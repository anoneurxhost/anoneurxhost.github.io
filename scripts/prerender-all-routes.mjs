import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, "../dist");

const SRC = readFileSync(resolve(dist, "index.html"), "utf-8");

// Extract bundled JS and CSS references from built index.html
const jsMatch = SRC.match(/<script[^>]*src="(\/assets\/index-[^"]+\.js)"[^>]*><\/script>/);
const cssMatch = SRC.match(/<link[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/);
const jsPath = jsMatch ? jsMatch[1] : "/assets/index.js";
const cssPath = cssMatch ? cssMatch[1] : "/assets/index.css";

const SITE = "https://anoneurx.com";

// Public indexable routes and their customized head SEO tags
const routes = [
  {
    path: "/",
    title: "Anoneurx — Innovative Software, OS, AI, Cloud & Open Source",
    description: "Anoneurx builds innovative software, operating systems, AI, cloud, and open source technologies — Black Wall, Nexora, Anoneurx Cloud, Pay and Research.",
    keywords: "anoneurx, blackwall os, nexora, anoneurx cloud, anoneurx pay, open source, artificial intelligence, robotics",
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
    keywords: "anoneurx verify, verify intern, anoneurx internship verification, hackathon verify, dev team verify, opportunity verify, verify certificate, anoneurx identity, verify credentials",
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
    path: "/blogs/all",
    title: "All Articles — Anoneurx Blog",
    description: "The full archive of Anoneurx blog posts across engineering, research and product.",
  },
  {
    path: "/blackwall",
    title: "Black Wall OS — Anoneurx Secure Operating System",
    description: "Black Wall is Anoneurx's privacy-first operating system: hardened Rust core, zero telemetry, blazing performance and blockchain-backed identity.",
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
    path: "/university/opensource",
    title: "Open Source at Anoneurx University",
    description: "Earn credit by contributing to real Anoneurx repositories — maintainer mentorship and code reviews.",
  },
  {
    path: "/university/blackwall",
    title: "Black Wall OS at Anoneurx University",
    description: "Secure systems education on Black Wall OS — kernels, hardening and lab exercises.",
  },
  {
    path: "/university/pay",
    title: "Anoneurx Pay at Anoneurx University",
    description: "Fintech engineering at Anoneurx University — ledgers, payment rails and fraud analytics.",
  },
  {
    path: "/university/cloud",
    title: "Anoneurx Cloud at Anoneurx University",
    description: "Cloud engineering at Anoneurx University — infrastructure, SRE practice and live console labs.",
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
];

const verifyRoute = routes.find((r) => r.path === "/verify");
for (const alias of aliases) {
  routes.push({
    path: alias.path,
    canonicalPath: alias.canonical,
    title: verifyRoute.title,
    description: verifyRoute.description,
    keywords: verifyRoute.keywords,
    jsonLd: verifyRoute.jsonLd,
  });
}


let count = 0;

for (const route of routes) {
  const canonicalPath = route.canonicalPath || route.path;
  const canonicalUrl = `${SITE}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const title = route.title;
  const description = route.description;
  const keywords = route.keywords || "anoneurx, software, cloud, ai, os, open source";
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

  // data-rh="true" lets react-helmet-async replace these tags after hydration
  // instead of appending duplicates (duplicate canonicals make Google ignore both).
  const headContent = `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title data-rh="true">${title}</title>
  <meta data-rh="true" name="description" content="${description}" />
  <meta name="author" content="Anoneurx" />
  <meta data-rh="true" name="keywords" content="${keywords}" />
  <meta data-rh="true" name="robots" content="index, follow" />

  <link data-rh="true" rel="canonical" href="${canonicalUrl}" />

  <meta property="og:site_name" content="Anoneurx" />
  <meta data-rh="true" property="og:title" content="${title}" />
  <meta data-rh="true" property="og:description" content="${description}" />
  <meta data-rh="true" property="og:type" content="website" />
  <meta data-rh="true" property="og:url" content="${canonicalUrl}" />

  <meta data-rh="true" name="twitter:card" content="summary" />
  <meta data-rh="true" name="twitter:title" content="${title}" />
  <meta data-rh="true" name="twitter:description" content="${description}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif&display=swap" rel="stylesheet" />

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

  const htmlResult = SRC.replace(/<head>[\s\S]*?<\/head>/, `<head>${headContent}\n</head>`);

  if (route.path === "/") {
    writeFileSync(resolve(dist, "index.html"), htmlResult, "utf-8");
  } else {
    const slug = route.path.slice(1);
    // /about/index.html serves /about/ ; about.html makes /about itself a 200
    // instead of a 301 to the trailing-slash URL (sitemap + canonical are slashless).
    const outDir = resolve(dist, slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, "index.html"), htmlResult, "utf-8");
    mkdirSync(dirname(resolve(dist, `${slug}.html`)), { recursive: true });
    writeFileSync(resolve(dist, `${slug}.html`), htmlResult, "utf-8");
  }
  count++;
}


console.log(`✓ Prerendered ${count} public routes for SEO & HTTP 200 OK indexability!`);
