import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import bgImage from "@/assets/background.jpeg";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  // Particle Canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let running = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) animationFrameId = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const particleCount = Math.min(Math.floor(width / 22), 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59,130,246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduce]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen h-screen w-full flex items-center justify-center overflow-hidden bg-transparent text-white select-none"
      aria-label="Hero Section"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-6 pt-16">
        {/* Subtitle Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs font-medium tracking-widest text-cyan-400 uppercase">
          <span>WELCOME TO</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 font-brand drop-shadow-2xl">
          ANONEURX
        </h1>

        {/* Subtext Tagline */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-light leading-relaxed tracking-wide text-balance">
          Engineering software, artificial intelligence, cloud infrastructure, research and operating systems.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Scroll</span>
        <ChevronDown className="w-4 h-4 text-cyan-400" />
      </button>
    </section>
  );
};

export default Hero;

