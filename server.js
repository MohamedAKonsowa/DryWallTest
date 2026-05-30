require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'mkonma647@gmail.com';
const CONTACT_PHONE = process.env.CONTACT_PHONE || '+1 5025462608';

app.use(express.json());
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

async function sendViaWeb3Forms({ name, email, phone, message }) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: `New Drywall Inquiry from ${name.trim()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      message: message.trim(),
    }),
    signal: AbortSignal.timeout(SMTP_TIMEOUT_MS),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Web3Forms request failed');
  }
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
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in your name, email, and message.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  const mailOptions = {
    from: process.env.SMTP_USER || CONTACT_EMAIL,
    to: CONTACT_EMAIL,
    replyTo: email.trim(),
    subject: `New Drywall Inquiry from ${name.trim()}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phone?.trim() ? `Phone: ${phone.trim()}` : null,
      '',
      'Message:',
      message.trim(),
    ]
      .filter(Boolean)
      .join('\n'),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      ${phone?.trim() ? `<p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
    `,
  };

  const hasWeb3Forms = Boolean(process.env.WEB3FORMS_ACCESS_KEY);
  const hasSmtp = Boolean(
    !process.env.WEB3FORMS_ACCESS_KEY &&
      (process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS))
  );

  if (!hasWeb3Forms && !hasSmtp) {
    return res.status(503).json({
      success: false,
      error:
        'Email service is not configured yet. Please call us directly or email us using the contact info above.',
    });
  }

  try {
    if (hasWeb3Forms) {
      await sendViaWeb3Forms({ name, email, phone, message });
    } else {
      await sendViaSmtp(mailOptions);
    }

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

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
