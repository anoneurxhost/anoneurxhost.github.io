import { useEffect, useState } from "react";
import { PROGRAM_DOCUMENTS } from "./data";
import type { DocumentStatus, ProgramDocument, DocumentTrack } from "./types";

/**
 * Shared documents store. Holds every document issued across all participants
 * and staff, so the participant portal and the admin documents dashboard read
 * and write the same records (client-side, no schema change).
 */

export interface DocumentOwner {
  name: string;
  participantId: string;
  role: string;
  track: DocumentTrack;
}

export const DOCUMENT_OWNERS: DocumentOwner[] = [
  { name: "Areeba Fatima", participantId: "ANX26STU00015", role: "Student", track: "university" },
  { name: "Hassan Ali", participantId: "ANX26INT00008", role: "Intern", track: "internship" },
  { name: "Insha", participantId: "ANX26INT00044", role: "Intern — Software Engineering", track: "internship" },
  { name: "Zainab Tariq", participantId: "ANX26HAK00003", role: "Hackathon Participant", track: "hackathon" },
  { name: "Dr. Adnan Malik", participantId: "ANX26FAC00004", role: "Faculty", track: "organization" },
  { name: "Sana Iqbal", participantId: "ANX26HRM00002", role: "HR Manager", track: "organization" },
  { name: "Ahmed Raza", participantId: "ANX26HOD00003", role: "Head of Department", track: "organization" },
  { name: "Muhammad Qasim", participantId: "ANX26CEO00001", role: "Founder & CEO", track: "organization" },
  { name: "Bilal Ahmed", participantId: "ANX26EMP00021", role: "Employee", track: "organization" },
];

const ownerByTrack = (track: DocumentTrack) =>
  DOCUMENT_OWNERS.find((o) => o.track === track);

const today = () =>
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/* ------------------------- required document sets ------------------------ */

export interface DocumentSpec {
  name: string;
  type: ProgramDocument["type"];
  description: string;
  issuer: string;
  sizeKb?: number;
}

/** Required internship document set (Anoneurx print standard). */
export const INTERNSHIP_REQUIRED_DOCS: DocumentSpec[] = [
  {
    name: "Internship Offer Letter",
    type: "Offer Letter",
    description:
      "Formal offer of an internship placement at Anoneurx Technologies, covering role, duration, stipend, reporting line and joining date.",
    issuer: "Anoneurx People Operations",
    sizeKb: 164,
  },
  {
    name: "Internship Policy Handbook",
    type: "Policy",
    description:
      "Programme policies covering attendance, working hours, leave, equipment use, security expectations and escalation paths.",
    issuer: "Anoneurx People Operations",
    sizeKb: 612,
  },
  {
    name: "Code of Conduct",
    type: "Code of Conduct",
    description:
      "Expected professional behaviour, anti-harassment commitments, communication standards and disciplinary process.",
    issuer: "Anoneurx Technologies",
    sizeKb: 248,
  },
  {
    name: "Non-Disclosure Agreement",
    type: "NDA",
    description:
      "Confidentiality undertaking covering source code, client information, research and internal documentation, effective during and after the internship.",
    issuer: "Anoneurx Legal",
    sizeKb: 196,
  },
  {
    name: "Mid-Internship Evaluation",
    type: "Mid-Internship Evaluation",
    description:
      "Mentor assessment at the halfway point, scoring technical delivery, collaboration, ownership and communication with development notes.",
    issuer: "Anoneurx Engineering Mentorship",
    sizeKb: 132,
  },
  {
    name: "Final Evaluation Report",
    type: "Final Evaluation",
    description:
      "Closing performance review with final scores, mentor recommendation and readiness assessment for full-time engineering roles.",
    issuer: "Anoneurx Engineering Mentorship",
    sizeKb: 148,
  },
  {
    name: "Project Report",
    type: "Project Report",
    description:
      "Technical report on the internship project: problem statement, architecture, implementation, testing, results and future work.",
    issuer: "Anoneurx Engineering",
    sizeKb: 884,
  },
  {
    name: "Internship Experience Letter",
    type: "Experience Letter",
    description:
      "Verifiable statement of the internship period, department, responsibilities and conduct, issued for employers and universities.",
    issuer: "Anoneurx People Operations",
    sizeKb: 118,
  },
  {
    name: "Internship Completion Certificate",
    type: "Completion Certificate",
    description:
      "Certificate confirming successful completion of the Anoneurx internship programme with the awarded grade.",
    issuer: "Anoneurx Technologies",
    sizeKb: 204,
  },
  {
    name: "HR Policies Acknowledgement",
    type: "HR Policies",
    description:
      "Signed acknowledgement of Anoneurx HR policies including leave, grievance handling, IT usage and workplace safety.",
    issuer: "Anoneurx People Operations",
    sizeKb: 176,
  },
];

/** Required hackathon document set. */
export const HACKATHON_REQUIRED_DOCS: DocumentSpec[] = [
  {
    name: "Hackathon Participation Agreement",
    type: "Agreement",
    description:
      "Terms of participation for the Anoneurx Hackathon: eligibility, intellectual property, judging rules and prize conditions.",
    issuer: "Anoneurx Hackathon Committee",
    sizeKb: 188,
  },
  {
    name: "Code of Conduct",
    type: "Code of Conduct",
    description:
      "Event conduct rules covering fair play, collaboration boundaries, respectful behaviour and disqualification grounds.",
    issuer: "Anoneurx Hackathon Committee",
    sizeKb: 152,
  },
  {
    name: "Non-Disclosure Agreement",
    type: "NDA",
    description:
      "Confidentiality undertaking for challenge datasets, partner briefs and unreleased platform access provided during the event.",
    issuer: "Anoneurx Legal",
    sizeKb: 164,
  },
  {
    name: "Round Submission Receipt",
    type: "Submission Receipt",
    description:
      "Timestamped acknowledgement of the team's submission, listing repository, demo link and reviewed artefacts.",
    issuer: "Anoneurx Hackathon Committee",
    sizeKb: 84,
  },
  {
    name: "Judging Evaluation Sheet",
    type: "Evaluation",
    description:
      "Panel scoring across innovation, technical depth, impact and presentation, with per-judge comments.",
    issuer: "Anoneurx Judging Panel",
    sizeKb: 126,
  },
  {
    name: "Hackathon Participation Certificate",
    type: "Participation Certificate",
    description:
      "Certificate confirming participation in the Anoneurx Hackathon, including track and team name.",
    issuer: "Anoneurx Technologies",
    sizeKb: 198,
  },
  {
    name: "Project Report",
    type: "Project Report",
    description:
      "Team technical report describing the submitted solution, stack, architecture decisions and demo instructions.",
    issuer: "Anoneurx Hackathon Committee",
    sizeKb: 742,
  },
];

export const DOCUMENT_PRESETS: Array<{
  id: "internship" | "hackathon";
  label: string;
  docs: DocumentSpec[];
}> = [
  { id: "internship", label: "Internship required set", docs: INTERNSHIP_REQUIRED_DOCS },
  { id: "hackathon", label: "Hackathon required set", docs: HACKATHON_REQUIRED_DOCS },
];


interface StaffDocSpec {
  name: string;
  type: ProgramDocument["type"];
  status: DocumentStatus;
  issuedOn: string;
  description: string;
  issuer: string;
  sizeKb?: number;
}

const staffDocs = (owner: DocumentOwner, index: number): ProgramDocument[] => {
  const specs: StaffDocSpec[] = [
    {
      name: `Appointment Letter — ${owner.role}`,
      type: "Appointment Letter",
      status: "verified",
      issuedOn: "Jan 5, 2026",
      description: `Official appointment letter confirming the ${owner.role} role at Anoneurx Technologies, including reporting line and effective date.`,
      issuer: "Anoneurx People Operations",
      sizeKb: 168,
    },
    {
      name: "Employment Verification Letter",
      type: "Employment Letter",
      status: "verified",
      issuedOn: "Feb 12, 2026",
      description: "Confirms active employment status, designation and tenure for third-party verification.",
      issuer: "Anoneurx People Operations",
      sizeKb: 96,
    },
    {
      name: "Anoneurx Employee Handbook",
      type: "Policy",
      status: "issued",
      issuedOn: "Jan 5, 2026",
      description: "Company policies, code of conduct, security expectations and leave rules.",
      issuer: "Anoneurx Technologies",
      sizeKb: 720,
    },
    {
      name: "Payslip — July 2026",
      type: "Payslip",
      status: "issued",
      issuedOn: "Jul 31, 2026",
      description: "Monthly salary statement with earnings, deductions and net payable.",
      issuer: "Anoneurx Finance",
      sizeKb: 72,
    },
    {
      name: "Annual Performance Review 2026",
      type: "Evaluation",
      status: "pending",
      issuedOn: "—",
      description: "Issued after the annual performance review cycle is finalised.",
      issuer: "Anoneurx People Operations",
    },
  ];

  return specs.map((spec, i) => ({
    ...spec,
    id: `org-${index}-${i + 1}`,
    program: "organization" as DocumentTrack,
    verificationId: `ANX-DOC-OR-${String(index * 10 + i + 1).padStart(4, "0")}`,
    participant: owner.name,
    participantId: owner.participantId,
    participantRole: owner.role,
    history: [{ status: spec.status, at: spec.issuedOn, by: spec.issuer }],
  }));
};

/** Insha (intern anx-se-44) — full React Web Developer internship document set. */
export const INSHA_OWNER = DOCUMENT_OWNERS.find((o) => o.name === "Insha")!;

const inshaDocs = (): ProgramDocument[] => {
  /** Joined Jun 2, 2026 — internship completed and fully signed off on Aug 15, 2026. */
  const issuedOn = [
    "Jun 2, 2026",   // Offer Letter
    "Jun 2, 2026",   // Policy Handbook
    "Jun 2, 2026",   // Code of Conduct
    "Jun 2, 2026",   // NDA
    "Jul 10, 2026",  // Mid-Internship Evaluation
    "Aug 15, 2026",  // Final Evaluation Report
    "Aug 15, 2026",  // Project Report
    "Aug 15, 2026",  // Experience Letter
    "Aug 15, 2026",  // Completion Certificate
    "Jun 2, 2026",   // HR Policies Acknowledgement
  ];

  const set: ProgramDocument[] = INTERNSHIP_REQUIRED_DOCS.map((spec, i) => {
    const at = issuedOn[i] ?? "Aug 15, 2026";
    return {
      ...spec,
      id: `insha-${i + 1}`,
      program: "internship" as DocumentTrack,
      status: "verified" as DocumentStatus,
      issuedOn: at,
      verificationId: `ANX-DOC-IN-${String(4400 + i + 1)}`,
      participant: INSHA_OWNER.name,
      participantId: INSHA_OWNER.participantId,
      participantRole: INSHA_OWNER.role,
      programme: "React Web Developer Internship",
      history: [
        { status: "issued" as DocumentStatus, at, by: spec.issuer },
        { status: "verified" as DocumentStatus, at, by: "Anoneurx Registry" },
      ],
    };
  });

  return set;
};

const seed = (): ProgramDocument[] => {
  const participantDocs = PROGRAM_DOCUMENTS.map((doc) => {
    const owner = ownerByTrack(doc.program);
    return {
      ...doc,
      participant: owner?.name,
      participantId: owner?.participantId,
      participantRole: owner?.role,
      history: [{ status: doc.status, at: doc.issuedOn, by: doc.issuer }],
    } as ProgramDocument;
  });

  const orgDocs = DOCUMENT_OWNERS.filter((o) => o.track === "organization").flatMap(
    (owner, i) => staffDocs(owner, i + 1),
  );

  return [...participantDocs, ...inshaDocs(), ...orgDocs];
};

let documents: ProgramDocument[] = seed();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

let bulkSeq = 0;

export interface BulkIssueOptions {
  participantIds: string[];
  specs: DocumentSpec[];
  track: DocumentTrack;
  status?: DocumentStatus;
  issuedOn?: string;
  by?: string;
  /** Skip a document when the participant already holds one with the same name. */
  skipDuplicates?: boolean;
}

export interface BulkIssueResult {
  issued: number;
  skipped: number;
  participants: number;
  /** The documents actually created — used for the CSV/PDF export. */
  documents: ProgramDocument[];
  /** ISO timestamp of the operation. */
  at: string;
}

export const documentsStore = {
  getAll: () => documents,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  add: (doc: Omit<ProgramDocument, "id" | "verificationId">) => {
    const seq = String(documents.length + 1).padStart(4, "0");
    documents = [
      {
        ...doc,
        id: `up-${Date.now()}`,
        verificationId: `ANX-DOC-UP-${seq}`,
        history: [{ status: doc.status, at: doc.issuedOn, by: doc.issuer }],
      },
      ...documents,
    ];
    emit();
  },
  setStatus: (id: string, status: DocumentStatus, by = "Anoneurx Admin", note?: string) => {
    documents = documents.map((d) =>
      d.id === id
        ? {
            ...d,
            status,
            issuedOn: status === "pending" ? "—" : d.issuedOn === "—" ? today() : d.issuedOn,
            history: [...(d.history ?? []), { status, at: today(), by, note }],
          }
        : d,
    );
    emit();
  },
  /** Apply one status to many documents at once. */
  setStatusMany: (ids: string[], status: DocumentStatus, by = "Anoneurx Admin", note?: string) => {
    const set = new Set(ids);
    documents = documents.map((d) =>
      set.has(d.id)
        ? {
            ...d,
            status,
            issuedOn: status === "pending" ? "—" : d.issuedOn === "—" ? today() : d.issuedOn,
            history: [...(d.history ?? []), { status, at: today(), by, note }],
          }
        : d,
    );
    emit();
    return ids.length;
  },
  /** Issue a document set to many participants in one action. */
  issueBulk: (options: BulkIssueOptions): BulkIssueResult => {
    const {
      participantIds,
      specs,
      track,
      status = "issued",
      issuedOn = today(),
      by = "Anoneurx Admin",
      skipDuplicates = true,
    } = options;

    const created: ProgramDocument[] = [];
    let skipped = 0;

    participantIds.forEach((participantId) => {
      const owner = DOCUMENT_OWNERS.find((o) => o.participantId === participantId);
      if (!owner) return;
      specs.forEach((spec) => {
        const exists = documents.some(
          (d) => d.participantId === participantId && d.name === spec.name && d.program === track,
        );
        if (exists && skipDuplicates) {
          skipped += 1;
          return;
        }
        bulkSeq += 1;
        created.push({
          ...spec,
          id: `bulk-${Date.now()}-${bulkSeq}`,
          program: track,
          status,
          issuedOn: status === "pending" ? "—" : issuedOn,
          verificationId: `ANX-DOC-BK-${String(bulkSeq).padStart(4, "0")}`,
          participant: owner.name,
          participantId: owner.participantId,
          participantRole: owner.role,
          history: [{ status, at: issuedOn, by, note: "Issued via bulk issuing" }],
        });
      });
    });

    if (created.length) {
      documents = [...created, ...documents];
      emit();
    }

    return {
      issued: created.length,
      skipped,
      participants: participantIds.length,
      documents: created,
      at: new Date().toISOString(),
    };
  },
};


/** React binding for the documents store. */
export const useDocumentsStore = () => {
  const [snapshot, setSnapshot] = useState(documentsStore.getAll());
  useEffect(() => {
    const unsubscribe = documentsStore.subscribe(() => setSnapshot(documentsStore.getAll()));
    return () => {
      unsubscribe();
    };
  }, []);
  return snapshot;
};
