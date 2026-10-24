"use client";

import { useState } from "react";
import { X, Copy, Check, Download, Briefcase, GraduationCap, Award, Mail, Phone, ExternalLink, Printer } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { sound } from "@/lib/sound";
import { downloadVCard } from "@/lib/vcard";

interface SkimModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShortlistPrefill?: () => void;
}

export function SkimModeModal({ isOpen, onClose, onShortlistPrefill }: SkimModeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyPitch = () => {
    sound.playSelect();
    navigator.clipboard.writeText(PROFILE.elevatorPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadVCard = () => {
    sound.playSelect();
    downloadVCard();
  };

  const handlePrintPdf = () => {
    sound.playSelect();
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter Skim Mode Summary"
      className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#181818] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider">
                Recruiter Skim Mode
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                60-Second Executive Summary
              </span>
            </div>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-2">
              Prajwalkumar Madiwal
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Bengaluru, India &bull; pkm.digi@gmail.com &bull; Open to Work
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-[#E50914] text-zinc-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Fast Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-4 border-b border-white/10">
          <button
            onClick={copyPitch}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-red-400" />}
            <span>{copied ? "Copied" : "Copy Pitch"}</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={handleDownloadVCard}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Save vCard</span>
          </button>

          <button
            onClick={() => {
              sound.playSelect();
              onShortlistPrefill?.();
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#E50914] hover:bg-[#f40612] text-xs font-bold text-white transition-colors shadow-lg"
          >
            <span>Contact Me</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="py-5 space-y-6 text-sm">
          {/* Elevator Pitch Box */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs uppercase font-bold text-red-500 mb-1 tracking-wider">
              Elevator Pitch
            </div>
            <p className="text-zinc-200 leading-relaxed text-xs sm:text-sm">
              &ldquo;{PROFILE.elevatorPitch}&rdquo;
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PROFILE.stats.slice(0, 4).map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 text-center">
                <div className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                  {s.value}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Education & Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase mb-2">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <span>Education</span>
              </div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                B.E. Computer Science & Engineering
              </div>
              <div className="text-xs text-zinc-400">
                Rajarajeswari College of Engineering (RRCE), Bengaluru
              </div>
              <div className="text-xs text-red-400 font-mono mt-1">
                2023 - 2027 &bull; CGPA 7.7 / 10
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase mb-2">
                <Briefcase className="w-4 h-4 text-red-500" />
                <span>Current Role & Focus</span>
              </div>
              <div className="font-semibold text-white text-xs sm:text-sm">
                AI Intern @ ABB, Bengaluru
              </div>
              <div className="text-xs text-zinc-400">
                Industrial ML pipelines, preprocessing & EDA
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-1">
                Open to Full-Time Roles (2027)
              </div>
            </div>
          </div>

          {/* Core Technical Highlights */}
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Production Stack Mastery
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Python", "PyTorch", "XGBoost", "SHAP", "Fairlearn",
                "Next.js", "TypeScript", "Node.js", "PostgreSQL",
                "Redis", "Docker", "Power BI", "Excel BI", "Sales Navigator"
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
