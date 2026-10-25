import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
  Brain,
  ChevronDown,
  Code2,
  Database,
  FlaskConical,
  GraduationCap,
  Server,
  Shield,
  Users,
  Wrench,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";

/**
 * Lab navigation in the Microsoft Research style: a quiet bar of section links
 * where each section opens a hover mega-menu panel with grouped, described
 * links. Light-only, matching the Google Research design language.
 */

type MegaLink = {
  label: string;
  to: string;
  desc?: string;
  icon?: typeof Brain;
  tone?: string;
};

type MegaCol = {
  label?: string;
  narrow?: boolean;
  links: MegaLink[];
};

type NavSection = {
  id: string;
  label: string;
  to: string;
  /** When present, hovering the section opens this mega panel. */
  mega?: {
    summary?: string;
    cols: MegaCol[];
    foot?: { label: string; to: string };
  };
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: "research",
    label: "Research",
    to: "/lab/areas",
    mega: {
      cols: [
        {
          label: "Focus areas",
          links: [
            { label: "AI & Machine Learning", to: "/lab/areas#ai-ml", desc: "Learning systems, code intelligence and representation research.", icon: Brain, tone: "blue" },
            { label: "Cybersecurity", to: "/lab/areas#cybersecurity", desc: "Threat detection, cryptography and privacy engineering.", icon: Shield, tone: "red" },
            { label: "Robotics", to: "/lab/areas#robotics", desc: "Perception, autonomy and physically safe control.", icon: Bot, tone: "teal" },
            { label: "Systems & OS", to: "/lab/areas#systems-os", desc: "Operating systems, distributed runtime and performance.", icon: Server, tone: "green" },
          ],
        },
        {
          label: "Research output",
          narrow: true,
          links: [
            { label: "Open problems", to: "/lab/problems", desc: "Real gaps in the literature — claim one and work it." },
            { label: "Projects", to: "/lab/projects", desc: "Prototypes and libraries built from the problems." },
            { label: "Publications", to: "/research", desc: "Papers, preprints and technical reports." },
            { label: "ASTRA", to: "/astra", desc: "Self-learning AI research across the memory loop." },
          ],
        },
      ],
      foot: { label: "See all research areas", to: "/lab/areas" },
    },
  },
  {
    id: "resources",
    label: "Resources",
    to: "/lab/resources",
    mega: {
      summary: "Everything the lab builds and shares: datasets, tooling and open source.",
      cols: [
        {
          label: "Explore",
          links: [
            { label: "Datasets", to: "/lab/resources#datasets", desc: "Telemetry, benchmarks and evaluation data published by the lab.", icon: Database, tone: "green" },
            { label: "Tools & services", to: "/lab/resources#tools", desc: "The harnesses and infrastructure problems are run on.", icon: Wrench, tone: "purple" },
            { label: "Open source", to: "/lab/resources#opensource", desc: "Code released under open licenses, maintained publicly.", icon: Code2, tone: "orange" },
            { label: "Research guide", to: "/lab/guide", desc: "How we pick problems, run studies and publish.", icon: BookOpen, tone: "blue" },
          ],
        },
      ],
    },
  },
  {
    id: "programs",
    label: "Programs",
    to: "/lab/programs",
    mega: {
      summary: "Engagement programs for students and faculty who want to work with the lab.",
      cols: [
        {
          label: "Engage with us",
          links: [
            { label: "Student programs", to: "/lab/programs#students", desc: "Placements, mentored sprints and the open-problem board.", icon: GraduationCap, tone: "yellow" },
            { label: "Faculty programs", to: "/lab/programs#faculty", desc: "Co-supervision, shared problems and joint publications.", icon: FlaskConical, tone: "green" },
            { label: "Apply to the lab", to: "/lab/apply", desc: "Routes into the lab and what each track expects.", icon: Users, tone: "pink" },
          ],
        },
      ],
      foot: { label: "See all programs", to: "/lab/programs" },
    },
  },
  { id: "blog", label: "Blog", to: "/lab/blog" },
  { id: "team", label: "Team", to: "/lab/people" },
  { id: "careers", label: "Careers", to: "/lab/careers" },
  { id: "about", label: "About", to: "/lab/about" },
];

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

const MegaChevron = () => <ChevronDown className="lab-mega__chevron" aria-hidden="true" />;

const LabNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();

  // Close everything on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setOpenSection(null);
  }, [location.pathname]);

  // Close on Escape and when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen && !openSection) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenSection(null);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1020) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, openSection]);

  const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? "is-active" : undefined);

  return (
    <header className="lab-header">
      <div className="lab-container">
        <div className="lab-nav-row">
          <Link className="lab-brand" to="/lab">
            <img className="lab-brand__mark" src={logo} alt="" />
            <span>Anoneurx Lab</span>
          </Link>

          <nav
            id="lab-nav-panel"
            className={`lab-nav-panel ${menuOpen ? "is-open" : ""}`}
            aria-label="Lab sections"
          >
            <ul className="lab-nav-list">
              {NAV_SECTIONS.map((section) => {
                if (!section.mega) {
                  return (
                    <li key={section.id}>
                      <NavLink
                        to={section.to}
                        className={navClass}
                        onClick={() => setMenuOpen(false)}
                        aria-current={location.pathname === section.to ? "page" : undefined}
                      >
                        {section.label}
                      </NavLink>
                    </li>
                  );
                }

                return (
                  <li
                    key={section.id}
                    className={`lab-mega ${openSection === section.id ? "is-open" : ""}`}
                    onMouseEnter={() => setOpenSection(section.id)}
                    onMouseLeave={() =>
                      setOpenSection((current) => (current === section.id ? null : current))
                    }
                  >
                    <NavLink
                      to={section.to}
                      className={({ isActive }) => `lab-mega__trigger ${navClass({ isActive }) ?? ""}`}
                      onClick={() => setOpenSection(null)}
                    >
                      {section.label}
                      <MegaChevron />
                    </NavLink>

                    <div
                      className="lab-mega-panel"
                      onMouseLeave={() =>
                        setOpenSection((current) => (current === section.id ? null : current))
                      }
                    >
                      {section.mega.summary && (
                        <p className="lab-mega__label" style={{ textTransform: "none", letterSpacing: 0, fontSize: "0.85rem" }}>
                          {section.mega.summary}
                        </p>
                      )}
                      <div className="lab-mega__grid">
                        {section.mega.cols.map((col, colIndex) => (
                          <div key={colIndex} className={`lab-mega__col ${col.narrow ? "lab-mega__col--narrow" : ""}`}>
                            {col.label && <p className="lab-mega__label">{col.label}</p>}
                            <div className="lab-mega__list">
                              {col.links.map((link) => (
                                <Link
                                  key={link.label}
                                  className="lab-mega__link"
                                  to={link.to}
                                  onClick={() => {
                                    setOpenSection(null);
                                    setMenuOpen(false);
                                  }}
                                >
                                  <span className="lab-mega__item-label">
                                    {link.icon && (
                                      <span className={`lab-mega__item-icon lab-mega__item-icon--${link.tone ?? "blue"}`}>
                                        <link.icon aria-hidden="true" />
                                      </span>
                                    )}
                                    {link.label}
                                  </span>
                                  {link.desc && <span className="lab-mega__desc">{link.desc}</span>}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {section.mega.foot && (
                        <div className="lab-mega__foot">
                          <Link
                            className="lab-link-arrow"
                            style={{ margin: 0 }}
                            to={section.mega.foot.to}
                            onClick={() => {
                              setOpenSection(null);
                              setMenuOpen(false);
                            }}
                          >
                            {section.mega.foot.label}
                            <ArrowRight aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
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
