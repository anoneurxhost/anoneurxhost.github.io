import { useMemo, useState } from "react";
import OSPage from "./OSPage";
import OSSectionHeader from "./OSSectionHeader";
import { discussions } from "./data";
import { MessageSquare } from "lucide-react";

const OSDiscussions = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => discussions.filter((d) => `${d.title} ${d.author} ${d.category}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <OSPage>
      <OSSectionHeader title="Discussions" subtitle="RFCs, Q&A, and showcases from the community." search={q} onSearchChange={setQ} />
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        {filtered.map((d, i) => (
          <div key={d.id} className={`flex items-center justify-between gap-4 p-5 ${i > 0 ? "border-t border-neutral-200 dark:border-neutral-800" : ""} bg-white dark:bg-neutral-900`}>
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 dark:bg-neutral-800">{d.category}</span>
                <span>by {d.author}</span>
              </div>
              <div className="mt-1 font-medium">{d.title}</div>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-500"><MessageSquare className="h-4 w-4" />{d.replies}</div>
          </div>
        ))}
      </div>
    </OSPage>
  );
};
export default OSDiscussions;
