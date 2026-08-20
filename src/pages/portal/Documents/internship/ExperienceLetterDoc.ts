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

export const EXPERIENCE_LETTER_SPEC: PdfDocumentLike = {
  name: "Internship Experience Letter",
  type: "Experience Letter",
  status: "verified",
  issuedOn: "Aug 15, 2026",
  description:
    "Verifiable statement of the internship period, department, responsibilities and conduct, issued for employers and universities.",
  issuer: "Anoneurx People Operations",
  sizeKb: 118,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for Internship Experience Letter */
export const buildExperienceLetterPdf = async (doc: PdfDocumentLike = EXPERIENCE_LETTER_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "Experience Letter",
    "Internship Service Record",
    "Verification",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "OFFICIAL EXPERIENCE STATEMENT",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Participant", doc.participant ?? "Insha"],
      ["Participant ID", doc.participantId ?? "ANX26INT00044"],
      ["Role", "React Web Developer Intern"],
      ["Tenure", "June 2, 2026 to August 15, 2026"],
      ["Conduct", "Exemplary"],
      ["Issued by", doc.issuer ?? "Anoneurx People Operations"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4408"],
    ],
  });

  const headerLeft = `Experience Letter · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("Internship Experience Letter", "TO WHOM IT MAY CONCERN");

  flow.section("Statement of Experience");
  flow.body(
    `This letter certifies that ${doc.participant ?? "Insha"} (ID: ${doc.participantId ?? "ANX26INT00044"}) has successfully completed a 12-week internship as a React Web Developer Intern at Anoneurx Technologies Ltd. from June 2, 2026 to August 15, 2026.`,
  );

  flow.section("Responsibilities & Performance");
  flow.body(
    "During her tenure, she worked within the Software Engineering Division. Her primary responsibilities included frontend web application development, UI component modularization, and automated PDF document generation using React, TypeScript, and Tailwind CSS.",
  );

  flow.section("Conduct & Recommendation");
  flow.body(
    "We found her to be hardworking, technically competent, punctual, and dedicated to achieving engineering excellence. Her character and professional conduct throughout the programme were outstanding. We wish her every success in her future engineering career.",
  );

  flow.signature("Muhammad Qasim", "Founder & Chief Executive Officer · Anoneurx");
  flow.confidential("OFFICIAL SERVICE RECORD — Anoneurx Technologies.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadExperienceLetterDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildExperienceLetterPdf({ ...EXPERIENCE_LETTER_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewExperienceLetterDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildExperienceLetterPdf({ ...EXPERIENCE_LETTER_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
