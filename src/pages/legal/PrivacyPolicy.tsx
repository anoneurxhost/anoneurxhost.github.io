import React from 'react';
import LegalPageLayout from '@/pages/common/LegalPageLayout';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: (
      <>
        <p>Welcome to Anoneurx. We value your privacy and are committed to protecting your personal data. This policy outlines how we handle information in accordance with global data protection standards including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable privacy laws.</p>
        <p>This Privacy Policy applies to all services offered through the Anoneurx platform, including our educational courses, research tools, internship programs, and community features.</p>
      </>
    ),
  },
  {
    id: 'data-collection',
    title: '2. Data We Collect',
    content: (
      <>
        <p>We collect information that you provide directly to us when you create an account, register for courses, or apply for internships. This may include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal identifiers:</strong> Name, email address, phone number, and date of birth.</li>
          <li><strong>Professional information:</strong> Educational background, work experience, and skills.</li>
          <li><strong>Account data:</strong> Username, password (encrypted), and profile settings.</li>
          <li><strong>Usage data:</strong> Pages visited, features used, time spent on platform, and interaction patterns.</li>
          <li><strong>Device data:</strong> Browser type, operating system, IP address, and device identifiers.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-use',
    title: '3. How We Use Your Data',
    content: (
      <>
        <p>Your data is used to provide our educational and professional services. Specifically, we use your information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Deliver and personalize course content and learning experiences.</li>
          <li>Manage your dashboard access and account preferences.</li>
          <li>Process internship and collaboration applications.</li>
          <li>Send notifications about upcoming events, deadlines, and opportunities.</li>
          <li>Improve our platform through analytics and performance monitoring.</li>
          <li>Ensure platform security and prevent fraudulent activity.</li>
        </ul>
        <p>We do not sell your personal information to third parties under any circumstances.</p>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: '4. Data Retention',
    content: (
      <>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy. Specific retention periods include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Active accounts:</strong> Data is retained for the lifetime of your account.</li>
          <li><strong>Inactive accounts:</strong> Accounts inactive for more than 24 months may be archived or deleted.</li>
          <li><strong>Application data:</strong> Internship and collaboration applications are retained for 12 months after the application cycle ends.</li>
          <li><strong>Analytics data:</strong> Aggregated, anonymized usage data may be retained indefinitely for research purposes.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'third-party',
    title: '5. Third-Party Services',
    content: (
      <>
        <p>We may share limited data with trusted third-party service providers who assist us in operating our platform. These include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cloud hosting:</strong> For secure data storage and platform delivery.</li>
          <li><strong>Email services:</strong> For transactional and notification emails.</li>
          <li><strong>Analytics providers:</strong> For understanding platform usage patterns (anonymized data only).</li>
          <li><strong>Payment processors:</strong> For handling financial transactions securely.</li>
        </ul>
        <p>All third-party providers are contractually bound to maintain the confidentiality and security of your data.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: (
      <>
        <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Right to access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
          <li><strong>Right to portability:</strong> Receive your data in a structured, machine-readable format.</li>
          <li><strong>Right to object:</strong> Object to processing of your data for certain purposes.</li>
          <li><strong>Right to withdraw consent:</strong> Withdraw previously given consent at any time.</li>
        </ul>
        <p>To exercise any of these rights, please contact our Data Protection Officer at <span className="text-primary">privacy@anoneurx.com</span>.</p>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    title: "7. Children's Privacy",
    content: (
      <p>Our platform is not intended for children under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete such information promptly. Users between 13 and 18 may use the platform with parental or guardian consent.</p>
    ),
  },
  {
    id: 'international-transfers',
    title: '8. International Data Transfers',
    content: (
      <p>Your data may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, to protect your data during international transfers.</p>
    ),
  },
  {
    id: 'security',
    title: '9. Security',
    content: (
      <p>We implement industry-standard encryption (TLS 1.3), access controls, and security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. We conduct regular security audits and vulnerability assessments to maintain the highest level of data protection.</p>
    ),
  },
  {
    id: 'policy-changes',
    title: '10. Policy Changes',
    content: (
      <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our platform and, where appropriate, sending you a notification. Your continued use of the platform after such changes constitutes your acceptance of the updated policy.</p>
    ),
  },
];

const PrivacyPolicy = () => {
  return <LegalPageLayout title="Privacy Policy" lastUpdated="April 2024" sections={sections} />;
};

export default PrivacyPolicy;
