import React from "react";
import { motion } from "framer-motion";
import { ProgramHeader, type ProgramHeaderProps } from "./ProgramHeader";

export interface ProgramLayoutProps extends ProgramHeaderProps {
  children: React.ReactNode;
}

export const ProgramLayout = ({
  module,
  badge,
  badges,
  children,
}: ProgramLayoutProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ProgramHeader module={module} badge={badge} badges={badges} />
      <div className="mt-6">{children}</div>
    </motion.div>
  );
};
