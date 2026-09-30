import { Sparkles, Ban, FlaskConical } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard, Chip } from "../AstraUi";

const CARDS = [
  {
    icon: Sparkles,
    title: "What ASTRA is",
    tone: "accent" as const,
    body: "A research AI with a continual self-improvement loop. It perceives a task, reasons about it, acts, records the outcome, reflects on its own performance and updates itself — without waiting for a human to retrain it.",
  },
  {
    icon: Ban,
    title: "What ASTRA is not",
    tone: "muted" as const,
    body: "Not a chatbot, not a hosted product, and not a magic AGI claim. No inflated benchmarks, no promised superintelligence. It is a slow, careful engineering attempt at one specific property: learning from experience.",
  },
  {
    icon: FlaskConical,
    title: "Current state",
    tone: "blue" as const,
    body: "A 20 billion parameter research system in the Anoneurx Lab. The learning-loop simulation is the active phase; memory, self-evaluation and task generation are being built on top. Everything below is honest about what exists and what does not.",
  },
];

const WhatIs = () => (
  <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="01 · Project"
        title={
          <>
            A model that keeps learning{" "}
            <span className="text-[#38BDF8]">after training</span>
          </>
        }
        subtitle="Most models are frozen the moment training ends. ASTRA is an attempt to close the gap between 'trained' and 'finished' — a system built to keep getting better from real experience."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <AstraCard className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#7DD3FC]">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <Chip tone={c.tone}>{c.tone}</Chip>
                </div>
                <CardTitle className="pt-4 text-lg text-white">
                  {c.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {c.body}
                </CardDescription>
              </CardHeader>
            </AstraCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhatIs;