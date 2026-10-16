// Web Audio API Romantic Sound & Music Box Engine (Zero External Dependencies)
class LoveAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.noteIndex = 0;
    this.purrNodes = null;

    // Dreamy romantic music box melody (F Major / D Minor pentatonic romance)
    this.melody = [
      { f: 523.25, b: 261.63, d: 0.45 }, // C5 + C4
      { f: 659.25, b: null,   d: 0.40 }, // E5
      { f: 783.99, b: 349.23, d: 0.50 }, // G5 + F4
      { f: 880.00, b: null,   d: 0.55 }, // A5
      { f: 1046.50, b: 392.00, d: 0.75 }, // C6 + G4
      { f: 987.77, b: null,   d: 0.40 }, // B5
      { f: 880.00, b: 440.00, d: 0.50 }, // A5 + A4
      { f: 783.99, b: null,   d: 0.65 }, // G5
      { f: 698.46, b: 349.23, d: 0.45 }, // F5 + F4
      { f: 880.00, b: null,   d: 0.45 }, // A5
      { f: 783.99, b: 392.00, d: 0.50 }, // G5 + G4
      { f: 659.25, b: null,   d: 0.45 }, // E5
      { f: 587.33, b: 293.66, d: 0.50 }, // D5 + D4
      { f: 659.25, b: null,   d: 0.45 }, // E5
      { f: 523.25, b: 261.63, d: 0.95 }  // C5 + C4
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playTone(freq, duration = 0.45, volume = 0.12, type = 'sine', delay = 0) {
    this.init();
    if (!this.ctx) return;
    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch (e) {}
  }

  playSparkle() {
    const notes = [1046.5, 1318.51, 1567.98, 2093.0];
    notes.forEach((f, idx) => {
      this.playTone(f, 0.32, 0.08, 'sine', idx * 0.055);
    });
  }

  playJhumkaJingle() {
    // Delicate metallic bell shimmer for jhumke
    const bells = [1760, 2093, 2637, 2349, 3136];
    bells.forEach((f, idx) => {
      this.playTone(f, 0.28, 0.06, 'triangle', idx * 0.045);
    });
  }

  playChatPop(isIncoming = false) {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startF = isIncoming ? 520 : 380;
      const endF = isIncoming ? 780 : 620;
      osc.frequency.setValueAtTime(startF, now);
      osc.frequency.exponentialRampToValueAtTime(endF, now + 0.09);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch (e) {}
  }

  playDodgeBounce() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.15);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch (e) {}
  }

  playCelebrationFanfare() {
    const chord = [
      { f: 523.25, d: 0.0 },
      { f: 659.25, d: 0.08 },
      { f: 783.99, d: 0.16 },
      { f: 1046.50, d: 0.24 },
      { f: 1318.51, d: 0.34 },
      { f: 1567.98, d: 0.44 },
      { f: 2093.00, d: 0.56 }
    ];
    chord.forEach(n => this.playTone(n.f, 0.75, 0.11, 'sine', n.d));
  }

  playPurr(durationMs = 2200) {
    this.init();
    if (!this.ctx || this.purrNodes) return;
    try {
      const now = this.ctx.currentTime;
      const carrier = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const masterGain = this.ctx.createGain();

      carrier.type = 'triangle';
      carrier.frequency.setValueAtTime(32, now);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(23, now);
      lfoGain.gain.setValueAtTime(12, now);

      lfo.connect(carrier.frequency);
      carrier.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.14, now + 0.25);
      masterGain.gain.linearRampToValueAtTime(0.001, now + durationMs / 1000);

      carrier.start(now);
      lfo.start(now);

      this.purrNodes = { carrier, lfo };
      setTimeout(() => {
        try {
          carrier.stop();
          lfo.stop();
        } catch (e) {}
        this.purrNodes = null;
      }, durationMs + 50);
    } catch (e) {
      this.purrNodes = null;
    }
  }

  toggleBGM() {
    this.init();
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  startBGM() {
    this.bgmPlaying = true;
    this.scheduleNextNote();
  }

  scheduleNextNote() {
    if (!this.bgmPlaying) return;
    const item = this.melody[this.noteIndex];
    this.playTone(item.f, item.d * 1.5, 0.1, 'sine', 0);
    if (item.b) {
      this.playTone(item.b, item.d * 1.8, 0.06, 'triangle', 0);
    }
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.bgmTimer = setTimeout(() => this.scheduleNextNote(), item.d * 1000 + 90);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

window.loveAudio = new LoveAudioEngine();
