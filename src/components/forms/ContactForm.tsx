"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare, Phone, Calendar, Copy, Check, Sparkles } from "lucide-react";
import { Linkedin } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";
import { sound } from "@/lib/sound";

interface ContactFormProps {
  defaultPurpose?: string;
  prefillMessage?: string;
  className?: string;
}

interface LastSentMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  timestamp: string;
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
  const [lastSent, setLastSent] = useState<LastSentMessage | null>(null);
  const [copied, setCopied] = useState(false);

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

    const currentMsgData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      purpose: formData.purpose,
      message: formData.message.trim(),
      botcheck: formData.botcheck
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentMsgData,
          subject: `[Portfolio: ${currentMsgData.purpose}] Direct Message from ${currentMsgData.name}`
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sound.playTudumChord(true);
        const record: LastSentMessage = {
          id: data.messageId || `MSG-${Date.now().toString().slice(-6).toUpperCase()}`,
          name: currentMsgData.name,
          email: currentMsgData.email,
          phone: currentMsgData.phone,
          purpose: currentMsgData.purpose,
          message: currentMsgData.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setLastSent(record);
        setStatus("success");

        // Save to browser history so visitor can review what they sent
        try {
          const existing = JSON.parse(localStorage.getItem("prajwal_sent_messages") || "[]");
          existing.unshift(record);
          localStorage.setItem("prajwal_sent_messages", JSON.stringify(existing.slice(0, 10)));
        } catch {
          // ignore localStorage err
        }

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
        setErrorMessage(data.message || "Could not process message. Please click the direct email link below.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. You can click 'pkm.digi@gmail.com' below to send directly via your email client.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!lastSent) return;
    sound.playSelect();
    const text = `From: ${lastSent.name} (${lastSent.email})\nPurpose: ${lastSent.purpose}\nMessage: ${lastSent.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSubject = encodeURIComponent(`[Portfolio: ${lastSent?.purpose || formData.purpose}] Direct Message from ${lastSent?.name || formData.name || "Visitor"}`);
  const emailBody = encodeURIComponent(`Hi Prajwal,\n\n${lastSent?.message || formData.message}\n\n---\nFrom: ${lastSent?.name || formData.name}\nEmail: ${lastSent?.email || formData.email}\nPhone: ${lastSent?.phone || formData.phone || "N/A"}`);
  const mailtoLink = `mailto:${PROFILE.email}?subject=${emailSubject}&body=${emailBody}`;

  const whatsappText = encodeURIComponent(`Hi Prajwal, I'm reaching out directly from your portfolio.\nName: ${lastSent?.name || formData.name}\nPurpose: ${lastSent?.purpose || formData.purpose}\nMessage: ${lastSent?.message || formData.message}`);
  const whatsappLink = `https://wa.me/?text=${whatsappText}`;

  return (
    <div className={`bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative select-none ${className}`}>
      {/* Red ambient highlight */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#E50914]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Direct On-Site Messaging: Active
            </span>
          </div>
          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            Direct Line to Prajwal
          </h3>
          <p className="text-xs text-zinc-400">
            Messages are captured directly on the website and dispatched to <span className="text-zinc-200 font-mono">pkm.digi@gmail.com</span>.
          </p>
        </div>

        <a
          href={mailtoLink}
          onClick={() => sound.playSelect()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors self-start sm:self-auto"
          title="Open in your default email client"
        >
          <Mail className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Direct Email App</span>
        </a>
      </div>

      {status === 'success' && lastSent ? (
        <div className="p-6 rounded-xl bg-gradient-to-b from-emerald-950/60 to-[#121212] border border-emerald-600/40 text-left animate-in fade-in duration-300 space-y-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-2">
                  <span>Message Sent Successfully!</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </h4>
                <p className="text-xs text-emerald-300">
                  Logged directly on website • Dispatch ID: <strong className="font-mono text-white">{lastSent.id}</strong> ({lastSent.timestamp})
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-400">
              <span>From: <strong className="text-white font-medium">{lastSent.name}</strong> ({lastSent.email})</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] uppercase font-bold">
                {lastSent.purpose}
              </span>
            </div>
            {lastSent.phone && (
              <div className="text-zinc-400 text-[11px]">
                Phone / WhatsApp: <span className="text-zinc-200">{lastSent.phone}</span>
              </div>
            )}
            <div className="pt-2 border-t border-white/5 text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap">
              &ldquo;{lastSent.message}&rdquo;
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Prajwal has received this direct message. For instant backup or to start an email thread, you can also trigger 1-click actions:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={mailtoLink}
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white text-xs font-semibold transition-colors shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Open Pre-filled in Email Client</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Details"}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Expected Response: Within 24 hours
            </span>
            <button
              onClick={() => {
                setStatus('idle');
                setLastSent(null);
              }}
              className="text-xs text-zinc-300 hover:text-white transition-colors underline"
            >
              Send Another Direct Message
            </button>
          </div>
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
                Phone / WhatsApp (Optional)
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Message *
              </label>
              <span className="text-[10px] text-zinc-500">
                {formData.message.length} characters
              </span>
            </div>
            <textarea
              required
              rows={4}
              placeholder="Tell Prajwal about the opportunity, stage date, project idea, or direct note..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#121212] border border-white/10 text-white placeholder-zinc-500 text-sm focus:border-[#E50914] focus:outline-none resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-700/50 text-red-300 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-none" />
                <span>{errorMessage}</span>
              </div>
              <a
                href={mailtoLink}
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold underline text-[11px]"
              >
                Open in Email
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#E50914] hover:bg-[#b20710] disabled:opacity-50 text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {loading ? (
              <span>Transmitting Direct Message...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Direct Message to Prajwal</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Fast Connect Channels */}
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
          <span>Message on LinkedIn (8K+)</span>
        </a>

        <span className="text-[11px] text-zinc-500">
          Response time: &lt; 24 Hours
        </span>
      </div>
    </div>
  );
}
