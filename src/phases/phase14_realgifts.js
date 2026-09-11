/* ==========================================================================
   PHASE 14: Real Gift Reveals (GTA VI Voucher, Biryani Pass, Lifetime Irritation)
   ========================================================================== */

import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';
import { decorations } from '../core/decorations.js';

export function renderPhase14(container, onNext) {
  let claimed = {
    gta: false,
    food: false,
    irritation: false
  };

  let isCancelling = false;
  let cancellationDenied = false;
  let cancellationLocked = false;
  let acceptedWithSeal = false;

  const renderView = () => {
    const allClaimed = claimed.gta && claimed.food && claimed.irritation;

    container.innerHTML = `
      <div class="phase-scene fade-in" style="max-width: 960px; text-align: center;">
        <div class="midnight-badge" style="border-color: var(--accent-gold); color: var(--accent-gold);">
          <span>✨</span>
          <span>AUTHENTIC CO-FOUNDER LOOT • PHASE 14</span>
        </div>

        <h1 style="font-family: var(--font-heading); font-size: clamp(26px, 4.5vw, 42px); margin: 8px 0;">
          The Real Birthday Gifts
        </h1>
        <p style="color: var(--text-secondary); font-size: 15px; margin-bottom: 28px;">
          Claim all three rewards to link them permanently to your profile.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 22px; margin-bottom: 32px; text-align: left;">
          <!-- Gift 1: GTA VI -->
          <div class="glass-panel" style="padding: 24px; border: 1px solid ${claimed.gta ? 'var(--status-success)' : 'var(--accent-red)'}; position: relative;">
            <div style="font-size: 36px; margin-bottom: 8px;">🎮</div>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); letter-spacing: 1px;">RESERVED FOR SANJAY</div>
            <h3 style="font-size: 18px; color: #fff; margin: 4px 0 8px 0;">GTA VI Official Copy</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
              Redeemable immediately on worldwide launch day. Full game copy funded by Ashu.
            </p>
            <button id="btn-claim-gta" class="btn-secondary" style="width: 100%; font-size: 13px;" ${claimed.gta ? 'disabled' : ''}>
              ${claimed.gta ? '✓ Attached to Account' : 'Claim Voucher'}
            </button>
          </div>

          <!-- Gift 2: Biryani Pass -->
          <div class="glass-panel" style="padding: 24px; border: 1px solid ${claimed.food ? 'var(--status-success)' : 'var(--accent-gold)'}; position: relative;">
            <div style="font-size: 36px; margin-bottom: 8px;">🍗</div>
            <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-gold); letter-spacing: 1px;">UNLIMITED FOOD PASS</div>
            <h3 style="font-size: 18px; color: #fff; margin: 4px 0 8px 0;">Royal Biryani Feast</h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
              Full biryani treat + whatever snacks you crave. Condition: "Kadupu capacity varaku only."
            </p>
            <button id="btn-claim-food" class="btn-secondary" style="width: 100%; font-size: 13px;" ${claimed.food ? 'disabled' : ''}>
              ${claimed.food ? '✓ Attached to Account' : 'Claim Food Treat'}
            </button>
          </div>

          <!-- Gift 3: Lifetime Irritation Membership -->
          <div class="glass-panel" id="irritation-card" style="padding: 24px; border: 1px solid ${claimed.irritation ? 'var(--status-success)' : 'var(--accent-blue)'}; position: relative; overflow: hidden;">
            ${cancellationDenied && !acceptedWithSeal ? '<div class="rejection-stamp">REQUEST DENIED</div>' : ''}
            ${acceptedWithSeal ? '<div class="accepted-seal">ACCEPTED ★</div>' : ''}

            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div style="font-size: 36px;">👑</div>
              <div style="font-family: var(--font-mono); font-size: 11px; background: rgba(56, 217, 150, 0.15); color: var(--status-success); border: 1px solid var(--status-success); padding: 3px 8px; border-radius: 4px; font-weight: 700; letter-spacing: 1px;">
                ACTIVE FOR LIFE
              </div>
            </div>

            <h3 style="font-size: 18px; color: #fff; margin: 4px 0 10px 0;">Lifetime Irritation Membership</h3>

            <!-- Details Specification -->
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 14px; font-size: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <span style="color: var(--text-muted); display: block; font-size: 11px;">Status:</span>
                <strong style="color: var(--status-success);">ACTIVE FOR LIFE</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block; font-size: 11px;">Validity:</span>
                <strong style="color: #fff;">NO EXPIRY</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block; font-size: 11px;">Refund:</span>
                <strong style="color: #ff4757;">NOT AVAILABLE</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); display: block; font-size: 11px;">Issued by:</span>
                <strong style="color: var(--accent-gold);">ASHU</strong>
              </div>
            </div>

            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
              Unlimited late-night brainstorm calls, random meme blasts, and mutual roast privileges forever.
            </p>

            <div id="escape-container" style="position: relative; min-height: 48px; transition: transform 0.3s ease;">
              ${acceptedWithSeal ? `
                <div style="background: rgba(244, 201, 93, 0.12); border: 1px solid var(--accent-gold); border-radius: var(--radius-md); padding: 10px; text-align: center; color: var(--accent-gold); font-weight: 700; font-size: 13px;">
                  ✓ Lifetime irritation successfully accepted.
                </div>
              ` : cancellationLocked ? `
                <button id="btn-claim-irritation" class="btn-secondary" style="width: 100%; font-size: 13px; opacity: 0.7; cursor: not-allowed;" disabled>
                  🔒 Cancellation Permanently Locked
                </button>
                <div style="font-size: 12px; color: var(--accent-gold); margin-top: 8px; text-align: center;">
                  🐱 Animals block the button! 💻 Hacker: "System says NO."
                </div>
              ` : `
                <button id="btn-claim-irritation" class="btn-secondary" style="width: 100%; font-size: 13px;">
                  Cancel Membership
                </button>
              `}
            </div>
          </div>
        </div>

        <div>
          ${allClaimed ? `
            <button id="btn-goto-roast" class="btn-primary" style="padding: 0 44px;">
              <span>Proceed to Roast Royale Quiz</span>
              <span>🔥</span>
            </button>
          ` : `
            <p style="color: var(--text-muted); font-size: 13px;">Review and claim all three loot items above to proceed!</p>
          `}
        </div>
      </div>

      <!-- Nice Try Modal Dialog -->
      <div id="cancellation-modal" style="display: none; position: fixed; inset: 0; background: rgba(4, 5, 7, 0.88); backdrop-filter: blur(8px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
        <div class="glass-panel" style="max-width: 520px; width: 100%; padding: 32px; text-align: center; border: 1px solid var(--border-subtle); box-shadow: 0 25px 50px rgba(0,0,0,0.8); border-radius: var(--radius-lg);">
          
          <div style="font-size: 44px; margin-bottom: 8px;">🛑</div>
          <div style="font-family: var(--font-mono); font-size: 12px; color: #ff4757; letter-spacing: 2px; text-transform: uppercase;">
            SECURITY INTERCEPTED
          </div>

          <h2 style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; color: #fff; margin: 8px 0 16px 0;">
            Nice Try, Sanjay.
          </h2>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px; font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-around;">
            <span>💻 Hacker: [Stops typing & glares]</span>
            <span>🐱 Luna & 🦊 Rex look at each other</span>
          </div>

          <div style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--accent-gold); margin-bottom: 12px; text-shadow: 0 0 20px rgba(244, 201, 93, 0.4); line-height: 1.4;">
            "Adhi antha easy ga avvadhu amma, Bujji Konda!"
          </div>

          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 28px;">
            Lifetime irritation membership ki cancellation option undadhu. Idhi already permanently activate ayipoyindhi.
          </p>

          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button id="btn-modal-accept" class="btn-primary" style="flex: 1; min-width: 180px;">
              <span>Sare, Accept Chesthunna</span>
              <span>🤝</span>
            </button>
            <button id="btn-modal-retry" class="btn-secondary" style="flex: 1; min-width: 160px;">
              <span>Malli Try Chestha</span>
              <span>🏃</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const btnGta = container.querySelector('#btn-claim-gta');
    const btnFood = container.querySelector('#btn-claim-food');
    const btnIrritation = container.querySelector('#btn-claim-irritation');
    const btnGotoRoast = container.querySelector('#btn-goto-roast');
    const modal = container.querySelector('#cancellation-modal');
    const irritationCard = container.querySelector('#irritation-card');

    btnGta.addEventListener('click', () => {
      audio.playCoin();
      claimed.gta = true;
      decorations.triggerCelebrationBurst(window.innerWidth * 0.3, window.innerHeight * 0.5, 15);
      renderView();
    });

    btnFood.addEventListener('click', () => {
      audio.playCoin();
      claimed.food = true;
      decorations.triggerCelebrationBurst(window.innerWidth * 0.5, window.innerHeight * 0.5, 15);
      renderView();
    });

    if (btnIrritation && !cancellationLocked && !acceptedWithSeal) {
      btnIrritation.addEventListener('click', () => {
        if (isCancelling) return;
        isCancelling = true;

        audio.playClick();
        btnIrritation.textContent = 'Processing Cancellation…';
        btnIrritation.disabled = true;

        // 1. Wait 500-700ms
        setTimeout(() => {
          // 2. Card shakes once
          irritationCard.classList.add('shake-card-anim');
          audio.playTone(180, 'sawtooth', 0.25);
          cancellationDenied = true;

          // 3. Red rejection stamp appears
          renderView();

          // 4. Open polished dialog
          const updatedModal = container.querySelector('#cancellation-modal');
          if (updatedModal) {
            updatedModal.style.display = 'flex';
            audio.playLaserScan();

            // Hook modal buttons
            const btnModalAccept = updatedModal.querySelector('#btn-modal-accept');
            const btnModalRetry = updatedModal.querySelector('#btn-modal-retry');

            btnModalAccept.addEventListener('click', () => {
              updatedModal.style.display = 'none';
              acceptedWithSeal = true;
              claimed.irritation = true;
              audio.playSuccess();
              decorations.triggerCelebrationBurst();
              canvasFx.burstCelebration();
              renderView();
            });

            btnModalRetry.addEventListener('click', () => {
              updatedModal.style.display = 'none';
              cancellationLocked = true;
              claimed.irritation = true;
              audio.playTone(320, 'sine', 0.2);
              renderView();

              // Escape button once inside its own card
              const escapeWrap = container.querySelector('#escape-container');
              if (escapeWrap) {
                escapeWrap.style.transform = 'translate(12px, -6px)';
                setTimeout(() => {
                  escapeWrap.style.transform = 'translate(0, 0)';
                }, 400);
              }
            });
          }
        }, 600);
      });
    }

    if (btnGotoRoast) {
      btnGotoRoast.addEventListener('click', () => {
        audio.playSuccess();
        canvasFx.burstCelebration();
        onNext();
      });
    }
  };

  renderView();

  return () => {};
}
