import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  children: ReactNode;
}

/** Shared page shell for /cloud/connect/* subpages. */
const ConnectSection = ({ title, subtitle, icon: Icon, actions, children }: Props) => (
  <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-cyan-300" />}
          <div className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">Cloud Connect</div>
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
    {children}
  </div>
);

export default ConnectSection;
