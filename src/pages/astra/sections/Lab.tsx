import { Link } from "react-router-dom";
import { FlaskConical, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader, AstraCard, ACCENT } from "../AstraUi";

const Lab = () => (
  <section className="relative px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
    <div className="container-responsive max-w-4xl">
      <SectionHeader
        eyebrow="12 · The lab"
        title={
          <>
            Born in the <span style={{ color: ACCENT }}>Anoneurx Lab</span>
          </>
        }
        subtitle="ASTRA is built inside the Anoneurx Lab — the same research lab behind open problems in AI, cyber-physical security, robotics and systems."
      />

      <Reveal className="mt-12">
        <Link to="/lab" className="group block h-full">
          <AstraCard hover={false} className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(139,124,246,0.35), transparent 70%)",
              }}
            />
            <div className="relative flex flex-wrap items-start justify-between gap-6 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#A79BFF]">
                  <FlaskConical className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    Anoneurx Lab
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#8E8EA8]">
                    Where ASTRA's research problems, people and projects live.
                    Explore open problems, read the papers and see who is working
                    on what.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[#A79BFF] transition-colors group-hover:border-[#8B7CF6]/50 group-hover:bg-white/10">
                visit the lab
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </AstraCard>
        </Link>
      </Reveal>
    </div>
  </section>
);

export default Lab;