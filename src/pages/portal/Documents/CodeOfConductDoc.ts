import {
  loadMark,
  newDoc,
  setMetadata,
  drawCover,
  Flow,
  refCode,
  fileNameFor,
  applyFooters,
  type PdfDocumentLike,
} from "./pdfBase";

export const CODE_OF_CONDUCT_SPEC: PdfDocumentLike = {
  name: "Intern Code of Conduct",
  type: "Code of Conduct",
  status: "verified",
  issuedOn: "Jun 1, 2026",
  description:
    "Official organizational policy defining professional standards, information security, intellectual property, ethical conduct, and disciplinary guidelines for the ANONEURX Internship Program.",
  issuer: "ANONEURX People Operations & Legal",
  sizeKb: 340,
  program: "internship",
  programme: "ANONEURX Internship Program",
};

/** Custom PDF Builder for ANONEURX Intern Code of Conduct */
export const buildCodeOfConductPdf = async (doc: PdfDocumentLike = CODE_OF_CONDUCT_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);

  setMetadata(pdf, "ANONEURX Intern Code of Conduct", "Professional Standards & Workplace Guidelines · 2026 Edition", [
    "ANONEURX",
    "Code of Conduct",
    "Internship Policy",
    "Professional Standards",
    "Workplace Guidelines",
  ]);

  // Page 1: Dedicated SpaceX Cover Page
  drawCover(pdf, {
    title: "INTERN CODE OF CONDUCT",
    subtitle: "PROFESSIONAL STANDARDS & WORKPLACE GUIDELINES",
    kicker: "HUMAN RESOURCES & LEGAL DIVISION",
    program: doc.program,
    mark,
    ref,
    edition: "2026 EDITION",
    rows: [
      ["Program", "ANONEURX Internship Program"],
      ["Edition", "2026 Edition (v2026.1)"],
      ["Scope", "All Program Interns & Associates"],
      ["Effective Date", "June 1, 2026"],
      ["Issuing Body", "ANONEURX People Operations & Legal"],
      ["Document Ref", ref],
    ],
  });

  const headerLeft = "ANONEURX — Intern Code of Conduct | 2026";
  const flow = new Flow(pdf, { headerLeft, mark });

  // Page 2+: Policy Content Sections
  flow.newPage();
  flow.title("ANONEURX Intern Code of Conduct", "PROFESSIONAL STANDARDS & WORKPLACE GUIDELINES · 2026 EDITION");

  // Section 01: Purpose
  flow.section("Purpose");
  flow.body(
    "The purpose of this Code of Conduct is to establish clear professional standards, ethical expectations, and operational guidelines for all participants in the ANONEURX Internship Program. ANONEURX is committed to maintaining a high-performance, respectful, and secure engineering environment where interns develop production-grade skills while upholding organizational integrity.",
  );

  // Section 02: Professional Conduct
  flow.section("Professional Conduct");
  flow.body(
    "Interns are expected to maintain exemplary standards of professionalism, accountability, and integrity in all work deliverables and interpersonal interactions. Key requirements include:",
  );
  flow.bullets([
    "Demonstrating active ownership, technical discipline, and reliability across assigned tasks.",
    "Presenting work clearly, meeting agreed milestone deadlines, and proactively communicating blockers.",
    "Maintaining professional demeanor, attire, and language during internal meetings and company forums.",
    "Accepting constructive feedback from mentors and engineering leads with a growth mindset.",
  ]);

  // Section 03: Attendance and Commitment
  flow.section("Attendance and Commitment");
  flow.body(
    "Active participation and consistent attendance are fundamental to the successful completion of the ANONEURX Internship Program. Expectations include:",
  );
  flow.bullets([
    "Punctual attendance at all scheduled daily standups, sprint reviews, and technical workshops.",
    "Adherence to core operational hours (10:00 AM – 04:00 PM PKT) for synchronous collaboration.",
    "Providing a minimum of 24 hours advance written notice to supervisors for any planned absence.",
    "Accurately logging work hours and project milestones in the designated ANONEURX portal.",
  ]);

  // Section 04: Confidentiality
  flow.section("Confidentiality");
  flow.body(
    "During the internship, interns will gain access to proprietary software, technical specifications, and internal data. All interns must strictly preserve the confidentiality of ANONEURX assets.",
  );
  flow.bullets([
    "Confidential information includes source code, system architecture diagrams, internal APIs, database schemas, client telemetry, and product roadmaps.",
    "Non-disclosure obligations remain in full effect during and after completion of the internship.",
    "Publishing, transmitting, or discussing internal ANONEURX materials on external platforms or personal blogs is strictly prohibited without prior written authorization from Legal.",
  ]);

  // Section 05: Information Security
  flow.section("Information Security");
  flow.body(
    "Protecting ANONEURX infrastructure and data against security vulnerabilities is a collective responsibility. Interns must strictly adhere to the following security protocols:",
  );
  flow.bullets([
    "Mandatory multi-factor authentication (MFA) across all company accounts, GitHub, Slack, and cloud services.",
    "Using strong, unique passwords managed through approved corporate password managers.",
    "Prohibition of unvetted third-party browser extensions, unapproved AI code generation tools, or unauthorized cloud storage services.",
    "Immediate reporting of suspicious phishing attempts, compromised credentials, or potential security vulnerabilities to IT Security.",
  ]);

  // Section 06: Intellectual Property
  flow.section("Intellectual Property");
  flow.body(
    "All software code, scripts, user interfaces, documentation, architectural designs, algorithms, and technical artifacts created, modified, or developed by interns during the program belong exclusively to ANONEURX Technologies.",
  );
  flow.bullets([
    "Work created during the internship is deemed 'work made for hire' under applicable intellectual property laws.",
    "Interns shall not register patents, copyrights, or open-source licenses based on ANONEURX proprietary research or codebase.",
    "Interns may showcase project accomplishments in portfolio format only as explicitly permitted in writing by ANONEURX Communications.",
  ]);

  // Section 07: Respectful Workplace
  flow.section("Respectful Workplace");
  flow.body(
    "ANONEURX is dedicated to fostering an inclusive, respectful, and supportive environment free from discrimination, harassment, and hostility. Standards include:",
  );
  flow.bullets([
    "Zero tolerance for discrimination or harassment based on race, gender, religion, ethnicity, age, disability, or personal background.",
    "Encouraging open, polite, and inclusive technical dialogue during design reviews and peer evaluations.",
    "Treating all colleagues, mentors, and program coordinators with dignity, courtesy, and respect.",
  ]);

  // Section 08: Use of Company Resources
  flow.section("Use of Company Resources");
  flow.body(
    "Company hardware, software licenses, cloud compute instances, and communication infrastructure are provided strictly for official ANONEURX project activities.",
  );
  flow.bullets([
    "Company resources must not be utilized for personal commercial gain, unauthorized crypto mining, or personal side-projects.",
    "Excessive consumption of bandwidth or unapproved cloud server provisioning without mentor signoff is prohibited.",
    "ANONEURX reserves the right to monitor and audit system usage on company-owned infrastructure to ensure security and compliance.",
  ]);

  // Section 09: GitHub and Code Management
  flow.section("GitHub and Code Management");
  flow.body(
    "Code management practices directly impact production reliability. Interns must follow official ANONEURX GitHub engineering protocols:",
  );
  flow.bullets([
    "Never commit API keys, secrets, database credentials, or environment files (`.env`) to Git repositories.",
    "Follow designated branch naming conventions (`feature/`, `fix/`, `docs/`) and write clear, imperative commit messages.",
    "All pull requests must undergo automated CI testing and receive mandatory approval from an assigned engineering mentor prior to merging.",
    "Proprietary repositories must remain private and must not be cloned onto unsecure personal hardware.",
  ]);

  // Section 10: Communication
  flow.section("Communication");
  flow.body(
    "Effective communication ensures transparency and smooth remote/hybrid team coordination. Guidelines include:",
  );
  flow.bullets([
    "Official internal communications must occur via ANONEURX Slack channels and corporate email.",
    "Maintain a clear, concise, and respectful tone in text communications, code comments, and issue trackers.",
    "Respond to direct inquiries from mentors and team members within reasonable operational timeframes during working hours.",
  ]);

  // Section 11: Academic and Professional Integrity
  flow.section("Academic and Professional Integrity");
  flow.body(
    "Technical authenticity and honesty are non-negotiable pillars of the ANONEURX engineering culture.",
  );
  flow.bullets([
    "Plagiarism, submitting unverified copied code from public repositories, or claiming third-party work as your own will result in immediate program disqualification.",
    "If generative AI tools are utilized for code suggestions, the generated output must be thoroughly audited, tested, and disclosed to mentors.",
    "Falsification of attendance logs, milestone progress reports, or assessment scores is grounds for summary termination.",
  ]);

  // Section 12: Conflict of Interest
  flow.section("Conflict of Interest");
  flow.body(
    "Interns must avoid situations where personal interests, external activities, or third-party engagements conflict with their obligations to ANONEURX.",
  );
  flow.bullets([
    "Interns must disclose any external freelance work, employment, or academic projects that involve direct competitors or overlapping technology domains.",
    "Interns may not participate in external hackathons or open-source projects using ANONEURX proprietary code or intellectual property.",
  ]);

  // Section 13: Social Media and Public Statements
  flow.section("Social Media and Public Statements");
  flow.body(
    "Interns representing ANONEURX in public forums or social networks (LinkedIn, Twitter, GitHub) must adhere to brand communication standards:",
  );
  flow.bullets([
    "Do not post screenshots of internal Slack conversations, unreleased product UI, or confidential server telemetry.",
    "Media inquiries regarding ANONEURX operations or technology must be directed immediately to Public Relations.",
    "Public posts celebrating program milestones must comply with ANONEURX brand and tagging guidelines.",
  ]);

  // Section 14: Reporting Violations
  flow.section("Reporting Violations");
  flow.body(
    "ANONEURX encourages an open culture where compliance concerns and policy breaches can be reported safely and confidentially.",
  );
  flow.bullets([
    "Violations or security breaches should be reported promptly to People Operations (people@anoneurx.com) or your designated Engineering Lead.",
    "ANONEURX strictly prohibits retaliation against any intern who reports a potential violation in good faith.",
    "All reported incidents will be investigated thoroughly, impartially, and discreetly by the HR & Legal Division.",
  ]);

  // Section 15: Violations and Disciplinary Action
  flow.section("Violations and Disciplinary Action");
  flow.body(
    "Adherence to this Code of Conduct is a condition of participation in the ANONEURX Internship Program. Failure to comply with these policies may result in progressive disciplinary action based on offense severity:",
  );
  flow.bullets([
    "Level 1 (Minor Breach): Informal counseling, verbal warning, and corrective action plan.",
    "Level 2 (Moderate Breach): Formal written reprimand, mandatory re-training, and probation status.",
    "Level 3 (Severe Breach): Immediate termination of internship placement, revocation of program credentials, forfeiture of completion certificates, and potential legal proceedings for intentional IP/security breaches.",
  ]);

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor("anoneurx-intern-code-of-conduct") };
};

export const downloadCodeOfConductDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildCodeOfConductPdf({ ...CODE_OF_CONDUCT_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewCodeOfConductDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildCodeOfConductPdf({ ...CODE_OF_CONDUCT_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
