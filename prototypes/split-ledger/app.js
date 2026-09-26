// Prototype 1: Dual-Track Ledger JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Spec Tabs within Project Cards
  document.querySelectorAll('.project-entry').forEach(entry => {
    const tabBtns = entry.querySelectorAll('.spec-tab-btn');
    const tabContents = entry.querySelectorAll('.spec-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = entry.querySelector(`#${targetTab}`);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  });

  // 2. Capability Ledger Filtering
  const skillItems = document.querySelectorAll('.skill-item');
  const projectEntries = document.querySelectorAll('.project-entry');
  const btnClearFilter = document.getElementById('btnClearFilter');

  skillItems.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.getAttribute('data-filter');
      const isAlreadyActive = item.classList.contains('active');

      skillItems.forEach(i => i.classList.remove('active'));

      if (isAlreadyActive) {
        // Clear filter
        projectEntries.forEach(p => p.classList.remove('is-dimmed'));
        btnClearFilter.style.display = 'none';
      } else {
        item.classList.add('active');
        btnClearFilter.style.display = 'block';

        projectEntries.forEach(p => {
          const skills = p.getAttribute('data-skills') || '';
          if (skills.toLowerCase().includes(filter.toLowerCase())) {
            p.classList.remove('is-dimmed');
          } else {
            p.classList.add('is-dimmed');
          }
        });
      }
    });
  });

  if (btnClearFilter) {
    btnClearFilter.addEventListener('click', () => {
      skillItems.forEach(i => i.classList.remove('active'));
      projectEntries.forEach(p => p.classList.remove('is-dimmed'));
      btnClearFilter.style.display = 'none';
    });
  }

  // 3. Contact Switch Tabs (Hiring vs Client)
  const tabHiring = document.getElementById('tabHiring');
  const tabClient = document.getElementById('tabClient');
  const formRole = document.getElementById('formRole');
  const formClient = document.getElementById('formClient');

  function setContactMode(mode) {
    if (mode === 'client') {
      tabClient.classList.add('active');
      tabClient.setAttribute('aria-selected', 'true');
      tabHiring.classList.remove('active');
      tabHiring.setAttribute('aria-selected', 'false');
      formClient.classList.add('active');
      formRole.classList.remove('active');
    } else {
      tabHiring.classList.add('active');
      tabHiring.setAttribute('aria-selected', 'true');
      tabClient.classList.remove('active');
      tabClient.setAttribute('aria-selected', 'false');
      formRole.classList.add('active');
      formClient.classList.remove('active');
    }
  }

  if (tabHiring && tabClient) {
    tabHiring.addEventListener('click', () => setContactMode('role'));
    tabClient.addEventListener('click', () => setContactMode('client'));
  }

  // Quick navigation triggers to set mode
  document.querySelectorAll('[data-target-mode], [data-mode]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const mode = trigger.getAttribute('data-target-mode') || trigger.getAttribute('data-mode');
      if (mode) {
        setContactMode(mode);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 4. Form Draft Handlers
  if (formRole) {
    formRole.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = document.getElementById('roleOrg').value;
      const title = document.getElementById('roleTitle').value;
      const context = document.getElementById('roleContext').value;

      const template = `Subject: Engineering Conversation: ${title} @ ${org}

Hi Alex,

I came across your portfolio and wanted to discuss a potential ${title} opportunity with ${org}.

Context & Focus:
${context || 'Reviewing systems architecture and product engineering capabilities.'}

Looking forward to connecting.`;

      navigator.clipboard.writeText(template).then(() => {
        const banner = document.getElementById('roleSuccessMsg');
        banner.style.display = 'block';
        setTimeout(() => banner.style.display = 'none', 5000);
      });
    });
  }

  if (formClient) {
    formClient.addEventListener('submit', (e) => {
      e.preventDefault();
      const org = document.getElementById('clientOrg').value;
      const scope = document.getElementById('clientScope').value;
      const timeline = document.getElementById('clientTimeline').value;
      const context = document.getElementById('clientContext').value;

      const template = `Subject: Project Inquiry: ${scope} — ${org}

Hi Alex,

We are reaching out to discuss a potential project engagement:
- Scope: ${scope}
- Target Timeline: ${timeline}

Brief Context:
${context || 'Looking to scope technical deliverables and architecture.'}

Best regards,
${org}`;

      navigator.clipboard.writeText(template).then(() => {
        const banner = document.getElementById('clientSuccessMsg');
        banner.style.display = 'block';
        setTimeout(() => banner.style.display = 'none', 5000);
      });
    });
  }
});
