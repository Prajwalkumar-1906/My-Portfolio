"use client";

import React, { useEffect, useState } from "react";
import { Bot, Mic } from "lucide-react";

interface VoiceOrb3DProps {
  audioLevel?: number; // 0 to 1 from Web Audio AnalyserNode
  isListening?: boolean;
  isSpeaking?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VoiceOrb3D({
  audioLevel = 0,
  isListening = false,
  isSpeaking = false,
  size = "md",
  className = ""
}: VoiceOrb3DProps) {
  const [smoothedLevel, setSmoothedLevel] = useState(0);

  // Smooth the audio level to prevent jitter
  useEffect(() => {
    setSmoothedLevel((prev) => prev * 0.4 + audioLevel * 0.6);
  }, [audioLevel]);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const scaleMultiplier = 1 + smoothedLevel * 0.45;
  const glowOpacity = isSpeaking || isListening ? 0.6 + smoothedLevel * 0.4 : 0.25;
  const glowBlur = 8 + smoothedLevel * 20;

  // Colors: Emerald while listening, Vibrant Scarlet/Orange while speaking, Deep Red/Amber when idle
  const coreGlow = isListening
    ? "rgba(16, 185, 129, 0.6)"
    : isSpeaking
    ? "rgba(229, 9, 20, 0.75)"
    : "rgba(229, 9, 20, 0.3)";

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Dynamic Ambient Glow Halo */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-75"
        style={{
          backgroundColor: coreGlow,
          filter: `blur(${glowBlur}px)`,
          opacity: glowOpacity,
          transform: `scale(${scaleMultiplier * 1.3})`
        }}
      />

      {/* Outer 3D Gyro Ring 1 */}
      <div
        className={`absolute inset-0 rounded-full border border-[#E50914]/40 transition-transform duration-100 ${
          isSpeaking ? "animate-spin-slow" : isListening ? "animate-ping opacity-60" : ""
        }`}
        style={{
          transform: `scale(${scaleMultiplier * 1.1}) rotateX(${smoothedLevel * 45}deg)`
        }}
      />

      {/* Outer 3D Gyro Ring 2 (Perpendicular) */}
      <div
        className={`absolute inset-0 rounded-full border border-[#FF6A00]/40 transition-transform duration-100 ${
          isSpeaking ? "animate-reverse-spin" : ""
        }`}
        style={{
          transform: `scale(${scaleMultiplier * 1.05}) rotateY(${smoothedLevel * 50}deg)`
        }}
      />

      {/* Core Glowing Orb Sphere */}
      <div
        className="relative w-full h-full rounded-full p-0.5 shadow-xl flex items-center justify-center transition-transform duration-75"
        style={{
          transform: `scale(${scaleMultiplier})`,
          background: isListening
            ? "linear-gradient(135deg, #10B981, #059669, #047857)"
            : isSpeaking
            ? "linear-gradient(135deg, #E50914, #FF6A00, #F40612)"
            : "linear-gradient(135deg, #E50914, #B20710, #330000)"
        }}
      >
        <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
          {/* Inner Light Ripple */}
          {(isSpeaking || isListening) && (
            <div
              className="absolute inset-0 rounded-full bg-white/20 animate-pulse pointer-events-none"
              style={{
                opacity: smoothedLevel * 0.8
              }}
            />
          )}

          {isListening ? (
            <Mic className="w-4 h-4 text-emerald-400 animate-pulse relative z-10" />
          ) : (
            <Bot
              className={`w-4 h-4 relative z-10 transition-colors ${
                isSpeaking ? "text-[#FF6A00]" : "text-white"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
