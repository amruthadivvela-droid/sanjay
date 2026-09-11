/* ==========================================================================
   EASTER EGG: Secret Hacker Terminal Controller
   ========================================================================== */

import { audio } from '../core/audio.js';

export function initTerminal() {
  const modal = document.getElementById('terminal-modal');
  const btnClose = document.getElementById('btn-close-terminal');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const log = document.getElementById('terminal-log');

  if (!modal || !input || !form) return;

  const commands = {
    help: "Available commands:\n  sanjay   - Dossier on B. Sanjay\n  ashu     - Dossier on Ashu\n  deepak   - Deepak status report\n  codexa   - CodeXa Agency mission\n  gta6     - GTA VI release & voucher status\n  biryani  - Biryani protocol coordinates\n  future   - Time capsule to 2027\n  clear    - Clear terminal screen\n  exit     - Close classified shell",
    sanjay: ">> B. SANJAY\nRole: Co-Founder & Creative Director\nSpecialty: Video Editing, Color Grading, Camera Vision\nAffiliation: CodeXa Agency\nVerdict: Legendary teammate and irreplaceable brother.",
    ashu: ">> ASHU\nRole: Founder & Managing Partner\nHabit: Calling at 1:00 AM with 'bro, one small idea'\nVerdict: Stands beside Sanjay through every high and low.",
    deepak: ">> DEEPAK\nStatus: 'On my way in 5 minutes' (Estimated arrival: 3 days)\nGaming hours: Exceeds safe levels\nVerdict: Brother for life, top roast priority.",
    codexa: ">> CODEXA AGENCY\nMission: Transforming visions into cinematic digital realities.\nFounded: Built on trust, late night sprints, and pure brotherhood.",
    gta6: ">> GTA VI PROTOCOL\nStatus: Pending Rockstar Games worldwide deployment.\nVoucher: 100% funded by Ashu for Sanjay on Day 1.",
    biryani: ">> BIRYANI PROTOCOL\nCapacity: UNLIMITED.\nLocation: Paradise, Bawarchi, or any luxury dining of choice.\nStatus: Ready to redeem with Ashu.",
    future: ">> TIME CAPSULE 2027\nEncrypted coordinate: 12 September 2027.\nMessage: 'Keep building, Sanjay. The empire is just getting started.'",
    clear: () => {
      log.textContent = '';
      return '';
    },
    exit: () => {
      modal.classList.add('hidden');
      return 'Session closed.';
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim().toLowerCase();
    input.value = '';

    if (!raw) return;

    audio.playClick();
    log.textContent += `\n> ${raw}\n`;

    if (commands[raw]) {
      if (typeof commands[raw] === 'function') {
        commands[raw]();
      } else {
        log.textContent += `${commands[raw]}\n`;
      }
    } else {
      log.textContent += `Command not recognized: '${raw}'. Type 'help' for options.\n`;
    }

    log.scrollTop = log.scrollHeight;
  });

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

export function openTerminal() {
  const modal = document.getElementById('terminal-modal');
  const input = document.getElementById('terminal-input');
  if (modal) {
    modal.classList.remove('hidden');
    audio.playLaserScan();
    if (input) input.focus();
  }
}
