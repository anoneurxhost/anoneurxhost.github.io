import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHeader, AstraCard, ACCENT } from "./AstraUi";
import Hero from "./sections/Hero";
import Final from "./sections/Final";
import { SECTION_INDEX, IndexCard } from "./AstraSection";
import "./astra.css";

const AstraHome = () => (
  <>
    <Hero />

    <section id="explore" className="relative scroll-mt-20 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="container-responsive">
        <SectionHeader
          eyebrow="Explore ASTRA"
          title={
            <>
              Every part on <span style={{ color: ACCENT }}>its own page</span>
            </>
          }
          subtitle="Each section of this research project lives as its own page — read them in order or jump to what matters most."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_INDEX.map((def, i) => (
            <IndexCard key={def.to} def={def} delay={(i % 3) * 0.06} />
          ))}

          <Reveal delay={0.2}>
            <AstraCard hover={false} className="h-full">
              <div className="flex h-full flex-col items-start justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5C74]">
                    quick index
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    The short route
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    Start with what the project is, skim the status, then jump to
                    the research problems.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ChipLink to="/astra/what-is">01 · What is</ChipLink>
                  <ChipLink to="/astra/status">08 · Status</ChipLink>
                  <ChipLink to="/astra/research">07 · Research</ChipLink>
                </div>
              </div>
            </AstraCard>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-[#B9B9CF]">
              20B parameters today · architected for a 1T target · in development,
              not production.
            </p>
            <Link
              to="/astra/status"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#A79BFF] transition-colors hover:border-[#8B7CF6]/50 hover:text-white"
            >
              Current status
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>

    <Final />
  </>
);

const ChipLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#C7C7DE] transition-colors hover:border-[#8B7CF6]/50 hover:text-white"
  >
    {children}
  </Link>
);

export default AstraHome;