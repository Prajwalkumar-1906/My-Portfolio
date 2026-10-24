"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mic,
  Download,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle,
  Clock,
  Users,
  Award,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Billboard } from "@/components/billboard/Billboard";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { SpeakerReelGallery } from "@/components/sessions/SpeakerReelGallery";
import { MediaKitSection } from "@/components/sessions/MediaKitSection";
import { TestimonialSubmitModal } from "@/components/forms/TestimonialSubmitModal";
import { DetailModal, ModalDetails } from "@/components/modals/DetailModal";
import { BrandIcons } from "@/components/ui/BrandIcons";

import { SERVICES, SPEAKING_VENUES, PROOF_METRICS, ServiceItem } from "@/data/services";
import { PROFILE } from "@/data/profile";
import { sound } from "@/lib/sound";

export default function SessionsPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      {/* Stage Billboard */}
      <Billboard
        title="Book Prajwal for Your Stage"
        subtitle="Keynote Talks, GenAI Hands-On Labs, Career Mastery & Executive Coaching"
        description="Inspiring, energetic, and rigorously technical sessions customized for universities, colleges, corporate conclaves, and tech hubs. From demystifying Generative AI to algorithmic interview perception, empower your learners with high-impact keynotes."
        badges={["Live Keynotes", "Hands-on Workshops", "Colleges & Corporates", "Pan-India & Global"]}
        playText="Request a Quote"
        onPlayClick={() => {
          document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMoreInfoClick={() => {
          document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" });
        }}
        extraActions={
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/resumes/Prajwalkumar_Madiwal_Speaker_Kit.pdf"
              download="Prajwalkumar_Madiwal_Speaker_Kit.pdf"
              onClick={() => sound.playSelect()}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FF6A00] hover:bg-[#e05e00] text-black font-bold text-sm shadow-xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Speaker Kit (PDF)</span>
            </a>

            {/* Fast Socials for Event Organizers */}
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-white/10 hover:bg-[#0077b5]/30 hover:text-white text-zinc-300 text-xs font-semibold transition-colors"
              title="LinkedIn (8K+ Followers)"
            >
              <BrandIcons.Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-3 rounded-lg bg-white/10 hover:bg-pink-500/30 hover:text-white text-zinc-300 text-xs font-semibold transition-colors"
              title="Instagram (@foreverprajwalkumar)"
            >
              <BrandIcons.Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
            </a>
          </div>
        }
      />

      {/* Proof of Stage & Workshop Impact Row */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider">
            Verified Traction
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            PROVEN AUDIENCE IMPACT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROOF_METRICS.map((proof, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#181818] border border-white/10 hover:border-[#FF6A00]/50 transition-colors shadow-lg"
            >
              <div className="font-bebas text-2xl sm:text-3xl text-white tracking-wide text-[#FF6A00]">
                {proof.title}
              </div>
              <div className="text-xs font-semibold text-zinc-300 mt-1">
                {proof.subtitle}
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                {proof.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Speaker Reel Gallery (Photo Grid with 3D Lightbox & Video Slots) */}
      <SpeakerReelGallery />

      {/* Where I Speak Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Stage Availability</span>
            </div>
            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
              Where Prajwal Speaks & Trains
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Available for pan-India campus visits and virtual international conferences.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-xl">
            {SPEAKING_VENUES.map((venue, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200 font-medium"
              >
                {venue}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Official Media Kit & Bios */}
      <MediaKitSection />

      {/* Services Collections (11 Service Cards) */}
      <section id="services-grid" className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider">
              Service Catalog
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mt-1">
              FEATURED SESSIONS & OFFERINGS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Click any collection card to inspect the format, duration, target audience, and learning outcomes.
            </p>
          </div>

          {/* Pricing Policy Box */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-[#FF6A00]/40 max-w-md">
            <div className="text-[11px] font-bold text-[#FF6A00] uppercase tracking-wider">
              Pricing Structure
            </div>
            <p className="text-xs text-zinc-300 mt-0.5 leading-snug">
              Fees are per session and vary by location, audience size, and travel. Transparent custom quotes provided upon request.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              onClick={() => {
                sound.playSelect();
                setSelectedService(serv);
              }}
              onMouseEnter={() => sound.playHover()}
              className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-[#FF6A00] hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px] font-bold uppercase tracking-wider">
                    {serv.category}
                  </span>
                  {serv.popular && (
                    <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-bold uppercase">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="font-bebas text-2xl text-white tracking-wide mt-3 group-hover:text-[#FF6A00] transition-colors">
                  {serv.title}
                </h3>

                <p className="text-xs text-zinc-300 mt-2 leading-relaxed line-clamp-3">
                  {serv.shortDesc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{serv.duration}</span>
                  </span>
                  <span className="font-medium text-white">{serv.format.split('/')[0]}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#FF6A00] font-semibold pt-1">
                  <span>View Details & Outcomes</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Honest Testimonials Section (Show no fake quotes, provide submission modal) */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#181818] border border-dashed border-white/20 text-center flex flex-col items-center">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 mb-3">
            <Award className="w-8 h-8 text-[#FF6A00]" />
          </div>
          <h3 className="font-bebas text-3xl sm:text-4xl text-zinc-100 tracking-wider">
            ATTENDEE & ORGANIZER TESTIMONIALS
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mt-2 leading-relaxed">
            In adherence to our strict zero-fabrication ethics, attendee feedback and organizer endorsements are published only after verified post-session review.
          </p>

          <button
            onClick={() => {
              sound.playSelect();
              setTestimonialModalOpen(true);
            }}
            className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-[#FF6A00] hover:text-black text-white font-bebas text-lg tracking-wider uppercase transition-colors border border-white/20 hover:border-transparent shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Submit a Testimonial / Feedback</span>
          </button>
        </div>
      </section>

      {/* Multi-Step Request a Quote Booking Wizard */}
      <section id="quote-section" className="px-4 sm:px-6 lg:px-12 py-16 max-w-5xl mx-auto">
        <QuoteWizard />
      </section>

      <Footer />

      {/* Testimonial Submission Modal */}
      <TestimonialSubmitModal
        isOpen={testimonialModalOpen}
        onClose={() => setTestimonialModalOpen(false)}
      />

      {/* Service Detail Modal */}
      {selectedService && (
        <DetailModal
          item={{
            id: selectedService.id,
            title: selectedService.title,
            subtitle: `${selectedService.category} &bull; ${selectedService.format}`,
            category: "SESSION COLLECTION",
            description: selectedService.shortDesc,
            keyFeatures: selectedService.outcomes,
            metrics: [
              `Duration: ${selectedService.duration}`,
              `Audience: ${selectedService.targetAudience}`,
              `Format: ${selectedService.format}`
            ]
          }}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
