// Studio-Grade Synthesized Web Audio Engine
// Iconic Netflix-Style "Ta-Dum" Cinematic Sonic Branding (Zero copyrighted media, 100% Web Audio API)

class SoundFX {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pkm_sound_enabled");
      // Default to true if set or enabled by user gesture
      this.soundEnabled = stored === "true";
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pkm_sound_enabled", enabled ? "true" : "false");
    }
  }

  public initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * The Iconic Netflix "TA-DUM" Sound
   * Beat 1 (t=0s): Sharp acoustic/metallic anvil strike
   * Beat 2 (t=0.11s): Resonant orchestral D-minor / brass swell with detuned stereo cello harmonics and 3-second cinematic reverb decay tail
   */
  public playTudumChord(force: boolean = false): void {
    if (!this.soundEnabled && !force) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // ==========================================
      // PART 1: THE "TA" (Percussive Transient at t=0)
      // ==========================================
      
      // 1A. Metallic / Anvil Transient Click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();

      clickFilter.type = "bandpass";
      clickFilter.frequency.setValueAtTime(2400, t);
      clickFilter.Q.setValueAtTime(4.0, t);

      clickOsc.type = "sawtooth";
      clickOsc.frequency.setValueAtTime(440, t);
      clickOsc.frequency.exponentialRampToValueAtTime(120, t + 0.06);

      clickGain.gain.setValueAtTime(0.001, t);
      clickGain.gain.setValueAtTime(0.35, t + 0.005);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(t);
      clickOsc.stop(t + 0.08);

      // 1B. Low Anvil Body Thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();

      thudOsc.type = "triangle";
      thudOsc.frequency.setValueAtTime(140, t);
      thudOsc.frequency.exponentialRampToValueAtTime(45, t + 0.1);

      thudGain.gain.setValueAtTime(0.001, t);
      thudGain.gain.setValueAtTime(0.5, t + 0.01);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);

      thudOsc.start(t);
      thudOsc.stop(t + 0.13);

      // ==========================================
      // PART 2: THE "DUM" (Orchestral Cello/Brass Swell at t=0.11s)
      // ==========================================
      const t2 = t + 0.11;

      // 2A. Deep Sub-Bass Fundamental (D1/D2: 36.7Hz -> 55Hz -> 30Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(73.4, t2); // D2
      subOsc.frequency.exponentialRampToValueAtTime(45.0, t2 + 1.2);
      subOsc.frequency.exponentialRampToValueAtTime(32.0, t2 + 2.4);

      subGain.gain.setValueAtTime(0.001, t2);
      subGain.gain.exponentialRampToValueAtTime(0.85, t2 + 0.06);
      subGain.gain.exponentialRampToValueAtTime(0.35, t2 + 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.8);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(t2);
      subOsc.stop(t2 + 2.9);

      // 2B. Detuned Sawtooth Cello 1 (+4 cents)
      const saw1 = ctx.createOscillator();
      const sawGain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();

      filter1.type = "lowpass";
      filter1.frequency.setValueAtTime(180, t2);
      filter1.frequency.exponentialRampToValueAtTime(950, t2 + 0.25); // Bright swell
      filter1.frequency.exponentialRampToValueAtTime(160, t2 + 2.2);  // Warm fade

      saw1.type = "sawtooth";
      saw1.frequency.setValueAtTime(73.8, t2); // D2 + slightly sharp

      sawGain1.gain.setValueAtTime(0.001, t2);
      sawGain1.gain.exponentialRampToValueAtTime(0.4, t2 + 0.08);
      sawGain1.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.6);

      saw1.connect(filter1);
      filter1.connect(sawGain1);
      sawGain1.connect(ctx.destination);

      saw1.start(t2);
      saw1.stop(t2 + 2.7);

      // 2C. Detuned Sawtooth Cello 2 (-4 cents)
      const saw2 = ctx.createOscillator();
      const sawGain2 = ctx.createGain();
      const filter2 = ctx.createBiquadFilter();

      filter2.type = "lowpass";
      filter2.frequency.setValueAtTime(180, t2);
      filter2.frequency.exponentialRampToValueAtTime(850, t2 + 0.28);
      filter2.frequency.exponentialRampToValueAtTime(150, t2 + 2.0);

      saw2.type = "sawtooth";
      saw2.frequency.setValueAtTime(73.0, t2); // D2 - slightly flat

      sawGain2.gain.setValueAtTime(0.001, t2);
      sawGain2.gain.exponentialRampToValueAtTime(0.4, t2 + 0.09);
      sawGain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.6);

      saw2.connect(filter2);
      filter2.connect(sawGain2);
      sawGain2.connect(ctx.destination);

      saw2.start(t2);
      saw2.stop(t2 + 2.7);

      // 2D. Fifth Resonance Harmonic (A2 = 110Hz)
      const fifthOsc = ctx.createOscillator();
      const fifthGain = ctx.createGain();

      fifthOsc.type = "triangle";
      fifthOsc.frequency.setValueAtTime(110.0, t2); // A2 harmonic fifth
      fifthOsc.frequency.exponentialRampToValueAtTime(108.0, t2 + 2.0);

      fifthGain.gain.setValueAtTime(0.001, t2);
      fifthGain.gain.exponentialRampToValueAtTime(0.3, t2 + 0.12);
      fifthGain.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.4);

      fifthOsc.connect(fifthGain);
      fifthGain.connect(ctx.destination);

      fifthOsc.start(t2);
      fifthOsc.stop(t2 + 2.5);

      // 2E. Electric Chime Shimmer (D5 = 587.3Hz)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(587.3, t2 + 0.04);
      chimeOsc.frequency.exponentialRampToValueAtTime(584.0, t2 + 2.2);

      chimeGain.gain.setValueAtTime(0.001, t2);
      chimeGain.gain.setValueAtTime(0.001, t2 + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.18, t2 + 0.14);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start(t2 + 0.04);
      chimeOsc.stop(t2 + 2.9);
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  /**
   * Subtle crisp UI hover tick
   */
  public playHover(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.035);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignored
    }
  }

  /**
   * Section Navigation / Affirmative Select Tone
   */
  public playSelect(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // Ignored
    }
  }

  /**
   * Cinematic Whoosh / Portal Transition Sound
   */
  public playWhoosh(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.exponentialRampToValueAtTime(180, now + 0.28);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.28);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.29);
    } catch {
      // Ignored
    }
  }
}

export const sound = new SoundFX();
