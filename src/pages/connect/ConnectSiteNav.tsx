import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import blacklinkLogo from "@/assets/blacklink/logo.svg";

interface NavChild {
  label: string;
  to: string;
  description?: string;
}

interface NavGroup {
  label: string;
  to: string;
  children?: NavChild[];
}

interface ConnectSiteNavProps {
  dark: boolean;
}

const groups: NavGroup[] = [
  {
    label: "Product",
    to: "/blacklink",
    children: [
      { label: "Overview", to: "/blacklink" },
      { label: "Features", to: "/blacklink/features" },
      { label: "How It Works", to: "/blacklink/how-it-works" },
      { label: "Connect Agent", to: "/blacklink/agent" },
      { label: "Changelog", to: "/blacklink/changelog" },
    ],
  },
  {
    label: "Solutions",
    to: "/blacklink",
    children: [
      { label: "VPS & Cloud Servers", to: "/cloud/compute/virtual-machines" },
      { label: "Dedicated Servers", to: "/cloud/compute/bare-metal" },
      { label: "Private Infrastructure", to: "/cloud" },
      { label: "Developers", to: "/blacklink/how-it-works" },
      { label: "Black Wall", to: "/blackwall" },
    ],
  },
  {
    label: "Security",
    to: "/blacklink/security",
  },
  {
    label: "Docs",
    to: "/blacklink/docs",
  },
  {
    label: "Pricing",
    to: "/blacklink/pricing",
  },
  {
    label: "Status",
    to: "/blacklink/status",
  },
];

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60";
const linkActive = "bg-slate-100 text-slate-900 dark:bg-white/[0.06] dark:text-white";

const ConnectSiteNav = ({ dark }: ConnectSiteNavProps) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!openGroup) return;
    const panel = document.querySelector<HTMLElement>(`[data-dropdown-panel="${openGroup}"]`);
    const onDocClick = (e: MouseEvent) => {
      if (!panel || !panel.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#050506]/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/blacklink"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          aria-label="Anoneurx Black Link home"
        >
          <img
            src={blacklinkLogo}
            alt="Anoneurx Black Link logo"
            className={`h-9 w-9 object-contain brightness-0 ${dark ? "invert" : ""}`}
          />
        </Link>

        {/* Desktop groups */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Black Link navigation">
          {groups.map((g) =>
            g.children ? (
              <div key={g.label} className="relative" data-dropdown-panel={g.label}>
                <button
                  type="button"
                  onClick={() => setOpenGroup(openGroup === g.label ? null : g.label)}
                  aria-expanded={openGroup === g.label}
                  aria-haspopup="true"
                  className={`${linkBase} inline-flex items-center gap-1 ${openGroup === g.label ? linkActive : ""}`}
                >
                  {g.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${openGroup === g.label ? "rotate-180" : ""}`}
                  />
                </button>
                {openGroup === g.label && (
                  <div className="absolute right-0 top-full w-64 pt-2">
                    <div className="rounded-xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0b0d]/95">
                      {g.children.map((c) => (
                        <NavLink
                          key={c.label}
                          to={c.to}
                          end={c.to === "/blacklink"}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${isActive ? "text-slate-900 dark:text-white" : ""}`
                          }
                          onClick={() => setOpenGroup(null)}
                        >
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={g.label}
                to={g.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : ""}`
                }
              >
                {g.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/auth?mode=blacklink"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            Sign In
          </Link>
          <Link
            to="/blacklink/dashboard"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#050506]/95 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6" aria-label="Black Link mobile navigation">
            {groups.map((g) =>
              g.children ? (
                <div key={g.label} className="rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMobileGroup(mobileGroup === g.label ? null : g.label)}
                    aria-expanded={mobileGroup === g.label}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.06]"
                  >
                    {g.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${mobileGroup === g.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileGroup === g.label && (
                    <div className="mt-1 space-y-1 pl-3">
                      {g.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.to}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={g.label}
                  to={g.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  {g.label}
                </Link>
              )
            )}
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-white/[0.06]">
              <Link
                to="/auth?mode=blacklink"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/[0.06]"
              >
                Sign In
              </Link>
              <Link
                to="/blacklink/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Open Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default ConnectSiteNav;