"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, RotateCcw, Briefcase } from "lucide-react";
import { sound } from "@/lib/sound";

interface RoleFitFinderProps {
  onSelectSeason: (season: "aiml" | "data_ba") => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    description: string;
    pointsTo: "aiml" | "data_ba";
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary objective of the role you are hiring for?",
    options: [
      {
        label: "Engineering Intelligent Systems & Web Platforms",
        description: "Developing machine learning models, explainable AI pipelines, or high-performance full-stack web applications.",
        pointsTo: "aiml"
      },
      {
        label: "Data Intelligence, Dashboards & Business Growth",
        description: "Transforming datasets into actionable insights, building Power BI KPI reports, or driving B2B client acquisition.",
        pointsTo: "data_ba"
      }
    ]
  },
  {
    id: 2,
    question: "Which technology stack matches your daily workflows?",
    options: [
      {
        label: "Python, PyTorch, XGBoost, SHAP, Next.js, Docker",
        description: "Model training, bias mitigation, distributed algorithms, REST APIs, and modern frontend/backend systems.",
        pointsTo: "aiml"
      },
      {
        label: "SQL, Power BI, Python (Pandas/NumPy), Excel, Sales Nav",
        description: "Querying relational databases, executive KPI reporting, EDA, RFM analysis, and outbound lead generation.",
        pointsTo: "data_ba"
      }
    ]
  },
  {
    id: 3,
    question: "Which project case study would you most want to review?",
    options: [
      {
        label: "PlaceWise (Fair ML) & Chukta (DP Settlement Engine)",
        description: "Predicting campus placements with Explainable AI & zero bias, or solving greedy transaction graphs.",
        pointsTo: "aiml"
      },
      {
        label: "Customer Churn & Retention Engine (Power BI / RFM)",
        description: "Behavioral customer analytics, cohort analysis, and data-driven retention strategies.",
        pointsTo: "data_ba"
      }
    ]
  }
];

export function RoleFitFinder({ onSelectSeason }: RoleFitFinderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<("aiml" | "data_ba")[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleChoose = (pointsTo: "aiml" | "data_ba") => {
    sound.playSelect();
    const updated = [...answers, pointsTo];
    setAnswers(updated);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    sound.playSelect();
    setCurrentStep(0);
    setAnswers([]);
    setCompleted(false);
  };

  // Determine winner
  const aimlCount = answers.filter((a) => a === "aiml").length;
  const recommendedSeason: "aiml" | "data_ba" = aimlCount >= 2 ? "aiml" : "data_ba";

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#181818] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#0077b5]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <Briefcase className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Interactive Navigator
            </span>
          </div>
          <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
            ROLE FIT FINDER
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Take a 30-second quiz to route instantly to the optimal Season and project dossier.
          </p>
        </div>

        {completed && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      {!completed ? (
        <div className="mt-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-2">
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#E50914] transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h4 className="text-base sm:text-lg font-semibold text-white mb-5">
            {QUESTIONS[currentStep].question}
          </h4>

          {/* Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleChoose(option.pointsTo)}
                className="text-left p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E50914] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="font-bebas text-xl text-white tracking-wide group-hover:text-[#E50914] transition-colors">
                    {option.label}
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-end text-xs font-semibold text-zinc-400 group-hover:text-white">
                  <span>Select & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Recommendation Card */
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-black/80 to-[#141414] border border-white/15 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Recommendation Computed
            </span>
          </div>

          <h4 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            {recommendedSeason === "aiml" ? "SEASON 1: AI/ML & FULL-STACK ENGINEER" : "SEASON 2: DATA & BUSINESS ANALYST"}
          </h4>

          <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
            {recommendedSeason === "aiml"
              ? "Your hiring requirements strongly align with Prajwal's Season 1 specialization in AI/ML architectures, explainable algorithms (SHAP/Fairlearn), and scalable full-stack applications. Top featured projects: PlaceWise & Chukta."
              : "Your hiring requirements align with Prajwal's Season 2 specialization in Data Analytics, Power BI executive dashboards, SQL modeling, and B2B lead generation from his enterprise internships. Top featured project: Customer Churn & Retention Analytics."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playSelect();
                onSelectSeason(recommendedSeason);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-lg tracking-wider uppercase transition-colors shadow-lg"
            >
              <span>Activate {recommendedSeason === "aiml" ? "Season 1" : "Season 2"} View</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={
                recommendedSeason === "aiml"
                  ? "/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf"
                  : "/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSelect()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bebas text-lg tracking-wider uppercase transition-colors"
            >
              <span>Download {recommendedSeason === "aiml" ? "AIML / Full-Stack" : "Data Scientist & Business"} Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
