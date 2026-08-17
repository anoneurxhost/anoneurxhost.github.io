export type ProgramId = "university" | "internship" | "hackathon";

export type ModuleStatus = "active" | "pending" | "completed";

export interface PortalUser {
  id: string;
  anxId: string;
  programIds: Partial<Record<ProgramId, string>>;
  name: string;
  email: string;
  initials: string;
  title: string;
  location: string;
  bio: string;
  memberships: ProgramId[];
  education: EducationEntry[];
  skills: string[];
  achievements: Achievement[];
  socials: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
  programHistory: ProgramHistoryEntry[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

export interface Achievement {
  id: string;
  title: string;
  module: ProgramId;
  description: string;
  earnedOn: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface ProgramHistoryEntry {
  program: ProgramId;
  title: string;
  period: string;
  role: string;
  summary: string;
  skills: string[];
}

/* ------------------------------ University ------------------------------ */

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  semester: string;
  status: "in-progress" | "completed" | "upcoming";
  progress: number;
  grade?: string;
  attendance: number;
  color: string;
  category: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  maxScore: number;
  score?: number;
  weight: number;
}

export interface TimetableSlot {
  id: string;
  day: string;
  start: string;
  end: string;
  courseCode: string;
  title: string;
  location: string;
  type: "Lecture" | "Lab" | "Seminar" | "Workshop";
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  courses: string[];
  rating: number;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  author: string;
  priority: "normal" | "high" | "urgent";
}

export interface SemesterRecord {
  id: string;
  name: string;
  gpa: number;
  credits: number;
  status: "completed" | "current";
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string;
  present: boolean;
}

/* ------------------------------ Internship ------------------------------ */

export interface InternshipMeta {
  company: string;
  role: string;
  department: string;
  status: "in-progress" | "completed";
  startDate: string;
  endDate: string;
  hoursPerWeek: number;
  stipend: string;
  supervisor: string;
  skills: string[];
}

export interface Mentor {
  name: string;
  title: string;
  email: string;
  company: string;
  rating: number;
  reviews: number;
  nextMeeting: string;
  bio: string;
}

export type KanbanColumn = "backlog" | "todo" | "in-progress" | "review" | "done";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  column: KanbanColumn;
  priority: "low" | "medium" | "high" | "urgent";
  due: string;
  tags: string[];
  projectId: string;
}

export interface InternProject {
  id: string;
  name: string;
  description: string;
  stack: string[];
  progress: number;
  status: "in-progress" | "completed";
  repo: string;
  milestones: string[];
}

export interface WeeklyReport {
  id: string;
  week: number;
  title: string;
  summary: string;
  highlights: string[];
  blockers: string;
  status: "submitted" | "draft";
  submittedOn: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  attendee: string;
  agenda: string[];
}

export interface Evaluation {
  id: string;
  criteria: string;
  score: number;
  maxScore: number;
  comments: string;
  reviewer: string;
  date: string;
}

export interface InternDocument {
  id: string;
  name: string;
  type: "Offer Letter" | "Completion Certificate" | "Experience Letter" | "Policy" | "Evaluation";
  status: "issued" | "pending" | "verified";
  issuedOn: string;
  description: string;
}

/* ------------------------------- Documents ------------------------------ */

export type DocumentStatus = "issued" | "pending" | "verified" | "revoked";

/** Programs plus organization-wide (staff/leadership) records. */
export type DocumentTrack = ProgramId | "organization";

export type DocumentCategory =
  | "Offer Letter"
  | "Completion Certificate"
  | "Experience Letter"
  | "Participation Certificate"
  | "Winner Certificate"
  | "Transcript"
  | "Enrollment Letter"
  | "Fee Receipt"
  | "Submission Receipt"
  | "Agreement"
  | "Policy"
  | "Evaluation"
  | "Mid-Internship Evaluation"
  | "Final Evaluation"
  | "Project Report"
  | "Research Paper"
  | "Code of Conduct"
  | "NDA"
  | "HR Policies"
  | "Appointment Letter"
  | "Employment Letter"
  | "Payslip"
  | "Upload";

export interface DocumentEvent {
  status: DocumentStatus;
  at: string;
  by: string;
  note?: string;
}

/** A document issued to (or uploaded by) a participant in any program. */
export interface ProgramDocument {
  id: string;
  name: string;
  program: DocumentTrack;
  type: DocumentCategory;
  status: DocumentStatus;
  issuedOn: string;
  description: string;
  issuer: string;
  verificationId: string;
  sizeKb?: number;
  uploaded?: boolean;
  /** Owner of the record — used by the admin documents dashboard. */
  participant?: string;
  participantId?: string;
  participantRole?: string;
  /** Programme title printed on certificates, e.g. "React Web Developer Internship". */
  programme?: string;
  history?: DocumentEvent[];
}



/* ------------------------------- Hackathon ------------------------------ */

export interface HackathonMeta {
  name: string;
  edition: string;
  theme: string;
  status: "in-progress" | "completed";
  startDate: string;
  endDate: string;
  prizePool: string;
  host: string;
  track: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  isYou?: boolean;
}

export interface TeamInvite {
  id: string;
  name: string;
  email: string;
  status: "pending" | "accepted" | "declined";
  invitedOn: string;
}

export interface Submission {
  id: string;
  round: string;
  title: string;
  description: string;
  repo: string;
  demo: string;
  submittedOn: string;
  status: "submitted" | "reviewed";
  score?: number;
}

export interface LeaderboardEntry {
  id: string;
  team: string;
  project: string;
  score: number;
  rounds: number[];
  isYou?: boolean;
}

export interface JudgingResult {
  id: string;
  criterion: string;
  score: number;
  maxScore: number;
  judge: string;
  feedback: string;
}

export interface HackathonFeedback {
  id: string;
  from: string;
  role: string;
  message: string;
  date: string;
  rating: number;
}

/* -------------------------------- Shared -------------------------------- */

export type ProjectStatus = "planning" | "in-progress" | "review" | "completed";

export interface SharedProject {
  id: string;
  name: string;
  description: string;
  module: ProgramId | "general";
  status: ProjectStatus;
  progress: number;
  repo: string;
  tags: string[];
  updatedAt: string;
  tasks: { done: number; total: number };
}

export interface Certificate {
  id: string;
  title: string;
  module: ProgramId;
  issuer: string;
  issuedOn: string;
  credentialId: string;
  status: "verified" | "pending";
  description: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "class" | "assignment" | "meeting" | "deadline" | "event" | "submission";
  module: ProgramId | "general";
  location?: string;
}

export interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
  module: ProgramId | "general";
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderInitials: string;
  text: string;
  time: string;
  read: boolean;
  mine: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "grade" | "submission" | "certificate" | "achievement" | "meeting" | "evaluation" | "task";
  module: ProgramId;
}
