/* ==========================================================================
   PHASE 18: Main Ending — The Next Mission & Partnership Lock
   ========================================================================== */

import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';
import { decorations } from '../core/decorations.js';

export function renderPhase18(container, onNext) {
  let isAccepted = false;

  const renderView = () => {
    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 880px; text-align: center;">
        <div class="midnight-badge">
          <span>🌌</span>
          <span>THE UNBROKEN CHAPTER • PHASE 18</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0; line-height: 1.3;">
          "Every story reaches its credits.<br/>Real partnerships don't."
        </h1>

        <!-- Duet Avatars & CodeXa Emblem -->
        <div style="display: flex; align-items: center; justify-content: center; gap: clamp(12px, 3vw, 36px); margin: 32px 0;">
          <div style="text-align: center;">
            <img src="/assets/ashu.jpg" style="width: clamp(80px, 15vw, 140px); height: clamp(80px, 15vw, 140px); border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-red); box-shadow: 0 0 24px var(--accent-red-glow);" />
            <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--accent-red-bright); margin-top: 8px;">
              PLAYER 01: ASHU
            </div>
          </div>

          <div style="width: 56px; height: 56px; border-radius: 12px; background: #000; border: 2px solid var(--accent-gold); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-weight: 900; font-size: 32px; color: var(--accent-gold); box-shadow: 0 0 30px var(--accent-gold-glow);">
            X
          </div>

          <div style="text-align: center;">
            <img src="/assets/sanjay.jpg" style="width: clamp(80px, 15vw, 140px); height: clamp(80px, 15vw, 140px); border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-blue); box-shadow: 0 0 24px var(--accent-blue-glow);" />
            <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--accent-blue-bright); margin-top: 8px;">
              PLAYER 02: SANJAY
            </div>
          </div>
        </div>

        <!-- Terminal Status Card -->
        <div style="background: rgba(4,5,7,0.8); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px 24px; max-width: 520px; margin: 0 auto 28px auto; font-family: var(--font-mono); font-size: 13px; text-align: left; line-height: 1.8;">
          <div><span style="color: var(--text-muted);">PLAYER 01:</span> <strong style="color: var(--accent-red-bright);">ASHU</strong></div>
          <div><span style="color: var(--text-muted);">PLAYER 02:</span> <strong style="color: var(--accent-blue-bright);">SANJAY</strong></div>
          <div><span style="color: var(--text-muted);">TEAM:</span> <strong style="color: var(--status-success);">LOCKED</strong></div>
          <div><span style="color: var(--text-muted);">TRUST:</span> <strong style="color: var(--accent-gold);">ACTIVE</strong></div>
          <div><span style="color: var(--text-muted);">FUTURE:</span> <strong style="color: #fff;">LOADING...</strong></div>
        </div>

        <div>
          ${!isAccepted ? `
            <button id="btn-accept-mission" class="btn-primary" style="padding: 0 44px; font-size: 16px;">
              <span>Accept the Next Mission</span>
              <span>🚀</span>
            </button>
          ` : `
            <div style="margin-top: 10px;">
              <div style="font-family: var(--font-heading); font-size: 20px; color: var(--accent-gold); font-weight: 700; margin-bottom: 8px;">
                "Dream bigger. Build CodeXa. Stand together. Keep creating."
              </div>
              <p style="font-size: 14px; color: var(--text-secondary); max-width: 600px; margin: 0 auto 20px auto; line-height: 1.6;">
                Happy Birthday, Sanjay. This is not the end of the story. It is only the next checkpoint.
              </p>
              <button id="btn-goto-credits" class="btn-primary" style="padding: 0 40px;">
                <span>Watch Cinematic Credits</span>
                <span>🎬</span>
              </button>
            </div>
          `}
        </div>

        <button id="btn-skip-ending" class="btn-skip">Skip to Credits →</button>
      </div>
    `;

    const btnAccept = container.querySelector('#btn-accept-mission');
    const btnCredits = container.querySelector('#btn-goto-credits');
    const btnSkip = container.querySelector('#btn-skip-ending');

    if (btnAccept) {
      btnAccept.addEventListener('click', () => {
        audio.playFanfare();
        decorations.triggerCelebrationBurst();
        canvasFx.burstCelebration();
        isAccepted = true;
        renderView();
      });
    }

    if (btnCredits) {
      btnCredits.addEventListener('click', () => {
        audio.playSuccess();
        onNext();
      });
    }

    btnSkip.addEventListener('click', () => {
      audio.playSuccess();
      onNext();
    });
  };

  renderView();

  return () => {};
}
