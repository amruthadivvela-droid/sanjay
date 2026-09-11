/* ==========================================================================
   PHASE 9: From the Founder, to the Co-Founder (Ashu's Message & CodeXa Tribute)
   ========================================================================== */

import { audio } from '../core/audio.js';

export function renderPhase9(container, onNext) {
  const wishes = [
    {
      author: 'Ashu',
      role: 'Founder • CodeXa Agency',
      avatar: '/assets/ashu.jpg',
      text: "Happy Birthday Sanjay! Building CodeXa with you has been the greatest adventure of my life. From brainstorming at midnight to shooting commercials and debating edits, you've always been the rock of this agency. Let's conquer the future!"
    },
    {
      author: 'CodeXa Creative Team',
      role: 'Production & Motion Squad',
      avatar: '/assets/codexa_hq.jpg',
      text: "Happy Birthday to our Co-Founder and Creative Director! Thank you for pushing creative boundaries, teaching us cinema aesthetics, and never settling for mediocre cuts."
    }
  ];

  let currentWishIdx = 0;

  const renderCard = () => {
    const w = wishes[currentWishIdx];

    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 760px; text-align: center; width: 100%;">
        <div class="midnight-badge">
          <span>👑</span>
          <span>FOUNDER'S ADDRESS • PHASE 09</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4.5vw, 38px); margin: 8px 0; letter-spacing: 1px;">
          From the Founder, to the Co-Founder
        </h1>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
          Message ${currentWishIdx + 1} of ${wishes.length}
        </p>

        <div class="glass-panel" style="padding: clamp(24px, 4vw, 36px); text-align: left; position: relative; border-left: 4px solid var(--accent-red); margin-bottom: 24px; box-shadow: var(--shadow-lg);">
          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
            <img src="${w.avatar}" alt="${w.author}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-red); box-shadow: 0 0 16px var(--accent-red-glow);" />
            <div>
              <div style="font-weight: 800; font-size: 20px; color: #fff;">${w.author}</div>
              <div style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); letter-spacing: 1px; margin-top: 2px;">${w.role}</div>
            </div>
          </div>

          <p style="font-size: 16px; line-height: 1.85; color: #f1f5f9; margin-bottom: 8px;">
            "${w.text}"
          </p>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          ${currentWishIdx > 0 ? `<button id="btn-prev-wish" class="btn-ghost">← Previous Message</button>` : ''}
          ${currentWishIdx < wishes.length - 1 ? `
            <button id="btn-next-wish" class="btn-secondary" style="min-height: 44px; padding: 0 24px;">Next Message →</button>
          ` : `
            <button id="btn-finish-wishes" class="btn-primary" style="min-height: 48px; padding: 0 32px;">
              <span>Open Emotional Letter</span>
              <span>✉️</span>
            </button>
          `}
        </div>
      </div>
    `;

    const btnNext = container.querySelector('#btn-next-wish');
    const btnPrev = container.querySelector('#btn-prev-wish');
    const btnFinish = container.querySelector('#btn-finish-wishes');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        audio.playClick();
        currentWishIdx++;
        renderCard();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        audio.playClick();
        currentWishIdx--;
        renderCard();
      });
    }

    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        audio.playSuccess();
        onNext();
      });
    }
  };

  renderCard();

  return () => {};
}
