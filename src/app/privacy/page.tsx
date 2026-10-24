import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, Cookie, EyeOff, CheckCircle, Volume2 } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Privacy & Data Ethics | Prajwalkumar Madiwal",
  description: "Privacy policy, data security standards, and ethical AI commitments for Prajwalkumar Madiwal's portfolio."
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#E50914]" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
            <Shield className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E50914]">
            Privacy & Transparency
          </span>
        </div>

        <h1 className="font-bebas text-4xl sm:text-6xl tracking-wide text-zinc-100 mb-6">
          PRIVACY POLICY & DATA INTEGRITY
        </h1>

        <div className="space-y-8 text-zinc-300 text-sm leading-relaxed">
          <section className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <EyeOff className="w-5 h-5 text-emerald-400" />
              1. Zero Third-Party Tracking Cookies
            </h2>
            <p className="text-zinc-400">
              This portfolio respects your digital autonomy. We do not use third-party tracking pixels (such as Facebook Pixel, Google AdSense, or invasive surveillance scripts). We measure aggregate traffic strictly using privacy-friendly, cookieless analytics that do not track visitors across websites or store personally identifiable fingerprints.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Cookie className="w-5 h-5 text-amber-400" />
              2. Local Storage & Session Data
            </h2>
            <p className="text-zinc-400 mb-3">
              We use standard browser <code className="text-zinc-200 bg-black/40 px-1.5 py-0.5 rounded">localStorage</code> and <code className="text-zinc-200 bg-black/40 px-1.5 py-0.5 rounded">sessionStorage</code> purely to remember your interactive preferences during your visit:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong className="text-zinc-200">Audio Preference:</strong> Mute/unmute toggle state.</li>
              <li><strong className="text-zinc-200">Selected Profile:</strong> Recruiter, Just Browsing, Book a Session, or Networker.</li>
              <li><strong className="text-zinc-200">My List (Shortlist):</strong> Projects or achievements you bookmark to review or export.</li>
              <li><strong className="text-zinc-200">Gate State:</strong> Remembering whether you have passed the Welcome Gate so your navigation is smooth.</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-blue-400" />
              3. Communication & Form Submissions
            </h2>
            <p className="text-zinc-400 mb-3">
              When you submit a contact inquiry, request a quote, or leave a guestbook note:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li>Your message is encrypted in transit via HTTPS and routed directly to Prajwalkumar&apos;s verified inbox (<code className="text-zinc-200 bg-black/40 px-1.5 py-0.5 rounded">pkm.digi@gmail.com</code>).</li>
              <li>Your contact information is never sold, leased, or shared with third-party data brokers.</li>
              <li>Guestbook submissions undergo spam protection and manual review prior to publication.</li>
            </ul>
          </section>

          <section className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-[#E50914]" />
              4. Honest Grounding & No-Fabrication Commitment
            </h2>
            <p className="text-zinc-400">
              All credentials, metrics, workshop participant figures, and academic achievements showcased on this portfolio reflect verified facts from Prajwalkumar Madiwal&apos;s academic career at Rajarajeswari College of Engineering (RRCE) and engineering internship at ABB. AI assistants on this platform are strictly grounded to avoid hallucination or manufactured claims.
            </p>
          </section>

          <section className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Volume2 className="w-5 h-5 text-[#FF6A00]" />
              5. Ethical AI Voice & Cloned Assistant Disclosure
            </h2>
            <p className="text-zinc-400 mb-2">
              The portfolio chatbot incorporates a synthetic female AI voice for &ldquo;Srushti&rdquo; (Prajwal&apos;s digital copilot), synthesized via ethical server-side text-to-speech with daily usage budgets and rate limits:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-400 text-xs">
              <li><strong className="text-zinc-200">Synthetic Voice Identification:</strong> Visitors are clearly notified that spoken replies originate from a synthetic AI voice model and not a live human representative.</li>
              <li><strong className="text-zinc-200">Strict Non-Impersonation:</strong> The voice assistant will never claim to be a live person, negotiate deals, or agree to binding agreements.</li>
              <li><strong className="text-zinc-200">Audio Privacy:</strong> Voice queries spoken through the microphone are processed locally in your browser via the Web Speech API; no visitor voice recordings are stored or saved on our servers.</li>
              <li><strong className="text-zinc-200">Official Inquiries:</strong> Any contractual, recruitment, or speaking decisions require written communication directly with Prajwalkumar Madiwal at <code className="text-zinc-200 bg-black/40 px-1.5 py-0.5 rounded">pkm.digi@gmail.com</code>.</li>
            </ul>
          </section>

          <div className="pt-4 text-xs text-zinc-500 border-t border-white/5">
            Last Updated: October 2026 • Direct inquiries: <a href="mailto:pkm.digi@gmail.com" className="text-[#E50914] underline">pkm.digi@gmail.com</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
