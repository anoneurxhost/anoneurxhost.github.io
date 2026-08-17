import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

/**
 * Content-only wrapper for role dashboards.
 *
 * The single app shell (background, top bar and sidebar) is provided by
 * `PrivateLayout` for every `/dashboard/*` route. This wrapper only handles
 * the auth gate and renders page content, so every role — Faculty, HR, HOD,
 * CEO, Finance, Content Manager, participants, etc. — shares the exact same
 * sidebar layout.
 */
const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication check
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      navigate("/auth");
    }
  }, [navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {title && <h1 className="sr-only">{title}</h1>}
      {children || <Outlet />}
    </div>
  );
};

export default DashboardLayout;
