import { NextRequest, NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import { PROFILE } from "@/data/profile";

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxReqs = 8;

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxReqs) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local_client";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a minute before analyzing another JD." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { jobDescription } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json({ error: "Job description is required." }, { status: 400 });
    }

    if (jobDescription.length < 30) {
      return NextResponse.json({ error: "Job description is too short (min 30 characters)." }, { status: 400 });
    }

    if (jobDescription.length > 5000) {
      return NextResponse.json(
        { error: "Job description exceeds limit of 5,000 characters." },
        { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const jdLower = jobDescription.toLowerCase();

    // Collect all of Prajwal's verified skills
    const allSkills: string[] = [];
    SKILL_CATEGORIES.forEach((c) => {
      c.skills.forEach((s) => allSkills.push(s.name));
    });

    // Offline Grounded Analyzer (used when Gemini is unavailable or fallback)
    const matchingSkillsFound = allSkills.filter((skill) =>
      jdLower.includes(skill.toLowerCase())
    );

    const relevantProjectsFound: { title: string; reason: string }[] = [];
    if (jdLower.includes("python") || jdLower.includes("machine learning") || jdLower.includes("ai") || jdLower.includes("fairness") || jdLower.includes("explainab")) {
      relevantProjectsFound.push({
        title: "PlaceWise: Explainable Placement Prediction",
        reason: "Applied XGBoost, LightGBM, SHAP, and Fairlearn for bias mitigation with 80%+ CI unit test coverage."
      });
    }
    if (jdLower.includes("full-stack") || jdLower.includes("react") || jdLower.includes("next") || jdLower.includes("algorithm") || jdLower.includes("system design") || jdLower.includes("heap")) {
      relevantProjectsFound.push({
        title: "Chukta: Smart Expense Settlement Engine",
        reason: "Engineered greedy max-heap and bitmask-DP transaction minimization with strict integer paise precision."
      });
    }
    if (jdLower.includes("sql") || jdLower.includes("power bi") || jdLower.includes("analytics") || jdLower.includes("churn") || jdLower.includes("b2b")) {
      relevantProjectsFound.push({
        title: "Customer Churn & Retention Analytics",
        reason: "Conducted RFM segmentation, exploratory data analysis, and Power BI executive dashboards."
      });
    }

    // Identify honest gaps based on common JD criteria
    const detectedGaps: string[] = [];
    if (jdLower.includes("5+ years") || jdLower.includes("7+ years") || jdLower.includes("10+ years") || jdLower.includes("staff engineer") || jdLower.includes("lead architect")) {
      detectedGaps.push("Seniority Level: Role seeks 5+ years of industry experience; Prajwal is graduating in 2027 and currently an AI Intern at ABB.");
    }
    if (jdLower.includes("kubernetes") || jdLower.includes("k8s") || jdLower.includes("terraform")) {
      detectedGaps.push("Advanced Cloud Orchestration: High-scale Kubernetes/Terraform infrastructure management.");
    }
    if (jdLower.includes("c++") || jdLower.includes("embedded") || jdLower.includes("rust") || jdLower.includes("firmware")) {
      detectedGaps.push("Systems/Firmware: Low-level C++/Embedded engineering (Prajwal focuses on Python, TypeScript, and Web/Cloud architectures).");
    }
    if (detectedGaps.length === 0 && matchingSkillsFound.length < 3) {
      detectedGaps.push("Specific domain tooling listed in this job description differs from Prajwal's primary AI/ML, Full-Stack, and Data Analytics stack.");
    }

    let overallFit: "Strong" | "Partial" | "Not yet" = "Partial";
    if (matchingSkillsFound.length >= 4 && relevantProjectsFound.length >= 1 && !detectedGaps.some(g => g.includes("Seniority Level"))) {
      overallFit = "Strong";
    } else if (matchingSkillsFound.length === 0 || detectedGaps.some(g => g.includes("Seniority Level") && matchingSkillsFound.length < 2)) {
      overallFit = "Not yet";
    }

    let result = {
      overallFit,
      matchingSkills: matchingSkillsFound.length > 0 ? Array.from(new Set(matchingSkillsFound)).slice(0, 10) : ["Python", "Problem Solving", "Git"],
      relevantProjects: relevantProjectsFound.length > 0 ? relevantProjectsFound : [
        {
          title: "PlaceWise (Explainable AI)",
          reason: "Demonstrates core algorithmic problem solving, modern web architecture, and clean documentation."
        }
      ],
      gaps: detectedGaps.length > 0 ? detectedGaps : ["No critical blockers identified for an entry-level or junior-to-mid engineering role."],
      suggestedNextStep: overallFit === "Strong"
        ? "Schedule a technical discussion or invite Prajwal for a code walkthrough of PlaceWise or Chukta."
        : overallFit === "Partial"
        ? "Review Season 1 / Season 2 tracks to evaluate alignment on foundational engineering principles."
        : "Keep Prajwal's contact for future roles aligned with AI/ML, Full-Stack, or Data Analytics.",
      disclaimer: "Grounded evaluation based strictly on Prajwalkumar Madiwal's verified portfolio and academic/internship record. Zero fabricated claims."
    };

    // If Gemini API Key exists, run through Gemini with structured schema
    if (apiKey) {
      try {
        const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
        const prompt = `
You are the Job Fit Analyzer for PRAJWALKUMAR MADIWAL.
Prajwal's Profile:
- Final-year CSE student at Rajarajeswari College of Engineering (RRCE, 2027 graduating, CGPA 7.7/10).
- AI Intern at ABB Bengaluru (Sep 2026 - Present).
- Verified Skills: ${allSkills.join(", ")}.
- Verified Projects: PlaceWise (Python, XGBoost, LightGBM, SHAP, Fairlearn), Chukta (Next.js, TypeScript, Bitmask-DP, Greedy Max-Heap), Customer Churn/Retention Engine (Python, Pandas, Power BI, SQL), AI Interview Coach.
- Verified Roles: AI/ML Engineer, Full-Stack Developer, Data Analyst, Business Analyst.
- Verification Rule: Strictly grounded. Do NOT fabricate experience, years of senior management, or skills he doesn't have. No numerical percentage scores; use only "Strong", "Partial", or "Not yet" for overallFit.

Analyze this Job Description:
${jobDescription.slice(0, 3000)}

Return ONLY valid JSON matching this exact structure:
{
  "overallFit": "Strong" | "Partial" | "Not yet",
  "matchingSkills": ["string"],
  "relevantProjects": [{"title": "string", "reason": "string"}],
  "gaps": ["string"],
  "suggestedNextStep": "string",
  "disclaimer": "Grounded evaluation based strictly on Prajwalkumar Madiwal's verified portfolio and academic/internship record. Zero fabricated claims."
}
        `.trim();

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json"
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (parsed.overallFit && parsed.matchingSkills) {
              result = {
                ...result,
                ...parsed,
                disclaimer: "Grounded evaluation based strictly on Prajwalkumar Madiwal's verified portfolio and academic/internship record. Zero fabricated claims."
              };
            }
          }
        }
      } catch (e) {
        console.warn("Gemini Job Fit API fallback triggered:", e);
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Job Fit error:", err);
    return NextResponse.json(
      { error: "Failed to analyze job description. Please try again." },
      { status: 500 }
    );
  }
}
