// Static seed data for the Open Source module.
import blackwallIcon from "@/assets/appicons/blackwall.png";
import authenticatorIcon from "@/assets/appicons/authenticator.png";

export type Project = { id: string; name: string; description: string; language: string; stars: number; tags: string[]; image?: string };
export type Org = { id: string; name: string; description: string; members: number; projects: number };
export type Library = { id: string; name: string; description: string; language: string; downloads: string };
export type Pkg = { id: string; name: string; registry: "npm" | "cargo" | "pip" | "go"; version: string; description: string };
export type Template = { id: string; name: string; stack: string; description: string };
export type Extension = { id: string; name: string; description: string; installs: string };
export type Doc = { id: string; title: string; category: string; excerpt: string };
export type Post = { id: string; title: string; author: string; date: string; tags: string[]; excerpt: string };
export type Roadmap = { id: string; project: string; quarter: string; items: string[] };
export type Release = { id: string; project: string; version: string; date: string; notes: string };
export type Discussion = { id: string; title: string; author: string; replies: number; category: string };
export type Event = { id: string; name: string; date: string; type: "Virtual" | "In-Person" | "Hybrid"; location: string };
export type Sponsor = { id: string; name: string; tier: "Platinum" | "Gold" | "Silver"; since: string };
export type Contributor = { id: string; name: string; commits: number; role: string; region: string };
export type Showcase = { id: string; name: string; author: string; description: string; project: string };

export const projects: Project[] = [
  { id: "blackwall", name: "Blackwall OS", description: "Privacy-first operating system with hardened kernel and secure enclaves.", language: "C / Rust", stars: 9800, tags: ["os", "security"], image: blackwallIcon },
  { id: "authenticator", name: "Authenticator", description: "Privacy-focused 2FA & Passkey authenticator with native biometric lock, encrypted backup, and zero-knowledge security.", language: "TypeScript / React", stars: 11400, tags: ["auth", "security", "biometrics", "2fa"], image: authenticatorIcon },
];

export const organizations: Org[] = [
  { id: "anoneurx-labs", name: "Anoneurx Labs", description: "Core research and systems group.", members: 84, projects: 2 },
  { id: "blackwall-collective", name: "Blackwall Collective", description: "Contributors advancing OS security.", members: 56, projects: 1 },
];

export const libraries: Library[] = [
  { id: "blackwall-syscalls", name: "blackwall-syscalls", description: "Safe bindings to the Blackwall syscall surface.", language: "C", downloads: "220K" },
];

export const packages: Pkg[] = [
  { id: "cargo-blackwall", name: "blackwall-sys", registry: "cargo", version: "0.4.0", description: "Blackwall syscall bindings." },
];

export const templates: Template[] = [
  { id: "blackwall-service", name: "Blackwall Service", stack: "C / Rust", description: "System service template with sandboxing." },
];

export const extensions: Extension[] = [
  { id: "blackwall-syscalls-ext", name: "Blackwall Syscalls", description: "Reference for Blackwall syscalls and errno.", installs: "34K" },
];

export const docs: Doc[] = [
  { id: "blackwall-security", title: "Blackwall Security Model", category: "Systems", excerpt: "The threat model and enclave architecture." },
];

export const posts: Post[] = [
  { id: "blackwall-audit", title: "Blackwall Audit Results", author: "Priya Rao", date: "2026-01-17", tags: ["security"], excerpt: "Findings from our third independent security audit." },
  { id: "authenticator-release", title: "Authenticator 1.0 Released", author: "Insha", date: "2026-08-31", tags: ["auth", "release"], excerpt: "Native biometric lock, multi-factor authenticator & encrypted backup export." },
];

export const roadmaps: Roadmap[] = [
  { id: "blackwall-q3", project: "Blackwall OS", quarter: "Q3 2026", items: ["Enclave attestation", "USB isolation", "New installer"] },
  { id: "authenticator-q3", project: "Authenticator", quarter: "Q3 2026", items: ["Native Passkeys WebAuthn", "Biometric Vault Lock v2", "Cloud Encrypted Sync"] },
];

export const releases: Release[] = [
  { id: "blackwall-0-8", project: "Blackwall OS", version: "0.8.0", date: "2026-03-22", notes: "New enclave attestation and hardened networking." },
  { id: "authenticator-1-0", project: "Authenticator", version: "1.0.0", date: "2026-08-31", notes: "Native biometric lock, multi-factor authenticator & .aax backup export." },
];

export const discussions: Discussion[] = [
  { id: "d5", title: "Blackwall installer — hardware compatibility", author: "Priya Rao", replies: 23, category: "Support" },
  { id: "d6", title: "Authenticator native biometrics RFC", author: "Sofia Kim", replies: 45, category: "RFC" },
];

export const events: Event[] = [
  { id: "e1", name: "AnoneurxConf 2026", date: "2026-09-18", type: "Hybrid", location: "Berlin + Online" },
  { id: "e5", name: "Blackwall Security Workshop", date: "2026-10-02", type: "In-Person", location: "Zürich" },
  { id: "e6", name: "Authenticator Security Summit", date: "2026-11-14", type: "Virtual", location: "Online" },
];

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Northline", tier: "Platinum", since: "2023" },
  { id: "s2", name: "Vellum Systems", tier: "Platinum", since: "2024" },
  { id: "s3", name: "Meridian Cloud", tier: "Gold", since: "2024" },
  { id: "s4", name: "Kestrel Semiconductor", tier: "Gold", since: "2025" },
  { id: "s5", name: "Cobalt Studios", tier: "Silver", since: "2025" },
  { id: "s6", name: "Umbra Labs", tier: "Silver", since: "2025" },
];

export const contributors: Contributor[] = [
  { id: "c1", name: "Priya Rao", commits: 4820, role: "Security Lead", region: "APAC" },
  { id: "c2", name: "Sofia Kim", commits: 3910, role: "Auth Runtime", region: "EMEA" },
  { id: "c3", name: "Maya Chen", commits: 2740, role: "Core Engineer", region: "APAC" },
  { id: "c4", name: "Jonah Reyes", commits: 2540, role: "Systems Engineer", region: "AMER" },
  { id: "c5", name: "Ravi Patel", commits: 2210, role: "Performance", region: "APAC" },
  { id: "c6", name: "Aria Novak", commits: 1980, role: "Networking", region: "EMEA" },
  { id: "c7", name: "Léo Dubois", commits: 1730, role: "Databases", region: "EMEA" },
  { id: "c8", name: "Elena Rossi", commits: 1620, role: "DX & Tooling", region: "EMEA" },
];

export const showcase: Showcase[] = [
  { id: "sh1", name: "Nomad Kernel", author: "Nomad", description: "Embedded kernel fork based on Black Wall.", project: "Black Wall" },
  { id: "sh2", name: "Anoneurx Vault Sync", author: "Anoneurx Studio", description: "Offline zero-knowledge vault sync service.", project: "Authenticator" },
];

export const navLinks: { to: string; label: string }[] = [
  { to: "/opensource", label: "Home" },
  { to: "/opensource/about", label: "About" },
  { to: "/opensource/projects", label: "Projects" },
  { to: "/opensource/organizations", label: "Organizations" },
  { to: "/opensource/libraries", label: "Libraries" },
  { to: "/opensource/packages", label: "Packages" },
  { to: "/opensource/templates", label: "Templates" },
  { to: "/opensource/vscode-extensions", label: "VS Code" },
  { to: "/opensource/documentation", label: "Docs" },
  { to: "/opensource/blog", label: "Blog" },
  { to: "/opensource/roadmaps", label: "Roadmaps" },
  { to: "/opensource/releases", label: "Releases" },
  { to: "/opensource/discussions", label: "Discussions" },
  { to: "/opensource/events", label: "Events" },
  { to: "/opensource/community", label: "Community" },
  { to: "/opensource/sponsors", label: "Sponsors" },
  { to: "/opensource/partnership-inquiry", label: "Sponsor a Project" },
  { to: "/opensource/contributors", label: "Contributors" },
  { to: "/opensource/showcase", label: "Showcase" },
  { to: "/opensource/contact", label: "Contact" },
];
