import { TrendingUp, Target, AlertTriangle } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Reveal, SectionHeader, AstraCard, GradientText, ACCENT, ACCENT_BLUE } from "../AstraUi";

const MARKERS = [
  { label: "now", value: "20B", color: ACCENT, width: "2%" },
  { label: "next", value: "100B", color: ACCENT_BLUE, width: "9%" },
  { label: "long-term target", value: "1T", color: "#93C5FD", width: "100%" },
];

const NOTES = [
  {
    icon: TrendingUp,
    title: "Why start at 20B",
    body: "A scale we can actually train, evaluate and learn from honestly. Small enough to iterate the loop daily, large enough to generalise. Every capability ships on the 20B system before scale becomes a distraction.",
  },
  {
    icon: Target,
    title: "The 1T question",
    body: "The target is not 'a bigger single model'. It is the architectural question of how memory, routing and self-modification should behave when the substrate is a trillion parameters across a distributed structure. A research question, not a promise.",
  },
  {
    icon: AlertTriangle,
    title: "Honestly hard",
    body: "Compute cost, data quality, catastrophic forgetting and evaluation are all unresolved. We report real blockers, not smoothed curves. Scale is a consequence of the loop working, not the other way around.",
  },
];

const Scale = () => (
  <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <SectionHeader
        eyebrow="03 · Scale"
        title={
          <>
            Built at <GradientText>20B</GradientText>. Aimed at{" "}
            <GradientText>1T</GradientText>.
          </>
        }
        subtitle="Scale is stated plainly — where the project is now, and where its architecture is designed to go. No inflated claims in between."
      />

      <Reveal className="mt-12">
        <AstraCard className="p-7 sm:p-9" hover={false}>
          {/* 20B→1T scale bar */}
          <div className="relative h-24 w-full">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#38BDF8]/60 via-[#4F7CFF]/60 to-[#93C5FD]" />

            {MARKERS.map((m) => (
              <div
                key={m.value}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: m.width }}
              >
                <div
                  className="absolute -bottom-0.5 h-3 w-px"
                  style={{ background: m.color }}
                />
                <span className="absolute bottom-4 whitespace-nowrap font-mono text-lg font-semibold" style={{ color: m.color }}>
                  {m.value}
                </span>
                <span className="absolute bottom-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-[#777F8F]">
                  {m.label}
                </span>
              </div>
            ))}

            <div
              className="absolute bottom-0 h-[3px] w-full rounded-full opacity-80"
              style={{
                background:
                  "linear-gradient(90deg, rgba(56,189,248,0.2) 0%, rgba(56,189,248,1) 9%, rgba(79,124,255,1) 60%, rgba(180,169,255,1) 100%)",
              }}
            />
            <div
              className="absolute -bottom-2 flex translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#38BDF8]/60 bg-[#0B0F14] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#7DD3FC]"
              style={{ left: "9%" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#38BDF8]" />
              current
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "current scale", v: "20B params", tone: ACCENT },
              { k: "next milestone", v: "100B params", tone: ACCENT_BLUE },
              { k: "architectural target", v: "1T params", tone: "#93C5FD" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#777F8F]">
                  {s.k}
                </p>
                <p className="mt-1 text-2xl font-semibold" style={{ color: s.tone }}>
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </AstraCard>
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {NOTES.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.08}>
            <AstraCard className="h-full">
              <CardHeader>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#7DD3FC]">
                  <n.icon className="h-5 w-5" />
                </span>
                <CardTitle className="pt-4 text-lg text-white">
                  {n.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {n.body}
                </CardDescription>
              </CardHeader>
            </AstraCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Scale;