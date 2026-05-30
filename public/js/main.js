(function () {
  const FALLBACK = {
    email: 'mkonma647@gmail.com',
    phone: '+1 5025462608',
    phoneLink: '+15025462608',
  };

  let config = { ...FALLBACK };

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function setPhoneLinks(phone, phoneLink) {
    const tel = `tel:${phoneLink || phone.replace(/\s/g, '')}`;
    const ids = [
      'headerCallBtn',
      'heroCallBtn',
      'ctaCallBtn',
      'contactPhoneLink',
      'footerPhoneLink',
    ];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.href = tel;
        if (id === 'contactPhoneLink') return;
        el.textContent = id === 'headerCallBtn' || id === 'heroCallBtn' || id === 'ctaCallBtn'
          ? (id === 'headerCallBtn' ? 'Call Now' : id === 'heroCallBtn' ? 'Call Us' : 'Call Now')
          : 'Call';
      }
    });

    const phoneDisplay = document.getElementById('contactPhone');
    if (phoneDisplay) phoneDisplay.textContent = phone;
  }

  function setEmailLinks(email) {
    const mailto = `mailto:${email}`;
    const ids = ['ctaEmailBtn', 'contactEmailLink', 'footerEmailLink'];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = mailto;
    });

    const emailDisplay = document.getElementById('contactEmail');
    if (emailDisplay) emailDisplay.textContent = email;
  }

  async function loadConfig() {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        config = await res.json();
      }
    } catch (_) {
      /* use fallback */
    }

    setPhoneLinks(config.phone, config.phoneLink);
    setEmailLinks(config.email);
  }

  async function submitViaWeb3Forms(payload, accessKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Drywall Inquiry from ${payload.name}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        message: payload.message,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Unable to send message.');
    }

    return data;
  }

  async function submitViaServer(payload, signal) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Invalid server response');
    }

    return res.json();
  }

  function closeNav() {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      let data;

      if (config.web3formsKey) {
        data = await submitViaWeb3Forms(payload, config.web3formsKey);
        data = { success: true, message: data.message || 'Thank you! Your message has been sent.' };
      } else {
        data = await submitViaServer(payload, controller.signal);
      }

      if (data.success) {
        formStatus.textContent = data.message;
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = data.error || 'Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      formStatus.textContent = timedOut
        ? 'Request timed out. Please try again in a moment or call us directly.'
        : err.message || 'Network error. Please call us directly.';
      formStatus.className = 'form-status error';
    } finally {
      clearTimeout(timeoutId);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });

  loadConfig();
})();
