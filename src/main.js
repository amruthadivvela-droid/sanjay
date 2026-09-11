/* ==========================================================================
   SANJAYVERSE: Main Entry Point & Cinematic Orchestrator
   ========================================================================== */

import './styles/main.css';
import './styles/components.css';
import './styles/phases.css';
import './styles/animations.css';

import { state, PHASES_DEF, BADGES_DEF } from './core/state.js';
import { audio } from './core/audio.js';
import { canvasFx } from './core/canvasFx.js';
import { decorations } from './core/decorations.js';
import { initTerminal, openTerminal } from './eastereggs/terminal.js';
import { initTabAndIdleReactions, injectSecretFragment } from './eastereggs/webFragments.js';

// Phases
import { renderPhase0 } from './phases/phase0_midnight.js';
import { renderPhase1 } from './phases/phase1_portal.js';
import { renderPhase2 } from './phases/phase2_identity.js';
import { renderPhase3 } from './phases/phase3_hints.js';
import { renderPhase4 } from './phases/phase4_confirm.js';
import { renderPhase5 } from './phases/phase5_hub.js';
import { renderPhase6 } from './phases/phase6_chapters.js';
import { renderPhase7 } from './phases/phase7_gallery.js';
import { renderPhase8 } from './phases/phase8_cake.js';
import { renderPhase9 } from './phases/phase9_wishes.js';
import { renderPhase10 } from './phases/phase10_letter.js';
import { renderPhase11 } from './phases/phase11_vault.js';
import { renderPhase12 } from './phases/phase12_giftgames.js';
import { renderPhase13 } from './phases/phase13_fakegifts.js';
import { renderPhase14 } from './phases/phase14_realgifts.js';
import { renderPhase15 } from './phases/phase15_quiz.js';
import { renderPhase16 } from './phases/phase16_badges.js';
import { renderPhase17 } from './phases/phase17_card.js';
import { renderPhase18 } from './phases/phase18_ending.js';
import { renderPhase19 } from './phases/phase19_credits.js';
import { renderPhase20 } from './phases/phase20_postcredit.js';

let activeCleanup = null;
let codexaClicks = 0;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas FX & Ambient Systems
  canvasFx.init('fx-canvas');
  decorations.init('decorations-canvas');
  initTerminal();
  initTabAndIdleReactions();

  const sceneContainer = document.getElementById('scene-container');
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.getElementById('loading-progress');
  const loadingStatusText = document.getElementById('loading-status-text');
  const hud = document.getElementById('story-hud');

  // 2. Loading Sequence
  const loadingSteps = [
    { p: 25, msg: 'Preparing characters & vector rigs...' },
    { p: 55, msg: 'Synchronizing timeline coordinates...' },
    { p: 85, msg: 'Securing Birthday Protocol...' },
    { p: 100, msg: 'System ready.' }
  ];

  let stepIdx = 0;
  const runLoader = () => {
    if (stepIdx < loadingSteps.length) {
      const s = loadingSteps[stepIdx];
      loadingProgress.style.width = `${s.p}%`;
      loadingStatusText.textContent = s.msg;
      stepIdx++;
      setTimeout(runLoader, 250);
    } else {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.classList.remove('loading-state');
        hud.classList.remove('hidden');
        setTimeout(() => {
          loadingScreen.remove();
          navigatePhase(state.state.currentPhase);
        }, 400);
      }, 300);
    }
  };
  runLoader();

  // 3. Persistent HUD Updates
  const updateHUD = () => {
    const curPhase = state.state.currentPhase;
    const def = PHASES_DEF.find(p => p.id === curPhase) || PHASES_DEF[0];

    document.getElementById('hud-chapter-label').textContent = def.label;
    document.getElementById('hud-chapter-title').textContent = def.title;
    document.getElementById('hud-progress-fill').style.width = `${(curPhase / (PHASES_DEF.length - 1)) * 100}%`;
    document.getElementById('hud-fragment-count').textContent = `${state.state.fragments.length}/6`;
    document.getElementById('hud-badge-count').textContent = `${state.state.badges.length}/13`;
    document.getElementById('audio-icon').textContent = state.state.soundEnabled ? '🔊' : '🔇';
  };

  state.subscribe(updateHUD);
  updateHUD();

  // 4. Phase Navigation Dispatcher
  const SCENE_INTENSITY_MAP = {
    0: 'opening',
    1: 'opening',
    2: 'identity',
    3: 'hints',
    4: 'identity',
    5: 'story',
    6: 'story',
    7: 'memories',
    8: 'cake',
    9: 'letter',
    10: 'letter',
    11: 'promise',
    12: 'games',
    13: 'gifts',
    14: 'gifts',
    15: 'quiz',
    16: 'quiz',
    17: 'finale',
    18: 'finale',
    19: 'credits',
    20: 'postcredit'
  };

  function navigatePhase(phaseId) {
    if (activeCleanup) {
      activeCleanup();
      activeCleanup = null;
    }

    state.setPhase(phaseId);
    sceneContainer.innerHTML = '';

    // Update Birthday Decoration Layer scene intensity
    const sceneName = SCENE_INTENSITY_MAP[phaseId] || 'opening';
    decorations.setScene(sceneName);

    // Route to appropriate phase
    switch (phaseId) {
      case 0:
        activeCleanup = renderPhase0(sceneContainer, () => navigatePhase(1));
        break;
      case 1:
        activeCleanup = renderPhase1(sceneContainer, () => navigatePhase(2));
        break;
      case 2:
        injectSecretFragment(sceneContainer, 1, '80px', '40px');
        activeCleanup = renderPhase2(
          sceneContainer,
          () => navigatePhase(4), // Go to Biometric scan on correct password
          () => navigatePhase(3)  // Go to Hint quest on Need a Hint
        );
        break;
      case 3:
        activeCleanup = renderPhase3(
          sceneContainer,
          () => navigatePhase(2), // return to password with prefilled fragments
          () => navigatePhase(2)
        );
        break;
      case 4:
        activeCleanup = renderPhase4(sceneContainer, () => navigatePhase(5));
        break;
      case 5:
        injectSecretFragment(sceneContainer, 2, '100px', '90%');
        activeCleanup = renderPhase5(sceneContainer, () => navigatePhase(6));
        break;
      case 6:
        activeCleanup = renderPhase6(sceneContainer, () => navigatePhase(7));
        break;
      case 7:
        injectSecretFragment(sceneContainer, 3, '140px', '30px');
        activeCleanup = renderPhase7(sceneContainer, () => navigatePhase(8));
        break;
      case 8:
        injectSecretFragment(sceneContainer, 4, '90px', '85%');
        activeCleanup = renderPhase8(sceneContainer, () => navigatePhase(9));
        break;
      case 9:
        activeCleanup = renderPhase9(sceneContainer, () => navigatePhase(10));
        break;
      case 10:
        activeCleanup = renderPhase10(sceneContainer, () => navigatePhase(11));
        break;
      case 11:
        injectSecretFragment(sceneContainer, 5, '85px', '25px');
        activeCleanup = renderPhase11(sceneContainer, () => navigatePhase(12));
        break;
      case 12:
        activeCleanup = renderPhase12(sceneContainer, () => navigatePhase(13));
        break;
      case 13:
        activeCleanup = renderPhase13(sceneContainer, () => navigatePhase(14));
        break;
      case 14:
        injectSecretFragment(sceneContainer, 6, '110px', '90%');
        activeCleanup = renderPhase14(sceneContainer, () => navigatePhase(15));
        break;
      case 15:
        activeCleanup = renderPhase15(sceneContainer, () => navigatePhase(16));
        break;
      case 16:
        activeCleanup = renderPhase16(sceneContainer, () => navigatePhase(17));
        break;
      case 17:
        activeCleanup = renderPhase17(sceneContainer, () => navigatePhase(18));
        break;
      case 18:
        activeCleanup = renderPhase18(sceneContainer, () => navigatePhase(19));
        break;
      case 19:
        activeCleanup = renderPhase19(sceneContainer, () => navigatePhase(20));
        break;
      case 20:
        activeCleanup = renderPhase20(
          sceneContainer,
          () => navigatePhase(0), // replay story
          () => openChapterModal(), // open chapters
          () => navigatePhase(17), // open card generator
          () => openTerminal() // open terminal
        );
        break;
      default:
        activeCleanup = renderPhase0(sceneContainer, () => navigatePhase(1));
    }
  }

  // 5. HUD Actions & Modals
  document.getElementById('btn-audio').addEventListener('click', () => {
    state.toggleSound();
    audio.ensureContext();
    if (state.state.soundEnabled) audio.playClick();
  });

  document.getElementById('btn-fullscreen').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Easter Egg: 5 clicks on CodeXa logo opens Secret Terminal
  document.querySelector('.codexa-brand').addEventListener('click', () => {
    codexaClicks++;
    audio.playClick();
    if (codexaClicks >= 5) {
      codexaClicks = 0;
      openTerminal();
    }
  });

  // Badges Modal
  const badgesModal = document.getElementById('badges-modal');
  const btnOpenBadges = document.getElementById('btn-badges');
  const btnCloseBadges = document.getElementById('btn-close-badges');
  const badgesGrid = document.getElementById('badges-grid');

  const populateBadges = () => {
    badgesGrid.innerHTML = BADGES_DEF.map(b => {
      const isUnlocked = state.state.badges.includes(b.id);
      return `
        <div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="badge-item-icon">${b.icon}</div>
          <div class="badge-item-title">${b.title}</div>
          <div class="badge-item-desc">${b.desc}</div>
        </div>
      `;
    }).join('');
  };

  btnOpenBadges.addEventListener('click', () => {
    populateBadges();
    badgesModal.classList.remove('hidden');
    audio.playClick();
  });
  btnCloseBadges.addEventListener('click', () => badgesModal.classList.add('hidden'));

  // Settings Modal
  const settingsModal = document.getElementById('settings-modal');
  const btnOpenSettings = document.getElementById('btn-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const toggleSound = document.getElementById('toggle-sound');
  const toggleMotion = document.getElementById('toggle-reduce-motion');
  const toggleGraphics = document.getElementById('toggle-low-graphics');
  const btnReset = document.getElementById('btn-reset-journey');
  const btnOpenChapSelect = document.getElementById('btn-open-chapter-select');

  btnOpenSettings.addEventListener('click', () => {
    toggleSound.checked = state.state.soundEnabled;
    toggleMotion.checked = state.state.reduceMotion;
    toggleGraphics.checked = state.state.lowGraphics;
    settingsModal.classList.remove('hidden');
    audio.playClick();
  });
  btnCloseSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));

  toggleSound.addEventListener('change', (e) => state.toggleSound(e.target.checked));
  toggleMotion.addEventListener('change', (e) => state.toggleReduceMotion(e.target.checked));
  toggleGraphics.addEventListener('change', (e) => state.toggleLowGraphics(e.target.checked));

  btnReset.addEventListener('click', () => {
    if (confirm('Are you sure you want to restart the entire SanjayVerse journey?')) {
      state.resetAll();
    }
  });

  // Chapter Select Modal (New Game+)
  const chaptersModal = document.getElementById('chapters-modal');
  const btnCloseChapters = document.getElementById('btn-close-chapters');
  const chaptersGrid = document.getElementById('chapters-grid');

  const openChapterModal = () => {
    chaptersGrid.innerHTML = PHASES_DEF.map(p => {
      const isUnlocked = state.state.unlockedPhases.includes(p.id) || state.state.newGamePlus;
      return `
        <div class="chapter-card ${isUnlocked ? '' : 'locked'}" data-phase="${p.id}" style="opacity: ${isUnlocked ? '1' : '0.4'};">
          <div class="chapter-num">${p.label}</div>
          <div class="chapter-name">${p.title}</div>
        </div>
      `;
    }).join('');

    chaptersGrid.querySelectorAll('.chapter-card').forEach(card => {
      card.addEventListener('click', () => {
        const pId = parseInt(card.dataset.phase);
        if (state.state.unlockedPhases.includes(pId) || state.state.newGamePlus) {
          chaptersModal.classList.add('hidden');
          settingsModal.classList.add('hidden');
          navigatePhase(pId);
        }
      });
    });

    chaptersModal.classList.remove('hidden');
    audio.playClick();
  };

  btnOpenChapSelect.addEventListener('click', openChapterModal);
  btnCloseChapters.addEventListener('click', () => chaptersModal.classList.add('hidden'));
});
