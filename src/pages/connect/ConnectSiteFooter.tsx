import { Link, useLocation } from "react-router-dom";

interface ConnectSiteFooterProps {
  dark: boolean;
}

const ConnectSiteFooter = ({ dark }: ConnectSiteFooterProps) => {
  const location = useLocation();
  const isConnect = location.pathname.startsWith("/blacklink");

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Connect", path: "/blacklink" },
        { name: "Features", path: "/blacklink/features" },
        { name: "Agent", path: "/blacklink/agent" },
        { name: "Pricing", path: "/blacklink/pricing" },
        { name: "Changelog", path: "/blacklink/changelog" },
        { name: "Status", path: "/blacklink/status" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", path: "/blacklink/docs" },
        { name: "Installation", path: "/blacklink/agent" },
        { name: "Security", path: "/blacklink/security" },
        { name: "Troubleshooting", path: "/blacklink/agent" },
      ],
    },
    {
      title: "Anoneurx",
      links: [
        { name: "Anoneurx", path: "/" },
        { name: "Black Wall", path: "/blackwall" },
        { name: "Cloud", path: "/cloud" },
        { name: "Open Source", path: "/opensource" },
        { name: "Research", path: "/research" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
      ],
    },
  ];

  const activeLink = dark
    ? "text-blue-300 hover:text-blue-200"
    : "text-blue-700 hover:text-blue-600";
  const defaultLink = dark
    ? "text-slate-400 hover:text-white"
    : "text-slate-500 hover:text-slate-900";

  return (
    <footer className="relative mt-20 border-t border-slate-200 bg-slate-50 py-16 dark:border-white/[0.06] dark:bg-[#040405]">
      <div className="container-responsive">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:w-72">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-violet-500/20">
                <span className="font-brand text-[11px] text-blue-600 dark:text-blue-300">A</span>
              </span>
              <span className="font-brand text-sm tracking-[0.2em] text-slate-900 dark:text-white">
                ANONEURX BLACK LINK
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Secure infrastructure management for modern servers.
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className={`text-sm transition-colors ${
                          isConnect && link.path.startsWith("/blacklink")
                            ? activeLink
                            : defaultLink
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:justify-between dark:border-white/[0.06]">
          <p className="text-xs text-slate-500">
            <span className="font-brand text-slate-600 dark:text-slate-400">ANONEURX BLACK LINK</span>.{" "}
            © 2026 Anoneurx. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/blacklink/security" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
              Security
            </Link>
            <Link to="/privacy" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ConnectSiteFooter;