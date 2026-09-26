// Master Hub Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('previewIframe');
  const frameContainer = document.getElementById('frameContainer');
  const protoTabs = document.querySelectorAll('.proto-tab-btn');
  const currentProtoName = document.getElementById('currentProtoName');
  const btnLaunchFull = document.getElementById('btnLaunchFull');
  const vpButtons = document.querySelectorAll('.vp-btn');
  const btnRcViews = document.querySelectorAll('.btn-rc-view');

  const prototypes = {
    'editorial-monograph': {
      name: 'Prototype 2: Studio Monograph (Selected Freelance Direction)',
      url: 'editorial-monograph/index.html'
    },
    'split-ledger': {
      name: 'Prototype 1: Dual-Track Ledger',
      url: 'split-ledger/index.html'
    },
    'linear-systems': {
      name: 'Prototype 3: Systems Console',
      url: 'linear-systems/index.html'
    },
    'bento-spatial': {
      name: 'Prototype 4: Spatial Bento',
      url: 'bento-spatial/index.html'
    },
    'kinetic-minimal': {
      name: 'Prototype 5: Radical Minimalist',
      url: 'kinetic-minimal/index.html'
    }
  };

  function switchPrototype(protoId) {
    const proto = prototypes[protoId];
    if (!proto) return;

    // Update active tab button
    protoTabs.forEach(btn => {
      if (btn.getAttribute('data-proto-id') === protoId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update indicator and full button
    currentProtoName.textContent = proto.name;
    btnLaunchFull.setAttribute('href', proto.url);

    // Load iframe
    iframe.src = proto.url;

    // Persist
    localStorage.setItem('hub_selected_prototype', protoId);
  }

  // Bind tab clicks
  protoTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const protoId = btn.getAttribute('data-proto-id');
      switchPrototype(protoId);
    });
  });

  // Bind rationale card "Switch Preview" buttons
  btnRcViews.forEach(btn => {
    btn.addEventListener('click', () => {
      const protoId = btn.getAttribute('data-launch');
      switchPrototype(protoId);
      // Scroll smoothly up to the viewer
      document.querySelector('.viewer-controls-bar').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Viewport switching
  vpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const width = btn.getAttribute('data-width');

      vpButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      frameContainer.style.width = width;
    });
  });

  // Default to editorial-monograph for this freelance pivot
  const urlParams = new URLSearchParams(window.location.search);
  const paramProto = urlParams.get('p');
  const savedProto = localStorage.getItem('hub_selected_prototype');
  const initialProto = paramProto || savedProto || 'editorial-monograph';

  if (prototypes[initialProto]) {
    switchPrototype(initialProto);
  }
});
