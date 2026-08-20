import { jsPDF } from "jspdf";
import {
  loadMark,
  setMetadata,
  drawCertificatePlate,
  drawMark,
  tracked,
  accentRule,
  CERT_W,
  CERT_H,
  LOGO_RATIO,
  SIGNATURE_RATIO,
  INK,
  SECOND,
  ACCENT,
  SIGNATURE,
  fileNameFor,
  type PdfDocumentLike,
} from "../pdfBase";
import { internProfiles } from "@/data/internProfiles";

export const COMPLETION_CERTIFICATE_SPEC: PdfDocumentLike = {
  name: "Certificate of Completion",
  type: "Certificate",
  status: "verified",
  issuedOn: "Aug 15, 2026",
  description:
    "Formal Certificate of Internship presented upon successful completion of all programme requirements, deliverables and final assessment.",
  issuer: "Anoneurx Executive Board",
  sizeKb: 1420,
  program: "internship",
  programme: "React Web Developer Internship",
};


/** Custom PDF Builder for Internship Completion Certificate */
export const buildCompletionCertificatePdf = async (doc: PdfDocumentLike = COMPLETION_CERTIFICATE_SPEC) => {
  const mark = await loadMark();
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  setMetadata(pdf, doc.name, `${doc.type} · ${doc.programme ?? "React Web Developer Internship"}`, [
    "Certificate of Internship",
    "Anoneurx Completion Certificate",
    doc.verificationId ?? "",
  ]);

  drawCertificatePlate(pdf, CERT_W, CERT_H);

  // ─── TOP-LEFT: Logo only — left-aligned in the black decorative panel ────────
  const logoH = 64;
  const logoX = 16; // left padding inside the panel
  const PANEL_TOP = 28;
  drawMark(pdf, mark, logoX, PANEL_TOP, logoH);

  // ─── RIGHT COLUMN: all body content starts here ───────────────────────────────
  // The decorative panel ends around x ≈ 205 pt; body starts at 220 pt.
  const BODY_X = 220;       // left edge of the right content column
  const BODY_RIGHT = CERT_W - 32; // right edge (32 pt margin from right)
  const BODY_W = BODY_RIGHT - BODY_X;
  const BODY_MID = BODY_X + BODY_W / 2;

  /** Helper: centred text within the right body column */
  const centreRight = (
    text: string,
    y: number,
    opts: { size: number; weight?: "bold" | "normal"; color?: [number, number, number]; maxWidth?: number },
  ) => {
    pdf.setFont("helvetica", opts.weight ?? "normal");
    pdf.setFontSize(opts.size);
    pdf.setTextColor(...(opts.color ?? INK));
    const lines: string[] = pdf.splitTextToSize(text, opts.maxWidth ?? BODY_W);
    let cursor = y;
    lines.forEach((l) => {
      pdf.text(l, BODY_MID, cursor, { align: "center" });
      cursor += opts.size * 1.35;
    });
    return cursor;
  };

  // Title block (shifted down)
  tracked(pdf, "CERTIFICATE OF INTERNSHIP", BODY_MID, 125, {
    size: 23,
    weight: "bold",
    color: INK,
    tracking: 2.2,
    align: "center",
  });

  centreRight("This certificate is proudly presented to", 176, {
    size: 10.5,
    color: SECOND,
  });

  // Recipient Name — look up intern profile for personalised body text
  const name = doc.participant ?? "Insha";
  const profile = internProfiles.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );
  const role = profile?.history?.[0]?.role ?? "Intern";
  const dept = profile?.department ?? "Engineering";
  const programme = doc.programme ?? "React Web Developer Internship";
  const internId = profile?.internId ?? doc.participantId ?? "";

  pdf.setFont("times", "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(...ACCENT);
  pdf.text(name.toUpperCase(), BODY_MID, 222, { align: "center" });
  pdf.setDrawColor(...ACCENT);
  pdf.setLineWidth(0.8);
  pdf.line(BODY_MID - 190, 234, BODY_MID + 190, 234);

  // Intern ID — taken from the intern profile record
  if (internId) {
    tracked(pdf, `INTERN ID · ${internId.toUpperCase()}`, BODY_MID, 251, {
      size: 8.5,
      weight: "bold",
      color: ACCENT,
      tracking: 1.6,
      align: "center",
    });
  }

  let y = centreRight(
    `has successfully completed the ${programme} at`,
    internId ? 273 : 263,
    { size: 11.5, color: INK, maxWidth: BODY_W - 24 },
  );

  y = centreRight(`Anoneurx`, y + 2, {
    size: 12.5,
    weight: "bold",
    color: ACCENT,
  });

  // Dynamic praise paragraph — adapts to the intern's actual role & department
  const praiseText =
    `Throughout the programme, ${name} demonstrated sincerity, technical discipline and a ` +
    `consistent commitment to the work entrusted to them as a ${role} within the ${dept} ` +
    `department. We recognise their ability, their ownership of every deliverable and the ` +
    `professionalism they brought to the team.`;

  y = centreRight(praiseText, y + 10, {
    size: 10,
    color: SECOND,
    maxWidth: BODY_W - 40,
  });

  centreRight(
    `We take this opportunity to wish ${name} the very best for the future.`,
    y + 8,
    { size: 10, color: SECOND, maxWidth: BODY_W - 40 },
  );

  // ─── Executive Signature (centred within right column) ──────────────────────
  // Kept anchored at the bottom of the certificate above the footer
  // ─── Executive Signature Configuration ──────────────────────────────────────
  const signY = CERT_H - 110; // Positioned lower on the page (closer to footer)
  const cx = BODY_MID;       // Horizontal center

  if (SIGNATURE) {
    const sigH = 38;
    const sigW = Math.min(sigH * SIGNATURE_RATIO, 160);

    pdf.addImage(
      SIGNATURE,
      "PNG",
      cx - sigW / 2,
      signY - sigH + 6, // Shifted lower onto the signature line
      sigW,
      sigH,
      undefined,
      "FAST"
    );
  }

  pdf.setDrawColor(...INK);
  pdf.setLineWidth(0.7);
  pdf.line(cx - 100, signY, cx + 100, signY);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10.5);
  pdf.setTextColor(...INK);
  pdf.text("Muhammad Qasim", cx, signY + 15, { align: "center" });
  tracked(pdf, "FOUNDER & CHIEF EXECUTIVE OFFICER", cx, signY + 27, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.9,
    align: "center",
  });

  // ─── Footer centred in right column ──────────────────────────────────────────
  accentRule(pdf, BODY_MID - 55, CERT_H - 60, 110, 1.2);
  tracked(pdf, `ISSUED ${doc.issuedOn.toUpperCase()}`, BODY_MID, CERT_H - 31, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 1.1,
    align: "center",
  });

  return { pdf, fileName: fileNameFor(`${name}-${doc.name}`) };
};

export const downloadCompletionCertificateDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildCompletionCertificatePdf({
    ...COMPLETION_CERTIFICATE_SPEC,
    ...overrides,
  });
  pdf.save(fileName);
};

export const previewCompletionCertificateDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildCompletionCertificatePdf({
    ...COMPLETION_CERTIFICATE_SPEC,
    ...overrides,
  });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
