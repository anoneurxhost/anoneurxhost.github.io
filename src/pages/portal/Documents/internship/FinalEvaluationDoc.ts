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

export const FINAL_EVALUATION_SPEC: PdfDocumentLike = {
  name: "Final Evaluation Report",
  type: "Final Evaluation",
  status: "verified",
  issuedOn: "Aug 15, 2026",
  description:
    "Closing performance review with final scores, mentor recommendation and readiness assessment for full-time engineering roles.",
  issuer: "Anoneurx Engineering Mentorship",
  sizeKb: 148,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for Final Evaluation Report */
export const buildFinalEvaluationPdf = async (doc: PdfDocumentLike = FINAL_EVALUATION_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "Final Evaluation Report",
    "Internship Closing Review",
    "Final Scores",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "PROGRAMME CLOSING ASSESSMENT",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Participant", doc.participant ?? "Insha"],
      ["Participant ID", doc.participantId ?? "ANX26INT00044"],
      ["Final Cumulative Grade", "A+ (96/100)"],
      ["Full-Time Recommendation", "Highly Recommended for SDE-1"],
      ["Evaluator Panel", "Engineering Leadership Board"],
      ["Issued by", doc.issuer ?? "Anoneurx Engineering Mentorship"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4406"],
    ],
  });

  const headerLeft = `Final Evaluation · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("Final Evaluation Report", "ANONEURX ENGINEERING EVALUATION BOARD");

  flow.section("Final Scoring Matrix");
  flow.table(
    [
      ["Technical Delivery & Stack Mastery", "97 / 100 (Flawless React & Tailwind implementation)"],
      ["System Architecture & Design", "95 / 100 (Modular, scalable component structure)"],
      ["Testing & Bug Remediation", "94 / 100 (Robust test coverage & edge-case handling)"],
      ["Team Collaboration & Soft Skills", "98 / 100 (Proactive communication & peer support)"],
      ["Final Cumulative Score", "96% (Grade A+)"],
    ],
    ["Evaluation Criteria", "Final Rating & Score"],
  );

  flow.section("Mentor Recommendation & Readiness Statement");
  flow.body(
    "Throughout the 12-week React Web Developer Internship, Insha has demonstrated remarkable progress, self-reliance, and technical sophistication. She has met every milestone with distinction and is strongly recommended for full-time Software Development Engineer (SDE-1) placement at Anoneurx Technologies.",
  );

  flow.signature("Muhammad Qasim", "Founder & CEO · Anoneurx Technologies");
  flow.confidential("FINAL OFFICIAL EVALUATION REPORT — Anoneurx Technologies.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadFinalEvaluationDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildFinalEvaluationPdf({ ...FINAL_EVALUATION_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewFinalEvaluationDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildFinalEvaluationPdf({ ...FINAL_EVALUATION_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
