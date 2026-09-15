import SectionHeading from "./components/SectionHeading";
import { FolderOpen, BookOpen, Code, Shield, Wrench } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { name: "Introduction", path: "/blacklink/docs" },
      { name: "Installation", path: "/blacklink/agent" },
      { name: "First Connection", path: "/blacklink/agent" },
      { name: "Dashboard", path: "/blacklink/dashboard" },
    ],
  },
  {
    title: "Agent",
    icon: Wrench,
    items: [
      { name: "Installation", path: "/blacklink/agent" },
      { name: "Configuration", path: "/blacklink/docs" },
      { name: "Authentication", path: "/blacklink/security" },
      { name: "Updates", path: "/blacklink/agent" },
      { name: "Troubleshooting", path: "/blacklink/agent" },
    ],
  },
  {
    title: "Server Management",
    icon: FolderOpen,
    items: [
      { name: "Terminal", path: "/blacklink/dashboard/terminal" },
      { name: "Files", path: "/blacklink/dashboard" },
      { name: "Processes", path: "/blacklink/dashboard" },
      { name: "Services", path: "/blacklink/dashboard" },
      { name: "Logs", path: "/blacklink/dashboard" },
      { name: "Network", path: "/blacklink/dashboard" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { name: "Security Model", path: "/blacklink/security" },
      { name: "Permissions", path: "/blacklink/security" },
      { name: "Sessions", path: "/blacklink/security" },
      { name: "Audit Logs", path: "/blacklink/security" },
    ],
  },
  {
    title: "Developers",
    icon: Code,
    items: [
      { name: "Agent Protocol", path: "/blacklink/docs" },
      { name: "Integration", path: "/blacklink/docs" },
      { name: "Extensions", path: "/blacklink/docs" },
    ],
  },
];

const ConnectDocs = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Docs"
          title="Documentation."
          description="Everything you need to install, configure and integrate Anoneurx Connect. New categories will be added as features ship."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/5 hover:border-blue-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:shadow-none dark:hover:border-blue-500/30 dark:hover:bg-white/[0.04]">
              <div className="flex items-center gap-2">
                <cat.icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{cat.title}</h3>
              </div>
              <ul className="mt-4 space-y-2">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <a href={item.path} className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default ConnectDocs;