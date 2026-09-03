import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "os-theme";

export const applyStoredOSTheme = () => {
  const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  const theme = stored === "dark" ? "dark" : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const OSThemeToggle = () => {
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setDark((d) => !d)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default OSThemeToggle;
