import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useConnectSession } from "./ConnectSession";

const RequireConnectAuth = ({ children }: { children: ReactNode }) => {
  const { authenticated } = useConnectSession();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/auth?mode=connect" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

export default RequireConnectAuth;
