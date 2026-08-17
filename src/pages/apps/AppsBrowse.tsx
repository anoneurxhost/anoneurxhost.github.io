import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import AppsLayout from "./AppsLayout";
import AppCard from "./AppCard";
import { apps, categories } from "./appsData";

const AppsBrowse = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>(params.get("cat") || "All");
  const [priceFilter, setPriceFilter] = useState<"All" | "Free" | "Paid">("All");

  useEffect(() => {
    if (activeCat !== "All") params.set("cat", activeCat); else params.delete("cat");
    setParams(params, { replace: true });
  }, [activeCat]);

  const filtered = useMemo(() => apps.filter((a) => {
    const q = a.name.toLowerCase().includes(query.toLowerCase()) || a.developer.toLowerCase().includes(query.toLowerCase());
    const c = activeCat === "All" || a.category === activeCat;
    const p = priceFilter === "All" || (priceFilter === "Free" ? a.price === "Free" : a.price !== "Free");
    return q && c && p;
  }), [query, activeCat, priceFilter]);

  return (
    <AppsLayout title="Browse Apps · Anoneurx">
      <section className="px-4 pt-16 pb-12">
        <div className="container-responsive">
          <div className="mb-8">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 block animate-fade-in">Marketplace</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Browse the Store</h1>
            <p className="text-xs text-slate-400 mt-2">Discover apps from verified global developers.</p>
          </div>

          <div className="mt-8 grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 h-fit">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <SlidersHorizontal className="h-4 w-4 text-blue-400" /> Filters
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">Category</h4>
                <div className="flex flex-col gap-1">
                  {["All", ...categories.map((c) => c.name)].map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCat(c)}
                      className={`text-left text-xs px-3 py-2 rounded-lg transition ${
                        activeCat === c ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">Price</h4>
                <div className="flex gap-2">
                  {(["All", "Free", "Paid"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriceFilter(p)}
                      className={`text-xs px-3 py-1.5 rounded-lg border ${
                        priceFilter === p ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-transparent text-white" : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >{p}</button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results */}
            <div>
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search apps…"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400/40"
                />
              </div>
              <div className="text-xs text-slate-400 mb-4">{filtered.length} {filtered.length === 1 ? "result" : "results"}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((a) => <AppCard key={a.id} app={a} />)}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-sm text-slate-400">No apps match your filters.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppsLayout>
  );
};

export default AppsBrowse;
