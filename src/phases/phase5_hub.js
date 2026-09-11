/* ==========================================================================
   PHASE 5: SanjayVerse World Hub & Official Player Card
   ========================================================================== */

import { audio } from '../core/audio.js';

export function renderPhase5(container, onNext) {
  const zones = [
    { num: '01', name: 'Origin Archive', icon: '📜' },
    { num: '02', name: 'Creator Studio', icon: '🎬' },
    { num: '03', name: 'Cinema Portal', icon: '🍿' },
    { num: '04', name: 'Gaming Arena', icon: '🎮' },
    { num: '05', name: 'CodeXa HQ', icon: '🏢' },
    { num: '06', name: 'Celebration Room', icon: '🎂' },
    { num: '07', name: 'Promise Vault', icon: '🗝️' },
    { num: '08', name: 'Gift Chamber', icon: '🎁' }
  ];

  container.innerHTML = `
    <div class="phase-scene hub-scene fade-in">
      <div class="midnight-badge">
        <span>🌌</span>
        <span>SANJAYVERSE GATEWAY • CHAPTER 01 OF 08</span>
      </div>

      <!-- Player Card -->
      <div class="player-card-container">
        <div class="player-photo-wrap">
          <img src="/assets/sanjay.jpg" alt="B. Sanjay" class="player-photo" onerror="this.src='/photos/sanjay.jpg'" />
        </div>

        <div class="player-details">
          <div class="player-header-badge">OFFICIAL CHARACTER CARD</div>
          <h1 class="player-name">B. SANJAY</h1>
          <p style="color: var(--accent-red-bright); font-weight: 700; letter-spacing: 1px; font-size: 15px; margin-top: -6px;">
            Co-Founder • CodeXa Agency
          </p>

          <div class="player-meta-grid">
            <div class="meta-box">
              <div class="meta-box-label">Class</div>
              <div class="meta-box-val">Visionary Creator</div>
            </div>
            <div class="meta-box">
              <div class="meta-box-label">Specialities</div>
              <div class="meta-box-val">Video Editing & Camera</div>
            </div>
            <div class="meta-box">
              <div class="meta-box-label">Interests</div>
              <div class="meta-box-val">Gaming, Movies & Marvel</div>
            </div>
            <div class="meta-box">
              <div class="meta-box-label">Favourite Hero</div>
              <div class="meta-box-val">Spider-Man</div>
            </div>
            <div class="meta-box">
              <div class="meta-box-label">Current Mission</div>
              <div class="meta-box-val">Build the Future</div>
            </div>
            <div class="meta-box">
              <div class="meta-box-label">Lifetime Teammate</div>
              <div class="meta-box-val">Ashu</div>
            </div>
          </div>
        </div>
      </div>

      <!-- World Zones Carousel / Strip -->
      <div style="width: 100%; max-width: 800px; text-align: left;">
        <div style="font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; color: var(--text-muted); margin-bottom: 8px;">
          EXPLORATION ZONES (SEQUENTIAL PROTOCOL)
        </div>
        <div class="zones-strip">
          ${zones.map((z, idx) => `
            <div class="zone-chip ${idx === 0 ? 'active' : ''}">
              <span>${z.icon}</span>
              <span>${z.num}. ${z.name}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Button -->
      <div style="margin-top: 12px;">
        <button id="btn-start-story" class="btn-primary" style="padding: 0 44px;">
          <span>Begin the Story</span>
          <span>→</span>
        </button>
      </div>

      <button id="btn-skip-hub" class="btn-skip">Skip Hub →</button>
    </div>
  `;

  const btnStart = container.querySelector('#btn-start-story');
  const btnSkip = container.querySelector('#btn-skip-hub');

  const proceed = () => {
    audio.playClick();
    onNext();
  };

  btnStart.addEventListener('click', proceed);
  btnSkip.addEventListener('click', proceed);

  return () => {};
}
