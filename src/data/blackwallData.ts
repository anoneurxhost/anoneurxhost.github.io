import { Person, ProjectExtra } from "./types";
import blackwallLogo from "@/assets/appicons/blackwall.png";
import blackwallDesktop from "@/assets/blackwall/screenshot-desktop.jpg";
import blackwallTerminal from "@/assets/blackwall/screenshot-terminal.jpg";
import blackwallFiles from "@/assets/blackwall/screenshot-files.jpg";
import blackwallSettings from "@/assets/blackwall/screenshot-settings.jpg";
import blackwallStore from "@/assets/blackwall/screenshot-store.jpg";
import blackwallLock from "@/assets/blackwall/screenshot-lock.jpg";

export const blackwallContributors: Person[] = [
  { name: "Muhammad Qasim", github: "torvalds", role: "Founder · Architecture", focus: "Kernel & runtime" },
  { name: "Maya Chen", github: "gaearon", role: "Core Maintainer", focus: "Compiler / API surface" },
  { name: "Ravi Patel", github: "sindresorhus", role: "Performance Engineer", focus: "Benchmarks & profiling" },
  { name: "Priya Rao", github: "yyx990803", role: "Security Reviewer", focus: "Threat modelling" },
  { name: "Jonah Reyes", github: "kentcdodds", role: "Developer Experience", focus: "Docs & tooling" },
  { name: "Sofia Kim", github: "addyosmani", role: "Interface Engineer", focus: "Design system" },
];

export const blackwallTesters: Person[] = [
  { name: "Elena Rossi", github: "tj", role: "QA Lead", focus: "Release verification" },
  { name: "Léo Dubois", github: "mrdoob", role: "Field Tester", focus: "Hardware matrix" },
  { name: "Aria Novak", github: "developit", role: "Beta Tester", focus: "Regression sweeps" },
  { name: "Noah Blake", github: "wesbos", role: "Accessibility Tester", focus: "Screen readers" },
];

export const blackwallExtra: ProjectExtra = {
  platform: "os",
  platformLabel: "Operating System",
  logo: blackwallLogo,
  accent: "from-violet-500 to-fuchsia-500",
  storeLinks: {
    iso: "#download-blackwall-iso",
    desktop: [
      { label: "x86_64 ISO", url: "#download-blackwall-iso" },
      { label: "ARM64 image", url: "#download-blackwall-arm64" },
      { label: "Live USB writer", url: "#download-blackwall-usb" },
    ],
  },
  desktopDemo: {
    title: "Black Wall desktop, live",
    description:
      "A guided walkthrough of the hardened desktop session — compositor, terminal, sandboxed file manager, capability settings, and the verified app store.",
    windowTitle: "blackwall-os — live session",
    shots: [
      { src: blackwallDesktop, label: "Desktop", caption: "Wayland compositor running on the capability microkernel." },
      { src: blackwallTerminal, label: "Terminal", caption: "Syscall filters visible per shell session." },
      { src: blackwallFiles, label: "Files", caption: "Every mount is a revocable capability, not a global path." },
      { src: blackwallSettings, label: "Settings", caption: "Per-app permission ledger with instant revocation." },
      { src: blackwallStore, label: "Store", caption: "Only reproducibly built, signed packages are installable." },
      { src: blackwallLock, label: "Lock", caption: "TPM-attested boot state shown before unlock." },
    ],
    requirements: [
      "x86_64 or ARM64 CPU with TPM 2.0",
      "4 GB RAM (8 GB recommended)",
      "12 GB disk for a persistent install",
      "UEFI with Secure Boot enabled",
    ],
  },
  contributors: blackwallContributors,
  testers: blackwallTesters,
  features: [
    { title: "Capability microkernel", desc: "85% smaller trusted surface than a monolithic kernel; drivers run outside ring 0.", tag: "Kernel" },
    { title: "Zero unsafe drivers", desc: "Rust drivers with formal verification on memory boundaries.", tag: "Memory" },
    { title: "TPM-attested boot", desc: "1.2 ms signed boot state validation before any user space starts.", tag: "Boot" },
    { title: "Revocable permissions", desc: "Every app permission is a token you can revoke live, mid-session.", tag: "Sandbox" },
    { title: "Reproducible packages", desc: "The store refuses anything that is not byte-for-byte reproducible.", tag: "Supply chain" },
    { title: "Lockless IPC", desc: "0.18 µs message passing keeps overhead under 2% system-wide.", tag: "Performance" },
  ],
  changelog: [
    { version: "v0.8.0", date: "Aug 2026", kind: "Kernel stable", notes: ["Capability IPC router rewrite", "TPM 2.0 attestation on ARM64", "Store enforces reproducible builds"] },
    { version: "v0.7.4", date: "Jun 2026", kind: "Patch", notes: ["Sandbox syscall filter hardening", "Compositor GPU fast path"] },
    { version: "v0.7.0", date: "Apr 2026", kind: "Feature", notes: ["Sandboxed file manager", "Per-app permission ledger UI"] },
  ],
  faq: [
    { q: "Is Black Wall a Linux distribution?", a: "No. It is an independent capability microkernel with its own driver model and a Wayland-based desktop." },
    { q: "Can I dual boot it?", a: "Yes. The installer writes its own UEFI entry and leaves existing partitions untouched." },
    { q: "Does my hardware work?", a: "Any x86_64 or ARM64 machine with TPM 2.0 and UEFI. Check the hardware matrix on the download page." },
    { q: "Can I run Linux apps?", a: "Yes, through the compatibility sandbox — each translated syscall is still filtered by the capability layer." },
  ],
  roadmap: [
    { quarter: "Q3 2026", status: "shipped", items: ["Capability IPC router", "Reproducible store gate"] },
    { quarter: "Q4 2026", status: "active", items: ["GPU driver isolation", "Encrypted swap by default"] },
    { quarter: "Q1 2027", status: "planned", items: ["Formal proof of IPC path", "Multi-seat sessions"] },
  ],
  security: [
    {
      title: "Supported versions",
      body: ["Security fixes land on the latest stable release of Black Wall and the previous minor version."],
    },
    {
      title: "Reporting a vulnerability",
      body: [
        "Email security@anoneurx.com with a description, affected version, and reproduction steps. Please do not open a public issue for undisclosed vulnerabilities.",
      ],
      bullets: [
        "Acknowledgement within 48 hours",
        "Triage and severity scoring within 5 days",
        "Coordinated disclosure once a fix is released",
      ],
    },
    {
      title: "Hardening practices",
      body: [
        "Every release is reproducibly built, signed, and scanned. Dependencies are pinned and audited on each pull request.",
      ],
    },
  ],
  privacy: {
    updated: "September 1, 2026",
    summary: "Black Wall is built privacy-first. We collect no personal data, run no analytics SDKs, and never sell or share information with third parties.",
    sections: [
      {
        title: "Information we do not collect",
        body: [
          "Black Wall ships without telemetry. There is no account system, no advertising identifier, and no background reporting.",
        ],
        bullets: [
          "No names, emails, or phone numbers",
          "No device identifiers or advertising IDs",
          "No usage analytics or behavioural profiling",
          "No location data of any kind",
        ],
      },
      {
        title: "Data stored on your device",
        body: [
          "Any configuration, keys, or content you create stays in local storage on your own machine. It is never uploaded to Anoneurx infrastructure.",
        ],
      },
      {
        title: "Network activity",
        body: [
          "Outbound network requests happen only when you explicitly trigger them — for example checking for a new release. No request carries identifying metadata.",
        ],
      },
      {
        title: "Crash reports",
        body: [
          "Crash reporting is opt-in and off by default. When enabled, reports contain a stack trace and build identifier only, and are deleted after 30 days.",
        ],
      },
      {
        title: "Third parties",
        body: [
          "We use no third-party analytics, attribution, or advertising services. Distribution stores (for example Google Play) apply their own policies to downloads.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "Because we hold no personal data, there is nothing to export or erase on our side. Uninstalling removes every trace from your device.",
        ],
      },
      {
        title: "Contact",
        body: [
          "Questions about this policy can be sent to privacy@anoneurx.com. We respond within five working days.",
        ],
      },
    ],
  },
};
