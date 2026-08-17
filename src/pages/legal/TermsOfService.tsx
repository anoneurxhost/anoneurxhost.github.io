import React from 'react';
import LegalPageLayout from '@/pages/common/LegalPageLayout';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <p>By accessing or using the Anoneurx platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must discontinue use of our services immediately.</p>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content: (
      <>
        <p>To use our platform, you must meet the following criteria:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be at least 13 years of age (users under 18 require parental or guardian consent).</li>
          <li>Provide accurate and complete registration information.</li>
          <li>Not have been previously banned or removed from the platform.</li>
          <li>Comply with all applicable local, national, and international laws.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'user-conduct',
    title: '3. User Conduct',
    content: (
      <>
        <p>Users must use the platform for lawful purposes only. The following activities are strictly prohibited:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Harassment, bullying, or threatening other users.</li>
          <li>Unauthorized data scraping, crawling, or automated access.</li>
          <li>Attempts to circumvent security protocols or access restricted areas.</li>
          <li>Posting misleading, defamatory, or harmful content.</li>
          <li>Impersonating other users or Anoneurx staff.</li>
          <li>Using the platform for commercial solicitation without authorization.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'account-responsibilities',
    title: '4. Account Responsibilities',
    content: (
      <>
        <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep your password secure and not share it with others.</li>
          <li>Notify us immediately of any unauthorized access to your account.</li>
          <li>Accept responsibility for all activities that occur under your account.</li>
          <li>Keep your profile information accurate and up to date.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '5. Intellectual Property',
    content: (
      <p>All content on this platform, including course materials, research summaries, documentation, software, brand elements, and icons, are the property of Anoneurx and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission from Anoneurx.</p>
    ),
  },
  {
    id: 'payment-terms',
    title: '6. Payment Terms',
    content: (
      <>
        <p>For paid services, the following terms apply:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>All fees are quoted in the currency specified at checkout and are non-refundable unless otherwise stated.</li>
          <li>Payment is due at the time of purchase or enrollment.</li>
          <li>We reserve the right to modify pricing with 30 days notice to existing subscribers.</li>
          <li>Failed payments may result in suspension of access to paid features.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'disclaimers',
    title: '7. Disclaimers',
    content: (
      <p>The Anoneurx platform and its content are provided "as is" without warranties of any kind, whether express or implied. We do not guarantee that the platform will be uninterrupted, error-free, or free of harmful components. Educational content is provided for informational purposes and should not be considered professional advice.</p>
    ),
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    content: (
      <p>To the maximum extent permitted by law, Anoneurx shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the platform. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim during the 12 months preceding the claim.</p>
    ),
  },
  {
    id: 'termination',
    title: '9. Termination',
    content: (
      <p>We reserve the right to suspend or terminate access to our services for any user who violates these terms, engages in fraudulent activity, or poses a risk to platform security. Upon termination, your right to access the platform ceases immediately, though certain provisions of these terms will survive termination.</p>
    ),
  },
  {
    id: 'governing-law',
    title: '10. Governing Law',
    content: (
      <p>These Terms of Service are governed by and construed in accordance with applicable international laws. Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the relevant arbitration authority, unless otherwise required by local law.</p>
    ),
  },
  {
    id: 'modifications',
    title: '11. Modifications',
    content: (
      <p>We reserve the right to update or modify these Terms of Service at any time. Changes will be effective upon posting to the platform. Your continued use of the platform after any modifications constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.</p>
    ),
  },
];

const TermsOfService = () => {
  return <LegalPageLayout title="Terms of Service" lastUpdated="April 2024" sections={sections} />;
};

export default TermsOfService;
