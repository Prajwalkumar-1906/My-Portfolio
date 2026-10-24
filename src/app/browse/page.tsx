"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Info,
  Compass,
  Mic,
  Users,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Billboard } from "@/components/billboard/Billboard";
import { NetflixRow, RowCardItem } from "@/components/rows/NetflixRow";
import { Top10Row, Top10Item } from "@/components/rows/Top10Row";
import { ContinueWatchingRow } from "@/components/rows/ContinueWatchingRow";
import { SkillGlobe } from "@/components/3d/SkillGlobe";
import { DetailModal, ModalDetails } from "@/components/modals/DetailModal";
import { ValuesAndServiceBanner } from "@/components/browse/ValuesAndServiceBanner";
import { ContentAndSocialRow } from "@/components/browse/ContentAndSocialRow";
import { ImpactMetricsGrid } from "@/components/browse/ImpactMetricsGrid";

import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { EDUCATION, ACHIEVEMENTS } from "@/data/education";
import { BLOG_POSTS } from "@/data/posts";
import { sound } from "@/lib/sound";

export default function BrowsePage() {
  const [selectedModalItem, setSelectedModalItem] = useState<ModalDetails | null>(null);

  // Trending Projects
  const trendingProjectCards: RowCardItem[] = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category.toUpperCase(),
    badge: p.inProgress ? "In Progress" : p.featured ? "Trending #1" : undefined,
    tags: p.technologies,
    githubUrl: p.githubUrl,
    onSelect: () => {
      setSelectedModalItem({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category.toUpperCase(),
        description: p.description,
        technologies: p.technologies,
        keyFeatures: p.keyFeatures,
        metrics: p.metrics,
        githubUrl: p.githubUrl
      });
    }
  }));

  // Behind the Mic (Public Speaking & Stage Moments)
  const speakingCards: RowCardItem[] = [
    {
      id: "speaker-main",
      title: "Keynote at Phoenix Conclave",
      subtitle: "Empowering Next-Gen Tech Innovators",
      category: "KEYNOTE",
      image: "/assets/webp/prajwal_hero.webp",
      badge: "Main Stage",
      onSelect: () => {
        setSelectedModalItem({
          id: "speaker-main",
          title: "Keynote Speaker & Tech Thinker",
          subtitle: "Delivering high-energy talks across colleges, universities, and tech parks.",
          category: "SPEAKING",
          image: "/assets/webp/prajwal_hero.webp",
          description: "Prajwal regularly speaks on stage addressing audiences of hundreds on AI architectures, hackathon mindsets, ethical algorithms, and student leadership.",
          keyFeatures: [
            "GenAI Workshop Lead for 100+ students (Dream Den Club)",
            "Spearheaded 12-member committee for 300+ participant inter-college summit",
            "Frequent panelist and mentor at tech symposiums across Karnataka"
          ],
          metrics: ["8K+ Followers on LinkedIn", "100+ Students Trained", "300+ Summit Attendees"]
        });
      }
    },
    {
      id: "dream-den-workshop",
      title: "GenAI Workshop Lead",
      subtitle: "Hands-on Deep Dive for 100+ Learners",
      category: "WORKSHOP",
      image: "/assets/webp/RRCE.webp",
      badge: "Dream Den",
      onSelect: () => {
        setSelectedModalItem({
          id: "dream-den-workshop",
          title: "Hands-on Generative AI & Prompt Engineering",
          subtitle: "Organized under Dream Den Club",
          category: "WORKSHOP",
          image: "/assets/webp/RRCE.webp",
          description: "Guided over 100 undergraduate engineers through hands-on model orchestration, APIs, and modern full-stack integrations.",
          keyFeatures: [
            "Practical zero-to-one implementation of LLM endpoints",
            "Interactive prompt testing and latency benchmarking",
            "High satisfaction scores and student community onboarding"
          ],
          metrics: ["100+ Students Certified", "Live Code Demos", "Dream Den Club"]
        });
      }
    },
    {
      id: "abb-industrial-talk",
      title: "Industrial AI Integration",
      subtitle: "ABB Process Optimisation Sessions",
      category: "ENTERPRISE",
      image: "/assets/webp/ABB_Office.webp",
      badge: "ABB Bengaluru",
      onSelect: () => {
        setSelectedModalItem({
          id: "abb-industrial-talk",
          title: "AI in Industrial Automation @ ABB",
          subtitle: "Industrial machine learning research & collaboration",
          category: "ENTERPRISE",
          image: "/assets/webp/ABB_Office.webp",
          description: "Working within ABB's engineering and research group in Bengaluru to explore machine learning applications for industrial workflows and automation.",
          keyFeatures: [
            "Data preprocessing and EDA for heavy industrial sensor feeds",
            "Evaluating technical feasibility of modern ML models",
            "Cross-functional collaboration with domain specialists"
          ],
          metrics: ["ABB Global", "Stipend Internship", "Industrial AI"]
        });
      }
    }
  ];

  // Top 10 Things About Prajwal
  const top10Things: Top10Item[] = [
    {
      rank: 1,
      title: "Public Speaker with Stage Presence",
      category: "Speaking",
      description: "Delivers energetic, memorable keynotes combining technical depth with accessible, charismatic delivery.",
      image: "/assets/webp/prajwal_hero.webp"
    },
    {
      rank: 2,
      title: "AI Intern @ ABB",
      category: "Experience",
      description: "Contributing to production ML pipelines and automation systems at ABB Bengaluru.",
      image: "/assets/webp/ABB_Office.webp"
    },
    {
      rank: 3,
      title: "Creator of PlaceWise & Chukta",
      category: "Architecture",
      description: "Engineered ethical AI audits with SHAP and high-throughput financial graph engines.",
      badge: "Open Source"
    },
    {
      rank: 4,
      title: "8K+ Community Followers",
      category: "Reach",
      description: "Part-time content creator sharing tech, career, and business insights with 8,000+ followers on LinkedIn.",
      badge: "LinkedIn Influencer"
    },
    {
      rank: 5,
      title: "Dream Den Community Leader",
      category: "Community",
      description: "Marketing Head & organizer of workshops and inter-college summits for hundreds of students.",
      badge: "Leader"
    },
    {
      rank: 6,
      title: "Top 5 Vibe2ship Hackathon Finalist",
      category: "Hackathons",
      description: "Ranked Top 5 of 30+ regional collegiate teams at Coding Ninjas 'Vibe2ship'.",
      badge: "Top 5"
    },
    {
      rank: 7,
      title: "Final-Year CSE @ RRCE",
      category: "Education",
      description: "Strong foundation in DSA, OS, DBMS, Computer Networks, and Machine Learning.",
      image: "/assets/webp/RRCE.webp"
    },
    {
      rank: 8,
      title: "Galaxy Systems Growth Engine",
      category: "BizDev",
      description: "Sourced 150+ B2B leads/month and improved sales meeting conversion by +20%.",
      badge: "+20% Conv"
    },
    {
      rank: 9,
      title: "Social Welfare Volunteer",
      category: "Giving Back",
      description: "Raised over Rs. 50,000 for local children's education with One World One Family and Annapurna Trust.",
      badge: "Rs. 50K Raised"
    },
    {
      rank: 10,
      title: "Multilingual Thinker",
      category: "Culture",
      description: "Conversant in 5 regional Indian languages, connecting effortlessly across cultural boundaries.",
      badge: "5 Languages"
    }
  ];

  // Communities Row Cards
  const communityCards: RowCardItem[] = [
    {
      id: "dream-den",
      title: "Dream Den Community & Enterprise Cell",
      subtitle: "Marketing Head & Community Manager",
      category: "COLLEGE ENTERPRISE",
      image: "/assets/webp/RRCE.webp",
      badge: "Leadership",
      tags: ["100+ Trained", "300+ Summit", "15 Food Vendors Onboarded"],
      onSelect: () => {
        setSelectedModalItem({
          id: "dream-den",
          title: "Dream Den Club Leadership",
          subtitle: "Marketing Head & Community Manager",
          category: "COMMUNITY",
          image: "/assets/webp/RRCE.webp",
          description: "Led the expansion of the campus enterprise cell, conducting GenAI workshops for 100+ students and managing an inter-college B-plan summit.",
          keyFeatures: [
            "Conducted survey of 200+ campus respondents for pilot food-delivery venture",
            "Onboarded 15 vendor partners to the student ecosystem",
            "Fostered peer mentorship across all engineering batches"
          ]
        });
      }
    },
    {
      id: "owof",
      title: "One World One Family (Sathya Sai Mission)",
      subtitle: "Volunteer Coordinator & Education Drives",
      category: "SOCIAL IMPACT",
      image: "/assets/webp/Sathya_sai_grama.webp",
      badge: "Rs. 50K Raised",
      tags: ["Fundraising", "Child Nutrition", "Social Welfare"],
      externalUrl: "https://www.sathyasaigrama.com/",
      onSelect: () => {
        setSelectedModalItem({
          id: "owof",
          title: "One World One Family & Annapurna Trust",
          subtitle: "Volunteer Coordinator",
          category: "VOLUNTEERING",
          image: "/assets/webp/Sathya_sai_grama.webp",
          description: "Dedicated volunteer supporting child health and education. Directed fundraising initiatives that raised over Rs. 50,000 for local schooling needs.",
          keyFeatures: [
            "Organized community contribution drives",
            "Supported daily morning nutrition programs",
            "Grounded in foundational values of selfless service"
          ]
        });
      }
    },
    {
      id: "coding-ninjas",
      title: "Coding Ninjas Hackathon Community",
      subtitle: "Vibe2ship Top 5 Finalist & Tech Collaborator",
      category: "HACKATHONS",
      badge: "Top 5 / 30+ Teams",
      tags: ["Community Hero", "36h Sprint", "Rapid Prototyping"],
      onSelect: () => {
        setSelectedModalItem({
          id: "coding-ninjas",
          title: "Coding Ninjas 'Vibe2ship' Hackathon",
          subtitle: "Top 5 among 30+ engineering teams",
          category: "HACKATHONS",
          description: "Rapidly engineered the Community Hero platform in 36 continuous hours, solving rapid neighborhood distress coordination.",
          keyFeatures: [
            "Real-time geolocation dispatch",
            "High-pressure architectural execution",
            "Pitched to senior industry jury"
          ]
        });
      }
    }
  ];

  // Blog / Thoughts Cards
  const blogCards: RowCardItem[] = BLOG_POSTS.map((post) => ({
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

      {/* Cinematic Billboard with Motion Graphics Atmosphere */}
      <Billboard
        title="Explore The Show"
        subtitle="The Journey of an AI/ML Engineer, Public Speaker & Community Builder"
        description="Welcome to the cinematic chronicle of Prajwalkumar Madiwal. From school assemblies at Sathya Sai Grama to research at ABB and keynote stages across Bengaluru, discover the projects, stories, and people behind the code."
        badges={["Full Season", "Original Story", "4K Ultra HD", "Audio 5.1"]}
        playText="Watch Journey"
        onPlayClick={() => {
          document.getElementById("journey-timeline")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMoreInfoClick={() => {
          setSelectedModalItem({
            id: "browse-about",
            title: "Prajwalkumar Madiwal: The Show",
            subtitle: "Final-Year Computer Science Engineering Scholar",
            category: "DOCUMENTARY",
            image: "/assets/webp/prajwal_hero.webp",
            description: PROFILE.tagline + ". " + PROFILE.tracks[0].summary,
            keyFeatures: [
              "AI Intern at ABB contributing to production machine learning",
              "Delivered keynotes and workshops for 100+ students at Dream Den",
              "Built PlaceWise with explainable SHAP AI and fairness-aware algorithms",
              "LinkedIn thought leader with 8K+ engaged followers"
            ],
            metrics: ["8K+ Followers", "100+ Trained", "Top 5 Hackathon"]
          });
        }}
      />

      {/* Continue Watching Row (Active Sprint) */}
      <ContinueWatchingRow
        onMoreInfo={() => {
          setSelectedModalItem({
            id: "ai-interview-coach",
            title: "AI Interview Coach with Real-Time Feedback",
            subtitle: "Currently in Active Development (72% complete)",
            category: "SPRINT",
            description: "Multimodal mock interview simulator evaluating speech pacing, keyword attributions, and algorithmic problem-solving in live session recordings.",
            keyFeatures: [
              "Real-time audio transcription and low-latency speech analysis",
              "Structured STAR-method rubric assessment",
              "Targeted delivery and pacing critique for campus placement readiness"
            ],
            metrics: ["72% Sprinted", "Alpha Build", "Coming Soon"]
          });
        }}
      />

      {/* Trending Projects Row */}
      <NetflixRow
        title="Trending Projects"
        subtitle="Most celebrated software and machine learning architectures"
        items={trendingProjectCards}
        aspectRatio="backdrop"
      />

      {/* Top 10 Things About Prajwal */}
      <Top10Row
        title="Top 10 Things About Prajwal"
        subtitle="Ranked highlights from the journey of Prajwalkumar Madiwal"
        items={top10Things}
      />

      {/* Verified Impact Metrics Grid */}
      <ImpactMetricsGrid />

      {/* Behind the Mic: Speaking & Stage */}
      <NetflixRow
        title="Behind the Mic: Public Speaking & Keynotes"
        subtitle="Stage appearances, workshops, and youth empowerment talks"
        items={speakingCards}
        aspectRatio="backdrop"
      />

      {/* Interactive 3D Journey Timeline (Episodes from School to RRCE to ABB) */}
      <section id="journey-timeline" className="px-4 sm:px-6 lg:px-12 py-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
            Timeline as Episodes
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-1">
            My Journey: Season Chronicles
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            A chronological progression through foundational education, engineering rigor, and industrial enterprise.
          </p>
        </div>

        {/* 3D Timeline Visual Cards */}
        <div className="relative border-l-2 border-[#E50914]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {/* Episode 1: Foundational Schooling */}
          <div className="relative group">
            <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#E50914] border-4 border-[#141414] group-hover:scale-125 transition-transform" />
            <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-red-600/50 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-mono text-red-500 font-bold uppercase">
                  Episode 1 &bull; Foundational Schooling
                </span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  Sathya Sai Grama
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  Grounded in foundational ethics, discipline, and human values. Developed public speaking, community sensitivity, and academic dedication that define my work ethic today.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.sathyasaigrama.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>Visit Institution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-4 relative h-40 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/webp/Sathya_sai_grama.webp"
                  alt="Sathya Sai Grama"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Episode 2: Senior Secondary (XII Science) */}
          <div className="relative group">
            <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#E50914] border-4 border-[#141414] group-hover:scale-125 transition-transform" />
            <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-red-600/50 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-mono text-red-500 font-bold uppercase">
                  Episode 2 &bull; 2021 &ndash; 2023
                </span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  Tungal PU College, Vijayapura &bull; 82% Distinction
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  Rigorous preparation in Physics, Chemistry, Mathematics, and Biology (PCMB). Honed analytical problem solving and quantitative reasoning.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.tungalschools.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>Tungal Schools Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-4 relative h-40 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/webp/Tungal.webp"
                  alt="Tungal PU College"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Episode 3: Computer Science & Engineering */}
          <div className="relative group">
            <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#E50914] border-4 border-[#141414] group-hover:scale-125 transition-transform" />
            <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-red-600/50 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-mono text-red-500 font-bold uppercase">
                  Episode 3 &bull; 2023 &ndash; 2027 (Final Year)
                </span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  Rajarajeswari College of Engineering (RRCE), Bengaluru
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  B.E. Computer Science & Engineering with 7.7/10 CGPA. Core focus in Machine Learning, DSA, Distributed Systems, and Web Technologies. Runner-up at TechPitch RRCE and Marketing Head at Dream Den Club.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.rrce.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>RRCE Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-4 relative h-40 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/webp/RRCE.webp"
                  alt="RRCE Bengaluru"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Episode 4: Industrial Enterprise AI */}
          <div className="relative group">
            <span className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#E50914] border-4 border-[#141414] animate-pulse" />
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#201010] border border-[#E50914]/40 hover:border-[#E50914] transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Episode 4 &bull; Sep 2026 &ndash; Present (Active)
                </span>
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  AI Intern @ ABB, Bengaluru
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  Contributing to real-world AI/ML solutions for industrial workflows, preprocessing complex datasets, and evaluating technical architectures with global engineering teams.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://www.abb.com/global/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#E50914] hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>ABB Global Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-4 relative h-40 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/assets/webp/ABB_Office.webp"
                  alt="ABB Bengaluru Office"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Skills Universe */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
          Skills Universe (3D Orbit)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-6">
          Drag and spin to explore the breadth of languages, frameworks, and tools.
        </p>
        <SkillGlobe />
      </section>

      {/* Values & Service Cinematic Wide Banner */}
      <ValuesAndServiceBanner />

      {/* Communities & Volunteering Row */}
      <NetflixRow
        title="Communities & Social Impact"
        subtitle="Dream Den Club, One World One Family, Annapurna Trust, and Hackathons"
        items={communityCards}
        aspectRatio="backdrop"
      />

      {/* Content & Social Row */}
      <ContentAndSocialRow />

      {/* Thoughts & Engineering Essays Row */}
      <NetflixRow
        title="Thoughts & Engineering Essays"
        subtitle="Deep dives into Explainable AI, Graph Algorithms, and Industrial ML"
        items={blogCards}
        aspectRatio="backdrop"
      />

      <Footer />

      {/* Detail Modal */}
      <DetailModal
        item={selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
      />
    </div>
  );
}
