import { jsPDF } from "jspdf";
import {
  CERT_W,
  CERT_H,
  LOGO,
  SIGNATURE,
  loadArtwork,
  drawCertificatePlate,
  drawMark,
  drawBrandWordmark,
  tracked,
  refCode,
  verifyUrl,
  today,
  setMetadata,
  FONT,
  INK,
  SECOND,
  PdfDocumentLike,
} from "../pdfBase";

export interface HackathonParticipationDocData extends PdfDocumentLike {
  participantName: string;
  projectName?: string;
  hackathonName?: string;
  hoursContributed?: number;
  eventDate?: string;
}

export const generateHackathonParticipationDoc = async (doc: HackathonParticipationDocData): Promise<jsPDF> => {
  await loadArtwork();
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const w = CERT_W;
  const h = CERT_H;

  setMetadata(
    pdf,
    `ANONEURX Hackathon Builder Certificate — ${doc.participantName}`,
    "Official Hackathon Participation Certificate",
    ["hackathon", "builder", "participation", doc.participantName]
  );

  drawCertificatePlate(pdf, w, h);

  const logoX = 64;
  const logoY = 56;
  const markW = drawMark(pdf, LOGO, logoX, logoY, 26);
  drawBrandWordmark(pdf, logoX + (markW ? markW + 8 : 0), logoY + 18, 18, INK, "ANONEURX", "left", false);

  const ref = refCode(doc);
  tracked(pdf, `REF ${ref}`, w - 64, logoY + 12, {
    size: 8.5,
    color: SECOND,
    tracking: 1.0,
    align: "right",
  });

  const kickerY = 140;
  tracked(pdf, "OFFICIAL BUILDER PARTICIPATION CERTIFICATE", w / 2, kickerY, {
    size: 10,
    weight: "bold",
    color: SECOND,
    tracking: 2.0,
    align: "center",
  });

  const titleY = kickerY + 36;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(...INK);
  pdf.text("CERTIFICATE OF PARTICIPATION", w / 2, titleY, { align: "center" });

  const presY = titleY + 28;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(...SECOND);
  pdf.text("PRESENTED TO BUILDER", w / 2, presY, { align: "center" });

  const nameY = presY + 42;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(...INK);
  pdf.text((doc.participantName || doc.name || "PARTICIPANT").toUpperCase(), w / 2, nameY, { align: "center" });

  pdf.setDrawColor(20, 32, 50);
  pdf.setLineWidth(1.5);
  pdf.line(w / 2 - 100, nameY + 12, w / 2 + 100, nameY + 12);

  const bodyY = nameY + 38;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(11.5);
  pdf.setTextColor(...SECOND);

  const hackName = doc.hackathonName || "ANONEURX GLOBAL HACKATHON 2026";
  const proj = doc.projectName ? ` building "${doc.projectName}"` : "";
  const hours = doc.hoursContributed ? ` and contributing ${doc.hoursContributed}+ hours of code` : "";

  const text = `In recognition of active participation, collaborative engineering, and building at the ${hackName}${proj}${hours}.`;
  
  const lines = pdf.splitTextToSize(text, w - 240);
  lines.forEach((line: string, i: number) => {
    pdf.text(line, w / 2, bodyY + i * 16, { align: "center" });
  });

  const sigY = h - 110;
  if (SIGNATURE) {
    pdf.addImage(SIGNATURE, "PNG", w / 2 - 45, sigY - 32, 90, 90 / (758 / 182), undefined, "FAST");
  }
  pdf.setDrawColor(180, 185, 190);
  pdf.setLineWidth(0.7);
  pdf.line(w / 2 - 80, sigY, w / 2 + 80, sigY);
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...INK);
  pdf.text("Muhammad Qasim", w / 2, sigY + 14, { align: "center" });
  tracked(pdf, "FOUNDER & CEO, ANONEURX", w / 2, sigY + 26, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });

  const footerY = h - 36;
  tracked(pdf, `VERIFICATION URL: ${verifyUrl(doc)}`, w / 2, footerY, {
    size: 7.5,
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });
  tracked(pdf, `ISSUED ON: ${doc.issuedOn || doc.eventDate || today()}`, w / 2, footerY + 12, {
    size: 7.5,
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });

  return pdf;
};
