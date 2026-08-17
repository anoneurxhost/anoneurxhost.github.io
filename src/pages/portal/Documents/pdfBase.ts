import { jsPDF } from "jspdf";
import logoUrl from "@/assets/documents/logo.png";
import certificatePlateUrl from "@/assets/documents/certificate-plate.jpg";
import letterheadPlateUrl from "@/assets/documents/letterhead-plate.png";
import signatureUrl from "@/assets/documents/signature-qasim.png";
import signatureSaweraUrl from "@/assets/documents/signature-sawera.png";

export interface PdfDocumentLike {
  name: string;
  type: string;
  status: string;
  issuedOn: string;
  description: string;
  issuer?: string;
  verificationId?: string;
  program?: string;
  programme?: string;
  sizeKb?: number;
  participant?: string;
  participantId?: string;
}

export type Pdf = jsPDF;

export const FONT = "helvetica";

/**
 * A4 dimensions in points (1 mm = 2.834645669 pt)
 * A4 = 210 × 297 mm -> 595.28 × 841.89 pt
 */
export const PAGE_W = 595.28;
export const PAGE_H = 841.89;
export const CERT_W = 841.89;
export const CERT_H = 595.28;

/**
 * Standard ANONEURX Margins:
 * Top: 22 mm (62.36 pt)
 * Bottom: 22 mm (62.36 pt)
 * Left: 24 mm (68.03 pt)
 * Right: 24 mm (68.03 pt)
 */
export const MARGIN_LEFT = 68.03;
export const MARGIN_RIGHT = 68.03;
export const MARGIN_TOP = 62.36;
export const MARGIN_BOTTOM = 62.36;

/** Backward-compatibility fallback margin value */
export const MARGIN = MARGIN_LEFT;

export const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT; // 459.22 pt (~162 mm readable text width)
export const CONTENT_TOP = MARGIN_TOP;
export const CONTENT_BOTTOM = PAGE_H - MARGIN_BOTTOM - 24;

/**
 * ANONEURX Restrained Corporate Color Palette (SpaceX Tech Aesthetic)
 */
export const INK: [number, number, number] = [17, 17, 19];      // Near Black / High-contrast Dark Gray
export const SECOND: [number, number, number] = [90, 95, 102];  // Medium Technical Gray
export const MUTED: [number, number, number] = [135, 140, 148]; // Muted Metadata Gray
export const HAIR: [number, number, number] = [220, 222, 225];  // Subtle Precision Hairline Divider
export const ACCENT: [number, number, number] = [20, 32, 50];   // Deep Aerospace Navy Slate Accent

export const LOGO_RATIO = 496 / 503;
/** Muhammad Qasim signature artwork — width / height. */
export const SIGNATURE_RATIO = 758 / 182;
/** Sawera Afzal signature artwork — width / height. */
export const SIGNATURE_SAWERA_RATIO = 580 / 352;

const imageCache = new Map<string, string | null>();

export const loadImageData = async (url: string): Promise<string | null> => {
  if (imageCache.has(url)) return imageCache.get(url) ?? null;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    imageCache.set(url, data);
    return data;
  } catch {
    imageCache.set(url, null);
    return null;
  }
};

export let LOGO: string | null = null;
export let CERT_PLATE: string | null = null;
export let LETTER_PLATE: string | null = null;
export let SIGNATURE: string | null = null;
export let SIGNATURE_SAWERA: string | null = null;

export const loadArtwork = async () => {
  const [logo, cert, letter, signature, sawera] = await Promise.all([
    loadImageData(logoUrl),
    loadImageData(certificatePlateUrl),
    loadImageData(letterheadPlateUrl),
    loadImageData(signatureUrl),
    loadImageData(signatureSaweraUrl),
  ]);
  LOGO = logo;
  CERT_PLATE = cert;
  LETTER_PLATE = letter;
  SIGNATURE = signature;
  SIGNATURE_SAWERA = sawera;
};

export const loadMark = async (): Promise<string | null> => {
  await loadArtwork();
  return LOGO;
};


/**
 * Renders the ANONEURX brand wordmark using Anurati font (the front-brand style).
 * Falls back to the tracked-helvetica brandWordmark if Anurati isn't registered.
 * `anuratiReady` is the boolean returned by loadAnuratiFontInto().
 */
export const drawBrandWordmark = (
  pdf: Pdf,
  x: number,
  y: number,
  size: number,
  color: [number, number, number],
  text: string,
  align: "left" | "center" | "right",
  anuratiReady: boolean,
) => {
  if (anuratiReady) {
    pdf.setFont("Anurati", "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    pdf.text(text, x, y, { align });
    // Restore default font
    pdf.setFont(FONT, "normal");
  } else {
    brandWordmark(pdf, x, y, size, color, text, align);
  }
};


export const drawMark = (pdf: Pdf, mark: string | null, x: number, y: number, height: number) => {
  if (!mark) return 0;
  const w = height * LOGO_RATIO;
  pdf.addImage(mark, "PNG", x, y, w, height, undefined, "FAST");
  return w;
};

export const drawLetterhead = (pdf: Pdf) => {
  if (!LETTER_PLATE) return;
  pdf.addImage(LETTER_PLATE, "PNG", 0, 0, PAGE_W, PAGE_H, undefined, "FAST");
};

export const drawCertificatePlate = (pdf: Pdf, w: number, h: number) => {
  if (!CERT_PLATE) return;
  pdf.addImage(CERT_PLATE, "JPEG", 0, 0, w, h, undefined, "FAST");
};

export const programLabel = (program?: string) => {
  switch (program) {
    case "university":
      return "ANONEURX UNIVERSITY";
    case "internship":
      return "ANONEURX INTERNSHIP PROGRAM";
    case "hackathon":
      return "ANONEURX HACKATHON";
    case "organization":
      return "ANONEURX ORGANIZATION";
    default:
      return "ANONEURX TECHNOLOGIES";
  }
};

export const refCode = (doc: PdfDocumentLike) =>
  doc.verificationId || `ANX/DOC/${doc.type.replace(/[^A-Z]/gi, "").slice(0, 4).toUpperCase()}`;

export const verifyUrl = (doc: PdfDocumentLike) =>
  `https://anoneurx.com/intern/verify?doc=${encodeURIComponent(doc.verificationId ?? "")}`;

export const today = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const fileNameFor = (name: string) =>
  `${name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}.pdf`;

export const setMetadata = (pdf: Pdf, title: string, subject: string, keywords: string[]) => {
  pdf.setProperties({
    title,
    subject,
    author: "ANONEURX Technologies",
    creator: "ANONEURX Official Document Engine",
    keywords: ["anoneurx", "anoneurx technologies", "official document", ...keywords].join(", "),
  });
};

/** Minimal precision divider rule */
export const accentRule = (pdf: Pdf, x: number, y: number, w: number, h = 1.0) => {
  pdf.setFillColor(...ACCENT);
  pdf.rect(x, y, w, h, "F");
};

export const hairline = (pdf: Pdf, x1: number, y: number, x2: number, weight = 0.5) => {
  pdf.setDrawColor(...HAIR);
  pdf.setLineWidth(weight);
  pdf.line(x1, y, x2, y);
};

export const trackedWidth = (pdf: Pdf, text: string, tracking: number) => {
  let w = 0;
  text.split("").forEach((ch) => {
    w += pdf.getTextWidth(ch) + tracking;
  });
  return w - tracking;
};

export const tracked = (
  pdf: Pdf,
  text: string,
  x: number,
  y: number,
  opts: {
    size: number;
    weight?: "bold" | "normal";
    color?: [number, number, number];
    tracking?: number;
    align?: "left" | "right" | "center";
  },
) => {
  const size = opts.size;
  pdf.setFont(FONT, opts.weight ?? "bold");
  pdf.setFontSize(size);
  pdf.setTextColor(...(opts.color ?? INK));
  const tr = opts.tracking ?? size * 0.18;
  const total = trackedWidth(pdf, text, tr);
  let cursor = x;
  if (opts.align === "right") cursor = x - total;
  if (opts.align === "center") cursor = x - total / 2;
  text.split("").forEach((ch) => {
    pdf.text(ch, cursor, y);
    cursor += pdf.getTextWidth(ch) + tr;
  });
  return total;
};

export const brandWordmark = (
  pdf: Pdf,
  x: number,
  y: number,
  size = 22,
  color: [number, number, number] = INK,
  text = "ANONEURX",
  align: "left" | "right" | "center" = "left",
) => {
  const formattedText = text.replace(/\s+/g, "");
  return tracked(pdf, formattedText, x, y, { size, color, tracking: size * 0.28, align, weight: "bold" });
};

/**
 * Intelligent Document Content Flow Engine
 * Manages vertical rhythm, body line height (1.4x), section spacing (20-26pt before, 8-10pt after),
 * bullet lists, tables, and orphan protection.
 */
export class Flow {
  y = CONTENT_TOP;
  private sectionIndex = 0;

  resetSections() {
    this.sectionIndex = 0;
  }

  constructor(
    public pdf: Pdf,
    public opts: { headerLeft: string; mark: string | null; anuratiReady?: boolean },
  ) {}

  private lineHeight(size: number, multiplier = 1.4) {
    return size * multiplier;
  }

  ensure(space: number) {
    if (this.y + space <= CONTENT_BOTTOM) return;
    this.newPage();
  }

  newPage() {
    this.pdf.addPage();
    this.y = CONTENT_TOP;
    drawLetterhead(this.pdf);
    this.drawHeader();
  }

  drawHeader() {
    const pdf = this.pdf;
    const baseline = MARGIN_TOP - 16;
    const markH = 12;
    const markW = drawMark(pdf, this.opts.mark, MARGIN_LEFT, baseline - markH + 2, markH);
    drawBrandWordmark(pdf, MARGIN_LEFT + (markW ? markW + 6 : 0), baseline, 8.5, INK, "ANONEURX", "left", this.opts.anuratiReady ?? false);
    tracked(pdf, this.opts.headerLeft.toUpperCase(), PAGE_W - MARGIN_RIGHT, baseline, {
      size: 8.5,
      weight: "normal",
      color: SECOND,
      tracking: 0.9,
      align: "right",
    });
    hairline(pdf, MARGIN_LEFT, baseline + 8, PAGE_W - MARGIN_RIGHT, 0.5);
    this.y = MARGIN_TOP + 12;
  }

  /**
   * First Content Page Title Block
   * Section 5: Main Document Title 24-28 pt Bold, 14-18 pt spacing after
   */
  title(text: string, subtitle?: string) {
    const pdf = this.pdf;
    this.ensure(60);
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(26);
    pdf.setTextColor(...INK);
    const lines = pdf.splitTextToSize(text.toUpperCase(), CONTENT_W);
    lines.forEach((l: string) => {
      this.y += 28;
      pdf.text(l, MARGIN_LEFT, this.y);
    });
    if (subtitle) {
      this.y += 14;
      tracked(pdf, subtitle.toUpperCase(), MARGIN_LEFT, this.y, {
        size: 9.5,
        weight: "normal",
        color: SECOND,
        tracking: 1.2,
      });
    }
    this.y += 14;
    hairline(this.pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.7);
    this.y += 18;
  }

  /**
   * Section Heading (H1)
   * Section 5: 15-17 pt SemiBold/Bold (16 pt), 20-26 pt before, 8-10 pt after.
   */
  section(label: string) {
    const pdf = this.pdf;
    this.sectionIndex += 1;
    // Prevent orphan section heading
    this.ensure(24 + 16 + 10 + 35);
    this.y += 22; // 22 pt before
    hairline(pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.5);
    this.y += 16;
    
    // Check if label already starts with a number (e.g. "1. Introduction" or "1. Internship Details")
    const hasNum = /^\d+[.)]?\s*/.test(label);
    const textToDraw = hasNum ? label : `${this.sectionIndex}. ${label}`;

    pdf.setFont(FONT, "bold");
    pdf.setFontSize(16);
    pdf.setTextColor(...INK);
    pdf.text(textToDraw, MARGIN_LEFT, this.y);
    this.y += 9; // 9 pt after
  }

  /**
   * Subsection Heading (H2 / H3)
   * Section 5: Subsection Heading 11.5-13 pt (12 pt), 14-18 pt before, 6-8 pt after.
   */
  heading(level: 1 | 2 | 3, text: string) {
    if (level === 1) {
      this.section(text);
      return;
    }
    const pdf = this.pdf;
    const size = level === 2 ? 12.5 : 11;
    this.ensure(16 + size + 8 + 25);
    this.y += 15; // 15 pt before
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(size);
    pdf.setTextColor(...INK);
    pdf.text(text, MARGIN_LEFT, this.y);
    this.y += 7; // 7 pt after
  }

  private setText(size: number, weight: "normal" | "bold", color: [number, number, number]) {
    this.pdf.setFont(FONT, weight);
    this.pdf.setFontSize(size);
    this.pdf.setTextColor(...color);
  }

  /**
   * Body Paragraphs
   * Section 5 & 6: 10.5-11 pt (11 pt), 1.35-1.5 line height (1.4), 6-8 pt (7 pt) after paragraph.
   */
  body(text: string, align: "left" | "justify" = "left") {
    const pdf = this.pdf;
    this.setText(11, "normal", INK);
    const lh = this.lineHeight(11, 1.4); // 15.4 pt line spacing
    const paragraphs = text.split("\n\n");

    paragraphs.forEach((paragraph, pIdx) => {
      const lines: string[] = pdf.splitTextToSize(paragraph, CONTENT_W);
      lines.forEach((l, i) => {
        this.ensure(lh);
        this.y += lh;
        const isLast = i === lines.length - 1;
        pdf.text(l, MARGIN_LEFT, this.y, {
          maxWidth: CONTENT_W,
          align: align === "justify" && !isLast ? "justify" : "left",
        });
      });
      if (pIdx < paragraphs.length - 1) {
        this.y += 7; // 7 pt paragraph gap
      }
    });
    this.y += 7; // 7 pt space after paragraph
  }

  /**
   * Bullet Lists
   * Section 9: 10.5-11 pt (11 pt), line spacing 1.3-1.4 (1.35), space after bullet 4-6 pt (5 pt), indent 6-8 mm (20 pt).
   */
  bullets(items: string[]) {
    const pdf = this.pdf;
    const lh = this.lineHeight(11, 1.35); // 14.85 pt
    items.forEach((item) => {
      this.setText(11, "normal", INK);
      const lines: string[] = pdf.splitTextToSize(item, CONTENT_W - 20);
      lines.forEach((l, i) => {
        this.ensure(lh);
        this.y += lh;
        if (i === 0) {
          pdf.setFont(FONT, "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(...INK);
          pdf.text("•", MARGIN_LEFT + 6, this.y);
        }
        this.setText(11, "normal", INK);
        pdf.text(l, MARGIN_LEFT + 20, this.y);
      });
      this.y += 5; // 5 pt after bullet
    });
    this.y += 4;
  }

  /**
   * Clean Technical Tables
   * Section 11: 9.5-10.5 pt (10 pt), cell padding 6-8 pt (7 pt), subtle hairline borders.
   */
  table(rows: Array<[string, string]>, head?: [string, string]) {
    const pdf = this.pdf;
    const labelW = CONTENT_W * 0.35;
    const valueW = CONTENT_W - labelW;
    const lineH = 10 * 1.35;
    const padY = 7;

    if (head) {
      this.ensure(24 + lineH * 2);
      hairline(pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.7);
      this.y += 12;
      tracked(pdf, head[0].toUpperCase(), MARGIN_LEFT + 4, this.y, {
        size: 8.5,
        color: SECOND,
        tracking: 1.1,
      });
      tracked(pdf, head[1].toUpperCase(), PAGE_W - MARGIN_RIGHT - 4, this.y, {
        size: 8.5,
        color: SECOND,
        tracking: 1.1,
        align: "right",
      });
      this.y += 8;
      hairline(pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.7);
    }

    rows.forEach(([label, value]) => {
      pdf.setFont(FONT, "normal");
      pdf.setFontSize(10);
      const valueLines: string[] = pdf.splitTextToSize(value || "—", valueW - 12);
      const rowH = valueLines.length * lineH + padY * 2;
      this.ensure(rowH + 4);
      const first = this.y + lineH + padY - 2;

      tracked(pdf, label.toUpperCase(), MARGIN_LEFT + 4, first, {
        size: 8.5,
        weight: "normal",
        color: SECOND,
        tracking: 0.8,
      });

      pdf.setFont(FONT, "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(...INK);
      valueLines.forEach((l, i) =>
        pdf.text(l, PAGE_W - MARGIN_RIGHT - 4, first + i * lineH, { align: "right" }),
      );

      this.y += rowH;
      hairline(pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.5);
    });
    this.y += 10;
  }

  caption(text: string) {
    const pdf = this.pdf;
    this.setText(9, "normal", SECOND);
    pdf.splitTextToSize(text, CONTENT_W).forEach((l: string) => {
      this.ensure(12);
      this.setText(9, "normal", SECOND);
      this.y += 12;
      pdf.text(l, MARGIN_LEFT, this.y);
    });
    this.y += 8;
  }

  signature(name: string, title: string) {
    const pdf = this.pdf;
    this.ensure(90);
    this.y += 32;
    if (SIGNATURE && (name.toLowerCase().includes("qasim") || title.toLowerCase().includes("founder") || title.toLowerCase().includes("ceo"))) {
      const sigW = 80;
      const sigH = sigW / SIGNATURE_RATIO;
      pdf.addImage(SIGNATURE, "PNG", MARGIN_LEFT + 8, this.y - sigH + 4, sigW, sigH, undefined, "FAST");
    }
    pdf.setDrawColor(...INK);
    pdf.setLineWidth(0.7);
    pdf.line(MARGIN_LEFT, this.y, MARGIN_LEFT + 190, this.y);
    this.y += 16;
    pdf.setFont(FONT, "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(...INK);
    pdf.text(name, MARGIN_LEFT, this.y);
    this.y += 14;
    tracked(pdf, title.toUpperCase(), MARGIN_LEFT, this.y, {
      size: 8.5,
      weight: "normal",
      color: SECOND,
      tracking: 0.9,
    });
    this.y += 8;
  }

  confidential(
    text = "ANONEURX — Confidential | Official Corporate Document",
  ) {
    const pdf = this.pdf;
    this.ensure(32);
    this.y += 16;
    hairline(pdf, MARGIN_LEFT, this.y, PAGE_W - MARGIN_RIGHT, 0.5);
    this.y += 12;
    pdf.setFont(FONT, "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...SECOND);
    pdf.splitTextToSize(text, CONTENT_W).forEach((l: string) => {
      pdf.text(l, MARGIN_LEFT, this.y);
      this.y += 10;
    });
  }

  space(pt: number) {
    this.y += pt;
  }

  get cursor() {
    return this.y;
  }
}

/**
 * Standard SpaceX-Inspired Minimalist Cover Page
 * Section 15 & 16 Cover Page Architecture:
 * - Top whitespace: 50-60 mm (145-160 pt)
 * - ANONEURX Company Brand: 20-24 pt (22 pt) SemiBold/Bold tracked
 * - Whitespace: 30-40 mm (85-110 pt)
 * - Main Document Title: 34-44 pt (36 pt) Bold Uppercase
 * - Subtitle: 12-14 pt (13 pt)
 * - Large whitespace
 * - Bottom metadata & 2026 EDITION: 9-10 pt
 */
export const drawCover = (
  pdf: Pdf,
  opts: {
    title: string;
    subtitle?: string;
    kicker?: string;
    program?: string;
    rows?: Array<[string, string]>;
    mark: string | null;
    ref: string;
    edition?: string;
    anuratiReady?: boolean;
  },
) => {
  drawLetterhead(pdf);

  // Top Whitespace: ~55 mm -> Start top brand lockup around y = 145 pt
  const topY = 145;
  const markH = 32;
  const markW = drawMark(pdf, opts.mark, MARGIN_LEFT, topY - 8, markH);
  drawBrandWordmark(pdf, MARGIN_LEFT + (markW ? markW + 8 : 0), topY + 16, 22, INK, "ANONEURX", "left", opts.anuratiReady ?? false);
  
  tracked(pdf, "AEROSPACE & SOFTWARE ENGINEERING", MARGIN_LEFT, topY + 34, {
    size: 8.5,
    weight: "normal",
    color: SECOND,
    tracking: 1.6,
  });

  hairline(pdf, MARGIN_LEFT, topY + 46, PAGE_W - MARGIN_RIGHT, 0.6);

  // Main Title Position: Whitespace 35 mm -> Start title around y = 290 pt
  const titleTop = 290;

  if (opts.kicker) {
    tracked(pdf, opts.kicker.toUpperCase(), MARGIN_LEFT, titleTop, {
      size: 9.5,
      color: SECOND,
      tracking: 2.0,
    });
  }

  pdf.setFont(FONT, "bold");
  pdf.setFontSize(36); // Section 4: Main Document Title 34-44 pt (36 pt)
  pdf.setTextColor(...INK);
  
  let y = titleTop + (opts.kicker ? 28 : 0);
  const titleLines: string[] = pdf.splitTextToSize(opts.title.toUpperCase(), CONTENT_W);
  titleLines.forEach((l) => {
    y += 38;
    pdf.text(l, MARGIN_LEFT, y);
  });

  // Subtitle
  const subText = opts.subtitle ?? programLabel(opts.program);
  y += 18;
  pdf.setFont(FONT, "normal");
  pdf.setFontSize(13); // Section 4: Subtitle 12-14 pt (13 pt)
  pdf.setTextColor(...SECOND);
  pdf.text(subText, MARGIN_LEFT, y);

  // Minimal Metadata Table Block near lower middle
  if (opts.rows && opts.rows.length > 0) {
    y += 40;
    hairline(pdf, MARGIN_LEFT, y, PAGE_W - MARGIN_RIGHT, 0.7);
    const colW = CONTENT_W / 2;
    const rowH = 28;

    opts.rows.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = MARGIN_LEFT + col * colW;
      const top = y + row * rowH;
      tracked(pdf, label.toUpperCase(), x, top + 13, {
        size: 7.5,
        weight: "normal",
        color: SECOND,
        tracking: 0.8,
      });
      pdf.setFont(FONT, "normal");
      pdf.setFontSize(9.5);
      pdf.setTextColor(...INK);
      pdf.text(value || "—", x, top + 24, { maxWidth: colW - 16 });
      if (col === 1 || i === opts.rows!.length - 1) {
        hairline(pdf, MARGIN_LEFT, top + rowH, PAGE_W - MARGIN_RIGHT, 0.5);
      }
    });
  }

  // Cover Footer Section (Section 4 & 15 & 16)
  const fy = PAGE_H - MARGIN_BOTTOM - 14;
  hairline(pdf, MARGIN_LEFT, fy - 18, PAGE_W - MARGIN_RIGHT, 0.7);

  tracked(pdf, opts.edition ? opts.edition.toUpperCase() : "2026 EDITION", MARGIN_LEFT, fy, {
    size: 9,
    weight: "normal",
    color: SECOND,
    tracking: 1.2,
  });

  drawBrandWordmark(pdf, PAGE_W / 2, fy, 9, INK, "ANONEURX", "center", opts.anuratiReady ?? false);

  tracked(pdf, `REF ${opts.ref}`, PAGE_W - MARGIN_RIGHT, fy, {
    size: 9,
    weight: "normal",
    color: SECOND,
    tracking: 1.0,
    align: "right",
  });
};

/**
 * Standard Header and Footer Application
 * Section 12, 13, 14:
 * Header: 8.5-9 pt minimal text with subtle divider line.
 * Footer: "ANONEURX — Confidential | 2026", Page number "01 / 12" (8.5-9 pt).
 */
export const applyFooters = (pdf: Pdf, ref: string) => {
  const total = pdf.getNumberOfPages();
  const fy = PAGE_H - MARGIN_BOTTOM - 14;
  for (let page = 2; page <= total; page++) {
    pdf.setPage(page);
    hairline(pdf, MARGIN_LEFT, fy - 18, PAGE_W - MARGIN_RIGHT, 0.5);
    
    tracked(pdf, "ANONEURX — Confidential | 2026", MARGIN_LEFT, fy, {
      size: 8.5,
      color: SECOND,
      tracking: 0.9,
    });
    
    tracked(pdf, `REF ${ref}`, PAGE_W / 2, fy, {
      size: 8.5,
      weight: "normal",
      color: SECOND,
      tracking: 0.8,
      align: "center",
    });
    
    tracked(
      pdf,
      `${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
      PAGE_W - MARGIN_RIGHT,
      fy,
      { size: 8.5, weight: "normal", color: SECOND, tracking: 0.8, align: "right" },
    );
  }
};

export const newDoc = () => new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

