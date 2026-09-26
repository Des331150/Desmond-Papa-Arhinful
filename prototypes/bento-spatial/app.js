// Prototype 4: Spatial Bento Showcase JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Modal Data
  const projectData = {
    khepri: {
      title: 'Khepri: Distributed Event Mesh',
      desc: 'Lock-free RingBuffer in Rust with zero-copy socket splicing and WASM plugin filters handling 1.8M+ events/sec with sub-millisecond dispatching.',
      tradeoffs: 'Avoided unbounded channels to ensure deterministic memory bounds under peak telemetry load. Sacrificed dynamic heap elasticity for rock-solid zero-copy throughput.',
      metrics: ['P99: 420µs', 'Zero-copy: 100%', 'Throughput: 1.85M ev/s', 'Zero lock contention']
    },
    vesper: {
      title: 'Vesper: Spatial Data Canvas',
      desc: 'Infinite multi-user canvas rendering 250,000+ interactive nodes with real-time peer cursors, WebGL2 instanced shaders, and SharedArrayBuffer worker culling.',
      tradeoffs: 'Rendered nodes via instanced GLSL rather than SVG/DOM components. Offloaded collision quadtree searches to dedicated Web Workers to ensure 60fps frame rate.',
      metrics: ['60.0 FPS locked', 'Max nodes: 250,000', 'CRDT sync: 22ms', 'SharedArrayBuffer: Enabled']
    },
    chronicle: {
      title: 'Chronicle: Spec-First API Orchestrator',
      desc: 'Unified API schema engine compiling OpenAPI, GraphQL, and Protobuf into deterministic client SDKs and breaking-change guards across 40+ engineering teams.',
      tradeoffs: 'Chose static compilation during CI over runtime schema translation proxies. Avoided proxy latency overhead while guaranteeing 100% type safety.',
      metrics: ['Compile time: 1.8s', '40+ Teams', '0 Schema Regressions', 'Polyglot SDKs']
    },
    atelier: {
      title: 'Atelier: Autonomous Design Token Engine',
      desc: 'Cross-platform token compiler calculating perceptual contrast in OKLCH color space with guaranteed WCAG AAA compliance and zero-runtime CSS custom properties.',
      tradeoffs: 'Resolved all accessible color matrices ahead-of-time in build scripts, delivering lightweight static CSS without client runtime calculation penalties.',
      metrics: ['WCAG AAA compliant', 'Runtime cost: 0kB', 'Platforms: Web/iOS/Android', 'OKLCH color math']
    }
  };

  // Bento Inspector Modal
  const modal = document.getElementById('bentoInspectorModal');
  const backdrop = document.getElementById('bentoModalBackdrop');
  const closeBtn = document.getElementById('btnBentoModalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTradeoffs = document.getElementById('modalTradeoffs');
  const modalMetrics = document.getElementById('modalMetrics');

  document.querySelectorAll('[data-inspect]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-inspect');
      const data = projectData[key];
      if (data) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalTradeoffs.textContent = data.tradeoffs;
        modalMetrics.innerHTML = data.metrics.map(m => `<span class="m-chip">${m}</span>`).join('');
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Tabs for Contact Form
  const tabRole = document.getElementById('tabBentoRole');
  const tabClient = document.getElementById('tabBentoClient');
  const formRole = document.getElementById('bentoRoleForm');
  const formClient = document.getElementById('bentoClientForm');

  function setBentoMode(mode) {
    if (mode === 'client') {
      tabClient.classList.add('active');
      tabRole.classList.remove('active');
      formClient.style.display = 'block';
      formRole.style.display = 'none';
    } else {
      tabRole.classList.add('active');
      tabClient.classList.remove('active');
      formRole.style.display = 'block';
      formClient.style.display = 'none';
    }
  }

  tabRole?.addEventListener('click', () => setBentoMode('role'));
  tabClient?.addEventListener('click', () => setBentoMode('client'));

  document.querySelectorAll('[data-bento-mode]').forEach(link => {
    link.addEventListener('click', () => {
      const mode = link.getAttribute('data-bento-mode');
      setBentoMode(mode);
    });
  });

  // Submit Copy Handlers
  document.getElementById('btnSubmitBentoRole')?.addEventListener('click', () => {
    const org = document.getElementById('bentoRoleOrg').value || '[Organization]';
    const type = document.getElementById('bentoRoleType').value;
    const context = document.getElementById('bentoRoleContext').value || 'Reviewing technical capability and team fit.';

    const text = `Subject: Engineering Leadership Conversation: ${type} @ ${org}

Hello Alex,

Reviewing your Spatial Bento portfolio. We would like to initiate an interview conversation regarding a ${type} position at ${org}.

Focus:
${context}

Regards,
${org}`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('bentoRoleAlert');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });

  document.getElementById('btnSubmitBentoClient')?.addEventListener('click', () => {
    const org = document.getElementById('bentoClientOrg').value || '[Client Studio]';
    const type = document.getElementById('bentoClientType').value;
    const context = document.getElementById('bentoClientContext').value || 'Scoping technical build and deliverables.';

    const text = `Subject: Commission Inquiry: ${type} — ${org}

Hello Alex,

We are inquiring about contracting technical engineering services:
- Scope: ${type}
- Technical Context:
${context}

Best,
${org}`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('bentoClientAlert');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });
});
