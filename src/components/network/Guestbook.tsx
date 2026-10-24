"use client";

import { useState } from "react";
import { MessageSquare, Send, CheckCircle2, ShieldCheck, Heart, Sparkles, AlertCircle } from "lucide-react";
import { sound } from "@/lib/sound";
import { APPROVED_GUESTBOOK_ENTRIES, GuestbookEntry } from "@/data/guestbook";

const BANNED_WORDS = ["spam", "casino", "viagra", "crypto-giveaway", "free-money"];

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(APPROVED_GUESTBOOK_ENTRIES);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [note, setNote] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botcheck) return; // Honeypot spam check

    const noteLower = note.toLowerCase();
    if (BANNED_WORDS.some((word) => noteLower.includes(word))) {
      setError("Note contains prohibited phrases or advertising.");
      return;
    }

    if (note.trim().length < 5) {
      setError("Please write at least 5 characters.");
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
          email: "guestbook-visitor@prajwal.portfolio",
          purpose: "guestbook",
          message: `
[GUESTBOOK NOTE FOR MODERATION]
Author: ${name}
Handle/Context: ${handle || "None provided"}
Note:
"${note}"
          `.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
      sound.playTudumChord(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to post note";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
            Community Board
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            WALL OF WISHES & GUESTBOOK
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Leave a note, share a thought, or send good vibes. Submissions are moderated to prevent spam before joining the wall.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Approved Wall of Wishes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>Verified Community Messages ({entries.length})</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Moderated & Approved</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-[#181818] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
              >
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic">
                  &ldquo;{entry.note}&rdquo;
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full ${entry.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}
                    >
                      {entry.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white leading-none">
                        {entry.name}
                      </div>
                      {entry.handle && (
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {entry.handle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500">{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sign the Guestbook Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-[#E50914]" />
            <h3 className="font-bebas text-2xl text-white tracking-wide">
              SIGN THE WALL
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mb-5">
            Leave a supportive message for Prajwal. It will be emailed for moderation and published to the wall.
          </p>

          {!submitted ? (
            <form onSubmit={handleSign} className="space-y-3.5">
              {/* Honeypot field for bot spam */}
              <input
                type="text"
                value={botcheck}
                onChange={(e) => setBotcheck(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="gb-name" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Your Name *
                </label>
                <input
                  id="gb-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sahil / Priya"
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label htmlFor="gb-handle" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Context / Handle (Optional)
                </label>
                <input
                  id="gb-handle"
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="e.g. @sahil_dev or Tech Enthusiast"
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label htmlFor="gb-note" className="block text-xs font-semibold uppercase text-zinc-400 mb-1">
                  Your Note (Max 280 chars) *
                </label>
                <textarea
                  id="gb-note"
                  rows={3}
                  required
                  maxLength={280}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Keep crushing it! Loved the 3D portfolio and PlaceWise fairness audit..."
                  className="w-full px-3.5 py-2 bg-black/60 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
                <div className="text-[10px] text-zinc-500 text-right mt-0.5">
                  {note.length} / 280
                </div>
              </div>

              {error && <div className="text-xs text-rose-400 font-semibold">{error}</div>}

              <button
                type="submit"
                disabled={loading || !name || !note}
                className="w-full py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Note to Wall</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-5 rounded-xl bg-black/50 border border-emerald-500/30 text-center animate-in zoom-in duration-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bebas text-xl text-white">Note Submitted for Review!</h4>
              <p className="text-xs text-zinc-300 mt-1">
                Thanks, {name}! Your wish was dispatched to Prajwal&apos;s moderation queue and will appear after anti-spam confirmation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setNote("");
                }}
                className="mt-4 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white"
              >
                Post Another Note
              </button>
            </div>
          )}

          {/* Optional Newsletter Subscription Block */}
          {newsletterUrl && (
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="text-xs font-semibold text-white mb-1">
                Subscribe to &ldquo;Thoughts&rdquo; Dispatch
              </div>
              <p className="text-[11px] text-zinc-400 mb-3">
                Occasional engineering insights on AI fairness and distributed systems.
              </p>
              <a
                href={newsletterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Subscribe via Buttondown
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
