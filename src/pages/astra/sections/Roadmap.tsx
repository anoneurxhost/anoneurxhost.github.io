import { Reveal, SectionHeader, ACCENT, ACCENT_BLUE, cx } from "../AstraUi";

const PHASES = [
  {
    code: "P0",
    name: "Foundations",
    state: "done" as const,
    when: "done",
    body: "Architecture settled, loop defined, 20B baseline chosen, research frames scoped.",
  },
  {
    code: "P1",
    name: "Memory & Self-Evaluation",
    state: "active" as const,
    when: "current",
    body: "The learning-loop simulation with working episodic/semantic/procedural memory and internal scoring.",
  },
  {
    code: "P2",
    name: "Task Generation & Continual Learning",
    state: "planned" as const,
    when: "next",
    body: "The loop starts producing its own curricula and improving without manual checkpoints.",
  },
  {
    code: "P3",
    name: "Scale to 100B",
    state: "planned" as const,
    when: "next",
    body: "Only after the loop is proven at 20B does the substrate grow — following the principle of capability before scale.",
  },
  {
    code: "P4",
    name: "Long horizon · 1T",
    state: "planned" as const,
    when: "long-term",
    body: "Architectural research into memory and routing at trillion-parameter scale. The target, not the promise.",
  },
];

const stateStyle: Record<string, { label: string; cls: string }> = {
  done: { label: "done", cls: "border-[#3A3A56] text-[#77778F]" },
  active: { label: "current", cls: "border-[#8B7CF6]/50 text-[#A79BFF]" },
  planned: { label: "planned", cls: "border-[#2A2A44] text-[#5C5C74]" },
};

const lineColor = (state: string) =>
  state === "done" ? ACCENT_BLUE : state === "active" ? ACCENT : "#2A2A44";

const Roadmap = () => (
  <section
    id="roadmap"
    className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    style={{
      background:
        "radial-gradient(ellipse 55% 50% at 20% 40%, rgba(79,124,255,0.06), transparent 70%)",
    }}
  >
    <div className="container-responsive">
      <SectionHeader
        eyebrow="10 · Roadmap"
        title={
          <>
            A plan that respects <span className="text-[#8B7CF6]">reality</span>
          </>
        }
        subtitle="Phases, not promises. Each gate must be passed on the previous phase's measured results — scale is never scheduled ahead of the loop."
      />

      <div className="relative mt-14">
        <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#262640]" />
        <div className="space-y-10">
          {PHASES.map((p, i) => {
            const s = stateStyle[p.state];
            return (
              <Reveal key={p.code} delay={i * 0.06}>
                <div className="relative pl-10 sm:pl-12">
                  <div
                    className="absolute left-0 top-1.5 flex h-[21px] w-[21px] items-center justify-center rounded-full border-2"
                    style={{ borderColor: lineColor(p.state) }}
                  >
                    <span
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: lineColor(p.state),
                        boxShadow:
                          p.state === "active"
                            ? "0 0 12px 2px rgba(139,124,246,0.7)"
                            : "none",
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                      {p.code}
                    </span>
                    <span
                      className={cx(
                        "rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                        s.cls
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{p.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8E8EA8]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Roadmap;