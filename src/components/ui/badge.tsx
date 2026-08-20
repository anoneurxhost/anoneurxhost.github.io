import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        githubPill:
          "bg-[#0a0f1d]/90 border-[#2b3a60] text-[#b3c7ff] shadow-sm hover:border-[#425d99] hover:text-white hover:bg-[#0f172b] hover:shadow-[0_0_12px_rgba(79,110,247,0.25)]",
        profilePill:
          "bg-[#0b1021]/80 border-[#2a385c] text-[#a5c2ff] hover:border-[#455c94] hover:text-white hover:bg-[#10172e] hover:shadow-[0_0_10px_rgba(99,102,241,0.2)]",
        facultyPill:
          "bg-[#0a0e1c]/80 border-[#324574] text-[#b0c8ff] hover:border-[#526fb3] hover:text-white hover:bg-[#111930] hover:shadow-[0_0_10px_rgba(59,130,246,0.25)]",
        internPill:
          "bg-[#0a0f1d]/90 border-[#2b3a60] text-[#b3c7ff] hover:border-[#425d99] hover:text-white hover:bg-[#0f172b] hover:shadow-[0_0_12px_rgba(79,110,247,0.25)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const predefinedBadgeMap: Record<string, string> = {
  // Status Badges
  active: "#58A6FF",
  completed: "#3FB950",
  pending: "#D29922",
  upcoming: "#A371F7",
  draft: "#8B949E",
  cancelled: "#F85149",
  expired: "#DA3633",
  suspended: "#F0883E",
  archived: "#6E7681",
  verified: "#3FB950",
  unverified: "#8B949E",
  rejected: "#F85149",
  approved: "#56D364",
  review: "#D29922",

  // ANONEURX Categories
  internship: "#39C5CF",
  hackathon: "#F0883E",
  people: "#DB61A2",
  university: "#818CF8",
  faculty: "#A371F7",
  student: "#79C0FF",
  developer: "#58A6FF",
  "open source": "#3FB950",
  research: "#2EA043",
  community: "#BC8CFF",
  organization: "#8B949E",
  partner: "#D29922",
  certificate: "#56D364",
  verification: "#39D3F2",
  career: "#A371F7",
  education: "#58A6FF",
  event: "#F0883E",
  program: "#2EA043",
  team: "#DB61A2",
  company: "#8B949E",

  // Access / Account Badges
  admin: "#F85149",
  owner: "#A371F7",
  manager: "#F0883E",
  member: "#58A6FF",
  contributor: "#3FB950",
  maintainer: "#2EA043",
  guest: "#8B949E",
  alumni: "#D29922",
  "verified member": "#39D3F2",

  // Technology / Project Badges
  rust: "#F0883E",
  react: "#39C5CF",
  typescript: "#58A6FF",
  javascript: "#D29922",
  python: "#79C0FF",
  "ai / ml": "#BC8CFF",
  ai: "#BC8CFF",
  ml: "#BC8CFF",
  "data science": "#2EA043",
  robotics: "#DB61A2",
  backend: "#3FB950",
  frontend: "#39C5CF",
  "frontend developer": "#39C5CF",
  database: "#818CF8",
  api: "#F0883E",
  security: "#F85149",
  cloud: "#58A6FF",
  devops: "#A371F7",

  // Specific Intern Badges (BadgeKind)
  "open source contributor": "#3FB950",
  "research assistant": "#2EA043",
  "community mentor": "#BC8CFF",
  "outstanding intern": "#D29922",
  "collaboration award": "#39C5CF",
};

export const cuteThemes = [
  {
    // Lavender / Purple
    text: "#c084fc",
    bg: "rgba(168, 85, 247, 0.15)",
    border: "rgba(168, 85, 247, 0.35)",
    hoverBg: "rgba(168, 85, 247, 0.28)",
  },
  {
    // Rose / Cute Pink
    text: "#ff7aa2",
    bg: "rgba(244, 63, 94, 0.15)",
    border: "rgba(244, 63, 94, 0.35)",
    hoverBg: "rgba(244, 63, 94, 0.28)",
  },
  {
    // Electric Cyan
    text: "#38bdf8",
    bg: "rgba(6, 182, 212, 0.15)",
    border: "rgba(6, 182, 212, 0.35)",
    hoverBg: "rgba(6, 182, 212, 0.28)",
  },
  {
    // Mint / Emerald
    text: "#34d399",
    bg: "rgba(16, 185, 129, 0.15)",
    border: "rgba(16, 185, 129, 0.35)",
    hoverBg: "rgba(16, 185, 129, 0.28)",
  },
  {
    // Warm Gold / Amber
    text: "#fbbf24",
    bg: "rgba(245, 158, 11, 0.15)",
    border: "rgba(245, 158, 11, 0.35)",
    hoverBg: "rgba(245, 158, 11, 0.28)",
  },
  {
    // Magenta / Fuchsia
    text: "#e879f9",
    bg: "rgba(217, 70, 239, 0.15)",
    border: "rgba(217, 70, 239, 0.35)",
    hoverBg: "rgba(217, 70, 239, 0.28)",
  },
  {
    // Sky / Ice Blue
    text: "#60a5fa",
    bg: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.35)",
    hoverBg: "rgba(59, 130, 246, 0.28)",
  },
  {
    // Indigo / Violet
    text: "#818cf8",
    bg: "rgba(99, 102, 241, 0.15)",
    border: "rgba(99, 102, 241, 0.35)",
    hoverBg: "rgba(99, 102, 241, 0.28)",
  },
  {
    // Coral / Peach
    text: "#ff8866",
    bg: "rgba(255, 85, 51, 0.15)",
    border: "rgba(255, 85, 51, 0.35)",
    hoverBg: "rgba(255, 85, 51, 0.28)",
  },
  {
    // Turquoise / Teal
    text: "#2dd4bf",
    bg: "rgba(20, 184, 166, 0.15)",
    border: "rgba(20, 184, 166, 0.35)",
    hoverBg: "rgba(20, 184, 166, 0.28)",
  },
];

export type CuteColor =
  | "purple"
  | "rose"
  | "cyan"
  | "emerald"
  | "amber"
  | "fuchsia"
  | "sky"
  | "indigo"
  | "peach"
  | "teal";

const colorMap: Record<CuteColor, number> = {
  purple: 0,
  rose: 1,
  cyan: 2,
  emerald: 3,
  amber: 4,
  fuchsia: 5,
  sky: 6,
  indigo: 7,
  peach: 8,
  teal: 9,
};

function getThemeForString(str: string, colorProp?: string) {
  const key = str.toLowerCase().trim();

  if (key === "anoneurx" || key === "anoneurx organization" || colorProp === "anoneurx") {
    return {
      isAnoneurxBrand: true,
      text: "",
      bg: "",
      border: "",
    };
  }

  if (colorProp && colorProp.startsWith("#")) {
    return {
      isAnoneurxBrand: false,
      text: colorProp,
      bg: hexToRgba(colorProp, 0.15),
      border: hexToRgba(colorProp, 0.35),
    };
  }

  if (predefinedBadgeMap[key]) {
    const hex = predefinedBadgeMap[key];
    return {
      isAnoneurxBrand: false,
      text: hex,
      bg: hexToRgba(hex, 0.15),
      border: hexToRgba(hex, 0.35),
    };
  }

  if (colorProp && colorMap[colorProp as CuteColor] !== undefined) {
    return { isAnoneurxBrand: false, ...cuteThemes[colorMap[colorProp as CuteColor]] };
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % cuteThemes.length;
  return { isAnoneurxBrand: false, ...cuteThemes[index] };
}

export interface ProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "githubPill" | "profilePill" | "facultyPill" | "internPill" | "default" | "secondary" | "outline";
  color?: CuteColor | "anoneurx" | string;
  showDot?: boolean;
  size?: "sm" | "default";
}

function ProfileBadge({
  icon,
  children,
  className,
  variant,
  color,
  showDot = false,
  size = "default",
  style,
  ...props
}: ProfileBadgeProps) {
  const textStr = typeof children === "string" ? children : String(children || "");
  const theme = getThemeForString(textStr, color);

  if (theme.isAnoneurxBrand) {
    return (
      <div
        className={cn(
          "relative inline-flex items-center gap-1 rounded-full p-[1px] overflow-hidden backdrop-blur-md transition-all duration-200 select-none shadow-sm cursor-default hover:scale-[1.02]",
          className
        )}
        {...props}
      >
        {/* Animated Moving Border Line Light Loader */}
        <span className="absolute inset-[-200%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_260deg,#ec4899_290deg,#a855f7_330deg,#3b82f6_360deg)]" />

        {/* Inner Pill Content with Translucent Blue Blur */}
        <div
          className={cn(
            "relative z-10 inline-flex items-center gap-1 rounded-full bg-[#031528]/85 backdrop-blur-md backdrop-saturate-150 w-full h-full",
            size === "sm" ? "px-2 py-0.5 text-[11px] font-semibold" : "px-2.5 py-0.5 text-xs font-semibold"
          )}
        >
          {icon && <span className="text-[#58a6ff] shrink-0">{icon}</span>}
          <span className="truncate font-semibold text-[#58a6ff]">
            {children}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        color: theme.text,
        backgroundColor: theme.bg,
        borderColor: theme.border,
        ...style,
      }}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border backdrop-blur-md backdrop-saturate-150 transition-all duration-200 select-none shadow-sm cursor-default hover:scale-[1.02]",
        size === "sm" ? "px-2 py-0.5 text-[11px] font-semibold" : "px-2.5 py-0.5 text-xs font-semibold",
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          style={{ backgroundColor: theme.text }}
          className="w-1 h-1 rounded-full shadow-[0_0_5px_currentColor] animate-pulse shrink-0"
        />
      )}
      {icon && <span className="opacity-90 shrink-0" style={{ color: theme.text }}>{icon}</span>}
      <span className="truncate font-semibold" style={{ color: theme.text }}>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants, ProfileBadge }
