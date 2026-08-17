import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { Outlet } from "react-router-dom";
import wallpaper from "@/assets/wallpapers/pay.jpg";

export const BankingBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${wallpaper})` }}
    />
    <div className="absolute inset-0 bg-black/55" />
  </div>
);

const BankingLayout = () => {
  useEffect(() => {
    document.title = "Anoneurx | Pay";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen text-white overflow-hidden flex flex-col">
        <BankingBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default BankingLayout;

