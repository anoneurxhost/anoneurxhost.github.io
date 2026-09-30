
import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="w-full min-h-screen overflow-x-hidden"
      style={{
        position: 'relative',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
