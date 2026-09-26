(function() {
  const prototypes = [
    { id: 'split-ledger', name: '1. Dual-Track Ledger', desc: 'Swiss precision, parallel recruiter/client paths' },
    { id: 'editorial-monograph', name: '2. Studio Monograph', desc: 'Tactile editorial catalog with deep project reading' },
    { id: 'linear-systems', name: '3. Systems Console', desc: 'High-velocity terminal, telemetry, capability matrix' },
    { id: 'bento-spatial', name: '4. Spatial Bento Showcase', desc: 'Modular zero-scroll first viewport, live preview tabs' },
    { id: 'kinetic-minimal', name: '5. Radical Minimalist Gallery', desc: 'Stark typography, expandable drawers, rapid scan' }
  ];

  // Pages live at two different depths (site root and prototypes/<id>/), so resolve
  // every link from this script's own location instead of hardcoding "../" prefixes.
  // shared/ is always directly under the site root, so its parent is the root.
  const scriptSrc = (document.currentScript && document.currentScript.src) || '';
  const siteRoot = scriptSrc.replace(/\/shared\/switcher-badge\.js(\?.*)?$/, '');
  const prototypesBase = siteRoot + '/prototypes/';
  const hubUrl = prototypesBase + 'index.html';

  const currentPath = window.location.pathname;
  const onHub = /\/prototypes\/?(index\.html)?$/.test(currentPath) || currentPath === siteRoot + '/';
  const currentProto = prototypes.find(function(p) { return currentPath.includes(p.id); }) || null;

  const label = currentProto
    ? currentProto.name.split('.')[1].trim()
    : (onHub ? 'All Prototypes' : 'Prototype Menu');

  const badge = document.createElement('div');
  badge.className = 'prototype-switcher-badge';
  badge.innerHTML = `
    <div class="psb-menu" id="psbMenu" aria-hidden="true">
      <div class="psb-header">
        <span class="psb-header-title">Prototypes (${prototypes.length})</span>
        <a href="${hubUrl}" class="psb-hub-link">Master Hub &nearr;</a>
      </div>
      <div class="psb-list">
        ${prototypes.map(p => `
          <a href="${prototypesBase}${p.id}/" class="psb-item ${currentProto && p.id === currentProto.id ? 'is-current' : ''}">
            <span class="psb-item-name">${p.name}</span>
            <span class="psb-item-desc">${p.desc}</span>
          </a>
        `).join('')}
      </div>
    </div>
    <button class="psb-trigger" id="psbTrigger" aria-label="Toggle prototype menu" aria-expanded="false" aria-controls="psbMenu">
      <span class="psb-dot"></span>
      <span>${label}</span>
      <span class="psb-num">&#9662;</span>
    </button>
  `;

  document.body.appendChild(badge);

  const trigger = document.getElementById('psbTrigger');
  const menu = document.getElementById('psbMenu');

  function setOpen(open) {
    menu.classList.toggle('is-active', open);
    menu.setAttribute('aria-hidden', String(!open));
    trigger.setAttribute('aria-expanded', String(open));
  }

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    setOpen(!menu.classList.contains('is-active'));
  });

  document.addEventListener('click', function(e) {
    if (!badge.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('is-active')) {
      setOpen(false);
      trigger.focus();
    }
  });
})();
