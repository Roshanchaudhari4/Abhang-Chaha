import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/feedback.css';

// Feedback section with form validation and success message
const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const newErrors = validateForm();

    if (Object.keys(newErrors).length !== 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({}));

      // Treat saved-but-email-failed (server returns 500 with message) as success for frontend UX
      const savedButEmailFailed = json && typeof json.message === 'string' && json.message.toLowerCase().includes('saved');

      if (res.ok && json.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitted(false), 4000);
      } else if (!res.ok && savedButEmailFailed) {
        // saved in DB but email failed
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setServerError('Saved, but notification email failed to send.');
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        // Server-side validation errors or other problems
        if (json && Array.isArray(json.errors)) {
          // map server validation errors into a general error
          setServerError(json.errors.join(' | '));
        } else if (json && json.message) {
          setServerError(json.message);
        } else {
          setServerError('Failed to submit feedback. Please try again later.');
        }
      }
    } catch (err) {
      setServerError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="feedback" className="feedback">
      <motion.div 
        className="feedback-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="section-title"
          variants={containerVariants}
        >
          Share Your Feedback
        </motion.h2>

        <AnimatePresence>
          {submitted && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-check-circle"></i>
              <p>Thank you! Your feedback has been received.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {serverError && (
          <div className="server-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{serverError}</span>
          </div>
        )}

        <motion.form 
          className="feedback-form"
          onSubmit={handleSubmit}
          variants={containerVariants}
        >
          {/* Name Input */}
          <motion.div 
            className="form-group"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Your name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </motion.div>

          {/* Email Input */}
          <motion.div 
            className="form-group"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="your@email.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </motion.div>

          {/* Message Input */}
          <motion.div 
            className="form-group"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Your feedback..."
              rows="5"
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </motion.div>

          {/* Submit Button */}
          <motion.button 
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            <span>{loading ? 'Sending...' : 'Send Feedback'}</span>
            <i className="fas fa-paper-plane"></i>
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Feedback;
