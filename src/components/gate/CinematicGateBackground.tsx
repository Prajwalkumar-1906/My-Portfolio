"use client";

import { useEffect, useRef } from "react";

export function CinematicGateBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Generate floating dust / ember particles
    const particleCount = Math.min(width < 768 ? 35 : 70, 80);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? "229, 9, 20" : "255, 255, 255", // Netflix red or ambient white
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting cinematic particles
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around borders
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.shadowBlur = p.size > 1.5 ? 8 : 0;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Slow animated red light-streaks */}
      <div className="absolute top-1/3 -left-1/4 w-[150vw] h-[250px] bg-gradient-to-r from-transparent via-[#E50914]/15 to-transparent -rotate-12 blur-[100px] animate-pulse duration-[8000ms]" />
      <div className="absolute top-2/3 -right-1/4 w-[130vw] h-[180px] bg-gradient-to-r from-transparent via-[#B20710]/10 to-transparent rotate-6 blur-[120px]" />

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        aria-hidden="true"
      />

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}
