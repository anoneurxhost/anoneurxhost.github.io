import type {
  ActivityItem,
  Announcement,
  Assignment,
  AttendanceSession,
  CalendarEvent,
  Certificate,
  ChatMessage,
  Course,
  Evaluation,
  FacultyMember,
  HackathonFeedback,
  HackathonMeta,
  InternDocument,
  ProgramDocument,
  InternProject,
  InternshipMeta,
  JudgingResult,
  KanbanTask,
  LeaderboardEntry,
  Meeting,
  Mentor,
  NotificationItem,
  PortalUser,
  SemesterRecord,
  SharedProject,
  Submission,
  TeamInvite,
  TeamMember,
  TimetableSlot,
  WeeklyReport,
} from "./types";

export const PORTAL_USER: PortalUser = {
  id: "usr_qasim",
  anxId: "ANX26000001",
  programIds: {
    university: "ANX26STU00014",
    internship: "ANX26INT00007",
    hackathon: "ANX26HAK00002",
  },
  name: "Muhammad Qasim",
  email: "muhammadqasim@anoneurx.com",
  initials: "MQ",
  title: "Full-Stack Developer & CS Undergraduate",
  location: "Lahore, Pakistan",
  bio: "Final-year Computer Science student and software engineering intern at Anoneurx. Building intelligent systems, competing in hackathons, and shipping production software. Passionate about AI, web engineering, and open source.",
  memberships: ["university", "internship", "hackathon"],
  education: [
    { institution: "Tech University", degree: "B.Sc. Computer Science", field: "Software Engineering", period: "2022 — 2026" },
    { institution: "Anoneurx Academy", degree: "Professional Certification", field: "Full-Stack Web Development", period: "2025" },
  ],
  skills: [
    "TypeScript", "React", "Node.js", "Next.js", "Python", "PostgreSQL",
    "Docker", "Tailwind CSS", "Git", "GraphQL", "REST APIs", "Machine Learning",
  ],
  achievements: [
    { id: "a1", title: "Hackathon Champion", module: "hackathon", description: "Won 1st place at the AI Innovation Challenge 2025.", earnedOn: "Jun 2025", rarity: "legendary" },
    { id: "a2", title: "Dean's List", module: "university", description: "Top 5% of the computer science cohort in semester 5.", earnedOn: "Jan 2025", rarity: "epic" },
    { id: "a3", title: "Star Intern", module: "internship", description: "Recognized for outstanding delivery in sprint reviews.", earnedOn: "Mar 2025", rarity: "rare" },
    { id: "a4", title: "First PR Merged", module: "internship", description: "Merged first production pull request at Anoneurx.", earnedOn: "Feb 2025", rarity: "common" },
  ],
  socials: {
    github: "github.com/muhammadqasim",
    linkedin: "linkedin.com/in/muhammadqasim",
    portfolio: "muhammadqasim.dev",
  },
  programHistory: [
    { program: "university", title: "B.Sc. Computer Science", period: "2022 — Present", role: "Undergraduate Student", summary: "Six semesters of software engineering, algorithms, databases, and intelligent systems with a 3.84 GPA.", skills: ["Algorithms", "Databases", "Operating Systems", "AI"] },
    { program: "internship", title: "Software Engineering Internship", period: "Jan 2025 — Present", role: "Software Engineering Intern", summary: "Full-stack intern at Anoneurx working on the web platform, contributing across frontend, backend, and infrastructure.", skills: ["React", "Node.js", "PostgreSQL", "Docker"] },
    { program: "hackathon", title: "AI Innovation Challenge", period: "May 2025 — Jun 2025", role: "Team Lead — Team NEXUS", summary: "Led a 4-person team to 1st place with an AI-powered document intelligence platform.", skills: ["LLMs", "FastAPI", "React", "Product Design"] },
  ],
};

/* ------------------------------- University ------------------------------ */

export const COURSES: Course[] = [
  { id: "c1", code: "CS401", title: "Advanced Web Engineering", instructor: "Prof. Sarah Smith", credits: 3, semester: "6th", status: "in-progress", progress: 82, attendance: 95, color: "from-blue-500 to-cyan-500", category: "Core" },
  { id: "c2", code: "CS402", title: "Machine Learning", instructor: "Dr. Mike Johnson", credits: 3, semester: "6th", status: "in-progress", progress: 68, attendance: 88, color: "from-purple-500 to-fuchsia-500", category: "Core" },
  { id: "c3", code: "CS403", title: "Database Systems", instructor: "Prof. Emily Brown", credits: 4, semester: "6th", status: "in-progress", progress: 74, attendance: 91, color: "from-emerald-500 to-teal-500", category: "Core" },
  { id: "c4", code: "CS404", title: "Software Architecture", instructor: "Dr. Robert Wilson", credits: 3, semester: "6th", status: "in-progress", progress: 60, attendance: 86, color: "from-amber-500 to-orange-500", category: "Core" },
  { id: "c5", code: "CS301", title: "Data Structures & Algorithms", instructor: "Prof. Sarah Smith", credits: 4, semester: "5th", status: "completed", progress: 100, grade: "A", attendance: 96, color: "from-rose-500 to-pink-500", category: "Core" },
  { id: "c6", code: "CS302", title: "Operating Systems", instructor: "Dr. Mike Johnson", credits: 3, semester: "5th", status: "completed", progress: 100, grade: "A-", attendance: 93, color: "from-sky-500 to-indigo-500", category: "Core" },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: "as1", courseId: "c1", title: "Build a Real-Time Collaborative Editor", dueDate: "2026-08-05", status: "pending", maxScore: 100, weight: 15 },
  { id: "as2", courseId: "c2", title: "ML Model: Sentiment Classification", dueDate: "2026-08-08", status: "pending", maxScore: 100, weight: 20 },
  { id: "as3", courseId: "c3", title: "Database Indexing Performance Lab", dueDate: "2026-08-10", status: "pending", maxScore: 50, weight: 10 },
  { id: "as4", courseId: "c4", title: "Microservices Architecture Design", dueDate: "2026-07-28", status: "submitted", maxScore: 100, weight: 15 },
  { id: "as5", courseId: "c1", title: "GraphQL API Implementation", dueDate: "2026-07-15", status: "graded", maxScore: 100, score: 92, weight: 15 },
  { id: "as6", courseId: "c2", title: "Neural Network from Scratch", dueDate: "2026-07-10", status: "graded", maxScore: 100, score: 88, weight: 15 },
];

export const TIMETABLE: TimetableSlot[] = [
  { id: "t1", day: "Monday", start: "09:00", end: "10:30", courseCode: "CS401", title: "Advanced Web Engineering", location: "Hall 4-A", type: "Lecture" },
  { id: "t2", day: "Monday", start: "11:00", end: "12:30", courseCode: "CS403", title: "Database Systems", location: "Lab 2", type: "Lab" },
  { id: "t3", day: "Tuesday", start: "09:00", end: "10:30", courseCode: "CS402", title: "Machine Learning", location: "Hall 3-B", type: "Lecture" },
  { id: "t4", day: "Tuesday", start: "14:00", end: "15:30", courseCode: "CS404", title: "Software Architecture", location: "Hall 1-C", type: "Seminar" },
  { id: "t5", day: "Wednesday", start: "09:00", end: "11:00", courseCode: "CS401", title: "Advanced Web Engineering", location: "Lab 1", type: "Lab" },
  { id: "t6", day: "Thursday", start: "10:00", end: "11:30", courseCode: "CS402", title: "Machine Learning", location: "Lab 3", type: "Lab" },
  { id: "t7", day: "Thursday", start: "13:00", end: "14:30", courseCode: "CS403", title: "Database Systems", location: "Hall 2-A", type: "Lecture" },
  { id: "t8", day: "Friday", start: "10:00", end: "11:30", courseCode: "CS404", title: "Software Architecture", location: "Hall 1-C", type: "Workshop" },
];

export const FACULTY: FacultyMember[] = [
  { id: "f1", name: "Prof. Sarah Smith", title: "Professor of Computer Science", department: "Web Engineering", email: "sarah.smith@techuniversity.edu", courses: ["CS401", "CS301"], rating: 4.9 },
  { id: "f2", name: "Dr. Mike Johnson", title: "Associate Professor", department: "Artificial Intelligence", email: "mike.johnson@techuniversity.edu", courses: ["CS402", "CS302"], rating: 4.7 },
  { id: "f3", name: "Prof. Emily Brown", title: "Professor", department: "Data Engineering", email: "emily.brown@techuniversity.edu", courses: ["CS403"], rating: 4.8 },
  { id: "f4", name: "Dr. Robert Wilson", title: "Associate Professor", department: "Software Systems", email: "robert.wilson@techuniversity.edu", courses: ["CS404"], rating: 4.6 },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: "n1", title: "Mid-Semester Examinations", body: "Mid-semester exams will run from August 15–19. Exam timetables are available on the student portal.", date: "Aug 1, 2026", author: "Examination Office", priority: "urgent" },
  { id: "n2", title: "Final Year Project Proposals", body: "Submit final year project proposals by August 12. Teams of up to three with a supervising faculty member are required.", date: "Jul 29, 2026", author: "Faculty of Computing", priority: "high" },
  { id: "n3", title: "Industry Guest Lecture", body: "A guest lecture on scaling AI systems in production will be held Friday at 3:00 PM in the main auditorium.", date: "Jul 25, 2026", author: "Department Office", priority: "normal" },
];

export const SEMESTERS: SemesterRecord[] = [
  { id: "s1", name: "Semester 1", gpa: 3.55, credits: 18, status: "completed" },
  { id: "s2", name: "Semester 2", gpa: 3.62, credits: 19, status: "completed" },
  { id: "s3", name: "Semester 3", gpa: 3.71, credits: 18, status: "completed" },
  { id: "s4", name: "Semester 4", gpa: 3.78, credits: 20, status: "completed" },
  { id: "s5", name: "Semester 5", gpa: 3.92, credits: 18, status: "completed" },
  { id: "s6", name: "Semester 6", gpa: 3.84, credits: 16, status: "current" },
];

export const ATTENDANCE_SESSIONS: AttendanceSession[] = [
  { id: "at1", courseId: "c1", date: "2026-07-30", present: true },
  { id: "at2", courseId: "c1", date: "2026-07-28", present: true },
  { id: "at3", courseId: "c1", date: "2026-07-23", present: false },
  { id: "at4", courseId: "c2", date: "2026-07-29", present: true },
  { id: "at5", courseId: "c2", date: "2026-07-24", present: true },
  { id: "at6", courseId: "c3", date: "2026-07-30", present: true },
  { id: "at7", courseId: "c3", date: "2026-07-27", present: false },
  { id: "at8", courseId: "c4", date: "2026-07-31", present: true },
];

/* ------------------------------- Internship ----------------------------- */

export const INTERNSHIP: InternshipMeta = {
  company: "Anoneurx",
  role: "Software Engineering Intern",
  department: "Web Platform",
  status: "in-progress",
  startDate: "Jan 6, 2026",
  endDate: "Sep 25, 2026",
  hoursPerWeek: 40,
  stipend: "PKR 60,000 / month",
  supervisor: "Ahmed Raza",
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "CI/CD"],
};

export const MENTOR: Mentor = {
  name: "Ahmed Raza",
  title: "Senior Software Engineer",
  email: "ahmed.raza@anoneurx.com",
  company: "Anoneurx",
  rating: 4.9,
  reviews: 128,
  nextMeeting: "Mon, Aug 4 · 2:00 PM",
  bio: "Full-stack engineer with 8+ years building production web platforms. Mentors interns on engineering craft, code review, and shipping quality software.",
};

export const KANBAN_TASKS: KanbanTask[] = [
  { id: "k1", title: "Design unified portal data model", description: "Define shared types and program membership schema for the participant portal.", column: "todo", priority: "high", due: "Aug 4", tags: ["Design", "Architecture"], projectId: "p1" },
  { id: "k2", title: "Wire notifications center API", description: "Connect the global notification center to the backend events stream.", column: "todo", priority: "medium", due: "Aug 6", tags: ["API", "Backend"], projectId: "p1" },
  { id: "k3", title: "Portal sidebar navigation", description: "Build config-driven sidebar rendering only enrolled program modules.", column: "in-progress", priority: "high", due: "Aug 2", tags: ["Frontend", "UI"], projectId: "p1" },
  { id: "k4", title: "Overview dashboard widgets", description: "Profile, deadlines, activity, achievements and quick actions on the landing view.", column: "in-progress", priority: "high", due: "Aug 3", tags: ["Frontend", "UI"], projectId: "p1" },
  { id: "k5", title: "Certificate library grid", description: "Centralized library with verified badges and download actions.", column: "review", priority: "medium", due: "Aug 1", tags: ["Frontend", "Documents"], projectId: "p1" },
  { id: "k6", title: "Dark theme tokens", description: "Introduce glassmorphism design tokens consistent across all modules.", column: "done", priority: "low", due: "Jul 30", tags: ["Design", "System"], projectId: "p1" },
  { id: "k7", title: "Kanban task board", description: "Drag-and-drop task management board for internship deliverables.", column: "done", priority: "medium", due: "Jul 29", tags: ["Frontend"], projectId: "p2" },
];

export const INTERN_PROJECTS: InternProject[] = [
  { id: "p1", name: "Unified Participant Portal", description: "Single dashboard combining University, Internship and Hackathon systems for every participant.", stack: ["React", "TypeScript", "Tailwind", "Node.js"], progress: 72, status: "in-progress", repo: "github.com/anoneurx/portal", milestones: ["Auth & memberships", "Module registry", "Dashboard overview", "Shared systems"] },
  { id: "p2", name: "Intern Task Orchestrator", description: "Internal Kanban tool used by the internship program to track weekly deliverables.", stack: ["React", "Node.js", "PostgreSQL"], progress: 100, status: "completed", repo: "github.com/anoneurx/tasks", milestones: ["Board UI", "Drag & drop", "Integrations"] },
  { id: "p3", name: "Anoneurx Website", description: "Marketing and documentation site with content management for multiple products.", stack: ["Next.js", "TypeScript", "MDX"], progress: 88, status: "in-progress", repo: "github.com/anoneurx/site", milestones: ["Pages", "CMS", "SEO"] },
];

export const WEEKLY_REPORTS: WeeklyReport[] = [
  { id: "w1", week: 7, title: "Portal module registry", summary: "Completed the config-driven module registry enabling programs to plug into the unified dashboard.", highlights: ["Module registry shipped", "Membership-aware navigation", "3 reviewers approved"], blockers: "None", status: "submitted", submittedOn: "Jul 27, 2026" },
  { id: "w2", week: 6, title: "Shared components audit", summary: "Audited shared UI primitives and introduced reusable glassmorphism components across modules.", highlights: ["12 components extracted", "Design tokens defined", "Accessibility pass"], blockers: "Waiting on design tokens review", status: "submitted", submittedOn: "Jul 20, 2026" },
  { id: "w3", week: 8, title: "Dashboard overview", summary: "Draft", highlights: [], blockers: "In progress", status: "draft", submittedOn: "" },
];

export const MEETINGS: Meeting[] = [
  { id: "m1", title: "Weekly 1:1 with Mentor", date: "Aug 3, 2026", time: "2:00 PM", duration: "45 min", type: "Mentor Meeting", attendee: "Ahmed Raza", agenda: ["Sprint progress", "Blockers", "Growth goals"] },
  { id: "m2", title: "Sprint Planning", date: "Aug 5, 2026", time: "10:00 AM", duration: "1 hr", type: "Team Sync", attendee: "Platform Team", agenda: ["Backlog grooming", "Sprint goals"] },
  { id: "m3", title: "Demo & Retrospective", date: "Aug 7, 2026", time: "3:30 PM", duration: "1 hr", type: "Review", attendee: "Platform Team", agenda: ["Sprint demo", "Retro"] },
];

export const EVALUATIONS: Evaluation[] = [
  { id: "e1", criteria: "Code Quality", score: 9, maxScore: 10, comments: "Clean, well-structured PRs with thorough test coverage.", reviewer: "Ahmed Raza", date: "Jul 25, 2026" },
  { id: "e2", criteria: "Communication", score: 8, maxScore: 10, comments: "Clear updates in standups; documents decisions well.", reviewer: "Ahmed Raza", date: "Jul 25, 2026" },
  { id: "e3", criteria: "Deliverables", score: 9, maxScore: 10, comments: "Consistently meets sprint commitments ahead of time.", reviewer: "Ahmed Raza", date: "Jul 25, 2026" },
  { id: "e4", criteria: "Initiative", score: 8, maxScore: 10, comments: "Proactively proposes improvements and picks up unowned work.", reviewer: "Ahmed Raza", date: "Jul 25, 2026" },
];

export const INTERN_DOCUMENTS: InternDocument[] = [
  { id: "d1", name: "Offer Letter — Anoneurx", type: "Offer Letter", status: "verified", issuedOn: "Jan 6, 2026", description: "Official internship offer with terms and compensation." },
  { id: "d2", name: "Internship Policy Handbook", type: "Policy", status: "issued", issuedOn: "Jan 6, 2026", description: "Internship policies, code of conduct and expectations." },
  { id: "d3", name: "Mid-Internship Evaluation", type: "Evaluation", status: "verified", issuedOn: "Jul 25, 2026", description: "Mid-point performance evaluation signed by mentor." },
  { id: "d4", name: "Completion Certificate", type: "Completion Certificate", status: "pending", issuedOn: "—", description: "Awarded on successful completion of the internship." },
  { id: "d5", name: "Experience Letter", type: "Experience Letter", status: "pending", issuedOn: "—", description: "Issued at the end of the internship tenure." },
];

/* ------------------------------- Documents ------------------------------ */

export const PROGRAM_DOCUMENTS: ProgramDocument[] = [
  // Internship
  { id: "d1", name: "Offer Letter — Anoneurx", program: "internship", type: "Offer Letter", status: "verified", issuedOn: "Jan 6, 2026", description: "Official internship offer with terms and compensation.", issuer: "Anoneurx People Operations", verificationId: "ANX-DOC-IN-0001", sizeKb: 182 },
  { id: "d2", name: "Internship Policy Handbook", program: "internship", type: "Policy", status: "issued", issuedOn: "Jan 6, 2026", description: "Internship policies, code of conduct and expectations.", issuer: "Anoneurx People Operations", verificationId: "ANX-DOC-IN-0002", sizeKb: 640 },
  { id: "d3", name: "Mid-Internship Evaluation", program: "internship", type: "Evaluation", status: "verified", issuedOn: "Jul 25, 2026", description: "Mid-point performance evaluation signed by mentor.", issuer: "Ahmed Raza — Mentor", verificationId: "ANX-DOC-IN-0003", sizeKb: 96 },
  { id: "d4", name: "Completion Certificate", program: "internship", type: "Completion Certificate", status: "pending", issuedOn: "—", description: "Awarded on successful completion of the internship.", issuer: "Anoneurx Technologies", verificationId: "ANX-DOC-IN-0004" },
  { id: "d5", name: "Experience Letter", program: "internship", type: "Experience Letter", status: "pending", issuedOn: "—", description: "Issued at the end of the internship tenure.", issuer: "Anoneurx Technologies", verificationId: "ANX-DOC-IN-0005" },
  // University
  { id: "u1", name: "Enrollment Letter — Semester 6", program: "university", type: "Enrollment Letter", status: "verified", issuedOn: "Feb 2, 2026", description: "Confirms active enrollment in B.Sc. Computer Science, Semester 6.", issuer: "Anoneurx University Registrar", verificationId: "ANX-DOC-UN-0001", sizeKb: 128 },
  { id: "u2", name: "Official Transcript — Semesters 1–5", program: "university", type: "Transcript", status: "verified", issuedOn: "Feb 10, 2026", description: "Consolidated academic transcript with per-course grades and CGPA.", issuer: "Anoneurx University Registrar", verificationId: "ANX-DOC-UN-0002", sizeKb: 214 },
  { id: "u3", name: "Fee Receipt — Spring 2026", program: "university", type: "Fee Receipt", status: "issued", issuedOn: "Feb 4, 2026", description: "Tuition and lab fee payment receipt for the Spring 2026 term.", issuer: "Anoneurx University Finance", verificationId: "ANX-DOC-UN-0003", sizeKb: 74 },
  { id: "u4", name: "Academic Integrity Policy", program: "university", type: "Policy", status: "issued", issuedOn: "Jan 15, 2026", description: "University policy on plagiarism, assessments and academic conduct.", issuer: "Anoneurx University", verificationId: "ANX-DOC-UN-0004", sizeKb: 512 },
  { id: "u5", name: "Degree Completion Certificate", program: "university", type: "Completion Certificate", status: "pending", issuedOn: "—", description: "Issued after all program credits and requirements are cleared.", issuer: "Anoneurx University Registrar", verificationId: "ANX-DOC-UN-0005" },
  // Hackathon
  { id: "h1d", name: "Participation Certificate — AI Innovation Challenge", program: "hackathon", type: "Participation Certificate", status: "verified", issuedOn: "Jun 22, 2026", description: "Confirms participation in the 2026 AI Innovation Challenge.", issuer: "Anoneurx Hackathon Committee", verificationId: "ANX-DOC-HK-0001", sizeKb: 156 },
  { id: "h2d", name: "Round 1 Submission Receipt — DocuMind", program: "hackathon", type: "Submission Receipt", status: "verified", issuedOn: "Jun 20, 2026", description: "Timestamped receipt for the Round 1 project submission.", issuer: "Anoneurx Hackathon Platform", verificationId: "ANX-DOC-HK-0002", sizeKb: 62 },
  { id: "h3d", name: "Team NEXUS Participation Agreement", program: "hackathon", type: "Agreement", status: "issued", issuedOn: "May 25, 2026", description: "Team agreement covering IP, conduct and judging terms.", issuer: "Anoneurx Hackathon Committee", verificationId: "ANX-DOC-HK-0003", sizeKb: 240 },
  { id: "h4d", name: "Winner Certificate — 1st Place", program: "hackathon", type: "Winner Certificate", status: "pending", issuedOn: "—", description: "Awarded after final judging results are ratified.", issuer: "Anoneurx Hackathon Committee", verificationId: "ANX-DOC-HK-0004" },
  { id: "h5d", name: "Judging Feedback Summary", program: "hackathon", type: "Evaluation", status: "issued", issuedOn: "Jun 28, 2026", description: "Consolidated judge scores and qualitative feedback per round.", issuer: "Judging Panel", verificationId: "ANX-DOC-HK-0005", sizeKb: 88 },
];

/* ------------------------------- Hackathon ------------------------------ */

export const HACKATHON: HackathonMeta = {
  name: "AI Innovation Challenge",
  edition: "2026",
  theme: "Intelligent Applications",
  status: "in-progress",
  startDate: "May 25, 2026",
  endDate: "Aug 20, 2026",
  prizePool: "$50,000",
  host: "Anoneurx",
  track: "Applied AI",
  description: "Build an intelligent application that demonstrates real-world impact. Teams advance through two judged rounds with live demos and investor pitching.",
};

export const HACKATHON_TEAM: TeamMember[] = [
  { id: "tm1", name: "Muhammad Qasim", role: "Team Lead · Full-Stack", skills: ["React", "Node.js", "TypeScript"], isYou: true },
  { id: "tm2", name: "Ayesha Khan", role: "ML Engineer", skills: ["Python", "PyTorch", "NLP"] },
  { id: "tm3", name: "Omar Farooq", role: "Product Designer", skills: ["Figma", "UI/UX", "Prototyping"] },
  { id: "tm4", name: "Fatima Noor", role: "Backend Engineer", skills: ["FastAPI", "PostgreSQL", "Docker"] },
];

export const TEAM_INVITES: TeamInvite[] = [
  { id: "ti1", name: "Hassan Ali", email: "hassan.ali@mail.com", status: "accepted", invitedOn: "May 28, 2026" },
  { id: "ti2", name: "Sara Malik", email: "sara.malik@mail.com", status: "pending", invitedOn: "Jul 30, 2026" },
  { id: "ti3", name: "Bilal Ahmed", email: "bilal.ahmed@mail.com", status: "declined", invitedOn: "Jun 2, 2026" },
];

export const HACKATHON_SUBMISSIONS: Submission[] = [
  { id: "h1", round: "Round 1", title: "DocuMind — AI Document Intelligence", description: "Extracts, summarizes and answers questions from complex PDFs using retrieval-augmented generation.", repo: "github.com/teamnexus/documind", demo: "documind.demo.app", submittedOn: "Jun 20, 2026", status: "reviewed", score: 94 },
  { id: "h2", round: "Round 2", title: "DocuMind — Production Build", description: "Scaled to handle concurrent users with streaming responses, audit logs and enterprise auth.", repo: "github.com/teamnexus/documind-prod", demo: "documind.app", submittedOn: "Aug 12, 2026", status: "submitted" },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { id: "lb1", team: "Team NEXUS", project: "DocuMind", score: 94, rounds: [88, 94], isYou: true },
  { id: "lb2", team: "Neural Knights", project: "MediScan AI", score: 91, rounds: [85, 91] },
  { id: "lb3", team: "Byte Bandits", project: "CodeSense", score: 88, rounds: [90, 88] },
  { id: "lb4", team: "Quantum Quokkas", project: "FinTalk", score: 84, rounds: [82, 84] },
  { id: "lb5", team: "Tensor Turtles", project: "CropVision", score: 79, rounds: [76, 79] },
  { id: "lb6", team: "Data Drakes", project: "LogIQ", score: 74, rounds: [71, 74] },
];

export const JUDGING_RESULTS: JudgingResult[] = [
  { id: "j1", criterion: "Innovation", score: 46, maxScore: 50, judge: "Dr. Adnan Malik", feedback: "Novel retrieval-augmented generation pipeline with a clean product story." },
  { id: "j2", criterion: "Technical Execution", score: 42, maxScore: 50, judge: "Engineer Lead Board", feedback: "Robust architecture, streaming responses, and strong testing discipline." },
  { id: "j3", criterion: "Product & Impact", score: 44, maxScore: 50, judge: "Product Council", feedback: "Clear real-world pain point with a polished, demo-ready interface." },
  { id: "j4", criterion: "Presentation", score: 39, maxScore: 50, judge: "Judging Panel", feedback: "Compelling pitch; data on user validation would strengthen it further." },
];

export const HACKATHON_FEEDBACK: HackathonFeedback[] = [
  { id: "hf1", from: "Dr. Adnan Malik", role: "Judge", message: "Exceptional clarity of execution. DocuMind feels like a startup-ready product, not just a hackathon project.", date: "Jun 22, 2026", rating: 5 },
  { id: "hf2", from: "Ayesha Khan", role: "Teammate", message: "Great leadership — clear ownership, quick decisions, and everyone always knew what to build next.", date: "Jul 1, 2026", rating: 5 },
];

/* -------------------------------- Shared -------------------------------- */

export const SHARED_PROJECTS: SharedProject[] = [
  { id: "sp1", name: "Unified Participant Portal", description: "The single dashboard unifying University, Internship and Hackathon systems.", module: "internship", status: "in-progress", progress: 72, repo: "github.com/anoneurx/portal", tags: ["React", "TypeScript", "Node.js"], updatedAt: "2 days ago", tasks: { done: 18, total: 25 } },
  { id: "sp2", name: "DocuMind", description: "AI document intelligence platform built for the hackathon competition.", module: "hackathon", status: "review", progress: 88, repo: "github.com/teamnexus/documind", tags: ["LLM", "FastAPI", "React"], updatedAt: "4 days ago", tasks: { done: 22, total: 26 } },
  { id: "sp3", name: "Final Year Project — SmartCampus", description: "University capstone: IoT-powered campus energy optimization.", module: "university", status: "planning", progress: 15, repo: "github.com/muhammadqasim/smartcampus", tags: ["IoT", "Python", "React"], updatedAt: "1 week ago", tasks: { done: 4, total: 30 } },
  { id: "sp4", name: "Intern Task Orchestrator", description: "Kanban tool for the internship program's weekly deliverables.", module: "general", status: "completed", progress: 100, repo: "github.com/anoneurx/tasks", tags: ["React", "PostgreSQL"], updatedAt: "3 weeks ago", tasks: { done: 16, total: 16 } },
];

export const CERTIFICATES: Certificate[] = [
  { id: "ce1", title: "B.Sc. Computer Science — 3rd Year", module: "university", issuer: "Tech University", issuedOn: "Jun 2025", credentialId: "TU-2025-CS-1147", status: "verified", description: "Academic standing certificate confirming 3rd year completion with honors." },
  { id: "ce2", title: "Full-Stack Web Development", module: "university", issuer: "Anoneurx Academy", issuedOn: "Apr 2025", credentialId: "AX-AC-2025-4421", status: "verified", description: "Professional certification covering modern full-stack engineering." },
  { id: "ce3", title: "Internship Mid-Point Achievement", module: "internship", issuer: "Anoneurx", issuedOn: "Jul 2026", credentialId: "AX-IN-2026-0912", status: "verified", description: "Recognizes outstanding delivery during the first half of the internship." },
  { id: "ce4", title: "AI Innovation Challenge — Champion", module: "hackathon", issuer: "Anoneurx", issuedOn: "Aug 2026", credentialId: "AX-HK-2026-0007", status: "pending", description: "1st place certificate for the winning team at the 2026 challenge." },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "ev1", title: "Advanced Web Engineering", date: "2026-08-03", time: "09:00", type: "class", module: "university", location: "Hall 4-A" },
  { id: "ev2", title: "Weekly 1:1 with Mentor", date: "2026-08-03", time: "14:00", type: "meeting", module: "internship", location: "Google Meet" },
  { id: "ev3", title: "Machine Learning Lab", date: "2026-08-04", time: "10:00", type: "class", module: "university", location: "Lab 3" },
  { id: "ev4", title: "Sprint Planning", date: "2026-08-05", time: "10:00", type: "meeting", module: "internship" },
  { id: "ev5", title: "Submit Collaborative Editor", date: "2026-08-05", time: "23:59", type: "assignment", module: "university" },
  { id: "ev6", title: "Hackathon Round 2 Demo", date: "2026-08-12", time: "15:00", type: "submission", module: "hackathon" },
  { id: "ev7", title: "Mid-Semester Exams", date: "2026-08-15", time: "09:00", type: "event", module: "university" },
  { id: "ev8", title: "Demo & Retrospective", date: "2026-08-07", time: "15:30", type: "meeting", module: "internship" },
];

export const PORTAL_NOTIFICATIONS: NotificationItem[] = [
  { id: "nt1", type: "success", title: "Assignment graded", message: "GraphQL API Implementation scored 92/100.", time: "2h ago", read: false, module: "university" },
  { id: "nt2", type: "info", title: "Mentor meeting scheduled", message: "Weekly 1:1 with Ahmed Raza on Monday at 2:00 PM.", time: "3h ago", read: false, module: "internship" },
  { id: "nt3", type: "warning", title: "Hackathon deadline approaching", message: "Round 2 submission is due in 10 days.", time: "1d ago", read: false, module: "hackathon" },
  { id: "nt4", type: "info", title: "New team invite", message: "Sara Malik is pending your hackathon team invite.", time: "1d ago", read: true, module: "hackathon" },
  { id: "nt5", type: "success", title: "Certificate verified", message: "Your internship achievement certificate is now verified.", time: "3d ago", read: true, module: "internship" },
  { id: "nt6", type: "alert", title: "Mid-semester exams announced", message: "Exam timetable is live on the student portal.", time: "4d ago", read: true, module: "university" },
];

export const PORTAL_MESSAGES: ChatMessage[] = [
  { id: "msg1", sender: "Ahmed Raza", senderInitials: "AR", text: "Great progress on the portal navigation. Can you push the latest branch for review?", time: "10:24", read: true, mine: false },
  { id: "msg2", sender: "Muhammad Qasim", senderInitials: "MQ", text: "Sure! The config-driven sidebar is ready — pushing `feature/portal-nav` now.", time: "10:26", read: true, mine: true },
  { id: "msg3", sender: "Ayesha Khan", senderInitials: "AK", text: "The RAG pipeline hit 94 on the eval set. Demo is looking strong!", time: "11:02", read: true, mine: false },
  { id: "msg4", sender: "Muhammad Qasim", senderInitials: "MQ", text: "Amazing — let's lock the Round 2 submission scope in tomorrow's sync.", time: "11:05", read: true, mine: true },
  { id: "msg5", sender: "Prof. Sarah Smith", senderInitials: "SS", text: "Reminder: collaborative editor milestone review on Friday.", time: "Yesterday", read: false, mine: false },
];

export const PORTAL_ACTIVITY: ActivityItem[] = [
  { id: "act1", title: "Assignment graded", detail: "GraphQL API Implementation · 92/100", time: "2h ago", type: "grade", module: "university" },
  { id: "act2", title: "Kanban task completed", detail: "Kanban task board · Internship", time: "5h ago", type: "task", module: "internship" },
  { id: "act3", title: "Achievement unlocked", detail: "Star Intern badge earned", time: "1d ago", type: "achievement", module: "internship" },
  { id: "act4", title: "Hackathon round reviewed", detail: "Round 1 · scored 94/100", time: "2d ago", type: "submission", module: "hackathon" },
  { id: "act5", title: "Certificate issued", detail: "Internship Mid-Point Achievement", time: "3d ago", type: "certificate", module: "internship" },
  { id: "act6", title: "Evaluation published", detail: "Mid-internship evaluation by Ahmed Raza", time: "4d ago", type: "evaluation", module: "internship" },
];
