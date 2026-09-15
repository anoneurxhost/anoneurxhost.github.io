import SectionHeading from "./components/SectionHeading";
import StackDiagram, { StackStep } from "./components/StackDiagram";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Lock, KeyRound, Activity, FileText } from "lucide-react";

const securitySteps: StackStep[] = [
  { id: "identity", title: "Identity", description: "Cryptographic server identity.", icon: KeyRound },
  { id: "auth", title: "Authentication", description: "Only authenticated clients can connect.", icon: ShieldCheck },
  { id: "authorization", title: "Authorization", description: "Capability-based access control.", icon: Activity },
  { id: "session", title: "Encrypted Session", description: "All management traffic is TLS-encrypted.", icon: Lock },
  { id: "audit", title: "Audit", description: "Administrative actions are recorded.", icon: FileText },
];

const ConnectSecurity = () => (
  <div className="flex flex-col">
    <section className="relative pt-20 pb-16 px-4 sm:pt-28 sm:pb-24">
      <div className="container-responsive">
        <SectionHeading
          eyebrow="Security"
          title="Designed around trust, not convenience."
          description="The security model is the architecture, not an add-on. Every layer is intentional and auditable."
        />
        <div className="mt-12">
          <StackDiagram steps={securitySteps} />
        </div>
      </div>
    </section>

    <section className="py-16 px-4 sm:py-20 lg:py-24">
      <div className="container-responsive space-y-12">
        {[
          {
            title: "Encrypted Sessions",
            desc: "All management traffic — terminal input, file transfers, command output — is protected in transit with TLS. There is no plaintext channel between the client and the Agent.",
          },
          {
            title: "Server Identity",
            desc: "Each Agent establishes a cryptographic identity on first provisioning. This identity is verified before any management session can be created, preventing impersonation.",
          },
          {
            title: "Least Privilege",
            desc: "The Agent should not run every operation with maximum privileges. Operations are scoped, and the Agent limits itself to the capabilities granted by the current session.",
          },
          {
            title: "Capability-Based Access",
            desc: "Operations are explicitly authorized. A session that can read logs cannot write files unless specifically granted that capability.",
          },
          {
            title: "Credential Protection",
            desc: "The Agent never stores or transmits plaintext passwords. Authentication uses tokens and cryptographic proofs that are scoped and time-limited.",
          },
          {
            title: "Auditability",
            desc: "Administrative operations can be logged for accountability. Every management action can be traced back to an authenticated session and user.",
          },
          {
            title: "Agent Updates",
            desc: "Agent releases are verified before installation. Only signed updates are accepted, and the verification process is transparent to the administrator.",
          },
        ].map((item) => (
          <div key={item.title} className="flex flex-col gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-start sm:gap-4 dark:border-white/[0.06]">
            <h3 className="shrink-0 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}

        <div className="text-center pt-8">
          <Link
            to="/blacklink"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Back to overview <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default ConnectSecurity;