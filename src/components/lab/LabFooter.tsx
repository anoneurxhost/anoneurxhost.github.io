import { Link } from "react-router-dom";

const FOOTER_SECTIONS = [
  {
    title: "Lab",
    links: [
      { label: "Research areas", href: "/lab/areas" },
      { label: "Projects", href: "/lab/projects" },
      { label: "Research", href: "/research" },

    ],
  },
  {
    title: "Join",
    links: [
      { label: "Apply to the lab", href: "/lab/apply" },
      { label: "Research guide", href: "/lab/guide" },
      { label: "FAQ", href: "/lab/faq" },
    ],
  },
  {
    title: "Policies & legal",
    links: [
      { label: "Accessibility", href: "/lab/accessibility" },
      { label: "Research ethics", href: "/lab/ethics" },
      { label: "Security", href: "/lab/security" },
    ],
  },
];

const BOTTOM_LINKS = [
  { label: "Policies", href: "/lab/policies" },
  { label: "People", href: "/lab/people" },
  { label: "Privacy", href: "/lab/privacy" },
  { label: "Cookies", href: "/lab/cookies" },
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
            Open research problems in AI, cybersecurity, robotics and systems — worked on in the open,
            with published results and reproducible code.
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
