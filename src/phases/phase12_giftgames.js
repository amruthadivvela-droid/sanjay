/* ==========================================================================
   PHASE 12: Four Gift Mini-Games (Night Drive, Drop Zone, Block Builder, Edit)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';

export function renderPhase12(container, onComplete) {
  let activeMission = 0; // 0: Intro, 1: Drive, 2: Drop, 3: Builder, 4: Edit
  let collectedTokens = {
    drive: false,
    drop: false,
    build: false,
    edit: false
  };

  const renderView = () => {
    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 840px; text-align: center;">
        <div class="midnight-badge">
          <span>🎁</span>
          <span>GIFT CHAMBER MISSIONS • PHASE 12</span>
        </div>

        <div id="gift-game-mount"></div>
      </div>
    `;

    const mount = container.querySelector('#gift-game-mount');

    if (activeMission === 0) renderIntro(mount);
    else if (activeMission === 1) renderDriveGame(mount);
    else if (activeMission === 2) renderDropGame(mount);
    else if (activeMission === 3) renderBuildGame(mount);
    else if (activeMission === 4) renderEditGame(mount);
  };

  // ------------------------------------------------------------------------
  // Intro Screen
  // ------------------------------------------------------------------------
  const renderIntro = (mount) => {
    mount.innerHTML = `
      <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 40px); margin: 8px 0;">
        Nee actual gifts ento telusukovala?
      </h1>
      <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 24px;">
        "Not so fast. Four quick challenges stand between you and the loot." — Hacker
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 28px;">
        <div class="glass-panel" style="padding: 16px; border-color: ${collectedTokens.drive ? 'var(--status-success)' : 'var(--border-subtle)'};">
          <div style="font-size: 32px;">🏎️</div>
          <div style="font-weight: 700; font-size: 14px; margin-top: 6px;">1. Night Drive</div>
          <div style="font-size: 11px; color: var(--text-muted);">${collectedTokens.drive ? '✓ City Key Acquired' : 'Pending'}</div>
        </div>
        <div class="glass-panel" style="padding: 16px; border-color: ${collectedTokens.drop ? 'var(--status-success)' : 'var(--border-subtle)'};">
          <div style="font-size: 32px;">🪂</div>
          <div style="font-weight: 700; font-size: 14px; margin-top: 6px;">2. Drop Zone</div>
          <div style="font-size: 11px; color: var(--text-muted);">${collectedTokens.drop ? '✓ Battle Token Acquired' : 'Pending'}</div>
        </div>
        <div class="glass-panel" style="padding: 16px; border-color: ${collectedTokens.build ? 'var(--status-success)' : 'var(--border-subtle)'};">
          <div style="font-size: 32px;">🧱</div>
          <div style="font-weight: 700; font-size: 14px; margin-top: 6px;">3. Block Builder</div>
          <div style="font-size: 11px; color: var(--text-muted);">${collectedTokens.build ? '✓ Builder Cube Acquired' : 'Pending'}</div>
        </div>
        <div class="glass-panel" style="padding: 16px; border-color: ${collectedTokens.edit ? 'var(--status-success)' : 'var(--border-subtle)'};">
          <div style="font-size: 32px;">🎬</div>
          <div style="font-weight: 700; font-size: 14px; margin-top: 6px;">4. Edit Battle</div>
          <div style="font-size: 11px; color: var(--text-muted);">${collectedTokens.edit ? '✓ Creator Reel Acquired' : 'Pending'}</div>
        </div>
      </div>

      <button id="btn-start-missions" class="btn-primary" style="padding: 0 44px;">
        <span>Start Mission 1: Night Drive</span>
        <span>🏎️</span>
      </button>
    `;

    mount.querySelector('#btn-start-missions').addEventListener('click', () => {
      audio.playClick();
      activeMission = 1;
      renderView();
    });
  };

  // ------------------------------------------------------------------------
  // Game 1: Night Drive (GTA-inspired)
  // ------------------------------------------------------------------------
  const renderDriveGame = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); font-weight: bold;">MISSION 1 OF 4 • GTA NIGHT DRIVE</span>
          <h2 style="font-size: 20px; margin-top: 4px;">Collect S-A-N-J-A-Y on the Highway</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">Use buttons or mouse to steer the neon car!</p>
        </div>

        <canvas id="drive-canvas" width="460" height="240" style="background: #060910; border-radius: var(--radius-md); margin: 0 auto;"></canvas>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button id="btn-steer-left" class="btn-secondary" style="min-height: 42px; padding: 0 24px;">← Steer Left</button>
          <button id="btn-steer-right" class="btn-secondary" style="min-height: 42px; padding: 0 24px;">Steer Right →</button>
        </div>
      </div>
    `;

    const canvas = mount.querySelector('#drive-canvas');
    const ctx = canvas.getContext('2d');
    let carX = canvas.width / 2 - 20;
    const targetLetters = ['S', 'A', 'N', 'J', 'A', 'Y'];
    let collectedCount = 0;
    let items = [];
    let isRunning = true;
    let animId = null;

    const spawnLetter = () => {
      if (!isRunning) return;
      if (collectedCount < targetLetters.length) {
        items.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -20,
          letter: targetLetters[collectedCount],
          speed: 3.2
        });
      }
      setTimeout(spawnLetter, 900);
    };
    spawnLetter();

    const loop = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Road markings
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Neon Sports Car
      ctx.fillStyle = '#D90429';
      ctx.shadowColor = '#FF274D';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(carX, canvas.height - 45, 40, 36, 6);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#4592ff';
      ctx.fillRect(carX + 8, canvas.height - 35, 24, 12);

      // Falling Letters
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.speed;

        ctx.fillStyle = '#F4C95D';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(it.letter, it.x, it.y);

        if (it.y >= canvas.height - 50 && it.y <= canvas.height - 10 && it.x >= carX - 15 && it.x <= carX + 45) {
          audio.playCoin();
          collectedCount++;
          items.splice(i, 1);

          if (collectedCount >= targetLetters.length) {
            isRunning = false;
            collectedTokens.drive = true;
            state.unlockBadge('b_driver');
            audio.playSuccess();
            canvasFx.burstCelebration();
            setTimeout(() => {
              activeMission = 2;
              renderView();
            }, 1200);
            return;
          }
        } else if (it.y > canvas.height + 20) {
          items.splice(i, 1);
        }
      }

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`COLLECTED: ${targetLetters.slice(0, collectedCount).join(' ')}`, 14, 24);

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    mount.querySelector('#btn-steer-left').addEventListener('click', () => carX = Math.max(10, carX - 35));
    mount.querySelector('#btn-steer-right').addEventListener('click', () => carX = Math.min(canvas.width - 50, carX + 35));
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      carX = Math.max(10, Math.min(canvas.width - 50, (e.clientX - rect.left) * (canvas.width / rect.width) - 20));
    });
  };

  // ------------------------------------------------------------------------
  // Game 2: Drop Zone (Battle Royale Parachute)
  // ------------------------------------------------------------------------
  const renderDropGame = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); font-weight: bold;">MISSION 2 OF 4 • DROP ZONE</span>
          <h2 style="font-size: 20px; margin-top: 4px;">Steer Parachute into CodeXa Crate</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">Guide the parachuter down safely!</p>
        </div>

        <canvas id="drop-canvas" width="460" height="240" style="background: linear-gradient(180deg, #0b111e 0%, #172238 100%); border-radius: var(--radius-md); margin: 0 auto;"></canvas>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button id="btn-drop-left" class="btn-secondary" style="min-height: 42px; padding: 0 24px;">← Glide Left</button>
          <button id="btn-drop-right" class="btn-secondary" style="min-height: 42px; padding: 0 24px;">Glide Right →</button>
        </div>
      </div>
    `;

    const canvas = mount.querySelector('#drop-canvas');
    const ctx = canvas.getContext('2d');
    let chuteX = canvas.width / 2;
    let chuteY = 20;
    const targetCrateX = canvas.width / 2 - 30;
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      chuteY += 1.4;

      // Landing Crate at Bottom
      ctx.fillStyle = '#D90429';
      ctx.fillRect(targetCrateX, canvas.height - 35, 60, 30);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('CODEXA', targetCrateX + 7, canvas.height - 15);

      // Parachute & Chute
      ctx.fillStyle = '#F4C95D';
      ctx.beginPath();
      ctx.arc(chuteX, chuteY, 22, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(chuteX - 18, chuteY);
      ctx.lineTo(chuteX, chuteY + 20);
      ctx.moveTo(chuteX + 18, chuteY);
      ctx.lineTo(chuteX, chuteY + 20);
      ctx.stroke();
      ctx.fillText('🪂', chuteX - 10, chuteY + 26);

      if (chuteY >= canvas.height - 45) {
        isRunning = false;
        if (chuteX >= targetCrateX - 15 && chuteX <= targetCrateX + 75) {
          collectedTokens.drop = true;
          state.unlockBadge('b_battle');
          audio.playSuccess();
          canvasFx.burstCelebration();
          setTimeout(() => {
            activeMission = 3;
            renderView();
          }, 1200);
        } else {
          audio.playError();
          chuteY = 20;
          isRunning = true;
          requestAnimationFrame(loop);
        }
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    mount.querySelector('#btn-drop-left').addEventListener('click', () => chuteX = Math.max(30, chuteX - 25));
    mount.querySelector('#btn-drop-right').addEventListener('click', () => chuteX = Math.min(canvas.width - 30, chuteX + 25));
  };

  // ------------------------------------------------------------------------
  // Game 3: Block Builder (Minecraft-inspired)
  // ------------------------------------------------------------------------
  const renderBuildGame = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); font-weight: bold;">MISSION 3 OF 4 • VOXEL BUILDER</span>
          <h2 style="font-size: 20px; margin-top: 4px;">Construct the CodeXa "X"</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">Tap all 5 target blocks to complete the glyph!</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 220px; margin: 20px auto;" id="voxel-grid">
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            const isTarget = [0, 2, 4, 6, 8].includes(i);
            return `
              <div class="voxel-block" data-idx="${i}" data-target="${isTarget}" style="aspect-ratio: 1; background: ${isTarget ? '#161e2e' : 'transparent'}; border: 2px dashed ${isTarget ? '#247bff' : 'transparent'}; border-radius: 6px; cursor: ${isTarget ? 'pointer' : 'default'}; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                ${isTarget ? '🧱' : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div id="build-feedback" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-gold);">
          BLOCKS PLACED: 0/5
        </div>
      </div>
    `;

    let placed = 0;
    const feedback = mount.querySelector('#build-feedback');
    mount.querySelectorAll('.voxel-block[data-target="true"]').forEach(blk => {
      blk.addEventListener('click', () => {
        if (blk.dataset.placed === 'true') return;
        blk.dataset.placed = 'true';
        blk.style.background = 'var(--accent-red)';
        blk.style.border = '2px solid #FF274D';
        audio.playCoin();
        placed++;
        feedback.textContent = `BLOCKS PLACED: ${placed}/5`;

        if (placed === 5) {
          collectedTokens.build = true;
          state.unlockBadge('b_builder');
          audio.playSuccess();
          canvasFx.burstCelebration();
          setTimeout(() => {
            activeMission = 4;
            renderView();
          }, 1200);
        }
      });
    });
  };

  // ------------------------------------------------------------------------
  // Game 4: Edit Battle (Timeline Video Sync)
  // ------------------------------------------------------------------------
  const renderEditGame = (mount) => {
    mount.innerHTML = `
      <div class="game-shell">
        <div>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); font-weight: bold;">MISSION 4 OF 4 • EDIT BATTLE</span>
          <h2 style="font-size: 20px; margin-top: 4px;">Sync the Final Reel</h2>
          <p style="font-size: 13px; color: var(--text-secondary);">Arrange all 3 clips onto the master timeline!</p>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center; margin: 24px 0;">
          <button class="btn-secondary btn-clip" data-id="1">Clip 01: Intro</button>
          <button class="btn-secondary btn-clip" data-id="2">Clip 02: Drop</button>
          <button class="btn-secondary btn-clip" data-id="3">Clip 03: Outro</button>
        </div>

        <div style="background: #080b11; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
          <div style="font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">TIMELINE TRACK 01:</div>
          <div id="timeline-track" style="min-height: 48px; border: 2px dashed rgba(255,255,255,0.2); border-radius: 6px; display: flex; align-items: center; justify-content: center; gap: 8px; color: #777;">
            (Click clips above to snap onto timeline)
          </div>
        </div>

        <div>
          <button id="btn-export-reel" class="btn-primary" style="display: none; margin: 0 auto;">
            Render & Unlock Gifts →
          </button>
        </div>
      </div>
    `;

    const track = mount.querySelector('#timeline-track');
    const btnExport = mount.querySelector('#btn-export-reel');
    let added = 0;

    mount.querySelectorAll('.btn-clip').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.style.opacity = '0.3';
        audio.playClick();
        if (added === 0) track.innerHTML = '';
        const chip = document.createElement('div');
        chip.style.padding = '6px 14px';
        chip.style.background = 'var(--accent-red)';
        chip.style.borderRadius = '4px';
        chip.style.color = '#fff';
        chip.style.fontWeight = 'bold';
        chip.style.fontSize = '12px';
        chip.textContent = btn.textContent;
        track.appendChild(chip);
        added++;

        if (added === 3) {
          btnExport.style.display = 'inline-flex';
          audio.playSuccess();
        }
      });
    });

    btnExport.addEventListener('click', () => {
      collectedTokens.edit = true;
      state.unlockBadge('b_editor');
      audio.playSuccess();
      canvasFx.burstCelebration();
      onComplete();
    });
  };

  renderView();

  return () => {};
}
