import React from "react";
import { Navigate } from "react-router-dom";
import { STAFF_CONSOLES, resolveStaffRole } from "./staff.config";

/**
 * Legacy flat `/dashboard/<page>` links used to be shared across staff roles.
 * They now resolve to the same page inside the signed-in role's own console.
 */
export const StaffHomeRedirect = ({ to }: { to?: string }) => {
  const role = resolveStaffRole();
  if (!role) return <Navigate to="/dashboard" replace />;
  const home = STAFF_CONSOLES[role].home;
  return <Navigate to={to ? `${home}/${to}` : home} replace />;
};

export default StaffHomeRedirect;
