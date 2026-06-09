(function () {
  const FALLBACK = {
    email: 'quotes@louisvilledrywallpaints.org',
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
  const preferredDateInput = document.getElementById('preferredDate');
  const stickyCta = document.getElementById('stickyCta');
  const scheduleSection = document.getElementById('schedule');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.min = today;
  }

  function setPhoneLinks(phone, phoneLink) {
    const tel = `tel:${phoneLink || phone.replace(/\s/g, '')}`;
    const ids = [
      'heroCallBtn',
      'stepsCallLink',
      'contactPhoneLink',
      'footerPhoneLink',
      'stickyCallBtn',
    ];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.href = tel;
      if (id === 'contactPhoneLink') return;
      if (id === 'heroCallBtn') {
        el.textContent = `Call ${formatPhoneDisplay(phone)}`;
      } else if (id === 'stepsCallLink') {
        el.textContent = `Call ${formatPhoneDisplay(phone)}`;
      } else if (id === 'stickyCallBtn') {
        el.textContent = 'Call Now';
      } else if (id === 'footerPhoneLink') {
        el.textContent = 'Call Us Today';
      } else {
        el.textContent = 'Call';
      }
    });

    const phoneDisplay = document.getElementById('contactPhone');
    if (phoneDisplay) phoneDisplay.textContent = phone;
  }

  function formatPhoneDisplay(phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('1')) {
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  }

  function setEmailLinks(email) {
    const mailto = `mailto:${email}`;
    const ids = ['contactEmailLink'];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = mailto;
    });

    const emailDisplay = document.getElementById('contactEmail');
    if (emailDisplay) emailDisplay.textContent = email;
  }

  function buildScheduleMessage(fields) {
    const lines = [
      `SERVICE: ${fields.service}`,
      `LOCATION: ${fields.location}`,
      `PREFERRED VISIT DATE: ${fields.preferredDate || 'Flexible'}`,
      `BEST TIME TO REACH: ${fields.preferredTime}`,
    ];

    if (fields.message) {
      lines.push('', 'PROJECT DETAILS:', fields.message);
    }

    return lines.join('\n');
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
        subject: `Estimate Request: ${payload.service} — ${payload.location}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        service: payload.service,
        location: payload.location,
        preferred_date: payload.preferredDate || 'Flexible',
        preferred_time: payload.preferredTime,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Unable to send request.');
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
    if (!nav || !navToggle) return;
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function initStickyCta() {
    if (!stickyCta) return;

    const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

    if (!scheduleSection) {
      const showSticky = () => {
        if (!isMobile()) {
          stickyCta.classList.remove('is-visible');
          document.body.classList.remove('has-sticky-cta');
          return;
        }
        stickyCta.classList.add('is-visible');
        document.body.classList.add('has-sticky-cta');
      };
      showSticky();
      window.addEventListener('resize', showSticky);
      return;
    }

    const updateSticky = (visible) => {
      if (!isMobile()) {
        stickyCta.classList.remove('is-visible');
        document.body.classList.remove('has-sticky-cta');
        return;
      }
      stickyCta.classList.toggle('is-visible', visible);
      document.body.classList.toggle('has-sticky-cta', visible);
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateSticky(!entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(scheduleSection);
    window.addEventListener('resize', () => {
      if (!isMobile()) updateSticky(false);
    });

    if (isMobile() && window.scrollY < scheduleSection.offsetTop - 100) {
      updateSticky(true);
    }
  }

  function prefillFormFromUrl() {
    if (!contactForm) return;

    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    const location = params.get('location');

    if (service) {
      const select = document.getElementById('service');
      if (select) {
        for (const option of select.options) {
          if (option.value === service) {
            select.value = service;
            break;
          }
        }
      }
    }

    if (location) {
      const locationInput = document.getElementById('location');
      if (locationInput) locationInput.value = location;
    }

    if (window.location.hash === '#schedule') {
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const formData = new FormData(contactForm);
    const fields = {
      service: formData.get('service')?.toString().trim(),
      location: formData.get('location')?.toString().trim(),
      name: formData.get('name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      preferredDate: formData.get('preferredDate')?.toString().trim(),
      preferredTime: formData.get('preferredTime')?.toString().trim() || 'Anytime',
      details: formData.get('message')?.toString().trim(),
    };

    if (!fields.service || !fields.location || !fields.name || !fields.phone || !fields.email) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const payload = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      service: fields.service,
      location: fields.location,
      preferredDate: fields.preferredDate,
      preferredTime: fields.preferredTime,
      message: buildScheduleMessage({ ...fields, message: fields.details }),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      let data;

      if (config.web3formsKey) {
        data = await submitViaWeb3Forms(payload, config.web3formsKey);
        data = {
          success: true,
          message: 'Request received! We\'ll contact you within 1 business day to confirm your visit.',
        };
      } else {
        data = await submitViaServer(payload, controller.signal);
        if (data.success) {
          data.message = 'Request received! We\'ll contact you within 1 business day to confirm your visit.';
        }
      }

      if (data.success) {
        formStatus.textContent = data.message;
        formStatus.className = 'form-status success';
        contactForm.reset();
        if (preferredDateInput) {
          preferredDateInput.min = new Date().toISOString().split('T')[0];
        }
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
      submitBtn.textContent = 'Request Free Estimate';
    }
    });
  }

  if (window.location.hash === '#contact') {
    history.replaceState(null, '', '#schedule');
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  }

  loadConfig();
  prefillFormFromUrl();
  initStickyCta();
})();
