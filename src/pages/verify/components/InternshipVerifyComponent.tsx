import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2, ArrowUpRight, HelpCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { internProfiles } from "@/data/internProfiles";
import { VerifyResultOverlay, type VerificationResult } from "./VerifyResultOverlay";

const isValidQuery = (q: string) =>
  /^[a-z0-9-]{3,30}$/i.test(q.trim()) ||
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.trim());

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0 font-mono uppercase tracking-wider";

export const InternshipVerifyComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const docParam = searchParams.get("doc") || searchParams.get("q") || searchParams.get("id") || "";
  const [query, setQuery] = useState(docParam.toUpperCase());
  const [result, setResult] = useState<VerificationResult>({ kind: "idle" });
  const [checking, setChecking] = useState(false);

  const runSearch = async (raw: string) => {
    const q = raw.trim();
    if (!q) {
      toast.error("Please enter an intern ID, application ID, or email address");
      return;
    }
    if (!isValidQuery(q)) {
      setResult({ kind: "invalid" });
      return;
    }

    setChecking(true);
    try {
      const intern = internProfiles.find(
        (p) =>
          p.internId.toLowerCase() === q.toLowerCase() ||
          (p.email || "").toLowerCase() === q.toLowerCase()
      );

      if (intern) {
        setResult({ kind: "found", intern });
        toast.success("Intern record verified!");
        return;
      }

      try {
        const { applicationApi } = await import("@/services/api");
        const response = await applicationApi.search(q, "internship");

        if (response.success && response.data) {
          setResult({ kind: "found", applicationData: response.data });
          toast.success("Internship application record found!");
          return;
        }
      } catch (e) {
        console.warn("API Search fallback failed", e);
      }

      setResult({ kind: "notfound", query: q.toUpperCase() });
      toast.error("No record found matching query");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (docParam) runSearch(docParam);
  }, []);

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const closeModal = () => setResult({ kind: "idle" });

  return (
    <div>
      <form onSubmit={verify} className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="INTERN ID OR EMAIL"
            autoFocus
            className={`${inputClass} pl-10`}
          />
        </div>

        <Button
          type="submit"
          disabled={checking}
          className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all"
        >
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Internship"}
        </Button>
      </form>

      {/* EXECUTIVE PROFESSIONAL HELP CARD */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-2xl shadow-xl space-y-3 transition-all hover:border-blue-500/30 hover:shadow-[0_8px_24px_rgba(59,130,246,0.12)]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
            Need Help?
          </span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed font-normal pl-0.5">
          If your internship credential cannot be verified, contact our verification support team directly.
        </p>
        <a
          href="mailto:internship@anoneurx.com"
          className="group flex items-center justify-between mt-3 p-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono text-blue-400 group-hover:text-blue-300 font-semibold">
            <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>internship@anoneurx.com</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* REUSABLE FULL SCREEN OVERLAY */}
      <VerifyResultOverlay
        isOpen={result.kind !== "idle"}
        onClose={closeModal}
        mode="internship"
        result={result}
      />
    </div>
  );
};
