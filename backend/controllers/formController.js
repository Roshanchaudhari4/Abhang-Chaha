const Feedback = require('../models/Feedback');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create a reusable transporter using Gmail SMTP (App password recommended)
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Helper to send email. `recipients` can be a string or array.
const sendNotification = async (subject, htmlBody, recipients = process.env.EMAIL_USER) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipients,
    subject,
    html: htmlBody,
  };
  return transporter.sendMail(mailOptions);
};

// POST /api/feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    const errors = [];
    if (!name || !name.trim()) errors.push('Name is required');
    if (!email || !email.trim()) errors.push('Email is required');
    if (!message || !message.trim()) errors.push('Message is required');
    if (errors.length) return res.status(400).json({ success: false, errors });

    // Save to DB
    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    // Send email notification
    const subject = 'New Feedback - Abhang Chaha';
    const htmlBody = `
      <h2>New Feedback Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <p><em>Received: ${new Date().toLocaleString()}</em></p>
    `;

    try {
      // Send to owner and a copy to submitter
      const recipients = [process.env.EMAIL_USER, email];
      await sendNotification(subject, htmlBody, recipients);
    } catch (mailErr) {
      console.error('Mail error:', mailErr);
      // Continue — mail failure shouldn't prevent API success, but inform client
      return res.status(500).json({ success: false, message: 'Feedback saved but failed to send notification email', error: mailErr.message });
    }

    return res.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('submitFeedback error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    // Validation
    const errors = [];
    if (!name || !name.trim()) errors.push('Name is required');
    if (!mobile || !mobile.trim()) errors.push('Mobile number is required');
    if (!/^[0-9]{10}$/.test((mobile || '').replace(/\D/g, ''))) errors.push('Mobile must be a valid 10-digit number');
    if (!email || !email.trim()) errors.push('Email is required');
    if (!message || !message.trim()) errors.push('Message is required');
    if (errors.length) return res.status(400).json({ success: false, errors });

    // Save to DB
    const contact = new Contact({ name, mobile, email, message });
    await contact.save();

    // Send email notification
    const subject = 'New Contact - Abhang Chaha';
    const htmlBody = `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <p><em>Received: ${new Date().toLocaleString()}</em></p>
    `;

    try {
      // Send to owner and a copy to submitter
      const recipients = [process.env.EMAIL_USER, email];
      await sendNotification(subject, htmlBody, recipients);
    } catch (mailErr) {
      console.error('Mail error:', mailErr);
      return res.status(500).json({ success: false, message: 'Contact saved but failed to send notification email', error: mailErr.message });
    }

    return res.json({ success: true, message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('submitContact error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  submitFeedback,
  submitContact,
};
