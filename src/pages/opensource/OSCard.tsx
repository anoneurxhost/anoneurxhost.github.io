import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface OSCardProps {
  title: string;
  description?: string;
  meta?: ReactNode;
  action?: ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
}

const OSCard = ({ title, description, meta, action, icon: Icon, onClick }: OSCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`group flex h-full flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.15)] dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-indigo-500 dark:hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.3)] ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{title}</h3>
          {Icon && (
            <div className="rounded-xl bg-indigo-50/50 p-2 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors duration-300">
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">{meta}</div>
        {action}
      </div>
    </div>
  );
};

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
    {children}
  </span>
);

export default OSCard;
