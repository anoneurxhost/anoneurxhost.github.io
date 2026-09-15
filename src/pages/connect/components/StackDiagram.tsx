import React from "react";
import type { LucideIcon } from "lucide-react";

export interface StackStep {
  id?: string;
  title: string;
  description?: string;
  icon?: LucideIcon | React.ReactNode;
  muted?: boolean;
}

interface Props {
  steps: StackStep[];
  className?: string;
}

const StackDiagram = ({ steps, className = "" }: Props) => (
  <div className={className} role="img" aria-label="Architecture flow">
    <ul className="flex flex-col items-stretch">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isNode = React.isValidElement(Icon);
        const IconComponent = isNode ? null : (Icon as LucideIcon | undefined);
        return (
          <li key={step.id ?? step.title} className="flex flex-col items-center">
            <div
              className={`w-full rounded-2xl border p-4 transition-all ${
                step.muted
                  ? "border-slate-200 bg-white shadow-sm opacity-70 dark:bg-white/[0.03] dark:border-white/[0.05]"
                  : "border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 dark:bg-white/[0.03] dark:border-white/10 dark:hover:border-blue-500/30 dark:hover:shadow-none"
              }`}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 ring-1 ring-blue-200/60 dark:border dark:border-blue-500/20 dark:bg-blue-500/10 dark:ring-0">
                    {isNode ? Icon : <IconComponent className="h-4.5 w-4.5 text-blue-700 dark:text-blue-400" />}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{step.description}</p>
                  )}
                </div>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="relative h-8 w-px bg-slate-300 dark:bg-white/10" aria-hidden="true">
                <span className="absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-connect-flow motion-reduce:hidden" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

export default StackDiagram;