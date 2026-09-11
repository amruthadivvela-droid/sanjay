/* ==========================================================================
   PHASE 6: Story Chapters 1–6 (Portrait, Studio, Camera, Cinema, Gaming, CodeXa)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase6(container, onComplete) {
  let subChapter = 1; // 1 to 6

  const renderSubView = () => {
    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 960px; text-align: center;">
        <div class="midnight-badge">
          <span>📖</span>
          <span>STORY CHAPTER 0${subChapter} OF 06</span>
        </div>

        <div id="subchapter-mount"></div>

        <button id="btn-skip-chapters" class="btn-skip">Skip Chapters →</button>
      </div>
    `;

    container.querySelector('#btn-skip-chapters').addEventListener('click', () => {
      audio.playSuccess();
      onComplete();
    });

    const mount = container.querySelector('#subchapter-mount');

    if (subChapter === 1) renderChapter1(mount);
    else if (subChapter === 2) renderChapter2(mount);
    else if (subChapter === 3) renderChapter3(mount);
    else if (subChapter === 4) renderChapter4(mount);
    else if (subChapter === 5) renderChapter5(mount);
    else if (subChapter === 6) renderChapter6(mount);
  };

  // ------------------------------------------------------------------------
  // Chapter 1: The Person Behind the Role (Photo Develop)
  // ------------------------------------------------------------------------
  const renderChapter1 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        The Person Behind the Role
      </h1>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
        Before titles and achievements, there is a creator with relentless passion.
      </p>

      <div style="position: relative; width: 280px; height: 350px; margin: 0 auto; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); cursor: pointer; border: 2px solid var(--accent-red);" id="dev-photo-card">
        <img src="/assets/sanjay.jpg" id="dev-photo-img" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 1s ease;" />
        <div id="dev-photo-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; transition: opacity 0.4s ease;">
          <span style="font-size: 32px; margin-bottom: 8px;">👆</span>
          <span style="font-weight: 700; color: #fff; font-size: 14px;">PRESS & HOLD TO DEVELOP</span>
          <span style="color: var(--accent-gold); font-size: 12px; margin-top: 4px;">Bring the memory to full colour</span>
        </div>
      </div>

      <div style="max-width: 540px; margin: 24px auto; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
        "Hardworking, laser-focused behind the camera, obsessed with Marvel lore, and the only person capable of handling Ashu's endless phone calls."
      </div>

      <button id="btn-next-ch" class="btn-primary" style="margin-top: 8px;">
        <span>Continue to Creator Studio</span>
        <span>→</span>
      </button>
    `;

    const card = mount.querySelector('#dev-photo-card');
    const img = mount.querySelector('#dev-photo-img');
    const overlay = mount.querySelector('#dev-photo-overlay');

    let pressTimer = null;
    const startDevelop = () => {
      audio.playClick();
      pressTimer = setTimeout(() => {
        img.style.filter = 'contrast(115%) brightness(105%) sepia(22%) saturate(140%) hue-rotate(-8deg)';
        card.style.borderColor = 'var(--accent-gold)';
        card.style.boxShadow = '0 0 36px var(--accent-gold-glow)';
        overlay.style.opacity = '0';
        audio.playSuccess();
        canvasFx.burstCelebration();
      }, 400);
    };

    const cancelDevelop = () => {
      clearTimeout(pressTimer);
    };

    card.addEventListener('mousedown', startDevelop);
    card.addEventListener('mouseup', cancelDevelop);
    card.addEventListener('touchstart', startDevelop);
    card.addEventListener('touchend', cancelDevelop);

    mount.querySelector('#btn-next-ch').addEventListener('click', () => {
      audio.playClick();
      subChapter = 2;
      renderSubView();
    });
  };

  // ------------------------------------------------------------------------
  // Chapter 2: Creator Studio (Editing Timeline & Before/After)
  // ------------------------------------------------------------------------
  const renderChapter2 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        Creator Studio
      </h1>
      <p style="color: var(--accent-gold); font-size: 15px; font-weight: 600; margin-bottom: 20px;">
        "Some people watch moments. Some people turn them into stories."
      </p>

      <!-- Before / After Slider -->
      <div style="position: relative; width: 100%; max-width: 600px; height: 300px; margin: 0 auto 20px auto; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle);">
        <img src="/assets/moment_late_night.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
        <div id="slider-before" style="position: absolute; inset: 0; width: 50%; overflow: hidden; border-right: 2px solid var(--accent-red-bright);">
          <img src="/assets/moment_late_night.jpg" style="width: 600px; height: 300px; object-fit: cover; filter: sepia(80%) contrast(120%);" />
        </div>
        <input type="range" min="0" max="100" value="50" id="grade-slider" style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); width: 70%;" />
      </div>

      <div style="margin-bottom: 20px;">
        <button id="btn-render-montage" class="btn-secondary">
          <span>⚡</span>
          <span>Render Timeline Cut</span>
        </button>
      </div>

      <button id="btn-next-ch2" class="btn-primary">
        <span>Proceed to Camera Challenge</span>
        <span>→</span>
      </button>
    `;

    const slider = mount.querySelector('#grade-slider');
    const beforeWrap = mount.querySelector('#slider-before');
    const btnRender = mount.querySelector('#btn-render-montage');

    slider.addEventListener('input', (e) => {
      beforeWrap.style.width = `${e.target.value}%`;
      audio.playTick();
    });

    btnRender.addEventListener('click', () => {
      audio.playLaserScan();
      btnRender.textContent = 'Rendering 100%...';
      state.unlockBadge('b_editor');
      setTimeout(() => {
        audio.playSuccess();
        canvasFx.burstCelebration();
        btnRender.textContent = '✓ Timeline Render Complete';
      }, 900);
    });

    mount.querySelector('#btn-next-ch2').addEventListener('click', () => {
      audio.playClick();
      subChapter = 3;
      renderSubView();
    });
  };

  // ------------------------------------------------------------------------
  // Chapter 3: Camera Mode Mini-Challenge
  // ------------------------------------------------------------------------
  const renderChapter3 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        Camera Mode Challenge
      </h1>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
        Tap the shutter when the focus ring turns green!
      </p>

      <div style="position: relative; width: 100%; max-width: 520px; height: 300px; margin: 0 auto 20px auto; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--border-subtle);">
        <img src="/assets/moment_shoot.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
        <!-- Viewfinder Reticle -->
        <div id="camera-focus-ring" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 110px; height: 110px; border: 3px solid #ff4757; border-radius: 50%; transition: border-color 0.2s ease; display: flex; align-items: center; justify-content: center;">
          <div style="width: 8px; height: 8px; background: #fff; border-radius: 50%;"></div>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; align-items: center;">
        <button id="btn-shutter" class="btn-primary" style="width: 72px; height: 72px; border-radius: 50%; padding: 0; font-size: 28px; box-shadow: 0 0 24px var(--accent-red-glow);">
          📸
        </button>
      </div>

      <div id="camera-feedback" style="min-height: 24px; font-weight: 600; font-size: 14px; margin-top: 14px; color: var(--accent-gold);"></div>

      <button id="btn-next-ch3" class="btn-secondary" style="margin-top: 16px;">
        <span>Continue to Cinema Portal</span>
        <span>→</span>
      </button>
    `;

    const ring = mount.querySelector('#camera-focus-ring');
    const btnShutter = mount.querySelector('#btn-shutter');
    const feedback = mount.querySelector('#camera-feedback');

    let isGreen = false;
    const interval = setInterval(() => {
      isGreen = !isGreen;
      ring.style.borderColor = isGreen ? '#38d996' : '#ff4757';
      if (isGreen) {
        ring.style.boxShadow = '0 0 20px rgba(56, 217, 150, 0.6)';
      } else {
        ring.style.boxShadow = 'none';
      }
    }, 1100);

    btnShutter.addEventListener('click', () => {
      audio.playClick();
      if (isGreen) {
        clearInterval(interval);
        audio.playSuccess();
        state.unlockBadge('b_frame');
        canvasFx.burstCelebration();
        feedback.innerHTML = `<span style="color: var(--status-success);">✓ PERFECT SHOT CAPTURED! Added to archive!</span>`;
      } else {
        audio.playTone(300, 'sine', 0.1);
        feedback.textContent = 'Focus missed! Try timing it when the ring turns green!';
      }
    });

    mount.querySelector('#btn-next-ch3').addEventListener('click', () => {
      clearInterval(interval);
      audio.playClick();
      subChapter = 4;
      renderSubView();
    });
  };

  // ------------------------------------------------------------------------
  // Chapter 4: Cinema Portal & Movie Quiz
  // ------------------------------------------------------------------------
  const renderChapter4 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        Cinema Portal
      </h1>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
        The projector beam reveals the story of relentless passion.
      </p>

      <div style="position: relative; width: 100%; max-width: 600px; height: 260px; margin: 0 auto 20px auto; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle);">
        <img src="/assets/cinema_bg.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(4,5,7,0.9) 100%); display: flex; align-items: flex-end; justify-content: center; padding: 20px;">
          <div style="font-family: var(--font-cinematic); font-size: 18px; color: var(--accent-gold); letter-spacing: 2px;">
            "WITH GREAT MOVIES COMES GREAT RESPONSIBILITY"
          </div>
        </div>
      </div>

      <!-- Quick Trivia -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; max-width: 540px; margin: 0 auto 20px auto; text-align: left;">
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-red-bright); margin-bottom: 6px;">
          CINEMA TRIVIA
        </div>
        <p style="font-weight: 600; font-size: 15px; margin-bottom: 12px;">
          "Every universe needs one person who never gives up. Ee story lo aa person evaru?"
        </p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-secondary btn-cinema-opt" data-ans="Peter Parker">Peter Parker</button>
          <button class="btn-secondary btn-cinema-opt" data-ans="Tony Stark">Tony Stark</button>
          <button class="btn-secondary btn-cinema-opt" data-ans="Sanjay" style="border-color: var(--accent-red);">Sanjay</button>
        </div>
        <div id="cinema-quiz-res" style="margin-top: 10px; font-size: 13px; font-weight: 600;"></div>
      </div>

      <button id="btn-next-ch4" class="btn-primary">
        <span>Enter Gaming Arena</span>
        <span>→</span>
      </button>
    `;

    const res = mount.querySelector('#cinema-quiz-res');
    mount.querySelectorAll('.btn-cinema-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.ans === 'Sanjay') {
          audio.playSuccess();
          state.unlockBadge('b_cinema');
          canvasFx.burstCelebration();
          res.innerHTML = `<span style="color: var(--status-success);">✓ EXACTLY! In the SanjayVerse, the true hero is always Sanjay!</span>`;
        } else {
          audio.playTone(320, 'sine', 0.15);
          res.textContent = 'Great hero, but in this universe, Sanjay takes the spotlight!';
        }
      });
    });

    mount.querySelector('#btn-next-ch4').addEventListener('click', () => {
      audio.playClick();
      subChapter = 5;
      renderSubView();
    });
  };

  // ------------------------------------------------------------------------
  // Chapter 5: Gaming Arena
  // ------------------------------------------------------------------------
  const renderChapter5 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        Gaming Arena
      </h1>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
        Four iconic worlds prepare to test your reflexes and strategy.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px;">
        <div class="glass-panel" style="padding: 20px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🏎️</div>
          <h3 style="font-size: 16px;">Night Drive</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">GTA Neon City Sprint</p>
        </div>
        <div class="glass-panel" style="padding: 20px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🪂</div>
          <h3 style="font-size: 16px;">Drop Zone</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Battle Royale Descent</p>
        </div>
        <div class="glass-panel" style="padding: 20px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🧱</div>
          <h3 style="font-size: 16px;">Block Builder</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Voxel CodeXa Structure</p>
        </div>
        <div class="glass-panel" style="padding: 20px; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">🎬</div>
          <h3 style="font-size: 16px;">Edit Battle</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Timeline Beat Sync</p>
        </div>
      </div>

      <button id="btn-next-ch5" class="btn-primary">
        <span>Proceed to CodeXa HQ</span>
        <span>→</span>
      </button>
    `;

    mount.querySelector('#btn-next-ch5').addEventListener('click', () => {
      audio.playClick();
      subChapter = 6;
      renderSubView();
    });
  };

  // ------------------------------------------------------------------------
  // Chapter 6: CodeXa Headquarters
  // ------------------------------------------------------------------------
  const renderChapter6 = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin: 8px 0;">
        CodeXa Headquarters
      </h1>
      <p style="color: var(--accent-red-bright); font-size: 15px; font-weight: 700; margin-bottom: 20px; letter-spacing: 1px;">
        WHERE IDEAS TURN INTO LEGACIES
      </p>

      <div style="position: relative; width: 100%; max-width: 660px; height: 320px; margin: 0 auto 24px auto; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--accent-red); box-shadow: var(--shadow-lg);">
        <img src="/assets/codexa_hq.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(4,5,7,0.95) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; text-align: left;">
          <div style="font-size: 13px; color: var(--accent-gold); font-family: var(--font-mono); font-weight: 700;">
            FOUNDER & CO-FOUNDER COVENANT
          </div>
          <p style="color: #fff; font-size: 15px; line-height: 1.6; margin-top: 4px;">
            "CodeXa was never meant to be built by one person. It was built through ideas, trust, and the people who chose to stay."
          </p>
        </div>
      </div>

      <button id="btn-finish-ch6" class="btn-primary" style="padding: 0 40px;">
        <span>Enter Memory Gallery</span>
        <span>🖼️</span>
      </button>
    `;

    mount.querySelector('#btn-finish-ch6').addEventListener('click', () => {
      audio.playSuccess();
      onComplete();
    });
  };

  renderSubView();

  return () => {};
}
