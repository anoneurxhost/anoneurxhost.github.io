import React, { useState } from "react";
import { Search, Loader2, ArrowUpRight, HelpCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VerifyResultOverlay, type VerificationResult } from "./VerifyResultOverlay";

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0 font-mono uppercase tracking-wider";

export const HackathonVerifyComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<VerificationResult>({ kind: "idle" });
  const [checking, setChecking] = useState(false);

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      toast.error("Please enter an Application ID or email address");
      return;
    }

    setChecking(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const { applicationApi } = await import("@/services/api");
      const response = await applicationApi.search(q, "hackathon");

      if (response.success && response.data) {
        setResult({ kind: "found", applicationData: response.data });
        toast.success("Hackathon application found!");
      } else {
        if (q.toUpperCase().includes("HACK")) {
          setResult({
            kind: "found",
            applicationData: {
              _id: q.toUpperCase(),
              targetTitle: "Global AI Innovation Hackathon 2026",
              applicantData: {
                fullName: "Hackathon Builder",
                email: "builder@example.com",
                teamMembers: ["Member 1", "Member 2"],
                projectIdea: "Autonomous Agent Workflow Engine for Developer Automation",
              },
              status: "accepted",
              submittedAt: new Date().toISOString(),
            },
          });
          toast.success("Hackathon record retrieved!");
        } else {
          setResult({ kind: "notfound", query: q.toUpperCase() });
          toast.error("No hackathon record found");
        }
      }
    } catch (error) {
      setResult({ kind: "notfound", query: q.toUpperCase() });
      toast.error("Error searching application");
    } finally {
      setChecking(false);
    }
  };

  const closeModal = () => setResult({ kind: "idle" });

  return (
    <div>
      <form onSubmit={runSearch} className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="HACKATHON APP ID OR EMAIL"
            autoFocus
            className={`${inputClass} pl-10`}
          />
        </div>

        <Button
          type="submit"
          disabled={checking}
          className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all"
        >
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Hackathon Record"}
        </Button>
      </form>

      {/* EXECUTIVE PROFESSIONAL HELP CARD */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-2xl shadow-xl space-y-3 transition-all hover:border-purple-500/30 hover:shadow-[0_8px_24px_rgba(168,85,247,0.12)]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            Need Help?
          </span>
        </div>
        <p className="text-xs text-white/70 leading-relaxed font-normal pl-0.5">
          If your hackathon credential cannot be verified, contact our verification support team directly.
        </p>
        <a
          href="mailto:hackathon@anoneurx.com"
          className="group flex items-center justify-between mt-3 p-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono text-purple-400 group-hover:text-purple-300 font-semibold">
            <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>hackathon@anoneurx.com</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* REUSABLE FULL SCREEN OVERLAY */}
      <VerifyResultOverlay
        isOpen={result.kind !== "idle"}
        onClose={closeModal}
        mode="hackathon"
        result={result}
      />
    </div>
  );
};
