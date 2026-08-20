/**
 * Anoneurx Documents Directory
 * Each document in the 10 required document set has its own dedicated file with its own custom design.
 * Serves as the central documents engine for document generation, previewing and exports.
 */

export * from "./pdfBase";
export * from "./internship";
export * from "./hackathon";
export * from "./university";

import { OFFER_LETTER_SPEC, buildOfferLetterPdf } from "./internship/OfferLetterDoc";
import { POLICY_HANDBOOK_SPEC, buildPolicyHandbookPdf } from "./internship/PolicyHandbookDoc";
import { CODE_OF_CONDUCT_SPEC, buildCodeOfConductPdf } from "./internship/CodeOfConductDoc";
import { NDA_SPEC, buildNdaPdf } from "./internship/NdaDoc";
import { MID_EVALUATION_SPEC, buildMidEvaluationPdf } from "./internship/MidEvaluationDoc";
import { FINAL_EVALUATION_SPEC, buildFinalEvaluationPdf } from "./internship/FinalEvaluationDoc";
import { PROJECT_REPORT_SPEC, buildProjectReportPdf } from "./internship/ProjectReportDoc";
import { EXPERIENCE_LETTER_SPEC, buildExperienceLetterPdf } from "./internship/ExperienceLetterDoc";
import { COMPLETION_CERTIFICATE_SPEC, buildCompletionCertificatePdf } from "./internship/CompletionCertificateDoc";
import { HR_POLICIES_SPEC, buildHrPoliciesPdf } from "./internship/HrPoliciesDoc";
import {
  loadMark,
  newDoc,
  setMetadata,
  drawCover,
  Flow,
  today,
  fileNameFor,
  applyFooters,
  type PdfDocumentLike,
} from "./pdfBase";


/** Complete list of all 10 individual document specifications. */
export const ALL_10_DOCUMENTS = [
  OFFER_LETTER_SPEC,
  POLICY_HANDBOOK_SPEC,
  CODE_OF_CONDUCT_SPEC,
  NDA_SPEC,
  MID_EVALUATION_SPEC,
  FINAL_EVALUATION_SPEC,
  PROJECT_REPORT_SPEC,
  EXPERIENCE_LETTER_SPEC,
  COMPLETION_CERTIFICATE_SPEC,
  HR_POLICIES_SPEC,
] as const;

/** Map document type or name to its individual dedicated builder */
export const buildDocumentPdf = async (doc: PdfDocumentLike) => {
  const type = doc.type.toLowerCase();
  const name = doc.name.toLowerCase();

  if (type.includes("certificate") || name.includes("certificate")) {
    return buildCompletionCertificatePdf(doc);
  }
  if (type.includes("offer") || name.includes("offer")) {
    return buildOfferLetterPdf(doc);
  }
  if (type.includes("handbook") || name.includes("handbook")) {
    return buildPolicyHandbookPdf(doc);
  }
  if (type.includes("conduct") || name.includes("conduct")) {
    return buildCodeOfConductPdf(doc);
  }
  if (type.includes("nda") || name.includes("non-disclosure")) {
    return buildNdaPdf(doc);
  }
  if (type.includes("mid") || name.includes("mid-internship")) {
    return buildMidEvaluationPdf(doc);
  }
  if (type.includes("final") || name.includes("final evaluation")) {
    return buildFinalEvaluationPdf(doc);
  }
  if (type.includes("project") || name.includes("project report")) {
    return buildProjectReportPdf(doc);
  }
  if (type.includes("experience") || name.includes("experience letter")) {
    return buildExperienceLetterPdf(doc);
  }
  if (type.includes("hr") || name.includes("hr policies")) {
    return buildHrPoliciesPdf(doc);
  }

  // Fallback to default document builder
  return buildOfferLetterPdf(doc);
};

export const downloadDocumentPdf = async (doc: PdfDocumentLike) => {
  const { pdf, fileName } = await buildDocumentPdf(doc);
  pdf.save(fileName);
};

export const previewDocumentPdf = async (doc: PdfDocumentLike) => {
  const { pdf, fileName } = await buildDocumentPdf(doc);
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};

/** Bundle: one cover, one contents page listing all documents, one section each. */
export const downloadDocumentBundle = async (
  docs: PdfDocumentLike[],
  opts?: { title?: string; participant?: string; participantId?: string },
) => {
  if (docs.length === 0) return;
  const mark = await loadMark();
  const pdf = newDoc();
  const title = opts?.title ?? "Anoneurx Document Bundle";
  const ref = `ANX/DOC/BUNDLE/${new Date().getFullYear()}`;

  setMetadata(pdf, title, `Consolidated document bundle · ${docs.length} documents`, [
    "document bundle",
  ]);

  drawCover(pdf, {
    title,
    kicker: "Document Bundle",
    program: docs[0].program,
    mark,
    ref,
    rows: [
      ["Issued to", opts?.participant ?? docs[0].participant ?? "Portal Participant"],
      ["Participant ID", opts?.participantId ?? docs[0].participantId ?? "—"],
      ["Documents included", String(docs.length)],
      ["Generated on", today()],
      ["Reference", ref],
    ],
  });

  const flow = new Flow(pdf, { headerLeft: title, mark });

  flow.newPage();
  flow.title("Contents");
  docs.forEach((d, i) => {
    flow.space(11 * 1.15 + 10);
    flow.body(`${i + 1}. ${d.name} — ${d.type}`);
  });

  docs.forEach((d) => {
    flow.newPage();
    flow.resetSections();
    flow.title(d.name, `${d.type} · ${d.program ?? "Anoneurx"}`);
    flow.section("Overview");
    flow.body(d.description);
    flow.section("Record");
    flow.table(
      [
        ["Category", d.type],
        ["Issued to", d.participant ?? "—"],
        ["Status", d.status.toUpperCase()],
        ["Issue date", d.issuedOn],
        ["Issued by", d.issuer ?? "Anoneurx Technologies"],
        ["Verification ID", d.verificationId ?? "—"],
      ],
      ["Field", "Value"],
    );
  });

  applyFooters(pdf, ref);
  pdf.save(fileNameFor(title));
};

export interface BulkReportRow {
  timestamp: string;
  participant: string;
  participantId: string;
  role: string;
  document: string;
  category: string;
  program: string;
  status: string;
  verificationId: string;
  issuedOn: string;
  issuedBy: string;
}

export interface BulkReportMeta {
  title?: string;
  action: string;
  generatedAt: string;
  issuedBy: string;
  issued: number;
  skipped: number;
  participants: number;
}

export const downloadBulkReportPdf = async (rows: BulkReportRow[], meta: BulkReportMeta) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const title = meta.title ?? "Bulk Issuing Report";
  const ref = `ANX/DOC/BULK/${new Date().getFullYear()}`;

  setMetadata(pdf, title, `${meta.action} · ${rows.length} records`, ["bulk issuing", "report"]);

  drawCover(pdf, {
    title,
    kicker: "Operations Report",
    program: rows[0]?.program,
    mark,
    ref,
    rows: [
      ["Action", meta.action],
      ["Documents issued", String(meta.issued)],
      ["Documents skipped", String(meta.skipped)],
      ["Participants", String(meta.participants)],
      ["Issued by", meta.issuedBy],
      ["Generated on", meta.generatedAt],
    ],
  });

  const flow = new Flow(pdf, { headerLeft: `${title} · ${meta.generatedAt}`, mark });

  flow.newPage();
  flow.title(title, `${meta.action} · ${rows.length} records`);

  flow.section("Summary");
  flow.body(
    `This report records a bulk document operation performed in the Anoneurx documents register. ${meta.issued} document(s) were issued to ${meta.participants} participant(s) by ${meta.issuedBy} on ${meta.generatedAt}.`,
  );
  flow.table(
    [
      ["Action", meta.action],
      ["Documents issued", String(meta.issued)],
      ["Documents skipped", String(meta.skipped)],
      ["Participants", String(meta.participants)],
      ["Issued by", meta.issuedBy],
      ["Generated on", meta.generatedAt],
    ],
    ["Field", "Value"],
  );

  applyFooters(pdf, ref);
  pdf.save(fileNameFor(`${title}-${meta.generatedAt}`));
};
