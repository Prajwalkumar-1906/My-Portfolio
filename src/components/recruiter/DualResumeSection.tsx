"use client";

import Image from "next/image";
import { Download, FileText, CheckCircle2, QrCode, ExternalLink } from "lucide-react";
import { sound } from "@/lib/sound";

export function DualResumeSection() {
  const portfolioUrl = typeof window !== "undefined" ? window.location.origin : "https://prajwalkumar-portfolio.vercel.app";

  const resumes = [
    {
      id: "aiml",
      season: "Season 1 Track",
      title: "AI/ML & Full-Stack Engineer",
      subtitle: "AI/ML Engineer & Full-Stack Developer",
      filename: "Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf",
      path: "/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf",
      lastUpdated: "October 2026",
      size: "1-Page ATS Standard",
      highlights: [
        "ABB AI Internship (Sep 2026 - Present)",
        "PlaceWise: Explainable AI & Fairlearn audit",
        "Chukta: Bitmask-DP & Integer Paise Engine",
        "Python, PyTorch, LangChain, Next.js, Redis, Docker"
      ],
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(portfolioUrl + "/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf")}&color=E50914&bgcolor=181818&margin=1`
    },
    {
      id: "data_ba",
      season: "Season 2 Track",
      title: "Data Scientist & Business Roles",
      subtitle: "Data & Business Analyst | Data Analyst & BD Associate",
      filename: "Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf",
      path: "/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf",
      lastUpdated: "October 2026",
      size: "1-Page ATS Standard",
      highlights: [
        "Galaxy Systems: 150+ B2B Leads/Mo via Sales Navigator",
        "Predictive Customer Retention Engine (Random Forest / XGBoost)",
        "The Vendor Growth Pipeline: Automated ETL & KPI Tracking",
        "SQL, MySQL, Power BI, Tableau, Excel Modeling, CRM"
      ],
      qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(portfolioUrl + "/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf")}&color=FF6A00&bgcolor=181818&margin=1`
    }
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
            Verified Credentials
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            RESUME VERSIONS & QR ACCESS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Tailored one-page PDFs matching each specialized hiring track. Scan on mobile or download directly.
          </p>
        </div>
        <a
          href="/resumes/Prajwalkumar_Madiwal_Complete_Portfolio.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playSelect()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-zinc-200 hover:text-white transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Download Both Tracks (Combined Dossier PDF)</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumes.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-zinc-300">
                    {res.season}
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-1">
                    {res.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5">
                    {res.subtitle}
                  </p>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                    <span>Last Updated: <strong className="text-zinc-200">{res.lastUpdated}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">ATS Verified</span>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="flex-shrink-0 p-1.5 rounded-xl bg-[#141414] border border-white/15 text-center">
                  <img
                    src={res.qrUrl}
                    alt={`QR Code for ${res.title}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded block"
                  />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter mt-1 block">
                    Scan on Phone
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-1.5 my-4 pt-3 border-t border-white/5">
                {res.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <a
                href={res.path}
                download={res.filename}
                onClick={() => sound.playSelect()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-base tracking-wider uppercase transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download {res.id === "aiml" ? "AIML / FullStack" : "Data Scientist & Business"} PDF</span>
              </a>

              <a
                href={res.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
                title="Preview PDF in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
