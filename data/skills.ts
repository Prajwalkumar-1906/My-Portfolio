export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    usedIn?: string; // Associated project id
    isPrimary?: boolean;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { name: "Python", usedIn: "placewise", isPrimary: true },
      { name: "JavaScript / TypeScript", usedIn: "chukta", isPrimary: true },
      { name: "SQL", usedIn: "customer-retention-engine", isPrimary: true },
      { name: "C", isPrimary: false }
    ]
  },
  {
    id: "aiml",
    name: "AI & Machine Learning",
    skills: [
      { name: "PyTorch", isPrimary: true },
      { name: "scikit-learn", usedIn: "placewise", isPrimary: true },
      { name: "XGBoost", usedIn: "placewise", isPrimary: true },
      { name: "SHAP (Explainable AI)", usedIn: "placewise", isPrimary: true },
      { name: "Fairlearn (Fairness ML)", usedIn: "placewise", isPrimary: true },
      { name: "TensorFlow", isPrimary: false },
      { name: "Hugging Face Transformers", isPrimary: true },
      { name: "LangChain", isPrimary: true },
      { name: "Prompt Engineering", isPrimary: true },
      { name: "OpenCV", isPrimary: false },
      { name: "NumPy & pandas", usedIn: "customer-retention-engine", isPrimary: true }
    ]
  },
  {
    id: "fullstack",
    name: "Full-Stack Development",
    skills: [
      { name: "Next.js", usedIn: "chukta", isPrimary: true },
      { name: "React.js", usedIn: "community-hero", isPrimary: true },
      { name: "Node.js & Express.js", usedIn: "chukta", isPrimary: true },
      { name: "REST APIs", usedIn: "chukta", isPrimary: true },
      { name: "Socket.IO (Real-time)", usedIn: "chukta", isPrimary: true },
      { name: "HTML5 / Modern CSS", isPrimary: false }
    ]
  },
  {
    id: "data_bi",
    name: "Data Analytics & BI",
    skills: [
      { name: "Power BI", isPrimary: true },
      { name: "Tableau", isPrimary: false },
      { name: "MS Excel (VLOOKUP, Pivot, Dashboards)", usedIn: "galaxy-systems", isPrimary: true },
      { name: "Data Cleaning & Wrangling", usedIn: "ksst", isPrimary: true },
      { name: "Matplotlib & Seaborn", isPrimary: false },
      { name: "Statsmodels", isPrimary: false }
    ]
  },
  {
    id: "databases",
    name: "Databases & Caching",
    skills: [
      { name: "PostgreSQL", usedIn: "chukta", isPrimary: true },
      { name: "Redis", usedIn: "chukta", isPrimary: true },
      { name: "MongoDB", usedIn: "community-hero", isPrimary: false },
      { name: "MySQL / MS SQL Server", isPrimary: false }
    ]
  },
  {
    id: "devops",
    name: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", isPrimary: true },
      { name: "Docker", usedIn: "chukta", isPrimary: true },
      { name: "CI/CD (GitHub Actions)", usedIn: "placewise", isPrimary: true },
      { name: "Postman", isPrimary: false },
      { name: "Jupyter", isPrimary: false },
      { name: "AWS Basics", isPrimary: false }
    ]
  },
  {
    id: "stats_ml",
    name: "ML & Statistics Concepts",
    skills: [
      { name: "Regression & Classification", usedIn: "customer-retention-engine", isPrimary: true },
      { name: "Clustering", isPrimary: false },
      { name: "Hypothesis & A/B Testing", isPrimary: true },
      { name: "NLP (TF-IDF, Sentiment Analysis)", isPrimary: true },
      { name: "Explainable AI (SHAP)", usedIn: "placewise", isPrimary: true },
      { name: "Fairness-Aware Machine Learning", usedIn: "placewise", isPrimary: true }
    ]
  },
  {
    id: "bizdev",
    name: "Business Development & Sales",
    skills: [
      { name: "Lead Generation", usedIn: "galaxy-systems", isPrimary: true },
      { name: "LinkedIn Sales Navigator", usedIn: "galaxy-systems", isPrimary: true },
      { name: "Market & Competitor Research", usedIn: "dream-den", isPrimary: true },
      { name: "Pitch Decks & Client Presentations", usedIn: "galaxy-systems", isPrimary: true },
      { name: "CRM (Salesforce, Zoho)", isPrimary: false },
      { name: "Cold Outreach & Negotiation", isPrimary: true }
    ]
  },
  {
    id: "core_cs",
    name: "Core Computer Science",
    skills: [
      { name: "Data Structures & Algorithms (DSA)", isPrimary: true },
      { name: "Object-Oriented Programming (OOP)", isPrimary: true },
      { name: "Database Management Systems (DBMS)", isPrimary: true },
      { name: "Operating Systems (OS)", isPrimary: false },
      { name: "Computer Networks", isPrimary: false }
    ]
  }
];

// Flat list for 3D Globe visualization with coordinates & relevance
export interface GlobeSkill {
  name: string;
  category: string;
  size: number;
}

export const GLOBE_SKILLS: GlobeSkill[] = [
  { name: "Python", category: "Languages", size: 1.4 },
  { name: "PyTorch", category: "AI/ML", size: 1.3 },
  { name: "Next.js", category: "Full-Stack", size: 1.3 },
  { name: "TypeScript", category: "Languages", size: 1.2 },
  { name: "SHAP AI", category: "AI/ML", size: 1.2 },
  { name: "SQL", category: "Data", size: 1.2 },
  { name: "Power BI", category: "Data", size: 1.2 },
  { name: "PostgreSQL", category: "Database", size: 1.1 },
  { name: "Redis", category: "Database", size: 1.1 },
  { name: "Docker", category: "DevOps", size: 1.1 },
  { name: "XGBoost", category: "AI/ML", size: 1.2 },
  { name: "Fairlearn", category: "AI/ML", size: 1.1 },
  { name: "React", category: "Full-Stack", size: 1.2 },
  { name: "Socket.IO", category: "Full-Stack", size: 1.0 },
  { name: "LangChain", category: "AI/ML", size: 1.1 },
  { name: "Excel BI", category: "Data", size: 1.1 },
  { name: "Sales Nav", category: "BizDev", size: 1.1 },
  { name: "Public Speaking", category: "Speaking", size: 1.3 },
  { name: "DSA", category: "Core CS", size: 1.2 },
  { name: "CI/CD", category: "DevOps", size: 1.0 }
];
