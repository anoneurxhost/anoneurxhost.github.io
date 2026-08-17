import {
  LayoutGrid,
  Users,
  Building,
  Banknote,
  TrendingUp,
  BarChart3,
  FolderOpen,
  GraduationCap,
  BookOpen,
  Edit3,
  Shield,
  FileSearch,
  Settings,
  MessageSquare,
  FileText,
  Calendar,
  UserPlus,
  Target,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type StaffRole = "ceo" | "hr" | "hod";

export interface StaffMenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface StaffConsole {
  role: StaffRole;
  name: string;
  subtitle: string;
  eyebrow: string;
  gradient: string;
  home: string;
  menu: StaffMenuItem[];
}

/**
 * Single source of truth for the three staff consoles. Each role owns its own
 * route namespace, so a signed-in HR account never sees or reaches CEO/HOD
 * pages. Menus mirror the entries that previously lived in DashboardSidebar.
 */
export const STAFF_CONSOLES: Record<StaffRole, StaffConsole> = {
  ceo: {
    role: "ceo",
    name: "Executive Console",
    subtitle: "Executive Console",
    eyebrow: "Leadership",
    gradient: "from-amber-500 to-orange-500",
    home: "/dashboard/ceo",
    menu: [
      { label: "Overview", path: "/dashboard/ceo", icon: LayoutGrid },
      { label: "Chat", path: "/dashboard/ceo/chat", icon: MessageSquare },
      { label: "User Management", path: "/dashboard/ceo/users", icon: Users },
      { label: "Departments", path: "/dashboard/ceo/departments", icon: Building },
      { label: "Finance", path: "/dashboard/ceo/finance", icon: Banknote },
      { label: "Strategic KPIs", path: "/dashboard/ceo/strategic-kpis", icon: TrendingUp },
      { label: "Analytics", path: "/dashboard/ceo/analytics", icon: BarChart3 },
      { label: "Projects", path: "/dashboard/ceo/projects", icon: FolderOpen },
      { label: "Internships", path: "/dashboard/ceo/internships", icon: GraduationCap },
      { label: "Research", path: "/dashboard/ceo/research", icon: BookOpen },
      { label: "Content Manager", path: "/dashboard/ceo/content-manager", icon: Edit3 },
      { label: "Team Portfolios", path: "/dashboard/ceo/team-portfolios", icon: UsersRound },
      { label: "Audit Logs", path: "/dashboard/ceo/audit", icon: Shield },
      { label: "Documents Register", path: "/dashboard/ceo/documents", icon: FileSearch },
      { label: "Settings", path: "/dashboard/ceo/settings", icon: Settings },
    ],
  },
  hr: {
    role: "hr",
    name: "HR Console",
    subtitle: "HR Console",
    eyebrow: "People operations",
    gradient: "from-emerald-500 to-teal-500",
    home: "/dashboard/hr",
    menu: [
      { label: "Overview", path: "/dashboard/hr", icon: LayoutGrid },
      { label: "Chat", path: "/dashboard/hr/chat", icon: MessageSquare },
      { label: "Internships", path: "/dashboard/hr/internships", icon: GraduationCap },
      { label: "Employees", path: "/dashboard/hr/employees", icon: Users },
      { label: "Payroll", path: "/dashboard/hr/payroll", icon: Banknote },
      { label: "Documents", path: "/dashboard/hr/documents", icon: FileText },
      { label: "Documents Register", path: "/dashboard/hr/documents-register", icon: FileSearch },
      { label: "Leave Management", path: "/dashboard/hr/leave", icon: Calendar },
      { label: "HR Analytics", path: "/dashboard/hr/analytics", icon: BarChart3 },
      { label: "Research", path: "/dashboard/hr/research", icon: BookOpen },
      { label: "Team Portfolios", path: "/dashboard/hr/team-portfolios", icon: UsersRound },
      { label: "Add Employee", path: "/dashboard/hr/add-employee", icon: UserPlus },
      { label: "Settings", path: "/dashboard/hr/settings", icon: Settings },
    ],
  },
  hod: {
    role: "hod",
    name: "Department Console",
    subtitle: "Department Console",
    eyebrow: "Department leadership",
    gradient: "from-violet-500 to-fuchsia-500",
    home: "/dashboard/hod",
    menu: [
      { label: "Overview", path: "/dashboard/hod", icon: LayoutGrid },
      { label: "Chat", path: "/dashboard/hod/chat", icon: MessageSquare },
      { label: "Department Staff", path: "/dashboard/hod/staff", icon: Users },
      { label: "Interns", path: "/dashboard/hod/interns", icon: GraduationCap },
      { label: "Team Performance", path: "/dashboard/hod/performance", icon: Target },
      { label: "Budget", path: "/dashboard/hod/budget", icon: Banknote },
      { label: "Projects", path: "/dashboard/hod/projects", icon: FolderOpen },
      { label: "Research", path: "/dashboard/hod/research", icon: BookOpen },
      { label: "Add Staff", path: "/dashboard/hod/add-staff", icon: UserPlus },
      { label: "Team Portfolios", path: "/dashboard/hod/team-portfolios", icon: UsersRound },
      { label: "Documents Register", path: "/dashboard/hod/documents", icon: FileSearch },
      { label: "Settings", path: "/dashboard/hod/settings", icon: Settings },
    ],
  },
};

export const STAFF_ROLES = Object.keys(STAFF_CONSOLES) as StaffRole[];

export const isStaffRole = (value?: string | null): value is StaffRole =>
  !!value && (STAFF_ROLES as string[]).includes(value);

/** Resolve the single staff role of the stored session user, if any. */
export const resolveStaffRole = (): StaffRole | null => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      role?: string;
      roles?: string[];
    };
    const candidates = [parsed.role, ...(parsed.roles ?? [])].filter(
      Boolean
    ) as string[];
    return (candidates.find(isStaffRole) as StaffRole | undefined) ?? null;
  } catch {
    return null;
  }
};

export const staffRoleFromPath = (pathname: string): StaffRole | null => {
  const seg = pathname.split("/")[2];
  return isStaffRole(seg) ? seg : null;
};
