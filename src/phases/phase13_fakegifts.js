/* ==========================================================================
   PHASE 13: Fake Gift Reveals (Hilarious Cancellation Stamps)
   ========================================================================== */

import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase13(container, onNext) {
  const fakes = [
    {
      title: 'Girlfriend Protocol',
      icon: '💐',
      reason: 'Girlfriend gift iddam anukunna. Kaani relationship update fail ayi nuvvu depression mode loki velthe risk ani cancel chesa.',
      stamp: 'CANCELLED FOR EMOTIONAL SAFETY',
      stampColor: '#ff4757'
    },
    {
      title: 'iPhone 18 Pro Max Ultra',
      icon: '📱',
      reason: 'iPhone iddam anukunna. Kaani phone kosam kidney amme situation enduku ani nee health kosam cancel chesa.',
      stamp: 'KIDNEY PROTECTION ENABLED',
      stampColor: '#ffa502'
    },
    {
      title: 'Rolls-Royce Phantom',
      icon: '🏎️',
      reason: 'Rolls-Royce iddam anukunna. Kaani sudden rich feeling vachesi mammalni marchipothavemo ani cancel chesa.',
      stamp: 'PERSONALITY PROTECTION ENABLED',
      stampColor: '#ff4757'
    }
  ];

  let currentIdx = 0;

  const renderCard = () => {
    const f = fakes[currentIdx];

    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 680px; text-align: center;">
        <div class="midnight-badge">
          <span>🎁</span>
          <span>SPECIAL DELIVERY • FAKE GIFT 0${currentIdx + 1} OF 03</span>
        </div>

        <div class="glass-panel" style="padding: 40px; position: relative; overflow: hidden; margin: 24px 0;">
          <div style="font-size: 64px; margin-bottom: 12px;">${f.icon}</div>
          <h2 style="font-family: var(--font-heading); font-size: 26px; color: #fff;">${f.title}</h2>
          <p style="color: var(--text-secondary); font-size: 15px; margin: 16px 0 24px 0; line-height: 1.6;">
            "${f.reason}"
          </p>

          <!-- Cancellation Stamp -->
          <div style="display: inline-block; border: 3px solid ${f.stampColor}; color: ${f.stampColor}; font-family: var(--font-mono); font-weight: 900; font-size: 16px; padding: 10px 24px; border-radius: 8px; transform: rotate(-5deg); letter-spacing: 2px; box-shadow: 0 0 20px rgba(255, 71, 87, 0.3);">
            ${f.stamp}
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          ${currentIdx < fakes.length - 1 ? `
            <button id="btn-next-fake" class="btn-primary" style="padding: 0 32px;">
              Check Next Gift Box →
            </button>
          ` : `
            <button id="btn-finish-fake" class="btn-primary" style="padding: 0 36px; background: linear-gradient(135deg, var(--accent-red), var(--accent-gold));">
              Load Actual Gifts Loading... ⚡
            </button>
          `}
        </div>

        <button id="btn-skip-fakes" class="btn-skip">Skip Fake Gifts →</button>
      </div>
    `;

    const btnNext = container.querySelector('#btn-next-fake');
    const btnFinish = container.querySelector('#btn-finish-fake');
    const btnSkip = container.querySelector('#btn-skip-fakes');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        audio.playError();
        currentIdx++;
        renderCard();
      });
    }

    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        audio.playSuccess();
        canvasFx.burstCelebration();
        onNext();
      });
    }

    btnSkip.addEventListener('click', () => {
      audio.playSuccess();
      onNext();
    });
  };

  renderCard();

  return () => {};
}
