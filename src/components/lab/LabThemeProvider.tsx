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

/**
 * The 2026 lab design is light-only (Google Research style), so both named
 * themes map onto the white canvas; the stored choice is kept in localStorage
 * for compatibility but no longer changes the palette.
 */
const THEME_COLORS: Record<LabTheme, string> = {
  light: "#FFFFFF",
  dark: "#FFFFFF",
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
 * The 2026 redesign is light-only (Google Research style): the resolved theme
 * is always light, and the browser UI colour is kept in sync with it. The
 * context interface is unchanged for the components that still read it.
 */
export const LabThemeProvider = ({ children }: { children: ReactNode }) => {
  // Light-only design: the resolved theme is always light regardless of any
  // stored choice or OS preference.
  const [theme] = useState<LabTheme>("light");

  const [followsSystem] = useState<boolean>(false);

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

  const toggleTheme = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "light");
    } catch {
      // Storage unavailable — the choice still applies for this visit.
    }
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
