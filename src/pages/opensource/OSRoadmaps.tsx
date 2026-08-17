import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import { roadmaps } from "./data";
import { Check } from "lucide-react";

const OSRoadmaps = () => (
  <OSPage>
    <OSSectionHeader title="Roadmaps" subtitle="What each project is planning, right now and next quarter." />
    <div className="grid gap-6 md:grid-cols-2">
      {roadmaps.map((r) => (
        <div key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{r.project}</h3>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs dark:bg-neutral-800">{r.quarter}</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {r.items.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-neutral-500" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </OSPage>
);
export default OSRoadmaps;
