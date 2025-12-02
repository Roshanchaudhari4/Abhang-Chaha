import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  formContainerVariants,
  inputFocusVariants,
  buttonRippleVariants,
  successMessageVariants,
  errorShakeVariants,
  cardHoverVariants,
  containerVariants,
  sectionRevealVariants,
  cardFadeInVariants,
} from '../animations/variants';
import '../styles/contact.css';

// Contact section with form and map placeholder
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Validate contact form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({}));
      const savedButEmailFailed = json && typeof json.message === 'string' && json.message.toLowerCase().includes('saved');

      if (res.ok && json.success) {
        setSubmitted(true);
        setFormData({ name: '', mobile: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitted(false), 4000);
      } else if (!res.ok && savedButEmailFailed) {
        setSubmitted(true);
        setFormData({ name: '', mobile: '', email: '', message: '' });
        setErrors({});
        setServerError('Saved, but notification email failed to send.');
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        if (json && Array.isArray(json.errors)) {
          setServerError(json.errors.join(' | '));
        } else if (json && json.message) {
          setServerError(json.message);
        } else {
          setServerError('Failed to submit contact form. Please try again later.');
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
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section id="contact" className="contact">
      <motion.div 
        className="contact-container"
        variants={formContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          className="section-title"
          variants={sectionRevealVariants}
        >
          Contact Us
        </motion.h2>

        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            variants={cardFadeInVariants}
          >
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
                  <p>Thank you! We will contact you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message with shake animation */}
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
              className="contact-form" 
              onSubmit={handleSubmit}
            >
              {/* Name Input - Animated */}
              <motion.div 
                className={`form-group ${errors.name ? 'error-state' : ''}`}
                variants={cardFadeInVariants}
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

              {/* Mobile Input - Animated */}
              <motion.div 
                className={`form-group ${errors.mobile ? 'error-state' : ''}`}
                variants={cardFadeInVariants}
              >
                <label htmlFor="mobile">Mobile Number *</label>
                <motion.input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? 'error' : ''}
                  placeholder="10-digit mobile number"
                  variants={inputFocusVariants}
                  initial="rest"
                  whileFocus="focus"
                />
                {/* Error message with animation */}
                <AnimatePresence>
                  {errors.mobile && (
                    <motion.span 
                      className="error-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.mobile}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Input - Animated */}
              <motion.div 
                className={`form-group ${errors.email ? 'error-state' : ''}`}
                variants={cardFadeInVariants}
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
                className={`form-group ${errors.message ? 'error-state' : ''}`}
                variants={cardFadeInVariants}
              >
                <label htmlFor="message">Message *</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Your message..."
                  rows="4"
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
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <i className="fas fa-paper-plane"></i>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            className="contact-info-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Address Card - with hover lift */}
            <motion.div 
              className="address-card"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <i className="fas fa-map-marker-alt"></i>
              <h3>Our Location</h3>
              <p>Abhang Chaha</p>
              <p>Main Road, Maharashtra</p>
              <p>India</p>
            </motion.div>

            {/* Map Placeholder - with hover glow */}
            <motion.div 
              className="map-placeholder"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <i className="fas fa-map"></i>
              <p>Google Map - Location Coming Soon</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
