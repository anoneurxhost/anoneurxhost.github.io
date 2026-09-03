import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Import product wallpapers & screenshots
import cloudImg from "@/assets/wallpapers/cloud.jpg";
import payImg from "@/assets/wallpapers/pay.jpg";
import blackwallImg from "@/assets/blackwall/bg.png";
import blackwallServerImg from "@/assets/blackwall/intro.png";
import appImg from "@/assets/blackwall/screenshot-store.jpg";

export const ProductSlider: React.FC = () => {
  const products = [
    {
      id: "cloud",
      title: "Cloud",
      subtitle: "High-Performance Distributed Cloud & Edge Compute",
      image: cloudImg,
      path: "/cloud",
      tag: "Cloud Infrastructure",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      id: "pay",
      title: "Pay",
      subtitle: "Developer-First Financial Technology Platform",
      image: payImg,
      path: "/pay",
      tag: "Fintech Platform",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      id: "blackwall",
      title: "Black Wall",
      subtitle: "Memory-Safe Zero-Trust Desktop Operating System",
      image: blackwallImg,
      path: "/blackwall",
      tag: "Operating System",
      badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    },
    {
      id: "blackwall-server",
      title: "Black Wall Server",
      subtitle: "Enterprise Mission-Critical Server Kernel & CLI",
      image: blackwallServerImg,
      path: "/blackwall/server",
      tag: "Server OS",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      id: "app",
      title: "Anoneurx APP Marketplace",
      subtitle: "Curated Marketplace for Native Ecosystem Applications",
      image: appImg,
      path: "/apps",
      tag: "App Marketplace",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentIndex];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-transparent text-white border-t border-white/5 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-900/10 via-indigo-900/10 to-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-cyan-400 uppercase"
            >
              <Sparkles className="w-3 h-3" />
              <span>PRODUCTS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white font-brand"
            >
              Explore Products
            </motion.h2>
          </div>
        </div>

        {/* Full Card Slider Container */}
        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-slate-950 shadow-xl aspect-[16/9] max-h-[420px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative w-full h-full flex items-end"
            >
              {/* Full Card Image */}
              <img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Overlay Content */}
              <div className="relative z-10 p-5 sm:p-8 space-y-3 max-w-2xl">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono border backdrop-blur-md ${currentProduct.badgeColor}`}>
                  {currentProduct.tag}
                </span>

                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-brand drop-shadow-md">
                    {currentProduct.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-slate-300 drop-shadow">
                    {currentProduct.subtitle}
                  </p>
                </div>

                <div className="pt-1">
                  <Link
                    to={currentProduct.path}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold text-sm hover:bg-white/20 hover:border-white/40 backdrop-blur-md transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
