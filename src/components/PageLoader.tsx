import logoImg from "@/assets/logo.svg";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
      <div className="flex flex-col items-center gap-8 relative z-10">
        <img src={logoImg} alt="Logo" className="w-12 h-12 object-contain" />

        {/* Brand text */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 overflow-hidden font-brand">
            {"ANONEURX".split("").map((letter, i) => (
              <span
                key={i}
                className="text-sm font-bold text-white tracking-[0.25em]"
                style={{
                  fontFamily: "'Anurati', sans-serif",
                  animation: "letterFade 2.5s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes letterFade {
          0%, 100% { opacity: 0.2; transform: scale(0.95); filter: blur(1px); }
          50% { opacity: 1; transform: scale(1.05); filter: blur(0); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
