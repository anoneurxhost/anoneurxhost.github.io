import { ReactNode, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

interface AppsLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppsLayout = ({ children, title = "Anoneurx Apps" }: AppsLayoutProps) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Anoneurx";
    };
  }, [title]);

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col">
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          {children}
        </motion.main>
      </div>
    </PageTransition>
  );
};

export default AppsLayout;
