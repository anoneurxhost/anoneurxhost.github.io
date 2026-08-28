import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
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
  Trophy,
  Download,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { type InternProfile } from "@/data/internProfiles";

export type VerificationResult =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "notfound"; query: string }
  | { kind: "found"; intern?: InternProfile; applicationData?: any };

interface VerifyResultOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "internship" | "hackathon" | "university";
  result: VerificationResult;
}

export const VerifyResultOverlay: React.FC<VerifyResultOverlayProps> = ({
  isOpen,
  onClose,
  mode,
  result,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadHackathonCertificate = async () => {
    if (result.kind !== "found" || !result.applicationData) return;
    setDownloading(true);
    try {
      const { generateHackathonCertificateDoc } = await import(
        "@/pages/portal/Documents/hackathon"
      );
      const appData = result.applicationData;
      const pdf = await generateHackathonCertificateDoc({
        name: appData.name || appData.applicantData?.fullName || "Participant",
        type: "hackathon-certificate",
        status: appData.status || "accepted",
        issuedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        description: "Official hackathon achievement certificate",
        verificationId: appData._id || appData.applicationId,
        participantName: appData.name || appData.applicantData?.fullName || "Participant",
        hackathonName: appData.targetTitle || appData.program || "ANONEURX GLOBAL HACKATHON 2026",
        projectName: appData.applicantData?.projectIdea || appData.project,
        teamName: appData.applicantData?.teamName || appData.teamName,
        awardRank: appData.awardRank || "Participant",
      });
      pdf.save(`hackathon-certificate-${Date.now()}.pdf`);
      toast.success("Certificate downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate certificate");
    } finally {
      setDownloading(false);
    }
  };
  if (!isOpen || result.kind === "idle") return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "completed":
      case "active":
        return "bg-green-600/30 text-green-300 border-green-500/40";
      case "shortlisted":
        return "bg-blue-600/30 text-blue-300 border-blue-500/40";
      case "under_review":
      case "under review":
        return "bg-amber-600/30 text-amber-300 border-amber-500/40";
      case "rejected":
        return "bg-red-600/30 text-red-300 border-red-500/40";
      default:
        return "bg-gray-600/30 text-gray-300 border-gray-500/40";
    }
  };

  const modeThemes = {
    internship: {
      color: "emerald",
      icon: BadgeCheck,
      title: "Verified Intern Record",
      badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      contactEmail: "internship@anoneurx.com",
    },
    hackathon: {
      color: "purple",
      icon: Trophy,
      title: "Verified Hackathon Record",
      badgeColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
      contactEmail: "hackathon@anoneurx.com",
    },
    university: {
      color: "blue",
      icon: GraduationCap,
      title: "Verified University Record",
      badgeColor: "text-blue-400 border-blue-500/20 bg-blue-500/10",
      contactEmail: "university@anoneurx.com",
    },
  };

  const currentTheme = modeThemes[mode];
  const ModeIcon = currentTheme.icon;

  const overlayContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl my-auto overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/95 backdrop-blur-3xl p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.9)] text-white"
        >
          {/* ── INVALID FORMAT ── */}
          {result.kind === "invalid" && (
            <div className="space-y-4 pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <AlertTriangle className="h-4 w-4" /> Invalid Format
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Format Unrecognized</h2>
              <p className="text-sm text-white/70 leading-relaxed">
                Please verify your reference code or registered email address format and try again.
              </p>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* ── NOT FOUND ── */}
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
                to an active or archived record.
              </p>
              <p className="text-xs text-white/50">
                If you could not verify, please contact:{" "}
                <a href={`mailto:${currentTheme.contactEmail}`} className="text-blue-400 underline font-medium">
                  {currentTheme.contactEmail}
                </a>
              </p>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ── FOUND: INTERN PROFILE ── */}
          {result.kind === "found" && result.intern && (
            <div className="space-y-5">
              {/* Header row */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 pr-8">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <BadgeCheck className="h-5 w-5" />
                  <span className="text-base font-bold">Verified Record</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full">
                  {result.intern.status}
                </span>
              </div>

              {/* Photo + Name block */}
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={result.intern.photo}
                    alt={result.intern.name}
                    className="h-[72px] w-[72px] rounded-xl border border-white/10 object-cover shadow-lg"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                    {result.intern.name}
                  </h2>
                  <p className="text-xs text-white/60 font-medium mt-0.5">{result.intern.department} Intern</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      ID: {result.intern.internId}
                    </span>
                    {result.intern.email && (
                      <span className="text-[11px] text-white/40 truncate max-w-[180px]">
                        {result.intern.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {result.intern.bio && (
                <p className="text-[12px] text-white/70 leading-relaxed border-t border-white/[0.08] pt-3">
                  {result.intern.bio}
                </p>
              )}

              {/* 2×2 Info grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: CalendarDays, label: "Batch", value: result.intern.batch },
                  { icon: ShieldCheck, label: "Status", value: result.intern.status },
                  { icon: GraduationCap, label: "Institution", value: result.intern.university || "Anoneurx Academy" },
                  { icon: MapPin, label: "Location", value: result.intern.location || "Remote / On-site" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3"
                  >
                    <dt className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                      <row.icon className="h-3 w-3 text-emerald-400/80" />
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[12px] font-semibold text-white/90 truncate">{row.value}</dd>
                  </div>
                ))}
              </div>

              {/* Service Record */}
              {result.intern.history && result.intern.history.length > 0 && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
                    <Briefcase className="h-3 w-3 text-emerald-400/80" />
                    Internship Service Record
                  </div>
                  {result.intern.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <div className="text-white/80">
                        <span className="font-semibold text-white">{h.role}</span>
                        <span className="text-white/30 mx-1">·</span>
                        <span className="text-white/60">{h.department}</span>
                      </div>
                      <div className="text-[10px] text-white/40 text-right">
                        {h.duration}
                        {h.mentor && ` · Mentor: ${h.mentor}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Honors */}
              {result.intern.badges && result.intern.badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-white/40">
                    <Award className="h-3 w-3 text-amber-400/80" />
                    Honors:
                  </span>
                  {result.intern.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer actions */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                <Link
                  to={`/intern/${result.intern.internId}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-black text-xs font-bold px-4 py-2.5 transition-all shadow-md"
                >
                  View Public Profile
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* ── FOUND: HACKATHON / APPLICATION DATA ── */}
          {result.kind === "found" && result.applicationData && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 pr-8">
                <div className="flex items-center gap-2 font-semibold">
                  <ModeIcon className={`h-6 w-6 ${currentTheme.badgeColor.split(" ")[0]}`} />
                  <span className="text-lg text-white">{currentTheme.title}</span>
                </div>
                <Badge className={`border px-3 py-1 text-xs font-bold ${getStatusColor(result.applicationData.status)}`}>
                  {result.applicationData.status?.replace("_", " ")?.toUpperCase() || "SUBMITTED"}
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Application ID</p>
                  <p className="mt-1 text-sm font-mono font-semibold text-white">
                    {result.applicationData._id || result.applicationData.applicationId}
                  </p>
                </div>
                <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Event / Program</p>
                  <p className="mt-1 text-sm font-semibold text-white truncate">
                    {result.applicationData.targetTitle || result.applicationData.program || "Global AI Innovation Hackathon"}
                  </p>
                </div>
                <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Participant / Lead</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {result.applicationData.name || result.applicationData.applicantData?.fullName || "Candidate"}
                  </p>
                </div>
                <div className="p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
                  <p className="mt-1 text-sm font-semibold text-white truncate">
                    {result.applicationData.email || result.applicationData.applicantData?.email || "N/A"}
                  </p>
                </div>
              </div>

              {mode === "hackathon" && result.applicationData.status === "accepted" && (
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                    <Award className="h-4 w-4" />
                    <span>Hackathon Certificate Verified</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Your hackathon submission has been verified in the Anoneurx registry. Download your official PDF certificate.
                  </p>
                  <Button
                    onClick={handleDownloadHackathonCertificate}
                    disabled={downloading}
                    className="mt-2 bg-purple-600 hover:bg-purple-500 text-white text-xs h-9"
                  >
                    {downloading ? (
                      <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Generating…</>
                    ) : (
                      <><Download className="w-3.5 h-3.5 mr-1.5" /> Download Certificate</>
                    )}
                  </Button>
                </div>
              )}

              {mode === "university" && result.applicationData.status === "accepted" && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-blue-300 font-semibold text-sm">
                    <GraduationCap className="h-4 w-4" />
                    <span>University Record Verified</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Academic record verified in the Anoneurx University registry.
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return ReactDOM.createPortal(overlayContent, document.body);
};
