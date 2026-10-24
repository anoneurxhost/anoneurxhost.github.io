import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

/**
 * Every lab page renders its own chrome (the 2026 lab design): navigation,
 * footer, canvas and theme. The layout only owns route-level scroll reset.
 */
const LabLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Outlet />;
};

export default LabLayout;
