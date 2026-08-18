import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Search,
  Upload,
  CheckCircle2,
  Link2,
  Loader2,
  ShieldCheck,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { usePortal } from "../PortalContext";
import { getModuleById } from "../portal.config";
import { EmptyState } from "../components/ui";
import { useOfferLetterDownload, OfferLetterSheet } from "../internship/OfferLetter";
import { downloadDocumentPdf, downloadDocumentBundle } from "../Documents";
import type { ProgramDocument, ProgramId, DocumentTrack } from "../types";

export const trackLabel = (track: DocumentTrack) =>
  track === "organization" ? "Organization" : getModuleById(track)?.name ?? track;


const typeStyle: Record<string, string> = {
  "Offer Letter": "from-emerald-500 to-teal-500",
  "Completion Certificate": "from-blue-500 to-cyan-500",
  "Experience Letter": "from-purple-500 to-fuchsia-500",
  "Participation Certificate": "from-indigo-500 to-violet-500",
  "Winner Certificate": "from-amber-500 to-yellow-500",
  Transcript: "from-sky-500 to-blue-500",
  "Enrollment Letter": "from-cyan-500 to-teal-500",
  "Fee Receipt": "from-lime-500 to-emerald-500",
  "Submission Receipt": "from-fuchsia-500 to-pink-500",
  Agreement: "from-rose-500 to-red-500",
  Policy: "from-slate-500 to-slate-400",
  Evaluation: "from-amber-500 to-orange-500",
  Upload: "from-slate-600 to-slate-500",
};

const statusStyle: Record<string, string> = {
  issued: "bg-white/10 text-slate-300 border-white/15",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  verified: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

type SortKey = "recent" | "name" | "status";

const timeValue = (issuedOn: string) => {
  const t = Date.parse(issuedOn);
  return Number.isNaN(t) ? -1 : t;
};

interface Props {
  /** Restrict the workspace to one program. Omit for the unified library. */
  program?: ProgramId;
}

export const DocumentsWorkspace: React.FC<Props> = ({ program }) => {
  const { data, addDocument } = usePortal();
  const { toast } = useToast();
  const { sheetRef, downloading, downloadOfferLetter } = useOfferLetterDownload();
  const fileInput = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("recent");
  const [active, setActive] = useState<ProgramDocument | null>(null);

  const scoped = useMemo(
    () => (program ? data.documents.filter((d) => d.program === program) : data.documents),
    [data.documents, program],
  );

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(scoped.map((d) => d.type)))],
    [scoped],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = scoped.filter((d) => {
      if (!program && programFilter !== "all" && d.program !== programFilter) return false;
      if (category !== "all" && d.type !== category) return false;
      if (status !== "all" && d.status !== status) return false;
      if (
        q &&
        !`${d.name} ${d.type} ${d.description} ${d.issuer} ${d.verificationId}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "status") sorted.sort((a, b) => a.status.localeCompare(b.status));
    else sorted.sort((a, b) => timeValue(b.issuedOn) - timeValue(a.issuedOn));
    return sorted;
  }, [scoped, query, programFilter, category, status, sort, program]);

  const counts = useMemo(
    () => ({
      total: scoped.length,
      verified: scoped.filter((d) => d.status === "verified").length,
      issued: scoped.filter((d) => d.status === "issued").length,
      pending: scoped.filter((d) => d.status === "pending").length,
    }),
    [scoped],
  );

  const handleDownload = (doc: ProgramDocument) => {
    if (doc.status === "pending") return;
    if (doc.id === "d1") {
      downloadOfferLetter();
      return;
    }
    downloadDocumentPdf(doc);
    toast({ title: "Download started", description: `${doc.name}.pdf` });
  };

  const copyVerifyLink = async (doc: ProgramDocument) => {
    const url = `${window.location.origin}/verify?mode=internship&doc=${doc.verificationId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Verification link copied", description: doc.verificationId });
    } catch {
      toast({ title: "Copy failed", description: url, variant: "destructive" });
    }
  };

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    addDocument({
      name: file.name,
      program: program ?? "internship",
      type: "Upload",
      status: "issued",
      issuedOn: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      description: "Supporting document uploaded from your device.",
      issuer: "You",
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      uploaded: true,
    });
    toast({ title: "Document added", description: file.name });
    event.target.value = "";
  };

  const resetFilters = () => {
    setQuery("");
    setProgramFilter("all");
    setCategory("all");
    setStatus("all");
    setSort("recent");
  };

  const filtersActive =
    !!query || programFilter !== "all" || category !== "all" || status !== "all";

  const downloadableDocs = useMemo(
    () => filtered.filter((d) => d.status !== "pending"),
    [filtered],
  );

  const downloadAll = () => {
    if (downloadableDocs.length === 0) return;
    downloadDocumentBundle(downloadableDocs, {
      title: program
        ? `${trackLabel(program)} Document Bundle`
        : "Anoneurx Document Bundle",
      participant: downloadableDocs[0].participant,
      participantId: downloadableDocs[0].participantId,
    });
    toast({
      title: "Bundle generated",
      description: `${downloadableDocs.length} documents exported as one branded PDF.`,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <p>
          Showing {filtered.length} of {scoped.length} document
          {scoped.length === 1 ? "" : "s"}
        </p>
        {filtersActive && (
          <button onClick={resetFilters} className="inline-flex items-center gap-1 hover:text-white">
            <X className="h-3 w-3" /> Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents match those filters"
          description="Try a different search term, category or status."
        />
      ) : (
        <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {filtered.map((doc) => (
            <motion.button
              key={doc.id}
              type="button"
              whileHover={{ x: 3 }}
              onClick={() => setActive(doc)}
              className="w-full text-left flex items-center gap-4 px-4 sm:px-5 py-4 hover:bg-white/[0.05] transition-colors"
            >
              <div
                className={cn(
                  "h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg shrink-0",
                  typeStyle[doc.type] ?? "from-slate-500 to-slate-400",
                )}
              >
                <FileText className="h-5 w-5 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white text-sm truncate">{doc.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {doc.type} · {trackLabel(doc.program)} · Issued {doc.issuedOn}
                </p>
              </div>

              <span className="hidden lg:block text-[11px] font-mono text-slate-500 shrink-0">
                {doc.verificationId}
              </span>

              <Badge className={cn(statusStyle[doc.status], "shrink-0")}>
                {doc.status === "verified" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : null}
                {doc.status}
              </Badge>

              <Download
                className={cn(
                  "h-4 w-4 shrink-0",
                  doc.status === "pending" ? "text-slate-700" : "text-slate-400",
                )}
              />
            </motion.button>
          ))}
        </div>

      )}

      <Sheet open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <SheetContent className="glass-dark border-white/10 text-white w-full sm:max-w-md overflow-y-auto">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="text-white">{active.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-5 space-y-4">
                <Badge className={statusStyle[active.status]}>{active.status}</Badge>
                <p className="text-sm text-slate-300">{active.description}</p>
                <dl className="space-y-2 text-sm">
                  {[
                    ["Program", trackLabel(active.program)],
                    ["Category", active.type],
                    ["Issued on", active.issuedOn],
                    ["Issued by", active.issuer],
                    ["Verification ID", active.verificationId],
                    ["Size", active.sizeKb ? `${active.sizeKb} KB` : "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="text-sm text-white text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
                    disabled={active.status === "pending"}
                    onClick={() => handleDownload(active)}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/15 text-slate-300 hover:bg-white/10"
                    onClick={() => copyVerifyLink(active)}
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
                {active.status === "pending" && (
                  <p className="text-xs text-amber-300/80">
                    This document becomes downloadable once it is issued.
                  </p>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <div aria-hidden className="pointer-events-none fixed left-[-2000px] top-0">
        <OfferLetterSheet ref={sheetRef} />
      </div>
    </div>
  );
};

export default DocumentsWorkspace;
