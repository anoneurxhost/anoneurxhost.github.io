import {
  Repeat,
  Sparkles,
  Database,
  SearchCheck,
  Blocks,
  Scale,
  Cpu,
  FlaskConical,
} from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard, Chip } from "../AstraUi";

const MODULES = [
  {
    icon: Repeat,
    name: "Continual Learning",
    desc: "Learning without erasing what came before — avoiding catastrophic forgetting across long experience streams.",
  },
  {
    icon: Sparkles,
    name: "Task Generation",
    desc: "Self-generated curricula. The system should be able to produce the next useful task to try.",
  },
  {
    icon: Database,
    name: "Memory & Recall",
    desc: "A memory system that can store, index and recall across session boundaries without collapsing into noise.",
  },
  {
    icon: SearchCheck,
    name: "Self-Evaluation",
    desc: "Knowing how well you are doing without an external scorer — the foundation of honest, self-directed progress.",
  },
  {
    icon: Blocks,
    name: "Skill Compounding",
    desc: "Combining learned capabilities into larger routines, instead of learning each new skill from zero.",
  },
  {
    icon: Scale,
    name: "Alignment",
    desc: "Steering self-modification so improvements never undermine human intent, safety or consent boundaries.",
  },
  {
    icon: Cpu,
    name: "Training Efficiency",
    desc: "Doing more with less. Useful continual learning must be cheap enough to run constantly.",
  },
  {
    icon: FlaskConical,
    name: "Evaluation",
    desc: "Honest, reproducible and boring-by-design metrics. No cherry-picked demos, no inflated claims.",
  },
];

const Research = () => (
  <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="07 · Research"
        title={
          <>
            The open problems that{" "}
            <span className="text-[#8B7CF6]">make ASTRA real</span>
          </>
        }
        subtitle="Each is a research module in the Anoneurx Lab. None are solved yet — they are active areas of honest investigation."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06}>
            <AstraCard className="h-full">
              <CardHeader>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#A79BFF]">
                  <m.icon className="h-5 w-5" />
                </span>
                <CardTitle className="pt-5 text-base text-white">
                  {m.name}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {m.desc}
                </CardDescription>
              </CardHeader>
            </AstraCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8 flex flex-wrap items-center gap-3">
        <Chip tone="accent">Anoneurx Lab · research problems</Chip>
        <Chip tone="muted">open · transparent · peer-reviewed</Chip>
      </Reveal>
    </div>
  </section>
);

export default Research;