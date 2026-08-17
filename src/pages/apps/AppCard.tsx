import { Star, Download, BadgeCheck, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { AppItem } from "./appsData";

const AppCard = ({ app }: { app: AppItem }) => {
  const Icon = app.icon;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4 hover:border-white/25 hover:bg-white/[0.06] transition-all overflow-hidden"
    >
      <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-100 transition`} />
      <div className="flex items-start gap-3">
        <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-bold text-white truncate leading-none">{app.name}</h3>
            {app.verified && <BadgeCheck className="h-3 w-3 text-blue-400 shrink-0" />}
          </div>
          <p className="text-[10px] text-slate-500 truncate mt-1 leading-none">{app.developer}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{app.rating}</span>
            <span className="text-slate-600">·</span>
            <span>{(app.reviews / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400 line-clamp-2 min-h-[2rem]">{app.desc}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md border ${
            app.price === "Free" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-blue-500/10 text-blue-300 border-blue-500/20"
          }`}>
            {app.price}
          </span>
          {app.trending && (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20 inline-flex items-center gap-1">
              <Flame className="h-2.5 w-2.5" />Trending
            </span>
          )}
          {app.newRelease && (
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 inline-flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />New
            </span>
          )}
        </div>
        <button
          onClick={() => toast.success(`Installing ${app.name}…`)}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 transition"
        >
          <Download className="h-3 w-3" />
          {app.price === "Free" ? "Install" : "Buy"}
        </button>
      </div>
    </motion.div>
  );
};

export default AppCard;
