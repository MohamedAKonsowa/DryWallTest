const { BUSINESS, SERVICES, LOCATIONS } = require('./site-data');

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
    sameAs: [BUSINESS.facebook],
    description:
      'Louisville Drywall & Painting LLC — drywall contractor and interior painter serving rural Kentucky and Southern Indiana.',
    image: `${BUSINESS.siteUrl}/images/work-vaulted.png`,
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
      { '@type': 'State', name: 'Kentucky' },
      { '@type': 'State', name: 'Indiana' },
    ],
    knowsAbout: [
      'Drywall installation',
      'Drywall repair',
      'Drywall finishing',
      'Interior painting',
      'Home renovation',
    ],
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
            <a href="tel:+15025462608">Call ${BUSINESS.phoneDisplay}</a>
            <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a>
            <a href="${BUSINESS.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
          </nav>
        </div>
      </div>
      <p class="footer__copy">&copy; ${new Date().getFullYear()} ${escapeHtml(BUSINESS.name)}. Rural Kentucky &amp; Southern Indiana.</p>
    </div>
  </footer>
  <aside class="sticky-cta" id="stickyCta" aria-label="Quick actions">
    <a href="/#schedule" class="sticky-cta__primary">Book Free Estimate</a>
    <a href="tel:+15025462608" class="sticky-cta__call">Call Now</a>
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
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="/images/logo.png" type="image/png">
  <title>${escapeHtml(title)}</title>
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${BUSINESS.siteUrl}/images/work-vaulted.png">
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
            <a href="tel:+15025462608" class="btn btn--outline-primary">Call ${BUSINESS.phoneDisplay}</a>
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
      <p class="page-cta__text">Affordable rates, no obligation. We'll come to you and provide a clear labor quote.</p>
      <div class="page-cta__actions">
        <a href="${scheduleUrl}" class="btn btn--primary btn--lg">Schedule Free Estimate</a>
        <a href="tel:+15025462608" class="btn btn--outline-dark btn--lg">Call ${BUSINESS.phoneDisplay}</a>
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
          <h2>Why choose our small crew?</h2>
          <p>We're not a big contractor with layers of markup. Louisville Drywall &amp; Painting LLC is a local crew that shows up when we say we will, keeps rates affordable, and treats your rural home with respect. You buy your own materials — we charge fair labor-only pricing.</p>
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
        <h1 class="page-hero__title">Drywall &amp; Painting in ${escapeHtml(location.city)}, ${location.stateAbbr}</h1>
        <p class="page-hero__desc">${escapeHtml(location.intro)}</p>
      </div>
    </section>
    <section class="page-content section">
      <div class="container page-content__grid">
        <div class="page-content__main">
          <h2>Drywall &amp; painting services in ${escapeHtml(location.city)}</h2>
          <ul class="page-list">
            <li>Drywall installation for remodels, basements, and additions</li>
            <li>Drywall repair — holes, cracks, and water damage</li>
            <li>Drywall finishing — taping, mudding, and smooth walls</li>
            <li>Interior painting — rooms, basements, and touch-ups</li>
          </ul>
          <h2>Affordable rates for ${escapeHtml(location.city)} homeowners</h2>
          <p>We're a small Louisville-based crew with low overhead, so we keep labor rates fair and affordable. Every job starts with a free on-site estimate — no pressure, no hidden fees. You purchase your own drywall, mud, tape, and paint.</p>
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
      name: 'Drywall & Painting Services',
      description:
        'Drywall installation, repair, finishing, and interior painting services from Louisville Drywall & Painting LLC.',
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
        <h1 class="page-hero__title">Drywall &amp; Painting Services in Louisville</h1>
        <p class="page-hero__desc">Louisville Drywall &amp; Painting LLC provides affordable drywall and interior painting throughout Louisville, surrounding communities, and rural areas across Kentucky and Southern Indiana.</p>
      </div>
    </section>
    <section class="section">
      <div class="container service-hub-grid">${cards}</div>
    </section>
    ${serviceAreasBlock()}
    ${ctaBand()}`;

  return pageShell({
    title: 'Drywall & Painting Services | Louisville Drywall & Painting LLC',
    description:
      'Drywall installation, repair, finishing, and interior painting in Louisville and surrounding KY and Southern IN. Affordable labor, free estimates. Call (502) 546-2608.',
    canonical,
    schema,
    body,
  });
}

module.exports = {
  renderServicePage,
  renderLocationPage,
  renderServicesHub,
};
