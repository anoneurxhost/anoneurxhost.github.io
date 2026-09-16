import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, GradientText } from "../AstraUi";

const Final = () => (
  <section className="relative overflow-hidden px-4 py-28 text-center sm:px-6 sm:py-36 lg:px-8">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,124,246,0.10), transparent 70%)",
      }}
    />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8B7CF6]/40 to-transparent" />

    <div className="container-responsive relative z-10 max-w-3xl">
      <Reveal>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-[#8B7CF6]">
          The long game
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
          AI that never stops improving — <GradientText>without pretending to be more than it is.</GradientText>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8E8EA8] sm:text-lg">
          This project will change as the work does. Progress here is written in
          measured milestones, roadblocks included. Follow the honest record.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/astra/log"
            className="inline-flex items-center gap-2 rounded-full border border-[#2A2A40] bg-[#0A0A14]/70 px-6 py-3 text-sm font-semibold text-[#C7C7DE] transition-colors duration-300 hover:border-[#8B7CF6]/50 hover:text-white"
          >
            Development log
          </Link>
          <Link
            to="/astra/research"
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-[#8B7CF6] to-[#4F7CFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(139,124,246,0.65)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Up next · research modules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Final;