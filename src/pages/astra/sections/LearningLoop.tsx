import { Reveal, SectionHeader, AstraCard, ACCENT, cx } from "../AstraUi";

const LOOP = [
  { label: "01 · Perceive", desc: "Observe the task and its context." },
  { label: "02 · Reason", desc: "Form a plan and predict an outcome." },
  { label: "03 · Act", desc: "Execute the plan in the environment." },
  { label: "04 · Record", desc: "Store the interaction and its result." },
  { label: "05 · Reflect", desc: "Compare result to prediction. Reward or penalise." },
  { label: "06 · Improve", desc: "Update weights and policy. Loop returns to 01." },
];

const STEP_COLORS = ["#8B7CF6", "#7A8CFF", "#4F7CFF", "#6E6EF5", "#8B7CF6", "#B4A9FF"];

const LoopDiagram = () => (
  <div className="relative mx-auto aspect-square w-full max-w-xl">
    <div className="astra-float absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgba(139,124,246,0.16),transparent_68%)]" />
    <div className="astra-orbit absolute inset-[7%] rounded-full border border-dashed border-[#3B3B5C]/80" />
    <div className="astra-orbit-reverse absolute inset-[27%] rounded-full border border-[#2E2E4C]/80" />
    <div className="astra-orbit absolute inset-[7%]">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <span
          key={a}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#8B7CF6]"
          style={{
            transform: `rotate(${a}deg) translateX(43%)`,
            opacity: 0.9,
            boxShadow: "0 0 8px 0 rgba(139,124,246,0.9)",
          }}
        />
      ))}
    </div>

    {/* center node */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="astra-pulse-ring relative flex h-32 w-32 items-center justify-center rounded-full border border-[#34345A] bg-[#0B0B18] text-center shadow-[0_0_60px_-10px_rgba(139,124,246,0.5)] sm:h-40 sm:w-40">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B7CF6]">
            ASTRA
          </p>
          <p className="mt-1 text-sm font-semibold text-white sm:text-base">
            learning loop
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#77778F]">
            one loop / exp.
          </p>
        </div>
      </div>
    </div>

    {LOOP.map((step, i) => {
      const angle = i * 60;
      const color = STEP_COLORS[i];
      return (
        <div
          key={step.label}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `rotate(${angle}deg) translateY(-43%)`,
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `rotate(${-angle}deg) translateY(-140px)` }}
          >
            <div
              className={cx(
                "w-[118px] rounded-xl border bg-[#090912]/95 px-3 py-2.5 text-center backdrop-blur-sm sm:w-[132px]",
                i === 5 && "shadow-[0_0_30px_-8px_rgba(139,124,246,0.55)]"
              )}
              style={{ borderColor: `${color}44` }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                {step.label}
              </p>
              <p className="mt-1 text-[10px] leading-snug text-[#8E8EA8] sm:text-[11px]">
                {step.desc}
              </p>
            </div>
            <span
              className="mx-auto mt-0 block h-2 w-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

const LearningLoop = () => (
  <section
    id="learning-loop"
    className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    style={{
      background:
        "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(79,124,255,0.05), transparent 70%)",
    }}
  >
    <div className="container-responsive grid items-center gap-14 lg:grid-cols-2">
      <div>
        <SectionHeader
          eyebrow="02 · The mechanism"
          title={
            <>
              The <span style={{ color: ACCENT }}>learning loop</span> is the
              whole idea
            </>
          }
          subtitle="Every interaction ASTRA has becomes a datapoint it can learn from. The loop never stops at inference — it records, reflects and improves, then takes the next task."
        />
        <div className="mt-10 hidden gap-3 lg:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2A2A40] bg-[#0A0A14]/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#B9B9CF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B7CF6]" />
            continual
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2A2A40] bg-[#0A0A14]/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#B9B9CF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F7CFF]" />
            outcome-driven
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2A2A40] bg-[#0A0A14]/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#B9B9CF]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            consented
          </span>
        </div>
      </div>

      <Reveal>
        <LoopDiagram />
      </Reveal>

      <div className="mt-6 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOOP.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <AstraCard hover={false} className="h-full">
                <div className="p-5 lg:hidden">
                  <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: STEP_COLORS[i] }}>
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-[#8E8EA8]">{s.desc}</p>
                </div>
              </AstraCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LearningLoop;