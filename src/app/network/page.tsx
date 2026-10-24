"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  Heart,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Mic,
  Share2,
  Download,
  BookOpen
} from "lucide-react";
import { BrandIcons } from "@/components/ui/BrandIcons";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Billboard } from "@/components/billboard/Billboard";
import { NetflixRow, RowCardItem } from "@/components/rows/NetflixRow";
import { DetailModal, ModalDetails } from "@/components/modals/DetailModal";
import { ShareModal } from "@/components/modals/ShareModal";
import { Guestbook } from "@/components/network/Guestbook";

import { PROFILE } from "@/data/profile";
import { BLOG_POSTS } from "@/data/posts";
import { downloadVCard } from "@/lib/vcard";
import { sound } from "@/lib/sound";

export default function NetworkPage() {
  const [selectedModalItem, setSelectedModalItem] = useState<ModalDetails | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Quick Say Hi Form
  const [sayHiData, setSayHiData] = useState({
    name: "",
    email: "",
    context: "Met on LinkedIn",
    message: "",
    botcheck: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSayHi = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sayHiData.name,
          email: sayHiData.email,
          purpose: "Networking & Connection",
          subject: `[Portfolio: Network] Connection from ${sayHiData.name} (${sayHiData.context})`,
          message: `Connection Context: ${sayHiData.context}\n\nMessage:\n${sayHiData.message}`,
          botcheck: sayHiData.botcheck
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || "Could not dispatch message.");
      }
    } catch {
      setErrorMsg("Network error. Please email directly at pkm.digi@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  const communityCards: RowCardItem[] = [
    {
      id: "net-dream-den",
      title: "Dream Den Community & Enterprise Cell",
      subtitle: "Marketing Head & Community Organizer",
      category: "COLLEGE ENTERPRISE",
      image: "/assets/webp/RRCE.webp",
      badge: "Active",
      tags: ["GenAI Workshops", "B-Plan Summit", "Food-Delivery Pilot"],
      onSelect: () => {
        setSelectedModalItem({
          id: "net-dream-den",
          title: "Dream Den Community & Enterprise Cell",
          subtitle: "Marketing Head & Community Manager",
          category: "COMMUNITY",
          image: "/assets/webp/RRCE.webp",
          description: "Active community builder leading technical and business workshops, fostering inter-batch collaboration and enterprise ventures.",
          keyFeatures: [
            "Conducted GenAI hands-on workshop for 100+ students",
            "Directed 12-member committee hosting 300+ summit participants",
            "Onboarded 15 local food vendors for campus pilot"
          ]
        });
      }
    },
    {
      id: "net-owof",
      title: "One World One Family (Sathya Sai Mission)",
      subtitle: "Education & Child Welfare Drives",
      category: "SOCIAL IMPACT",
      image: "/assets/webp/Sathya_sai_grama.webp",
      badge: "Rs. 50K Raised",
      tags: ["Education Funds", "Volunteer Drives", "Nutrition"],
      externalUrl: "https://www.sathyasaigrama.com/",
      onSelect: () => {
        setSelectedModalItem({
          id: "net-owof",
          title: "One World One Family & Annapurna Trust",
          subtitle: "Volunteer Coordinator",
          category: "VOLUNTEERING",
          image: "/assets/webp/Sathya_sai_grama.webp",
          description: "Committed volunteer for child nutrition and education welfare. Directed regional fundraising efforts raising over Rs. 50,000.",
          keyFeatures: [
            "Organized student-led donation campaigns",
            "Supported daily morning nutrition programs",
            "Active mentor for younger students"
          ]
        });
      }
    },
    {
      id: "net-coding-ninjas",
      title: "Coding Ninjas Hackathon Community",
      subtitle: "Vibe2ship Hackathon Top 5 Finalist",
      category: "HACKATHONS",
      badge: "Top 5 / 30+ Teams",
      tags: ["Hackathon Network", "Civic Tech", "36h Sprint"],
      onSelect: () => {
        setSelectedModalItem({
          id: "net-coding-ninjas",
          title: "Coding Ninjas 'Vibe2ship' Hackathon",
          subtitle: "Top 5 Finalist (Community Hero)",
          category: "HACKATHONS",
          description: "Engineered rapid-response civic rescue platform in 36-hour sprint, collaborating with regional developer communities.",
          keyFeatures: [
            "Top 5 among 30+ regional engineering teams",
            "Open to joining hackathon teams for AI/ML and Full-Stack challenges"
          ]
        });
      }
    }
  ];

  // Thoughts & Essays Cards (3 starter drafts)
  const thoughtsCards: RowCardItem[] = BLOG_POSTS.map((post) => ({
    id: post.id,
    title: post.title,
    subtitle: `${post.date} &bull; ${post.readTime}`,
    category: post.category,
    badge: "Article",
    onSelect: () => {
      setSelectedModalItem({
        id: post.id,
        title: post.title,
        subtitle: `${post.date} | ${post.readTime} | ${post.category}`,
        category: "THOUGHTS",
        description: post.content,
        keyFeatures: [post.snippet]
      });
    }
  }));

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      {/* Billboard */}
      <Billboard
        title="Let's Connect"
        subtitle="Mentoring, Open Source, Hackathon Teams & Community Leadership"
        description="Whether you're building an ambitious AI startup, seeking a hackathon collaborator, inviting me to speak, or simply want to chat about explainable AI and modern tech systems, I'd love to connect."
        badges={["8K+ on LinkedIn", "Open Source", "Hackathon Collaborator", "Community Mentor"]}
        playText="Say Hi Below"
        onPlayClick={() => {
          document.getElementById("say-hi-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMoreInfoClick={() => {
          window.open(PROFILE.linkedin, "_blank");
        }}
        extraActions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSelect()}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0077b5] hover:bg-[#005f93] text-white font-bold text-sm shadow-xl transition-all"
            >
              <BrandIcons.Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn (8K+)</span>
            </a>

            <button
              onClick={() => {
                sound.playSelect();
                setShareModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Profile & QR</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                downloadVCard();
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Save Contact (.vcf)</span>
            </button>
          </div>
        }
      />

      {/* Collaboration Scope Cards */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
          OPEN FOR COLLABORATION IN
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Areas where I actively partner with engineers, founders, and community organizers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Mentoring Students", icon: Users },
            { label: "Open-Source Projects", icon: BrandIcons.Github },
            { label: "Hackathon Teams", icon: Sparkles },
            { label: "Speaking Panels", icon: Mic },
            { label: "Community Building", icon: Heart },
            { label: "Tech Consulting", icon: MessageCircle }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#181818] border border-white/10 hover:border-[#E50914] transition-colors text-center flex flex-col items-center justify-center gap-2 group cursor-default shadow-md"
              >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#E50914]/20 group-hover:text-[#E50914] text-zinc-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-zinc-200">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Large 3D Social Cards Grid (LinkedIn, GitHub, Instagram, X, Email) */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
          DIRECT SOCIAL & REPO HUBS
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Follow verified channels for real-time essays, open-source commits, and speaking tours.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* LinkedIn */}
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-[#0077b5] transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <BrandIcons.Linkedin className="w-8 h-8 text-[#0077b5] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                LinkedIn
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                8,000+ Followers &bull; Career insights, AI/ML architectures & updates.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-[#0077b5] flex items-center gap-1">
              <span>Follow (8K+)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-white transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <BrandIcons.Github className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                GitHub
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                PlaceWise, Chukta, Retention Engine & DSA repositories.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-zinc-300 flex items-center gap-1">
              <span>Explore Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={PROFILE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <BrandIcons.Instagram className="w-8 h-8 text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                Instagram
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                @foreverprajwalkumar
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Campus life, keynote moments & behind-the-scenes.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-pink-400 flex items-center gap-1">
              <span>Follow</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href={PROFILE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-zinc-300 transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <BrandIcons.XIcon className="w-8 h-8 text-zinc-200 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                X / Twitter
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                @prajwalkumar_19
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Engineering thoughts, model fairness insights & tech updates.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-zinc-300 flex items-center gap-1">
              <span>Follow</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Direct Email */}
          <a
            href={`mailto:${PROFILE.email}`}
            onClick={() => sound.playSelect()}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-[#E50914] transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between"
          >
            <div>
              <Mail className="w-8 h-8 text-[#E50914] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bebas text-2xl text-white tracking-wide">
                Direct Email
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                pkm.digi@gmail.com
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Encrypted inbox for partnerships and advisory.
              </p>
            </div>
            <div className="mt-4 text-xs font-semibold text-[#E50914] flex items-center gap-1">
              <span>Send Mail</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </section>

      {/* Wall of Wishes & Community Guestbook */}
      <Guestbook />

      {/* Communities Row */}
      <NetflixRow
        title="Communities I Support & Grow"
        subtitle="Dream Den Club, One World One Family, Annapurna Trust & Coding Ninjas"
        items={communityCards}
        aspectRatio="backdrop"
      />

      {/* Thoughts & Engineering Essays Row (3 Starter Drafts) */}
      <NetflixRow
        title="Thoughts & Engineering Essays"
        subtitle="Read starter drafts on AI Fairness, 36h Hackathons to Scale, and Public Speaking"
        items={thoughtsCards}
        aspectRatio="backdrop"
      />

      {/* Quick Say Hi Form */}
      <section id="say-hi-section" className="px-4 sm:px-6 lg:px-12 py-16 max-w-3xl mx-auto">
        <div className="bg-[#181818] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-wider">
              Fast Connect
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
              SAY HI TO PRAJWAL
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Drop a quick note. Prajwal reads every message personally.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-600/50 text-center animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bebas text-2xl text-white">Message Dispatched!</h4>
              <p className="text-xs text-emerald-200 mt-1">
                Thanks for saying hi, {sayHiData.name}. Prajwal will reply soon!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSayHi} className="space-y-4">
              <input
                type="text"
                className="hidden"
                value={sayHiData.botcheck}
                onChange={(e) => setSayHiData({ ...sayHiData, botcheck: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hi-name" className="block text-xs font-medium text-zinc-400 mb-1">Your Name *</label>
                  <input
                    id="hi-name"
                    required
                    type="text"
                    placeholder="e.g. Alex"
                    value={sayHiData.name}
                    onChange={(e) => setSayHiData({ ...sayHiData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="hi-email" className="block text-xs font-medium text-zinc-400 mb-1">Your Email *</label>
                  <input
                    id="hi-email"
                    required
                    type="email"
                    placeholder="alex@domain.com"
                    value={sayHiData.email}
                    onChange={(e) => setSayHiData({ ...sayHiData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hi-context" className="block text-xs font-medium text-zinc-400 mb-1">How Do We Know Each Other? *</label>
                <select
                  id="hi-context"
                  value={sayHiData.context}
                  onChange={(e) => setSayHiData({ ...sayHiData, context: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none"
                >
                  <option value="Met on LinkedIn">Met on LinkedIn / Follower</option>
                  <option value="Met at Tech Event / Conclave">Met at Tech Event / Meetup</option>
                  <option value="College / University Peer">College / University Peer</option>
                  <option value="Hackathon Teammate">Hackathon Teammate</option>
                  <option value="Attended a Keynote/Workshop">Attended a Keynote / Workshop</option>
                  <option value="Found Portfolio Online">Found Portfolio Online</option>
                </select>
              </div>

              <div>
                <label htmlFor="hi-message" className="block text-xs font-medium text-zinc-400 mb-1">Your Message *</label>
                <textarea
                  id="hi-message"
                  required
                  rows={3}
                  placeholder="Hey Prajwal, wanted to say hello or explore collaborating on..."
                  value={sayHiData.message}
                  onChange={(e) => setSayHiData({ ...sayHiData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#121212] border border-white/10 text-white text-sm focus:border-red-600 focus:outline-none resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded bg-red-950/50 border border-red-700/50 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />

      {/* Share Profile Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Detail Modal */}
      <DetailModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
      />
    </div>
  );
}
