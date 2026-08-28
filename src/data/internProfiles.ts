import inshaPhoto from "../assets/interns/insha.jpeg";

export type InternStatus = "Active" | "Completed" | "Alumni";
export type BadgeKind =
  | "Open Source Contributor"
  | "Research Assistant"
  | "Community Mentor"
  | "Outstanding Intern"
  | "Collaboration Award"
  | (string & {});

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
        duration: "06 JUL 2026 - 28 AUG 2026",
        mentor: "Self Learning",
      },
    ],
    openSource: {
      status: "Occasional",
      collaborations: ["Personal Projects", "GitHub Portfolio"],
      pullRequests: 0,
      organizations: ["Anoneurx"],
      timeline: [
        {
          date: "2026-08-28",
          org: "Anoneurx",
          pr: "-",
          title: "Internship Completed",
        },
        {
          date: "2026-08-03",
          org: "Anoneurx",
          pr: "-",
          title: "Anoneurx Authenticator",
        },
        {
          date: "2026-07-17",
          org: "GitHub",
          pr: "-",
          title: "Released multiple frontend projects",
        },
        {
          date: "2026-07-06",
          org: "Anoneurx",
          pr: "-",
          title: "Joined Anoneurx as React Web Developer Intern",
        },
      ],
    },
    certifications: [
      { title: "Internship Certificate", issuer: "CEO", date: "2026-08-28" },
    ],
    badges: ["Outstanding Intern", "Frontend Developer"],
  },
];
