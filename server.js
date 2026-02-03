require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (the frontend) from project root
app.use(express.static(__dirname));

// Allow same-origin requests; tighten for production as needed
app.use(cors({ origin: true }));

// Simple in-memory rate limiter per IP (basic protection)
const rateWindowMs = 60 * 1000; // 1 minute
const maxRequestsPerWindow = 10;
const ipStore = new Map();

function rateLimit(req, res, next){
  try{
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    let entry = ipStore.get(ip);
    if(!entry){ entry = { count: 1, start: now }; ipStore.set(ip, entry); }
    else{
      if(now - entry.start > rateWindowMs){ entry.count = 1; entry.start = now; }
      else entry.count++;
    }
    if(entry.count > maxRequestsPerWindow) return res.status(429).json({ error: 'Too many requests' });
  }catch(e){}
  next();
}

// Contact endpoint
app.post('/contact', rateLimit, async (req, res) => {
  const { name, email, message } = req.body || {};
  if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  // Create transporter from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    subject: `New Service Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try{
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true, message: 'Message sent' });
  }catch(err){
    console.error('Mail error:', err && err.message || err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
