"use client";

import { PROFILE } from "@/data/profile";
import { Award, TrendingUp, Users, BookOpen, Target, Sparkles } from "lucide-react";

export function ImpactMetricsGrid() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
            Verified Milestones
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            MEASURED IMPACT & TRACK RECORD
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Real metrics documented across engineering execution, student mentorship, and business development. Zero inflated figures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {PROFILE.stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="group p-5 rounded-xl bg-[#181818] border border-white/10 hover:border-[#E50914]/50 transition-all duration-300 relative overflow-hidden shadow-lg"
          >
            {/* Number highlight */}
            <div className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-[#E50914] group-hover:text-white transition-colors tracking-wide leading-none">
              {stat.value}
            </div>

            <div className="font-semibold text-xs sm:text-sm text-zinc-200 mt-2">
              {stat.label}
            </div>

            <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 leading-snug">
              {stat.description}
            </p>

            {/* Subtle corner index */}
            <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-600">
              #{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
