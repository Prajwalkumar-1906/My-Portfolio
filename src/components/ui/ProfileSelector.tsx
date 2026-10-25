"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Compass, Mic, Users, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";

export interface ProfileOption {
  id: string;
  name: string;
  label: string;
  desc: string;
  route: string;
  avatar: string;
  color: string;
  borderColor: string;
  icon: typeof Briefcase;
}

export const PROFILES: ProfileOption[] = [
  {
    id: "recruiter",
    name: "RECRUITER",
    label: "I'm hiring",
    desc: "Speed-run skills, duel-season roles, PlaceWise, Chukta & 1-click resumes.",
    route: "/recruiter",
    avatar: "/assets/webp/avatar_recruiter.webp",
    color: "from-blue-600 to-indigo-800",
    borderColor: "group-hover:border-blue-500",
    icon: Briefcase
  },
  {
    id: "browse",
    name: "JUST BROWSING",
    label: "Explore the show",
    desc: "Cinematic billboard trailer, 3D interactive journey & community stories.",
    route: "/browse",
    avatar: "/assets/webp/avatar_browse.webp",
    color: "from-red-600 to-rose-900",
    borderColor: "group-hover:border-[#E50914]",
    icon: Compass
  },
  {
    id: "sessions",
    name: "BOOK A SESSION",
    label: "Invite me to speak / train",
    desc: "Keynotes, GenAI workshops, career mastery, and tailored quote calculator.",
    route: "/sessions",
    avatar: "/assets/webp/avatar_sessions.webp",
    color: "from-amber-500 to-orange-700",
    borderColor: "group-hover:border-[#FF6A00]",
    icon: Mic
  },
  {
    id: "network",
    name: "NETWORKER",
    label: "Let's connect / collaborate",
    desc: "LinkedIn (8K+), open source, hackathon teams, and instant message.",
    route: "/network",
    avatar: "/assets/webp/avatar_networker.webp",
    color: "from-emerald-500 to-teal-800",
    borderColor: "group-hover:border-emerald-500",
    icon: Users
  }
];

import { CinematicLogo } from "./CinematicLogo";

export function ProfileSelector() {
  const router = useRouter();

  const handleSelect = (profile: ProfileOption) => {
    // Play the iconic Netflix sound when entering a profile section
    sound.playTudumChord(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("pkm_active_profile", profile.id);
    }
    router.push(profile.route);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-between items-center px-4 sm:px-8 py-8 relative overflow-hidden select-none">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header with Cinematic Logo - Fully responsive, zero overlap */}
      <header className="w-full max-w-6xl flex items-center justify-between z-20 pt-2">
        <CinematicLogo size="md" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
          Interactive Streaming Dossier
        </span>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl w-full text-center z-10 my-auto py-6 animate-in fade-in duration-700">
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wider mb-2 text-zinc-100">
          WHO&apos;S WATCHING?
        </h1>
        <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto mb-8 sm:mb-12">
          Select your viewing profile to experience customized projects, achievements, and capabilities.
        </p>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {PROFILES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                onMouseEnter={() => sound.playHover()}
                tabIndex={0}
                role="button"
                aria-label={`Select ${p.name} profile`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelect(p);
                  }
                }}
                className="group flex flex-col items-center cursor-pointer focus:outline-none"
              >
                {/* 3D Tilting Poster Avatar Card with Specific Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-transparent ${p.borderColor} transition-all duration-300 shadow-2xl bg-[#1e1e1e] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]`}
                >
                  <Image
                    src={p.avatar}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 120px, 160px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                  />

                  {/* Gradient Scrim */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-30 group-hover:opacity-50 transition-opacity`}
                  />

                  {/* Category Icon Badge in Bottom Corner */}
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* Profile Title */}
                <div className="mt-4 text-center">
                  <div className="font-bebas text-xl sm:text-2xl tracking-wide text-zinc-300 group-hover:text-white transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs font-semibold text-[#E50914] tracking-wide mt-0.5">
                    {p.label}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-tight text-zinc-400 max-w-[170px] line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Recruiter Fast-Pass */}
        <div className="mt-14 sm:mt-16 flex items-center justify-center gap-4">
          <button
            onClick={() => handleSelect(PROFILES[0])}
            className="flex items-center gap-2 px-6 py-2.5 border border-zinc-600 hover:border-[#E50914] hover:bg-[#E50914]/10 text-zinc-300 hover:text-white uppercase font-bebas text-lg tracking-widest rounded transition-colors"
          >
            <span>Direct Recruiter Fast-Pass</span>
            <ArrowRight className="w-4 h-4 text-[#E50914]" />
          </button>
        </div>
      </div>
    </div>
  );
}
