import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Linkedin, Github } from "@/components/ui/BrandIcons";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact & Direct Messaging | Prajwalkumar Madiwal",
  description: "Send direct messages to Prajwalkumar Madiwal on the website or connect via email (pkm.digi@gmail.com), WhatsApp, and LinkedIn."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-20 select-none">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
            Contact & Inquiries
          </span>
          <h1 className="font-bebas text-5xl sm:text-7xl text-white tracking-wide mt-2">
            Get in Touch with Prajwal
          </h1>
          <p className="text-xs sm:text-base text-zinc-400 mt-2">
            Whether for hiring opportunities, keynote speaking, workshop bookings, or technical collaboration, I respond to all inquiries within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl space-y-6">
              <h2 className="font-bebas text-2xl text-white tracking-wide">
                Direct Communication Coordinates
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-[#E50914]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">Direct Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-white font-mono hover:text-[#E50914] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">Instant Chat / WhatsApp</div>
                    <a
                      href="https://wa.me/?text=Hi%20Prajwal,%20reaching%20out%20from%20your%20portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      Open Direct WhatsApp Conversation
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-[#0A66C2]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">LinkedIn Network</div>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#0A66C2] transition-colors"
                    >
                      linkedin.com/in/prajwalkumarm (8K+ Followers)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-zinc-200">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">GitHub Repositories</div>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#E50914] transition-colors"
                    >
                      github.com/Prajwalkumar-1906
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">Location</div>
                    <div className="text-white">Bengaluru, Karnataka, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-xs font-medium">Availability</div>
                    <div className="text-emerald-400 font-semibold">
                      Open to Work & Stage Bookings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Universal Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
