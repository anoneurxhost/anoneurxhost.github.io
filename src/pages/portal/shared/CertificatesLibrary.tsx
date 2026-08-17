import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, BadgeCheck, Download, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortal } from "../PortalContext";
import { PageHeader, PortalPage, PortalSection, ModuleBadge } from "../components/ui";
import type { Certificate } from "../types";

const moduleGradientClass: Record<string, string> = {
  university: "from-blue-500 to-cyan-500",
  internship: "from-emerald-500 to-teal-500",
  hackathon: "from-purple-500 to-fuchsia-500",
};

export const CertificatesLibrary = () => {
  const { data } = usePortal();
  const [filter, setFilter] = useState<"all" | "university" | "internship" | "hackathon">("all");

  const filtered =
    filter === "all"
      ? data.certificates
      : data.certificates.filter((c) => c.module === filter);

  const verified = data.certificates.filter((c) => c.status === "verified").length;

  return (
    <PortalPage>
      <PageHeader
        eyebrow="Centralized Library"
        title="Certificates"
        description="Every certificate, credential and achievement across all your programs — verified and downloadable."
        icon={Award}
        gradient="from-amber-500 to-orange-500"
      />

      <PortalSection>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            <ShieldCheck className="h-3 w-3 mr-1" /> {verified} verified
          </Badge>
          <Badge variant="outline" className="border-white/15 text-slate-300">
            {data.certificates.length} total
          </Badge>
          <div className="ml-auto flex gap-1.5 overflow-x-auto">
            {(["all", "university", "internship", "hackathon"] as const).map((option) => (
              <Button
                key={option}
                size="sm"
                variant={filter === option ? "default" : "outline"}
                onClick={() => setFilter(option)}
                className={cn(
                  filter === option
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    : "border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                {option === "all" ? "All" : option}
              </Button>
            ))}
          </div>
        </div>
      </PortalSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((certificate, i) => (
          <CertificateCard key={certificate.id} certificate={certificate} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <PortalSection>
          <Card className="glass-dark border-white/10">
            <CardContent className="py-12 text-center">
              <p className="text-slate-400">No certificates in this category yet.</p>
            </CardContent>
          </Card>
        </PortalSection>
      )}
    </PortalPage>
  );
};

const CertificateCard = ({ certificate, index }: { certificate: Certificate; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06 }}
  >
    <Card className="glass-dark border-white/10 h-full overflow-hidden hover:border-amber-500/30 transition-all group">
      {/* Certificate top border accent */}
      <div className={cn("h-1.5 bg-gradient-to-r", moduleGradientClass[certificate.module])} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={cn(
            "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg shrink-0",
            moduleGradientClass[certificate.module]
          )}>
            <Award className="h-6 w-6 text-white" />
          </div>
          <Badge className={certificate.status === "verified" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}>
            {certificate.status === "verified" ? <BadgeCheck className="h-3 w-3 mr-1" /> : <Sparkles className="h-3 w-3 mr-1" />}
            {certificate.status}
          </Badge>
        </div>

        <h3 className="mt-4 font-semibold text-white leading-snug">{certificate.title}</h3>
        <p className="text-xs text-slate-500 mt-1">
          {certificate.issuer} · {certificate.issuedOn}
        </p>
        <p className="mt-2 text-xs text-slate-400 line-clamp-2">{certificate.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <ModuleBadge module={certificate.module} />
          <span className="text-[10px] text-slate-600 font-mono">{certificate.credentialId}</span>
        </div>

        <Button
          size="sm"
          className="mt-4 w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 group-hover:shadow-lg group-hover:shadow-amber-500/20"
          disabled={certificate.status === "pending"}
        >
          <Download className="h-4 w-4 mr-2" />
          {certificate.status === "verified" ? "Download PDF" : "Awaiting issuance"}
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default CertificatesLibrary;
