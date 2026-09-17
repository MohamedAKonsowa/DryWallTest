const { BUSINESS, SERVICES, LOCATIONS, getSameAs } = require('./site-data');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function businessSchema() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${BUSINESS.siteUrl}/#business`,
    name: BUSINESS.name,
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phone.replace(/\s/g, ''),
    email: BUSINESS.email,
    sameAs: getSameAs(),
    description:
      'Louisville Drywall & Painting LLC — drywall patching, hole and crack repair, sheet replacement, finishing, and interior painting in Louisville, KY and surrounding areas.',
    image: `${BUSINESS.siteUrl}/images/work-vaulted.png`,
    logo: `${BUSINESS.siteUrl}/images/logo.png`,
    priceRange: '$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Louisville',
      addressRegion: 'KY',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.2527,
      longitude: -85.7585,
    },
    areaServed: [
      { '@type': 'City', name: 'Louisville', containedInPlace: { '@type': 'State', name: 'Kentucky' } },
      { '@type': 'State', name: 'Kentucky' },
      { '@type': 'State', name: 'Indiana' },
    ],
    knowsAbout: [
      'Drywall patching',
      'Drywall hole repair',
      'Drywall crack repair',
      'Water damage drywall repair',
      'Drywall sheet replacement',
      'Drywall installation',
      'Drywall finishing',
      'Interior painting',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '2',
      bestRating: '5',
    },
  };
}

function breadcrumbs(items) {
  return items
    .map(
      (item, i) =>
        `<li class="breadcrumbs__item${i === items.length - 1 ? ' breadcrumbs__item--current' : ''}">${
          item.href
            ? `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`
            : `<span aria-current="page">${escapeHtml(item.label)}</span>`
        }</li>`
    )
    .join('');
}

function telHref() {
  return `tel:${BUSINESS.phone.replace(/\s/g, '')}`;
}

function headerHtml() {
  return `<header class="header" id="header">
    <div class="container header__inner">
      <a href="/" class="logo" aria-label="${escapeHtml(BUSINESS.name)}">
        <img src="/images/logo.png" alt="${escapeHtml(BUSINESS.name)} logo" class="logo__img" width="48" height="48">
        <span class="logo__text">Louisville Drywall<br><span class="logo__llc">&amp; Painting LLC</span></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" id="nav">
        <a href="/services" class="nav__link">Services</a>
        <a href="/brochure" class="nav__link">Brochure</a>
        <a href="/#jobs" class="nav__link">Patch Jobs</a>
        <a href="/#gallery" class="nav__link">Our Work</a>
        <a href="/#areas" class="nav__link">Service Area</a>
        <a href="/#reviews" class="nav__link">Reviews</a>
        <a href="/#schedule" class="nav__link nav__link--highlight">Schedule</a>
        <a href="/#schedule" class="btn btn--primary nav__cta">Book Estimate</a>
      </nav>
    </div>
  </header>`;
}

function footerHtml() {
  const serviceLinks = SERVICES.map(
    (s) => `<a href="${s.path}">${escapeHtml(s.name)}</a>`
  ).join('');
  const areaLinks = LOCATIONS.slice(0, 4)
    .map((l) => `<a href="${l.path}">${escapeHtml(l.city)}, ${l.stateAbbr}</a>`)
    .join('');

  return `<footer class="footer">
    <div class="container footer__extended">
      <div class="footer__brand">
        <img src="/images/logo.png" alt="${escapeHtml(BUSINESS.name)} logo" class="logo__img logo__img--footer" width="40" height="40">
        <span class="logo__text">Louisville Drywall<br><span class="logo__llc">&amp; Painting LLC</span></span>
      </div>
      <div class="footer__columns">
        <div class="footer__col">
          <h3 class="footer__col-title">Services</h3>
          <nav class="footer__col-links">${serviceLinks}</nav>
        </div>
        <div class="footer__col">
          <h3 class="footer__col-title">Service Areas</h3>
          <nav class="footer__col-links">${areaLinks}<a href="/#areas">View all areas</a></nav>
        </div>
        <div class="footer__col">
          <h3 class="footer__col-title">Contact</h3>
          <nav class="footer__col-links">
            <a href="/#schedule">Book a Visit</a>
            <a href="${BUSINESS.brochurePath}" target="_blank" rel="noopener noreferrer">Homeowner Brochure (PDF)</a>
            <a href="${telHref()}">Call ${BUSINESS.phoneDisplay}</a>
            <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a>
            <a href="${BUSINESS.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="${BUSINESS.thumbtack}" target="_blank" rel="noopener noreferrer">Thumbtack</a>
            <a href="${BUSINESS.yelp}" target="_blank" rel="noopener noreferrer">Yelp</a>
            <a href="${BUSINESS.angi}" target="_blank" rel="noopener noreferrer">Angi</a>
            <a href="/policies">Policies &amp; Terms</a>
          </nav>
        </div>
      </div>
      <p class="footer__copy">&copy; ${new Date().getFullYear()} ${escapeHtml(BUSINESS.name)}. <a href="/policies">Policies</a> · Rural Kentucky &amp; Southern Indiana.</p>
    </div>
  </footer>
  <aside class="sticky-cta" id="stickyCta" aria-label="Quick actions">
    <a href="/#schedule" class="sticky-cta__primary">Book Free Estimate</a>
    <a href="${telHref()}" class="sticky-cta__call">Call Now</a>
  </aside>`;
}

function pageShell({ title, description, canonical, schema, body }) {
  const schemaJson = JSON.stringify(
    { '@context': 'https://schema.org', '@graph': schema },
    null,
    2
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="/images/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/images/logo.png">
  <title>${escapeHtml(title)}</title>
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:site_name" content="${escapeHtml(BUSINESS.name)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${BUSINESS.siteUrl}/images/work-vaulted.png">
  <meta property="og:locale" content="en_US">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${BUSINESS.siteUrl}/images/work-vaulted.png">
  <script type="application/ld+json">${schemaJson}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  ${headerHtml()}
  <main>${body}</main>
  ${footerHtml()}
  <script src="/js/main.js"></script>
</body>
</html>`;
}

function serviceAreasBlock() {
  return `<section class="service-areas section section--alt">
      <div class="container">
        <h2 class="service-areas__title">Louisville &amp; surrounding areas we serve</h2>
        <p class="service-areas__intro">Based in Louisville, we provide drywall and painting services throughout the metro area and beyond. Not sure if we cover your town? Contact us and we'll confirm before scheduling.</p>
        <div class="areas__summary">
          <div class="areas__group areas__group--wide">
            <h3 class="areas__heading">Louisville metro &amp; nearby</h3>
            <p class="areas__text">Louisville and surrounding communities throughout the greater metro area — homes, basements, garages, and remodels we can reach by road.</p>
          </div>
          <div class="areas__group areas__group--wide">
            <h3 class="areas__heading">Kentucky &amp; Southern Indiana</h3>
            <p class="areas__text">We also travel to rural towns and country homes across Kentucky and Southern Indiana for drywall installation, repair, finishing, and painting.</p>
          </div>
        </div>
        <div class="areas__cta">
          <p class="areas__note"><strong>Not sure if we serve your area?</strong> Call, email, or use the contact form with your town — we'll let you know if we can come out to you.</p>
          <div class="areas__cta-actions">
            <a href="${scheduleLink()}" class="btn btn--primary">Ask About Your Area</a>
            <a href="${telHref()}" class="btn btn--outline-primary">Call ${BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>`;
}

function scheduleLink(serviceName, locationHint) {
  const params = new URLSearchParams();
  if (serviceName) params.set('service', serviceName);
  if (locationHint) params.set('location', locationHint);
  const query = params.toString();
  return query ? `/?${query}#schedule` : '/#schedule';
}

function ctaBand(serviceName, locationHint) {
  const scheduleUrl = scheduleLink(serviceName, locationHint);

  return `<section class="page-cta">
    <div class="container page-cta__inner">
      <h2 class="page-cta__title">Get a free on-site estimate</h2>
      <p class="page-cta__text">Patch jobs, repairs, installs, and paint — free on-site quote, no obligation.</p>
      <div class="page-cta__actions">
        <a href="${scheduleUrl}" class="btn btn--primary btn--lg">Schedule Free Estimate</a>
        <a href="${telHref()}" class="btn btn--outline-dark btn--lg">Call ${BUSINESS.phoneDisplay}</a>
      </div>
    </div>
  </section>`;
}

function renderServicePage(service) {
  const canonical = `${BUSINESS.siteUrl}${service.path}`;
  const schema = [
    businessSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: service.title,
      description: service.description,
      isPartOf: { '@id': `${BUSINESS.siteUrl}/#website` },
      about: { '@type': 'Service', name: service.name, serviceType: service.serviceType },
    },
    {
      '@type': 'Service',
      name: service.name,
      serviceType: service.serviceType,
      description: service.intro,
      provider: { '@id': `${BUSINESS.siteUrl}/#business` },
      areaServed: [
        { '@type': 'State', name: 'Kentucky' },
        { '@type': 'State', name: 'Indiana' },
      ],
      image: `${BUSINESS.siteUrl}${service.image}`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BUSINESS.siteUrl}/services` },
        { '@type': 'ListItem', position: 3, name: service.name, item: canonical },
      ],
    },
  ];

  const related = SERVICES.filter((s) => s.slug !== service.slug)
    .slice(0, 3)
    .map(
      (s) =>
        `<a href="${s.path}" class="related-card"><strong>${escapeHtml(s.name)}</strong><span>Learn more →</span></a>`
    )
    .join('');

  const body = `
    <section class="page-hero">
      <div class="container">
        <ol class="breadcrumbs">${breadcrumbs([
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
          { label: service.name },
        ])}</ol>
        <h1 class="page-hero__title">${escapeHtml(service.name)} in Louisville &amp; Surrounding Areas</h1>
        <p class="page-hero__desc">${escapeHtml(service.intro)}</p>
      </div>
    </section>
    <section class="page-content section">
      <div class="container page-content__grid">
        <div class="page-content__main">
          <h2>What we offer</h2>
          <ul class="page-list">${service.details.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
          ${
            service.slug === 'drywall-repair'
              ? `<h2>Patch jobs we handle every week</h2>
          <p>Most calls are for everyday drywall patching: nail and screw holes after removing shelves or TVs, doorknob holes in hallways, cracks along seams and corners, water stains on ceilings, and replacing a soft or damaged sheet. We also blend texture so the patch matches the rest of the wall before paint.</p>
          <p>Small single-wall patches and multi-room repair jobs are both welcome — tell us what you see and we'll quote the labor on-site.</p>`
              : ''
          }
          <h2>Why choose our small crew?</h2>
          <p>We're not a big contractor with layers of markup. Louisville Drywall &amp; Painting LLC is a local crew that shows up when we say we will, keeps rates affordable, and treats your home with respect. You buy your own materials — we charge fair labor-only pricing.</p>
          <p>We serve Louisville homeowners plus farmhouses, country homes, basements, garages, and room remodels throughout surrounding Kentucky and Southern Indiana.</p>
          <h2>Not sure if we serve your area?</h2>
          <p>Contact us with your town or address and we'll confirm whether we can come out before scheduling your free on-site estimate. We cover Louisville and surrounding communities, plus many rural areas across KY and Southern IN.</p>
        </div>
        <aside class="page-content__aside">
          <img src="${service.image}" alt="${escapeHtml(service.imageAlt)}" width="600" height="450" loading="lazy" class="page-content__image">
          <div class="page-aside-card">
            <p class="page-aside-card__label">Free estimate</p>
            <p class="page-aside-card__text">Tell us about your ${escapeHtml(service.name.toLowerCase())} project and we'll schedule a visit.</p>
            <a href="${scheduleLink(service.formValue)}" class="btn btn--primary btn--full">Request Quote</a>
          </div>
        </aside>
      </div>
    </section>
    ${serviceAreasBlock()}
    <section class="related section">
      <div class="container">
        <h2 class="related__title">Other services</h2>
        <div class="related__grid">${related}</div>
      </div>
    </section>
    ${ctaBand(service.formValue)}`;

  return pageShell({ title: service.title, description: service.description, canonical, schema, body });
}

function renderLocationPage(location) {
  const canonical = `${BUSINESS.siteUrl}${location.path}`;
  const schema = [
    businessSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: location.title,
      description: location.description,
      about: {
        '@type': 'City',
        name: location.city,
        containedInPlace: { '@type': 'State', name: location.state },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Service Area', item: `${BUSINESS.siteUrl}/#areas` },
        { '@type': 'ListItem', position: 3, name: `${location.city}, ${location.stateAbbr}`, item: canonical },
      ],
    },
  ];

  const serviceLinks = SERVICES.map(
    (s) =>
      `<a href="${s.path}" class="related-card"><strong>${escapeHtml(s.name)}</strong><span>Learn more →</span></a>`
  ).join('');

  const body = `
    <section class="page-hero">
      <div class="container">
        <ol class="breadcrumbs">${breadcrumbs([
          { href: '/', label: 'Home' },
          { href: '/#areas', label: 'Service Area' },
          { label: `${location.city}, ${location.stateAbbr}` },
        ])}</ol>
        <h1 class="page-hero__title">Drywall Patching &amp; Repair in ${escapeHtml(location.city)}, ${location.stateAbbr}</h1>
        <p class="page-hero__desc">${escapeHtml(location.intro)}</p>
      </div>
    </section>
    <section class="page-content section">
      <div class="container page-content__grid">
        <div class="page-content__main">
          <h2>Drywall jobs we take in ${escapeHtml(location.city)}</h2>
          <ul class="page-list">
            <li>Drywall patching — nail holes, doorknob holes, and large holes</li>
            <li>Crack repair, water damage fixes, and sheet replacement</li>
            <li>Drywall installation for remodels, basements, and additions</li>
            <li>Drywall finishing — taping, mudding, and smooth walls</li>
            <li>Interior painting and touch-ups after patch jobs</li>
          </ul>
          <h2>Affordable patch &amp; repair rates for ${escapeHtml(location.city)} homeowners</h2>
          <p>We're a small Louisville-based crew with low overhead, so we keep labor rates fair for everyday patch jobs and larger repairs. Every job starts with a free on-site estimate — no pressure, no hidden fees. You purchase your own drywall, mud, tape, and paint.</p>
          <h2>Nearby areas we also serve</h2>
          <p class="page-areas">${LOCATIONS.filter((l) => l.slug !== location.slug)
            .slice(0, 5)
            .map((l) => `<a href="${l.path}">${escapeHtml(l.city)}, ${l.stateAbbr}</a>`)
            .join(' · ')}</p>
        </div>
        <aside class="page-content__aside">
          <img src="/images/work-beam.png" alt="Drywall work in ${escapeHtml(location.city)}, ${location.stateAbbr}" width="600" height="450" loading="lazy" class="page-content__image">
          <div class="page-aside-card">
            <p class="page-aside-card__label">${escapeHtml(location.city)} estimates</p>
            <p class="page-aside-card__text">Tell us your ${escapeHtml(location.city)} address and project details — we'll confirm we can come out.</p>
            <a href="${scheduleLink(null, `${location.city}, ${location.stateAbbr}`)}" class="btn btn--primary btn--full">Schedule Visit</a>
          </div>
        </aside>
      </div>
    </section>
    <section class="related section section--alt">
      <div class="container">
        <h2 class="related__title">Our services</h2>
        <div class="related__grid">${serviceLinks}</div>
      </div>
    </section>
    ${ctaBand(null, `${location.city}, ${location.stateAbbr}`)}`;

  return pageShell({
    title: location.title,
    description: location.description,
    canonical,
    schema,
    body,
  });
}

function renderServicesHub() {
  const canonical = `${BUSINESS.siteUrl}/services`;
  const schema = [
    businessSchema(),
    {
      '@type': 'CollectionPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: 'Drywall Patching & Repair Services',
      description:
        'Drywall patching, hole and crack repair, sheet replacement, finishing, and interior painting from Louisville Drywall & Painting LLC.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Services', item: canonical },
      ],
    },
  ];

  const cards = SERVICES.map(
    (s) => `<article class="service-hub-card">
      <a href="${s.path}" class="service-hub-card__link">
        <img src="${s.image}" alt="${escapeHtml(s.imageAlt)}" width="400" height="280" loading="lazy">
        <div class="service-hub-card__body">
          <h2>${escapeHtml(s.name)}</h2>
          <p>${escapeHtml(s.intro.slice(0, 120))}…</p>
          <span class="service-hub-card__cta">View service →</span>
        </div>
      </a>
    </article>`
  ).join('');

  const body = `
    <section class="page-hero">
      <div class="container">
        <ol class="breadcrumbs">${breadcrumbs([
          { href: '/', label: 'Home' },
          { label: 'Services' },
        ])}</ol>
        <h1 class="page-hero__title">Drywall Patching, Repair &amp; Painting in Louisville</h1>
        <p class="page-hero__desc">We specialize in drywall patch jobs — holes, cracks, water damage, and sheet replacement — plus installation, finishing, and interior painting across Louisville, KY and surrounding areas.</p>
      </div>
    </section>
    <section class="section">
      <div class="container service-hub-grid">${cards}</div>
    </section>
    ${serviceAreasBlock()}
    ${ctaBand()}`;

  return pageShell({
    title: 'Drywall Patching & Repair Services | Louisville Drywall & Painting LLC',
    description:
      'Drywall patching, hole and crack repair, sheet replacement, finishing, and painting in Louisville KY. Free estimates. Call (502) 218-0426.',
    canonical,
    schema,
    body,
  });
}

function renderPoliciesPage() {
  const canonical = `${BUSINESS.siteUrl}/policies`;
  const schema = [
    businessSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: 'Policies & Terms',
      description:
        'Booking, deposit, payment, and service policies for Louisville Drywall & Painting LLC.',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Policies & Terms', item: canonical },
      ],
    },
  ];

  const body = `
    <section class="page-hero">
      <div class="container">
        <ol class="breadcrumbs">${breadcrumbs([
          { href: '/', label: 'Home' },
          { label: 'Policies & Terms' },
        ])}</ol>
        <h1 class="page-hero__title">Policies &amp; Terms</h1>
        <p class="page-hero__desc">Clear, straightforward policies for estimates, deposits, scheduling, and payment. Questions? <a href="${telHref()}">Call ${BUSINESS.phoneDisplay}</a> or <a href="/#schedule">contact us</a>.</p>
      </div>
    </section>
    <section class="section">
      <div class="container policy-prose">
        <p class="policy-prose__updated">Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <h2>About these policies</h2>
        <p>These policies apply to drywall and painting services provided by ${escapeHtml(BUSINESS.name)} in Louisville, surrounding communities, and rural areas across Kentucky and Southern Indiana. By scheduling work with us, you agree to the terms below.</p>

        <h2>Free estimates</h2>
        <ul>
          <li>We provide free on-site estimates for qualifying projects.</li>
          <li>Estimates are based on visible conditions at the time of our visit. Hidden damage, code issues, or changes to scope may require a revised quote.</li>
          <li>Written or verbal quotes are valid for <strong>30 days</strong> unless otherwise noted.</li>
          <li>Not sure if we serve your area? Contact us with your town before scheduling — we will confirm coverage.</li>
        </ul>

        <h2>Deposits</h2>
        <ul>
          <li>For any job with a total labor quote <strong>over $1,000</strong>, we require a <strong>15% deposit</strong> to reserve your project on our schedule.</li>
          <li>The deposit is calculated from the agreed labor total shown on your estimate.</li>
          <li>Deposits are due before work is scheduled or before materials are staged, whichever comes first.</li>
          <li>Jobs under $1,000 generally do not require a deposit unless special ordering or scheduling arrangements are needed.</li>
          <li>Deposits are applied toward your final balance and are non-refundable if you cancel after we have reserved dates or declined other work to hold your slot.</li>
        </ul>

        <h2>Materials</h2>
        <ul>
          <li><strong>You purchase your own materials</strong> — including drywall, mud, tape, primer, paint, and related supplies.</li>
          <li>We charge for labor only. This keeps your costs transparent and lets you choose the products you want.</li>
          <li>Materials must be on-site and ready before we begin, unless otherwise agreed in writing.</li>
          <li>We are not responsible for product defects, color mismatch, or manufacturer issues with customer-supplied materials.</li>
        </ul>

        <h2>Scheduling &amp; access</h2>
        <ul>
          <li>We schedule work Monday through Saturday, 8:00 AM – 6:00 PM, subject to availability.</li>
          <li>Please provide clear access to the work area, electricity, and a safe workspace.</li>
          <li>We will confirm your appointment by phone or email before arrival.</li>
          <li>If we cannot access the job site at the scheduled time, a return trip may delay completion and could affect pricing for mobilization.</li>
        </ul>

        <h2>Cancellations &amp; rescheduling</h2>
        <ul>
          <li>Please give at least <strong>48 hours notice</strong> if you need to cancel or reschedule.</li>
          <li>Cancellations with less than 48 hours notice on reserved jobs over $1,000 may forfeit the deposit.</li>
          <li>Weather, safety concerns, or unforeseen site conditions may require rescheduling — we will communicate as early as possible.</li>
        </ul>

        <h2>Payment</h2>
        <ul>
          <li>Remaining balance is due upon substantial completion of the agreed scope of work unless other terms are written on your estimate.</li>
          <li>We accept payment methods agreed upon at booking (e.g. check, cash, or electronic payment where available).</li>
          <li>Late payment may result in paused work and reasonable collection of any outstanding balance.</li>
        </ul>

        <h2>Changes to scope</h2>
        <ul>
          <li>Any work outside the original estimate — extra rooms, repairs discovered after demo, texture changes, etc. — requires approval and may be billed separately.</li>
          <li>We will communicate change-order pricing before performing additional work whenever possible.</li>
        </ul>

        <h2>Workmanship</h2>
        <ul>
          <li>We stand behind our labor and take pride in professional drywall and painting finishes.</li>
          <li>If you have a concern about our work, notify us within <strong>14 days</strong> of completion so we can review the issue.</li>
          <li>Warranty covers labor defects under normal use; it does not cover damage from moisture intrusion, structural movement, customer-supplied materials, or work performed by others after we leave.</li>
        </ul>

        <h2>Liability</h2>
        <ul>
          <li>Homeowners are responsible for moving furniture, valuables, and fragile items unless furniture moving was included in the estimate.</li>
          <li>We carry reasonable care for your property while on site but are not liable for pre-existing conditions, hidden defects, or normal construction dust in active work areas.</li>
          <li>We are not licensed electricians, plumbers, or HVAC contractors — we do not perform work outside drywall and interior painting unless explicitly quoted.</li>
        </ul>

        <h2>Privacy &amp; communication</h2>
        <ul>
          <li>Information you submit through our website contact form or by phone/email is used only to respond to your inquiry and schedule estimates.</li>
          <li>We do not sell your personal information.</li>
        </ul>

        <h2>Contact</h2>
        <p>Questions about these policies or your project?</p>
        <ul>
          <li><strong>Phone:</strong> <a href="${telHref()}">${BUSINESS.phoneDisplay}</a></li>
          <li><strong>Email:</strong> <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
          <li><strong>Schedule online:</strong> <a href="/#schedule">Request a free estimate</a></li>
        </ul>
      </div>
    </section>
    ${ctaBand()}`;

  return pageShell({
    title: 'Policies & Terms | Louisville Drywall & Painting LLC',
    description:
      'Deposit, payment, scheduling, and service policies for Louisville Drywall & Painting LLC. 15% deposit on jobs over $1,000. Call (502) 218-0426.',
    canonical,
    schema,
    body,
  });
}

function renderBrochurePage() {
  const canonical = `${BUSINESS.siteUrl}/brochure`;
  const pdfUrl = BUSINESS.brochurePath;
  const schema = [
    businessSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: 'Homeowner Brochure',
      description:
        'Download or view the Louisville Drywall & Painting LLC homeowner brochure — drywall patching, repair, finishing, and painting services.',
    },
    {
      '@type': 'DigitalDocument',
      name: 'Louisville Drywall & Painting Homeowner Brochure',
      encodingFormat: 'application/pdf',
      url: `${BUSINESS.siteUrl}${pdfUrl}`,
      about: { '@id': `${BUSINESS.siteUrl}/#business` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS.siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Brochure', item: canonical },
      ],
    },
  ];

  const body = `
    <section class="page-hero">
      <div class="container">
        <ol class="breadcrumbs">${breadcrumbs([
          { href: '/', label: 'Home' },
          { label: 'Brochure' },
        ])}</ol>
        <h1 class="page-hero__title">Homeowner Brochure</h1>
        <p class="page-hero__desc">A quick overview of our drywall patching, repair, finishing, and painting services for Louisville-area homeowners. View it below or download the PDF.</p>
        <div class="brochure-actions">
          <a href="${pdfUrl}" class="btn btn--primary" download>Download PDF</a>
          <a href="${pdfUrl}" class="btn btn--outline-primary" target="_blank" rel="noopener noreferrer">Open in New Tab</a>
          <a href="/#schedule" class="btn btn--outline-primary">Book Free Estimate</a>
        </div>
      </div>
    </section>
    <section class="section brochure-viewer">
      <div class="container">
        <div class="brochure-frame-wrap">
          <iframe
            class="brochure-frame"
            title="Louisville Drywall &amp; Painting homeowner brochure PDF"
            src="${pdfUrl}#view=FitH"
            loading="lazy"
          ></iframe>
        </div>
        <p class="brochure-fallback">
          PDF not showing?
          <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Open the brochure</a>
          or
          <a href="${pdfUrl}" download>download it</a>.
        </p>
        <figure class="brochure-preview">
          <img src="${BUSINESS.brochurePreview}" alt="Preview of the Louisville Drywall &amp; Painting LLC homeowner brochure" width="1081" height="1400" loading="lazy">
          <figcaption>Brochure preview — 3 pages covering services, patch jobs, and how to request an estimate.</figcaption>
        </figure>
      </div>
    </section>
    ${ctaBand()}`;

  return pageShell({
    title: 'Homeowner Brochure (PDF) | Louisville Drywall & Painting LLC',
    description:
      'View or download the Louisville Drywall & Painting LLC homeowner brochure — drywall patching, repair, finishing, and painting. Call (502) 218-0426.',
    canonical,
    schema,
    body,
  });
}

module.exports = {
  renderServicePage,
  renderLocationPage,
  renderServicesHub,
  renderPoliciesPage,
  renderBrochurePage,
};
