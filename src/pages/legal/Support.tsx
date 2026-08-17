import React from 'react';
import LegalPageLayout from '@/pages/common/LegalPageLayout';
import { Mail, MessageSquare, Shield, HelpCircle, PhoneCall, Clock, FileText } from 'lucide-react';

const sections = [
  {
    id: 'overview',
    title: '1. Support Overview & Commitment',
    content: (
      <>
        <p>
          At Anoneurx, we are dedicated to providing world-class technical support, customer care, and developer assistance across all our products, including our operating systems, cloud infrastructure, AI models, developer tools, and academic programs.
        </p>
        <p>
          Our support policy outlines our support channels, response time commitments, service level agreements (SLAs), and guidelines for requesting assistance.
        </p>
      </>
    ),
  },
  {
    id: 'channels',
    title: '2. Support Channels & Contact Methods',
    content: (
      <>
        <p>You can reach the Anoneurx Support Team through the following official channels:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Mail className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">General Support</h4>
              <p className="text-xs text-gray-400 mt-1">For account, product, and platform help</p>
              <a href="mailto:support@anoneurx.com" className="text-xs text-cyan-400 hover:underline mt-1 block">
                support@anoneurx.com
              </a>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-white text-sm">Security & Vulnerabilities</h4>
              <p className="text-xs text-gray-400 mt-1">Responsible disclosure and security reports</p>
              <a href="mailto:security@anoneurx.com" className="text-xs text-emerald-400 hover:underline mt-1 block">
                security@anoneurx.com
              </a>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'priority-levels',
    title: '3. Ticket Severity & Priority Levels',
    content: (
      <>
        <p>Support requests are classified into four severity levels to ensure critical issues receive immediate response:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>P1 - Critical (Urgent):</strong> Complete service disruption, critical security breach, or system crash affecting all operations. <em>Initial response target: &lt; 1 hour (24/7).</em>
          </li>
          <li>
            <strong>P2 - High:</strong> Major feature failure or severe performance degradation with no operational workaround. <em>Initial response target: &lt; 4 hours.</em>
          </li>
          <li>
            <strong>P3 - Normal:</strong> Non-critical bug, minor feature malfunction, or general technical issue with an available workaround. <em>Initial response target: &lt; 24 hours.</em>
          </li>
          <li>
            <strong>P4 - Low / Informational:</strong> Feature requests, documentation clarification, or general inquiries. <em>Initial response target: &lt; 48 hours.</em>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'tiers-slas',
    title: '4. Service Level Agreements (SLAs)',
    content: (
      <>
        <p>Response times and support availability depend on your account plan tier:</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs border border-white/10 rounded-lg overflow-hidden">
            <thead className="bg-white/10 text-white font-semibold">
              <tr>
                <th className="p-3">Plan Tier</th>
                <th className="p-3">Support Hours</th>
                <th className="p-3">Primary Channel</th>
                <th className="p-3">Target First Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-gray-300">
              <tr>
                <td className="p-3 font-medium text-white">Community / Free</td>
                <td className="p-3">Mon-Fri (Standard)</td>
                <td className="p-3">Community Forums / Email</td>
                <td className="p-3">Within 48 hours</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">Pro / Developer</td>
                <td className="p-3">Mon-Fri (12x5)</td>
                <td className="p-3">Priority Email Support</td>
                <td className="p-3">Within 12 hours</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">Enterprise / Business</td>
                <td className="p-3">24/7 / 365</td>
                <td className="p-3">Dedicated Slack / Email / Phone</td>
                <td className="p-3">&lt; 1 hour for P1 issues</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'scope-of-support',
    title: '5. Scope of Support',
    content: (
      <>
        <p><strong>What is covered under Anoneurx Support:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Platform bug diagnosis and official product troubleshooting.</li>
          <li>Account access, authentication, and security verification.</li>
          <li>Billing, invoices, subscription management, and payment processing.</li>
          <li>Official documentation, SDK installation, and API integration guidance.</li>
          <li>Cloud cluster, Virtual Machine, and server instance connectivity support.</li>
        </ul>
        <p className="mt-4"><strong>What is out of scope:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Custom third-party code development or debugging beyond SDK scope.</li>
          <li>Modified or unsupported custom kernels and hardware configurations.</li>
          <li>On-premise hardware repairs or non-Anoneurx software maintenance.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security-privacy',
    title: '6. Privacy & Support Access',
    content: (
      <p>
        During a support session, our staff will never ask for your account password. If diagnostic access to your server, environment, or dataset is required, access must be granted explicitly via time-limited access tokens or authorized support grants. All support interactions are recorded for quality assurance and encrypted in compliance with our Privacy Policy.
      </p>
    ),
  },
  {
    id: 'escalation',
    title: '7. Escalations & Resolution Procedure',
    content: (
      <p>
        If your support ticket has passed the target SLA without resolution or requires urgent escalation, you may request escalation by replying directly to your ticket with the word <strong>"ESCALATE"</strong> in the subject line or contacting <span className="text-cyan-400">escalations@anoneurx.com</span> with your reference ticket number.
      </p>
    ),
  },
];

const Support = () => {
  return <LegalPageLayout title="Support Policy" lastUpdated="July 2026" sections={sections} />;
};

export default Support;
