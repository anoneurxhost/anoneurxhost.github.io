import { Link } from "react-router-dom";
import AppsLayout from "./AppsLayout";
import { categories, apps } from "./appsData";

const AppsCategories = () => {
  return (
    <AppsLayout title="Categories · Anoneurx Apps">
      <section className="px-4 pt-16 pb-20">
        <div className="container-responsive">
          <div className="mb-10">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 block">Navigation</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">All Categories</h1>
            <p className="text-xs text-slate-400 mt-2">Explore technical and creative ecosystems.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((c) => {
              const Icon = c.icon;
              const count = apps.filter((a) => a.category === c.name).length;
              return (
                <Link
                  key={c.name}
                  to={`/apps/browse?cat=${encodeURIComponent(c.name)}`}
                  className="group rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 hover:border-white/25 hover:-translate-y-1 transition-all"
                >
                  <div className={`h-11 w-11 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-sm font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{count} apps available</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </AppsLayout>
  );
};

export default AppsCategories;
