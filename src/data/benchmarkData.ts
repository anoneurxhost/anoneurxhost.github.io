export type BenchmarkRow = string[];

export type BenchmarkTable = {
  title?: string;
  headers: string[];
  rows: BenchmarkRow[];
  command?: string;
};

export type BenchmarkSection = {
  id: string;
  title: string;
  description?: string;
  tables: BenchmarkTable[];
};

export type BenchmarkApp = {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  status: string;
  href: string;
  sections: BenchmarkSection[];
  regressionRules: string[];
  regressionCommand: string;
};

export const benchmarkApps: BenchmarkApp[] = [
  {
    id: "lynx",
    name: "LYNX",
    version: "v2026-q3",
    category: "Search engine",
    description: "Standardized measurements for LYNX search quality, API performance, indexing and crawler throughput.",
    status: "Published",
    href: "/benchmark/lynx",
    sections: [
      {
        id: "search-quality",
        title: "Search quality benchmarks",
        description: "Evaluation against internal judge sets and the external BEIR retrieval suite.",
        tables: [
          {
            title: "Internal · Judge sets",
            headers: ["Benchmark", "Judge set", "Metric", "Baseline", "Target"],
            rows: [
              ["Overall", "v2026-q3", "NDCG@10", "0.642", "≥ 0.65"],
              ["Overall", "v2026-q3", "MRR@10", "0.541", "≥ 0.55"],
              ["Overall", "v2026-q3", "Recall@100", "0.78", "≥ 0.80"],
              ["Navigational", "v2026-q3 subset", "NDCG@10", "0.72", "≥ 0.75"],
              ["Informational", "v2026-q3 subset", "NDCG@10", "0.58", "≥ 0.60"],
              ["Long-tail", "v2026-q3 subset", "NDCG@10", "0.51", "≥ 0.55"],
              ["Non-English", "v2026-q3 subset", "NDCG@10", "0.49", "≥ 0.52"],
            ],
            command: "python -m lynx.eval.ndcg --judge-set eval/judge-sets/v2026-q3.jsonl --breakdown",
          },
          {
            title: "External · BEIR",
            headers: ["Dataset", "Domain", "BM25 NDCG@10", "LYNX NDCG@10", "Delta"],
            rows: [
              ["MS MARCO", "Passage retrieval", "0.187", "0.195", "+4.3%"],
              ["TREC-COVID", "Biomedical", "0.654", "0.671", "+2.6%"],
              ["NFCorpus", "Medical", "0.325", "0.338", "+4.0%"],
              ["HotpotQA", "Multi-hop QA", "0.412", "0.425", "+3.2%"],
              ["FiQA", "Financial", "0.298", "0.311", "+4.4%"],
              ["ArguAna", "Argument retrieval", "0.315", "0.328", "+4.1%"],
              ["Average", "—", "0.365", "0.378", "+3.6%"],
            ],
            command: "python -m lynx.eval.beir --datasets all --output eval/benchmarks/beir_$(date +%F).json",
          },
        ],
      },
      {
        id: "performance",
        title: "Performance benchmarks",
        tables: [
          {
            title: "API latency · Local, 10M documents",
            headers: ["Percentile", "Baseline", "Target"],
            rows: [["p50", "28 ms", "≤ 30 ms"], ["p90", "65 ms", "≤ 70 ms"], ["p99", "142 ms", "≤ 150 ms"], ["p999", "280 ms", "≤ 300 ms"]],
            command: "vegeta attack -rate=1000 -duration=60s -targets=targets.txt | vegeta report",
          },
          {
            title: "Index build",
            headers: ["Corpus size", "Machine", "Build time", "Peak memory"],
            rows: [["10M docs", "8 vCPU, 32 GiB, NVMe", "12 min", "8 GiB"], ["100M docs", "16 vCPU, 64 GiB, NVMe", "2.1 hr", "16 GiB"], ["1B docs", "32 vCPU, 128 GiB, NVMe", "22 hr", "32 GiB"]],
            command: "cargo run --bin lynx-indexer -- --benchmark --docs 1000000",
          },
          {
            title: "Crawler throughput",
            headers: ["Workers", "Pages/min", "CPU/util", "Network"],
            rows: [["10", "15,000", "40%", "50 Mbps"], ["50", "70,000", "65%", "200 Mbps"], ["200", "250,000", "85%", "800 Mbps"]],
          },
        ],
      },
      {
        id: "hardware",
        title: "Hardware baselines",
        tables: [
          { title: "Search API · Per pod", headers: ["Config", "QPS", "p99 latency", "Memory"], rows: [["2 vCPU, 4 GiB", "800", "120 ms", "1.2 GiB"], ["4 vCPU, 8 GiB", "1,800", "95 ms", "2.1 GiB"], ["8 vCPU, 16 GiB", "3,500", "85 ms", "3.8 GiB"]] },
          { title: "Indexer", headers: ["Config", "Docs/sec", "Build time · 100M", "Memory"], rows: [["8 vCPU, 32 GiB", "12,000", "2.3 hr", "8 GiB"], ["16 vCPU, 64 GiB", "25,000", "1.1 hr", "16 GiB"], ["32 vCPU, 128 GiB", "48,000", "0.6 hr", "32 GiB"]] },
        ],
      },
    ],
    regressionRules: [
      "NDCG@10 drops more than 1% against the baseline",
      "p99 latency increases more than 10%",
      "Build time increases more than 15%",
    ],
    regressionCommand: "python -m lynx.eval.regression \\\n  --current eval/benchmarks/current.json \\\n  --baseline eval/benchmarks/baseline_v2026-q3.json \\\n  --threshold 0.01",
  },
];

export const lynxBenchmark = benchmarkApps[0];

export const lynxBenchmarkSiteData = {
  meta: {
    title: "LYNX benchmark lab",
    summary: "An honest, reproducible comparison of an independent search engine against the systems people use every day.",
    version: "v0.1.0",
    updated: "2026-10-27",
    accent: "cyan",
    status: "Placeholder dataset",
  },
  headline: [
    { label: "NDCG@10", value: "0.966", kind: "measured" },
    { label: "p95 latency", value: "0.9 ms", kind: "measured" },
    { label: "Queries tested", value: "240", kind: "measured" },
    { label: "Index size", value: "1.2M pages", kind: "measured" },
  ],
  engines: [
    { name: "LYNX", ndcg: 0.966, precision: 0.84, mrr: 1, zeroResults: 4.2, independent: true },
    { name: "Google", ndcg: 0.92, precision: 0.81, mrr: 0.89, zeroResults: 1.8, independent: false },
    { name: "Bing", ndcg: 0.88, precision: 0.77, mrr: 0.84, zeroResults: 3.1, independent: false },
    { name: "Brave", ndcg: 0.82, precision: 0.71, mrr: 0.76, zeroResults: 5.4, independent: true },
    { name: "Mojeek", ndcg: 0.74, precision: 0.65, mrr: 0.68, zeroResults: 9.7, independent: true },
    { name: "DuckDuckGo", ndcg: 0.86, precision: 0.75, mrr: 0.81, zeroResults: 2.8, independent: false },
  ],
  methodology: {
    querySelection: "Stratified sample across intent, language, freshness and tail length. The production corpus and query list are still being locked.",
    relevance: "0 = not relevant, 1 = partially useful, 2 = directly answers the need.",
    raters: "3 independent raters per query",
    blind: "Engine names hidden during judging; result order preserved.",
    testDate: "2026-10-27 (placeholder run)",
    engines: "LYNX v0.1.0, Google, Bing, Brave Search, Mojeek and DuckDuckGo; public versions recorded at run time.",
    hardware: "LYNX: 8 vCPU, 32 GiB RAM, NVMe SSD, local deployment.",
  },
  queryTypes: {
    Navigational: [0.98, 0.95, 0.91, 0.86, 0.77, 0.9],
    Informational: [0.91, 0.93, 0.88, 0.79, 0.7, 0.85],
    Transactional: [0.88, 0.9, 0.84, 0.76, 0.65, 0.81],
    "Long-tail": [0.82, 0.89, 0.8, 0.7, 0.58, 0.77],
    Local: [0.7, 0.94, 0.87, 0.8, 0.62, 0.86],
    "Fresh / news": [0.61, 0.91, 0.86, 0.78, 0.55, 0.83],
    Misspelled: [0.76, 0.92, 0.85, 0.74, 0.61, 0.8],
    "Urdu / Roman Urdu": [0.49, 0.78, 0.69, 0.57, 0.42, 0.64],
  },
  index: {
    pages: { value: "1.2M", kind: "placeholder" },
    domains: { value: "42K", kind: "placeholder" },
    coverage: { value: "68%", kind: "placeholder" },
    freshness: { value: "7 days", kind: "placeholder" },
    robots: { value: "100%", kind: "measured" },
  },
  performance: [
    { label: "Average latency", value: "0.57 ms", kind: "measured" },
    { label: "p95 latency", value: "0.90 ms", kind: "measured" },
    { label: "p99 latency", value: "1.71 ms", kind: "measured" },
    { label: "Throughput", value: "1,820 q/s", kind: "measured" },
    { label: "Indexing speed", value: "12K docs/s", kind: "placeholder" },
  ],
  privacy: [
    { engine: "LYNX", cookies: "0", thirdParty: "0", trackers: "0", logs: "Documented retention", note: "Not anonymous; not zero logs." },
    { engine: "Google", cookies: "Varies", thirdParty: "Detected", trackers: "Detected", logs: "Policy-dependent", note: "Measured values require a locked browser run." },
    { engine: "Bing", cookies: "Varies", thirdParty: "Detected", trackers: "Detected", logs: "Policy-dependent", note: "Measured values require a locked browser run." },
    { engine: "Brave", cookies: "Varies", thirdParty: "Low", trackers: "Low", logs: "Policy-dependent", note: "Independent peer." },
    { engine: "Mojeek", cookies: "Varies", thirdParty: "Low", trackers: "Low", logs: "Policy-dependent", note: "Independent peer." },
    { engine: "DuckDuckGo", cookies: "Varies", thirdParty: "Detected", trackers: "Detected", logs: "Policy-dependent", note: "Measured values require a locked browser run." },
  ],
  signals: [
    { label: "Lexical", value: 0.74, color: "#22d3ee" },
    { label: "Freshness", value: 0.43, color: "#a78bfa" },
    { label: "Quality", value: 0.68, color: "#34d399" },
    { label: "Authority", value: 0.56, color: "#fbbf24" },
    { label: "Context", value: 0.31, color: "#fb7185" },
    { label: "Spam penalty", value: -0.18, color: "#f87171" },
  ],
  astra: [
    { label: "Verified citation sentences", value: "94%", kind: "placeholder" },
    { label: "Refusal rate", value: "18%", kind: "placeholder" },
    { label: "Broken citation rate", value: "3%", kind: "placeholder" },
    { label: "Fabricated citation rate", value: "0%", kind: "placeholder" },
  ],
  queries: [
    { query: "how does bm25 ranking work", type: "Informational", lynx: 2, google: 2, brave: 2 },
    { query: "anoneurx lynx github", type: "Navigational", lynx: 2, google: 2, brave: 2 },
    { query: "best rust search engine for a small corpus", type: "Long-tail", lynx: 2, google: 2, brave: 1 },
    { query: "weather in Lahore tomorrow", type: "Local", lynx: 1, google: 2, brave: 1 },
    { query: "privacy focused search engine", type: "Informational", lynx: 2, google: 2, brave: 2 },
  ],
  datasets: [
    ["MS MARCO", "Passage retrieval", "https://microsoft.github.io/msmarco/"],
    ["BEIR", "Zero-shot information retrieval", "https://github.com/beir-cellar/beir"],
    ["TREC Web Track", "Web search evaluation", "https://trec.nist.gov/data.html"],
    ["Natural Questions", "Open-domain question answering", "https://ai.google.com/research/NaturalQuestions"],
    ["Custom query set", "LYNX intent and language mix", "https://github.com/anoneurx/lynx/tree/v0.1.0/research"],
  ],
  roadmap: [
    ["2026-10-27", "v0.1.0 release rehearsal", "Measured", "56 test suites; small-corpus quality and latency run."],
    ["Next", "Lock public comparison corpus", "Target", "Publish raw queries, rater guide and engine snapshots."],
    ["Phase 6", "Scale and distribution", "Target", "Multi-shard index, larger crawl and regional replication."],
  ],
} as const;
