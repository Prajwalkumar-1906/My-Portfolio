"use client";

import React from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";

interface CinematicLogoProps {
  size?: "xs" | "sm" | "md" | "lg";
  showSubtitle?: boolean;
  clickable?: boolean;
  className?: string;
}

export function CinematicLogo({
  size = "md",
  showSubtitle = true,
  clickable = true,
  className = ""
}: CinematicLogoProps) {
  // Size presets
  const sizeConfig = {
    xs: {
      emblem: "w-5 h-6",
      text: "text-lg",
      sub: "text-[7px] tracking-[0.2em]",
      gap: "gap-2"
    },
    sm: {
      emblem: "w-6 h-7 sm:w-7 sm:h-8",
      text: "text-xl sm:text-2xl",
      sub: "text-[8px] tracking-[0.25em]",
      gap: "gap-2.5"
    },
    md: {
      emblem: "w-8 h-9 sm:w-9 sm:h-10",
      text: "text-2xl sm:text-3xl",
      sub: "text-[9px] tracking-[0.3em]",
      gap: "gap-3"
    },
    lg: {
      emblem: "w-10 h-12 sm:w-12 sm:h-14",
      text: "text-3xl sm:text-4xl md:text-5xl",
      sub: "text-[10px] sm:text-xs tracking-[0.35em]",
      gap: "gap-3.5"
    }
  };

  const cfg = sizeConfig[size];

  const content = (
    <div
      className={`inline-flex items-center ${cfg.gap} select-none group focus:outline-none flex-shrink-0 ${className}`}
      onClick={() => {
        if (clickable) sound.playSelect();
      }}
    >
      {/* Iconic 3D Ribbon "P" Emblem */}
      <div className={`relative ${cfg.emblem} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Glow halo */}
        <div className="absolute inset-0 bg-[#E50914]/40 blur-md rounded-sm pointer-events-none group-hover:bg-[#E50914]/65 transition-colors" />

        <svg
          viewBox="0 0 64 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(229,9,20,0.7)]"
        >
          <defs>
            {/* Stem Gradient */}
            <linearGradient id="pStem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2a35" />
              <stop offset="45%" stopColor="#e50914" />
              <stop offset="100%" stopColor="#8a040b" />
            </linearGradient>

            {/* Loop Front Ribbon */}
            <linearGradient id="pLoop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#ff3843" />
              <stop offset="70%" stopColor="#e50914" />
              <stop offset="100%" stopColor="#b20710" />
            </linearGradient>

            {/* Fold Ambient Shadow */}
            <linearGradient id="pShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#450003" />
              <stop offset="100%" stopColor="#1a0001" />
            </linearGradient>
          </defs>

          {/* Left Vertical Ribbon Pillar */}
          <path
            d="M8 4 C8 2.5 9.5 1.5 11 2 L22 5 C23 5.5 24 6.5 24 8 V70 C24 71.5 22.5 72.5 21 72 L10 69 C9 68.5 8 67.5 8 66 Z"
            fill="url(#pStem)"
          />

          {/* Inner Fold Shadow for 3D Ribbon Overlap */}
          <path
            d="M22 6 L38 6 C48 6 56 12 56 24 C56 34 48 42 38 42 L22 42 Z"
            fill="url(#pShadow)"
          />

          {/* Upper Sweeping Ribbon Loop with 3D Bevel */}
          <path
            d="M20 4 C20 4 36 3 44 8 C52 13 56 20 56 26 C56 34 50 42 40 44 C32 45 22 45 20 45 Z"
            fill="url(#pLoop)"
          />

          {/* Negative Cutout Hole for 'P' */}
          <path
            d="M24 16 C24 14 30 14 36 15 C42 16 44 20 44 26 C44 32 40 34 35 34 C30 34 24 34 24 34 Z"
            fill="#121212"
          />

          {/* Specular Highlight Sheen */}
          <path
            d="M10 4 L13 5 L13 67 L10 66 Z"
            fill="#ffffff"
            fillOpacity="0.35"
          />
        </svg>
      </div>

      {/* Cinematic Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-bebas ${cfg.text} tracking-[0.14em] text-white transition-all duration-300 drop-shadow-[0_2px_12px_rgba(229,9,20,0.5)]`}
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #FF4D58 45%, #E50914 85%, #9E040C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          PRAJWAL
        </span>
        {showSubtitle && (
          <span className={`font-mono ${cfg.sub} uppercase text-zinc-400 font-semibold mt-0.5 group-hover:text-zinc-200 transition-colors`}>
            ORIGINAL
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" aria-label="Prajwal Portfolio Home">
        {content}
      </Link>
    );
  }

  return content;
}
