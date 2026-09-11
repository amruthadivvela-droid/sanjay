/* ==========================================================================
   PHASE 17: Downloadable Birthday Card Generator (Canvas 9:16 & 16:9)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase17(container, onNext) {
  let isMobileAspect = true; // true: 9:16, false: 16:9

  container.innerHTML = `
    <div class="phase-scene card-scene fade-in">
      <div class="midnight-badge">
        <span>🎨</span>
        <span>KEEPSAKE GENERATOR • PHASE 17</span>
      </div>

      <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 40px); margin: 8px 0;">
        Official Birthday Card
      </h1>
      <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 20px;">
        Generated directly in-browser. Download and share as an ultra HD commemorative card.
      </p>

      <!-- Aspect Ratio Switcher -->
      <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 16px;">
        <button id="btn-aspect-portrait" class="btn-primary" style="min-height: 38px; padding: 0 18px; font-size: 13px;">
          📱 Mobile Portrait (9:16)
        </button>
        <button id="btn-aspect-landscape" class="btn-secondary" style="min-height: 38px; padding: 0 18px; font-size: 13px;">
          🖥️ Desktop Widescreen (16:9)
        </button>
      </div>

      <!-- Preview Canvas -->
      <canvas id="card-preview-canvas" class="card-canvas-preview"></canvas>

      <!-- Action Buttons -->
      <div class="card-actions-bar">
        <button id="btn-download-png" class="btn-primary" style="padding: 0 32px;">
          <span>📥</span>
          <span>Download PNG</span>
        </button>
        <button id="btn-copy-link" class="btn-secondary">
          <span>🔗</span>
          <span>Copy Website Link</span>
        </button>
        <button id="btn-goto-ending" class="btn-gold" style="padding: 0 28px;">
          <span>Enter Finale: Next Mission</span>
          <span>→</span>
        </button>
      </div>

      <button id="btn-skip-card" class="btn-skip">Skip Card →</button>
    </div>
  `;

  const canvas = container.querySelector('#card-preview-canvas');
  const btnPortrait = container.querySelector('#btn-aspect-portrait');
  const btnLandscape = container.querySelector('#btn-aspect-landscape');
  const btnDownload = container.querySelector('#btn-download-png');
  const btnCopy = container.querySelector('#btn-copy-link');
  const btnGotoEnding = container.querySelector('#btn-goto-ending');
  const btnSkip = container.querySelector('#btn-skip-card');

  const photoImg = new Image();
  photoImg.crossOrigin = 'anonymous';
  photoImg.src = '/assets/sanjay.jpg';

  const drawCard = () => {
    const ctx = canvas.getContext('2d');
    const w = isMobileAspect ? 720 : 1080;
    const h = isMobileAspect ? 1280 : 720;
    canvas.width = w;
    canvas.height = h;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#040507');
    bgGrad.addColorStop(0.5, '#0B0D12');
    bgGrad.addColorStop(1, '#11141B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Border & Glow
    ctx.strokeStyle = '#D90429';
    ctx.lineWidth = 6;
    ctx.strokeRect(24, 24, w - 48, h - 48);

    ctx.strokeStyle = 'rgba(244, 201, 93, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, w - 68, h - 68);

    // CodeXa Brand Top
    ctx.fillStyle = '#D90429';
    ctx.fillRect(w / 2 - 20, 56, 40, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('X', w / 2, 84);

    ctx.font = 'bold 18px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillStyle = '#fff';
    ctx.fillText('CODEXA AGENCY', w / 2, 122);

    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#F4C95D';
    ctx.fillText('SANJAYVERSE • PROTOCOL 0912-26', w / 2, 142);

    if (isMobileAspect) {
      // Portrait Layout
      if (photoImg.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(w / 2 - 160, 175, 320, 400, 16);
        ctx.clip();
        ctx.drawImage(photoImg, w / 2 - 160, 175, 320, 400);
        ctx.restore();
        ctx.strokeStyle = '#D90429';
        ctx.lineWidth = 4;
        ctx.strokeRect(w / 2 - 160, 175, 320, 400);
      }

      ctx.font = 'bold 44px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('HAPPY BIRTHDAY', w / 2, 630);

      ctx.font = '900 52px sans-serif';
      ctx.fillStyle = '#F4C95D';
      ctx.fillText('B. SANJAY', w / 2, 690);

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#FF274D';
      ctx.fillText('Co-Founder • Visionary Creator', w / 2, 730);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#A5ABB6';
      ctx.fillText('12 September 2026', w / 2, 765);

      // Quote
      ctx.font = 'italic 18px serif';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText('"Together, we build what comes next."', w / 2, 825);

      // Badges Summary Row
      ctx.font = '28px sans-serif';
      ctx.fillText('🛡️ 🎨 ☕ 🕸️ 📸 🎬 🏎️ 🪂 🧱 🎞️ 🎂 🔥 🤝', w / 2, 885);

      // Signature Block
      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#F4C95D';
      ctx.fillText('SIGNED: ASHU (FOUNDER)', w / 2, 950);
      ctx.font = '12px monospace';
      ctx.fillStyle = '#676D7A';
      ctx.fillText('UNBREAKABLE PARTNERSHIP CERTIFICATE', w / 2, 975);
    } else {
      // Landscape Layout (16:9)
      if (photoImg.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(80, 180, 300, 380, 16);
        ctx.clip();
        ctx.drawImage(photoImg, 80, 180, 300, 380);
        ctx.restore();
        ctx.strokeStyle = '#D90429';
        ctx.lineWidth = 4;
        ctx.strokeRect(80, 180, 300, 380);
      }

      ctx.textAlign = 'left';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('HAPPY BIRTHDAY', 430, 240);

      ctx.font = '900 54px sans-serif';
      ctx.fillStyle = '#F4C95D';
      ctx.fillText('B. SANJAY', 430, 305);

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#FF274D';
      ctx.fillText('Co-Founder • CodeXa Agency', 430, 345);

      ctx.font = '16px sans-serif';
      ctx.fillStyle = '#A5ABB6';
      ctx.fillText('12 September 2026', 430, 380);

      ctx.font = 'italic 20px serif';
      ctx.fillStyle = '#E2E8F0';
      ctx.fillText('"Together, we build what comes next."', 430, 440);

      ctx.font = '28px sans-serif';
      ctx.fillText('🛡️ 🎨 ☕ 🕸️ 📸 🎬 🏎️ 🪂 🧱 🎞️ 🎂 🔥 🤝', 430, 495);

      ctx.font = 'bold 15px monospace';
      ctx.fillStyle = '#F4C95D';
      ctx.fillText('CONFIRMED BY ASHU • LIFETIME CO-FOUNDER COVENANT', 430, 545);
    }
  };

  photoImg.onload = drawCard;
  setTimeout(drawCard, 200);

  btnPortrait.addEventListener('click', () => {
    isMobileAspect = true;
    btnPortrait.classList.add('btn-primary');
    btnPortrait.classList.remove('btn-secondary');
    btnLandscape.classList.add('btn-secondary');
    btnLandscape.classList.remove('btn-primary');
    drawCard();
  });

  btnLandscape.addEventListener('click', () => {
    isMobileAspect = false;
    btnLandscape.classList.add('btn-primary');
    btnLandscape.classList.remove('btn-secondary');
    btnPortrait.classList.add('btn-secondary');
    btnPortrait.classList.remove('btn-primary');
    drawCard();
  });

  btnDownload.addEventListener('click', () => {
    audio.playClick();
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `SANJAYVERSE_Birthday_Card_${isMobileAspect ? 'Mobile' : 'Desktop'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    state.showToast('📥 Birthday Card downloaded in Ultra HD!', 'toast-success');
  });

  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    audio.playClick();
    state.showToast('🔗 Website link copied to clipboard!', 'toast-success');
  });

  btnGotoEnding.addEventListener('click', () => {
    audio.playSuccess();
    canvasFx.burstCelebration();
    onNext();
  });

  btnSkip.addEventListener('click', () => {
    audio.playSuccess();
    onNext();
  });

  return () => {};
}
