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
  // TODO: add live demo URL when deployed (strictly hidden if undefined)
  liveUrl?: string;
  technologies: string[]; // Note: Empty for Vendor Growth Pipeline as required
  description: string;
  problem: string;
  approach: string;
  results: string[];
  whatILearned: string;
  keyFeatures: string[];
  metrics: string[];
  architectureDiagram?: 'placewise' | 'chukta' | 'retention' | 'generic';
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
    // TODO: add live demo URL when deployed
    technologies: ["Python", "XGBoost", "SHAP", "Fairlearn", "Optuna", "Streamlit", "scikit-learn", "pytest"],
    description: "An explainable and fairness-audited machine learning pipeline that forecasts campus placement probabilities without demographic bias, providing students and counselors with transparent feature attributions and counterfactual guidance.",
    problem: "Campus placement prediction systems frequently rely on opaque black-box models that perpetuate demographic bias (gender and institutional disparities) while providing students zero actionable feedback on how to improve.",
    approach: "Built a leakage-free stratified ML pipeline using XGBoost & LightGBM on hybrid Kaggle + synthetic bias-injected datasets. Implemented Fairlearn sample reweighing and ExponentiatedGradient algorithms to guarantee equalized odds. Integrated SHAP for per-student local feature attribution and counterfactual 'what-if' scenarios. Enforced 80%+ CI unit test coverage.",
    results: [
      "80%+ CI test suite coverage verified via automated GitHub Actions",
      "Demographic parity & equalized odds achieved across gender and tier subgroups",
      "Sub-second local SHAP attribution explanations generated for students"
    ],
    whatILearned: "How to mathematically audit ML models for bias, navigate fairness-accuracy Pareto frontiers, generate local model interpretability explanations, and structure reproducible CI/CD machine learning pipelines.",
    keyFeatures: [
      "Leakage-free stratified pipelines trained and validated on a hybrid Kaggle + synthetic dataset.",
      "SHAP per-student local feature breakdowns and counterfactual what-if scenarios.",
      "Fairlearn demographic audit across gender and institutional tiers.",
      "Production-grade test suite with 80%+ coverage validated in automated CI workflows."
    ],
    metrics: ["80%+ CI Test Coverage", "Zero Demographic Disparity", "Sub-second SHAP Inference"],
    architectureDiagram: "placewise"
  },
  {
    id: "chukta",
    title: "Chukta",
    subtitle: "Smart Group-Expense Settlement Platform",
    tagline: "High-concurrency settlement engine with graph minimization, integer-paise math, and real-time websockets.",
    category: "fullstack",
    track: "aiml",
    featured: true,
    githubUrl: "https://github.com/Prajwalkumar-1906/Chukta",
    // TODO: add live demo URL when deployed
    technologies: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Socket.IO", "Docker"],
    description: "An enterprise-grade, offline-first group expense platform featuring algorithmic transaction minimization, integer-paise financial precision, real-time sync, and integrated AI assistant for conversational expense management.",
    problem: "Group expense management suffers from high transaction counts (O(N²) bilateral debts), cumulative floating-point rounding inaccuracies, and concurrency conflicts during simultaneous settlements.",
    approach: "Designed a dual-engine settlement algorithm combining greedy max-heap heuristics and an exact bitmask dynamic programming solver to minimize transaction graphs. All balances are strictly stored and computed in integer paise (1 INR = 100 paise) to eliminate floating-point drift. Real-time broadcast implemented via Socket.IO with Redis caching and k6 virtual user stress verification.",
    results: [
      "Reduced transaction graph edges to absolute minimum cash flows via Bitmask-DP",
      "100% financial precision with zero floating-point arithmetic errors (integer paise)",
      "Low-latency real-time state synchronization validated under concurrent k6 load"
    ],
    whatILearned: "NP-hard graph minimization through dynamic programming with bitmasks, financial data integrity patterns, property-based testing with fast-check, and WebSocket state reconciliation.",
    keyFeatures: [
      "Dual settlement engine combining greedy max-heap and optimal bitmask-DP graph algorithms.",
      "Zero floating-point inaccuracy: all monetary balances strictly represented as integer paise.",
      "High-throughput Socket.IO real-time state synchronization stress-tested with k6.",
      "UPI deep-link & dynamic QR code generation with idempotent double-spend prevention."
    ],
    metrics: ["Minimum Cash Flows via Bitmask-DP", "100% Integer Paise Precision", "k6 Stress Verified"],
    architectureDiagram: "chukta"
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
    // TODO: add live demo URL when deployed
    technologies: ["Python", "Random Forest", "XGBoost", "pandas", "NumPy", "scikit-learn"],
    description: "An end-to-end classification pipeline built for Galaxy Systems to identify early warning signs of client churn by mining behavioral engagement patterns and transaction histories.",
    problem: "B2B client attrition was discovered late in the billing cycle, preventing account managers from taking timely retention measures.",
    approach: "Engineered recency, frequency, invoice lag, and cross-product engagement metrics from transactional ledgers. Evaluated Random Forest and XGBoost classifiers, tuning threshold cutoffs for high recall to minimize false negatives in high-value accounts.",
    results: [
      "Calibrated churn probability risk scores surfaced directly to sales teams",
      "High-recall early identification of at-risk B2B accounts",
      "Enabled timely proactive interventions for client account preservation"
    ],
    whatILearned: "Translating raw transactional logs into predictive RFM features, tuning decision thresholds for business impact over raw accuracy, and operationalizing ML scoring for commercial teams.",
    keyFeatures: [
      "Extensive feature engineering across recency, frequency, and invoice lag.",
      "Benchmarked and tuned Random Forest and XGBoost models balancing precision and recall.",
      "Generated calibrated churn probability scores for targeted proactive campaigns."
    ],
    metrics: ["Calibrated Risk Scores", "High-Recall Churn Prediction", "Automated Lead Alerts"],
    architectureDiagram: "retention"
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
    // TODO: add live demo URL when deployed
    // TODO: add stack - The resume has an unfilled placeholder for the tech stack. Do NOT show any tech stack.
    technologies: [], 
    description: "An automated data pipeline designed to ingest, clean, and analyze multi-channel vendor performance metrics, replacing legacy manual spreadsheets and surfacing top-tier sellers.",
    problem: "Manual multi-vendor data compilation took hours each week, creating reporting bottlenecks and delaying commercial decisions.",
    approach: "Constructed an automated ETL ingestion script that standardizes order volumes, return rates, and fulfillment timelines across multiple vendor data feeds into structured performance summaries.",
    results: [
      "100% elimination of manual spreadsheet assembly",
      "Daily executive scorecards highlighting top sellers and fulfillment bottlenecks",
      "Streamlined visibility across 15+ onboarded commercial vendor partners"
    ],
    whatILearned: "Data standardization across divergent schemas, automated ETL scheduling, and building executive-focused KPI dashboards.",
    keyFeatures: [
      "Automated ETL pipeline aggregating multi-vendor sales, return rates, and fulfillment timelines.",
      "Replaced labor-intensive manual reporting with instant daily executive KPI scorecards.",
      "Surfaced top-performing vendors and inventory velocity bottlenecks."
    ],
    metrics: ["100% Automated Reporting", "Daily KPI Dashboards", "Multi-Vendor Ingestion"],
    architectureDiagram: "generic"
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
    // TODO: add live demo URL when deployed
    technologies: ["Next.js", "Python", "FastAPI", "WebRTC", "Whisper", "LLM Evaluation"],
    description: "An intelligent, real-time mock interview simulator engineered to evaluate candidate answers, vocal delivery, keyword coverage, and algorithmic reasoning in live session simulations.",
    problem: "Engineering students lack real-time objective feedback on communication pacing, technical structure (STAR method), and conceptual clarity prior to placement interviews.",
    approach: "Developing a multimodal pipeline integrating low-latency WebRTC audio streaming, Whisper transcription, and structured LLM evaluation rubrics.",
    results: [
      "Currently in active sprint (72% milestone reached)",
      "Integrated sub-second audio transcription pipeline",
      "Curriculum alignment for placement-season engineering cohorts"
    ],
    whatILearned: "Streaming audio latency optimization, structured LLM prompt evaluation pipelines, and building feedback interfaces that guide student self-improvement.",
    keyFeatures: [
      "Real-time audio transcription and low-latency speech analysis.",
      "Coherence, depth, and structured STAR-method evaluation against standard technical rubrics.",
      "Instant visual playback and personalized suggestions for interview perception enhancement."
    ],
    metrics: ["Currently in Active Development", "72% Milestone Complete", "Public Release Coming Soon"],
    architectureDiagram: "generic"
  },
  {
    id: "community-hero",
    title: "Community Hero Platform",
    subtitle: "Coding Ninjas Vibe2ship Hackathon (Top 5 / 30+ Teams)",
    tagline: "Rapidly prototyped civic collaboration and emergency neighborhood support portal.",
    category: "hackathon",
    track: "both",
    featured: false,
    githubUrl: "https://github.com/Prajwalkumar-1906",
    // TODO: add live demo URL when deployed
    technologies: ["React", "Node.js", "Express", "MongoDB", "Geolocation APIs"],
    description: "Prototyped and delivered under intense 24-36 hour hackathon constraints at Coding Ninjas 'Vibe2ship'. Built a decentralized civic rescue and volunteer mobilization portal, securing a Top 5 placement among 30+ participating engineering teams.",
    problem: "During local crises, distressed individuals struggle to rapidly reach verified proximate volunteers without centralized coordination overhead.",
    approach: "Built a reactive proximity dispatch portal matching help requests with nearby verified volunteers using geospatial indexes in MongoDB and low-latency WebSockets.",
    results: [
      "Top 5 Finalist standing among 30+ competing engineering teams",
      "Delivered fully functional prototype in a continuous 36-hour sprint",
      "Pitched live and validated by senior engineering hackathon jury"
    ],
    whatILearned: "High-velocity team engineering under strict time limits, rapid API integration, and distilling a product idea to its core value proposition.",
    keyFeatures: [
      "Rapid volunteer dispatch based on live proximity geolocation coordinates.",
      "Distress broadcasting channels with verified task acknowledgment.",
      "Gamified community trust score for neighborhood volunteers."
    ],
    metrics: ["Top 5 of 30+ Teams", "Built in 36 Hours", "Coding Ninjas Hackathon"],
    architectureDiagram: "generic"
  },
  {
    id: "sms-payment-system",
    title: "SMS-Based Offline Payment Protocol",
    subtitle: "TechPitch at RRCE Runner-Up",
    tagline: "Enabling secure peer-to-peer monetary transfers across low-connectivity regions without mobile data.",
    category: "concept",
    track: "both",
    featured: false,
    // TODO: add live demo URL when deployed
    technologies: ["Cryptography", "SMS Gateways", "Idempotent Transaction Protocol"],
    description: "Award-winning technical concept and architectural proposal presented at RRCE TechPitch, demonstrating zero-data cryptographic SMS tokens for financial inclusion in remote regions.",
    problem: "Rural communities with zero mobile internet connectivity cannot utilize UPI or smartphone payment gateways.",
    approach: "Formulated an offline cryptographic tokenization protocol using public-key cryptography and dual-party SMS OTP confirmation with cellular tower timestamps.",
    results: [
      "Awarded Runner-Up at college-wide TechPitch engineering symposium",
      "Validated theoretical security model against replay and man-in-the-middle attacks"
    ],
    whatILearned: "Cryptographic protocol design for resource-constrained environments and designing for digital equity and financial inclusion.",
    keyFeatures: [
      "Encrypted SMS tokenization with dual-key verification against tampering.",
      "Optimized for 2G/basic feature phone ecosystems without mobile internet.",
      "Secured runner-up honors at college-wide TechPitch engineering symposium."
    ],
    metrics: ["Runner-Up TechPitch RRCE", "Zero-Internet Architecture", "Financial Inclusion"],
    architectureDiagram: "generic"
  }
];
