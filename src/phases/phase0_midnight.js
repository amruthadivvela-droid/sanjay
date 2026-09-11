/* ==========================================================================
   PHASE 0: Midnight Lock & Live IST Countdown
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { getHackerSVG, getCatSVG, getRedPandaSVG, CharacterStates } from '../core/characters.js';

export function renderPhase0(container, onNext) {
  // Target: 12 September 2026, 00:00:00 IST (UTC+5:30)
  const targetDate = new Date('2026-09-12T00:00:00+05:30').getTime();

  container.innerHTML = `
    <div class="phase-scene midnight-scene fade-in">
      <div class="midnight-badge">
        <span>🔒</span>
        <span>CLASSIFIED BIRTHDAY PROTOCOL</span>
      </div>

      <h1 class="midnight-title">SANJAYVERSE</h1>
      <p class="midnight-sub">Presented by Ashu • Co-Founder Protocol Loading</p>

      <div class="countdown-clock" id="countdown-clock">
        <div class="clock-segment">
          <div class="clock-card">
            <span class="clock-digits" id="cd-days">00</span>
          </div>
          <span class="clock-label">DAYS</span>
        </div>
        <span class="clock-divider">:</span>
        <div class="clock-segment">
          <div class="clock-card">
            <span class="clock-digits" id="cd-hours">00</span>
          </div>
          <span class="clock-label">HOURS</span>
        </div>
        <span class="clock-divider">:</span>
        <div class="clock-segment">
          <div class="clock-card">
            <span class="clock-digits" id="cd-minutes">00</span>
          </div>
          <span class="clock-label">MINUTES</span>
        </div>
        <span class="clock-divider">:</span>
        <div class="clock-segment">
          <div class="clock-card">
            <span class="clock-digits" id="cd-seconds">00</span>
          </div>
          <span class="clock-label">SECONDS</span>
        </div>
      </div>

      <div class="midnight-characters-bar">
        <div style="width: 130px; height: 130px;">
          ${getHackerSVG(CharacterStates.SLEEP)}
        </div>
        <div style="width: 90px; height: 90px;">
          ${getCatSVG(CharacterStates.SLEEP)}
        </div>
        <div style="width: 90px; height: 90px;">
          ${getRedPandaSVG(CharacterStates.SLEEP)}
        </div>
      </div>

      <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 24px;">
        Hacker and animal crew are resting until September 12, 12:00 AM IST.
      </p>

      <div class="midnight-actions" style="justify-content: center;">
        <button id="btn-midnight-sound" class="btn-primary" style="padding: 0 32px;">
          <span id="midnight-sound-icon">🔊</span>
          <span id="midnight-sound-label">Enable Audio Experience</span>
        </button>
      </div>

      <button id="btn-skip-midnight" class="btn-skip">Skip Countdown →</button>
    </div>
  `;

  const daysEl = container.querySelector('#cd-days');
  const hoursEl = container.querySelector('#cd-hours');
  const minutesEl = container.querySelector('#cd-minutes');
  const secondsEl = container.querySelector('#cd-seconds');
  const btnSound = container.querySelector('#btn-midnight-sound');
  const btnSkip = container.querySelector('#btn-skip-midnight');

  let timerInterval = null;

  const updateCountdown = () => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      audio.playSuccess();
      onNext();
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');

    if (state.state.soundEnabled) {
      audio.playTick();
    }
  };

  updateCountdown();
  timerInterval = setInterval(updateCountdown, 1000);

  btnSound.addEventListener('click', () => {
    const isEnabled = state.toggleSound();
    audio.ensureContext();
    if (isEnabled) audio.playClick();
    container.querySelector('#midnight-sound-label').textContent = isEnabled ? 'Audio Active' : 'Enable Audio';
  });

  const proceedToPortal = () => {
    clearInterval(timerInterval);
    audio.ensureContext();
    audio.playPortalHum();
    onNext();
  };

  btnSkip.addEventListener('click', proceedToPortal);

  return () => {
    clearInterval(timerInterval);
  };
}
