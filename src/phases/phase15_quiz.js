/* ==========================================================================
   PHASE 15: Roast Royale Quiz (Ashu vs Deepak vs Sanjay)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase15(container, onNext) {
  let isModeChosen = false;
  let mode = 'full'; // 'mild' or 'full'
  let currentQIdx = 0;
  let score = 0;
  let deepakRoastCount = 0;

  const questions = [
    {
      q: "Five minutes lo vastha ani cheppi two hours tarvatha vachedi evaru?",
      options: ["Ashu", "Deepak", "Sanjay", "Client"],
      correct: "Deepak",
      roast: "Classic Deepak standard time protocol. 5 mins = 120 mins!"
    },
    {
      q: "Project start kakamundhe 'almost complete' ani confident ga cheppedhi evaru?",
      options: ["Deepak", "Ashu", "Sanjay", "Hacker"],
      correct: "Deepak",
      roast: "Commit history: 0 lines. Confidence: 1000%!"
    },
    {
      q: "Small timeline color glitch ni emergency 4-hour meeting ga marchagaligedi evaru?",
      options: ["Ashu", "Deepak", "Sanjay", "Server"],
      correct: "Ashu",
      roast: "Founder perfectionism at peak velocity!"
    },
    {
      q: "Sanjay cake cutting lo first piece kosam fight chesina person evaru?",
      options: ["Ashu", "Deepak", "Black Cat", "Red Panda"],
      correct: "Ashu",
      roast: "And you already fed him! True brotherhood!"
    },
    {
      q: "Sanjay ni lifetime 24/7 irritate cheyyadaniki government-approved license evariki undhi?",
      options: ["Ashu", "Deepak", "Both of them", "Client calls"],
      correct: "Ashu",
      roast: "Unconditional, unbreakable, lifetime membership!"
    }
  ];

  const renderView = () => {
    if (!isModeChosen) {
      container.innerHTML = `
        <div class="phase-scene quiz-scene fade-in">
          <div class="midnight-badge">
            <span>🔥</span>
            <span>ROAST ROYALE • PHASE 15</span>
          </div>

          <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0;">
            How well do you survive Ashu & Deepak?
          </h1>
          <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 28px;">
            Select your roast intensity level to begin the final protocol.
          </p>

          <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
            <button id="btn-mild" class="btn-secondary" style="padding: 16px 32px; font-size: 16px;">
              <span>🌶️</span>
              <span>Mild Roast</span>
            </button>
            <button id="btn-fire" class="btn-primary" style="padding: 16px 36px; font-size: 16px; background: linear-gradient(135deg, #FF274D 0%, #D90429 100%);">
              <span>🔥🔥</span>
              <span>Full Fire Mode</span>
            </button>
          </div>
        </div>
      `;

      container.querySelector('#btn-mild').addEventListener('click', () => {
        mode = 'mild';
        isModeChosen = true;
        audio.playClick();
        renderView();
      });

      container.querySelector('#btn-fire').addEventListener('click', () => {
        mode = 'full';
        isModeChosen = true;
        audio.playClick();
        renderView();
      });
    } else if (currentQIdx < questions.length) {
      const q = questions[currentQIdx];

      container.innerHTML = `
        <div class="phase-scene quiz-scene fade-in">
          <div class="midnight-badge">
            <span>QUESTION 0${currentQIdx + 1} OF 0${questions.length}</span>
          </div>

          <div class="quiz-card">
            <h2 style="font-size: 20px; color: #fff; line-height: 1.5; margin-bottom: 20px;">
              "${q.q}"
            </h2>

            <div class="quiz-options-grid">
              ${q.options.map(opt => `
                <button class="quiz-option-btn" data-val="${opt}">
                  ${opt}
                </button>
              `).join('')}
            </div>

            <div id="quiz-feedback" style="min-height: 24px; font-size: 14px; font-weight: 600; color: var(--accent-gold);"></div>
          </div>
        </div>
      `;

      const feedback = container.querySelector('#quiz-feedback');
      container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.val;
          btn.classList.add('selected-correct');

          if (val === q.correct) {
            audio.playSuccess();
            score++;
            if (q.correct === 'Deepak') deepakRoastCount++;
          } else {
            audio.playTone(360, 'sine', 0.15);
          }

          feedback.textContent = q.roast;

          setTimeout(() => {
            currentQIdx++;
            renderView();
          }, 1400);
        });
      });
    } else {
      // Quiz Complete
      state.unlockBadge('b_roast');
      audio.playFanfare();
      canvasFx.burstCelebration();

      container.innerHTML = `
        <div class="phase-scene quiz-scene fade-in">
          <div style="font-size: 54px; margin-bottom: 12px;">🏆</div>
          <h1 style="font-family: var(--font-heading); font-size: 32px; color: #fff;">
            Quiz Complete: Roast Survivor!
          </h1>
          <p style="color: var(--accent-gold); font-size: 16px; font-weight: 700; margin: 8px 0 20px 0;">
            Title Earned: Lifetime Irritation Champion
          </p>

          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; max-width: 480px; margin: 0 auto 24px auto; font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
            Deepak Roasts Executed: <strong style="color: #fff;">${deepakRoastCount}</strong><br/>
            Ashu Friendship Tolerance: <strong style="color: var(--status-success);">100% (Unbreakable)</strong><br/>
            Result: <span style="color: var(--status-success); font-weight: 700;">Eligible for Official Birthday Card Generator</span>
          </div>

          <button id="btn-goto-card" class="btn-primary" style="padding: 0 44px;">
            <span>Generate Official Birthday Card</span>
            <span>🎨</span>
          </button>
        </div>
      `;

      container.querySelector('#btn-goto-card').addEventListener('click', () => {
        audio.playClick();
        onNext();
      });
    }
  };

  renderView();

  return () => {};
}
