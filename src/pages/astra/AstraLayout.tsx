import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Menu, X } from "lucide-react";
import backgroundVideo from "@/assets/astra/background.mp4";
import astraLogo from "@/assets/astra/logo.png";
import { cx } from "./AstraUi";
import "./astra.css";

const NAV_LINKS = [
  { label: "Home", to: "/astra" },
  { label: "Research", to: "/astra/research" },
  { label: "Architecture", to: "/astra/architecture" },
  { label: "Log", to: "/astra/log" },
  { label: "Roadmap", to: "/astra/roadmap" },
  { label: "Contribute", to: "/astra/contribute" },
];

const FOOTER_LINKS = [
  { label: "Anoneurx Home", to: "/" },
  { label: "Anoneurx Lab", to: "/lab" },
  { label: "Research", to: "/research" },
];

const SITE = "https://anoneurx.com";

const AstraLayout = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-light");
    document.body.classList.add("astra-bg");
    return () => {
      document.body.classList.remove("astra-bg");
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `relative px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(path)
      ? "text-white bg-white/10 shadow-lg shadow-black/20"
      : "text-white/80 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="astra-bg relative min-h-screen bg-[#030509] text-white">
      <Helmet>
        <title>ANONEURX | ASTRA — Self-Learning AI Research</title>
        <meta
          name="description"
          content="ASTRA is an Anoneurx Lab research project in self-learning AI — a model that records, reflects and improves from its own experience. 20B parameters today, architected for a 1T target. In development."
        />
        <link rel="canonical" href={`${SITE}/astra`} />
        <meta property="og:title" content="ANONEURX | ASTRA — Self-Learning AI Research" />
        <meta
          property="og:description"
          content="ASTRA is an Anoneurx Lab research project in self-learning AI — a model that records, reflects and improves from its own experience. 20B parameters today, architected for a 1T target."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/astra`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="ANONEURX | ASTRA — Self-Learning AI Research" />
        <meta
          name="twitter:description"
          content="ASTRA — a self-learning AI research project from Anoneurx Lab. 20B today, 1T target. In development."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ResearchProject",
            name: "ASTRA",
            alternateName: "Anoneurx Self-Teaching Research AI",
            url: `${SITE}/astra`,
            description:
              "ASTRA is an Anoneurx Lab research project exploring models that learn continuously from experience. Current research scale: 20B parameters. Long-term architectural target: 1T parameters.",
            isPartOf: { "@type": "Organization", name: "Anoneurx Lab", url: `${SITE}/lab` },
          })}
        </script>
      </Helmet>

      {/* fixed full-viewport background video (shows above the page background, below content) */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src={backgroundVideo}
        />
      </div>

      <div className="relative z-10">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#1E2430]/80 bg-[#030509]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-responsive flex h-16 items-center justify-between">
          <Link to="/astra" className="flex items-center gap-3">
            <img
              src={astraLogo}
              alt="ASTRA"
              className="h-9 w-9 object-contain"
            />
            <span className="font-mono text-[13px] font-semibold uppercase tracking-[0.3em] text-white">
              ASTRA
            </span>
          </Link>

          <nav className="hidden items-center space-x-2 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={cx(
                  "relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl",
                  isActive(link.to)
                    ? "text-white shadow-lg"
                    : "text-white/90 hover:text-white hover:shadow-lg group"
                )}
              >
                {link.label}
                {!isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-teal-600 to-blue-700 transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            ))}
          </nav>

          <Link
            to="/astra/status"
            aria-current={isActive("/astra/status") ? "page" : undefined}
            className={cx(
              "hidden rounded-xl text-sm font-semibold transition-all duration-300 lg:inline-flex",
              isActive("/astra/status")
                ? "text-white bg-white/10 shadow-lg"
                : "text-white/90 hover:text-white hover:bg-white/5"
            )}
          >
            <span className="px-4 py-3">Status</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-white/20"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-t border-white/10 bg-black/60 backdrop-blur-3xl lg:hidden">
          <nav className="flex flex-col space-y-3 p-4">
            <div className="space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${navLinkClasses(item.to)} block relative pl-6 group`}
                >
                  {item.label}
                  {isActive(item.to) && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-teal-600 to-blue-700 rounded-full transition-all duration-300" />
                  )}
                </Link>
              ))}
              <Link
                to="/astra/status"
                className={`${navLinkClasses("/astra/status")} block relative pl-6 group`}
              >
                Status
                {isActive("/astra/status") && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-teal-600 to-blue-700 rounded-full transition-all duration-300" />
                )}
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div id="top" />
      <Outlet />

      <footer className="relative border-t border-[#1E2430]/60 bg-[#030509]/45 backdrop-blur-md">
        <div className="container-responsive flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={astraLogo}
              alt="ASTRA"
              className="h-8 w-8 object-contain"
            />
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-white">
                ASTRA
              </p>
              <p className="mt-0.5 text-[11px] text-[#5C6474]">
                Anoneurx Lab · self-learning AI research
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              to="/astra/status"
              className="text-[13px] font-medium text-[#A5ACBE] transition-colors hover:text-white"
            >
              Status
            </Link>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-medium text-[#A5ACBE] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="font-mono text-[11px] uppercase tracking-wider text-[#5C6474]">
            © {new Date().getFullYear()} Anoneurx
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default AstraLayout;