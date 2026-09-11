/* ==========================================================================
   PHASE 2: Identity Verification Room (Strict Manual Verification)
   ========================================================================== */

import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { decorations } from '../core/decorations.js';
import { getHackerSVG, getCatSVG, getRedPandaSVG, CharacterStates } from '../core/characters.js';

export function renderPhase2(container, onNext, onNeedHint) {
  const wrongDialogues = [
    "Nice try.",
    "Even the hacker is disappointed.",
    "The animals are judging you.",
    "Sanjay ayithe correct ga enter chesthademo… probably.",
    "Need a hint, hero?"
  ];

  let wrongAttemptCount = 0;
  let isPasswordVisible = false;
  let isChecking = false;

  container.innerHTML = `
    <div class="phase-scene identity-scene fade-in">
      <!-- Left: Hacker Stage -->
      <div class="character-stage" id="hacker-stage">
        <div class="character-avatar-wrap" id="hacker-avatar">
          ${getHackerSVG(CharacterStates.SIP)}
        </div>
        <div class="character-badge-label">PROTOCOL OPERATOR</div>
        <div class="character-bubble" id="hacker-bubble">
          "Respecting Co-Founder privacy."
        </div>
      </div>

      <!-- Center: Verification Panel -->
      <div class="verification-panel" id="verification-panel">
        <div class="midnight-badge" style="margin-bottom: 12px;" id="badge-lock">
          <span id="badge-lock-icon">🔒</span>
          <span>SECURITY LEVEL 01</span>
        </div>
        <h1 class="v-panel-title">Are you really Sanjay?</h1>
        <p class="v-panel-sub">
          This experience is classified. CodeXa Co-Founder verification required.
        </p>

        <form id="form-verify" autocomplete="off">
          <label for="sanjayverse-access-code" class="sr-only">Birthday Access Code</label>
          <div class="password-input-wrap">
            <input
              type="password"
              id="pw-field"
              name="sanjayverse-access-code"
              class="password-field"
              placeholder="Enter access code"
              autocomplete="new-password"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
              data-form-type="other"
              readonly
              value=""
            />
            <button
              type="button"
              id="btn-toggle-pw"
              class="btn-toggle-pw"
              title="Show Password"
              aria-label="Show Password"
            >
              <span id="toggle-icon">👁️</span>
              <span id="toggle-label" class="toggle-text">Show Password</span>
            </button>
          </div>

          <div id="wrong-feedback" class="wrong-pw-feedback"></div>

          <div class="v-panel-actions">
            <button
              type="submit"
              id="btn-verify-submit"
              class="btn-primary"
              disabled
              style="min-width: 140px;"
            >
              <span id="btn-submit-text">Enter</span>
            </button>
            <button type="button" id="btn-need-hint" class="btn-secondary">
              <span>💡</span>
              <span>Need a Hint?</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Right: Animals Stage (Black Cat & Red Panda) -->
      <div class="character-stage" id="animals-stage">
        <div style="display: flex; gap: 12px;">
          <div class="character-avatar-wrap" id="cat-avatar" style="width: 100px; height: 100px;">
            ${getCatSVG(CharacterStates.TURN_AWAY)}
          </div>
          <div class="character-avatar-wrap" id="panda-avatar" style="width: 100px; height: 100px;">
            ${getRedPandaSVG(CharacterStates.TURN_AWAY)}
          </div>
        </div>
        <div class="character-badge-label">SECURITY GUARDS: LUNA & REX</div>
        <div class="character-bubble" id="animals-bubble">
          "Privacy mode active. We aren't peeking."
        </div>
      </div>

      <button id="btn-skip-identity" class="btn-skip">Skip Identity Check →</button>
    </div>
  `;

  const panel = container.querySelector('#verification-panel');
  const pwField = container.querySelector('#pw-field');
  const btnToggle = container.querySelector('#btn-toggle-pw');
  const toggleIcon = container.querySelector('#toggle-icon');
  const toggleLabel = container.querySelector('#toggle-label');
  const wrongFeedback = container.querySelector('#wrong-feedback');
  const form = container.querySelector('#form-verify');
  const btnSubmit = container.querySelector('#btn-verify-submit');
  const btnSubmitText = container.querySelector('#btn-submit-text');
  const btnHint = container.querySelector('#btn-need-hint');
  const btnSkip = container.querySelector('#btn-skip-identity');
  const badgeLockIcon = container.querySelector('#badge-lock-icon');

  const hackerAvatar = container.querySelector('#hacker-avatar');
  const hackerBubble = container.querySelector('#hacker-bubble');
  const catAvatar = container.querySelector('#cat-avatar');
  const pandaAvatar = container.querySelector('#panda-avatar');
  const animalsBubble = container.querySelector('#animals-bubble');

  // 1. Always ensure password starts completely empty
  pwField.value = '';

  // 2. Strong autofill prevention: remove readonly only on direct user interaction
  const unlockEditing = () => {
    pwField.removeAttribute('readonly');
  };
  pwField.addEventListener('focus', unlockEditing, { once: true });
  pwField.addEventListener('pointerdown', unlockEditing, { once: true });
  pwField.addEventListener('keydown', unlockEditing, { once: true });

  const onPageShow = () => {
    pwField.value = '';
    updateSubmitState();
  };
  window.addEventListener('pageshow', onPageShow);

  // 3. Update character reactions
  const updateCharacterReaction = (charState, message = '') => {
    if (charState === CharacterStates.PEEK) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.TYPE);
      catAvatar.innerHTML = getCatSVG(CharacterStates.IDLE);
      pandaAvatar.innerHTML = getRedPandaSVG(CharacterStates.IDLE);
      if (hackerBubble) hackerBubble.textContent = '"Privacy mode disabled. Everyone is watching."';
      if (animalsBubble) animalsBubble.textContent = '"Ooh! Let\'s see what he enters!"';
    } else if (charState === CharacterStates.TURN_AWAY) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.SIP);
      catAvatar.innerHTML = getCatSVG(CharacterStates.TURN_AWAY);
      pandaAvatar.innerHTML = getRedPandaSVG(CharacterStates.TURN_AWAY);
      if (hackerBubble) hackerBubble.textContent = '"Respecting Co-Founder privacy."';
      if (animalsBubble) animalsBubble.textContent = '"Looking away. No cheating!"';
    } else if (charState === CharacterStates.WRONG) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.WRONG);
      catAvatar.innerHTML = getCatSVG(CharacterStates.WRONG);
      pandaAvatar.innerHTML = getRedPandaSVG(CharacterStates.WRONG);
      if (hackerBubble) hackerBubble.textContent = '"Access Denied. Passcode mismatch."';
      if (animalsBubble) animalsBubble.textContent = `"${message}"`;
    } else if (charState === CharacterStates.CELEBRATE) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.CELEBRATE);
      catAvatar.innerHTML = getCatSVG(CharacterStates.CELEBRATE);
      pandaAvatar.innerHTML = getRedPandaSVG(CharacterStates.CELEBRATE);
      if (hackerBubble) hackerBubble.textContent = '"Protocol validated! Welcome, Sanjay!"';
      if (animalsBubble) animalsBubble.textContent = '"Yay! It\'s really him!"';
    }
  };

  // 4. Update Enter button enabled/disabled state based on user typing
  const updateSubmitState = () => {
    const hasText = pwField.value.trim().length > 0;
    btnSubmit.disabled = !hasText || isChecking;
    if (hasText && !isChecking) {
      btnSubmit.classList.add('ready');
    } else {
      btnSubmit.classList.remove('ready');
    }
  };

  // 5. Show / Hide password toggle
  btnToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isPasswordVisible = !isPasswordVisible;

    pwField.type = isPasswordVisible ? 'text' : 'password';
    toggleIcon.textContent = isPasswordVisible ? '🙈' : '👁️';
    toggleLabel.textContent = isPasswordVisible ? 'Hide Password' : 'Show Password';
    btnToggle.title = isPasswordVisible ? 'Hide Password' : 'Show Password';
    btnToggle.setAttribute('aria-label', isPasswordVisible ? 'Hide Password' : 'Show Password');

    audio.playClick();

    if (isPasswordVisible) {
      updateCharacterReaction(CharacterStates.PEEK);
      decorations.triggerCelebrationBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, 6);
    } else {
      updateCharacterReaction(CharacterStates.TURN_AWAY);
    }
  });

  // 6. User typing reactions
  pwField.addEventListener('input', () => {
    audio.playClick();
    pwField.classList.remove('error');
    wrongFeedback.textContent = '';
    updateSubmitState();

    if (!isPasswordVisible && pwField.value.length > 0) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.TYPE);
    }
  });

  pwField.addEventListener('focus', () => {
    if (!isPasswordVisible && pwField.value.length > 0) {
      hackerAvatar.innerHTML = getHackerSVG(CharacterStates.TYPE);
    }
  });

  // 7. Manual submission only via form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isChecking || btnSubmit.disabled) return;

    const rawVal = pwField.value.trim();
    if (!rawVal) return;

    isChecking = true;
    btnSubmit.disabled = true;
    btnSubmitText.innerHTML = `<span class="submit-spinner" style="display:inline-block; animation: spinSlow 1s linear infinite;">⏳</span> Checking…`;
    audio.playTick();

    // Verification runs for 600ms
    setTimeout(() => {
      if (rawVal.toUpperCase() === '0903WEB') {
        // Correct Password Sequence
        btnSubmitText.textContent = 'Access Confirmed ✓';
        pwField.classList.remove('error');
        pwField.classList.add('success');
        badgeLockIcon.textContent = '🔓';

        wrongFeedback.style.color = '#38D996';
        wrongFeedback.textContent = 'Password accepted.';

        updateCharacterReaction(CharacterStates.CELEBRATE);
        audio.playSuccess();
        decorations.triggerCelebrationBurst();

        setTimeout(() => {
          onNext();
        }, 900);
      } else {
        // Wrong Password Sequence
        isChecking = false;
        btnSubmitText.textContent = 'Enter';
        updateSubmitState();

        pwField.classList.add('error');
        panel.classList.add('shake-panel-anim');
        setTimeout(() => panel.classList.remove('shake-panel-anim'), 500);

        audio.playError();

        const msg = wrongDialogues[wrongAttemptCount % wrongDialogues.length];
        wrongAttemptCount++;
        wrongFeedback.style.color = '#FF274D';
        wrongFeedback.textContent = msg;
        updateCharacterReaction(CharacterStates.WRONG, msg);

        if (wrongAttemptCount >= 3) {
          btnHint.classList.add('hint-pulse');
        }

        pwField.focus();
      }
    }, 600);
  });

  btnHint.addEventListener('click', () => {
    audio.playClick();
    onNeedHint();
  });

  btnSkip.addEventListener('click', () => {
    audio.playSuccess();
    onNext();
  });

  return () => {
    window.removeEventListener('pageshow', onPageShow);
  };
}
