import React, { useEffect, useState } from "react";

export type TocItem = { id: string; label: string; level?: 1 | 2 };

type Props = {
  items: TocItem[];
  title?: string;
  className?: string;
};

/**
 * Right-hand content rail: hairline vertical rule, nested indentation and a
 * magenta indicator that tracks the section currently in view.
 */
const ContentSidebar: React.FC<Props> = ({ items, title = "On this page", className = "" }) => {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: [0, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className={`sticky top-24 ${className}`}>
      <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500">{title}</p>
      <div className="relative pl-4">
        <span className="absolute left-0 top-1 bottom-1 w-px bg-white/10" />
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className={item.level === 2 ? "pl-4" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setActive(item.id)}
                  className={`relative block py-1.5 text-sm leading-snug transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <span className="absolute -left-4 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-fuchsia-500 shadow-[0_0_12px_2px] shadow-fuchsia-500/50" />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default ContentSidebar;
