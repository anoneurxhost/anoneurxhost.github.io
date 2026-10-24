import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LabLogo from "./LabLogo";
import { useLabTheme } from "./LabThemeProvider";

// Each item points at the dedicated page, never at a landing-page anchor.
const NAV_LINKS = [
  { to: "/lab/areas", label: "Research" },
  { to: "/lab/problems", label: "Problems" },
  { to: "/lab/projects", label: "Projects" },
  { to: "/lab/apply", label: "Opportunities" },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const LabNav = () => {
  const { theme, toggleTheme } = useLabTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Elevate the pinned bar once the page has scrolled beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const query = window.matchMedia("(min-width: 821px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [menuOpen]);

  const isDark = theme === "dark";

  return (
    <header className={`lab-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="lab-container">
        <div className="lab-nav-row">
          <Link className="lab-brand" to="/lab">
            <LabLogo className="lab-brand__mark" />
            <span>Anoneurx Lab</span>
          </Link>

          <nav
            id="lab-nav-panel"
            className={`lab-nav-panel ${menuOpen ? "is-open" : ""}`}
            aria-label="Lab sections"
          >
            <ul className="lab-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link
              className="lab-btn lab-btn--primary lab-nav-panel__cta"
              to="/lab/apply"
              onClick={() => setMenuOpen(false)}
            >
              Join the lab
            </Link>
          </nav>

          <div className="lab-nav-actions">
            <button
              type="button"
              className="lab-icon-btn"
              onClick={toggleTheme}
              aria-pressed={isDark}
              aria-label="Toggle theme"
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link className="lab-btn lab-btn--primary lab-nav-cta" to="/lab/apply">
              Join the lab
            </Link>

            <button
              type="button"
              className="lab-icon-btn lab-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="lab-nav-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LabNav;
