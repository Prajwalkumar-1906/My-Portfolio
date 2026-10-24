import crypto from "crypto";

interface CacheEntry {
  buffer: ArrayBuffer;
  format: "audio/mpeg";
  createdAt: number;
}

// In-memory audio response cache keyed by SHA-256
const memoryCache = new Map<string, CacheEntry>();
const MAX_CACHE_ENTRIES = 120;

export class TTSAudioCache {
  public static computeKey(text: string, lang = "en-IN", voiceId = "default"): string {
    const normalized = text.trim().toLowerCase().replace(/\s+/g, " ");
    return crypto
      .createHash("sha256")
      .update(`${voiceId}:${lang}:${normalized}`)
      .digest("hex");
  }

  public static get(key: string): ArrayBuffer | null {
    const entry = memoryCache.get(key);
    if (!entry) return null;
    return entry.buffer;
  }

  public static set(key: string, buffer: ArrayBuffer): void {
    if (memoryCache.size >= MAX_CACHE_ENTRIES) {
      // Evict oldest entry
      const oldestKey = memoryCache.keys().next().value;
      if (oldestKey) memoryCache.delete(oldestKey);
    }

    memoryCache.set(key, {
      buffer,
      format: "audio/mpeg",
      createdAt: Date.now()
    });
  }

  public static has(key: string): boolean {
    return memoryCache.has(key);
  }

  public static getCacheSize(): number {
    return memoryCache.size;
  }
}
