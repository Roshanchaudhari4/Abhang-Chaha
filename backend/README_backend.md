# Abhang Chaha - Backend (Express + MongoDB + Nodemailer)

This backend implements form handling for the Abhang Chaha website.

Features:
- POST /api/feedback -> saves feedback, sends email notification
- POST /api/contact  -> saves contact inquiry, sends email notification

Prerequisites
- Node.js 14+
- MongoDB instance (local or hosted)
- Gmail account (use App Password if 2FA enabled)

Quick Setup
1. Copy `.env.example` to `.env` and set values.
2. Install dependencies inside the `backend/` folder:
```bash
cd backend
npm install
```
3. Start server:
```bash
npm run dev   # requires nodemon, or use npm start
```

Environment variables (in `.env`)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/abhang_chaha
EMAIL_USER=your_gmail@example.com
EMAIL_PASS=your_gmail_app_password
```

Gmail App Password
- If you use Gmail with 2FA, generate an App Password and paste it into `EMAIL_PASS`.
- Do not push `.env` to public repositories.

API Examples

1) Submit Feedback (cURL):
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Rohan","email":"roshan@example.com","message":"Great chai!"}'
```

2) Submit Contact (cURL):
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rohan","mobile":"9876543210","email":"roshan@example.com","message":"Need info"}'
```

Frontend integration (example using fetch)

Feedback example (React):
```javascript
// sendFeedback.js
export async function sendFeedback(data) {
  const res = await fetch('http://localhost:5000/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

Contact example (React):
```javascript
// sendContact.js
export async function sendContact(data) {
  const res = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
```

Handling responses in React (example):
```javascript
const onSubmit = async (formData) => {
  try {
    const result = await sendFeedback(formData);
    if (result.success) {
      setStatus({ ok: true, message: result.message });
    } else {
      setStatus({ ok: false, message: result.message || result.errors.join(', ') });
    }
  } catch (err) {
    setStatus({ ok: false, message: 'Server error' });
  }
}
```

Notes & Error Handling
- Validation errors return status 400 with `errors` array.
- Server/mail/database errors return status 500.

Security
- Use environment variables for secrets.
- Use HTTPS and secure environment in production.

Next Steps
- Optionally restrict CORS to your front-end domain.
- Add rate-limiting and spam protection (reCAPTCHA) if needed.
