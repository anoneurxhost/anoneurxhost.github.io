import { Person, ProjectExtra } from "./types";
import lynxLogo from "@/assets/appicons/lynx.png";

export const lynxContributors: Person[] = [
  { name: "Muhammad Qasim", github: "itskashie", role: "Founder · Architecture", focus: "Search ranking & privacy model" },
  { name: "Nimrah Nabeel", github: "Nimrah-Nabeel", role: "Contributor", focus: "Search ranking & evaluation" },
  { name: "Zainab Faisal", github: "zainabfaisal2105-dev", role: "Contributor", focus: "Search ranking & evaluation" },
];

export const lynxTesters: Person[] = [
];

export const lynxExtra: ProjectExtra = {
  platform: "web",
  platformLabel: "Search Engine",
  logo: lynxLogo,
  accent: "from-amber-400 to-orange-500",
  storeLinks: {
    desktop: [
      { label: "Clone the repository", url: "https://github.com/anoneurx/lynx" },
      { label: "Read the specification", url: "https://github.com/anoneurx/lynx/blob/main/docs/architecture/specification.md" },
    ],
  },
  contributors: lynxContributors,
  testers: lynxTesters,
  features: [
    {
      title: "Privacy is structural",
      desc: "The query is parsed into an AST at the handler boundary and the raw string is dropped. There is nothing for a logger to log.",
      tag: "Privacy",
    },
    {
      title: "Explainable ranking",
      desc: "Every served result carries its full per-signal breakdown. score(doc) = f(doc_id, index_generation, ranking_config_version, query), so any past ranking can be recomputed.",
      tag: "Ranking",
    },
    {
      title: "Rotating-salt rate limits",
      desc: "HMAC-SHA256 over a daily salt and the first three octets of your IP. Memory-only counters, 25h TTL, no durable identifier to correlate across days.",
      tag: "Rate limiting",
    },
    {
      title: "SSRF gate, re-checked per hop",
      desc: "Ten-step validation before every socket and again at every redirect, with DNS pinning and IPv6-embedding unwrapping. A deny list that misses those is decoration.",
      tag: "Security",
    },
    {
      title: "No JavaScript, ever",
      desc: "No headless browser, no cookies, no shell. Only extracted text is stored — never raw HTML — which shrinks both the copyright and the XSS surface.",
      tag: "Crawler",
    },
    {
      title: "First-party only",
      desc: "A CSP with no unsafe-inline and no third-party origin anywhere, plus a build-time test that fails if the bundle contains an off-origin URL.",
      tag: "Hardening",
    },
  ],
  changelog: [
    {
      version: "v0.1.0",
      date: "Oct 2026",
      kind: "Design release",
      notes: [
        "Two-plane architecture split: query plane never touches untrusted content, crawl plane never sees a user query",
        "Threat model with 35 numbered threats, each with impact, likelihood, mitigation and residual risk",
        "Privacy model: five rules, four mechanisms, and a data inventory with a retention class per category",
        "Ranking design with named BM25F field weights and an explainability contract",
        "SSRF defence specified as layered, IP-authoritative, and re-run at every redirect hop",
        "Data model: 30+ entities with a schema-level guarantee that no table can hold a search query",
      ],
    },
    {
      version: "v0.1.0-rc",
      date: "Sep 2026",
      kind: "Scaffolding",
      notes: [
        "Cargo and pnpm workspaces with unsafe_code forbidden workspace-wide",
        "Local Docker Compose stack including an adversarial fixture origin for gzip bombs and private-address redirects",
        "Ten GitHub Actions workflows and a make verify gate with a privacy guard job",
        "Supply-chain controls: pinned toolchain, cargo deny, SBOMs, images pinned by digest",
      ],
    },
  ],
  faq: [
    {
      q: "Is there a running LYNX search engine?",
      a: "Not yet. The repository is in its design phase and contains the complete architecture, threat model, data model and engineering plan. Production code is written against these documents, not before them.",
    },
    {
      q: "Is LYNX anonymous?",
      a: "No, and we do not claim it is. LYNX is not 'zero logs'. What it does commit to is not building a profile of you, not selling or sharing query data, and documenting every place something is stored.",
    },
    {
      q: "Will the index be as good as a commercial engine?",
      a: "For years, no — it will be smaller and coverage will be worse. That limitation is stated in the README rather than buried, because a search engine you cannot trust is not a search engine you should use.",
    },
    {
      q: "Why Rust?",
      a: "The dominant server-side workload is parsing and fetching content an attacker controls. In that workload memory safety is not a style preference — it eliminates an entire bug class.",
    },
    {
      q: "What license is it under?",
      a: "AGPL-3.0-or-later, so anyone running a modified LYNX as a network service must publish their changes. A search engine is infrastructure; publishing it is what keeps it that way. Commercial licensing is available from Anoneurx.",
    },
    {
      q: "Is this related to the Lynx browser?",
      a: "No. LYNX here is not affiliated with, endorsed by, or derived from the Lynx browser project.",
    },
    {
      q: "Does the AI answer layer read my query?",
      a: "Astra is off by default. Retrieval happens first and independently, Astra is an extra response field, it has no tools, no memory and no agent loop, and it fails closed rather than returning partially verified citations.",
    },
  ],
  roadmap: [
    {
      quarter: "Phase 0 — Architecture",
      status: "active",
      items: [
        "Accept ADRs 0001–0021",
        "Give every open question an owner and a first experiment",
        "A reviewer outside the core team can follow the design without asking what anything means",
      ],
    },
    {
      quarter: "Phase 1 — Search prototype",
      status: "planned",
      items: [
        "Query processor: lexer, parser, AST, operators, normalisation",
        "SearchIndexReader trait behind an in-memory fake and a real Tantivy reader",
        "BM25F ranker with field weights, phrase queries, freshness and quality",
        "End-to-end /api/v1/search with the full middleware stack",
        "Evaluation harness: judged query set, NDCG@10, Recall@50, MRR@10, golden rankings",
      ],
    },
    {
      quarter: "Phase 2 — Crawler",
      status: "planned",
      items: [
        "Frontier with per-host budgets and politeness tokens",
        "robots.txt as a policy input, never a trust input",
        "SSRF safety gate, streaming downloader caps, parser bounds",
        "Extracted-text-only indexing with canonicalisation and tracking-param stripping",
      ],
    },
    {
      quarter: "Phase 3 — Real search engine",
      status: "planned",
      items: [
        "Scale the crawl with better frontier prioritisation, sitemaps and feeds",
        "Link graph and domain-capped PageRank authority",
        "Near-duplicate clusters via SimHash and MinHash",
        "Full operator set including filetype:, intitle:, inurl: and before:/after:",
        "Suggestions from corpus statistics, never from query logs",
        "Multi-language detection, stopwords, stemmers and index fields",
      ],
    },
    {
      quarter: "Phase 4 — Privacy hardening",
      status: "planned",
      items: [
        "Privacy invariants enforced as tests, not as review comments",
        "Ship lynx-verify-privacy as a release artefact so anyone can check the claims",
        "Zero-downtime index generations with 24h rollback",
      ],
    },
    {
      quarter: "Phase 5 — Astra (AI answers)",
      status: "planned",
      items: [
        "Optional grounded answers with deterministic citation validation",
        "Prompt-injection defences as an architectural property, not a prompt",
        "Self-hosted Llama-3-8B path via vLLM or Ollama",
      ],
    },
    {
      quarter: "Phase 6 — Scale & distribution",
      status: "planned",
      items: [
        "Multi-shard index with documented capacity targets",
        "Horizontal crawl worker scaling with a measured claim-latency trigger",
        "Federated and third-party embedding path",
      ],
    },
  ],
  security: [
    {
      title: "Reporting a vulnerability",
      body: [
        "Email security@anoneurx.com with a description, affected version, and reproduction steps. Please do not open a public issue for undisclosed vulnerabilities.",
        "GitHub Security Advisories are accepted for the repository. No NDA is required and no legal action is taken against good-faith researchers.",
      ],
      bullets: [
        "Acknowledgement within 48 hours",
        "Initial assessment within 5 business days",
        "Critical and high fixes within 14 days",
        "Medium fixes within 30 days",
        "Coordinated disclosure window of 90 days",
      ],
    },
    {
      title: "Design commitments",
      body: [
        "Ten security commitments are published in SECURITY.md rather than asserted in marketing copy.",
      ],
      bullets: [
        "Untrusted content is untrusted input",
        "The crawler cannot reach internal infrastructure",
        "No user profiling, no third-party requests, no sale of anything",
        "Explainable ranking — integrity is a security property",
        "Reproducible, scanned and signed artifacts",
        "Least privilege enforced by database role",
        "The admin console is never publicly reachable",
        "Incident response is documented and rehearsed",
        "Limits are disclosed honestly",
      ],
    },
    {
      title: "Threat model",
      body: [
        "35 threats (T01–T35) are enumerated using STRIDE plus privacy and abuse passes, covering six adversary classes, eight ranked assets and seven trust boundaries.",
        "Every threat carries an impact, a likelihood, a mitigation and an explicit residual risk statement.",
      ],
      bullets: [
        "Highest residual risk: rate-limit evasion across prefixes — a cost problem, not a privacy one",
        "Novel spam and novel prompt injection can degrade ranking but cannot break search",
        "DNS and application proxies the crawler cannot see remain outside LYNX's control",
        "Provider-level log access is outside LYNX's control and stated as such",
      ],
    },
    {
      title: "Supply chain",
      body: [
        "The Rust toolchain is pinned to an exact version, unsafe code is forbidden workspace-wide, and dependencies are audited and licence-checked on every pull request.",
      ],
      bullets: [
        "SBOMs published per release",
        "Container images pinned by digest, signed with cosign",
        "CI actions pinned by commit SHA",
        "Secret scanning with gitleaks",
        "Fuzzing targets for the DOM, JSON-LD, charsets, links, URL parsing and redirect resolution",
      ],
    },
    {
      title: "Known limitations",
      body: [
        "There is no code to attack yet — the project is in its design phase. These are the risks the design accepts on purpose, stated before implementation rather than after an incident.",
      ],
    },
  ],
  privacy: {
    updated: "October 2, 2026",
    summary:
      "LYNX is built so that privacy is a structural property rather than a policy. The query is parsed into an AST at the handler boundary and the raw string is dropped, so there is nothing for a logger to log. What LYNX does not claim is equally published.",
    sections: [
      {
        title: "The five rules",
        body: [
          "These are the invariants the whole system is shaped around. A violation would require someone to add a code path, not merely to forget a line.",
        ],
        bullets: [
          "No query text is persisted anywhere — not the database, not Redis, not logs, not metric labels, not traces, not analytics",
          "No cookies, no local identifiers, no fingerprinting on any surface",
          "No third-party requests — no external fonts, scripts, analytics, pixels, CDNs or error reporters",
          "No advertising, no data brokerage, no sale of anything",
          "Every stored field has a documented purpose, a retention period and an owner",
        ],
      },
      {
        title: "What we never collect",
        body: ["The list is short enough to print, and it is enforced by a CI job that greps for banned log and metric fields."],
        bullets: [
          "Search history — there is no account and no history",
          "Cookies or advertising identifiers",
          "Canvas, font or any other fingerprinting signal",
          "Exact client IP in application storage",
          "Retained User-Agent or referrer chains",
          "Cross-site identifiers or behavioural analytics, heatmaps or session replay",
        ],
      },
      {
        title: "How rate limiting works without identity",
        body: [
          "Rate limiting is the usual place a privacy project quietly builds a profile. LYNX buckets on a rotating salted hash of a truncated IP instead.",
          "Two people behind the same /24 share a bucket. That is an accepted availability cost, and it is preferable to a durable identifier that can be correlated across days.",
        ],
        bullets: [
          "HMAC-SHA256(salt_day, first three octets of the IP address)",
          "The daily salt is itself an HMAC of a server secret and the date",
          "Counters live in Redis with persistence disabled and a 25-hour TTL",
        ],
      },
      {
        title: "What an operator can and cannot see",
        body: [
          "No human in production has direct access to query strings, because query strings do not exist as stored values. There is also no per-user anything to look at.",
          "Debugging does not require reading your search. The query plan is yours — inspectable, serialisable, and shareable — which is exactly why you can debug it and we cannot.",
        ],
      },
      {
        title: "Honest limitations",
        body: [
          "LYNX does not claim anonymity and it is not 'zero logs'. Publishing this is deliberate: precision about what leaks is more trustworthy than a slogan.",
        ],
        bullets: [
          "Operators, hosting providers and network intermediaries can observe infrastructure-level logs",
          "A query is shared with the destination site when you click a result",
          "HTTP-level metadata — TLS SNI, connection reuse, IP — leaks coarse timing and network information",
          "The index is small compared with commercial engines for years, so coverage will be worse",
        ],
      },
      {
        title: "Retention",
        body: ["Every stored category declares a retention class. A table that cannot declare one is not created."],
        bullets: [
          "Rate-limit counters — 25 hours, memory only",
          "Logs — 14 days, keyed by request_id only",
          "Metrics — 30 days raw, then 13 months downsampled",
          "Abuse reports — 90 days after resolution, encrypted at rest",
          "API keys — life of the key plus 30 days",
          "Admin audit log — 2 years",
          "Backups — 35 days encrypted, and disclosed as not selectively purgable",
        ],
      },
      {
        title: "Self-hosting",
        body: [
          "Run LYNX yourself and the privacy defaults become your defaults. A verification artefact ships with the release so the claims can be checked by anyone, not only by us — verification that only the author can perform is not verification.",
        ],
      },
      {
        title: "Contact",
        body: ["Privacy questions can be sent to privacy@anoneurx.com. Privacy changes are published before they ship."],
      },
    ],
  },
};