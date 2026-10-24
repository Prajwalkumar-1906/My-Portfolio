"use client";

import { useState, useEffect, useRef } from "react";
import { X, Copy, Check, Share2, Download, MessageSquare, ExternalLink } from "lucide-react";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import { downloadVCard } from "@/lib/vcard";
import { sound } from "@/lib/sound";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const portfolioUrl = typeof window !== "undefined" ? window.location.origin : "https://prajwalkumar-madiwal.vercel.app";
  const shareText = "Explore Prajwalkumar Madiwal's world-class Netflix-style 3D interactive portfolio — AI/ML, Full-Stack & Keynotes:";

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator) {
      setHasNativeShare(true);
    }
  }, []);

  // Draw clean high-contrast visual QR code on canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use standard QR generator image onto canvas so it's downloadable as PNG
    const qrImg = new window.Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(portfolioUrl)}&color=E50914&bgcolor=141414&margin=1`;
    qrImg.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      ctx.drawImage(qrImg, 0, 0, 300, 300);
    };
  }, [isOpen, portfolioUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    sound.playSelect();
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    sound.playSelect();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Prajwalkumar Madiwal | Interactive Portfolio",
          text: shareText,
          url: portfolioUrl,
        });
      } catch {
        // User cancelled share
      }
    }
  };

  const handleDownloadQr = () => {
    sound.playSelect();
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "Prajwalkumar_Portfolio_QR.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + portfolioUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`;
  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(portfolioUrl)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share My Profile"
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white">
              SHARE MY PROFILE
            </h2>
            <p className="text-xs text-zinc-400">
              Share Prajwalkumar&apos;s dossier, stream or download vCard
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code & Direct Actions */}
        <div className="my-6 flex flex-col sm:flex-row items-center gap-6">
          {/* Visual QR Canvas */}
          <div className="flex flex-col items-center">
            <div className="p-2.5 rounded-xl bg-[#141414] border border-white/15 shadow-inner">
              <canvas
                ref={qrCanvasRef}
                width={160}
                height={160}
                className="w-36 h-36 rounded-lg block"
              />
            </div>
            <button
              onClick={handleDownloadQr}
              className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-300 hover:text-[#E50914] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download QR (PNG)</span>
            </button>
          </div>

          {/* Social Share Intents */}
          <div className="flex-1 w-full flex flex-col gap-2.5">
            {hasNativeShare && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-semibold text-sm transition-colors shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via Device Menu</span>
              </button>
            )}

            <div className="grid grid-cols-3 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 border border-[#0077b5]/30 text-[#0077b5] transition-colors text-xs font-medium"
              >
                <BrandIcons.Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 text-zinc-300 transition-colors text-xs font-medium"
              >
                <BrandIcons.XIcon className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                downloadVCard();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>Save Contact Card (.vcf)</span>
            </button>
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={portfolioUrl}
            className="flex-1 px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-zinc-300 font-mono focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs tracking-wider transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
