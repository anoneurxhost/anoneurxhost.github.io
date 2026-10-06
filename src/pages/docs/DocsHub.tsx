import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Cloud,
  Code,
  Compass,
  Cpu,
  GitBranch,
  LifeBuoy,
  Rocket,
  Server,
  Terminal,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const guides = [
  {
    title: "Getting Started",
    description: "Install the Anoneurx toolchain, clone your first project and run it locally in under ten minutes.",
    to: "/docs/getting-started",
    icon: Rocket,
  },
  {
    title: "API Reference",
    description: "Endpoints, request and response shapes, authentication and rate limits for the public Anoneurx APIs.",
    to: "/docs/api-reference",
    icon: Code,
  },
  {
    title: "Deployment Guide",
    description: "Build, configure and ship Anoneurx services to production, including environment and rollout guidance.",
    to: "/docs/deployment",
    icon: Cloud,
  },
  {
    title: "Contribution Guide",
    description: "How to report issues, propose changes and land a first contribution across our repositories.",
    to: "/docs/contributions",
    icon: GitBranch,
  },
];

const products = [
  {
    name: "Black Wall OS",
    description: "Hardened operating system — install paths, syscall surface and security model.",
    to: "/docs/blackwall",
    icon: Terminal,
    status: "Stable",
  },
  {
    name: "Nexora",
    description: "Privacy-first browser — configuration, sync, extensions and network controls.",
    to: "/docs/nexora",
    icon: Compass,
    status: "Stable",
  },
  {
    name: "ATLAS",
    description: "Compiler and GPU renderer — toolchain setup, language reference and backend notes.",
    to: "/docs/atlas",
    icon: Cpu,
    status: "Beta",
  },
  {
    name: "Anoneurx Cloud",
    description: "Virtual machines, object storage and managed runtimes — provisioning and networking.",
    to: "/cloud",
    icon: Server,
    status: "Stable",
  },
];

const DocsHub = () => (
  <PageTransition>
    <SEO
      title="Documentation"
      path="/docs"
      description="Documentation hub for Anoneurx — guides, API reference and deployment instructions, plus per-product docs for Black Wall OS, Nexora, ATLAS and Anoneurx Cloud."
    />

    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.16),transparent_60%)]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28"
        >
          <Badge className="mb-6 border-white/10 bg-white/5 text-white/70">Documentation</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to build with <span className="font-brand">Anoneurx</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            Guides, references and per-product documentation. Every document is versioned with the code and
            reviewed when the underlying software changes.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <BookOpen className="h-4 w-4" />
              Start with the basics
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/docs/api-reference"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white"
            >
              <Code className="h-4 w-4" />
              API reference
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Core guides</h2>
        <p className="mt-2 text-white/50">Start here if you are new to the platform or need a deployment path.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <motion.div key={guide.to} initial="hidden" animate="visible" variants={fadeUp}>
              <Link to={guide.to} className="group block h-full">
                <Card className="h-full border-white/[0.08] bg-white/[0.02] transition-colors group-hover:border-primary/40 group-hover:bg-white/[0.04]">
                  <CardContent className="p-6">
                    <guide.icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-4 flex items-center gap-1.5 text-lg font-medium">
                      {guide.title}
                      <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{guide.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Product documentation</h2>
        <p className="mt-2 text-white/50">Reference material for individual products in the Anoneurx ecosystem.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <motion.div key={product.to} initial="hidden" animate="visible" variants={fadeUp}>
              <Link to={product.to} className="group block h-full">
                <Card className="h-full border-white/[0.08] bg-white/[0.02] transition-colors group-hover:border-primary/40 group-hover:bg-white/[0.04]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <product.icon className="h-5 w-5 text-primary" />
                      <Badge
                        className={
                          product.status === "Stable"
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                            : "border-amber-400/30 bg-amber-400/10 text-amber-300"
                        }
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <h3 className="mt-4 flex items-center gap-1.5 text-lg font-medium">
                      {product.name}
                      <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{product.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-medium">
              <LifeBuoy className="h-5 w-5 text-primary" />
              Still stuck?
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Open an issue on the repository or reach the maintainers directly — we answer both.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/opensource/contribute"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/25 hover:text-white"
            >
              Contribute
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/25 hover:text-white"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default DocsHub;