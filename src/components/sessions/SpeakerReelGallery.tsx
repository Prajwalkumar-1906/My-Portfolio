"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface ReelItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  // Optional video embed (hidden if empty)
  videoUrl?: string;
}

const REEL_ITEMS: ReelItem[] = [
  {
    id: "reel-1",
    title: "Keynote at Podium & Conclave Stage",
    category: "Main Stage Keynote",
    image: "/assets/webp/prajwal_hero.webp",
    caption: "Delivering high-energy address on student engineering and AI architectures.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  },
  {
    id: "reel-2",
    title: "Interactive Stage Presentation",
    category: "Tech Symposium",
    image: "/assets/webp/full_browse.webp",
    caption: "Engaging student audiences during interactive tech and innovation sessions.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  },
  {
    id: "reel-3",
    title: "Sai Krishan Premamrutham Hall",
    category: "Values & Community Service",
    image: "/assets/webp/premamrutham_banner.webp",
    // TODO: confirm location/date caption with Prajwal
    caption: "Grounded in foundational service and education missions.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  },
  {
    id: "reel-4",
    title: "Corporate & Campus Executive Sessions",
    category: "Executive Masterclass",
    image: "/assets/webp/full_sessions.webp",
    caption: "Mentoring engineering cohorts on interview perception and industry transitions.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  },
  {
    id: "reel-5",
    title: "Championship & Community Leadership",
    category: "Team Spirit & Sportsmanship",
    image: "/assets/webp/full_networker.webp",
    caption: "Leadership, resilience, and celebratory community sports moments.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  },
  {
    id: "reel-6",
    title: "Rajarajeswari College Campus Conclave",
    category: "Campus Events",
    image: "/assets/webp/RRCE.webp",
    caption: "Coordinating student clubs, hackathons, and inter-college entrepreneurship summits.",
    // videoUrl: "" // TODO: add YouTube/Vimeo video embed URL when published
  }
];

export function SpeakerReelGallery() {
  const [activeItem, setActiveItem] = useState<ReelItem | null>(null);

  const openLightbox = (item: ReelItem) => {
    sound.playSelect();
    setActiveItem(item);
  };

  const closeLightbox = () => {
    sound.playSelect();
    setActiveItem(null);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-widest">
            Visual Proof of Presence
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            SPEAKER REEL & STAGE GALLERY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Click any gallery tile to inspect full resolution photos with 3D perspective tilt.
          </p>
        </div>
      </div>

      {/* Grid of Reel Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REEL_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item)}
            className="group relative h-64 rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF6A00] transition-all duration-300 cursor-pointer shadow-xl bg-[#181818]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Top Corner Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                {item.category}
              </span>
            </div>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-3 inset-x-3 z-10">
              <h3 className="font-bebas text-xl text-white tracking-wide drop-shadow">
                {item.title}
              </h3>
              <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                {item.caption}
              </p>
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* 3D Tilt Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181818] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-[#E50914] text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video or Image Viewport */}
            <div className="relative w-full h-[60vh] bg-black flex items-center justify-center">
              {activeItem.videoUrl ? (
                <iframe
                  src={activeItem.videoUrl}
                  title={activeItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Caption Strip */}
            <div className="p-6 bg-[#141414] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="font-bebas text-2xl text-white tracking-wide mt-0.5">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {activeItem.caption}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeItem.image}
                  target="_blank"
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <span>Download Full Res</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
