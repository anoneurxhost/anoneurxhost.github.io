import { jsPDF } from "jspdf";
import {
  CERT_W,
  CERT_H,
  LOGO,
  SIGNATURE,
  SIGNATURE_SAWERA,
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

export interface HackathonCertificateDocData extends PdfDocumentLike {
  participantName: string;
  teamName?: string;
  projectName?: string;
  hackathonName?: string;
  trackName?: string;
  awardRank?: string; // e.g. "1st Place Winner", "Best AI Innovation", "Finalist"
  eventDate?: string;
}

export const generateHackathonCertificateDoc = async (doc: HackathonCertificateDocData): Promise<jsPDF> => {
  await loadArtwork();
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const w = CERT_W;
  const h = CERT_H;

  setMetadata(
    pdf,
    `ANONEURX Hackathon Certificate — ${doc.participantName}`,
    "Official Hackathon Achievement Certificate",
    ["hackathon", "certificate", doc.participantName, doc.hackathonName || "Anoneurx Hackathon"]
  );

  // Background Plate
  drawCertificatePlate(pdf, w, h);

  // Header Brand & Logo
  const markH = 26;
  const logoX = 64;
  const logoY = 56;
  const markW = drawMark(pdf, LOGO, logoX, logoY, markH);
  drawBrandWordmark(pdf, logoX + (markW ? markW + 8 : 0), logoY + 18, 18, INK, "ANONEURX", "left", false);

  // Top Right Reference Code
  const ref = refCode(doc);
  tracked(pdf, `REF ${ref}`, w - 64, logoY + 12, {
    size: 8.5,
    weight: "normal",
    color: SECOND,
    tracking: 1.0,
    align: "right",
  });

  // Certificate Kicker
  const kickerY = 140;
  tracked(pdf, "OFFICIAL HACKATHON ACHIEVEMENT CERTIFICATE", w / 2, kickerY, {
    size: 10,
    weight: "bold",
    color: SECOND,
    tracking: 2.2,
    align: "center",
  });

  // Main Title
  const titleY = kickerY + 36;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(...INK);
  pdf.text("CERTIFICATE OF EXCELLENCE", w / 2, titleY, { align: "center" });

  // Subtitle presentation
  const presY = titleY + 28;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(...SECOND);
  pdf.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", w / 2, presY, { align: "center" });

  // Participant Name
  const nameY = presY + 42;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(...INK);
  pdf.text((doc.participantName || doc.name || "PARTICIPANT").toUpperCase(), w / 2, nameY, { align: "center" });

  // Hairline Accent
  pdf.setDrawColor(20, 32, 50);
  pdf.setLineWidth(1.5);
  pdf.line(w / 2 - 120, nameY + 12, w / 2 + 120, nameY + 12);

  // Citation Body
  const bodyY = nameY + 38;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(11.5);
  pdf.setTextColor(...SECOND);

  const hackName = doc.hackathonName || "ANONEURX GLOBAL AI HACKATHON 2026";
  const rank = doc.awardRank || "FIRST PLACE WINNER";
  const proj = doc.projectName ? ` for building "${doc.projectName}"` : "";
  const team = doc.teamName ? ` (Team: ${doc.teamName})` : "";

  const text1 = `For outstanding technical innovation, engineering excellence, and achieving ${rank}${proj}${team} at the ${hackName}.`;
  
  const lines = pdf.splitTextToSize(text1, w - 240);
  lines.forEach((line: string, i: number) => {
    pdf.text(line, w / 2, bodyY + i * 16, { align: "center" });
  });

  // Signatures Section
  const sigY = h - 110;
  const sigW = 90;

  // CEO / Founder Signature
  if (SIGNATURE) {
    pdf.addImage(SIGNATURE, "PNG", logoX + 20, sigY - 32, sigW, sigW / (758 / 182), undefined, "FAST");
  }
  pdf.setDrawColor(180, 185, 190);
  pdf.setLineWidth(0.7);
  pdf.line(logoX, sigY, logoX + 160, sigY);
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...INK);
  pdf.text("Muhammad Qasim", logoX, sigY + 14);
  tracked(pdf, "FOUNDER & CEO, ANONEURX", logoX, sigY + 26, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
  });

  // Hackathon Director / Engineering Lead Signature
  const rightSigX = w - 64 - 160;
  if (SIGNATURE_SAWERA) {
    pdf.addImage(SIGNATURE_SAWERA, "PNG", rightSigX + 30, sigY - 36, 80, 80 / (580 / 352), undefined, "FAST");
  }
  pdf.line(rightSigX, sigY, rightSigX + 160, sigY);
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...INK);
  pdf.text("Sawera Afzal", rightSigX, sigY + 14);
  tracked(pdf, "DIRECTOR OF ENGINEERING", rightSigX, sigY + 26, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
  });

  // Footer Verification Link
  const footerY = h - 36;
  tracked(pdf, `VERIFICATION URL: ${verifyUrl(doc)}`, w / 2, footerY, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });
  tracked(pdf, `ISSUED ON: ${doc.issuedOn || doc.eventDate || today()}`, w / 2, footerY + 12, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });

  return pdf;
};
