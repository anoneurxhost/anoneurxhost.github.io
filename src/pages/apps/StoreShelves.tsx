import { ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ShelfCard = ({ item }: { item: any }) => (
  <Link to="/apps/browse" className="group flex flex-col w-[140px] shrink-0">
    <div className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} p-6 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}>
      <item.icon className="h-12 w-12 text-white drop-shadow-xl" />
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="mt-3 px-1">
      <h3 className="text-xs font-bold text-white truncate leading-tight">{item.name}</h3>
      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
        <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />{item.rating}</span>
        <span className="font-bold text-slate-300 uppercase tracking-widest">{item.price}</span>
      </div>
    </div>
  </Link>
);

const ShelfSection = ({ title, items }: { title: string; items: any[] }) => (
  <section className="px-4 py-10 border-t border-white/5">
    <div className="container-responsive">
      <div className="flex items-center justify-between mb-6">
        <Link to="/apps/browse" className="group flex items-center gap-1.5">
          <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">{title}</h2>
          <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, i) => (
          <ShelfCard key={i} item={item} />
        ))}
      </div>
    </div>
  </section>
);

const CollectionCard = ({ item }: { item: any }) => (
  <div className={`relative rounded-xl overflow-hidden aspect-[2/1] border border-white/10 group cursor-pointer shadow-xl`}>
    <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <h3 className="text-base font-bold text-white tracking-tight leading-tight">{item.title}</h3>
    </div>
  </div>
);

const CollectionsSection = () => {
  const collections = [
    { title: "More places to play with Xbox Play Anywhere", image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=2069&auto=format&fit=crop" },
    { title: "Windows Themes", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" },
    { title: "Racing games", image: "https://images.unsplash.com/photo-1547919307-1ecb10702e6f?q=80&w=2069&auto=format&fit=crop" },
    { title: "Creativity apps", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" }
  ];

  return (
    <section className="px-4 py-10 mb-10 border-t border-white/5">
      <div className="container-responsive">
        <div className="flex items-center justify-between mb-6">
          <div className="group flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-white tracking-tight">Collections</h2>
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((c, i) => (
            <CollectionCard key={i} item={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

import { 
  Linkedin, FileText, Share2, AppWindow, PlayCircle, Apple, MonitorPlay, 
  Tv, Film, Youtube, Disc, Aperture, Command, Layers 
} from "lucide-react";

const StoreShelves = () => {
  const essentialApps = [
    { name: "Microsoft Copilot", icon: Command, color: "from-blue-600 to-indigo-600", rating: 4.8, price: "Free" },
    { name: "LinkedIn", icon: Linkedin, color: "from-sky-600 to-blue-700", rating: 4.2, price: "Free" },
    { name: "Adobe Acrobat Reader", icon: FileText, color: "from-red-600 to-red-800", rating: 4.4, price: "Free" },
    { name: "Threads", icon: Share2, color: "from-slate-800 to-black", rating: 4.6, price: "Free" },
    { name: "BreeZip: RAR & ZIP", icon: Layers, color: "from-blue-500 to-cyan-500", rating: 4.7, price: "Free" },
    { name: "Adobe Photoshop", icon: Aperture, color: "from-blue-800 to-indigo-900", rating: 4.6, price: "Paid" },
    { name: "Dolby Access", icon: Disc, color: "from-purple-600 to-blue-600", rating: 4.8, price: "Free" },
    { name: "Animotica", icon: Film, color: "from-orange-500 to-amber-600", rating: 4.4, price: "Free" },
  ];


  return (
    <>
      <ShelfSection title="Essential apps" items={essentialApps} />
      <CollectionsSection />
    </>
  );
};

export default StoreShelves;
