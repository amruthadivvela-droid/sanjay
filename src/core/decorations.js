/* ==========================================================================
   BIRTHDAY DECORATION LAYER: Side Butterflies, Metallic Balloons & Twinkling Stars
   ========================================================================== */

import { state } from './state.js';

class BirthdayDecorationLayer {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.width = 0;
    this.height = 0;
    this.isMobile = false;
    this.isPaused = false;

    // Scene Intensity State
    this.currentScene = 'opening';
    this.targetIntensity = { stars: 0.35, butterflies: 0.0, balloons: 0.0 };
    this.currentIntensity = { stars: 0.35, butterflies: 0.0, balloons: 0.0 };

    // Elements
    this.stars = [];
    this.celebrationStars = [];
    this.balloons = [];
    this.butterflies = [];

    this.sceneIntensities = {
      opening:   { stars: 0.35, butterflies: 0.00, balloons: 0.00 },
      identity:  { stars: 0.45, butterflies: 0.25, balloons: 0.10 },
      hints:     { stars: 0.20, butterflies: 0.10, balloons: 0.00 },
      story:     { stars: 0.45, butterflies: 0.65, balloons: 0.30 },
      memories:  { stars: 0.35, butterflies: 0.50, balloons: 0.20 },
      cake:      { stars: 0.70, butterflies: 0.45, balloons: 0.75 },
      letter:    { stars: 0.25, butterflies: 0.25, balloons: 0.05 },
      promise:   { stars: 0.45, butterflies: 0.20, balloons: 0.15 },
      games:     { stars: 0.15, butterflies: 0.00, balloons: 0.00 },
      gifts:     { stars: 0.75, butterflies: 0.35, balloons: 0.70 },
      quiz:      { stars: 0.25, butterflies: 0.10, balloons: 0.15 },
      finale:    { stars: 1.00, butterflies: 0.70, balloons: 1.00 },
      credits:   { stars: 0.30, butterflies: 0.15, balloons: 0.10 },
      postcredit:{ stars: 0.20, butterflies: 0.20, balloons: 0.00 }
    };
  }

  init(canvasId = 'decorations-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
    });

    this.initPools();
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = document.documentElement.clientWidth || window.innerWidth;
    this.height = document.documentElement.clientHeight || window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.isMobile = this.width <= 768;
    this.rebalanceSideLanes();
  }

  initPools() {
    // 1. Background Micro-Stars
    this.stars = [];
    const starCount = this.isMobile ? 15 : 28;
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '#F4C95D' : '#F7F8FA'
      });
    }

    // 2. Metallic Balloons
    this.balloons = [];
    const balloonCount = this.isMobile ? 3 : 6;
    const colors = [
      { main: '#D90429', light: '#FF274D', dark: '#800010' }, // Crimson
      { main: '#F4C95D', light: '#FFF0A0', dark: '#9C7A1E' }, // Gold
      { main: '#1A2130', light: '#334055', dark: '#0C1017' }, // Sleek charcoal
      { main: '#247BFF', light: '#68A5FF', dark: '#0E3B85' }  // Dark blue
    ];

    for (let i = 0; i < balloonCount; i++) {
      const isLeft = i % 2 === 0;
      const laneWidth = this.isMobile ? 60 : 130;
      const x = isLeft ? (Math.random() * laneWidth + 15) : (this.width - Math.random() * laneWidth - 35);
      const color = colors[i % colors.length];

      this.balloons.push({
        x,
        baseX: x,
        y: this.height + Math.random() * this.height * 0.8 + 40,
        radius: this.isMobile ? (Math.random() * 6 + 14) : (Math.random() * 10 + 20),
        speed: Math.random() * 0.5 + 0.45,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.01,
        swayAmp: Math.random() * 12 + 6,
        color,
        isLeft
      });
    }

    // 3. Side Butterflies
    this.butterflies = [];
    const butterflyCount = this.isMobile ? 2 : 5;
    for (let i = 0; i < butterflyCount; i++) {
      const isLeft = i % 2 === 0;
      const laneX = isLeft ? (this.isMobile ? 30 : 70) : (this.width - (this.isMobile ? 30 : 70));
      this.butterflies.push({
        x: laneX + (Math.random() - 0.5) * 30,
        y: Math.random() * (this.height * 0.8) + this.height * 0.1,
        baseX: laneX,
        targetY: Math.random() * (this.height * 0.7) + this.height * 0.15,
        vx: 0,
        vy: 0,
        wingAngle: 0,
        wingSpeed: Math.random() * 0.15 + 0.25,
        size: this.isMobile ? 12 : 17,
        hue: Math.random() > 0.5 ? '#F4C95D' : '#FF4757',
        isLeft
      });
    }
  }

  rebalanceSideLanes() {
    this.balloons.forEach((b) => {
      const laneWidth = this.isMobile ? 60 : 130;
      b.x = b.isLeft ? (Math.random() * laneWidth + 15) : (this.width - Math.random() * laneWidth - 35);
      b.baseX = b.x;
    });

    this.butterflies.forEach((bf) => {
      const laneX = bf.isLeft ? (this.isMobile ? 30 : 70) : (this.width - (this.isMobile ? 30 : 70));
      bf.baseX = laneX;
      bf.x = laneX;
    });
  }

  setScene(sceneName) {
    if (this.sceneIntensities[sceneName]) {
      this.currentScene = sceneName;
      this.targetIntensity = this.sceneIntensities[sceneName];
    }
  }

  // Trigger celebration star burst
  triggerCelebrationBurst(x = this.width / 2, y = this.height / 2, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.celebrationStars.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        alpha: 1.0,
        color: Math.random() > 0.5 ? '#F4C95D' : '#FF274D',
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  startLoop() {
    let lastTime = performance.now();

    const loop = (now) => {
      if (!this.isPaused && this.ctx) {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // Smooth Lerp Intensities
        const lerpFactor = 0.05;
        this.currentIntensity.stars += (this.targetIntensity.stars - this.currentIntensity.stars) * lerpFactor;
        this.currentIntensity.butterflies += (this.targetIntensity.butterflies - this.currentIntensity.butterflies) * lerpFactor;
        this.currentIntensity.balloons += (this.targetIntensity.balloons - this.currentIntensity.balloons) * lerpFactor;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // Render micro-stars
        if (this.currentIntensity.stars > 0.02) {
          this.renderStars();
        }

        // Render celebration bursts
        if (this.celebrationStars.length > 0) {
          this.renderCelebrationStars();
        }

        // Render balloons
        if (this.currentIntensity.balloons > 0.02 && !state.state.reduceMotion) {
          this.renderBalloons();
        }

        // Render butterflies
        if (this.currentIntensity.butterflies > 0.02 && !state.state.reduceMotion) {
          this.renderButterflies();
        }
      }

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  renderStars() {
    const starMult = this.currentIntensity.stars;

    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.phase += s.twinkleSpeed;
      const alpha = (s.baseAlpha + Math.sin(s.phase) * 0.25) * starMult;

      if (alpha > 0.01) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        this.ctx.fillStyle = s.color;
        this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        this.ctx.shadowColor = s.color;
        this.ctx.shadowBlur = 6;
        this.ctx.fill();
        this.ctx.restore();
      }
    }
  }

  renderCelebrationStars() {
    for (let i = this.celebrationStars.length - 1; i >= 0; i--) {
      const cs = this.celebrationStars[i];
      cs.x += cs.vx;
      cs.y += cs.vy;
      cs.vx *= 0.95;
      cs.vy *= 0.95;
      cs.alpha -= cs.decay;

      if (cs.alpha <= 0) {
        this.celebrationStars.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      // Draw 4-point twinkle star
      const s = cs.size;
      this.ctx.moveTo(cs.x, cs.y - s);
      this.ctx.lineTo(cs.x + s * 0.3, cs.y - s * 0.3);
      this.ctx.lineTo(cs.x + s, cs.y);
      this.ctx.lineTo(cs.x + s * 0.3, cs.y + s * 0.3);
      this.ctx.lineTo(cs.x, cs.y + s);
      this.ctx.lineTo(cs.x - s * 0.3, cs.y + s * 0.3);
      this.ctx.lineTo(cs.x - s, cs.y);
      this.ctx.lineTo(cs.x - s * 0.3, cs.y - s * 0.3);
      this.ctx.closePath();

      this.ctx.fillStyle = cs.color;
      this.ctx.globalAlpha = cs.alpha;
      this.ctx.shadowColor = cs.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  renderBalloons() {
    const balloonMult = this.currentIntensity.balloons;

    for (let i = 0; i < this.balloons.length; i++) {
      const b = this.balloons[i];
      b.y -= b.speed;
      b.swayPhase += b.swaySpeed;
      b.x = b.baseX + Math.sin(b.swayPhase) * b.swayAmp;

      // Keep strictly within side boundaries
      if (b.isLeft) {
        b.x = Math.max(10, Math.min(this.isMobile ? 65 : 140, b.x));
      } else {
        b.x = Math.max(this.width - (this.isMobile ? 65 : 140), Math.min(this.width - 15, b.x));
      }

      // Respawn at bottom when leaving top
      if (b.y < -b.radius * 2 - 40) {
        b.y = this.height + Math.random() * 80 + 30;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.min(1, 0.85 * balloonMult);

      // String line
      this.ctx.beginPath();
      this.ctx.moveTo(b.x, b.y + b.radius * 1.2);
      this.ctx.quadraticCurveTo(b.x + Math.sin(b.swayPhase) * 6, b.y + b.radius * 2.2, b.x, b.y + b.radius * 3.2);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Balloon Body (Oval)
      this.ctx.beginPath();
      this.ctx.ellipse(b.x, b.y, b.radius, b.radius * 1.25, 0, 0, Math.PI * 2);

      // Metallic Gradient
      const grad = this.ctx.createRadialGradient(
        b.x - b.radius * 0.3, b.y - b.radius * 0.35, b.radius * 0.1,
        b.x, b.y, b.radius * 1.3
      );
      grad.addColorStop(0, b.color.light);
      grad.addColorStop(0.4, b.color.main);
      grad.addColorStop(1, b.color.dark);

      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Balloon Knot
      this.ctx.beginPath();
      this.ctx.moveTo(b.x - 3, b.y + b.radius * 1.25);
      this.ctx.lineTo(b.x + 3, b.y + b.radius * 1.25);
      this.ctx.lineTo(b.x, b.y + b.radius * 1.35);
      this.ctx.closePath();
      this.ctx.fillStyle = b.color.dark;
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  renderButterflies() {
    const bfMult = this.currentIntensity.butterflies;

    for (let i = 0; i < this.butterflies.length; i++) {
      const bf = this.butterflies[i];
      bf.wingAngle += bf.wingSpeed;

      // Slow organic drift restricted to side lane
      const laneLimit = this.isMobile ? 55 : 120;
      if (bf.isLeft) {
        bf.x = Math.max(12, Math.min(laneLimit, bf.baseX + Math.sin(bf.wingAngle * 0.25) * 20));
      } else {
        bf.x = Math.max(this.width - laneLimit, Math.min(this.width - 15, bf.baseX + Math.sin(bf.wingAngle * 0.25) * 20));
      }

      // Gentle vertical sine glide
      bf.y += Math.sin(bf.wingAngle * 0.15) * 0.8;
      if (bf.y < 40) bf.y = this.height * 0.8;
      if (bf.y > this.height - 40) bf.y = 80;

      // Wing flap projection factor
      const flapScale = Math.cos(bf.wingAngle);

      this.ctx.save();
      this.ctx.translate(bf.x, bf.y);
      this.ctx.globalAlpha = Math.min(0.85, bfMult);

      // Left Wing
      this.ctx.save();
      this.ctx.scale(flapScale, 1);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(-bf.size * 1.3, -bf.size * 1.1, -bf.size * 1.5, bf.size * 0.2, 0, bf.size * 0.8);
      this.ctx.fillStyle = bf.hue;
      this.ctx.shadowColor = bf.hue;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.restore();

      // Right Wing
      this.ctx.save();
      this.ctx.scale(-flapScale, 1);
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(-bf.size * 1.3, -bf.size * 1.1, -bf.size * 1.5, bf.size * 0.2, 0, bf.size * 0.8);
      this.ctx.fillStyle = bf.hue;
      this.ctx.shadowColor = bf.hue;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.restore();

      // Slender Body
      this.ctx.beginPath();
      this.ctx.ellipse(0, bf.size * 0.3, 1.5, bf.size * 0.5, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = '#040507';
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}

export const decorations = new BirthdayDecorationLayer();
