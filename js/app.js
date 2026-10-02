/* ==========================================================================
   RAHAT KHAN — MAIN APP CONTROLLER & ROUTER (DYNAMIC CMS CONNECTED)
   ========================================================================== */

import { initTheme } from './theme.js';
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initIntro } from './intro.js';
import { initHomeStudio } from './home-studio.js';
import { init3DSectionTransitions } from './3d-transitions.js';
import { initImageWaveEffect } from './image-wave.js';
import { initSkills, setSkillsData } from './skills.js';
import { initPortfolio, setPortfolioData } from './portfolio.js';

// Global Data Holder
export let cmsData = null;

// ==========================================
// 1. SYNTHESIZED CINEMATIC AUDIO (Web Audio API)
// ==========================================
let audioCtx = null;
let soundEnabled = false;

function initSoundEngine() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  window.playUiSound = function(type = 'click') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'whoosh') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  };

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      getAudioContext();
      soundBtn.innerHTML = soundEnabled 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
      soundBtn.setAttribute('title', soundEnabled ? 'Mute Audio' : 'Enable UI Audio Feedback');
      if (soundEnabled) window.playUiSound('success');
    });
  }
}

// ==========================================
// 2. SINGLE PAGE SCROLLSPY & SMOOTH NAVIGATION
// ==========================================
function initSinglePageNavigation() {
  const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  // Smooth buttery scroll to section
  function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      // Close mobile menu drawer smoothly
      if (mobileDrawer) {
        mobileDrawer.classList.remove('active', 'open');
      }
      if (mobileBtn) {
        mobileBtn.classList.remove('open');
      }

      // Calculate target scroll position taking fixed navbar height into account
      const navEl = document.querySelector('.navbar');
      const navHeight = navEl ? navEl.offsetHeight : 72;
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - navHeight + 2);

      // Perform smooth gradual scroll
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      if (window.playUiSound) window.playUiSound('whoosh');

      // Trigger section element entrance animations
      if (window.triggerSectionColumnRow3D) {
        window.triggerSectionColumnRow3D(el, sectionId);
      }

      // Update active nav highlights
      setActiveNav(sectionId);

      // Update hash without jump
      if (history.pushState) {
        history.pushState(null, null, `#${sectionId}`);
      }
    }
  }

  // Update active navigation link
  function setActiveNav(sectionId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll click handler for all hash anchors
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          scrollToSection(targetId);
        }
      }
    });
  });

  // Mobile menu drawer toggle
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.contains('active') || mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('active', 'open');
        mobileBtn.classList.remove('open');
      } else {
        mobileDrawer.classList.add('active', 'open');
        mobileBtn.classList.add('open');
        if (window.playUiSound) window.playUiSound('click');
      }
    });

    // Close mobile drawer on outside click
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDrawer.classList.remove('active', 'open');
        mobileBtn.classList.remove('open');
      }
    });
  }

  // ScrollSpy using IntersectionObserver
  const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
  
  if ('IntersectionObserver' in window && sectionElements.length > 0) {
    const scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    });

    sectionElements.forEach(el => scrollSpyObserver.observe(el));
  } else {
    // Fallback scroll listener
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 200;
      sectionElements.forEach(el => {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveNav(el.id);
        }
      });
    }, { passive: true });
  }

  // Reveal On Scroll with IntersectionObserver
  initScrollReveal();

  // Handle direct hash on load
  if (window.location.hash) {
    const target = window.location.hash.replace('#', '');
    setTimeout(() => {
      scrollToSection(target);
    }, 400);
  }
}

// Reveal-on-scroll Observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

// ==========================================
// ==========================================
// 3. STATS ANIMATION (TRIGGER ON SCROLL)
// ==========================================
let statsAnimated = false;
function initStatsObserver() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  } else {
    animateStats();
  }
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1400;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, stepTime);
  });
}

// ==========================================
// 4. DYNAMIC CMS HYDRATION
// ==========================================
async function fetchAndApplyCmsData() {
  try {
    let localData = localStorage.getItem('cmsData');

    if (!localData) {
      try {
        const res = await fetch('/data.json');
        if (res.ok) {
          localData = await res.text();
        }
      } catch(e) {}
    }

    if (!localData) {
      console.warn('No CMS data in localStorage or data.json. Using bundled defaults.');
      initSkills();
      initPortfolio();
      return;
    }
    
    const json = JSON.parse(localData);
    cmsData = json;
    
    const { settings, home, about, skills, projects, services, testimonials, socialLinks } = cmsData;

    // Check Maintenance Mode
    if (settings?.general?.maintenanceMode) {
      const urlParams = new URLSearchParams(window.location.search);
      const isBypass = urlParams.get('preview') === 'true' || localStorage.getItem('cms_admin_token');
      if (!isBypass) {
        showMaintenanceScreen(settings.general.maintenanceMessage || 'RAHAT KHAN WEBSITE IS CURRENTLY UNDER MAINTENANCE.');
        return;
      }
    }

    // Update SEO and Page Titles
    if (settings?.seo?.metaTitle) {
      document.title = settings.seo.metaTitle;
    }

    // Update Hero Content
    if (home?.hero) {
      const hero = home.hero;
      const heroTitle = document.querySelector('.hero-title-main');
      if (heroTitle && hero.fullName) heroTitle.textContent = hero.fullName;

      const heroBio = document.querySelector('.hero-intro-text');
      if (heroBio) {
          if (hero.bioSummary) {
              heroBio.textContent = `"${hero.bioSummary}"`;
              heroBio.style.display = 'block';
          } else {
              heroBio.style.display = 'none';
          }
      }
      
      const badgeText = document.querySelector('.badge-status');
      if (badgeText && hero.badgeText) {
        badgeText.innerHTML = `<span class="status-pulse"></span> ${hero.badgeText}`;
      }

      // Update Typewriter Text Roles
      const typewriterEl = document.getElementById('typewriter-text');
      if (typewriterEl) {
        let roles = [];
        if (hero.primaryRole) roles.push(hero.primaryRole);
        if (hero.secondaryRoles && hero.secondaryRoles.length > 0) {
            roles.push(...hero.secondaryRoles);
        }
        if (roles.length === 0) {
            roles = ['VIDEO EDITOR', 'CREATIVE DESIGNER'];
        }
        typewriterEl.textContent = ''; 
        startTypewriter(roles);
      }
    }

    // Update About Content
    if (about?.main) {
      const a = about.main;
      const aboutTitle = document.querySelector('#about .section-title');
      if (aboutTitle && a.title) aboutTitle.textContent = a.title;

      const aboutImage = document.querySelector('#about-profile-img');
      if (aboutImage && a.image) {
          aboutImage.src = a.image;
          aboutImage.style.display = 'block';
      }

      const bioP = document.getElementById('about-bio-wrapper');
      if (bioP && a.biography) bioP.innerHTML = a.biography;

      // Update Timeline
      if (Array.isArray(a.timeline) && a.timeline.length > 0) {
        renderDynamicTimeline(a.timeline);
      }
    }

    // Update Social Links if present
    if (socialLinks) {
        const socialGrid = document.querySelector('.social-links-grid');
        if (socialGrid) {
            const platforms = ['facebook', 'instagram', 'youtube', 'whatsapp', 'email'];
            socialGrid.innerHTML = platforms.map(platform => {
                let val = socialLinks[platform] || '#';
                let href = val;
                if (val !== '#') {
                    if (platform === 'email' && !val.startsWith('http') && !val.startsWith('mailto')) {
                        href = `https://mail.google.com/mail/?view=cm&fs=1&to=${val}`;
                    } else if (platform === 'whatsapp' && !val.startsWith('http')) {
                        href = `https://wa.me/${val.replace(/[^0-9]/g, '')}`;
                    }
                }
                return `<a href="${href}" target="_blank" rel="noopener" class="social-btn interactive"><span>${platform.charAt(0).toUpperCase() + platform.slice(1)}</span></a>`;
            }).join('');
        }
        
        // Update contact specific items
        const emailDirect = document.getElementById('direct-email');
        if (emailDirect && socialLinks.email) {
            emailDirect.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`;
            emailDirect.textContent = `${socialLinks.email} ↗`;
        }
        
        const phoneWa = document.getElementById('direct-wa');
        if (phoneWa && socialLinks.whatsapp) {
            let waVal = socialLinks.whatsapp;
            if (!waVal.startsWith('http')) {
                phoneWa.href = `https://wa.me/${waVal.replace(/[^0-9]/g, '')}`;
                phoneWa.textContent = `${waVal} ↗`;
            } else {
                phoneWa.href = waVal;
                phoneWa.textContent = "WhatsApp Connect ↗";
            }
        }
        
        const itemFb = document.getElementById('item-fb');
        const directFb = document.getElementById('direct-fb');
        if (itemFb && directFb) {
            if (socialLinks.facebook) directFb.href = socialLinks.facebook;
            itemFb.style.display = 'flex';
        }

        const itemInsta = document.getElementById('item-insta');
        const directInsta = document.getElementById('direct-insta');
        if (itemInsta && directInsta) {
            if (socialLinks.instagram) directInsta.href = socialLinks.instagram;
            itemInsta.style.display = 'flex';
        }
        
        const itemYt = document.getElementById('item-yt');
        const directYt = document.getElementById('direct-yt');
        if (itemYt && directYt) {
            if (socialLinks.youtube) directYt.href = socialLinks.youtube;
            itemYt.style.display = 'flex';
        }
    }

    // Hydrate Skills & Projects
    if (skills) setSkillsData(skills);
    if (projects) setPortfolioData(projects);

    initSkills(skills);
    initPortfolio(projects);

  } catch (err) {
    console.warn('Could not load dynamic CMS data. Using bundled defaults.', err);
    initSkills();
    initPortfolio();
  }
}

function renderDynamicTimeline(timeline) {
  const container = document.querySelector('.timeline-track');
  if (!container) return;

  container.innerHTML = timeline.map(item => `
    <div class="timeline-node reveal-on-scroll">
      <div class="timeline-dot"></div>
      <div class="timeline-card interactive">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-role">${item.role}</h3>
        <div class="timeline-company">${item.company}</div>
        <p class="timeline-desc">${item.description}</p>
      </div>
    </div>
  `).join('');
}

function startTypewriter(words) {
  const el = document.getElementById('typewriter-text');
  if (!el || words.length === 0) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex % words.length];
    
    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      speed = 300;
    }

    setTimeout(tick, speed);
  }

  tick();
}

function showMaintenanceScreen(message) {
  document.body.innerHTML = `
    <div style="min-height: 100vh; background: #08080a; color: #f4f4f5; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; font-family: 'Space Grotesk', sans-serif;">
      <div style="width: 64px; height: 64px; background: #ffffff; color: #000000; font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 0 30px rgba(255,255,255,0.3);">RK</div>
      <h1 style="font-size: clamp(1.8rem, 4vw, 2.5rem); margin-bottom: 1rem; letter-spacing: 0.05em;">RAHAT KHAN</h1>
      <p style="max-width: 600px; color: #a1a1aa; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; font-family: 'Outfit', sans-serif;">${message}</p>
      <div style="display: inline-block; padding: 6px 16px; background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 9999px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-bottom: 2rem;">SYSTEM MAINTENANCE IN PROGRESS</div>
      <div>
        <a href="/admin/" style="color: #71717a; font-size: 0.85rem; text-decoration: none; font-family: 'JetBrains Mono', monospace;">Super Admin Login &rarr;</a>
      </div>
    </div>
  `;
}

// ==========================================
// 5. CONTACT FORM TO CMS INBOX
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING MESSAGE TO RAHAT KHAN...</span>';

    const payload = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      phone: document.getElementById('contact-phone').value,
      projectType: document.getElementById('contact-project-type').value,
      message: document.getElementById('contact-message').value
    };

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Transmission failed.');
      }

      form.reset();
      submitBtn.style.background = '#22c55e';
      submitBtn.style.color = '#ffffff';
      submitBtn.innerHTML = '<span>✓ MESSAGE TRANSMITTED SUCCESSFULLY!</span>';

      const toast = document.getElementById('toast-notification');
      const toastMsg = document.getElementById('toast-message');
      if (toast && toastMsg) {
        toastMsg.textContent = data.message || 'Message sent! Rahat Khan (rkiconik@gmail.com) will respond within 24 hours.';
        toast.classList.add('show');
        if (window.playUiSound) window.playUiSound('success');
        setTimeout(() => toast.classList.remove('show'), 6000);
      }

      setTimeout(() => {
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 4500);

    } catch (err) {
      alert('Error transmitting message: ' + err.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ==========================================
// 6. BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  function toggleBackToTop() {
    if (window.scrollY > 280) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.playUiSound) window.playUiSound('whoosh');
  });
}

// ==========================================
// 7. INITIALIZATION ENTRYPOINT
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initCursor();
  initParticles();
  initSoundEngine();
  initSinglePageNavigation();
  initStatsObserver();
  initSkills();
  initPortfolio();
  initHomeStudio();
  init3DSectionTransitions();
  initImageWaveEffect();
  initContactForm();
  initBackToTop();

  // Load live data from CMS and hydrate in-place
  await fetchAndApplyCmsData();

  // Initialize intro screen
  const urlParams = new URLSearchParams(window.location.search);
  const replayIntro = urlParams.get('replay_intro') === 'true';
  initIntro(replayIntro);
});
