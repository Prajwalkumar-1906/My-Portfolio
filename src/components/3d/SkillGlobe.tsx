"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { GLOBE_SKILLS, GlobeSkill } from "@/data/skills";
import { sound } from "@/lib/sound";

interface SkillGlobeProps {
  onSelectSkill?: (skillName: string) => void;
  selectedSkill?: string | null;
}

interface ProjectedSkill extends GlobeSkill {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  alpha: number;
}

export function SkillGlobe({ onSelectSkill, selectedSkill }: SkillGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ rx: 0.2, ry: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Distribute skills evenly on a 3D Fibonacci sphere
  const basePoints = useMemo(() => {
    const total = GLOBE_SKILLS.length;
    const radius = 170; // Radius in virtual 3D pixels
    return GLOBE_SKILLS.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        ...item,
        bx: radius * Math.cos(theta) * Math.sin(phi),
        by: radius * Math.sin(theta) * Math.sin(phi),
        bz: radius * Math.cos(phi)
      };
    });
  }, []);

  // Continuous auto-rotation when not dragging
  useEffect(() => {
    let animId: number;
    const tick = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          rx: prev.rx + 0.0015,
          ry: prev.ry + 0.003
        }));
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  // Handle Drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setRotation((prev) => ({
      rx: prev.rx - dy * 0.005,
      ry: prev.ry + dx * 0.005
    }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - lastMouse.x;
    const dy = e.touches[0].clientY - lastMouse.y;
    setRotation((prev) => ({
      rx: prev.rx - dy * 0.006,
      ry: prev.ry + dx * 0.006
    }));
    setLastMouse({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Project 3D points onto 2D screen with perspective
  const projectedSkills: ProjectedSkill[] = useMemo(() => {
    const cosX = Math.cos(rotation.rx);
    const sinX = Math.sin(rotation.rx);
    const cosY = Math.cos(rotation.ry);
    const sinY = Math.sin(rotation.ry);

    const fov = 340; // Field of view distance

    return basePoints
      .map((p) => {
        // Rotate around Y axis
        const x1 = p.bx * cosY + p.bz * sinY;
        const z1 = -p.bx * sinY + p.bz * cosY;

        // Rotate around X axis
        const y2 = p.by * cosX - z1 * sinX;
        const z2 = p.by * sinX + z1 * cosX;

        // Perspective scale
        const scale = fov / (fov + z2);
        const screenX = x1 * scale;
        const screenY = y2 * scale;
        const alpha = Math.max(0.2, (z2 + 180) / 360);

        return {
          ...p,
          x: x1,
          y: y2,
          z: z2,
          screenX,
          screenY,
          scale,
          alpha
        };
      })
      .sort((a, b) => a.z - b.z); // Render back-to-front
  }, [basePoints, rotation]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-2xl bg-[#0f0f0f]/80 border border-white/10 shadow-2xl"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#E50914]/15 via-transparent to-transparent pointer-events-none" />

      {/* Orbit Rings (3D Depth Aesthetics) */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-white/5 pointer-events-none animate-pulse" />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-[#E50914]/10 pointer-events-none rotate-45" />

      {/* Center Anchor Core */}
      <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-[#E50914] to-[#FF6A00] blur-xl opacity-40 pointer-events-none" />

      {/* 3D Rendered Tags */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-auto">
        {projectedSkills.map((skill) => {
          const isSelected = selectedSkill === skill.name;
          const isHovered = hoveredSkill === skill.name;

          return (
            <button
              key={skill.name}
              onClick={(e) => {
                e.stopPropagation();
                sound.playSelect();
                onSelectSkill?.(skill.name);
              }}
              onMouseEnter={() => {
                setHoveredSkill(skill.name);
                sound.playHover();
              }}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                transform: `translate3d(${skill.screenX}px, ${skill.screenY}px, 0) scale(${
                  skill.scale * (isHovered ? 1.25 : 1)
                })`,
                opacity: isHovered || isSelected ? 1 : skill.alpha,
                zIndex: Math.round((skill.z + 200) * 10)
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-150 backdrop-blur-md shadow-lg border ${
                isSelected
                  ? "bg-[#E50914] text-white border-white shadow-[#E50914]/50"
                  : isHovered
                  ? "bg-white text-black border-[#E50914] shadow-white/30"
                  : skill.z > 0
                  ? "bg-[#1f1f1f]/90 text-white border-white/20"
                  : "bg-[#141414]/70 text-zinc-400 border-white/5"
              }`}
            >
              {skill.name}
            </button>
          );
        })}
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
        <span className="text-[11px] text-zinc-400 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
          Click skill to filter &bull; Drag to rotate 3D sphere
        </span>
      </div>
    </div>
  );
}
