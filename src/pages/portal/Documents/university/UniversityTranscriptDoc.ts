import { jsPDF } from "jspdf";
import {
  newDoc,
  drawCover,
  applyFooters,
  Flow,
  loadArtwork,
  refCode,
  today,
  setMetadata,
  LOGO,
  PdfDocumentLike,
} from "../pdfBase";

export interface CourseGrade {
  code: string;
  title: string;
  credits: number;
  grade: string;
}

export interface UniversityTranscriptDocData extends PdfDocumentLike {
  studentName: string;
  studentId: string;
  program: string;
  term?: string;
  cumulativeGpa?: string;
  creditsEarned?: number;
  courses?: CourseGrade[];
}

export const generateUniversityTranscriptDoc = async (doc: UniversityTranscriptDocData): Promise<jsPDF> => {
  await loadArtwork();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(
    pdf,
    `ANONEURX University Transcript — ${doc.studentName}`,
    "Official Academic Transcript Record",
    ["university", "transcript", "academic record", doc.studentName]
  );

  drawCover(pdf, {
    title: "OFFICIAL ACADEMIC TRANSCRIPT",
    subtitle: "ANONEURX UNIVERSITY RECORD OF SCHOLASTIC ACHIEVEMENT",
    kicker: "OFFICIAL ACADEMIC TRANSCRIPT",
    mark: LOGO,
    ref,
    edition: "2026 ACADEMIC YEAR",
    rows: [
      ["STUDENT NAME", doc.studentName || "STUDENT"],
      ["STUDENT ID", doc.studentId || "ANX-UNI-8810"],
      ["PROGRAM", doc.program || "SOFTWARE ENGINEERING"],
      ["CUMULATIVE GPA", doc.cumulativeGpa || "3.92 / 4.00"],
    ],
  });

  const flow = new Flow(pdf, {
    headerLeft: "ANONEURX UNIVERSITY — ACADEMIC TRANSCRIPT",
    mark: LOGO,
  });

  flow.newPage();
  flow.title("OFFICIAL ACADEMIC TRANSCRIPT", "SCHOLASTIC PERFORMANCE RECORD");

  flow.section("Student Information");
  flow.table([
    ["Full Name", doc.studentName || "Alex Morgan"],
    ["Student Identification", doc.studentId || "ANX-UNI-8810"],
    ["Degree Program", doc.program || "Bachelor of Science in Systems Engineering"],
    ["Academic Status", "Good Standing / Enrolled"],
    ["Total Credits Earned", String(doc.creditsEarned || 120)],
    ["Cumulative GPA", doc.cumulativeGpa || "3.92"],
    ["Date Issued", doc.issuedOn || today()],
  ]);

  flow.section("Course Completed & Grade Log");

  const defaultCourses: CourseGrade[] = [
    { code: "CS-101", title: "Advanced Data Structures & Algorithms", credits: 4, grade: "A+" },
    { code: "SYS-202", title: "Distributed Systems Architecture & Consensus", credits: 4, grade: "A" },
    { code: "AI-301", title: "Neural Networks & Tensor Inference", credits: 4, grade: "A" },
    { code: "SEC-404", title: "Cryptographic Protocols & Kernel Security", credits: 4, grade: "A-" },
    { code: "DEV-499", title: "Capstone Systems Engineering Project", credits: 6, grade: "A+" },
  ];

  const courseList = doc.courses && doc.courses.length > 0 ? doc.courses : defaultCourses;

  const tableRows: Array<[string, string]> = courseList.map((c) => [
    `${c.code} — ${c.title}`,
    `${c.credits} Credits | Grade: ${c.grade}`,
  ]);

  flow.table(tableRows, ["Course Code & Title", "Credits & Grade"]);

  flow.section("Registrar Certification");
  flow.body(
    "This transcript is an official certified record of academic achievements at Anoneurx University. Any alterations or unauthorized reproductions invalidate this document."
  );

  flow.signature("Sawera Afzal", "Registrar & Academic Dean, Anoneurx University");

  flow.confidential("ANONEURX UNIVERSITY — OFFICIAL REGISTRAR DOCUMENT");

  applyFooters(pdf, ref);
  return pdf;
};
