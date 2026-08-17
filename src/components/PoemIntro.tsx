import { motion } from "framer-motion";

interface PoemIntroProps {
  title: string;
  lines: string[];
  /** When true, uses white ink for dark backgrounds. Defaults to auto (inherits currentColor). */
  dark?: boolean;
  className?: string;
}

/**
 * A minimal, poetic introductory section used across major pages
 * (excluding Home). Short lines, elegant serif, no marketing fluff.
 */
const PoemIntro = ({ title, lines, dark, className = "" }: PoemIntroProps) => {
  const textClass = dark ? "text-white/90" : "text-current";
  const dimClass = dark ? "text-white/60" : "opacity-70";

  return (
    <section
      aria-label="Introduction"
      className={`w-full py-16 md:py-24 px-6 ${className}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`text-xs uppercase tracking-[0.35em] mb-8 ${dimClass}`}
        >
          {title}
        </motion.h2>
        <div className="space-y-3">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              style={{ fontFamily: "'Instrument Serif', 'Fraunces', Georgia, serif" }}
              className={`text-xl md:text-2xl leading-relaxed ${textClass}`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoemIntro;
