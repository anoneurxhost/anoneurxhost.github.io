import { ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";

type BenchmarkLayoutProps = {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  backLabel?: string;
  backTo?: string;
  version?: string;
};

const BenchmarkLayout = ({
  children,
  eyebrow,
  title,
  description,
  backLabel,
  backTo,
  version,
}: BenchmarkLayoutProps) => (
  <PageTransition>
    <div className="min-h-screen bg-transparent text-white">
      <header className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">
          {backTo && backLabel && (
            <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          )}
          <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge className="border-white/10 bg-white/5 text-white/70">{eyebrow}</Badge>
                {version && <Badge className="border-cyan-400/20 bg-cyan-400/10 text-cyan-300">{version}</Badge>}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/60">{description}</p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white/55">
              <BarChart3 className="h-4 w-4 text-primary" />
              Reproducible evaluation
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  </PageTransition>
);

export default BenchmarkLayout;
