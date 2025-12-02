import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  formContainerVariants,
  inputFocusVariants,
  buttonRippleVariants,
  successMessageVariants,
  errorShakeVariants,
  errorHighlightVariants,
  sectionRevealVariants,
  containerVariants,
} from '../animations/variants';
import '../styles/feedback.css';

// Feedback section with form validation and animated feedback
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
  const [shakeField, setShakeField] = useState(null);

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
      // Trigger shake animation on error
      setShakeField('form');
      setTimeout(() => setShakeField(null), 400);
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

  return (
    <section id="feedback" className="feedback">
      <motion.div 
        className="feedback-container"
        variants={formContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="section-title"
          variants={sectionRevealVariants}
        >
          Share Your Feedback
        </motion.h2>

        {/* Success Message with animation */}
        <AnimatePresence>
          {submitted && (
            <motion.div 
              className="success-message"
              variants={successMessageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <i className="fas fa-check-circle"></i>
              <p>Thank you! Your feedback has been received.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {serverError && (
          <motion.div 
            className="server-error"
            variants={errorShakeVariants}
            initial="rest"
            animate={serverError ? "shake" : "rest"}
          >
            <i className="fas fa-exclamation-circle"></i>
            <span>{serverError}</span>
          </motion.div>
        )}

        <motion.form 
          className="feedback-form"
          onSubmit={handleSubmit}
          variants={containerVariants}
        >
          {/* Name Input - Animated */}
          <motion.div 
            className={`form-group ${shakeField === 'form' || errors.name ? 'error-state' : ''}`}
            variants={errorShakeVariants}
            initial="rest"
            animate={shakeField === 'form' ? "shake" : "rest"}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <label htmlFor="name">Name *</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Your name"
              variants={inputFocusVariants}
              initial="rest"
              whileFocus="focus"
            />
            {/* Error message with animation */}
            <AnimatePresence>
              {errors.name && (
                <motion.span 
                  className="error-text"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Input - Animated */}
          <motion.div 
            className={`form-group ${shakeField === 'form' || errors.email ? 'error-state' : ''}`}
            variants={errorShakeVariants}
            initial="rest"
            animate={shakeField === 'form' ? "shake" : "rest"}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.05 }}
          >
            <label htmlFor="email">Email *</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="your@email.com"
              variants={inputFocusVariants}
              initial="rest"
              whileFocus="focus"
            />
            {/* Error message with animation */}
            <AnimatePresence>
              {errors.email && (
                <motion.span 
                  className="error-text"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Message Input - Animated */}
          <motion.div 
            className={`form-group ${shakeField === 'form' || errors.message ? 'error-state' : ''}`}
            variants={errorShakeVariants}
            initial="rest"
            animate={shakeField === 'form' ? "shake" : "rest"}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
          >
            <label htmlFor="message">Message *</label>
            <motion.textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'error' : ''}
              placeholder="Your feedback..."
              rows="5"
              variants={inputFocusVariants}
              initial="rest"
              whileFocus="focus"
            ></motion.textarea>
            {/* Error message with animation */}
            <AnimatePresence>
              {errors.message && (
                <motion.span 
                  className="error-text"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.message}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button - Enhanced animations */}
          <motion.button 
            type="submit"
            className="submit-btn"
            variants={buttonRippleVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
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
