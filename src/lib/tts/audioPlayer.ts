"use client";

export type PlaybackSpeed = 0.9 | 1.0 | 1.15;

export interface AudioPlayerCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onSubtitle?: (sentence: string | null) => void;
  onAudioLevel?: (level: number) => void;
  onFallbackNotice?: (notice: string) => void;
}

export class ClonedAudioPlayer {
  private static instance: ClonedAudioPlayer | null = null;

  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private audioElement: HTMLAudioElement | null = null;

  private queue: string[] = [];
  private isPlaying = false;
  private isPaused = false;
  private currentBlobUrl: string | null = null;

  private speed: PlaybackSpeed = 1.0;
  private volume = 1.0;
  private currentLang = "en-IN";
  private callbacks: AudioPlayerCallbacks = {};

  private constructor() {
    // Lazily initialized in browser on first user gesture
  }

  public static getInstance(): ClonedAudioPlayer {
    if (!ClonedAudioPlayer.instance) {
      ClonedAudioPlayer.instance = new ClonedAudioPlayer();
    }
    return ClonedAudioPlayer.instance;
  }

  public setCallbacks(callbacks: AudioPlayerCallbacks): void {
    this.callbacks = callbacks;
  }

  private initAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 64;
      }
    }

    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    return this.audioCtx;
  }

  private startLevelLoop(): void {
    if (!this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const update = () => {
      if (!this.isPlaying || this.isPaused) {
        this.callbacks.onAudioLevel?.(0);
        return;
      }

      this.analyser?.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      // Normalized between 0 and 1
      const normalized = Math.min(1, avg / 128);
      this.callbacks.onAudioLevel?.(normalized);

      this.animFrameId = requestAnimationFrame(update);
    };

    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.animFrameId = requestAnimationFrame(update);
  }

  private stopLevelLoop(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.callbacks.onAudioLevel?.(0);
  }

  // Chunk text into sentence-sized blocks
  public chunkText(rawText: string): string[] {
    const clean = rawText
      .replace(/[*_#`~]/g, "")
      .replace(/https?:\/\/\S+/g, "link provided below")
      .trim();

    // If text exceeds 600 chars, take first 2 sentences + summary notice
    if (clean.length > 550) {
      const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) || [clean];
      const shortIntro = sentences.slice(0, 2).join(" ").trim();
      return [
        shortIntro,
        "The full comprehensive details are displayed on screen."
      ];
    }

    // Split on sentence boundaries (.!?) or newlines
    const rawChunks = clean.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [clean];
    const chunks: string[] = [];

    for (const chunk of rawChunks) {
      const trimmed = chunk.trim();
      if (trimmed.length > 0) {
        chunks.push(trimmed);
      }
    }

    return chunks.length > 0 ? chunks : [clean];
  }

  // Fallback to local browser SpeechSynthesis (selecting female voice when available)
  private speakWithBrowser(text: string, lang: string): void {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      this.callbacks.onSubtitle?.(null);
      this.callbacks.onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#]/g, "").replace(/https?:\/\/\S+/g, "link provided below");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = this.speed;
    utterance.volume = this.volume;

    // Pick best available female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        (v.lang.startsWith(lang.slice(0, 2)) || v.lang.includes("en")) &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("veena") ||
          v.name.toLowerCase().includes("aditi") ||
          v.name.toLowerCase().includes("google uk english female"))
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    this.callbacks.onSubtitle?.(cleanText.slice(0, 100));
    this.callbacks.onStart?.();
    this.isPlaying = true;

    // Simulate level loop for browser speech
    let levelTicker: NodeJS.Timeout;
    utterance.onstart = () => {
      levelTicker = setInterval(() => {
        this.callbacks.onAudioLevel?.(0.35 + Math.random() * 0.45);
      }, 100);
    };

    const cleanup = () => {
      clearInterval(levelTicker);
      this.callbacks.onAudioLevel?.(0);
      this.callbacks.onSubtitle?.(null);
      this.callbacks.onEnd?.();
      this.isPlaying = false;
    };

    utterance.onend = cleanup;
    utterance.onerror = cleanup;

    window.speechSynthesis.speak(utterance);
  }

  // Speak text using cloned voice from /api/tts with streaming queue
  public async speak(fullText: string, lang = "en-IN"): Promise<void> {
    this.stop();
    this.currentLang = lang;

    const chunks = this.chunkText(fullText);
    if (chunks.length === 0) return;

    this.queue = [...chunks];
    this.isPlaying = true;
    this.isPaused = false;
    this.callbacks.onStart?.();

    await this.playNextChunk();
  }

  private async playNextChunk(): Promise<void> {
    if (!this.isPlaying || this.isPaused) return;

    if (this.queue.length === 0) {
      this.stop();
      return;
    }

    const nextSentence = this.queue.shift()!;
    this.callbacks.onSubtitle?.(nextSentence);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: nextSentence,
          lang: this.currentLang
        })
      });

      if (!res.ok) {
        // Fall back to browser SpeechSynthesis
        this.callbacks.onFallbackNotice?.("Switched to local voice synthesizer");
        this.speakWithBrowser([nextSentence, ...this.queue].join(" "), this.currentLang);
        this.queue = [];
        return;
      }

      const audioBlob = await res.blob();
      if (this.currentBlobUrl) {
        URL.revokeObjectURL(this.currentBlobUrl);
      }
      this.currentBlobUrl = URL.createObjectURL(audioBlob);

      this.audioElement = new Audio(this.currentBlobUrl);
      this.audioElement.playbackRate = this.speed;
      this.audioElement.volume = this.volume;

      // Connect to Web Audio Analyser for real-time 3D orb reactivity
      const ctx = this.initAudioContext();
      if (ctx && this.analyser) {
        try {
          const source = ctx.createMediaElementSource(this.audioElement);
          source.connect(this.analyser);
          this.analyser.connect(ctx.destination);
        } catch {
          // MediaElementAudioSourceNode already connected in some browsers
        }
      }

      this.startLevelLoop();

      this.audioElement.onended = () => {
        this.stopLevelLoop();
        this.playNextChunk();
      };

      this.audioElement.onerror = () => {
        this.stopLevelLoop();
        this.playNextChunk();
      };

      await this.audioElement.play();
    } catch {
      // Network or playback failure -> fallback
      this.callbacks.onFallbackNotice?.("Switched to local voice synthesizer");
      this.speakWithBrowser([nextSentence, ...this.queue].join(" "), this.currentLang);
      this.queue = [];
    }
  }

  public pause(): void {
    if (this.audioElement && this.isPlaying) {
      this.audioElement.pause();
      this.isPaused = true;
      this.stopLevelLoop();
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.audioElement && this.isPaused) {
      this.audioElement.play();
      this.isPaused = false;
      this.startLevelLoop();
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    this.isPaused = false;
    this.queue = [];
    this.stopLevelLoop();

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }

    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    this.callbacks.onSubtitle?.(null);
    this.callbacks.onEnd?.();
  }

  public setSpeed(rate: PlaybackSpeed): void {
    this.speed = rate;
    if (this.audioElement) {
      this.audioElement.playbackRate = rate;
    }
  }

  public getSpeed(): PlaybackSpeed {
    return this.speed;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}
