import { NextRequest, NextResponse } from "next/server";
import knowledge from "@/data/knowledge.json";

// Keyword-based offline grounded matcher
function findGroundedAnswer(userQuery: string): string | null {
  const q = userQuery.toLowerCase();

  // Route commands
  if (q.includes("take me to") || q.includes("go to") || q.includes("open page")) {
    if (q.includes("recruiter")) return "NAVIGATE:/recruiter";
    if (q.includes("browse") || q.includes("journey") || q.includes("trailer")) return "NAVIGATE:/browse";
    if (q.includes("session") || q.includes("speak") || q.includes("workshop") || q.includes("book")) return "NAVIGATE:/sessions";
    if (q.includes("network") || q.includes("connect")) return "NAVIGATE:/network";
    if (q.includes("contact")) return "NAVIGATE:/contact";
  }

  for (const item of knowledge.faq) {
    for (const kw of item.keywords) {
      if (q.includes(kw.toLowerCase())) {
        return item.answer;
      }
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "Message exceeds allowed length" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // First check grounded FAQ matcher
    const grounded = findGroundedAnswer(message);

    // If API key is available, we can query Gemini with strict grounding system prompt
    if (apiKey) {
      try {
        const systemInstruction = `
${knowledge.systemPrompt}
Strict rules:
1. Answer ONLY using the facts from this portfolio knowledge base.
2. If the user asks anything outside Prajwal's portfolio (e.g. general questions, unverified prices, private salary, personal secrets), reply: "${knowledge.fallbackMessage}".
3. Always be crisp, polite, and executive-ready.
Knowledge Context:
${JSON.stringify(knowledge.faq)}
        `.trim();

        const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { role: "user", parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 300
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply: reply.trim() });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to grounded knowledge engine:", geminiError);
      }
    }

    // Fallback to grounded FAQ answer or strict safe fallback message
    if (grounded) {
      return NextResponse.json({ reply: grounded });
    }

    // Log unanswered questions (sanitized, no PII) to help Prajwal improve the knowledge base
    const sanitizedQuery = message.slice(0, 100).replace(/[^\w\s\?\-]/gi, "").trim();
    console.info(`[KNOWLEDGE_BASE_AUDIT] Unanswered query logged: "${sanitizedQuery}"`);

    return NextResponse.json({ reply: knowledge.fallbackMessage });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "I don't have that information; you can email Prajwal at pkm.digi@gmail.com." },
      { status: 500 }
    );
  }
}
