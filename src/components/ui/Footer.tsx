"use client";

import Link from "next/link";
import { Mail, Heart, Download } from "lucide-react";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import { downloadVCard } from "@/lib/vcard";
import { sound } from "@/lib/sound";

export function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-zinc-400 border-t border-white/5 py-14 px-4 sm:px-6 lg:px-8 select-none cinema-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Wordmark & Tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-white/5 gap-4">
          <div>
            <span className="netflix-wordmark text-3xl font-bold tracking-widest text-[#E50914]">
              PRAJWAL
            </span>
            <p className="text-xs text-zinc-500 mt-1 max-w-md">
              AI/ML & Full-Stack Engineer &bull; Data & Business Analyst &bull; Keynote Speaker
            </p>
          </div>

          {/* Social Cluster */}
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] transition-colors"
              aria-label="LinkedIn Profile (8K+ Followers)"
              title="LinkedIn (8K+)"
            >
              <BrandIcons.Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/20 hover:text-white transition-colors"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <BrandIcons.Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 hover:text-pink-400 transition-colors"
              aria-label="Instagram Profile (@foreverprajwalkumar)"
              title="Instagram (@foreverprajwalkumar)"
            >
              <BrandIcons.Instagram className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-zinc-200/20 hover:text-zinc-200 transition-colors"
              aria-label="X Twitter Profile (@prajwalkumar_19)"
              title="X (@prajwalkumar_19)"
            >
              <BrandIcons.XIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="p-2 rounded-full bg-white/5 hover:bg-[#E50914]/20 hover:text-white transition-colors"
              aria-label="Send Direct Email"
              title="Email Prajwal"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Column Netflix Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs">
          <div>
            <h2 className="font-bebas text-base tracking-wider text-zinc-300 uppercase mb-3">
              Profiles
            </h2>
            <ul className="space-y-2">
              <li><Link href="/who" className="hover:text-white hover:underline text-[#E50914] font-semibold">Who&apos;s Watching? Selector</Link></li>
              <li><Link href="/recruiter?season=aiml" className="hover:text-white hover:underline">Recruiter (Season 1 AI/ML)</Link></li>
              <li><Link href="/recruiter?season=data_ba" className="hover:text-white hover:underline">Recruiter (Season 2 Data BA)</Link></li>
              <li><Link href="/browse" className="hover:text-white hover:underline">Just Browsing (The Show)</Link></li>
              <li><Link href="/sessions" className="hover:text-white hover:underline">Book a Session</Link></li>
              <li><Link href="/network" className="hover:text-white hover:underline">Networker Hub</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bebas text-base tracking-wider text-zinc-300 uppercase mb-3">
              Services & Stage
            </h2>
            <ul className="space-y-2">
              <li><Link href="/sessions#services" className="hover:text-white hover:underline">Public Speaking & Keynotes</Link></li>
              <li><Link href="/sessions#services" className="hover:text-white hover:underline">Technical Workshops & GenAI</Link></li>
              <li><Link href="/sessions#services" className="hover:text-white hover:underline">Resume Review & ATS</Link></li>
              <li><Link href="/sessions#services" className="hover:text-white hover:underline">Mock Interviews & Perception</Link></li>
              <li><Link href="/sessions#quote" className="hover:text-white hover:underline">Request a Custom Quote</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bebas text-base tracking-wider text-zinc-300 uppercase mb-3">
              Downloads & Docs
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                  AI/ML Resume (PDF)
                </a>
              </li>
              <li>
                <a href="/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                  Data Analyst Resume (PDF)
                </a>
              </li>
              <li>
                <a href="/resumes/Prajwalkumar_Madiwal_Speaker_Kit.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                  Official Speaker Kit (PDF)
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playSelect();
                    downloadVCard();
                  }}
                  className="hover:text-white hover:underline text-left flex items-center gap-1.5 text-zinc-300"
                >
                  <Download className="w-3 h-3 text-[#E50914]" />
                  <span>Save Contact Card (.vcf)</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bebas text-base tracking-wider text-zinc-300 uppercase mb-3">
              Privacy & Info
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-3">
              Zero tracking cookies. Audio and session preferences stored locally in your browser only.
            </p>
            <div className="space-y-1 text-zinc-500 font-mono text-[11px]">
              <div><Link href="/privacy" className="hover:text-zinc-300 underline">Privacy Policy</Link></div>
              <div>Platform: Next.js 16 &bull; Three.js &bull; Tailwind</div>
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-3">
          <div>
            &copy; 2026 Prajwalkumar Madiwal. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span>Made with passion in Bengaluru, Karnataka</span>
            <Heart className="w-3.5 h-3.5 text-[#E50914] fill-[#E50914]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
