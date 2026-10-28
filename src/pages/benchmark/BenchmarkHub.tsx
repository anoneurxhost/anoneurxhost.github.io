import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Gauge, GitBranch, ShieldCheck } from "lucide-react";
import BenchmarkLayout from "@/components/BenchmarkLayout";
import SEO from "@/components/SEO";
import { benchmarkApps } from "@/data/benchmarkData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "LYNX",
    description: "Search quality, latency, indexing and crawler benchmarks for the LYNX search system.",
    to: "/benchmark/lynx",
    icon: BarChart3,
    status: "Current",
  },
  {
    title: "Performance",
    description: "A home for reproducible measurements across Anoneurx systems and services.",
    to: "/benchmark/lynx#performance",
    icon: Gauge,
    status: "Explore",
  },
  {
    title: "Regression gates",
    description: "Thresholds that protect search quality, latency and build performance in CI.",
    to: "/benchmark/lynx#regression-detection",
    icon: ShieldCheck,
    status: "Tracked",
  },
];

const BenchmarkHub = () => (
  <>
    <SEO
      title="Benchmarks"
      path="/benchmark"
      description="Reproducible benchmarks for Anoneurx systems, including LYNX search quality, latency, indexing and crawler performance."
    />

    <BenchmarkLayout eyebrow="Research & engineering" title="Benchmarks for systems that have to hold up" description="Reproducible measurements for search quality, system performance and the regression thresholds that keep releases honest.">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <Link to="/benchmark/lynx" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          View LYNX benchmarks <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Benchmark library</h2>
            <p className="mt-2 text-white/50">Published measurements and the commands used to reproduce them.</p>
          </div>
          <GitBranch className="hidden h-6 w-6 text-primary sm:block" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <Link to={section.to} className="group block h-full">
                <Card className="h-full border-white/[0.08] bg-white/[0.02] transition-colors group-hover:border-primary/40 group-hover:bg-white/[0.04]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <section.icon className="h-5 w-5 text-primary" />
                      <Badge className="border-white/10 bg-white/[0.04] text-white/45">{section.status}</Badge>
                    </div>
                    <h3 className="mt-5 flex items-center gap-2 text-lg font-medium">
                      {section.title}
                      <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-white/[0.08] bg-white/[0.02] p-5 text-sm text-white/55">
          {benchmarkApps.length} application{benchmarkApps.length === 1 ? "" : "s"} currently publish structured benchmark data. New systems can be added without changing this page contract.
        </div>
      </main>
    </BenchmarkLayout>
  </>
);

export default BenchmarkHub;
