import { TTSBudgetStatus } from "./types";

interface DailyRecord {
  date: string;
  charCount: number;
}

// In-memory rate limiter for client IPs: max 30 requests per minute
interface IPRateRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, IPRateRecord>();
let currentDailyRecord: DailyRecord = {
  date: new Date().toISOString().slice(0, 10),
  charCount: 0
};

export class TTSBudgetTracker {
  private static getDailyLimit(): number {
    const raw = process.env.TTS_DAILY_CHAR_LIMIT;
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 50000; // default 50k characters per day budget (~80-100 spoken responses)
  }

  private static syncDate(): void {
    const today = new Date().toISOString().slice(0, 10);
    if (currentDailyRecord.date !== today) {
      currentDailyRecord = { date: today, charCount: 0 };
    }
  }

  public static canAfford(charsNeeded: number): boolean {
    this.syncDate();
    const limit = this.getDailyLimit();
    return currentDailyRecord.charCount + charsNeeded <= limit;
  }

  public static recordUsage(charsUsed: number): void {
    this.syncDate();
    currentDailyRecord.charCount += charsUsed;
    console.info(
      `[TTS_BUDGET] Consumed: ${charsUsed} chars | Total Today: ${currentDailyRecord.charCount}/${this.getDailyLimit()} chars (Date: ${currentDailyRecord.date})`
    );
  }

  public static getStatus(): TTSBudgetStatus {
    this.syncDate();
    const limit = this.getDailyLimit();
    const used = currentDailyRecord.charCount;
    const remaining = Math.max(0, limit - used);
    
    // Calculate midnight UTC reset
    const tomorrow = new Date();
    tomorrow.setUTCHours(24, 0, 0, 0);

    return {
      dailyLimit: limit,
      usedToday: used,
      remainingToday: remaining,
      isExceeded: used >= limit,
      resetAt: tomorrow.toISOString()
    };
  }

  public static checkRateLimit(ip: string, maxPerMinute = 30): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = ipMap.get(ip);

    if (!record || now > record.resetTime) {
      ipMap.set(ip, { count: 1, resetTime: now + 60000 });
      return { allowed: true, remaining: maxPerMinute - 1 };
    }

    if (record.count >= maxPerMinute) {
      return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: maxPerMinute - record.count };
  }
}
