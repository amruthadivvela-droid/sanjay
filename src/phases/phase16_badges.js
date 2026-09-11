/* ==========================================================================
   PHASE 16: Badges & Achievements Showcase
   ========================================================================== */

import { state, BADGES_DEF } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase16(container, onNext) {
  const unlockedCount = state.state.badges.length;

  container.innerHTML = `
    <div class="phase-scene fade-in" style="max-width: 960px; text-align: center;">
      <div class="midnight-badge">
        <span>🏆</span>
        <span>ACHIEVEMENT REGISTRY • PHASE 16</span>
      </div>

      <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 40px); margin: 8px 0;">
        Protocol Badges Collected
      </h1>
      <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 28px;">
        Unlocked ${unlockedCount} of ${BADGES_DEF.length} achievements across the SanjayVerse.
      </p>

      <div class="badges-grid" style="margin-bottom: 32px;">
        ${BADGES_DEF.map(b => {
          const isUnlocked = state.state.badges.includes(b.id);
          return `
            <div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="badge-item-icon">${b.icon}</div>
              <div class="badge-item-title">${b.title}</div>
              <div class="badge-item-desc">${b.desc}</div>
              <div style="font-family: var(--font-mono); font-size: 10px; color: ${isUnlocked ? 'var(--status-success)' : 'var(--text-muted)'}; margin-top: 4px;">
                ${isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div>
        <button id="btn-goto-card-gen" class="btn-primary" style="padding: 0 44px;">
          <span>Generate Downloadable Card</span>
          <span>🎨</span>
        </button>
      </div>
    </div>
  `;

  const btnGoto = container.querySelector('#btn-goto-card-gen');

  btnGoto.addEventListener('click', () => {
    audio.playSuccess();
    canvasFx.burstCelebration();
    onNext();
  });

  return () => {};
}
