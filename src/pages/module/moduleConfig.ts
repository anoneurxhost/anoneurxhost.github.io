import type { ContactChannel } from "@/components/module/ModuleContact";
import type { FaqItem } from "@/components/module/ModuleSupport";

/** Per-module contact + support copy. One source of truth for every module page. */
export interface ModuleConfig {
  module: string;
  email: string;
  theme: "dark" | "light";
  contact: {
    path: string;
    title: string;
    description: string;
    intro: string;
    channels: ContactChannel[];
    responseTime?: string;
  };
  support?: {
    path: string;
    title: string;
    description: string;
    intro: string;
    faqs: FaqItem[];
    statusNote?: string;
  };
}

export const universityConfig: ModuleConfig = {
  module: "Anoneurx University",
  email: "university@anoneurx.com",
  theme: "dark",
  contact: {
    path: "/university/contact",
    title: "Contact Anoneurx University",
    description:
      "Reach Anoneurx University — admissions, faculty, registrar and student services at university@anoneurx.com.",
    intro:
      "Admissions, course guidance, transcripts or faculty collaboration — the university team answers every message from a real person.",
    channels: [
      { label: "Admissions", email: "admissions@anoneurx.com", note: "Applications, eligibility and intake dates." },
      { label: "Registrar", email: "registrar@anoneurx.com", note: "Transcripts, certificates and enrolment records." },
      { label: "Faculty office", email: "faculty@anoneurx.com", note: "Teaching, research supervision and guest lectures." },
      { label: "Student services", email: "university@anoneurx.com", note: "Course access, schedules and wellbeing." },
    ],
  },
  support: {
    path: "/university/support",
    title: "Anoneurx University Support",
    description:
      "Help with enrolment, courses, certificates, billing and student accounts at Anoneurx University.",
    intro:
      "Answers for students and faculty — enrolment, course access, certificates and billing.",
    faqs: [
      { q: "How do I enrol in a course?", a: "Open the course page, choose your cohort and complete the enrolment form. You receive access within minutes of confirmation.", category: "Accounts" },
      { q: "Where do I find my certificate?", a: "Certificates appear in your student dashboard once the final assessment is graded. They carry a verifiable ID.", category: "Accounts" },
      { q: "Can I get an invoice for my employer?", a: "Yes. Request one from the billing section of your dashboard or email university@anoneurx.com with your enrolment ID.", category: "Billing" },
      { q: "What is the refund window?", a: "Full refunds are available within 14 days of enrolment, provided less than 20% of the course has been completed.", category: "Billing" },
      { q: "Video lectures will not load.", a: "Clear the site cache and retry on a modern browser. If it persists, send us your course ID and browser version.", category: "Technical" },
      { q: "How is student data handled?", a: "Academic records are encrypted at rest, access is role-scoped and we never sell student data.", category: "Security" },
    ],
  },
};

export const opensourceConfig: ModuleConfig = {
  module: "Anoneurx Open Source",
  email: "opensource@anoneurx.com",
  theme: "dark",
  contact: {
    path: "/opensource/contact",
    title: "Contact Anoneurx Open Source",
    description:
      "Reach the Anoneurx Open Source program — maintainers, security disclosure, sponsorship and community at opensource@anoneurx.com.",
    intro:
      "Maintainers, sponsors and first-time contributors all start here. Security reports are triaged first.",
    channels: [
      { label: "Maintainers", email: "opensource@anoneurx.com", note: "Project questions, RFCs and governance." },
      { label: "Security disclosure", email: "security@anoneurx.com", note: "Coordinated disclosure, 90-day window." },
      { label: "Sponsorship", email: "sponsors@anoneurx.com", note: "Fund a project or a maintainer." },
      { label: "Community", email: "community@anoneurx.com", note: "Events, talks and contributor programs." },
    ],
    responseTime: "Within 2 business days · security within 24 hours",
  },
  support: {
    path: "/opensource/support",
    title: "Anoneurx Open Source Support",
    description:
      "Help with Anoneurx open source projects — builds, packages, contributions, licensing and security reports.",
    intro:
      "Build failures, package installs, licensing questions and contribution workflow — in one place.",
    faqs: [
      { q: "A build fails after upgrading.", a: "Check the release notes for breaking changes, then open an issue with your lockfile and the full build log.", category: "Technical" },
      { q: "Which package registry should I use?", a: "All published packages are on the public registry under the @anoneurx scope. Nightly builds live on the canary channel.", category: "Technical" },
      { q: "How do I get my pull request reviewed?", a: "Link an issue, keep the change focused and tick the checklist. A maintainer picks it up within two business days.", category: "Accounts" },
      { q: "What licence applies?", a: "Most projects are Apache-2.0; a few tooling repos are MIT. The LICENSE file in each repository is authoritative.", category: "Security" },
      { q: "How do I report a vulnerability?", a: "Email security@anoneurx.com with reproduction steps. Do not open a public issue. We acknowledge within 24 hours.", category: "Security" },
      { q: "Can my company sponsor a project?", a: "Yes — sponsorship tiers cover maintenance, roadmap input and support windows. Write to sponsors@anoneurx.com.", category: "Billing" },
    ],
  },
};

export const blackwallConfig: ModuleConfig = {
  module: "Blackwall OS",
  email: "blackwall@anoneurx.com",
  theme: "dark",
  contact: {
    path: "/blackwall/contact",
    title: "Contact Blackwall OS",
    description:
      "Reach the Blackwall OS team — engineering, security disclosure, OEM and press at blackwall@anoneurx.com.",
    intro:
      "Hardware enablement, deployment questions, OEM programs and security reports for Blackwall OS.",
    channels: [
      { label: "Engineering", email: "blackwall@anoneurx.com", note: "Kernel, drivers and hardware enablement." },
      { label: "Security disclosure", email: "security@anoneurx.com", note: "Signed reports, 24-hour acknowledgement." },
      { label: "OEM & partners", email: "oem@anoneurx.com", note: "Preinstall, certification and volume licensing." },
      { label: "Press", email: "press@anoneurx.com", note: "Briefings, review units and assets." },
    ],
  },
};

export const payConfig: ModuleConfig = {
  module: "Anoneurx Pay",
  email: "pay@anoneurx.com",
  theme: "dark",
  contact: {
    path: "/pay/contact",
    title: "Contact Anoneurx Pay",
    description:
      "Reach Anoneurx Pay — accounts, disputes, business banking and compliance at pay@anoneurx.com.",
    intro:
      "Account help, disputes, business onboarding and compliance requests. Never share full card numbers or passwords by email.",
    channels: [
      { label: "Account support", email: "pay@anoneurx.com", note: "Cards, transfers and verification." },
      { label: "Disputes", email: "disputes@anoneurx.com", note: "Chargebacks and unauthorised transactions." },
      { label: "Business banking", email: "business@anoneurx.com", note: "Company accounts, payroll and payouts." },
      { label: "Compliance", email: "compliance@anoneurx.com", note: "KYC, AML and regulatory requests." },
    ],
    responseTime: "Within 1 business day · disputes within 24 hours",
  },
  support: {
    path: "/pay/support",
    title: "Anoneurx Pay Support",
    description:
      "Help with Anoneurx Pay — cards, transfers, disputes, verification and business accounts.",
    intro:
      "Everything about cards, transfers, verification and business accounts — with escalation paths when it matters.",
    faqs: [
      { q: "My transfer is still pending.", a: "Domestic transfers settle within minutes; international transfers can take one business day. Check the transaction timeline in your dashboard first.", category: "Technical" },
      { q: "How do I dispute a transaction?", a: "Open the transaction, choose Dispute and attach evidence. Provisional credit is applied while we investigate.", category: "Billing" },
      { q: "Verification keeps failing.", a: "Use a government-issued ID in good lighting, with the full document in frame. Three failed attempts pause the flow for 24 hours.", category: "Accounts" },
      { q: "Can I open a business account?", a: "Yes. Business onboarding needs incorporation documents and a director ID. Start from the Pay sign-up flow.", category: "Accounts" },
      { q: "Are my funds protected?", a: "Balances are held with partner institutions, segregated from operating funds, and every session is device-bound.", category: "Security" },
      { q: "Where do I download statements?", a: "Statements are generated monthly in your dashboard as PDF and CSV.", category: "Billing" },
    ],
    statusNote: "Payments, cards and transfers operating normally.",
  },
};

export const cloudConfig: ModuleConfig = {
  module: "Anoneurx Cloud",
  email: "cloud@anoneurx.com",
  theme: "dark",
  contact: {
    path: "/cloud/contact",
    title: "Contact Anoneurx Cloud",
    description:
      "Reach Anoneurx Cloud — sales, architecture, billing and enterprise support at cloud@anoneurx.com.",
    intro:
      "Talk to solutions architects about compute, storage and networking, or reach billing and enterprise support directly.",
    channels: [
      { label: "Sales & architecture", email: "cloud@anoneurx.com", note: "Sizing, migration plans and quotes." },
      { label: "Billing", email: "billing@anoneurx.com", note: "Invoices, credits and commitments." },
      { label: "Enterprise support", email: "support@anoneurx.com", note: "Incidents under a support agreement." },
      { label: "Abuse", email: "abuse@anoneurx.com", note: "Report abuse originating from our network." },
    ],
    responseTime: "Within 1 business day · incidents within 2 hours",
  },
};
