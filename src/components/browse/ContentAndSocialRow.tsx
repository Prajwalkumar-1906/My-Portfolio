"use client";

import { BrandIcons } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import { ExternalLink, CheckCircle } from "lucide-react";
import { sound } from "@/lib/sound";

export function ContentAndSocialRow() {
  const trackSocial = (platform: string) => {
    sound.playSelect();
    if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, opts?: object) => void }).plausible) {
      (window as unknown as { plausible: (event: string, opts?: object) => void }).plausible("Outbound Social Click", { props: { platform } });
    }
  };

  const socials = [
    {
      platform: "LinkedIn",
      handle: "Prajwalkumar Madiwal",
      subHandle: "@prajwalkumarm",
      stat: "8K+ Verified Followers",
      isVerified: true,
      description: "Career insights, machine learning architecture breakdowns, and tech community leadership.",
      url: PROFILE.linkedin,
      icon: BrandIcons.Linkedin,
      color: "from-[#0077b5]/20 to-transparent",
      borderColor: "hover:border-[#0077b5]",
      btnText: "Follow on LinkedIn"
    },
    {
      platform: "Instagram",
      handle: "@foreverprajwalkumar",
      subHandle: "Prajwal",
      stat: "Life, Stage & Behind the Scenes",
      isVerified: false,
      description: "Moments from keynote masterclasses, hackathon sprint nights, campus life, and travel.",
      url: PROFILE.instagram,
      icon: BrandIcons.Instagram,
      color: "from-pink-600/20 to-transparent",
      borderColor: "hover:border-pink-500",
      btnText: "Follow on Instagram"
    },
    {
      platform: "X (Twitter)",
      handle: "@prajwalkumar_19",
      subHandle: "Prajwalkumar Madiwal",
      stat: "Thoughts & Engineering Updates",
      isVerified: false,
      description: "Bite-sized thoughts on algorithmic fairness, AI evaluation benchmarks, and modern dev tools.",
      url: PROFILE.twitter,
      icon: BrandIcons.XIcon,
      color: "from-zinc-500/20 to-transparent",
      borderColor: "hover:border-zinc-300",
      btnText: "Follow on X"
    },
    {
      platform: "GitHub",
      handle: "@Prajwalkumar-1906",
      subHandle: "Prajwalkumar-1906",
      stat: "Open Source Codebases",
      isVerified: false,
      description: "Production code repositories, PlaceWise, Chukta Bitmask-DP solver, and DSA problem sets.",
      url: PROFILE.github,
      icon: BrandIcons.Github,
      color: "from-white/10 to-transparent",
      borderColor: "hover:border-white/50",
      btnText: "Explore GitHub"
    }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
          Continuous Broadcast
        </span>
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
          CONTENT & SOCIAL CHANNELS
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Connect across verified platforms for technical essays, keynote highlights, and engineering discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.platform}
              className={`group flex flex-col justify-between p-6 rounded-xl bg-[#181818] border border-white/10 ${s.borderColor} transition-all duration-300 relative overflow-hidden shadow-xl hover:-translate-y-1.5`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${s.color}`}
              />

              <div>
                {/* Header Icon + Platform */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-black/50 border border-white/10 text-white group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  {s.isVerified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#0077b5] bg-[#0077b5]/10 px-2 py-0.5 rounded-full border border-[#0077b5]/20">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Handle & Title */}
                <div className="font-bebas text-2xl tracking-wide text-white group-hover:text-red-400 transition-colors">
                  {s.platform}
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-0.5">
                  {s.handle}
                </div>

                {/* Stat Pill */}
                <div className="mt-3 inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-semibold text-zinc-300">
                  {s.stat}
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  {s.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocial(s.platform)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-[#E50914] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>{s.btnText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
