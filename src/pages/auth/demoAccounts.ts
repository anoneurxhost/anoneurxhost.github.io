import type { ProgramId } from "../portal/types";
import type { PayAccountType } from "../payment/payAccounts";

export interface DemoAccount {
  email: string;
  password: string;
  label: string;
  description: string;
  name: string;
  initials: string;
  roles: string[];
  memberships: ProgramId[];
  anxId: string;
  programIds: Partial<Record<ProgramId, string>>;
  /** Participants land in the portal; staff accounts land in role dashboards. */
  group: "participant" | "staff";
  /** Pay accounts land in the permission-gated Anoneurx Pay dashboard. */
  payType?: PayAccountType;
}

/**
 * Demo accounts. Participants are enrolled in a single program, each with its
 * own ANONEURX account id (ANX26…) and per-program participant id. Staff and
 * leadership accounts cover the remaining roles (faculty, HR, HOD, CEO,
 * employee) and share the organization-wide document set.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: "student@anoneurx.com",
    password: "student@123",
    label: "University Student",
    description: "Enrolled in the University program",
    name: "Areeba Fatima",
    initials: "AF",
    roles: ["student", "participant"],
    memberships: ["university"],
    anxId: "ANX26STU00015",
    programIds: {
      university: "ANX26STU00015",
    },
    group: "participant",
  },
  {
    email: "internship@anoneurx.com",
    password: "internship@123",
    label: "Intern",
    description: "Enrolled in the Internship program",
    name: "Hassan Ali",
    initials: "HA",
    roles: ["intern", "participant"],
    memberships: ["internship"],
    anxId: "ANX26INT00008",
    programIds: {
      internship: "ANX26INT00008",
    },
    group: "participant",
  },
  {
    email: "insha@anoneurx.com",
    password: "insha@123",
    label: "Intern · Insha",
    description: "Software Engineering intern — full document set issued",
    name: "Insha",
    initials: "IN",
    roles: ["intern", "participant"],
    memberships: ["internship"],
    anxId: "ANX26INT00044",
    programIds: {
      internship: "ANX26INT00044",
    },
    group: "participant",
  },
  {
    email: "hackathon@anoneurx.com",
    password: "hackathon@123",
    label: "Hackathon Participant",
    description: "Enrolled in the Hackathon program",
    name: "Zainab Tariq",
    initials: "ZT",
    roles: ["hackathon", "participant"],
    memberships: ["hackathon"],
    anxId: "ANX26HAK00003",
    programIds: {
      hackathon: "ANX26HAK00003",
    },
    group: "participant",
  },
  {
    email: "faculty@anoneurx.com",
    password: "faculty@123",
    label: "Faculty",
    description: "Anoneurx University faculty member",
    name: "Dr. Adnan Malik",
    initials: "AM",
    roles: ["faculty", "employee"],
    memberships: [],
    anxId: "ANX26FAC00004",
    programIds: {},
    group: "staff",
  },
  {
    email: "hr@anoneurx.com",
    password: "hr@123",
    label: "HR Manager",
    description: "People Operations — hiring, payroll and leave",
    name: "Sana Iqbal",
    initials: "SI",
    roles: ["hr"],
    memberships: [],
    anxId: "ANX26HRM00002",
    programIds: {},
    group: "staff",
  },
  {
    email: "hod@anoneurx.com",
    password: "hod@123",
    label: "Head of Department",
    description: "Department staff, interns and budget",
    name: "Ahmed Raza",
    initials: "AR",
    roles: ["hod"],
    memberships: [],
    anxId: "ANX26HOD00003",
    programIds: {},
    group: "staff",
  },
  {
    email: "ceo@anoneurx.com",
    password: "ceo@123",
    label: "Founder & CEO",
    description: "Full organization overview and controls",
    name: "Muhammad Qasim",
    initials: "MQ",
    roles: ["ceo"],
    memberships: [],
    anxId: "ANX26CEO00001",
    programIds: {},
    group: "staff",
  },
  {
    email: "employee@anoneurx.com",
    password: "employee@123",
    label: "Employee",
    description: "Tasks, documents, leave and support",
    name: "Bilal Ahmed",
    initials: "BA",
    roles: ["employee"],
    memberships: [],
    anxId: "ANX26EMP00021",
    programIds: {},
    group: "staff",
  },
  {
    email: "finance@anoneurx.com",
    password: "finance@123",
    label: "Finance Manager",
    description: "Budgets, transactions and financial reports",
    name: "Amina Khan",
    initials: "AK",
    roles: ["finance-manager"],
    memberships: [],
    anxId: "ANX26FIN00001",
    programIds: {},
    group: "staff",
  },
  {
    email: "content@anoneurx.com",
    password: "content@123",
    label: "Content Manager",
    description: "Media, pages, projects and portfolio management",
    name: "Omar Farooq",
    initials: "OF",
    roles: ["content-manager"],
    memberships: [],
    anxId: "ANX26CNT00001",
    programIds: {},
    group: "staff",
  },
  {
    email: "pay-individual@anoneurx.com",
    password: "pay@123",
    label: "Pay · Individual",
    description: "Anoneurx Pay personal account",
    name: "Sara Ahmed",
    initials: "SA",
    roles: ["pay", "individual"],
    memberships: [],
    anxId: "ANX26PYI00001",
    programIds: {},
    group: "staff",
    payType: "individual",
  },
  {
    email: "pay-student@anoneurx.com",
    password: "pay@123",
    label: "Pay · Student",
    description: "Anoneurx Pay student account",
    name: "Bilal Hussain",
    initials: "BH",
    roles: ["pay", "student"],
    memberships: [],
    anxId: "ANX26PYS00001",
    programIds: {},
    group: "staff",
    payType: "student",
  },
  {
    email: "pay-business@anoneurx.com",
    password: "pay@123",
    label: "Pay · Business",
    description: "Anoneurx Pay business account",
    name: "Nadia Iqbal",
    initials: "NI",
    roles: ["pay", "business"],
    memberships: [],
    anxId: "ANX26PYB00001",
    programIds: {},
    group: "staff",
    payType: "business",
  },
  {
    email: "pay-corporate@anoneurx.com",
    password: "pay@123",
    label: "Pay · Corporate",
    description: "Anoneurx Pay corporate account",
    name: "Fahad Qureshi",
    initials: "FQ",
    roles: ["pay", "corporate"],
    memberships: [],
    anxId: "ANX26PYC00001",
    programIds: {},
    group: "staff",
    payType: "corporate",
  },
];

export const PARTICIPANT_DEMO_ACCOUNTS = DEMO_ACCOUNTS.filter((a) => a.group === "participant");
export const STAFF_DEMO_ACCOUNTS = DEMO_ACCOUNTS.filter((a) => a.group === "staff");
export const PAY_DEMO_ACCOUNTS = DEMO_ACCOUNTS.filter((a) => a.payType);

export const DEMO_EMAIL = DEMO_ACCOUNTS[0].email;
export const DEMO_PASSWORD = DEMO_ACCOUNTS[0].password;
