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

export const NDA_SPEC: PdfDocumentLike = {
  name: "Non-Disclosure Agreement",
  type: "NDA",
  status: "verified",
  issuedOn: "Jun 2, 2026",
  description:
    "Confidentiality undertaking covering source code, client information, research and internal documentation, effective during and after the internship.",
  issuer: "Anoneurx Legal",
  sizeKb: 196,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for Non-Disclosure Agreement */
export const buildNdaPdf = async (doc: PdfDocumentLike = NDA_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, doc.name, `${doc.type} · ${programLabel(doc.program)}`, [
    "Non-Disclosure Agreement",
    "Legal NDA",
    "Confidentiality",
  ]);

  drawCover(pdf, {
    title: doc.name,
    kicker: "MUTUAL CONFIDENTIALITY AGREEMENT",
    program: doc.program,
    mark,
    ref,
    rows: [
      ["Disclosing Party", "Anoneurx Technologies Ltd."],
      ["Receiving Party", doc.participant ?? "Insha"],
      ["Agreement Scope", "Source Code, Datasets & Client Briefs"],
      ["Effective Duration", "5 Years from Execution Date"],
      ["Issued by", doc.issuer ?? "Anoneurx Legal"],
      ["Verification ID", doc.verificationId ?? "ANX-DOC-IN-4404"],
    ],
  });

  const headerLeft = `Non-Disclosure Agreement · Anoneurx Legal`;
  const flow = new Flow(pdf, { headerLeft, mark });

  flow.newPage();
  flow.title("Non-Disclosure Agreement", "ANONEURX LEGAL & INTELLECTUAL PROPERTY DIVISION");

  flow.section("01 / Recitals");
  flow.body(
    `This Non-Disclosure Agreement ("Agreement") is executed on June 2, 2026, by and between Anoneurx Technologies Ltd. ("Disclosing Party") and ${doc.participant ?? "Insha"} ("Receiving Party").`,
  );

  flow.section("02 / Definition of Confidential Information");
  flow.body(
    "Confidential Information includes, without limitation, proprietary software architecture, Rust/TypeScript codebase repositories, internal machine learning models, database schema definitions, product roadmaps, client identities, and security protocols.",
  );

  flow.section("03 / Obligations");
  flow.bullets([
    "The Receiving Party shall maintain all Confidential Information in strict secrecy.",
    "The Receiving Party shall not copy, decompile, reverse-engineer, or transmit proprietary code outside approved company infrastructure.",
    "Upon completion or termination of the internship, the Receiving Party shall return or destroy all internal documentation and code copies.",
  ]);

  flow.section("04 / Legal Remedies");
  flow.body(
    "Breach of this Agreement will cause irreparable injury to Anoneurx Technologies. In addition to legal remedies, Anoneurx reserves the right to seek injunctive relief and claim damages under applicable business law.",
  );

  flow.signature("Legal Operations Counsel", "Anoneurx Technologies Legal Division");
  flow.confidential("STRICTLY CONFIDENTIAL LEGAL INSTRUMENT — Anoneurx Legal.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(doc.name) };
};

export const downloadNdaDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildNdaPdf({ ...NDA_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewNdaDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildNdaPdf({ ...NDA_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
