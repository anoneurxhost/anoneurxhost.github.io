import { ReactNode, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import images from "@/constants/images";

export const BlackwallBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${images.blackwall})` }}
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>
);

const BlackwallLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.title = "Anoneurx | Black Wall";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen text-white overflow-hidden flex flex-col">
        <BlackwallBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlackwallLayout;
