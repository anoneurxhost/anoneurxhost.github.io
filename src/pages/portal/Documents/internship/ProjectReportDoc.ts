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

export const PROJECT_REPORT_SPEC: PdfDocumentLike = {
  name: "Project Report",
  type: "Project Report",
  status: "verified",
  issuedOn: "Aug 15, 2026",
  description:
    "Technical report on the internship project: problem statement, architecture, implementation, testing, results and future work.",
  issuer: "Anoneurx Engineering",
  sizeKb: 884,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for Project Report */
export const buildProjectReportPdf = async (doc: PdfDocumentLike = PROJECT_REPORT_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "Project Report",
    "Technical Architecture",
    "React Application",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "TECHNICAL CAPSTONE DOCUMENT",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Project Name", "Participant & Internship Documents Portal"],
      ["Author / Intern", doc.participant ?? "Insha"],
      ["Technology Stack", "React 18, TypeScript, Tailwind CSS, jsPDF"],
      ["Architecture Pattern", "Client-Side Store with Real-time Telemetry"],
      ["Issued by", doc.issuer ?? "Anoneurx Engineering"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4407"],
    ],
  });

  const headerLeft = `Project Report · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("Project Technical Report", "ANONEURX ENGINEERING DIVISION");

  flow.section("01 / Executive Summary");
  flow.body(
    "This report documents the architectural design, implementation strategy, and verification system of the Anoneurx Participant Documents Portal. The portal unifies document issuance, verification, and PDF exporting across all Anoneurx tracks.",
  );

  flow.section("02 / Technical Architecture & Technology Stack");
  flow.table(
    [
      ["Frontend Framework", "React 18 with TypeScript strict mode"],
      ["UI Component System", "Tailwind CSS + Shadcn / UI primitives"],
      ["PDF Generation Engine", "jsPDF with custom Anoneurx canvas layout"],
      ["State Management", "Reactive Event-Driven Client Store"],
      ["Icons & Artwork", "Lucide React + Vector SVG/PNG brand assets"],
    ],
    ["Subsystem", "Technology Implemented"],
  );

  flow.section("03 / Key Deliverables Implemented");
  flow.bullets([
    "Unified Documents Register supporting single and bulk PDF issuing.",
    "Custom brand-compliant PDF layout engine supporting portrait letters and landscape certificates.",
    "Integrated verification hash and instant link generator for document authenticity checking.",
  ]);

  flow.signature("Lead Systems Architect", "Anoneurx Engineering Division");
  flow.confidential("TECHNICAL CAPSTONE DOCUMENT — Anoneurx Technologies.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadProjectReportDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildProjectReportPdf({ ...PROJECT_REPORT_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewProjectReportDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildProjectReportPdf({ ...PROJECT_REPORT_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
