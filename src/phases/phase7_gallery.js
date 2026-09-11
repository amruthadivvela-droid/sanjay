/* ==========================================================================
   PHASE 7: Memory Gallery (Centered Cinematic Showcase, Zero Side-Scroll)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';

export function renderPhase7(container, onNext) {
  const isClassifiedUnlocked = state.state.fragments.length >= 3 || state.state.newGamePlus;

  const memories = [
    {
      id: 1,
      title: 'The Creative Director',
      date: '12 Sept 2024',
      src: '/assets/sanjay.jpg',
      caption: 'B. Sanjay in his element — framing dreams into cinematic realities with calm mastery.'
    },
    {
      id: 2,
      title: 'First Commercial Production',
      date: '18 Nov 2024',
      src: '/assets/moment_shoot.jpg',
      caption: 'Directing the crew on set. 14 hours of continuous shooting without losing the smile.'
    },
    {
      id: 3,
      title: 'Late Night Breakthrough',
      date: '04 Mar 2025',
      src: '/assets/moment_late_night.jpg',
      caption: 'Pizza boxes, timeline errors at 3 AM, and pure unadulterated laughter with Ashu.'
    },
    {
      id: 4,
      title: 'CodeXa Vision HQ',
      date: '15 Jan 2026',
      src: '/assets/codexa_hq.jpg',
      caption: 'The physical proof of what happens when dedication meets unwavering belief.'
    },
    {
      id: 5,
      title: 'Founder & Brother: Ashu',
      date: '12 Sept 2026',
      src: '/assets/ashu.jpg',
      caption: 'The visionary and relentless partner standing beside Sanjay through every season.'
    },
    {
      id: 6,
      title: isClassifiedUnlocked ? 'The Rooftop Pact' : 'Classified Memory',
      date: 'Rooftop at Sunset',
      src: '/assets/moment_classified.jpg',
      isClassified: true,
      caption: isClassifiedUnlocked
        ? '"Where two brothers stood looking at the city skyline and decided that CodeXa would become an unstoppable agency."'
        : 'Restricted Memory. Collect 3 web fragments or complete the journey to decrypt.'
    }
  ];

  let currentIdx = 0;

  const renderView = () => {
    const mem = memories[currentIdx];

    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 860px; width: 100%; text-align: center;">
        <div class="midnight-badge">
          <span>🎞️</span>
          <span>CINEMATIC ARCHIVE • PHASE 07</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4.5vw, 38px); margin: 8px 0;">
          Memory Gallery
        </h1>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
          Memory ${currentIdx + 1} of ${memories.length} • Centered Showcase
        </p>

        <!-- Centered Focal Memory Card -->
        <div class="glass-panel" style="max-width: 640px; width: 100%; margin: 0 auto 20px auto; padding: 20px; border: 1px solid ${mem.isClassified ? (isClassifiedUnlocked ? 'var(--accent-gold)' : 'var(--accent-red)') : 'var(--border-subtle)'}; box-shadow: var(--shadow-lg);">
          <div style="position: relative; width: 100%; height: clamp(220px, 40vh, 340px); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px;">
            <img src="${mem.src}" alt="${mem.title}" style="width: 100%; height: 100%; object-fit: cover; filter: ${mem.isClassified && !isClassifiedUnlocked ? 'blur(12px)' : 'none'};" />
            ${mem.isClassified && !isClassifiedUnlocked ? `
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.65); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--accent-red-bright);">
                <span style="font-size: 36px;">🔒</span>
                <span style="font-family: var(--font-mono); font-weight: bold; font-size: 13px; letter-spacing: 2px;">ENCRYPTED ARCHIVE</span>
              </div>
            ` : ''}
          </div>

          <div style="text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); font-weight: 700;">${mem.date}</span>
              <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">FRAME 0${currentIdx + 1}</span>
            </div>
            <h2 style="font-size: 20px; color: #fff; margin-bottom: 8px;">${mem.title}</h2>
            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">
              ${mem.caption}
            </p>

            ${!mem.isClassified || isClassifiedUnlocked ? `
              <button id="btn-gallery-audio" class="btn-secondary" style="font-size: 12px; min-height: 38px; padding: 0 16px;">
                <span>🎙️</span>
                <span id="audio-memo-label">Listen to Memory Audio Note</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Navigation Arrows & Dots -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px;">
          <button id="btn-prev-mem" class="btn-secondary" style="min-height: 42px; padding: 0 20px;">
            ← Previous
          </button>
          <div style="display: flex; gap: 6px;">
            ${memories.map((_, i) => `
              <span class="memory-dot" style="width: ${i === currentIdx ? '20px' : '8px'}; height: 8px; border-radius: 4px; background: ${i === currentIdx ? 'var(--accent-red)' : 'rgba(255,255,255,0.2)'}; transition: all 0.2s ease;"></span>
            `).join('')}
          </div>
          <button id="btn-next-mem" class="btn-secondary" style="min-height: 42px; padding: 0 20px;">
            Next →
          </button>
        </div>

        <!-- Continue Action -->
        <div>
          <button id="btn-enter-cake" class="btn-primary" style="padding: 0 40px; min-height: 52px;">
            <span>Enter 3D Celebration Room</span>
            <span>🎂</span>
          </button>
        </div>

        <button id="btn-skip-gallery" class="btn-skip">Skip Gallery →</button>
      </div>
    `;

    const btnPrev = container.querySelector('#btn-prev-mem');
    const btnNext = container.querySelector('#btn-next-mem');
    const btnEnterCake = container.querySelector('#btn-enter-cake');
    const btnSkip = container.querySelector('#btn-skip-gallery');
    const btnAudio = container.querySelector('#btn-gallery-audio');

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        audio.duckAudio(0.15);
        audio.playSpiderChime();
        const label = container.querySelector('#audio-memo-label');
        if (label) label.textContent = 'Playing Memory Audio...';
        setTimeout(() => {
          audio.unduckAudio();
          if (label) label.textContent = 'Replay Memory Audio';
        }, 2200);
      });
    }

    btnPrev.addEventListener('click', () => {
      audio.playClick();
      currentIdx = (currentIdx - 1 + memories.length) % memories.length;
      renderView();
    });

    btnNext.addEventListener('click', () => {
      audio.playClick();
      currentIdx = (currentIdx + 1) % memories.length;
      renderView();
    });

    btnEnterCake.addEventListener('click', () => {
      audio.playClick();
      onNext();
    });

    btnSkip.addEventListener('click', () => {
      audio.playSuccess();
      onNext();
    });
  };

  renderView();

  return () => {};
}
