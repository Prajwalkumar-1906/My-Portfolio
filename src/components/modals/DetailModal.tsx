"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Bookmark, Check, Layers, Code, Award, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { sound } from "@/lib/sound";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export interface ModalDetails {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  image?: string;
  description: string;
  problem?: string;
  approach?: string;
  results?: string[];
  whatILearned?: string;
  technologies?: string[];
  keyFeatures?: string[];
  metrics?: string[];
  githubUrl?: string;
  externalUrl?: string;
  liveUrl?: string;
  architectureDiagram?: 'placewise' | 'chukta' | 'retention' | 'generic';
  badges?: string[];
}

interface DetailModalProps {
  item: ModalDetails | null;
  onClose: () => void;
}

export function DetailModal({ item, onClose }: DetailModalProps) {
  const [activeTab, setActiveTab] = useState<'case-study' | 'architecture' | 'stack'>('case-study');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!item) return;

    if (typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
      setIsSaved(list.includes(item.id));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const toggleSave = () => {
    sound.playSelect();
    if (typeof window !== "undefined") {
      let list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
      if (list.includes(item.id)) {
        list = list.filter((id: string) => id !== item.id);
        setIsSaved(false);
      } else {
        list.push(item.id);
        setIsSaved(true);
      }
      localStorage.setItem("pkm_my_list", JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("shortlist-updated"));
    }
  };

  const isCaseStudy = Boolean(item.problem || item.approach || item.architectureDiagram);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#181818] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Hero Banner Header */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gradient-to-br from-[#2b2b2b] via-[#1a1a1a] to-[#0e0e0e] flex-none">
          {item.image && (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover filter brightness-75"
            />
          )}

          {/* Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/60" />

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-[#E50914] text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Metadata */}
          <div className="absolute bottom-4 inset-x-6 z-10">
            {item.category && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 bg-black/60 px-2.5 py-0.5 rounded border border-white/10">
                {item.category}
              </span>
            )}
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1 drop-shadow-md">
              {item.title}
            </h2>
            {item.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-300 font-medium line-clamp-1">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Modal Action Strip */}
        <div className="px-6 py-3 bg-[#141414] border-b border-white/5 flex flex-wrap items-center justify-between gap-3 flex-none">
          {/* Tabs */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('case-study')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'case-study'
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Case Study
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'architecture'
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveTab('stack')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'stack'
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Stack & Links
            </button>
          </div>

          {/* My List Toggle & Direct Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isSaved
                  ? "bg-[#E50914] text-white border-[#E50914]"
                  : "bg-white/5 text-zinc-300 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? "Saved" : "Shortlist"}</span>
            </button>

            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                title="View GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {/* Live demo button: shown ONLY if liveUrl exists */}
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white text-xs font-semibold transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              // TODO: add live demo URL when deployed
              null
            )}
          </div>
        </div>

        {/* Modal Tab Content (Scrollable) */}
        <div className="p-6 text-sm text-zinc-300 leading-relaxed overflow-y-auto flex-1">
          {activeTab === 'case-study' && (
            <div className="space-y-6">
              {/* Problem */}
              {item.problem ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E50914] mb-1.5">
                    1. The Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
                    {item.problem}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zinc-300">{item.description}</p>
              )}

              {/* Approach */}
              {item.approach && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
                    2. Engineering Approach
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
                    {item.approach}
                  </p>
                </div>
              )}

              {/* Results & Facts from Resume */}
              {item.results && item.results.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                    3. Measured Results (Verified Facts)
                  </h4>
                  <div className="space-y-1.5">
                    {item.results.map((res, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What I Learned */}
              {item.whatILearned && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                    4. What I Learned
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 italic bg-white/5 p-3 rounded-lg border border-white/10">
                    &ldquo;{item.whatILearned}&rdquo;
                  </p>
                </div>
              )}

              {/* Key Features fallback if not a case study */}
              {!item.problem && item.keyFeatures && item.keyFeatures.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 mb-2">
                    Key Highlights
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {item.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] mt-1.5 flex-none" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <ArchitectureDiagram type={item.architectureDiagram} />

              {item.keyFeatures && item.keyFeatures.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 mb-2.5">
                    Architectural Specifications
                  </div>
                  <ul className="space-y-2 text-xs">
                    {item.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] mt-1.5 flex-none" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase font-bold text-zinc-400 mb-2.5">
                  Technologies Employed
                </div>
                {item.technologies && item.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-200 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    {/* TODO: add stack - The resume has an unfilled placeholder for the tech stack. Do NOT show any tech stack. */}
                    <span>Tech stack details are undergoing verification per latest curriculum audit. No unverified technologies displayed.</span>
                  </div>
                )}
              </div>

              {item.metrics && item.metrics.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-bold text-zinc-400 mb-2">
                    Performance Indicators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#E50914]/15 border border-[#E50914]/30 text-white font-mono text-xs"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(item.githubUrl || item.liveUrl) && (
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-white font-medium text-xs transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Open GitHub Repository</span>
                    </a>
                  )}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#f40612] text-white font-medium text-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
