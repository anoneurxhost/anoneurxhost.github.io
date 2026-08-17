import { ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon, Star } from "lucide-react";
import { apps } from "./appsData";
import { Link } from "react-router-dom";

const TrendingGrid = ({ title, items }: { title: string; items: any[] }) => (
  <div className="flex-1">
    <div className="flex items-center justify-between mb-6">
      <Link to="/apps/browse" className="group flex items-center gap-1.5">
        <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h2>
        <ChevronRightIcon className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
      </Link>
      <div className="flex gap-1">
        <button className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link 
            key={item.id} 
            to={`/apps/browse?q=${item.name}`}
            className="flex items-start gap-3 group"
          >
            <div className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white truncate leading-tight group-hover:text-blue-300 transition-colors">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{item.rating}</span>
                <span className="truncate">{item.category}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold text-white/50 uppercase tracking-wider">{item.price === 'Free' ? 'Free' : item.price}</div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

const TrendingSection = () => {
  const trendingGames = apps.filter(a => ["Gaming", "Action & adventure", "Racing & flying"].includes(a.category)).slice(0, 6);
  const trendingApps = apps.filter(a => !["Gaming", "Action & adventure", "Racing & flying"].includes(a.category)).slice(0, 6);

  return (
    <section className="px-4 py-12">
      <div className="container-responsive">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <TrendingGrid title="Trending games" items={trendingGames} />
          <TrendingGrid title="Trending apps" items={trendingApps} />
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
