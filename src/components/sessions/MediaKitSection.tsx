"use client";

import Image from "next/image";
import { Download, Copy, Check, ExternalLink, Mic, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { sound } from "@/lib/sound";
import { SERVICES } from "@/data/services";

export function MediaKitSection() {
  const [copiedBio, setCopiedBio] = useState<string | null>(null);

  const shortBio = "Prajwalkumar Madiwal is a final-year Computer Science engineer at Rajarajeswari College of Engineering (RRCE), Bengaluru, and AI Intern at ABB. An engaging keynote speaker and technical workshop mentor with an 8K+ LinkedIn following, Prajwal delivers high-impact masterclasses on Generative AI architectures, algorithmic interview perception, and student product entrepreneurship.";

  const longBio = "Prajwalkumar Madiwal is a multi-disciplinary AI/ML and full-stack software engineer, data analyst, and keynote speaker based in Bengaluru, India. Currently completing his B.E. in Computer Science & Engineering at Rajarajeswari College of Engineering (2027) while serving as an AI Intern at ABB, Prajwal combines deep algorithmic mastery with magnetic stage presence. He has architected fairness-audited machine learning platforms (PlaceWise) and distributed graph settlement engines (Chukta), trained over 100 students in hands-on Generative AI workshops, and steered inter-college entrepreneurship summits with 300+ attendees. On stage, he translates complex technology into actionable frameworks, empowering students, developers, and corporate teams across India.";

  const handleCopy = (text: string, label: string) => {
    sound.playSelect();
    navigator.clipboard.writeText(text);
    setCopiedBio(label);
    setTimeout(() => setCopiedBio(null), 2500);
  };

  const talkFormats = [
    { format: "Keynote Talk", duration: "30 - 45 Mins", description: "High-energy stage address inspiring students and tech professionals on AI frontiers and product mindset." },
    { format: "Technical Workshop", duration: "2 - 3 Hours", description: "Hands-on coding lab covering Generative AI APIs, prompt engineering, or modern full-stack workflows." },
    { format: "Panel / Fireside", duration: "45 - 60 Mins", description: "Insightful discussion on career transitions, tech community building, and hackathon strategies." },
    { format: "Mock Interview Clinic", duration: "1.5 - 2 Hours", description: "Live interactive breakdown of placement interview techniques, behavioral perception, and technical problem solving." }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-widest">
            Press & Event Organizers
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            OFFICIAL SPEAKER KIT & MEDIA ASSETS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Event organizers and conclave committees can copy bios, download high-res portraits, and grab the printable speaker kit.
          </p>
        </div>

        <a
          href="/resumes/Prajwalkumar_Madiwal_Speaker_Kit.pdf"
          download="Prajwalkumar_Madiwal_Speaker_Kit.pdf"
          onClick={() => sound.playSelect()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6A00] hover:bg-[#e05e00] text-black font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Download Printable Speaker Kit (PDF)</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Bios */}
        <div className="lg:col-span-7 space-y-6">
          {/* Short Bio */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider">
                Short Bio (70 words &bull; Conclave Brochures)
              </span>
              <button
                onClick={() => handleCopy(shortBio, "short")}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                {copiedBio === "short" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === "short" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {shortBio}
            </p>
          </div>

          {/* Long Bio */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider">
                Full Bio (140 words &bull; Stage Introductions)
              </span>
              <button
                onClick={() => handleCopy(longBio, "long")}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                {copiedBio === "long" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBio === "long" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {longBio}
            </p>
          </div>

          {/* Talk Formats */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10">
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-4">
              Available Talk Formats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {talkFormats.map((tf, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{tf.format}</span>
                    <span className="text-[10px] font-mono text-[#FF6A00]">{tf.duration}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {tf.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Headshots & Topics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Headshots */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10">
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-3">
              Official Speaker Headshots
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 group">
                <Image
                  src="/assets/webp/prajwal_hero.webp"
                  alt="Prajwalkumar Madiwal Keynote Headshot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <a
                  href="/assets/webp/prajwal_hero.webp"
                  target="_blank"
                  download="Prajwal_Stage_Headshot.webp"
                  className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/70 text-white text-[10px] font-semibold flex items-center gap-1 hover:bg-[#FF6A00] transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Stage</span>
                </a>
              </div>

              <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 group">
                <Image
                  src="/assets/webp/avatar_recruiter.webp"
                  alt="Prajwalkumar Madiwal Portrait Headshot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <a
                  href="/assets/webp/avatar_recruiter.webp"
                  target="_blank"
                  download="Prajwal_Portrait_Headshot.webp"
                  className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/70 text-white text-[10px] font-semibold flex items-center gap-1 hover:bg-[#FF6A00] transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Portrait</span>
                </a>
              </div>
            </div>
          </div>

          {/* Core Masterclass Topics (Derived directly from services catalog) */}
          <div className="p-6 rounded-2xl bg-[#181818] border border-white/10">
            <h3 className="font-bebas text-2xl text-white tracking-wide mb-3">
              Catalog Topics
            </h3>
            <div className="space-y-2">
              {SERVICES.slice(0, 5).map((serv) => (
                <div key={serv.id} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">{serv.title}</span>
                    <span className="text-zinc-500 font-mono text-[10px] ml-1.5">({serv.duration})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
