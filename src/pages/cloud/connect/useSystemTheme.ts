import { useEffect, useState } from "react";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

/** True when the OS requests dark mode. */
export function getSystemDark(): boolean {
  try {
    return media().matches;
  } catch {
    return false;
  }
}

/** Reflect the OS theme into Tailwind's `.dark` variant on <html>. */
export function applySystemTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

/**
 * Live system-theme detector for the console.
 * The `--cc-*` design tokens already follow prefers-color-scheme; this hook
 * additionally flips the `.dark` class so existing `dark:` variants (including
 * Radix portals that mount on <body>) match the OS — automatically, no toggle.
 */
export function useSystemTheme(): boolean {
  const [dark, setDark] = useState<boolean>(getSystemDark);

  useEffect(() => {
    applySystemTheme(dark);
    const mql = media();
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
      applySystemTheme(getSystemDark());
    };
  }, [dark]);

  return dark;
}