import { useEffect, type ReactNode } from "react";
import labLogo from "@/assets/logo.jpeg";
import LabFooter from "./LabFooter";
import LabNav from "./LabNav";
import { LabThemeProvider } from "./LabThemeProvider";

/**
 * Chrome shared by the lab pages that use the 2026 design (landing page,
 * publication detail, project detail). Legacy lab pages keep their own shell.
 *
 * The shell owns the page canvas and the favicon while it is mounted, so the
 * rest of the site keeps its own background and icon on unmount.
 */
const LabShell = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.body.classList.add("lab-body");

    const icon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const previous = icon
      ? { href: icon.getAttribute("href"), type: icon.getAttribute("type") }
      : null;

    if (icon) {
      icon.setAttribute("type", "image/jpeg");
      icon.setAttribute("href", labLogo);
    }

    return () => {
      document.body.classList.remove("lab-body");
      if (icon && previous) {
        if (previous.href !== null) icon.setAttribute("href", previous.href);
        if (previous.type !== null) icon.setAttribute("type", previous.type);
      }
    };
  }, []);

  return (
    <LabThemeProvider>
      <div className="lab-root">
        <a className="lab-skip-link" href="#lab-main">
          Skip to content
        </a>

        <LabNav />

        <div id="lab-main" tabIndex={-1}>
          {children}
        </div>

        <LabFooter />
      </div>
    </LabThemeProvider>
  );
};

export default LabShell;
