import {
  loadMark,
  newDoc,
  setMetadata,
  drawCover,
  tracked,
  Flow,
  refCode,
  fileNameFor,
  applyFooters,
  MARGIN_LEFT,
  INK,
  SECOND,
  SIGNATURE,
  SIGNATURE_RATIO,
  type PdfDocumentLike,
} from "./pdfBase";

export const OFFER_LETTER_SPEC: PdfDocumentLike = {
  name: "Internship Offer Letter",
  type: "Offer Letter",
  status: "verified",
  issuedOn: "Jun 2, 2026",
  description:
    "Official ANONEURX Internship Offer Letter covering position, department, schedule, responsibilities, confidentiality, IP, and compensation terms.",
  issuer: "ANONEURX People Operations",
  sizeKb: 215,
  program: "internship",
  programme: "React Web Developer Internship",
};

/** Custom PDF Builder for ANONEURX Internship Offer Letter */
export const buildOfferLetterPdf = async (doc: PdfDocumentLike = OFFER_LETTER_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, "ANONEURX Internship Offer Letter", `Official Offer Letter for ${doc.participant ?? "Insha"}`, [
    "ANONEURX",
    "Internship Offer Letter",
    doc.participant ?? "Intern",
    doc.participantId ?? "ANX26INT00044",
  ]);

  // Page 1: Dedicated SpaceX Cover Page
  drawCover(pdf, {
    title: "INTERNSHIP OFFER LETTER",
    subtitle: `PEOPLE OPERATIONS & TALENT ACQUISITION · OFFER NO.: ANX-INT-2026-${(doc.participantId || "0044").replace(/\D/g, "").slice(-4) || "0044"}`,
    kicker: "OFFICIAL OFFER INSTRUMENT",
    program: doc.program,
    mark,
    ref,
    edition: "2026 EDITION",
    rows: [
      ["Candidate Name", doc.participant ?? "Insha"],
      ["Intern ID", doc.participantId ?? "ANX26INT00044"],
      ["Position Title", doc.programme ?? "React Web Developer Intern"],
      ["Department", "Software Engineering"],
      ["Date of Issue", doc.issuedOn],
      ["Document Ref", ref],
    ],
  });

  const headerLeft = `Offer Letter · ${doc.participant ?? "Insha"}`;
  const flow = new Flow(pdf, { headerLeft, mark });

  // Page 2+: Offer Letter Content
  flow.newPage();
  flow.title("INTERNSHIP OFFER LETTER", `OFFER NO.: ANX-INT-2026-${(doc.participantId || "0044").replace(/\D/g, "").slice(-4) || "0044"} · DATE: ${doc.issuedOn.toUpperCase()}`);

  // Recipient Header Block
  flow.body(`To,\n${doc.participant ?? "Insha"}\nIntern ID: ${doc.participantId ?? "ANX26INT00044"}\nEmail: insha@anoneurx.com`, "left");
  flow.space(4);

  flow.heading(2, `Subject: Internship Offer — ${doc.programme ?? "React Web Developer Intern"}`);
  flow.body(
    `Dear ${doc.participant ?? "Insha"},\n\nWe are pleased to offer you an internship position at ANONEURX as a ${doc.programme ?? "React Web Developer Intern"}.\n\nBased on your application, qualifications, and discussions with our team, we believe that your skills, enthusiasm, and willingness to learn make you a suitable candidate for this opportunity.`,
  );

  // Section 1: Internship Details Table
  flow.section("1. Internship Details");
  flow.table(
    [
      ["Position", doc.programme ?? "React Web Developer Intern"],
      ["Department", "Software Engineering"],
      ["Intern ID", doc.participantId ?? "ANX26INT00044"],
      ["Internship Type", "Hybrid (3 Days On-site / 2 Days Remote)"],
      ["Start Date", doc.issuedOn],
      ["Expected End Date", "August 15, 2026"],
      ["Duration", "12 Weeks (3 Months)"],
      ["Supervisor", "Muhammad Qasim (Founder & CEO)"],
      ["Working Schedule", "Mon – Fri / 10:00 AM – 04:00 PM PKT"],
    ],
    ["Field", "Details"],
  );

  // Section 2: Responsibilities
  flow.section("2. Responsibilities");
  flow.body("During your internship, you may be assigned responsibilities related to your position and department. Your responsibilities may include:");
  flow.bullets([
    "Working on assigned projects and development tasks.",
    "Collaborating with team members and supervisors.",
    "Participating in meetings, discussions, and training sessions.",
    "Researching and learning technologies relevant to your role.",
    "Preparing technical documentation and project reports where required.",
    "Following organizational development, security, and communication standards.",
    "Completing assigned tasks within agreed timelines.",
    "Continuously developing your professional and technical skills.",
  ]);
  flow.body("Specific responsibilities may change according to project requirements and organizational needs.", "left");

  // Section 3: Internship Terms
  flow.section("3. Internship Terms");
  flow.body("This internship is intended to provide practical professional experience and learning opportunities. You are expected to:");
  flow.bullets([
    "Maintain professional conduct throughout the internship.",
    "Follow the ANONEURX Intern Code of Conduct.",
    "Protect confidential company and client information.",
    "Follow applicable information-security requirements.",
    "Respect project deadlines and assigned responsibilities.",
    "Communicate professionally with supervisors and team members.",
  ]);
  flow.body("Your internship may be evaluated periodically based on performance, participation, technical progress, professionalism, and completion of assigned responsibilities.");

  // Section 4: Confidentiality and Security
  flow.section("4. Confidentiality and Security");
  flow.body(
    "During your internship, you may receive access to confidential information, software repositories, development systems, documentation, credentials, or other organizational resources.",
  );
  flow.body(
    "You must not disclose, copy, distribute, publish, or misuse confidential information without authorization. All access provided to you is limited to legitimate internship responsibilities and may be revoked at any time when necessary.",
  );

  // Section 5: Intellectual Property
  flow.section("5. Intellectual Property");
  flow.body(
    "Any work produced as part of your internship will be handled according to the applicable internship agreement, project requirements, and ANONEURX policies.",
  );
  flow.body(
    "You must not publicly publish, distribute, sell, or reuse proprietary ANONEURX materials without appropriate authorization. Third-party software, libraries, datasets, designs, and other resources must be used in accordance with their applicable licenses.",
  );

  // Section 6: Compensation
  flow.section("6. Compensation");
  flow.table(
    [
      ["Internship Compensation", "Paid"],
      ["Stipend", "PKR 45,000 / month (Paid on the 1st of each month)"],
    ],
    ["Compensation Item", "Specification"],
  );
  flow.body("Any compensation or benefits associated with this internship will be communicated separately or specified in the applicable internship agreement.");

  // Section 7: Internship Completion
  flow.section("7. Internship Completion");
  flow.body(
    "Upon successful completion of the internship requirements, ANONEURX may provide appropriate internship documentation, such as an Internship Certificate, subject to organizational requirements and satisfactory completion of the internship.",
  );
  flow.body("Completion documentation does not automatically imply employment or a future employment offer.");

  // Section 8: Termination
  flow.section("8. Termination");
  flow.body("The internship may be terminated by either party in accordance with the applicable internship terms.");
  flow.body(
    "ANONEURX may terminate the internship immediately in cases involving serious misconduct, unauthorized access, security violations, breach of confidentiality, fraud, harassment, or other significant violations of organizational policies.",
  );

  // Section 9: Acceptance of Offer
  flow.section("9. Acceptance of Offer");
  flow.body(
    "We are pleased to welcome you to the ANONEURX Internship Program and look forward to your contribution, learning, and professional development during the internship. Please review the information provided in this offer carefully.",
  );
  flow.body("Congratulations on your selection, and welcome to ANONEURX.", "left");

  // Executive Signoff Lockup
  flow.space(16);
  flow.heading(3, "For ANONEURX");

  const pdfInstance = flow.pdf;
  const sigY = flow.cursor + 28;

  if (SIGNATURE) {
    const sigW = 85;
    const sigH = sigW / SIGNATURE_RATIO;
    pdfInstance.addImage(SIGNATURE, "PNG", MARGIN_LEFT + 10, sigY - sigH + 4, sigW, sigH, undefined, "FAST");
  }

  pdfInstance.setDrawColor(...INK);
  pdfInstance.setLineWidth(0.7);
  pdfInstance.line(MARGIN_LEFT, sigY, MARGIN_LEFT + 190, sigY);

  pdfInstance.setFont("helvetica", "bold");
  pdfInstance.setFontSize(11);
  pdfInstance.setTextColor(...INK);
  pdfInstance.text("Muhammad Qasim", MARGIN_LEFT, sigY + 16);

  tracked(pdfInstance, "FOUNDER & CEO · ANONEURX", MARGIN_LEFT, sigY + 29, {
    size: 8.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.9,
  });

  pdfInstance.setFont("helvetica", "normal");
  pdfInstance.setFontSize(9);
  pdfInstance.setTextColor(...SECOND);
  pdfInstance.text(`Date: ${doc.issuedOn}`, MARGIN_LEFT, sigY + 44);
  pdfInstance.text("Official Contact: support@anoneurx.com", MARGIN_LEFT, sigY + 56);
  pdfInstance.text("Website: anoneurx.com", MARGIN_LEFT, sigY + 68);

  flow.space(80);
  flow.confidential("OFFICIAL PLACEMENT OFFER — ANONEURX TECHNOLOGIES.");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor(`anoneurx-offer-letter-${doc.participant ?? "intern"}`) };
};

export const downloadOfferLetterDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildOfferLetterPdf({ ...OFFER_LETTER_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewOfferLetterDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildOfferLetterPdf({ ...OFFER_LETTER_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
