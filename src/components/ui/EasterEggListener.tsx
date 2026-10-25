"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";
import { Sparkles, X, Film, Languages, Trophy, Heart } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export function EasterEggListener() {
  const [directorsCutOpen, setDirectorsCutOpen] = useState(false);

  useEffect(() => {
    let textBuffer = "";
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in form inputs
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      // 1. "tudum" typing easter egg
      textBuffer += e.key.toLowerCase();
      if (textBuffer.length > 10) {
        textBuffer = textBuffer.slice(-10);
      }
      if (textBuffer.endsWith("tudum")) {
        triggerConfetti();
        sound.playTudumChord(true);
        textBuffer = "";
      }

      // 2. Konami code detection
      if (e.key === KONAMI_CODE[konamiIndex] || e.key.toLowerCase() === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          triggerConfetti();
          sound.playTudumChord(true);
          setDirectorsCutOpen(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    const triggerConfetti = () => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#E50914", "#F40612", "#FF6A00", "#FFFFFF"]
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#E50914", "#FF6A00"]
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#E50914", "#FFFFFF"]
        });
      }, 250);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!directorsCutOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Director's Cut Unlocked"
      className="fixed inset-0 z-[220] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-300"
      onClick={() => setDirectorsCutOpen(false)}
    >
      <div
        className="relative max-w-xl w-full bg-[#181818] border-2 border-[#E50914] rounded-2xl shadow-[0_0_60px_rgba(229,9,20,0.5)] p-6 sm:p-8 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Film Strip Accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#E50914] via-[#FF6A00] to-rose-500" />

        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider">
                Konami Code Unlocked
              </span>
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Special Feature
              </span>
            </div>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              DIRECTOR&apos;S CUT: TRUTHFUL FUN FACTS
            </h2>
            <p className="text-xs text-zinc-400">
              Behind the code with Prajwalkumar Madiwal &bull; Verified trivia & authentic backstage notes
            </p>
          </div>

          <button
            onClick={() => setDirectorsCutOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-[#E50914] text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fact Cards */}
        <div className="my-6 space-y-3 max-h-80 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Languages className="w-5 h-5 text-[#FF6A00] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Polyglot Communication</div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Prajwal speaks 5 Indian languages fluently: English, Hindi, Kannada, Telugu, and Marathi, making him exceptionally versatile across Pan-Indian teams.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Cricket Champion & Sportsmanship</div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Beyond terminal windows and machine learning notebooks, Prajwal has led and represented his school and collegiate cricket teams to tournament victories (as seen in his trophy portrait!).
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Values-First Foundation</div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Schooling at Sathya Sai Grama instilled lifelong human values of discipline, selflessness, and integrity, which led to spearheading Rs. 50,000+ local education fundraisers.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Film className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">Stage Energy & Metaphors</div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Prajwal loves using real-world pop culture and storytelling analogies on stage to explain complex distributed system concepts like bitmask dynamic programming and SHAP attributions.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
          <span>Easter egg unlocked successfully.</span>
          <button
            onClick={() => setDirectorsCutOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Back to Show
          </button>
        </div>
      </div>
    </div>
  );
}
