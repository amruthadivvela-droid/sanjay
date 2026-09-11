/* ==========================================================================
   PHASE 10: Emotional Letter (Wax-Sealed Envelope & Heartfelt Written Message)
   ========================================================================== */

import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase10(container, onNext) {
  let isOpen = false;
  let showFull = false;

  const renderView = () => {
    if (!isOpen) {
      container.innerHTML = `
        <div class="phase-scene letter-scene fade-in">
          <div class="midnight-badge">
            <span>✉️</span>
            <span>PERSONAL CORRESPONDENCE • PHASE 10</span>
          </div>

          <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0;">
            A Letter from Ashu
          </h1>
          <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 24px;">
            Some words can't be expressed in a casual call.
          </p>

          <div class="envelope-wrap" id="envelope-trigger" style="cursor: pointer;" title="Click to open letter">
            <div class="wax-seal">A</div>
          </div>

          <div style="margin-top: 16px;">
            <button id="btn-open-letter" class="btn-primary" style="padding: 0 36px;">
              <span>Open When You're Ready</span>
              <span>✨</span>
            </button>
          </div>
        </div>
      `;

      const openIt = () => {
        audio.playClick();
        audio.playSpiderChime();
        isOpen = true;
        renderView();
      };

      container.querySelector('#envelope-trigger').addEventListener('click', openIt);
      container.querySelector('#btn-open-letter').addEventListener('click', openIt);
    } else {
      container.innerHTML = `
        <div class="phase-scene letter-scene fade-in">
          <div class="midnight-badge">
            <span>📜</span>
            <span>FOUNDER TO CO-FOUNDER</span>
          </div>

          <div class="letter-sheet" id="letter-sheet-content">
            <h2 style="font-family: var(--font-cinematic); font-size: 24px; color: var(--accent-gold); margin-bottom: 20px; letter-spacing: 1px;">
              Dear Sanjay,
            </h2>

            <div class="letter-paragraph ${showFull ? 'revealed' : ''}" style="${showFull ? 'opacity: 1; animation: none;' : 'animation-delay: 0.2s;'}">
              Today, as you turn another year wiser (and hopefully 2% faster at answering my phone calls), I wanted to pause the daily chaos of deadlines, client demands, and export queues to say something genuine.
            </div>

            <div class="letter-paragraph ${showFull ? 'revealed' : ''}" style="${showFull ? 'opacity: 1; animation: none;' : 'animation-delay: 0.7s;'}">
              When we started CodeXa, it wasn't just about building an agency. It was about building something that belonged to us — proof that two friends with cameras, ambition, and zero excuses could build a creative powerhouse. In every late-night shoot, every impossible render deadline, and every creative disagreement we debated, you were always right there beside me.
            </div>

            <div class="letter-paragraph ${showFull ? 'revealed' : ''}" style="${showFull ? 'opacity: 1; animation: none;' : 'animation-delay: 1.2s;'}">
              Your eye behind the lens isn't just technical skill; it's true storytelling intuition. You see the soul of moments before anyone else even notices the light. CodeXa wouldn't be half of what it is today without your creative backbone.
            </div>

            <div class="letter-paragraph ${showFull ? 'revealed' : ''}" style="${showFull ? 'opacity: 1; animation: none;' : 'animation-delay: 1.7s;'}">
              Whatever new mountains we climb, whatever challenges we face, my promise to you is absolute: unwavering trust, complete respect, and a lifetime partnership.
            </div>

            <div class="letter-signature-block">
              <div>
                <div style="font-size: 15px; color: var(--accent-gold); font-weight: 700; font-family: var(--font-cinematic);">
                  "This letter ends here. The support behind it doesn't."
                </div>
                <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">12 September 2026</div>
              </div>
              <div style="text-align: right;">
                <div style="font-family: var(--font-cinematic); font-size: 20px; color: #fff; font-weight: bold;">Ashu</div>
                <div style="font-size: 11px; color: var(--text-secondary);">Founder • Brother</div>
              </div>
            </div>
          </div>

          <!-- Letter Controls -->
          <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            ${!showFull ? `
              <button id="btn-show-full" class="btn-secondary" style="font-size: 13px; min-height: 44px; padding: 0 20px;">
                <span>📖</span>
                <span>Show Full Letter</span>
              </button>
            ` : ''}
            <button id="btn-read-again" class="btn-ghost" style="font-size: 13px;">
              <span>↺</span>
              <span>Read Again</span>
            </button>
            <button id="btn-proceed-vault" class="btn-primary" style="padding: 0 36px;">
              <span>Continue</span>
              <span>🗝️</span>
            </button>
          </div>
        </div>
      `;

      const btnFull = container.querySelector('#btn-show-full');
      const btnAgain = container.querySelector('#btn-read-again');
      const btnProceed = container.querySelector('#btn-proceed-vault');

      if (btnFull) {
        btnFull.addEventListener('click', () => {
          audio.playClick();
          showFull = true;
          renderView();
        });
      }

      btnAgain.addEventListener('click', () => {
        audio.playClick();
        isOpen = false;
        showFull = false;
        renderView();
      });

      btnProceed.addEventListener('click', () => {
        audio.playSuccess();
        canvasFx.burstCelebration();
        onNext();
      });
    }
  };

  renderView();

  return () => {};
}
