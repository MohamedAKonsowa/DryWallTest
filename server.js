require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { SERVICES, LOCATIONS, getSitemapPaths } = require('./site-data');
const { renderServicePage, renderLocationPage, renderServicesHub } = require('./render');

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

const SITE_URL = process.env.SITE_URL || 'https://louisvilledrywallpaints.com';
const PRIMARY_DOMAIN = process.env.PRIMARY_DOMAIN || 'louisvilledrywallpaints.com';
const SECONDARY_DOMAIN = process.env.SECONDARY_DOMAIN || 'drywall-contractors.org';
const SITE_DOMAINS = [PRIMARY_DOMAIN, SECONDARY_DOMAIN].filter(
  (domain, index, list) => domain && list.indexOf(domain) === index
);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'quotes@louisvilledrywallpaints.org';
const CONTACT_PHONE = process.env.CONTACT_PHONE || '+1 5025462608';

app.use(express.json());

app.get('/robots.txt', (_req, res) => {
  const sitemapLines = SITE_DOMAINS.map((domain) => `Sitemap: https://${domain}/sitemap.xml`).join('\n');
  res.type('text/plain').send(`User-agent: *
Allow: /

${sitemapLines}
`);
});

app.get('/sitemap.xml', (_req, res) => {
  const lastmod = new Date().toISOString().split('T')[0];
  const paths = getSitemapPaths();
  const urls = SITE_DOMAINS.flatMap((domain) =>
    paths.map((pagePath) => {
      const loc = pagePath === '/' ? `https://${domain}/` : `https://${domain}${pagePath}`;
      const priority = pagePath === '/' ? '1.0' : pagePath === '/services' ? '0.9' : '0.8';
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
    })
  ).join('\n');

  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
});

app.get('/services', (_req, res) => {
  res.type('html').send(renderServicesHub());
});

SERVICES.forEach((service) => {
  app.get(service.path, (_req, res) => {
    res.type('html').send(renderServicePage(service));
  });
});

LOCATIONS.forEach((location) => {
  app.get(location.path, (_req, res) => {
    res.type('html').send(renderLocationPage(location));
  });
});

app.use(express.static(path.join(__dirname, 'public')));

const SMTP_TIMEOUT_MS = 15000;

function createTransporter() {
  const timeout = {
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  };

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      ...timeout,
    });
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      ...timeout,
    });
  }

  return null;
}

async function sendViaSmtp(mailOptions) {
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('SMTP not configured');
  }

  await transporter.sendMail(mailOptions);
}

app.get('/api/config', (_req, res) => {
  res.json({
    email: CONTACT_EMAIL,
    phone: CONTACT_PHONE,
    phoneLink: CONTACT_PHONE.replace(/\s/g, ''),
    web3formsKey: process.env.WEB3FORMS_ACCESS_KEY || null,
    siteUrl: SITE_URL,
  });
});

app.post('/api/contact', async (req, res) => {
  const {
    name,
    email,
    phone,
    message,
    service,
    location,
    preferredDate,
    preferredTime,
  } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !service?.trim() || !location?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  const bodyText = message?.trim() || 'No additional details provided.';
  const visitDate = preferredDate?.trim() || 'Flexible';
  const reachTime = preferredTime?.trim() || 'Anytime';

  const mailOptions = {
    from: process.env.SMTP_USER || CONTACT_EMAIL,
    to: CONTACT_EMAIL,
    replyTo: email.trim(),
    subject: `Estimate Request: ${service.trim()} — ${location.trim()}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service.trim()}`,
      `Location: ${location.trim()}`,
      `Preferred visit date: ${visitDate}`,
      `Best time to reach: ${reachTime}`,
      '',
      'Details:',
      bodyText,
    ].join('\n'),
    html: `
      <h2>New Estimate Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>
      <p><strong>Service:</strong> ${escapeHtml(service.trim())}</p>
      <p><strong>Location:</strong> ${escapeHtml(location.trim())}</p>
      <p><strong>Preferred visit date:</strong> ${escapeHtml(visitDate)}</p>
      <p><strong>Best time to reach:</strong> ${escapeHtml(reachTime)}</p>
      <p><strong>Details:</strong></p>
      <p>${escapeHtml(bodyText).replace(/\n/g, '<br>')}</p>
    `,
  };

  const hasSmtp = Boolean(
    process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS)
  );

  if (!hasSmtp) {
    return res.status(503).json({
      success: false,
      error:
        'Email service is not configured for server-side delivery. Use the contact form on the live site.',
    });
  }

  try {
    await sendViaSmtp(mailOptions);
    res.json({ success: true, message: 'Thank you! Your message has been sent.' });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({
      success: false,
      error: 'Unable to send your message right now. Please try calling us instead.',
    });
  }
});

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.get('*', (req, res) => {
  if (req.path === '/' || req.path === '/index.html') {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  res.status(404).type('html').send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Page Not Found</title>
<link rel="stylesheet" href="/css/styles.css"></head>
<body style="font-family:sans-serif;text-align:center;padding:4rem">
<h1>Page not found</h1>
<p><a href="/">Return home</a> · <a href="/services">View services</a></p>
</body></html>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
