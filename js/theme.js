/* ==========================================================================
   RAHAT KHAN — MULTI-COLOR THEME & MOBILE CUSTOMIZER ENGINE
   Supports: 7 Handcrafted Presets + Live Custom Color Picker + Mobile Bottom Sheet
   ========================================================================== */

const THEME_STORAGE_KEY = 'rahat_portfolio_theme';
const ACCENT_STORAGE_KEY = 'rahat_portfolio_accent_color';

export const THEMES = [
  {
    id: 'dark',
    name: 'Dark Obsidian',
    subtitle: 'Classic Cinematic Monochrome',
    previewColor: '#08080a',
    accentColor: '#ffffff',
    borderColor: '#3f3f46',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
  },
  {
    id: 'light',
    name: 'Studio Light',
    subtitle: 'Crisp Minimal Studio White',
    previewColor: '#f5f5f7',
    accentColor: '#09090b',
    borderColor: '#d4d4d8',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    subtitle: 'Electric Violet & Cyan Matrix',
    previewColor: '#130f24',
    accentColor: '#a855f7',
    borderColor: '#9333ea',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
  },
  {
    id: 'emerald',
    name: 'Matrix Emerald',
    subtitle: 'Deep Forest Obsidian & Mint',
    previewColor: '#0a1c15',
    accentColor: '#10b981',
    borderColor: '#059669',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>'
  },
  {
    id: 'sunset',
    name: 'Sunset Gold',
    subtitle: 'Warm Amber & Radiant Bronze',
    previewColor: '#1c120a',
    accentColor: '#f59e0b',
    borderColor: '#d97706',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>'
  },
  {
    id: 'crimson',
    name: 'Ruby Crimson',
    subtitle: 'Blood Scarlet & Director Cut',
    previewColor: '#1c0a0a',
    accentColor: '#ef4444',
    borderColor: '#dc2626',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
  },
  {
    id: 'sapphire',
    name: 'Sapphire Ocean',
    subtitle: 'Deep Navy & Glacier Azure',
    previewColor: '#0a172a',
    accentColor: '#3b82f6',
    borderColor: '#2563eb',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>'
  }
];

export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
  const savedAccent = localStorage.getItem(ACCENT_STORAGE_KEY) || null;

  // Apply initial theme & accent
  applyTheme(savedTheme, savedAccent);

  // Build desktop dropdown
  setupThemeDropdown(toggleBtn);

  // Build Mobile Color & Theme Quick Customizer
  setupMobileFloatingThemeCustomizer();
}

function setupThemeDropdown(toggleBtn) {
  if (!toggleBtn) return;

  let container = document.getElementById('theme-picker-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'theme-picker-container';
    container.className = 'theme-picker-container';
    toggleBtn.parentNode.insertBefore(container, toggleBtn);
    container.appendChild(toggleBtn);
  }

  let dropdown = document.getElementById('theme-palette-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'theme-palette-dropdown';
    dropdown.className = 'theme-palette-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.setAttribute('aria-label', 'Select Color Theme');
    container.appendChild(dropdown);
  }

  renderThemeDropdownContent(dropdown);

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('active');
    if (isOpen) {
      closeDropdown(dropdown, toggleBtn);
    } else {
      openDropdown(dropdown, toggleBtn);
    }
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      closeDropdown(dropdown, toggleBtn);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('active')) {
      closeDropdown(dropdown, toggleBtn);
      toggleBtn.focus();
    }
  });
}

function openDropdown(dropdown, toggleBtn) {
  dropdown.classList.add('active');
  toggleBtn.setAttribute('aria-expanded', 'true');
  if (window.playUiSound) window.playUiSound('click');
}

function closeDropdown(dropdown, toggleBtn) {
  dropdown.classList.remove('active');
  toggleBtn.setAttribute('aria-expanded', 'false');
}

function renderThemeDropdownContent(dropdown) {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  dropdown.innerHTML = `
    <div class="theme-palette-header">
      <span class="theme-palette-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
        </svg>
        COLOR PALETTES
      </span>
      <span class="theme-palette-count">${THEMES.length} Colors</span>
    </div>
    <div class="theme-palette-list">
      ${THEMES.map(theme => `
        <button 
          type="button"
          class="theme-palette-item ${currentTheme === theme.id ? 'active' : ''} interactive" 
          data-theme-id="${theme.id}"
          role="menuitem"
        >
          <div class="theme-palette-swatch" style="background: linear-gradient(135deg, ${theme.previewColor} 45%, ${theme.accentColor} 100%); border-color: ${theme.borderColor};">
            <span class="theme-swatch-center" style="background-color: ${theme.accentColor};"></span>
          </div>
          <div class="theme-palette-info">
            <div class="theme-palette-name">${theme.name}</div>
            <div class="theme-palette-sub">${theme.subtitle}</div>
          </div>
          <div class="theme-palette-status">
            ${currentTheme === theme.id 
              ? '<span class="theme-active-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' 
              : ''}
          </div>
        </button>
      `).join('')}
    </div>
    <div class="theme-custom-accent-row">
      <label class="theme-custom-label">
        <span>Custom Accent Color</span>
        <input type="color" id="desktop-accent-picker" class="theme-color-input" value="${getComputedStyle(document.documentElement).getPropertyValue('--theme-accent').trim() || '#ef4444'}">
      </label>
    </div>
  `;

  dropdown.querySelectorAll('.theme-palette-item').forEach(item => {
    item.addEventListener('click', () => {
      const themeId = item.getAttribute('data-theme-id');
      applyTheme(themeId);
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
      localStorage.removeItem(ACCENT_STORAGE_KEY);
      renderThemeDropdownContent(dropdown);
      
      const toggleBtn = document.getElementById('theme-toggle-btn');
      if (toggleBtn) closeDropdown(dropdown, toggleBtn);
      if (window.playUiSound) window.playUiSound('click');
    });
  });

  const picker = dropdown.querySelector('#desktop-accent-picker');
  if (picker) {
    picker.addEventListener('input', (e) => {
      applyCustomAccent(e.target.value);
    });
  }

  renderMobileThemeSwatches();
}

function renderMobileThemeSwatches() {
  const container = document.getElementById('mobile-theme-grid');
  if (!container) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  container.innerHTML = `
    ${THEMES.map(theme => `
      <button 
        type="button" 
        class="mobile-theme-btn ${currentTheme === theme.id ? 'active' : ''} interactive"
        data-theme-id="${theme.id}"
        title="${theme.name}"
        style="border-color: ${theme.borderColor};"
      >
        <span class="mobile-theme-swatch" style="background: linear-gradient(135deg, ${theme.previewColor} 40%, ${theme.accentColor} 100%);">
          <span class="mobile-theme-dot" style="background-color: ${theme.accentColor};"></span>
        </span>
        <span class="mobile-theme-label">${theme.name.split(' ')[0]}</span>
      </button>
    `).join('')}
    <div class="mobile-color-picker-box">
      <label class="mobile-picker-label" title="Pick Any Custom Color">
        <span class="color-dot-rainbow"></span>
        <span class="mobile-picker-text">Custom Color</span>
        <input type="color" id="mobile-drawer-color-input" class="theme-color-input" value="${getComputedStyle(document.documentElement).getPropertyValue('--theme-accent').trim() || '#ef4444'}">
      </label>
    </div>
  `;

  container.querySelectorAll('.mobile-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.getAttribute('data-theme-id');
      applyTheme(themeId);
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
      localStorage.removeItem(ACCENT_STORAGE_KEY);
      if (window.playUiSound) window.playUiSound('click');
    });
  });

  const drawerPicker = container.querySelector('#mobile-drawer-color-input');
  if (drawerPicker) {
    drawerPicker.addEventListener('input', (e) => {
      applyCustomAccent(e.target.value);
    });
  }
}

// 3. Setup Floating Quick Mobile Color Customizer Button & Bottom Sheet Modal
function setupMobileFloatingThemeCustomizer() {
  let floatingBtn = document.getElementById('floating-mobile-theme-btn');
  if (!floatingBtn) {
    floatingBtn = document.createElement('button');
    floatingBtn.id = 'floating-mobile-theme-btn';
    floatingBtn.className = 'floating-mobile-theme-btn interactive';
    floatingBtn.setAttribute('aria-label', 'Change Theme Colors');
    floatingBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
      </svg>
      <span>Theme</span>
    `;
    document.body.appendChild(floatingBtn);
  }

  let sheet = document.getElementById('mobile-theme-bottom-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.id = 'mobile-theme-bottom-sheet';
    sheet.className = 'mobile-theme-bottom-sheet';
    sheet.innerHTML = `
      <div class="mobile-sheet-backdrop" id="mobile-sheet-backdrop"></div>
      <div class="mobile-sheet-content glass-panel">
        <div class="mobile-sheet-handle"></div>
        <div class="mobile-sheet-header">
          <div class="mobile-sheet-title">🎨 Theme & Color Customizer</div>
          <button class="mobile-sheet-close" id="mobile-sheet-close-btn" aria-label="Close Customizer">✕</button>
        </div>
        <div class="mobile-sheet-grid" id="mobile-sheet-grid"></div>
        <div class="mobile-custom-color-card">
          <div class="custom-color-header">
            <span>✨ Live Custom Accent Color</span>
            <span class="custom-color-hex" id="custom-color-hex-val">#ef4444</span>
          </div>
          <div class="custom-color-controls">
            <input type="color" id="sheet-custom-color-picker" class="sheet-color-picker" value="#ef4444">
            <div class="preset-color-dots">
              <button class="color-dot-quick" data-color="#ef4444" style="background:#ef4444;" title="Red"></button>
              <button class="color-dot-quick" data-color="#10b981" style="background:#10b981;" title="Emerald"></button>
              <button class="color-dot-quick" data-color="#3b82f6" style="background:#3b82f6;" title="Blue"></button>
              <button class="color-dot-quick" data-color="#a855f7" style="background:#a855f7;" title="Purple"></button>
              <button class="color-dot-quick" data-color="#f59e0b" style="background:#f59e0b;" title="Amber"></button>
              <button class="color-dot-quick" data-color="#ec4899" style="background:#ec4899;" title="Pink"></button>
              <button class="color-dot-quick" data-color="#06b6d4" style="background:#06b6d4;" title="Cyan"></button>
              <button class="color-dot-quick" data-color="#ffffff" style="background:#ffffff;" title="White"></button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(sheet);
  }

  function renderSheetContent() {
    const grid = document.getElementById('mobile-sheet-grid');
    if (!grid) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    grid.innerHTML = THEMES.map(theme => `
      <button 
        type="button" 
        class="sheet-theme-item ${currentTheme === theme.id ? 'active' : ''}" 
        data-theme-id="${theme.id}"
      >
        <span class="sheet-theme-swatch" style="background: linear-gradient(135deg, ${theme.previewColor} 40%, ${theme.accentColor} 100%); border-color: ${theme.borderColor};">
          <span class="sheet-theme-dot" style="background-color: ${theme.accentColor};"></span>
        </span>
        <span class="sheet-theme-name">${theme.name}</span>
        ${currentTheme === theme.id ? '<span class="sheet-check">✓</span>' : ''}
      </button>
    `).join('');

    grid.querySelectorAll('.sheet-theme-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const themeId = btn.getAttribute('data-theme-id');
        applyTheme(themeId);
        localStorage.setItem(THEME_STORAGE_KEY, themeId);
        localStorage.removeItem(ACCENT_STORAGE_KEY);
        renderSheetContent();
        if (window.playUiSound) window.playUiSound('click');
      });
    });

    // Preset color dots in sheet
    document.querySelectorAll('.color-dot-quick').forEach(dot => {
      dot.addEventListener('click', () => {
        const color = dot.getAttribute('data-color');
        applyCustomAccent(color);
        const hexVal = document.getElementById('custom-color-hex-val');
        if (hexVal) hexVal.textContent = color.toUpperCase();
        const picker = document.getElementById('sheet-custom-color-picker');
        if (picker) picker.value = color;
      });
    });

    const picker = document.getElementById('sheet-custom-color-picker');
    if (picker) {
      picker.addEventListener('input', (e) => {
        applyCustomAccent(e.target.value);
        const hexVal = document.getElementById('custom-color-hex-val');
        if (hexVal) hexVal.textContent = e.target.value.toUpperCase();
      });
    }
  }

  floatingBtn.addEventListener('click', () => {
    sheet.classList.add('active');
    renderSheetContent();
    if (window.playUiSound) window.playUiSound('click');
  });

  const backdrop = document.getElementById('mobile-sheet-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => sheet.classList.remove('active'));
  }
  const closeBtn = document.getElementById('mobile-sheet-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => sheet.classList.remove('active'));
  }
}

export function applyCustomAccent(colorHex) {
  if (!colorHex) return;
  document.documentElement.style.setProperty('--theme-accent', colorHex);
  document.documentElement.style.setProperty('--accent-red', colorHex);
  document.documentElement.style.setProperty('--border-glow', `${colorHex}80`);
  document.documentElement.style.setProperty('--theme-accent-glow', `${colorHex}40`);
  document.documentElement.style.setProperty('--glow-timeline', `0 0 16px ${colorHex}80`);
  localStorage.setItem(ACCENT_STORAGE_KEY, colorHex);
}

export function applyTheme(themeId, customAccent = null) {
  const selectedTheme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  document.documentElement.setAttribute('data-theme', selectedTheme.id);

  // Apply or restore custom accent color
  if (customAccent) {
    applyCustomAccent(customAccent);
  } else {
    document.documentElement.style.removeProperty('--theme-accent');
    document.documentElement.style.removeProperty('--accent-red');
    document.documentElement.style.removeProperty('--border-glow');
    document.documentElement.style.removeProperty('--theme-accent-glow');
    document.documentElement.style.removeProperty('--glow-timeline');
  }

  // Update navbar button icon & tooltip
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.innerHTML = selectedTheme.icon;
    toggleBtn.setAttribute('title', `Theme: ${selectedTheme.name} (Click to change color)`);
    toggleBtn.setAttribute('aria-label', `Theme: ${selectedTheme.name}`);
    toggleBtn.style.boxShadow = `0 0 14px ${selectedTheme.accentColor}40`;
    toggleBtn.style.borderColor = `${selectedTheme.accentColor}60`;
  }

  // Update dropdown if open
  const dropdown = document.getElementById('theme-palette-dropdown');
  if (dropdown) {
    renderThemeDropdownContent(dropdown);
  }

  // Update mobile swatches
  renderMobileThemeSwatches();

  // Dispatch custom theme change event for particles
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: selectedTheme.id } }));
}

