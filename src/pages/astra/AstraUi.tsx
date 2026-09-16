import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const ACCENT = "#8B7CF6";
export const ACCENT_BLUE = "#4F7CFF";

export const cx = (...parts: (string | false | undefined | null)[]) =>
  parts.filter(Boolean).join(" ");

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-[#8B7CF6]">
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-[#8E8EA8] sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * Astra card — the shared shadcn Card from @/components/ui/card, styled the
 * same way it is used on the Anoneurx auth pages (bg-white/5 border-white/10).
 */
export function AstraCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <Card
      className={cx(
        "rounded-lg border bg-white/5 border-white/10 backdrop-blur-sm",
        hover && "transition-all duration-300 hover:bg-white/10",
        className
      )}
    >
      {children}
    </Card>
  );
}

export function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "blue" | "muted";
}) {
  const tones: Record<string, string> = {
    default: "border-[#2A2A40] bg-[#12121E] text-[#B9B9CF]",
    accent:
      "border-[#8B7CF6]/40 bg-[#8B7CF6]/10 text-[#A79BFF]",
    blue: "border-[#4F7CFF]/40 bg-[#4F7CFF]/10 text-[#8FB0FF]",
    muted: "border-[#1E1E30] bg-[#0D0D18] text-[#77778F]",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "bg-gradient-to-r from-[#8B7CF6] via-[#7A8CFF] to-[#4F7CFF] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}