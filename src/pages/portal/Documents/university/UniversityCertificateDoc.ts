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

export interface UniversityCertificateDocData extends PdfDocumentLike {
  studentName: string;
  studentId?: string;
  degreeTitle?: string;
  majorProgram?: string;
  graduationDate?: string;
  gpa?: string;
  honors?: string;
}

export const generateUniversityCertificateDoc = async (doc: UniversityCertificateDocData): Promise<jsPDF> => {
  await loadArtwork();
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const w = CERT_W;
  const h = CERT_H;

  setMetadata(
    pdf,
    `ANONEURX University Diploma — ${doc.studentName}`,
    "Official Academic Degree Certificate",
    ["university", "diploma", "degree", doc.studentName, doc.degreeTitle || "Computer Science"]
  );

  drawCertificatePlate(pdf, w, h);

  const logoX = 64;
  const logoY = 56;
  const markW = drawMark(pdf, LOGO, logoX, logoY, 26);
  drawBrandWordmark(pdf, logoX + (markW ? markW + 8 : 0), logoY + 18, 18, INK, "ANONEURX UNIVERSITY", "left", false);

  const ref = refCode(doc);
  tracked(pdf, `REF ${ref}`, w - 64, logoY + 12, {
    size: 8.5,
    color: SECOND,
    tracking: 1.0,
    align: "right",
  });

  const kickerY = 138;
  tracked(pdf, "OFFICIAL ACADEMIC DEGREE CERTIFICATE", w / 2, kickerY, {
    size: 10,
    weight: "bold",
    color: SECOND,
    tracking: 2.2,
    align: "center",
  });

  const titleY = kickerY + 36;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(...INK);
  pdf.text("DIPLOMA OF ACADEMIC EXCELLENCE", w / 2, titleY, { align: "center" });

  const presY = titleY + 28;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(...SECOND);
  pdf.text("BE IT KNOWN THAT UPON RECOMMENDATION OF THE FACULTY HAS CONFERRED UPON", w / 2, presY, { align: "center" });

  const nameY = presY + 42;
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(32);
  pdf.setTextColor(...INK);
  pdf.text((doc.studentName || doc.name || "STUDENT NAME").toUpperCase(), w / 2, nameY, { align: "center" });

  pdf.setDrawColor(20, 32, 50);
  pdf.setLineWidth(1.5);
  pdf.line(w / 2 - 120, nameY + 12, w / 2 + 120, nameY + 12);

  const bodyY = nameY + 38;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(11.5);
  pdf.setTextColor(...SECOND);

  const degree = doc.degreeTitle || "BACHELOR OF SCIENCE IN SYSTEMS ENGINEERING";
  const honors = doc.honors ? ` WITH ${doc.honors.toUpperCase()}` : "";
  const sid = doc.studentId ? ` (Student ID: ${doc.studentId})` : "";

  const text = `The degree of ${degree}${honors}${sid} with all the rights, honors, privileges, and responsibilities thereunto appertaining.`;
  
  const lines = pdf.splitTextToSize(text, w - 240);
  lines.forEach((line: string, i: number) => {
    pdf.text(line, w / 2, bodyY + i * 16, { align: "center" });
  });

  const sigY = h - 110;
  const sigW = 90;

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
  tracked(pdf, "CHANCELLOR, ANONEURX UNIVERSITY", logoX, sigY + 26, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
  });

  const rightSigX = w - 64 - 160;
  if (SIGNATURE_SAWERA) {
    pdf.addImage(SIGNATURE_SAWERA, "PNG", rightSigX + 30, sigY - 36, 80, 80 / (580 / 352), undefined, "FAST");
  }
  pdf.line(rightSigX, sigY, rightSigX + 160, sigY);
  pdf.setFont(FONT, "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...INK);
  pdf.text("Sawera Afzal", rightSigX, sigY + 14);
  tracked(pdf, "DEAN OF ACADEMIC AFFAIRS", rightSigX, sigY + 26, {
    size: 7.5,
    weight: "normal",
    color: SECOND,
    tracking: 0.8,
  });

  const footerY = h - 36;
  tracked(pdf, `VERIFICATION URL: ${verifyUrl(doc)}`, w / 2, footerY, {
    size: 7.5,
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });
  tracked(pdf, `CONFERRED ON: ${doc.issuedOn || doc.graduationDate || today()}`, w / 2, footerY + 12, {
    size: 7.5,
    color: SECOND,
    tracking: 0.8,
    align: "center",
  });

  return pdf;
};
