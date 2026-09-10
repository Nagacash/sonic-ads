// Web Audio API Synthesizer for Sonic Micro-Ads
// Generates authentic, catchy, musical jingles, 3-note sonic logos, and beat grooves in real-time.

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentTimeoutIds: number[] = [];
  private activeVoices: { stop: () => void }[] = [];
  private muted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public getAnalyser(): AnalyserNode | null {
    this.init();
    return this.analyser;
  }

  // Convert note name (e.g. C4, D#4, G5) to frequency in Hz
  private noteToFreq(note: string): number {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const match = note.match(/^([A-G]#?)([0-8])$/);
    if (!match) return 440;
    const name = match[1];
    const octave = parseInt(match[2], 10);
    const semitone = notes.indexOf(name);
    return 440 * Math.pow(2, (octave - 4) + (semitone - 9) / 12);
  }

  // Play a single rich harmonic note (bell, synth pluck, or chime)
  public playTone(note: string | number, duration: number = 0.5, type: OscillatorType = "sine", timeOffset: number = 0, gainLevel: number = 0.25) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const freq = typeof note === "string" ? this.noteToFreq(note) : note;
    const startTime = this.ctx.currentTime + timeOffset;

    // Oscillator 1 (Primary)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = type;
    osc1.frequency.setValueAtTime(freq, startTime);

    // Filter for warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2500, startTime);
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

    // Envelope
    gain1.gain.setValueAtTime(0.0001, startTime);
    gain1.gain.exponentialRampToValueAtTime(gainLevel, startTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(this.masterGain);

    osc1.start(startTime);
    osc1.stop(startTime + duration + 0.05);

    // Harmonic sparkle (octave up with subtle detune)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2 + 1.5, startTime);
    gain2.gain.setValueAtTime(0.0001, startTime);
    gain2.gain.exponentialRampToValueAtTime(gainLevel * 0.4, startTime + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.7));

    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc2.start(startTime);
    osc2.stop(startTime + duration + 0.05);
  }

  // Play Drum Hit (Kick or Snare/Clap)
  private playKick(timeOffset: number) {
    if (!this.ctx || !this.masterGain) return;
    const startTime = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, startTime);
    osc.frequency.exponentialRampToValueAtTime(38, startTime + 0.12);

    gain.gain.setValueAtTime(0.6, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  }

  private playClap(timeOffset: number) {
    if (!this.ctx || !this.masterGain) return;
    const startTime = this.ctx.currentTime + timeOffset;
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, startTime);
    filter.Q.setValueAtTime(3, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(startTime);
    noise.stop(startTime + 0.1);
  }

  // Play signature 3-note Sonic Logo
  public playSonicLogo(notes: string[] = ["C5", "E5", "G5"], tempoBpm: number = 120) {
    this.stop();
    this.init();
    this.isPlaying = true;

    const noteDuration = 60 / tempoBpm;
    notes.forEach((note, index) => {
      const offset = index * (noteDuration * 0.65);
      const id = window.setTimeout(() => {
        // Last note rings out longer with extra rich sparkle
        const dur = index === notes.length - 1 ? 1.8 : 0.6;
        const level = index === notes.length - 1 ? 0.35 : 0.25;
        this.playTone(note, dur, "sine", 0, level);
      }, offset * 1000);
      this.currentTimeoutIds.push(id);
    });

    // Auto mark stop after sonic logo finished
    const totalTime = (notes.length * noteDuration * 0.65 + 1.8) * 1000;
    const finalId = window.setTimeout(() => {
      this.isPlaying = false;
    }, totalTime);
    this.currentTimeoutIds.push(finalId);
  }

  // Play Full 28-Second Studio Campaign Ad (Official Preview Sample)
  public playFull28sCampaignAd(
    transcript: Array<{ startSec: number; endSec: number; text: string; speaker: string; phase: string }>,
    tempoBpm: number = 126,
    onTimeUpdate?: (currentSec: number, lineIndex: number, phase: "jingle" | "narrative" | "cta") => void,
    onComplete?: () => void
  ) {
    this.stop();
    this.init();
    this.isPlaying = true;

    const totalSeconds = 28;
    const beatInterval = 60 / tempoBpm; // ~0.476s

    // Schedule beat groove throughout the 28 seconds
    // Phase 1 (0-12s): Full four-on-the-floor dance pop groove
    for (let sec = 0; sec < 12; sec += beatInterval) {
      const beatNum = Math.round(sec / beatInterval);
      const tid = window.setTimeout(() => {
        this.playKick(0);
        if (beatNum % 2 === 1) {
          this.playClap(0);
        }
        // Synth chord stabs
        if (beatNum % 4 === 0) {
          this.playTone("D4", 0.3, "sawtooth", 0, 0.12);
          this.playTone("A4", 0.3, "sawtooth", 0.02, 0.1);
        } else if (beatNum % 4 === 2) {
          this.playTone("G4", 0.3, "triangle", 0, 0.14);
          this.playTone("B4", 0.3, "triangle", 0.02, 0.12);
        }
      }, sec * 1000);
      this.currentTimeoutIds.push(tid);
    }

    // Phase 2 (12-24s): Smooth driving background groove under narration
    for (let sec = 12.5; sec < 24.5; sec += beatInterval * 2) {
      const tid = window.setTimeout(() => {
        this.playKick(0);
        this.playTone("G2", 0.35, "sine", 0, 0.18);
        this.playTone("D3", 0.25, "triangle", beatInterval, 0.12);
      }, sec * 1000);
      this.currentTimeoutIds.push(tid);
    }

    // Phase 3 (24.5-28s): Climax beat, sonic logo resolution & triumphant outro
    const outroBeats = [24.5, 25.0, 25.5, 26.0, 26.5, 27.0];
    outroBeats.forEach((sec, idx) => {
      const tid = window.setTimeout(() => {
        this.playKick(0);
        if (idx % 2 === 1) this.playClap(0);
      }, sec * 1000);
      this.currentTimeoutIds.push(tid);
    });

    // Sonic logo triad at 25.5s
    const sonicTid = window.setTimeout(() => {
      this.playTone("D4", 0.8, "triangle", 0, 0.25);
      this.playTone("G4", 1.0, "triangle", 0.18, 0.3);
      this.playTone("B4", 1.8, "sine", 0.36, 0.4);
      this.playTone("D5", 2.2, "sine", 0.54, 0.45);
    }, 25500);
    this.currentTimeoutIds.push(sonicTid);

    // Schedule voice lines from transcript
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}

      transcript.forEach((line) => {
        const lineTid = window.setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance(line.text);
            utterance.lang = "de-DE";
            if (line.phase === "jingle") {
              utterance.pitch = 1.25;
              utterance.rate = 1.15;
              utterance.volume = 0.95;
            } else if (line.phase === "narrative") {
              utterance.pitch = 1.05;
              utterance.rate = 1.02;
              utterance.volume = 0.9;
            } else {
              utterance.pitch = 1.1;
              utterance.rate = 1.05;
              utterance.volume = 1.0;
            }
            window.speechSynthesis.speak(utterance);
          } catch (err) {
            console.warn("Utterance error:", err);
          }
        }, line.startSec * 1000);
        this.currentTimeoutIds.push(lineTid);
      });
    }

    // Timer loop for synchronized UI progress and karaoke highlights
    let elapsed = 0;
    const intervalTimer = window.setInterval(() => {
      elapsed += 0.25;
      if (elapsed > totalSeconds) {
        clearInterval(intervalTimer);
        this.isPlaying = false;
        onComplete?.();
        return;
      }

      // Find active line
      const activeIdx = transcript.findIndex(
        (l) => elapsed >= l.startSec && elapsed < l.endSec
      );
      const safeIdx = activeIdx >= 0 ? activeIdx : transcript.length - 1;
      const activePhase = (transcript[safeIdx]?.phase as any) || "jingle";

      onTimeUpdate?.(Math.min(totalSeconds, elapsed), safeIdx, activePhase);
    }, 250);
    this.currentTimeoutIds.push(intervalTimer as any);

    // Final finish timeout
    const finishTid = window.setTimeout(() => {
      clearInterval(intervalTimer);
      this.isPlaying = false;
      onComplete?.();
    }, (totalSeconds + 0.5) * 1000);
    this.currentTimeoutIds.push(finishTid);
  }

  // Play Full 6-Second Micro-Ad Track (Intro beat -> Build -> Climax Sonic Logo -> Outro CTA Chime)
  public playFullMicroAd(
    jingleHook: string,
    sonicNotes: string[] = ["D4", "G4", "B4"],
    tempoBpm: number = 124,
    onPhaseChange?: (phase: "problem" | "solution" | "sonicLogo" | "cta") => void,
    onComplete?: () => void
  ) {
    this.stop();
    this.init();
    this.isPlaying = true;

    const beatInterval = 60 / tempoBpm; // seconds per beat

    // PHASE 1: PROBLEM (0s - 1.8s) - Tense, low-fi pulse
    onPhaseChange?.("problem");
    for (let b = 0; b < 4; b++) {
      const beatOffset = b * beatInterval;
      const tid = window.setTimeout(() => {
        this.playKick(0);
        this.playTone("G2", 0.2, "sawtooth", 0, 0.18);
      }, beatOffset * 1000);
      this.currentTimeoutIds.push(tid);
    }

    // PHASE 2: SOLUTION (1.8s - 3.8s) - Uplifting chords & punchy rhythm
    const phase2Start = 4 * beatInterval;
    const tidP2 = window.setTimeout(() => {
      onPhaseChange?.("solution");
    }, phase2Start * 1000);
    this.currentTimeoutIds.push(tidP2);

    const chords = [
      ["C4", "E4", "G4"],
      ["D4", "F#4", "A4"],
      ["E4", "G#4", "B4"],
      ["A4", "C#5", "E5"],
    ];

    for (let b = 0; b < 6; b++) {
      const beatOffset = phase2Start + b * (beatInterval * 0.75);
      const tid = window.setTimeout(() => {
        if (b % 2 === 0) this.playKick(0);
        else this.playClap(0);

        const chord = chords[b % chords.length];
        chord.forEach((n, idx) => {
          this.playTone(n, 0.35, "triangle", idx * 0.03, 0.12);
        });
      }, beatOffset * 1000);
      this.currentTimeoutIds.push(tid);
    }

    // Optional voice synthesis hook
    const voiceDelay = (phase2Start + 0.3) * 1000;
    const voiceTid = window.setTimeout(() => {
      if ("speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(jingleHook);
          utterance.rate = 1.05;
          utterance.pitch = 1.15;
          utterance.volume = 0.85;
          // Prefer German if German hook, or English otherwise
          if (/[äöüß]/.test(jingleHook) || jingleHook.includes("Deine")) {
            utterance.lang = "de-DE";
          } else {
            utterance.lang = "en-US";
          }
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          console.warn("Speech synthesis unavailable:", e);
        }
      }
    }, voiceDelay);
    this.currentTimeoutIds.push(voiceTid);

    // PHASE 3: SONIC LOGO (3.8s - 5.2s) - Signature brand chime
    const phase3Start = phase2Start + 6 * (beatInterval * 0.75);
    const tidP3 = window.setTimeout(() => {
      onPhaseChange?.("sonicLogo");
      this.playSonicLogo(sonicNotes, tempoBpm);
    }, phase3Start * 1000);
    this.currentTimeoutIds.push(tidP3);

    // PHASE 4: CTA (5.2s - 6.5s) - Confident final cadence
    const phase4Start = phase3Start + 1.4;
    const tidP4 = window.setTimeout(() => {
      onPhaseChange?.("cta");
      this.playKick(0);
      this.playTone("C5", 0.6, "sine", 0, 0.2);
      this.playTone("G5", 0.9, "sine", 0.1, 0.25);
    }, phase4Start * 1000);
    this.currentTimeoutIds.push(tidP4);

    // Ad completion
    const endTid = window.setTimeout(() => {
      this.isPlaying = false;
      onComplete?.();
    }, (phase4Start + 1.2) * 1000);
    this.currentTimeoutIds.push(endTid);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTimeoutIds.forEach((id) => clearTimeout(id));
    this.currentTimeoutIds = [];
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioSynth = new AudioSynthEngine();
