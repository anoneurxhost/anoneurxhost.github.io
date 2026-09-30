import { Reveal, SectionHeader, AstraCard, ACCENT, ACCENT_BLUE, cx } from "../AstraUi";

const LAYERS = [
  {
    zone: "apex",
    name: "Interface",
    tag: "text · tools · memory access",
    body: "The only surface anything else sees. Requests arrive here with context; answers return with provenance.",
    accent: ACCENT_BLUE,
  },
  {
    zone: "core",
    name: "ASTRA Core",
    tag: "planner · loop · policy",
    body: "The reasoning loop lives here — perceiving, planning, acting and reflecting. The part that is 'self'.",
    accent: ACCENT,
  },
];

const BRANCHES = [
  {
    zone: "mind",
    name: "Memory",
    tag: "episodic · semantic · procedural",
    body: "Everything the loop has lived through, encoded, recalled and consolidated.",
    accent: ACCENT,
  },
  {
    zone: "body",
    name: "Tools & Compute",
    tag: "runners · executors · sandbox",
    body: "Hands in the world. Capability modules run inside a sandbox and report outcomes back to the loop.",
    accent: ACCENT_BLUE,
  },
];

const BASE = {
  zone: "ground",
  name: "Weights & Data",
  tag: "20B substrate · consentful records",
  body: "The learned substrate. Updated continuously by the loop's reflections — never frozen at a checkpoint.",
  accent: "#93C5FD",
};

const Node = ({ layer }: { layer: (typeof LAYERS)[0] | (typeof BRANCHES)[0] | typeof BASE }) => (
  <AstraCard hover={false} className="relative w-full max-w-2xl overflow-hidden">
    <div
      className="absolute inset-y-0 left-0 w-[3px]"
      style={{
        background: `linear-gradient(to bottom, ${layer.accent}, transparent)`,
      }}
    />
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5 sm:px-7">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: layer.accent }}>
          {layer.tag}
        </p>
        <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">{layer.name}</h3>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6474]">
        {layer.zone}
      </span>
    </div>
    <p className="px-6 pb-5 text-sm leading-relaxed text-[#8E96A8] sm:px-7">{layer.body}</p>
  </AstraCard>
);

const Connector = ({ animated = false }: { animated?: boolean }) => (
  <div className="relative mx-auto flex h-10 w-px justify-center overflow-hidden">
    <div className="h-full w-px bg-[#2A3345]" />
    {animated ? (
      <span
        className="astra-dash absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-transparent"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, ${ACCENT} 0 4px, transparent 4px 9px)`,
        }}
      />
    ) : null}
  </div>
);

const BranchSplit = () => (
  <div className="relative mx-auto flex h-12 w-24 flex-col items-center">
    <div className="h-6 w-px bg-[#2A3345]" />
    <div className="flex w-full items-center justify-between px-1">
      <div className="h-px flex-1 bg-[#2A3345]" />
      <div className="h-px flex-1 bg-[#2A3345]" />
    </div>
    <div className="mt-0 flex w-full justify-between px-1">
      <div className="h-3 w-px bg-[#2A3345]" />
      <div className="h-3 w-px bg-[#2A3345]" />
    </div>
  </div>
);

const Architecture = () => (
  <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeader
            eyebrow="04 · Architecture"
            title={
              <>
                A tree with a <span style={{ color: ACCENT }}>looping core</span>
              </>
            }
            subtitle="Reference design only — a living diagram, not a finished system. The shape of what ASTRA is being built toward."
          />
          <Reveal delay={0.1}>
            <AstraCard hover={false} className="mt-8">
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#777F8F]">
                  design rule
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#B9C0CF]">
                  Innovation happens in the loop and the memory. Tools are
                  replaceable. Weights are a substrate. Nothing above the loop can
                  permanently override the loop's duty to keep learning.
                </p>
              </div>
            </AstraCard>
          </Reveal>
        </div>

        <div className="flex flex-col items-center">
          {LAYERS.map((l) => (
            <Reveal key={l.name} className="w-full max-w-2xl">
              <Node layer={l} />
            </Reveal>
          ))}
          <BranchSplit />
          <div className="grid w-full max-w-2xl gap-4 md:grid-cols-2">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.08} className={cx(i === 1 && "md:translate-y-2")}>
                <Node layer={b} />
              </Reveal>
            ))}
          </div>
          <Connector animated />
          <Reveal className="w-full max-w-2xl">
            <Node layer={BASE} />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Architecture;