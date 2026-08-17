import React from 'react';
import LegalPageLayout from '@/pages/common/LegalPageLayout';

const sections = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies?',
    content: (
      <p>Cookies are small text files stored on your device when you visit a website. They help websites function correctly, remember your preferences, and provide a better user experience. Cookies may be set by the site you are visiting ("first-party cookies") or by third-party services operating on that site.</p>
    ),
  },
  {
    id: 'cookies-we-use',
    title: '2. Cookies We Use',
    content: (
      <>
        <p>We use the following categories of cookies on the Anoneurx platform:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for core functionality such as login, session management, and dashboard security. These cannot be disabled.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform, including page views, session duration, and feature usage.</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and choices, such as theme preferences (e.g., dark mode), language, and layout options.</li>
          <li><strong>Performance Cookies:</strong> Monitor platform performance and help us identify and resolve technical issues.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookie-duration',
    title: '3. Cookie Duration',
    content: (
      <>
        <p>Cookies on our platform have varying durations:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Session cookies:</strong> Deleted automatically when you close your browser.</li>
          <li><strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 12 months) or until you manually delete them.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookie-list',
    title: '4. Cookie List',
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 pr-4 font-semibold text-white">Cookie Name</th>
              <th className="text-left py-3 pr-4 font-semibold text-white">Purpose</th>
              <th className="text-left py-3 font-semibold text-white">Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs">_session_id</td>
              <td className="py-3 pr-4">Authentication & session management</td>
              <td className="py-3">Session</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs">_theme_pref</td>
              <td className="py-3 pr-4">Stores theme preference (dark/light)</td>
              <td className="py-3">12 months</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs">_analytics_id</td>
              <td className="py-3 pr-4">Anonymous analytics tracking</td>
              <td className="py-3">6 months</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs">_csrf_token</td>
              <td className="py-3 pr-4">Security: prevents cross-site request forgery</td>
              <td className="py-3">Session</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-3 pr-4 font-mono text-xs">_consent</td>
              <td className="py-3 pr-4">Records your cookie consent preference</td>
              <td className="py-3">12 months</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'third-party-cookies',
    title: '5. Third-Party Cookies',
    content: (
      <p>Some cookies may be placed by third-party services integrated into our platform, such as analytics providers and embedded content. These third parties have their own privacy and cookie policies, and we encourage you to review them. We do not control or have access to third-party cookies.</p>
    ),
  },
  {
    id: 'cookie-consent',
    title: '6. Cookie Consent',
    content: (
      <p>When you first visit our platform, you will be presented with a cookie consent banner allowing you to accept or customize your cookie preferences. Essential cookies are always active as they are necessary for the platform to function. You can modify your consent preferences at any time through your account settings.</p>
    ),
  },
  {
    id: 'how-to-opt-out',
    title: '7. How to Opt Out',
    content: (
      <>
        <p>You can manage or delete cookies through your browser settings. Here's how to adjust cookie settings in common browsers:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
        </ul>
        <p>Please note that disabling certain cookies may affect the functionality of the Anoneurx platform and limit your ability to use certain features.</p>
      </>
    ),
  },
];

const Cookies = () => {
  return <LegalPageLayout title="Cookie Policy" lastUpdated="April 2024" sections={sections} />;
};

export default Cookies;
