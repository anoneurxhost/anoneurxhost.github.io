import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { applyStoredOSTheme } from "./OSThemeToggle";
import heroBg from "@/assets/opensource/bg.png";

const OpenSourceLayout = () => {
  const location = useLocation();

  useEffect(() => {
    applyStoredOSTheme();
    document.title = "Anoneurx Open Source";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen transition-colors bg-transparent text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <main className="min-h-[70vh] relative z-10 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OpenSourceLayout;
