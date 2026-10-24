export interface ServiceItem {
  id: string;
  title: string;
  category: 'Speaking' | 'Coaching' | 'Marketing' | 'Technical' | 'Content';
  shortDesc: string;
  targetAudience: string;
  format: string;
  duration: string;
  outcomes: string[];
  popular?: boolean;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "public-speaking",
    title: "Public Speaking & Keynotes",
    category: "Speaking",
    shortDesc: "Captivating, high-energy keynotes on artificial intelligence, tech entrepreneurship, and youth leadership.",
    targetAudience: "Colleges, Universities, Tech Parks, Corporate Conclaves, Open-Air Events",
    format: "Keynote / Stage Presentation (In-person or Virtual)",
    duration: "45 to 90 minutes",
    outcomes: [
      "Inspire students and young professionals to tackle complex engineering and business challenges.",
      "Clear, jargon-free breakdown of future AI paradigms and ethical implications.",
      "Engaging audience Q&A with real-world case studies from ABB and national hackathons."
    ],
    popular: true
  },
  {
    id: "training-workshops",
    title: "Training & Technical Workshops",
    category: "Technical",
    shortDesc: "Hands-on, immersive workshops transforming theoretical concepts into working code and real-world pipelines.",
    targetAudience: "Engineering Students, Developer Communities, Corporate Teams",
    format: "Interactive Hands-on Lab / Workshop",
    duration: "Half-day (3-4 hrs) or Full-day (6-8 hrs)",
    outcomes: [
      "Guided implementation of working machine learning or full-stack architectures.",
      "Production practices: version control, test-driven development, and deployment.",
      "Resource kits, code repositories, and post-workshop follow-up exercises."
    ],
    popular: true
  },
  {
    id: "ai-software-technology",
    title: "AI & Software Technology Sessions",
    category: "Technical",
    shortDesc: "Deep-dive architecture walkthroughs covering Generative AI, Explainable ML (SHAP), and high-throughput systems.",
    targetAudience: "Tech Teams, CSE Faculties, Hackathon Participants",
    format: "Technical Masterclass & Live Code Demo",
    duration: "90 to 120 minutes",
    outcomes: [
      "Understand bias mitigation, SHAP interpretability, and ethical ML compliance.",
      "Deep-dive into microservices, WebSocket concurrency, and database optimizations.",
      "Architectural blueprints for scalable enterprise applications."
    ],
    popular: true
  },
  {
    id: "resume-review",
    title: "Resume Review & ATS Optimization",
    category: "Coaching",
    shortDesc: "Tactical, line-by-line critique to transform academic resumes into recruiter-magnetic dossiers.",
    targetAudience: "Final-year Students, Early Career Tech Job Seekers",
    format: "1-on-1 Video Session + Detailed Written Feedback",
    duration: "45 minutes",
    outcomes: [
      "ATS formatting and keyword matching for AI, Full-Stack, and Data Analytics roles.",
      "Action-verb restructuring and quantifiable metric positioning.",
      "Portfolio project reframing to stand out in high-volume screening."
    ]
  },
  {
    id: "interview-perception",
    title: "Interview Perception & Mock Interviews",
    category: "Coaching",
    shortDesc: "Comprehensive behavioral and technical mock interviews focusing on candidate posture, articulation, and problem-solving.",
    targetAudience: "Graduating Engineers, Aspirants targeting top tier product & service companies",
    format: "Simulated Technical / HR Interview + Video Critique",
    duration: "60 minutes",
    outcomes: [
      "Master the STAR method for behavioral and scenario-based inquiries.",
      "Real-time feedback on pacing, confidence, and answering structure.",
      "Techniques to unpack system design and algorithmic reasoning live under pressure."
    ]
  },
  {
    id: "career-development",
    title: "Career Development Coaching",
    category: "Coaching",
    shortDesc: "Strategic career roadmapping across engineering, data analytics, and product management.",
    targetAudience: "Students navigating transitions into IT and Data domains",
    format: "Personalized Strategy Session",
    duration: "60 minutes",
    outcomes: [
      "Personalized 3-6-12 month technical and networking milestones.",
      "Leveraging LinkedIn and GitHub to generate inbound opportunities.",
      "Balancing core engineering rigor with business development fluency."
    ]
  },
  {
    id: "life-coaching",
    title: "Life Coaching & Personal Growth",
    category: "Coaching",
    shortDesc: "Mindset mastery, discipline frameworks, and purpose-driven focus for high-performing young leaders.",
    targetAudience: "Young Achievers, Student Leaders, Community Volunteers",
    format: "Confidential 1-on-1 Mentorship",
    duration: "60 minutes",
    outcomes: [
      "Goal-setting blueprints and daily execution habits.",
      "Navigating burnout, academic pressure, and leadership stress.",
      "Clarity on personal purpose and value creation."
    ]
  },
  {
    id: "product-marketing",
    title: "Product Marketing",
    category: "Marketing",
    shortDesc: "Aligning technical product capabilities with market demand, customer personas, and go-to-market strategies.",
    targetAudience: "Early-stage Startups, Student Entrepreneurs, College Cells",
    format: "Advisory Sprint & Go-To-Market Workshop",
    duration: "Custom Project Engagement",
    outcomes: [
      "Value proposition positioning and competitive battlecards.",
      "Early adopter customer interviews and feedback loops.",
      "Go-to-market launch playbooks based on campus and B2B validation."
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Brand Growth",
    category: "Marketing",
    shortDesc: "Data-driven organic growth, social brand positioning, and B2B lead generation campaigns.",
    targetAudience: "Businesses, Academic Institutions, Creator Portfolios",
    format: "Consulting / Campaign Strategy",
    duration: "Sprint or Retainer",
    outcomes: [
      "LinkedIn thought leadership frameworks (proven with 8K+ follower base).",
      "Sales Navigator query design and cold email workflows.",
      "Funnel analytics and conversion rate optimization."
    ]
  },
  {
    id: "enterprise-content-mgmt",
    title: "Enterprise Content Management",
    category: "Content",
    shortDesc: "Structuring, organizing, and distributing knowledge assets across teams and customer portals.",
    targetAudience: "Corporate Departments, Communities, Training Institutes",
    format: "System Architecture & Content Audit",
    duration: "Project-based",
    outcomes: [
      "Standardized documentation hierarchies and searchable knowledge repositories.",
      "Streamlined onboarding kits and team playbooks.",
      "Integration of automated content pipelines."
    ]
  },
  {
    id: "ghost-writing",
    title: "Ghost Writing & Executive Thought Leadership",
    category: "Content",
    shortDesc: "High-impact articles, LinkedIn essays, and speeches capturing executive voice and industry insight.",
    targetAudience: "Founders, Tech Executives, Thought Leaders",
    format: "Retainer / Per Article",
    duration: "Milestone-based",
    outcomes: [
      "Authentic, compelling editorial pieces tailored for executive brand building.",
      "Research-backed technical commentary on emerging AI and business trends.",
      "Consistent publishing cadence that attracts enterprise leads and talent."
    ]
  }
];

export const SPEAKING_VENUES = [
  "Colleges & Universities",
  "Schools & Pre-University Institutes",
  "Tech Parks & Innovation Hubs",
  "Open-Air Theatres & Cultural Stages",
  "Corporate Events & Annual Conclaves",
  "Meetups & National Hackathons"
];

export const PROOF_METRICS = [
  {
    title: "100+ Students Trained",
    subtitle: "Dream Den GenAI Workshop",
    description: "Conducted hands-on sessions introducing Generative AI, prompt engineering, and modern APIs."
  },
  {
    title: "300+ Summit Participants",
    subtitle: "Inter-College B-Plan Summit",
    description: "Led a 12-member organizing committee coordinating multi-institution business competitions."
  },
  {
    title: "Marketing Head",
    subtitle: "Dream Den Community",
    description: "Spearheaded community growth, partner outreach, and vendor ecosystem onboarding."
  },
  {
    title: "Top 5 Finalist",
    subtitle: "Coding Ninjas Vibe2ship Hackathon",
    description: "Built and pitched the Community Hero platform in 36 hours among 30+ regional teams."
  },
  {
    title: "Public Speaker & Mentor",
    subtitle: "Multi-Disciplinary Impact",
    description: "Delivered sessions across colleges and youth forums inspiring engineering rigor and purpose."
  }
];

// Structured placeholder for real testimonials (strictly no fabricated quotes)
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  isPlaceholder: boolean;
}

export const TESTIMONIALS: TestimonialItem[] = [
  // TODO: Add authentic testimonials from event organizers, attendees, and mentors
  {
    id: "placeholder-1",
    name: "Event Organizers & Attendees",
    role: "Campus & Corporate Leadership",
    organization: "Colleges & Industry Forums",
    quote: "Official feedback and verified endorsements from recent training programs and speaker keynotes will be featured here upon post-session survey sign-offs.",
    isPlaceholder: true
  }
];
