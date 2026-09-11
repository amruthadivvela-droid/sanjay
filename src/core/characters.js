/* ==========================================================================
   SANJAYVERSE CHARACTERS: Hacker, Black Cat & Red Panda Vector Controllers
   ========================================================================== */

export const CharacterStates = {
  IDLE: 'idle',
  SIP: 'sip',
  TYPE: 'type',
  PEEK: 'peek',
  TURN_AWAY: 'turn_away',
  WRONG: 'wrong',
  POINT: 'point',
  SLEEP: 'sleep',
  CELEBRATE: 'celebrate'
};

// SVG Generators for Hacker
export function getHackerSVG(state = 'idle') {
  const isSleeping = state === 'sleep';
  const isTyping = state === 'type';
  const isWrong = state === 'wrong';
  const isCelebrating = state === 'celebrate';

  return `
    <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FF274D" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#D90429" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Desk -->
      <rect x="10" y="125" width="140" height="12" rx="4" fill="#1b202e" stroke="#2a3348" stroke-width="2"/>
      <rect x="25" y="137" width="8" height="22" fill="#141824"/>
      <rect x="127" y="137" width="8" height="22" fill="#141824"/>

      <!-- Coffee Mug with Steam -->
      <rect x="24" y="105" width="18" height="20" rx="3" fill="#e2e8f0"/>
      <path d="M42 110 C46 110 46 118 42 118" stroke="#cbd5e1" stroke-width="2.5" fill="none"/>
      ${!isSleeping ? `
        <path d="M28 100 Q32 94 28 88" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none">
          <animate attributeName="d" dur="2s" repeatCount="indefinite" values="M28 100 Q32 94 28 88; M28 100 Q24 94 28 88; M28 100 Q32 94 28 88"/>
        </path>
      ` : ''}

      <!-- Laptop & Glow -->
      <circle cx="80" cy="115" r="30" fill="url(#laptopGlow)" opacity="${isTyping ? '0.7' : '0.2'}"/>
      <polygon points="55,124 105,124 98,100 62,100" fill="#2d3748" stroke="#4a5568" stroke-width="1.5"/>
      <rect x="64" y="103" width="32" height="18" rx="2" fill="${isTyping ? '#D90429' : '#0d1117'}" stroke="#FF274D" stroke-width="1"/>
      <path d="M50 125 L110 125" stroke="#718096" stroke-width="3" stroke-linecap="round"/>

      <!-- Hacker Body / Hoodie -->
      <path d="M50 125 Q40 85 80 85 Q120 85 110 125 Z" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      <!-- Hood -->
      <circle cx="80" cy="65" r="24" fill="#090d16"/>
      <circle cx="80" cy="67" r="18" fill="#1e293b"/>

      ${isSleeping ? `
        <!-- Sleeping Pose -->
        <path d="M72 70 Q76 72 80 70" stroke="#94a3b8" stroke-width="2" fill="none"/>
        <path d="M84 70 Q88 72 92 70" stroke="#94a3b8" stroke-width="2" fill="none"/>
        <text x="100" y="50" fill="#94a3b8" font-size="14" font-family="monospace">Zzz...</text>
      ` : isWrong ? `
        <!-- Disappointed Face / Glasses -->
        <rect x="71" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <rect x="83" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <line x1="79" y1="66" x2="83" y2="66" stroke="#fff" stroke-width="1"/>
        <path d="M75 75 Q80 71 85 75" stroke="#ef4444" stroke-width="2" fill="none"/>
      ` : isCelebrating ? `
        <!-- Hands in Air -->
        <path d="M40 95 Q30 70 45 55" stroke="#0f172a" stroke-width="8" stroke-linecap="round" fill="none"/>
        <path d="M120 95 Q130 70 115 55" stroke="#0f172a" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Happy Face -->
        <rect x="71" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <rect x="83" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <path d="M75 72 Q80 77 85 72" stroke="#38d996" stroke-width="2" fill="none"/>
      ` : `
        <!-- Normal / Typing Face -->
        <rect x="71" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <rect x="83" y="63" width="8" height="6" rx="2" fill="#38bdf8"/>
        <line x1="79" y1="66" x2="83" y2="66" stroke="#fff" stroke-width="1"/>
        <line x1="76" y1="73" x2="84" y2="73" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
      `}

      <!-- Typing Hands Animation -->
      ${isTyping ? `
        <ellipse cx="68" cy="118" rx="5" ry="3" fill="#cbd5e1">
          <animate attributeName="cy" dur="0.15s" repeatCount="indefinite" values="118;115;118"/>
        </ellipse>
        <ellipse cx="92" cy="118" rx="5" ry="3" fill="#cbd5e1">
          <animate attributeName="cy" dur="0.18s" repeatCount="indefinite" values="118;114;118"/>
        </ellipse>
      ` : ''}
    </svg>
  `;
}

// SVG Generator for Black Cat
export function getCatSVG(state = 'idle') {
  const isTurnAway = state === 'turn_away';
  const isSleeping = state === 'sleep';
  const isWrong = state === 'wrong' || state === 'judge';
  const isCelebrating = state === 'celebrate';

  if (isTurnAway) {
    return `
      <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Cat Back Turned -->
        <ellipse cx="60" cy="80" rx="26" ry="30" fill="#12151c"/>
        <circle cx="60" cy="48" r="18" fill="#12151c"/>
        <!-- Ears from behind -->
        <polygon points="46,38 42,20 54,32" fill="#12151c"/>
        <polygon points="74,38 78,20 66,32" fill="#12151c"/>
        <!-- Tail swaying away -->
        <path d="M60 105 Q90 100 85 75" stroke="#12151c" stroke-width="6" stroke-linecap="round" fill="none">
          <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M60 105 Q90 100 85 75; M60 105 Q95 95 90 70; M60 105 Q90 100 85 75"/>
        </path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="60" cy="82" rx="26" ry="28" fill="#12151c"/>
      <!-- CodeXa Collar -->
      <rect x="44" y="62" width="32" height="5" rx="2.5" fill="#D90429"/>
      <circle cx="60" cy="68" r="3" fill="#F4C95D"/>

      <!-- Tail -->
      <path d="M38 95 Q15 90 20 70" stroke="#12151c" stroke-width="6" stroke-linecap="round" fill="none">
        <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M38 95 Q15 90 20 70; M38 95 Q10 80 18 65; M38 95 Q15 90 20 70"/>
      </path>

      <!-- Head -->
      <circle cx="60" cy="46" r="20" fill="#12151c"/>
      <!-- Ears with pink insides -->
      <polygon points="44,38 40,18 54,30" fill="#12151c"/>
      <polygon points="45,34 42,22 52,29" fill="#ff7675"/>
      <polygon points="76,38 80,18 66,30" fill="#12151c"/>
      <polygon points="75,34 78,22 68,29" fill="#ff7675"/>

      ${isSleeping ? `
        <!-- Sleeping Eyes -->
        <path d="M48 46 Q53 49 58 46" stroke="#94a3b8" stroke-width="2" fill="none"/>
        <path d="M62 46 Q67 49 72 46" stroke="#94a3b8" stroke-width="2" fill="none"/>
      ` : isWrong ? `
        <!-- Judging / Skeptical Eyes -->
        <ellipse cx="52" cy="44" rx="5" ry="3" fill="#eab308"/>
        <ellipse cx="68" cy="44" rx="5" ry="3" fill="#eab308"/>
        <line x1="47" y1="42" x2="57" y2="43" stroke="#12151c" stroke-width="2"/>
        <line x1="63" y1="43" x2="73" y2="42" stroke="#12151c" stroke-width="2"/>
        <circle cx="52" cy="44" r="2" fill="#000"/>
        <circle cx="68" cy="44" r="2" fill="#000"/>
      ` : `
        <!-- Bright Yellow/Green Curious Eyes -->
        <ellipse cx="52" cy="44" rx="5" ry="6" fill="#10b981"/>
        <ellipse cx="68" cy="44" rx="5" ry="6" fill="#10b981"/>
        <ellipse cx="53" cy="44" rx="2" ry="5" fill="#000"/>
        <ellipse cx="69" cy="44" rx="2" ry="5" fill="#000"/>
        <circle cx="51" cy="42" r="1.5" fill="#fff"/>
        <circle cx="67" cy="42" r="1.5" fill="#fff"/>
      `}

      <!-- Nose & Whiskers -->
      <polygon points="60,51 57,48 63,48" fill="#ff7675"/>
      <line x1="42" y1="52" x2="30" y2="50" stroke="#64748b" stroke-width="1"/>
      <line x1="42" y1="55" x2="30" y2="57" stroke="#64748b" stroke-width="1"/>
      <line x1="78" y1="52" x2="90" y2="50" stroke="#64748b" stroke-width="1"/>
      <line x1="78" y1="55" x2="90" y2="57" stroke="#64748b" stroke-width="1"/>

      ${isCelebrating ? `
        <!-- Happy Paws up -->
        <circle cx="45" cy="75" r="7" fill="#12151c"/>
        <circle cx="75" cy="75" r="7" fill="#12151c"/>
      ` : ''}
    </svg>
  `;
}

// SVG Generator for Red Panda
export function getRedPandaSVG(state = 'idle') {
  const isTurnAway = state === 'turn_away';
  const isSleeping = state === 'sleep';
  const isWrong = state === 'wrong' || state === 'point';
  const isCelebrating = state === 'celebrate';

  if (isTurnAway) {
    return `
      <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="80" rx="28" ry="30" fill="#d9532f"/>
        <circle cx="60" cy="48" r="20" fill="#d9532f"/>
        <circle cx="42" cy="34" r="9" fill="#f8fafc"/>
        <circle cx="78" cy="34" r="9" fill="#f8fafc"/>
        <!-- Striped bushy tail -->
        <rect x="70" y="80" width="36" height="14" rx="7" fill="#d9532f" transform="rotate(30 70 80)"/>
        <rect x="80" y="86" width="8" height="14" fill="#9a3412" transform="rotate(30 70 80)"/>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Fluffy Body -->
      <ellipse cx="60" cy="84" rx="26" ry="26" fill="#d9532f"/>
      <ellipse cx="60" cy="88" rx="16" ry="18" fill="#1e293b"/>

      <!-- Striped Bushy Tail -->
      <path d="M82 92 C105 92 115 65 98 52" stroke="#d9532f" stroke-width="14" stroke-linecap="round" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M82 92 C105 92 115 65 98 52; M82 92 C110 88 118 60 102 48; M82 92 C105 92 115 65 98 52"/>
      </path>

      <!-- Head -->
      <circle cx="60" cy="46" r="22" fill="#d9532f"/>
      <!-- White facial cheeks -->
      <path d="M42 46 Q40 60 52 58 Q46 48 42 46 Z" fill="#ffffff"/>
      <path d="M78 46 Q80 60 68 58 Q74 48 78 46 Z" fill="#ffffff"/>
      <!-- White muzzle -->
      <ellipse cx="60" cy="54" rx="9" ry="6" fill="#ffffff"/>
      <polygon points="60,53 57,50 63,50" fill="#0f172a"/>

      <!-- Ears -->
      <circle cx="40" cy="30" r="10" fill="#ffffff"/>
      <circle cx="40" cy="30" r="6" fill="#d9532f"/>
      <circle cx="80" cy="30" r="10" fill="#ffffff"/>
      <circle cx="80" cy="30" r="6" fill="#d9532f"/>

      ${isSleeping ? `
        <!-- Sleeping Eyes -->
        <path d="M49 44 Q53 47 57 44" stroke="#0f172a" stroke-width="2" fill="none"/>
        <path d="M63 44 Q67 47 71 44" stroke="#0f172a" stroke-width="2" fill="none"/>
      ` : isWrong ? `
        <!-- Judgmental Eyebrows & Eyes -->
        <circle cx="51" cy="44" r="3.5" fill="#0f172a"/>
        <circle cx="69" cy="44" r="3.5" fill="#0f172a"/>
        <line x1="46" y1="39" x2="55" y2="42" stroke="#9a3412" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="74" y1="39" x2="65" y2="42" stroke="#9a3412" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Pointing Paw -->
        <rect x="25" y="60" width="22" height="8" rx="4" fill="#1e293b" transform="rotate(-15 25 60)"/>
      ` : `
        <!-- Friendly Black Eyes with Highlights -->
        <circle cx="52" cy="44" r="4" fill="#0f172a"/>
        <circle cx="68" cy="44" r="4" fill="#0f172a"/>
        <circle cx="50.5" cy="42.5" r="1.5" fill="#fff"/>
        <circle cx="66.5" cy="42.5" r="1.5" fill="#fff"/>
      `}

      ${isCelebrating ? `
        <!-- Happy Paws raised -->
        <ellipse cx="38" cy="65" rx="6" ry="10" fill="#1e293b" transform="rotate(-30 38 65)"/>
        <ellipse cx="82" cy="65" rx="6" ry="10" fill="#1e293b" transform="rotate(30 82 65)"/>
      ` : ''}
    </svg>
  `;
}
