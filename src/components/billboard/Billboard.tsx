"use client";

import { useState, useEffect } from "react";
import { Play, Info, Bookmark, Check, Sparkles } from "lucide-react";
import { HeroParallaxPhoto } from "@/components/3d/HeroParallaxPhoto";
import { sound } from "@/lib/sound";
import { CinematicLogo } from "@/components/ui/CinematicLogo";

interface BillboardProps {
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  playText?: string;
  onPlayClick?: () => void;
  onMoreInfoClick?: () => void;
  itemId?: string;
  showPhoto?: boolean;
  extraActions?: React.ReactNode;
}

export function Billboard({
  title,
  subtitle,
  description,
  badges,
  playText = "View Work",
  onPlayClick,
  onMoreInfoClick,
  itemId = "hero-main",
  showPhoto = true,
  extraActions
}: BillboardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
      setIsSaved(list.includes(itemId));
    }
  }, [itemId]);

  const toggleMyList = () => {
    sound.playSelect();
    if (typeof window !== "undefined") {
      let list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
      if (list.includes(itemId)) {
        list = list.filter((id: string) => id !== itemId);
        setIsSaved(false);
      } else {
        list.push(itemId);
        setIsSaved(true);
      }
      localStorage.setItem("pkm_my_list", JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("shortlist-updated"));
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      {/* Background Deep Gradient Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent z-10 pointer-events-none sm:w-2/3" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#E50914]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FF6A00]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Billboard Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 sm:space-y-6">
          {/* Top Series / Identity Tag */}
          <div className="flex items-center gap-2.5">
            <CinematicLogo size="xs" showSubtitle={false} clickable={false} />
            <span className="text-zinc-500 font-mono text-xs tracking-wider uppercase">
              &bull; ORIGINAL PORTFOLIO
            </span>
          </div>

          {/* Bebas Neue Billboard Display Title */}
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wide text-white leading-[0.9] drop-shadow-2xl">
            {title}
          </h1>

          {/* Subtitle with Phoenix Orange Highlight */}
          <div className="text-base sm:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-200">
            {subtitle}
          </div>

          {/* Netflix Maturity & Format Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#181818]/90 border border-white/15 text-zinc-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
            <span className="px-2 py-0.5 border border-zinc-500 text-zinc-400 text-[10px] font-bold rounded">
              4K ULTRA HD
            </span>
            <span className="px-2 py-0.5 border border-zinc-500 text-zinc-400 text-[10px] font-bold rounded">
              5.1
            </span>
          </div>

          {/* Description Paragraph */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-4 sm:line-clamp-none">
            {description}
          </p>

          {/* Netflix CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3">
            {/* Play Button */}
            {onPlayClick && (
              <button
                onClick={() => {
                  sound.playSelect();
                  onPlayClick();
                }}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Play className="w-5 h-5 fill-black text-black" />
                <span>{playText}</span>
              </button>
            )}

            {/* More Info Button */}
            {onMoreInfoClick && (
              <button
                onClick={() => {
                  sound.playSelect();
                  onMoreInfoClick();
                }}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-lg bg-zinc-700/80 hover:bg-zinc-600/80 text-white font-semibold text-sm sm:text-base backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>
            )}

            {/* My List (Shortlist) Button */}
            <button
              onClick={toggleMyList}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg border font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-200 ${
                isSaved
                  ? "bg-[#E50914] text-white border-[#E50914] shadow-lg shadow-[#E50914]/30"
                  : "bg-black/50 text-zinc-300 border-white/20 hover:text-white hover:border-white/40"
              }`}
              title="Add to Recruiter Shortlist"
              aria-label="Add to Recruiter Shortlist"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>In My List</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>My List</span>
                </>
              )}
            </button>

            {extraActions}
          </div>
        </div>

        {/* Right Column: Hero 3D Parallax Photo Centerpiece */}
        {showPhoto && (
          <div className="lg:col-span-5 flex items-center justify-center pt-6 lg:pt-0">
            <HeroParallaxPhoto priority />
          </div>
        )}
      </div>
    </section>
  );
}
