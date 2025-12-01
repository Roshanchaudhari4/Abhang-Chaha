import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="contact">
      <motion.div 
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 
          className="section-title"
          variants={itemVariants}
        >
          Contact Us
        </motion.h2>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            variants={itemVariants}
          >
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
                  <p>Thank you! We will contact you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {serverError && (
              <div className="server-error">
                <i className="fas fa-exclamation-circle"></i>
                <span>{serverError}</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Name Input */}
              <motion.div 
                className="form-group"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
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

              {/* Mobile Input */}
              <motion.div 
                className="form-group"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={errors.mobile ? 'error' : ''}
                  placeholder="10-digit mobile number"
                />
                {errors.mobile && <span className="error-text">{errors.mobile}</span>}
              </motion.div>

              {/* Email Input */}
              <motion.div 
                className="form-group"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
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
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Your message..."
                  rows="4"
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
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <i className="fas fa-paper-plane"></i>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            className="contact-info-wrapper"
            variants={itemVariants}
          >
            {/* Address Card */}
            <motion.div 
              className="address-card"
              whileHover={{ y: -10 }}
            >
              <i className="fas fa-map-marker-alt"></i>
              <h3>Our Location</h3>
              <p>Abhang Chaha</p>
              <p>Main Road, Maharashtra</p>
              <p>India</p>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              className="map-placeholder"
              whileHover={{ boxShadow: '0 20px 50px rgba(139, 69, 19, 0.2)' }}
            >
              <i className="fas fa-map"></i>
              <p>Google Map - Location Coming Soon</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
