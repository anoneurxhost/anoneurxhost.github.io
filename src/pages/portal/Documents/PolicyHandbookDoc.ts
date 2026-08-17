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

export const POLICY_HANDBOOK_SPEC: PdfDocumentLike = {
  name: "Internship Policy Handbook",
  type: "Policy Handbook",
  status: "verified",
  issuedOn: "Jun 1, 2026",
  description:
    "Official ANONEURX Internship Program Guidelines, Policies & Procedures covering onboarding, structure, security, GitHub workflows, AI usage, IP, conduct, and completion requirements.",
  issuer: "ANONEURX People Operations & Governance",
  sizeKb: 540,
  program: "internship",
  programme: "ANONEURX Internship Program",
};

/** Custom PDF Builder for ANONEURX Internship Policy Handbook */
export const buildPolicyHandbookPdf = async (doc: PdfDocumentLike = POLICY_HANDBOOK_SPEC) => {
  const mark = await loadMark();
  const pdf = newDoc();
  const ref = refCode(doc);
  setMetadata(pdf, "ANONEURX Internship Policy Handbook", "Intern Program Guidelines, Policies & Procedures · 2026 Edition", [
    "ANONEURX",
    "Internship Policy Handbook",
    "Program Guidelines",
    "Procedures",
  ]);

  // Page 1: Dedicated SpaceX-inspired Cover Page
  drawCover(pdf, {
    title: "INTERNSHIP POLICY HANDBOOK",
    subtitle: "INTERN PROGRAM GUIDELINES, POLICIES & PROCEDURES",
    kicker: "OFFICIAL PROGRAM GOVERNANCE HANDBOOK",
    program: doc.program,
    mark,
    ref,
    edition: "2026 EDITION",
    rows: [
      ["Program", "ANONEURX Internship Program"],
      ["Document Type", "Policy Handbook & Guidelines"],
      ["Edition", "2026 Edition (v2026.1)"],
      ["Effective Date", "June 1, 2026"],
      ["Target Audience", "All Program Interns & Supervisors"],
      ["Document Ref", ref],
    ],
  });

  const headerLeft = "ANONEURX — Internship Policy Handbook | 2026";
  const flow = new Flow(pdf, { headerLeft, mark });

  // Page 2+: Content Sections (1 to 26)
  flow.newPage();
  flow.title("ANONEURX INTERNSHIP POLICY HANDBOOK", "INTERN PROGRAM GUIDELINES, POLICIES & PROCEDURES · 2026 EDITION");

  // Section 1: Introduction
  flow.section("1. Introduction");
  flow.body(
    "Welcome to the ANONEURX Internship Program. This handbook provides interns with the policies, procedures, expectations, and guidelines applicable throughout their internship.\n\nThe purpose of this handbook is to establish a clear and professional framework for learning, collaboration, project participation, communication, security, and professional development.\n\nAll interns are expected to familiarize themselves with this handbook and follow the policies applicable to their internship.",
  );

  // Section 2: About the ANONEURX Internship Program
  flow.section("2. About the ANONEURX Internship Program");
  flow.body(
    "The ANONEURX Internship Program is designed to provide students and aspiring professionals with practical experience in technology, software development, data science, artificial intelligence, cybersecurity, research, design, and other relevant fields.",
  );
  flow.body("The program focuses on:");
  flow.bullets([
    "Practical technical experience.",
    "Professional development.",
    "Real-world project exposure.",
    "Team collaboration.",
    "Mentorship and supervision.",
    "Research and problem-solving.",
    "Professional communication.",
    "Development of industry-ready skills.",
  ]);
  flow.body("Intern responsibilities and project assignments may vary depending on the department and organizational requirements.", "left");

  // Section 3: Internship Structure
  flow.section("3. Internship Structure");
  flow.heading(2, "3.1 Onboarding");
  flow.body("Interns are introduced to: ANONEURX and its teams, their assigned department, supervisor, communication channels, project management procedures, security requirements, work environments, and relevant documentation.");

  flow.heading(2, "3.2 Training");
  flow.body("Depending on the position, interns may receive technical or professional training before beginning project responsibilities.");

  flow.heading(2, "3.3 Project Assignment");
  flow.body("Interns may be assigned to one or more projects based on skills, academic background, technical ability, project requirements, and learning objectives.");

  flow.heading(2, "3.4 Evaluation");
  flow.body("Intern performance may be reviewed throughout the internship based on assigned responsibilities, technical progress, professionalism, communication, and overall participation.");

  flow.heading(2, "3.5 Completion");
  flow.body("Upon satisfactory completion of the internship requirements, eligible interns may receive official internship completion documentation.");

  // Section 4: Roles and Responsibilities
  flow.section("4. Internship Roles and Responsibilities");
  flow.heading(2, "4.1 Intern Responsibilities");
  flow.body("Interns are expected to:");
  flow.bullets([
    "Complete assigned tasks responsibly.",
    "Follow instructions provided by supervisors.",
    "Meet agreed deadlines.",
    "Ask questions when requirements are unclear.",
    "Communicate project issues promptly.",
    "Participate in relevant meetings and training.",
    "Maintain professional communication.",
    "Follow organizational policies.",
    "Protect confidential information.",
    "Maintain the security of assigned accounts and systems.",
  ]);

  flow.heading(2, "4.2 Supervisor Responsibilities");
  flow.body("Supervisors are responsible for:");
  flow.bullets([
    "Providing reasonable guidance.",
    "Assigning appropriate tasks.",
    "Communicating project expectations.",
    "Providing feedback.",
    "Monitoring internship progress.",
    "Supporting the intern's learning and development.",
    "Addressing reasonable questions and concerns.",
  ]);

  // Section 5: Attendance and Working Schedule
  flow.section("5. Attendance and Working Schedule");
  flow.body(
    "Interns must follow the working schedule communicated during onboarding. Depending on the internship type, the schedule may be Remote, On-site, Hybrid, or Project-based.\n\nInterns should attend scheduled meetings and remain reasonably available during agreed working periods. If an intern cannot attend a scheduled activity, they should notify their supervisor as early as reasonably possible.\n\nRepeated unexplained absence or inactivity may affect internship evaluation and continuation.",
  );

  // Section 6: Leave and Absence
  flow.section("6. Leave and Absence");
  flow.body("Interns who require leave should communicate with their supervisor before the absence whenever reasonably possible. Leave requests should include:");
  flow.bullets([
    "Expected absence date.",
    "Expected duration.",
    "General reason when appropriate.",
    "Any affected tasks or deadlines.",
  ]);
  flow.body("Emergency situations should be communicated as soon as reasonably possible. Extended or repeated absences may require an adjustment to the internship schedule or duration.");

  // Section 7: Performance and Evaluation
  flow.section("7. Performance and Evaluation");
  flow.body("Intern performance may be evaluated using criteria such as:");
  flow.bullets([
    "Quality of work & technical development.",
    "Problem-solving ability & task completion.",
    "Meeting deadlines & professional behavior.",
    "Communication & team collaboration.",
    "Learning progress, initiative, and responsibility.",
  ]);
  flow.body("Performance feedback may be provided periodically throughout the internship.");

  // Section 8: Task and Project Management
  flow.section("8. Task and Project Management");
  flow.body("Interns should follow the project-management process established by their assigned team, including task assignment, issue tracking, GitHub workflows, code reviews, documentation, progress updates, meetings, and testing.\n\nInterns should not make major changes to production systems or critical infrastructure without appropriate authorization.");

  // Section 9: Communication Policy
  flow.section("9. Communication Policy");
  flow.body("Professional communication is required across all ANONEURX channels. Interns should communicate respectfully, provide clear progress updates, respond to important work-related messages, ask for clarification when necessary, report problems honestly, and keep project communication relevant.");

  // Section 10: Remote Internship Policy
  flow.section("10. Remote Internship Policy");
  flow.body("Remote interns are expected to maintain a professional working environment and reliable communication. They should maintain an appropriate workspace, have reasonable internet connectivity, attend scheduled online meetings, remain available during agreed working periods, and protect company information from unauthorized access.");

  // Section 11: Confidentiality Policy
  flow.section("11. Confidentiality Policy");
  flow.body("Interns may have access to confidential information including source code, software architecture, internal documentation, business/client data, credentials, API keys, database information, and unreleased features. Such information must not be disclosed or distributed without authorization. Confidentiality obligations continue after the internship ends.");

  // Section 12: Information Security Policy
  flow.section("12. Information Security Policy");
  flow.body("Interns must protect all organizational accounts, systems, repositories, and data. Interns must not share passwords/API keys, attempt unauthorized access, circumvent security controls, perform unauthorized penetration testing, install malicious software, or upload confidential data to public services. Suspected incidents must be reported immediately.");

  // Section 13: GitHub and Software Development Policy
  flow.section("13. GitHub and Software Development Policy");
  flow.body("Where GitHub is used, interns must use appropriate branches, write meaningful commit messages, create clear pull requests, follow coding standards, participate in code reviews, and keep repositories organized.\n\nInterns must NEVER commit passwords, API keys, private tokens, or database credentials.");

  // Section 14: Artificial Intelligence and External Tools
  flow.section("14. Artificial Intelligence and External Tools");
  flow.body("Interns may use AI tools where permitted by their supervisor. However, interns must NOT upload confidential ANONEURX information, private code, credentials, or client data to external AI services without authorization.\n\nAI-generated work must be reviewed for accuracy, security, licensing, technical correctness, and originality.");

  // Section 15: Intellectual Property
  flow.section("15. Intellectual Property");
  flow.body("Work created during the internship (software, docs, designs, research, datasets, algorithms) is governed by applicable internship agreements and ANONEURX policies. Interns must not independently publish, sell, distribute, or commercially reuse proprietary ANONEURX work without authorization.");

  // Section 16: Use of Company Resources
  flow.section("16. Use of Company Resources");
  flow.body("ANONEURX resources (computers, servers, cloud services, GitHub repos, software licenses, databases) must be used responsibly and only for authorized purposes. Unauthorized use may result in removal of access or disciplinary action.");

  // Section 17: Professional Conduct
  flow.section("17. Professional Conduct");
  flow.body("Interns must maintain professional behavior (respect, honesty, accountability, reliability, collaboration). Harassment, discrimination, bullying, or abusive behavior is not acceptable. Refer to the ANONEURX Intern Code of Conduct for detailed behavioral standards.");

  // Section 18: Academic and Professional Integrity
  flow.section("18. Academic and Professional Integrity");
  flow.body("Interns must provide honest information about their qualifications and contributions. Plagiarism, falsifying work/attendance, claiming another's work, manipulating results, or misrepresenting technical skills are strictly prohibited.");

  // Section 19: Social Media and Public Communication
  flow.section("19. Social Media and Public Communication");
  flow.body("Interns must not publicly disclose confidential information regarding ANONEURX, its clients, systems, or unreleased products, nor represent themselves as authorized spokespersons unless explicitly authorized.");

  // Section 20: Conflict of Interest
  flow.section("20. Conflict of Interest");
  flow.body("Interns should disclose situations that may create a conflict of interest and must not use confidential ANONEURX information or resources for unauthorized personal or third-party purposes.");

  // Section 21: Reporting Concerns
  flow.section("21. Reporting Concerns");
  flow.body("Interns are encouraged to report concerns regarding security, harassment, misconduct, confidentiality breaches, or unethical behavior to their supervisor or designated ANONEURX management contact in good faith.");

  // Section 22: Disciplinary Action
  flow.section("22. Disciplinary Action");
  flow.body("Failure to follow applicable policies may result in progressive disciplinary action ranging from verbal/written warnings and system access restrictions to immediate internship termination.");

  // Section 23: Internship Termination
  flow.section("23. Internship Termination");
  flow.body("An internship may end due to completion, period expiration, mutual agreement, resignation, performance, or policy violations. Returning company property and surrendering access is mandatory upon termination.");

  // Section 24: Internship Completion
  flow.section("24. Internship Completion");
  flow.body("Completion depends on fulfilling assigned work, attendance, performance evaluation, document submission, supervisor approval, and policy compliance. Eligible interns receive official completion documentation.");

  // Section 25: Changes to the Handbook
  flow.section("25. Changes to the Handbook");
  flow.body("ANONEURX may update this handbook to reflect organizational, technological, security, or legal changes. Interns will be notified of significant updates through official channels.");

  // Section 26: Final Statement
  flow.section("26. Final Statement");
  flow.body("The ANONEURX Internship Program is intended to provide a professional environment where interns can learn, contribute, collaborate, and develop practical skills.\n\nEvery intern is expected to approach the internship with professionalism, integrity, responsibility, curiosity, and respect.");

  flow.space(18);
  flow.heading(2, "ANONEURX INTERNSHIP PROGRAM · 2026 EDITION");
  flow.body("Building technology. Developing people. Creating impact.", "left");

  applyFooters(pdf, ref);
  return { pdf, fileName: fileNameFor("anoneurx-internship-policy-handbook") };
};

export const downloadPolicyHandbookDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildPolicyHandbookPdf({ ...POLICY_HANDBOOK_SPEC, ...overrides });
  pdf.save(fileName);
};

export const previewPolicyHandbookDoc = async (overrides?: Partial<PdfDocumentLike>) => {
  const { pdf, fileName } = await buildPolicyHandbookPdf({ ...POLICY_HANDBOOK_SPEC, ...overrides });
  const url = URL.createObjectURL(pdf.output("blob"));
  return { url, fileName, revoke: () => URL.revokeObjectURL(url), save: () => pdf.save(fileName) };
};
