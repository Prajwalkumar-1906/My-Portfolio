export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  snippet: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "ai-fairness-in-hiring",
    title: "Why Black-Box AI Fails in Hiring: Auditing Predictive Models with SHAP & Fairlearn",
    date: "Oct 2026",
    readTime: "5 min read",
    category: "AI & Ethics",
    snippet: "Eliminating demographic disparity across gender and college tiers through sample reweighing and local SHAP explanations in PlaceWise.",
    content: "Machine learning models trained on historical hiring logs inherit human biases. In this essay, we break down how PlaceWise achieved demographic parity and equalized odds using Fairlearn mitigation and SHAP local attribution, offering students counterfactual paths to improvement."
  },
  {
    id: "post-2",
    slug: "from-hackathon-to-product",
    title: "From Hackathon to Production: Turning a 36-Hour Prototype into a Scalable Platform",
    date: "Sep 2026",
    readTime: "6 min read",
    category: "Product & Architecture",
    snippet: "Lessons from placing Top 5 among 30+ teams at Coding Ninjas Vibe2ship: architectural trade-offs, state management, and post-hackathon refactoring.",
    content: "Building under severe 36-hour constraints forces radical prioritization. Here is how our team structured Community Hero and how the lessons learned translate into high-reliability platforms like Chukta with strict integer paise math and socket resilience."
  },
  {
    id: "post-3",
    slug: "public-speaking-tips-students",
    title: "Mastering the Stage: Public Speaking and Perception Strategies for Engineering Students",
    date: "Aug 2026",
    readTime: "4 min read",
    category: "Public Speaking & Career",
    snippet: "How engineering students can bridge technical depth with stage magnetism, articulate thinking under pressure, and leave lasting impressions.",
    content: "Technical ability gets you in the room; communication determines the magnitude of your impact. Drawing from keynote experiences across colleges and leading GenAI workshops for 100+ students, here are tactical strategies for vocal pacing, audience connection, and structured STAR storytelling."
  }
];
