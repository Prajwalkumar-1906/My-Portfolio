export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'aiml' | 'fullstack' | 'analytics' | 'hackathon' | 'concept';
  track: 'aiml' | 'data_ba' | 'both';
  featured: boolean;
  inProgress?: boolean;
  progressPercent?: number;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[]; // Note: Empty for Vendor Growth Pipeline as required
  description: string;
  keyFeatures: string[];
  metrics: string[];
  architecture?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "placewise",
    title: "PlaceWise",
    subtitle: "Explainable & Fair Campus Placement Predictor",
    tagline: "Bridging predictive machine learning with ethical AI audits and SHAP-driven transparency.",
    category: "aiml",
    track: "aiml",
    featured: true,
    githubUrl: "https://github.com/Prajwalkumar-1906/PlaceWise",
    technologies: ["Python", "XGBoost", "SHAP", "Fairlearn", "Optuna", "Streamlit", "scikit-learn", "pytest"],
    description: "An explainable and fairness-audited machine learning pipeline that forecasts campus placement probabilities without demographic bias, providing students and counselors with transparent feature attributions and counterfactual guidance.",
    keyFeatures: [
      "Leakage-free stratified pipelines trained and validated on a hybrid Kaggle + synthetic (bias-injected) dataset.",
      "SHAP per-student local feature breakdowns and counterfactual what-if scenarios illustrating actionable steps to improve placement likelihood.",
      "Fairlearn demographic audit across gender and institutional tiers, utilizing sample reweighing and ExponentiatedGradient algorithmic mitigation.",
      "Production-grade test suite with 80%+ coverage validated in automated CI workflows."
    ],
    metrics: ["80%+ CI Test Coverage", "Zero Demographic Disparity", "Sub-second SHAP Inference"]
  },
  {
    id: "chukta",
    title: "Chukta",
    subtitle: "Smart Group-Expense Settlement Platform",
    tagline: "High-concurrency settlement engine with graph minimization, integer-paise math, and real-time websockets.",
    category: "fullstack",
    track: "aiml", // Also prominent in Full-Stack
    featured: true,
    githubUrl: "https://github.com/Prajwalkumar-1906/Chukta",
    technologies: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Socket.IO", "Docker"],
    description: "An enterprise-grade, offline-first group expense platform featuring algorithmic transaction minimization, integer-paise financial precision, real-time sync, and integrated AI assistant for conversational expense management.",
    keyFeatures: [
      "Dual settlement engine combining greedy max-heap and optimal bitmask-DP graph algorithms to minimize total repayment transactions.",
      "Zero floating-point inaccuracy: all monetary balances strictly represented and settled as integer paise.",
      "High-throughput Socket.IO real-time state synchronization, stress-tested with k6 virtual users.",
      "UPI deep-link & dynamic QR code generation with idempotent double-spend prevention.",
      "Multilingual UI (English + Indian regional languages) and AI conversational agent with function calling over live expense balances.",
      "Resilient test architecture with fast-check property-based testing and Playwright E2E suites."
    ],
    metrics: ["Minimum Cash Flows via Bitmask-DP", "100% Integer Paise Precision", "k6 Stress Verified"]
  },
  {
    id: "customer-retention-engine",
    title: "Predictive Customer Retention Engine",
    subtitle: "Galaxy Systems Churn Classification Pipeline",
    tagline: "Data-driven B2B customer lifecycle optimization and churn probability scoring.",
    category: "analytics",
    track: "data_ba",
    featured: true,
    githubUrl: "https://github.com/Prajwalkumar-1906/Predictive-Customer-Retention-Engine-for-Galaxy-Systems",
    technologies: ["Python", "Random Forest", "XGBoost", "pandas", "NumPy", "scikit-learn"],
    description: "An end-to-end classification pipeline built for Galaxy Systems to identify early warning signs of client churn by mining behavioral engagement patterns and transaction histories.",
    keyFeatures: [
      "Extensive feature engineering across recency, frequency, invoice lag, and cross-product engagement indicators.",
      "Benchmarked and tuned Random Forest and XGBoost classification models balancing precision and recall.",
      "Generated calibrated churn probability scores, empowering the sales desk to run targeted proactive retention campaigns.",
      "Directly contributed to extended customer lifetime value (CLV) and reduced customer attrition."
    ],
    metrics: ["Calibrated Risk Scores", "High-Recall Churn Prediction", "Automated Lead Alerts"]
  },
  {
    id: "vendor-growth-pipeline",
    title: "The Vendor Growth Pipeline",
    subtitle: "Automated ETL & Performance Metric Suite",
    tagline: "Eliminating manual reporting with automated ingestion, KPI scorecards, and vendor analytics.",
    category: "analytics",
    track: "data_ba",
    featured: false,
    githubUrl: "https://github.com/Prajwalkumar-1906/The-Vendor-Growth-Pipeline",
    // TODO: add stack - The resume has an unfilled placeholder for the tech stack. Do NOT show any tech stack.
    technologies: [], 
    description: "An automated data pipeline designed to ingest, clean, and analyze multi-channel vendor performance metrics, replacing legacy manual spreadsheets and surfacing top-tier sellers.",
    keyFeatures: [
      "Automated ETL pipeline aggregating multi-vendor sales, return rates, and fulfillment timelines.",
      "Replaced labor-intensive manual reporting with instant daily executive KPI scorecards.",
      "Surfaced top-performing vendors and inventory velocity bottlenecks for commercial leadership."
    ],
    metrics: ["100% Automated Reporting", "Daily KPI Dashboards", "Multi-Vendor Ingestion"]
  },
  {
    id: "ai-interview-coach",
    title: "AI Interview Coach",
    subtitle: "Real-Time Multimodal Feedback System",
    tagline: "Personalized mock interview coach analyzing audio, speech pace, and technical depth.",
    category: "aiml",
    track: "aiml",
    featured: true,
    inProgress: true,
    progressPercent: 72,
    technologies: ["Next.js", "Python", "FastAPI", "WebRTC", "Whisper", "LLM Evaluation"],
    description: "An intelligent, real-time mock interview simulator engineered to evaluate candidate answers, vocal delivery, keyword coverage, and algorithmic reasoning in live session simulations.",
    keyFeatures: [
      "Real-time audio transcription and low-latency speech analysis.",
      "Coherence, depth, and structured STAR-method evaluation against standard technical rubrics.",
      "Instant visual playback and personalized suggestions for interview perception enhancement."
    ],
    metrics: ["Currently in Active Development", "72% Milestone Complete", "Public Release Coming Soon"]
  },
  {
    id: "community-hero",
    title: "Community Hero Platform",
    subtitle: "Coding Ninjas Vibe2ship Hackathon (Top 5 / 30+ Teams)",
    tagline: "Rapidly prototyped civic collaboration and emergency neighborhood support portal.",
    category: "hackathon",
    track: "both",
    featured: false,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Geolocation APIs"],
    description: "Prototyped and delivered under intense 24-36 hour hackathon constraints at Coding Ninjas 'Vibe2ship'. Built a decentralized civic rescue and volunteer mobilization portal, securing a Top 5 placement among 30+ participating engineering teams.",
    keyFeatures: [
      "Rapid volunteer dispatch based on live proximity geolocation coordinates.",
      "Distress broadcasting channels with verified task acknowledgment.",
      "Gamified community trust score for neighborhood volunteers."
    ],
    metrics: ["Top 5 of 30+ Teams", "Built in 36 Hours", "Coding Ninjas Hackathon"]
  },
  {
    id: "sms-payment-system",
    title: "SMS-Based Offline Payment Protocol",
    subtitle: "TechPitch at RRCE Runner-Up",
    tagline: "Enabling secure peer-to-peer monetary transfers across low-connectivity regions without mobile data.",
    category: "concept",
    track: "both",
    featured: false,
    technologies: ["Cryptography", "SMS Gateways", "Idempotent Transaction Protocol"],
    description: "Award-winning technical concept and architectural proposal presented at RRCE TechPitch, demonstrating zero-data cryptographic SMS tokens for financial inclusion in remote regions.",
    keyFeatures: [
      "Encrypted SMS tokenization with dual-key verification against tampering.",
      "Optimized for 2G/basic feature phone ecosystems without mobile internet.",
      "Secured runner-up honors at college-wide TechPitch engineering symposium."
    ],
    metrics: ["Runner-Up TechPitch RRCE", "Zero-Internet Architecture", "Financial Inclusion"]
  }
];
