import { Reveal, SectionHeader, ACCENT, ACCENT_BLUE, cx } from "../AstraUi";

const ENTRIES = [
  {
    date: "Sep 2026",
    title: "20B baseline defined",
    body: "The architecture review settled on the 20B research baseline: a single loopable model, the three-type memory interface and the sandboxed tool layer. The 1T figure is documented as an architectural target, not a near-term milestone.",
    state: "now",
  },
  {
    date: "Aug 2026",
    title: "Learning-loop simulation started",
    body: "First executable pass over the full loop — perceive, reason, act, record, reflect, improve — running on constrained tasks so the loop itself can be iterated on quickly.",
    state: "active",
  },
  {
    date: "Aug 2026",
    title: "Core planner + memory interface stubbed",
    body: "The planner and the memory read/write interface exist as working stubs, letting the lab experiment with recall before the record layer is fully trained.",
    state: "done",
  },
  {
    date: "Jul 2026",
    title: "Research frames finalised",
    body: "The eight research modules — continual learning, task generation, memory, self-evaluation, skill compounding, alignment, efficiency and honest evaluation — were scoped as open problems.",
    state: "done",
  },
  {
    date: "Jul 2026",
    title: "ASTRA initiated in Anoneurx Lab",
    body: "Project begun inside the Anoneurx Lab with a standing rule: published progress must match measured progress.",
    state: "done",
  },
];

const dotColor = (state: string) =>
  state === "now" ? ACCENT : state === "active" ? ACCENT_BLUE : "#3A4356";

const stateLabel = (state: string) =>
  state === "now" ? "current" : state === "active" ? "in progress" : "done";

const Log = () => (
  <section
    id="log"
    className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    style={{
      background:
        "radial-gradient(ellipse 50% 45% at 85% 30%, rgba(56,189,248,0.06), transparent 70%)",
    }}
  >
    <div className="container-responsive grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <SectionHeader
          eyebrow="09 · Development log"
          title={
            <>
              A running <span className="text-[#38BDF8]">record</span>, the way
              research should be
            </>
          }
          subtitle="Each entry states what exists and what does not. No release theatrics — just the state of the work."
        />
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2A3243] bg-[#0A0E14]/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#B9C0CF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
              current phase
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2A3243] bg-[#0A0E14]/70 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#B9C0CF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4F7CFF]" />
              loop simulation
            </span>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#262E3D]" />
        <div className="space-y-8">
          {ENTRIES.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <div className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 block h-[9px] w-[9px] rounded-full ring-4"
                  style={{
                    background: dotColor(e.state),
                    boxShadow: e.state === "now" ? "0 0 16px 2px rgba(56,189,248,0.55)" : "none",
                    ["--tw-ring-color" as string]: `${dotColor(e.state)}22`,
                  }}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#777F8F]">
                    {e.date}
                  </span>
                  <span
                    className={cx(
                      "rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                      e.state === "done"
                        ? "border-[#3A4356] text-[#777F8F]"
                        : "border-[#38BDF8]/40 text-[#7DD3FC]"
                    )}
                  >
                    {stateLabel(e.state)}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#8E96A8]">{e.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Log;