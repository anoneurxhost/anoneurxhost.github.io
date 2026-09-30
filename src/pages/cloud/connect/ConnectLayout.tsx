import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import ConnectSidebar from "./ConnectSidebar";
import ConnectTopBar from "./ConnectTopBar";
import { useSystemTheme } from "./useSystemTheme";

const ConnectLayout = () => {
  const location = useLocation();

  // Flip Tailwind's `.dark` variant to match the OS (tokens switch on their own).
  useSystemTheme();

  useEffect(() => {
    document.title = "ANONEURX | Black Wall Cloud Connect";
    return () => {
      document.title = "ANONEURX |";
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--cc-bg)] text-[var(--cc-text)] flex selection:bg-cyan-500/30 selection:text-cyan-950 dark:selection:text-cyan-50">
      <ConnectSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <ConnectTopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-16"
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