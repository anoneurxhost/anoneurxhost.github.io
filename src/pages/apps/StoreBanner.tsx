import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const StoreBanner = () => {
  const featured = {
    title: "Microsoft 365",
    desc: "Apps to manage the everyday",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-600/20 to-indigo-900/40"
  };

  const sideTop = {
    title: "Gardenscapes",
    image: "https://images.unsplash.com/photo-1585336139118-89ce735213f0?q=80&w=2070&auto=format&fit=crop",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f3/Gardenscapes_logo.jpeg"
  };

  const smalls = [
    { name: "RAID: Shadow Legends", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Cooking Fever", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" }
  ];

  return (
    <section className="px-4 pt-8 pb-12">
      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Main Large Banner */}
          <div className="lg:col-span-2 relative group rounded-xl overflow-hidden aspect-[16/9] lg:aspect-auto h-full min-h-[400px] border border-white/10 shadow-2xl">
            <img
              src={featured.image}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt={featured.title}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${featured.color} via-transparent to-transparent`} />
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Overlays */}
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">{featured.title}</h1>
                <p className="mt-2 text-sm lg:text-base text-white/80 font-medium">{featured.desc}</p>
                <button className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/90 text-black font-bold text-sm hover:bg-white transition shadow-lg">
                  <Play className="h-3.5 w-3.5 fill-current" /> Get
                </button>
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-black/60 transition">
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-black/60 transition">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white w-4" : "bg-white/40"}`} />
              ))}
            </div>
          </div>

          {/* Side Banners Col */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top Side Item */}
            <div className="relative group rounded-xl overflow-hidden flex-1 min-h-[220px] border border-white/10 shadow-xl">
              <img src={sideTop.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={sideTop.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-bold text-white mb-3">{sideTop.title}</h3>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/90 text-black font-bold text-xs hover:bg-white transition">
                  <Play className="h-3 w-3 fill-current" /> Get
                </button>
              </div>
            </div>

            {/* Bottom Side Grid */}
            <div className="grid grid-cols-2 gap-4">
              {smalls.map((s, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 shadow-lg">
                  <img src={s.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.name} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-[10px] font-bold text-white truncate text-center">{s.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreBanner;
