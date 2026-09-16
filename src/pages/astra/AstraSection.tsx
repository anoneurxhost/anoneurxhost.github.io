import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Network,
  Cpu,
  Brain,
  FlaskConical,
  Activity,
  History,
  Map,
  Compass,
  Microscope,
  Users,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Reveal } from "./AstraUi";

export type SectionDef = {
  to: string;
  index: string;
  nav: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const SECTION_INDEX: SectionDef[] = [
  {
    to: "/astra/what-is",
    index: "01",
    nav: "What is ASTRA",
    title: "What is ASTRA",
    desc: "The project, the goal and an honest note on the current state.",
    icon: Sparkles,
  },
  {
    to: "/astra/learning-loop",
    index: "02",
    nav: "The Learning Loop",
    title: "The learning loop is the whole idea",
    desc: "Perceive, reason, act, record, reflect, improve — the loop never stops at inference.",
    icon: RefreshCw,
  },
  {
    to: "/astra/scale",
    index: "03",
    nav: "Scale",
    title: "Built at 20B, aimed at 1T",
    desc: "Where the project is now and where its architecture is designed to go.",
    icon: TrendingUp,
  },
  {
    to: "/astra/architecture",
    index: "04",
    nav: "Architecture",
    title: "A tree with a looping core",
    desc: "Reference design: interface, core, memory and tools around a reasoning loop.",
    icon: Network,
  },
  {
    to: "/astra/self-learning",
    index: "05",
    nav: "Self-Learning",
    title: "Learns from usage, not just datasets",
    desc: "Record, judge, update, consolidate — the four moments behind self-learning.",
    icon: Cpu,
  },
  {
    to: "/astra/memory",
    index: "06",
    nav: "Memory Pipeline",
    title: "The memory pipeline makes recall possible",
    desc: "Episodic, semantic and procedural memory over the raw experience stream.",
    icon: Brain,
  },
  {
    to: "/astra/research",
    index: "07",
    nav: "Research",
    title: "The open problems that make ASTRA real",
    desc: "Eight active research modules in the Anoneurx Lab — none solved yet.",
    icon: Microscope,
  },
  {
    to: "/astra/status",
    index: "08",
    nav: "Status",
    title: "Current state of ASTRA",
    desc: "Transparent status, no smoothing. What is true today is reported as-is.",
    icon: Activity,
  },
  {
    to: "/astra/log",
    index: "09",
    nav: "Development Log",
    title: "A running record, the way research should be",
    desc: "Each entry states what exists and what does not — no release theatrics.",
    icon: History,
  },
  {
    to: "/astra/roadmap",
    index: "10",
    nav: "Roadmap",
    title: "A plan that respects reality",
    desc: "Phases, not promises. Each gate is passed on measured results.",
    icon: Map,
  },
  {
    to: "/astra/philosophy",
    index: "11",
    nav: "Philosophy",
    title: "The rules the project won't break",
    desc: "Five principles that constrain every technical decision.",
    icon: Compass,
  },
  {
    to: "/astra/lab",
    index: "12",
    nav: "The Lab",
    title: "Born in the Anoneurx Lab",
    desc: "The research lab behind the open problems, people and projects.",
    icon: FlaskConical,
  },
  {
    to: "/astra/contribute",
    index: "13",
    nav: "Contribute",
    title: "Help build something honest",
    desc: "Researchers, engineers and critical reviewers — there is a seat here.",
    icon: Users,
  },
];

export function IndexCard({ def, delay }: { def: SectionDef; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link to={def.to} className="group block h-full">
        <Card className="h-full rounded-lg border bg-white/5 border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#A79BFF]">
                <def.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5C74]">
                {def.index}
              </span>
            </div>
            <CardTitle className="pt-4 text-base text-white">
              {def.title}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {def.desc}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#A79BFF]">
              read
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </CardContent>
        </Card>
      </Link>
    </Reveal>
  );
}

export function AstraPageShell({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  const i = SECTION_INDEX.findIndex((s) => s.to === current);
  const def = SECTION_INDEX[i];
  const prev = SECTION_INDEX[i - 1];
  const next = SECTION_INDEX[i + 1];
  return (
    <main className="astra-bg relative">
      <div className="container-responsive pt-24">
        <Reveal>
          <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#5C5C74]">
            <Link
              to="/astra"
              className="text-[#A79BFF] transition-colors hover:text-white"
            >
              ASTRA
            </Link>
            <span>/</span>
            <span className="text-[#C7C7DE]">{def?.nav}</span>
          </nav>
        </Reveal>
      </div>

      {children}

      <div className="container-responsive pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          {prev ? (
            <Link
              to={prev.to}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#C7C7DE] transition-colors hover:border-[#8B7CF6]/50 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {prev.nav}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={next.to}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#C7C7DE] transition-colors hover:border-[#8B7CF6]/50 hover:text-white"
            >
              {next.nav}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}