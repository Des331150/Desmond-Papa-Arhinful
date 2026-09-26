// Prototype 5: Radical Minimalist Gallery JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Accordion Drawer Expansion
  const drawers = document.querySelectorAll('.min-drawer');

  // Open first drawer by default for immediate evaluation
  if (drawers.length > 0) {
    drawers[0].classList.add('is-open');
    drawers[0].querySelector('.drawer-header').setAttribute('aria-expanded', 'true');
  }

  drawers.forEach(drawer => {
    const header = drawer.querySelector('.drawer-header');
    header.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      header.setAttribute('aria-expanded', isOpen);
    });
  });

  // 2. Dual Pathway Tabs in Intake
  const tabRole = document.getElementById('tabRoleMin');
  const tabClient = document.getElementById('tabClientMin');
  const formRole = document.getElementById('formRoleMin');
  const formClient = document.getElementById('formClientMin');

  function setMinMode(mode) {
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

  tabRole?.addEventListener('click', () => setMinMode('role'));
  tabClient?.addEventListener('click', () => setMinMode('client'));

  document.querySelectorAll('[data-min-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-min-tab');
      setMinMode(mode);
    });
  });

  // 3. Template Copy Handlers
  document.getElementById('btnCopyRoleMin')?.addEventListener('click', () => {
    const org = document.getElementById('roleOrgMin').value || '[Organization]';
    const type = document.getElementById('roleTypeMin').value;
    const notes = document.getElementById('roleNotesMin').value || 'Reviewing systems architecture and engineering capabilities.';

    const text = `Subject: Engineering Leadership Conversation: ${type} @ ${org}

Hello Alex,

Reviewing your Minimalist Gallery portfolio. We'd like to initiate an interview conversation regarding a ${type} position at ${org}.

Context:
${notes}

Best regards,
${org}`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('roleAlertMin');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });

  document.getElementById('btnCopyClientMin')?.addEventListener('click', () => {
    const org = document.getElementById('clientOrgMin').value || '[Client Studio]';
    const type = document.getElementById('clientTypeMin').value;
    const notes = document.getElementById('clientNotesMin').value || 'Scoping engineering build and technical deliverables.';

    const text = `Subject: Project Commission Inquiry: ${type} — ${org}

Hello Alex,

We wish to discuss commissioning a technical project:
- Focus: ${type}
- Scope Notes:
${notes}

Regards,
${org}`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('clientAlertMin');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });
});
