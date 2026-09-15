import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  code: string;
  label?: string;
  className?: string;
}

const CodeBlock = ({ code, label, className = "" }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 dark:border-white/10 dark:bg-[#07080a] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-700 px-4 py-2 dark:border-white/[0.06]">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        {label && (
          <span className="text-[10px] uppercase tracking-widest text-slate-400">{label}</span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Command copied" : "Copy command to clipboard"}
          className="inline-flex h-7 w-7 touch-target items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <pre className="max-w-full overflow-x-auto px-4 py-4 text-left">
        <code className="font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
          <span className="select-none text-slate-500">$&nbsp;</span>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;