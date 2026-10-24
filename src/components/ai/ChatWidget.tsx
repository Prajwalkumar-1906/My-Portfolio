"use client";

import { useState, useEffect, useRef } from "react";
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
  Check,
  Bot,
  Languages
} from "lucide-react";
import knowledge from "@/data/knowledge.json";
import { sound } from "@/lib/sound";

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
        "Hello! I am Srushti, Prajwal's AI copilot. Ask me anything about his AI/ML projects (PlaceWise, Chukta), dual-season roles, speaking availability, or certifications!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedLang, setSelectedLang] = useState<"en-IN" | "hi-IN" | "kn-IN">("en-IN");
  const [leadHandoffSent, setLeadHandoffSent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Profile-specific dynamic prompt suggestions
  const getProfileChips = () => {
    if (pathname.includes("recruiter")) return knowledge.profilePrompts.recruiter;
    if (pathname.includes("sessions")) return knowledge.profilePrompts.sessions;
    if (pathname.includes("network")) return knowledge.profilePrompts.network;
    if (pathname.includes("browse")) return knowledge.profilePrompts.browse;
    return knowledge.quickChips;
  };

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
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Speech Synthesis reply
  const speakReply = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#]/g, "").replace(/https?:\/\/\S+/g, "link provided below");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = selectedLang;
    utterance.rate = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I don't have that information; you can email Prajwal at pkm.digi@gmail.com.",
          isFallback: true
        }
      ]);
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I've passed your note directly to Prajwal's inbox (pkm.digi@gmail.com). If you'd like a response, feel free to drop your email or message him on LinkedIn!"
        }
      ]);
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
          className="w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] bg-[#141414] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Top Bar with 3D AI Orb Visualizer */}
          <div className="px-4 py-3 bg-[#181818] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#E50914] via-[#FF6A00] to-yellow-400 p-0.5 shadow-md">
                <div
                  className={`w-full h-full rounded-full bg-black/90 flex items-center justify-center transition-all ${
                    isListening
                      ? "animate-ping bg-red-600"
                      : isSpeaking
                      ? "animate-pulse bg-orange-600"
                      : ""
                  }`}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <div className="font-bebas text-lg tracking-wide text-white flex items-center gap-1.5 leading-none">
                  <span>ASK SRUSHTI</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-400 border border-red-800/50">
                    VOICE AI
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {isListening ? (
                    <span className="text-red-400 font-bold">Listening...</span>
                  ) : isSpeaking ? (
                    <span className="text-orange-400 font-bold">Speaking...</span>
                  ) : (
                    <span>Grounded Knowledge</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div className="flex items-center gap-1">
              {/* Export transcript */}
              <button
                onClick={exportConversation}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Export Conversation Transcript (.txt)"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-1.5 rounded-md hover:bg-white/10 transition-colors ${
                  voiceEnabled ? "text-red-500" : "text-zinc-500"
                }`}
                title={voiceEnabled ? "Voice Output ON" : "Voice Output OFF"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={clearChat}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playSelect();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

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
                      <div className="w-6 h-6 rounded-full bg-[#E50914] flex-none flex items-center justify-center text-white text-[10px] font-bold">
                        S
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap ${
                        isAssistant
                          ? "bg-[#222222] text-zinc-200 border border-white/10 rounded-tl-sm"
                          : "bg-[#E50914] text-white font-medium rounded-tr-sm shadow-md"
                      }`}
                    >
                      {m.content}
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
                    ? "bg-[#E50914] text-white animate-pulse"
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
    </div>
  );
}
