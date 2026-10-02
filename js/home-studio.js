/* ==========================================================================
   RAHAT KHAN — NEXT-GEN HOME STUDIO DECK (ULTRA ADVANCED INTERACTIVE ENGINE)
   ========================================================================== */

export function initHomeStudio() {
  initStudioTabs();
  initColorGradeSlider();
  initLutPresets();
  initAspectRatioSwitcher();
  initSpeedRampControls();
  initSoundStemMixer();
  initParallaxVfx();
  initShowreelPlayer();
}

// 1. Studio Deck Mode Tabs Switcher
function initStudioTabs() {
  const tabs = document.querySelectorAll('.studio-tab-btn');
  const panels = document.querySelectorAll('.studio-panel-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-studio-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`studio-panel-${mode}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      if (window.playUiSound) window.playUiSound('click');
    });
  });
}

// 2. Interactive Before / After Color Grading Slider
function initColorGradeSlider() {
  const container = document.getElementById('grading-comparison-container');
  const handle = document.getElementById('grading-slider-handle');
  const beforeLayer = document.getElementById('grading-layer-before');
  const labelBefore = document.getElementById('grading-label-before');
  const labelAfter = document.getElementById('grading-label-after');

  if (!container || !handle || !beforeLayer) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    handle.style.left = `${percentage}%`;
    beforeLayer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
  }

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Support
  handle.addEventListener('touchstart', () => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Interactive Click on container
  container.addEventListener('click', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    updateSliderPosition(e.clientX);
  });
}

// 3. LUT Presets Switcher with Real-Time Canvas Grading
const LUT_PRESETS = {
  'cine-teal': {
    name: 'Teal & Orange Blockbuster',
    filter: 'contrast(125%) saturate(140%) hue-rotate(-8deg) brightness(105%)',
    overlay: 'linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(249, 115, 22, 0.25) 100%)',
    rgb: { r: 85, g: 70, b: 90 }
  },
  'kodak-2383': {
    name: 'Kodak 2383 35mm Film',
    filter: 'contrast(115%) saturate(120%) sepia(20%) brightness(98%)',
    overlay: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%)',
    rgb: { r: 92, g: 78, b: 60 }
  },
  'cyberpunk': {
    name: 'Cyberpunk Neon Noir',
    filter: 'contrast(140%) saturate(180%) hue-rotate(45deg) brightness(110%)',
    overlay: 'linear-gradient(120deg, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)',
    rgb: { r: 98, g: 45, b: 95 }
  },
  'monochrome': {
    name: 'High-Contrast B&W Master',
    filter: 'grayscale(100%) contrast(165%) brightness(102%)',
    overlay: 'radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.7) 100%)',
    rgb: { r: 80, g: 80, b: 80 }
  }
};

function initLutPresets() {
  const lutBtns = document.querySelectorAll('.lut-preset-pill');
  const gradeTarget = document.getElementById('grading-target-after');
  const gradeOverlay = document.getElementById('grading-lut-overlay');
  const lutTitleDisplay = document.getElementById('active-lut-name');
  const scopeR = document.getElementById('scope-bar-r');
  const scopeG = document.getElementById('scope-bar-g');
  const scopeB = document.getElementById('scope-bar-b');

  lutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lutBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const lutKey = btn.getAttribute('data-lut');
      const lut = LUT_PRESETS[lutKey] || LUT_PRESETS['cine-teal'];

      if (gradeTarget) gradeTarget.style.filter = lut.filter;
      if (gradeOverlay) gradeOverlay.style.background = lut.overlay;
      if (lutTitleDisplay) lutTitleDisplay.textContent = lut.name;

      if (scopeR) scopeR.style.height = `${lut.rgb.r}%`;
      if (scopeG) scopeG.style.height = `${lut.rgb.g}%`;
      if (scopeB) scopeB.style.height = `${lut.rgb.b}%`;

      if (window.playUiSound) window.playUiSound('click');
    });
  });
}

// 4. Aspect Ratio Switcher (16:9, 9:16, 2.39:1, 1:1)
function initAspectRatioSwitcher() {
  const ratioBtns = document.querySelectorAll('.ratio-switcher-btn');
  const ratioFrame = document.getElementById('showreel-viewport-frame');
  const ratioLabel = document.getElementById('active-ratio-tag');

  ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ratioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const ratio = btn.getAttribute('data-ratio');
      if (ratioFrame) {
        ratioFrame.className = 'showreel-viewport-frame ' + `ratio-${ratio}`;
      }
      if (ratioLabel) {
        ratioLabel.textContent = btn.getAttribute('data-label') || ratio.toUpperCase();
      }

      if (window.playUiSound) window.playUiSound('whoosh');
    });
  });
}

// 5. Velocity Ramping & Speed Simulation
function initSpeedRampControls() {
  const speedBtns = document.querySelectorAll('.speed-ramp-btn');
  const videoCanvas = document.getElementById('home-reel-canvas');
  const speedDisplay = document.getElementById('active-speed-tag');

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const speed = btn.getAttribute('data-speed');
      if (speedDisplay) speedDisplay.textContent = `${speed}X VELOCITY`;

      if (videoCanvas) {
        if (speed === '0.5') {
          videoCanvas.style.filter = 'blur(0px) brightness(1.1)';
        } else if (speed === '2.5') {
          videoCanvas.style.filter = 'contrast(120%) brightness(1.15)';
        } else {
          videoCanvas.style.filter = '';
        }
      }

      if (window.playUiSound) window.playUiSound('click');
    });
  });
}

// 6. 4-Track Sound Design Stem Mixer Simulation
function initSoundStemMixer() {
  const muteBtns = document.querySelectorAll('.stem-mute-btn');
  const faders = document.querySelectorAll('.stem-fader-input');

  muteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('muted');
      const isMuted = btn.classList.contains('muted');
      btn.textContent = isMuted ? 'MUTED' : 'LIVE';

      const row = btn.closest('.stem-track-row');
      if (row) {
        row.classList.toggle('track-disabled', isMuted);
      }

      if (window.playUiSound) window.playUiSound('click');
    });
  });

  faders.forEach(fader => {
    fader.addEventListener('input', () => {
      const val = fader.value;
      const volTag = fader.parentElement.querySelector('.stem-vol-val');
      if (volTag) volTag.textContent = `${val}dB`;
    });
  });

  // Sound FX Instant Trigger
  document.querySelectorAll('.sfx-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sfxType = btn.getAttribute('data-sfx');
      if (window.playUiSound) {
        window.playUiSound(sfxType || 'whoosh');
      }

      btn.classList.add('pulse-active');
      setTimeout(() => btn.classList.remove('pulse-active'), 400);
    });
  });
}

// 7. 3D Parallax & Motion Tracker simulation
function initParallaxVfx() {
  const card = document.getElementById('studio-panel-vfx');
  const target3d = document.getElementById('vfx-3d-hologram');
  if (!card || !target3d) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    target3d.style.transform = `perspective(1000px) rotateY(${x * 24}deg) rotateX(${-y * 24}deg) scale(1.04)`;
  });

  card.addEventListener('mouseleave', () => {
    target3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// 8. Interactive Showreel Canvas Player Loop
function initShowreelPlayer() {
  const canvas = document.getElementById('home-reel-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = 640;
  let height = canvas.height = 360;
  let frame = 0;

  function render() {
    frame++;
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);

    // Dynamic Cinematic Laser Grid & Particles
    const t = frame * 0.03;

    // Glowing Horizon Beam
    const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, height * 0.4, width, height * 0.6);

    // Geometric Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 40) {
      const offsetX = (x + Math.sin(t + x) * 6) % width;
      ctx.beginPath();
      ctx.moveTo(offsetX, height * 0.4);
      ctx.lineTo((offsetX - width / 2) * 2 + width / 2, height);
      ctx.stroke();
    }

    // Central Cinematic Logo Mark & Text
    ctx.save();
    ctx.translate(width / 2, height / 2 - 10);
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 18;

    // Outer Monogram Ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 48 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
    ctx.stroke();

    // Central Monogram
    ctx.fillStyle = '#ffffff';
    ctx.font = "900 32px 'Cinzel', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RK', 0, 0);

    ctx.restore();

    // Bottom Timecode & HUD
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = "11px 'JetBrains Mono', monospace";
    ctx.textAlign = 'left';
    const hours = '00';
    const mins = String(Math.floor((frame / 60) / 60)).padStart(2, '0');
    const secs = String(Math.floor((frame / 60) % 60)).padStart(2, '0');
    const frames = String(frame % 60).padStart(2, '0');
    ctx.fillText(`TC // ${hours}:${mins}:${secs}:${frames} // 4K 60FPS MASTER`, 20, height - 20);

    // Audio level meter bars inside canvas
    for (let i = 0; i < 18; i++) {
      const barH = 4 + Math.abs(Math.sin(t * 3 + i * 0.4)) * 22;
      ctx.fillStyle = i > 14 ? '#ef4444' : 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(width - 160 + i * 8, height - 16 - barH, 5, barH);
    }

    requestAnimationFrame(render);
  }

  render();
}
