import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  Search,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  GraduationCap,
  CalendarDays,
  MapPin,
  ExternalLink,
  Award,
  Briefcase,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { internProfiles, type InternProfile } from "@/data/internProfiles";
import logoJpeg from "@/assets/logo.jpeg";

type Result =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "notfound"; query: string }
  | { kind: "found"; intern: InternProfile };

/**
 * Flexible validation: supports alphanumeric intern IDs (e.g. ANX26INTSE044, ANX-SE-44)
 * as well as registered email addresses.
 */
const isValidQuery = (q: string) =>
  /^[a-z0-9-]{3,24}$/i.test(q.trim()) ||
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.trim());

const inputClass =
  "bg-white/[0.06] border-white/15 text-white placeholder:text-gray-500 h-11 focus-visible:ring-offset-0 font-mono uppercase tracking-wider";

const InternVerify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const docParam = searchParams.get("doc") || searchParams.get("q") || "";
  const [query, setQuery] = useState(docParam.toUpperCase());
  const [result, setResult] = useState<Result>({ kind: "idle" });
  const [checking, setChecking] = useState(false);

  const runSearch = (raw: string) => {
    const q = raw.trim();
    if (!q) {
      toast.error("Enter an intern ID or email address");
      return;
    }
    if (!isValidQuery(q)) {
      setResult({ kind: "invalid" });
      return;
    }
    setChecking(true);
    setTimeout(() => {
      const intern = internProfiles.find(
        (p) =>
          p.internId.toLowerCase() === q.toLowerCase() ||
          (p.email || "").toLowerCase() === q.toLowerCase(),
      );
      setResult(intern ? { kind: "found", intern } : { kind: "notfound", query: q.toUpperCase() });
      setChecking(false);
    }, 450);
  };

  useEffect(() => {
    if (docParam) runSearch(docParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/intern/${id}`);
    toast.success("Verification link copied to clipboard");
  };

  const closeModal = () => {
    setResult({ kind: "idle" });
  };

  return (
    <PageTransition>
      <SEO
        title="Verify Anoneurx Intern — Internship Verification Portal"
        description="Verify an Anoneurx intern instantly. Confirm internship credentials, department, batch, status, certificates and service records using an intern ID or email address."
        path="/intern/verify"
        keywords="anoneurx intern, anoneurx internship, verify intern, internship verification, intern verification, anoneurx intern verify, anoneurx internship certificate, verify internship certificate, anoneurx intern id, intern status check, anoneurx intern records, verify intern credentials, anoneurx internship program, anoneurx intern directory, check intern status, anoneurx intern batch, anoneurx intern department, verify anoneurx employee, anoneurx intern proof, intern badge verification, anoneurx academy intern, anoneurx intern confirmation, internship record lookup, verify intern online, anoneurx intern portal"
      />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-white">
        <div className="w-full max-w-[440px]">
          {/* Auth-style Glass Card Container */}
          <div className="glass backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-2xl shadow-2xl px-7 py-9 sm:px-10">
            {/* Header Logo */}
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <img src={logoJpeg} alt="Anoneurx" className="w-16 h-16 object-contain rounded-xl mb-2" />
              <div className="text-xl font-brand tracking-wider text-white font-semibold">Anoneurx</div>
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white mb-1.5 text-center">Verify Anoneurx Intern</h1>
              <p className="text-sm text-gray-400 mb-6 text-center">
                Enter an intern ID or email address to authenticate.
              </p>
            </div>

            <form onSubmit={verify} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    id="verify-q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toUpperCase())}
                    placeholder="INTERN ID"
                    autoFocus
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={checking}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Record"}
              </Button>
            </form>
          </div>

          <p className="text-center text-[11px] text-white/80 mt-6 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected by Anoneurx Identity</span>
          </p>
        </div>

        {/* ─── OVERLAY MODAL FOR SEARCH RESULTS (invalid / notfound / found) ─── */}
        <AnimatePresence>
          {result.kind !== "idle" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl my-auto overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-white"
              >

                {/* 1. Invalid Reference Modal View */}
                {result.kind === "invalid" && (
                  <div className="space-y-4 pt-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                      <AlertTriangle className="h-4 w-4" /> Invalid Reference
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Format Unrecognized</h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Intern IDs follow the format{" "}
                      <span className="font-mono text-amber-200 bg-amber-500/20 px-2 py-0.5 rounded">
                        ID (track - batch - department)
                      </span>{" "}
                      You can also search using the intern's registered email address.
                    </p>
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={closeModal}
                        className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Not Found Modal View */}
                {result.kind === "notfound" && (
                  <div className="space-y-4 pt-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-300">
                      <XCircle className="h-4 w-4" /> No Match Found
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Record Not Found</h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                      We could not match{" "}
                      <span className="font-mono text-red-200 bg-red-500/20 px-2 py-0.5 rounded">
                        {result.query}
                      </span>{" "}
                      to an active or archived Anoneurx internship record.
                    </p>
                    <p className="text-xs text-white/50">
                      Need manual assistance? Contact People Operations at{" "}
                      <a href="mailto:hello@anoneurx.com" className="text-primary underline font-medium">
                        hello@anoneurx.com
                      </a>.
                    </p>
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={closeModal}
                        className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Found Result Modal View */}
                {result.kind === "found" && (
                  <div className="space-y-6">
                    {/* Status Header Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4 pr-8">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <BadgeCheck className="h-6 w-6 text-emerald-400" />
                        <span className="text-lg">Verified Record</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                        <span>{result.intern.status.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Candidate Info Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      <div className="relative">
                        <img
                          src={result.intern.photo}
                          alt={`${result.intern.name}, Anoneurx ${result.intern.department} intern`}
                          className="h-24 w-24 rounded-2xl border-2 border-emerald-500/30 object-cover shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1 text-black shadow-md">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                          {result.intern.name}
                        </h2>
                        <p className="text-white/70 text-sm font-medium">{result.intern.department} Intern</p>
                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                            ID: {result.intern.internId}
                          </span>
                          {result.intern.email && (
                            <span className="text-xs text-white/50">{result.intern.email}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bio summary */}
                    {result.intern.bio && (
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                        {result.intern.bio}
                      </p>
                    )}

                    {/* Detailed Attributes Grid */}
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {[
                        { icon: CalendarDays, label: "Batch", value: result.intern.batch },
                        { icon: ShieldCheck, label: "Status", value: result.intern.status },
                        {
                          icon: GraduationCap,
                          label: "Institution",
                          value: result.intern.university || "Anoneurx Academy",
                        },
                        { icon: MapPin, label: "Location", value: result.intern.location || "Remote / On-site" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                        >
                          <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                            <row.icon className="h-3.5 w-3.5 text-emerald-400" /> {row.label}
                          </dt>
                          <dd className="mt-1 text-xs sm:text-sm font-semibold text-white/90 truncate">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* Internship History */}
                    {result.intern.history.length > 0 && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Internship Service Record</span>
                        </div>
                        <div className="divide-y divide-white/5 text-xs text-white/70">
                          {result.intern.history.map((h) => (
                            <div key={`${h.role}-${h.duration}`} className="py-2 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <div>
                                <span className="font-semibold text-white">{h.role}</span>
                                <span className="text-white/40 mx-1.5">·</span>
                                <span>{h.department}</span>
                              </div>
                              <div className="text-[11px] text-white/50">
                                {h.duration} · Mentor: {h.mentor}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Badges / Awards */}
                    {result.intern.badges.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="flex items-center gap-1 text-xs font-semibold text-white/40 mr-1">
                          <Award className="h-3.5 w-3.5 text-amber-400" /> Honors:
                        </span>
                        {result.intern.badges.map((b) => (
                          <Badge key={b} className="bg-amber-500/10 border-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/intern/${result.intern.internId}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400"
                        >
                          <span>View Public Profile</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        
                      </div>
                     
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default InternVerify;
