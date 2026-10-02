/* ==========================================================================
   RAHAT KHAN — AMBIENT CINEMATIC PARTICLES & CONSTELLATION ENGINE
   (Deep Black in Light/White Theme, Luminous White/Silver in Dark Theme)
   ========================================================================== */

export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  // High particle density for crisp visual feedback
  const particleCount = Math.min(Math.floor(width * 0.08), 120);
  const particles = [];

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? 0 : height);
      this.size = Math.random() * 2.2 + 0.9;
      this.baseSpeedX = (Math.random() - 0.5) * 0.6;
      this.baseSpeedY = (Math.random() - 0.5) * 0.6;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.alpha = Math.random() * 0.55 + 0.35;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.pulse = Math.random() * Math.PI * 2;
      this.isGlowing = Math.random() > 0.75;
    }

    update() {
      // Mouse cursor proximity repulsion
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseRadius = 140;

      if (dist < mouseRadius && dist > 0) {
        const force = (1 - dist / mouseRadius) * 2.5;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force;
        this.y -= Math.sin(angle) * force;
      } else {
        this.x += this.speedX;
        this.y += this.speedY;
      }

      this.pulse += this.pulseSpeed;

      // Wrap around canvas bounds
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw(themeColors) {
      const currentAlpha = (Math.sin(this.pulse) * 0.35 + 0.65) * this.alpha;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      ctx.fillStyle = this.isGlowing 
        ? themeColors.particleGlow(currentAlpha)
        : themeColors.particleBase(currentAlpha);

      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function getThemeColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    switch (theme) {
      case 'light':
        return {
          particleGlow: (a) => `rgba(0, 0, 0, ${Math.min(a * 1.3, 0.95)})`,
          particleBase: (a) => `rgba(0, 0, 0, ${Math.max(a * 0.85, 0.4)})`,
          lineColor: (a) => `rgba(0, 0, 0, ${a * 0.22})`,
          mouseLine: (a) => `rgba(0, 0, 0, ${a * 0.35})`,
          ripple: (a) => `rgba(0, 0, 0, ${a * 0.6})`,
          spark: (a, isCyan) => `rgba(0, 0, 0, ${a})`
        };
      case 'cyberpunk':
        return {
          particleGlow: (a) => `rgba(192, 132, 252, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(168, 85, 247, ${a * 0.85})`,
          lineColor: (a) => `rgba(168, 85, 247, ${a * 0.22})`,
          mouseLine: (a) => `rgba(6, 182, 212, ${a * 0.45})`,
          ripple: (a) => `rgba(168, 85, 247, ${a * 0.75})`,
          spark: (a, isCyan) => isCyan ? `rgba(6, 182, 212, ${a})` : `rgba(236, 72, 153, ${a})`
        };
      case 'emerald':
        return {
          particleGlow: (a) => `rgba(52, 211, 153, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(16, 185, 129, ${a * 0.85})`,
          lineColor: (a) => `rgba(16, 185, 129, ${a * 0.22})`,
          mouseLine: (a) => `rgba(52, 211, 153, ${a * 0.45})`,
          ripple: (a) => `rgba(16, 185, 129, ${a * 0.75})`,
          spark: (a, isCyan) => isCyan ? `rgba(110, 231, 183, ${a})` : `rgba(16, 185, 129, ${a})`
        };
      case 'sunset':
        return {
          particleGlow: (a) => `rgba(251, 191, 36, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(245, 158, 11, ${a * 0.85})`,
          lineColor: (a) => `rgba(245, 158, 11, ${a * 0.22})`,
          mouseLine: (a) => `rgba(251, 191, 36, ${a * 0.45})`,
          ripple: (a) => `rgba(245, 158, 11, ${a * 0.75})`,
          spark: (a, isCyan) => isCyan ? `rgba(253, 230, 138, ${a})` : `rgba(249, 115, 22, ${a})`
        };
      case 'crimson':
        return {
          particleGlow: (a) => `rgba(244, 63, 94, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(239, 68, 68, ${a * 0.85})`,
          lineColor: (a) => `rgba(239, 68, 68, ${a * 0.22})`,
          mouseLine: (a) => `rgba(244, 63, 94, ${a * 0.45})`,
          ripple: (a) => `rgba(239, 68, 68, ${a * 0.75})`,
          spark: (a, isCyan) => isCyan ? `rgba(254, 205, 211, ${a})` : `rgba(239, 68, 68, ${a})`
        };
      case 'sapphire':
        return {
          particleGlow: (a) => `rgba(96, 165, 250, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(59, 130, 246, ${a * 0.85})`,
          lineColor: (a) => `rgba(59, 130, 246, ${a * 0.22})`,
          mouseLine: (a) => `rgba(96, 165, 250, ${a * 0.45})`,
          ripple: (a) => `rgba(59, 130, 246, ${a * 0.75})`,
          spark: (a, isCyan) => isCyan ? `rgba(191, 219, 254, ${a})` : `rgba(59, 130, 246, ${a})`
        };
      case 'dark':
      default:
        return {
          particleGlow: (a) => `rgba(255, 255, 255, ${Math.min(a * 1.3, 1)})`,
          particleBase: (a) => `rgba(235, 235, 245, ${a * 0.9})`,
          lineColor: (a) => `rgba(255, 255, 255, ${a * 0.16})`,
          mouseLine: (a) => `rgba(255, 255, 255, ${a * 0.35})`,
          ripple: (a) => `rgba(255, 255, 255, ${a * 0.8})`,
          spark: (a, isCyan) => isCyan ? `rgba(96, 165, 250, ${a})` : `rgba(255, 255, 255, ${a})`
        };
    }
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const themeColors = getThemeColors();
    const connectionDist = 135;

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(themeColors);

      // Connect neighbor particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alphaFactor = (1 - dist / connectionDist);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          ctx.strokeStyle = themeColors.lineColor(alphaFactor);
          ctx.lineWidth = alphaFactor * 1.1;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouseX > 0 && mouseY > 0) {
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const mAlpha = (1 - mdist / 140);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = themeColors.mouseLine(mAlpha);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // --- Draw Click Shockwave Ripples ---
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.alpha -= 0.025;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = themeColors.ripple(r.alpha);
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // --- Draw Click Sparks ---
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy *= 0.94;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = themeColors.spark(s.alpha, s.isCyan);
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Interactive Click Shockwave & Sparks Trigger
  const ripples = [];
  const sparks = [];

  function triggerClickBurst(x, y) {
    // 1. Concentric Shockwave Ripples
    ripples.push({ x, y, radius: 6, maxRadius: 75, alpha: 0.85, speed: 4 });
    ripples.push({ x, y, radius: 2, maxRadius: 45, alpha: 0.6, speed: 2.5 });

    // 2. High-Speed Cyber Sparks
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 4.5 + 2.5;
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 1.2,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.02,
        isCyan: Math.random() > 0.4
      });
    }
  }

  window.addEventListener('pointerdown', (e) => {
    triggerClickBurst(e.clientX, e.clientY);
  });

  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 100);
  });
}
