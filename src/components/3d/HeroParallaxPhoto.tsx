"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HeroParallaxPhotoProps {
  className?: string;
  priority?: boolean;
}

const ORBITING_ICONS = [
  { name: "Python", color: "#3776AB", x: -140, y: -90, delay: 0 },
  { name: "Next.js", color: "#FFFFFF", x: 140, y: -70, delay: 0.5 },
  { name: "PyTorch", color: "#EE4C2C", x: 155, y: 70, delay: 1.0 },
  { name: "Docker", color: "#2496ED", x: -150, y: 65, delay: 1.5 },
  { name: "PostgreSQL", color: "#4169E1", x: 0, y: -160, delay: 2.0 },
  { name: "SHAP AI", color: "#FF6A00", x: -120, y: 140, delay: 2.5 }
];

export function HeroParallaxPhoto({ className = "", priority = true }: HeroParallaxPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Framer Motion spring physics for silky 60fps tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);
  const layerTranslateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const layerTranslateY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    // Device orientation for mobile gyroscope tilt
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-to-right (-90 to 90), beta is front-to-back (-180 to 180)
        const x = Math.max(-0.5, Math.min(0.5, e.gamma / 60));
        const y = Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60));
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative perspective-1000 select-none flex items-center justify-center ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isClient ? rotateX : 0,
          rotateY: isClient ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        className="relative w-[300px] h-[400px] sm:w-[360px] sm:h-[480px] md:w-[420px] md:h-[550px] lg:w-[460px] lg:h-[600px] flex items-center justify-center transition-transform duration-75"
      >
        {/* Soft Red & Phoenix Orange Ambient Rim Glow */}
        <motion.div
          style={{
            x: isClient ? glowX : 0,
            y: isClient ? glowY : 0,
            transform: "translateZ(-80px)"
          }}
          className="absolute inset-[-15%] rounded-full bg-gradient-to-tr from-[#E50914]/40 via-[#FF6A00]/30 to-transparent blur-3xl pointer-events-none"
        />

        {/* Orbiting 3D Tech Badges */}
        {isClient &&
          ORBITING_ICONS.map((badge, idx) => (
            <motion.div
              key={badge.name}
              animate={{
                y: [badge.y - 6, badge.y + 6, badge.y - 6],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: 3 + (idx % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: badge.delay
              }}
              style={{
                x: badge.x,
                y: badge.y,
                transform: `translate3d(${badge.x}px, ${badge.y}px, 60px)`
              }}
              className="absolute z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181818]/90 border border-white/15 backdrop-blur-md shadow-xl shadow-black/80"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: badge.color }}
              />
              <span className="text-xs font-semibold text-white tracking-wide">
                {badge.name}
              </span>
            </motion.div>
          ))}

        {/* Base Photo Card (Original Speaker Shot & Stage Backdrop) */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/90 group"
        >
          <Image
            src="/assets/webp/prajwal_hero.webp"
            alt="Prajwalkumar Madiwal Keynote Speaker"
            fill
            priority={priority}
            sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, (max-width: 1024px) 420px, 460px"
            className="object-cover object-[center_35%] filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Cinematic Scrim Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/50 via-transparent to-[#141414]/30" />
          
          {/* Subtle Phoenix Orange Rim Line at top */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent opacity-75" />
        </div>

        {/* Foreground Cutout Layer for 3D Pop / Parallax Depth */}
        <motion.div
          style={{
            x: isClient ? layerTranslateX : 0,
            y: isClient ? layerTranslateY : 0,
            transform: "translateZ(40px)"
          }}
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        >
          <Image
            src="/assets/webp/prajwal_cutout.webp"
            alt="Prajwalkumar Madiwal Cutout"
            fill
            sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, (max-width: 1024px) 420px, 460px"
            className="object-cover object-[center_35%] filter drop-shadow(0 15px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(229,9,20,0.25))"
          />
        </motion.div>

        {/* Bottom Maturity / Speaker Badge */}
        <div
          style={{ transform: "translate3d(0, 0, 70px)" }}
          className="absolute bottom-4 inset-x-4 bg-[#141414]/85 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between text-left"
        >
          <div>
            <div className="text-[11px] uppercase tracking-wider text-red-500 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
              Live Keynote & Research
            </div>
            <div className="font-bebas text-lg tracking-wide text-white">
              Prajwalkumar Madiwal
            </div>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#E50914] text-white text-[11px] font-bold tracking-wider">
            OPEN TO WORK
          </div>
        </div>
      </motion.div>
    </div>
  );
}
