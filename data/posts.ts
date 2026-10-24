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
    slug: "building-fair-and-explainable-ai-with-shap-and-fairlearn",
    title: "Why Black-Box AI Fails in Hiring: Auditing PlaceWise with SHAP & Fairlearn",
    date: "Oct 2026",
    readTime: "5 min read",
    category: "AI & Ethics",
    snippet: "How we eliminated demographic disparity across college tiers using sample reweighing and counterfactual explanations.",
    content: "Machine learning models trained on historical hiring data inherit human biases. In this technical deep-dive, we explore how PlaceWise achieved zero demographic disparity while providing transparent per-candidate SHAP attribution."
  },
  {
    id: "post-2",
    slug: "solving-cashflow-minimization-with-bitmask-dp",
    title: "Graph Algorithms in Chukta: Optimal Cashflow Settlement via Bitmask DP",
    date: "Sep 2026",
    readTime: "6 min read",
    category: "System Design",
    snippet: "From greedy max-heaps to NP-hard debt minimization: how we engineered integer paise financial settlement at scale.",
    content: "When settling expenses among groups, minimizing total transactions is an NP-hard problem. Here is how Chukta balances greedy heuristics with dynamic programming over subsets for real-time split settlement."
  },
  {
    id: "post-3",
    slug: "from-campus-to-enterprise-engineering-mindset",
    title: "From College Projects to ABB: The Mindset Shift of an AI Intern",
    date: "Aug 2026",
    readTime: "4 min read",
    category: "Career & Engineering",
    snippet: "Key lessons learned moving from Kaggle notebooks to industrial production systems, observability, and cross-functional impact.",
    content: "Transitioning to enterprise AI at ABB taught me that model accuracy is only 20% of the battle. The remaining 80% lies in data cleanliness, pipeline idempotence, and reliable stakeholder integration."
  }
];
