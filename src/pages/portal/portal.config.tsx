import {
  GraduationCap,
  Briefcase,
  Trophy,
  FolderKanban,
  Award,
  CalendarDays,
  Bell,
  MessageSquare,
  Search,
  UserRound,
  LayoutGrid,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  CalendarRange,
  Users,
  Megaphone,
  ScrollText,
  LineChart,
  FileText,
  Medal,
  Download,
  Rocket,
  Scale,
  type LucideIcon,
} from "lucide-react";
import type { ProgramId } from "./types";

export interface ModuleFeature {
  title: string;
  description: string;
}

export interface PortalModule {
  id: ProgramId;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  route: string;
  status: string;
  role: string;
  stats: string[];
  features: ModuleFeature[];
}

/**
 * Module registry — the single source of truth for programs in the portal.
 * Adding a future program (Research, Open Source, Workshops, Competitions,
 * Jobs, Events) is a one-line addition here plus its page route. The
 * dashboard, sidebar, and auth derive everything else from this list.
 */
export const PORTAL_MODULES: PortalModule[] = [
  {
    id: "university",
    name: "University",
    shortName: "Student",
    description: "Courses, attendance, assignments, grades, timetable, transcripts and academic performance.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/25",
    route: "/portal/university",
    status: "Active",
    role: "B.Sc. Computer Science · Semester 6",
    stats: ["4 Courses", "3.84 GPA", "92% Attendance"],
    features: [
      { title: "Courses", description: "Enrolled courses with live progress" },
      { title: "Assignments", description: "Deadlines, submissions and grades" },
      { title: "Timetable", description: "Weekly lecture & lab schedule" },
      { title: "Analytics", description: "Semester performance insights" },
    ],
  },
  {
    id: "internship",
    name: "Internship",
    shortName: "Intern",
    description: "Mentor guidance, Kanban tasks, projects, weekly reports, meetings, evaluations and documents.",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
    route: "/portal/internship",
    status: "Active",
    role: "Software Engineering Intern · Anoneurx",
    stats: ["Week 8 / 12", "5 Projects", "4.6 Rating"],
    features: [
      { title: "Kanban Tasks", description: "Drag-and-drop task management" },
      { title: "Mentor", description: "1:1 guidance and feedback" },
      { title: "Reports", description: "Weekly progress reports" },
      { title: "Documents", description: "Offer, certificates & letters" },
    ],
  },
  {
    id: "hackathon",
    name: "Hackathon",
    shortName: "Hackathon",
    description: "Competition details, team management, submissions, leaderboard, judging results and achievements.",
    icon: Trophy,
    gradient: "from-purple-500 to-fuchsia-500",
    glow: "shadow-purple-500/25",
    route: "/portal/hackathon",
    status: "Active",
    role: "Team NEXUS · AI Challenge",
    stats: ["#1 of 24", "2 Rounds", "3 Badges"],
    features: [
      { title: "Team", description: "Members, invites and roles" },
      { title: "Submissions", description: "Repos, demos and judging" },
      { title: "Leaderboard", description: "Live standings across rounds" },
      { title: "Achievements", description: "Badges and certificates" },
    ],
  },
];

export interface PortalSystem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  route: string;
  inSidebar?: boolean;
}

export const PORTAL_SYSTEMS: PortalSystem[] = [
  { id: "dashboard", name: "Dashboard", description: "Personal overview", icon: LayoutGrid, route: "/portal" },
  { id: "projects", name: "Projects", description: "Unified project workspace", icon: FolderKanban, route: "/portal/projects" },
  { id: "documents", name: "Documents", description: "Unified document center", icon: FileText, route: "/portal/documents" },
  { id: "certificates", name: "Certificates", description: "Centralized certificate library", icon: Award, route: "/portal/certificates" },
  { id: "calendar", name: "Calendar", description: "Integrated schedule", icon: CalendarDays, route: "/portal/calendar" },
  { id: "notifications", name: "Notifications", description: "Global notification center", icon: Bell, route: "/portal/notifications", inSidebar: false },
  { id: "messages", name: "Messages", description: "Conversations & inbox", icon: MessageSquare, route: "/portal/messages", inSidebar: false },
  { id: "search", name: "Search", description: "Search across all programs", icon: Search, route: "/portal/search" },
  { id: "profile", name: "Profile", description: "Professional profile", icon: UserRound, route: "/portal/profile", inSidebar: false },
];

export const getModuleById = (id: ProgramId) =>
  PORTAL_MODULES.find((m) => m.id === id);

export const moduleGradient = (module: ProgramId | "general") => {
  if (module === "general") return "from-slate-500 to-slate-400";
  return getModuleById(module)?.gradient ?? "from-slate-500 to-slate-400";
};

export interface ProgramMenuItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

/**
 * Contextual navigation menus per program. Each item maps 1:1 to a top-nav
 * tab on the program page and to a route `/portal/{program}/{value}`.
 * Adding a future program is one entry here plus its page route — the
 * sidebar renders everything else dynamically from this config.
 */
export const PROGRAM_MENUS: Record<ProgramId, ProgramMenuItem[]> = {
  university: [
    { value: "overview", label: "Dashboard", icon: GraduationCap },
    { value: "courses", label: "Courses", icon: BookOpen },
    { value: "assignments", label: "Assignments", icon: ClipboardList },
    { value: "attendance", label: "Attendance", icon: CheckCircle2 },
    { value: "timetable", label: "Timetable", icon: CalendarRange },
    { value: "calendar", label: "Calendar", icon: CalendarDays },
    { value: "grades", label: "Grades", icon: Trophy },
    { value: "faculty", label: "Faculty", icon: Users },
    { value: "announcements", label: "Announcements", icon: Megaphone },
    { value: "analytics", label: "Analytics", icon: LineChart },
    { value: "transcripts", label: "Transcripts", icon: ScrollText },
    { value: "documents", label: "Documents", icon: FileText },
  ],
  internship: [
    { value: "overview", label: "Dashboard", icon: Briefcase },
    { value: "kanban", label: "Kanban", icon: ClipboardList },
    { value: "projects", label: "Projects", icon: FolderKanban },
    { value: "reports", label: "Reports", icon: FileText },
    { value: "calendar", label: "Calendar", icon: CalendarRange },
    { value: "meetings", label: "Meetings", icon: CalendarDays },
    { value: "evaluations", label: "Evaluations", icon: Medal },
    { value: "documents", label: "Documents", icon: FileText },
    { value: "analytics", label: "Analytics", icon: LineChart },
  ],
  hackathon: [
    { value: "overview", label: "Dashboard", icon: Trophy },
    { value: "team", label: "Team", icon: Users },
    { value: "workspace", label: "Workspace", icon: FolderKanban },
    { value: "calendar", label: "Calendar", icon: CalendarDays },
    { value: "submissions", label: "Submissions", icon: Rocket },
    { value: "leaderboard", label: "Leaderboard", icon: Medal },
    { value: "judging", label: "Judging", icon: Scale },
    { value: "achievements", label: "Achievements", icon: Award },
    { value: "feedback", label: "Feedback", icon: MessageSquare },
    { value: "documents", label: "Documents", icon: FileText },
  ],
};
