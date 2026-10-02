/* ==========================================================================
   RAHAT KHAN — FULL-SCREEN 3D WARP PORTAL & HYPER-ADVANCED TRANSITION ENGINE
   100% Viewport Covering Hyperspace Vortex & Multi-Layered Slat Mechanics
   ========================================================================== */

export function init3DSectionTransitions() {
  init3DScrollObserver();
  init3DCardParallaxTilt();
  init3DBespokeSectionTransitions();
  initFullScreenAmbientCanvasMesh();
}

// 1. 3D Scroll Observer for Staggered Row & Column Entrances
function init3DScrollObserver() {
  const sections = document.querySelectorAll('section[id], .section, .stats-section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerSectionColumnRow3D(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.08
    });

    sections.forEach(sec => {
      sec.classList.add('section-3d-container');
      observer.observe(sec);
    });
  } else {
    sections.forEach(sec => triggerSectionColumnRow3D(sec));
  }
}

// 2. Stagger 3D Columns and Rows inside the arriving Section
export function triggerSectionColumnRow3D(sectionEl, sectionType = 'default') {
  if (!sectionEl) return;
  sectionEl.classList.add('section-3d-in-view');

  const cards = sectionEl.querySelectorAll(
    '.software-card, .project-card, .workflow-card, .stat-card, .about-card, .contact-card, .home-studio-deck'
  );

  cards.forEach((card, index) => {
    const colIndex = index % 3;
    const rowIndex = Math.floor(index / 3);
    card.style.setProperty('--col-idx', colIndex);
    card.style.setProperty('--row-idx', rowIndex);

    card.classList.remove(
      'matrix-3d-card-reveal',
      'reveal-home-vortex',
      'reveal-about-origami',
      'reveal-skills-equalizer',
      'reveal-portfolio-filmstrip',
      'reveal-contact-radar'
    );
    void card.offsetWidth;

    if (sectionType === 'home') {
      card.classList.add('reveal-home-vortex');
    } else if (sectionType === 'about') {
      card.classList.add('reveal-about-origami');
    } else if (sectionType === 'skills') {
      card.classList.add('reveal-skills-equalizer');
    } else if (sectionType === 'portfolio') {
      card.classList.add('reveal-portfolio-filmstrip');
    } else if (sectionType === 'contact') {
      card.classList.add('reveal-contact-radar');
    } else {
      card.classList.add('matrix-3d-card-reveal');
    }
  });

  sectionEl.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('revealed');
  });
}

// 3. Dynamic 3D Card Parallax Tilt with Realtime Glass Glare Reflections
export function init3DCardParallaxTilt() {
  function attachTilt() {
    const tiltElements = document.querySelectorAll(
      '.stat-card, .workflow-card, .software-card, .project-card, .contact-section-wrapper, .home-studio-deck, .about-card'
    );

    tiltElements.forEach(card => {
      if (card.dataset.tiltAttached) return;
      card.dataset.tiltAttached = 'true';
      card.classList.add('tilt-3d-card');

      // Inject 3D glare shine overlay
      if (!card.querySelector('.card-glare-reflection')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare-reflection';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;

        // Update glare position
        const glare = card.querySelector('.card-glare-reflection');
        if (glare) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`;
          glare.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        const glare = card.querySelector('.card-glare-reflection');
        if (glare) glare.style.opacity = '0';
      });
    });
  }

  attachTilt();
  const observer = new MutationObserver(attachTilt);
  observer.observe(document.body, { childList: true, subtree: true });
}

// 4. FULL-SCREEN 3D WARP PORTAL CANVAS (100% Screen Covering Lightspeed Vortex)
function initFullScreenAmbientCanvasMesh() {
  // Built into page for subtle ambient warp depth
}

// 5. Full-Screen Covering 3D Transition Engine
function init3DBespokeSectionTransitions() {
  let curtain = document.getElementById('matrix-3d-transition');
  if (!curtain) {
    curtain = document.createElement('div');
    curtain.id = 'matrix-3d-transition';
    curtain.className = 'matrix-3d-transition';
    curtain.innerHTML = `
      <!-- Full-Screen Covering Canvas Warp Tunnel -->
      <canvas id="warp-portal-canvas" class="warp-portal-canvas"></canvas>

      <!-- Full-Screen 3D Shutter Slats Layer (100% Screen Coverage) -->
      <div class="full-screen-slats-layer">
        <div class="fs-slat fs-1"></div>
        <div class="fs-slat fs-2"></div>
        <div class="fs-slat fs-3"></div>
        <div class="fs-slat fs-4"></div>
        <div class="fs-slat fs-5"></div>
        <div class="fs-slat fs-6"></div>
      </div>

      <!-- Holographic Cyber HUD Grid Overlay -->
      <div class="fs-hud-overlay">
        <div class="fs-hud-frame">
          <div class="fs-hud-bracket tl"></div>
          <div class="fs-hud-bracket tr"></div>
          <div class="fs-hud-bracket bl"></div>
          <div class="fs-hud-bracket br"></div>
          <div class="fs-hud-tag" id="fs-warp-status-tag">INITIALIZING 3D QUANTUM WARP...</div>
        </div>
      </div>

      <!-- 1. Home: Aperture Vortex Zoom Rings -->
      <div class="warp-fx-home">
        <div class="aperture-ring r1"></div>
        <div class="aperture-ring r2"></div>
        <div class="aperture-ring r3"></div>
        <div class="aperture-laser-flash"></div>
      </div>

      <!-- 2. About: 3D Origami Diagonal Matrix Slats -->
      <div class="warp-fx-about">
        <div class="diagonal-slat s1"></div>
        <div class="diagonal-slat s2"></div>
        <div class="diagonal-slat s3"></div>
        <div class="diagonal-slat s4"></div>
        <div class="biometric-scanner-beam"></div>
      </div>

      <!-- 3. Skills: 3D Cyber Audio Equalizer Slat Matrix -->
      <div class="warp-fx-skills">
        <div class="eq-slat eq-1"></div>
        <div class="eq-slat eq-2"></div>
        <div class="eq-slat eq-3"></div>
        <div class="eq-slat eq-4"></div>
        <div class="eq-slat eq-5"></div>
        <div class="cyber-matrix-grid-burst"></div>
      </div>

      <!-- 4. Portfolio: Cinematic 35mm Filmstrip Horizontal Slide -->
      <div class="warp-fx-portfolio">
        <div class="filmstrip-curtain top-strip">
          <span class="sprocket"></span><span class="sprocket"></span><span class="sprocket"></span><span class="sprocket"></span>
        </div>
        <div class="filmstrip-curtain main-blade"></div>
        <div class="filmstrip-curtain btm-strip">
          <span class="sprocket"></span><span class="sprocket"></span><span class="sprocket"></span><span class="sprocket"></span>
        </div>
        <div class="anamorphic-flare-sweep"></div>
      </div>

      <!-- 5. Contact: Concentric Holographic Radar Sonar Wave -->
      <div class="warp-fx-contact">
        <div class="radar-pulse rp1"></div>
        <div class="radar-pulse rp2"></div>
        <div class="radar-crosshair"></div>
        <div class="cyber-signal-sweep"></div>
      </div>
    `;
    document.body.appendChild(curtain);
  }

  // Setup Portal Canvas Vortex Engine
  const portalCanvas = document.getElementById('warp-portal-canvas');
  let portalCtx = null;
  let pW = 0, pH = 0;
  let portalAnimId = null;
  const warpStars = [];

  if (portalCanvas) {
    portalCtx = portalCanvas.getContext('2d');
    const resizePortal = () => {
      pW = portalCanvas.width = window.innerWidth;
      pH = portalCanvas.height = window.innerHeight;
    };
    resizePortal();
    window.addEventListener('resize', resizePortal);

    // Generate 120 radial hyperspace streaks
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      warpStars.push({
        x: Math.cos(angle) * (Math.random() * 20 + 5),
        y: Math.sin(angle) * (Math.random() * 20 + 5),
        angle,
        speed: Math.random() * 12 + 6,
        length: Math.random() * 60 + 20,
        color: Math.random() > 0.4 ? '#ef4444' : '#ffffff'
      });
    }
  }

  function startPortalWarpAnimation() {
    if (!portalCtx) return;
    let frame = 0;

    function renderPortal() {
      if (!curtain.classList.contains('matrix-active')) return;
      frame++;

      portalCtx.fillStyle = 'rgba(8, 8, 12, 0.25)';
      portalCtx.fillRect(0, 0, pW, pH);

      const cx = pW / 2;
      const cy = pH / 2;

      portalCtx.save();
      portalCtx.translate(cx, cy);

      warpStars.forEach(s => {
        const prevX = s.x;
        const prevY = s.y;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.speed *= 1.05; // Accelerate outwards

        portalCtx.beginPath();
        portalCtx.moveTo(prevX, prevY);
        portalCtx.lineTo(s.x, s.y);
        portalCtx.strokeStyle = s.color;
        portalCtx.lineWidth = 2.5;
        portalCtx.shadowColor = s.color;
        portalCtx.shadowBlur = 10;
        portalCtx.stroke();

        // Reset if out of bounds
        if (Math.hypot(s.x, s.y) > Math.max(pW, pH)) {
          s.x = Math.cos(s.angle) * (Math.random() * 20 + 5);
          s.y = Math.sin(s.angle) * (Math.random() * 20 + 5);
          s.speed = Math.random() * 10 + 5;
        }
      });

      portalCtx.restore();

      if (frame < 60) {
        portalAnimId = requestAnimationFrame(renderPortal);
      }
    }

    if (portalAnimId) cancelAnimationFrame(portalAnimId);
    portalAnimId = requestAnimationFrame(renderPortal);
  }

  // Master Warp Trigger Router
  window.trigger3DSectionWarp = function(targetSectionId) {
    const sectionName = (targetSectionId || 'home').toLowerCase().replace('#', '');
    
    // Update HUD text readout
    const statusTag = document.getElementById('fs-warp-status-tag');
    if (statusTag) {
      statusTag.textContent = `WARPING TO SEQUENCE // [ ${sectionName.toUpperCase()} ]`;
    }

    // Reset and trigger full-screen curtain
    curtain.className = 'matrix-3d-transition';
    void curtain.offsetWidth; // Reflow
    curtain.classList.add('matrix-active', `warp-${sectionName}`);

    // Launch lights-speed canvas warp tunnel
    startPortalWarpAnimation();

    // Trigger destination section's layout animations
    const targetEl = document.getElementById(sectionName);
    if (targetEl) {
      setTimeout(() => {
        triggerSectionColumnRow3D(targetEl, sectionName);
      }, 220);
    }

    // Camera 3D Push on whole portfolio viewport
    const app = document.querySelector('.app-container') || document.body;
    app.classList.remove('app-3d-warping', 'app-warp-home', 'app-warp-about', 'app-warp-skills', 'app-warp-portfolio', 'app-warp-contact');
    void app.offsetWidth;
    app.classList.add('app-3d-warping', `app-warp-${sectionName}`);
    setTimeout(() => {
      app.classList.remove('app-3d-warping', `app-warp-${sectionName}`);
    }, 750);

    // Audio SFX
    if (window.playUiSound) window.playUiSound('whoosh');

    // Auto dismiss transition curtain
    setTimeout(() => {
      curtain.classList.remove('matrix-active', `warp-${sectionName}`);
    }, 950);
  };
}
