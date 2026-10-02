/* ==========================================================================
   RAHAT KHAN — CINEMATIC INTRO & BACKGROUND ANIMATION ENGINE
   ========================================================================== */

export function initIntro() {
  const introScreen = document.getElementById('intro-screen');
  const monogram = document.getElementById('intro-monogram');
  const name = document.getElementById('intro-name');
  const role = document.getElementById('intro-role');
  const progressBar = document.getElementById('intro-progress-bar');
  const progressPercent = document.getElementById('intro-progress-percent');
  const timecodeEl = document.getElementById('intro-timecode');
  const skipBtn = document.getElementById('intro-skip-btn');
  const canvas = document.getElementById('intro-bg-canvas');
  const logoMark = document.querySelector('.nav-logo-mark');

  if (!introScreen) return;

  let isSkipped = false;
  const introDuration = 1500; // 1.5 seconds total (faster)
  let startTime = null;
  let animId = null;

  // --- 1. Background Cinematic Particle & Shockwave Canvas ---
  let ctx = null;
  let w = 0, h = 0;
  const shockwaves = [];
  const sparks = [];

  if (canvas) {
    ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 20; i++) {
      sparks.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        alpha: Math.random() * 0.7 + 0.3,
        glow: Math.random() > 0.6
      });
    }
  }

  function addShockwave(centerX, centerY, maxRadius, color = '#ffffff') {
    shockwaves.push({
      x: centerX || w / 2,
      y: centerY || h / 2,
      radius: 5,
      maxRadius: maxRadius || Math.min(w, h) * 0.6,
      color,
      alpha: 1
    });
  }

  function burstEmbers(centerX, centerY, count = 15) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6.5 + 2;
      sparks.push({
        x: centerX || w / 2,
        y: centerY || h / 2,
        size: Math.random() * 3.5 + 1.2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        alpha: 1,
        glow: true,
        decay: Math.random() * 0.025 + 0.015
      });
    }
  }

  function renderIntroCanvas() {
    if (!ctx || !introScreen || introScreen.classList.contains('hidden')) return;

    ctx.clearRect(0, 0, w, h);

    // Radial dark vignette
    const radGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.75);
    radGrad.addColorStop(0, 'rgba(28, 28, 40, 0.4)');
    radGrad.addColorStop(0.5, 'rgba(10, 10, 15, 0.85)');
    radGrad.addColorStop(1, 'rgba(4, 4, 6, 0.98)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, w, h);

    // Sparks / energetic floating embers
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.speedX;
      s.y += s.speedY;

      if (s.decay) {
        s.alpha -= s.decay;
        s.speedX *= 0.95;
        s.speedY *= 0.95;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
      } else {
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.glow ? `rgba(255, 255, 255, ${Math.max(s.alpha, 0)})` : `rgba(180, 180, 210, ${Math.max(s.alpha * 0.6, 0)})`;
      ctx.fill();
    }

    // Rotating Holographic Aperture Rings around center
    const t = Date.now() * 0.0015;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    
    // Outer dashed ring
    ctx.beginPath();
    ctx.arc(0, 0, 160 + Math.sin(t * 2) * 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 12]);
    ctx.rotate(t * 0.5);
    ctx.stroke();

    // Inner dashed ring (counter-rotating)
    ctx.beginPath();
    ctx.arc(0, 0, 120 + Math.cos(t * 2) * 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.rotate(-t * 1.2);
    ctx.stroke();

    ctx.restore();

    // Shockwaves radiating from the center logo
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.07;
      sw.alpha -= 0.018;

      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(sw.alpha, 0)})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Outer color echo
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius * 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 0, 0, ${Math.max(sw.alpha * 0.6, 0)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius - 2) {
        shockwaves.splice(i, 1);
      }
    }

    // Dynamic light ray beams in center
    const time = Date.now() * 0.002;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI / 6) + time * 0.15;
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(160 + Math.sin(time * 2 + i) * 40, 0);
      ctx.strokeStyle = (i % 2 === 0) ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.04)';
      ctx.lineWidth = 25;
      ctx.stroke();
      ctx.rotate(-angle);
    }
    ctx.restore();

    // Sweeping Horizontal Laser Scanner Line
    const scanY = ((Date.now() * 0.25) % (h + 100)) - 50;
    const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
    scanGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 15, w, 30);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, scanY, w, 1.5);

    // Anamorphic horizontal lens flare streak through center
    const flareAlpha = Math.max(0, 0.25 + Math.sin(t * 3) * 0.15);
    const flareGrad = ctx.createLinearGradient(0, h / 2, w, h / 2);
    flareGrad.addColorStop(0, 'transparent');
    flareGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.08)');
    flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
    flareGrad.addColorStop(0.6, 'rgba(239, 68, 68, 0.08)');
    flareGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, (h / 2) - 1.5, w, 3);

    animId = requestAnimationFrame(renderIntroCanvas);
  }

  // --- 2. Step Sequence Logic (Pure Cinematic RK -> RAHAT KHAN) ---
  function runIntro() {
    introScreen.classList.remove('hidden');
    introScreen.style.display = 'flex';
    isSkipped = false;
    startTime = performance.now();

    if (monogram) {
      monogram.style.display = 'block';
      monogram.style.opacity = '0';
      monogram.style.transform = 'scale(0.8)';
    }
    if (name) {
      name.style.display = 'none';
      name.style.opacity = '0';
      name.style.transform = 'translateY(20px)';
    }

    renderIntroCanvas();

    // Sound effect trigger
    if (window.playUiSound) window.playUiSound('whoosh');

    // Phase 1: Reveal "RK" with glowing pulse & shockwaves (0ms - 1200ms)
    setTimeout(() => {
      if (isSkipped) return;
      if (monogram) {
        monogram.style.opacity = '1';
        monogram.style.transform = 'scale(1)';
        monogram.classList.add('pulse-glow-anim');
      }
      addShockwave(w / 2, h / 2, 280);
      addShockwave(w / 2, h / 2, 450);
      burstEmbers(w / 2, h / 2, 40);
    }, 50);

    // Phase 2: Smooth cinematic transition to "RAHAT KHAN" (1300ms - 2800ms)
    setTimeout(() => {
      if (isSkipped) return;
      if (monogram) {
        monogram.style.opacity = '0';
        monogram.style.transform = 'scale(1.2) rotate(-2deg)';
      }

      addShockwave(w / 2, h / 2, 520);

      setTimeout(() => {
        if (isSkipped) return;
        if (monogram) monogram.style.display = 'none';
        if (name) {
          name.style.display = 'block';
          name.style.opacity = '1';
          name.style.transform = 'translateY(0) scale(1)';
          name.classList.add('cinema-shimmer-anim');
        }
        burstEmbers(w / 2, h / 2, 60);
        if (window.playUiSound) window.playUiSound('success');
      }, 300);
    }, 300);

    // Auto complete intro after 2.8 seconds
    setTimeout(() => {
      if (!isSkipped) finishIntro();
    }, 800);
  }

  function finishIntro() {
    if (isSkipped) return;
    isSkipped = true;

    if (animId) cancelAnimationFrame(animId);

    introScreen.classList.add('hidden');
    setTimeout(() => {
      introScreen.style.display = 'none';
      // Trigger homepage scroll reveal animations
      document.querySelectorAll('.hero-section .reveal-on-scroll, #home .reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }, 750);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      finishIntro();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Escape') && !introScreen.classList.contains('hidden')) {
      e.preventDefault();
      finishIntro();
    }
  });

  // Replay intro by clicking top navbar logo mark
  if (logoMark) {
    logoMark.style.cursor = 'pointer';
    logoMark.addEventListener('click', (e) => {
      e.preventDefault();
      runIntro();
    });
  }

  // Check URL param or start automatically
  const urlParams = new URLSearchParams(window.location.search);
  const skipParam = urlParams.get('skipIntro');
  
  if (skipParam === 'true') {
    finishIntro();
  } else {
    runIntro();
  }
}
