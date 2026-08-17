
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/contexts/NavigationContext';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const { direction } = useNavigation();
  
  // Slide transition only on main marketing pages; others fade in (avoids off-screen blank state).
  const pageOrder = ['/', '/about', '/projects', '/internships', '/contact'];
  const useSlide = pageOrder.includes(location.pathname);

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1.05,
    }),
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const variants = useSlide ? slideVariants : fadeVariants;

  return (
    <motion.div
      key={location.pathname}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth sliding
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
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
