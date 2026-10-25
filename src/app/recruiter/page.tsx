"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Download,
  Briefcase,
  Layers,
  Award,
  GraduationCap,
  Sparkles,
  Copy,
  Check,
  Calendar,
  Mail,
  Film,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Billboard } from "@/components/billboard/Billboard";
import { NetflixRow, RowCardItem } from "@/components/rows/NetflixRow";
import { Top10Row, Top10Item } from "@/components/rows/Top10Row";
import { SkillGlobe } from "@/components/3d/SkillGlobe";
import { DetailModal, ModalDetails } from "@/components/modals/DetailModal";
import { SkimModeModal } from "@/components/modals/SkimModeModal";
import { ContactForm } from "@/components/forms/ContactForm";
import { JobFitAnalyzer } from "@/components/recruiter/JobFitAnalyzer";
import { RoleFitFinder } from "@/components/recruiter/RoleFitFinder";
import { DualResumeSection } from "@/components/recruiter/DualResumeSection";
import { BrandIcons } from "@/components/ui/BrandIcons";

import { PROFILE } from "@/data/profile";
import { EXPERIENCES } from "@/data/experience";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "@/data/education";
import { sound } from "@/lib/sound";

function RecruiterContent() {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get("season");

  // Role track toggle (Season 1 vs Season 2)
  const [activeSeason, setActiveSeason] = useState<'aiml' | 'data_ba'>('aiml');
  const [selectedModalItem, setSelectedModalItem] = useState<ModalDetails | null>(null);
  const [isSkimModeOpen, setIsSkimModeOpen] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
  const [prefilledContactMessage, setPrefilledContactMessage] = useState("");
  const [copiedPitch, setCopiedPitch] = useState(false);

  useEffect(() => {
    if (seasonParam === "data_ba" || seasonParam === "season2") {
      setActiveSeason("data_ba");
    } else if (seasonParam === "aiml" || seasonParam === "season1") {
      setActiveSeason("aiml");
    }
  }, [seasonParam]);

  const currentTrack = PROFILE.tracks.find((t) => t.id === activeSeason)!;

  // Filter projects by active season track and optional skill filter
  const displayedProjects = PROJECTS.filter((p) => {
    const matchTrack = p.track === activeSeason || p.track === "both";
    if (!selectedSkillFilter) return matchTrack;
    return (
      matchTrack &&
      p.technologies.some((t) =>
        t.toLowerCase().includes(selectedSkillFilter.toLowerCase())
      )
    );
  });

  // Top 10 Reasons to Hire Me
  const top10Reasons: Top10Item[] = [
    {
      rank: 1,
      title: "AI Intern @ ABB",
      category: "Industrial ML",
      description: "Contributing to production AI/ML solutions, exploratory data analysis, and industrial automation models in Bengaluru.",
      badge: "Industry Proven",
      image: "/assets/webp/ABB_Office.webp"
    },
    {
      rank: 2,
      title: "PlaceWise: Explainable AI",
      category: "Flagship AI",
      description: "Built fair and transparent placement prediction with SHAP local explanations and Fairlearn bias mitigation. 80%+ CI test coverage.",
      badge: "Zero Bias"
    },
    {
      rank: 3,
      title: "Chukta Settlement Engine",
      category: "Full-Stack Architecture",
      description: "High-concurrency expense minimization using greedy max-heap & bitmask-DP with strict integer paise financial precision.",
      badge: "Algorithmic Precision"
    },
    {
      rank: 4,
      title: "CSE Graduating 2027",
      category: "Academic Rigor",
      description: "Final-year Computer Science Engineering scholar at RRCE Bengaluru with 7.7/10 CGPA across ML, DSA, DBMS, and OS.",
      badge: "RRCE Bengaluru",
      image: "/assets/webp/RRCE.webp"
    },
    {
      rank: 5,
      title: "Galaxy Systems B2B Traction",
      category: "Business Dev & Analytics",
      description: "Delivered 150+ leads/month via Sales Navigator (+12% pipeline) and client pitch decks yielding +20% proposal conversion.",
      badge: "+20% Conversion"
    },
    {
      rank: 6,
      title: "5 Regional Languages",
      category: "Communication",
      description: "Fluent communicator in English, Hindi, Kannada, Telugu, and Marathi, enabling seamless cross-team collaboration.",
      badge: "Multilingual"
    },
    {
      rank: 7,
      title: "Top 5 Hackathon Finalist",
      category: "High-Pressure Delivery",
      description: "Ranked Top 5 of 30+ teams at the Coding Ninjas Vibe2ship Hackathon, prototyping the Community Hero platform in 36 hours.",
      badge: "Vibe2ship Finalist"
    },
    {
      rank: 8,
      title: "Certified by Anthropic, Google & NVIDIA",
      category: "Credentials",
      description: "Certified in Anthropic AI Fluency, Google Gemini Enterprise, NVIDIA Jetson AI, and Oracle Cloud Infrastructure.",
      badge: "Multi-Certified"
    },
    {
      rank: 9,
      title: "Leadership at Dream Den",
      category: "Community & Mentorship",
      description: "Trained 100+ students in hands-on GenAI workshops and directed a 12-member team for an inter-college summit with 300+ participants.",
      badge: "100+ Trained"
    },
    {
      rank: 10,
      title: "Social Impact Coordinator",
      category: "Character & Values",
      description: "Coordinated volunteer drives raising over Rs. 50,000 for local children's education with One World One Family and Annapurna Trust.",
      badge: "Values Driven"
    }
  ];

  // Convert projects to RowCardItem
  const projectRowCards: RowCardItem[] = displayedProjects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category.toUpperCase(),
    badge: p.inProgress ? "In Progress" : p.featured ? "Featured" : undefined,
    tags: p.technologies,
    githubUrl: p.githubUrl,
    onSelect: () => {
      setSelectedModalItem({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category.toUpperCase(),
        description: p.description,
        problem: p.problem,
        approach: p.approach,
        results: p.results,
        whatILearned: p.whatILearned,
        technologies: p.technologies,
        keyFeatures: p.keyFeatures,
        metrics: p.metrics,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        architectureDiagram: p.architectureDiagram
      });
    }
  }));

  // Experience Row Cards
  const experienceRowCards: RowCardItem[] = EXPERIENCES.map((exp) => ({
    id: exp.id,
    title: `${exp.role} &bull; ${exp.company}`,
    subtitle: `${exp.period} &bull; ${exp.location}`,
    category: exp.type,
    image: exp.image,
    badge: exp.company === "ABB" ? "Current Role" : undefined,
    tags: exp.badges,
    externalUrl: exp.website,
    onSelect: () => {
      setSelectedModalItem({
        id: exp.id,
        title: `${exp.role} @ ${exp.company}`,
        subtitle: `${exp.period} | ${exp.location} | ${exp.type}`,
        category: "EXPERIENCE",
        image: exp.image,
        description: exp.description.join(" "),
        keyFeatures: exp.description,
        externalUrl: exp.website,
        metrics: exp.badges
      });
    }
  }));

  // Education Row Cards
  const educationRowCards: RowCardItem[] = EDUCATION.map((edu) => ({
    id: edu.id,
    title: edu.institution,
    subtitle: `${edu.degree} &bull; ${edu.period}`,
    category: edu.badge,
    image: edu.image,
    externalUrl: edu.website,
    tags: edu.coursework ? edu.coursework.slice(0, 3) : undefined,
    onSelect: () => {
      setSelectedModalItem({
        id: edu.id,
        title: edu.institution,
        subtitle: `${edu.degree} (${edu.period}) &bull; ${edu.grade || ''}`,
        category: "EDUCATION",
        image: edu.image,
        description: `Enrolled in ${edu.field}. Coursework highlights: ${
          edu.coursework ? edu.coursework.join(", ") : "Comprehensive curriculum"
        }.`,
        keyFeatures: edu.coursework || [],
        externalUrl: edu.website
      });
    }
  }));

  const handleShortlistPrefill = () => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(localStorage.getItem("pkm_my_list") || "[]");
      const listNames = list.join(", ");
      setPrefilledContactMessage(
        `Hi Prajwal, I'm reaching out after shortlisting your portfolio on your Recruiter page. We are interested in your profile for a full-time role! [Saved items: ${listNames || 'General Recruiter Interest'}]`
      );
      const contactEl = document.getElementById("recruiter-contact");
      contactEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyPitch = () => {
    sound.playSelect();
    navigator.clipboard.writeText(PROFILE.elevatorPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />

      {/* Billboard Hero */}
      <Billboard
        title="Prajwalkumar Madiwal"
        subtitle={currentTrack.roleTitle}
        description={currentTrack.summary}
        badges={["Open to Work", "Bengaluru, India", "Graduating 2027", "AI Intern @ ABB"]}
        playText="Explore Projects"
        onPlayClick={() => {
          document.getElementById("recruiter-projects")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMoreInfoClick={() => setIsSkimModeOpen(true)}
        extraActions={
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={currentTrack.resumePdf}
              download={currentTrack.resumeFileName}
              onClick={() => sound.playSelect()}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-sm shadow-xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <button
              onClick={() => setIsSkimModeOpen(true)}
              className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
            >
              Skim Mode (60s)
            </button>
          </div>
        }
      />

      {/* Season Track Selector (Role Switcher) */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 border-y border-white/5 bg-[#101010]/90 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bebas text-xl text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Film className="w-5 h-5 text-[#E50914]" />
              Select Role Season:
            </span>

            <div className="flex items-center gap-2 p-1 bg-black/60 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  sound.playSelect();
                  setActiveSeason("aiml");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeSeason === "aiml"
                    ? "bg-[#E50914] text-white shadow-lg shadow-[#E50914]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Season 1: AI/ML & Full-Stack
              </button>

              <button
                onClick={() => {
                  sound.playSelect();
                  setActiveSeason("data_ba");
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeSeason === "data_ba"
                    ? "bg-[#FF6A00] text-black shadow-lg shadow-[#FF6A00]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Season 2: Data & Business Analyst
              </button>
            </div>
          </div>

          {/* Quick Dual Download */}
          <div className="flex items-center gap-3">
            <a
              href="/resumes/Prajwalkumar_Madiwal_Complete_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <Download className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Download Both Tracks (Combined PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Recruiter At-A-Glance "Hire Me" Quick Card */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#181818] border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 text-[11px] font-bold tracking-wider uppercase">
                Ready for Immediate Hire
              </span>
              <span className="text-xs text-zinc-400">
                Target Grad: 2027 (Final Year B.E. CSE)
              </span>
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              Preferred Target Roles
            </h3>

            <div className="flex flex-wrap gap-2">
              {currentTrack.preferredRoles.map((role, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white tracking-wide"
                >
                  {role}
                </span>
              ))}
            </div>

            <div className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
              <span className="text-zinc-400">Languages Spoken:</span>{" "}
              {PROFILE.languages.join(", ")} &bull;{" "}
              <span className="text-zinc-400">Base Location:</span> Bengaluru, Karnataka (Open to Relocation / Remote).
            </div>

            {/* Direct Recruiter Social Profiles */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold text-zinc-400">Fast Connect:</span>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] border border-white/10 text-xs text-zinc-300 transition-colors"
                title="LinkedIn (8K+ Followers)"
              >
                <BrandIcons.Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/20 hover:text-white border border-white/10 text-xs text-zinc-300 transition-colors"
                title="GitHub"
              >
                <BrandIcons.Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-zinc-200/20 hover:text-white border border-white/10 text-xs text-zinc-300 transition-colors"
                title="X / Twitter"
              >
                <BrandIcons.XIcon className="w-3.5 h-3.5" />
                <span>X</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <button
              onClick={copyPitch}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
            >
              {copiedPitch ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#E50914]" />}
              <span>{copiedPitch ? "Elevator Pitch Copied!" : "Copy Elevator Pitch"}</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                document.getElementById("recruiter-contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#f40612] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule an Interview / Connect</span>
            </button>
          </div>
        </div>
      </section>

      {/* Role Fit Finder (Mini Quiz routing to Season 1 or Season 2) */}
      <section className="px-4 sm:px-6 lg:px-12 py-4 max-w-7xl mx-auto">
        <RoleFitFinder onSelectSeason={(season) => setActiveSeason(season)} />
      </section>

      {/* Job Fit Analyzer (Paste JD, Grounded Gemini AI Matching) */}
      <section className="px-4 sm:px-6 lg:px-12 py-4 max-w-7xl mx-auto">
        <JobFitAnalyzer />
      </section>

      {/* Dual Resume Versions with Last-Updated Date & QR Codes */}
      <DualResumeSection />

      {/* Top 10 Reasons to Hire Prajwal */}
      <Top10Row
        title="Top 10 Reasons to Hire Prajwal"
        subtitle="Ranked factual proof points across industrial ML, systems engineering, and commercial impact."
        items={top10Reasons}
      />

      {/* Work Experience Row */}
      <div id="recruiter-experience">
        <NetflixRow
          title="Work Experience & Internships"
          subtitle="ABB, Karnataka Social Service Trust, Galaxy Systems, and Dream Den Community"
          items={experienceRowCards}
          aspectRatio="backdrop"
        />
      </div>

      {/* Projects Row */}
      <div id="recruiter-projects">
        <NetflixRow
          title={`${currentTrack.seasonLabel} Featured Projects`}
          subtitle={`Curated engineering pipelines for ${currentTrack.roleTitle}`}
          items={projectRowCards}
          aspectRatio="backdrop"
        />
      </div>

      {/* 3D Skills Universe Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
              3D Skills Universe & Technology Stack
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Interactive 3D tag sphere. Click any skill to inspect projects or filter the view.
            </p>
          </div>

          {selectedSkillFilter && (
            <button
              onClick={() => setSelectedSkillFilter(null)}
              className="text-xs px-3 py-1 rounded-full bg-[#E50914] text-white font-semibold flex items-center gap-1.5"
            >
              <span>Filter: {selectedSkillFilter}</span>
              <span>&times; Clear</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <SkillGlobe
              selectedSkill={selectedSkillFilter}
              onSelectSkill={(skill) => setSelectedSkillFilter(skill)}
            />
          </div>

          {/* Grouped Chips (Rating-free per instructions) */}
          <div className="lg:col-span-6 space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="font-bebas text-lg text-zinc-200 tracking-wider mb-2">
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playSelect();
                        setSelectedSkillFilter(s.name);
                      }}
                      className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                        selectedSkillFilter === s.name
                          ? "bg-[#E50914] text-white font-bold"
                          : s.isPrimary
                          ? "bg-white/10 hover:bg-white/20 text-white font-medium"
                          : "bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Row with Real Institution Photos */}
      <NetflixRow
        title="Education Credentials & Campus Roots"
        subtitle="Rajarajeswari College of Engineering (RRCE), Tungal PU College, Sathya Sai Grama"
        items={educationRowCards}
        aspectRatio="backdrop"
      />

      {/* Certifications & Badges Row */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-1">
          Verified Industry Certifications
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Anthropic, Google, NVIDIA, Oracle, Salesforce & Macquarie University
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-[#181818] border border-white/10 hover:border-red-600/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-500">
                  {cert.issuer}
                </span>
                <h4 className="font-semibold text-white text-xs sm:text-sm mt-1 leading-snug">
                  {cert.title}
                </h4>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-400">
                <span>{cert.category} Track</span>
                {cert.year && <span className="font-mono">{cert.year}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Recommendations / Testimonials Placeholder */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/20 text-center">
          <Award className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
          <h4 className="font-bebas text-2xl text-zinc-300">
            Professional Endorsements & Recommendations
          </h4>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
            Endorsements from mentors at ABB, KSST, and collegiate faculties will appear here once submitted.
          </p>
        </div>
      </section>

      {/* Recruiter Contact Form Section */}
      <section id="recruiter-contact" className="px-4 sm:px-6 lg:px-12 py-16 max-w-5xl mx-auto">
        <ContactForm
          defaultPurpose="Hiring"
          prefillMessage={prefilledContactMessage}
        />
      </section>

      <Footer />

      {/* Modals */}
      <DetailModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
      />

      <SkimModeModal
        isOpen={isSkimModeOpen}
        onClose={() => setIsSkimModeOpen(false)}
        onShortlistPrefill={handleShortlistPrefill}
      />
    </div>
  );
}

export default function RecruiterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#141414]" />}>
      <RecruiterContent />
    </Suspense>
  );
}
