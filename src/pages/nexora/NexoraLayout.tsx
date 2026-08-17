import { ReactNode, useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import wallpaper from "@/assets/wallpapers/nexora.jpg";

export const NexoraBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${wallpaper})` }}
    />
    <div className="absolute inset-0 bg-black/50" />
  </div>
);

const NexoraLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.title = "Anoneurx | Nexora";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen text-white overflow-hidden flex flex-col">
        <NexoraBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </PageTransition>
  );
};

export default NexoraLayout;
