/* ==========================================================================
   PHASE 3: Password Hint Quest (Simon Says, Coffee Catch & Web Decoder)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase3(container, onComplete, onReturnToPassword) {
  let activeGame = 1; // 1: Colour Memory, 2: Coffee Catch, 3: Web Decoder, 4: Combined

  const renderCurrentView = () => {
    container.innerHTML = `
      <div class="phase-scene hint-quest-scene fade-in">
        <div class="midnight-badge">
          <span>🧩</span>
          <span>MISSION DASHBOARD: PASSCODE RECOVERY</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(24px, 4vw, 36px); margin-bottom: 6px;">
          Password Hint Quest
        </h1>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">
          Recover three encrypted fragments to assemble the master security key.
        </p>

        <!-- Inventory Bar -->
        <div class="hint-inventory-bar">
          <div class="fragment-slot ${state.state.passwordFragments.f01 ? 'collected' : ''}">
            ${state.state.passwordFragments.f01 ? '01: [09]' : '01: [??]'}
          </div>
          <span>+</span>
          <div class="fragment-slot ${state.state.passwordFragments.f02 ? 'collected' : ''}">
            ${state.state.passwordFragments.f02 ? '02: [03]' : '02: [??]'}
          </div>
          <span>+</span>
          <div class="fragment-slot ${state.state.passwordFragments.f03 ? 'collected' : ''}">
            ${state.state.passwordFragments.f03 ? '03: [WEB]' : '03: [???]'}
          </div>
        </div>

        <!-- Game Mount Point -->
        <div id="game-mount-point"></div>

        <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button id="btn-return-pw" class="btn-ghost">← Return to Passcode Entry</button>
          <button id="btn-skip-hints" class="btn-skip">Skip Hint Quest →</button>
        </div>
      </div>
    `;

    container.querySelector('#btn-return-pw').addEventListener('click', () => {
      audio.playClick();
      onReturnToPassword();
    });

    container.querySelector('#btn-skip-hints').addEventListener('click', () => {
      state.setPasswordFragment('f01', true);
      state.setPasswordFragment('f02', true);
      state.setPasswordFragment('f03', true);
      audio.playSuccess();
      onComplete();
    });

    const mount = container.querySelector('#game-mount-point');

    if (activeGame === 1) {
      renderColourMemory(mount);
    } else if (activeGame === 2) {
      renderCoffeeCatch(mount);
    } else if (activeGame === 3) {
      renderWebDecoder(mount);
    } else if (activeGame === 4) {
      renderCombinedResult(mount);
    }
  };

  // ------------------------------------------------------------------------
  // Mini-Game 1: Colour Memory (Simon Says)
  // ------------------------------------------------------------------------
  const renderColourMemory = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); font-weight: 700;">
            MISSION 01 / 03
          </span>
          <h2 style="font-size: 20px; margin-top: 4px;">Colour Memory Protocol</h2>
          <p style="font-size: 13px; color: var(--text-secondary);" id="simon-status">
            Watch the sequence and tap the tiles in the exact order.
          </p>
        </div>

        <div class="simon-grid" id="simon-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `
            <button class="simon-tile" data-color="${i}">
              <span>${['▲', '◆', '●', '■', '★', '⬟', '❖', '⬢', '✦'][i - 1]}</span>
            </button>
          `).join('')}
        </div>

        <div>
          <button id="btn-start-simon" class="btn-primary" style="min-height: 44px; padding: 0 24px; font-size: 14px;">
            Start Sequence
          </button>
        </div>
      </div>
    `;

    const statusEl = mount.querySelector('#simon-status');
    const btnStart = mount.querySelector('#btn-start-simon');
    const tiles = mount.querySelectorAll('.simon-tile');

    let currentRound = 1;
    const sequences = [
      [1, 3, 5],
      [2, 4, 6, 8],
      [3, 1, 9, 7, 5]
    ];
    let playerIdx = 0;
    let isPlayingSeq = false;

    const playRound = () => {
      isPlayingSeq = true;
      statusEl.textContent = `Round ${currentRound}/3: Observe closely...`;
      playerIdx = 0;
      const seq = sequences[currentRound - 1];

      seq.forEach((tileNum, idx) => {
        setTimeout(() => {
          const tile = mount.querySelector(`.simon-tile[data-color="${tileNum}"]`);
          if (tile) {
            tile.classList.add('active');
            audio.playSimonBeep(tileNum);
            setTimeout(() => tile.classList.remove('active'), 350);
          }
          if (idx === seq.length - 1) {
            setTimeout(() => {
              isPlayingSeq = false;
              statusEl.textContent = `Your Turn! Tap ${seq.length} tiles in order.`;
            }, 500);
          }
        }, idx * 600);
      });
    };

    btnStart.addEventListener('click', () => {
      btnStart.classList.add('hidden');
      playRound();
    });

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        if (isPlayingSeq) return;
        const clickedNum = parseInt(tile.dataset.color);
        audio.playSimonBeep(clickedNum);
        tile.classList.add('active');
        setTimeout(() => tile.classList.remove('active'), 180);

        const expected = sequences[currentRound - 1][playerIdx];
        if (clickedNum === expected) {
          playerIdx++;
          if (playerIdx === sequences[currentRound - 1].length) {
            audio.playSuccess();
            if (currentRound < 3) {
              currentRound++;
              statusEl.textContent = `Round ${currentRound - 1} Clear! Next round...`;
              setTimeout(playRound, 1000);
            } else {
              // Game 1 Complete!
              state.setPasswordFragment('f01', true);
              state.unlockBadge('b_colour');
              canvasFx.burstCelebration();
              statusEl.innerHTML = `
                <span style="color: var(--status-success); font-weight: 700;">
                  MISSION COMPLETE! Code Fragment 01: [09] Recovered!
                </span>
              `;
              setTimeout(() => {
                activeGame = 2;
                renderCurrentView();
              }, 1200);
            }
          }
        } else {
          audio.playError();
          statusEl.textContent = 'Wrong sequence! Retrying round...';
          setTimeout(playRound, 1200);
        }
      });
    });
  };

  // ------------------------------------------------------------------------
  // Mini-Game 2: Coffee Catch
  // ------------------------------------------------------------------------
  const renderCoffeeCatch = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); font-weight: 700;">
            MISSION 02 / 03
          </span>
          <h2 style="font-size: 20px; margin-top: 4px;">Caffeine Catch Protocol</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">
            Catch 3 hot coffee mugs. Dodge deadline warnings & bugs!
          </p>
        </div>

        <canvas class="coffee-canvas" id="coffee-canvas" width="460" height="260"></canvas>

        <div style="display: flex; gap: 8px; justify-content: center;">
          <button id="btn-coffee-left" class="btn-secondary" style="min-height: 40px; padding: 0 20px;">← Left</button>
          <button id="btn-coffee-right" class="btn-secondary" style="min-height: 40px; padding: 0 20px;">Right →</button>
        </div>
      </div>
    `;

    const canvas = mount.querySelector('#coffee-canvas');
    const ctx = canvas.getContext('2d');
    let hackerX = canvas.width / 2 - 25;
    let coffeeCaught = 0;
    let items = [];
    let isRunning = true;
    let animId = null;

    const spawnItem = () => {
      if (!isRunning) return;
      const isCoffee = Math.random() > 0.45;
      items.push({
        x: Math.random() * (canvas.width - 30) + 15,
        y: -20,
        type: isCoffee ? 'coffee' : 'bug',
        speed: Math.random() * 1.5 + 2.0
      });
      if (coffeeCaught < 3) {
        setTimeout(spawnItem, Math.random() * 700 + 700);
      }
    };

    spawnItem();

    const loop = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw hacker paddle/cup
      ctx.fillStyle = '#D90429';
      ctx.beginPath();
      ctx.roundRect(hackerX, canvas.height - 24, 54, 18, 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('HACKER', hackerX + 6, canvas.height - 10);

      // Draw Falling items
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.speed;

        ctx.font = '20px sans-serif';
        ctx.fillText(it.type === 'coffee' ? '☕' : '⚠️', it.x - 10, it.y);

        // Check collision
        if (it.y >= canvas.height - 30 && it.y <= canvas.height - 6 && it.x >= hackerX - 10 && it.x <= hackerX + 60) {
          if (it.type === 'coffee') {
            audio.playCoin();
            coffeeCaught++;
            items.splice(i, 1);
            if (coffeeCaught >= 3) {
              isRunning = false;
              state.setPasswordFragment('f02', true);
              state.unlockBadge('b_caffeine');
              canvasFx.burstCelebration();
              setTimeout(() => {
                activeGame = 3;
                renderCurrentView();
              }, 1200);
              return;
            }
          } else {
            audio.playError();
            items.splice(i, 1);
          }
        } else if (it.y > canvas.height + 20) {
          items.splice(i, 1);
        }
      }

      // Draw HUD on canvas
      ctx.fillStyle = '#F4C95D';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`COFFEE CAUGHT: ${coffeeCaught}/3`, 12, 22);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Mouse / Touch Controls
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      hackerX = Math.max(0, Math.min(canvas.width - 54, (e.clientX - rect.left) * scaleX - 27));
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      hackerX = Math.max(0, Math.min(canvas.width - 54, (e.touches[0].clientX - rect.left) * scaleX - 27));
    }, { passive: false });

    mount.querySelector('#btn-coffee-left').addEventListener('click', () => {
      hackerX = Math.max(0, hackerX - 30);
    });

    mount.querySelector('#btn-coffee-right').addEventListener('click', () => {
      hackerX = Math.min(canvas.width - 54, hackerX + 30);
    });
  };

  // ------------------------------------------------------------------------
  // Mini-Game 3: Web Decoder (Spider-Web Nodes)
  // ------------------------------------------------------------------------
  const renderWebDecoder = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold); font-weight: 700;">
            MISSION 03 / 03
          </span>
          <h2 style="font-size: 20px; margin-top: 4px;">Web Decoder Network</h2>
          <p style="font-size: 13px; color: var(--text-secondary);" id="web-decoder-status">
            Tap the nodes in order: W → E → B
          </p>
        </div>

        <div class="web-graph-wrap" id="web-graph">
          <svg viewBox="0 0 400 240" width="100%" height="100%" id="web-svg">
            <!-- Background Web Strands -->
            <line x1="200" y1="120" x2="60" y2="60" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <line x1="200" y1="120" x2="340" y2="60" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <line x1="200" y1="120" x2="60" y2="180" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <line x1="200" y1="120" x2="340" y2="180" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <circle cx="200" cy="120" r="80" stroke="rgba(36,123,255,0.15)" stroke-width="1" fill="none"/>
            <circle cx="200" cy="120" r="40" stroke="rgba(217,4,41,0.2)" stroke-width="1" fill="none"/>

            <g id="drawn-lines"></g>

            <!-- Nodes -->
            <g class="web-node" data-letter="W" transform="translate(90, 80)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="22" fill="#11141b" stroke="#247bff" stroke-width="2"/>
              <text x="0" y="6" text-anchor="middle" fill="#fff" font-family="monospace" font-weight="bold" font-size="16">W</text>
            </g>

            <g class="web-node" data-letter="X" transform="translate(190, 50)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="18" fill="#11141b" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
              <text x="0" y="5" text-anchor="middle" fill="#888" font-family="monospace" font-size="14">X</text>
            </g>

            <g class="web-node" data-letter="E" transform="translate(200, 140)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="22" fill="#11141b" stroke="#d90429" stroke-width="2"/>
              <text x="0" y="6" text-anchor="middle" fill="#fff" font-family="monospace" font-weight="bold" font-size="16">E</text>
            </g>

            <g class="web-node" data-letter="Z" transform="translate(290, 60)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="18" fill="#11141b" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
              <text x="0" y="5" text-anchor="middle" fill="#888" font-family="monospace" font-size="14">Z</text>
            </g>

            <g class="web-node" data-letter="B" transform="translate(310, 160)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="22" fill="#11141b" stroke="#f4c95d" stroke-width="2"/>
              <text x="0" y="6" text-anchor="middle" fill="#fff" font-family="monospace" font-weight="bold" font-size="16">B</text>
            </g>
          </svg>
        </div>

        <div id="web-decoder-feedback" style="font-size: 13px; color: var(--accent-gold); font-family: var(--font-mono);">
          PROGRESS: [ _ ] → [ _ ] → [ _ ]
        </div>
      </div>
    `;

    const statusEl = mount.querySelector('#web-decoder-status');
    const feedbackEl = mount.querySelector('#web-decoder-feedback');
    const nodes = mount.querySelectorAll('.web-node');
    const linesGroup = mount.querySelector('#drawn-lines');

    const expectedOrder = ['W', 'E', 'B'];
    let collectedLetters = [];
    const nodeCoords = {
      W: { x: 90, y: 80 },
      E: { x: 200, y: 140 },
      B: { x: 310, y: 160 }
    };

    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const letter = node.dataset.letter;
        const expectedNext = expectedOrder[collectedLetters.length];

        if (letter === expectedNext) {
          audio.playSpiderChime();
          collectedLetters.push(letter);
          node.querySelector('circle').setAttribute('fill', '#38d996');

          if (collectedLetters.length > 1) {
            const prev = nodeCoords[collectedLetters[collectedLetters.length - 2]];
            const curr = nodeCoords[letter];
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', prev.x);
            line.setAttribute('y1', prev.y);
            line.setAttribute('x2', curr.x);
            line.setAttribute('y2', curr.y);
            line.setAttribute('stroke', '#38d996');
            line.setAttribute('stroke-width', '3');
            linesGroup.appendChild(line);
          }

          feedbackEl.textContent = `PROGRESS: ${collectedLetters.map(l => `[ ${l} ]`).join(' → ')}`;

          if (collectedLetters.length === 3) {
            audio.playSuccess();
            state.setPasswordFragment('f03', true);
            state.unlockBadge('b_web');
            canvasFx.burstCelebration();
            statusEl.innerHTML = `
              <span style="color: var(--status-success); font-weight: 700;">
                WEB MASTERED! Fragment 03: [WEB] Unlocked!
              </span>
            `;
            setTimeout(() => {
              activeGame = 4;
              renderCurrentView();
            }, 1200);
          }
        } else {
          audio.playError();
          feedbackEl.textContent = 'Invalid connection! Resetting web nodes...';
          collectedLetters = [];
          linesGroup.innerHTML = '';
          nodes.forEach(n => {
            n.querySelector('circle').setAttribute('fill', '#11141b');
          });
        }
      });
    });
  };

  // ------------------------------------------------------------------------
  // Combined Assembly View (09 + 03 + WEB = 0903WEB)
  // ------------------------------------------------------------------------
  const renderCombinedResult = (mount) => {
    mount.innerHTML = `
      <div class="game-shell" style="text-align: center;">
        <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
        <h2 style="font-family: var(--font-heading); font-size: 26px;">All 3 Fragments Recovered!</h2>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">
          The encrypted Birthday Protocol passcode has been successfully assembled:
        </p>

        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin: 20px 0;">
          <div class="fragment-slot collected" style="font-size: 22px; padding: 12px 20px;">09</div>
          <span style="font-size: 24px; color: var(--accent-gold);">+</span>
          <div class="fragment-slot collected" style="font-size: 22px; padding: 12px 20px;">03</div>
          <span style="font-size: 24px; color: var(--accent-gold);">+</span>
          <div class="fragment-slot collected" style="font-size: 22px; padding: 12px 20px;">WEB</div>
          <span style="font-size: 24px; color: var(--accent-gold);">=</span>
          <div class="fragment-slot collected" style="font-size: 26px; padding: 12px 24px; background: var(--accent-red); color: #fff; border-color: var(--accent-red-bright);">
            0903WEB
          </div>
        </div>

        <div>
          <button id="btn-apply-pw" class="btn-primary" style="margin-top: 16px;">
            Return to Verification & Enter Passcode →
          </button>
        </div>
      </div>
    `;

    mount.querySelector('#btn-apply-pw').addEventListener('click', () => {
      audio.playClick();
      onComplete();
    });
  };

  renderCurrentView();

  return () => {};
}
