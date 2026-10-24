"use client";

import Image from "next/image";
import { Heart, Sparkles, ExternalLink, Calendar, MapPin } from "lucide-react";
import { sound } from "@/lib/sound";

export function ValuesAndServiceBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
              <Heart className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
              Foundational Grounding
            </span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide">
            BEYOND THE CODE: VALUES & SERVICE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
            Technology is most powerful when anchored in empathy, selfless service, and character. Rooted in values from Sathya Sai Grama, One World One Family, and Annapurna Trust.
          </p>
        </div>
      </div>

      {/* Cinematic Wide Banner Card */}
      <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#E50914]/50 transition-all duration-500 shadow-2xl bg-[#181818]">
        {/* Banner Image Container with Ken-Burns hover effect */}
        <div className="relative w-full h-72 sm:h-96 md:h-[460px] overflow-hidden">
          <Image
            src="/assets/webp/premamrutham_banner.webp"
            alt="Prajwalkumar Madiwal at Sai Krishan Premamrutham Hall"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
          />

          {/* Red & Dark Cinematic Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex flex-col justify-end z-10">
          {/* Location & Architecture Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-zinc-200">
              <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
              {/* TODO: confirm location/date caption with Prajwal */}
              <span>Sai Krishan Premamrutham Hall</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/20 backdrop-blur-md border border-[#E50914]/40 text-xs font-semibold text-red-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service • Education • Values</span>
            </div>
          </div>

          <h3 className="font-bebas text-2xl sm:text-4xl text-white tracking-wide mb-2 drop-shadow-md">
            Grounded in Character, Driven by Innovation
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed mb-6 font-normal drop-shadow">
            From childhood values instilled at Sathya Sai Grama to leading Rs. 50,000+ local education fundraisers with One World One Family and volunteering with Annapurna Trust, service remains the compass behind every algorithmic model and platform I engineer.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.sathyasaigrama.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg"
            >
              <span>Explore Sathya Sai Grama</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="#journey-timeline"
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-200 font-bebas text-lg tracking-wider uppercase transition-colors"
            >
              <span>View Schooling Episode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
