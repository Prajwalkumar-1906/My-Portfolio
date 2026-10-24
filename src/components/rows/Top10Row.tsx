"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { sound } from "@/lib/sound";

export interface Top10Item {
  rank: number;
  title: string;
  category: string;
  description: string;
  badge?: string;
  image?: string;
  onSelect?: () => void;
}

interface Top10RowProps {
  title: string;
  subtitle?: string;
  items: Top10Item[];
}

export function Top10Row({ title, subtitle, items }: Top10RowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    sound.playSelect();
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -500 : 500;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative py-6 sm:py-8 group/top10 select-none">
      {/* Row Header */}
      <div className="px-4 sm:px-6 lg:px-12 mb-4">
        <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-wide text-white group-hover/top10:text-red-500 transition-colors inline-flex items-center gap-2">
          <span>{title}</span>
          <ChevronRight className="w-4 h-4 opacity-0 group-hover/top10:opacity-100 transition-opacity" />
        </h2>
        {subtitle && (
          <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Navigation Arrow Left */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-52 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/top10:opacity-100 hidden sm:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Navigation Arrow Right */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-52 bg-black/70 hover:bg-black/95 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/top10:opacity-100 hidden sm:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Scroller Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center gap-2 sm:gap-4 overflow-x-auto px-4 sm:px-6 lg:px-12 no-scrollbar scroll-smooth py-4"
      >
        {items.map((item) => (
          <div
            key={item.rank}
            onClick={() => {
              if (item.onSelect) {
                sound.playSelect();
                item.onSelect();
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex-none flex items-center group cursor-pointer"
          >
            {/* Massive Metallic / Stroked Number */}
            <div className="top10-number -mr-6 sm:-mr-8 z-10 pointer-events-none group-hover:text-red-600 transition-colors duration-300">
              {item.rank}
            </div>

            {/* Poster Card */}
            <div className="w-[180px] sm:w-[220px] h-[240px] sm:h-[280px] rounded-xl overflow-hidden relative bg-[#181818] border border-white/10 group-hover:border-red-600 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 flex flex-col justify-end p-4">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="220px"
                  className="object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#242424] via-[#141414] to-[#1a1a1a]" />
              )}

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Badge */}
              {item.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Card Text */}
              <div className="relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-500">
                  {item.category}
                </span>
                <h3 className="font-bebas text-xl sm:text-2xl text-white tracking-wide group-hover:text-red-400 transition-colors line-clamp-2 mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/20 hover:bg-[#E50914] px-2.5 py-0.5 rounded transition-colors">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    Read Detail
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
