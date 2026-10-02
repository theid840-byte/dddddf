/* ==========================================================================
   RAHAT KHAN — NEXT-GEN 3D INTERACTIVE CURSOR & SPARK PARTICLE TRAIL ENGINE
   ========================================================================== */

export function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  
  if (!cursor || !follower) return;

  // Disable on touch devices
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  // Setup cursor particle trail canvas
  let trailCanvas = document.getElementById('cursor-trail-canvas');
  if (!trailCanvas) {
    trailCanvas = document.createElement('canvas');
    trailCanvas.id = 'cursor-trail-canvas';
    trailCanvas.className = 'cursor-trail-canvas';
    document.body.appendChild(trailCanvas);
  }

  const ctx = trailCanvas.getContext('2d');
  let width = trailCanvas.width = window.innerWidth;
  let height = trailCanvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = trailCanvas.width = window.innerWidth;
    height = trailCanvas.height = window.innerHeight;
  }, { passive: true });

  const particles = [];
  const MAX_PARTICLES = 36;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;
  let isMoving = false;

  // Particle Class
  class CursorSpark {
    constructor(x, y, color = '#ef4444') {
      this.x = x + (Math.random() - 0.5) * 4;
      this.y = y + (Math.random() - 0.5) * 4;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 1.5;
      this.speedY = (Math.random() - 0.5) * 1.5 - 0.3;
      this.color = color;
      this.alpha = 0.9;
      this.decay = Math.random() * 0.04 + 0.025;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
      this.size = Math.max(0, this.size - 0.03);
    }

    draw(context) {
      context.save();
      context.globalAlpha = Math.max(0, this.alpha);
      context.fillStyle = this.color;
      context.shadowColor = this.color;
      context.shadowBlur = 8;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  // Animation Loop for Cursor Particles
  function renderTrail() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0 || p.size <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderTrail);
  }
  renderTrail();

  // Mouse Move Handler (Subtle Red Sparks)
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    
    if (!isMoving) {
      isMoving = true;
      cursor.style.opacity = '1';
      follower.style.opacity = '0.85';
    }

    // Spawn 1 subtle spark
    if (particles.length < 24 && Math.random() > 0.4) {
      const redShades = ['#000000', '#111111', '#222222', '#333333'];
      const color = redShades[Math.floor(Math.random() * redShades.length)];
      particles.push(new CursorSpark(mouseX, mouseY, color));
    }
  }, { passive: true });

  // Mouse Click Ripple Burst (Red Shockwave)
  window.addEventListener('click', (e) => {
    // Spawn Click Shockwave Circle
    createClickShockwave(e.clientX, e.clientY);

    // Spawn 6-8 burst embers
    for (let i = 0; i < 8; i++) {
      const redShades = ['#000000', '#111111', '#222222'];
      const color = redShades[Math.floor(Math.random() * redShades.length)];
      const spark = new CursorSpark(e.clientX, e.clientY, color);
      spark.speedX = (Math.random() - 0.5) * 4;
      spark.speedY = (Math.random() - 0.5) * 4;
      spark.size = Math.random() * 2.5 + 1;
      spark.decay = 0.04;
      particles.push(spark);
    }
  });

  function createClickShockwave(x, y) {
    const shockwave = document.createElement('div');
    shockwave.className = 'cursor-shockwave-ring';
    shockwave.style.left = `${x}px`;
    shockwave.style.top = `${y}px`;
    document.body.appendChild(shockwave);

    setTimeout(() => {
      shockwave.remove();
    }, 600);
  }

  // Smooth fluid lerp for outer follower ring
  function updateFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateFollower);
  }
  requestAnimationFrame(updateFollower);

  // Attach hover triggers dynamically
  function attachHoverEffects() {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, .interactive, .project-card, .software-card, .workflow-card, .monitor-play-btn-large, .timeline-tool-btn, .filter-pill-btn, .stat-card'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
        if (el.classList.contains('project-card') || el.classList.contains('editor-monitor') || el.id === 'editor-monitor-wrapper') {
          follower.classList.add('video-mode');
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
        follower.classList.remove('video-mode');
      });
    });
  }

  attachHoverEffects();
  
  // Re-attach if DOM updates
  const observer = new MutationObserver(attachHoverEffects);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
    isMoving = false;
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '0.75';
  });
}
