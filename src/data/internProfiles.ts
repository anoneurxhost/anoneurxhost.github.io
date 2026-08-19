import inshaPhoto from "../assets/interns/insha.jpeg";

export type InternStatus = "Active" | "Completed" | "Alumni";
export type BadgeKind =
  | "Open Source Contributor"
  | "Research Assistant"
  | "Community Mentor"
  | "Outstanding Intern"
  | "Collaboration Award";

export interface InternshipHistoryItem {
  role: string;
  department: string;
  duration: string;
  mentor: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
}

export interface ContributionTimelineItem {
  date: string;
  org: string;
  pr: string;
  title: string;
  url?: string;
}

export interface InternProfile {
  /** Public intern ID used in URLs, e.g. "anx-se-44" (displayed as ANX-SE-44). */
  internId: string;
  name: string;
  department: string;   // e.g. "AI", "Robotics", "Cyber Security"
  batch: string;        // e.g. "2024 Spring"
  status: InternStatus;
  photo: string;
  bio: string;
  university?: string;
  email?: string;
  github?: string;
  location?: string;

  history: InternshipHistoryItem[];
  openSource: {
    status: "Active" | "Occasional" | "Alumni";
    collaborations: string[];
    pullRequests: number;
    organizations: string[];
    timeline: ContributionTimelineItem[];
  };
  certifications: CertificationItem[];
  badges: BadgeKind[];
}

export const internProfiles: InternProfile[] = [
  {
    internId: "ANX26INTSE044",
    name: "Insha",

    department: "Software Engineering",
    batch: "2026 Summer",
    status: "Completed",
    photo: inshaPhoto,
    bio: "Software Engineering student passionate about building modern web applications, creating responsive user interfaces, and continuously learning new technologies through personal and academic projects.",
    university: "Lahore College For Women University Lahore",
    email: "inshaits@gmail.com",
    github: "https://github.com/inshaits-hub",
    location: "Lahore, Pakistan",
    history: [
      {
        role: "Frontend Developer",
        department: "Web Development",
        duration: "15 Jun 2026 - 15 Aug 2026",
        mentor: "Self Learning",
      },
    ],
    openSource: {
      status: "Occasional",
      collaborations: ["Personal Projects", "GitHub Portfolio"],
      pullRequests: 0,
      organizations: [],
      timeline: [
        {
          date: "2026-06-15",
          org: "Personal Portfolio",
          pr: "-",
          title: "Published developer portfolio website",
        },
        {
          date: "2026-07-15",
          org: "GitHub",
          pr: "-",
          title: "Released multiple frontend projects",
        },
      ],
    },
    certifications: [
      { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "2026" },
      { title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", date: "2026" },
    ],
    badges: ["Collaboration Award"],
  },
];
