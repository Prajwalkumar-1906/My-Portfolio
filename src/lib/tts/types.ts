export interface TTSRequest {
  text: string;
  lang?: string; // "en-IN", "hi-IN", "kn-IN", etc.
  voiceId?: string;
}

export interface TTSResult {
  audioStream: ReadableStream<Uint8Array> | ArrayBuffer;
  format: "audio/mpeg" | "audio/wav";
  characterCount: number;
  cached?: boolean;
}

export interface TTSProvider {
  name: string;
  synthesize(req: TTSRequest): Promise<TTSResult>;
}

export interface TTSBudgetStatus {
  dailyLimit: number;
  usedToday: number;
  remainingToday: number;
  isExceeded: boolean;
  resetAt: string;
}
