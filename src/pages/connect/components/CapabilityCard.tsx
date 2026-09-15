import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CapabilityCard = ({ icon: Icon, title, description }: Props) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/5 hover:border-blue-300 dark:border-white/[0.06] dark:bg-white/[0.02] dark:shadow-none dark:hover:border-blue-500/30 dark:hover:bg-white/[0.04]">
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 ring-1 ring-blue-200/60 dark:border dark:border-blue-500/20 dark:bg-blue-500/10 dark:ring-0">
      <Icon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
    </div>
    <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
  </div>
);

export default CapabilityCard;