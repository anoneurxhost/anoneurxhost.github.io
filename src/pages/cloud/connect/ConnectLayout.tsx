import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import ConnectSidebar from "./ConnectSidebar";
import ConnectTopBar from "./ConnectTopBar";

const ConnectLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Black Wall · Cloud Connect";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050607] text-white flex">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(200_80%_30%/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(220_60%_20%/0.14),transparent_60%)]" />
      </div>

      <ConnectSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <ConnectTopBar />
        <main className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-8"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default ConnectLayout;
