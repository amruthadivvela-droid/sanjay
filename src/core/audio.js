/* ==========================================================================
   SANJAYVERSE AUDIO SYNTHESIZER: Web Audio API Procedural Soundscape
   ========================================================================== */

import { state } from './state.js';

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.isInitialized = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  playTone(freq, type = 'sine', duration = 0.15, initialGain = 0.2) {
    if (!state.state.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(initialGain, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  playTick() {
    this.playTone(920, 'triangle', 0.04, 0.08);
  }

  playClick() {
    this.playTone(600, 'sine', 0.03, 0.05);
  }

  playSuccess() {
    if (!state.state.soundEnabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.25, 0.15);
      }, idx * 75);
    });
  }

  playError() {
    if (!state.state.soundEnabled) return;
    this.playTone(130, 'sawtooth', 0.3, 0.2);
    setTimeout(() => {
      this.playTone(110, 'sawtooth', 0.4, 0.2);
    }, 150);
  }

  playSimonBeep(index) {
    const freqs = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33];
    this.playTone(freqs[(index - 1) % freqs.length] || 440, 'sine', 0.2, 0.2);
  }

  playPortalHum() {
    if (!state.state.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 3.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 3.0);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 1.5);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 4.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 4.0);
    } catch (e) {
      console.warn('Portal audio error:', e);
    }
  }

  playLaserScan() {
    if (!state.state.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Laser audio error:', e);
    }
  }

  playFanfare() {
    if (!state.state.soundEnabled) return;
    // Birthday Fanfare in C Major
    const notes = [
      { f: 261.63, d: 200 }, // C
      { f: 261.63, d: 150 }, // C
      { f: 293.66, d: 350 }, // D
      { f: 261.63, d: 350 }, // C
      { f: 349.23, d: 350 }, // F
      { f: 329.63, d: 700 }  // E
    ];

    let timeOffset = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, 'triangle', note.d / 1000, 0.2);
      }, timeOffset);
      timeOffset += note.d + 50;
    });
  }

  playCoin() {
    this.playTone(987.77, 'square', 0.08, 0.08);
    setTimeout(() => {
      this.playTone(1318.51, 'square', 0.15, 0.08);
    }, 70);
  }

  playSpiderChime() {
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.3, 0.12);
      }, i * 110);
    });
  }

  duckAudio(factor = 0.2) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(factor * 0.3, this.ctx.currentTime + 0.5);
    }
  }

  unduckAudio() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.5);
    }
  }
}

export const audio = new AudioSynthesizer();
