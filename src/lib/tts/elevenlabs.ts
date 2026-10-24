import { TTSProvider, TTSRequest, TTSResult } from "./types";
import { TTSAudioCache } from "./cache";
import { TTSBudgetTracker } from "./budget";

// Default curated ElevenLabs female voice for Srushti (warm, articulate, professional)
// Can be customized anytime via ELEVENLABS_VOICE_ID in .env
const DEFAULT_FEMALE_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Professional female voice

export class ElevenLabsTTSProvider implements TTSProvider {
  public name = "ElevenLabs";

  private getApiKey(): string | undefined {
    return process.env.ELEVENLABS_API_KEY;
  }

  private getVoiceId(overrideVoiceId?: string): string {
    return (
      overrideVoiceId ||
      process.env.ELEVENLABS_VOICE_ID ||
      DEFAULT_FEMALE_VOICE_ID
    );
  }

  public async synthesize(req: TTSRequest): Promise<TTSResult> {
    const text = req.text.trim();
    const charCount = text.length;

    // Check budget before proceeding
    if (!TTSBudgetTracker.canAfford(charCount)) {
      throw new Error("TTS daily budget limit reached. Please use local voice fallback.");
    }

    const voiceId = this.getVoiceId(req.voiceId);
    const lang = req.lang || "en-IN";
    const cacheKey = TTSAudioCache.computeKey(text, lang, voiceId);

    // 1. Check server cache first
    const cachedBuffer = TTSAudioCache.get(cacheKey);
    if (cachedBuffer) {
      return {
        audioStream: cachedBuffer,
        format: "audio/mpeg",
        characterCount: charCount,
        cached: true
      };
    }

    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY is not configured on the server.");
    }

    // 2. Query ElevenLabs Text-to-Speech API
    // Using eleven_multilingual_v2 for natural English, Hindi, and Kannada pronunciation
    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg"
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.65,
          similarity_boost: 0.8,
          style: 0.15,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ElevenLabs TTS Error] Status: ${response.status}`, errorText);
      throw new Error(`ElevenLabs synthesis failed: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // 3. Cache the audio buffer and record budget usage
    TTSAudioCache.set(cacheKey, arrayBuffer);
    TTSBudgetTracker.recordUsage(charCount);

    return {
      audioStream: arrayBuffer,
      format: "audio/mpeg",
      characterCount: charCount,
      cached: false
    };
  }
}
