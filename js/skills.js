/* ==========================================================================
   RAHAT KHAN — SOFTWARE SKILLS DATA & RENDERER (ADOBE SUITE & PRO TOOLS)
   ========================================================================== */

export const ADOBE_BADGES = {
  pr: {
    name: 'Adobe Premiere Pro',
    category: 'Video Editing',
    abbr: 'Pr',
    brandColor: '#9999FF',
    bgDark: '#00005B',
    levelTitle: 'NLE Video Editing — Master (99%)',
    proficiency: 99,
    description: 'Multi-camera editing, dynamic narrative pacing, seamless J/L audio cuts, proxy workflows, and high-turnover longform timeline mastery.',
    features: ['Multi-Cam Sync', 'Speed Ramping', 'Proxy Pipeline', 'Dynamic Pacing', '4K/8K Timelines']
  },
  ae: {
    name: 'Adobe After Effects',
    category: 'Motion Graphics',
    abbr: 'Ae',
    brandColor: '#9999FF',
    bgDark: '#00005B',
    levelTitle: 'Motion Graphics & VFX — Advanced (95%)',
    proficiency: 95,
    description: 'Bespoke cinematic title sequences, kinetic typography, 3D camera tracking, HUD callouts, optical glitch FX, and clean rotoscoping.',
    features: ['Kinetic Typography', '3D Camera Tracker', 'VFX Compositing', 'Custom Glitch FX', 'Motion Tracking']
  },
  ps: {
    name: 'Adobe Photoshop',
    category: 'Graphic Design',
    abbr: 'Ps',
    brandColor: '#31A8FF',
    bgDark: '#001E36',
    levelTitle: 'Thumbnail & Visual Design — Master (96%)',
    proficiency: 96,
    description: 'High-CTR YouTube thumbnails, visual assets, photo manipulation, cutout masking, composite lighting, and branding art.',
    features: ['High-CTR Thumbnails', 'Frequency Separation', 'Lighting Effects', 'Matte Cutouts', 'Branding Kits']
  },
  ai: {
    name: 'Adobe Illustrator',
    category: 'Graphic Design',
    abbr: 'Ai',
    brandColor: '#FF9A00',
    bgDark: '#330000',
    levelTitle: 'Vector Graphics & Typography — Advanced (90%)',
    proficiency: 90,
    description: 'Designing vector icons, custom logomarks, typography badges, and scalable visual elements ready for motion graphics pipelines.',
    features: ['Vector Assets', 'Custom Iconography', 'Typography Glyphs', 'Brand Identity', 'SVG Export']
  },
  au: {
    name: 'Adobe Audition',
    category: 'Audio & Color',
    abbr: 'Au',
    brandColor: '#00E4BB',
    bgDark: '#003B30',
    levelTitle: 'Audio Mastering & SFX — Advanced (92%)',
    proficiency: 92,
    description: 'Noise reduction, spectral frequency repair, dialogue EQ balancing, loudness normalization (-14 LUFS), and cinematic audio foley.',
    features: ['Spectral Cleaning', 'Dialogue EQ', '-14 LUFS Loudness', 'SFX Layering', 'Reverb Matching']
  },
  me: {
    name: 'Adobe Media Encoder',
    category: 'Video Editing',
    abbr: 'Me',
    brandColor: '#E26DFF',
    bgDark: '#2D0036',
    levelTitle: 'Transcoding & Bitrate Delivery — Master (94%)',
    proficiency: 94,
    description: 'Batch multi-format rendering, ProRes 4444 XQ master export, H.264/H.265 bitrate optimization, and automated queue management.',
    features: ['Batch Transcode', 'ProRes 4444 XQ', 'H.265 / HEVC', 'Bitrate Tuning', 'Queue Presets']
  },
  lr: {
    name: 'Adobe Lightroom',
    category: 'Audio & Color',
    abbr: 'Lr',
    brandColor: '#31A8FF',
    bgDark: '#001E36',
    levelTitle: 'Color Grading & RAW Processing — Advanced (88%)',
    proficiency: 88,
    description: 'RAW still color grading, tone curve mastering, custom preset development, luminance balancing, and high dynamic range tuning.',
    features: ['RAW Processing', 'Tone Curves', 'Color Grading', 'LUT Export', 'HDR Tuning']
  },
  davinci: {
    name: 'DaVinci Resolve Studio',
    category: 'Audio & Color',
    abbr: 'Dv',
    brandColor: '#EB3941',
    bgDark: '#1a1012',
    levelTitle: 'Node Color Science & Finishing — Advanced (92%)',
    proficiency: 92,
    description: 'Node-based color grading, ACES / LOG color science, film grain emulation, skin-tone isolation, and HDR delivery.',
    features: ['Node Grading', 'ACES Color Science', 'Film Emulation', 'Power Windows', 'HDR Mastering']
  },
  capcut: {
    name: 'CapCut Pro',
    category: 'Video Editing',
    abbr: 'Cc',
    brandColor: '#00F2FE',
    bgDark: '#0a192f',
    levelTitle: 'Shorts & TikTok Viral Editing — Master (95%)',
    proficiency: 95,
    description: 'Ultra-fast vertical video workflow, trending viral audio sync, animated karaoke subtitles, and high-retention velocity cuts.',
    features: ['Viral Subtitles', 'Sound Sync', 'Velocity Ramps', 'Green Screen', 'Format Conversion']
  },
  blender: {
    name: 'Blender 3D',
    category: 'Motion Graphics',
    abbr: 'Bl',
    brandColor: '#EA7600',
    bgDark: '#261202',
    levelTitle: '3D Elements & Mockups — Intermediate (85%)',
    proficiency: 85,
    description: '3D product modeling, camera projection, cinematic lighting, and 3D alpha renders for video overlays.',
    features: ['3D Camera Moves', 'Alpha Pass Export', 'Product Renders', 'Lighting Setups', 'Clay Shading']
  }
};

export const DEFAULT_SKILLS = Object.entries(ADOBE_BADGES).map(([id, item]) => ({
  id,
  name: item.name,
  category: item.category,
  abbr: item.abbr,
  brandColor: item.brandColor,
  bgDark: item.bgDark,
  levelTitle: item.levelTitle,
  proficiency: item.proficiency,
  description: item.description,
  features: item.features
}));

export let softwareSkillsData = [...DEFAULT_SKILLS];

export function setSkillsData(skills) {
  if (Array.isArray(skills) && skills.length > 0) {
    softwareSkillsData = skills.map(s => {
      let featList = [];
      if (Array.isArray(s.features)) {
        featList = s.features;
      } else if (typeof s.features_json === 'string') {
        try { featList = JSON.parse(s.features_json || '[]'); } catch { featList = []; }
      }

      const badgeInfo = ADOBE_BADGES[s.id] || {};

      return {
        id: s.id,
        name: s.name,
        category: s.category || badgeInfo.category || 'Video Editing',
        abbr: s.icon || badgeInfo.abbr || s.name.substring(0, 2),
        brandColor: badgeInfo.brandColor || '#9999FF',
        bgDark: badgeInfo.bgDark || '#121218',
        levelTitle: s.level_title || s.levelTitle || badgeInfo.levelTitle || 'Advanced (90%)',
        proficiency: s.proficiency || badgeInfo.proficiency || 90,
        description: s.description || badgeInfo.description || '',
        features: featList.length > 0 ? featList : (badgeInfo.features || [])
      };
    });
  }
}

function renderAdobeBadgeIcon(skill) {
  const brand = skill.brandColor || '#9999FF';
  const bg = skill.bgDark || '#00005B';
  const abbr = skill.abbr || skill.name.substring(0, 2);

  // DaVinci Resolve special multi-color wheel emblem
  if (skill.id === 'davinci') {
    return `
      <div class="adobe-icon-badge davinci-badge" title="${skill.name}">
        <svg viewBox="0 0 48 48" class="adobe-badge-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#121218" stroke="#333340" stroke-width="1.5"/>
          <circle cx="24" cy="18" r="8" fill="#EB3941"/>
          <circle cx="18" cy="28" r="8" fill="#3078E6"/>
          <circle cx="30" cy="28" r="8" fill="#23B972"/>
          <text x="24" y="27" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="11" fill="#ffffff" text-anchor="middle">Dv</text>
        </svg>
      </div>
    `;
  }

  // Blender 3D special logo
  if (skill.id === 'blender') {
    return `
      <div class="adobe-icon-badge blender-badge" title="${skill.name}">
        <svg viewBox="0 0 48 48" class="adobe-badge-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#1c0f02" stroke="#EA7600" stroke-width="2"/>
          <circle cx="24" cy="24" r="10" fill="#EA7600"/>
          <circle cx="24" cy="24" r="5" fill="#22629b"/>
          <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>
          <line x1="24" y1="14" x2="24" y2="7" stroke="#EA7600" stroke-width="3" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="9" y2="14" stroke="#EA7600" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>
    `;
  }

  // CapCut Pro emblem
  if (skill.id === 'capcut') {
    return `
      <div class="adobe-icon-badge capcut-badge" title="${skill.name}">
        <svg viewBox="0 0 48 48" class="adobe-badge-svg" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#061626" stroke="#00F2FE" stroke-width="2"/>
          <polygon points="12,14 24,24 12,34" fill="#00F2FE"/>
          <polygon points="36,14 24,24 36,34" fill="#4FACFE"/>
        </svg>
      </div>
    `;
  }

  // Official Adobe iconic square badge
  return `
    <div class="adobe-icon-badge" style="border-color: ${brand}; background: ${bg};" title="${skill.name}">
      <div class="adobe-badge-text" style="color: ${brand};">${abbr}</div>
    </div>
  `;
}

export function initSkills(customData = null) {
  const container = document.getElementById('software-skills-grid');
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-pill-btn');
  
  if (!container) return;
  if (customData) setSkillsData(customData);

  function matchesCategory(skill, category) {
    if (!category || category === 'all') return true;
    const cat = category.toLowerCase().trim();
    const skillCat = (skill.category || '').toLowerCase().trim();
    const skillName = (skill.name || '').toLowerCase().trim();

    if (cat === 'editing') {
      return skillCat.includes('edit') || skillCat.includes('video') || skillName.includes('premiere') || skillName.includes('encoder') || skillName.includes('capcut');
    }
    if (cat === 'motion') {
      return skillCat.includes('motion') || skillCat.includes('vfx') || skillCat.includes('3d') || skillName.includes('effects') || skillName.includes('blender');
    }
    if (cat === 'audio') {
      return skillCat.includes('audio') || skillCat.includes('color') || skillCat.includes('grade') || skillName.includes('audition') || skillName.includes('lightroom') || skillName.includes('resolve') || skillName.includes('davinci');
    }
    if (cat === 'design') {
      return skillCat.includes('design') || skillCat.includes('graphic') || skillCat.includes('vector') || skillName.includes('photoshop') || skillName.includes('illustrator');
    }

    return skillCat.includes(cat) || skillName.includes(cat);
  }

  function renderSkills(category = 'all') {
    const list = softwareSkillsData.length > 0 ? softwareSkillsData : DEFAULT_SKILLS;
    const filtered = list.filter(s => matchesCategory(s, category));

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted); font-size: 1.05rem;">No Adobe skills found in this category.</div>`;
      return;
    }

    container.innerHTML = filtered.map(skill => {
      // SVG circle dash offset based on 140 circumference
      const offset = 140 - (140 * Math.min(skill.proficiency, 100)) / 100;
      const badgeHtml = renderAdobeBadgeIcon(skill);

      return `
        <div class="software-card interactive reveal-on-scroll" data-skill-id="${skill.id}">
          <div class="software-card-top">
            <div class="software-logo-wrapper">
              ${badgeHtml}
              <div class="software-title-stack">
                <h3 class="software-name">${skill.name}</h3>
                <span class="adobe-brand-tag" style="color: ${skill.brandColor || 'var(--text-muted)'};">${skill.category}</span>
              </div>
            </div>

            <div class="circular-progress" data-proficiency="${skill.proficiency}" title="${skill.proficiency}% Mastered">
              <svg viewBox="0 0 50 50">
                <circle class="bg-circle" cx="25" cy="25" r="22"></circle>
                <circle class="progress-circle" cx="25" cy="25" r="22" style="stroke: ${skill.brandColor || 'var(--text-primary)'}; stroke-dashoffset: ${offset};"></circle>
              </svg>
              <div class="percentage-text">${skill.proficiency}%</div>
            </div>
          </div>
          
          <div class="software-card-body">
            <div class="software-role-tag">
              <span class="skill-level-bullet" style="background: ${skill.brandColor || 'var(--text-primary)'};"></span>
              ${skill.levelTitle}
            </div>
            <p class="software-desc">${skill.description}</p>
          </div>

          <div class="software-features-list">
            ${(skill.features || []).map(f => `<span class="software-feature-tag">${f}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Trigger scroll reveal animations
    setTimeout(() => {
      container.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }, 30);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderSkills(cat);
      if (window.playUiSound) window.playUiSound('click');
    });
  });

  renderSkills('all');
}
