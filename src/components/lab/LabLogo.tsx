import logoSvgRaw from "@/assets/lab/logo.svg?raw";
import { useLabTheme } from "./LabThemeProvider";

type LabLogoProps = {
  className?: string;
  title?: string;
};

const innerSvg = logoSvgRaw
  .replace(/<\?xml[^>]*\?>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<\/?svg[^>]*>/g, "");

/**
 * Lab brand mark from `src/assets/lab/logo.svg`, inlined so every path keeps
 * `currentColor` theming: white in dark theme, black in light theme. With 5%
 * transparency (opacity 0.95) and scaled up by the caller's size.
 *
 * Purely decorative unless a `title` is supplied.
 */
const LabLogo = ({ className, title }: LabLogoProps) => {
  const { theme } = useLabTheme();
  const color = theme === "dark" ? "#ffffff" : "#09090b";

  return (
    <svg
      className={className}
      viewBox="0 0 430 421"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      style={{ display: "block", color, opacity: 0.95 }}
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  );
};

export default LabLogo;
