/* ==========================================================================
   PHASE 1: Cinematic Time Portal (Devanagari Numeral Morph & Web Crack)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase1(container, onNext) {
  container.innerHTML = `
    <div class="phase-scene portal-scene fade-in">
      <div class="portal-center" id="portal-center">
        <div class="portal-wheel-container" id="portal-wheel">
          <div class="portal-wheel-outer"></div>
          <div class="portal-devanagari-year" id="devanagari-display">२०१८</div>
        </div>
        <div id="portal-status" style="font-family: var(--font-mono); font-size: 14px; letter-spacing: 2px; color: var(--text-secondary);">
          CALIBRATING TEMPORAL PROTOCOL...
        </div>
      </div>

      <button id="btn-skip-portal" class="btn-skip">Skip Portal →</button>
    </div>
  `;

  const displayEl = container.querySelector('#devanagari-display');
  const statusEl = container.querySelector('#portal-status');
  const wheelEl = container.querySelector('#portal-wheel');
  const btnSkip = container.querySelector('#btn-skip-portal');

  let timeouts = [];
  const years = ['२०१८', '२०१९', '२०२०', '२०२१', '२०२२', '२०२३', '२०२४', '२०२५', '२०२६'];
  const months = ['जनवरी', 'मार्च', 'मई', 'जुलाई', 'सितम्बर'];

  const skipOrEnd = () => {
    timeouts.forEach(t => clearTimeout(t));
    audio.playSuccess();
    canvasFx.burstCelebration();
    onNext();
  };

  btnSkip.addEventListener('click', skipOrEnd);

  // If user has reduceMotion enabled, fast forward directly
  if (state.state.reduceMotion) {
    displayEl.innerHTML = `<span class="portal-final-date">१२ सितम्बर २०२६</span>`;
    statusEl.textContent = 'PROTOCOL UNLOCKED';
    setTimeout(skipOrEnd, 1200);
    return () => timeouts.forEach(t => clearTimeout(t));
  }

  // Animation Step 1: Rapid Devanagari Years (0.5s - 2.5s)
  audio.playPortalHum();
  years.forEach((yr, idx) => {
    timeouts.push(setTimeout(() => {
      displayEl.textContent = yr;
      audio.playTick();
    }, 200 + idx * 250));
  });

  // Animation Step 2: Months slowing down at September (2.8s - 4.5s)
  timeouts.push(setTimeout(() => {
    statusEl.textContent = 'SYNCHRONIZING MONTH...';
    months.forEach((m, idx) => {
      timeouts.push(setTimeout(() => {
        displayEl.textContent = m;
        audio.playClick();
        if (m === 'सितम्बर') {
          displayEl.style.color = '#FF274D';
        }
      }, idx * 320));
    });
  }, 2700));

  // Animation Step 3: Date Morph १ -> १२ and Grand Reveal (4.8s)
  timeouts.push(setTimeout(() => {
    statusEl.textContent = 'TEMPORAL COORDINATE CONFIRMED';
    displayEl.textContent = '१';
    timeouts.push(setTimeout(() => {
      displayEl.textContent = '१२';
      audio.playTone(880, 'triangle', 0.4);
    }, 400));
  }, 4700));

  // Animation Step 4: Final Date & Spreading Red Web Crack (5.6s)
  timeouts.push(setTimeout(() => {
    wheelEl.remove();
    displayEl.innerHTML = `<div class="portal-final-date">१२ सितम्बर २०२६</div>`;
    statusEl.innerHTML = `<span style="color: var(--accent-gold); font-weight: 700;">ONE PERSON • MANY ROLES • ONE UNFORGETTABLE CHAPTER</span>`;
    audio.playSuccess();

    // Trigger canvas web crack
    canvasFx.drawWebCrack(window.innerWidth / 2, window.innerHeight / 2, () => {
      canvasFx.burstCelebration();
      timeouts.push(setTimeout(skipOrEnd, 1400));
    });
  }, 5600));

  return () => {
    timeouts.forEach(t => clearTimeout(t));
  };
}
