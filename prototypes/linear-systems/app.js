// Prototype 3: Linear Systems Console JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Filtering by Tags
  const filterBtns = document.querySelectorAll('.tag-btn');
  const systemCards = document.querySelectorAll('.system-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      systemCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('is-hidden');
        } else {
          const tags = card.getAttribute('data-tags') || '';
          if (tags.includes(filter)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        }
      });
    });
  });

  // 2. Tab Panels within System Cards
  systemCards.forEach(card => {
    const tabLinks = card.querySelectorAll('.tab-link');
    const tabPanels = card.querySelectorAll('.tab-panel');

    tabLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-target');

        tabLinks.forEach(l => l.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        link.classList.add('active');
        const activePanel = card.querySelector(`#${targetId}`);
        if (activePanel) activePanel.classList.add('active');
      });
    });
  });

  // 3. Modal Controls
  const modal = document.getElementById('consoleModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalTitle = document.getElementById('modalTitle');
  const mTabRole = document.getElementById('mTabRole');
  const mTabClient = document.getElementById('mTabClient');
  const mFormRole = document.getElementById('mFormRole');
  const mFormClient = document.getElementById('mFormClient');

  function openModal(mode = 'role') {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    setModalMode(mode);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function setModalMode(mode) {
    if (mode === 'client') {
      modalTitle.textContent = 'PROJECT INTAKE // COMMISSION CHANNEL';
      mTabClient.classList.add('active');
      mTabRole.classList.remove('active');
      mFormClient.classList.add('active');
      mFormRole.classList.remove('active');
    } else {
      modalTitle.textContent = 'ROLE INTAKE // RECRUITER CHANNEL';
      mTabRole.classList.add('active');
      mTabClient.classList.remove('active');
      mFormRole.classList.add('active');
      mFormClient.classList.remove('active');
    }
  }

  document.getElementById('btnTriggerRoleModal')?.addEventListener('click', () => openModal('role'));
  document.getElementById('btnTriggerClientModal')?.addEventListener('click', () => openModal('client'));

  mTabRole?.addEventListener('click', () => setModalMode('role'));
  mTabClient?.addEventListener('click', () => setModalMode('client'));

  btnCloseModal?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Card Action Buttons
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      openModal(action);
    });
  });

  // 4. Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore if inside an input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') closeModal();
      return;
    }

    if (e.key === '1') {
      document.getElementById('card-1')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '2') {
      document.getElementById('card-2')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '3') {
      document.getElementById('card-3')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === '4') {
      document.getElementById('card-4')?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key.toLowerCase() === 'r') {
      openModal('role');
    } else if (e.key.toLowerCase() === 'p') {
      openModal('client');
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 5. Template Copying
  document.getElementById('btnCopyConsoleRole')?.addEventListener('click', () => {
    const org = document.getElementById('mRoleOrg').value || '[Organization]';
    const title = document.getElementById('mRoleTitle').value;
    const details = document.getElementById('mRoleDetails').value || 'Reviewing architecture craft and system leadership.';

    const text = `Subject: Systems Engineering Conversation: ${title} @ ${org}

Hello Alex,

Reviewing your Systems Console portfolio. We would like to connect regarding a ${title} opportunity at ${org}.

Technical Context:
${details}

Best,
${org} Technical Team`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('mRoleAlert');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });

  document.getElementById('btnCopyConsoleClient')?.addEventListener('click', () => {
    const org = document.getElementById('mClientOrg').value || '[Client Company]';
    const scope = document.getElementById('mClientScope').value;
    const details = document.getElementById('mClientDetails').value || 'Scoping software engineering engagement.';

    const text = `Subject: Technical Commission Scope: ${scope} — ${org}

Hello Alex,

We would like to scope a project collaboration:
- Focus: ${scope}
- Details:
${details}

Regards,
${org}`;

    navigator.clipboard.writeText(text).then(() => {
      const alert = document.getElementById('mClientAlert');
      alert.style.display = 'block';
      setTimeout(() => alert.style.display = 'none', 4000);
    });
  });
});
