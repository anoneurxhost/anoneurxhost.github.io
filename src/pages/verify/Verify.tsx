import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, GraduationCap, Trophy } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import logoJpeg from "@/assets/logo.jpeg";
import { InternshipVerifyComponent } from "./components/InternshipVerifyComponent";
import { HackathonVerifyComponent } from "./components/HackathonVerifyComponent";

type Mode = "internship" | "hackathon";
const MODES: Mode[] = ["internship", "hackathon"];

const TAB_CONFIG: { id: Mode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "internship", label: "Internship", icon: GraduationCap },
  { id: "hackathon", label: "Hackathon", icon: Trophy },
];

const SITE = "https://anoneurx.com";

const Verify: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawMode = searchParams.get("mode") as Mode | null;
  const mode: Mode = rawMode && MODES.includes(rawMode) ? rawMode : "internship";

  const setMode = (next: Mode) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", next);
    setSearchParams(params, { replace: false });
  };

  const seoMeta = useMemo(() => {
    if (mode === "hackathon") {
      return {
        title: "Verify Hackathon Participation",
        description:
          "Verify Anoneurx hackathon participation certificates and team records in real time. Validate project submissions, awards, and builder credentials.",
        keywords:
          "anoneurx hackathon verify, verify hackathon certificate, hackathon participation verification, anoneurx hackathon credentials, hackathon builder verification, anoneurx hackathon certificate, verify hackathon status",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Anoneurx Hackathon Verification Portal",
            url: `${SITE}/verify?mode=hackathon`,
            applicationCategory: "BusinessApplication",
            description: "Verify Anoneurx hackathon participation certificates and builder awards in real time.",
            publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Anoneurx", item: SITE },
              { "@type": "ListItem", position: 2, name: "Verify", item: `${SITE}/verify` },
              { "@type": "ListItem", position: 3, name: "Hackathon", item: `${SITE}/verify?mode=hackathon` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I verify an Anoneurx Hackathon certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enter your Hackathon Application ID or registered email address into the verification form at anoneurx.com/verify?mode=hackathon to instantly confirm participation and certificate status.",
                },
              },
              {
                "@type": "Question",
                name: "Who do I contact if my hackathon certificate cannot be verified?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you need help verifying your hackathon participation, contact the Anoneurx hackathon support team directly at hackathon@anoneurx.com.",
                },
              },
            ],
          },
        ],
      };
    }

    return {
      title: "Verify Anoneurx Interns",
      description:
        "Verify an Anoneurx intern instantly. Confirm internship credentials, department, batch, status, certificates and service records using an intern ID or email address.",
      keywords:
        "anoneurx verify, verify intern, anoneurx internship verification, verify internship certificate, intern status check, anoneurx intern id, verify intern credentials, anoneurx intern directory, intern verification portal",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Anoneurx Internship Verification Portal",
          url: `${SITE}/verify?mode=internship`,
          applicationCategory: "BusinessApplication",
          description: "Verify Anoneurx intern credentials, certificates, and service records in real time using an intern ID or email address.",
          publisher: { "@type": "Organization", name: "Anoneurx", url: SITE },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Anoneurx", item: SITE },
            { "@type": "ListItem", position: 2, name: "Verify", item: `${SITE}/verify` },
            { "@type": "ListItem", position: 3, name: "Internship", item: `${SITE}/verify?mode=internship` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I verify an Anoneurx intern?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Enter the intern's ID or registered email address into the verification form at anoneurx.com/verify to instantly confirm their credentials.",
              },
            },
            {
              "@type": "Question",
              name: "Who do I contact if an internship credential cannot be verified?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If an internship credential cannot be verified, contact the Anoneurx internship support team at internship@anoneurx.com.",
              },
            },
          ],
        },
      ],
    };
  }, [mode]);

  return (
    <PageTransition>
      <SEO
        title={seoMeta.title}
        description={seoMeta.description}
        path={`/verify?mode=${mode}`}
        keywords={seoMeta.keywords}
        jsonLd={seoMeta.jsonLd}
      />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-white">
        <div className="w-full max-w-[480px]">
          {/* Glass Card Container */}
          <div className="glass backdrop-blur-2xl bg-white/[0.04] border border-white/10 rounded-2xl shadow-2xl px-6 py-8 sm:px-9 sm:py-9">
            {/* Header Logo & Title */}
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <img src={logoJpeg} alt="Anoneurx" className="w-14 h-14 object-contain rounded-xl mb-2 shadow-lg" />
              <h1 className="text-2xl font-bold tracking-tight text-white">Anoneurx Verification</h1>
              <p className="text-xs text-gray-400 mt-1">Official Credentials & Participation Verification Portal</p>
            </div>
            {/* Animated Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {mode === "internship" && <InternshipVerifyComponent />}
                {mode === "hackathon" && <HackathonVerifyComponent />}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-[11px] text-white/70 mt-6 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected by Anoneurx Identity System</span>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Verify;
