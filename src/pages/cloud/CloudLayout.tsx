import { ReactNode, useEffect } from "react";
import PageTransition from "@/components/PageTransition";

const CloudLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    document.title = "Anoneurx Cloud";
    return () => {
      document.title = "Anoneurx";
    };
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen text-white flex flex-col">
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </div>
    </PageTransition>
  );
};

export default CloudLayout;
