import { Fragment } from "react";
import { BookOpen, Brain, Cpu, ShieldCheck } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard, ACCENT } from "../AstraUi";

const PIPELINE = [
  { label: "Experience", tone: "#8B7CF6" },
  { label: "Encode", tone: "#7A8CFF" },
  { label: "Store", tone: "#4F7CFF" },
  { label: "Recall", tone: "#6E6EF5" },
  { label: "Consolidate", tone: "#8B7CF6" },
  { label: "Reinforce", tone: "#B4A9FF" },
];

const TYPES = [
  {
    icon: BookOpen,
    name: "Episodic",
    body: "What happened, when, and with what context. The raw experience stream of the loop — linked to outcomes and reflections.",
  },
  {
    icon: Brain,
    name: "Semantic",
    body: "Generalised knowledge distilled from repeated experience. The memory ASTRA can recall without replaying the original session.",
  },
  {
    icon: Cpu,
    name: "Procedural",
    body: "Learned routines and skills — compact strategies the loop can invoke instead of reasoning from scratch each time.",
  },
];

const Memory = () => (
  <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="06 · Memory"
        title={
          <>
            The memory <span style={{ color: ACCENT }}>pipeline</span> is what
            makes recall possible
          </>
        }
        subtitle="A loop without memory is only reactive. ASTRA's three-type memory architecture is what lets experience become lasting capability."
      />

      <Reveal className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="relative hidden overflow-hidden py-4 lg:block">
          <div className="absolute inset-y-[44%] inset-x-0 h-px bg-gradient-to-r from-[#8B7CF6]/40 via-[#4F7CFF]/50 to-[#B4A9FF]/40" />
          <div className="absolute inset-y-[44%] inset-x-0 h-px overflow-hidden opacity-70">
            <div
              className="h-full w-32"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,124,246,1), transparent)",
                animation: "astra-pipeline 4s linear infinite",
              }}
            />
          </div>
          <div className="relative mx-auto flex w-full max-w-4xl items-center justify-between">
            {PIPELINE.map((p, i) => (
              <Fragment key={p.label}>
                <div className="flex flex-col items-center gap-3 px-2 sm:px-3">
                  <span className="relative block h-3 w-3">
                    <span
                      className="absolute inset-0 rounded-full opacity-40"
                      style={{ background: p.tone }}
                    />
                    <span
                      className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full"
                      style={{ background: p.tone }}
                    />
                  </span>
                  <span
                    className="whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-wider"
                    style={{ color: p.tone }}
                  >
                    {p.label}
                  </span>
                </div>
                {i < PIPELINE.length - 1 ? (
                  <div className="hidden h-px flex-1 bg-[#2A2A44]/80 sm:block" />
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 py-4 lg:hidden" style={{ WebkitOverflowScrolling: "touch" }}>
          {PIPELINE.map((p) => (
            <span
              key={p.label}
              className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider"
              style={{ borderColor: `${p.tone}3A`, color: p.tone, background: "#090912" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.tone }} />
              {p.label}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {TYPES.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <AstraCard className="h-full">
              <CardHeader>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#A79BFF]">
                  <t.icon className="h-5 w-5" />
                </span>
                <CardTitle className="pt-4 text-lg text-white">
                  {t.name}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {t.body}
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
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#4F7CFF]" />
              <div>
                <p className="text-sm font-medium text-[#B9B9CF]">Privacy by default</p>
                <p className="mt-1 text-sm leading-relaxed text-[#8E8EA8]">
                  No memory is created from unconsented interaction. Every memory
                  block carries provenance metadata, retention limits and can be
                  deleted on request. Consent is a runtime property, not an
                  afterthought.
                </p>
              </div>
            </div>
          </CardHeader>
        </AstraCard>
      </Reveal>
    </div>
  </section>
);

export default Memory;