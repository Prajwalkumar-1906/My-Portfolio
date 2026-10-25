"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Bookmark,
  Volume2,
  VolumeX,
  Film,
  ChevronDown,
  Briefcase,
  Compass,
  Mic,
  Users,
  Share2,
  Download,
  Languages
} from "lucide-react";
import { sound } from "@/lib/sound";
import { PROFILES } from "./ProfileSelector";
import { PROFILE } from "@/data/profile";
import { ShareModal } from "@/components/modals/ShareModal";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { Language, TRANSLATIONS } from "@/lib/i18n";
import { CinematicLogo } from "./CinematicLogo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(() => (typeof window !== "undefined" ? sound.isEnabled() : true));
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [shortlistCount, setShortlistCount] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const updateShortlist = () => {
      if (typeof window !== "undefined") {
        const list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
        setShortlistCount(list.length);
        const storedLang = (localStorage.getItem("pkm_lang") as Language) || "en";
        setLang(storedLang);
      }
    };

    updateShortlist();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", updateShortlist);
    window.addEventListener("shortlist-updated", updateShortlist);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateShortlist);
      window.removeEventListener("shortlist-updated", updateShortlist);
    };
  }, []);

  const toggleSound = () => {
    const next = !isSoundOn;
    setIsSoundOn(next);
    sound.setEnabled(next);
    if (next) sound.playTudumChord(true);
  };

  const toggleCinemaMode = () => {
    const next = !isCinemaMode;
    setIsCinemaMode(next);
    document.body.classList.toggle("cinema-mode", next);
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setLangDropdownOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("pkm_lang", newLang);
      window.dispatchEvent(new Event("language-changed"));
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navLinks = [
    { name: t.nav.recruiter, href: "/recruiter", icon: Briefcase },
    { name: t.nav.browse, href: "/browse", icon: Compass },
    { name: t.nav.sessions, href: "/sessions", icon: Mic },
    { name: t.nav.network, href: "/network", icon: Users },
    { name: t.nav.contact, href: "/contact", icon: null }
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none ${
          scrolled
            ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-white/5"
            : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Wordmark & Primary Links */}
          <div className="flex items-center gap-5 lg:gap-8">
            <CinematicLogo size="sm" />

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      if (!isActive) sound.playTudumChord();
                      else sound.playSelect();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`text-sm tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? "text-white font-bold"
                        : "text-zinc-400 hover:text-zinc-100 font-medium"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#E50914] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: "Now Playing" Interactive Status Pill (Desktop only) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E50914]" />
            </span>
            <span className="font-semibold text-white">NOW:</span>
            <span className="text-zinc-300">{PROFILE.nowPlaying.role}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 truncate max-w-[200px]">{PROFILE.nowPlaying.focus}</span>
          </div>

          {/* Right: Actions (Language, Share, Search, Cinema, Sound, Profiles) */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                title="Switch Language (EN / HI / KN)"
                aria-label="Switch UI Language"
              >
                <Languages className="w-3.5 h-3.5 text-zinc-400" />
                <span className="uppercase">{lang}</span>
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-[#181818] border border-white/10 rounded-lg shadow-xl py-1 z-50 text-xs animate-in fade-in duration-150"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleLangChange("en")}
                    className={`w-full text-left px-3 py-1.5 hover:bg-white/10 flex items-center justify-between ${
                      lang === "en" ? "text-[#E50914] font-bold" : "text-zinc-300"
                    }`}
                  >
                    <span>English</span>
                    {lang === "en" && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => handleLangChange("hi")}
                    className={`w-full text-left px-3 py-1.5 hover:bg-white/10 flex items-center justify-between ${
                      lang === "hi" ? "text-[#E50914] font-bold" : "text-zinc-300"
                    }`}
                  >
                    <span>हिन्दी</span>
                    {lang === "hi" && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => handleLangChange("kn")}
                    className={`w-full text-left px-3 py-1.5 hover:bg-white/10 flex items-center justify-between ${
                      lang === "kn" ? "text-[#E50914] font-bold" : "text-zinc-300"
                    }`}
                  >
                    <span>ಕನ್ನಡ</span>
                    {lang === "kn" && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Share Profile Trigger */}
            <button
              onClick={() => {
                sound.playSelect();
                setShareModalOpen(true);
              }}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Share My Profile"
              aria-label="Share My Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Search / Command Palette (Ctrl+K) */}
            <button
              onClick={() => {
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                );
              }}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Search & Quick Actions (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isSoundOn ? "Sound Effects ON" : "Sound Effects OFF"}
              aria-label="Toggle Sound"
            >
              {isSoundOn ? (
                <Volume2 className="w-4 h-4 text-[#E50914]" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
            </button>

            {/* Cinema Mode Toggle */}
            <button
              onClick={toggleCinemaMode}
              className={`p-2 rounded-full transition-colors hidden sm:block ${
                isCinemaMode
                  ? "bg-[#E50914]/20 text-[#E50914]"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle Cinema Mode"
              aria-label="Toggle Cinema Mode"
            >
              <Film className="w-4 h-4" />
            </button>

            {/* My List / Shortlist Counter Badge */}
            <Link
              href="/recruiter#my-list"
              className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center"
              title="My Shortlist"
              aria-label="My List Shortlist"
              onClick={() => sound.playSelect()}
            >
              <Bookmark className="w-4 h-4" />
              {shortlistCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#E50914] text-white text-[10px] font-bold leading-none animate-pulse">
                  {shortlistCount}
                </span>
              )}
            </Link>

            {/* Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Profile Menu"
                aria-expanded={profileDropdownOpen}
              >
                <div className="relative w-8 h-8 rounded-md overflow-hidden border border-white/20">
                  <Image
                    src="/assets/webp/avatar_recruiter.webp"
                    alt="Prajwal Profile Avatar"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 bg-[#181818] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-sm animate-in fade-in duration-200"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="font-semibold text-white">Switch Profile</div>
                    <div className="text-xs text-zinc-400">Personalized Netflix experiences</div>
                  </div>

                  <div className="py-1">
                    {PROFILES.map((p) => (
                      <Link
                          key={p.id}
                          href={p.route}
                          onClick={() => sound.playSelect()}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-[#E50914]/15 hover:text-white text-zinc-300 transition-colors"
                        >
                          <div className="relative w-7 h-7 rounded overflow-hidden flex-shrink-0 border border-white/15">
                            <Image
                              src={p.avatar}
                              alt={p.name}
                              fill
                              sizes="28px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-xs text-white truncate">{p.name}</div>
                            <div className="text-[10px] text-zinc-400 truncate">{p.label}</div>
                          </div>
                        </Link>
                      ))}
                  </div>

                  {/* Connect & Socials Strip inside Dropdown */}
                  <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] font-semibold text-zinc-400">Connect:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={PROFILE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0077b5] transition-colors"
                        title="LinkedIn (8K+)"
                      >
                        <BrandIcons.Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={PROFILE.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <BrandIcons.Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={PROFILE.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-400 transition-colors"
                        title="Instagram"
                      >
                        <BrandIcons.Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={PROFILE.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-200 transition-colors"
                        title="X / Twitter"
                      >
                        <BrandIcons.XIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-1 mt-1">
                    <Link
                      href="/who"
                      className="block px-4 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Who&apos;s Watching? Selector Screen
                    </Link>
                    <a
                      href="/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E50914]" />
                      AIML & Full-Stack Resume
                    </a>
                    <a
                      href="/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#FF6A00]" />
                      Data Scientist & Business Resume
                    </a>
                    <a
                      href="/resumes/Prajwalkumar_Madiwal_Complete_Portfolio.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-1.5 text-xs text-[#E50914] font-semibold hover:bg-white/5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Complete Dossier (Both Tracks)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bar Links */}
        <div className="md:hidden flex items-center justify-around px-4 pt-2 pb-1 border-t border-white/5 bg-[#141414]/90 text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (!isActive) sound.playTudumChord();
                  else sound.playSelect();
                }}
                className={`py-1 ${
                  isActive ? "text-[#E50914] font-bold" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
}
