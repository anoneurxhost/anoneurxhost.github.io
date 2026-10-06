import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

interface AppsLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppsLayout = ({ children, title = "Anoneurx Apps" }: AppsLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <PageTransition>
      <SEO title={title} path={pathname} />
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
