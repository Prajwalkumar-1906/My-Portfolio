"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  Download,
  Mail,
  Info,
  Play,
  Pause,
  Square,
  RotateCcw,
  Sliders,
  AlertCircle
} from "lucide-react";
import knowledge from "@/data/knowledge.json";
import { sound } from "@/lib/sound";
import { VoiceOrb3D } from "./VoiceOrb3D";
import { ClonedAudioPlayer, PlaybackSpeed } from "@/lib/tts/audioPlayer";

interface Message {
  role: "user" | "assistant";
  content: string;
  isFallback?: boolean;
}

export function ChatWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am Srushti, Prajwal's synthetic AI copilot. Ask me anything about his AI/ML projects (PlaceWise, Chukta), dual-season roles, speaking availability, or certifications!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedLang, setSelectedLang] = useState<"en-IN" | "hi-IN" | "kn-IN">("en-IN");
  const [leadHandoffSent, setLeadHandoffSent] = useState(false);

  // Audio Player State & Controls
  const [audioLevel, setAudioLevel] = useState(0);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1.0);
  const [volume, setVolume] = useState(1.0);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showTransparencyModal, setShowTransparencyModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const micAnimRef = useRef<number | null>(null);

  // Profile-specific dynamic prompt suggestions
  const getProfileChips = () => {
    if (pathname.includes("recruiter")) return knowledge.profilePrompts.recruiter;
    if (pathname.includes("sessions")) return knowledge.profilePrompts.sessions;
    if (pathname.includes("network")) return knowledge.profilePrompts.network;
    if (pathname.includes("browse")) return knowledge.profilePrompts.browse;
    return knowledge.quickChips;
  };

  // Wire up ClonedAudioPlayer callbacks
  useEffect(() => {
    const player = ClonedAudioPlayer.getInstance();
    player.setCallbacks({
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveSubtitle(null);
        setAudioLevel(0);
      },
      onSubtitle: (sub) => setActiveSubtitle(sub),
      onAudioLevel: (lvl) => setAudioLevel(lvl),
      onFallbackNotice: (notice) => {
        setFallbackNotice(notice);
        setTimeout(() => setFallbackNotice(null), 6000);
      }
    });

    return () => {
      player.stop();
    };
  }, []);

  useEffect(() => {
    // Restore session conversation
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pkm_chat_history");
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
    }

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-pkm-chat", handleOpen);
    return () => window.removeEventListener("open-pkm-chat", handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined" && messages.length > 1) {
      sessionStorage.setItem("pkm_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Mic level analyser for 3D Orb responsiveness while user speaks
  const startMicLevelTracking = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtxClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      micAnalyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const trackLevel = () => {
        if (!micAnalyserRef.current) return;
        micAnalyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(1, avg / 100));
        micAnimRef.current = requestAnimationFrame(trackLevel);
      };
      trackLevel();
    } catch {
      // Mic permission denied or unavailable, SpeechRecognition handles text
    }
  };

  const stopMicLevelTracking = () => {
    if (micAnimRef.current) {
      cancelAnimationFrame(micAnimRef.current);
      micAnimRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    micAnalyserRef.current = null;
    setAudioLevel(0);
  };

  // Speech Recognition setup (Web Speech API)
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Web Speech voice input is not supported in this browser. You can type your question!");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      stopMicLevelTracking();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        setIsListening(true);
        sound.playHover();
        startMicLevelTracking();
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        stopMicLevelTracking();
      };

      recognition.onend = () => {
        setIsListening(false);
        stopMicLevelTracking();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      stopMicLevelTracking();
    }
  };

  // Trigger Cloned Voice Playback via AudioPlayer
  const speakReply = useCallback(
    (text: string) => {
      if (!voiceEnabled) return;
      const player = ClonedAudioPlayer.getInstance();
      player.speak(text, selectedLang);
    },
    [voiceEnabled, selectedLang]
  );

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    sound.playSelect();
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang: selectedLang })
      });

      const data = await res.json();
      const reply = data.reply || knowledge.fallbackMessage;
      const isFallback = reply === knowledge.fallbackMessage || data.isFallback;

      // Handle navigation command
      if (reply.startsWith("NAVIGATE:")) {
        const route = reply.replace("NAVIGATE:", "").trim();
        const navMsg = `Routing you to ${route} now...`;
        setMessages((prev) => [...prev, { role: "assistant", content: navMsg }]);
        speakReply(navMsg);
        setTimeout(() => router.push(route), 1000);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: reply, isFallback }]);
        speakReply(reply);
      }
    } catch {
      const errReply = "I don't have that information; you can email Prajwal at pkm.digi@gmail.com.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errReply,
          isFallback: true
        }
      ]);
      speakReply(errReply);
    } finally {
      setLoading(false);
    }
  };

  // Lead capture handoff: sends user query to Prajwal's inbox
  const handleLeadHandoff = async (userQuestion: string) => {
    sound.playSelect();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Portfolio Chat Visitor",
          email: "chat-visitor@prajwal.portfolio",
          purpose: "AI Chat Lead Handoff",
          message: `[AI Chat Handoff]\nVisitor asked:\n"${userQuestion}"\nPath: ${pathname}`
        })
      });
      setLeadHandoffSent(true);
      const confirmationMsg =
        "I've passed your note directly to Prajwal's inbox (pkm.digi@gmail.com). If you'd like a response, feel free to drop your email or message him on LinkedIn!";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: confirmationMsg
        }
      ]);
      speakReply(confirmationMsg);
    } catch {
      // Ignored
    }
  };

  // Export conversation as TXT file
  const exportConversation = () => {
    sound.playSelect();
    const textContent = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}\n`)
      .join("\n---\n\n");
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Prajwalkumar_Chat_Transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearChat = () => {
    sound.playSelect();
    ClonedAudioPlayer.getInstance().stop();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pkm_chat_history");
    }
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! I'm Srushti — how can I assist your discovery of Prajwal's work?"
      }
    ]);
  };

  const handleSpeedChange = (speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
    ClonedAudioPlayer.getInstance().setSpeed(speed);
    sound.playSelect();
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    ClonedAudioPlayer.getInstance().setVolume(vol);
  };

  const togglePauseResume = () => {
    const player = ClonedAudioPlayer.getInstance();
    if (isPaused) {
      player.resume();
      setIsPaused(false);
    } else {
      player.pause();
      setIsPaused(true);
    }
    sound.playSelect();
  };

  const stopAudio = () => {
    ClonedAudioPlayer.getInstance().stop();
    sound.playSelect();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Toggle Button with Netflix Pulse */}
      {!isOpen && (
        <button
          onClick={() => {
            sound.playSelect();
            setIsOpen(true);
          }}
          className="relative group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-gradient-to-r from-[#E50914] via-[#F40612] to-[#FF6A00] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(229,9,20,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Ask Srushti AI Assistant"
        >
          {/* Animated red ping ring */}
          <span className="absolute -inset-1 rounded-full bg-[#E50914] opacity-40 group-hover:opacity-75 blur-md animate-pulse" />

          <Sparkles className="w-4 h-4 fill-white relative z-10 animate-spin-slow" />
          <span className="relative z-10 font-bebas text-base tracking-wider">
            ASK SRUSHTI
          </span>
          <span className="relative z-10 hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Netflix Styled Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Concierge"
          className="w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh] bg-[#141414] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Top Bar with 3D AI Orb Visualizer & Voice Indicator */}
          <div className="px-4 py-3 bg-[#181818] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Interactive 3D Voice Orb */}
              <VoiceOrb3D
                audioLevel={audioLevel}
                isListening={isListening}
                isSpeaking={isSpeaking}
                size="md"
              />

              <div>
                <div className="font-bebas text-lg tracking-wide text-white flex items-center gap-1.5 leading-none">
                  <span>ASK SRUSHTI</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/50">
                    FEMALE AI VOICE
                  </span>
                </div>

                {/* Subtitle / Transparency label */}
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isListening
                        ? "bg-emerald-400 animate-ping"
                        : isSpeaking
                        ? "bg-[#FF6A00] animate-pulse"
                        : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-[10px] text-zinc-400">
                    {isListening ? (
                      <span className="text-emerald-400 font-bold">Listening to mic...</span>
                    ) : isSpeaking ? (
                      <span className="text-[#FF6A00] font-bold">Speaking (Srushti)...</span>
                    ) : (
                      <span>AI-generated voice of Srushti</span>
                    )}
                  </span>

                  {/* Info Tooltip / Transparency Disclosure Button */}
                  <button
                    onClick={() => setShowTransparencyModal(true)}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    title="Synthetic Voice Transparency Info"
                    aria-label="View synthetic voice disclosure"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              {/* Voice Settings Toggle */}
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className={`p-1.5 rounded-md transition-colors ${
                  showVoiceSettings
                    ? "text-[#FF6A00] bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
                title="Voice Settings (Speed, Volume)"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {/* Master Mute / Unmute */}
              <button
                onClick={() => {
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (!next) ClonedAudioPlayer.getInstance().stop();
                }}
                className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${
                  voiceEnabled ? "text-red-500" : "text-zinc-500"
                }`}
                title={voiceEnabled ? "Voice Output ON" : "Voice Output OFF"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Export transcript */}
              <button
                onClick={exportConversation}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Export Conversation Transcript (.txt)"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  sound.playSelect();
                  ClonedAudioPlayer.getInstance().stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Settings Dropdown Bar */}
          {showVoiceSettings && (
            <div className="px-4 py-2 bg-[#1b1b1b] border-b border-white/10 flex items-center justify-between text-xs text-zinc-300 animate-in slide-in-from-top-2 duration-150">
              {/* Playback Speed */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 font-mono">Speed:</span>
                {([0.9, 1.0, 1.15] as PlaybackSpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      playbackSpeed === spd
                        ? "bg-[#E50914] text-white font-bold"
                        : "bg-white/5 hover:bg-white/10 text-zinc-400"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 font-mono">Vol:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 accent-[#E50914] cursor-pointer"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
              </div>

              {/* Stop / Pause playback */}
              {isSpeaking && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={togglePauseResume}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300"
                    title={isPaused ? "Resume" : "Pause"}
                  >
                    {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={stopAudio}
                    className="p-1 rounded bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/50"
                    title="Stop Speaking"
                  >
                    <Square className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Fallback Notice Banner */}
          {fallbackNotice && (
            <div className="px-3 py-1 bg-amber-950/80 border-b border-amber-800/40 text-amber-300 text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{fallbackNotice}</span>
              </span>
              <button
                onClick={() => setFallbackNotice(null)}
                className="text-amber-400 hover:text-white"
              >
                ×
              </button>
            </div>
          )}

          {/* Dynamic Profile-Aware Chips Strip */}
          <div className="px-3 py-2 bg-[#101010] border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {getProfileChips().map((chip, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(chip)}
                className="flex-none text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#E50914]/20 hover:text-white border border-white/10 text-zinc-300 transition-colors whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((m, idx) => {
              const isAssistant = m.role === "assistant";
              return (
                <div key={idx} className="space-y-1.5">
                  <div className={`flex gap-2.5 ${isAssistant ? "justify-start" : "justify-end"}`}>
                    {isAssistant && (
                      <div className="w-6 h-6 rounded-full bg-[#E50914] flex-none flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                        S
                      </div>
                    )}
                    <div
                      className={`relative group max-w-[82%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap ${
                        isAssistant
                          ? "bg-[#222222] text-zinc-200 border border-white/10 rounded-tl-sm"
                          : "bg-[#E50914] text-white font-medium rounded-tr-sm shadow-md"
                      }`}
                    >
                      {m.content}

                      {/* Replay voice button on assistant bubbles */}
                      {isAssistant && (
                        <button
                          onClick={() => {
                            sound.playSelect();
                            speakReply(m.content);
                          }}
                          className="absolute -bottom-2 -right-2 p-1 rounded-full bg-[#181818] border border-white/20 text-zinc-400 hover:text-[#FF6A00] opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          title="Replay message audio"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Lead Capture Handoff Button if unknown fact */}
                  {isAssistant && m.isFallback && !leadHandoffSent && (
                    <div className="pl-8 pt-1">
                      <button
                        onClick={() => {
                          const lastUser = [...messages].reverse().find((msg) => msg.role === "user");
                          handleLeadHandoff(lastUser ? lastUser.content : "Unspecified query");
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E50914]/15 hover:bg-[#E50914]/25 border border-[#E50914]/30 text-white text-[11px] font-semibold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                        <span>Want me to send this to Prajwal?</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs italic">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce delay-200" />
                <span>Consulting portfolio facts...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Synced Voice Subtitles Strip */}
          {activeSubtitle && (
            <div className="px-3 py-1.5 bg-[#181818] border-t border-white/5 text-[11px] text-zinc-300 flex items-center gap-2 animate-in fade-in duration-150">
              <span className="px-1.5 py-0.2 rounded bg-[#E50914]/20 text-[#E50914] text-[9px] font-mono uppercase font-bold flex-shrink-0">
                Subtitles
              </span>
              <span className="truncate italic text-zinc-200">&ldquo;{activeSubtitle}&rdquo;</span>
            </div>
          )}

          {/* Bottom Input Area */}
          <div className="p-3 bg-[#181818] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                }`}
                title={isListening ? "Listening... click to stop" : "Speak via Web Speech"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder="Ask about skills, ABB, PlaceWise, bookings..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-[#E50914] focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-lg bg-[#E50914] hover:bg-[#f40612] disabled:opacity-40 text-white transition-colors"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-zinc-500 px-1">
              <span>Grounded in verified portfolio facts</span>
              <button
                type="button"
                onClick={() => {
                  const nextLang =
                    selectedLang === "en-IN" ? "hi-IN" : selectedLang === "hi-IN" ? "kn-IN" : "en-IN";
                  setSelectedLang(nextLang);
                }}
                className="hover:text-zinc-300 font-mono text-[#E50914]"
              >
                Lang: {selectedLang}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Synthetic Voice Transparency Info Modal */}
      {showTransparencyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowTransparencyModal(false)}
        >
          <div
            className="max-w-md w-full bg-[#181818] border border-white/15 rounded-2xl p-6 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#FF6A00]" />
                <h3 className="font-bebas text-xl tracking-wide">
                  SYNTHETIC VOICE DISCLOSURE
                </h3>
              </div>
              <button
                onClick={() => setShowTransparencyModal(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-white">AI-Generated Female Voice:</strong> The spoken voice in this assistant is a synthetic female AI voice created for <em>Srushti</em>, Prajwal&apos;s digital copilot.
              </p>
              <p>
                <strong className="text-white">Not a Live Person:</strong> You are interacting with an artificial intelligence assistant, not a live human representative.
              </p>
              <p>
                <strong className="text-white">Non-Binding Statements:</strong> All answers are strictly grounded in verified facts from Prajwalkumar Madiwal&apos;s portfolio. The assistant cannot enter into agreements, make hiring guarantees, or negotiate binding prices.
              </p>
              <p>
                <strong className="text-white">Direct Inquiries:</strong> For official opportunities, speaking engagements, or commitments, please contact Prajwalkumar directly at{" "}
                <a href="mailto:pkm.digi@gmail.com" className="text-[#E50914] underline font-semibold">
                  pkm.digi@gmail.com
                </a>.
              </p>
            </div>

            <button
              onClick={() => setShowTransparencyModal(false)}
              className="mt-5 w-full py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-base tracking-wider uppercase transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
