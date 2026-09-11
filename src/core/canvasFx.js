/* ==========================================================================
   SANJAYVERSE CANVAS FX: Ambient Web Lines, Dust Motes, Confetti & Web Cracks
   ========================================================================== */

import confetti from 'canvas-confetti';
import { state } from './state.js';

class CanvasFXEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animFrameId = null;
    this.width = 0;
    this.height = 0;
  }

  init(canvasId = 'fx-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createAmbientParticles();
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createAmbientParticles() {
    this.particles = [];
    const count = state.state.lowGraphics ? 20 : 60;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? '#D90429' : (Math.random() > 0.5 ? '#247BFF' : '#F7F8FA')
      });
    }
  }

  startLoop() {
    const loop = () => {
      if (this.ctx && !state.state.reduceMotion) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Render ambient particles
        for (let i = 0; i < this.particles.length; i++) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = this.width;
          if (p.x > this.width) p.x = 0;
          if (p.y < 0) p.y = this.height;
          if (p.y > this.height) p.y = 0;

          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = p.alpha;
          this.ctx.fill();
        }

        // Connect nearby particles with subtle web lines
        if (!state.state.lowGraphics) {
          this.ctx.lineWidth = 0.5;
          for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
              const dx = this.particles[i].x - this.particles[j].x;
              const dy = this.particles[i].y - this.particles[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 90) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.strokeStyle = '#D90429';
                this.ctx.globalAlpha = (1 - dist / 90) * 0.12;
                this.ctx.stroke();
              }
            }
          }
        }
        this.ctx.globalAlpha = 1;
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    loop();
  }

  // Draw Web Crack on Portal (Phase 1)
  drawWebCrack(centerX = this.width / 2, centerY = this.height / 2, onComplete) {
    if (!this.ctx) return;
    const crackLines = [];
    const numBranches = 12;

    for (let b = 0; b < numBranches; b++) {
      const angle = (b / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      let curX = centerX;
      let curY = centerY;
      const pts = [{ x: curX, y: curY }];
      const maxDist = Math.max(this.width, this.height) * 0.6;
      let dist = 0;

      while (dist < maxDist) {
        dist += Math.random() * 40 + 20;
        const subAngle = angle + (Math.random() - 0.5) * 0.5;
        curX += Math.cos(subAngle) * 35;
        curY += Math.sin(subAngle) * 35;
        pts.push({ x: curX, y: curY });
      }
      crackLines.push(pts);
    }

    let progress = 0;
    const animateCrack = () => {
      progress += 0.08;
      this.ctx.strokeStyle = '#FF274D';
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = '#D90429';
      this.ctx.shadowBlur = 15;

      for (const branch of crackLines) {
        const drawLen = Math.floor(branch.length * Math.min(progress, 1));
        if (drawLen > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(branch[0].x, branch[0].y);
          for (let i = 1; i < drawLen; i++) {
            this.ctx.lineTo(branch[i].x, branch[i].y);
          }
          this.ctx.stroke();
        }
      }
      this.ctx.shadowBlur = 0;

      if (progress < 1.2) {
        requestAnimationFrame(animateCrack);
      } else {
        if (onComplete) onComplete();
      }
    };
    animateCrack();
  }

  // Launch Confetti Celebration
  burstCelebration() {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D90429', '#247BFF', '#F4C95D', '#FFFFFF']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }

  burstFirework(x = 0.5, y = 0.5) {
    try {
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x, y },
        colors: ['#F4C95D', '#FF274D', '#38D996']
      });
    } catch (e) {
      console.warn('Firework error:', e);
    }
  }
}

export const canvasFx = new CanvasFXEngine();
