/* ==========================================================================
   PHASE 19: Movie Credits (Cinematic Vertical Rolling Credits)
   ========================================================================== */

import { audio } from '../core/audio.js';

export function renderPhase19(container, onNext) {
  let isPaused = false;
  let scrollPos = 0;
  let animId = null;

  container.innerHTML = `
    <div class="phase-scene fade-in" style="max-width: 680px; height: 100%; overflow: hidden; position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div id="credits-crawl" style="text-align: center; line-height: 2.2; font-family: var(--font-heading); color: #e2e8f0; transform: translateY(180px); transition: transform 0.1s linear;">
        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-red-bright); letter-spacing: 4px; margin-bottom: 24px;">
          CODEXA PRODUCTION CREDITS
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">BIRTHDAY HERO & CO-FOUNDER</div>
          <div style="font-size: 28px; font-weight: 900; color: #fff;">B. SANJAY</div>
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">FOUNDER & LIFETIME IRRITATOR</div>
          <div style="font-size: 24px; font-weight: 800; color: var(--accent-gold);">ASHU</div>
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">SPECIAL ROAST TARGET</div>
          <div style="font-size: 22px; font-weight: 700; color: #fff;">DEEPAK</div>
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">SECURITY ENFORCERS</div>
          <div style="font-size: 18px; color: #a5abb6;">Luna (Suspicious Black Cat) & Rex (Playful Red Panda)</div>
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">PRODUCTION</div>
          <div style="font-size: 18px; font-weight: 800; color: var(--accent-red-bright);">CodeXa Agency</div>
        </div>

        <div style="margin-bottom: 32px;">
          <div style="font-size: 12px; color: var(--text-muted); letter-spacing: 2px;">SYSTEM PROTOCOL STATUS</div>
          <div style="font-family: var(--font-mono); font-size: 13px; color: var(--accent-gold); line-height: 1.8;">
            GTA VI STATUS: WAITING<br/>
            BIRYANI STATUS: CLAIMABLE<br/>
            IRRITATION STATUS: PERMANENTLY ACTIVE
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
          <div style="font-size: 16px; font-weight: 700; color: #fff;">Created with love by Ashu for Sanjay</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">12 September 2026</div>
        </div>
      </div>

      <div style="position: absolute; bottom: 24px; display: flex; gap: 12px;">
        <button id="btn-pause-credits" class="btn-secondary" style="font-size: 13px; min-height: 38px;">
          Pause Roll
        </button>
        <button id="btn-goto-postcredit" class="btn-primary" style="font-size: 13px; min-height: 38px;">
          Post-Credit Scene →
        </button>
      </div>
    </div>
  `;

  const crawl = container.querySelector('#credits-crawl');
  const btnPause = container.querySelector('#btn-pause-credits');
  const btnNext = container.querySelector('#btn-goto-postcredit');

  const roll = () => {
    if (!isPaused) {
      scrollPos -= 0.65;
      crawl.style.transform = `translateY(${scrollPos}px)`;

      if (scrollPos < -600) {
        onNext();
        return;
      }
    }
    animId = requestAnimationFrame(roll);
  };
  roll();

  btnPause.addEventListener('click', () => {
    isPaused = !isPaused;
    btnPause.textContent = isPaused ? 'Resume Roll' : 'Pause Roll';
  });

  btnNext.addEventListener('click', () => {
    cancelAnimationFrame(animId);
    audio.playClick();
    onNext();
  });

  return () => {
    if (animId) cancelAnimationFrame(animId);
  };
}
