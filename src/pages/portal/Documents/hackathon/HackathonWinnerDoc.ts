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

export interface HackathonWinnerDocData extends PdfDocumentLike {
  participantName: string;
  teamName: string;
  projectName: string;
  hackathonName: string;
  trackName: string;
  prizeTitle: string;
  prizeAmount?: string;
  projectDescription?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export const generateHackathonWinnerDoc = async (doc: HackathonWinnerDocData): Promise<jsPDF> => {
  await loadArtwork();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(
    pdf,
    `ANONEURX Hackathon Winner Award — ${doc.teamName}`,
    "Official Hackathon Winner Award Document",
    ["hackathon", "winner", doc.teamName, doc.hackathonName]
  );

  // Cover Page
  drawCover(pdf, {
    title: `${doc.hackathonName || "ANONEURX HACKATHON"} WINNER AWARD`,
    subtitle: `${doc.prizeTitle || "GRAND PRIZE WINNER"} — ${doc.trackName || "OPEN AI TRACK"}`,
    kicker: "OFFICIAL HACKATHON AWARD SPECIFICATION",
    mark: LOGO,
    ref,
    edition: "2026 EDITION",
    rows: [
      ["TEAM NAME", doc.teamName || "TEAM ALPHA"],
      ["LEAD BUILDER", doc.participantName || doc.name || "BUILDER"],
      ["PROJECT", doc.projectName || "PROJECT CORTEX"],
      ["AWARD DATE", doc.issuedOn || today()],
    ],
  });

  // Page 2 Content
  const flow = new Flow(pdf, {
    headerLeft: "HACKATHON WINNER AWARD SPECIFICATION",
    mark: LOGO,
  });

  flow.newPage();
  flow.title("HACKATHON WINNER AWARD SPECIFICATION", doc.hackathonName);

  flow.section("Award Overview");
  flow.body(
    `This official document certifies that ${doc.teamName} led by ${doc.participantName} has been awarded ${doc.prizeTitle || "First Place"} at the ${doc.hackathonName || "ANONEURX Global Hackathon"}.\n\nThe team demonstrated exceptional technical engineering, innovative architecture, and creative problem solving.`
  );

  flow.section("Project Details & Technical Stack");
  flow.table([
    ["Project Name", doc.projectName || "Cortex Edge Runtime"],
    ["Track Category", doc.trackName || "AI & Autonomous Systems"],
    ["Award Rank", doc.prizeTitle || "First Place Winner"],
    ["Prize Pool / Grant", doc.prizeAmount || "$10,000 USD Grant"],
    ["Repository Link", doc.repoUrl || "https://github.com/anoneurx/cortex-edge"],
    ["Live Demo URL", doc.demoUrl || "https://cortex.anoneurx.com"],
  ]);

  if (doc.projectDescription) {
    flow.section("Project Summary");
    flow.body(doc.projectDescription);
  }

  flow.section("Judging Panel Endorsement");
  flow.body(
    "The submissions were evaluated by an expert panel of Anoneurx principal engineers, system architects, and industry judges based on Technical Complexity, Architecture Quality, User Experience, and Execution Speed."
  );

  flow.signature("Muhammad Qasim", "Founder & CEO, Anoneurx");

  flow.confidential("ANONEURX TECHNOLOGIES — OFFICIAL HACKATHON AWARD DOCUMENT");

  applyFooters(pdf, ref);
  return pdf;
};
