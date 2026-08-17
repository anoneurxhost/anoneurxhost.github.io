import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro: string;
  icon?: LucideIcon;
  children?: ReactNode;
  align?: "left" | "center";
}

const DARK_PREFIXES = ["/blackwall", "/opensource", "/cloud", "/nexora", "/research", "/pay", "/read", "/view-in-journal"];
const isDarkPath = (p: string) => p === "/" || DARK_PREFIXES.some((x) => p.startsWith(x));

/**
 * Premium page hero used on every non-Home page.
 * Auto-adapts to dark/light theme based on the current route.
 */
const PageHero = ({ eyebrow, title, intro, icon: Icon, children, align = "left" }: PageHeroProps) => {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const dark = isDarkPath(pathname);
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <section className={`relative w-full ${dark ? "text-white" : "text-neutral-900"}`}>
      <div className={`mx-auto max-w-5xl px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 flex flex-col ${alignCls}`}>
        {Icon && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
              dark
                ? "bg-white/10 border border-white/15 text-white"
                : "bg-neutral-900 text-white shadow-sm"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        )}
        {eyebrow && (
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${
              dark ? "text-white/60" : "text-neutral-500"
            }`}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`font-semibold tracking-tight ${
            dark ? "text-white" : "text-neutral-900"
          } text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed ${
            dark ? "text-white/75" : "text-neutral-600"
          }`}
        >
          {intro}
        </motion.p>
        {children && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
      <div className={`mx-auto max-w-5xl px-6 md:px-8`}>
        <div className={`h-px w-full ${dark ? "bg-white/10" : "bg-neutral-200"}`} />
      </div>
    </section>
  );
};

export default PageHero;