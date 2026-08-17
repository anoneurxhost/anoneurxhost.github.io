import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usePortal } from "../PortalContext";
import logoImg from "@/assets/documents/logo.png";
export type { PdfDocumentLike } from "../Documents";
export { downloadDocumentPdf, downloadDocumentBundle } from "../Documents";


export const useOfferLetterDownload = () => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadOfferLetter = async () => {
    const node = sheetRef.current;
    if (!node || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: node.scrollWidth,
        windowHeight: node.scrollHeight,
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const img = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save("Anoneurx-Offer-Letter.pdf");
    } catch (error) {
      console.error("Offer letter export failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return { sheetRef, downloading, downloadOfferLetter };
};


const BrandDivider = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "h-[3px] w-full rounded-full bg-gradient-to-r from-[#380276] via-[#961575] to-[#A91676]",
      className
    )}
  />
);

export const OfferLetterSheet = React.forwardRef<HTMLDivElement>(function OfferLetterSheet(
  _props,
  ref
) {
  const { user } = useAuth();
  const { data } = usePortal();
  const { internship, mentor } = data;

  const internName = user?.name || "Hassan Ali";
  const internId = user?.programIds?.internship || "ANX26INT00008";

  return (
    <div
      ref={ref}
      className="w-[794px] shrink-0 bg-white text-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="px-10 pt-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Anoneurx" className="h-16 w-16 object-contain" />
            <div className="leading-none">
              <p className="font-brand text-[40px] tracking-[0.18em] text-[#1a0533]">
                ANONEURX
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                Anoneurx Technologies
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-widest text-neutral-400">
              Official Document
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-800">
              Ref: ANX/HR/OL-2026/INT008
            </p>
            <p className="text-sm text-neutral-500">Date: January 6, 2026</p>
          </div>
        </div>

        <BrandDivider className="mt-5" />

        <div className="mt-5 text-center">
          <p className="font-brand text-[30px] leading-none tracking-[0.1em] text-[#380276]">
            INTERNSHIP
          </p>
          <p className="mt-1 font-brand text-[30px] leading-none tracking-[0.1em] text-[#380276]">
            OFFER LETTER
          </p>
        </div>

        <div className="mt-5 space-y-1.5">
          <p className="text-[14px] text-neutral-500">To,</p>
          <p className="text-[26px] font-semibold leading-tight text-neutral-900">
            {internName}
          </p>
          <p className="text-[14px] text-neutral-600">
            Intern ID: <span className="font-medium text-neutral-800">{internId}</span>
          </p>
        </div>

        <p className="mt-4 text-[16px] leading-[24px] text-neutral-700">
          Dear {internName.split(" ")[0]},
        </p>
        <p className="mt-1.5 text-[16px] leading-[24px] text-neutral-700">
          It is our pleasure to offer you an internship position at{" "}
          <span className="font-semibold text-neutral-900">Anoneurx</span> as a{" "}
          <span className="font-semibold text-neutral-900">{internship.role}</span> in the{" "}
          <span className="font-semibold text-neutral-900">{internship.department}</span>{" "}
          team. We were impressed by your skills and enthusiasm, and we are confident that
          you will be a valuable addition to our team.
        </p>
        <p className="mt-1.5 text-[16px] leading-[24px] text-neutral-700">
          During this internship, you will work on real-world projects under the guidance
          of your supervisor, collaborate with cross-functional teams, and take part in
          our learning and development programs. We expect a high level of commitment,
          integrity, and a passion for building exceptional products.
        </p>

        <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
          <p className="text-[18px] font-semibold uppercase tracking-widest text-[#380276]">
            Offer Details
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
            <TermRow label="Role" value={internship.role} />
            <TermRow label="Department" value={internship.department} />
            <TermRow label="Duration" value={`${internship.startDate} — ${internship.endDate}`} />
            <TermRow label="Working Hours" value={`${internship.hoursPerWeek} hours / week`} />
            <TermRow label="Stipend" value={internship.stipend} />
            <TermRow label="Supervisor" value={mentor.name} />
          </div>
        </div>

        <p className="mt-3.5 text-[16px] leading-[24px] text-neutral-700">
          Your stipend and other benefits will be as stated above, payable in accordance
          with Anoneurx&apos;s standard payroll cycle. Any confidential information you
          come across during the internship must remain strictly confidential, both during
          and after the tenure.
        </p>
        <p className="mt-1.5 text-[16px] leading-[24px] text-neutral-700">
          We are delighted to have you on board and look forward to a rewarding journey
          together. To accept this offer, please sign below and return a copy to the Human
          Resources team by the start date.
        </p>

        <div className="mt-8 flex items-end justify-between gap-8">
          <div className="space-y-1">
            <p className="text-[12px] uppercase tracking-widest text-neutral-400">
              Accepted by
            </p>
            <p className="mt-6 w-44 border-b border-neutral-300 pb-1 text-[16px] font-medium text-neutral-800">
              {internName}
            </p>
            <p className="text-[12px] text-neutral-500">Signature</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[12px] uppercase tracking-widest text-neutral-400">
              For Anoneurx
            </p>
            <p className="mt-6 w-44 border-b border-neutral-300 pb-1 text-[16px] font-medium text-neutral-800">
              Muhammad Qasim
            </p>
            <p className="text-[14px] text-neutral-500">Founder &amp; CEO · ANONEURX</p>
          </div>
        </div>

        <div className="mt-6">
          <BrandDivider />
          <div className="flex items-center justify-between pt-2.5 pb-2">
            <p className="text-[12px] uppercase tracking-widest text-neutral-500">
              Anoneurx · anoneurx.com
            </p>
            <p className="text-[12px] uppercase tracking-widest text-neutral-500">
              Ref: ANX/HR/OL-2026/INT008
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const TermRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-200 pb-1.5">
    <p className="text-[13px] text-neutral-500">{label}</p>
    <p className="text-[13px] text-right font-medium text-neutral-900">{value}</p>
  </div>
);
