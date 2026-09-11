/* ==========================================================================
   PHASE 4: Double Confirmation & Biometric Profile Scan
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase4(container, onNext) {
  let step = 'question'; // 'question' -> 'scanning' -> 'confirmed'
  let timeouts = [];

  const renderView = () => {
    if (step === 'question') {
      container.innerHTML = `
        <div class="phase-scene confirm-scene fade-in">
          <div class="midnight-badge" style="border-color: var(--status-success); color: var(--status-success);">
            <span>✓</span>
            <span>PASSCODE RECOGNIZED</span>
          </div>

          <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 12px 0;">
            Password accepted.
          </h1>
          <p style="color: var(--text-secondary); font-size: 16px; margin-bottom: 28px; line-height: 1.6;">
            Nijamga idhe correct password anukuntunnava?<br/>
            Final biometric scan is required to confirm Co-Founder clearance.
          </p>

          <button id="btn-verify-me" class="btn-primary" style="padding: 0 36px;">
            <span>Yes, Verify Me</span>
            <span>⚡</span>
          </button>
        </div>
      `;

      container.querySelector('#btn-verify-me').addEventListener('click', () => {
        audio.playClick();
        step = 'scanning';
        renderView();
      });
    } else if (step === 'scanning') {
      container.innerHTML = `
        <div class="phase-scene confirm-scene fade-in">
          <div class="scan-radar-wrap">
            <div class="scan-line"></div>
            <span style="font-size: 64px;">👤</span>
          </div>

          <h2 id="scan-title" style="font-family: var(--font-mono); font-size: 18px; letter-spacing: 2px; color: var(--accent-red-bright);">
            RUNNING NEURAL IDENTITY SCAN...
          </h2>

          <div class="scan-traits-list" id="traits-container">
            <div class="scan-trait-row" id="t-gamer" style="opacity: 0.2;">
              <span>🎮 Gamer Profile (GTA / BGMI)</span>
              <span class="scan-trait-status" id="s-gamer">SEARCHING...</span>
            </div>
            <div class="scan-trait-row" id="t-editor" style="opacity: 0.2;">
              <span>🎬 Video Editor & Camera Vision</span>
              <span class="scan-trait-status" id="s-editor">SEARCHING...</span>
            </div>
            <div class="scan-trait-row" id="t-marvel" style="opacity: 0.2;">
              <span>🕷️ Marvel & Spider-Man Obsession</span>
              <span class="scan-trait-status" id="s-marvel">SEARCHING...</span>
            </div>
            <div class="scan-trait-row" id="t-cofounder" style="opacity: 0.2;">
              <span>🏢 CodeXa Co-Founder Credentials</span>
              <span class="scan-trait-status" id="s-cofounder">SEARCHING...</span>
            </div>
            <div class="scan-trait-row" id="t-irritation" style="opacity: 0.2;">
              <span>😤 Unlimited Ashu-Irritation Tolerance</span>
              <span class="scan-trait-status" id="s-irritation">SEARCHING...</span>
            </div>
          </div>

          <button id="btn-skip-scan" class="btn-skip">Skip Biometrics →</button>
        </div>
      `;

      const traits = [
        { id: 'gamer', label: 'DETECTED 100%' },
        { id: 'editor', label: 'VERIFIED (CINEMA)' },
        { id: 'marvel', label: 'CONFIRMED (PETER PARKER)' },
        { id: 'cofounder', label: 'CLEARED (EXECUTIVE)' },
        { id: 'irritation', label: 'LEGENDARY LEVEL' }
      ];

      const finishScan = () => {
        timeouts.forEach(t => clearTimeout(t));
        step = 'confirmed';
        renderView();
      };

      container.querySelector('#btn-skip-scan').addEventListener('click', finishScan);

      traits.forEach((t, i) => {
        timeouts.push(setTimeout(() => {
          audio.playLaserScan();
          const row = container.querySelector(`#t-${t.id}`);
          const stat = container.querySelector(`#s-${t.id}`);
          if (row && stat) {
            row.style.opacity = '1';
            row.style.border = '1px solid var(--accent-red)';
            stat.textContent = t.label;
          }
        }, 500 + i * 650));
      });

      timeouts.push(setTimeout(() => {
        finishScan();
      }, 500 + traits.length * 650 + 600));
    } else if (step === 'confirmed') {
      state.setVerified(true);
      audio.playSuccess();
      canvasFx.burstCelebration();

      container.innerHTML = `
        <div class="phase-scene confirm-scene fade-in">
          <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(56, 217, 150, 0.15); border: 2px solid var(--status-success); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 36px;">
            ✓
          </div>

          <div class="midnight-badge" style="border-color: var(--status-success); color: var(--status-success);">
            <span>CONGRATULATIONS</span>
          </div>

          <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0; letter-spacing: 1px;">
            Nuvvu Sanjay ve ani confirm ayindhi.
          </h1>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; margin: 20px 0; line-height: 1.7; color: var(--text-secondary);">
            <strong style="color: #fff; font-size: 16px;">Co-Founder Verification Successful!</strong><br/>
            <span style="color: var(--accent-gold); font-weight: 600;">The gates of the SanjayVerse are now officially unlocked.</span>
          </div>

          <button id="btn-enter-hub" class="btn-primary" style="padding: 0 40px;">
            <span>Explore the SanjayVerse</span>
            <span>🌌</span>
          </button>
        </div>
      `;

      container.querySelector('#btn-enter-hub').addEventListener('click', () => {
        audio.playClick();
        onNext();
      });
    }
  };

  renderView();

  return () => {
    timeouts.forEach(t => clearTimeout(t));
  };
}
