/* ==========================================================================
   PHASE 11: Founder's Promise Vault (GTA VI, Biryani, Irritation & Partnership)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';
import { decorations } from '../core/decorations.js';

export function renderPhase11(container, onNext) {
  let isAccepted = false;

  const renderView = () => {
    container.innerHTML = `
      <div class="phase-scene vault-scene fade-in">
        <div class="midnight-badge">
          <span>🗝️</span>
          <span>FOUNDER'S COVENANT • PHASE 11</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0;">
          Founder's Promise Vault
        </h1>
        <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 24px;">
          Four legally non-binding but emotionally sacred contracts signed by Ashu.
        </p>

        <div class="promises-grid">
          <!-- Promise 1 -->
          <div class="promise-card">
            <div class="promise-header">
              <span style="font-size: 24px;">🎮</span>
              <span class="promise-status status-pending">PENDING LAUNCH</span>
            </div>
            <h3 style="font-size: 16px; margin-bottom: 6px; color: #fff;">Clause 01: The GTA VI Guarantee</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
              "GTA VI official ga launch ayinappudu, nee game copy naa responsibility. Deluxe Edition, zero excuses."
            </p>
          </div>

          <!-- Promise 2 -->
          <div class="promise-card">
            <div class="promise-header">
              <span style="font-size: 24px;">🍗</span>
              <span class="promise-status status-ready">READY TO REDEEM</span>
            </div>
            <h3 style="font-size: 16px; margin-bottom: 6px; color: #fff;">Clause 02: Biryani Protocol</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
              "Full biryani treat, plus neeku nachina food kadupu nindentha varaku. Any restaurant, whenever you demand."
            </p>
          </div>

          <!-- Promise 3 -->
          <div class="promise-card">
            <div class="promise-header">
              <span style="font-size: 24px;">📞</span>
              <span class="promise-status status-active">PERMANENTLY ACTIVE</span>
            </div>
            <h3 style="font-size: 16px; margin-bottom: 6px; color: #fff;">Clause 03: Lifetime Irritation</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
              "Unlimited calls, random creative brainstorms, roasting Deepak, and zero option to unsubscribe."
            </p>
          </div>

          <!-- Promise 4 -->
          <div class="promise-card" style="border-color: rgba(244, 201, 93, 0.4);">
            <div class="promise-header">
              <span style="font-size: 24px;">🤝</span>
              <span class="promise-status status-ready" style="background: rgba(244, 201, 93, 0.2);">FOUNDATION</span>
            </div>
            <h3 style="font-size: 16px; margin-bottom: 6px; color: var(--accent-gold);">Clause 04: Partnership Covenant</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
              "Whatever challenges come next, I promise to stand beside you with honesty, trust, respect and support."
            </p>
          </div>
        </div>

        <div style="margin-top: 16px;">
          ${!isAccepted ? `
            <button id="btn-accept-pact" class="btn-primary" style="padding: 0 44px;">
              <span>Accept the Pact</span>
              <span>✍️</span>
            </button>
          ` : `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
              <div style="font-family: var(--font-mono); font-size: 14px; color: var(--status-success); font-weight: bold;">
                ✓ COVENANT RATIFIED • VALID FOR LIFE (ASHU & SANJAY)
              </div>
              <button id="btn-goto-gifts" class="btn-primary" style="padding: 0 40px;">
                <span>Discover Actual Gifts</span>
                <span>🎁</span>
              </button>
            </div>
          `}
        </div>
      </div>
    `;

    const btnAccept = container.querySelector('#btn-accept-pact');
    const btnGoto = container.querySelector('#btn-goto-gifts');

    if (btnAccept) {
      btnAccept.addEventListener('click', () => {
        audio.playSuccess();
        decorations.triggerCelebrationBurst();
        canvasFx.burstCelebration();
        state.unlockBadge('b_cofounder');
        isAccepted = true;
        renderView();
      });
    }

    if (btnGoto) {
      btnGoto.addEventListener('click', () => {
        audio.playClick();
        onNext();
      });
    }
  };

  renderView();

  return () => {};
}
