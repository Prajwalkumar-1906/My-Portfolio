export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  track: 'both' | 'aiml' | 'data_ba';
  website?: string;
  image?: string;
  badges: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "abb",
    role: "AI Intern",
    company: "ABB",
    location: "Bengaluru, India",
    period: "Sep 2026 - Present",
    type: "Stipend-based Internship",
    description: [
      "Contribute to AI/ML solutions for complex industrial and automation use cases.",
      "Conduct end-to-end data preprocessing, exploratory data analysis (EDA), and machine learning model development.",
      "Explore integrating state-of-the-art AI into industrial workflows for operational process optimisation.",
      "Collaborate with senior engineering and research teams to evaluate, benchmark, and deploy technical approaches."
    ],
    track: "aiml",
    website: "https://www.abb.com/global/en",
    image: "/assets/webp/ABB_Office.webp",
    badges: ["AI/ML", "Industrial Automation", "EDA", "Model Deployment"]
  },
  {
    id: "ksst",
    role: "AICTE Trainee, AI & ML",
    company: "Karnataka Social Service Trust (NGO)",
    location: "Remote",
    period: "Sep 2026 - Present",
    type: "AICTE Government Recognized Traineeship",
    description: [
      "Applied machine learning, predictive data models, and statistical analysis to community empowerment and welfare initiatives.",
      "Assisted in cleaning, structuring, and deriving actionable insights from regional social impact datasets."
    ],
    track: "both",
    badges: ["AICTE", "Social Impact Data", "Data Wrangling", "Machine Learning"]
  },
  {
    id: "galaxy-systems",
    role: "Business Development Intern",
    company: "Galaxy Systems",
    location: "Hybrid / Bengaluru",
    period: "Oct 2025 - Present",
    type: "Part-time (Family Dealer Business)",
    description: [
      "Generated 150+ verified high-intent B2B leads/month utilizing LinkedIn Sales Navigator and structured cold email cadences (+12% expansion in sales pipeline).",
      "Engineered comprehensive competitor benchmarking intelligence reports to identify key market opportunities.",
      "Authored 10+ custom client pitch decks, boosting meeting-to-proposal conversion rates by +20%.",
      "Built automated weekly performance tracking summaries, KPI scorecards, and dashboards in MS Excel."
    ],
    track: "data_ba",
    badges: ["Lead Generation", "Sales Navigator", "Pitch Decks", "Excel Dashboards", "+20% Conversion"]
  },
  {
    id: "dream-den",
    role: "Sales & Market Research Intern",
    company: "Dream Den Community",
    location: "College Enterprise Cell, Bengaluru",
    period: "May 2026 - Present",
    type: "Enterprise Cell Internship",
    description: [
      "Conducted extensive primary qualitative and quantitative market research with 200+ student & faculty respondents for a campus food-delivery concept.",
      "Directly negotiated with and successfully onboarded 15 local vendor partners onto the pilot network.",
      "Produced a data-backed market analysis report that shaped product pricing, delivery corridors, and go-to-market rollout."
    ],
    track: "data_ba",
    badges: ["Market Research", "200+ Survey Sample", "15 Vendor Onboarding", "Go-To-Market"]
  }
];
