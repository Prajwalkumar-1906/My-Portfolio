"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Briefcase,
  Compass,
  Mic,
  Users,
  Download,
  Film,
  Volume2,
  Sparkles,
  X,
  Mail,
  Copy,
  Check,
  Calendar,
  ExternalLink,
  HelpCircle
} from "lucide-react";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { sound } from "@/lib/sound";
import { downloadVCard } from "@/lib/vcard";
import { PROFILE } from "@/data/profile";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Socials" | "Settings" | "AI";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
      setIsOpen(false);
    }, 1500);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "who",
      title: "Who's Watching? (Profile Switcher)",
      category: "Navigation",
      icon: Compass,
      action: () => {
        router.push("/who");
        setIsOpen(false);
      }
    },
    {
      id: "recruiter-aiml",
      title: "Recruiter: Season 1 (AI/ML & Full-Stack)",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        router.push("/recruiter?season=aiml");
        setIsOpen(false);
      }
    },
    {
      id: "recruiter-databa",
      title: "Recruiter: Season 2 (Data Analyst & BizDev)",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        router.push("/recruiter?season=data_ba");
        setIsOpen(false);
      }
    },
    {
      id: "browse",
      title: "Browse Show: Cinematic Trailer & Journey",
      category: "Navigation",
      icon: Film,
      action: () => {
        router.push("/browse");
        setIsOpen(false);
      }
    },
    {
      id: "sessions",
      title: "Book a Session: Keynotes, Workshops & Quotes",
      category: "Navigation",
      icon: Mic,
      action: () => {
        router.push("/sessions");
        setIsOpen(false);
      }
    },
    {
      id: "network",
      title: "Networker: Direct Hub, Guestbook & Wall of Wishes",
      category: "Navigation",
      icon: Users,
      action: () => {
        router.push("/network");
        setIsOpen(false);
      }
    },

    // Quick Actions
    {
      id: "copy-email",
      title: "Copy Prajwal's Email (pkm.digi@gmail.com)",
      category: "Actions",
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(PROFILE.email);
        sound.playSelect();
        showToast("Email copied to clipboard!");
      }
    },
    {
      id: "save-vcard",
      title: "Save Contact Card (.vcf with all socials)",
      category: "Actions",
      icon: Download,
      action: () => {
        sound.playSelect();
        downloadVCard();
        showToast("vCard downloaded!");
      }
    },
    {
      id: "download-aiml",
      title: "Download AI/ML & Full-Stack Resume (PDF)",
      category: "Actions",
      icon: Download,
      action: () => {
        window.open("/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf", "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "download-data",
      title: "Download Data Analyst Resume (PDF)",
      category: "Actions",
      icon: Download,
      action: () => {
        window.open("/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf", "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "download-kit",
      title: "Download Official Speaker Kit (PDF)",
      category: "Actions",
      icon: Download,
      action: () => {
        window.open("/resumes/Prajwalkumar_Madiwal_Speaker_Kit.pdf", "_blank");
        setIsOpen(false);
      }
    },

    // Socials
    {
      id: "social-linkedin",
      title: "Open LinkedIn (8K+ Followers & Tech Essays)",
      category: "Socials",
      icon: BrandIcons.Linkedin,
      action: () => {
        window.open(PROFILE.linkedin, "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "social-github",
      title: "Open GitHub (PlaceWise, Chukta, Retention)",
      category: "Socials",
      icon: BrandIcons.Github,
      action: () => {
        window.open(PROFILE.github, "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "social-instagram",
      title: "Open Instagram (@foreverprajwalkumar)",
      category: "Socials",
      icon: BrandIcons.Instagram,
      action: () => {
        window.open(PROFILE.instagram, "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "social-twitter",
      title: "Open X / Twitter (@prajwalkumar_19)",
      category: "Socials",
      icon: BrandIcons.XIcon,
      action: () => {
        window.open(PROFILE.twitter, "_blank");
        setIsOpen(false);
      }
    },

    // AI & Settings
    {
      id: "ask-ai",
      title: "Ask Srushti (AI Copilot & Multilingual Voice)",
      category: "AI",
      icon: Sparkles,
      action: () => {
        window.dispatchEvent(new CustomEvent("open-pkm-chat"));
        setIsOpen(false);
      }
    },
    {
      id: "toggle-sound",
      title: "Toggle Web Audio Sound Effects",
      category: "Settings",
      icon: Volume2,
      action: () => {
        const next = !sound.isEnabled();
        sound.setEnabled(next);
        if (next) sound.playTudumChord(true);
        showToast(next ? "Audio Effects ON" : "Audio Effects OFF");
      }
    },
    {
      id: "toggle-cinema",
      title: "Toggle Cinema Mode (Max Width & Minimal Chrome)",
      category: "Settings",
      icon: Film,
      action: () => {
        document.body.classList.toggle("cinema-mode");
        showToast("Cinema mode toggled");
      }
    }
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200 select-none"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#181818] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-white/10 py-3.5 bg-[#141414]">
          <Search className="w-5 h-5 text-[#E50914] mr-3 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search... (e.g. 'linkedin', 'resume', 'quote')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
            aria-label="Close Command Palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No matching commands or actions found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playSelect();
                    item.action();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 group-hover:text-[#E50914] transition-colors flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-zinc-200 group-hover:text-white truncate">
                      {item.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 flex-shrink-0 ml-2">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-[#121212] border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
