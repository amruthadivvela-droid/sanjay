/* ==========================================================================
   EASTER EGGS: Browser Tab Reactions, Idle Timer, Hidden Web Fragments
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';

export function initTabAndIdleReactions() {
  const originalTitle = 'SANJAYVERSE: The Birthday Protocol';

  // Browser Tab Visibility Reaction
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = 'Sanjay, mission incomplete! ⚠️';
    } else {
      document.title = 'Welcome back, Co-Founder. 🌌';
      setTimeout(() => {
        document.title = originalTitle;
      }, 2500);
    }
  });

  // 20s Idle Activity Detector
  let idleTimeout = null;
  const resetIdle = () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      state.showToast('💤 Player still alive? Hacker is brewing more coffee...', 'toast-badge');
    }, 25000);
  };

  window.addEventListener('mousemove', resetIdle, { passive: true });
  window.addEventListener('keydown', resetIdle, { passive: true });
  window.addEventListener('touchstart', resetIdle, { passive: true });
  resetIdle();
}

// Inject a secret spider web fragment into any phase container
export function injectSecretFragment(container, fragmentId, top = '20px', left = '20px') {
  if (state.state.fragments.includes(fragmentId)) return;

  const frag = document.createElement('div');
  frag.className = 'secret-fragment-icon';
  frag.innerHTML = '🕸️';
  frag.style.position = 'absolute';
  frag.style.top = top;
  frag.style.left = left;
  frag.style.cursor = 'pointer';
  frag.style.opacity = '0.35';
  frag.style.fontSize = '20px';
  frag.style.transition = 'all 0.2s ease';
  frag.title = 'Secret Web Fragment';

  frag.addEventListener('mouseenter', () => {
    frag.style.opacity = '1';
    frag.style.transform = 'scale(1.25)';
  });
  frag.addEventListener('mouseleave', () => {
    frag.style.opacity = '0.35';
    frag.style.transform = 'scale(1)';
  });

  frag.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.playSpiderChime();
    state.collectFragment(fragmentId);
    frag.remove();
  });

  container.appendChild(frag);
}
