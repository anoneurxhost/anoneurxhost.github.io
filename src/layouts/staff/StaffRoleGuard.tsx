import React, { useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import {
  STAFF_CONSOLES,
  resolveStaffRole,
  type StaffRole,
} from "./staff.config";

/**
 * Strict one-role-one-console gate. A signed-in staff account can only reach
 * the console that matches its own role; anything else bounces back to its own
 * home with a clear notice.
 */
export const StaffRoleGuard = ({
  role,
  children,
}: {
  role: StaffRole;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const sessionRole = useMemo(() => resolveStaffRole(), [location.pathname]);
  const hasSession = useMemo(() => {
    try {
      return !!localStorage.getItem("user");
    } catch {
      return false;
    }
  }, []);
  const mismatch = !!sessionRole && sessionRole !== role;

  useEffect(() => {
    if (mismatch) {
      toast(`The ${STAFF_CONSOLES[role].name} is not available for your role`, {
        description: `You are signed in as ${sessionRole?.toUpperCase()}. Redirected to your own console.`,
      });
    }
  }, [mismatch, role, sessionRole]);

  if (!hasSession) {
    return <Navigate to="/auth" replace />;
  }

  if (!sessionRole) {
    // Signed in, but not a staff account — send them to their own dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  if (mismatch) {
    return <Navigate to={STAFF_CONSOLES[sessionRole].home} replace />;
  }

  return <>{children}</>;
};

export default StaffRoleGuard;
