/* ==========================================================================
   RAHAT KHAN — LIQUID WATER WAVE / RIPPLE EFFECT ENGINE FOR IMAGES
   ========================================================================== */

export function initImageWaveEffect() {
  injectWaveFilter();
  attachImageWaveListeners();
}

// 1. Inject SVG Liquid Wave Filter for realistic refraction waves
function injectWaveFilter() {
  if (document.getElementById('svg-wave-filter-def')) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'svg-wave-filter-def';
  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '-1';
  svg.innerHTML = `
    <filter id="liquid-wave-distortion" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence id="wave-turbulence" type="fractalNoise" baseFrequency="0.015 0.03" numOctaves="2" result="turbulence" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G" result="distortion" />
    </filter>
  `;
  document.body.appendChild(svg);
}

// 2. Attach Wave Ripple Listeners to portfolio project media containers
function attachImageWaveListeners() {
  function bindWaves() {
    const mediaWrappers = document.querySelectorAll(
      '.project-media-wrapper, .project-art-canvas, .editor-monitor'
    );

    mediaWrappers.forEach(wrapper => {
      if (wrapper.dataset.waveBound) return;
      wrapper.dataset.waveBound = 'true';
      wrapper.classList.add('wave-interactive-container');

      // Add Wave Overlay Container if not present
      let waveOverlay = wrapper.querySelector('.liquid-wave-overlay');
      if (!waveOverlay) {
        waveOverlay = document.createElement('div');
        waveOverlay.className = 'liquid-wave-overlay';
        waveOverlay.innerHTML = `
          <div class="wave-crest wave-crest-1"></div>
          <div class="wave-crest wave-crest-2"></div>
          <div class="wave-crest wave-crest-3"></div>
        `;
        wrapper.appendChild(waveOverlay);
      }

      // Mouse Enter Trigger - Spawn Ripple
      wrapper.addEventListener('mouseenter', (e) => {
        triggerWaveRipple(wrapper, e);
      });

      // Mouse Move Wave Tracking
      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        wrapper.style.setProperty('--wave-x', `${x}%`);
        wrapper.style.setProperty('--wave-y', `${y}%`);
      });
    });
  }

  bindWaves();

  // Re-bind when new portfolio images render
  const observer = new MutationObserver(bindWaves);
  observer.observe(document.body, { childList: true, subtree: true });
}

// 3. Trigger Liquid Wave Ripple
function triggerWaveRipple(container, event) {
  const rect = container.getBoundingClientRect();
  const x = event ? event.clientX - rect.left : rect.width / 2;
  const y = event ? event.clientY - rect.top : rect.height / 2;

  // Create Expanding Liquid Wave Pulse
  const ripple = document.createElement('div');
  ripple.className = 'image-water-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  container.appendChild(ripple);

  // Apply quick liquid displacement on image
  const img = container.querySelector('.project-thumb-img, .project-art-canvas, .about-avatar-img');
  if (img) {
    img.classList.add('wave-distorting');
    setTimeout(() => {
      img.classList.remove('wave-distorting');
    }, 750);
  }

  setTimeout(() => {
    ripple.remove();
  }, 900);
}
