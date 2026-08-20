import {
  loadMark,
  newDoc,
  setMetadata,
  drawCover,
  Flow,
  refCode,
  programLabel,
  fileNameFor,
  applyFooters,
  type PdfDocumentLike,
} from "../pdfBase";

export const HR_POLICIES_SPEC: PdfDocumentLike = {
  name: "HR Policies Acknowledgement",
  type: "HR Policy",
  status: "verified",
  issuedOn: "Jun 2, 2026",
  description:
    "Signed acknowledgement of HR policies including workplace safety, anti-discrimination, IT asset use and leave entitlement.",
  issuer: "Anoneurx People Operations",
  sizeKb: 210,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for HR Policies Acknowledgement */
export const buildHrPoliciesPdf = async (doc: PdfDocumentLike = HR_POLICIES_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "HR Policies",
    "Acknowledgement",
    "People Operations",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "PEOPLE & WORKPLACE POLICIES",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Participant", doc.participant ?? "Insha"],
      ["Participant ID", doc.participantId ?? "ANX26INT00044"],
      ["Policy Version", "v2026.1"],
      ["Acknowledgement Status", "Executed & Logged"],
      ["Issued by", doc.issuer ?? "Anoneurx People Operations"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4410"],
    ],
  });

  const headerLeft = `HR Policies · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("HR Policies Acknowledgement", "ANONEURX TECHNOLOGIES · PEOPLE OPERATIONS");

  flow.section("01 / Purpose & Scope");
  flow.body(
    "This document certifies that the participant has received, read, understood, and agreed to adhere to all HR policies established by Anoneurx Technologies Ltd. for the duration of their internship.",
  );

  flow.section("02 / Key HR Policy Summaries");
  flow.bullets([
    "Equal Employment Opportunity: Fair treatment regardless of gender, background, or identity.",
    "Workplace Health & Safety: Commitment to maintaining a safe, healthy physical and remote workspace.",
    "Grievance Redressal Mechanism: Direct reporting channels to People Operations for any workplace issues.",
    "Leave & Absence Notification: Mandatory 24-hour advance notice for planned absences.",
  ]);

  flow.section("03 / Participant Undertaking");
  flow.body(
    `I, ${doc.participant ?? "Insha"}, hereby confirm that I have reviewed the Anoneurx HR Policies and agree to comply strictly with all provisions stated therein.`,
  );

  flow.signature(doc.participant ?? "Insha", "Participant Signatory");
  flow.confidential("OFFICIAL HR ACKNOWLEDGEMENT — Anoneurx Technologies.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadHrPoliciesDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildHrPoliciesPdf({ ...HR_POLICIES_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewHrPoliciesDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildHrPoliciesPdf({ ...HR_POLICIES_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
