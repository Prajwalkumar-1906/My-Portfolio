"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/sound";

interface TestimonialSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialSubmitModal({ isOpen, onClose }: TestimonialSubmitModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError("Please check the consent box to permit display after moderation.");
      return;
    }
    setLoading(true);
    setError(null);
    sound.playSelect();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          purpose: "testimonial",
          message: `
[TESTIMONIAL SUBMISSION FOR REVIEW]
Name: ${name}
Role: ${role}
Organization/University: ${org}
Contact Email: ${email}
Consent Given: ${consent ? "Yes" : "No"}
Testimonial Text:
"${text}"
          `.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit testimonial");
      }

      setSubmitted(true);
      sound.playTudumChord(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Submit a Testimonial"
      className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#181818] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF6A00] uppercase tracking-wider mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Attendee & Organizer Feedback</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
              SUBMIT A TESTIMONIAL
            </h3>
            <p className="text-xs text-zinc-400">
              Share your feedback from a recent workshop, keynote, or mentoring session. Submissions are reviewed by Prajwal prior to display.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="ts-name" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                Your Full Name *
              </label>
              <input
                id="ts-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Rajesh Kumar"
                className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6A00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ts-role" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Your Role / Designation *
                </label>
                <input
                  id="ts-role"
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. HOD / Conclave Lead / Student"
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label htmlFor="ts-org" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Institution / Organization *
                </label>
                <input
                  id="ts-org"
                  type="text"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="e.g. RRCE / Tech Conclave"
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ts-email" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                Email Address (For Verification Only) *
              </label>
              <input
                id="ts-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@institution.edu"
                className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6A00]"
              />
            </div>

            <div>
              <label htmlFor="ts-text" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                Your Testimonial / Feedback *
              </label>
              <textarea
                id="ts-text"
                rows={4}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience regarding Prajwal's delivery, audience engagement, clarity of technical concepts, or workshop impact..."
                className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#FF6A00]"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="consent-check"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#FF6A00]"
              />
              <label htmlFor="consent-check" className="text-[11px] text-zinc-400 leading-tight">
                I confirm this feedback is genuine and grant permission for it to be featured on Prajwalkumar Madiwal&apos;s verified portfolio following review.
              </label>
            </div>

            {error && <div className="text-xs text-rose-400 font-semibold">{error}</div>}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading || !name || !text || !consent}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF6A00] hover:bg-[#e05e00] text-black font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="my-6 p-6 rounded-xl bg-black/50 border border-emerald-500/30 text-center animate-in zoom-in duration-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="font-bebas text-2xl text-white tracking-wide">
              TESTIMONIAL TRANSMITTED!
            </h4>
            <p className="text-xs text-zinc-300 mt-1 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Your feedback has been sent directly to Prajwalkumar at <code className="text-zinc-200">pkm.digi@gmail.com</code> for editorial verification and publication.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
