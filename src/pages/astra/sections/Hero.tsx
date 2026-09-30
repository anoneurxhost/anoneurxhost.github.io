import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal, GradientText, ACCENT, ACCENT_BLUE, cx } from "../AstraUi";
import astraLogo from "@/assets/astra/logo.png";
import "../astra.css";

const seed = (n: number) => () => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const PARTICLES: { x: number; y: number; r: number; d: number; s: number }[] =
  Array.from({ length: 26 }).map((_, i) => {
    const rnd = seed(i + 1);
    return {
      x: rnd() * 100,
      y: rnd() * 100,
      r: 1 + rnd() * 1.6,
      d: 2 + rnd() * 4,
      s: 0.35 + rnd() * 0.65,
    };
  });

const ORBIT_NODES = [
  { label: "PERCEIVE", color: "#38BDF8", R: 132 },
  { label: "RECALL", color: "#4F7CFF", R: 132 },
  { label: "PLAN", color: "#38BDF8", R: 194 },
  { label: "ACT", color: "#4F7CFF", R: 194 },
];

const Hero = () => (
  <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(56,189,248,0.10), transparent 65%)",
      }}
    />
    <div
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 75%)",
      }}
    />

    <div className="container-responsive relative z-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-[#38BDF8]">
              Anoneurx Lab · Self-Teaching AI Research
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[clamp(3.4rem,10vw,7rem)] font-semibold leading-[0.95] tracking-tight text-white">
              ASTRA
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-xl font-medium text-[#C7CDDE] sm:text-2xl">
              A self-learning AI that improves through{" "}
              <GradientText>its own experience</GradientText>.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#8E96A8] lg:mx-0">
              ASTRA is an Anoneurx research project exploring models that learn
              continuously — recording, reflecting and improving from real use
              instead of standing still after training. Currently a 20B
              parameter research system, architected for a 1T long-term target.
              In development, not production.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                to="/astra/what-is"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#4F7CFF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(56,189,248,0.65)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Read the research
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/astra/status"
                className="inline-flex items-center gap-2 rounded-full border border-[#2A3243] bg-[#0A0E14]/70 px-6 py-3 text-sm font-semibold text-[#C7CDDE] transition-colors duration-300 hover:border-[#38BDF8]/50 hover:text-white"
              >
                Status
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-[#777F8F] lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                20B parameters
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F7CFF]" />
                1T architectural target
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Research preview
              </span>
            </div>
          </Reveal>
        </div>

        {/* Geometric "A" orbital visual */}
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <div
              className="astra-glow absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.28), rgba(79,124,255,0.10) 60%, transparent 75%)",
              }}
            />
            <div className="astra-orbit absolute inset-[14%] rounded-full border border-dashed border-[#3B4457]/70" />
            <div className="astra-orbit-reverse absolute inset-[30%] rounded-full border border-[#343E50]">
              <span
                className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: ACCENT,
                  boxShadow: `0 0 18px 2px ${ACCENT}`,
                }}
              />
            </div>
            <div className="astra-orbit absolute inset-[4%] rounded-full border border-[#232A38]/60" />
            <div className="astra-orbit-reverse absolute inset-[44%] rounded-full border border-dashed border-[#2E3749]/60" />

            <div className="absolute inset-0">
              {ORBIT_NODES.map((n, i) => (
                <Fragment key={n.label}>
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-${n.R}px)`,
                    }}
                  >
                    <span
                      className="block h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                      style={{
                        background: n.color,
                        boxShadow: `0 0 12px 0 ${n.color}`,
                      }}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-${n.R}px)`,
                    }}
                  >
                    <span
                      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.22em]"
                      style={{
                        borderColor: `${n.color}3A`,
                        background: "#08080F",
                        color: n.color,
                      }}
                    >
                      {n.label}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="absolute inset-[30%]">
              <div className="astra-pulse-ring relative flex h-full w-full items-center justify-center">
                <div className="astra-float relative h-full w-full">
                  <img
                    src={astraLogo}
                    alt="ASTRA"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </div>
            </div>

            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="astra-twinkle absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.r * 2,
                  height: p.r * 2,
                  background: i % 3 === 0 ? ACCENT : ACCENT_BLUE,
                  animationDelay: `${p.d}s`,
                }}
              />
            ))}
          </div>

          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#5C6474] sm:text-[11px]">
            A · S · T · R · A — autonomous self-teaching research agent
          </p>
        </Reveal>
      </div>
    </div>

    <a
      href="#explore"
      className={cx(
        "absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2",
        "font-mono text-[10px] uppercase tracking-[0.26em] text-[#5C6474] transition-colors hover:text-[#7DD3FC]",
        "sm:flex"
      )}
    >
      scroll
      <ArrowRight className="h-3 w-3 rotate-90" />
    </a>
  </section>
);

export default Hero;