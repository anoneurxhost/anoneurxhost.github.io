import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ProgramId, PortalUser, ProgramDocument } from "./types";
import {
  PORTAL_USER,
  PORTAL_NOTIFICATIONS,
  PORTAL_MESSAGES,
  SHARED_PROJECTS,
  CERTIFICATES,
  CALENDAR_EVENTS,
  COURSES,
  ASSIGNMENTS,
  TIMETABLE,
  FACULTY,
  ANNOUNCEMENTS,
  SEMESTERS,
  INTERNSHIP,
  MENTOR,
  KANBAN_TASKS,
  INTERN_PROJECTS,
  WEEKLY_REPORTS,
  MEETINGS,
  EVALUATIONS,
  INTERN_DOCUMENTS,
  HACKATHON,
  HACKATHON_TEAM,
  TEAM_INVITES,
  HACKATHON_SUBMISSIONS,
  LEADERBOARD,
  JUDGING_RESULTS,
  HACKATHON_FEEDBACK,
  PORTAL_ACTIVITY,
  ATTENDANCE_SESSIONS,
} from "./data";
import { PORTAL_MODULES } from "./portal.config";
import { documentsStore, useDocumentsStore } from "./documentsStore";


interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  module: ProgramId | "general";
  route: string;
}

export interface PortalSearchEntry {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  module: ProgramId | "general";
  route: string;
}

interface PortalContextType {
  user: PortalUser;
  memberships: ProgramId[];
  enrolledModules: typeof PORTAL_MODULES;
  notifications: typeof PORTAL_NOTIFICATIONS;
  unreadNotifications: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  messages: typeof PORTAL_MESSAGES;
  unreadMessages: number;
  markMessageRead: (id: string) => void;
  search: (query: string) => SearchResult[];
  addDocument: (doc: Omit<ProgramDocument, "id" | "verificationId">) => void;
  searchIndex: PortalSearchEntry[];
  data: {
    courses: typeof COURSES;
    assignments: typeof ASSIGNMENTS;
    timetable: typeof TIMETABLE;
    faculty: typeof FACULTY;
    announcements: typeof ANNOUNCEMENTS;
    semesters: typeof SEMESTERS;
    attendance: typeof ATTENDANCE_SESSIONS;
    internship: typeof INTERNSHIP;
    mentor: typeof MENTOR;
    kanbanTasks: typeof KANBAN_TASKS;
    internProjects: typeof INTERN_PROJECTS;
    weeklyReports: typeof WEEKLY_REPORTS;
    meetings: typeof MEETINGS;
    evaluations: typeof EVALUATIONS;
    internDocuments: typeof INTERN_DOCUMENTS;
    documents: ProgramDocument[];
    hackathon: typeof HACKATHON;
    team: typeof HACKATHON_TEAM;
    invites: typeof TEAM_INVITES;
    submissions: typeof HACKATHON_SUBMISSIONS;
    leaderboard: typeof LEADERBOARD;
    judging: typeof JUDGING_RESULTS;
    feedback: typeof HACKATHON_FEEDBACK;
    projects: typeof SHARED_PROJECTS;
    certificates: typeof CERTIFICATES;
    events: typeof CALENDAR_EVENTS;
    activity: typeof PORTAL_ACTIVITY;
  };
}

const PortalContext = createContext<PortalContextType | null>(null);

export const usePortal = () => {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within a PortalProvider");
  return ctx;
};

const buildSearchIndex = (): PortalSearchEntry[] => {
  const entries: PortalSearchEntry[] = [];
  COURSES.forEach((c) =>
    entries.push({
      id: `course-${c.id}`,
      title: c.title,
      subtitle: `${c.code} · ${c.instructor} · ${c.credits} credits`,
      category: "Course",
      module: "university",
      route: "/portal/university",
    })
  );
  ASSIGNMENTS.forEach((a) => {
    const course = COURSES.find((c) => c.id === a.courseId);
    entries.push({
      id: `as-${a.id}`,
      title: a.title,
      subtitle: `${course?.code ?? "Assignment"} · Due ${a.dueDate}`,
      category: "Assignment",
      module: "university",
      route: "/portal/university",
    });
  });
  FACULTY.forEach((f) =>
    entries.push({
      id: `fac-${f.id}`,
      title: f.name,
      subtitle: `${f.title} · ${f.department}`,
      category: "Faculty",
      module: "university",
      route: "/portal/university",
    })
  );
  INTERN_PROJECTS.forEach((p) =>
    entries.push({
      id: `ip-${p.id}`,
      title: p.name,
      subtitle: p.stack.join(" · "),
      category: "Internship Project",
      module: "internship",
      route: "/portal/internship",
    })
  );
  KANBAN_TASKS.forEach((t) =>
    entries.push({
      id: `task-${t.id}`,
      title: t.title,
      subtitle: `${t.column} · Priority ${t.priority} · Due ${t.due}`,
      category: "Task",
      module: "internship",
      route: "/portal/internship",
    })
  );
  HACKATHON_TEAM.forEach((m) =>
    entries.push({
      id: `team-${m.id}`,
      title: m.name,
      subtitle: `${m.role} · ${m.skills.join(", ")}`,
      category: "Hackathon Team",
      module: "hackathon",
      route: "/portal/hackathon",
    })
  );
  HACKATHON_SUBMISSIONS.forEach((s) =>
    entries.push({
      id: `sub-${s.id}`,
      title: s.title,
      subtitle: `${s.round} · ${s.status}${s.score ? ` · ${s.score}/100` : ""}`,
      category: "Hackathon Submission",
      module: "hackathon",
      route: "/portal/hackathon",
    })
  );
  SHARED_PROJECTS.forEach((p) =>
    entries.push({
      id: `sp-${p.id}`,
      title: p.name,
      subtitle: p.tags.join(" · "),
      category: "Project",
      module: p.module,
      route: "/portal/projects",
    })
  );
  CERTIFICATES.forEach((c) =>
    entries.push({
      id: `cert-${c.id}`,
      title: c.title,
      subtitle: `${c.issuer} · ${c.issuedOn}`,
      category: "Certificate",
      module: c.module,
      route: "/portal/certificates",
    })
  );
  CALENDAR_EVENTS.forEach((e) =>
    entries.push({
      id: `ev-${e.id}`,
      title: e.title,
      subtitle: `${e.date} · ${e.time}`,
      category: "Event",
      module: e.module,
      route: "/portal/calendar",
    })
  );
  return entries;
};

const SEARCH_INDEX = buildSearchIndex();

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState(PORTAL_NOTIFICATIONS);
  const [messages, setMessages] = useState(PORTAL_MESSAGES);
  const allDocuments = useDocumentsStore();

  const addDocument = useCallback(
    (doc: Omit<ProgramDocument, "id" | "verificationId">) => {
      documentsStore.add(doc);
    },
    [],
  );


  const memberships: ProgramId[] = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.memberships) && parsed.memberships.length > 0) {
          return parsed.memberships.filter((m: string) =>
            PORTAL_MODULES.some((mod) => mod.id === m)
          );
        }
      }
    } catch {
      /* fall through to default */
    }
    return ["university", "internship", "hackathon"];
  }, []);

  const identity: Partial<PortalUser> = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        const result: Partial<PortalUser> = {};
        if (typeof parsed.anxId === "string") result.anxId = parsed.anxId;
        if (
          parsed.programIds &&
          typeof parsed.programIds === "object" &&
          !Array.isArray(parsed.programIds)
        ) {
          result.programIds = parsed.programIds;
        }
        if (typeof parsed.name === "string") result.name = parsed.name;
        if (typeof parsed.initials === "string") result.initials = parsed.initials;
        return result;
      }
    } catch {
      /* fall through */
    }
    return {};
  }, []);

  const user: PortalUser = useMemo(
    () => ({
      ...PORTAL_USER,
      ...identity,
      memberships,
    }),
    [memberships, identity]
  );

  /**
   * Documents visible to the signed-in participant: their own records when the
   * roster matches, otherwise every document for the programs they belong to.
   */
  const documents = useMemo(() => {
    const own = allDocuments.filter(
      (d) =>
        (user.anxId && d.participantId === user.anxId) ||
        Object.values(user.programIds ?? {}).includes(d.participantId ?? "") ||
        d.participant === user.name,
    );
    if (own.length > 0) return own;
    return allDocuments.filter(
      (d) => d.program !== "organization" && memberships.includes(d.program),
    );
  }, [allDocuments, user, memberships]);



  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const storedName = parsed.name || parsed.email?.split("@")[0];
        if (storedName) {
          setMessages((prev) => [
            ...prev,
            {
              id: "msg-welcome",
              sender: "Anoneurx Portal",
              senderInitials: "AX",
              text: `Welcome to your unified portal, ${storedName.split(" ")[0]}! All your programs in one place.`,
              time: "Now",
              read: false,
              mine: false,
            },
          ]);
        }
      } catch {
        /* ignore */
      }
    }
  }, []);

  const enrolledModules = useMemo(
    () => PORTAL_MODULES.filter((m) => memberships.includes(m.id)),
    [memberships]
  );

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  const markNotificationRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAllNotificationsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markMessageRead = (id: string) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );

  const search = (query: string): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.subtitle.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q)
    ).slice(0, 12);
  };

  const value: PortalContextType = {
    user,
    memberships,
    enrolledModules,
    notifications,
    unreadNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    messages,
    unreadMessages,
    markMessageRead,
    search,
    addDocument,
    searchIndex: SEARCH_INDEX,
    data: {
      courses: COURSES,
      assignments: ASSIGNMENTS,
      timetable: TIMETABLE,
      faculty: FACULTY,
      announcements: ANNOUNCEMENTS,
      semesters: SEMESTERS,
      attendance: ATTENDANCE_SESSIONS,
      internship: INTERNSHIP,
      mentor: MENTOR,
      kanbanTasks: KANBAN_TASKS,
      internProjects: INTERN_PROJECTS,
      weeklyReports: WEEKLY_REPORTS,
      meetings: MEETINGS,
      evaluations: EVALUATIONS,
      internDocuments: INTERN_DOCUMENTS,
      documents,
      hackathon: HACKATHON,
      team: HACKATHON_TEAM,
      invites: TEAM_INVITES,
      submissions: HACKATHON_SUBMISSIONS,
      leaderboard: LEADERBOARD,
      judging: JUDGING_RESULTS,
      feedback: HACKATHON_FEEDBACK,
      projects: SHARED_PROJECTS,
      certificates: CERTIFICATES,
      events: CALENDAR_EVENTS,
      activity: PORTAL_ACTIVITY,
    },
  };

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  );
};
