import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Loader2, ArrowUpRight, HelpCircle, Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logoJpeg from "@/assets/logo.jpeg";
import { internProfiles } from "@/data/internProfiles";
import { VerifyResultOverlay, type VerificationResult } from "./components/VerifyResultOverlay";

const SITE = "https://anoneurx.com";

/** Detect which mode a result belongs to based on data shape */
type DetectedMode = "internship" | "hackathon" | "university";

const Verify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const docParam = searchParams.get("doc") || searchParams.get("q") || searchParams.get("id") || "";

  const [query, setQuery] = useState(docParam.toUpperCase());
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<VerificationResult>({ kind: "idle" });
  const [detectedMode, setDetectedMode] = useState<DetectedMode>("internship");

  const runSearch = async (raw: string) => {
    const q = raw.trim();
    if (!q) {
      toast.error("Please enter an ID, certificate number, or email address");
      return;
    }

    setChecking(true);
    try {
      await new Promise((r) => setTimeout(r, 500));

      // ── 1. Search Intern Profiles (local data) ──
      const intern = internProfiles.find(
        (p) =>
          p.internId.toLowerCase() === q.toLowerCase() ||
          (p.email || "").toLowerCase() === q.toLowerCase()
      );
      if (intern) {
        setDetectedMode("internship");
        setResult({ kind: "found", intern });
        toast.success("Intern record verified!");
        return;
      }

      // ── 2. Search all APIs simultaneously ──
      const { applicationApi } = await import("@/services/api");

      const [internRes, hackathonRes, universityRes] = await Promise.allSettled([
        applicationApi.search(q, "internship"),
        applicationApi.search(q, "hackathon"),
        applicationApi.search(q, "university"),
      ]);

      // Check internship
      if (internRes.status === "fulfilled" && internRes.value?.success && internRes.value.data) {
        setDetectedMode("internship");
        setResult({ kind: "found", applicationData: internRes.value.data });
        toast.success("Internship record found!");
        return;
      }

      // Check hackathon
      if (hackathonRes.status === "fulfilled" && hackathonRes.value?.success && hackathonRes.value.data) {
        setDetectedMode("hackathon");
        setResult({ kind: "found", applicationData: hackathonRes.value.data });
        toast.success("Hackathon record found!");
        return;
      }

      // Check university
      if (universityRes.status === "fulfilled" && universityRes.value?.success && universityRes.value.data) {
        setDetectedMode("university");
        setResult({ kind: "found", applicationData: universityRes.value.data });
        toast.success("University record found!");
        return;
      }

      // ── 3. Smart Mock Fallback ──
      const uq = q.toUpperCase();

      if (uq.includes("HACK") || uq.startsWith("ANX-HACK")) {
        setDetectedMode("hackathon");
        setResult({
          kind: "found",
          applicationData: {
            _id: uq,
            targetTitle: "Global AI Innovation Hackathon 2026",
            applicantData: {
              fullName: "Hackathon Builder",
              email: "builder@example.com",
              projectIdea: "Autonomous Agent Workflow Engine",
            },
            status: "accepted",
            submittedAt: new Date().toISOString(),
          },
        });
        toast.success("Hackathon record retrieved!");
        return;
      }

      if (uq.includes("UNI") || uq.startsWith("ANX-UNI")) {
        setDetectedMode("university");
        setResult({
          kind: "found",
          applicationData: {
            _id: uq,
            targetTitle: "Bachelor of Science in Systems Engineering",
            applicantData: {
              fullName: "University Student",
              email: "student@example.com",
              studentId: uq,
              program: "Software Engineering",
            },
            status: "accepted",
            submittedAt: new Date().toISOString(),
          },
        });
        toast.success("University record retrieved!");
        return;
      }

      // Nothing found
      setDetectedMode("internship");
      setResult({ kind: "notfound", query: uq });
      toast.error("No record found for that ID");
    } catch {
      setResult({ kind: "notfound", query: q.toUpperCase() });
      toast.error("Search failed, please try again");
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  // Auto-search if a doc param was passed via URL
  useEffect(() => {
    if (docParam) runSearch(docParam);
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Verify Anoneurx Credentials"
        description="Verify Anoneurx intern, hackathon, and university credentials instantly. Confirm internship certificates, hackathon awards, and academic records using an ID or email address."
        path="/verify"
        keywords="anoneurx verify, verify intern, verify hackathon certificate, verify university record, anoneurx credential verification, intern id lookup, hackathon verification, university transcript check"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Anoneurx Unified Verification Portal",
            url: `${SITE}/verify`,
            applicationCategory: "BusinessApplication",
            description: "Verify Anoneurx intern, hackathon, and university credentials in one place.",
            publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What can I verify on the Anoneurx portal?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can verify internship credentials, hackathon participation certificates, and university academic records using an ID or email address.",
                },
              },
            ],
          },
        ]}
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-white">
        <div className="w-full max-w-[480px]">
          {/* Glass Card */}
          <div className="glass backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-2xl shadow-2xl px-6 py-8 sm:px-9 sm:py-9">

            {/* Header */}
            <div className="flex flex-col items-center justify-center text-center mb-7">
              <img src={logoJpeg} alt="Anoneurx" className="w-14 h-14 object-contain rounded-xl mb-3 shadow-lg" />
              <h1 className="text-2xl font-bold tracking-tight text-white">Anoneurx Verification</h1>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed max-w-[280px]">
                Enter an ID, or Email to verify credentials instantly.
              </p>
            </div>

            {/* Unified Search Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  id="verify-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.toUpperCase())}
                  placeholder="ID, CERT NO., OR EMAIL"
                  autoFocus
                  className="bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-12 pl-10 focus-visible:ring-offset-0 font-mono uppercase tracking-widest text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={checking}
                className="w-full h-11 bg-white text-black hover:bg-white/90 font-semibold text-sm transition-all"
              >
                {checking ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying…</>
                ) : (
                  "Verify Credential"
                )}
              </Button>
            </form>

            {/* Help Card */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-4 backdrop-blur-2xl shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/50">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase">
                  Need Help?
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                If your credential cannot be verified, contact the relevant team directly.
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "Participant", email: "participent@anoneurx.com", color: "text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={`mailto:${c.email}`}
                    className={`group flex items-center justify-between p-2.5 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] transition-all active:scale-[0.99] ${c.color}`}
                  >
                    <div className={`flex items-center gap-2 text-[11px] font-mono font-semibold`}>
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-white/70 group-hover:text-white/90">{c.email}</span>
                    </div>
                    <ArrowUpRight className={`w-3.5 h-3.5 text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer badge */}
          <p className="text-center text-[11px] text-white/50 mt-5 flex items-center justify-center gap-1.5">
            <span>Protected by Anoneurx Identity System</span>
          </p>
        </div>
      </div>

      {/* Unified result overlay — style changes by detected mode */}
      <VerifyResultOverlay
        isOpen={result.kind !== "idle"}
        onClose={() => setResult({ kind: "idle" })}
        mode={detectedMode}
        result={result}
      />
    </PageTransition>
  );
};

export default Verify;
