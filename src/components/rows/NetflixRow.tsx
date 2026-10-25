"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { sound } from "@/lib/sound";

export interface RowCardItem {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  image?: string;
  badge?: string;
  tags?: string[];
  githubUrl?: string;
  externalUrl?: string;
  onSelect?: () => void;
  metrics?: string[];
}

interface NetflixRowProps {
  title: string;
  subtitle?: string;
  items: RowCardItem[];
  aspectRatio?: "poster" | "backdrop" | "square";
}

export function NetflixRow({
  title,
  subtitle,
  items,
  aspectRatio = "backdrop"
}: NetflixRowProps) {
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

  const getCardDimensions = () => {
    switch (aspectRatio) {
      case "poster":
        return "w-[170px] sm:w-[210px] h-[255px] sm:h-[315px]";
      case "square":
        return "w-[180px] sm:w-[220px] h-[180px] sm:h-[220px]";
      case "backdrop":
      default:
        return "w-[260px] sm:w-[320px] h-[160px] sm:h-[190px]";
    }
  };

  return (
    <div className="relative py-6 sm:py-8 group/row select-none">
      {/* Row Header */}
      <div className="px-4 sm:px-6 lg:px-12 mb-3 sm:mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-wide text-white group-hover/row:text-red-500 transition-colors inline-flex items-center gap-2">
            <span>{title}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover/row:opacity-100 transition-opacity" />
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Navigation Arrow Left */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-44 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/row:opacity-100 hidden sm:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Navigation Arrow Right */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-44 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover/row:opacity-100 hidden sm:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Horizontal Scroller */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 lg:px-12 no-scrollbar scroll-smooth py-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.onSelect) {
                sound.playSelect();
                item.onSelect();
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex-none ${getCardDimensions()} relative rounded-xl overflow-hidden cursor-pointer bg-[#181818] border border-white/10 group transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl hover:border-red-600/60`}
          >
            {/* Card Background Image (if available) */}
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 260px, 320px"
                className="object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#181818] flex items-center justify-center">
                <div className="font-bebas text-4xl text-zinc-800 tracking-widest select-none">
                  PRAJWAL
                </div>
              </div>
            )}

            {/* Red Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Top Badge */}
            {item.badge && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold tracking-wider uppercase shadow-md">
                  {item.badge}
                </span>
              </div>
            )}

            {/* External Links Shortcuts */}
            <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#E50914] transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {item.externalUrl && (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#E50914] transition-colors"
                  title="Visit Website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Bottom Content Metadata */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 flex flex-col justify-end">
              <h3 className="font-bebas text-lg sm:text-xl tracking-wide text-white group-hover:text-red-400 transition-colors line-clamp-1">
                {item.title}
              </h3>
              
              {item.subtitle && (
                <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              )}

              {/* Tags / Stack */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-[10px] text-zinc-400 self-center">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Hover Quick Action Cue */}
              <div className="mt-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-white/20 hover:bg-[#E50914] px-2.5 py-1 rounded transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                  View Details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
