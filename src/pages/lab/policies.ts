/**
 * Lab governance content.
 *
 * Policies are data, not JSX, so the same records feed the policy pages, the
 * policies index and the footer. Unknown legal specifics stay in square
 * brackets so they are obviously placeholders and never read as invented facts.
 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "note"; text: string }
  | { type: "dl"; items: { term: string; detail: string }[] };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export type Policy = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  effective: string;
  updated: string;
  owner: string;
  sections: PolicySection[];
};

const CONTACT = "[Placeholder: lab governance contact email]";

export const labPolicies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    shortTitle: "Privacy",
    description:
      "How Anoneurx Lab collects, uses, shares and protects personal information when you browse the lab, apply for a placement, or take part in research.",
    summary:
      "What information the lab collects, why it is needed, how long it is kept, and the choices you have over it.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Governance",
    sections: [
      {
        id: "scope",
        title: "1. Scope",
        blocks: [
          {
            type: "p",
            text: "This policy explains how Anoneurx Lab (“the lab”, “we”, “us”) handles personal information on the lab website and in the course of research, placements and collaborations. It applies to visitors, applicants, student researchers, supervisors, collaborators and reviewers.",
          },
          {
            type: "p",
            text: "Where the lab processes information on behalf of a university or another partner, that partner’s privacy notice may also apply. Where local law gives you stronger rights than this policy, local law prevails.",
          },
        ],
      },
      {
        id: "information-we-collect",
        title: "2. Information we collect",
        blocks: [
          { type: "p", text: "We collect only the information we need to run the lab and its research." },
          {
            type: "dl",
            items: [
              {
                term: "Information you give us",
                detail:
                  "Name, email address, affiliation and the content of applications, enquiries, reviews and correspondence you send to the lab.",
              },
              {
                term: "Application information",
                detail:
                  "Education history, skills, research interests, references and work samples submitted through a placement or collaboration form.",
              },
              {
                term: "Research records",
                detail:
                  "Notes, datasets, code and authorship records produced while working on a lab problem, handled under the lab’s research ethics and data-management rules.",
              },
              {
                term: "Technical information",
                detail:
                  "Standard server logs such as IP address, browser type, requested page and timestamp, retained for security and reliability.",
              },
              {
                term: "Preference information",
                detail:
                  "Interface settings, such as light or dark theme, stored locally in your browser rather than on our servers.",
              },
            ],
          },
          {
            type: "note",
            text: "The lab does not ask for government identifiers, payment details or special-category data unless a specific programme requires it and tells you first.",
          },
        ],
      },
      {
        id: "how-we-use",
        title: "3. How we use information",
        blocks: [
          { type: "p", text: "Personal information is used to:" },
          {
            type: "list",
            items: [
              "Assess applications and match applicants to suitable problems and supervisors.",
              "Administer placements, collaborations, reviews and research outputs.",
              "Respond to enquiries and provide the access you request.",
              "Operate, secure and improve the lab website.",
              "Meet record-keeping, ethics and legal obligations.",
              "Send programme updates you have asked to receive.",
            ],
          },
          {
            type: "p",
            text: "We do not sell personal information, and we do not use application data for advertising.",
          },
        ],
      },
      {
        id: "legal-bases",
        title: "4. Legal bases",
        blocks: [
          {
            type: "p",
            text: "Where the GDPR or comparable law applies, we rely on the following legal bases:",
          },
          {
            type: "dl",
            items: [
              { term: "Contract", detail: "To assess and administer a placement or collaboration you have applied for." },
              { term: "Legitimate interests", detail: "To run, secure and improve the lab and its research, balanced against your rights." },
              { term: "Consent", detail: "For optional communications and any research activity that specifically requires consent." },
              { term: "Legal obligation", detail: "To keep records required by ethics, funding or regulatory rules." },
            ],
          },
        ],
      },
      {
        id: "sharing",
        title: "5. When we share information",
        blocks: [
          { type: "p", text: "We share personal information only where there is a clear need:" },
          {
            type: "list",
            items: [
              "With supervisors, reviewers and collaborators involved in your application or project.",
              "With service providers who host, secure or support the lab, under confidentiality and data-processing terms.",
              "With a university or funding partner where a programme is jointly run, as described when you apply.",
              "Where required by law, regulation or a valid legal request.",
              "To protect the lab, its researchers or the public from harm.",
            ],
          },
          {
            type: "p",
            text: "Research datasets released publicly are de-identified or aggregated before release and are never published with personal contact details.",
          },
        ],
      },
      {
        id: "retention",
        title: "6. Retention",
        blocks: [
          {
            type: "p",
            text: "We keep personal information only as long as it is needed for the purpose it was collected for, or as required by law.",
          },
          {
            type: "dl",
            items: [
              { term: "Enquiries", detail: "Retained for up to 24 months after the conversation closes." },
              { term: "Unsuccessful applications", detail: "Retained for up to 12 months, then deleted or de-identified, unless you ask us to keep them longer." },
              { term: "Active placements and collaborations", detail: "Retained for the duration of the work and for the period required to verify publications and awards." },
              { term: "Server logs", detail: "Retained on a short rolling basis for security and troubleshooting." },
            ],
          },
        ],
      },
      {
        id: "your-rights",
        title: "7. Your rights",
        blocks: [
          {
            type: "p",
            text: "Depending on where you live, you may have the right to access, correct, delete, restrict or export your personal information, to object to certain processing, and to withdraw consent where processing is based on consent.",
          },
          {
            type: "p",
            text: `To exercise a right, contact ${CONTACT}. We will verify your request and respond within the period required by applicable law. You may also complain to your local data-protection authority.`,
          },
        ],
      },
      {
        id: "cookies-and-storage",
        title: "8. Cookies and local storage",
        blocks: [
          {
            type: "p",
            text: "The lab website uses local storage to remember your interface preferences. It does not use advertising or cross-site tracking cookies. The separate Cookie Policy explains the categories, durations and controls in detail.",
          },
        ],
      },
      {
        id: "security",
        title: "9. Security",
        blocks: [
          {
            type: "p",
            text: "We apply access controls, encryption in transit, least-privilege access and review procedures to protect personal information. No system is perfectly secure, so please report suspected incidents through the Security Policy rather than testing them yourself.",
          },
        ],
      },
      {
        id: "international-transfers",
        title: "10. International transfers",
        blocks: [
          {
            type: "p",
            text: "The lab works with collaborators in several countries. Where personal information moves across borders, we use appropriate safeguards such as standard contractual clauses or an equivalent mechanism required by law.",
          },
        ],
      },
      {
        id: "children",
        title: "11. Children",
        blocks: [
          {
            type: "p",
            text: "The lab website and programmes are intended for people aged 18 and over. We do not knowingly collect personal information from children. If you believe a child has provided information, contact us and we will delete it.",
          },
        ],
      },
      {
        id: "changes",
        title: "12. Changes to this policy",
        blocks: [
          {
            type: "p",
            text: "We may update this policy as the lab or the law changes. The revised version will show a new “last updated” date, and material changes will be announced on the lab home page.",
          },
        ],
      },
      {
        id: "contact",
        title: "13. Contact",
        blocks: [
          {
            type: "p",
            text: `Questions about privacy, or requests to exercise your rights, can be sent to ${CONTACT}. The lab’s postal address and data-protection representative are recorded as [Placeholder: registered address and DPO details].`,
          },
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    shortTitle: "Cookies",
    description:
      "The cookies and browser storage used by the Anoneurx Lab website, what each category does, how long it lasts, and how to control it.",
    summary:
      "The lab sets no advertising or cross-site tracking cookies. This page lists exactly what is stored and how to clear it.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Governance",
    sections: [
      {
        id: "overview",
        title: "1. Overview",
        blocks: [
          {
            type: "p",
            text: "This policy explains how the lab website uses cookies and similar technologies such as local storage. It should be read together with the Privacy Policy.",
          },
          {
            type: "note",
            text: "The lab website does not use advertising cookies, cross-site tracking pixels or third-party marketing tags.",
          },
        ],
      },
      {
        id: "what-are-cookies",
        title: "2. What cookies and local storage are",
        blocks: [
          {
            type: "p",
            text: "Cookies are small text files a site stores in your browser. Local storage is a similar browser mechanism that holds key–value data without sending it with every request. Both can remember choices between visits.",
          },
        ],
      },
      {
        id: "categories",
        title: "3. Categories we use",
        blocks: [
          {
            type: "dl",
            items: [
              {
                term: "Strictly necessary",
                detail:
                  "Required for the site to load, route securely and remember a protected session. These cannot be switched off without breaking the site.",
              },
              {
                term: "Preferences",
                detail:
                  "Remember interface choices such as light or dark theme. The lab stores this in local storage under the key anoneurx-lab-theme. It contains no identifier and is never sent to a server.",
              },
              {
                term: "Analytics",
                detail:
                  "Used only if aggregate, privacy-preserving measurement is enabled. The lab does not currently deploy third-party analytics on this site.",
              },
              {
                term: "Advertising",
                detail: "Not used anywhere on the lab website.",
              },
            ],
          },
        ],
      },
      {
        id: "what-the-lab-uses",
        title: "4. What the lab currently stores",
        blocks: [
          {
            type: "dl",
            items: [
              {
                term: "anoneurx-lab-theme",
                detail:
                  "Local storage. Stores “light” or “dark” so the selected theme survives a reload. No expiry; removed when you clear site data.",
              },
              {
                term: "Hosting cookies",
                detail:
                  "Set by the static hosting provider only where required for delivery and abuse prevention. These are strictly necessary and are not read by lab code.",
              },
            ],
          },
        ],
      },
      {
        id: "managing",
        title: "5. Managing cookies and storage",
        blocks: [
          {
            type: "p",
            text: "You can clear or block cookies and local storage in your browser settings. Instructions are available for Chrome, Firefox, Safari and Edge. Clearing site data removes the remembered theme; the site then follows your operating-system colour preference.",
          },
          {
            type: "p",
            text: "Blocking strictly necessary storage may prevent parts of the site from working. Because the lab does not use advertising cookies, there is no advertising opt-out to manage here.",
          },
        ],
      },
      {
        id: "analytics",
        title: "6. Measurement",
        blocks: [
          {
            type: "p",
            text: "If privacy-preserving measurement is enabled in future, it will be aggregate, cookie-free and disclosed here before it is switched on. We will not add third-party tracking without updating this page.",
          },
        ],
      },
      {
        id: "changes",
        title: "7. Changes",
        blocks: [
          {
            type: "p",
            text: "If the cookies or storage the lab uses change, this page will be updated and the “last updated” date revised.",
          },
        ],
      },
      {
        id: "contact",
        title: "8. Contact",
        blocks: [
          {
            type: "p",
            text: `Questions about cookies or browser storage can be sent to ${CONTACT}.`,
          },
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    shortTitle: "Terms",
    description:
      "The terms that apply when you use the Anoneurx Lab website, read its research, or take part in its programmes.",
    summary:
      "The ground rules for using the lab website, reading its research and taking part in its programmes.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Governance",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance",
        blocks: [
          {
            type: "p",
            text: "By using the lab website you agree to these terms. If you do not agree, please do not use the site. Additional terms may apply to a specific programme, and those terms will be presented before you take part.",
          },
        ],
      },
      {
        id: "the-site",
        title: "2. The site",
        blocks: [
          {
            type: "p",
            text: "The lab website publishes research problems, projects, publications, people and opportunities. We aim to keep it accurate and available, but we do not guarantee uninterrupted access or that every record is complete at all times.",
          },
        ],
      },
      {
        id: "research-information",
        title: "3. Research information is not advice",
        blocks: [
          {
            type: "p",
            text: "Research notes, problem statements, code and publications are provided for study and discussion. They are not professional, legal, medical, financial or security advice, and should not be relied on as a substitute for advice from a qualified professional.",
          },
        ],
      },
      {
        id: "open-source",
        title: "4. Open-source licensing",
        blocks: [
          {
            type: "p",
            text: "Code, datasets and papers are released under the licence stated on the relevant record. Your use of a released work is governed by that licence. Where no licence is stated, the work is shared for reading and citation only and may not be redistributed.",
          },
        ],
      },
      {
        id: "intellectual-property",
        title: "5. Intellectual property",
        blocks: [
          {
            type: "p",
            text: "The lab name, logo and site design belong to Anoneurx. Research outputs remain subject to their stated licences and to the rights of their authors and institutions. You may quote and cite published material with proper attribution.",
          },
        ],
      },
      {
        id: "acceptable-use",
        title: "6. Acceptable use",
        blocks: [
          { type: "p", text: "You agree not to:" },
          {
            type: "list",
            items: [
              "Attempt to gain unauthorised access to the site, its systems or another person’s data.",
              "Interfere with the availability or integrity of the site, including through automated load.",
              "Misrepresent your identity or affiliation in an application or collaboration.",
              "Use lab material in a way that infringes the rights of others or violates the law.",
              "Test for vulnerabilities outside the process described in the Security Policy.",
            ],
          },
        ],
      },
      {
        id: "third-party",
        title: "7. Third-party links",
        blocks: [
          {
            type: "p",
            text: "The site links to external resources such as papers, repositories and partner institutions. Those sites are not under our control, and their terms and privacy practices apply to your use of them.",
          },
        ],
      },
      {
        id: "disclaimers",
        title: "8. Disclaimers",
        blocks: [
          {
            type: "p",
            text: "The site and its content are provided on an “as is” and “as available” basis. To the extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose and non-infringement.",
          },
        ],
      },
      {
        id: "liability",
        title: "9. Limitation of liability",
        blocks: [
          {
            type: "p",
            text: "To the extent permitted by law, Anoneurx Lab is not liable for indirect, incidental or consequential loss arising from your use of the site. Nothing in these terms limits liability that cannot lawfully be limited.",
          },
        ],
      },
      {
        id: "changes",
        title: "10. Changes",
        blocks: [
          {
            type: "p",
            text: "We may revise these terms as the lab or the law changes. The revised version will carry a new “last updated” date. Continued use of the site after a change means you accept the revised terms.",
          },
        ],
      },
      {
        id: "governing-law",
        title: "11. Governing law",
        blocks: [
          {
            type: "p",
            text: "These terms are governed by the laws of [Placeholder: jurisdiction]. Disputes will be handled by the courts of [Placeholder: jurisdiction], unless mandatory consumer law in your country provides otherwise.",
          },
        ],
      },
      {
        id: "contact",
        title: "12. Contact",
        blocks: [
          {
            type: "p",
            text: `Questions about these terms can be sent to ${CONTACT}.`,
          },
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    shortTitle: "Accessibility",
    description:
      "The accessibility commitments behind the Anoneurx Lab website, the standard we target, known limitations and how to report a barrier.",
    summary:
      "The standard the lab site targets, what we have done to meet it, known gaps and how to report a barrier.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Engineering",
    sections: [
      {
        id: "commitment",
        title: "1. Our commitment",
        blocks: [
          {
            type: "p",
            text: "Anoneurx Lab wants its research and opportunities to be usable by everyone, including people who use assistive technology. Accessibility is treated as a requirement, not an afterthought.",
          },
        ],
      },
      {
        id: "conformance",
        title: "2. Conformance target",
        blocks: [
          {
            type: "p",
            text: "The lab website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. Where a page does not yet meet that target, the gap is listed under known limitations.",
          },
        ],
      },
      {
        id: "measures",
        title: "3. What we have done",
        blocks: [
          {
            type: "list",
            items: [
              "Semantic landmarks, headings and lists so screen readers can navigate the page structure.",
              "A visible “skip to content” link and full keyboard operation of navigation, filters and disclosures.",
              "Colour tokens checked for text contrast in both the light and dark themes.",
              "Themes that follow the operating-system preference, with an explicit toggle.",
              "Motion that is reduced or removed when the operating system requests reduced motion.",
              "No content that relies on colour alone to convey meaning.",
            ],
          },
        ],
      },
      {
        id: "compatibility",
        title: "4. Compatibility",
        blocks: [
          {
            type: "p",
            text: "The site is built with standard HTML, CSS and JavaScript and is tested with current versions of Chrome, Firefox, Safari and Edge, together with common screen readers. Very old browsers may not render every enhancement; core content remains readable.",
          },
        ],
      },
      {
        id: "known-limitations",
        title: "5. Known limitations",
        blocks: [
          {
            type: "dl",
            items: [
              {
                term: "Third-party content",
                detail:
                  "Linked papers, repositories and forms hosted elsewhere are outside our control and may not meet the same standard.",
              },
              {
                term: "Legacy records",
                detail:
                  "Some archived problem and publication records predate the current design and are being migrated progressively.",
              },
              {
                term: "Complex figures",
                detail:
                  "A small number of diagrams have concise text alternatives that describe the structure rather than every visual detail.",
              },
            ],
          },
        ],
      },
      {
        id: "feedback",
        title: "6. Feedback and assistance",
        blocks: [
          {
            type: "p",
            text: `If a page is hard to use with assistive technology, contact ${CONTACT} and describe the page, the task and the technology you used. We aim to acknowledge accessibility reports promptly and to offer the information in an alternative format where needed.`,
          },
        ],
      },
      {
        id: "enforcement",
        title: "7. Enforcement",
        blocks: [
          {
            type: "p",
            text: "Accessibility reports are triaged with the same priority as functional bugs. Where a barrier blocks access to an opportunity, we will provide a reasonable alternative while the underlying issue is fixed.",
          },
        ],
      },
      {
        id: "ongoing",
        title: "8. Ongoing work",
        blocks: [
          {
            type: "p",
            text: "We review the site against WCAG 2.2 AA when pages change and run keyboard and screen-reader checks before major releases. This statement will be updated as the site and the standard evolve.",
          },
        ],
      },
    ],
  },
  {
    slug: "ethics",
    title: "Research Ethics & Integrity",
    shortTitle: "Ethics",
    description:
      "The ethical and integrity standards the Anoneurx Lab applies to problem selection, data, human participation, authorship, AI safety and the reporting of misconduct.",
    summary:
      "How the lab selects problems and handles data, human participants, authorship, AI risk and misconduct.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Research Integrity",
    sections: [
      {
        id: "commitment",
        title: "1. Commitment",
        blocks: [
          {
            type: "p",
            text: "The lab expects every project to be worth doing, honestly done and safe to release. This policy sets the standard that supervisors, student researchers and collaborators agree to when they join a problem.",
          },
        ],
      },
      {
        id: "integrity",
        title: "2. Research integrity",
        blocks: [
          {
            type: "list",
            items: [
              "Report methods, data and results accurately, including negative and inconclusive results.",
              "Do not fabricate, falsify or selectively omit data.",
              "Cite prior work and give credit for ideas that are not your own.",
              "Keep enough records for an independent researcher to reproduce the work.",
              "Disclose limitations and the conditions under which results may not hold.",
            ],
          },
        ],
      },
      {
        id: "human-participants",
        title: "3. Human participants",
        blocks: [
          {
            type: "p",
            text: "Any study involving people must have a documented protocol, informed consent and, where required, approval from an ethics board before data collection begins. Participants may withdraw without penalty, and their data must be handled as described in the consent materials.",
          },
        ],
      },
      {
        id: "data-ethics",
        title: "4. Data ethics",
        blocks: [
          {
            type: "dl",
            items: [
              { term: "Minimisation", detail: "Collect only the data the research question needs." },
              { term: "De-identification", detail: "Remove or aggregate identifiers before any public release." },
              { term: "Licensing", detail: "Release data only where the licence and consent allow it." },
              { term: "Sensitive data", detail: "Do not place personal, health or otherwise sensitive data in public repositories." },
            ],
          },
        ],
      },
      {
        id: "ai-safety",
        title: "5. AI safety and dual use",
        blocks: [
          {
            type: "p",
            text: "Work on capable AI systems can be misused. Projects that could enable harm — for example, attacks on deployed systems, surveillance or autonomous weapons — require an explicit dual-use review before release. The review asks who could use the result, what safeguards reduce risk, and whether a staged or restricted release is appropriate.",
          },
          {
            type: "p",
            text: "The lab will not publish material whose primary foreseeable use is to cause harm, and will pause a project where the risks cannot be adequately mitigated.",
          },
        ],
      },
      {
        id: "authorship",
        title: "6. Authorship and credit",
        blocks: [
          {
            type: "p",
            text: "Authorship reflects a substantial contribution to conception, execution or analysis, and every author approves the final version. Supervisors do not take authorship for work they did not contribute to, and contributors who do not meet the authorship threshold are credited in acknowledgements.",
          },
        ],
      },
      {
        id: "conflicts",
        title: "7. Conflicts of interest",
        blocks: [
          {
            type: "p",
            text: "Researchers disclose funding, employment, advisory roles and other interests that could reasonably be seen to influence a result. Disclosures appear with the publication or are reported to the research lead before work begins.",
          },
        ],
      },
      {
        id: "misconduct",
        title: "8. Research misconduct",
        blocks: [
          {
            type: "p",
            text: "Fabrication, falsification, plagiarism, undisclosed conflicts, misuse of participant data and retaliation against someone who reports a concern are treated as misconduct. A finding may lead to correction, retraction, removal from the lab and notification of partners or institutions.",
          },
        ],
      },
      {
        id: "reporting",
        title: "9. Reporting a concern",
        blocks: [
          {
            type: "p",
            text: `Concerns can be raised confidentially with the research lead or through ${CONTACT}. Reports are handled by people who are not the subject of the concern, and good-faith reporters are protected from retaliation.`,
          },
        ],
      },
      {
        id: "approvals",
        title: "10. Review and approval",
        blocks: [
          {
            type: "p",
            text: "Before data collection, each project records its ethics review, its data-management plan and, where relevant, its dual-use assessment. Approval is required from the named supervisor and the research integrity lead.",
          },
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "Security & Responsible Disclosure",
    shortTitle: "Security",
    description:
      "How to report a security vulnerability in Anoneurx Lab systems, what is in scope, how reports are handled and the safe-harbour commitments for good-faith research.",
    summary:
      "How to report a vulnerability, what is in scope, what to include and how the lab responds.",
    effective: "1 October 2026",
    updated: "23 October 2026",
    owner: "Anoneurx Lab — Security",
    sections: [
      {
        id: "scope",
        title: "1. Scope",
        blocks: [
          {
            type: "p",
            text: "This policy covers the lab website and the services the lab operates directly. Third-party platforms, partner systems and linked repositories are out of scope; report issues there to the operator responsible.",
          },
        ],
      },
      {
        id: "reporting",
        title: "2. Reporting a vulnerability",
        blocks: [
          {
            type: "p",
            text: `Send reports to ${"[Placeholder: security contact email]"}. Please do not open a public issue, post details on social media or test against data that does not belong to you.`,
          },
          { type: "p", text: "A useful report includes:" },
          {
            type: "list",
            items: [
              "The affected URL, service or component.",
              "A clear description of the issue and its potential impact.",
              "Reproduction steps or a minimal proof of concept.",
              "Your contact details for follow-up.",
              "Whether you wish to be credited, and under what name.",
            ],
          },
        ],
      },
      {
        id: "process",
        title: "3. How we respond",
        blocks: [
          {
            type: "dl",
            items: [
              { term: "Acknowledgement", detail: "We aim to acknowledge a report within 3 working days." },
              { term: "Triage", detail: "We confirm scope, severity and a remediation plan within 10 working days where possible." },
              { term: "Fix", detail: "Timelines depend on severity and complexity; we keep you informed of material progress." },
              { term: "Disclosure", detail: "We coordinate public disclosure with you after a fix is available, or at an agreed date." },
            ],
          },
        ],
      },
      {
        id: "safe-harbour",
        title: "4. Safe harbour",
        blocks: [
          {
            type: "p",
            text: "If you act in good faith under this policy — stay within scope, avoid privacy violations and service disruption, and give us reasonable time to fix the issue — the lab will not pursue legal action or report you to authorities for your research. This commitment does not protect deliberate harm, extortion or access to data beyond what is needed to demonstrate the issue.",
          },
        ],
      },
      {
        id: "out-of-scope",
        title: "5. Out of scope",
        blocks: [
          {
            type: "list",
            items: [
              "Reports generated solely by automated scanners without a demonstrated impact.",
              "Missing security headers or best-practice suggestions with no exploit path.",
              "Social engineering, phishing or physical attacks against staff.",
              "Denial-of-service testing or any activity that degrades the service.",
              "Issues in third-party services or dependencies that are not exploitable in the lab.",
            ],
          },
        ],
      },
      {
        id: "recognition",
        title: "6. Recognition",
        blocks: [
          {
            type: "p",
            text: "With your permission, we credit valid reports in the lab’s security acknowledgements. The lab does not currently operate a paid bounty programme and will say so clearly if that changes.",
          },
        ],
      },
      {
        id: "contact",
        title: "7. Contact",
        blocks: [
          {
            type: "p",
            text: `Security reports should go to ${"[Placeholder: security contact email]"}. General governance questions go to ${CONTACT}.`,
          },
        ],
      },
    ],
  },
];

export const getPolicy = (slug: string): Policy | undefined =>
  labPolicies.find((policy) => policy.slug === slug);
