import SectionHeading from "./components/SectionHeading";

const releases = [
  {
    version: "0.x",
    date: "September 2026",
    items: {
      Added: ["Initial public website for Anoneurx Connect.", "Connect dashboard console."],
      Improved: ["Navigation and routing structure."],
      Security: ["Encrypted session architecture."],
    },
  },
];

const ConnectChangelog = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Changelog"
          title="Release notes."
          description="Changes to Anoneurx Connect. Release details will be added as new versions ship."
        />
        <div className="mt-8 space-y-8">
          {releases.map((rel) => (
            <div key={rel.version} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02]">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Connect {rel.version}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{rel.date}</span>
              </div>
              {Object.entries(rel.items).map(([category, items]) => (
                <div key={category} className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-500">{category}</h4>
                  <ul className="mt-2 space-y-1">
                    {(items as string[]).map((item, i) => (
                      <li key={i} className="text-sm text-slate-500 dark:text-slate-400">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Earlier releases will be documented as Connect matures.
        </p>
      </div>
    </section>
  </div>
);

export default ConnectChangelog;