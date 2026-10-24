"use client";

import { useState } from "react";
import {
  Mic,
  Users,
  Calendar,
  MapPin,
  Mail,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  Plane,
  Building,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { sound } from "@/lib/sound";
import { SERVICES } from "@/data/services";

interface QuoteWizardData {
  sessionType: string;
  customTopic?: string;
  audienceType: string;
  audienceSize: string;
  eventDate: string;
  city: string;
  institution: string;
  deliveryMode: "in_person_bengaluru" | "in_person_outstation" | "virtual";
  travelProvided: boolean;
  name: string;
  email: string;
  phone: string;
  additionalNotes: string;
}

const INITIAL_DATA: QuoteWizardData = {
  sessionType: "Hands-on Generative AI & Prompt Engineering Masterclass",
  audienceType: "Engineering Students (B.E. / B.Tech)",
  audienceSize: "100 - 200 participants",
  eventDate: "",
  city: "Bengaluru",
  institution: "",
  deliveryMode: "in_person_bengaluru",
  travelProvided: true,
  name: "",
  email: "",
  phone: "",
  additionalNotes: ""
};

const STEPS = [
  { id: 1, label: "Session Type", icon: Mic },
  { id: 2, label: "Audience", icon: Users },
  { id: 3, label: "Date & Location", icon: Calendar },
  { id: 4, label: "Logistics", icon: Plane },
  { id: 5, label: "Organizer Contact", icon: Mail },
  { id: 6, label: "Review & Quote", icon: CheckCircle }
];

export function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteWizardData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calLink = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_LINK;

  const nextStep = () => {
    sound.playSelect();
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    sound.playSelect();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    sound.playSelect();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          purpose: "quote",
          message: `
[SESSION QUOTE REQUEST]
Session Type: ${formData.sessionType}
Institution / Org: ${formData.institution}
Audience: ${formData.audienceType} (${formData.audienceSize})
Date & City: ${formData.eventDate || "Flexible"} in ${formData.city}
Delivery Mode: ${formData.deliveryMode}
Travel Covered: ${formData.travelProvided ? "Yes" : "No"}
Phone/WhatsApp: ${formData.phone || "Not provided"}
Additional Notes: ${formData.additionalNotes || "None"}
          `.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request");
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
    <div className="p-6 sm:p-10 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Ambient Radial Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6A00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-[#FF6A00]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-widest">
              Stage & Workshop Booking
            </span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            REQUEST A CUSTOM SESSION QUOTE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Transparent pricing based on format, location, audience scale, and travel. An automated confirmation and quote will be routed directly to your inbox.
          </p>
        </div>

        {/* Optional Calendly link */}
        {calLink && (
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
          >
            <span>Schedule 15-min Call</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FF6A00]" />
          </a>
        )}
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-8">
          {/* Progress Indicator Steps */}
          <div className="hidden sm:flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.id;
              const isCompleted = currentStep > s.id;
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 text-xs font-medium ${
                    isCurrent
                      ? "text-[#FF6A00] font-bold"
                      : isCompleted
                      ? "text-zinc-300"
                      : "text-zinc-600"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono ${
                      isCurrent
                        ? "bg-[#FF6A00] text-black font-bold"
                        : isCompleted
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-zinc-600"
                    }`}
                  >
                    {isCompleted ? "✓" : s.id}
                  </div>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Mobile Step Header */}
          <div className="sm:hidden mb-6 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>Step {currentStep} of 6: {STEPS[currentStep - 1].label}</span>
            <span>{Math.round(((currentStep - 1) / 5) * 100)}%</span>
          </div>

          {/* Step 1: Session Type */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Select Session Format & Topic:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SERVICES.map((serv) => (
                  <button
                    type="button"
                    key={serv.id}
                    onClick={() => {
                      sound.playSelect();
                      setFormData({ ...formData, sessionType: serv.title });
                    }}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.sessionType === serv.title
                        ? "bg-[#FF6A00]/15 border-[#FF6A00] text-white"
                        : "bg-white/5 border-white/10 hover:border-white/20 text-zinc-300"
                    }`}
                  >
                    <div>
                      <div className="font-bebas text-lg tracking-wide text-white">
                        {serv.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                        {serv.shortDesc}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#FF6A00]">
                      <span>{serv.duration}</span>
                      <span>{serv.format}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Who will be in the audience?
              </h3>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">
                  Audience Profile:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Engineering & Computer Science Students",
                    "College-Wide Student Body (All Branches)",
                    "Faculty & Academic Leadership",
                    "Corporate Conclave / Industry Engineers",
                    "Startup Founders & Community Members"
                  ].map((aud) => (
                    <button
                      type="button"
                      key={aud}
                      onClick={() => setFormData({ ...formData, audienceType: aud })}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        formData.audienceType === aud
                          ? "bg-[#FF6A00]/15 border-[#FF6A00] text-white"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-zinc-300"
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">
                  Estimated Audience Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Under 50 attendees", "50 - 150 attendees", "150 - 300 attendees", "300+ Mega Conclave"].map(
                    (size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData({ ...formData, audienceSize: size })}
                        className={`p-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                          formData.audienceSize === size
                            ? "bg-[#FF6A00]/20 border-[#FF6A00] text-white"
                            : "bg-white/5 border-white/10 text-zinc-400"
                        }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Date & Location */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Where & When is the event taking place?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qw-institution" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    Host Institution / College / Company Name *
                  </label>
                  <input
                    id="qw-institution"
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Rajarajeswari College of Engineering"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label htmlFor="qw-city" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    City / State *
                  </label>
                  <input
                    id="qw-city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="qw-date" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    Tentative Date or Target Month (Flexible)
                  </label>
                  <input
                    id="qw-date"
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="e.g. Mid November 2026 or Next Semester"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Logistics */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Delivery Mode & Travel Logistics:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMode: "in_person_bengaluru" })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.deliveryMode === "in_person_bengaluru"
                      ? "bg-[#FF6A00]/15 border-[#FF6A00] text-white"
                      : "bg-white/5 border-white/10 text-zinc-300"
                  }`}
                >
                  <div className="font-bebas text-lg text-white">In-Person (Bengaluru)</div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    On-campus visit anywhere within the greater Bengaluru tech corridor.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMode: "in_person_outstation" })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.deliveryMode === "in_person_outstation"
                      ? "bg-[#FF6A00]/15 border-[#FF6A00] text-white"
                      : "bg-white/5 border-white/10 text-zinc-300"
                  }`}
                >
                  <div className="font-bebas text-lg text-white">In-Person (Outstation)</div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Across India with travel & accommodation arrangement.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMode: "virtual" })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.deliveryMode === "virtual"
                      ? "bg-[#FF6A00]/15 border-[#FF6A00] text-white"
                      : "bg-white/5 border-white/10 text-zinc-300"
                  }`}
                >
                  <div className="font-bebas text-lg text-white">Virtual / Remote</div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    High-def interactive Zoom / Google Meet / Teams live masterclass.
                  </p>
                </button>
              </div>

              {formData.deliveryMode === "in_person_outstation" && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Host Provides Travel & Stay?</div>
                    <div className="text-[11px] text-zinc-400">Flight / Train tickets and campus guest house.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.travelProvided}
                    onChange={(e) => setFormData({ ...formData, travelProvided: e.target.checked })}
                    className="w-5 h-5 accent-[#FF6A00]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 5: Contact Info */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Organizer Contact Coordinates:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qw-name" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="qw-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Prof. Ramesh Rao / Ananya Sharma"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label htmlFor="qw-email" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    Official Email Address *
                  </label>
                  <input
                    id="qw-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@college.edu.in or org.com"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="qw-phone" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                    Phone / WhatsApp Number (For Fast Coordination)
                  </label>
                  <input
                    id="qw-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base font-semibold text-white">
                Review Your Quote Request Summary:
              </h3>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 text-xs text-zinc-300">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Session Type:</span>
                  <span className="font-semibold text-white">{formData.sessionType}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Host Organization:</span>
                  <span className="font-semibold text-white">{formData.institution || "Specified in notes"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Audience:</span>
                  <span className="font-semibold text-white">{formData.audienceType} ({formData.audienceSize})</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Location & Date:</span>
                  <span className="font-semibold text-white">{formData.city} • {formData.eventDate || "Flexible"}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-zinc-500">Delivery Mode:</span>
                  <span className="font-semibold text-white uppercase">{formData.deliveryMode.replace(/_/g, " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Contact:</span>
                  <span className="font-semibold text-[#FF6A00]">{formData.name} ({formData.email})</span>
                </div>
              </div>

              <div>
                <label htmlFor="qw-notes" className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  Additional Notes or Specific Expectations:
                </label>
                <textarea
                  id="qw-notes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Any particular topics, student skill levels, or session objectives you want emphasized..."
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              {error && <div className="text-xs font-semibold text-rose-400">{error}</div>}
            </div>
          )}

          {/* Navigation Action Buttons */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF6A00] hover:bg-[#e05e00] text-black font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email}
                className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-xl tracking-wider uppercase transition-colors shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      ) : (
        /* Success Confirmation Card */
        <div className="my-8 p-8 rounded-2xl bg-black/50 border border-emerald-500/40 text-center animate-in zoom-in duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            QUOTE REQUEST DISPATCHED!
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto mt-2 leading-relaxed">
            Thank you, <strong className="text-white">{formData.name}</strong>. Your custom quote request for <strong className="text-[#FF6A00]">{formData.sessionType}</strong> has been transmitted directly to Prajwalkumar at <code className="text-zinc-200">pkm.digi@gmail.com</code>.
          </p>

          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-zinc-400 text-left">
            <span className="font-semibold text-white">What happens next:</span> Prajwal will review the scheduling logistics for {formData.city} and reply with an official quote, syllabus deck, and speaker availability within 24 hours.
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData(INITIAL_DATA);
              }}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
