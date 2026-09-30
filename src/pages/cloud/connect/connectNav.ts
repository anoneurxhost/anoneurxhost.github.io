import {
  Ban,
  Database,
  FileCheck,
  Fingerprint,
  Flame,
  HardDrive,
  History,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  Network,
  Radar,
  RadioTower,
  RefreshCw,
  ScanSearch,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Terminal,
  TerminalSquare,
  Users,
  Webhook,
  type LucideIcon,
} from "lucide-react";

export interface ConnectNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Match the route exactly (used for section indexes). */
  end?: boolean;
}

export interface ConnectNavGroup {
  label: string;
  items: ConnectNavItem[];
}

/**
 * Single source of truth for the console navigation — used by the desktop
 * sidebar and the mobile drawer so the two can never drift apart.
 */
export const connectNavGroups: ConnectNavGroup[] = [
  {
    label: "Overview",
    items: [
      { to: "/blacklink/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/blacklink/dashboard/discover", label: "Discover", icon: Radar },
    ],
  },
  {
    label: "Security",
    items: [
      { to: "/blacklink/dashboard/security", label: "Security Overview", icon: ShieldAlert, end: true },
      { to: "/blacklink/dashboard/ssh", label: "SSH Hardening", icon: TerminalSquare },
      { to: "/blacklink/dashboard/bruteforce", label: "Brute Force Protection", icon: Flame },
      { to: "/blacklink/dashboard/ip-control", label: "IP Control", icon: Ban },
      { to: "/blacklink/dashboard/ports", label: "Ports", icon: RadioTower },
      { to: "/blacklink/dashboard/scan", label: "Vulnerability Scan", icon: ScanSearch },
      { to: "/blacklink/dashboard/integrity", label: "File Integrity", icon: FileCheck },
      { to: "/blacklink/dashboard/events", label: "Audit Events", icon: History },
    ],
  },
  {
    label: "Access & Data",
    items: [
      { to: "/blacklink/dashboard/secrets", label: "Secrets Vault", icon: KeyRound },
      { to: "/blacklink/dashboard/tls", label: "TLS Certificates", icon: Lock },
      { to: "/blacklink/dashboard/backups", label: "Backups", icon: Database },
      { to: "/blacklink/dashboard/updates", label: "Updates", icon: RefreshCw },
      { to: "/blacklink/dashboard/recovery", label: "Recovery Codes", icon: LifeBuoy },
      { to: "/blacklink/dashboard/totp", label: "Two-Factor Auth", icon: Smartphone },
    ],
  },
  {
    label: "Server",
    items: [
      { to: "/blacklink/dashboard/network", label: "Network", icon: Network },
      { to: "/blacklink/dashboard/storage", label: "Storage", icon: HardDrive },
      { to: "/blacklink/dashboard/users", label: "Users", icon: Users },
      { to: "/blacklink/dashboard/firewall", label: "Firewall", icon: ShieldCheck },
      { to: "/blacklink/dashboard/terminal", label: "Terminal", icon: Terminal },
    ],
  },
  {
    label: "Automation",
    items: [
      { to: "/blacklink/dashboard/ssh-keys", label: "SSH Keys", icon: Fingerprint },
      { to: "/blacklink/dashboard/webhooks", label: "Webhooks", icon: Webhook },
      { to: "/blacklink/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];