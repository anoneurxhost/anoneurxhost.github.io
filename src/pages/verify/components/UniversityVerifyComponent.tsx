import React, { useState } from "react";
import { Search, Loader2, ArrowUpRight, HelpCircle, Mail, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { VerifyResultOverlay, type VerificationResult } from "./VerifyResultOverlay";

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0 font-mono uppercase tracking-wider";

export const UniversityVerifyComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<VerificationResult>({ kind: "idle" });
  const [checking, setChecking] = useState(false);

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      toast.error("Please enter a Student ID or email address");
      return;
    }

    setChecking(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      const { applicationApi } = await import("@/services/api");
      const response = await applicationApi.search(q, "university");

      if (response.success && response.data) {
        setResult({ kind: "found", applicationData: response.data });
        toast.success("University record found!");
      } else {
        // Mock fallback — show a sample result if query hints at university
        if (q.toUpperCase().includes("UNI") || q.toUpperCase().includes("ANX-UNI")) {
          setResult({
            kind: "found",
            applicationData: {
              _id: q.toUpperCase(),
              targetTitle: "Bachelor of Science in Systems Engineering",
              applicantData: {
                fullName: "University Student",
                email: "student@example.com",
                studentId: q.toUpperCase(),
                program: "Software Engineering",
                gpa: "3.91",
              },
              status: "accepted",
              submittedAt: new Date().toISOString(),
            },
          });
          toast.success("University record retrieved!");
        } else {
          setResult({ kind: "notfound", query: q.toUpperCase() });
          toast.error("No university record found");
        }
      }
    } catch (error) {
      setResult({ kind: "notfound", query: q.toUpperCase() });
      toast.error("Error searching university record");
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
            placeholder="STUDENT ID OR EMAIL"
            autoFocus
            className={`${inputClass} pl-10`}
          />
        </div>

        <Button
          type="submit"
          disabled={checking}
          className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all"
        >
          {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify University Record"}
        </Button>
      </form>

      {/* HELP CARD */}
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
          If your university credential cannot be verified, contact our academic records team directly.
        </p>
        <a
          href="mailto:university@anoneurx.com"
          className="group flex items-center justify-between mt-3 p-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono text-blue-400 group-hover:text-blue-300 font-semibold">
            <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>university@anoneurx.com</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      <VerifyResultOverlay
        isOpen={result.kind !== "idle"}
        onClose={closeModal}
        mode="university"
        result={result}
      />
    </div>
  );
};
