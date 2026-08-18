import React, { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Search,
  ShieldCheck,
  Download,
  Link2,
  CheckCircle2,
  Ban,
  Send,
  History,
  X,
  FileStack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { documentsStore, useDocumentsStore, DOCUMENT_OWNERS } from "@/pages/portal/documentsStore";
import { downloadDocumentPdf, downloadDocumentBundle } from "@/pages/portal/Documents";
import { downloadBulkCsv, downloadBulkPdf, toReportRows } from "./bulkIssueExport";
import type { DocumentStatus, ProgramDocument, DocumentTrack } from "@/pages/portal/types";
import BulkIssueDialog from "./BulkIssueDialog";

const TRACKS: Array<{ value: DocumentTrack | "all"; label: string }> = [
  { value: "all", label: "All modules" },
  { value: "university", label: "University" },
  { value: "internship", label: "Internship" },
  { value: "hackathon", label: "Hackathon" },
  { value: "organization", label: "Organization" },
];

const trackLabel = (track: DocumentTrack) =>
  TRACKS.find((t) => t.value === track)?.label ?? track;

const statusStyle: Record<string, string> = {
  issued: "bg-white/10 text-slate-300 border-white/15",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  verified: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  revoked: "bg-red-500/20 text-red-300 border-red-500/30",
};

const DashboardDocuments = () => {
  const documents = useDocumentsStore();
  const { toast } = useToast();

  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [owner, setOwner] = useState<string>("all");
  const [active, setActive] = useState<ProgramDocument | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkOpen, setBulkOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (track !== "all" && d.program !== track) return false;
      if (status !== "all" && d.status !== status) return false;
      if (owner !== "all" && d.participantId !== owner) return false;
      if (
        q &&
        !`${d.name} ${d.type} ${d.participant ?? ""} ${d.participantId ?? ""} ${d.issuer} ${d.verificationId}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
  }, [documents, query, track, status, owner]);

  const counts = useMemo(
    () => ({
      total: documents.length,
      verified: documents.filter((d) => d.status === "verified").length,
      pending: documents.filter((d) => d.status === "pending").length,
      uploads: documents.filter((d) => d.uploaded).length,
    }),
    [documents],
  );

  const setDocStatus = (doc: ProgramDocument, next: DocumentStatus) => {
    documentsStore.setStatus(doc.id, next, "Anoneurx Admin");
    setActive((prev) => (prev && prev.id === doc.id ? { ...prev, status: next } : prev));
    toast({ title: `Marked ${next}`, description: doc.name });
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

  const exportFiltered = () => {
    const exportable = filtered.filter((d) => d.status !== "pending");
    if (exportable.length === 0) {
      toast({ title: "Nothing to export", description: "No issued documents in this view." });
      return;
    }
    downloadDocumentBundle(exportable, { title: "Anoneurx Documents Register" });
    toast({ title: "Register exported", description: `${exportable.length} documents.` });
  };

  const allVisibleSelected =
    filtered.length > 0 && filtered.every((d) => selected.includes(d.id));

  const toggleAllVisible = () => {
    setSelected(allVisibleSelected ? [] : filtered.map((d) => d.id));
  };

  const toggleOne = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  const bulkStatus = (next: DocumentStatus) => {
    const count = documentsStore.setStatusMany(selected, next, "Anoneurx Admin", "Bulk action");
    setSelected([]);
    toast({ title: `${count} documents marked ${next}` });
  };

  const bulkDownload = () => {
    const docs = documents.filter((d) => selected.includes(d.id) && d.status !== "pending");
    if (docs.length === 0) {
      toast({ title: "Nothing to download", description: "Selected documents are still pending." });
      return;
    }
    downloadDocumentBundle(docs, { title: "Anoneurx Selected Documents" });
  };

  const selectedRows = () =>
    toReportRows(
      documents.filter((d) => selected.includes(d.id)),
      new Date().toISOString(),
      "Anoneurx Admin",
    );

  const exportSelectionCsv = () => {
    const rows = selectedRows();
    downloadBulkCsv(rows, "anoneurx-documents-selection");
    toast({ title: "CSV exported", description: `${rows.length} rows written.` });
  };

  const exportSelectionPdf = () => {
    const rows = selectedRows();
    downloadBulkPdf(rows, {
      title: "Document Operations Report",
      action: "Selection export",
      generatedAt: new Date().toLocaleString("en-US"),
      issuedBy: "Anoneurx Admin",
      issued: rows.length,
      skipped: 0,
      participants: new Set(rows.map((r) => r.participantId)).size,
    });
  };

  const filtersActive = !!query || track !== "all" || status !== "all" || owner !== "all";

  return (
    <DashboardLayout title="Documents">
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Administration</p>
          <h1 className="mt-1 text-2xl font-bold text-white">Documents Register</h1>
          <p className="mt-1 text-sm text-slate-400">
            Every document issued across University, Internship, Hackathon and Organization
            records — change status, verify, issue and export.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total documents", value: counts.total, icon: FileText },
            { label: "Verified", value: counts.verified, icon: ShieldCheck },
            { label: "Pending issue", value: counts.pending, icon: Send },
            { label: "Participant uploads", value: counts.uploads, icon: Download },
          ].map((s) => (
            <Card key={s.label} className="glass-dark border-white/10">
              <CardContent className="p-4">
                <s.icon className="h-4 w-4 text-slate-400" />
                <p className="mt-2 text-2xl font-bold text-white leading-none">{s.value}</p>
                <p className="mt-1 text-xs text-slate-400">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by participant, document, issuer or verification ID…"
              aria-label="Search documents register"
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={track} onValueChange={setTrack}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                {TRACKS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={owner} onValueChange={setOwner}>
              <SelectTrigger className="w-[190px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="Participant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All participants</SelectItem>
                {DOCUMENT_OWNERS.map((o) => (
                  <SelectItem key={o.participantId} value={o.participantId}>
                    {o.name} · {o.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-white/15 text-slate-200 hover:bg-white/10"
              onClick={exportFiltered}
            >
              <Download className="h-4 w-4 mr-2" /> Export register
            </Button>
            <Button
              className="bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
              onClick={() => setBulkOpen(true)}
            >
              <FileStack className="h-4 w-4 mr-2" /> Bulk issue
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing {filtered.length} of {documents.length} documents
          </p>
          {filtersActive && (
            <button
              className="inline-flex items-center gap-1 hover:text-white"
              onClick={() => {
                setQuery("");
                setTrack("all");
                setStatus("all");
                setOwner("all");
              }}
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#A91676]/30 bg-[#A91676]/10 p-3">
            <span className="text-sm font-semibold text-white">{selected.length} selected</span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-white/15 text-slate-200 hover:bg-white/10"
              onClick={() => bulkStatus("issued")}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" /> Issue
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
              onClick={() => bulkStatus("verified")}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Verify
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-red-500/30 text-red-300 hover:bg-red-500/10"
              onClick={() => bulkStatus("revoked")}
            >
              <Ban className="h-3.5 w-3.5 mr-1.5" /> Revoke
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-slate-300"
              onClick={bulkDownload}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Download bundle
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-slate-300"
              onClick={exportSelectionCsv}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-slate-300"
              onClick={exportSelectionPdf}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" /> Export PDF report
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-slate-400"
              onClick={() => setSelected([])}
            >
              Clear selection
            </Button>
          </div>
        )}

        <Card className="glass-dark border-white/10">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allVisibleSelected}
                      onCheckedChange={toggleAllVisible}
                      aria-label="Select all documents in view"
                    />
                  </TableHead>
                  <TableHead className="text-slate-400">Participant</TableHead>
                  <TableHead className="text-slate-400">Document</TableHead>
                  <TableHead className="text-slate-400">Module</TableHead>
                  <TableHead className="text-slate-400">Category</TableHead>
                  <TableHead className="text-slate-400">Status</TableHead>
                  <TableHead className="text-slate-400">Issued</TableHead>
                  <TableHead className="text-slate-400">Verification ID</TableHead>
                  <TableHead className="text-slate-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow className="border-white/10">
                    <TableCell colSpan={9} className="text-center text-sm text-slate-400 py-10">
                      No documents match those filters.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((doc) => (
                  <TableRow key={doc.id} className="border-white/10">
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(doc.id)}
                        onCheckedChange={() => toggleOne(doc.id)}
                        aria-label={`Select ${doc.name}`}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-white">
                      {doc.participant ?? "—"}
                      <span className="block text-[11px] text-slate-500 font-mono">
                        {doc.participantId ?? "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-200">
                      {doc.name}
                      {doc.uploaded && (
                        <Badge className="ml-2 bg-sky-500/20 text-sky-300 border-sky-500/30">
                          uploaded
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-slate-300">
                      {trackLabel(doc.program)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-300">{doc.type}</TableCell>
                    <TableCell>
                      <Badge className={cn(statusStyle[doc.status])}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-400">{doc.issuedOn}</TableCell>
                    <TableCell className="text-[11px] font-mono text-slate-400">
                      {doc.verificationId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {doc.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-white/15 text-slate-300 hover:bg-white/10"
                            onClick={() => setDocStatus(doc, "issued")}
                          >
                            <Send className="h-3.5 w-3.5 mr-1.5" /> Issue
                          </Button>
                        )}
                        {doc.status !== "verified" && doc.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
                            onClick={() => setDocStatus(doc, "verified")}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Verify
                          </Button>
                        )}
                        {doc.status !== "revoked" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-red-300"
                            aria-label={`Revoke ${doc.name}`}
                            onClick={() => setDocStatus(doc, "revoked")}
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                          aria-label={`Download ${doc.name}`}
                          disabled={doc.status === "pending"}
                          onClick={() => downloadDocumentPdf(doc)}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                          aria-label={`Copy verification link for ${doc.name}`}
                          onClick={() => copyVerifyLink(doc)}
                        >
                          <Link2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                          aria-label={`Audit trail for ${doc.name}`}
                          onClick={() => setActive(doc)}
                        >
                          <History className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

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
                    ["Participant", active.participant ?? "—"],
                    ["Participant ID", active.participantId ?? "—"],
                    ["Role", active.participantRole ?? "—"],
                    ["Module", trackLabel(active.program)],
                    ["Category", active.type],
                    ["Issued on", active.issuedOn],
                    ["Issued by", active.issuer],
                    ["Verification ID", active.verificationId],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <dt className="text-xs text-slate-500">{label}</dt>
                      <dd className="text-sm text-white text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                    Audit trail
                  </p>
                  <ol className="space-y-2">
                    {(active.history ?? []).map((event, i) => (
                      <li
                        key={`${event.status}-${i}`}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <p className="text-sm text-white capitalize">{event.status}</p>
                        <p className="text-[11px] text-slate-400">
                          {event.at} · {event.by}
                        </p>
                        {event.note && (
                          <p className="text-[11px] text-slate-500 mt-1">{event.note}</p>
                        )}
                      </li>
                    ))}
                    {(active.history ?? []).length === 0 && (
                      <li className="text-xs text-slate-500">No status changes recorded yet.</li>
                    )}
                  </ol>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
                  disabled={active.status === "pending"}
                  onClick={() => downloadDocumentPdf(active)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download branded PDF
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <BulkIssueDialog open={bulkOpen} onOpenChange={setBulkOpen} />
    </DashboardLayout>
  );
};

export default DashboardDocuments;
