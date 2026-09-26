// Prototype 2: Studio Monograph JavaScript (Freelance Practice & Client Inquiries)

document.addEventListener('DOMContentLoaded', () => {
  // ── Customize these two values (plus the identity in the HTML) ──
  const IDENTITY_FIRST_NAME = 'Desmond';
  // Read the address from the DOM so there is a single source of truth.
  const EMAIL = (document.getElementById('mainEmailText')?.textContent || 'arhinfuldesmondpapa02@gmail.com').trim();
  // ──────────────────────────────────────────────────────────────────────────────

  // Clipboard write with a fallback for non-secure origins, where navigator.clipboard
  // is undefined and .writeText() would throw a synchronous TypeError.
  function writeToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('Clipboard unavailable'));
    });
  }

  function flashLabel(buttonElement, label) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = `<span>${label}</span>`;
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
    }, 2500);
  }

  // 1. One-click Email Copy Handlers
  function copyEmailToClipboard(buttonElement) {
    writeToClipboard(EMAIL).then(() => {
      flashLabel(buttonElement, '&#10003; Copied!');
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
      flashLabel(buttonElement, 'Press &#8984;C');
    });
  }

  const btnQuickCopyEmail = document.getElementById('btnQuickCopyEmail');
  if (btnQuickCopyEmail) {
    btnQuickCopyEmail.addEventListener('click', () => copyEmailToClipboard(btnQuickCopyEmail));
  }

  const btnCopyMainEmail = document.getElementById('btnCopyMainEmail');
  if (btnCopyMainEmail) {
    btnCopyMainEmail.addEventListener('click', () => copyEmailToClipboard(btnCopyMainEmail));
  }

  // 2. Pre-fill Scoping Brief when clicking "Scope Project →" or "Inquire for Similar Project →"
  const selectScopeType = document.getElementById('projectScopeType');
  const textareaDetails = document.getElementById('projectDetails');
  const contactSection = document.getElementById('contact');

  // Maps a free-text service label onto a real <option value> in #projectScopeType.
  // Assigning a <select> a value that matches no option sets selectedIndex to -1 and
  // renders the control blank, so the mapping is explicit rather than assumed.
  const SCOPE_TYPE_ALIASES = {
    'API Development with FastAPI': 'API Development with FastAPI',
    'Django & DRF Backends': 'Django & DRF Backends',
    'AI-Backed Product Features': 'AI-Backed Product Features',
    'Document & Data Pipelines': 'Document & Data Pipelines',
    // Legacy labels from earlier drafts, kept so old links still resolve.
    '0-to-1 Web Application & Canvas Build': 'API Development with FastAPI',
    'Distributed Systems & Concurrency': 'Django & DRF Backends',
    'Design Systems & Token Engines': 'AI-Backed Product Features',
    'Technical Advisory & Architecture Audit': 'Document & Data Pipelines',
  };

  function resolveScopeType(rawLabel) {
    if (!selectScopeType) return null;
    const match = SCOPE_TYPE_ALIASES[rawLabel] || rawLabel;
    const exists = [...selectScopeType.options].some(o => o.value === match);
    if (exists) return match;
    console.warn(`No engagement-model option matches "${rawLabel}". Add it to SCOPE_TYPE_ALIASES or to #projectScopeType.`);
    return null;
  }

  document.querySelectorAll('[data-service-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const resolved = resolveScopeType(btn.getAttribute('data-service-type'));
      if (resolved) {
        selectScopeType.value = resolved;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Move focus with the viewport so keyboard users land where the eye goes.
        const heading = contactSection.querySelector('h2');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      }
    });
  });

  document.querySelectorAll('[data-inquire]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectRef = btn.getAttribute('data-inquire');
      if (textareaDetails && projectRef) {
        textareaDetails.value = `Inquiring about an engineering engagement similar to the "${projectRef}" case study.\n\nContext & Requirements:\n`;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (textareaDetails) {
          textareaDetails.focus({ preventScroll: true });
        }
      }
    });
  });

  // Smooth scroll for Discovery Call button
  const btnScrollBooking = document.getElementById('btnScrollBooking');
  if (btnScrollBooking) {
    btnScrollBooking.addEventListener('click', (e) => {
      e.preventDefault();
      const bookingItem = document.getElementById('btnBookingLink');
      if (bookingItem) {
        bookingItem.scrollIntoView({ behavior: 'smooth' });
        bookingItem.classList.add('pulse-highlight');
        setTimeout(() => bookingItem.classList.remove('pulse-highlight'), 2000);
      }
    });
  }

  // 3. Structured Scoping Brief Generator
  const scopingForm = document.getElementById('scopingBriefForm');
  const scopingAlert = document.getElementById('scopingAlert');
  const btnEmailDirect = document.getElementById('btnEmailDirect');

  if (scopingForm) {
    scopingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('clientCompany').value.trim() || '[Company / Studio]';
      const contactPerson = document.getElementById('clientContactName').value.trim() || '[Contact Name]';
      const model = document.getElementById('projectScopeType').value || '[Engagement Model]';
      const timeline = document.getElementById('projectTimeline').value;
      const details = document.getElementById('projectDetails').value.trim() || 'Seeking architectural review and product engineering delivery.';

      const structuredBrief = `Subject: Backend Project Brief: ${model} — ${company}

Dear ${IDENTITY_FIRST_NAME},

We are reaching out to discuss a backend engineering engagement:

- Client / Studio: ${company}
- Contact: ${contactPerson}
- Engagement Model: ${model}
- Target Timeline: ${timeline}

Technical Objectives & Context:
${details}

Looking forward to hearing the scope and timeline, and whether a short call makes sense.

Best regards,
${contactPerson}
${company}`;

      // Populate the mailto regardless of clipboard outcome, so the escape hatch
      // always carries the brief.
      if (btnEmailDirect) {
        const encodedSubject = encodeURIComponent(`Backend Project Brief: ${model} — ${company}`);
        const encodedBody = encodeURIComponent(structuredBrief.replace(/^Subject:.*?\n\n/, ''));
        btnEmailDirect.setAttribute('href', `mailto:${EMAIL}?subject=${encodedSubject}&body=${encodedBody}`);
      }

      writeToClipboard(structuredBrief).then(() => {
        if (scopingAlert) {
          scopingAlert.textContent = `Structured project brief copied to clipboard — ready to paste. Your email link has been filled in too.`;
          scopingAlert.style.display = 'block';
          setTimeout(() => {
            scopingAlert.style.display = 'none';
          }, 6000);
        }
      }).catch(err => {
        console.warn('Clipboard write failed:', err);
        if (scopingAlert) {
          scopingAlert.textContent = 'Could not reach the clipboard. Use “Open Email Client” — the full brief has been placed in the message body.';
          scopingAlert.style.display = 'block';
          setTimeout(() => {
            scopingAlert.style.display = 'none';
          }, 9000);
        }
      });
    });
  }

  // 4. Print / PDF Export
  const btnPrintPortfolio = document.getElementById('btnPrintPortfolio');
  if (btnPrintPortfolio) {
    btnPrintPortfolio.addEventListener('click', () => {
      window.print();
    });
  }

  // 5. Booking link placeholder alert
  const btnBookingLink = document.getElementById('btnBookingLink');
  if (btnBookingLink) {
    btnBookingLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Calendar booking is not configured yet. Email me directly and we can find a slot.');
    });
  }

  const btnDirectChat = document.getElementById('btnDirectChat');
  if (btnDirectChat) {
    btnDirectChat.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Add a Signal or WhatsApp handle here to enable direct messaging.');
    });
  }
});
