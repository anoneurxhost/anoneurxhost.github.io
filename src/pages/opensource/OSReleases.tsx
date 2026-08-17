import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import { releases } from "./data";

const OSReleases = () => (
  <OSPage>
    <OSSectionHeader title="Releases" subtitle="A chronological feed of new releases across every project." />
    <ol className="relative border-l border-neutral-200 pl-6 dark:border-neutral-800">
      {releases.map((r) => (
        <li key={r.id} className="mb-8 last:mb-0">
          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-neutral-900 dark:bg-neutral-100" />
          <div className="text-xs text-neutral-500">{new Date(r.date).toLocaleDateString()}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold">{r.project}</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium dark:bg-neutral-800">v{r.version}</span>
          </div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{r.notes}</p>
        </li>
      ))}
    </ol>
  </OSPage>
);
export default OSReleases;
