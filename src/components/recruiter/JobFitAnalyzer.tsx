"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, ShieldAlert } from "lucide-react";
import { sound } from "@/lib/sound";

interface FitResult {
  overallFit: "Strong" | "Partial" | "Not yet";
  matchingSkills: string[];
  relevantProjects: { title: string; reason: string }[];
  gaps: string[];
  suggestedNextStep: string;
  disclaimer: string;
}

const SAMPLE_JDS = [
  {
    label: "AI/ML Engineer",
    text: "Seeking an AI/ML Engineer with strong proficiency in Python, PyTorch, Scikit-learn, XGBoost, and model evaluation. Experience in Explainable AI (SHAP/LIME), bias mitigation, REST APIs (FastAPI/Flask), Docker containerization, and data preprocessing is preferred."
  },
  {
    label: "Full-Stack Developer",
    text: "Looking for a Full-Stack Engineer proficient in Next.js, React, TypeScript, and Node.js. Must have experience building responsive web interfaces, designing relational schemas (PostgreSQL), state management, and algorithm optimization for performance."
  },
  {
    label: "Data / Business Analyst",
    text: "Hiring a Data & Business Analyst with expertise in Python, SQL, Excel (Pivot tables, VLOOKUP, modelling), and Power BI dashboarding. Responsibilities include exploratory data analysis, KPI reporting, customer segmentation, and market research."
  }
];

export function JobFitAnalyzer() {
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (jdText.trim().length < 30) {
      setError("Please paste a job description with at least 30 characters.");
      return;
    }
    setError(null);
    setLoading(true);
    sound.playSelect();

    try {
      const res = await fetch("/api/job-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jdText })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze job description");
      }
      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (text: string) => {
    sound.playSelect();
    setJdText(text);
    setError(null);
  };

  const getFitBadge = (fit: "Strong" | "Partial" | "Not yet") => {
    switch (fit) {
      case "Strong":
        return {
          bg: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
          label: "Strong Alignment"
        };
      case "Partial":
        return {
          bg: "bg-amber-500/15 border-amber-500/40 text-amber-400",
          label: "Partial Alignment"
        };
      case "Not yet":
        return {
          bg: "bg-zinc-600/20 border-zinc-500/40 text-zinc-300",
          label: "Not Yet / Stretch"
        };
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-bold text-[#E50914] uppercase tracking-widest">
              AI Grounded Matching
            </span>
          </div>
          <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
            JOB FIT ANALYZER
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Paste any job description to evaluate authentic alignment against Prajwalkumar&apos;s verified skills, projects, and honest gaps. Zero inflated percentage claims.
          </p>
        </div>

        {/* Sample chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Quick Samples:
          </span>
          {SAMPLE_JDS.map((sample) => (
            <button
              key={sample.label}
              onClick={() => loadSample(sample.text)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Textarea Area */}
      <div className="mt-6">
        <label htmlFor="jd-input" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
          Paste Target Job Description (Max 5,000 chars):
        </label>
        <textarea
          id="jd-input"
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          maxLength={5000}
          rows={5}
          placeholder="e.g. We are looking for an AI/ML Engineer with Python, XGBoost, and Explainable AI experience to build predictive pipelines..."
          className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all resize-y"
        />

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
          <span>{jdText.length} / 5000 characters</span>
          {error && <span className="text-rose-400 font-semibold">{error}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={handleAnalyze}
          disabled={loading || jdText.trim().length < 30}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bebas text-lg tracking-wider uppercase transition-all ${
            loading || jdText.trim().length < 30
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
              : "bg-[#E50914] hover:bg-[#b20710] text-white shadow-lg shadow-[#E50914]/30 cursor-pointer active:scale-95"
          }`}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Evaluating Grounded Facts...</span>
            </>
          ) : (
            <>
              <span>Run Job Fit Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div className="mt-8 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Fit Badge Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Fit Assessment:
              </span>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-1.5 ${
                  getFitBadge(result.overallFit).bg
                }`}
              >
                {result.overallFit === "Strong" && <CheckCircle2 className="w-3.5 h-3.5" />}
                {result.overallFit === "Partial" && <AlertTriangle className="w-3.5 h-3.5" />}
                {result.overallFit === "Not yet" && <ShieldAlert className="w-3.5 h-3.5" />}
                <span>{getFitBadge(result.overallFit).label}</span>
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono">
              Grounded exclusively on verified data
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Matching Skills & Projects */}
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matching Skills & Stacks</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Relevant Projects to Review:
                </h4>
                <div className="space-y-2">
                  {result.relevantProjects.map((p) => (
                    <div
                      key={p.title}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="text-xs font-bold text-white">{p.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        {p.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Honest Gaps & Next Step */}
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Honest Gaps & Considerations</span>
                </h4>
                <div className="space-y-2">
                  {result.gaps.map((gap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 leading-snug"
                    >
                      {gap}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider mb-1">
                  Suggested Next Step:
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {result.suggestedNextStep}
                </p>
                <div className="mt-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E50914] hover:text-white transition-colors"
                  >
                    <span>Proceed to Contact Prajwal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grounding Disclaimer */}
          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-zinc-500 italic text-center">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}
