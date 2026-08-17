import { Info } from "lucide-react";

/** Shown when the standalone Rust console backend isn't reachable. */
const DemoBanner = () => (
  <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs text-amber-200/90">
    <Info className="w-4 h-4 mt-0.5 shrink-0" />
    <p>
      <span className="font-semibold">Demo data.</span> Set{" "}
      <code className="font-mono text-amber-100">VITE_CONNECT_API_URL</code> to your deployed Black Wall
      console backend (see <code className="font-mono text-amber-100">/server</code>) to drive real
      servers, scans, SSH keys and webhooks.
    </p>
  </div>
);

export default DemoBanner;