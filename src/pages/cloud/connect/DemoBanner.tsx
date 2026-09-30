import { Info } from "lucide-react";
import { isLiveBackend } from "./api";

/** Shown when a section renders demo data instead of live agent data. */
const DemoBanner = () => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.08] px-4 py-3 text-xs text-amber-700 dark:text-amber-300">
    <Info className="w-4 h-4 mt-0.5 shrink-0" />
    {isLiveBackend() ? (
      <p>
        <span className="font-semibold">Live data unavailable.</span> The Blacklink console
        backend didn't respond for this section — showing demo data. Re-check your connection and
        credentials.
      </p>
    ) : (
      <p>
        <span className="font-semibold">Demo data.</span> Set{" "}
        <code className="font-mono text-amber-700 dark:text-amber-200">VITE_CONNECT_API_URL</code> to your deployed
        Blacklink console backend (see <code className="font-mono text-amber-700 dark:text-amber-200">/server</code>) to
        drive real servers, scans, SSH keys and webhooks.
      </p>
    )}
  </div>
);

export default DemoBanner;