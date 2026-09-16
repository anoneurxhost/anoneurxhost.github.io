import { Eye, Scale, RefreshCcw, FileCheck2, Ban } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard, Chip } from "../AstraUi";

const STEPS = [
  {
    icon: Eye,
    tag: "record",
    title: "Experience is recorded",
    body: "With explicit consent, interactions are logged as structured experience — what was asked, what was done, what happened next.",
  },
  {
    icon: Scale,
    tag: "judge",
    title: "Outcomes are weighed",
    body: "The result is compared to the prediction the loop made before acting. Reward comes from outcomes, not from matching a static label.",
  },
  {
    icon: RefreshCcw,
    tag: "update",
    title: "The model improves",
    body: "Weight updates and policy changes are derived from that reflection. The next similar task starts from a slightly better state.",
  },
  {
    icon: FileCheck2,
    tag: "consolidate",
    title: "Skills compound",
    body: "What works is folded into memory and reusable routines, so the loop gets faster at tasks it has seen before.",
  },
];

const CAVEATS = [
  "Strict data consent — nothing is learned from without permission",
  "No silent autonomy — guardrails and sandbox are non-negotiable",
  "Progress is measured with honest, reproducible evaluations",
  "Failures are logged and studied, never papered over",
];

const SelfLearning = () => (
  <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="05 · Self-learning"
          title={
            <>
              Learns from <span className="text-[#8B7CF6]">usage</span>, not just
              from datasets
            </>
          }
          subtitle="The four-moment pipeline behind 'self-learning': record, judge, update, consolidate."
        />
        <Reveal>
          <Chip tone="muted">no human retraining loop</Chip>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.08}>
            <AstraCard className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#A79BFF]">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5C74]">
                    0{i + 1}
                  </span>
                </div>
                <CardTitle className="pt-5 text-base text-white">
                  {s.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {s.body}
                </CardDescription>
              </CardHeader>
            </AstraCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <AstraCard hover={false}>
          <CardHeader>
            <div className="flex items-start gap-3">
              <Ban className="mt-0.5 h-5 w-5 shrink-0 text-[#8B7CF6]" />
              <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {CAVEATS.map((c) => (
                  <p key={c} className="text-sm leading-relaxed text-[#B9B9CF]">
                    <span className="mr-2 text-[#8B7CF6]">·</span>
                    {c}
                  </p>
                ))}
              </div>
            </div>
          </CardHeader>
        </AstraCard>
      </Reveal>
    </div>
  </section>
);

export default SelfLearning;