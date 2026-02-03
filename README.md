# Digital Tech Solutions — Local Server for Contact Form

This project adds a minimal Node/Express backend to receive contact form submissions and send them via SMTP (using `nodemailer`).

Setup

1. Install Node.js (16+) and npm.
2. In the project root, install dependencies:

```bash
npm install
```

3. Create a `.env` file (or set environment variables) with the following values:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
MAIL_FROM="Your Name <no-reply@yourdomain.com>"
MAIL_TO=you@yourdomain.com
PORT=3000
```

4. Run the server:

```bash
npm start
```

The server serves the static frontend files and exposes `POST /contact` which expects JSON `{ name, email, message }`.

Security notes

- Keep SMTP credentials out of source control. Use environment variables or a secrets manager.
- Client-side protections are deterrents only — do not put secrets in client code.
- For production, restrict CORS origins and enable proper logging, monitoring, and rate limiting.
