export interface ProfileData {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
  instagramHandle: string;
  twitter: string;
  twitterHandle: string;
  whatsapp: string; // Optional WhatsApp phone link
  calendly: string; // Optional Calendly / Cal.com link
  languages: string[];
  statusBadge: string;
  nowPlaying: {
    role: string;
    focus: string;
    status: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  tracks: {
    id: 'aiml' | 'data_ba';
    seasonLabel: string;
    roleTitle: string;
    summary: string;
    resumePdf: string;
    resumeFileName: string;
    preferredRoles: string[];
    skillsHighlight: string[];
  }[];
  elevatorPitch: string;
}

export const PROFILE: ProfileData = {
  name: "Prajwalkumar",
  fullName: "Prajwalkumar Madiwal",
  title: "AI/ML & Full-Stack Engineer | Data & Business Analyst",
  tagline: "AI/ML & Full-Stack Engineer | Data & Business Analyst | Multi-Disciplinary Public Speaker, Thinker & Business Developer",
  location: "Bengaluru, Karnataka, India",
  email: "pkm.digi@gmail.com",
  linkedin: "https://www.linkedin.com/in/prajwalkumarm/",
  github: "https://github.com/Prajwalkumar-1906",
  instagram: "https://www.instagram.com/foreverprajwalkumar/",
  instagramHandle: "@foreverprajwalkumar",
  twitter: "https://x.com/prajwalkumar_19",
  twitterHandle: "@prajwalkumar_19",
  whatsapp: "", // Configurable via NEXT_PUBLIC_WHATSAPP_PHONE
  calendly: "", // Configurable via NEXT_PUBLIC_CALENDLY_URL
  languages: ["English", "Hindi", "Kannada", "Telugu", "Marathi"],
  statusBadge: "Open to Work",
  nowPlaying: {
    role: "AI Intern @ ABB",
    focus: "Building: AI Interview Coach (Active Sprint)",
    status: "Available for Full-Time Roles & Stage Keynotes"
  },
  stats: [
    { label: "Followers", value: "8K+", description: "Professional audience on LinkedIn" },
    { label: "Students Trained", value: "100+", description: "In GenAI hands-on workshops (Dream Den)" },
    { label: "Participants Led", value: "300+", description: "Across inter-college B-plan summits" },
    { label: "B2B Leads / Month", value: "150+", description: "Sourced via LinkedIn Sales Navigator (Galaxy Systems)" },
    { label: "Survey Respondents", value: "200+", description: "Primary campus market research" },
    { label: "Vendors Onboarded", value: "15", description: "Campus food delivery network" },
    { label: "Funds Raised", value: "Rs. 50,000+", description: "For local education with One World One Family" },
    { label: "LeetCode Solved", value: "30+", description: "Core DSA & algorithmic challenges" },
    { label: "Hackathon Standing", value: "Top 5 / 30+", description: "Coding Ninjas Vibe2ship Hackathon" }
  ],
  tracks: [
    {
      id: "aiml",
      seasonLabel: "Season 1",
      roleTitle: "AI/ML & Full-Stack Engineer",
      summary: "Final-year Computer Science Engineering student with hands-on experience in AI/ML and full-stack development, building intelligent, data-driven applications. Proficient in Python, machine learning, explainable AI (SHAP), fairness-aware modelling and modern web technologies. Delivered end-to-end projects in AI-powered placement prediction, bias mitigation and real-time expense settlement. Strong problem-solving, product-oriented mindset, hackathon achievements, technical community leadership and public speaking.",
      resumePdf: "/resumes/Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf",
      resumeFileName: "Prajwalkumar_Madiwal_AIML_FullStack_Resume.pdf",
      preferredRoles: ["AI/ML Engineer", "Full-Stack Developer", "Software Engineer"],
      skillsHighlight: ["Python", "PyTorch", "XGBoost", "SHAP", "Next.js", "PostgreSQL", "Redis", "Docker"]
    },
    {
      id: "data_ba",
      seasonLabel: "Season 2",
      roleTitle: "Data Analyst | Business Analyst | Business Development Associate",
      summary: "Final-year B.E. CSE student (2027) combining data analytics with hands-on business development. Proficient in Python, SQL, Power BI and Excel for data cleaning, EDA, machine learning and dashboarding, plus lead generation, market research and client outreach from two internships. Seeking Data Analyst, Business Analyst or Business Development Associate roles.",
      resumePdf: "/resumes/Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf",
      resumeFileName: "Prajwalkumar_Madiwal_Data_Analyst_Resume.pdf",
      preferredRoles: ["Data Analyst", "Business Analyst", "Business Development Associate"],
      skillsHighlight: ["Python", "SQL", "Power BI", "Excel (VLOOKUP, Pivot, Dashboards)", "EDA", "Lead Gen", "Sales Navigator"]
    }
  ],
  elevatorPitch: "Hi! I am Prajwalkumar Madiwal, a final-year CSE engineer at RRCE Bengaluru and AI Intern at ABB. I build intelligent, fair, and scalable AI and full-stack applications like PlaceWise and Chukta, backed by proven data analytics and B2B growth execution. I'm actively looking for full-time opportunities in AI/ML, Full-Stack, and Data/Business Analytics."
};
