import { Person, ProjectExtra } from "./types";
import authenticatorLogo from "@/assets/appicons/authenticator.png";

export const authenticatorContributors: Person[] = [
  { name: "Insha", github: "inshaits-hub", role: "Performance Engineer", focus: "Benchmarks & profiling" },
  { name: "Muhammad Qasim", github: "itskashie", role: "Founder · Architecture", focus: "Kernel & runtime" },
];

export const authenticatorTesters: Person[] = [
  { name: "Insha", github: "inshaits-hub", role: "QA Lead", focus: "Release verification" },
  { name: "Hafiza Laiba Faisal", github: "Hafiza-Laiba-Faisal", role: "Field Tester", focus: "Hardware matrix" },
  { name: "Hamna Asim Ali", github: "hehehhamnah", role: "Accessibility Tester", focus: "Screen readers" },
  { name: "Muhammad Anas", github: "Muhammad-Anas59", role: "Beta Tester", focus: "Regression sweeps" },
  { name: "Abdullah Rasheed", github: "abdullahrasheed01", role: "Security Tester", focus: "Vault security" },
  { name: "Rehan", github: "mrtprime21", role: "Performance Tester", focus: "App performance" },
];

export const authenticatorExtra: ProjectExtra = {
  platform: "mobile",
  platformLabel: "Android App",
  logo: authenticatorLogo,
  accent: "from-emerald-500 to-teal-500",
  storeLinks: {
    playStore: "https://play.google.com/store/apps/details?id=com.anoneurx.authenticator",
  },
  mobileScreenshots: [
    { src: "", label: "Vault", caption: "Biometric-locked vault showing all your TOTP accounts at a glance" },
    { src: "", label: "Scanner", caption: "On-device QR scanner — camera frames are decoded locally and never leave the device" },
    { src: "", label: "Backup", caption: "AES-256-GCM encrypted .aax backup export with PBKDF2-HMAC-SHA256 key derivation" },
    { src: "", label: "Settings", caption: "App settings with screenshot protection (FLAG_SECURE) and theme options" },
  ],
  contributors: authenticatorContributors,
  testers: authenticatorTesters,
  features: [
    { title: "Fully offline", desc: "Zero network calls. No backend, no sync, no analytics.", tag: "Privacy" },
    { title: "Encrypted backups", desc: "AES-256-GCM .aax exports derived with PBKDF2-HMAC-SHA256.", tag: "Crypto" },
    { title: "Biometric lock", desc: "Fingerprint, face, or passkey unlock through native APIs.", tag: "Access" },
    { title: "Screenshot blocked", desc: "FLAG_SECURE prevents screen capture and recording of codes.", tag: "Hardening" },
    { title: "On-device QR scan", desc: "Camera frames are decoded locally and never leave the device.", tag: "Input" },
    { title: "Unlimited accounts", desc: "TOTP and HOTP with custom digits, periods, and issuer icons.", tag: "TOTP" },
  ],
  changelog: [
    { version: "v1.0.0", date: "Aug 2026", kind: "Release", notes: ["Play Store launch", "Encrypted .aax backup format", "Biometric gate"] },
    { version: "v0.9.0", date: "Jul 2026", kind: "Beta", notes: ["HOTP support", "Issuer icon pack"] },
  ],
  faq: [
    { q: "Do I need an account?", a: "No. The app has no sign-in because it has no server." },
    { q: "How do I move to a new phone?", a: "Export an encrypted .aax backup, transfer it however you like, then import with your master password." },
    { q: "Does it work without internet?", a: "Always. TOTP codes are generated from the device clock and your stored secrets." },
    { q: "Is it open source?", a: "Yes, Apache-2.0 with reproducible release builds." },
  ],
  roadmap: [
    { quarter: "Q3 2026", status: "shipped", items: ["Play Store release", "Encrypted backups"] },
    { quarter: "Q4 2026", status: "active", items: ["Wear OS companion", "Desktop verifier"] },
    { quarter: "Q1 2027", status: "planned", items: ["iOS build", "Passkey vault"] },
  ],
  security: [
    {
      title: "Supported versions",
      body: ["Security fixes land on the latest stable release of Anoneurx Authenticator and the previous minor version."],
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
    updated: "September 3, 2026",
    summary:
      "ANONEURX Authenticator is designed as an offline authenticator and does not require an online account or transmit your authenticator data to our servers.",
    sections: [
      {
        title: "Introduction",
        body: [
          'ANONEURX Authenticator ("the App") is developed and provided by ANONEURX.',
          "We respect your privacy. ANONEURX Authenticator is designed as an offline authenticator and does not require an online account or transmit your authenticator data to our servers.",
        ],
      },
      {
        title: "Information We Collect",
        body: [
          "ANONEURX Authenticator does not collect personal information such as name, email address, phone number, physical address, contacts, location, or advertising identifiers. The App does not require you to create an account.",
        ],
        bullets: [
          "No name, email, or phone number",
          "No device identifiers or advertising IDs",
          "No usage analytics or behavioural profiling",
          "No location data of any kind",
        ],
      },
      {
        title: "Authentication Data",
        body: [
          "The App may allow you to store information required to generate authentication codes, such as account/issuer name, account label or username, TOTP secret keys, and authentication configuration data.",
          "This information is stored locally on your device and is used solely to provide authentication functionality.",
        ],
        bullets: [
          "Account/issuer name",
          "Account label or username",
          "TOTP secret keys",
          "Authentication configuration data",
        ],
      },
      {
        title: "How Your Data Is Used",
        body: [
          "Information stored within the App is used only to provide the App's functionality, including generating time-based one-time passwords (TOTP), displaying authentication codes, managing authenticator accounts, scanning QR codes for authenticator setup, and providing local authentication-related features.",
        ],
        bullets: [
          "Generating time-based one-time passwords (TOTP)",
          "Displaying authentication codes",
          "Managing authenticator accounts",
          "Scanning QR codes for setup",
        ],
      },
      {
        title: "Data Sharing",
        body: [
          "ANONEURX Authenticator does not sell, rent, or share your personal information or authentication secrets with third parties.",
          "The App is designed to operate without transmitting your stored authenticator information to ANONEURX or third-party servers.",
        ],
      },
      {
        title: "Internet and Network Access",
        body: [
          "The App is designed to function offline.",
          "Your authenticator information does not need to be transmitted over the internet for the App's core authentication functionality.",
        ],
      },
      {
        title: "Camera and QR Code Scanning",
        body: [
          "If you use the QR code scanning feature, the App may request access to your device's camera. Camera access is used solely to scan QR codes for setting up authenticator accounts.",
          "QR code information is processed locally by the App and is not intentionally uploaded to ANONEURX servers.",
        ],
      },
      {
        title: "Local Storage",
        body: [
          "Authenticator information is stored locally on your device.",
          "Because the information is stored locally, uninstalling the App, clearing its data, resetting your device, or otherwise deleting the App's local storage may permanently remove your authenticator accounts and secrets.",
        ],
      },
      {
        title: "Data Security",
        body: [
          "ANONEURX takes reasonable measures to protect information handled by the App.",
          "Because authenticator secrets are sensitive security information, users should also protect their device with appropriate security measures such as a strong screen lock, device encryption, and keeping Android and the App updated.",
          "No method of electronic storage can be guaranteed to be completely secure.",
        ],
      },
      {
        title: "Data Retention and Deletion",
        body: [
          "ANONEURX does not maintain a remote database of your authenticator accounts.",
          "Your authenticator information remains on your device until you delete it through the App or remove the App's local data.",
          "If you uninstall the App or clear its storage, locally stored information may be permanently deleted.",
        ],
      },
      {
        title: "Children's Privacy",
        body: [
          "ANONEURX Authenticator is not specifically directed toward children.",
          "We do not knowingly collect personal information from children through the App.",
        ],
      },
      {
        title: "Third-Party Services",
        body: [
          "The current version of ANONEURX Authenticator does not intentionally transmit user authentication data to third-party services.",
          "If third-party SDKs or services are introduced in future versions, their data practices will be reviewed and this Privacy Policy and the Google Play Data Safety information will be updated as necessary.",
        ],
      },
      {
        title: "Changes to This Privacy Policy",
        body: [
          "We may update this Privacy Policy when the App's functionality, data practices, or applicable requirements change.",
          'The updated version will be published on this page with a revised "Last Updated" date.',
        ],
      },
      {
        title: "Contact Us",
        body: [
          "If you have questions, concerns, or privacy-related requests regarding ANONEURX Authenticator, contact:",
        ],
        bullets: [
          "Privacy Email: privacy@anoneurx.com",
          "Website: anoneurx.com",
        ],
      },
      {
        title: "Your Privacy",
        body: [
          "ANONEURX Authenticator is built with a privacy-first approach. The App's core authentication functionality is designed to keep your authenticator information on your device rather than sending it to ANONEURX servers.",
          "By using ANONEURX Authenticator, you acknowledge that you have read and understood this Privacy Policy.",
          "\u00a9 2026 ANONEURX. All rights reserved.",
        ],
      },
    ],
  },
};
