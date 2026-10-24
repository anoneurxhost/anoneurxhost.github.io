import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LabTheme = "light" | "dark";

const STORAGE_KEY = "anoneurx-lab-theme";

/** Browser UI colour that matches each lab theme. */
const THEME_COLORS: Record<LabTheme, string> = {
  light: "#FAFAFA",
  dark: "#0A0A0B",
};

/** The rest of the site is dark, so the lab page restores this on unmount. */
const DEFAULT_THEME_COLOR = "#0A0A0B";

type LabThemeContextValue = {
  /** The theme currently painted on the page. */
  theme: LabTheme;
  /** True when the theme follows the operating system instead of an explicit choice. */
  followsSystem: boolean;
  /** Switches between light and dark and remembers the choice. */
  toggleTheme: () => void;
};

const LabThemeContext = createContext<LabThemeContextValue | null>(null);

const readStoredTheme = (): LabTheme | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // Private mode or blocked storage — fall back to the system preference.
    return null;
  }
};

const systemTheme = (): LabTheme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/**
 * Writes the resolved theme to <html data-theme>. The attribute is the single
 * source of truth for the stylesheet (see src/styles/lab.css); the inline
 * bootstrap script in index.html sets it before first paint, so this only has
 * to keep it in sync afterwards.
 *
 * The UA colour scheme is deliberately not touched here: `color-scheme` is
 * scoped to `.lab-root` in the stylesheet so the rest of the site is
 * unaffected by the lab theme.
 */
const applyTheme = (theme: LabTheme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

/** Keeps the browser UI (address bar on mobile) in sync with the lab theme. */
const applyThemeColor = (color: string) => {
  let meta = document.getElementById("theme-color");
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("id", "theme-color");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", color);
};

/**
 * Theme state for the research lab page.
 *
 * The initial value is read from the DOM attribute written by the pre-paint
 * bootstrap script, which keeps the first client render identical to the
 * server-rendered markup and avoids a flash of the wrong theme.
 */
export const LabThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<LabTheme>(() => {
    if (typeof document === "undefined") return "light";
    const stored = readStoredTheme();
    if (stored) return stored;
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "dark" ? "dark" : attr === "light" ? "light" : systemTheme();
  });

  const [followsSystem, setFollowsSystem] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    // Only an explicit, remembered choice leaves the system theme.
    return readStoredTheme() === null;
  });

  // Keep the document attribute and the browser UI colour in sync.
  useEffect(() => {
    applyTheme(theme);
    applyThemeColor(THEME_COLORS[theme]);
  }, [theme]);

  // Restore the site chrome when the visitor leaves the lab page.
  useEffect(
    () => () => {
      applyThemeColor(DEFAULT_THEME_COLOR);
    },
    [],
  );

  // Follow the OS while the visitor has not made an explicit choice.
  useEffect(() => {
    if (!followsSystem || typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [followsSystem]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: LabTheme = current === "dark" ? "light" : "dark";
      setFollowsSystem(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable — the choice still applies for this visit.
      }
      return next;
    });
  }, []);

  const value = useMemo<LabThemeContextValue>(
    () => ({ theme, followsSystem, toggleTheme }),
    [theme, followsSystem, toggleTheme],
  );

  return <LabThemeContext.Provider value={value}>{children}</LabThemeContext.Provider>;
};

export const useLabTheme = (): LabThemeContextValue => {
  const context = useContext(LabThemeContext);
  if (!context) throw new Error("useLabTheme must be used inside a LabThemeProvider");
  return context;
};
