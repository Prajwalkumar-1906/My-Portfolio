"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { SERVICES, SPEAKING_VENUES } from "@/data/services";
import { sound } from "@/lib/sound";

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    phone: "",
    sessionTypes: [] as string[],
    audienceSize: "50 - 150 Attendees",
    eventDate: "",
    venueCity: "",
    mode: "In-Person",
    travelNeeded: "Yes",
    budgetRange: "To be discussed based on requirements",
    message: "",
    botcheck: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");

  const toggleSessionType = (title: string) => {
    sound.playSelect();
    setFormData((prev) => {
      const exists = prev.sessionTypes.includes(title);
      return {
        ...prev,
        sessionTypes: exists
          ? prev.sessionTypes.filter((t) => t !== title)
          : [...prev.sessionTypes, title]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();
    if (formData.sessionTypes.length === 0) {
      setStatus("error");
      setErrorMsg("Please select at least one session type or topic.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const fullMessage = `
--- SESSION BOOKING QUOTE REQUEST ---
Organization: ${formData.organization}
Organizer Role: ${formData.role}
Session Types: ${formData.sessionTypes.join(", ")}
Target Audience Size: ${formData.audienceSize}
Target Event Date/Time: ${formData.eventDate || "Flexible / TBD"}
Venue / City: ${formData.venueCity}
Delivery Mode: ${formData.mode}
Travel & Lodging Required: ${formData.travelNeeded}
Budget Range: ${formData.budgetRange}

Additional Notes:
${formData.message || "None provided"}
    `.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: "Speaker / Training Booking",
          subject: `[Portfolio: Booking] Quote Request from ${formData.organization} (${formData.name})`,
          message: fullMessage,
          botcheck: formData.botcheck
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to submit booking inquiry.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please email directly at pkm.digi@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative select-none">
      <div className="mb-8">
        <span className="px-2.5 py-0.5 rounded bg-[#FF6A00] text-black text-[10px] font-bold uppercase tracking-wider">
          Stage & Training Inquiries
        </span>
        <h3 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mt-2">
          Request a Custom Session Quote
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
          Fees are per session and vary by location, audience size, and travel. Fill out your event details below to receive a customized quote and availability confirmation within 24 hours.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 rounded-xl bg-amber-950/40 border border-[#FF6A00]/50 text-center animate-in fade-in duration-300">
          <CheckCircle2 className="w-14 h-14 text-[#FF6A00] mx-auto mb-3" />
          <h4 className="font-bebas text-3xl text-white tracking-wide">Quote Request Received!</h4>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-2 max-w-lg mx-auto">
            Thank you, {formData.name}. Prajwal has received your session specifications for {formData.organization} and will contact you directly at {formData.email}.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 px-6 py-2 rounded-lg bg-[#FF6A00] text-black font-bold text-xs uppercase"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot */}
          <input
            type="text"
            className="hidden"
            value={formData.botcheck}
            onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
          />

          {/* Section 1: Contact & Org */}
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">
              1. Organizer Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Prof. Arvind Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Organization / College *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. RV College of Engineering"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Your Role / Designation *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Placement Officer / HOD"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Official Email *</label>
                <input
                  required
                  type="email"
                  placeholder="arvind@rvce.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Phone / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98450 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Session Multi-select */}
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
              2. Select Session Topics / Formats (Multi-select) *
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICES.map((s) => {
                const selected = formData.sessionTypes.includes(s.title);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSessionType(s.title)}
                    className={`p-2.5 rounded-lg text-left text-xs transition-colors border ${
                      selected
                        ? "bg-[#E50914] text-white border-white font-semibold shadow-md"
                        : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <div className="line-clamp-1">{s.title}</div>
                    <div className="text-[10px] opacity-75">{s.format.split('/')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Logistics */}
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">
              3. Event Scope & Logistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Audience Size</label>
                <select
                  value={formData.audienceSize}
                  onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                >
                  <option value="Under 50 Attendees">Under 50 Attendees</option>
                  <option value="50 - 150 Attendees">50 - 150 Attendees</option>
                  <option value="150 - 300 Attendees">150 - 300 Attendees</option>
                  <option value="300 - 600+ Attendees">300 - 600+ Attendees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Target Date & Time</label>
                <input
                  type="text"
                  placeholder="e.g. Mid Nov 2026 / Dec 5th"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Venue / City *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Bengaluru, Karnataka"
                  value={formData.venueCity}
                  onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                >
                  <option value="In-Person (On Campus/Stage)">In-Person (On Campus/Stage)</option>
                  <option value="Virtual / Webinar (Zoom/Teams)">Virtual / Webinar (Zoom/Teams)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Travel Required?</label>
                <select
                  value={formData.travelNeeded}
                  onChange={(e) => setFormData({ ...formData, travelNeeded: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                >
                  <option value="No (Local Bengaluru)">No (Local Bengaluru)</option>
                  <option value="Yes (Within Karnataka)">Yes (Within Karnataka)</option>
                  <option value="Yes (Pan-India Travel)">Yes (Pan-India Travel)</option>
                  <option value="Not Applicable (Virtual)">Not Applicable (Virtual)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Budget Range (Optional)</label>
                <input
                  type="text"
                  placeholder="Institutional budget range"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-xs focus:border-[#FF6A00] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Special Requirements / Message</label>
            <textarea
              rows={3}
              placeholder="Any specific goals, target branches (CSE/ECE/MBA), or workshop prerequisites..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-[#FF6A00] focus:outline-none resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-700/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-none" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#E50914] hover:from-[#f45c00] hover:to-[#d00711] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? "Submitting Booking Dispatch..." : "Request Stage & Session Quote"}
          </button>
        </form>
      )}
    </div>
  );
}
