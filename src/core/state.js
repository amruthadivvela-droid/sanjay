/* ==========================================================================
   SANJAYVERSE STATE MANAGER: Story Progression, Badges, Fragments, Settings
   ========================================================================== */

const STORAGE_KEY = 'sanjayverse_save_v1';

export const BADGES_DEF = [
  { id: 'b_identity', title: 'Identity Verified', desc: 'Cracked the Birthday Protocol (0903WEB)', icon: '🛡️' },
  { id: 'b_colour', title: 'Colour Decoder', desc: 'Mastered the Simon Says frequency puzzle', icon: '🎨' },
  { id: 'b_caffeine', title: 'Caffeine Specialist', desc: 'Fueled the hacker with 3 cups of coffee', icon: '☕' },
  { id: 'b_web', title: 'Web Master', desc: 'Decoded the red-blue spider web connection', icon: '🕸️' },
  { id: 'b_frame', title: 'Perfect Frame', desc: 'Captured the cinema shot with the camera shutter', icon: '📸' },
  { id: 'b_cinema', title: 'Cinema Explorer', desc: 'Explored the theater and aced the movie trivia', icon: '🎬' },
  { id: 'b_driver', title: 'City Driver', desc: 'Collected S-A-N-J-A-Y across the GTA neon night', icon: '🏎️' },
  { id: 'b_battle', title: 'Battle Survivor', desc: 'Guided the drop zone parachute safely into base', icon: '🪂' },
  { id: 'b_builder', title: 'Block Builder', desc: 'Constructed the voxel CodeXa X glyph', icon: '🧱' },
  { id: 'b_editor', title: 'Timeline Editor', desc: 'Arranged and rendered the birthday montage cut', icon: '🎞️' },
  { id: 'b_cake', title: 'Cake Commander', desc: 'Cut the 3D chocolate cake and fed Ashu the 1st piece', icon: '🎂' },
  { id: 'b_roast', title: 'Roast Survivor', desc: 'Survived Ashu and Deepak in the Roast Royale Quiz', icon: '🔥' },
  { id: 'b_cofounder', title: 'Trusted Co-Founder', desc: 'Signed the Founder\'s Pact & accepted the Next Mission', icon: '🤝' }
];

export const PHASES_DEF = [
  { id: 0, label: 'PHASE 00', title: 'Midnight Lock' },
  { id: 1, label: 'PHASE 01', title: 'Time Portal' },
  { id: 2, label: 'PHASE 02', title: 'Identity Room' },
  { id: 3, label: 'PHASE 03', title: 'Hint Quest' },
  { id: 4, label: 'PHASE 04', title: 'Biometric Scan' },
  { id: 5, label: 'PHASE 05', title: 'World Hub' },
  { id: 6, label: 'PHASE 06', title: 'Story Chapters' },
  { id: 7, label: 'PHASE 07', title: 'Memory Gallery' },
  { id: 8, label: 'PHASE 08', title: '3D Cake Room' },
  { id: 9, label: 'PHASE 09', title: 'Wishes Theatre' },
  { id: 10, label: 'PHASE 10', title: 'Emotional Letter' },
  { id: 11, label: 'PHASE 11', title: 'Promise Vault' },
  { id: 12, label: 'PHASE 12', title: 'Gift Mini-Games' },
  { id: 13, label: 'PHASE 13', title: 'Fake Gift Reveals' },
  { id: 14, label: 'PHASE 14', title: 'Real Gifts Claim' },
  { id: 15, label: 'PHASE 15', title: 'Roast Royale Quiz' },
  { id: 16, label: 'PHASE 16', title: 'Badges Showcase' },
  { id: 17, label: 'PHASE 17', title: 'Download Birthday Card' },
  { id: 18, label: 'PHASE 18', title: 'Main Ending: Next Mission' },
  { id: 19, label: 'PHASE 19', title: 'Movie Credits' },
  { id: 20, label: 'PHASE 20', title: 'Post-Credit & Terminal' }
];

class StateManager {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    const defaultState = {
      currentPhase: 0,
      unlockedPhases: [0],
      soundEnabled: false,
      reduceMotion: false,
      lowGraphics: false,
      newGamePlus: false,
      badges: [],
      fragments: [],
      passwordFragments: {
        f01: false, // 09
        f02: false, // 03
        f03: false  // WEB
      },
      verified: false,
      cakeCut: false,
      ashuFedFirstPiece: false,
      promisesAccepted: false,
      giftsClaimed: false,
      quizScore: { correct: 0, deepakRoasts: 0, title: 'Certified Co-Founder' }
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultState;
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // State Mutators
  setPhase(phaseIndex) {
    if (phaseIndex < 0 || phaseIndex > 20) return;
    this.state.currentPhase = phaseIndex;
    if (!this.state.unlockedPhases.includes(phaseIndex)) {
      this.state.unlockedPhases.push(phaseIndex);
    }
    this.save();
  }

  unlockBadge(badgeId) {
    if (!this.state.badges.includes(badgeId)) {
      this.state.badges.push(badgeId);
      const def = BADGES_DEF.find(b => b.id === badgeId);
      this.showToast(`🏆 Badge Unlocked: ${def ? def.title : badgeId}`, 'toast-badge');
      this.save();
    }
  }

  collectFragment(fragId) {
    if (!this.state.fragments.includes(fragId)) {
      this.state.fragments.push(fragId);
      this.showToast(`🕸️ Web Fragment Discovered (${this.state.fragments.length}/6)!`, 'toast-success');
      if (this.state.fragments.length === 6) {
        this.unlockBadge('b_web');
        this.showToast(`🌟 Secret Classified Memory Unlocked!`, 'toast-badge');
      }
      this.save();
    }
  }

  setPasswordFragment(key, val = true) {
    this.state.passwordFragments[key] = val;
    this.save();
  }

  setVerified(val = true) {
    this.state.verified = val;
    this.unlockBadge('b_identity');
    this.save();
  }

  toggleSound(forceVal = null) {
    this.state.soundEnabled = forceVal !== null ? forceVal : !this.state.soundEnabled;
    this.save();
    return this.state.soundEnabled;
  }

  toggleReduceMotion(forceVal = null) {
    this.state.reduceMotion = forceVal !== null ? forceVal : !this.state.reduceMotion;
    if (this.state.reduceMotion) {
      document.body.classList.add('reduce-motion-active');
    } else {
      document.body.classList.remove('reduce-motion-active');
    }
    this.save();
    return this.state.reduceMotion;
  }

  toggleLowGraphics(forceVal = null) {
    this.state.lowGraphics = forceVal !== null ? forceVal : !this.state.lowGraphics;
    this.save();
    return this.state.lowGraphics;
  }

  enableNewGamePlus() {
    this.state.newGamePlus = true;
    for (let i = 0; i <= 20; i++) {
      if (!this.state.unlockedPhases.includes(i)) {
        this.state.unlockedPhases.push(i);
      }
    }
    this.save();
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadInitialState();
    this.save();
    window.location.reload();
  }

  showToast(message, type = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

export const state = new StateManager();
