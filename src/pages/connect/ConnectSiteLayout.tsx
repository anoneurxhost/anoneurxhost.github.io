import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RouteSEO from "@/components/RouteSEO";
import ConnectSiteNav from "./ConnectSiteNav";
import ConnectSiteFooter from "./ConnectSiteFooter";

const CONSOLE_PREFIXES = [
  "/blacklink/dashboard",
  "/blacklink/auth",
];

const isConsolePath = (pathname: string) =>
  CONSOLE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));

const getSystemDark = (): boolean => {
  try {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return true;
  }
};

const ConnectSiteLayout = () => {
  const { pathname } = useLocation();
  const isConsole = isConsolePath(pathname);
  const isHome = pathname === "/blacklink";

  const [systemDark, setSystemDark] = useState<boolean>(getSystemDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (isConsole) return <Outlet />;

  // The home page always keeps its video-driven dark look; other pages follow the system theme.
  const effectiveDark = isHome ? true : systemDark;

  return (
    <div className={effectiveDark ? "dark" : ""}>
      <div className="relative min-h-screen bg-white text-slate-900 dark:bg-[#050506] dark:text-white">
        {/* Ambient background */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(250_80%_50%/0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.02),transparent_70%)]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <RouteSEO />
          <ConnectSiteNav dark={effectiveDark} />
          <main className="flex-1">
            <Outlet />
          </main>
          <ConnectSiteFooter dark={effectiveDark} />
        </div>
      </div>
    </div>
  );
};

export default ConnectSiteLayout;