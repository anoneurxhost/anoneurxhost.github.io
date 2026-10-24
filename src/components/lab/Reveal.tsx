import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
};

/**
 * Fade-up reveal driven by IntersectionObserver.
 *
 * Motion is intentionally minimal (opacity + 12px translate, 400ms) and is
 * disabled entirely under `prefers-reduced-motion` — see the reduced-motion
 * block in src/styles/lab.css.
 */
const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lab-fade-up ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
