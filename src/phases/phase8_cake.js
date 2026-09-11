/* ==========================================================================
   PHASE 8: 3D Celebration Room (Three.js Web Cake & Runaway "No" Button Joke)
   ========================================================================== */

import * as THREE from 'three';
import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { canvasFx } from '../core/canvasFx.js';
import { decorations } from '../core/decorations.js';

export function renderPhase8(container, onNext) {
  let isCandleLit = true;
  let isCakeCut = false;
  let noAttempts = 0;
  let animId = null;

  container.innerHTML = `
    <div class="phase-scene cake-scene fade-in">
      <div class="midnight-badge" style="position: absolute; top: 16px; z-index: 10;">
        <span>🎂</span>
        <span>CELEBRATION PROTOCOL • PHASE 08</span>
      </div>

      <div class="cake-canvas-container" id="cake-3d-host"></div>

      <!-- Cake Control Actions -->
      <div class="cake-hud-controls" id="cake-controls">
        <button id="btn-light-candle" class="btn-secondary" style="min-height: 44px;">
          <span>🔥</span>
          <span id="light-label">Relight Candle</span>
        </button>
        <button id="btn-blow-candle" class="btn-gold" style="min-height: 44px;">
          <span>💨</span>
          <span>Blow Candle</span>
        </button>
        <button id="btn-cut-cake" class="btn-primary" style="min-height: 44px;">
          <span>🔪</span>
          <span>Cut Birthday Cake</span>
        </button>
      </div>

      <!-- First Piece Comedy Modal -->
      <div id="first-piece-modal" class="first-piece-modal hidden">
        <div class="first-piece-card">
          <div style="font-size: 44px; margin-bottom: 8px;">🍰</div>
          <h2 style="font-family: var(--font-heading); font-size: 24px; color: #fff;">
            First piece naake thinipisthav kada?
          </h2>
          <p id="first-piece-quote" style="color: var(--text-secondary); font-size: 14px; margin: 12px 0 20px 0;">
            CodeXa tradition requires the Co-Founder to feed the Founder first.
          </p>
          <div class="first-piece-btns" id="first-piece-btn-group">
            <button id="btn-cake-yes" class="btn-primary" style="min-height: 48px; padding: 0 28px;">
              Of course, Ashu ❤️
            </button>
            <button id="btn-cake-no" class="btn-secondary" style="min-height: 48px; padding: 0 24px;">
              No 🙅‍♂️
            </button>
          </div>
        </div>
      </div>

      <button id="btn-skip-cake" class="btn-skip">Skip Cake Room →</button>
    </div>
  `;

  const host = container.querySelector('#cake-3d-host');
  const btnBlow = container.querySelector('#btn-blow-candle');
  const btnLight = container.querySelector('#btn-light-candle');
  const btnCut = container.querySelector('#btn-cut-cake');
  const modal = container.querySelector('#first-piece-modal');
  const btnYes = container.querySelector('#btn-cake-yes');
  const btnNo = container.querySelector('#btn-cake-no');
  const quoteEl = container.querySelector('#first-piece-quote');
  const btnSkip = container.querySelector('#btn-skip-cake');

  // ------------------------------------------------------------------------
  // Three.js 3D Cake Scene Setup
  // ------------------------------------------------------------------------
  let renderer, scene, camera, cakeGroup, flameMesh, sliceMesh;
  const width = host.clientWidth || 600;
  const height = host.clientHeight || 400;

  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0.5, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xff274d, 2.5);
    spotLight.position.set(5, 12, 5);
    scene.add(spotLight);

    const blueLight = new THREE.PointLight(0x247bff, 2, 20);
    blueLight.position.set(-5, 4, -3);
    scene.add(blueLight);

    cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Cake Base (Dark Chocolate Cylinder)
    const cakeGeo = new THREE.CylinderGeometry(3.2, 3.2, 1.8, 48);
    const cakeMat = new THREE.MeshStandardMaterial({
      color: 0x161210,
      roughness: 0.4,
      metalness: 0.2
    });
    const cakeBase = new THREE.Mesh(cakeGeo, cakeMat);
    cakeGroup.add(cakeBase);

    // Crimson & Blue Web Lattice Rings
    const ringGeo1 = new THREE.TorusGeometry(3.25, 0.08, 16, 64);
    const ringMatRed = new THREE.MeshStandardMaterial({ color: 0xd90429, emissive: 0xd90429, emissiveIntensity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMatRed);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 0.5;
    cakeGroup.add(ring1);

    const ringMatBlue = new THREE.MeshStandardMaterial({ color: 0x247bff, emissive: 0x247bff, emissiveIntensity: 0.6 });
    const ring2 = new THREE.Mesh(ringGeo1, ringMatBlue);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -0.5;
    cakeGroup.add(ring2);

    // Cake Cutting Slice Mesh (Separates on cut)
    const sliceGeo = new THREE.CylinderGeometry(3.22, 3.22, 1.82, 16, 1, false, 0, Math.PI / 4);
    const sliceMat = new THREE.MeshStandardMaterial({ color: 0x241d18, roughness: 0.3 });
    sliceMesh = new THREE.Mesh(sliceGeo, sliceMat);
    cakeGroup.add(sliceMesh);

    // Candle
    const candleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
    const candleMat = new THREE.MeshStandardMaterial({ color: 0xf4c95d, roughness: 0.3 });
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(0, 1.5, 0);
    cakeGroup.add(candle);

    // Flame
    const flameGeo = new THREE.ConeGeometry(0.18, 0.45, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, 2.3, 0);
    cakeGroup.add(flameMesh);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    host.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    });
    window.addEventListener('mouseup', () => isDragging = false);
    host.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        cakeGroup.rotation.y += deltaX * 0.01;
        prevMouseX = e.clientX;
      }
    });

    // Render loop
    const animate = () => {
      if (!isDragging && !state.state.reduceMotion) {
        cakeGroup.rotation.y += 0.005;
      }
      if (flameMesh && isCandleLit) {
        flameMesh.scale.set(
          1 + Math.sin(Date.now() * 0.01) * 0.15,
          1 + Math.cos(Date.now() * 0.015) * 0.2,
          1
        );
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();
  } catch (err) {
    console.warn('Three.js fallback active:', err);
    host.innerHTML = `
      <div style="font-size: 96px; line-height: 1; padding: 40px;">🎂</div>
      <div style="font-family: var(--font-cinematic); font-size: 24px; color: var(--accent-gold);">HBD SANJAY</div>
    `;
  }

  // ------------------------------------------------------------------------
  // Interactions: Light & Blow Candles
  // ------------------------------------------------------------------------
  btnLight.addEventListener('click', () => {
    isCandleLit = true;
    if (flameMesh) flameMesh.visible = true;
    audio.playTone(600, 'triangle', 0.2);
  });

  btnBlow.addEventListener('click', () => {
    isCandleLit = false;
    if (flameMesh) flameMesh.visible = false;
    audio.playFanfare();
    canvasFx.burstCelebration();
    state.unlockBadge('b_cake');
  });

  // ------------------------------------------------------------------------
  // Cut Cake Interaction
  // ------------------------------------------------------------------------
  btnCut.addEventListener('click', () => {
    if (isCakeCut) return;
    isCakeCut = true;
    audio.playSuccess();
    decorations.triggerCelebrationBurst();
    canvasFx.burstCelebration();

    if (sliceMesh) {
      // Separate slice outwards
      let dist = 0;
      const moveSlice = () => {
        dist += 0.05;
        sliceMesh.position.x = Math.sin(Math.PI / 8) * dist;
        sliceMesh.position.z = Math.cos(Math.PI / 8) * dist;
        if (dist < 1.4) requestAnimationFrame(moveSlice);
      };
      moveSlice();
    }

    // Reveal the "First piece naake thinipisthav kada?" comedy modal
    setTimeout(() => {
      modal.classList.remove('hidden');
    }, 900);
  });

  // ------------------------------------------------------------------------
  // Runaway "No" Button Comedy Sequence
  // ------------------------------------------------------------------------
  const quotes = [
    "Agency build chesam, cake piece kuda ledha? 🥺",
    "GTA VI promise cancel screen open cheyyala? 🎮",
    "Final warning! Friendship server unstable! ⚠️",
    "Okay, Ashu gets the first piece. You had no choice! 😎"
  ];

  btnNo.addEventListener('click', () => {
    noAttempts++;
    audio.playTone(340, 'square', 0.1);

    if (noAttempts === 1) {
      btnNo.style.transform = 'translate(60px, -20px)';
      quoteEl.textContent = quotes[0];
    } else if (noAttempts === 2) {
      btnNo.style.transform = 'translate(-80px, 20px)';
      quoteEl.textContent = quotes[1];
    } else if (noAttempts === 3) {
      btnNo.style.transform = 'scale(0.8) translate(30px, 30px)';
      quoteEl.textContent = quotes[2];
    } else {
      btnNo.textContent = 'Okay, Ashu Gets It 🤝';
      quoteEl.textContent = quotes[3];
      btnNo.classList.remove('btn-secondary');
      btnNo.classList.add('btn-primary');
      btnNo.onclick = () => finishCake();
    }
  });

  const finishCake = () => {
    audio.playFanfare();
    canvasFx.burstCelebration();
    modal.classList.add('hidden');
    state.unlockBadge('b_cake');
    setTimeout(onNext, 1200);
  };

  btnYes.addEventListener('click', finishCake);
  btnSkip.addEventListener('click', () => {
    audio.playSuccess();
    onNext();
  });

  return () => {
    if (animId) cancelAnimationFrame(animId);
  };
}
