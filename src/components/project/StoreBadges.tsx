import React from "react";
import { Apple, Disc3, Download, Smartphone } from "lucide-react";
import { ProjectExtra } from "@/data/types";
import playStoreIcon from "@/assets/appicons/playstore.png";

type Props = { extra: ProjectExtra; className?: string };

const base =
  "inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5";

/** Distribution buttons: Play Store for mobile apps, ISO for the OS, installers for desktop. */
const StoreBadges: React.FC<Props> = ({ extra, className = "" }) => {
  const links = extra.storeLinks;
  if (!links) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.playStore && (
        <a
          href={links.playStore}
          target="_blank"
          rel="noreferrer noopener"
          className={`${base} text-slate-900 shadow-lg shadow-black/30`}
        >
          <img src={playStoreIcon} alt="Google Play" className="h-6 w-6" />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">Get it on</span>
            Google Play
          </span>
        </a>
      )}

      {links.fdroid && (
        <a
          href={links.fdroid}
          target="_blank"
          rel="noreferrer noopener"
          className={`${base} border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10`}
        >
          <Smartphone className="h-5 w-5 text-emerald-300" />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Also on</span>
            F-Droid
          </span>
        </a>
      )}

      {links.appStore && (
        <a
          href={links.appStore}
          target="_blank"
          rel="noreferrer noopener"
          className={`${base} border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10`}
        >
          <Apple className="h-5 w-5" />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">Download on</span>
            App Store
          </span>
        </a>
      )}

      {links.iso && (
        <a
          href={links.iso}
          className={`${base} bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg shadow-fuchsia-900/40`}
        >
          <Disc3 className="h-5 w-5" /> Download OS image
        </a>
      )}

      {links.desktop?.map((d) => (
        <a
          key={d.label}
          href={d.url}
          className={`${base} border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10`}
        >
          <Download className="h-4 w-4 text-cyan-300" /> {d.label}
        </a>
      ))}
    </div>
  );
};

export default StoreBadges;
