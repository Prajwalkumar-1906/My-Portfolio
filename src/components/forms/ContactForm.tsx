"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare, Phone, Calendar } from "lucide-react";
import { Linkedin } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import { sound } from "@/lib/sound";

interface ContactFormProps {
  defaultPurpose?: string;
  prefillMessage?: string;
  className?: string;
}

export function ContactForm({
  defaultPurpose = "Hiring",
  prefillMessage = "",
  className = ""
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: defaultPurpose,
    message: prefillMessage,
    botcheck: "" // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (prefillMessage) {
      setFormData((prev) => ({ ...prev, message: prefillMessage }));
    }
  }, [prefillMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `[Portfolio: ${formData.purpose}] Message from ${formData.name}`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: defaultPurpose,
          message: "",
          botcheck: ""
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to deliver message. Please use the direct email link below.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please send an email directly to pkm.digi@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative select-none ${className}`}>
      {/* Red ambient highlight */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#E50914]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="mb-6">
        <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
          Direct Line to Prajwal
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Delivers directly to <span className="text-zinc-200 font-mono">pkm.digi@gmail.com</span> with immediate notification.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-600/50 text-center animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h4 className="font-bebas text-2xl text-white tracking-wide">Message Delivered!</h4>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-md mx-auto">
            Thank you for reaching out. Prajwal has received your dispatch and will respond promptly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot anti-spam (visually hidden) */}
          <div className="hidden">
            <label htmlFor="botcheck">Do not fill this</label>
            <input
              type="text"
              id="botcheck"
              name="botcheck"
              value={formData.botcheck}
              onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#E50914] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Your Email *
              </label>
              <input
                required
                type="email"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#E50914] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#E50914] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Purpose of Contact *
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#E50914] focus:outline-none"
              >
                <option value="Hiring">Hiring / Full-Time Role</option>
                <option value="Session Booking">Keynote / Session Booking</option>
                <option value="Technical Workshop">GenAI / Tech Workshop</option>
                <option value="Collaboration">Project Collaboration</option>
                <option value="Resume Review">Resume Review / Mock Interview</option>
                <option value="General">Other / Say Hi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Message *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell Prajwal about the opportunity, stage date, or collaboration details..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#E50914] focus:outline-none resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-700/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-none" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#f40612] disabled:opacity-50 text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Transmitting Dispatch...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message Directly</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Alternative Fast Connect Links */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
        <a
          href={`mailto:${PROFILE.email}`}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Mail className="w-4 h-4 text-red-500" />
          <span>pkm.digi@gmail.com</span>
        </a>

        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors"
        >
          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
          <span>Message on LinkedIn</span>
        </a>

        <span className="text-[11px] text-zinc-500">
          Response time: &lt; 24 Hours
        </span>
      </div>
    </div>
  );
}
