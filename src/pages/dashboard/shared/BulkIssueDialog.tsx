import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  FileStack,
  Send,
  CheckCircle2,
  Eye,
  Download,
  FileSpreadsheet,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DOCUMENT_OWNERS,
  DOCUMENT_PRESETS,
  documentsStore,
  type BulkIssueResult,
  type DocumentSpec,
} from "@/pages/portal/documentsStore";
import { previewDocumentPdf } from "@/pages/portal/Documents";
import {
  downloadBulkCsv,
  downloadBulkPdf,
  toReportRows,
} from "@/pages/dashboard/shared/bulkIssueExport";
import type { DocumentStatus, DocumentTrack } from "@/pages/portal/types";

const TRACK_OF_PRESET: Record<"internship" | "hackathon", DocumentTrack> = {
  internship: "internship",
  hackathon: "hackathon",
};

const today = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

interface BulkIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Bulk issuing wizard: pick participants, pick the document set, preview the
 * exact branded PDF participant-by-participant, confirm, then export the
 * results as CSV or a branded PDF report. Writes to the shared documents store.
 */
export const BulkIssueDialog: React.FC<BulkIssueDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [preset, setPreset] = useState<"internship" | "hackathon">("internship");
  const [participants, setParticipants] = useState<string[]>([]);
  const [docNames, setDocNames] = useState<string[]>(
    DOCUMENT_PRESETS[0].docs.map((d) => d.name),
  );
  const [status, setStatus] = useState<DocumentStatus>("issued");
  const [issuer, setIssuer] = useState("Anoneurx People Operations");
  const [issuedOn, setIssuedOn] = useState(today());
  const [previewParticipant, setPreviewParticipant] = useState(0);
  const [previewDoc, setPreviewDoc] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<BulkIssueResult | null>(null);

  const presetDocs = useMemo(
    () => DOCUMENT_PRESETS.find((p) => p.id === preset)!.docs,
    [preset],
  );

  const track = TRACK_OF_PRESET[preset];

  const eligibleOwners = useMemo(
    () =>
      DOCUMENT_OWNERS.filter((o) =>
        preset === "internship"
          ? o.track === "internship" || o.track === "university" || o.track === "organization"
          : o.track === "hackathon" || o.track === "university" || o.track === "internship",
      ),
    [preset],
  );

  const selectedSpecs: DocumentSpec[] = presetDocs.filter((d) => docNames.includes(d.name));

  const selectedOwners = useMemo(
    () => DOCUMENT_OWNERS.filter((o) => participants.includes(o.participantId)),
    [participants],
  );

  const previewOwner = selectedOwners[previewParticipant];
  const previewSpec = selectedSpecs[previewDoc];

  /** The document record as it will exist once issued — used for the preview. */
  const previewRecord = useMemo(() => {
    if (!previewOwner || !previewSpec) return null;
    return {
      ...previewSpec,
      program: track,
      status,
      issuedOn: status === "pending" ? "—" : issuedOn,
      verificationId: "ANX-DOC-PREVIEW",
      participant: previewOwner.name,
      participantId: previewOwner.participantId,
      issuer,
    };
  }, [previewOwner, previewSpec, track, status, issuedOn, issuer]);

  useEffect(() => {
    if (step !== 3 || !previewRecord) {
      setPreviewUrl(null);
      return;
    }
    let cancelled = false;
    let revoke: (() => void) | null = null;
    previewDocumentPdf(previewRecord).then((preview) => {
      if (cancelled) {
        preview.revoke();
        return;
      }
      revoke = preview.revoke;
      setPreviewUrl(preview.url);
    });
    return () => {
      cancelled = true;
      revoke?.();
    };
  }, [step, previewRecord]);

  const reset = () => {
    setStep(1);
    setParticipants([]);
    setPreset("internship");
    setDocNames(DOCUMENT_PRESETS[0].docs.map((d) => d.name));
    setStatus("issued");
    setIssuedOn(today());
    setPreviewParticipant(0);
    setPreviewDoc(0);
    setResult(null);
  };

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) reset();
  };

  const switchPreset = (id: "internship" | "hackathon") => {
    setPreset(id);
    setDocNames(DOCUMENT_PRESETS.find((p) => p.id === id)!.docs.map((d) => d.name));
    setPreviewParticipant(0);
    setPreviewDoc(0);
  };

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const submit = () => {
    const issueResult = documentsStore.issueBulk({
      participantIds: participants,
      specs: selectedSpecs,
      track,
      status,
      issuedOn,
      by: issuer,
    });
    setResult(issueResult);
    setStep(5);
    toast({
      title: `${issueResult.issued} document${issueResult.issued === 1 ? "" : "s"} issued`,
      description:
        `${issueResult.participants} participant${issueResult.participants === 1 ? "" : "s"}` +
        (issueResult.skipped ? ` · ${issueResult.skipped} skipped (already issued)` : ""),
    });
  };

  const reportRows = useMemo(
    () => (result?.documents?.length ? toReportRows(result.documents, result.at, issuer) : []),
    [result, issuer],
  );

  const exportCsv = () => {
    downloadBulkCsv(reportRows, "anoneurx-bulk-issuing-report");
    toast({ title: "CSV exported", description: `${reportRows.length} rows written.` });
  };

  const exportPdf = () => {
    if (!result) return;
    downloadBulkPdf(reportRows, {
      action: `Bulk issue · ${DOCUMENT_PRESETS.find((p) => p.id === preset)!.label}`,
      generatedAt: new Date(result.at).toLocaleString("en-US"),
      issuedBy: issuer,
      issued: result.issued,
      skipped: result.skipped,
      participants: result.participants,
    });
  };

  const canContinue =
    (step === 1 && participants.length > 0) ||
    (step === 2 && selectedSpecs.length > 0) ||
    step === 3;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-3xl glass-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileStack className="h-5 w-5 text-[#A91676]" /> Bulk issue documents
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Issue the required internship or hackathon document set to multiple participants in one
            action, previewing the branded layout first.
          </DialogDescription>
        </DialogHeader>

        {step < 5 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {["Participants", "Documents", "Preview", "Confirm"].map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-1",
                  step === i + 1
                    ? "border-[#A91676]/50 bg-[#A91676]/15 text-white"
                    : "border-white/10 text-slate-400",
                )}
              >
                <span className="font-semibold">{i + 1}</span> {label}
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                {participants.length} selected
              </span>
              <Button
                size="sm"
                variant="outline"
                className="h-7 border-white/15 text-slate-300 hover:bg-white/10"
                onClick={() => setParticipants(eligibleOwners.map((o) => o.participantId))}
              >
                Select all
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-slate-400"
                onClick={() => setParticipants([])}
              >
                Clear
              </Button>
            </div>
            <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {eligibleOwners.map((o) => (
                <label
                  key={o.participantId}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05]"
                >
                  <Checkbox
                    checked={participants.includes(o.participantId)}
                    onCheckedChange={() =>
                      setParticipants((prev) => toggle(prev, o.participantId))
                    }
                    aria-label={`Select ${o.name}`}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white">{o.name}</span>
                    <span className="block text-xs text-slate-500">
                      {o.role} · <span className="font-mono">{o.participantId}</span>
                    </span>
                  </span>
                  <Badge variant="outline" className="border-white/15 text-slate-400 capitalize">
                    {o.track}
                  </Badge>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {DOCUMENT_PRESETS.map((p) => (
                <Button
                  key={p.id}
                  size="sm"
                  variant={preset === p.id ? "default" : "outline"}
                  className={cn(
                    "h-8",
                    preset === p.id
                      ? "bg-gradient-to-r from-[#380276] to-[#A91676]"
                      : "border-white/15 text-slate-300 hover:bg-white/10",
                  )}
                  onClick={() => switchPreset(p.id)}
                >
                  {p.label}
                </Button>
              ))}
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-slate-400"
                onClick={() => setDocNames(presetDocs.map((d) => d.name))}
              >
                Select all
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-slate-400"
                onClick={() => setDocNames([])}
              >
                Clear
              </Button>
            </div>
            <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {presetDocs.map((d) => (
                <label
                  key={d.name}
                  className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05]"
                >
                  <Checkbox
                    checked={docNames.includes(d.name)}
                    onCheckedChange={() => setDocNames((prev) => toggle(prev, d.name))}
                    aria-label={`Include ${d.name}`}
                    className="mt-0.5"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-white">{d.name}</span>
                    <span className="block text-xs text-slate-500">{d.type}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Eye className="h-4 w-4 text-[#A91676]" />
                Participant {previewParticipant + 1} of {selectedOwners.length} · document{" "}
                {previewDoc + 1} of {selectedSpecs.length}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 border-white/15 text-slate-300 hover:bg-white/10"
                disabled={!previewRecord}
                onClick={() =>
                  previewRecord &&
                  previewDocumentPdf(previewRecord).then((preview) => preview.save())
                }
              >
                <Download className="mr-2 h-3.5 w-3.5" /> Download this preview
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-[220px_1fr]">
              <div className="space-y-2">
                <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                  {selectedOwners.map((o, i) => (
                    <button
                      key={o.participantId}
                      type="button"
                      onClick={() => {
                        setPreviewParticipant(i);
                        setPreviewDoc(0);
                      }}
                      className={cn(
                        "w-full rounded-lg border px-2.5 py-2 text-left text-xs",
                        i === previewParticipant
                          ? "border-[#A91676]/50 bg-[#A91676]/15 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]",
                      )}
                    >
                      <span className="block font-medium">{o.name}</span>
                      <span className="block font-mono text-[10px] opacity-70">
                        {o.participantId}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
                  {selectedSpecs.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setPreviewDoc(i)}
                      className={cn(
                        "w-full rounded-lg border px-2.5 py-1.5 text-left text-xs",
                        i === previewDoc
                          ? "border-white/25 bg-white/10 text-white"
                          : "border-white/5 text-slate-400 hover:bg-white/[0.05]",
                      )}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-[380px] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  {previewUrl ? (
                    <iframe
                      key={previewUrl}
                      src={previewUrl}
                      title="Document PDF preview"
                      className="h-full w-full"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Select a participant and document to preview.
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-slate-300"
                    disabled={previewDoc === 0 && previewParticipant === 0}
                    onClick={() => {
                      if (previewDoc > 0) setPreviewDoc(previewDoc - 1);
                      else {
                        setPreviewParticipant(previewParticipant - 1);
                        setPreviewDoc(selectedSpecs.length - 1);
                      }
                    }}
                  >
                    <ChevronLeft className="mr-1 h-3.5 w-3.5" /> Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-slate-300"
                    disabled={
                      previewParticipant === selectedOwners.length - 1 &&
                      previewDoc === selectedSpecs.length - 1
                    }
                    onClick={() => {
                      if (previewDoc < selectedSpecs.length - 1) setPreviewDoc(previewDoc + 1);
                      else {
                        setPreviewParticipant(previewParticipant + 1);
                        setPreviewDoc(0);
                      }
                    }}
                  >
                    Next <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Nothing is issued while previewing — documents are written only when you confirm.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-400">Issue status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as DocumentStatus)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="issued">Issued</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-400" htmlFor="bulk-issuer">
                  Issued by
                </Label>
                <Input
                  id="bulk-issuer"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-400" htmlFor="bulk-date">
                  Issue date
                </Label>
                <Input
                  id="bulk-date"
                  value={issuedOn}
                  onChange={(e) => setIssuedOn(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="rounded-xl border border-[#A91676]/30 bg-[#A91676]/10 p-4">
              <p className="text-sm font-semibold text-white">
                {selectedSpecs.length * participants.length} documents will be issued to{" "}
                {participants.length} participant{participants.length === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {selectedSpecs.length} documents from the{" "}
                {DOCUMENT_PRESETS.find((p) => p.id === preset)!.label.toLowerCase()}. Documents a
                participant already holds are skipped.
              </p>
            </div>
          </div>
        )}

        {step === 5 && result && (
          <div className="space-y-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {result.issued} document{result.issued === 1 ? "" : "s"} issued to{" "}
                {result.participants} participant{result.participants === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {result.skipped} skipped (already issued) · issued by {issuer} ·{" "}
                {new Date(result.at).toLocaleString("en-US")}
              </p>
            </div>

            <div className="max-h-72 overflow-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-white/[0.06] text-slate-300">
                  <tr>
                    <th className="px-3 py-2 font-medium">Participant</th>
                    <th className="px-3 py-2 font-medium">Participant ID</th>
                    <th className="px-3 py-2 font-medium">Document</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Verification ID</th>
                    <th className="px-3 py-2 font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((r, i) => (
                    <tr key={`${r.verificationId}-${i}`} className="border-t border-white/5">
                      <td className="px-3 py-2 text-white">{r.participant}</td>
                      <td className="px-3 py-2 font-mono text-slate-400">{r.participantId}</td>
                      <td className="px-3 py-2 text-slate-300">{r.document}</td>
                      <td className="px-3 py-2 uppercase text-slate-400">{r.status}</td>
                      <td className="px-3 py-2 font-mono text-slate-400">{r.verificationId}</td>
                      <td className="px-3 py-2 text-slate-500">
                        {new Date(r.timestamp).toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step > 1 && step < 5 && (
            <Button
              variant="outline"
              className="border-white/15 text-slate-300 hover:bg-white/10"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          {step < 4 && (
            <Button
              className="bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
              disabled={!canContinue}
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          )}
          {step === 4 && (
            <Button
              className="bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
              disabled={participants.length === 0 || selectedSpecs.length === 0}
              onClick={submit}
            >
              {status === "verified" ? (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Issue documents
            </Button>
          )}
          {step === 5 && (
            <>
              <Button
                variant="outline"
                className="border-white/15 text-slate-300 hover:bg-white/10"
                disabled={reportRows.length === 0}
                onClick={exportCsv}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Export CSV
              </Button>
              <Button
                variant="outline"
                className="border-white/15 text-slate-300 hover:bg-white/10"
                disabled={reportRows.length === 0}
                onClick={exportPdf}
              >
                <FileText className="mr-2 h-4 w-4" /> Export PDF
              </Button>
              <Button
                className="bg-gradient-to-r from-[#380276] to-[#A91676] hover:opacity-90"
                onClick={() => close(false)}
              >
                Done
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkIssueDialog;
