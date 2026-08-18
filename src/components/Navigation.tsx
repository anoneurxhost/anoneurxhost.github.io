import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User, Bell, Search } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import NotificationPanel from "@/components/NotificationPanel";
import logoImg from "@/assets/logo.jpeg";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logout } = useAuth();
  const { setDirection } = useNavigation();
  const { unreadCount } = useNotifications();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClasses = (path: string) =>
    `relative px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(path)
      ? "text-white bg-white/10 shadow-lg shadow-black/20"
      : "text-white/80 hover:text-white hover:bg-white/5"
    }`;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Updated nav items - removed Our Blogs and Our Dev Team, added Portfolio
  const isNexora = location.pathname.startsWith('/nexora');
  const isBlackwall = location.pathname.startsWith('/blackwall');
  const isCloud = location.pathname.startsWith('/cloud');
  const isApps = location.pathname.startsWith('/apps');
  const isBanking = location.pathname.startsWith('/pay');
  const isResearch = /^\/(research|view-in-journal|strategic-kpis|read|collaboration)(\/|$)/.test(location.pathname);
  const isOpensource = location.pathname.startsWith('/opensource');

  const isUniversity = /^\/(university|professors|courses|intern|faculty)/.test(location.pathname);

  const navItems = isNexora ? [
    { name: "Home", path: "/nexora" },
    { name: "About", path: "/nexora/about" },
    { name: "Contact", path: "/contact" },
  ] : isBlackwall ? [
    { name: "Home", path: "/blackwall" },
    { name: "About", path: "/blackwall/about" },
    { name: "Black Wall Server", path: "/blackwall/server" },
    { name: "Support", path: "/blackwall/support" },
  ] : isCloud ? [
    { name: "Home", path: "/cloud" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Connect To Servers", path: "/auth?mode=connect" },
  ] : isApps ? [
    { name: "Home", path: "/apps" },
    { name: "Apps", path: "/apps/browse" },
    { name: "About", path: "/apps/about" },
  ] : isBanking ? [
    { name: "Home", path: "/pay" },
    { name: "About", path: "/pay/about" },
    { name: "Contact", path: "/contact" },
  ] : isOpensource ? [
    { name: "Home", path: "/opensource" },
    { name: "About", path: "/opensource/about" },
    { name: "Contact", path: "/contact" },
    { name: "Projects", path: "/opensource/projects" },
    { name: "Events", path: "/opensource/events" },
    { name: "Sponsors", path: "/opensource/sponsors" },
  ] : isUniversity ? [
    { name: "University", path: "/university" },
    { name: "Professors", path: "/faculty" },
    { name: "Courses", path: "/courses" },
    { name: "Interns", path: "/intern" },
  ] : isResearch ? [
    { name: "Research", path: "/research" },
    { name: "View in Journal", path: "/view-in-journal" },
    { name: "Strategic KPIs", path: "/strategic-kpis" },
    { name: "Collaboration", path: "/collaboration" },
  ] : [
    { name: "Black Wall", path: "/blackwall" },
    { name: "Anoneurx Pay", path: "/pay" },
    { name: "Cloud", path: "/cloud" },
    { name: "University", path: "/university" },
  ];

  const pageOrder = navItems.map(item => item.path);

  const handleNavClick = (targetPath: string) => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const targetIndex = pageOrder.indexOf(targetPath);

    if (targetIndex > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast("Logged out successfully");
    setIsMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    const primaryRole = Array.isArray(user.roles) ? user.roles[0] : 'client';
    switch (primaryRole) {
      case "ceo":
        return "/dashboard";
      case "hr":
        return "/dashboard/hr";
      case "hod":
        return "/dashboard/hod";
      case "employee":
        return "/dashboard/employee";
      case "student":
        return "/dashboard/student";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-xl">
      <div className="container-custom py-4 flex justify-between items-center px-4 lg:px-0">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => handleNavClick("/")}
        >
          <img src={logoImg} alt="Logo" className="h-10 w-10 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${isActive(item.path)
                  ? "text-white shadow-lg"
                  : "text-white/90 hover:text-white hover:shadow-lg"
                } group`}
              onClick={() => handleNavClick(item.path)}
            >
              {item.name}
              {!isActive(item.path) && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Search Bar (Store only) */}
        {isApps && (
          <div className="hidden lg:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search apps..."
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all shadow-inner"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = (e.target as HTMLInputElement).value;
                    window.location.href = `/apps/browse?q=${encodeURIComponent(val)}`;
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Auth Buttons & Notifications */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* Notification Bell */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/20"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-600 border-0">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>

              <Link
                to={getDashboardPath()}
                className="relative group text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-6 h-6 mr-2" />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ) : (
            <>
              {(isNexora || isBlackwall) ? (
                <Link
                  to={isNexora ? "/nexora/download" : "/blackwall/download"}
                  className="relative group text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Download
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>

                </Link>
              ) : (
                <Link
                  to={isApps ? "/apps/login" : isCloud ? "/cloud/login" : "/auth?mode=login"}
                  className="relative group text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Login
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </>
          )}

          {/* Banking Login Button (overwrites generic auth for banking routes) */}
          {isBanking && (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/auth?mode=pay-signup"
                className="relative group text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
              >
                Sign Up
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-white/20"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bg-black/60 backdrop-blur-3xl border-t border-white/10 z-50">
          <nav className="flex flex-col p-4 space-y-3">
            {isApps && (
              <div className="relative mb-2 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-blue-400" />
                <input
                  type="text"
                  placeholder="Search store..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/apps/browse?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`;
                    }
                  }}
                />
              </div>
            )}

            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${navLinkClasses(item.path)} block relative pl-6 group`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-fuchsia-600 to-blue-700 rounded-full transition-all duration-300"></span>
                  )}
                </Link>
              ))}
            </div>

            {user ? (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center space-x-3 text-white/70 px-4 py-2 text-sm font-medium">
                  <User size={18} className="text-blue-400" />
                  <span>{user.name}</span>
                </div>
                <Link
                  to={getDashboardPath()}
                  className="block w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center justify-center border border-white/5 transition-all">
                    <User className="w-4 h-4 mr-2" /> Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full h-11 rounded-lg border-white/10 text-white/90 hover:bg-red-500/10 hover:text-red-400 bg-white/5 backdrop-blur font-semibold transition-all"
                >
                  <LogOut className="mr-2 w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 space-y-3">
                {(isNexora || isBlackwall) ? (
                  <Link to={isNexora ? "/nexora/download" : "/blackwall/download"} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white font-bold shadow-lg shadow-fuchsia-600/20 active:scale-[0.98] transition-all">
                      Download Now
                    </Button>
                  </Link>
                ) : (
                  <Link to={isApps ? "/apps/login" : isCloud ? "/cloud/login" : isBanking ? "/auth?mode=pay-signup" : "/auth"} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-12 rounded-xl bg-white/10 text-white font-bold border border-white/10 active:scale-[0.98] transition-all relative group overflow-hidden">
                      <span className="relative z-10 text-white">Login</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>
      )}

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
};

export default Navigation;
