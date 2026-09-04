export type Person = {
  name: string;
  github: string;
  role: string;
  focus: string;
};

export type ProjectExtra = {
  platform: string;
  platformLabel: string;
  logo?: string;
  accent: string;
  storeLinks?: {
    iso?: string;
    desktop?: { label: string; url: string }[];
    playStore?: string;
    fdroid?: string;
    appStore?: string;
  };
  desktopDemo?: {
    title: string;
    description: string;
    windowTitle: string;
    shots: { src: string; label: string; caption: string }[];
    requirements: string[];
  };
  contributors: Person[];
  testers: Person[];
  features: { title: string; desc: string; tag: string }[];
  changelog: { version: string; date: string; kind: string; notes: string[] }[];
  faq: { q: string; a: string }[];
  roadmap: { quarter: string; status: string; items: string[] }[];
  security: { title: string; body: string[]; bullets?: string[] }[];
  privacy: {
    updated: string;
    summary: string;
    sections: { title: string; body: string[]; bullets?: string[] }[];
  };
};

export type PolicySection = {
  title: string;
  body: string[];
  bullets?: string[];
};

export const githubAvatar = (username: string) => `https://github.com/${username}.png?size=96`;
export const githubProfile = (username: string) => `https://github.com/${username}`;

export const PROJECT_PAGES = [
  { key: "overview", label: "Overview", path: "" },
  { key: "features", label: "Features", path: "features" },
  { key: "changelog", label: "Changelog", path: "changelog" },
  { key: "security", label: "Security", path: "security" },
  { key: "privacy", label: "Privacy", path: "privacy" },
  { key: "demo", label: "Live Demo", path: "demo" },
];

export function getProjectExtra(id: string, name: string): ProjectExtra {
  // This is a placeholder - actual data comes from blackwallData.ts or authenticatorData.ts
  return {
    platform: "os",
    platformLabel: "Operating System",
    accent: "from-violet-500 to-fuchsia-500",
    contributors: [],
    testers: [],
    features: [],
    changelog: [],
    faq: [],
    roadmap: [],
    security: [],
    privacy: {
      updated: "January 1, 2026",
      summary: "Privacy policy coming soon.",
      sections: [],
    },
  };
}
