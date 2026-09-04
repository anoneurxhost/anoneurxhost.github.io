import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ChevronLeft, ChevronRight } from "lucide-react";

export type MobileScreenshot = {
  src: string;
  label: string;
  caption: string;
};

type Props = {
  screenshots: MobileScreenshot[];
  title?: string;
};

/** Mobile app screenshot showcase — phone frame with swipe navigation. */
const MobileScreenshotShowcase: React.FC<Props> = ({
  screenshots,
  title = "App Preview",
}) => {
  const [idx, setIdx] = useState(0);
  const shot = screenshots[idx];

  const prev = () => setIdx((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === screenshots.length - 1 ? 0 : i + 1));

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-28 rounded-[5px] border border-white/10 bg-black/10 p-6 backdrop-blur-xl md:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs tracking-[0.2em] text-fuchsia-400">00</span>
        <h2 className="text-xl font-semibold text-white md:text-2xl">{title}</h2>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        {/* Phone Frame */}
        <div className="relative shrink-0">
          {/* Phone bezel */}
          <div className="relative w-[260px] overflow-hidden rounded-[2rem] border-2 border-white/15 bg-black shadow-2xl shadow-black/60 sm:w-[280px]">
            {/* Notch */}
            <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
              <div className="h-5 w-24 rounded-full bg-black" />
            </div>

            {/* Screen */}
            <div className="relative aspect-[9/19.5] bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.img
                  key={shot.src}
                  src={shot.src}
                  alt={shot.caption}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Caption overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
                <p className="text-xs font-medium text-slate-200">{shot.caption}</p>
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center py-2">
              <div className="h-1 w-16 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 h-32 w-48 rounded-full bg-fuchsia-600/10 blur-[60px]" />
        </div>

        {/* Controls + Info */}
        <div className="flex-1 space-y-4">
          {/* Nav arrows + dots */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx
                      ? "w-6 bg-fuchsia-400"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Screenshot tabs */}
          <div className="flex flex-wrap gap-2">
            {screenshots.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setIdx(i)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  i === idx
                    ? "bg-fuchsia-500/20 text-fuchsia-200 ring-1 ring-fuchsia-400/40"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active caption */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
            <div className="mb-1 flex items-center gap-2">
              <Smartphone className="h-3.5 w-3.5 text-fuchsia-400" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">
                Screenshot {idx + 1} of {screenshots.length}
              </span>
            </div>
            <p className="text-sm text-slate-300">{shot.caption}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MobileScreenshotShowcase;
