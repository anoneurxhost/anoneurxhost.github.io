import { Activity } from "lucide-react";
import { Reveal, SectionHeader, AstraCard, ACCENT, ACCENT_BLUE } from "../AstraUi";

const ROWS = [
  ["project", "ASTRA", "#A79BFF"],
  ["status", "ACTIVE — research preview", ACCENT],
  ["phase", "01 · learning-loop simulation", ACCENT_BLUE],
  ["scale", "20B parameters (current)", "#A79BFF"],
  ["target", "1T parameters (architecture)", "#B4A9FF"],
  ["learning", "continual · task generation", "#7A8CFF"],
  ["eval", "honest · reproducible", "#8FB0FF"],
  ["notes", "in development — not for production", "#8B7CF6"],
];

const Status = () => (
  <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive max-w-4xl">
      <SectionHeader
        eyebrow="08 · Status"
        title="Current state of ASTRA"
        subtitle="Transparent status, no smoothing. What is true today is reported as-is."
      />

      <Reveal className="mt-12">
        <AstraCard hover={false} className="relative overflow-hidden font-mono text-sm">
          <div className="astra-scanline pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden opacity-15">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#8B7CF6]/30 to-transparent" />
          </div>

          <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3.5">
            <Activity className="h-4 w-4 text-[#8B7CF6]" />
            <span className="text-xs tracking-wider text-[#8B7CF6]">
              ASTRA // status
            </span>
            <span className="astra-cursor ml-1 text-[#8B7CF6]" />
          </div>

          <div className="divide-y divide-white/5 px-6 py-4">
            {ROWS.map(([k, v, c]) => (
              <div key={k} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-2.5">
                <span className="w-28 shrink-0 text-[11px] uppercase tracking-wider text-[#77778F]">
                  {k}
                </span>
                <span className="text-sm" style={{ color: c }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-6 py-3">
            <p className="text-[11px] text-[#5C5C74]">
              last updated · September 2026 · project in active development
            </p>
          </div>
        </AstraCard>
      </Reveal>
    </div>
  </section>
);

export default Status;