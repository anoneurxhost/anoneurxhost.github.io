import React from "react";
import { FileText } from "lucide-react";
import { PortalPage, PageHeader } from "../components/ui";
import { DocumentsWorkspace } from "./DocumentsWorkspace";

const DocumentsLibrary = () => (
  <PortalPage>
    <PageHeader
      eyebrow="Documents"
      title="Document Center"
      description="Every letter, certificate, transcript and receipt issued across your University, Internship and Hackathon programs — searchable, verifiable and downloadable."
      icon={FileText}
      gradient="from-[#380276] to-[#A91676]"
    />
    <DocumentsWorkspace />
  </PortalPage>
);

export default DocumentsLibrary;
