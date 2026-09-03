import { ShieldCheck, CreditCard, Server, type LucideIcon } from "lucide-react";

export interface UniversityModuleConfig {
  key: string;
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  about: string;
  programs: { title: string; body: string; level: string }[];
  engage: { title: string; body: string }[];
  productLink: { label: string; to: string };
  contact: { email: string; responseTime: string; escalation?: string };
  breadcrumb: { name: string; to?: string }[];
}

export const UNIVERSITY_MODULES: Record<string, UniversityModuleConfig> = {
  blackwall: {
    key: "blackwall",
    path: "/university/blackwall",
    eyebrow: "Anoneurx University",
    title: "Black Wall OS at Anoneurx University",
    intro:
      "Systems and security education built on Black Wall OS — kernels, hardening, forensics and secure deployment.",
    icon: ShieldCheck,
    about:
      "The Black Wall track teaches operating systems from the source tree up. Students build, harden and audit a real distribution, then defend it under live adversarial exercises run by the Black Wall engineering team.",
    programs: [
      { level: "Diploma", title: "Secure Systems Engineering", body: "Kernel subsystems, memory safety, sandboxing and supply-chain integrity." },
      { level: "Certificate", title: "OS Hardening & Forensics", body: "Threat modelling, audit tooling, incident response and disk forensics." },
      { level: "Short course", title: "Build Your Own Distribution", body: "From bootloader to signed image in four weeks." },
    ],
    engage: [
      { title: "Lab access", body: "Dedicated Black Wall lab images, VMs and bare-metal test benches." },
      { title: "Red vs blue", body: "Termly adversarial exercises graded on detection and recovery." },
      { title: "Upstream work", body: "Patches accepted upstream count toward final assessment." },
    ],
    productLink: { label: "Explore Black Wall OS", to: "/blackwall" },
    contact: { email: "blackwall-university@anoneurx.com", responseTime: "Within 1 business day", escalation: "security@anoneurx.com" },
    breadcrumb: [{ name: "University", to: "/university" }, { name: "Black Wall" }],
  },
  pay: {
    key: "pay",
    path: "/university/pay",
    eyebrow: "Anoneurx University",
    title: "Anoneurx Pay at Anoneurx University",
    intro:
      "Fintech engineering — ledgers, payment rails, fraud detection and regulatory compliance taught on production-grade systems.",
    icon: CreditCard,
    about:
      "The Pay track covers what it takes to move money correctly: double-entry ledgers, idempotency, reconciliation, dispute handling and the compliance obligations around each. Students work against a sandboxed replica of the Anoneurx Pay stack.",
    programs: [
      { level: "Diploma", title: "Payments Engineering", body: "Ledger design, settlement, idempotent APIs and reconciliation at scale." },
      { level: "Certificate", title: "Fraud & Risk Analytics", body: "Feature engineering, scoring models, rule engines and case review." },
      { level: "Short course", title: "Compliance Foundations", body: "KYC, AML, PCI scope and audit-ready record keeping." },
    ],
    engage: [
      { title: "Sandbox access", body: "A full Anoneurx Pay sandbox with test rails and synthetic disputes." },
      { title: "Capstone", body: "Ship a working payment feature reviewed by the Pay engineering team." },
      { title: "Placement", body: "Top performers interview directly with the Pay and risk teams." },
    ],
    productLink: { label: "Explore Anoneurx Pay", to: "/pay" },
    contact: { email: "pay-university@anoneurx.com", responseTime: "Within 1 business day", escalation: "compliance@anoneurx.com" },
    breadcrumb: [{ name: "University", to: "/university" }, { name: "Pay" }],
  },
  cloud: {
    key: "cloud",
    path: "/university/cloud",
    eyebrow: "Anoneurx University",
    title: "Anoneurx Cloud at Anoneurx University",
    intro:
      "Cloud and platform engineering — compute, storage, networking, observability and reliability on Anoneurx Cloud.",
    icon: Server,
    about:
      "The Cloud track is run on real infrastructure. Students provision, network, monitor and break their own clusters, then run them under SLO pressure with on-call rotations and blameless post-mortems.",
    programs: [
      { level: "Diploma", title: "Platform Engineering", body: "Infrastructure as code, container orchestration, CI/CD and multi-region design." },
      { level: "Certificate", title: "Site Reliability Engineering", body: "SLOs, load testing, incident command and post-mortem practice." },
      { level: "Short course", title: "Cloud Networking & Firewalls", body: "VPCs, routing, private links and firewall policy in two weeks." },
    ],
    engage: [
      { title: "Free student credits", body: "Cloud credits for coursework, capstones and student projects." },
      { title: "Live on-call", body: "Shadow a real on-call rotation with a mentor from the Cloud team." },
      { title: "Console labs", body: "Guided labs inside the Cloud Connect console." },
    ],
    productLink: { label: "Explore Anoneurx Cloud", to: "/cloud" },
    contact: { email: "cloud-university@anoneurx.com", responseTime: "Within 1 business day", escalation: "oncall@anoneurx.com" },
    breadcrumb: [{ name: "University", to: "/university" }, { name: "Cloud" }],
  },
};

export const UNIVERSITY_MODULE_LIST = Object.values(UNIVERSITY_MODULES);
