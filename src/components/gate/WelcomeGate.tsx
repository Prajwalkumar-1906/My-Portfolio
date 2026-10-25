"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Volume2, VolumeX, ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { sound } from "@/lib/sound";
import { PROFILE } from "@/data/profile";
import { CinematicGateBackground } from "./CinematicGateBackground";
import { CinematicLogo } from "@/components/ui/CinematicLogo";

interface WelcomeGateProps {
  onEnter: (soundEnabled: boolean) => void;
  onSkipToRecruiter: () => void;
}

const ROLES = [
  "AI/ML & Full-Stack Engineer",
  "Data & Business Analyst",
  "Public Speaker & Thinker",
  "Business Developer"
];

export function WelcomeGate({ onEnter, onSkipToRecruiter }: WelcomeGateProps) {
  const [greeting, setGreeting] = useState<string>("Welcome");
  const [roleIndex, setRoleIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(15);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const enterBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleEnter = useCallback(() => {
    localStorage.setItem("pkm_visited_before", "true");
    sound.setEnabled(soundActive);
    // Always trigger the iconic Netflix welcome sound on user gesture enter
    sound.playTudumChord(true);
    onEnter(soundActive);
  }, [soundActive, onEnter]);

  useEffect(() => {
    // 1. Time-aware greeting & Returning visitor check
    const visited = localStorage.getItem("pkm_visited_before");
    if (visited === "true") {
      setGreeting("Welcome back,");
    } else {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 12) {
        setGreeting("Good morning,");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon,");
      } else {
        setGreeting("Good evening,");
      }
    }

    // 2. Subtitle Typewriter rotation
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);

    // 3. Asset preloading with max 3s timeout
    let progressVal = 15;
    const progressInterval = setInterval(() => {
      progressVal = Math.min(progressVal + Math.floor(Math.random() * 25 + 15), 95);
      setProgress(progressVal);
    }, 200);

    const assetUrls = [
      "/assets/webp/prajwal_cutout.webp",
      "/assets/webp/prajwal_hero.webp",
      "/assets/webp/avatar_recruiter.webp",
      "/assets/webp/avatar_browse.webp",
      "/assets/webp/avatar_sessions.webp",
      "/assets/webp/avatar_networker.webp"
    ];

    let loadedCount = 0;
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= assetUrls.length) {
          finishLoading();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= assetUrls.length) {
          finishLoading();
        }
      };
    };

    assetUrls.forEach(preloadImage);

    const finishLoading = () => {
      clearInterval(progressInterval);
      setProgress(100);
      setAssetsLoaded(true);
    };

    // Guarantee ready within 2.5 seconds regardless of network
    const maxTimeout = setTimeout(finishLoading, 2500);

    return () => {
      clearInterval(roleTimer);
      clearInterval(progressInterval);
      clearTimeout(maxTimeout);
    };
  }, []);

  // Keyboard navigation: Enter or Space triggers entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && assetsLoaded) {
        // Prevent default space scrolling
        if (e.key === " ") e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [assetsLoaded, handleEnter]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.setEnabled(next);
    if (next) {
      sound.playTudumChord(true);
    }
  };

  const trackOutbound = (platform: string) => {
    if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, opts?: object) => void }).plausible) {
      (window as unknown as { plausible: (event: string, opts?: object) => void }).plausible("Outbound Social Click", { props: { platform } });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden select-none"
    >
      {/* Background Ambience & Floating 3D Particles */}
      <CinematicGateBackground />

      {/* Thin Red Loading Bar at the very top */}
      <div className="fixed top-0 inset-x-0 h-1 bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#B20710] via-[#E50914] to-rose-400"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>

      {/* Top Bar: Cinematic Logo, Sound Toggle, and Skip link */}
      <header className="relative z-20 w-full max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CinematicLogo size="sm" clickable={false} />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Open to Work
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundActive ? "Mute interactive audio" : "Enable interactive audio"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white backdrop-blur-md transition-all"
          >
            {soundActive ? (
              <>
                <Volume2 className="w-4 h-4 text-[#E50914]" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-400" />
                <span className="hidden sm:inline">Sound OFF</span>
              </>
            )}
          </button>

          {/* Skip direct link */}
          <button
            onClick={onSkipToRecruiter}
            className="text-xs font-medium text-zinc-400 hover:text-white tracking-wide transition-colors py-1.5 px-2 underline-offset-4 hover:underline"
          >
            Skip to Recruiter
          </button>
        </div>
      </header>

      {/* Center Cinematic Hero Gate Card */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center my-auto max-w-3xl w-full py-2 sm:py-4">
        {/* Floating Portrait with 3D Parallax & Red Rim Glow */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative mb-4 sm:mb-6 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow Halo */}
          <div className="absolute inset-0 -inset-x-8 rounded-full bg-[#E50914]/25 blur-3xl pointer-events-none animate-pulse" />

          {/* Portrait Container with Perfect Framing & Size */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-b from-[#E50914] via-[#831010] to-zinc-900 shadow-[0_0_50px_rgba(229,9,20,0.4)]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-950">
              <Image
                src="/assets/webp/gate_portrait.webp"
                alt="Prajwalkumar Madiwal - Keynote Speaker & AI/ML Engineer"
                fill
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                className="object-cover object-center"
              />
            </div>

            {/* Glowing Status Dot */}
            <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-black/80 border border-white/20 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
            </div>
          </div>
        </motion.div>

        {/* Time-Aware Greeting */}
        <div className="text-zinc-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-1 flex items-center justify-center gap-2">
          <span>{greeting}</span>
          <span className="text-zinc-600">•</span>
          <span>Welcome to the Experience</span>
        </div>

        {/* Main Name Heading */}
        <h1 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wider text-zinc-100 leading-none mb-3 drop-shadow-lg">
          PRAJWALKUMAR MADIWAL
        </h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="h-7 sm:h-8 flex items-center justify-center mb-6">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-sm sm:text-lg md:text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-rose-200 to-zinc-400"
          >
            {ROLES[roleIndex]}
          </motion.div>
        </div>

        {/* Crawlable Bio Paragraph for Search Engines & Screen Readers */}
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
          Final-Year CSE student at Rajarajeswari College of Engineering, Bengaluru and AI Intern at ABB.
          Specialized in Explainable AI (SHAP), scalable full-stack architectures, data-driven business analytics,
          and high-impact technical masterclasses.
        </p>

        {/* Primary Glowing Action: ENTER Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            ref={enterBtnRef}
            disabled={!assetsLoaded}
            onClick={handleEnter}
            tabIndex={0}
            className={`group relative flex items-center justify-center gap-3 w-full sm:w-64 px-8 py-3.5 rounded-md font-bebas text-2xl tracking-widest uppercase transition-all duration-300 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
              assetsLoaded
                ? "bg-[#E50914] hover:bg-[#b20710] text-white shadow-[0_0_35px_rgba(229,9,20,0.65)] hover:shadow-[0_0_50px_rgba(229,9,20,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-zinc-800 text-zinc-500 cursor-wait border border-zinc-700"
            }`}
          >
            {assetsLoaded ? (
              <>
                <span>ENTER</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </>
            ) : (
              <span className="text-base tracking-wider font-inter font-medium text-zinc-400">
                Loading Assets... {progress}%
              </span>
            )}
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="mt-3 text-[11px] text-zinc-400 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">Space</kbd> to launch
        </div>
      </main>

      {/* Footer Socials & Deep Links */}
      <footer className="relative z-20 w-full max-w-6xl pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span>&copy; 2026 Prajwalkumar Madiwal.</span>
          <span className="hidden md:inline">• Bengaluru, India</span>
        </div>

        {/* Social Cluster with Hover Animations & Click Tracking */}
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound("LinkedIn")}
            aria-label="LinkedIn Profile (8K+ Followers)"
            className="p-2 rounded-full bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/5 hover:border-[#0077b5]/40 text-zinc-400 transition-all hover:scale-110"
          >
            <BrandIcons.Linkedin className="w-4 h-4" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound("GitHub")}
            aria-label="GitHub Profile"
            className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-white border border-white/5 hover:border-white/30 text-zinc-400 transition-all hover:scale-110"
          >
            <BrandIcons.Github className="w-4 h-4" />
          </a>
          <a
            href={PROFILE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound("Instagram")}
            aria-label="Instagram Profile (@foreverprajwalkumar)"
            className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 border border-white/5 hover:border-pink-500/40 text-zinc-400 transition-all hover:scale-110"
          >
            <BrandIcons.Instagram className="w-4 h-4" />
          </a>
          <a
            href={PROFILE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound("X Twitter")}
            aria-label="X Twitter Profile (@prajwalkumar_19)"
            className="p-2 rounded-full bg-white/5 hover:bg-zinc-200/20 hover:text-zinc-200 border border-white/5 hover:border-zinc-400/40 text-zinc-400 transition-all hover:scale-110"
          >
            <BrandIcons.XIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            onClick={() => trackOutbound("Email")}
            aria-label="Send direct email to Prajwalkumar"
            className="p-2 rounded-full bg-white/5 hover:bg-[#E50914]/20 hover:text-[#E50914] border border-white/5 hover:border-[#E50914]/40 text-zinc-400 transition-all hover:scale-110"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </footer>

      {/* NoScript Fallback for crawlers and JS-disabled browsers */}
      <noscript>
        <div className="fixed inset-0 z-50 bg-[#141414] text-white p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-4">Prajwalkumar Madiwal</h1>
          <p className="text-base text-zinc-300 max-w-xl mb-6">
            AI/ML & Full-Stack Engineer | Data & Business Analyst | Public Speaker.
            Student at RRCE Bengaluru & AI Intern at ABB.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/recruiter" className="px-4 py-2 bg-red-600 rounded text-white font-bold">Recruiter View</a>
            <a href="/browse" className="px-4 py-2 bg-zinc-800 rounded text-white">Browse Experience</a>
            <a href="/sessions" className="px-4 py-2 bg-zinc-800 rounded text-white">Book a Session</a>
            <a href="/network" className="px-4 py-2 bg-zinc-800 rounded text-white">Network & Connect</a>
            <a href="/contact" className="px-4 py-2 bg-zinc-800 rounded text-white">Contact Direct</a>
          </div>
        </div>
      </noscript>
    </div>
  );
}
