import { Link } from "react-router-dom";

const FOOTER_SECTIONS = [
  {
    title: "Research",
    links: [
      { label: "Research areas", href: "/lab/areas" },
      { label: "Open problems", href: "/lab/problems" },
      { label: "Projects", href: "/lab/projects" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Datasets & tools", href: "/lab/resources" },
      { label: "Open source", href: "/opensource" },
      { label: "Research guide", href: "/lab/guide" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Blog", href: "/lab/blog" },
      { label: "Programs", href: "/lab/programs" },
      { label: "Careers", href: "/lab/careers" },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: "About", href: "/lab/about" },
  { label: "Policies", href: "/lab/policies" },
  { label: "Privacy", href: "/lab/privacy" },
  { label: "Terms", href: "/lab/terms" },
  { label: "Accessibility", href: "/lab/accessibility" },
];

const LabFooter = () => (
  <footer className="lab-footer">
    <div className="lab-container">
      <div className="lab-footer__grid">
        <div>
          <p className="lab-eyebrow">Anoneurx Lab</p>
          <p className="lab-muted" style={{ marginTop: "var(--space-2)", maxWidth: "42ch" }}>
            Open research problems in Cybersecurity, Robotics and Systems — worked on in the
            open, with published results and reproducible code.
          </p>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="lab-eyebrow">{section.title}</p>
            <div className="lab-footer__links" style={{ marginTop: "var(--space-2)", flexDirection: "column" }}>
              {section.links.map((link) => (
                <Link key={link.href} to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="lab-footer__bottom">
        <p>© 2026 Anoneurx Lab. A research lab at Anoneurx.</p>
        <nav className="lab-footer__bottom-links" aria-label="Legal and contact">
          {BOTTOM_LINKS.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);

export default LabFooter;
