export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  coursework?: string[];
  website: string;
  image: string;
  badge: string;
  // Flag for missing details note
  hasPendingDetails?: boolean;
}

export const EDUCATION: EducationItem[] = [
  {
    id: "rrce",
    institution: "Rajarajeswari College of Engineering (RRCE)",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    period: "2023 - 2027",
    grade: "CGPA 7.7 / 10",
    coursework: [
      "Machine Learning",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Technologies",
      "Statistics & Probability",
      "Data Mining"
    ],
    website: "https://www.rrce.org/",
    image: "/assets/webp/RRCE.webp",
    badge: "Graduating 2027"
  },
  {
    id: "tungal",
    institution: "Tungal PU College, Vijayapura",
    degree: "Senior Secondary (XII)",
    field: "Science Stream (PCMB)",
    period: "2021 - 2023",
    grade: "82%",
    coursework: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Kannada"],
    website: "https://www.tungalschools.com/",
    image: "/assets/webp/Tungal.webp",
    badge: "82% Distinction"
  },
  {
    id: "sathya-sai-grama",
    institution: "Sathya Sai Grama",
    degree: "Foundational Schooling",
    field: "General Education & Value Systems",
    // TODO: add details - exact years and details not provided in source resume
    period: "Foundational Years",
    hasPendingDetails: true,
    website: "https://www.sathyasaigrama.com/",
    image: "/assets/webp/Sathya_sai_grama.webp",
    badge: "Foundational Campus"
  }
];

export interface CertificationItem {
  id: string;
  issuer: string;
  title: string;
  year?: string;
  category: 'AI' | 'Cloud' | 'Business' | 'Data';
  badgeColor: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "anthropic-ai",
    issuer: "Anthropic",
    title: "AI Fluency: Frameworks and Foundations",
    category: "AI",
    badgeColor: "bg-red-950/60 text-red-400 border-red-800/50"
  },
  {
    id: "google-gemini",
    issuer: "Google",
    title: "Gemini Enterprise Application",
    category: "AI",
    badgeColor: "bg-blue-950/60 text-blue-400 border-blue-800/50"
  },
  {
    id: "nvidia-jetson",
    issuer: "NVIDIA",
    title: "Getting Started with AI on Jetson Nano",
    category: "AI",
    badgeColor: "bg-emerald-950/60 text-emerald-400 border-emerald-800/50"
  },
  {
    id: "oracle-cloud",
    issuer: "Oracle",
    title: "Oracle Cloud Infrastructure (OCFA)",
    category: "Cloud",
    badgeColor: "bg-amber-950/60 text-amber-400 border-amber-800/50"
  },
  {
    id: "salesforce-crm",
    issuer: "Salesforce",
    title: "Sales & Business (CRM) Development Fundamentals",
    year: "2026",
    category: "Business",
    badgeColor: "bg-cyan-950/60 text-cyan-400 border-cyan-800/50"
  },
  {
    id: "excel-business",
    issuer: "Coursera / Macquarie University",
    title: "Excel Skills for Business",
    year: "2026",
    category: "Data",
    badgeColor: "bg-green-950/60 text-green-400 border-green-800/50"
  },
  {
    id: "google-marketing",
    issuer: "Google",
    title: "Fundamentals of Digital Marketing",
    year: "2025",
    category: "Business",
    badgeColor: "bg-purple-950/60 text-purple-400 border-purple-800/50"
  }
];

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'trophy' | 'award' | 'code' | 'users' | 'heart' | 'mic';
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "vibe2ship",
    title: "Top 5 / 30+ Teams Finalist",
    subtitle: "Coding Ninjas Vibe2ship Hackathon",
    description: "Built the Community Hero rapid-assistance platform in a 36-hour sprint, competing against premier collegiate engineering teams.",
    iconType: "trophy"
  },
  {
    id: "techpitch",
    title: "Runner-Up, TechPitch RRCE",
    subtitle: "SMS-Based Payment System",
    description: "Recognized for innovative cryptographic offline tokenization design enabling digital transactions without mobile internet.",
    iconType: "award"
  },
  {
    id: "dream-den-lead",
    title: "Marketing Head & Community Manager",
    subtitle: "Dream Den Club & Enterprise Cell",
    description: "Organized GenAI workshop for 100+ students and directed a 12-member committee hosting an inter-college B-plan competition with 300+ attendees.",
    iconType: "users"
  },
  {
    id: "leetcode",
    title: "30+ LeetCode Problems Solved",
    subtitle: "Algorithmic Problem Solving",
    description: "Consistent problem solver honing Data Structures & Algorithms across graph traversal, dynamic programming, and heaps.",
    iconType: "code"
  },
  {
    id: "social-impact",
    title: "Community Volunteer & Fundraiser",
    subtitle: "One World One Family & Annapurna Trust",
    description: "Coordinated volunteer drives raising over Rs. 50,000 for local children's education; supported morning nutrition programs.",
    iconType: "heart"
  },
  {
    id: "speaker-creator",
    title: "Public Speaker & Content Creator",
    subtitle: "8K+ Followers on LinkedIn",
    description: "Regular speaker at technical symposiums, youth assemblies, and colleges; sharing insights on AI, business models, and career design.",
    iconType: "mic"
  }
];
