"use client";

import { Play, Sparkles, Clock, AlertCircle } from "lucide-react";
import { sound } from "@/lib/sound";

interface ContinueWatchingProps {
  onMoreInfo?: () => void;
}

export function ContinueWatchingRow({ onMoreInfo }: ContinueWatchingProps) {
  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-12 select-none">
      <div className="mb-4">
        <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-wide text-white flex items-center gap-2">
          <span>Continue Watching for Prajwal</span>
          <span className="text-xs font-mono font-normal text-red-500 uppercase px-2 py-0.5 rounded bg-red-950/50 border border-red-800/40">
            Active Sprint
          </span>
        </h2>
        <p className="text-xs text-zinc-400">
          Pick up right where engineering innovation is currently brewing.
        </p>
      </div>

      {/* Continue Watching Feature Card */}
      <div
        onClick={() => {
          sound.playSelect();
          onMoreInfo?.();
        }}
        onMouseEnter={() => sound.playHover()}
        className="relative max-w-xl rounded-2xl overflow-hidden bg-[#181818] border border-white/10 hover:border-red-600/70 p-5 sm:p-6 group cursor-pointer transition-all duration-300 hover:shadow-[0_15px_30px_rgba(229,9,20,0.25)] hover:scale-[1.02]"
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E50914]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider">
                Coming Soon
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                S1 : E5 &bull; In Active Development
              </span>
            </div>

            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-2 group-hover:text-red-400 transition-colors">
              AI Interview Coach with Real-Time Feedback
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
              Multimodal mock interview simulator evaluating speech pacing, keyword attributions, and algorithmic problem-solving in live session recordings.
            </p>
          </div>

          <div className="flex-none p-3.5 rounded-full bg-white/10 group-hover:bg-[#E50914] text-white transition-colors self-center shadow-lg">
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              72% Complete &bull; MVP Alpha Stage
            </span>
            <span className="text-red-400 font-bold font-mono">72%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E50914] via-[#FF6A00] to-amber-400 rounded-full"
              style={{ width: "72%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
