"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, FastForward } from "lucide-react";
import { sound } from "@/lib/sound";

interface WelcomeSplashProps {
  onComplete: () => void;
}

export function WelcomeSplash({ onComplete }: WelcomeSplashProps) {
  const [soundActive, setSoundActive] = useState(true);
  const [stage, setStage] = useState<'sticker' | 'streak' | 'done'>('sticker');

  useEffect(() => {
    // Stage 1: Sticker peel & slap animation (0s to 2.4s)
    const streakTimer = setTimeout(() => {
      setStage('streak');
      if (soundActive) {
        sound.playTudumChord(true);
      }
    }, 2400);

    // Stage 2: Streak transition to complete (3.4s)
    const doneTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(streakTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, soundActive]);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.setEnabled(next);
    if (next) {
      sound.playTudumChord(true);
    }
  };

  const handleSkip = () => {
    setStage('done');
    onComplete();
  };

  if (stage === 'done') return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Intro"
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* Top Floating Controls */}
      <div className="absolute top-6 inset-x-6 flex items-center justify-between z-30">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white backdrop-blur-md transition-colors"
          aria-label={soundActive ? "Mute audio" : "Enable sound"}
        >
          {soundActive ? (
            <>
              <Volume2 className="w-4 h-4 text-[#E50914]" />
              <span>Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-zinc-400" />
              <span>Sound OFF (Click to Enable)</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white tracking-wider uppercase backdrop-blur-md transition-colors"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'sticker' && (
          <motion.div
            key="sticker"
            initial={{ scale: 2.2, rotate: -18, opacity: 0, y: -80 }}
            animate={{
              scale: [2.2, 0.95, 1],
              rotate: [-18, -4, -6],
              opacity: 1,
              y: 0
            }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(8px)" }}
            transition={{
              duration: 0.8,
              ease: [0.175, 0.885, 0.32, 1.275]
            }}
            className="relative cursor-pointer"
            onClick={handleSkip}
          >
            {/* Holographic Sticker Badge (Peel-and-slap gloss effect) */}
            <div className="relative px-8 sm:px-12 py-6 sm:py-8 rounded-3xl bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1e1e1e] border-2 border-white/30 shadow-[0_25px_60px_rgba(229,9,20,0.45)] transform hover:rotate-[-2deg] transition-transform duration-300">
              
              {/* Holographic Sheen Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* Red Peel Corner Accent */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#E50914] rounded-tr-2xl rounded-bl-3xl shadow-lg border-t-2 border-r-2 border-white/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              {/* Main Sticker Title */}
              <div className="text-center">
                <div className="font-bebas text-6xl sm:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  WELCOME
                </div>
                
                <div className="mt-2 text-sm sm:text-base font-medium text-red-500 tracking-wider">
                  I&apos;m Prajwalkumar, glad you&apos;re here.
                </div>

                <div className="mt-4 text-[11px] text-zinc-400 font-mono tracking-widest uppercase">
                  Netflix-Grade Interactive Show &bull; Prajwal Madiwal
                </div>
              </div>

              {/* Gloss highlight reflection */}
              <div className="absolute inset-x-4 top-2 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}

        {stage === 'streak' && (
          <motion.div
            key="streak"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Netflix-Style Red Light-Streak "Tudum" Beam Reveal */}
            <motion.div
              initial={{ scaleX: 0.05, opacity: 0.2 }}
              animate={{
                scaleX: [0.05, 1.8, 40],
                opacity: [0.2, 1, 0]
              }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="w-2 sm:w-4 h-full bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_80px_#E50914]"
            />

            {/* Radiant Center Glow */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 2.5, 6], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#E50914] to-[#FF6A00] blur-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
