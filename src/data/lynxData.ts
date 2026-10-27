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
      { label: "Release v0.1.0", url: "https://github.com/anoneurx/lynx/releases/tag/v0.1.0" },
      { label: "Source archive (tar.gz)", url: "https://github.com/anoneurx/lynx/archive/refs/tags/v0.1.0.tar.gz" },
      { label: "Source archive (zip)", url: "https://github.com/anoneurx/lynx/archive/refs/tags/v0.1.0.zip" },
      { label: "Read the specification", url: "https://github.com/anoneurx/lynx/blob/v0.1.0/docs/architecture/specification.md" },
    ],
  },
  contributors: lynxContributors,
  testers: lynxTesters,
  features: [
    {
      title: "Own index, end to end",
      desc: "Crawl → index → rank → serve is one owned pipeline under robots.txt. No Bing or Google syndication anywhere in the loop — the gap that leaves most 'private' engines serving rented links (a 2024 Bing API outage took several of them down with it).",
      tag: "Independence",
    },
    {
      title: "Privacy is structural",
      desc: "The query is parsed into an AST at the handler boundary and the raw string is dropped. There is nothing for a logger to log.",
      tag: "Privacy",
    },
    {
      title: "Fail-closed AI answers",
      desc: "Astra (optional, off by default) strips every sentence that lacks a verified [n] citation and refuses rather than guesses — no invented provenance, the failure mode all eight AI search tools showed in the CJR Tow Center study. Below-trust pages are withheld from grounding by the source-trust gate.",
      tag: "AI answers",
    },
    {
      title: "Explainable ranking — per result, on request",
      desc: "explain=true renders a per-result 'Why this ranking?' disclosure with the full signal vector (lexical, freshness, quality, authority, context, spam) and the ranking-config version. No mainstream engine lets a user see, for a single request, why one page ranked above another.",
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
      date: "Oct 27, 2026",
      kind: "First end-to-end release",
      notes: [
        "§Z implementation order complete (steps 1–22): crawl, parse, index, query, rank, serve — 56 test suites green at every gated commit",
        "Gap 1, the rented result list: fully owned pipeline (robots.txt crawler, own sealed index generations, own BM25F ranker) — no Bing/Google syndication anywhere in the loop",
        "Gap 2, unverified AI citations (per the CJR Tow Center study of eight AI search tools): Astra strips every sentence without a verified [n] citation, refuses rather than guesses, and applies a source-trust gate (ai.min_source_trust) to what it grounds from",
        "Gap 3, ranking opacity: explain=true returns the per-result signal vector (lexical, freshness, quality, authority, context, spam) — the HTML SERP renders a per-result 'Why this ranking?' disclosure with the ranking-config version",
        "API: JSON + server-rendered HTML SERP, operators (site:, intitle:, inanchor:, \"phrase\", after:, OR), fuzzy suggestions, keyset pagination, no-store everywhere",
        "Production broker bootstrap: serves a sealed Tantivy generation from index.dir, refuses to boot in production without one (fixes 'empty index by accident')",
        "Full-loop smoke test over three real services: verified answer merges with provenance into the real index; identical search served from the answer cache; a grounding-ignoring model fails closed",
        "Release rehearsal: ndcg@10 0.966 / mrr@10 1.000 / recall@100 0.889 on the v0 judged set; p50 0.57–1.71 ms; ~1,820 req/s burst (small-corpus conditions)",
      ],
    },
    {
      version: "Phase 0",
      date: "Jul–Oct 2026",
      kind: "Architecture (pre-release)",
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
      a: "Yes — v0.1.0 (Oct 27, 2026) is the first end-to-end release: crawler, indexer, query processor, ranker, public API and the optional Astra answer layer, all gated by 56 green test suites at every commit. It is prototype-scale: the corpus is small, and scale work is Phase 6.",
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
    {
      q: "What makes it different from DuckDuckGo / Startpage / Brave?",
      a: "Three survey-backed structural gaps: (1) most privacy alternatives rent their organic web links from Bing/Google syndication — LYNX owns the whole crawl→index→rank→serve loop; (2) AI search answers cite poorly (CJR Tow Center 2025 tested eight tools, all had citation problems) — LYNX fails closed with verified [n] citations and a source-trust gate; (3) ranking opacity — LYNX renders a per-result 'Why this ranking?' signal vector on request.",
    },
  ],
  roadmap: [
    {
      quarter: "Phase 0 — Architecture",
      status: "shipped",
      items: [
        "Accept ADRs 0001–0021",
        "Give every open question an owner and a first experiment",
        "A reviewer outside the core team can follow the design without asking what anything means",
      ],
    },
    {
      quarter: "Phase 1 — Search prototype",
      status: "shipped",
      items: [
        "Query processor: lexer, parser, AST, operators, normalisation",
        "SearchIndexReader trait behind an in-memory fake and a real Tantivy reader",
        "BM25F ranker with field weights, phrase queries, freshness and quality",
        "End-to-end /api/v1/search with the full middleware stack",
        "Evaluation harness: judged query set with NDCG@10, Recall and MRR golden gates",
      ],
    },
    {
      quarter: "Phase 2 — Crawler",
      status: "shipped",
      items: [
        "Frontier with per-host politeness, daily budgets and trap detection",
        "robots.txt as a policy input, never a trust input",
        "SSRF safety gate, streaming downloader caps, bounded parser",
        "Extracted-text-only indexing with canonicalisation and tracking-param stripping",
      ],
    },
    {
      quarter: "Phase 3 — Real search engine",
      status: "shipped (§Z steps 9–15)",
      items: [
        "Link graph authority fields and near-duplicate handling in the ranker",
        "Full operator set including intitle:, inanchor:, count operators and after:/before:",
        "Suggestions from corpus statistics, never from query logs",
        "Sealed index generations: production refuses to boot without one",
        "Grow the corpus: frontier prioritisation and multi-scale crawl capacity (next)",
      ],
    },
    {
      quarter: "Phase 4 — Privacy hardening",
      status: "shipped (§Z steps 16–17)",
      items: [
        "Privacy invariants enforced as retrieval jobs and CI checks, not as review comments",
        "no-store on every response and third-party asset policy refused at config validation",
        "Production privacy check and retention registry shipped in the release",
      ],
    },
    {
      quarter: "Phase 5 — Astra (AI answers)",
      status: "shipped (§Z steps 18–22)",
      items: [
        "Optional grounded answers with sentence-level citation validation, off by default",
        "Prompt-injection defences as an architectural property — the sandboxed answer plane, two-field prompt, no tools",
        "Source-trust gate (ai.min_source_trust) and kill switch, token budget, circuit breaker, answer cache",
        "v0.1 limit stated: verification is sentence-level but content-blind; the NLI pass is future work",
      ],
    },
    {
      quarter: "Phase 6 — Scale & distribution",
      status: "planned",
      items: [
        "Multi-shard index with per-shard top-K and a global rerank; shard coordinator",
        "Horizontal crawl worker scaling with a measured claim-latency trigger",
        "Region awareness, reader replication, DR drills rehearsed not just written",
        "Shared budget counter for multi-replica Astra deployments (Redis)",
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
        "v0.1.0 ships real code under the honest-claims principle. The accepted risks are stated before an incident, not after one — including the AI-answer blast-radius limits (sentence-level, content-blind verification in v0.1) and prototype-scale corpus coverage.",
      ],
      bullets: [
        "The index is small compared with commercial engines — coverage, not correctness, is the shortfall",
        "AI answer verification does not yet prove truth (no entailment pass); it bounds blast radius",
        "Budget, circuit breaker and answer cache are process-local in v0.1 (single-replica assumption)",
        "Novel prompt-injection evasions may slip past the detector; the containment guarantees do not depend on it",
        "Provider-level log access and upstream network proxies remain outside LYNX's control, stated as such",
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