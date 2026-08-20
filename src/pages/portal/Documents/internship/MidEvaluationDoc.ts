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

export const MID_EVALUATION_SPEC: PdfDocumentLike = {
  name: "Mid-Internship Evaluation",
  type: "Mid-Internship Evaluation",
  status: "verified",
  issuedOn: "Jul 10, 2026",
  description:
    "Mentor assessment at the halfway point, scoring technical delivery, collaboration, ownership and communication with development notes.",
  issuer: "Anoneurx Engineering Mentorship",
  sizeKb: 132,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for Mid-Internship Evaluation */
export const buildMidEvaluationPdf = async (doc: PdfDocumentLike = MID_EVALUATION_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "Mid-Internship Evaluation",
    "Performance Assessment",
    "Engineering Mentorship",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "HALFWAY PERFORMANCE REVIEW",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Participant", doc.participant ?? "Insha"],
      ["Participant ID", doc.participantId ?? "ANX26INT00044"],
      ["Evaluation Milestone", "Mid-Term (Week 6)"],
      ["Overall Grade", "A (92/100)"],
      ["Evaluator", "Lead Frontend Architect"],
      ["Issued by", doc.issuer ?? "Anoneurx Engineering Mentorship"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4405"],
    ],
  });

  const headerLeft = `Mid-Term Evaluation · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("Mid-Internship Evaluation Report", "ANONEURX ENGINEERING MENTORSHIP BOARD");

  flow.section("Performance Assessment Matrix");
  flow.table(
    [
      ["React & Component Design", "95 / 100 (Exceptional clean code & reusable patterns)"],
      ["TypeScript Strictness", "90 / 100 (Strong type safety and interface structure)"],
      ["API Integration", "92 / 100 (Efficient async state handling & error bounds)"],
      ["Code Review Quality", "88 / 100 (Active participation & constructive feedback)"],
      ["Ownership & Delivery Speed", "94 / 100 (Consistently meets milestone deadlines)"],
    ],
    ["Evaluation Criteria", "Score & Mentor Observations"],
  );

  flow.section("Mentor Feedback & Strengths");
  flow.body(
    "Insha has exhibited exemplary initiative during the first 6 weeks of the internship. She rapidly mastered our internal component library and delivered key UI views with clean React hooks and TypeScript strict typing.",
  );

  flow.section("Key Recommendations for Second Half");
  flow.bullets([
    "Focus on optimizing re-renders using React.memo and useMemo in complex data tables.",
    "Expand unit testing coverage using Vitest for custom hooks.",
    "Prepare technical documentation for the final project submission.",
  ]);

  flow.signature("Lead Frontend Architect", "Engineering Mentorship Lead · Anoneurx");
  flow.confidential("CONFIDENTIAL PERFORMANCE EVALUATION — Anoneurx Engineering.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadMidEvaluationDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildMidEvaluationPdf({ ...MID_EVALUATION_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewMidEvaluationDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildMidEvaluationPdf({ ...MID_EVALUATION_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
