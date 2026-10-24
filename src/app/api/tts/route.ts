import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTTSProvider, TTSBudgetTracker } from "@/lib/tts";

// Maximum character limit per TTS chunk/request
const MAX_TTS_CHARS = 600;

const ttsSchema = z.object({
  text: z
    .string()
    .min(1, "Text cannot be empty")
    .max(MAX_TTS_CHARS, `Text exceeds limit of ${MAX_TTS_CHARS} characters`),
  lang: z.string().optional().default("en-IN")
});

export async function POST(req: NextRequest) {
  try {
    // 1. Origin / Referer validation (Block external third-party embedding/scraping)
    const host = req.headers.get("host") || "";
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");

    if (origin) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json(
            { error: "Unauthorized cross-origin request", fallback: "browser" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid origin header", fallback: "browser" },
          { status: 403 }
        );
      }
    } else if (referer) {
      try {
        const refererUrl = new URL(referer);
        if (refererUrl.host !== host) {
          return NextResponse.json(
            { error: "Unauthorized referer request", fallback: "browser" },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Invalid referer header", fallback: "browser" },
          { status: 403 }
        );
      }
    }

    // 2. Client IP Rate Limiting (30 requests per minute)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateStatus = TTSBudgetTracker.checkRateLimit(clientIp, 30);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          error: "TTS rate limit exceeded. Please wait a moment or use local synthesizer.",
          fallback: "browser"
        },
        { status: 429 }
      );
    }

    // 3. Request body validation with Zod
    const body = await req.json().catch(() => null);
    const parseResult = ttsSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: parseResult.error.issues[0]?.message || "Invalid TTS payload",
          fallback: "browser"
        },
        { status: 400 }
      );
    }

    const { text, lang } = parseResult.data;

    // 4. Content Safety Filter (Guard against deceptive human impersonation or binding commitments)
    const lower = text.toLowerCase();
    if (
      lower.includes("i am a real human") ||
      lower.includes("i am not an ai") ||
      lower.includes("we agree to this contract") ||
      lower.includes("i guarantee the price of")
    ) {
      return NextResponse.json(
        {
          error: "Unpermitted phrase: All voice output is synthetic and non-binding.",
          fallback: "browser"
        },
        { status: 400 }
      );
    }

    // 5. Daily budget availability check
    if (!TTSBudgetTracker.canAfford(text.length)) {
      return NextResponse.json(
        {
          error: "Daily synthetic voice budget reached. Falling back to local browser synthesizer.",
          fallback: "browser"
        },
        { status: 429 }
      );
    }

    // 6. Synthesize audio via active provider (ElevenLabs with female voice default)
    const provider = getTTSProvider();
    const result = await provider.synthesize({ text, lang });

    // 7. Return streaming audio response
    const headers = new Headers();
    headers.set("Content-Type", result.format);
    headers.set(
      "Cache-Control",
      result.cached
        ? "public, max-age=604800, immutable"
        : "public, max-age=86400, stale-while-revalidate=86400"
    );
    headers.set("X-TTS-Provider", provider.name);
    headers.set("X-TTS-Cached", result.cached ? "true" : "false");
    headers.set("X-TTS-Chars", String(result.characterCount));

    return new NextResponse(result.audioStream, {
      status: 200,
      headers
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "TTS synthesis failed";
    console.warn(`[TTS Route Fallback] ${message}`);

    return NextResponse.json(
      {
        error: message,
        fallback: "browser"
      },
      { status: 503 }
    );
  }
}
