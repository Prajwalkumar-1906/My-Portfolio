import { TTSProvider } from "./types";
import { ElevenLabsTTSProvider } from "./elevenlabs";

export * from "./types";
export * from "./budget";
export * from "./cache";
export * from "./elevenlabs";

let activeProvider: TTSProvider | null = null;

export function getTTSProvider(): TTSProvider {
  if (activeProvider) return activeProvider;

  const providerName = (process.env.TTS_PROVIDER || "elevenlabs").toLowerCase();

  switch (providerName) {
    case "elevenlabs":
    default:
      activeProvider = new ElevenLabsTTSProvider();
      break;
  }

  return activeProvider;
}
