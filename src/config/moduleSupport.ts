import { Users, Github, ShieldAlert, CreditCard, Server, GraduationCap, LifeBuoy, type LucideIcon } from "lucide-react";
import type { ModuleContactChannel } from "@/components/site/ModuleContactSection";

export interface ModuleSupportConfig {
  slug: string;
  module: string;
  eyebrow: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  email: string;
  responseTime: string;
  escalation?: string;
  channels: ModuleContactChannel[];
  links: { label: string; to: string }[];
  topics: { title: string; body: string }[];
  breadcrumb: { name: string; to?: string }[];
}

const support = (title: string, body: string) => ({ title, body });

export const MODULE_SUPPORT: Record<string, ModuleSupportConfig> = {
  "opensource-contact": {
    slug: "/opensource/contact",
    module: "Anoneurx Open Source",
    eyebrow: "Open Source",
    title: "Contact Anoneurx Open Source",
    intro:
      "Maintainers, security disclosure, sponsorship and community — reach the people who maintain every Anoneurx repository.",
    icon: Github,
    email: "opensource@anoneurx.com",
    responseTime: "Within 2 business days",
    escalation: "security@anoneurx.com for vulnerabilities (48h acknowledgement)",
    channels: [
      { icon: Users, label: "Community", value: "Discussions & forums", note: "Public questions get answers fastest here." },
      { icon: ShieldAlert, label: "Security", value: "security@anoneurx.com", href: "mailto:security@anoneurx.com" },
    ],
    links: [
      { label: "Contribute", to: "/opensource/contribute" },
      { label: "Support", to: "/opensource/support" },
      { label: "Projects", to: "/opensource/projects" },
    ],
    topics: [
      support("Maintainer requests", "Ask for a repository transfer, a new maintainer seat or triage help."),
      support("Sponsorship", "Sponsor a project, fund a milestone or arrange corporate backing."),
      support("Licensing", "Questions about licence compatibility and commercial use."),
    ],
    breadcrumb: [{ name: "Open Source", to: "/opensource" }, { name: "Contact" }],
  },
  "opensource-support": {
    slug: "/opensource/support",
    module: "Anoneurx Open Source",
    eyebrow: "Open Source",
    title: "Anoneurx Open Source Support",
    intro:
      "Build failures, package installs, contribution reviews, licensing and security reports — all handled by the maintainer team.",
    icon: LifeBuoy,
    email: "opensource@anoneurx.com",
    responseTime: "Within 2 business days",
    escalation: "security@anoneurx.com for vulnerabilities",
    channels: [
      { icon: Github, label: "Issue tracker", value: "Open an issue on the repository", note: "Best for reproducible bugs." },
      { icon: Users, label: "Review queue", value: "Track your pull request", note: "See the review progress page." },
    ],
    links: [
      { label: "How to contribute", to: "/opensource/contribute" },
      { label: "Review progress", to: "/opensource/contributions/review-progress" },
      { label: "Security policy", to: "/opensource/contributions/security" },
    ],
    topics: [
      support("Builds & installs", "Failing builds, package resolution and toolchain versions."),
      support("Contribution reviews", "Where your PR sits in the queue and what unblocks it."),
      support("Security reports", "Coordinated disclosure with a 48h acknowledgement target."),
    ],
    breadcrumb: [{ name: "Open Source", to: "/opensource" }, { name: "Support" }],
  },
  "university-contact": {
    slug: "/university/contact",
    module: "Anoneurx University",
    eyebrow: "University",
    title: "Contact Anoneurx University",
    intro: "Admissions, faculty, registrar and student services — one place to reach the university.",
    icon: GraduationCap,
    email: "university@anoneurx.com",
    responseTime: "Within 1 business day",
    escalation: "registrar@anoneurx.com for records and transcripts",
    channels: [
      { icon: Users, label: "Admissions", value: "admissions@anoneurx.com", href: "mailto:admissions@anoneurx.com" },
      { icon: GraduationCap, label: "Faculty", value: "Browse the faculty directory", note: "Email addresses are on each profile." },
    ],
    links: [
      { label: "University", to: "/university" },
      { label: "Faculty", to: "/faculty" },
      { label: "Courses", to: "/courses" },
      { label: "Support", to: "/university/support" },
    ],
    topics: [
      support("Admissions", "Intakes, requirements, scholarships and application status."),
      support("Academic records", "Transcripts, certificates and verification letters."),
      support("Faculty & research", "Reach a department head or a research group."),
    ],
    breadcrumb: [{ name: "University", to: "/university" }, { name: "Contact" }],
  },
  "university-support": {
    slug: "/university/support",
    module: "Anoneurx University",
    eyebrow: "University",
    title: "Anoneurx University Support",
    intro: "Enrolment, courses, certificates, billing and student accounts — student services in one place.",
    icon: LifeBuoy,
    email: "students@anoneurx.com",
    responseTime: "Within 1 business day",
    escalation: "university@anoneurx.com for unresolved cases",
    channels: [
      { icon: CreditCard, label: "Billing", value: "billing@anoneurx.com", href: "mailto:billing@anoneurx.com" },
      { icon: GraduationCap, label: "Certificates", value: "Verify or reissue a certificate" },
    ],
    links: [
      { label: "Courses", to: "/courses" },
      { label: "Verify an intern", to: "/intern/verify" },
      { label: "Contact", to: "/university/contact" },
    ],
    topics: [
      support("Enrolment", "Course changes, deferrals and withdrawal requests."),
      support("Accounts", "Sign-in issues, email changes and access to course material."),
      support("Billing", "Invoices, refunds and scholarship adjustments."),
    ],
    breadcrumb: [{ name: "University", to: "/university" }, { name: "Support" }],
  },
  "blackwall-contact": {
    slug: "/blackwall/contact",
    module: "Black Wall OS",
    eyebrow: "Black Wall",
    title: "Contact Black Wall OS",
    intro: "Engineering, security disclosure, OEM partnerships and press — reach the Black Wall team.",
    icon: ShieldAlert,
    email: "blackwall@anoneurx.com",
    responseTime: "Within 1 business day",
    escalation: "security@anoneurx.com for kernel and security issues",
    channels: [
      { icon: Server, label: "OEM & hardware", value: "oem@anoneurx.com", href: "mailto:oem@anoneurx.com" },
      { icon: LifeBuoy, label: "Support", value: "Black Wall support centre" },
    ],
    links: [
      { label: "Black Wall", to: "/blackwall" },
      { label: "Support", to: "/blackwall/support" },
      { label: "Docs", to: "/blackwall/docs" },
    ],
    topics: [
      support("Deployment", "Installation, imaging and fleet rollout questions."),
      support("Security", "Coordinated disclosure for kernel and userland issues."),
      support("Partnerships", "OEM pre-installs, certification and press enquiries."),
    ],
    breadcrumb: [{ name: "Black Wall", to: "/blackwall" }, { name: "Contact" }],
  },
  "pay-contact": {
    slug: "/pay/contact",
    module: "Anoneurx Pay",
    eyebrow: "Pay",
    title: "Contact Anoneurx Pay",
    intro: "Accounts, disputes, business banking and compliance — talk to the Anoneurx Pay team.",
    icon: CreditCard,
    email: "pay@anoneurx.com",
    responseTime: "Within 4 hours, 7 days a week",
    escalation: "compliance@anoneurx.com for regulatory and KYC matters",
    channels: [
      { icon: ShieldAlert, label: "Fraud", value: "fraud@anoneurx.com", href: "mailto:fraud@anoneurx.com", note: "Report unauthorised activity immediately." },
      { icon: Users, label: "Business", value: "business@anoneurx.com", href: "mailto:business@anoneurx.com" },
    ],
    links: [
      { label: "Anoneurx Pay", to: "/pay" },
      { label: "Support", to: "/pay/support" },
      { label: "Security", to: "/pay/security" },
    ],
    topics: [
      support("Accounts", "Opening, verification, limits and closures."),
      support("Disputes", "Chargebacks, failed transfers and refunds."),
      support("Compliance", "KYC, AML documentation and regulatory requests."),
    ],
    breadcrumb: [{ name: "Pay", to: "/pay" }, { name: "Contact" }],
  },
  "pay-support": {
    slug: "/pay/support",
    module: "Anoneurx Pay",
    eyebrow: "Pay",
    title: "Anoneurx Pay Support",
    intro: "Cards, transfers, disputes, verification and business accounts — support that runs every day.",
    icon: LifeBuoy,
    email: "pay@anoneurx.com",
    responseTime: "Within 4 hours, 7 days a week",
    escalation: "fraud@anoneurx.com for unauthorised activity",
    channels: [
      { icon: CreditCard, label: "Cards", value: "Freeze, replace or raise a limit" },
      { icon: Server, label: "Status", value: "Live payment network status" },
    ],
    links: [
      { label: "Checkout", to: "/checkout" },
      { label: "Contact", to: "/pay/contact" },
      { label: "Security", to: "/pay/security" },
    ],
    topics: [
      support("Cards & transfers", "Declines, pending transfers and limits."),
      support("Verification", "Identity checks and document re-uploads."),
      support("Business accounts", "Multi-user access, roles and payouts."),
    ],
    breadcrumb: [{ name: "Pay", to: "/pay" }, { name: "Support" }],
  },
  "cloud-contact": {
    slug: "/cloud/contact",
    module: "Anoneurx Cloud",
    eyebrow: "Cloud",
    title: "Contact Anoneurx Cloud",
    intro: "Sales, architecture reviews, billing and enterprise support for Anoneurx Cloud.",
    icon: Server,
    email: "cloud@anoneurx.com",
    responseTime: "Within 2 hours for enterprise plans",
    escalation: "oncall@anoneurx.com for production incidents",
    channels: [
      { icon: Users, label: "Sales", value: "sales@anoneurx.com", href: "mailto:sales@anoneurx.com" },
      { icon: CreditCard, label: "Billing", value: "billing@anoneurx.com", href: "mailto:billing@anoneurx.com" },
    ],
    links: [
      { label: "Cloud", to: "/cloud" },
      { label: "Pricing", to: "/cloud/pricing" },
      { label: "Docs", to: "/cloud/docs" },
      { label: "Console", to: "/cloud/connect" },
    ],
    topics: [
      support("Architecture", "Sizing, regions, networking and migration planning."),
      support("Incidents", "Production escalation with a 15-minute page target."),
      support("Billing", "Commitments, invoices and credits."),
    ],
    breadcrumb: [{ name: "Cloud", to: "/cloud" }, { name: "Contact" }],
  },
};
