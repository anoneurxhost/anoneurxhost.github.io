import type { ProgramDocument } from "@/pages/portal/types";
import {
  downloadBulkReportPdf,
  type BulkReportMeta,
  type BulkReportRow,
} from "@/pages/portal/Documents";

/**
 * Export helpers for bulk document operations — turns the created/affected
 * documents into a CSV file or the branded "Bulk Issuing Report" PDF.
 */

const PROGRAM_LABEL: Record<string, string> = {
  university: "Anoneurx University",
  internship: "Anoneurx Internship",
  hackathon: "Anoneurx Hackathon",
  organization: "Anoneurx Organization",
};

export const toReportRows = (
  docs: ProgramDocument[],
  timestamp: string,
  issuedBy: string,
): BulkReportRow[] =>
  docs.map((d) => ({
    timestamp,
    participant: d.participant ?? "—",
    participantId: d.participantId ?? "—",
    role: d.participantRole ?? "—",
    document: d.name,
    category: d.type,
    program: d.program,
    status: d.status,
    verificationId: d.verificationId ?? "—",
    issuedOn: d.issuedOn,
    issuedBy,
  }));

const CSV_HEADERS = [
  "Timestamp",
  "Participant",
  "Participant ID",
  "Role",
  "Document",
  "Category",
  "Program",
  "Status",
  "Verification ID",
  "Issued On",
  "Issued By",
];

const cell = (value: string) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export const toCsv = (rows: BulkReportRow[]) =>
  [
    CSV_HEADERS.join(","),
    ...rows.map((r) =>
      [
        r.timestamp,
        r.participant,
        r.participantId,
        r.role,
        r.document,
        r.category,
        PROGRAM_LABEL[r.program] ?? r.program,
        r.status.toUpperCase(),
        r.verificationId,
        r.issuedOn,
        r.issuedBy,
      ]
        .map(cell)
        .join(","),
    ),
  ].join("\r\n");

export const slugForExport = (label: string, timestamp: string) =>
  `${label}-${timestamp}`.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();

export const downloadBulkCsv = (rows: BulkReportRow[], label = "bulk-issuing-report") => {
  const blob = new Blob(["\uFEFF" + toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugForExport(label, rows[0]?.timestamp ?? new Date().toISOString())}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const downloadBulkPdf = (rows: BulkReportRow[], meta: BulkReportMeta) =>
  downloadBulkReportPdf(rows, meta);

export type { BulkReportRow, BulkReportMeta };
