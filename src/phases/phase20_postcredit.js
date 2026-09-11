/* ==========================================================================
   PHASE 20: Post-Credit Scene & Final Portal Hub (New Game+ Unlocked)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { getHackerSVG, getCatSVG, getRedPandaSVG, CharacterStates } from '../core/characters.js';

export function renderPhase20(container, onReplay, onOpenChapters, onOpenCard, onOpenTerminal) {
  state.enableNewGamePlus();

  let step = 'glitch'; // 'glitch' -> 'terminal_ended' -> 'exit_screen'

  const renderView = () => {
    if (step === 'glitch') {
      container.innerHTML = `
        <div class="phase-scene fade-in" style="max-width: 680px; text-align: center;">
          <div style="width: 140px; height: 140px; margin: 0 auto 16px auto;">
            ${getHackerSVG(CharacterStates.SIP)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 2px;">
            SESSION TERMINATED...
          </div>
          <div style="border: 2px solid var(--accent-red); background: rgba(217,4,41,0.15); border-radius: var(--radius-md); padding: 18px; margin: 20px 0; font-family: var(--font-mono); color: var(--accent-red-bright); font-weight: bold; font-size: 15px; letter-spacing: 1px;">
            ⚠️ ERROR: Lifetime irritation cannot be disabled.
          </div>
          <div style="font-style: italic; color: var(--text-secondary); margin-bottom: 24px;">
            Hacker drinks coffee: "Expected."
          </div>
          <button id="btn-reveal-final" class="btn-primary">
            Enter Final Station →
          </button>
        </div>
      `;

      container.querySelector('#btn-reveal-final').addEventListener('click', () => {
        audio.playSuccess();
        step = 'terminal_ended';
        renderView();
      });
    } else if (step === 'exit_screen') {
      container.innerHTML = `
        <div class="phase-scene fade-in" style="max-width: 680px; text-align: center;">
          <div style="font-size: 56px; margin-bottom: 16px;">🌌</div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 40px); color: #fff; margin-bottom: 16px;">
            Thank You, Sanjay.
          </h1>
          <p style="font-size: 16px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">
            This entire universe was engineered for you to celebrate the incredible creator, partner, and brother you are.
            Proud to build CodeXa Agency by your side.
          </p>
          <div style="font-family: var(--font-heading); font-size: 20px; color: var(--accent-gold); font-weight: 700; margin-bottom: 32px;">
            — Ashu, Founder
          </div>
          <button id="btn-back-hub" class="btn-secondary">
            ← Return to SanjayVerse Hub
          </button>
        </div>
      `;

      container.querySelector('#btn-back-hub').addEventListener('click', () => {
        audio.playClick();
        step = 'terminal_ended';
        renderView();
      });
    } else {
      container.innerHTML = `
        <div class="phase-scene fade-in" style="max-width: 780px; text-align: center;">
          <div class="midnight-badge" style="border-color: var(--accent-gold); color: var(--accent-gold);">
            <span>🌟</span>
            <span>NEW GAME+ UNLOCKED</span>
          </div>

          <h1 style="font-family: var(--font-heading); font-size: clamp(28px, 5vw, 48px); margin: 12px 0;">
            Happy Birthday, Sanjay.
          </h1>
          <p style="color: var(--text-secondary); font-size: 16px; margin-bottom: 28px;">
            See you in the next level.
          </p>

          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px;">
            <button id="btn-final-replay" class="btn-primary" style="padding: 0 28px;">
              <span>🔄</span>
              <span>Replay Story</span>
            </button>
            <button id="btn-final-chapters" class="btn-secondary" style="padding: 0 24px;">
              <span>🌌</span>
              <span>Chapter Select</span>
            </button>
            <button id="btn-final-card" class="btn-secondary" style="padding: 0 24px;">
              <span>🎨</span>
              <span>Download Card</span>
            </button>
            <button id="btn-final-exit" class="btn-ghost">
              <span>🚪</span>
              <span>Exit SanjayVerse</span>
            </button>
          </div>

          <div style="display: flex; justify-content: center; gap: 24px; opacity: 0.6;">
            <div style="width: 80px; height: 80px;">${getCatSVG(CharacterStates.IDLE)}</div>
            <div style="width: 80px; height: 80px;">${getRedPandaSVG(CharacterStates.IDLE)}</div>
          </div>
        </div>
      `;

      container.querySelector('#btn-final-replay').addEventListener('click', onReplay);
      container.querySelector('#btn-final-chapters').addEventListener('click', onOpenChapters);
      container.querySelector('#btn-final-card').addEventListener('click', onOpenCard);
      container.querySelector('#btn-final-exit').addEventListener('click', () => {
        audio.playClick();
        step = 'exit_screen';
        renderView();
      });
    }
  };

  renderView();

  return () => {};
}
